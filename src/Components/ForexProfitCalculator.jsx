import { useState } from "react";
import { ArrowRightCircle } from "lucide-react";

const ForexProfitCalculator = () => {
  const [entry, setEntry] = useState("Entry Price");
  const [exit, setExit] = useState("Exit Price");
  const [lotSize, setLotSize] = useState(0.01);
  const [pair, setPair] = useState("BTCUSD");
  const [result, setResult] = useState(null);

  const pipValuePerLot = {
    BTCUSD: 1,
    XAUUSD: 1,
  };

  const calculateProfit = () => {
    if (!entry || !exit || !lotSize || !pair) return;

    const pipDifference = Math.abs(exit - entry);
    const pipPerDollar = pipValuePerLot[pair] || 10;
    const profit =
      (pipDifference / (pair === "BTCUSD" || pair === "XAUUSD" ? 1 : 0.0001)) *
      (lotSize * pipPerDollar);

    setResult({
      pips: (pipDifference / (pair === "BTCUSD" || pair === "XAUUSD" ? 1 : 0.0001)).toFixed(2),
      profit: profit.toFixed(2),
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6  rounded-3xl bg-[#1C1C1E] shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] border border-[#2C2C2E] text-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#0A84FF]">📊 Forex Profit Calculator</h2>

      <div className="grid grid-cols-1 gap-5">
        <div>
          <label className="block text-sm font-semibold mb-1 text-[#D1D1D6]">Select Pair</label>
          <select
            className="w-full p-2 bg-[#2C2C2E] text-white border border-[#3A3A3C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A84FF]"
            value={pair}
            onChange={(e) => setPair(e.target.value)}
          >
            <option value="BTCUSD">BTCUSD</option>
            <option value="XAUUSD">Gold (XAUUSD)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-[#D1D1D6]">Entry Price</label>
          <input
            type="number"
            placeholder="Enter entry price"
            className="w-full p-2 bg-[#2C2C2E] text-white border border-[#3A3A3C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A84FF]"
            value={entry}
            onChange={(e) => setEntry(parseFloat(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-[#D1D1D6]">Exit Price</label>
          <input
            type="number"
            placeholder="Enter exit price"
            className="w-full p-2 bg-[#2C2C2E] text-white border border-[#3A3A3C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A84FF]"
            value={exit}
            onChange={(e) => setExit(parseFloat(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-[#D1D1D6]">Lot Size</label>
          <input
            type="number"
            placeholder="e.g. 0.01"
            className="w-full p-2 bg-[#2C2C2E] text-white border border-[#3A3A3C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A84FF]"
            value={lotSize}
            onChange={(e) => setLotSize(parseFloat(e.target.value))}
          />
        </div>

        <button
          className="flex items-center justify-center gap-2 bg-[#0A84FF] hover:bg-[#006FE0] text-white py-2 px-4 rounded-xl text-lg font-semibold transition duration-200"
          onClick={calculateProfit}
        >
          <ArrowRightCircle size={20} /> Calculate Profit
        </button>

        {result && (
          <div className="mt-4 p-4 bg-[#2C2C2E] border border-[#3A3A3C] rounded-xl text-[#0A84FF]">
            <p className="text-lg font-medium">📈 Pips: <span className="font-bold text-white">{result.pips}</span></p>
            <p className="text-lg font-medium">💰 Estimated Profit: <span className="font-bold text-white">${result.profit}</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForexProfitCalculator;
