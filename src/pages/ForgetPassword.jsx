export default function ForgetPassword() {
    return (
      <div className="min-h-screen bg-white relative px-4">
        <p className="absolute top-4 left-4 text-sm text-black cursor-pointer hover:underline">
          Back to login
        </p>
  
        <div className="flex items-center justify-center min-h-screen">
          <div className="max-w-sm w-full space-y-6 text-center">
            <h2 className="text-xl font-semibold">Forget your password?</h2>
            <p className="text-sm text-gray-600">
              Don’t worry. Enter your email or phone number below to recover your password.
            </p>
  
            <input
              type="text"
              placeholder="Email or phone number"
              className="w-full border rounded p-2"
            />
  
            <button className="w-full bg-blue-600 text-white py-2 rounded">Verify</button>
  
            <div className="flex justify-center items-center gap-4 pt-4">
              <button className="border p-2 px-4 rounded">🔵</button>
              <button className="border p-2 px-4 rounded">🟥</button>
              <button className="border p-2 px-4 rounded">⬛</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  