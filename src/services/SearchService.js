import { store } from '../store';
import {
  fetchSearchesStart,
  fetchSearchesSuccess,
  fetchSearchesFailure,
  addSearch,
  clearSearches
} from '../store/slices/searchesSlice';

const SearchService = {
  /**
   * Fetch recent searches for the current user
   * @returns {Promise<Array>} Recent searches
   */
  async fetchRecentSearches() {
    try {
      store.dispatch(fetchSearchesStart());
      const { ApperClient } = window.ApperSDK;
      const client = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Get current user ID from Redux store
      const { user } = store.getState().user;
      if (!user) {
        store.dispatch(fetchSearchesFailure("User not authenticated"));
        return [];
      }

      const params = {
        fields: ["Id", "Name", "location", "timestamp", "user_id"],
        where: [{ field: "user_id", operator: "equals", value: user.userId }],
        orderBy: [{ field: "timestamp", direction: "desc" }],
        pagingInfo: { limit: 5, offset: 0 }
      };

      const response = await client.fetchRecords("property_search", params);
      
      if (response && response.data) {
        // Transform the data to match what the UI expects
        const transformedData = response.data.map(search => ({
          id: search.Id,
          location: search.location,
          timestamp: search.timestamp
        }));
        
        store.dispatch(fetchSearchesSuccess(transformedData));
        return transformedData;
      }
      
      store.dispatch(fetchSearchesSuccess([]));
      return [];
    } catch (error) {
      console.error("Error fetching recent searches:", error);
      store.dispatch(fetchSearchesFailure(error.message));
      return [];
    }
  },

  /**
   * Save a new search
   * @param {Object} searchData - Search data to save
   * @returns {Promise<Object>} Created search
   */
  async saveSearch(searchData) {
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

      const formattedData = {
        Name: `Search for ${searchData.location}`,
        location: searchData.location,
        property_type: searchData.propertyType || '',
        min_price: searchData.minPrice ? parseFloat(searchData.minPrice) : null,
        max_price: searchData.maxPrice ? parseFloat(searchData.maxPrice) : null,
        bedrooms: searchData.bedrooms ? parseInt(searchData.bedrooms) : null,
        bathrooms: searchData.bathrooms ? parseFloat(searchData.bathrooms) : null,
        timestamp: new Date().toISOString(),
        user_id: user.userId
      };

      const response = await client.createRecord("property_search", { record: formattedData });
      
      if (response && response.data) {
        // Add to Redux store
        const newSearch = {
          id: response.data.Id,
          location: response.data.location,
          timestamp: response.data.timestamp
        };
        store.dispatch(addSearch(newSearch));
      }
      
      return response;
    } catch (error) {
      console.error("Error saving search:", error);
      throw error;
    }
  }
};

export default SearchService;