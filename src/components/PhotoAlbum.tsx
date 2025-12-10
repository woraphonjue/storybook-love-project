import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Confetti from './Confetti';

interface AlbumPage {
  id: number;
  type: 'memory' | 'final';
  title?: string;
  photos?: {
    id: number;
    placeholder: string;
    caption: string;
    rotation: number;
  }[];
  message?: {
    headline: string;
    subtitle: string;
  };
}

// Album content - easily customizable
const albumPages: AlbumPage[] = [
  {
    id: 1,
    type: 'memory',
    title: 'Memory',
    photos: [
      { id: 1, placeholder: 'รูปที่ 1', caption: '', rotation: -3 },
      { id: 2, placeholder: 'รูปที่ 2', caption: '', rotation: 2 },
      { id: 3, placeholder: 'รูปที่ 3', caption: '', rotation: 1 },
      { id: 4, placeholder: 'รูปที่ 4', caption: '', rotation: -2 },
    ],
  },
  {
    id: 2,
    type: 'memory',
    title: 'Memory',
    photos: [
      { id: 5, placeholder: 'รูปที่ 5', caption: '', rotation: 2 },
      { id: 6, placeholder: 'รูปที่ 6', caption: '', rotation: -1 },
      { id: 7, placeholder: 'รูปที่ 7', caption: '', rotation: -3 },
      { id: 8, placeholder: 'รูปที่ 8', caption: '', rotation: 1 },
    ],
  },
  {
    id: 3,
    type: 'memory',
    title: 'Memory',
    photos: [
      { id: 9, placeholder: 'รูปที่ 9', caption: '', rotation: 1 },
      { id: 10, placeholder: 'รูปที่ 10', caption: '', rotation: -2 },
      { id: 11, placeholder: 'รูปที่ 11', caption: '', rotation: 2 },
      { id: 12, placeholder: 'รูปที่ 12', caption: '', rotation: -1 },
    ],
  },
  {
    id: 4,
    type: 'final',
    message: {
      headline: 'แฮปปี้เบิร์ดเดย์ ครับท่านแม่',
      subtitle: '#ธนาคารส่วนตัว #ไม่มีบอกไม่พอเบิก 🎂💖',
    },
  },
];

interface PhotoAlbumProps {
  onRestart: () => void;
}

const PhotoAlbum = ({ onRestart }: PhotoAlbumProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'left' | 'right'>('right');
  const [showConfetti, setShowConfetti] = useState(false);

  const totalPages = albumPages.length;
  const currentContent = albumPages[currentPage];
  const isFinalPage = currentContent.type === 'final';

  const goToNextPage = () => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setFlipDirection('right');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setIsFlipping(false);
        // Show confetti on final page
        if (currentPage + 1 === totalPages - 1) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 4000);
        }
      }, 600);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setFlipDirection('left');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      {showConfetti && <Confetti />}

      {/* Album Header */}
      <h2 className="font-handwritten text-3xl md:text-4xl text-foreground mb-6 md:mb-8 animate-fade-slide-up">
        {currentContent.title || '💕'}
      </h2>

      {/* Open Book Container */}
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Book Base Shadow */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] h-8 bg-book-brown/20 blur-xl rounded-full" />

        {/* Open Book */}
        <div
          className={`relative bg-page-cream rounded-lg shadow-book overflow-hidden transition-transform duration-300 ${
            isFlipping
              ? flipDirection === 'right'
                ? 'animate-page-turn-right'
                : 'animate-page-turn-left'
              : ''
          }`}
          style={{
            aspectRatio: '16/10',
            maxHeight: '70vh',
          }}
        >
          {/* Book Spine (center) */}
          <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-4 bg-gradient-to-r from-page-shadow via-book-spine/20 to-page-shadow z-10" />

          {/* Page Content */}
          {currentContent.type === 'memory' ? (
            <div className="grid grid-cols-2 h-full">
              {/* Left Page - 2 photos */}
              <div className="page-texture p-3 md:p-6 flex flex-col items-center justify-center gap-3 md:gap-4 border-r border-page-shadow/20">
                {currentContent.photos?.slice(0, 2).map((photo) => (
                  <div
                    key={photo.id}
                    className="photo-tape bg-card p-1.5 md:p-2 shadow-photo transform transition-transform duration-300 hover:scale-105"
                    style={{
                      transform: `rotate(${photo.rotation}deg)`,
                    }}
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-muted flex items-center justify-center rounded-sm">
                      <span className="text-muted-foreground font-sarabun text-xs md:text-sm">
                        {photo.placeholder}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Page - 2 photos */}
              <div className="page-texture p-3 md:p-6 flex flex-col items-center justify-center gap-3 md:gap-4">
                {currentContent.photos?.slice(2, 4).map((photo) => (
                  <div
                    key={photo.id}
                    className="photo-tape bg-card p-1.5 md:p-2 shadow-photo transform transition-transform duration-300 hover:scale-105"
                    style={{
                      transform: `rotate(${photo.rotation}deg)`,
                    }}
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-muted flex items-center justify-center rounded-sm">
                      <span className="text-muted-foreground font-sarabun text-xs md:text-sm">
                        {photo.placeholder}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Final Birthday Message Page */
            <div className="page-texture h-full flex flex-col items-center justify-center text-center p-6 md:p-12 relative overflow-hidden">
              {/* Sparkle Decorations */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-rose animate-sparkle"
                    style={{
                      left: `${10 + (i % 6) * 15}%`,
                      top: `${15 + Math.floor(i / 6) * 70}%`,
                      fontSize: '20px',
                      animationDelay: `${i * 0.2}s`,
                    }}
                  >
                    ✨
                  </div>
                ))}
              </div>

              {/* Main Message */}
              <div className="relative z-10">
                <div className="text-6xl md:text-7xl mb-6">🎂</div>
                <h2 className="font-handwritten text-3xl md:text-5xl lg:text-6xl text-foreground mb-4 leading-tight">
                  {currentContent.message?.headline}
                </h2>
                <p className="font-sarabun text-lg md:text-xl text-rose mb-8">
                  {currentContent.message?.subtitle}
                </p>

                {/* Hearts Line */}
                <div className="flex items-center justify-center gap-2 mb-8">
                  <span className="text-2xl text-rose">💕</span>
                  <div className="w-16 h-0.5 bg-rose/40 rounded-full" />
                  <span className="text-2xl text-rose">💕</span>
                  <div className="w-16 h-0.5 bg-rose/40 rounded-full" />
                  <span className="text-2xl text-rose">💕</span>
                </div>

                {/* Restart Button */}
                <button
                  onClick={onRestart}
                  className="px-6 py-3 bg-gradient-to-r from-rose to-soft-pink text-primary-foreground font-sarabun rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  <span className="flex items-center gap-2">
                    อ่านอีกรอบ
                    <span>💕</span>
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Page Number */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-muted-foreground/60 font-sarabun text-sm">
            {currentPage + 1} / {totalPages}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center justify-center gap-8 mt-8">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 0 || isFlipping}
          className={`p-3 md:p-4 rounded-full bg-card shadow-lg transition-all duration-300 ${
            currentPage === 0 || isFlipping
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-soft-pink/30 hover:shadow-xl hover:scale-110 active:scale-95'
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-foreground" />
        </button>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1 || isFlipping}
          className={`p-3 md:p-4 rounded-full bg-card shadow-lg transition-all duration-300 ${
            currentPage === totalPages - 1 || isFlipping
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-soft-pink/30 hover:shadow-xl hover:scale-110 active:scale-95'
          }`}
          aria-label="Next page"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-foreground" />
        </button>
      </div>

      {/* Navigation Hint */}
      {!isFinalPage && (
        <p className="mt-4 text-muted-foreground text-sm font-light">
          ใช้ลูกศรเพื่อพลิกหน้า
        </p>
      )}
    </div>
  );
};

export default PhotoAlbum;
