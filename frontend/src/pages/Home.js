import React, { useState, useEffect } from 'react';
import NoteForm from '../components/NoteForm';
import NotesGrid from '../components/NoteGrid';

const Home = () => {
  const [notes, setNotes] = useState(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes'));
    return storedNotes || [];
  });

  // Remove backend-related useEffect
  useEffect(() => {}, []);

  // Add Notes
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('');
  const [filter, setFilter] = useState('all');
  const [category, setCategory] = useState('');

  // Validation error messages
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  const [priorityError, setPriorityError] = useState('');
  const [categoryError, setCategoryError] = useState('');

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleAddNotes = (event) => {
    event.preventDefault();

    // Validation
    if (!title) {
      setTitleError('Please fill in the title.');
      return;
    } else {
      setTitleError('');
    }

    if (!content) {
      setContentError('Please fill in the content.');
      return;
    } else {
      setContentError('');
    }

    if (!priority) {
      setPriorityError('Please select a priority.');
      return;
    } else {
      setPriorityError('');
    }

    if (!category) {
      setCategoryError('Please select a category.');
      return;
    } else {
      setCategoryError('');
    }

    // Update the UI without backend interaction
    setNotes((prevNotes) => [
      { title, content, priority, category, id: Date.now() },
      ...prevNotes,
    ]);
    saveNotesToLocalStorage([
      { title, content, priority, category, id: Date.now() },
      ...notes,
    ]);

    // Reset formSubmitted state after submission
    // (Note: Uncomment the following line if setFormSubmitted is necessary)
    // setFormSubmitted(false);

    setTitle('');
    setContent('');
    setPriority('');
    setCategory('');
  };

  // Edit Notes
  const [selectedNotes, setSelectedNotes] = useState();

  const handleNoteClick = (note) => {
    if (!selectedNotes) {
      setSelectedNotes(note);
      setTitle(note.title);
      setContent(note.content);
      setPriority(note.priority);
      setCategory(note.category);
    }
  };

  // Save Edit Notes
  const handleUpdateNote = (event) => {
    event.preventDefault();
    if (!selectedNotes) {
      return;
    }

    setFormSubmitted(true);

    // Validation
    if (!title) {
      setTitleError('Please fill in the title.');
      return;
    } else {
      setTitleError('');
    }

    if (!content) {
      setContentError('Please fill in the content.');
      return;
    } else {
      setContentError('');
    }

    if (!priority) {
      setPriorityError('Please select a priority.');
      return;
    } else {
      setPriorityError('');
    }

    if (!category) {
      setCategoryError('Please select a category.');
      return;
    } else {
      setCategoryError('');
    }

    // Update the UI without backend interaction
    const updatedNotesList = notes.map((note) =>
      note.id === selectedNotes.id
        ? { title, content, priority, category, id: selectedNotes.id }
        : note
    );
    setNotes(updatedNotesList);
    saveNotesToLocalStorage(updatedNotesList);

    setFormSubmitted(false);
    setTitle('');
    setContent('');
    setPriority('');
    setCategory('');
    setSelectedNotes(null);
  };

  // Cancel Note
  const handleCancel = () => {
    setTitle('');
    setContent('');
    setPriority('');
    setCategory('');
    setSelectedNotes(null);
  };

  // Delete Note
  const handleDeleteNote = (event, noteId) => {
    event.stopPropagation();

    const updatedNotesList = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotesList);
    saveNotesToLocalStorage(updatedNotesList);

    if (selectedNotes && selectedNotes.id === noteId) {
      setTitle('');
      setContent('');
      setPriority('');
      setCategory('');
      setSelectedNotes(null);
    }
  };

  // Filter notes according to priority
  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const filteredNotes =
    filter === 'all' ? notes : notes.filter((note) => note.priority === filter);

  // Save notes to local storage
  const saveNotesToLocalStorage = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes));
  };

  return (
    <div className="app-container">
      <NoteForm
        notes={notes}
        setNotes={setNotes}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        priority={priority}
        setPriority={setPriority}
        category={category}
        setCategory={setCategory}
        filter={filter}
        setFilter={setFilter}
        selectedNotes={selectedNotes} // Corrected line here
        titleError={titleError}
        contentError={contentError}
        priorityError={priorityError}
        categoryError={categoryError}
        formSubmitted={formSubmitted}
        handleAddNotes={handleAddNotes}
        handleFilterChange={handleFilterChange}
        handleUpdateNote={handleUpdateNote}
        handleCancel={handleCancel}
        saveNotesToLocalStorage={saveNotesToLocalStorage}
      />

      <NotesGrid
        notes={filteredNotes}
        handleNoteClick={handleNoteClick}
        handleDeleteNote={handleDeleteNote}
      />
    </div>
  );
};

export default Home;
