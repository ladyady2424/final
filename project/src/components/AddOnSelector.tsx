import React, { useEffect, useState } from "react";
import "./AddOnSelector.css";

import MPImg from "../assets/MP.jpeg";
import SPImg from "../assets/SP.jpg";
import PJRImg from "../assets/PJR.jpg";
import WBImg from "../assets/WB.jpg";
import SNImg from "../assets/SN.jpg";

type Item = {
  id: string;
  name: string;
  unitCost: number;
  quantity: number;
};

const defaultAddOns: Item[] = [
  { id: "mp", name: "Microphone", unitCost: 45, quantity: 0 },
  { id: "sp", name: "Speaker", unitCost: 35, quantity: 0 },
  { id: "pjr", name: "Projector", unitCost: 200, quantity: 0 },
  { id: "wb", name: "Whiteboard", unitCost: 80, quantity: 0 },
  { id: "sn", name: "Signage", unitCost: 80, quantity: 0 },
];

const imageMap: Record<string, string> = {
  mp: MPImg,
  sp: SPImg,
  pjr: PJRImg,
  wb: WBImg,
  sn: SNImg,
};

interface AddOnSelectorProps {
  onChange: (items: Item[]) => void;
}

const AddOnSelector: React.FC<AddOnSelectorProps> = ({ onChange }) => {
  const [addOns, setAddOns] = useState<Item[]>(defaultAddOns);

  useEffect(() => {
    onChange(addOns);
  }, [addOns, onChange]);

  const updateQuantity = (id: string, delta: number) => {
    setAddOns((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
    );
  };

  const totalAddOnCost = addOns.reduce(
    (sum, item) => sum + item.unitCost * item.quantity,
    0
  );

  return (
    <div className="addon-selector">
      <h2 className="section-title">Add‑Ons Selection</h2>
      <div className="addon-grid">
        {addOns.map((item) => (
          <div key={item.id} className="addon-card">
            <img src={imageMap[item.id]} alt={item.name} className="addon-image" />
            <h3>{item.name}</h3>
            <p>${item.unitCost}</p>
            <div className="qty-controls">
              <button onClick={() => updateQuantity(item.id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, 1)}>+</button>
            </div>
          </div>
        ))}
      </div>

      {}
      <div className="addon-total-card">
        <h3>Total Add‑Ons Cost: ${totalAddOnCost}</h3>
      </div>
    </div>
  );
};

export default AddOnSelector;