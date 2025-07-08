export default function Navbar({ user, logout }) {
    return (
        <div className="bg-white shadow-sm border-b-gray-400">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center">
              <h1 className="text-2xl max-md:text-xl font-bold text-gray-700">🎁 Birthday Buddy</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 max-md:text-sm">Hi, {user?.firstname}!</span>
              <button
                onClick={logout}
                className="text-gray-50 bg-gradient-to-br from-[#f56565] to-[#c53030] px-5 max-md:px-3 py-2  rounded-[8px] hover:text-gray-100 hover:opacity-70"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}