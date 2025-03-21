import React, { useState } from "react";

const NoteEditor = ({ note, onSave }) => {
  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "");

  const handleSave = () => {
    onSave({ id: note ? note.id : Date.now(), title, content });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Текст заметки"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
};

export default NoteEditor;
