import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

interface AboutSlideshowProps {
  children: React.ReactNode[];
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const AboutSlideshow = ({ children }: AboutSlideshowProps) => {
  const location = useLocation();
  const initialSlide = location.state?.returnToSlide ?? 0;
  const [[currentSlide, direction], setSlide] = useState([initialSlide, 0]);
  const totalSlides = children.length;

  // Reset to the correct slide when returning from product page
  useEffect(() => {
    if (location.state?.returnToSlide !== undefined) {
      setSlide([location.state.returnToSlide, 0]);
    }
  }, [location.state?.returnToSlide]);

  const paginate = useCallback((newDirection: number) => {
    const nextSlide = currentSlide + newDirection;
    if (nextSlide >= 0 && nextSlide < totalSlides) {
      setSlide([nextSlide, newDirection]);
    }
  }, [currentSlide, totalSlides]);

  const goToSlide = useCallback((index: number) => {
    const newDirection = index > currentSlide ? 1 : -1;
    setSlide([index, newDirection]);
  }, [currentSlide]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Slide Content */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
          }}
          className="min-h-screen"
        >
          {children[currentSlide]}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls - Centered */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-3 bg-background/80 backdrop-blur-md px-5 py-2.5 rounded-full border shadow-lg">
        {/* Previous Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => paginate(-1)}
          disabled={currentSlide === 0}
          className="h-8 w-8 rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Slide Indicators */}
        <div className="flex items-center gap-1.5">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-6 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => paginate(1)}
          disabled={currentSlide === totalSlides - 1}
          className="h-8 w-8 rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Keyboard Navigation Hint */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-xs text-muted-foreground/50"
        >
          Use arrows or click to navigate
        </motion.p>
      </div>
    </div>
  );
};

export default AboutSlideshow;
