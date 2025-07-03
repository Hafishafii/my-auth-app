export default function ConfirmAccount({ name = "User" }) {
    return (
      <div className="min-h-screen bg-white relative px-4">
        <p className="absolute top-4 left-4 text-sm text-black cursor-pointer hover:underline">
          Back to login
        </p>
  
        <div className="flex items-center justify-center min-h-screen">
          <div className="max-w-sm w-full text-center space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Welcome, your account has been <span className="text-blue-600">created!</span>
            </h2>
            <p className="text-gray-600">
              Congratulations <strong>{name}</strong>. You just joined our app. We’re excited to have you here.
            </p>
            <button className="bg-blue-600 text-white py-2 px-6 rounded">Get started</button>
          </div>
        </div>
      </div>
    );
  }
  