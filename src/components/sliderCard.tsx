import { useEffect, useRef, useState } from "react";
import CardProgressContainer from "./cardProgressContainer";

// Type definition for a single card
export interface SliderCardType {
  id: string;
  backgroundColor: string;
  title: string;
  description: string;
  btnLink: string;
  btnText: string;
}

interface Props {
  list: SliderCardType[];
}

// Main SliderCard component
export default function SliderCard({ list }: Props) {
  // Index of the current card being displayed
  const [cardIndex, setCardIndex] = useState(0);
  // Width for progress bar of the current card
  const [currentCardWidth, setCurrentCardWidth] = useState(0);
  // Set of currently pressed keys
  const [keys, setKeys] = useState<Set<string>>(new Set([]));
  // Get the current card based on cardIndex
  const currentCard = Array.isArray(list) ? list[cardIndex] : null;
  // Reference to the interval for progress bar
  const intervalRef = useRef<number>(null!);

  // Handler for key down events
  function keyDown(e: KeyboardEvent) {
    setKeys((prev) => {
      const updatedKeys = new Set(prev);
      updatedKeys.add(e.key.toLowerCase());
      return updatedKeys;
    });
  }

  // Handler for key up events
  function keyUp(e: KeyboardEvent) {
    setKeys((prev) => {
      const updatedKeys = new Set(prev);
      updatedKeys.delete(e.key.toLowerCase());
      return updatedKeys;
    });
  }

  // Go to the previous card
  function prevCard() {
    setCardIndex((prev) => (prev <= 0 ? list.length - 1 : prev - 1));
    setCurrentCardWidth(0);
    clearInterval(intervalRef.current);
  }

  // Go to the next card
  function nextCard() {
    setCardIndex((prev) => (prev >= list.length - 1 ? 0 : prev + 1));
    setCurrentCardWidth(0);
    clearInterval(intervalRef.current);
  }

  // Check if a specific key is pressed
  function hasKey(k: string): boolean {
    return keys.has(k);
  }

  // Effect for handling the width of the progress bar and transitioning to the next card
  useEffect(() => {
    if (!currentCard) return;

    if (currentCardWidth >= 100) {
      nextCard();
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentCardWidth((prev) => prev + 1);
    }, 40);

    return () => clearInterval(intervalRef.current);
  }, [currentCardWidth, currentCard]);

  // Effect for applying and cleaning up keyboard event listeners
  useEffect(() => {
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);

    return () => {
      document.removeEventListener("keydown", keyDown);
      document.removeEventListener("keyup", keyUp);
    };
  }, []);

  // Effect for handling keyboard input to navigate cards
  useEffect(() => {
    if (hasKey("arrowleft")) {
      prevCard();
    }

    if (hasKey("arrowright")) {
      nextCard();
    }
  }, [keys]);

  // Render nothing if there is no current card
  if (!currentCard) return null;

  return (
    <div
      className="relative w-full h-56 p-8 text-white duration-500 rounded-2xl"
      style={{ backgroundColor: currentCard.backgroundColor }}
    >
      <div className="flex flex-col gap-3">
        <h1 className="font-semibold lg:text-xl">{currentCard.title}</h1>
        <h3 className="text-xl font-medium lg:text-2xl">
          {currentCard.description}
        </h3>
      </div>

      <a href={currentCard.btnLink} target="_blank">
        <button className="absolute px-6 py-1 font-medium text-black bg-white rounded-md left-8 bottom-8 hover:opacity-90">
          {currentCard.btnText}
        </button>
      </a>

      <div className="absolute flex flex-col flex-wrap items-end gap-4 left-[calc(100%-4rem)] bottom-2 lg:flex-row lg:-translate-x-1/2 lg:left-1/2">
        {list.map((card, i) => {
          if (cardIndex === i) {
            return (
              <CardProgressContainer
                key={card.id}
                onClick={() => {
                  setCardIndex(i);
                  setCurrentCardWidth(0);
                }}
              >
                <span
                  className="absolute top-0 left-0 h-full bg-black rounded-md rounded-r-none"
                  style={{ width: `${currentCardWidth}%` }}
                />
              </CardProgressContainer>
            );
          }

          return (
            <CardProgressContainer
              key={card.id}
              onClick={() => {
                setCardIndex(i);
                setCurrentCardWidth(0);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
