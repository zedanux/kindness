import KindnessGenerator from "@/components/kindness-generator";
import { BackgroundIcons } from "@/components/background-icons";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24 relative overflow-hidden">
      <BackgroundIcons />
      <KindnessGenerator />
    </main>
  );
}
