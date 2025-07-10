import { useState } from "react";
import Router from "./Router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <Router />
        <Footer />
      </main>
    </>
  );
}

export default App;
