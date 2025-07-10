import React from "react";
import { Link } from "react-router-dom";
import { Cpu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full tewhi py-4">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Cpu size={32} className="text-white mr-2" />
          <Link to="/" className="text-white text-2xl font-bold">
            AI Quiz
          </Link>
        </div>

        <div className="space-x-6 ">
          <Link
            to="/ai-quiz"
            className="text-white text-lg hover:text-indigo-200 transition duration-300">
            AI Quiz
          </Link>
          <Link
            to="/quiz-result"
            className="text-white text-lg hover:text-indigo-200 transition duration-300">
            Results
          </Link>
        </div>

        
      </div>
    </nav>
  );
};

export default Navbar;
