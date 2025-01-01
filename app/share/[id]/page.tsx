import { createClient } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackgroundIcons } from "@/components/background-icons";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, ShareIcon } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function SharedKindnessAct({
  params,
}: {
  params: { id: string };
}) {
  const { data, error } = await supabase
    .from("kindness_acts")
    .select("act")
    .eq("id", params.id)
    .single();

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden">
        <ThemeToggle />
        <div className="flex flex-col items-center justify-center max-w-[700px] relative overflow-hidden border p-12 max-w-[90%]">
          <h1 className="text-5xl font-black text-center mb-2">404</h1>
          <p className="text-lg text-center font-medium text-neutral-500 dark:text-neutral-400 mb-3">
            It seems like something went wrong. Please try again. If the problem
            persists, please contact us.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden">
      <ThemeToggle />
      <div className="flex flex-col items-center justify-center max-w-[700px] relative overflow-hidden border p-12 max-w-[90%]">
        <span>
          <FaHeart className="h-14 w-14 text-red-500 mb-3" />
        </span>
        <h1 className="text-4xl font-bold text-center mb-2">Act of Kindness</h1>
        <p className="text-lg text-center font-medium text-neutral-500 dark:text-neutral-400 mb-3">
          You've been shared an act of kindness. Being kind is a gift that you
          can give to others.
        </p>
        <div className="mt-2 bg-gray-100 dark:bg-neutral-800 p-4 w-full">
          {data.act ? (
            <span className="text-[18px] font-mono ">
              <IoSparkles className="h-5 w-5 inline text-yellow-400 mr-1" />{" "}
              {data.act}
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-yellow-300 animate-pulse"></div>
              <span className="text-[18px] font-mono ">
                <span className="animate-pulse">Loading...</span>
              </span>
            </div>
          )}
        </div>
        <Link href="/">
          <Button className="w-full px-20 mt-6 bg-black text-white py-[22px] hover:bg-black/80 text-[16px] rounded-full dark:bg-white dark:text-black dark:hover:bg-white/80">
            Generate New
          </Button>
        </Link>
      </div>
      <BackgroundIcons />
    </main>
  );
}
