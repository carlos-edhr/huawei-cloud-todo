
import React from 'react';
import Spline from '@splinetool/react-spline/next';

interface DescriptionSectionProps {
  title: string;
  description: string;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ title, description }) => {
  return (
    <section className="relative w-full py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Side: Text Section (Always on the left on larger screens) */}
        <div className="lg:w-1/2 w-full lg:pr-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4 z-20">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed z-20">
            {description}
          </p>
        </div>

        {/* Right Side: 3D Model Placeholder (on the right on larger screens, above the text on mobile) */}
        <div className="lg:w-full w-full h-full lg:pl-8 flex items-center justify-center  mb-8 lg:mb-0 z-0">
        <Spline
        
        scene="https://prod.spline.design/F7YcvtNTK7u6Mhdf/scene.splinecode" 
      />
       
         
          {/* <div className="relative h-full lg:h-auto w-full lg:w-full max-w-full lg:max-w-xl pointer-events-none z-0">
         
    
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default DescriptionSection;
