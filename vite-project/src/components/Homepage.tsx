import { useState } from "react";
import Features from "../pages/Features"
import Footer from "../pages/Footer"
import Hero from "../pages/Hero"
import HowItWorks from "../pages/Howitworks"
import Navbar from "../pages/Navbar"
import Quiz from "./Quiz"
import { ToastProvider } from "@/components/ui/use-toast"

const Homepage = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleStartQuiz = () => {
    setShowQuiz(true);
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setShowQuiz(false);
    window.scrollTo(0, 0);
  };

  if (showQuiz) {
    return (
      <ToastProvider>
        <div className="relative">
          <button 
            onClick={handleBackToHome}
            className="fixed top-4 left-4 z-50 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-purple-100 flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
            <span className="text-sm font-medium">Back to Home</span>
          </button>
          <Quiz />
        </div>
      </ToastProvider>
    );
  }

  return (
    <>
      <Navbar />
      <Hero onStartQuiz={handleStartQuiz} />
      <HowItWorks/>
      <Features/>
      <Footer/>
    </>
  )
}

export default Homepage