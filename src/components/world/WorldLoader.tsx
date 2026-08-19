const PIXELS = [0, 1, 2, 3, 4];
const BAR_CELLS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function WorldLoader({ progress }: { progress?: number }) {
  const filled = progress === undefined ? 0 : Math.round((progress / 100) * BAR_CELLS.length);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0e0d12] p-6">
      <div className="w-full max-w-sm bg-[#2a2933] border-4 border-black shadow-[inset_2px_2px_0_rgba(255,255,255,0.15),inset_-2px_-2px_0_rgba(0,0,0,0.5)] p-8 text-center space-y-6">
        <p className="font-minecraft text-sm text-mauve [text-shadow:3px_3px_0_rgba(0,0,0,0.6)]">
          loading world
        </p>

        <div className="flex items-center justify-center gap-1.5">
          {PIXELS.map((i) => (
            <span
              key={i}
              className="w-3 h-3 bg-mauve animate-pulse"
              style={{ animationDelay: `${i * 140}ms` }}
            />
          ))}
        </div>

        {progress !== undefined && (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-1">
              {BAR_CELLS.map((i) => (
                <span
                  key={i}
                  className={`w-4 h-4 border-2 border-black ${i < filled ? 'bg-mauve' : 'bg-[#1a1922]'}`}
                />
              ))}
            </div>
            <p className="font-minecraft text-[10px] text-white/70">{Math.round(progress)}%</p>
          </div>
        )}
      </div>
    </div>
  );
}
