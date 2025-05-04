import React from 'react';
import { Star, Rocket, Play } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Star className="w-6 h-6 text-quiz-purple" />,
      title: "Personalized Experience",
      description: "Our AI technology tailors quiz content to your interests and learning pace, providing a unique experience each time.",
      color: "bg-purple-50",
      border: "border-purple-100",
      iconBg: "bg-quiz-purple/10",
    },
    {
      icon: <Rocket className="w-6 h-6 text-quiz-blue" />,
      title: "Compete with Friends",
      description: "Challenge your friends in real-time competitions and see who can claim the top spot on our live leaderboards.",
      color: "bg-blue-50",
      border: "border-blue-100",
      iconBg: "bg-quiz-blue/10",
    },
    {
      icon: <Play className="w-6 h-6 text-quiz-orange" />,
      title: "Learn Through Play",
      description: "Our interactive format makes learning fun and effective, helping you retain information while enjoying the experience.",
      color: "bg-orange-50",
      border: "border-orange-100",
      iconBg: "bg-quiz-orange/10",
    }
  ];

  return (
    <section id="features" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Elevate Your <span className="text-gradient">Quiz Experience</span>
          </h2>
          <p className="text-gray-600">
            Discover why thousands of users choose QuizBliss for their knowledge challenges
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`p-8 rounded-2xl ${feature.color} border ${feature.border} hover:shadow-lg transition-all duration-300 group`}
            >
              <div className={`w-14 h-14 ${feature.iconBg} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="quiz-card p-1 aspect-square max-w-md mx-auto lg:mx-0">
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 z-0"></div>
              <div className="relative z-10 p-6 h-full flex flex-col">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-4">
                  <div className="h-3 w-24 bg-quiz-purple/30 rounded-full mb-2"></div>
                  <div className="h-2 w-32 bg-gray-300 rounded-full"></div>
                </div>
                
                <div className="flex-1 grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 flex items-center justify-center">
                      <div className="h-full w-full bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg"></div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 bg-white/70 backdrop-blur-sm rounded-xl p-4">
                  <div className="w-full bg-quiz-gradient h-2 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl md:text-3xl font-heading font-semibold mb-6">
              Interactive Quiz Interface Designed for <span className="text-gradient">Maximum Engagement</span>
            </h3>
            
            <div className="space-y-6">
              {[
                "Beautiful, distraction-free interface that helps you focus",
                "Multiple question types including image, audio, and video",
                "Real-time feedback and detailed explanations",
                "Progress tracking across all your quiz activities"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-quiz-gradient text-white flex items-center justify-center shrink-0 mt-1">✓</div>
                  <p className="text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

