import React from "react";
import { Link } from "react-router-dom";

interface QuickLinkCardProps {
  to: string;
  title: string;
  description: string;
}

const QuickLinkCard: React.FC<QuickLinkCardProps> = ({
  to,
  title,
  description,
}) => {
  return (
    <Link to={to} className="block">
      <div className="bg-white shadow-lg rounded-xl p-5 hover:bg-indigo-50 transition-colors cursor-pointer">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-sm text-gray-500 mt-2">{description}</p>
      </div>
    </Link>
  );
};

export default QuickLinkCard;
