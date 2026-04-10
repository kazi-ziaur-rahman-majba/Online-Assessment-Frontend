"use client";
import React, { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { MotionDiv } from "@/utils/framer.motion";

interface Client {
  id: number;
  name: string;
  country: string;
  image: string;
}

const clients: Client[] = [
  {
    id: 1,
    name: "John Smith",
    country: "Canada",
    image:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 2,
    name: "Maria Garcia",
    country: "Spain",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 3,
    name: "David Johnson",
    country: "Australia",
    image:
      "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 4,
    name: "Sarah Chen",
    country: "Singapore",
    image:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 5,
    name: "Ahmed Hassan",
    country: "UAE",
    image:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 6,
    name: "Elena Petrov",
    country: "Germany",
    image:
      "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 7,
    name: "Michael Brown",
    country: "UK",
    image:
      "https://images.pexels.com/photos/936126/pexels-photo-936126.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 8,
    name: "Yuki Tanaka",
    country: "Japan",
    image:
      "https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

function GalleryPageUI() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0 ? clients.length - 1 : selectedImageIndex - 1
      );
    }
  };

  const goToNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === clients.length - 1 ? 0 : selectedImageIndex + 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
       <MotionDiv>
       <h2 className="text-4xl font-bold text-blue-900 mb-6">Visa</h2>
       </MotionDiv>
         <MotionDiv>
         <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Celebrating the success of our clients! Here are a few of the many
            individuals who have achieved their dreams with our expert guidance
            and support. From securing student visas to obtaining work permits,
            our dedicated team has helped numerous clients embark on their
            journeys abroad.
          </p>
         </MotionDiv>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {clients.map((client, index) => (
            <div
              key={client.id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => handleImageClick(index)}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={client.image}
                    alt={client.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    width={200}
                    height={200}
                  />
                </div>
                <MotionDiv className="p-4 text-center">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {client.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{client.country}</p>
                </MotionDiv>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm"></div>
          <div
            className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>

            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>

            <div className="aspect-square relative overflow-hidden">
              <Image
                src={clients[selectedImageIndex].image}
                alt={clients[selectedImageIndex].name}
                className="w-full h-full object-cover transition-all duration-300"
                width={150}
                height={150}
              />
            </div>

            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {clients[selectedImageIndex].name}
              </h3>
              <p className="text-gray-600 text-lg mb-2">
                {clients[selectedImageIndex].country}
              </p>
              <p className="text-gray-500 mt-4">
                Successfully achieved their visa dreams with BanglaBriz expert
                guidance and support.
              </p>

              {/* Image Counter */}
              <div className="flex justify-center items-center mt-4 space-x-2">
                <span className="text-sm text-gray-500">
                  {selectedImageIndex + 1} of {clients.length}
                </span>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center items-center mt-4 space-x-2">
                {clients.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === selectedImageIndex
                        ? "bg-blue-900 w-6"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryPageUI;
