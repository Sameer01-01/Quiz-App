import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Sign Up",
      description: "Create your free account in seconds and personalize your profile.",
      color: "from-purple-500 to-blue-500"
    },
    {
      number: "02",
      title: "Choose a Quiz",
      description: "Browse thousands of quizzes or create your own custom challenges.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: "03",
      title: "Play & Learn",
      description: "Answer questions, earn points, and expand your knowledge.",
      color: "from-pink-500 to-purple-500"
    },
    {
      number: "04",
      title: "Share Results",
      description: "Challenge friends and share your achievements on social media.",
      color: "from-orange-500 to-pink-500"
    }
  ];

  return (
    <section id="howItWorks" className="py-20 md:py-32 bg-gray-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            How <span className="text-gradient">QuizBliss</span> Works
          </h2>
          <p className="text-gray-600">
            Get started in minutes with our simple four-step process
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${step.color} transform origin-left transition-all duration-300 group-hover:h-2`}></div>
              <div className="mb-6">
                <span className={`bg-clip-text text-transparent bg-gradient-to-r ${step.color} text-5xl font-heading font-bold`}>{step.number}</span>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-6">Join thousands of satisfied quizzers worldwide</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['#8B5CF6', '#0EA5E9', '#D946EF', '#F97316', '#10B981'].map((color, index) => (
              <div 
                key={index} 
                className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden"
                style={{ backgroundColor: color }}
              >
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white shadow-md bg-gray-200 flex items-center justify-center text-xs font-medium">
              1000+
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;