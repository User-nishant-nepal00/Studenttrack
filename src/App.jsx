import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import AttendanceMain from './components/AttendanceMain';
import Footer from './components/Footer';
import DailyCheckIns from './components/DailyCheckIns'; 
import { db } from './api/postgres'; // 

export default function App() {
  const [students, setStudents] = useState([]);
  const [dailyCheckIns, setDailyCheckIns] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from PostgreSQL
  const fetchStudents = async () => {
    try {
      return await db.getStudents();
    } catch (err) {
      setError(err.message);
      return [];
    }
  };

  const fetchDailyCheckIns = async () => {
    try {
      return await db.getAttendance();
    } catch (err) {
      setError(err.message);
      return [];
    }
  };

  const searchStudents = async (query) => {
    try {
      return await db.searchStudents(query);
    } catch (err) {
      setError(err.message);
      return [];
    }
  };

  const checkInStudent = async (studentId, notes) => {
    try {
      return await db.markAttendance(studentId, notes);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const checkOutStudent = async (checkInId) => {
    try {
      return await db.checkOut(checkInId);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [studentsData, checkInsData] = await Promise.all([
          fetchStudents(),
          fetchDailyCheckIns()
        ]);
        setStudents(studentsData);
        setDailyCheckIns(checkInsData);
      } catch (error) {
        setError(error.message);
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSearch = async (query) => {
    try {
      const results = await searchStudents(query);
      setStudents(results);
    } catch (error) {
      setError(error.message);
      console.error('Error searching students:', error);
    }
  };

  const handleCheckIn = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCheckOut = async (checkInId) => {
    try {
      await checkOutStudent(checkInId);
      const checkInsData = await fetchDailyCheckIns();
      setDailyCheckIns(checkInsData);
    } catch (error) {
      setError(error.message);
      console.error('Error checking out:', error);
    }
  };

  const handleCheckInSubmit = async (notes) => {
    try {
      await checkInStudent(selectedStudent.id, notes);
      setIsModalOpen(false);
      const [studentsData, checkInsData] = await Promise.all([
        fetchStudents(),
        fetchDailyCheckIns()
      ]);
      setStudents(studentsData);
      setDailyCheckIns(checkInsData);
    } catch (error) {
      setError(error.message);
      console.error('Error checking in:', error);
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <SearchSection onSearch={handleSearch} />
        <AttendanceMain 
          students={students} 
          dailyCheckIns={dailyCheckIns}
          onCheckIn={handleCheckIn}
          onCheckOut={handleCheckOut}
        />
      </main>
      <Footer />
    </div>
  );
}