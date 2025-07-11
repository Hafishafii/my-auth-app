import html2canvas from "html2canvas";
import { useState } from "react";

export default function PaymentSuccess() {
  const [copiedText, setCopiedText] = useState("");

  const handleDownload = async (id) => {
    const receipt = document.getElementById(id);
    if (!receipt) return;

    const canvas = await html2canvas(receipt);
    const link = document.createElement("a");
    link.download = `${id}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleShare = async () => {
    const shareData = {
      title: "Payment Receipt",
      text: "Payment completed successfully.",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        alert("Sharing not supported on this device.");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedText(text);
        setTimeout(() => setCopiedText(""), 2000);
      })
      .catch((err) => {
        console.error("Copy failed:", err);
      });
  };

  const renderCard = ({
    id,
    amount,
    words,
    toName,
    toLogo,
    fromPhone,
    upi,
    bank,
    time,
    ref,
  }) => (
    <div
      id={id}
      className="relative bg-gray-100 p-6 rounded-md shadow-md md:p-8 md:rounded-xl overflow-hidden max-w-xl md:max-w-2xl lg:max-w-3xl w-full"
    >
      <p className="text-xl font-semibold mb-2">
        Amount <span className="text-green-600">{amount} ✅</span>
      </p>
      <p className="text-sm text-gray-500 mb-4">{words}</p>

      <p className="text-base font-medium mb-1">To</p>
      <div className="flex items-center gap-2 mb-4">
        <img src={toLogo} alt={toName} className="w-5 h-5 md:w-6 md:h-6" />
        <p className="text-base">{toName}</p>
      </div>

      <p className="text-base font-medium mb-1">From</p>
      <p className="text-base mb-1">{fromPhone}</p>
      <p className="text-sm text-gray-500 mb-1">UPI ID: {upi}</p>
      <p className="text-sm text-gray-500 mb-1">{bank}</p>
      <p className="text-sm text-gray-500 mb-1">{time}</p>

      <p className="text-sm text-gray-500">
        UPI Ref No: {ref}{" "}
        <span
          onClick={() => handleCopy(ref)}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          copy
        </span>
      </p>

      {copiedText === ref && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        bg-black text-white text-sm px-4 py-1 rounded shadow 
                        animate-fade-in-out z-10">
          Copied!
        </div>
      )}

      <div className="flex justify-between mt-6 space-x-2">
        <button
          onClick={() => handleDownload(id)}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto"
        >
          Download
        </button>
        <button
          onClick={handleShare}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto"
        >
          Share
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center gap-6 px-4 pt-20 md:pt-32">
      {renderCard({
        id: "receipt1",
        amount: "₹349",
        words: "Rupees Three Hundred Forty Nine Only",
        toName: "Airtel Prepaid",
        toLogo: "/logos/airtel.png",
        fromPhone: "+91 9999990000",
        upi: "9999990000@paytm",
        bank: "ESAF Small Finance Bank - 1710",
        time: "Paid at 08:03 PM, 22 June 2025",
        ref: "4245346134535",
      })}
      {renderCard({
        id: "receipt2",
        amount: "₹199",
        words: "Rupees One Hundred Ninety Nine Only",
        toName: "Jio Prepaid",
        toLogo: "/logos/jio.png",
        fromPhone: "+91 8888888888",
        upi: "8888888888@upi",
        bank: "SBI Bank - 1122",
        time: "Paid at 09:45 AM, 25 June 2025",
        ref: "784512354846",
      })}
    </div>
  );
}
