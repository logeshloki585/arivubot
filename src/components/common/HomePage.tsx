"use client";

import { GetChatbot } from "@/app/actions/Chatbot";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ChatBotCard from "./ChatbotCard";

type ChatbotData = {
  name: string;
  chatbotId: string;
};

export default function UserPage() {
  const router = useRouter();
  const [data, setData] = useState<ChatbotData[]>([]);

  useEffect(() => {
    async function fx() {
      const res = await GetChatbot("673093f8eef41f1150f230b0");
      console.log(res);
      const result = Array.isArray(res.res) ? res.res : [res.res];
      setData(result);
    }
    fx();
  }, []);

  const buttonClickHandler = () => {
    router.push("/create");
  };

  return (
    <>
      <div className="mt-[100px] mx-20 flex justify-between w-[1100px]">
        <h1 className=" text-4xl font-bold">ChatBots</h1>
        <Button onClick={buttonClickHandler}>New Chatbot</Button>
      </div>
      <div>
        {data.length === 0 ? (
          <div className="mt-20 flex justify-center">
            There are No ChatBot Created Please create Some!
          </div>
        ) : (
          <div className="ml-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
            {data.map((e: ChatbotData, index: number) => (
              <ChatBotCard key={index} name={e.name} chatbotId={e.chatbotId} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
