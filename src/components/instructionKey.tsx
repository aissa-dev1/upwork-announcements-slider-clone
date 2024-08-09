interface Props {
  symbol: string;
  action: string;
}

export default function InstructionKey({ symbol, action }: Props) {
  return (
    <div className="flex items-center gap-2 p-1 text-black bg-white rounded">
      <span className="flex items-center justify-center text-white rounded size-8 bg-slate-600">
        {symbol}
      </span>
      <span className="text-sm font-medium capitalize">{action}</span>
    </div>
  );
}
