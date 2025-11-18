import React from "react";
import Navbar from "../components/Navbar";
import NoteModel from "../components/NoteModel";
import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false);
  const closeModel = () => {
    setModelOpen(false);
  };

  const addNote = async ({ title, description }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/note/add",
        {
          title,
          description,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data.success) {
        closeModel();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <button
        className="bg-teal-500 text-white font-bold p-4 rounded fixed right-4 bottom-4 text-2xl cursor-pointer"
        onClick={() => setModelOpen(true)}
      >
        +
      </button>
      {isModelOpen && <NoteModel closeModel={closeModel} addNote={addNote} />}
    </div>
  );
};

export default Home;
