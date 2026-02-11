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

      {/* Navigation Controls */}
      {/* Left Navigation Arrow */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => paginate(-1)}
          disabled={currentSlide === 0}
          className="h-12 w-12 rounded-full shadow-lg bg-background/50 hover:bg-background/80 backdrop-blur-sm"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>

      {/* Right Navigation Arrow */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => paginate(1)}
          disabled={currentSlide === totalSlides - 1}
          className="h-12 w-12 rounded-full shadow-lg bg-background/50 hover:bg-background/80 backdrop-blur-sm"
        >
          <ChevronRight className="h-6 w-6" />
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
