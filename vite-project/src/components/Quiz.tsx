import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Check, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Simple form implementation to replace react-hook-form
interface UseFormReturn {
  handleSubmit: (callback: (data: Record<string, any>) => void) => (e: React.FormEvent) => void;
}

const useForm = (): UseFormReturn => {
  return {
    handleSubmit: (callback) => (e) => {
      e.preventDefault();
      callback({});
    }
  };
};

// Note: Storing API keys in frontend code is not secure for production applications
// For educational purposes only - Consider using environment variables for production
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyCfHEexOBjjTW3VMl38KYm4h83CWiqK_60";

type QuizStep = 'topic' | 'count' | 'questions' | 'results';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const Quiz = () => {
  const [step, setStep] = useState<QuizStep>('topic');
  const [topic, setTopic] = useState<string>('');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [apiAvailable, setApiAvailable] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkApiAvailability = async () => {
      try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": API_KEY,
          },
        });
        
        if (!response.ok) {
          // If API check fails, set flag to skip API and use mock data directly
          console.warn("Gemini API not available, will use mock data instead");
          setApiAvailable(false);
        }
      } catch (error) {
        console.warn("Gemini API check failed:", error);
        setApiAvailable(false);
      }
    };
    
    checkApiAvailability();
  }, []);

  // Generate questions using Gemini API
  const generateQuestions = async () => {
    console.log("Generating questions about:", topic, "Count:", questionCount);
    setIsLoading(true);
    
    try {
      // Skip API call if already determined to be unavailable
      if (!apiAvailable) {
        console.log("API was previously determined to be unavailable, using mock data");
        generateMockQuestions();
        return;
      }
      
      // First try the API approach
      const prompt = `Generate ${questionCount} multiple choice questions about ${topic}. Each question should have exactly 4 options (A, B, C, D) and mark the correct answer. Format the output as a JSON array with objects containing "question", "options" as an array of 4 strings, and "correctAnswer" as the correct option. Make the questions engaging and accurate.`;
      
      try {
        console.log("Sending API request to Gemini");
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
        
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": API_KEY,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2048,
            }
          }),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        // If response isn't OK, throw error to fallback to mock data
        if (!response.ok) {
          throw new Error(`API returned status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API response received");
        
        if (data.error) {
          throw new Error(data.error.message || "Failed to generate questions");
        }

        // Extract and parse the JSON from the response
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0].text) {
          throw new Error("Unexpected API response format");
        }
        
        const text = data.candidates[0].content.parts[0].text;
        const startIndex = text.indexOf("[");
        const endIndex = text.lastIndexOf("]") + 1;
        
        if (startIndex !== -1 && endIndex !== -1) {
          const jsonString = text.substring(startIndex, endIndex);
          
          try {
            const parsedQuestions = JSON.parse(jsonString);
            
            // Validate the structure of the parsed questions
            if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
              throw new Error("Invalid question format received");
            }
            
            // Validate each question has the required fields
            const validQuestions = parsedQuestions.filter(q => 
              q.question && 
              Array.isArray(q.options) && 
              q.options.length === 4 &&
              q.correctAnswer
            );
            
            if (validQuestions.length === 0) {
              throw new Error("No valid questions found in response");
            }
            
            console.log("Questions parsed successfully:", validQuestions.length);
            setQuestions(validQuestions);
            // Initialize answers array with empty strings
            setAnswers(new Array(validQuestions.length).fill(""));
            
            // Move to questions step
            setStep('questions');
            return;
          } catch (parseError) {
            console.error("Failed to parse API response as JSON:", parseError);
            throw new Error("Unable to parse questions from API response");
          }
        }
        // If JSON parsing fails, throw error to fall back to mock data
        throw new Error("Failed to parse questions from API response");
      } catch (apiError) {
        console.error("API error, falling back to mock data:", apiError);
        // Mark API as unavailable for future attempts
        setApiAvailable(false);
        // Fall back to mock data if API fails
        generateMockQuestions();
      }
    } catch (error) {
      console.error('Error generating questions:', error);
      toast({
        title: "Error",
        description: "Failed to generate questions. Using pre-defined questions instead.",
        variant: "destructive",
      });
      generateMockQuestions();
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback mock question generator
  const generateMockQuestions = () => {
    console.log("Generating mock questions as fallback");
    const mockQuestions: Question[] = [];
    
    const getTopicBasedQuestions = (topic: string): Question[] => {
      if (topic.toLowerCase().includes('history')) {
        return [
          {
            question: "In which year did World War II end?",
            options: ["1943", "1945", "1947", "1950"],
            correctAnswer: "1945"
          },
          {
            question: "Who was the first President of the United States?",
            options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"],
            correctAnswer: "George Washington"
          },
          {
            question: "The French Revolution began in which year?",
            options: ["1769", "1789", "1799", "1809"],
            correctAnswer: "1789"
          },
          {
            question: "Which ancient civilization built the Machu Picchu?",
            options: ["Aztecs", "Mayans", "Incas", "Olmecs"],
            correctAnswer: "Incas"
          },
          {
            question: "Who wrote 'The Communist Manifesto'?",
            options: ["Vladimir Lenin", "Karl Marx", "Joseph Stalin", "Friedrich Engels"],
            correctAnswer: "Karl Marx"
          }
        ];
      } else if (topic.toLowerCase().includes('science') || topic.toLowerCase().includes('physics')) {
        return [
          {
            question: "What is the chemical symbol for gold?",
            options: ["Go", "Gd", "Au", "Ag"],
            correctAnswer: "Au"
          },
          {
            question: "What force keeps planets in orbit around the Sun?",
            options: ["Electromagnetic force", "Gravity", "Nuclear force", "Centrifugal force"],
            correctAnswer: "Gravity"
          },
          {
            question: "What is the smallest unit of matter?",
            options: ["Atom", "Molecule", "Cell", "Quark"],
            correctAnswer: "Quark"
          },
          {
            question: "What is the speed of light in a vacuum?",
            options: ["300,000 km/s", "150,000 km/s", "299,792 km/s", "200,000 km/s"],
            correctAnswer: "299,792 km/s"
          },
          {
            question: "What is the fourth state of matter?",
            options: ["Liquid", "Gas", "Plasma", "Solid"],
            correctAnswer: "Plasma"
          }
        ];
      } else if (topic.toLowerCase().includes('program') || topic.toLowerCase().includes('code') || topic.toLowerCase().includes('javascript')) {
        return [
          {
            question: "Which of these is not a programming language?",
            options: ["Java", "Python", "HTML", "Ruby"],
            correctAnswer: "HTML"
          },
          {
            question: "What does API stand for?",
            options: ["Application Programming Interface", "Automated Program Integration", "Application Process Integration", "Advanced Program Interface"],
            correctAnswer: "Application Programming Interface"
          },
          {
            question: "Which company developed JavaScript?",
            options: ["Microsoft", "Google", "Netscape", "Apple"],
            correctAnswer: "Netscape"
          },
          {
            question: "What does the 'DOM' stand for in web development?",
            options: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Digital Object Memory"],
            correctAnswer: "Document Object Model"
          },
          {
            question: "What is the correct way to declare a JavaScript variable?",
            options: ["v myVar;", "variable myVar;", "var myVar;", "val myVar;"],
            correctAnswer: "var myVar;"
          }
        ];
      } else {
        return [
          {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: "Mars"
          },
          {
            question: "Who painted the Mona Lisa?",
            options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
            correctAnswer: "Leonardo da Vinci"
          },
          {
            question: "What is the capital of Japan?",
            options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
            correctAnswer: "Tokyo"
          },
          {
            question: "Which is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: "Pacific Ocean"
          },
          {
            question: "Who wrote 'Romeo and Juliet'?",
            options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
            correctAnswer: "William Shakespeare"
          }
        ];
      }
    };
    
    const availableQuestions = getTopicBasedQuestions(topic);
    
    for (let i = 0; i < Math.min(questionCount, availableQuestions.length); i++) {
      mockQuestions.push(availableQuestions[i]);
    }
    
    if (questionCount > mockQuestions.length) {
      const genericQuestions: Question[] = [
        {
          question: "Which is the largest mammal in the world?",
          options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
          correctAnswer: "Blue Whale"
        },
        {
          question: "What is the main component of Earth's atmosphere?",
          options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
          correctAnswer: "Nitrogen"
        },
        {
          question: "How many continents are there on Earth?",
          options: ["5", "6", "7", "8"],
          correctAnswer: "7"
        }
      ];
      
      for (let i = 0; i < questionCount - mockQuestions.length && i < genericQuestions.length; i++) {
        mockQuestions.push(genericQuestions[i]);
      }
    }
    
    console.log("Mock questions generated:", mockQuestions.length);
    setQuestions(mockQuestions);
    setAnswers(new Array(mockQuestions.length).fill(""));
    
    setStep('questions');
  };

  const handleTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Topic submitted:", topic);
    
    if (!topic.trim()) {
      toast({
        title: "Error",
        description: "Please enter a topic",
        variant: "destructive",
      });
      return;
    }
    
    setStep('count');
  };

  const handleCountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Count submitted, generating questions...");
    generateQuestions();
  };

  const handleSelectAnswer = (answer: string) => {
    console.log(`Selected answer for question ${currentQuestionIndex + 1}: ${answer}`);
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        newScore++;
      }
    });
    console.log("Final score:", newScore, "out of", questions.length);
    console.log("User answers:", answers);
    console.log("Correct answers:", questions.map(q => q.correctAnswer));
    
    setScore(newScore);
    setShowAnswers(true);
    setStep('results');
  };

  const handleRestart = () => {
    setStep('topic');
    setTopic('');
    setQuestionCount(5);
    setQuestions([]);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowAnswers(false);
  };

  const isCorrectAnswer = (questionIndex: number) => {
    return answers[questionIndex] === questions[questionIndex].correctAnswer;
  };

  const renderStep = () => {
    switch (step) {
      case 'topic':
        return (
          <Card className="w-full max-w-lg bg-white/80 backdrop-blur-sm border border-white/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-center">
                <span className="bg-clip-text text-transparent bg-quiz-gradient">Choose a Topic</span>
              </CardTitle>
            </CardHeader>
            <form onSubmit={handleTopicSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="topic">What would you like to be quizzed on?</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., World History, Solar System, JavaScript"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="bg-white/50"
                  />
                </div>
              </CardContent>
              <CardFooter className='flex items-center justify-center'>
                <Button 
                  type="submit" 
                  className="w-full py-2 px-8 bg-quiz-gradient hover:bg-quiz-purple/90 text-white"
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </form>
          </Card>
        );
      case 'count':
        return (
          <Card className="w-full max-w-lg bg-white/80 backdrop-blur-sm border border-white/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-center">
                <span className="bg-clip-text text-transparent bg-quiz-gradient">Number of Questions</span>
              </CardTitle>
            </CardHeader>
            <form onSubmit={handleCountSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="count">How many questions do you want?</Label>
                  <div className="relative w-full">
                    <select
                      id="question-count"
                      value={questionCount}
                      onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                      className="h-10 w-full rounded-md border border-input bg-white/50 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      {[3, 5, 10, 15, 20].map((num) => (
                        <option key={num} value={num}>
                          {num} questions
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  type="button" 
                  className="bg-transparent border border-gray-300 hover:bg-gray-100"
                  onClick={() => setStep('topic')}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button 
                  type="submit" 
                  className="bg-quiz-gradient px-4 py-2 hover:bg-quiz-purple/90 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? 'Generating...' : 'Start Quiz'} 
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </CardFooter>
            </form>
          </Card>
        );
      case 'questions':
        if (questions.length === 0) {
          return <div className="text-center">Loading questions...</div>;
        }

        const currentQuestion = questions[currentQuestionIndex];
        const isLastQuestion = currentQuestionIndex === questions.length - 1;
        
        return (
          <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-xl">
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-quiz-purple">
                  Topic: <span className="font-bold">{topic}</span>
                </span>
                <span className="text-sm font-medium text-quiz-blue">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
              <CardTitle className="text-xl font-heading">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div 
                    key={index} 
                    onClick={() => handleSelectAnswer(option)}
                    className={`flex items-center space-x-2 rounded-md p-4 border cursor-pointer transition-all 
                      ${answers[currentQuestionIndex] === option 
                        ? 'border-quiz-purple bg-purple-50' 
                        : 'border-gray-200 hover:bg-accent/50'}`}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center 
                      ${answers[currentQuestionIndex] === option 
                        ? 'bg-quiz-purple text-white' 
                        : 'border border-gray-300'}`}
                    >
                      {answers[currentQuestionIndex] === option && (
                        <Check className="w-3 h-3" />
                      )}
                    </div>
                    <span className="flex-grow">{option}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                className="bg-transparent border border-gray-300 hover:bg-gray-100"
                onClick={handlePrevious} 
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              
              {isLastQuestion ? (
                <Button 
                  className="bg-quiz-gradient hover:bg-quiz-purple/90 text-white"
                  onClick={handleSubmit}
                >
                  <Check className="mr-2 h-4 w-4" /> Submit
                </Button>
              ) : (
                <Button 
                  className="bg-quiz-gradient hover:bg-quiz-purple/90 text-white py-2 px-4"
                  onClick={handleNext}
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      case 'results':
        return (
          <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-center">
                <span className="bg-clip-text text-transparent bg-quiz-gradient">Quiz Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="w-32 h-32 mx-auto bg-quiz-gradient rounded-full flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {score}/{questions.length}
                </span>
              </div>
              
              <div className="text-xl">
                You scored <span className="font-bold text-quiz-purple">{Math.round((score / questions.length) * 100)}%</span>
              </div>
              
              <div className="text-sm text-muted-foreground mb-6">
                {score === questions.length 
                  ? "Perfect score! Amazing job!" 
                  : score >= questions.length * 0.7 
                    ? "Great job! You really know your stuff." 
                    : score >= questions.length * 0.5 
                      ? "Good effort! Room for improvement." 
                      : "Keep learning! You'll do better next time."}
              </div>
              
              {showAnswers && (
                <div className="border-t pt-4 mt-2">
                  <h3 className="text-lg font-medium mb-4 text-left">Your Answers:</h3>
                  <div className="space-y-4 max-h-60 overflow-y-auto text-left">
                    {questions.map((question, index) => (
                      <div key={index} className={`p-3 rounded-md ${isCorrectAnswer(index) ? 'bg-green-50' : 'bg-red-50'}`}>
                        <div className="flex items-start gap-2">
                          {isCorrectAnswer(index) 
                            ? <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" /> 
                            : <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />}
                          <div>
                            <p className="font-medium">{index + 1}. {question.question}</p>
                            <p className="text-sm mt-1">
                              <span className="text-gray-600">Your answer: </span>
                              <span className={isCorrectAnswer(index) ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                {answers[index] || "Not answered"}
                              </span>
                            </p>
                            {!isCorrectAnswer(index) && (
                              <p className="text-sm mt-1">
                                <span className="text-gray-600">Correct answer: </span>
                                <span className="text-green-600 font-medium">{question.correctAnswer}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleRestart}
                className="w-full py-2 bg-quiz-gradient hover:bg-quiz-purple/90 text-white"
              >
                Try Another Quiz
              </Button>
            </CardFooter>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col quiz-blur-bg overflow-hidden">
      <div className="fixed top-0 left-0 w-full">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-quiz-gradient flex items-center justify-center">
              <span className="text-white font-bold text-xl">Q</span>
            </div>
            <span className="font-heading font-bold text-xl">QuizBliss</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-4 pt-24">
        {renderStep()}
      </div>
      
      <div className="animated-bg"></div>
    </div>
  );
};

export default Quiz;
