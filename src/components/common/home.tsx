"use client";

import { Button } from "@/components/ui/button";
import Navbar from "./navbar/Navbar";
import { ArrowRight, PartyPopper } from "lucide-react";
import ChooseLLM from "./ChooseLLM";
import HowItWorks from "./HowitWorks";
import Footer from "./footer";
import Features from "./Features";
import { Cover } from "../ui/cover";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto">
        <div className="flex flex-col items-center  bg-white text-center px-4 pt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-200 rounded-full text-white text-sm mb-6">
            <span className="bg-zinc-900 rounded-lg px-[0.5rem] py-[1px]">
              New
            </span>
            <span className="w-1 h-1 bg-red-500 rounded-full" />
            <span className="text-black flex mt-1">
              AI Automation is now live <PartyPopper className="ml-1" />
            </span>
          </div>
          <h1 className="text-4xl sm:text-8xl font-semibold mb-4">Customize</h1>
          <h2 className="text-4xl sm:text-8xl font-semibold mb-6">
            <Cover>LLM for your business</Cover>
          </h2>
          <p className="text-zinc-600 max-w-xl mb-6">
            Build a custom GPT, embed it in your website and let it handle
            customer support, lead generation, engage with your users, and more.
          </p>
          <Button size="lg" className="mb-2 bg-[#1171BA]">
            Build Your Chatbot <ArrowRight />
          </Button>
          <p className="text-sm text-zinc-500 mb-12">No credit card required</p>
        </div>

        <div
          className="relative flex justify-center items-center py-10 "
          style={{
            backgroundImage: "url('/svg/Grid.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img
            src="/ChatGPT.png"
            alt="ChatGPT Illustration"
            className="max-w-full"
            style={{ width: "80%", maxWidth: "800px" }}
          />
        </div>
        <div>
          <ChooseLLM />
          <HowItWorks />
          <Features />
          <div className="my-[80px] mx-auto max-w-3xl">
            <img src="/group.png" alt="group" />
          </div>
          <div className="my-[80px] mx-auto max-w-6xl">
            <img src="/testimonials.png" alt="reviews" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
