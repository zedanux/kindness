import { Heart, Star, Smile, Sun, Gift } from "lucide-react";

export function BackgroundIcons() {
  const icons = [Heart, Star, Smile, Sun, Gift];
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="" />
      {icons.map((Icon, index) => (
        <Icon
          key={index}
          className="absolute text-black/10 dark:text-white/20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 40 + 20}px`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
}
