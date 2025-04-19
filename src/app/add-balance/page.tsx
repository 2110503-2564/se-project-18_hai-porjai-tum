"use client";

import { useState } from "react";
import { FaCreditCard, FaWallet, FaPaypal } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function AddBalancePage() {
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const [amount, setAmount] = useState("");
    const [cardInfo, setCardInfo] = useState({ number: "", expiry: "", cvc: "" });
    const [walletId, setWalletId] = useState("");
    const router = useRouter();

    const handleSubmit = () => {
        if (!selectedMethod || !amount) {
            alert("Select a method and enter amount.");
            return;
        }

        if (selectedMethod === "PayPal") {
            // Simulate redirect
            window.location.href = `https://www.paypal.com/paypalme/yourusername/${amount}`;
        } else {
            alert(`Successfully added $${amount} via ${selectedMethod}`);
            // Optionally update user balance here
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center py-10 px-4">
            <h1 className="text-4xl font-bold mb-6 text-center neon-text">Top Up Balance</h1>

            <div className="w-full max-w-md bg-gray-950 p-6 rounded-2xl shadow-xl border border-gray-700">
                <div className="space-y-4">
                    <label className="block text-lg font-medium">Select Method:</label>
                    <div className="grid grid-cols-3 gap-4">
                        {/* Payment method buttons */}
                        <MethodButton
                            label="Debit Card"
                            selected={selectedMethod}
                            setSelected={setSelectedMethod}
                            icon={<FaCreditCard size={30} />}
                        />
                        <MethodButton
                            label="TrueMoney Wallet"
                            selected={selectedMethod}
                            setSelected={setSelectedMethod}
                            icon={<FaWallet size={30} />}
                        />
                        <MethodButton
                            label="PayPal"
                            selected={selectedMethod}
                            setSelected={setSelectedMethod}
                            icon={<FaPaypal size={30} />}
                        />
                    </div>

                    {/* Amount Input */}
                    <div>
                        <label className="block text-lg font-medium mb-2">Amount</label>
                        <input
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none"
                        />
                    </div>

                    {/* 🧾 Dynamic Forms */}
                    {selectedMethod === "Debit Card" && (
                        <div className="space-y-3 pt-4">
                            <input
                                type="text"
                                placeholder="Card Number"
                                value={cardInfo.number}
                                onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg"
                            />
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="MM/YY"
                                    value={cardInfo.expiry}
                                    onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                                    className="w-1/2 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg"
                                />
                                <input
                                    type="text"
                                    placeholder="CVC"
                                    value={cardInfo.cvc}
                                    onChange={(e) => setCardInfo({ ...cardInfo, cvc: e.target.value })}
                                    className="w-1/2 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg"
                                />
                            </div>
                        </div>
                    )}

                    {selectedMethod === "TrueMoney Wallet" && (
                        <div className="pt-4">
                            <input
                                type="text"
                                placeholder="Wallet ID or Phone"
                                value={walletId}
                                onChange={(e) => setWalletId(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg"
                            />
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        className="w-full mt-6 py-2 bg-red-500 hover:bg-orange-600 text-white rounded-xl font-bold text-lg transition"
                    >
                        Confirm Top-Up
                    </button>
                </div>
            </div>
        </div>
    );
}


function MethodButton({ label, selected, setSelected, icon }: any) {
    const isSelected = selected === label;
    const baseStyle = "flex flex-col items-center justify-center p-4 rounded-xl border transition hover:scale-105";
    const selectedStyle = isSelected ? "border-red-400 bg-orange-800" : "border-gray-600 bg-gray-800";

    return (
        <button onClick={() => setSelected(label)} className={`${baseStyle} ${selectedStyle}`}>
            {icon}
            <span className="mt-2 text-sm text-center">{label}</span>
        </button>
    );
}
