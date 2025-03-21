import React, { useState, useEffect } from 'react';
import NoteList from './Components/NoteList';
import NoteEditor from './Components/NoteEditor';




const App = () => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    if (savedNotes.length === 0) {
      savedNotes.push({ id: 1, title: 'Первая заметка', content: 'Это моя первая заметка!', color: '#ffffff' });
    }
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = (note) => {
    if (notes.find(n => n.id === note.id)) {
      setNotes(notes.map(n => (n.id === note.id ? note : n)));
    } else {
      setNotes([...notes, note]);
    }
    setEditingNote(null);
  };

  const handleEditNote = (id) => {
    const note = notes.find(n => n.id === id);
    setEditingNote(note);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <NoteEditor note={editingNote} onSave={handleSaveNote} />
<div style={{ display: 'flex', flexWrap: 'wrap' }}>
  <NoteList notes={notes} onEdit={handleEditNote} onDelete={handleDeleteNote} />
</div>
    </div>
  );
};

export default App;