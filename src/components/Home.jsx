import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate('/ai-quiz'); 
  };

  const viewResults = () => {
    navigate('/quiz-result'); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to the AI Quiz</h1>
        <p className="text-lg text-gray-600 mb-6">Take the quiz to test your knowledge, or view your past results.</p>

        <button
          onClick={startQuiz}
          className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-500 transition duration-300 mb-4 transform hover:scale-105"
        >
          Start AI Quiz
        </button>

        <button
          onClick={viewResults}
          className="w-full bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-purple-500 transition duration-300 transform hover:scale-105"
        >
          View Results
        </button>
      </div>
    </div>
  );
};

export default Home;



// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../redux/actions/authAction";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     isError: "",
//   });
//   const dispatch = useDispatch();
//   const { isAuth, error } = useSelector((state) => state.auth);
//   const navigate = useNavigate()
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Submitted:", formData);
//     dispatch(login(formData.email, formData.password));
//   };

//   useEffect(() => {
//     if (isAuth) {
//       console.log("Login successful");
//     }
//     if (error) {
//       setFormData((prev) => ({ ...prev, isError: error }));
//     }
//   }, [isAuth, error]);

//   useEffect(() => {
//     if (isAuth) {
//       navigate("/quiz");
//     }
//   }, [isAuth]);

//   return (
//     <div>
//       <h2>Login</h2>
//       {error && <div>{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Home;
