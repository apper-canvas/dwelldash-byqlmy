import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

// Mock property data
const MOCK_PROPERTIES = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    description: "Luxurious 2-bedroom apartment with skyline views, modern amenities, and prime downtown location.",
    price: 425000,
    type: "apartment",
    listingType: "sale",
    bedrooms: 2,
    bathrooms: 2,
    area: 1250,
    address: "123 Main St, Downtown, CA 91234",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
    featured: true
  },
  {
    id: 2,
    title: "Spacious Family Home",
    description: "Beautiful 4-bedroom house with large backyard, updated kitchen, and excellent school district.",
    price: 725000,
    type: "house",
    listingType: "sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 2400,
    address: "456 Oak Ave, Pineville, CA 91235",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
    featured: true
  },
  {
    id: 3,
    title: "Cozy Studio for Rent",
    description: "Newly renovated studio apartment near university. All utilities included, perfect for students.",
    price: 1800,
    type: "studio",
    listingType: "rent",
    bedrooms: 0,
    bathrooms: 1,
    area: 550,
    address: "789 College St, University District, CA 91236",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop",
    featured: false
  },
  {
    id: 4,
    title: "Luxury Waterfront Condo",
    description: "Exclusive 3-bedroom condo with panoramic ocean views, high-end finishes, and resort-style amenities.",
    price: 1200000,
    type: "condo",
    listingType: "sale",
    bedrooms: 3,
    bathrooms: 3,
    area: 2100,
    address: "101 Ocean Dr, Beach City, CA 91237",
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=600&auto=format&fit=crop",
    featured: true
  },
  {
    id: 5,
    title: "Charming Vintage Cottage",
    description: "Historic 2-bedroom cottage with character, updated systems, and walking distance to town center.",
    price: 350000,
    type: "house",
    listingType: "sale",
    bedrooms: 2,
    bathrooms: 1,
    area: 1100,
    address: "222 Maple Ln, Historic District, CA 91238",
    image: "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?q=80&w=600&auto=format&fit=crop",
    featured: false
  },
  {
    id: 6,
    title: "Modern Townhouse",
    description: "Contemporary 3-bedroom townhome with garage, rooftop terrace, and energy-efficient features.",
    price: 2500,
    type: "townhouse",
    listingType: "rent",
    bedrooms: 3,
    bathrooms: 2.5,
    area: 1800,
    address: "333 Urban Way, Metro Heights, CA 91239",
    image: "https://images.unsplash.com/photo-1628012209120-d9db7abf7eab?q=80&w=600&auto=format&fit=crop",
    featured: false
  }
];

function Home() {
  const [properties, setProperties] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [filters, setFilters] = useState({
    type: '',
    listingType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
  });
  const [loading, setLoading] = useState(true);

  // Icon components
  const HeartIcon = getIcon('Heart');
  const HeartFilledIcon = getIcon('HeartFilled');
  const BedIcon = getIcon('Bed');
  const BathIcon = getIcon('Bath');
  const SquareIcon = getIcon('Square');
  const HomeIcon = getIcon('Home');
  const TagIcon = getIcon('Tag');
  const MapPinIcon = getIcon('MapPin');
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProperties(MOCK_PROPERTIES);
      setLoading(false);
    }, 1000);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
      toast.info("Removed from favorites");
    } else {
      setFavorites([...favorites, id]);
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
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  const resetFilters = () => {
    setFilters({
      type: '',
      listingType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
    });
  };
  
  // Apply filters
  const filteredProperties = properties.filter(property => {
    if (filters.type && property.type !== filters.type) return false;
    if (filters.listingType && property.listingType !== filters.listingType) return false;
    if (filters.minPrice && property.price < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && property.price > parseInt(filters.maxPrice)) return false;
    if (filters.bedrooms && property.bedrooms < parseInt(filters.bedrooms)) return false;
    return true;
  });
  
  return (
    <div>
      <section className="mb-12">
        <div className="relative w-full rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop" 
            alt="Luxury home exterior" 
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
              Find Your Dream Home
            </h1>
            <p className="text-lg md:text-xl text-center max-w-2xl mb-8">
              Discover the perfect property that fits your lifestyle and budget
            </p>
          </div>
        </div>
      </section>
      
      <section className="mb-16">
        <MainFeature />
      </section>
      
      <section className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Browse Properties
            </span>
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            {favorites.length > 0 && (
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <HeartFilledIcon className="w-4 h-4" />
                {favorites.length} Favorite{favorites.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          <div className="md:col-span-3">
            <div className="card sticky top-24">
              <h3 className="text-lg font-medium mb-4">Filter Properties</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Property Type</label>
                  <select 
                    name="type" 
                    value={filters.type} 
                    onChange={handleFilterChange}
                    className="input"
                  >
                    <option value="">All Types</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="studio">Studio</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Listing Type</label>
                  <select 
                    name="listingType" 
                    value={filters.listingType} 
                    onChange={handleFilterChange}
                    className="input"
                  >
                    <option value="">Buy or Rent</option>
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Price Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="number" 
                      name="minPrice" 
                      placeholder="Min" 
                      value={filters.minPrice} 
                      onChange={handleFilterChange}
                      className="input"
                    />
                    <input 
                      type="number" 
                      name="maxPrice" 
                      placeholder="Max" 
                      value={filters.maxPrice} 
                      onChange={handleFilterChange}
                      className="input"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Bedrooms (min)</label>
                  <select 
                    name="bedrooms" 
                    value={filters.bedrooms} 
                    onChange={handleFilterChange}
                    className="input"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>
                
                <button 
                  onClick={resetFilters}
                  className="w-full btn btn-outline mt-2"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-9">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="card text-center py-12">
                <h3 className="text-xl font-medium mb-2">No properties found</h3>
                <p className="text-surface-500 mb-4">Try adjusting your filters to see more results</p>
                <button 
                  onClick={resetFilters}
                  className="btn btn-primary"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredProperties.map((property) => (
                    <motion.div 
                      key={property.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
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
                          onClick={() => toggleFavorite(property.id)}
                          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-surface-700 transition-colors shadow-sm z-10"
                        >
                          {favorites.includes(property.id) ? (
                            <HeartFilledIcon className="w-5 h-5 text-red-500" />
                          ) : (
                            <HeartIcon className="w-5 h-5 text-surface-500 group-hover:text-red-500 transition-colors" />
                          )}
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
                          
                          <button className="btn btn-primary">
                            View Details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;