import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Quiz from './components/Quiz'
import PrivateRoute from './context/PrivateRoute'
import AiQuizPage from './components/AiQuizPage'
import QuizResult from './components/QuizResult'

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/quiz' element={<Quiz/>}/>
        <Route path='/ai-quiz' element={<AiQuizPage/>}/>
        <Route path='/quiz-result' element={<QuizResult/>}/>
    </Routes>
  )
}

export default Router
