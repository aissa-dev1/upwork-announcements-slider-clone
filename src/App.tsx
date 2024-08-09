import { SliderCardContainer } from "./components/sliderCardContainer";
import SliderCard from "./components/sliderCard";
import { sliderData } from "./data";

function App() {
  return (
    <div className="container flex justify-center p-4 mx-auto">
      <SliderCardContainer sliderCard={<SliderCard list={sliderData} />} />
    </div>
  );
}

export default App;
