import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RandomImage() {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    '/cosplayNul1.jpg',
    '/cosplayNul2.webp',
    '/cosplayNul3.webp',
    '/cosplayNul4.jpg',
    '/cosplayNul5.jpg',
  ];

  useEffect(() => {
    const showImage = () => {
      const x = Math.random() * (window.innerWidth - 300);
      const y = Math.random() * (window.innerHeight - 300);
      setPosition({ x, y });
      setIsVisible(true);
      setCurrentImage((prev) => (prev + 1) % images.length);

      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    };

    const interval = setInterval(showImage, 1000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1.5,
            x: position.x,
            y: position.y,
            rotate: Math.random() * 360
          }}
          exit={{ 
            opacity: 0, 
            scale: 0,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          }}
          transition={{ 
            type: "spring",
            duration: 0.5
          }}
          style={{
            position: 'fixed',
            zIndex: 9999,
            pointerEvents: 'none'
          }}
        >
          <img 
            src={images[currentImage]}
            alt={`Random Cosplay ${currentImage + 1}`}
            style={{
              width: '300px',
              height: '300px',
              objectFit: 'cover'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}