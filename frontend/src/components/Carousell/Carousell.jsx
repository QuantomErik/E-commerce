import React, { useEffect } from 'react';
import './Carousell.css'; // Ensure this file is created for custom styles if needed

function Carousell() {
  useEffect(() => {
    let currentIndex = 0;
    const items = document.querySelectorAll('[data-carousel-item]');
    const totalItems = items.length;

    function showItem(index) {
      items.forEach((item, i) => {
        item.classList.toggle('hidden', i !== index);
        item.classList.toggle('block', i === index);
      });
    }

    function nextItem() {
      currentIndex = (currentIndex + 1) % totalItems;
      showItem(currentIndex);
    }

    function prevItem() {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      showItem(currentIndex);
    }

    document.querySelector('[data-carousel-next]').addEventListener('click', nextItem);
    document.querySelector('[data-carousel-prev]').addEventListener('click', prevItem);

    showItem(currentIndex); // Show the first item initially
  }, []);

  return (
    <div className="carousel-container">
      <div id="gallery" className="relative w-full" data-carousel="slide">
        <div className="relative overflow-hidden">
          <div className="hidden duration-700 ease-in-out carousel-item" data-carousel-item>
            <img src="/ecommerce/images/sun.jpg" className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Image 1" />
          </div>
          <div className="hidden duration-700 ease-in-out carousel-item" data-carousel-item="active">
            <img src="/ecommerce/images/2.webp" className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Image 2" />
          </div>
          <div className="hidden duration-700 ease-in-out carousel-item" data-carousel-item>
            <img src="/ecommerce/images/purple-planet.jpg" className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Image 3" />
          </div>
          <div className="hidden duration-700 ease-in-out carousel-item" data-carousel-item>
            <img src="/ecommerce/images/purple-stars2jpg.jpg" className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Image 4" />
          </div>
          <div className="hidden duration-700 ease-in-out carousel-item" data-carousel-item>
            <img src="/ecommerce/images/1.webp" className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Image 5" />
          </div>
        </div>
        <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default Carousell;
