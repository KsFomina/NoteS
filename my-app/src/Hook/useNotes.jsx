import { useState, useEffect } from "react";

const useNotes = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    if (savedNotes.length === 0) {
      savedNotes.push({
        id: 1,
        title: "Первая заметка",
        content: "Это моя первая заметка!",
        color: "#ffffff",
        fontFamily: "Arial",
        fontSize: "14px",
        textColor: "#000000",
        updatedAt: new Date().toISOString(),
      });
    }
    return savedNotes;
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "Новая заметка",
      content: "",
      color: "#ffffff",
      fontFamily: "Arial",
      fontSize: "14px",
      textColor: "#000000",
      updatedAt: new Date().toISOString(),
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const updateNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === updatedNote.id
          ? { ...updatedNote, updatedAt: new Date().toISOString() }
          : note
      )
    );
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return { notes, addNote, updateNote, deleteNote };
};

export default useNotes;
