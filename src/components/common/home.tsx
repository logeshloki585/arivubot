"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Navbar from "./navbar/Navbar";
import { Star } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-12 py-12 grid lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div className="inline-flex items-center rounded-full border bg-white px-4 py-2">
            <span className="text-sm">Announcing our Ai powered ChatBot →</span>
          </div>
          <h1 className="text-5xl font-bold leading-tight">
            The natural language interface for customer Interaction
          </h1>

          <p className="text-xl text-gray-600">
            AI powered analysis across all your customer data. Sync outputs to
            other systems.
          </p>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current text-black" />
              ))}
            </div>
            <span className="text-sm font-medium">4.8 rating →</span>
          </div>

          <div className="max-w-md space-y-4">
            <div className="flex gap-2">
              <Input placeholder="Your work email" className="flex-1" />
              <Button className="bg-[#C1F664] text-black hover:bg-[#b1e654]">
                Get started
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Onboarding takes less than 2 Minutes
            </p>
          </div>
        </div>

        <div className="relative">
          <Card className="p-6 space-y-4 bg-white shadow-lg rounded-lg">
            <div className="bg-[#1B3409] text-white p-4 rounded-lg flex items-center gap-2">
              <span className="text-[#C1F664] font-bold">+</span>
              How many web visitors have we had the past 4 weeks?
            </div>

            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="py-2 text-gray-600">Week ending</th>
                  <th className="py-2 text-gray-600">Web visitors</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: "2023-11-05", visitors: "125,000" },
                  { date: "2023-11-12", visitors: "152,000" },
                  { date: "2023-11-19", visitors: "181,000" },
                  { date: "2023-11-26", visitors: "200,000" },
                ].map((row) => (
                  <tr key={row.date} className="border-t">
                    <td className="py-2">{row.date}</td>
                    <td className="py-2 font-medium">{row.visitors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </main>
    </div>
  );
}
