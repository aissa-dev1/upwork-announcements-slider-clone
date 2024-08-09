import InstructionKey from "./instructionKey";

export default function KeyboardInstructions() {
  return (
    <div className="flex flex-col gap-3 px-2 py-4 text-white bg-slate-600">
      <h3 className="text-lg font-medium capitalize">Keyboard instructions</h3>
      <div className="flex flex-wrap items-center gap-4">
        <InstructionKey symbol="←" action="Previous card" />
        <InstructionKey symbol="→" action="Next card" />
      </div>
    </div>
  );
}
