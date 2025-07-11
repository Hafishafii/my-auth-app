import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyCode() {
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleChange = (e, idx) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    e.target.value = value.slice(-1);

    if (value && idx < 5) {
      inputsRef.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !e.target.value && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
  };

  const handleVerify = () => {
    const otp = inputsRef.current.map(input => input.value).join("");
    console.log("OTP Entered:", otp);
    // Navigate to ConfirmAccount page
    navigate("/confirm");
  };

  return (
    <div className="min-h-screen bg-white px-4 relative">
      <p
        className="absolute top-4 left-4 text-sm md:text-base text-black cursor-pointer hover:underline"
        onClick={() => navigate("/forgot-password")}
      >
        ← Back to login
      </p>

      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-sm md:max-w-md space-y-6 text-center">
          <h2 className="text-xl md:text-2xl font-semibold">Verify code</h2>
          <p className="text-sm md:text-base text-gray-600">
            An authentication code has been sent to your phone number.
          </p>

          <div className="flex justify-between gap-2 md:gap-4 px-2 md:px-0">
            {[...Array(6)].map((_, idx) => (
              <input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength="1"
                className="w-10 h-12 md:w-12 md:h-14 border border-gray-300 rounded text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                ref={(el) => (inputsRef.current[idx] = el)}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
              />
            ))}
          </div>

          <p className="text-xs text-gray-500">
            Didn’t receive a code?{" "}
            <span className="text-red-500 cursor-pointer">Resend</span>
          </p>

          <button
            onClick={handleVerify}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}
