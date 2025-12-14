'use client';
import { useEffect, useRef, useState } from 'react';

type PageFlipProps = {
  images?: string[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
};

export default function PageFlipAnimation({
  images = [
    '/images/notebook/notebook-01.png',
    '/images/notebook/notebook-02.png',
    '/images/notebook/notebook-03.png',
  ],
  autoPlay = true,
  interval = 3000,
  className = '',
}: PageFlipProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!autoPlay || reduceMotion || images.length <= 1) return;

    const timer = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => (prev + 1) % images.length);
        setIsFlipping(false);
      }, 600); // Match animation duration
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length, reduceMotion]);

  const goToPage = (index: number) => {
    if (index === currentPage || isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage(index);
      setIsFlipping(false);
    }, 600);
  };

  return (
    <div
      ref={containerRef}
      className={`relative perspective-1000 ${className}`}
      style={{ perspective: '1000px' }}
    >
      {/* Book container */}
      <div className="relative w-full aspect-[4/3] max-w-md mx-auto">
        {/* Pages */}
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-600 ease-in-out transform-gpu ${
              idx === currentPage
                ? 'opacity-100 z-10'
                : idx < currentPage
                ? 'opacity-0 -translate-x-4 z-0'
                : 'opacity-0 translate-x-4 z-0'
            } ${isFlipping && idx === currentPage ? 'animate-page-flip' : ''}`}
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
          >
            <img
              src={img}
              alt={`Page ${idx + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-xl"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Page flip shadow effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none rounded-lg transition-opacity duration-300 ${
            isFlipping ? 'opacity-50' : 'opacity-0'
          }`}
        />
      </div>

      {/* Navigation dots */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToPage(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === currentPage
                  ? 'bg-brand-pink scale-125'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to page ${idx + 1}`}
              aria-current={idx === currentPage ? 'true' : 'false'}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes page-flip {
          0% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(-90deg);
          }
          100% {
            transform: rotateY(0deg);
          }
        }
        .animate-page-flip {
          animation: page-flip 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
}
