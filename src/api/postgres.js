// src/api/postgres.js
const API_BASE_URL = 'http://localhost:8001';

export const db = {
  // Student operations
  getStudents: async () => {
    const response = await fetch(`${API_BASE_URL}/routes/students`);
    if (!response.ok) throw new Error('Failed to fetch students');
    return response.json();
  },
  
  addStudent: async ({ name, email, phone }) => {
    const response = await fetch(`${API_BASE_URL}/routes/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone })
    });
    if (!response.ok) throw new Error('Failed to add student');
    return response.json();
  },

  // Attendance operations
  getAttendance: async () => {
    const response = await fetch(`${API_BASE_URL}/routes/attendance`);
    if (!response.ok) throw new Error('Failed to fetch attendance');
    return response.json();
  },

  markAttendance: async (studentId, notes = '') => {
    const response = await fetch(`${API_BASE_URL}/routes/attendance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, notes })
    });
    if (!response.ok) throw new Error('Failed to mark attendance');
    return response.json();
  },

  checkOut: async (checkInId) => {
    const response = await fetch(`${API_BASE_URL}/routes/attendance`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checkInId })
    });
    if (!response.ok) throw new Error('Failed to check out');
    return response.json();
  }
};