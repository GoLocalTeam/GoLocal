import React, { useRef, useState } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';

const MagneticCard = ({ children }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useAnimationFrame(() => {
    if (!isHovered || !ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = position.x - centerX;
    const mouseY = position.y - centerY;
    
    ref.current.style.transform = `translate(${mouseX * 0.1}px, ${mouseY * 0.1}px)`;
  });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (ref.current) {
      ref.current.style.transform = 'translate(0px, 0px)';
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="transition-transform duration-100 ease-out"
    >
      {children}
    </motion.div>
  );
};

export default MagneticCard;
