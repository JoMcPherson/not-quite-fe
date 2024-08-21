import React, { useEffect, useState } from "react";
import { sports } from "../assets/slideshowsports";

const Slideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sports.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [sports.length]);

  return (
    <div className="relative w-full h-[600px]  overflow-hidden rounded-lg shadow-lg">
      {sports.map((sport, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={`/images/${sport.toLowerCase().replace(/\s+/g, "_")}.jpeg`} // Path to the images
            alt={sport}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 mb-2">
        {sports.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            } transition-colors duration-300`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
