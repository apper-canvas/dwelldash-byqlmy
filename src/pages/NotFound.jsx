import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function NotFound() {
  // Icon components
  const HomeIcon = getIcon('Home');
  const AlertCircleIcon = getIcon('AlertCircle');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[70vh] flex flex-col justify-center items-center text-center px-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="mb-8"
      >
        <div className="flex justify-center">
          <div className="p-6 bg-surface-100 dark:bg-surface-800 rounded-full">
            <AlertCircleIcon className="w-16 h-16 text-primary" />
          </div>
        </div>
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-4xl md:text-5xl font-bold mb-4"
      >
        Page Not Found
      </motion.h1>
      
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-lg text-surface-600 dark:text-surface-400 mb-8 max-w-md"
      >
        The page you are looking for doesn't exist or has been moved.
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link 
          to="/" 
          className="btn btn-primary flex items-center gap-2 px-6 py-3"
        >
          <HomeIcon className="w-5 h-5" />
          Return Home
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default NotFound;