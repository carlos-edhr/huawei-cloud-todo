"use client"
import React, { useState, useEffect } from 'react';
import "./hero-section.css"
// Define an array of background images
const images = [
  'https://images.unsplash.com/photo-1710248350381-47f234a19a19?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1695562692497-9675bf2a538a?q=80&w=1967&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1701041778885-bef28a5f05af?q=80&w=2005&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1493243391685-aa64043dfd41?q=80&w=1988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1695890385992-920f6917d256?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  "https://images.unsplash.com/photo-1717337714726-79fbda2a4ea4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1623989374438-fad3190d22eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

// Define an array of hero titles
const titles = [
    'Capturing Moments',
    'Telling Stories with Light',
    'Freezing Time',
    'Memories in Focus',
    'The World Through My Lens',
    'Emotions in Every Frame',
  ];
  
  const HeroSection: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [currentTitleIndex, setCurrentTitleIndex] = useState<number>(0);
    const [currentText, setCurrentText] = useState<string>('');
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [typingSpeed, setTypingSpeed] = useState<number>(150); // Typing speed in ms
    const [fade, setFade] = useState<boolean>(false); // Background fade
  
    // Preload all background images to avoid flickering
    useEffect(() => {
      images.forEach((image) => {
        const img = new Image();
        img.src = image;
      });
    }, []);
  
    // Change background image every 8 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        setFade(true); // Start fading out
        setTimeout(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
          setFade(false); // Fade in the new image
        }, 500); // Half-second for the fade-out before changing the image
      }, 8000);
      return () => clearInterval(interval);
    }, []);
  
    // Typing and deleting logic for hero title
    useEffect(() => {
      const handleTyping = () => {
        const fullText = titles[currentTitleIndex];
        if (!isDeleting) {
          // Typing phase
          setCurrentText((prev) => fullText.substring(0, prev.length + 1));
          if (currentText === fullText) {
            setTimeout(() => setIsDeleting(true), 2000); // Pause before deleting
          }
        } else {
          // Deleting phase
          setCurrentText((prev) => fullText.substring(0, prev.length - 1));
          if (currentText === '') {
            setIsDeleting(false);
            setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
          }
        }
        setTypingSpeed(isDeleting ? 100 : 150);
      };
  
      const typingTimer = setTimeout(handleTyping, typingSpeed);
      return () => clearTimeout(typingTimer);
    }, [currentText, isDeleting, currentTitleIndex, typingSpeed]);
  
    return (
      <div className="relative w-full h-screen bg-cover bg-center">
        {/* Background Image with Smooth Transition */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            fade ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            backgroundImage: `url(${images[currentImageIndex]})`,
          }}
        ></div>
  
        {/* Navigation Bar */}
        <nav className="absolute top-0 w-full flex justify-between items-center p-6 z-10">
          <h1 className="text-white text-3xl font-bold">Photography Portfolio</h1>
          <ul className="flex space-x-8">
            <li>
              <a href="#home" className="text-white text-lg hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#portfolio" className="text-white text-lg hover:underline">
                Portfolio
              </a>
            </li>
            <li>
              <a href="#contact" className="text-white text-lg hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </nav>
  
        {/* Hero Title in Bottom-Left with Typewriter Effect and Blinking Caret */}
        <div className="absolute bottom-8 left-8 z-10">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider typewriter">
            {currentText}
            {/* <span className="blinking-caret"></span> */}
          </h1>
        </div>
  
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
      </div>
    );
  };
  
  export default HeroSection;
  
  