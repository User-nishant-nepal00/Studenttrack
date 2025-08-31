import BusinessHours from './BusinessHours';
import ContactInfo from './ContactInfo';

export default function DailyCheckIns({ dailyCheckIns = [], onCheckOut }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Daily Check-ins
          </h2>
        </div>
        <div className="divide-y divide-gray-100">
          {!dailyCheckIns || dailyCheckIns.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>No check-ins today</p>
            </div>
          ) : (
            dailyCheckIns.map((checkIn) => (
              <div key={checkIn.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-800">
                      <span className="text-indigo-600">{checkIn.student_name || 'Unknown student'}</span> has checked in
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {checkIn.check_in_time ? new Date(checkIn.check_in_time).toLocaleString() : 'No check-in time'}
                    </p>
                  </div>
                  {!checkIn.check_out_time && (
                    <button
                      onClick={() => onCheckOut(checkIn.id)}
                      className="px-4 py-2 bg-rose-500 text-white text-sm font-medium rounded-lg hover:bg-rose-600 transition-colors shadow-sm"
                    >
                      Check Out
                    </button>
                  )}
                </div>
                {checkIn.notes && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-gray-700">
                    <strong className="text-blue-600">Note:</strong> {checkIn.notes}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <BusinessHours />
      <ContactInfo />
    </div>
  );
}