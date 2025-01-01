"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShareIcon } from "lucide-react";
import { generateKindnessAct } from "@/app/actions";
import { createClient } from "@supabase/supabase-js";
import { FaHeart } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { ThemeToggle } from "./theme-toggle";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * KindnessGenerator is a component that displays a daily act of kindness
 * and allows the user to generate a new one, share the current one, and
 * submit a suggestion for a new act of kindness.
 *
 * State:
 *   - kindnessAct: the current act of kindness
 *   - userSuggestion: the user's suggestion for a new act of kindness
 *   - showToast: whether or not to show the toast
 */
export default function KindnessGenerator() {
  const [kindnessAct, setKindnessAct] = useState<string>("");
  const [userSuggestion, setUserSuggestion] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchKindnessAct();
    }
  }, []);

  const fetchKindnessAct = async () => {
    const act = await generateKindnessAct();
    setKindnessAct(act);
  };

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Handle the share button click by saving the current act of kindness
   * to the database and then using the Navigator Share API to share it.
   *
   * If the Navigator Share API is not available, copy the link to the clipboard.
   */
  /******  b99b5418-44df-44d8-bdbe-1db5ca30b817  *******/
  const handleShare = async () => {
    try {
      const { data, error } = await supabase
        .from("kindness_acts")
        .insert({
          act: kindnessAct,
          created_at: new Date(),
        })
        .select();

      if (error) throw error;

      if (!data || !data[0]?.id) {
        throw new Error("No shareable data returned from the database.");
      }

      const shareUrl = `${window.location.origin}/share/${data[0].id}`;

      if (navigator.share) {
        await navigator.share({
          title: "Daily Act of Kindness",
          text: kindnessAct,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert("Share link copied to clipboard!");
      }
    } catch (error: unknown) {
  if (error instanceof Error) {
    console.error("Error sharing:", error);
    alert("Failed to create share link: " + error.message);
  } else {
    console.error("Error sharing:", error);
    alert("Failed to create share link due to an unknown error.");
  }
}
  };

  const handleSuggestion = () => {
    const suggestions = JSON.parse(
      localStorage.getItem("kindnessSuggestions") || "[]"
    );
    suggestions.push(userSuggestion);
    localStorage.setItem("kindnessSuggestions", JSON.stringify(suggestions));
    setUserSuggestion("");
    alert("Thank you for your suggestion!");
  };

  return (
    <>
      <ThemeToggle />

      <div className="flex flex-col items-center justify-center max-w-[700px] relative overflow-hidden border">
        <div className="flex flex-col items-center justify-center p-12 gap-2">
          <span>
            <FaHeart className="h-14 w-14 text-red-500 mb-2" />
          </span>
          <h1 className="text-4xl font-bold text-center">
            Daily Act of Kindness
          </h1>
          <p className="text-[16px] text-center font-medium text-neutral-500 dark:text-neutral-400">
            Spread kindness wherever you go! A simple act of kindness can
            brighten someone&apos;s day and create a ripple of positivity.
          </p>
          <div className="mt-2 bg-gray-100 dark:bg-neutral-800 p-4 w-full">
            {kindnessAct ? (
              <span className="text-[18px] font-mono ">
                <IoSparkles className="h-5 w-5 inline text-yellow-400 mr-1" />{" "}
                {kindnessAct.replace(/'/g, "&apos;")}
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
        </div>
        {/* <div className="w-full h-0.5 m-4 bg-neutral-200 dark:bg-neutral-700" /> */}
        <div className="flex w-full gap-4 px-12 mb-8 -mt-4">
          <Button
            className="w-full bg-black text-white py-[22px] hover:bg-black/80 text-[16px] rounded-full dark:bg-white dark:text-black dark:hover:bg-white/80"
            onClick={() => fetchKindnessAct()}
          >
            Generate New
          </Button>
          <Button
            variant="outline"
            className="w-full py-5 text-[16px] rounded-full bg-neutral-200 border border-neutral-300 shadow-none hover:bg-neutral-200/80 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-800/80"
            onClick={handleShare}
          >
            Share <ShareIcon className="mr h-3 w-3" />
          </Button>
        </div>
        <div className="w-full h-0.5 bg-neutral-200 dark:bg-neutral-700" />
        <div className="flex w-full gap-2 px-12 py-6">
          <Input
            placeholder="Suggest an act of kindness"
            className="w-full rounded-full shadow-none py-5 px-4 bg-neutral-200 border-2 border-transparent hover:bg-neutral-200/80 hover:border-neutral-300 hover:shadow-none transition-colors duration-200 text-[16px] text-neutral-700 dark:text-neutral-200 font-regular dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-800/80"
            value={userSuggestion}
            onChange={(e) => setUserSuggestion(e.target.value)}
          />
          <Button
            className="w-fit py-5 text-[16px] rounded-full bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
            onClick={handleSuggestion}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}
