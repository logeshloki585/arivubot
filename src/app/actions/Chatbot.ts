"use server";

import prisma from "../../lib/prisma";

export const GetChatbot = async (userid: string) => {
  try {
    const res = await prisma.chatbot.findMany({ where: { userid } });
    return {
      res,
    };
  } catch (e) {
    return { message: "Error", error: e, success: false };
  }
};

export const ChatBotCreation = async (
  name: string,
  chatbotId: string,
  userid: string
) => {
  try {

    const res = prisma.chatbot.create({
      data: {
        name: name,
        chatbotId: chatbotId,
        userid: userid,
        fontSize: 'text-lg',
        fontColor: '#111827',
        fontStyle: 'font-sans',
        desc: '',
        headerAlign: 'justify-center',
        bgColor: '#fff',
        innerButtonColor: '#000000',
        outerButtonColor: '#000000',
        userChatBg: '#d1fae5',
        botChatBg: '#f1f0f0',
      }
    });

    return {
      message: "The chatbot has been created sucessfully",
      success: true,
      user: res,
    };
  } catch (e) {
    return { message: "Error", error: e, success: false };
  }
};
