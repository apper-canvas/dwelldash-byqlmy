import { store } from '../store';
import {
  fetchFavoritesStart,
  fetchFavoritesSuccess,
  fetchFavoritesFailure,
  addFavorite,
  removeFavorite,
  clearFavorites
} from '../store/slices/favoritesSlice';

const FavoriteService = {
  /**
   * Fetch all favorites for the current user
   * @returns {Promise<Array>} Favorites with property details
   */
  async fetchFavorites() {
    try {
      store.dispatch(fetchFavoritesStart());
      const { ApperClient } = window.ApperSDK;
      const client = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Get current user ID from Redux store
      const { user } = store.getState().user;
      if (!user) {
        store.dispatch(fetchFavoritesFailure("User not authenticated"));
        return [];
      }

      // Fetch favorites for current user
      const params = {
        fields: ["Id", "property", "user_id"],
        where: [{ field: "user_id", operator: "equals", value: user.userId }],
        // Include related property data
        expands: [{
          name: "property",
          alias: "propertyDetails",
          fields: [
            "Id", "Name", "title", "description", "price", "property_type",
            "listing_type", "bedrooms", "bathrooms", "area", "address", "featured", "images"
          ]
        }]
      };

      const response = await client.fetchRecords("favorite", params);
      
      if (response && response.data) {
        // Transform the data to include property details
        const transformedData = response.data.map(favorite => {
          const property = favorite.propertyDetails;
          if (!property) return null;
          
          return {
            id: favorite.Id,
            propertyId: property.Id,
            property: {
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
            }
          };
        }).filter(item => item !== null);
        
        store.dispatch(fetchFavoritesSuccess(transformedData));
        return transformedData;
      }
      
      store.dispatch(fetchFavoritesSuccess([]));
      return [];
    } catch (error) {
      console.error("Error fetching favorites:", error);
      store.dispatch(fetchFavoritesFailure(error.message));
      return [];
    }
  },

  /**
   * Add a property to favorites
   * @param {number} propertyId - Property ID to favorite
   * @returns {Promise<Object>} Created favorite
   */
  async addToFavorites(propertyId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const client = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Get current user ID from Redux store
      const { user } = store.getState().user;
      if (!user) {
        throw new Error("User not authenticated");
      }

      const favoriteData = {
        Name: `Favorite ${propertyId}`,
        property: propertyId,
        user_id: user.userId
      };

      const response = await client.createRecord("favorite", { record: favoriteData });
      if (response && response.data) {
        store.dispatch(addFavorite(response.data));
      }
      return response;
    } catch (error) {
      console.error("Error adding to favorites:", error);
      throw error;
    }
  },

  /**
   * Remove a property from favorites
   * @param {number} favoriteId - Favorite ID to remove
   * @returns {Promise<Object>} Response
   */
  async removeFromFavorites(favoriteId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const client = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const response = await client.deleteRecord("favorite", { RecordIds: [favoriteId] });
      if (response && response.success) {
        store.dispatch(removeFavorite(favoriteId));
      }
      return response;
    } catch (error) {
      console.error("Error removing from favorites:", error);
      throw error;
    }
  }
};

export default FavoriteService;