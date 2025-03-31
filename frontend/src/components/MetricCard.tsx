import React from "react";

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex items-center justify-between">
      <div>
        <h4 className="text-sm text-gray-500 font-semibold">{title}</h4>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      <div className="text-indigo-700 bg-indigo-100 p-2 rounded-full">
        {icon}
      </div>
    </div>
  );
};

export default MetricCard;
