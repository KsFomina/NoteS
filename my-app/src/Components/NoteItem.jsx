import React, { useState } from 'react';
import { FaTimes, FaTrash } from 'react-icons/fa';

const NoteItem = ({ note, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [color, setColor] = useState(note.color);
  const [fontFamily, setFontFamily] = useState(note.fontFamily || 'Arial');
  const [fontSize, setFontSize] = useState(note.fontSize || '14px');
  const [textColor, setTextColor] = useState(note.textColor || '#000000');

  const handleClose = () => {
    // Сохраняем изменения
    onSave({
      ...note,
      title,
      content,
      color,
      fontFamily,
      fontSize,
      textColor,
    });

    // Выходим из режима редактирования
    setIsEditing(false);
  };

  const noteStyle = {
    width: isEditing ? '300px' : '200px',
    height: isEditing ? '300px' : '200px',
    backgroundColor: color,
    margin: '10px',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative', // Для позиционирования иконок
  };

  const textStyle = {
    fontFamily,
    fontSize,
    color: textColor,
  };

  return (
    <div style={noteStyle} onClick={() => !isEditing && setIsEditing(true)}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ ...textStyle, width: '100%', marginBottom: '10px' }}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ ...textStyle, width: '100%', height: '150px', marginBottom: '10px' }}
          />
          <div>
            <label>Цвет фона: </label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div>
            <label>Шрифт: </label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
            </select>
          </div>
          <div>
            <label>Размер текста: </label>
            <input
              type="text"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
            />
          </div>
          <div>
            <label>Цвет текста: </label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <FaTrash
              onClick={(e) => {
                e.stopPropagation(); // Останавливаем всплытие события
                onDelete(note.id);
              }}
              style={{ cursor: 'pointer', color: '#ff4d4d' }}
            />
            <FaTimes
              onClick={(e) => {
                e.stopPropagation(); // Останавливаем всплытие события
                handleClose();
              }}
              style={{ cursor: 'pointer', color: '#666' }}
            />
          </div>
        </div>
      ) : (
        <div>
          <h3 style={textStyle}>{title}</h3>
          <p style={textStyle}>{content}</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <FaTrash
              onClick={(e) => {
                e.stopPropagation(); // Останавливаем всплытие события
                onDelete(note.id);
              }}
              style={{ cursor: 'pointer', color: '#ff4d4d' }}
            />
            <FaTimes
              onClick={(e) => {
                e.stopPropagation(); // Останавливаем всплытие события
                handleClose();
              }}
              style={{ cursor: 'pointer', color: '#666' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteItem;