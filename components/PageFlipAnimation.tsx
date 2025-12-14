'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

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
    '/images/notebook/notebook-04.png',
    '/images/notebook/notebook-05.png',
    '/images/notebook/notebook-06.png',
  ],
  autoPlay = true,
  interval = 4000,
  className = '',
}: PageFlipProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  // Check if we're on the cover (first page) or inside the book
  const isOnCover = currentPage === 0;

  // Go to next page (loops back to first when at the end)
  const goNext = useCallback(() => {
    if (isFlipping) return;
    setFlipDirection('next');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((prev) => (prev >= images.length - 1 ? 0 : prev + 1));
      setIsFlipping(false);
    }, 700);
  }, [isFlipping, images.length]);

  // Go to previous page
  const goPrev = useCallback(() => {
    if (isFlipping || currentPage <= 0) return;
    setFlipDirection('prev');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((prev) => prev - 1);
      setIsFlipping(false);
    }, 700);
  }, [isFlipping, currentPage]);

  // Auto-play (loop through pages)
  useEffect(() => {
    if (!autoPlay || reduceMotion || images.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      if (currentPage >= images.length - 1) {
        // Reset to first page (cover)
        setFlipDirection('prev');
        setIsFlipping(true);
        setTimeout(() => {
          setCurrentPage(0);
          setIsFlipping(false);
        }, 700);
      } else {
        goNext();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length, reduceMotion, isHovered, currentPage, goNext]);

  // Click handler
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const halfWidth = rect.width / 2;

    if (clickX < halfWidth) {
      goPrev();
    } else {
      goNext();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  // Determine which animation to use - all pages flip from center
  const getFlipAnimation = () => {
    if (flipDirection === 'next') {
      return 'animate-flip-center-next';
    }
    return 'animate-flip-center-prev';
  };

  const getFlipOrigin = () => {
    // All pages flip from center
    return 'center center';
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Book container */}
      <div 
        className="relative w-full max-w-2xl mx-auto cursor-pointer group"
        style={{ 
          aspectRatio: '4/3',
          minHeight: '300px',
          perspective: '1500px',
        }}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Click to flip pages"
      >
        {/* Book spine shadow - only visible when book is open (not on cover) */}
        {!isOnCover && (
          <div className="absolute left-1/2 top-0 bottom-0 w-6 -translate-x-1/2 bg-gradient-to-r from-black/20 via-black/30 to-black/20 z-20 pointer-events-none rounded-sm" />
        )}
        
        {/* Pages stack effect */}
        <div className="absolute inset-0 rounded-lg bg-white/5 transform translate-x-1 translate-y-1" />
        <div className="absolute inset-0 rounded-lg bg-white/8 transform translate-x-0.5 translate-y-0.5" />

        {/* Base layer - shows the destination page */}
        <div className="absolute inset-0">
          <img
            src={images[
              isFlipping 
                ? (flipDirection === 'next' 
                    ? Math.min(currentPage + 1, images.length - 1) 
                    : Math.max(currentPage - 1, 0))
                : currentPage
            ]}
            alt={`Page ${currentPage + 1}`}
            className="w-full h-full object-contain rounded-lg shadow-xl"
          />
        </div>

        {/* Flipping page animation */}
        {isFlipping && (
          <div
            className={`absolute inset-0 ${getFlipAnimation()}`}
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: getFlipOrigin(),
            }}
          >
            {/* Front of flipping page */}
            <div 
              className="absolute inset-0"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <img
                src={images[currentPage]}
                alt=""
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              />
              {/* Dynamic shadow based on flip type */}
              <div className={`absolute inset-0 rounded-lg transition-opacity ${
                isOnCover 
                  ? 'bg-gradient-to-l from-transparent to-black/30' 
                  : 'bg-gradient-to-r from-black/20 via-transparent to-black/20'
              }`} />
            </div>
            
            {/* Back of flipping page */}
            <div 
              className="absolute inset-0"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <img
                src={images[flipDirection === 'next' ? Math.min(currentPage + 1, images.length - 1) : Math.max(currentPage - 1, 0)]}
                alt=""
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        )}

        {/* Hover hints */}
        <div className="absolute inset-0 flex pointer-events-none">
          {/* Left arrow hint */}
          <div className={`flex-1 flex items-center justify-start pl-4 transition-opacity duration-300 ${
            currentPage > 0 ? 'group-hover:opacity-100 opacity-0' : 'opacity-0'
          }`}>
            <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </div>
          {/* Right arrow hint */}
          <div className={`flex-1 flex items-center justify-end pr-4 transition-opacity duration-300 ${
            currentPage < images.length - 1 ? 'group-hover:opacity-100 opacity-0' : 'opacity-0'
          }`}>
            <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Page curl hint on cover */}
        {isOnCover && !isFlipping && (
          <div className="absolute bottom-4 right-4 w-12 h-12 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-full h-full bg-gradient-to-tl from-white/30 to-transparent rounded-tl-full animate-pulse" />
          </div>
        )}
      </div>

      {/* Navigation dots */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                if (idx === currentPage || isFlipping) return;
                setFlipDirection(idx > currentPage ? 'next' : 'prev');
                setIsFlipping(true);
                setTimeout(() => {
                  setCurrentPage(idx);
                  setIsFlipping(false);
                }, 700);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentPage
                  ? 'bg-brand-pink w-6'
                  : 'bg-white/30 hover:bg-white/50 w-2'
              }`}
              aria-label={idx === 0 ? 'Go to cover' : `Go to page ${idx}`}
              aria-current={idx === currentPage ? 'true' : 'false'}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        /* Cover opens from left edge (like opening a book) */
        @keyframes flip-cover-open {
          0% {
            transform: perspective(1500px) rotateY(0deg);
          }
          100% {
            transform: perspective(1500px) rotateY(-180deg);
          }
        }
        
        /* Cover closes back (going back to cover) */
        @keyframes flip-cover-close {
          0% {
            transform: perspective(1500px) rotateY(-180deg);
          }
          100% {
            transform: perspective(1500px) rotateY(0deg);
          }
        }
        
        /* Inside pages flip from center - next */
        @keyframes flip-center-next {
          0% {
            transform: perspective(1500px) rotateY(0deg) scale(1);
          }
          50% {
            transform: perspective(1500px) rotateY(-90deg) scale(1.05);
          }
          100% {
            transform: perspective(1500px) rotateY(-180deg) scale(1);
          }
        }
        
        /* Inside pages flip from center - prev */
        @keyframes flip-center-prev {
          0% {
            transform: perspective(1500px) rotateY(-180deg) scale(1);
          }
          50% {
            transform: perspective(1500px) rotateY(-90deg) scale(1.05);
          }
          100% {
            transform: perspective(1500px) rotateY(0deg) scale(1);
          }
        }
        
        .animate-flip-cover-open {
          animation: flip-cover-open 0.7s ease-in-out forwards;
          transform-origin: left center;
        }
        
        .animate-flip-cover-close {
          animation: flip-cover-close 0.7s ease-in-out forwards;
          transform-origin: left center;
        }
        
        .animate-flip-center-next {
          animation: flip-center-next 0.7s ease-in-out forwards;
          transform-origin: center center;
        }
        
        .animate-flip-center-prev {
          animation: flip-center-prev 0.7s ease-in-out forwards;
          transform-origin: center center;
        }
      `}</style>
    </div>
  );
}
