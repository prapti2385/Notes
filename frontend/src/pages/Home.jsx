import React from "react";
import Navbar from "../components/Navbar";
import NoteModel from "../components/NoteModel";
import { useState } from "react";

const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false);
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <button
        className="bg-teal-500 text-white font-bold p-4 rounded fixed right-4 bottom-4 text-2xl"
        onClick={() => setModelOpen(true)}
      >
        +
      </button>
      {isModelOpen && <NoteModel />}
    </div>
  );
};

export default Home;
