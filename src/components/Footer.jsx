import { Github, Linkedin } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className=" py-4 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-between">
        
        <div className="text-center mt-4 text-sm text-gray-300">
          <p>
            Built by <span className="font-semibold">Mohanlal</span>
          </p>
        </div>
        
        <div className="flex space-x-4 mt-4">
          <Link
            href="https://github.com/mohanlal99"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition duration-300"
          >
            <Github size={24} />
            <span>GitHub</span>
          </Link>

          <Link
            href="https://www.linkedin.com/in/mohanlal/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition duration-300"
          >
            <Linkedin size={24} />
            <span>LinkedIn</span>
          </Link>
        </div>

        {/* Copyright text */}
        <div className="text-center mt-4 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Mohanlal. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
