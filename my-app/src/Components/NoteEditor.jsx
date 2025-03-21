import React, { useState } from 'react';

const NoteEditor = ({ note, onSave }) => {
  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');
  const [color, setColor] = useState(note ? note.color : '#ffffff');

  const handleSave = () => {
    onSave({ id: note ? note.id : Date.now(), title, content, color });
  };

  return (
    <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <input
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
      />
      <textarea
        placeholder="Текст заметки"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
};

export default NoteEditor;