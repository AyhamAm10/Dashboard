import React, { useState } from 'react';
import { BiErrorAlt } from "react-icons/bi";
import { motion, AnimatePresence } from 'framer-motion';
type props = {
  msg:string | null,
  error : boolean | null
}
const Alert:React.FC<props> = ({ msg , error }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  const alertVariants = {
    hidden: { opacity: 0, x: 100 },  
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 }, 
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="relative rounded-xl shadow-lg transition-all p-4 w-fit px-12 sm:px-24"
          role="alert"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={alertVariants}
          transition={{ duration: 0.3, type: "spring", stiffness: 1000, damping: 30 }}
        >
          <div className="absolute inset-0 rounded-xl bg-white blur-sm  hover:blur-none"></div>
          <div className="relative flex items-start gap-4">
            {error ? (
              <span>
                <BiErrorAlt className="w-10 h-10 text-red" />
              </span>
            ) : (
              <span className="text-green">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            )}

            <div className="flex-1">
              <strong className={`block font-medium ${!error ? "text-green" : "text-red"}`}>
                {error ? "Process failed" : "Process successful"}
              </strong>
              <p className={`mt-1 text-sm ${!error ? "text-green" : "text-red"}`}>{msg}</p>
            </div>

            <button
              className="text-gray-500 transition hover:text-gray-600"
              onClick={handleClose}
            >
              <span className="sr-only">Dismiss popup</span>
              &times; {/* Close icon */}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;

