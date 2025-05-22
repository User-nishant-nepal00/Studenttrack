export default function BusinessHours() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Business Hours
        </h3>
      </div>
      <div className="px-6 py-4">
        <ul className="text-sm text-gray-600 space-y-2">
          <li className="flex items-center">
            <span className="w-24 font-medium text-gray-700">Monday - Friday:</span>
            <span>9:00 AM - 5:00 PM</span>
          </li>
          <li className="flex items-center">
            <span className="w-24 font-medium text-gray-700">Saturday:</span>
            <span>10:00 AM - 2:00 PM</span>
          </li>
          <li className="flex items-center">
            <span className="w-24 font-medium text-gray-700">Sunday:</span>
            <span className="text-rose-500">Closed</span>
          </li>
        </ul>
      </div>
    </div>
  );
}