import { useState } from "react";
import GlassCard from "./components/GlassCard";


export default function App() {
  const [cards, setCards] = useState([{ id: 1 }]);

  const addCard = () => {
    const newId = cards.length > 0 ? cards[cards.length - 1].id + 1 : 1;
    setCards([...cards, { id: newId }]);
  };

  const deleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <div className="min-h-screen bg-black relative">
      <button
        onClick={addCard}
        className="fixed top-5 left-5 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 z-50"
      >
        Add New Card
      </button>

      {cards.map((card) => (
        <GlassCard key={card.id} id={card.id} onDelete={deleteCard} />
      ))}
    </div>
  );
}
