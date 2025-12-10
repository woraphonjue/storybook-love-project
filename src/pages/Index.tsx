import { useState } from 'react';
import FloatingHearts from '@/components/FloatingHearts';
import Sparkles from '@/components/Sparkles';
import ClosedBook from '@/components/ClosedBook';
import PhotoAlbum from '@/components/PhotoAlbum';

const Index = () => {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleOpenBook = () => {
    setIsBookOpen(true);
    // Delay showing album content for smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 300);
  };

  const handleRestart = () => {
    setShowContent(false);
    setIsBookOpen(false);
  };

  return (
    <main className="min-h-screen bg-romantic-gradient relative overflow-hidden">
      {/* Background Effects */}
      <FloatingHearts />
      <Sparkles />

      {/* Main Content */}
      <div className="relative z-10">
        {!isBookOpen ? (
          <ClosedBook onOpen={handleOpenBook} />
        ) : showContent ? (
          <div className="animate-fade-slide-up">
            <PhotoAlbum onRestart={handleRestart} />
          </div>
        ) : (
          // Loading transition
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-4xl animate-gentle-bounce">💕</div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Index;
