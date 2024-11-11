import * as React from "react";
import { RefreshCcw, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useParams } from "next/navigation";
import currentUser, { getUserId } from "@/app/actions/user";
import { useEffect, useState } from "react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

export default function ChatBox() {
  const backgroundApi = process.env.NEXT_PUBLIC_BACKEND_API;
  const params = useParams();
  const id = params.slug;
  const [message, setMessage] = React.useState("");
  const [chatMessages, setChatMessages] = React.useState<Message[]>([
    {
      id: 1,
      text: "Hi! What can I help you with?",
      sender: "bot",
    },
  ]);
  const [isTyping, setIsTyping] = React.useState(false);

  const [user, setUser] = useState<any>("");

  useEffect(() => {
    async function fxxn() {
      try {
        const res = await currentUser();
        if (res?.user) {
          const result = await getUserId(res.user);
          console.log(result);
          setUser(result?.id);
        }
      } catch (e: any) {
        console.log(e);
      }
    }
    fxxn();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const newMessage: Message = {
      id: chatMessages.length + 1,
      text: message,
      sender: "user",
    };

    setChatMessages((prev) => [...prev, newMessage]);
    setMessage("");
    simulateBotReply();
  };

  const simulateBotReply = async () => {
    setIsTyping(true);

    const typingMessage: Message = {
      id: chatMessages.length + 2,
      text: "Typing...",
      sender: "bot",
    };

    setChatMessages((prev) => [...prev, typingMessage]);

    try {
      const response = await axios.post(
        `${backgroundApi}/chatresponse`,
        {
          question: message,
          userid: user.id,
          chatbotid: `${id}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setChatMessages((prev) => prev.filter((msg) => msg.text !== "Typing..."));

      const botReply: Message = {
        id: chatMessages.length + 2,
        text: response.data.data,
        sender: "bot",
      };

      setChatMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.log("Error fetching bot response:", error);
      setChatMessages((prev) =>
        prev.map((msg) =>
          msg.text === "Typing..."
            ? { ...msg, text: "Error: Unable to fetch response." }
            : msg
        )
      );
    }

    setIsTyping(false);
  };

  const handleRefresh = () => {
    setChatMessages([
      {
        id: 1,
        text: "Hi! What can I help you with?",
        sender: "bot",
      },
    ]);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="font-semibold">ChatBot</div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handleRefresh}
        >
          <RefreshCcw className="h-4 w-4" />
          <span className="sr-only">Refresh chat</span>
        </Button>
      </CardHeader>

      <CardContent className="space-y-4 max-h-[400px] overflow-y-auto">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`${
                msg.sender === "bot"
                  ? "bg-blue-100 text-gray-700"
                  : "bg-black text-white"
              } rounded-lg p-4 text-sm max-w-[70%] shadow-sm`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </CardContent>

      <CardFooter className="border-t pt-4">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
      <div className="text-center py-2 text-sm text-muted-foreground">
        Powered By Adrig.co.in
      </div>
    </Card>
  );
}
