"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Upload } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { ChatBotCreation } from "@/app/actions/Chatbot";

const CreateChatBot = () => {
  const [url, setUrl] = useState<string>("");
  const [chatbotname, setChatbotName] = useState<string>("");
  const [data, setData] = useState<string[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [modelTrain, setModelTrain] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const router = useRouter();

  const backgroundApi = process.env.NEXT_PUBLIC_BACKEND_API;

  const handleFetch = () => {
    if (isFetching) {
      eventSource?.close();
      setEventSource(null);
      setIsFetching(false);
      setProgress(0);
      return;
    }

    if (!url) return;

    setProgress(0);

    const newEventSource = new EventSource(
      `${backgroundApi}/links?url=${encodeURIComponent(url)}`
    );

    newEventSource.onmessage = (event: MessageEvent) => {
      const newItem = event.data;
      setData((prevData) =>
        prevData.includes(newItem) ? prevData : [...prevData, newItem]
      );

      setProgress((prevProgress) => {
        const increment = Math.min(prevProgress + 2, 100);
        return increment;
      });
    };

    newEventSource.onerror = () => {
      newEventSource.close();
      setEventSource(null);
      setIsFetching(false);
      setIsTraining(true);
      setProgress(100);
    };
    setEventSource(newEventSource);
    setIsFetching(true);
  };

  // Train Model
  const handleTrainModel = async () => {
    try {
      setModelTrain(true);

      const response = await axios.post(`${backgroundApi}/scrape`, {
        links: data,
      });

      const res = await ChatBotCreation(
        chatbotname,
        response.data.chatbotId,
        "673093f8eef41f1150f230b0"
      );

      console.log(res);

      router.push(`playground/${response.data.chatbotId}`);
    } catch (error) {
      console.error("Error training model:", error);
      console.log("Error training the model. Please try again.");
    } finally {
      setModelTrain(false);
    }
  };

  // Delete Data Item
  const handleDelete = (index: number) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const chatbotCreationHandler = () => {
    alert("Chatbot creation initiated!");
  };

  return (
    <main className="flex-1 p-8 overflow-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Chatbot</h1>
      <Tabs defaultValue="website">
        <TabsList className="mb-2">
          <TabsTrigger value="website">Website</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="text">Text</TabsTrigger>
        </TabsList>

        {/* Website Tab */}
        <TabsContent value="website" className="w-[600px] space-y-12">
          <Card>
            <CardHeader>
              <CardTitle>Website</CardTitle>
              <CardDescription>
                Create a chatbot from your website content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label htmlFor="chatbotname">ChatBot Name</Label>
                <Input
                  id="chatbotname"
                  placeholder="Enter the Chatbot Name"
                  value={chatbotname}
                  onChange={(e) => setChatbotName(e.target.value)}
                />
                <Label htmlFor="websiteUrl">Website URL</Label>
                <Input
                  id="websiteUrl"
                  placeholder="https://www.example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={handleFetch}
                    variant={isFetching ? "destructive" : "default"}
                  >
                    {isFetching ? "Stop Fetching" : "Fetch Data"}
                  </Button>
                  {isTraining && !modelTrain && (
                    <Button onClick={handleTrainModel} variant="outline">
                      Train Model
                    </Button>
                  )}
                  {modelTrain && (
                    <Button disabled>
                      <Loader2 className="animate-spin" />
                      Please wait
                    </Button>
                  )}
                </div>

                {/* Progress Bar */}
                {isFetching && (
                  <div className="mt-4">
                    <Label>Fetching Progress</Label>
                    <Progress value={progress} className="h-2 w-full" />
                    <p className="text-sm mt-2">{progress}% completed</p>
                  </div>
                )}

                <div className="mt-6">
                  <h3 className="text-lg font-semibold">Received Data:</h3>
                  <ul className="flex flex-col mt-4 space-y-2 w-full max-h-96 overflow-y-auto">
                    {data.map((item, index) => (
                      <li
                        key={index}
                        className="bg-gray-50 px-4 py-2 rounded-md flex justify-between"
                      >
                        <span>{item}</span>
                        <Button
                          onClick={() => handleDelete(index)}
                          variant="ghost"
                          className="text-red-500"
                        >
                          Delete
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Files Tab */}
        <TabsContent value="files">
          <Card>
            <CardHeader>
              <CardTitle>Upload File</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2">
                  Drag & drop a file here or click to select
                </p>
                <Input id="fileInput" type="file" className="hidden" />
                <Button variant="outline" className="mt-4">
                  Select File
                </Button>
              </div>
              <Button onClick={chatbotCreationHandler} className="mt-3 w-full">
                Create Chatbot
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Text Tab */}
        <TabsContent value="text">
          <Card>
            <Textarea
              className="w-full h-40"
              placeholder="Paste your text content here..."
            />
            <Button onClick={chatbotCreationHandler} className="mt-2 w-full">
              Create Chatbot
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default CreateChatBot;
