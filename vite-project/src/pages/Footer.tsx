const Footer = () => {
  return (
    <footer className="bg-gray-50/80 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-quiz-gradient flex items-center justify-center">
                <span className="text-white font-bold text-xl">Q</span>
              </div>
              <span className="font-heading font-bold text-xl">QuizBliss</span>
            </div>
            <p className="text-gray-500 mb-4">
              Making learning fun through interactive quizzes and challenges.
            </p>
            <div className="flex gap-4">
              {["#", "#", "#", "#"].map((link, index) => (
                <a 
                  key={index}
                  href={link} 
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-quiz-purple hover:text-white transition-colors"
                >
                  <span className="sr-only">Social Link</span>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Features", "How It Works", "Pricing", "Contact"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-500 hover:text-quiz-purple transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {["Blog", "Help Center", "FAQ", "Community", "Privacy Policy"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-500 hover:text-quiz-purple transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-500 mb-4">Stay updated with our latest features and releases</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-quiz-purple"
              />
              <button className="bg-quiz-gradient text-white px-4 py-2 rounded-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} QuizBliss. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;