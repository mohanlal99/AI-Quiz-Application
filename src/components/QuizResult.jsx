import React from 'react';
import { Star, Brain, CheckCircle } from 'lucide-react';
import ResultPage from './ResultPage';

const QuizResult = () => {
  return (
    <div className="flex flex-col  items-center justify-center min-h-screen  py-12 px-2 md:px-6">
      
      <div className="max-w-5xl w-full shadow-lg rounded-lg md:p-8">
        
        <h2 className="text-2xl  pt-5 md:pt-0 md:text-3xl font-semibold text-center ">Congratulations on Completing the Quiz!</h2>

        
        <div className="mt-6 hidden md:flex">
          <p className="text-lg ">
            This quiz was powered by advanced AI algorithms, designed to challenge your knowledge and provide insights into your learning journey.
          </p>
        </div>

        <ResultPage/>

        <div className="mt-8  p-4 rounded-md">
          <div className="flex items-center space-x-3">
            <Brain className="text-blue-500" />
            <h2 className="text-xl font-semibold ">AI Insights</h2>
          </div>
          <p className="mt-2 ">
            Our AI analyzed your performance, offering valuable insights into areas where you excel and areas for further improvement. Keep up the great work!
          </p>
        </div>

        <div className="mt-8  p-4 rounded-md">
          <div className="flex items-center space-x-3">
            <Star className="text-yellow-500" />
            <h2 className="text-xl font-semibold ">Did You Know?</h2>
          </div>
          <p className="mt-2 ">
            AI can process vast amounts of data in real time, enabling us to craft quizzes that adapt to your learning style and optimize your experience.
          </p>
        </div>

      </div>

      <div className="mt-12 text-center ">
        <p className="text-sm">
          Powered by Mohanlal AI technology to help you improve and grow.
        </p>
      </div>
    </div>
  );
};

export default QuizResult;
