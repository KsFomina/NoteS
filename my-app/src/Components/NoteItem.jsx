import React, { useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import { FaTimes, FaTrash, FaListUl, FaListOl } from "react-icons/fa";
import imageCompression from "browser-image-compression";
import "draft-js/dist/Draft.css";
import "./NoteItem.css";

const NoteItem = ({ note, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [editorState, setEditorState] = useState(() => {
    try {
      if (
        note.content &&
        note.content.blocks &&
        Array.isArray(note.content.blocks)
      ) {
        return EditorState.createWithContent(convertFromRaw(note.content));
      }
    } catch (error) {
      console.error("Ошибка при загрузке контента:", error);
    }
    return EditorState.createEmpty();
  });
  const [color, setColor] = useState(note.color);
  const [fontFamily, setFontFamily] = useState(note.fontFamily || "Arial");
  const [fontSize, setFontSize] = useState(note.fontSize || "14px");
  const [textColor, setTextColor] = useState(note.textColor || "#000000");
  const [photos, setPhotos] = useState(note.photos || []);

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };

    try {
      const compressedFiles = await Promise.all(
        files.map(async (file) => {
          const compressedFile = await imageCompression(file, options);
          return URL.createObjectURL(compressedFile);
        })
      );

      setPhotos([...photos, ...compressedFiles]);
    } catch (error) {
      console.error("Ошибка при сжатии изображений:", error);
    }
  };


  const handlePhotoDelete = (index) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const handleSave = () => {
    const updatedNote = {
      ...note,
      title,
      content: convertToRaw(editorState.getCurrentContent()),
      color,
      fontFamily,
      fontSize,
      textColor,
      photos,
      updatedAt: new Date().toISOString(),
    };
    onSave(updatedNote);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(note.id);
  };

  const noteStyle = {
    backgroundColor: color,
    fontFamily,
    fontSize,
    color: textColor,
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    margin: "10px",
    width: "250px",
    height: "250px",
    overflow: "hidden",
  };

  const textStyle = {
    fontFamily,
    fontSize,
    color: textColor,
    whiteSpace: "pre-wrap", 
    wordWrap: "break-word", 
  };

  return (
    <>
      <div
        className="note-item"
        style={noteStyle}
        onClick={() => setIsEditing(true)}
      >
        <div className="header">
          <h3 style={textStyle}>{title}</h3>
          <div className="actions">
            <button
              className="delete"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              <FaTrash />
            </button>
          </div>
        </div>
        <div className="content">
          <div className="text-container" style={textStyle}>
            <p>{editorState.getCurrentContent().getPlainText()}</p>
          </div>
          <div className="photo-container">
            {photos.length > 0 && (
              <div className="photo-item">
                <img src={photos[0]} alt="Фото" style={{ width: "100%", height: "auto" }} />
                <button onClick={() => handlePhotoDelete(0)}>×</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="header">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Заголовок"
                style={{ fontFamily, fontSize, color: textColor }}
              />
              <div className="actions">
                <button
                  className="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                >
                  <FaTrash />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSave();
                  }}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="edit-panel">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
              >
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
              </select>
              <input
                type="text"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                placeholder="Размер текста"
              />
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
              />
              {/* Кнопки для списков */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleBlockType("unordered-list-item");
                }}
              >
                <FaListUl /> Маркированный список
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleBlockType("ordered-list-item");
                }}
              >
                <FaListOl /> Нумерованный список
              </button>
            </div>
            <div className="editor-container">
              <Editor
                editorState={editorState}
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
              />
            </div>
            <div className="photo-container">
              {photos.map((photo, index) => (
                <div key={index} className="photo-item">
                  <img src={photo} alt={`Фото ${index + 1}`} style={{ width: "100px", height: "100px" }} />
                  <button onClick={() => handlePhotoDelete(index)}>×</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteItem;