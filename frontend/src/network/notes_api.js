async function fetchData(input, init) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

// Login
export async function getLoggedInUser() {
  const response = await fetchData('/api/users', { method: 'GET' });
  return response.json();
}

// To send that the user has logged out
export async function signUp(credentials) {
  const response = await fetchData('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

// To send that the user has logged in
export async function login(credentials) {
  const response = await fetchData('/api/users/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

// Logging out
export async function logout() {
  await fetchData('/api/users/logout', { method: 'POST' });
}

export async function fetchNotes() {
  const response = await fetchData('/api/notes', {
    method: 'GET',
  });

  return response.json();
}

export async function createNote(note) {
  const response = await fetchData('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

// Update from frontend
export async function updateNote(noteId, note) {
  const response = await fetchData('/api/notes/' + noteId, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

// Delete from frontend
export async function deleteNote(noteId) {
  await fetchData('/api/notes/' + noteId, {
    method: 'DELETE',
  });
}
