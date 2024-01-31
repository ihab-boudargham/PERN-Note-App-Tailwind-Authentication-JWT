import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faSave } from '@fortawesome/free-solid-svg-icons';

const NoteForm = ({
  title,
  setTitle,
  content,
  setContent,
  priority,
  setPriority,
  category,
  setCategory,
  filter,
  setFilter,
  titleError,
  contentError,
  priorityError,
  categoryError,
  selectedNotes,
  formSubmitted,
  handleAddNotes,
  handleFilterChange,
  handleUpdateNote,
  handleCancel,
}) => {
  return (
    <form
      className="note-form"
      onSubmit={(event) =>
        selectedNotes ? handleUpdateNote(event) : handleAddNotes(event)
      }
    >
      <div className="flex justify-between items-center mb-4">
        <span className="mr-2 text-3xl font-bold">EasyWrite</span>
        <select
          className="bg-gray-100 border-1 border-gray-300 rounded-md p-1"
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Validation messages */}
      {formSubmitted && <div className="validation-message">{titleError}</div>}
      <input
        placeholder="Title"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {formSubmitted && (
        <div className="validation-message">{contentError}</div>
      )}
      <textarea
        placeholder="Content"
        rows={10}
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {formSubmitted && (
        <div className="validation-message">{priorityError}</div>
      )}
      <div className="flex justify-between">
        <label>
          <input
            type="radio"
            name="priority"
            value="low"
            checked={priority === 'low'}
            onChange={() => setPriority('low')}
          />
          Low
        </label>
        <label>
          <input
            type="radio"
            name="priority"
            value="medium"
            checked={priority === 'medium'}
            onChange={() => setPriority('medium')}
          />
          Medium
        </label>
        <label>
          <input
            type="radio"
            name="priority"
            value="high"
            checked={priority === 'high'}
            onChange={() => setPriority('high')}
          />
          High
        </label>
      </div>

      {formSubmitted && (
        <div className="validation-message">{categoryError}</div>
      )}
      <div className="flex justify-between items-center mb-4">
        <span className="mr-2">Category:</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-gray-100 border-1 border-gray-300 rounded-md p-1"
        >
          <option value="">Select Category</option>
          <option value="Work">Work</option>
          <option value="University">University</option>
          <option value="Home">Home</option>
        </select>
      </div>

      {selectedNotes ? (
        <div className="edit-buttons">
          <button type="submit">
            <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
            Save
          </button>
          <button onClick={handleCancel}>
            <FontAwesomeIcon icon={faTimes} style={{ marginRight: '5px' }} />
            Cancel
          </button>
        </div>
      ) : (
        <button type="submit">
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: '5px' }} />
          Add Note
        </button>
      )}
    </form>
  );
};

export default NoteForm;
