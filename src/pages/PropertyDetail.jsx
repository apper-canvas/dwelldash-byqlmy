import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
                      <HeartFilledIcon className="w-5 h-5 text-red-500" />
                      <HeartIcon className="w-5 h-5 text-surface-500 group-hover:text-red-500 transition-colors" />
                  name="name"
    // Fetch property details and favorites
    const fetchData = async () => {
      try {
        setLoading(true);
        const propertyData = await PropertyService.fetchPropertyById(parseInt(id));
        await FavoriteService.fetchFavorites();
        
        // Fetch related properties (properties of same type)
        if (propertyData) {
          const allProperties = await PropertyService.fetchProperties({
            type: propertyData.type
          });
          
          // Filter out the current property and limit to 3
          const related = allProperties
            .filter(p => p.id !== propertyData.id)
            .slice(0, 3);
            
          setRelatedProperties(related);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error loading property details:", error);
        setLoading(false);
    };
    
    fetchData();
    
    // Cleanup
    return () => {
      dispatch(clearPropertyDetail());
    };
  }, [id, dispatch]);
                  name="email"
                  name="phone"
  const toggleFavorite = async (propertyId) => {
    try {
      const favorite = favorites.find(fav => fav.propertyId === propertyId);
      if (favorite) {
        await FavoriteService.removeFromFavorites(favorite.id);
        toast.info("Removed from favorites");
      } else {
        await FavoriteService.addToFavorites(propertyId);
        toast.success("Added to favorites");
      }
      await FavoriteService.fetchFavorites();
  const CheckIcon = getIcon('Check');
  useEffect(() => {
    // Simulate API call to fetch property details
    setTimeout(() => {
      const propertyData = MOCK_PROPERTIES.find(p => p.id === parseInt(id));
                  name="message"
      setProperty(propertyData);

      // Find related properties (same type or in same price range)
      if (propertyData) {
        const related = MOCK_PROPERTIES.filter(p => 
              <button 
                type="submit" 
                className="btn btn-primary w-full flex items-center justify-center"
                disabled={contactLoading}
              >
                {contactLoading ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <SendIcon className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
        ).slice(0, 3);
        setRelatedProperties(related);
      }

      setLoading(false);
    }, 800);
  }, [id]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (propertyId) => {
    if (favorites.includes(propertyId)) {
      setFavorites(favorites.filter(favId => favId !== propertyId));
      toast.info("Removed from favorites");
    } else {
      setFavorites([...favorites, propertyId]);
      toast.success("Added to favorites");
    }
  };

  const formatPrice = (price, listingType) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price) + (listingType === 'rent' ? '/month' : '');
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    toast.success("Your message has been sent! An agent will contact you soon.");
    e.target.reset();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="card text-center py-12 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
        <p className="text-surface-500 mb-6">The property you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="btn btn-primary">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Listings
        </Link>
      </div>
    );
  }

  const propertyFeatures = [
    "Central Air Conditioning",
    "Hardwood Floors",
    "Stainless Steel Appliances",
    "Walk-in Closets",
    "High Ceilings",
    "Laundry Room",
    "Private Balcony/Patio"
  ];

  return (
    <div>
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-surface-500 hover:text-primary transition-colors">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Listings
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Property Images */}
          <div className="relative rounded-xl overflow-hidden mb-6">
            <img 
              src={property.image} 
              alt={property.title} 
              className="w-full aspect-video object-cover"
            />
            <button 
              onClick={() => toggleFavorite(property.id)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm z-10"
            >
              {favorites.includes(property.id) ? (
                <HeartFilledIcon className="w-6 h-6 text-red-500" />
              ) : (
                <HeartIcon className="w-6 h-6 text-surface-500 hover:text-red-500 transition-colors" />
              )}
            </button>
            
            <div className="absolute top-4 left-4">
              <span className={`text-sm font-bold uppercase py-1 px-3 rounded-full ${
                property.listingType === 'sale' 
                  ? 'bg-primary text-white' 
                  : 'bg-secondary text-white'
              }`}>
                {property.listingType === 'sale' ? 'For Sale' : 'For Rent'}
              </span>
            </div>
          </div>

          {/* Property Title and Basic Info */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-2xl md:text-3xl font-bold">{property.title}</h1>
              <div className="text-xl md:text-2xl font-bold text-primary">
                {formatPrice(property.price, property.listingType)}
              </div>
            </div>
            
            <div className="flex items-center text-surface-500 mb-4">
              <MapPinIcon className="w-5 h-5 mr-1 flex-shrink-0" />
              <span>{property.address}</span>
            </div>
            
            <div className="flex flex-wrap gap-4 md:gap-6">
              {property.bedrooms > 0 && (
                <div className="flex items-center">
                  <BedIcon className="w-5 h-5 text-primary mr-2" />
                  <div>
                    <div className="font-medium">{property.bedrooms}</div>
                    <div className="text-sm text-surface-500">{property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center">
                <BathIcon className="w-5 h-5 text-primary mr-2" />
                <div>
                  <div className="font-medium">{property.bathrooms}</div>
                  <div className="text-sm text-surface-500">{property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <SquareIcon className="w-5 h-5 text-primary mr-2" />
                <div>
                  <div className="font-medium">{property.area}</div>
                  <div className="text-sm text-surface-500">Sq Ft</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <HomeIcon className="w-5 h-5 text-primary mr-2" />
                <div>
                  <div className="font-medium capitalize">{property.type}</div>
                  <div className="text-sm text-surface-500">Property Type</div>
                </div>
              </div>
            </div>
          </div>

          {/* Property Description */}
          <div className="card mb-8">
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <p className="text-surface-600 dark:text-surface-300 leading-relaxed">
              {property.description}
              {/* Extended description */}
              <br /><br />
              This exceptional property offers a perfect blend of comfort and luxury. The well-designed layout provides optimal space utilization while maintaining an open, airy feel. Natural light floods the interior through large windows, creating a warm and inviting atmosphere.
              <br /><br />
              The property is situated in a highly desirable neighborhood with excellent amenities nearby, including shops, restaurants, parks, and schools. Easy access to public transportation and major highways makes commuting a breeze.
            </p>
          </div>

          {/* Property Features */}
          <div className="card mb-8">
            <h2 className="text-xl font-bold mb-4">Features & Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {propertyFeatures.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Property Location */}
          <div className="card mb-8">
            <h2 className="text-xl font-bold mb-4">Location</h2>
            <div className="bg-surface-100 dark:bg-surface-800 rounded-lg aspect-video flex items-center justify-center">
              <MapPinIcon className="w-12 h-12 text-surface-400" />
              <span className="ml-2 text-surface-500">Map view would display here</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          {/* Contact Form */}
          <div className="card sticky top-24 mb-8">
            <h2 className="text-xl font-bold mb-4">Contact Agent</h2>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Your Name</label>
                <input 
                  type="text" 
                  required
                  className="input"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  className="input"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  className="input"
                  placeholder="(123) 456-7890"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea 
                  required
                  rows="4" 
                  className="input"
                  placeholder="I'm interested in this property and would like more information..."
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary w-full flex items-center justify-center">
                <SendIcon className="w-4 h-4 mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Related Properties */}
      {relatedProperties.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProperties.map((relatedProperty) => (
              <motion.div 
                key={relatedProperty.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="card group hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  <div className="rounded-lg overflow-hidden aspect-[4/3] mb-3">
                    <img 
                      src={relatedProperty.image} 
                      alt={relatedProperty.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <button 
                    onClick={() => toggleFavorite(relatedProperty.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-surface-700 transition-colors shadow-sm z-10"
                  >
                    {favorites.includes(relatedProperty.id) ? (
                      <HeartFilledIcon className="w-5 h-5 text-red-500" />
                    ) : (
                      <HeartIcon className="w-5 h-5 text-surface-500 group-hover:text-red-500 transition-colors" />
                    )}
                  </button>
                  
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`text-xs font-bold uppercase py-1 px-2 rounded-full ${
                      relatedProperty.listingType === 'sale' 
                        ? 'bg-primary text-white' 
                        : 'bg-secondary text-white'
                    }`}>
                      {relatedProperty.listingType === 'sale' ? 'For Sale' : 'For Rent'}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg truncate">{relatedProperty.title}</h3>
                  </div>
                  
                  <div className="flex items-center text-surface-500 dark:text-surface-400 text-sm gap-1">
                    <MapPinIcon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{relatedProperty.address}</span>
                  </div>
                  
                  <div className="pt-3 border-t border-surface-200 dark:border-surface-700 flex justify-between items-center">
                    <div className="font-bold text-lg">
                      {formatPrice(relatedProperty.price, relatedProperty.listingType)}
                    </div>
                    
                    <Link 
                      to={`/property/${relatedProperty.id}`}
                      className="btn btn-primary"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertyDetail;