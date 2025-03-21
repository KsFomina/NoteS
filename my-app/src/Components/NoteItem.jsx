import React from 'react';

const NoteItem = ({ note, onEdit, onDelete }) => {
  const noteStyle = {
    width: '200px',
    height: '200px',
    backgroundColor: note.color || '#ffffff',
    margin: '10px',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  return (
    <div style={noteStyle}>
      <div>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
      </div>
      <div>
        <button onClick={() => onEdit(note.id)}>Редактировать</button>
        <button onClick={() => onDelete(note.id)}>Удалить</button>
      </div>
    </div>
  );
};

export default NoteItem;