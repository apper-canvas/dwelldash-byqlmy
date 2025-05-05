import { store } from '../store';
import {
  createContactRequestStart,
  createContactRequestSuccess,
  createContactRequestFailure
} from '../store/slices/contactRequestsSlice';

const ContactRequestService = {
  /**
   * Create a new contact request
   * @param {Object} contactData - Contact request data
   * @returns {Promise<Object>} Created contact request
   */
  async createContactRequest(contactData) {
    try {
      store.dispatch(createContactRequestStart());
      const { ApperClient } = window.ApperSDK;
      const client = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Format the data for Apper
      const formattedData = {
        Name: contactData.name,
        email: contactData.email,
        phone: contactData.phone || '',
        message: contactData.message,
        property: contactData.propertyId
      };

      const response = await client.createRecord("contact_request", { record: formattedData });
      store.dispatch(createContactRequestSuccess());
      return response;
    } catch (error) {
      console.error("Error creating contact request:", error);
      store.dispatch(createContactRequestFailure(error.message));
      throw error;
    }
  }
};

export default ContactRequestService;