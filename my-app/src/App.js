import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import NoteList from "./Components/NoteList";
import NoteEditor from "./Components/NoteEditor";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  // Загрузка заметок из LocalStorage при старте
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    if (savedNotes.length === 0) {
      // Первая заметка при первом запуске
      savedNotes.push({
        id: 1,
        title: "Первая заметка",
        content: "Это моя первая заметка!",
      });
    }
    setNotes(savedNotes);
  }, []);

  // Сохранение заметок в LocalStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = (note) => {
    if (notes.find((n) => n.id === note.id)) {
      setNotes(notes.map((n) => (n.id === note.id ? note : n)));
    } else {
      setNotes([...notes, note]);
    }
    setEditingNote(null);
  };

  const handleEditNote = (id) => {
    const note = notes.find((n) => n.id === id);
    setEditingNote(note);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div>
      <h1>Мои заметки</h1>
      <NoteList
        notes={notes}
        onEdit={handleEditNote}
        onDelete={handleDeleteNote}
      />
      <NoteEditor note={editingNote} onSave={handleSaveNote} />
      <button onClick={() => setEditingNote({})}>Создать новую заметку</button>
    </div>
  );
};

export default App;
