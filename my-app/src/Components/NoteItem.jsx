import React from 'react';

const NoteItem = ({ note, onEdit, onDelete }) => {
    return (
      <div>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
        <button onClick={() => onEdit(note.id)}>Редактировать</button>
        <button onClick={() => onDelete(note.id)}>Удалить</button>
      </div>
    );
  };
  
  export default NoteItem;