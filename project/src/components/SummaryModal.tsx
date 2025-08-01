import React from "react";
import "./SummaryModal.css";

type Item = {
  id: string;
  name: string;
  unitCost: number;
  quantity: number;
};

interface Props {
  items: Item[];
  totalCost: number;
  onClose: () => void;
}

const SummaryModal: React.FC<Props> = ({ items, totalCost, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Total Event Cost</h2>
        <p className="total-cost">${totalCost.toLocaleString()}</p>

        <table className="summary-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Unit Cost</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items
              .filter((item) => item.quantity > 0)
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.unitCost.toLocaleString()}</td>
                  <td>{item.quantity}</td>
                  <td>
                    ${(item.unitCost * item.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SummaryModal;
