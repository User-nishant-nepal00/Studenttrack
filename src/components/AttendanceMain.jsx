import { useState, useEffect } from 'react';
import StudentList from './StudentList';
import DailyCheckIns from './DailyCheckIns'; 
import { db } from '../api/postgres';

export default function AttendanceMain() {
  const [students, setStudents] = useState([]);
  const [dailyCheckIns, setDailyCheckIns] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredStudents, setFilteredStudents] = useState([]);


  useEffect(() => {
    const loadData = async () => {
      try {
        const [studentsData, checkInsData] = await Promise.all([
          db.getStudents(),
          db.getAttendance()
        ]);
        setStudents(studentsData);
        setDailyCheckIns(checkInsData);
      } catch (err) {
        setError(err.message);
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
 const handleSearch = async (query) => {
    if (!query.trim()) {
      setFilteredStudents(students); // Show all students when search is empty
      return;
    }
    
    try {
      const results = await db.searchStudents(query);
      setFilteredStudents(results);
    } catch (error) {
      console.error('Search error:', error);
      setFilteredStudents([]);
    }
  };

  // Update your loadData function to set both students and filteredStudents
  const loadData = async () => {
    try {
      const [studentsData, checkInsData] = await Promise.all([
        db.getStudents(),
        db.getAttendance()
      ]);
      setStudents(studentsData);
      setFilteredStudents(studentsData); // Initialize filteredStudents with all students
      setDailyCheckIns(checkInsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleCheckIn = async (student) => {
    try {
      await db.markAttendance(student.id);
      const [studentsData, checkInsData] = await Promise.all([
        db.getStudents(),
        db.getAttendance()
      ]);
      setStudents(studentsData);
      setDailyCheckIns(checkInsData);
    } catch (error) {
      console.error('Error checking in:', error);
    }
  };

  const handleCheckOut = async (checkInId) => {
    try {
      await db.checkOut(checkInId);
      // Refresh check-ins after check-out
      const checkInsData = await db.getAttendance();
      setDailyCheckIns(checkInsData);
    } catch (error) {
      console.error('Error checking out:', error);
    }
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {showAddForm ? (
      <div className="lg:col-span-3">
        <AddStudentForm 
          onBack={() => setShowAddForm(false)}
          onAddStudent={handleAddStudent}
        />
      </div>
    ) : (
      <>
        <div className="lg:col-span-2">
          <StudentList 
            students={students} 
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
          />
        </div>
        <div className="lg:col-span-1">
          <DailyCheckIns
            dailyCheckIns={dailyCheckIns} 
            onCheckOut={handleCheckOut}
          />
        </div>
      </>
    )}
  </div>
  );
}