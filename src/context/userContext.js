"use client";
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [chatbotId, setChatbotId] = useState(null);
  const [selectedTab, setSelectedTab] = useState("playground");

  const setChatbot = (id) => {
    setChatbotId(id);
  };

  const setSelectedValue = (value) => {
    setSelectedTab(value);
  };

  return (
    <UserContext.Provider
      value={{ chatbotId, setChatbot, selectedTab, setSelectedValue }}
    >
      {children}
    </UserContext.Provider>
  );
};
