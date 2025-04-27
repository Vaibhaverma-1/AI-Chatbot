import * as React from "react";
import { LuBot, LuSendHorizontal } from "react-icons/lu";
import useChatbot from "../hooks/useChatbot";
import Markdown from "react-markdown";

interface IChatComponentProps {}

const ChatComponent: React.FunctionComponent<IChatComponentProps> = (props) => {
  const [input, setInput] = React.useState("");
  const { messages, sendMessage } = useChatbot(); // ✅ Correct destructuring

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-[80vh] bg-gray-100">
      <h2 className="p-4 font-semibold text-lg text-center bg-gray-800 flex text-white justify-center items-center gap-2">
        ChatBot
        <LuBot size={25} />
      </h2>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-xs ${
              msg.sender === "user"
                ? "bg-gray-500 text-white ml-auto"
                : "bg-gray-700 text-white mr-auto"
            }`}
          >
            <Markdown>{msg.text}</Markdown>{" "}
            {/* ✅ You forgot to display the text */}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex items-center p-2 bg-gray-50">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg focus:outline-none"
          placeholder="Your message here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend} className="p-2">
          <LuSendHorizontal size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
