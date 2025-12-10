import { useState } from 'react';

interface ClosedBookProps {
  onOpen: () => void;
}

const ClosedBook = ({ onOpen }: ClosedBookProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Book Container */}
      <div
        className={`book-perspective cursor-pointer transition-all duration-500 ${
          isOpening ? 'animate-book-open' : ''
        }`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={handleClick}
      >
        {/* 3D Book */}
        <div
          className={`relative transition-all duration-500 ${
            isHovering && !isOpening ? 'scale-105' : 'scale-100'
          } ${isHovering ? 'shadow-book-hover' : 'shadow-book'} ${
            isHovering ? 'animate-glow-pulse' : ''
          }`}
          style={{
            width: 'min(320px, 85vw)',
            height: 'min(420px, 70vh)',
            transformStyle: 'preserve-3d',
            transform: isHovering && !isOpening ? 'rotateY(-5deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Book Spine */}
          <div
            className="absolute left-0 top-0 h-full w-8 bg-book-spine rounded-l-md"
            style={{
              transform: 'translateX(-50%) rotateY(-90deg)',
              transformOrigin: 'right center',
            }}
          />

          {/* Book Cover */}
          <div className="absolute inset-0 rounded-r-lg rounded-l-sm bg-gradient-to-br from-book-brown via-book-spine to-book-brown overflow-hidden">
            {/* Cover Decoration */}
            <div className="absolute inset-4 border-2 border-rose/30 rounded-lg" />
            <div className="absolute inset-6 border border-rose/20 rounded-lg" />

            {/* Cover Pattern */}
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute text-rose"
                  style={{
                    left: `${(i % 5) * 25}%`,
                    top: `${Math.floor(i / 5) * 25}%`,
                    fontSize: '24px',
                    transform: 'rotate(-15deg)',
                  }}
                >
                  ♥
                </div>
              ))}
            </div>

            {/* Title Area */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              {/* Heart Emblem */}
              <div className="mb-6 text-5xl text-rose drop-shadow-lg animate-gentle-bounce">
                💕
              </div>

              {/* Main Title */}
              <h1 className="font-handwritten text-4xl md:text-5xl text-page-cream mb-4 drop-shadow-md leading-tight">
                สุขสันต์วันเกิดนะครับ
              </h1>

              {/* Subtitle */}
              <p className="font-sarabun text-lg md:text-xl text-rose-glow/90 font-light tracking-wide">
                สมุดเล่มเล็กของเรื่องราวเรา
              </p>

              {/* Decorative Line */}
              <div className="mt-6 w-24 h-0.5 bg-gradient-to-r from-transparent via-rose to-transparent rounded-full" />
            </div>

            {/* Bottom Ribbon Decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-book-brown/50 to-transparent" />
          </div>

          {/* Page Edges (visible on right side) */}
          <div
            className="absolute top-2 bottom-2 right-0 w-3 bg-gradient-to-r from-page-cream to-page-shadow rounded-r-sm"
            style={{
              transform: 'translateX(100%)',
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 h-px bg-page-shadow/30"
                style={{ top: `${(i + 1) * 12}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={handleClick}
        disabled={isOpening}
        className={`mt-10 px-8 py-4 bg-gradient-to-r from-rose to-soft-pink text-primary-foreground font-sarabun text-lg rounded-full shadow-lg transition-all duration-300 ${
          isOpening
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:shadow-xl hover:scale-105 hover:from-soft-pink hover:to-rose active:scale-95'
        }`}
      >
        <span className="flex items-center gap-2">
          เริ่มเปิดเรื่องราว
          <span className="text-xl">📖</span>
        </span>
      </button>

      {/* Hint Text */}
      <p className="mt-4 text-muted-foreground text-sm font-light animate-pulse">
        คลิกที่หนังสือหรือปุ่มเพื่อเปิด
      </p>
    </div>
  );
};

export default ClosedBook;
