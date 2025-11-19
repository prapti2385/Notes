import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import NoteModel from "../components/NoteModel";
import { useState } from "react";
import axios from "axios";
import NoteCard from "../components/NoteCard";

const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState("");

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

  useEffect(() => {
    setFilteredNotes(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes]);

  const closeModel = () => {
    setModelOpen(false);
  };

  const onEdit = (note) => {
    setCurrentNote(note);
    setModelOpen(true);
  };

  const addNote = async (title, description) => {
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

  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/note/${id}`,
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

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        fetchNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setQuery={setQuery} />
      <div className="grid grid-cols-1 md:grid-cols-3 px-8 pt-5 gap-6">
        {filteredNotes.length > 0 ? filteredNotes.map((note) => (
          <NoteCard note={note} onEdit={onEdit} deleteNote={deleteNote} />
        )) : <p>No Notes</p>}
      </div>
      <button
        className="bg-teal-500 text-white font-bold p-4 rounded fixed right-4 bottom-4 text-2xl cursor-pointer"
        onClick={() => {
          setModelOpen(true);
          setCurrentNote(null);
        }}
      >
        +
      </button>
      {isModelOpen && (
        <NoteModel
          closeModel={closeModel}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default Home;
