import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { FaChartLine, FaDollarSign, FaPiggyBank, FaChartPie, FaMoneyCheck, FaChartBar } from "react-icons/fa";

const financialData = [
  { month: "Jan", revenue: 40000, expenses: 24000, profit: 16000 },
  { month: "Feb", revenue: 42000, expenses: 27000, profit: 15000 },
  { month: "Mar", revenue: 45000, expenses: 30000, profit: 15000 },
  { month: "Apr", revenue: 50000, expenses: 35000, profit: 15000 },
];

const pieData = [
  { name: "Revenue", value: 180000 },
  { name: "Expenses", value: 116000 },
  { name: "Profit", value: 64000 },
];

const barData = [
  { category: "Marketing", expense: 12000 },
  { category: "Salaries", expense: 45000 },
  { category: "Infrastructure", expense: 25000 },
  { category: "R&D", expense: 8000 },
];

const COLORS = ["#4CAF50", "#F44336", "#2196F3"];

const Financials = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-8 flex justify-center items-center">
        <FaChartLine className="mr-3 text-green-400" /> Financial Insights Dashboard
      </h2>
      <div className="flex justify-center gap-6 mb-8">
        {["overview", "cashflow", "analytics"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg font-semibold text-lg transition duration-300
              ${activeTab === tab ? "bg-green-500 shadow-lg" : "bg-gray-700 hover:bg-green-400"}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{ label: "Revenue", value: "$180,000", color: "green", icon: FaDollarSign },
            { label: "Expenses", value: "$116,000", color: "red", icon: FaMoneyCheck },
            { label: "Net Profit", value: "$64,000", color: "yellow", icon: FaPiggyBank }].map((item, idx) => (
            <div key={idx} className={`bg-gray-800 p-6 rounded-lg border-l-4 border-${item.color}-400`}>
              <h3 className="text-xl font-semibold flex items-center">
                {React.createElement(item.icon, { className: `text-${item.color}-400 mr-2` })} {item.label}
              </h3>
              <p className="mt-2 text-gray-300">{item.value} (Current Quarter)</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "cashflow" && (
        <div className="bg-gray-800 p-6 rounded-lg mt-6">
          <h3 className="text-xl font-semibold flex items-center">
            <FaChartLine className="text-blue-400 mr-2" /> Cash Flow Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#34D399" strokeWidth={3} />
              <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold flex items-center">
              <FaChartPie className="text-pink-400 mr-2" /> Revenue vs Expenses
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold flex items-center">
              <FaChartBar className="text-yellow-400 mr-2" /> Expense Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="expense" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Financials;
