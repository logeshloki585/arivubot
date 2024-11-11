import * as React from "react";
import { Filter, Download } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Activity() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-semibold">Chat Logs</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="default" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-2/5 border-r overflow-y-auto p-4 space-y-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>hello</span>
              <span>38 minutes ago</span>
            </div>
            <p className="text-sm">Hello! How can I assist you today?</p>
          </div>
        </div>
        <div className="w-3/5 overflow-y-auto p-4 space-y-4">
          <div className="bg-gray-100 p-3 rounded-lg mb-2">
            <p className="text-sm">Hi! What can I help you with?</p>
          </div>
          <div className="bg-black text-white p-2 rounded-full w-fit ml-auto">
            <p className="text-sm">hello</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm">Hello! How can I assist you today?</p>
            <div className="flex items-center mt-2 space-x-2">
              <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                0.46s
              </span>
              <button className="text-xs text-gray-500 hover:text-gray-700">
                Revise answer
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 right-4">
        <Button className="rounded-full bg-black text-white hover:bg-black/90">
          hello
        </Button>
      </div>
    </div>
  );
}
