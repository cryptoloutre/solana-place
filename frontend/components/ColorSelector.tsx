import clsx from "clsx"
import { Color, colors } from "../lib/colors"

interface Props {
  selectedColor: Color,
  setSelectedColor: (color: Color) => void,
}

export default function ColorSelector({ selectedColor, setSelectedColor }: Props) {
  return (
    <div className="flex flex-row gap-4 py-4 lg:mx-auto">
      {colors.map((color, i) => {
        const isSelected = color === selectedColor

        return <div
          className={clsx("w-20 h-10 border border-black", !isSelected && "hover:scale-105", isSelected && "border-2 scale-125")}
          style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}
          onClick={() => setSelectedColor(color)}
          key={i}
        />
      })}
    </div>
  )
}
