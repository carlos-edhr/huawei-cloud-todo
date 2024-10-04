"use client"
import React, { useState } from 'react';

interface MoreInformationProps {
  title: string;
  images: string[];
}

const MoreInformation: React.FC<MoreInformationProps> = ({ title, images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Carousel controls
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Open modal and show clicked image
  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Set current image based on clicked thumbnail
  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <section className="w-full py-16 lg:py-32 bg-black text-white">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">{title}</h2>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          
          {/* Large Box 1: Image Carousel */}
          <div className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src={images[currentImageIndex]}
                alt={`Slide ${currentImageIndex + 1}`}
                className="w-full h-64 object-cover cursor-pointer"
                onClick={() => openModal(currentImageIndex)} // Open modal on click
              />
              {/* Carousel Controls */}
              <button
                onClick={prevImage}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-900 bg-opacity-75 hover:bg-opacity-100 p-2 rounded-full text-white shadow-lg"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-900 bg-opacity-75 hover:bg-opacity-100 p-2 rounded-full text-white shadow-lg"
              >
                ›
              </button>
            </div>
          </div>

          {/* Other Bento Boxes */}
          {/* Box 2: Text Content */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
              <p className="text-gray-400">
                At the core of our design philosophy is simplicity, elegance, and
                functionality. We believe that less is more, and every product is
                designed with a user-first approach.
              </p>
            </div>
          </div>

          {/* Box 3: Video Element */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg overflow-hidden">
            <video
              className="w-full h-64 object-cover rounded-lg"
              controls
              poster="https://source.unsplash.com/random/400x300?tech"
            >
              <source
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Box 4: Large Image Element */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg overflow-hidden col-span-1 xl:col-span-2">
            <img
              src="https://source.unsplash.com/random/800x400?technology"
              alt="Technology"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Box 5: Text Content */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Why Us</h3>
            <p className="text-gray-400">
              Our products are designed with care and precision, ensuring every
              detail is considered. Our commitment to sustainability and innovation
              sets us apart from the competition.
            </p>
          </div>

        </div>
      </div>

      {/* Modal for Image Carousel */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center flex-col">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-3xl focus:outline-none"
            >
              &times;
            </button>
            <img
              src={images[currentImageIndex]}
              alt={`Slide ${currentImageIndex + 1}`}
              className="w-full h-auto max-h-screen object-contain"
            />
            {/* Modal Carousel Controls */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-900 bg-opacity-75 hover:bg-opacity-100 p-3 rounded-full text-white shadow-lg"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-900 bg-opacity-75 hover:bg-opacity-100 p-3 rounded-full text-white shadow-lg"
            >
              ›
            </button>
          </div>

          {/* Thumbnails below main image */}
          <div className="flex mt-6 space-x-4 overflow-x-auto">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`w-24 h-24 object-cover cursor-pointer rounded-lg ${
                  currentImageIndex === index ? 'ring-2 ring-white' : ''
                }`}
                onClick={() => selectImage(index)}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default MoreInformation;

