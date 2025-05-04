import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden quiz-blur-bg">
      <div className="animated-bg"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-100 mb-6">
            <Sparkles className="w-4 h-4 text-quiz-purple" />
            <span className="text-sm font-medium">The most interactive quiz experience</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold leading-tight mb-6">
            Challenge Your Knowledge with <span className="text-gradient">QuizBliss</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10">
            Dive into thousands of engaging quizzes across various topics. Learn, compete, and have fun while expanding your knowledge horizons.
          </p>
          
          <Button className="bg-quiz-gradient hover:opacity-90 text-white font-medium px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group">
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center p-6 quiz-glass rounded-2xl animate-float">
              <div className="w-12 h-12 rounded-full bg-quiz-purple/10 flex items-center justify-center mb-4">
                <span className="font-bold text-quiz-purple text-xl">1M+</span>
              </div>
              <span className="text-sm text-gray-600">Active Users</span>
            </div>
            
            <div className="flex flex-col items-center p-6 quiz-glass rounded-2xl animate-float-slow">
              <div className="w-12 h-12 rounded-full bg-quiz-blue/10 flex items-center justify-center mb-4">
                <span className="font-bold text-quiz-blue text-xl">10K+</span>
              </div>
              <span className="text-sm text-gray-600">Available Quizzes</span>
            </div>
            
            <div className="flex flex-col items-center p-6 quiz-glass rounded-2xl animate-float-fast">
              <div className="w-12 h-12 rounded-full bg-quiz-pink/10 flex items-center justify-center mb-4">
                <span className="font-bold text-quiz-pink text-xl">50+</span>
              </div>
              <span className="text-sm text-gray-600">Categories</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-quiz-purple/10 blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-quiz-blue/10 blur-3xl animate-pulse-slow"></div>
      
      {/* Quiz cards */}
      <div className="hidden lg:block absolute top-1/4 -left-20 w-40 h-56 bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg rounded-2xl rotate-12 animate-float">
        <div className="p-4">
          <div className="h-2 w-16 bg-quiz-purple/20 rounded-full mb-2"></div>
          <div className="h-2 w-24 bg-quiz-purple/20 rounded-full mb-6"></div>
          <div className="space-y-3">
            <div className="h-3 w-full bg-quiz-blue/20 rounded-full"></div>
            <div className="h-3 w-5/6 bg-quiz-blue/20 rounded-full"></div>
            <div className="h-3 w-4/6 bg-quiz-blue/20 rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block absolute bottom-1/4 -right-10 w-40 h-56 bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg rounded-2xl -rotate-12 animate-float-slow">
        <div className="p-4">
          <div className="h-2 w-16 bg-quiz-pink/20 rounded-full mb-2"></div>
          <div className="h-2 w-20 bg-quiz-pink/20 rounded-full mb-6"></div>
          <div className="space-y-3">
            <div className="h-3 w-full bg-quiz-orange/20 rounded-full"></div>
            <div className="h-3 w-5/6 bg-quiz-orange/20 rounded-full"></div>
            <div className="h-3 w-4/6 bg-quiz-orange/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;