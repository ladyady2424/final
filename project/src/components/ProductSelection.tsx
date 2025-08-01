import React, { useRef, useState } from "react";
import Header from "./Header";
import RoomSelector from "./RoomSelector";
import AddOnSelector from "./AddOnSelector";
import MealSelector from "./MealSelector";
import SummaryModal from "./SummaryModal";
import "./ProductSelection.css";

type Item = {
  id: string;
  name: string;
  unitCost: number;
  quantity: number;
};

const ProductSelection: React.FC = () => {
  const roomRef = useRef<HTMLDivElement>(null);
  const addonRef = useRef<HTMLDivElement>(null);
  const mealRef = useRef<HTMLDivElement>(null);

  const [roomItems, setRoomItems] = useState<Item[]>([]);
  const [addonItems, setAddonItems] = useState<Item[]>([]);
  const [mealItems, setMealItems] = useState<Item[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const scrollToSection = (section: "venue" | "addons" | "meals") => {
    const headerOffset = 80;
    let element: HTMLDivElement | null = null;

    if (section === "venue") element = roomRef.current;
    else if (section === "addons") element = addonRef.current;
    else if (section === "meals") element = mealRef.current;

    if (element) {
      const y =
        element.getBoundingClientRect().top +
        window.pageYOffset -
        headerOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleShowDetails = () => {
    setShowSummary(true);
  };

  const handleCloseModal = () => {
    setShowSummary(false);
  };

  const allItems = [...roomItems, ...addonItems, ...mealItems];
  const totalCost = allItems.reduce(
    (acc, item) => acc + item.unitCost * item.quantity,
    0
  );

  return (
    <div>
      <Header onScrollTo={scrollToSection} onShowDetails={handleShowDetails} />

      <div ref={roomRef}>
        <RoomSelector onChange={setRoomItems} />
      </div>

      <div ref={addonRef}>
        <AddOnSelector onChange={setAddonItems} />
      </div>

      <div ref={mealRef}>
        <MealSelector onChange={setMealItems} />
      </div>

      {showSummary && (
        <SummaryModal
          items={allItems}
          totalCost={totalCost}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProductSelection;
