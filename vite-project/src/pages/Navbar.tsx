import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-2 bg-white/80 backdrop-blur-lg shadow-md' : 'py-4 bg-transparent'
    }`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-quiz-gradient flex items-center justify-center">
            <span className="text-white font-bold text-xl">Q</span>
          </div>
          <span className="font-heading font-bold text-xl">QuizBliss</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="font-medium text-sm hover:text-quiz-purple transition-colors">Features</a>
          <a href="#howItWorks" className="font-medium text-sm hover:text-quiz-purple transition-colors">How It Works</a>
          
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden md:inline-flex font-medium">
            Login
          </Button>
          <Button className="bg-quiz-gradient p-3 hover:bg-quiz-purple/90 font-medium">
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;