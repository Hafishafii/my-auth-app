import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (!phone.trim()) {
      setError("Phone number is required");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Enter a valid 10-digit phone number");
      return;
    }

    setError("");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("OTP sent to:", phone);
    navigate("/verify");
  };

  return (
    <div className="min-h-screen bg-white relative px-4">
      <p className="absolute top-4 left-4 text-sm text-black cursor-pointer hover:underline">
        ← Back to login
      </p>
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-sm w-full space-y-6 text-center">
          <h2 className="text-xl font-semibold">Forget your password?</h2>
          <p className="text-sm text-gray-600">
            Don’t worry. Enter your phone number below to recover your password.
          </p>
          <input
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded p-2"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            onClick={handleVerify}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}