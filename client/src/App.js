import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Batches from "./batches/Batches";
import Subjects from "./subjects/subjects"
import Exams from "./exams/exams";
import AddExam from "./exams/addExam";
import './App.css'
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Routes>
        
         <Route path="/" element={<Batches />}></Route>
           <Route path="/:batch" element={<Subjects />}></Route>
           <Route path="/:batch/:sub/quiz" element={<Exams />}></Route>
           <Route path="/:batch/:sub/:exam/add" element={<AddExam/>}></Route>
         </Routes>
      </BrowserRouter>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
