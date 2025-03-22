import React from "react";
import NoteItem from "./Components/NoteItem";
import { FaPlus } from "react-icons/fa";
import useNotes from "./Hook/useNotes"; 

const App = () => {
  const { notes, addNote, updateNote, deleteNote } = useNotes();

  const sortedNotes = [...notes].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Мои заметки</h1>
      <button
        onClick={addNote}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        <FaPlus style={{ marginRight: "8px" }} /> Добавить заметку
      </button>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {sortedNotes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onSave={updateNote}
            onDelete={deleteNote}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
