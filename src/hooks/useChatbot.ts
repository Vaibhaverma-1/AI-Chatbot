import { useState } from "react";
import axios from "axios";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async (message: string) => {
    const newMessages: Message[] = [
      ...messages,
      { text: message, sender: "user" },
    ];
    setMessages(newMessages);

    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama3-70b-8192",  
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
          temperature: 0.7,  
        },
        {
          headers: {
            Authorization: `Bearer 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`, 
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = response.data.choices[0].message.content;
      setMessages([...newMessages, { text: botMessage, sender: "bot" }]);
    } catch (error) {
      console.error("Error Fetching Response");
    }
  };

  return { messages, sendMessage };
};

export default useChatbot;
