import { cn } from "@/lib/utils"

interface PasswordStrengthMeterProps {
  strength: number // 0-4 scale
}

export function PasswordStrengthMeter({ strength }: PasswordStrengthMeterProps) {
  const getLabel = () => {
    switch (strength) {
      case 0:
        return "Very Weak"
      case 1:
        return "Weak"
      case 2:
        return "Fair"
      case 3:
        return "Good"
      case 4:
        return "Strong"
      default:
        return "Very Weak"
    }
  }

  const getColor = () => {
    switch (strength) {
      case 0:
        return "bg-destructive/50"
      case 1:
        return "bg-destructive"
      case 2:
        return "bg-yellow-500"
      case 3:
        return "bg-green-500"
      case 4:
        return "bg-primary"
      default:
        return "bg-destructive/50"
    }
  }

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <div className="flex space-x-1 h-1.5 w-full">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={cn("h-full flex-1 rounded-full transition-colors", i < strength ? getColor() : "bg-border")}
            />
          ))}
        </div>
      </div>
      <p
        className={cn(
          "text-xs",
          strength === 0
            ? "text-destructive/50"
            : strength === 1
              ? "text-destructive"
              : strength === 2
                ? "text-yellow-500"
                : strength === 3
                  ? "text-green-500"
                  : "text-primary",
        )}
      >
        {getLabel()}
      </p>
    </div>
  )
}
