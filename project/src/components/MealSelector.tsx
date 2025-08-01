import React, { useEffect, useState } from "react";
import "./MealSelector.css";

type InternalItem = {
  id: string;
  name: string;
  unitCost: number;
  checker: boolean;
};

type OutputItem = {
  id: string;
  name: string;
  unitCost: number;
  quantity: number;
};

const defaultMeals: InternalItem[] = [
  { id: "bf", name: "Breakfast", unitCost: 50, checker: false },
  { id: "ht", name: "High Tea", unitCost: 25, checker: false },
  { id: "lu", name: "Lunch", unitCost: 65, checker: false },
  { id: "dn", name: "Dinner", unitCost: 70, checker: false },
];

interface MealSelectorProps {
  onChange: (items: OutputItem[]) => void;
}

const MealSelector: React.FC<MealSelectorProps> = ({ onChange }) => {
  const [meals, setMeals] = useState<InternalItem[]>(defaultMeals);
  const [numPeople, setNumPeople] = useState<number>(0);

  useEffect(() => {
    const calculatedMeals: OutputItem[] = meals.map((meal) => ({
      id: meal.id,
      name: meal.name,
      unitCost: meal.unitCost,
      quantity: meal.checker ? numPeople : 0,
    }));
    onChange(calculatedMeals);
  }, [meals, numPeople, onChange]);

  const toggleChecker = (id: string) => {
    setMeals((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checker: !item.checker } : item
      )
    );
  };

  const totalMealCost = meals.reduce(
    (sum, item) => sum + (item.checker ? item.unitCost : 0),
    0
  ) * numPeople;

  return (
    <div className="meal-selector">
      <h2 className="section-title">Meals Selection</h2>

      <div className="people-input">
        <label>Number of People: </label>
        <input
          type="number"
          min={0}
          value={numPeople}
          onChange={(e) => setNumPeople(Math.max(0, Number(e.target.value)))}
        />
      </div>

      <div className="meal-grid">
        <div className="meal-row">
          {meals.slice(0, 2).map((item) => (
            <div key={item.id} className="meal-item">
              <h3>
                <label>
                  <input
                    type="checkbox"
                    checked={item.checker}
                    onChange={() => toggleChecker(item.id)}
                  />{" "}
                  {item.name}
                </label>
              </h3>
              <p>${item.unitCost}</p>
            </div>
          ))}
        </div>
        <div className="meal-row">
          {meals.slice(2).map((item) => (
            <div key={item.id} className="meal-item">
              <h3>
                <label>
                  <input
                    type="checkbox"
                    checked={item.checker}
                    onChange={() => toggleChecker(item.id)}
                  />{" "}
                  {item.name}
                </label>
              </h3>
              <p>${item.unitCost}</p>
            </div>
          ))}
        </div>
      </div>

      {}
      <div className="meal-total-card">
        <h3>
          Total Meals Cost ({numPeople} {numPeople === 1 ? "person" : "people"}): ${totalMealCost}
        </h3>
      </div>
    </div>
  );
};

export default MealSelector;