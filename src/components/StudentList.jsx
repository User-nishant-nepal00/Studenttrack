import StudentCard from './StudentCard';

export default function StudentList({ students, onCheckIn, onCheckOut }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">Students</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {students.length === 0 ? (
          <div className="px-6 py-4 text-gray-500">No students found</div>
        ) : (
          students.map((student) => (
            <StudentCard 
              key={student.id}
              student={student}
              onCheckIn={onCheckIn}
              onCheckOut={onCheckOut}
            />
          ))
        )}
      </div>
    </div>
  );
}