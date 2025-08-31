// src/components/SearchSection.jsx
export default function SearchSection({ onAddStudent }) {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center">
        <div className="flex space-x-6 text-sm text-gray-500">
          <span className="flex items-center">
            <span className="w-2 h-2 mr-2 bg-amber-400 rounded-full"></span>
            Not Checked In
          </span>
          <span className="flex items-center">
            <span className="w-2 h-2 mr-2 bg-emerald-400 rounded-full"></span>
            Checked In
          </span>
        </div>
        
        <button
          onClick={onAddStudent}
          className="flex items-center px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors shadow-sm"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Student
        </button>
      </div>
    </section>
  );
}