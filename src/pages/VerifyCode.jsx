import { useRef } from "react";

export default function VerifyCode() {
  const inputsRef = useRef([]);

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

  return (
    <div className="min-h-screen bg-white relative px-4">
      <p className="absolute top-4 left-4 text-sm text-black cursor-pointer hover:underline">
        ← Back to login
      </p>

      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-sm w-full space-y-6 text-center">
          <h2 className="text-xl font-semibold">Verify code</h2>
          <p className="text-sm text-gray-600">
            An authentication code has been sent to your phone number.
          </p>

          <div className="flex justify-between gap-2">
            {[...Array(6)].map((_, idx) => (
              <input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength="1"
                className="w-10 h-12 border rounded text-center text-xl"
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

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}
