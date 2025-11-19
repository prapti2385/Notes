import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import NoteModel from "../components/NoteModel";
import { useState } from "react";
import axios from "axios";
import NoteCard from "../components/NoteCard";

const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false);
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/note");
      setNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

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
        fetchNotes();
        closeModel();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-3 px-8 pt-5 gap-6">
        {notes.map((note) => (
          <NoteCard note={note} />
        ))}
      </div>
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
