import React, { useState, useEffect } from 'react';
import NoteList from './Components/NoteList';
import NoteEditor from './Components/NoteEditor';
import NoteItem from './Components/NoteItem';

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    if (savedNotes.length === 0) {
      savedNotes.push({
        id: 1,
        title: 'Первая заметка',
        content: 'Это моя первая заметка!',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontSize: '14px',
        textColor: '#000000',
      });
    }
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = (note) => {
    if (notes.find((n) => n.id === note.id)) {
      setNotes(notes.map((n) => (n.id === note.id ? note : n)));
    } else {
      setNotes([...notes, note]);
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div>
      <h1>Мои заметки</h1>
      <NoteEditor onSave={handleSaveNote} />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onSave={handleSaveNote} // Убедись, что onSave передаётся
            onDelete={handleDeleteNote}
          />
        ))}
      </div>
    </div>
  );
};

export default App;