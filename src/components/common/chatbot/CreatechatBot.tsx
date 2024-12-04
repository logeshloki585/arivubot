"use client";

import React, { useEffect, useState } from "react";
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
import currentUser, { getUserId } from "@/app/actions/user";
import ModelLoader from "./ModelLoader";

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

  const [inputType, setInputType] = useState("");
  const [textContent, setTextContent] = useState("");
  const [file, setFile] = useState(null);

  const [user, setUser] = useState<any>("");
  const [userid, setUserId] = useState<string>();

  useEffect(() => {
    async function fxxn() {
      try {
        const res = await currentUser();
        if (res?.user) {
          const result = await getUserId(res.user);
          setUser(result?.id);
          setUserId(result?.id);
        }
      } catch (e: any) {
        console.log(e);
      }
    }
    fxxn();
  }, []);

  const backgroundApi = process.env.NEXT_PUBLIC_BACKEND_API;

  const handleFetch = () => {
    setData([]);
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


  function normalizeUrl(url: string): string {
    return url.endsWith("/") ? url.slice(0, -1) : url;
  }

  function extractBaseDomain(url: string): string {
    try {
      return new URL(url).origin;
    } catch (error) {
      console.error(`Invalid URL: ${url}`);
      return "";
    }
  }

  function processLinks(response: any[], baseUrl: string): string[] {
    const baseDomain = new URL(baseUrl).origin;
    const processedLinks = new Set<string>();

    response.forEach((link) => {
      try {
        if (!link || typeof link !== "string" || link.trim() === "") return;
        if (link.startsWith("mailto:") || link.startsWith("tel:") || link === "#!") return;
        if (link.startsWith("http")) {
          const linkDomain = new URL(link).origin;
          if (linkDomain === baseDomain) processedLinks.add(new URL(link).href);
        } else if (link.startsWith("/")) {
          processedLinks.add(`${baseDomain}${link}`);
        } else {
          processedLinks.add(`${baseDomain}/${link}`);
        }
      } catch (error) {
        console.error(`Invalid URL skipped: ${link}`);
      }
    });

    return Array.from(processedLinks);
  }


  // const handleFetch = async () => {
  //   setData([]);
  //   setIsFetching(true);

  //   try {
  //     if (!url) throw new Error("URL is required");

  //     const response = await axios.get("https://app.scrapingbee.com/api/v1/", {
  //       params: {
  //         api_key: "5X99ITOZIGTRC1IFTUUD8TCS4WVIUXBO373TV4T7NXOCHM1SQCX5SO72M00F5X5GKHWUCHOXJWUSWRP9",
  //         url: url,
  //         wait_browser: "load",
  //         extract_rules: '{"all_links":{"selector":"a@href","type":"list"}}',
  //       },
  //     });

  //     if (!response.data || !response.data.all_links) {
  //       throw new Error("Invalid response format: Missing all_links");
  //     }

  //     const finalLinks = processLinks(response.data.all_links, extractBaseDomain(url));
  //     setData(finalLinks);
  //     setIsTraining(true);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setIsFetching(false);
  //   }
  // };

  const handleChange = (event: any) => {
    if (event.target.type === "file") {
      setFile(event.target.files[0]);
      setInputType("file");
    } else if (event.target.tagName === "TEXTAREA") {
      setTextContent(event.target.value);
      setInputType("text");
    }
  };

  const handleTrainModel = async () => {
    try {
      setModelTrain(true);
      const response = await axios.post(`${backgroundApi}/scrape`, {
        links: data,
      });

      if (userid) {
        const res = await ChatBotCreation(
          chatbotname,
          response.data.chatbotId,
          userid
        );
      }

      router.push(`/space/playground/${response.data.chatbotId}`);
    } catch (error) {
      console.log("Error training model:", error);
      console.log("Error training the model. Please try again.");
    }
  };

  const handleDelete = (index: number) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const chatbotCreationHandler = async () => {
    try {
      let response;
      if (inputType === "text" && textContent.trim() !== "") {
        response = await axios.post(`${backgroundApi}/texttrain`, {
          links: textContent,
        });
      } else if (inputType === "file" && file) {
        const formData = new FormData();
        formData.append("file", file);

        response = await axios.post(`${backgroundApi}/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        console.error("No valid input provided for chatbot creation.");
        return;
      }

      if (userid) {
        await ChatBotCreation(chatbotname, response.data.chatbotId, userid);
      }

      router.push(`/space/bot/playarea/${response.data.chatbotId}`);
    } catch (error) {
      console.error("Error training model:", error);
      console.error("Error training the model. Please try again.");
    }
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
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setData([]);
                    setIsFetching(false);
                  }}
                />
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={handleFetch}
                    variant={isFetching ? "destructive" : "default"}
                  >
                    {isFetching && <Loader2 className="animate-spin" />}
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

                <div className="mt-6">
                  {!modelTrain ? (
                    <div>
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
                  ) : (
                    <div className=" relative flex flex-col  space-y-2 w-full py-2 overflow-y-auto">
                      <h3 className="text-lg font-semibold text-center mb-4">
                        Model Training
                      </h3>
                      <ModelLoader />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

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
                <Input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  onChange={handleChange}
                />
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

        <TabsContent value="text">
          <Card>
            <Textarea
              className="w-full h-40"
              placeholder="Paste your text content here..."
              onChange={handleChange}
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
