export default function StudentCard({ student, onCheckIn, onCheckOut }) {
  return (
    <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{student.name}</h3>
          <p className="text-sm text-gray-600 mt-1">
            <span className="inline-flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {student.email}
            </span>
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <span className="inline-flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {student.phone}
            </span>
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
            Checked-in {student.check_in_count || 0} times
          </span>
          <button
            onClick={() => onCheckIn(student)}
            className="px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors shadow-sm"
          >
            Check In
          </button>
        </div>
      </div>
      
      {student.recent_checkins?.length > 0 && (
        <div className="mt-3 pl-4 border-l-2 border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Recent Check-ins:
          </h4>
          {student.recent_checkins.map((checkin) => (
            <div key={checkin.id} className="text-sm text-gray-600 mb-2 flex justify-between items-center bg-gray-50 p-2 rounded">
              <span className="flex items-center">
                <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
                {new Date(checkin.check_in_time).toLocaleString()} 
                {checkin.notes && <span className="ml-2 text-gray-500">- {checkin.notes}</span>}
              </span>
              {!checkin.check_out_time && (
                <button
                  onClick={() => onCheckOut(checkin.id)}
                  className="ml-2 px-2 py-1 bg-rose-100 text-rose-800 text-xs font-medium rounded-lg hover:bg-rose-200 transition-colors"
                >
                  Check Out
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}