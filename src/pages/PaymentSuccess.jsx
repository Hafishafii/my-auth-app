import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import html2canvas from "html2canvas";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const id = params.get("id");
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!id || !token) return;

    fetch(`http://13.203.154.168/api/purchases/history?page=1`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const match = data.results?.find((r) => r.id.toString() === id);
        if (match) setReceipt(match);
      })
      .catch(() => console.error("Error loading receipt"))
      .finally(() => setLoading(false));
  }, [id, token]);

  const handleDownload = async () => {
    const element = document.getElementById("receipt");
    if (!element) return;
    const canvas = await html2canvas(element);
    const link = document.createElement("a");
    link.download = "receipt.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  if (loading) return <p className="text-center p-4">Loading...</p>;
  if (!receipt) return <p className="text-center p-4 text-red-500">Receipt not found.</p>;

  return (
    <div className="min-h-screen flex flex-col items-center gap-6 px-4 pt-20 md:pt-32 bg-gray-50">
      <div id="receipt" className="bg-white rounded shadow-md p-6 w-full max-w-xl text-black">
        <h2 className="text-xl font-bold mb-4 text-center text-green-600">Recharge Success</h2>
        <p><strong>Amount:</strong> ₹{receipt.amount}</p>
        <p><strong>Phone:</strong> {receipt.phone_number}</p>
        <p><strong>Plan:</strong> {receipt.plan_title}</p>
        <p><strong>Provider:</strong> {receipt.provider_name}</p>
        <p><strong>UPI Ref No:</strong> {receipt.transaction_id}</p>
        <p><strong>Status:</strong> <span className={`font-semibold ${receipt.payment_status === "success" ? "text-green-600" : "text-red-500"}`}>{receipt.payment_status}</span></p>
        <p><strong>Date:</strong> {new Date(receipt.created_at).toLocaleString()}</p>
      </div>

      <button
        onClick={handleDownload}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
      >
        Download Receipt
      </button>
    </div>
  );
}
