import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
                {isAuthenticated && recentSearches.length > 0 && (
        });
      } catch (error) {
        console.error("Error submitting property listing:", error);
        toast.error("Error submitting listing. Please try again.");
        setIsSubmitting(false);
      }
  
  // Get searches from Redux store
  const { searches: recentSearches, loading: searchesLoading } = useSelector(state => state.searches);
  const { isAuthenticated } = useSelector(state => state.user);
  const [activeTab, setActiveTab] = useState('search');
      try {
        setIsSubmitting(true);
    location: '',
  const clearRecentSearches = async () => {
    try {
      // In a real implementation, this would delete searches from the database
      // For simplicity, we'll just clear them from the Redux store
      await Promise.all(recentSearches.map(search => 
        SearchService.deleteSearch(search.id)
      ));
      toast.info("Recent searches cleared");
    } catch (error) {
      console.error("Error clearing recent searches:", error);
      toast.error("Error clearing searches. Please try again.");
    }
    bedrooms: '',
        // Fetch properties matching the search criteria
        await PropertyService.fetchProperties({
          location: searchParams.location,
          type: searchParams.propertyType,
          minPrice: searchParams.minPrice,
          maxPrice: searchParams.maxPrice,
          bedrooms: searchParams.bedrooms,
          bathrooms: searchParams.bathrooms
        });
        
        toast.success(`Search completed for "${searchParams.location}"`);
      } catch (error) {
        console.error("Error performing search:", error);
        toast.error("Error performing search. Please try again.");
      } finally {
        setIsSubmitting(false);
  const [listingData, setListingData] = useState({
    bedrooms: '',
    bathrooms: '',
    area: '',
    images: []
  });
  const handleSubmitListing = async (e) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
      try {
        setIsSubmitting(true);

        if (!isAuthenticated) {
          toast.error("You must be logged in to list a property");
          return;
        }
        
        // Submit property listing
        const propertyData = {
          Name: listingData.title,
          title: listingData.title,
          description: listingData.description,
          property_type: listingData.propertyType,
          listing_type: listingData.listingType,
          price: parseFloat(listingData.price),
          address: listingData.address,
          bedrooms: listingData.bedrooms ? parseInt(listingData.bedrooms) : 0,
          bathrooms: listingData.bathrooms ? parseFloat(listingData.bathrooms) : 0,
          area: listingData.area ? parseInt(listingData.area) : 0,
          // In a real implementation, you would handle image uploads here
          images: []
        };
        
        await PropertyService.createProperty(propertyData);
  const HomeIcon = getIcon('Home');
        
        // Reset form
  const PlusIcon = getIcon('Plus');
  const MapPinIcon = getIcon('MapPin');
  const BedIcon = getIcon('Bed');
  const BathIcon = getIcon('Bath');
  const DollarSignIcon = getIcon('DollarSign');
  const SquareIcon = getIcon('Square');
  const ImageIcon = getIcon('Image');
  const SaveIcon = getIcon('Save');
  const ClockIcon = getIcon('Clock');
  const TrashIcon = getIcon('Trash');

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const validateSearch = () => {
    const errors = {};
    if (!searchParams.location.trim()) {
      errors.location = "Location is required";
    }
    return errors;
  };

  const validateListing = () => {
    const errors = {};
    if (!listingData.title.trim()) errors.title = "Title is required";
    if (!listingData.description.trim()) errors.description = "Description is required";
    if (!listingData.propertyType) errors.propertyType = "Property type is required";
    if (!listingData.price) errors.price = "Price is required";
    if (!listingData.address.trim()) errors.address = "Address is required";
    return errors;
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleListingChange = (e) => {
    const { name, value } = e.target;
    setListingData({ ...listingData, [name]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const errors = validateSearch();
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      
      // Add to recent searches if not already present
      const newSearch = { location: searchParams.location, timestamp: new Date().toISOString() };
      const searchExists = recentSearches.some(s => s.location === newSearch.location);
      
      if (!searchExists) {
        setRecentSearches(prev => [newSearch, ...prev].slice(0, 5));
      }
      
      // Simulate search API call
      setTimeout(() => {
        toast.success(`Search completed for "${searchParams.location}"`);
        setIsSubmitting(false);
      }, 1500);
    } else {
      setFormErrors(errors);
    }
  };

  const handleSubmitListing = (e) => {
    e.preventDefault();
    const errors = validateListing();
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        toast.success("Property listing submitted successfully!");
        setIsSubmitting(false);
        setListingData({
          title: '',
          description: '',
          propertyType: '',
          listingType: 'sale',
          price: '',
          address: '',
          bedrooms: '',
          bathrooms: '',
          area: '',
          images: []
        });
      }, 1500);
    } else {
      setFormErrors(errors);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    toast.info("Recent searches cleared");
  };

  const propertyTypes = [
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'studio', label: 'Studio' },
    { value: 'land', label: 'Land' },
    { value: 'commercial', label: 'Commercial' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-white to-surface-100 dark:from-surface-800 dark:to-surface-900 rounded-2xl shadow-soft dark:shadow-none border border-surface-200 dark:border-surface-700 p-6 relative overflow-hidden">
        {/* Background elements for visual interest */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute left-0 bottom-0 w-40 h-40 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative">
          <div className="flex flex-col sm:flex-row mb-8 gap-4">
            <button
              onClick={() => setActiveTab('search')}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                activeTab === 'search'
                  ? 'bg-primary text-white shadow-lg shadow-primary/30 dark:shadow-primary/20 transform -translate-y-1'
                  : 'bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-300 dark:hover:bg-surface-600'
              }`}
            >
              <SearchIcon className="w-5 h-5" />
              <span className="font-medium">Find Properties</span>
            </button>
            
            <button
              onClick={() => setActiveTab('list')}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                activeTab === 'list'
                  ? 'bg-secondary text-white shadow-lg shadow-secondary/30 dark:shadow-secondary/20 transform -translate-y-1'
                  : 'bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-300 dark:hover:bg-surface-600'
              }`}
            >
              <PlusIcon className="w-5 h-5" />
              <span className="font-medium">List Property</span>
            </button>
          </div>
          
          <AnimatePresence mode="wait">
            {activeTab === 'search' ? (
              <motion.div
                key="search"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSearch} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Location</label>
                      <div className="relative">
                        <MapPinIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-surface-500 w-5 h-5" />
                        <input
                          type="text"
                          name="location"
                          placeholder="City, neighborhood, or address"
                          value={searchParams.location}
                          onChange={handleSearchChange}
                          className={`input pl-10 ${formErrors.location ? 'border-red-500 focus:ring-red-500' : ''}`}
                        />
                      </div>
                      {formErrors.location && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.location}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Property Type</label>
                      <div className="relative">
                        <HomeIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-surface-500 w-5 h-5" />
                        <select
                          name="propertyType"
                          value={searchParams.propertyType}
                          onChange={handleSearchChange}
                          className="input pl-10"
                        >
                          <option value="">All Properties</option>
                          {propertyTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Min Price</label>
                      <div className="relative">
                        <DollarSignIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-surface-500 w-5 h-5" />
                        <input
                          type="number"
                          name="minPrice"
                          placeholder="No min"
                          value={searchParams.minPrice}
                          onChange={handleSearchChange}
                          className="input pl-10"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Max Price</label>
                      <div className="relative">
                        <DollarSignIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-surface-500 w-5 h-5" />
                        <input
                          type="number"
                          name="maxPrice"
                          placeholder="No max"
                          value={searchParams.maxPrice}
                          onChange={handleSearchChange}
                          className="input pl-10"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Bedrooms</label>
                      <div className="relative">
                        <BedIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-surface-500 w-5 h-5" />
                        <select
                          name="bedrooms"
                          value={searchParams.bedrooms}
                          onChange={handleSearchChange}
                          className="input pl-10"
                        >
                          <option value="">Any</option>
                          <option value="1">1+</option>
                          <option value="2">2+</option>
                          <option value="3">3+</option>
                          <option value="4">4+</option>
                          <option value="5">5+</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Bathrooms</label>
                      <div className="relative">
                        <BathIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-surface-500 w-5 h-5" />
                        <select
                          name="bathrooms"
                          value={searchParams.bathrooms}
                          onChange={handleSearchChange}
                          className="input pl-10"
                        >
                          <option value="">Any</option>
                          <option value="1">1+</option>
                          <option value="2">2+</option>
                          <option value="3">3+</option>
                          <option value="4">4+</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-full py-3 text-lg flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                          Searching...
                        </>
                      ) : (
                        <>
                          <SearchIcon className="w-5 h-5" />
                          Search Properties
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
                
                {/* Recent searches */}
                {recentSearches.length > 0 && (
                  <div className="mt-8">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-medium flex items-center gap-1 text-surface-600 dark:text-surface-400">
                        <ClockIcon className="w-4 h-4" />
                        Recent Searches
                      </h3>
                      <button 
                        onClick={clearRecentSearches}
                        className="text-xs text-surface-500 hover:text-red-500 flex items-center gap-1"
                      >
                        <TrashIcon className="w-3 h-3" />
                        Clear
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchParams({...searchParams, location: search.location});
                            toast.info(`Location set to "${search.location}"`);
                          }}
                          className="py-1 px-3 bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 rounded-full text-sm flex items-center gap-1 transition-colors"
                        >
                          <MapPinIcon className="w-3 h-3" />
                          {search.location}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSubmitListing} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Property Title</label>
                      <input
                        type="text"
                        name="title"
                        placeholder="e.g. Modern Downtown Apartment"
                        value={listingData.title}
                        onChange={handleListingChange}
                        className={`input ${formErrors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
                      />
                      {formErrors.title && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.title}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <textarea
                        name="description"
                        placeholder="Describe your property"
                        value={listingData.description}
                        onChange={handleListingChange}
                        rows="3"
                        className={`input ${formErrors.description ? 'border-red-500 focus:ring-red-500' : ''}`}
                      ></textarea>
                      {formErrors.description && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.description}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Property Type</label>
                        <div className="relative">
                          <HomeIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-surface-500 w-5 h-5" />
                          <select
                            name="propertyType"
                            value={listingData.propertyType}
                            onChange={handleListingChange}
                            className={`input pl-10 ${formErrors.propertyType ? 'border-red-500 focus:ring-red-500' : ''}`}
                          >
                            <option value="">Select Type</option>
                            {propertyTypes.map(type => (
                              <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                          </select>
                          {formErrors.propertyType && (
                            <p className="mt-1 text-sm text-red-500">{formErrors.propertyType}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Listing Type</label>
                        <div className="flex gap-4 mt-2">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="listingType"
                              value="sale"
                              checked={listingData.listingType === 'sale'}
                              onChange={handleListingChange}
                              className="form-radio text-primary focus:ring-primary"
                            />
                            <span className="ml-2">For Sale</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="listingType"
                              value="rent"
                              checked={listingData.listingType === 'rent'}
                              onChange={handleListingChange}
                              className="form-radio text-secondary focus:ring-secondary"
                            />
                            <span className="ml-2">For Rent</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Price</label>
                        <div className="relative">
                          <DollarSignIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-surface-500 w-5 h-5" />
                          <input
                            type="number"
                            name="price"
                            placeholder={listingData.listingType === 'rent' ? "Monthly rent" : "Selling price"}
                            value={listingData.price}
                            onChange={handleListingChange}
                            className={`input pl-10 ${formErrors.price ? 'border-red-500 focus:ring-red-500' : ''}`}
                          />
                          {formErrors.price && (
                            <p className="mt-1 text-sm text-red-500">{formErrors.price}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Bedrooms</label>
                        <div className="relative">
                          <BedIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-surface-500 w-5 h-5" />
                          <input
                            type="number"
                            name="bedrooms"
                            placeholder="Number of bedrooms"
                            value={listingData.bedrooms}
                            onChange={handleListingChange}
                            className="input pl-10"
                            min="0"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Bathrooms</label>
                        <div className="relative">
                          <BathIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-surface-500 w-5 h-5" />
                          <input
                            type="number"
                            name="bathrooms"
                            placeholder="Number of bathrooms"
                            value={listingData.bathrooms}
                            onChange={handleListingChange}
                            className="input pl-10"
                            min="0"
                            step="0.5"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Address</label>
                        <div className="relative">
                          <MapPinIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-surface-500 w-5 h-5" />
                          <input
                            type="text"
                            name="address"
                            placeholder="Property address"
                            value={listingData.address}
                            onChange={handleListingChange}
                            className={`input pl-10 ${formErrors.address ? 'border-red-500 focus:ring-red-500' : ''}`}
                          />
                          {formErrors.address && (
                            <p className="mt-1 text-sm text-red-500">{formErrors.address}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Area (sq ft)</label>
                        <div className="relative">
                          <SquareIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-surface-500 w-5 h-5" />
                          <input
                            type="number"
                            name="area"
                            placeholder="Property size"
                            value={listingData.area}
                            onChange={handleListingChange}
                            className="input pl-10"
                            min="0"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Images</label>
                      <div className="border-2 border-dashed border-surface-300 dark:border-surface-700 rounded-lg p-4 text-center">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <ImageIcon className="w-8 h-8 text-surface-400" />
                          <p className="text-sm text-surface-600 dark:text-surface-400">
                            Drag and drop images here, or click to browse
                          </p>
                          <button 
                            type="button"
                            className="btn btn-outline text-sm mt-2"
                            onClick={() => toast.info("File upload functionality would be implemented here")}
                          >
                            Browse Files
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="btn w-full py-3 text-lg flex items-center justify-center gap-2"
                      style={{
                        background: "linear-gradient(to right, #10b981, #2563eb)",
                        color: "white"
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <SaveIcon className="w-5 h-5" />
                          List Your Property
                        </>
                      )}
                    </motion.button>
                    
                    <p className="text-center text-sm text-surface-500 mt-4">
                      By listing your property, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default MainFeature;