import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const NotesGrid = ({ notes, handleNoteClick, handleDeleteNote }) => (
  <div className="notes-grid">
    {notes.map((note) => (
      <div
        className={`note-item priority-${note.priority}`}
        onClick={() => handleNoteClick(note)}
        key={note.id}
      >
        <div className="notes-header" type="click">
          <button onClick={(e) => handleDeleteNote(e, note.id)}>
            <FontAwesomeIcon icon={faTimes} style={{ marginRight: '5px' }} />
          </button>
        </div>
        <h2>{note.title}</h2>
        <div className="flex justify-around">
          <p className="text-xs ">Priority: {note.priority}</p>
          <p className="text-xs ">Category: {note.category}</p>
        </div>
        <p className="">{note.content}</p>
      </div>
    ))}
  </div>
);

export default NotesGrid;
