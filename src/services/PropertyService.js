import { store } from '../store';
import { 
  fetchPropertiesStart, 
  fetchPropertiesSuccess, 
  fetchPropertySuccess, 
  fetchPropertiesFailure 
} from '../store/slices/propertiesSlice';

const PropertyService = {
  /**
   * Fetch all properties with optional filters
   * @param {Object} filters - Optional filters to apply
   * @returns {Promise<Array>} Properties
   */
  async fetchProperties(filters = {}) {
    try {
      store.dispatch(fetchPropertiesStart());
      const { ApperClient } = window.ApperSDK;
      const client = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Build where clause based on filters
      const where = [];
      
      if (filters.type) {
        where.push({ field: "property_type", operator: "equals", value: filters.type });
      }
      
      if (filters.listingType) {
        where.push({ field: "listing_type", operator: "equals", value: filters.listingType });
      }
      
      if (filters.minPrice) {
        where.push({ field: "price", operator: "greaterThanEqual", value: parseInt(filters.minPrice) });
      }
      
      if (filters.maxPrice) {
        where.push({ field: "price", operator: "lessThanEqual", value: parseInt(filters.maxPrice) });
      }
      
      if (filters.bedrooms) {
        where.push({ field: "bedrooms", operator: "greaterThanEqual", value: parseInt(filters.bedrooms) });
      }

      if (filters.bathrooms) {
        where.push({ field: "bathrooms", operator: "greaterThanEqual", value: parseFloat(filters.bathrooms) });
      }

      const params = {
        fields: [
          "Id", "Name", "title", "description", "price", "property_type",
          "listing_type", "bedrooms", "bathrooms", "area", "address", "featured", "images"
        ],
        where: where,
        orderBy: [{ field: "featured", direction: "desc" }, { field: "CreatedOn", direction: "desc" }],
        pagingInfo: { limit: 50, offset: 0 }
      };

      const response = await client.fetchRecords("property", params);
      
      if (response && response.data) {
        // Transform the data to match what the UI expects
        const transformedData = response.data.map(property => ({
          id: property.Id,
          title: property.title || property.Name,
          description: property.description || "",
          price: property.price || 0,
          type: property.property_type || "house",
          listingType: property.listing_type || "sale",
          bedrooms: property.bedrooms || 0,
          bathrooms: property.bathrooms || 0,
          area: property.area || 0,
          address: property.address || "",
          image: property.images && property.images.length > 0 
            ? property.images[0] 
            : "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=600&auto=format&fit=crop",
          featured: property.featured || false
        }));
        
        store.dispatch(fetchPropertiesSuccess(transformedData));
        return transformedData;
      }
      
      store.dispatch(fetchPropertiesSuccess([]));
      return [];
    } catch (error) {
      console.error("Error fetching properties:", error);
      store.dispatch(fetchPropertiesFailure(error.message));
      return [];
    }
  },

  /**
   * Fetch a single property by ID
   * @param {number} id - Property ID
   * @returns {Promise<Object>} Property
   */
  async fetchPropertyById(id) {
    try {
      store.dispatch(fetchPropertiesStart());
      const { ApperClient } = window.ApperSDK;
      const client = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const response = await client.getRecordById("property", id, {
        fields: [
          "Id", "Name", "title", "description", "price", "property_type",
          "listing_type", "bedrooms", "bathrooms", "area", "address", "featured", "images"
        ]
      });
      
      if (response && response.data) {
        // Transform the data to match what the UI expects
        const property = response.data;
        const transformedData = {
          id: property.Id,
          title: property.title || property.Name,
          description: property.description || "",
          price: property.price || 0,
          type: property.property_type || "house",
          listingType: property.listing_type || "sale",
          bedrooms: property.bedrooms || 0,
          bathrooms: property.bathrooms || 0,
          area: property.area || 0,
          address: property.address || "",
          image: property.images && property.images.length > 0 
            ? property.images[0] 
            : "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=600&auto=format&fit=crop",
          featured: property.featured || false
        };
        
        store.dispatch(fetchPropertySuccess(transformedData));
        return transformedData;
      }
      
      store.dispatch(fetchPropertiesFailure("Property not found"));
      return null;
    } catch (error) {
      console.error("Error fetching property:", error);
      store.dispatch(fetchPropertiesFailure(error.message));
      return null;
    }
  },

  /**
   * Create a new property listing
   * @param {Object} propertyData - Property data
   * @returns {Promise<Object>} Created property
   */
  async createProperty(propertyData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const client = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const response = await client.createRecord("property", { record: propertyData });
      return response;
    } catch (error) {
      console.error("Error creating property:", error);
      throw error;
    }
  }
};

export default PropertyService;