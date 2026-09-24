import React, { createContext, useContext, useState, useEffect } from 'react';

interface OpeningContextType {
  isComplete: boolean;
  activeStep: number;
  setActiveStep: (step: number) => void;
  tagline: string;
  reducedMotion: boolean;
  completeExperience: () => void;
}

const OpeningContext = createContext<OpeningContextType | undefined>(undefined);

export function OpeningProvider({ children, onComplete }: { children: React.ReactNode, onComplete?: () => void }) {
  const [isComplete, setIsComplete] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [tagline, setTagline] = useState("");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const visited = sessionStorage.getItem("mayavi_visited");
    if (visited === "true") {
      setIsComplete(true);
      if (onComplete) onComplete();
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [onComplete]);

  useEffect(() => {
    const taglines = [
      "Crafting Visual Stories",
      "Where Vertical Meets Cinematic",
      "Stories That Inspire",
      "Frames That Last",
      "Building Visual Legacies",
      "Creating Impactful Moments",
      "Stories in Motion",
      "Preparing Something Extraordinary"
    ];
    const randomIndex = Math.floor(Math.random() * taglines.length);
    setTagline(taglines[randomIndex]);
  }, []);

  const completeExperience = () => {
    sessionStorage.setItem("mayavi_visited", "true");
    setIsComplete(true);
    if (onComplete) onComplete();
  };

  return (
    <OpeningContext.Provider value={{
      isComplete,
      activeStep,
      setActiveStep,
      tagline,
      reducedMotion,
      completeExperience
    }}>
      {children}
    </OpeningContext.Provider>
  );
}

export function useOpeningExperience() {
  const context = useContext(OpeningContext);
  if (!context) {
    throw new Error("useOpeningExperience must be used within an OpeningProvider");
  }
  return context;
}
