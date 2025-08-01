import React from "react";
import "./Header.css";

interface HeaderProps {
  onScrollTo: (section: "venue" | "addons" | "meals") => void;
  onShowDetails: () => void;
}

const Header: React.FC<HeaderProps> = ({ onScrollTo, onShowDetails }) => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">Conference Expense Planner</h1>
      </div>
      <div className="header-right">
        <button onClick={() => onScrollTo("venue")}>Venue</button>
        <button onClick={() => onScrollTo("addons")}>Add‑Ons</button>
        <button onClick={() => onScrollTo("meals")}>Meals</button>
        <button onClick={onShowDetails}>Show Details</button>
      </div>
    </header>
  );
};

export default Header;