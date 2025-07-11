export default function ChooseAccount() {
    return (
      <div className="min-h-screen bg-white relative px-4">
        <p className="absolute top-4 left-4 text-sm text-black cursor-pointer hover:underline">
          ← Back to login
        </p>
        <div className="flex items-center justify-center min-h-screen">
          <div className="max-w-sm w-full space-y-4 text-left border p-6 rounded-lg shadow">
            <h2 className="text-xs text-gray-500">Sign in with Google</h2>
            <h3 className="text-lg font-semibold">Choose an account to continue to App</h3>
            <div className="space-y-2">
              {["account1@gmail.com", "user2@gmail.com"].map((email, i) => (
                <div key={i} className="border p-3 rounded hover:bg-gray-100 cursor-pointer">
                  <p className="font-medium">Account Name</p>
                  <p className="text-sm text-gray-500">{email}</p>
                </div>
              ))}
              <p className="text-blue-600 text-sm cursor-pointer hover:underline">Use another account</p>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              To continue, Google will share your name, email address, language preference,
              and profile picture with this app.
            </p>
          </div>
        </div>
      </div>
    );
  }