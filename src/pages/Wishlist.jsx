import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import { MOCK_PROPERTIES } from './Home';

function Wishlist() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Icon components
  const HeartIcon = getIcon('Heart');
  const HeartFilledIcon = getIcon('HeartFilled');
  const BedIcon = getIcon('Bed');
  const BathIcon = getIcon('Bath');
  const SquareIcon = getIcon('Square');
  const MapPinIcon = getIcon('MapPin');
  const TrashIcon = getIcon('Trash');
  const ArrowLeftIcon = getIcon('ArrowLeft');

  useEffect(() => {
    // Load favorite properties
    setLoading(true);
    setTimeout(() => {
      const properties = MOCK_PROPERTIES.filter(property => 
        favorites.includes(property.id)
      );
      setFavoriteProperties(properties);
      setLoading(false);
    }, 500);
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const removeFromWishlist = (id) => {
    setFavorites(favorites.filter(favId => favId !== id));
    toast.info("Removed from wishlist");
  };

  const clearWishlist = () => {
    setFavorites([]);
    toast.info("Wishlist cleared");
  };

  const formatPrice = (price, listingType) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price) + (listingType === 'rent' ? '/month' : '');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            My Wishlist
          </span>
        </h1>
        <p className="text-surface-600 dark:text-surface-400">
          Manage your favorite properties all in one place
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : favoriteProperties.length === 0 ? (
        <div className="card text-center py-12 max-w-lg mx-auto">
          <div className="mb-4 text-surface-400">
            <HeartIcon className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
          <p className="text-surface-500 mb-6">Start browsing properties and add them to your wishlist!</p>
          <Link to="/" className="btn btn-primary inline-flex items-center">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Browse Properties
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-surface-500">
              {favoriteProperties.length} {favoriteProperties.length === 1 ? 'property' : 'properties'} in wishlist
            </div>
            {favoriteProperties.length > 0 && (
              <button 
                onClick={clearWishlist}
                className="btn btn-outline btn-sm text-red-500 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-900/30 inline-flex items-center gap-1"
              >
                <TrashIcon className="w-4 h-4" />
                Clear Wishlist
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {favoriteProperties.map((property) => (
                <motion.div 
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="card group hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative">
                    <div className="rounded-lg overflow-hidden aspect-[4/3] mb-3">
                      <img 
                        src={property.image} 
                        alt={property.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    <button 
                      onClick={() => removeFromWishlist(property.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-surface-700 transition-colors shadow-sm z-10"
                      aria-label="Remove from wishlist"
                    >
                      <HeartFilledIcon className="w-5 h-5 text-red-500" />
                    </button>
                    
                    <div className="absolute top-3 left-3 z-10">
                      <span className={`text-xs font-bold uppercase py-1 px-2 rounded-full ${
                        property.listingType === 'sale' 
                          ? 'bg-primary text-white' 
                          : 'bg-secondary text-white'
                      }`}>
                        {property.listingType === 'sale' ? 'For Sale' : 'For Rent'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-xl truncate">{property.title}</h3>
                    </div>
                    
                    <div className="flex items-center text-surface-500 dark:text-surface-400 text-sm gap-1">
                      <MapPinIcon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{property.address}</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {property.bedrooms > 0 && (
                        <div className="flex items-center gap-1">
                          <BedIcon className="w-4 h-4 text-surface-500" />
                          <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-1">
                        <BathIcon className="w-4 h-4 text-surface-500" />
                        <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <SquareIcon className="w-4 h-4 text-surface-500" />
                        <span>{property.area} sq ft</span>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-surface-200 dark:border-surface-700 flex justify-between items-center">
                      <div className="font-bold text-lg">
                        {formatPrice(property.price, property.listingType)}
                      </div>
                      
                      <Link 
                        to={`/property/${property.id}`}
                        className="btn btn-primary"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
}

export default Wishlist;