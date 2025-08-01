import React, { useState, useEffect } from 'react';
import './RoomSelector.css';

import AHImg from '../assets/AH.webp';
import CRImg from '../assets/CR.jpg';
import PRImg from '../assets/PR.webp';
import LMImg from '../assets/LM.jpg';
import SMImg from '../assets/SM.jpg';

type Item = {
  id: string;
  name: string;
  unitCost: number;
  quantity: number;
};

type Room = {
  id: string;
  name: string;
  capacity: number;
  unitCost: number;
  image: string;
};

const rooms: Room[] = [
  { id: 'aud', name: 'Auditorium Hall', capacity: 200, unitCost: 5500, image: AHImg },
  { id: 'conf', name: 'Conference Room', capacity: 15, unitCost: 1500, image: CRImg },
  { id: 'pres', name: 'Presentation Room', capacity: 50, unitCost: 3500, image: PRImg },
  { id: 'large', name: 'Large Meeting Room', capacity: 10, unitCost: 1000, image: LMImg },
  { id: 'small', name: 'Small Meeting Room', capacity: 5, unitCost: 800, image: SMImg },
];

interface Props {
  onChange: (items: Item[]) => void;
}

const RoomSelector: React.FC<Props> = ({ onChange }) => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const selectedItems: Item[] = rooms.map(room => ({
    id: room.id,
    name: room.name,
    unitCost: room.unitCost,
    quantity: quantities[room.id] || 0,
  }));

  const totalCost = selectedItems.reduce(
    (acc, item) => acc + item.unitCost * item.quantity,
    0
  );

  useEffect(() => {
    onChange(selectedItems);
  }, [quantities, onChange]);

  const increment = (id: string) => {
    setQuantities(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decrement = (id: string) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  return (
    <div className="room-selector">
      <h2 className="section-title">Venue Room Selection</h2>
      <div className="room-grid">
        {rooms.map(room => {
          const qty = quantities[room.id] || 0;
          return (
            <div key={room.id} className="room-card">
              <img src={room.image} alt={room.name} className="room-image" />
              <h3>{room.name} (Capacity: {room.capacity})</h3>
              <p>${room.unitCost}</p>
              <div className="qty-controls">
                <button onClick={() => decrement(room.id)}>-</button>
                <span>{qty}</span>
                <button onClick={() => increment(room.id)}>+</button>
              </div>
            </div>
          );
        })}
      </div>

      {}
      <div className="room-total-card">
        <h3>Total Cost: ${totalCost}</h3>
      </div>
    </div>
  );
};

export default RoomSelector;