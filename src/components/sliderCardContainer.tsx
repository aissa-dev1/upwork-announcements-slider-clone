import KeyboardInstructions from "./keyboardInstructions";

interface Props {
  sliderCard: JSX.Element;
}

export function SliderCardContainer({ sliderCard }: Props) {
  return (
    <div className="flex flex-col w-full gap-2 lg:w-3/4">
      {sliderCard}
      <KeyboardInstructions />
    </div>
  );
}
