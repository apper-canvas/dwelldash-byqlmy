import { useState, useEffect, createContext } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import getIcon from './utils/iconUtils';
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';
import PropertyDetail from './pages/PropertyDetail';
import NotFound from './pages/NotFound';
import { setUser, clearUser } from './store/slices/userSlice';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Create auth context
export const AuthContext = createContext(null);

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  const [isInitialized, setIsInitialized] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Get authentication status with proper error handling
  const userState = useSelector((state) => state.user);
  const isAuthenticated = userState?.isAuthenticated || false;
  
  // Initialize ApperUI once when the app loads
  useEffect(() => {
    const { ApperClient, ApperUI } = window.ApperSDK;
    const client = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    // Initialize but don't show login yet
    ApperUI.setup(client, {
      target: '#authentication',
      clientId: import.meta.env.VITE_APPER_PROJECT_ID,
      view: 'both',
      onSuccess: function(user) {
        let currentPath = window.location.pathname + window.location.search;
        if (user && user.isAuthenticated) {
          dispatch(setUser(user));
          navigate('/');
        } else if (!currentPath.includes('login')) {
          navigate(currentPath);
        } else {
          navigate('/login');
        }
      },
      onError: function(error) {
        console.error("Authentication failed:", error);
      }
    });
    
    setIsInitialized(true);
  }, [dispatch, navigate]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);
  
  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, [location]);
  
  // Authentication methods to share via context
  const authMethods = {
    isInitialized,
    logout: async () => {
      try {
        const { ApperUI } = window.ApperSDK;
        await ApperUI.logout();
        dispatch(clearUser());
        navigate('/login');
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);
  
  // Icon components
  const MoonIcon = getIcon('Moon');
  const SunIcon = getIcon('Sun');
  const HomeIcon = getIcon('Home');
  const HeartIcon = getIcon('Heart');

  return (
    <AuthContext.Provider value={authMethods}>
      {/* Don't render routes until initialization is complete */}
      {!isInitialized ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <div className="ml-4 text-lg font-medium">
            Initializing application...
          </div>
        </div>
      ) : (
        <div className="min-h-screen">
          {isAuthenticated && (
            <div className="container mx-auto px-4 py-2 flex justify-end">
              <button
                onClick={authMethods.logout}
                className="text-sm text-surface-600 hover:text-red-500 transition-colors"
              >
                Logout
              </button>
            </div>
          )}

          <header className="sticky top-0 z-10 bg-white dark:bg-surface-800 shadow-sm">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <a href="/" className="flex items-center gap-2">
                <HomeIcon className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  DwellDash
                </span>
              </a>
              
              <div className="flex items-center gap-4">
                <nav className="hidden md:flex items-center gap-6">
                  <Link 
                    to="/" 
                    className={`text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary transition-colors ${
                      location.pathname === '/' ? 'font-medium text-primary dark:text-primary' : ''
                    }`}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/wishlist" 
                    className={`flex items-center gap-1 text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary transition-colors ${
                      location.pathname === '/wishlist' ? 'font-medium text-primary dark:text-primary' : ''
                    }`}
                  >
                    <HeartIcon className="w-5 h-5" />
                    Wishlist
                    {favorites.length > 0 && (
                      <span className="ml-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {favorites.length}
                      </span>
                    )}
                  </Link>
                </nav>
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {darkMode ? (
                    <SunIcon className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <MoonIcon className="w-5 h-5 text-surface-600" />
                  )}
                </motion.button>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-6">
            <Routes>
              {/* Public routes - accessible only when NOT authenticated */}
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>

              {/* Protected routes - require authentication */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
              </Route>
              
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          <footer className="bg-surface-100 dark:bg-surface-800 py-6 mt-12">
            <div className="container mx-auto px-4 text-center text-surface-600 dark:text-surface-400 text-sm">
              <p>© {new Date().getFullYear()} DwellDash. All rights reserved.</p>
            </div>
          </footer>

          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={darkMode ? "dark" : "light"}
            toastClassName="bg-white dark:bg-surface-800 shadow-lg rounded-lg"
          />
        </div>
      )}
    </AuthContext.Provider>
  );
}

export default App;