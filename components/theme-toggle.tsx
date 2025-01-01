// components/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="absolute top-5 right-5 flex gap-2">
      <Link href="https://github.com/zedanux/kindness">
        <Button variant="outline" className="relative">
          <span>
            <FaGithub className="h-[1.2rem] w-[1.2rem]" />
          </span>
          Source
        </Button>
      </Link>
      <Button
        variant="outline"
        size="icon"
        className="relative"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <SunIcon className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
        )}
      </Button>
    </div>
  );
}
