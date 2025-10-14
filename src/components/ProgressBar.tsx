type Props = { step: number; total: number };

export default function ProgressBar({ step, total }: Props) {
  return (
    <div className="w-full max-w-md mx-auto my-6">
      {/* Step counter text */}
      <div className="text-center text-gray-600 text-sm mb-2">
        Step {step} of {total}
      </div>

      {/* Progress dots */}
      <div className="flex items-center">
        {Array.from({ length: total }).map((_, i) => {
          const filled = i < step;
          const isCurrent = i === step - 1;
          return (
            <div key={i} className="flex-1 flex items-center">
              <div
                className={`w-4 h-4 rounded-full transition-all ${
                  filled
                    ? 'bg-indigo-600'
                    : isCurrent
                    ? 'bg-indigo-400 scale-110'
                    : 'bg-gray-300'
                }`}
              />
              {i < total - 1 && (
                <div className="flex-1 h-1 bg-gray-300 mx-2" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
