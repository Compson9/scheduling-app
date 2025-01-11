// import MeetingForm from "./components/MeetingForm";
import { RainbowButton } from "@/components/ui/rainbow-button";

import { HeroText } from "./components/HeroText";
import Link from "next/link";
import { Iphone15ProDemo } from "@/components/Iphone15Demo";


export default function Home() {
  return (
    <div className="flex flex-col lg:mt-[-100px] mt-[-120px] items-center justify-center min-h-screen py-2">
      {/* Welcome Section */}
      <section className="text-center ">
        <HeroText/>
      </section>
      <Iphone15ProDemo/>
      {/* Get started Button */}
      <Link href="/meeting" className="lg:mt-[-110px] mt-[-80px]  ">
      <RainbowButton>Get Started </RainbowButton>
      </Link>
    </div>
  );
}

