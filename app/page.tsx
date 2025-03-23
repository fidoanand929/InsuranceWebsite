'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import '@fontsource/inter';

export default function Home() {
  const mainOptions = [
    {
      title: 'Products',
      description: 'Explore our financing solutions for vehicles and fuel',
      href: '/products',
      gradient: 'from-blue-500 to-cyan-500',
      image: '/images/doodles/truck-doodle.svg'
    },
    {
      title: 'Insurance',
      description: 'Protect your assets with our insurance options',
      href: '/insurance',
      gradient: 'from-purple-500 to-pink-500',
      image: '/images/doodles/shield-doodle.svg'
    },
    {
      title: 'EMI Calculator',
      description: 'Plan your finances with our easy-to-use calculator',
      href: '/emi-calculator',
      gradient: 'from-green-500 to-emerald-500',
      image: '/images/doodles/calculator-doodle.svg'
    },
    {
      title: 'Contact Us',
      description: 'Get in touch with our team for assistance',
      href: '/contact',
      gradient: 'from-orange-500 to-amber-500',
      image: '/images/doodles/contact-doodle.svg'
    }
  ];

  // For the main heading hover effect
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [headingPosition, setHeadingPosition] = useState({ x: 0, y: 0 });
  const [isHeadingHovered, setIsHeadingHovered] = useState(false);

  // Handle heading hover effects
  const handleHeadingMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (!headingRef.current) return;
    
    const rect = headingRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setHeadingPosition({ x, y });
  };

  return (
    <div className="min-h-screen flex flex-col font-['Inter'] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" />
        
        {/* Animated gradient blobs */}
        <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-300/30 dark:bg-purple-900/20 rounded-full filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute top-60 -right-20 w-96 h-96 bg-yellow-300/30 dark:bg-yellow-900/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-pink-300/30 dark:bg-pink-900/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
        <div className="absolute -bottom-40 right-40 w-96 h-96 bg-blue-300/30 dark:bg-blue-900/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-6000" />
      </div>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 
            ref={headingRef}
            className="text-5xl font-bold tracking-tight sm:text-7xl font-['Poppins'] drop-shadow-sm relative"
            onMouseMove={handleHeadingMouseMove}
            onMouseEnter={() => setIsHeadingHovered(true)}
            onMouseLeave={() => setIsHeadingHovered(false)}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent z-0">
              Welcome to FinanceHub
            </span>
            
            {/* Interactive gradient overlay that follows mouse */}
            <span 
              className={`absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent transition-opacity duration-300 z-10 ${isHeadingHovered ? 'opacity-100' : 'opacity-0'}`}
              style={{
                backgroundPosition: `${headingPosition.x * 100}% ${headingPosition.y * 100}%`,
                backgroundSize: '200% 200%'
              }}
            >
              Welcome to FinanceHub
            </span>

            {/* Text for layout purposes - transparent */}
            <span className="invisible">
              Welcome to FinanceHub
            </span>
          </h1>
          
          <motion.p 
            className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Your one-stop solution for financing and insurance needs.
          </motion.p>
        </motion.div>

        {/* Main Options */}
        <div className="mt-16 w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mainOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 + 0.5 }}
              >
                <Link
                  href={option.href}
                  className="block group"
                >
                  <CardWithEffect 
                    title={option.title} 
                    description={option.description} 
                    image={option.image} 
                    gradient={option.gradient}
                    index={index}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Footer Section */}
        <motion.div 
          className="mt-16 w-full max-w-6xl text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2023 FinanceHub. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// Card component with special effects
function CardWithEffect({ title, description, image, gradient, index }: { 
  title: string; 
  description: string; 
  image: string; 
  gradient: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation values based on index for staggered light animation
  const lightDelay = index * 2;
  const lightDuration = 6;
  
  // Track mouse position for the spotlight effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setPosition({ x, y });
  };
  
  return (
    <div 
      ref={cardRef}
      className="relative h-full rounded-2xl"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Light effects container */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
        {/* Edge light effect that moves in a loop */}
        <div 
          className={`absolute inset-px bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500`}
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, black, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black, transparent)',
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              animation: `edgeLight ${lightDuration}s linear infinite ${lightDelay}s`,
            }}
          />
        </div>
        
        {/* Radial spotlight effect that follows the mouse */}
        {isHovered && (
          <div 
            className="absolute inset-0 opacity-70 transition-opacity duration-500 overflow-hidden"
            style={{
              background: `radial-gradient(600px circle at ${position.x * 100}% ${position.y * 100}%, rgba(255,255,255,0.06), transparent 40%)`,
            }}
          />
        )}
      </div>
      
      {/* Card content */}
      <div className="relative h-full z-10 backdrop-blur-sm bg-white/80 dark:bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 p-6 transform group-hover:-translate-y-2">
        <div className="relative h-32 w-full mb-4">
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain dark:filter dark:brightness-200 transition-transform duration-300 group-hover:scale-110"
            />
          )}
        </div>
        <h2 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${gradient} bg-clip-text text-transparent font-['Poppins']`}>
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>
        <motion.span 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 group-hover:text-blue-500"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Explore 
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.span>
      </div>
    </div>
  );
}

// Add more CSS for the animated background
const css = `
@keyframes edgeLight {
  0% {
    left: -100%;
    top: 0;
    width: 30%;
    height: 2px;
  }
  25% {
    left: 100%;
    top: 0;
    width: 30%;
    height: 2px;
  }
  26% {
    left: 100%;
    top: 0;
    width: 2px;
    height: 30%;
  }
  50% {
    left: 100%;
    top: 100%;
    width: 2px;
    height: 30%;
  }
  51% {
    left: 100%;
    top: 100%;
    width: 30%;
    height: 2px;
  }
  75% {
    left: -30%;
    top: 100%;
    width: 30%;
    height: 2px;
  }
  76% {
    left: 0;
    top: 100%;
    width: 2px;
    height: 30%;
  }
  100% {
    left: 0;
    top: -30%;
    width: 2px;
    height: 30%;
  }
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 20s infinite alternate;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animation-delay-6000 {
  animation-delay: 6s;
}
`;

// Add the CSS to the document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
} 