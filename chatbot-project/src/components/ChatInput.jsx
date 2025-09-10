import { useState,useRef } from 'react';

import {Chatbot} from 'supersimpledev';
import './ChatInput.css';

   function ChatInput({ chatMessages, setChatMessages }) {
        const [inputText, setInputText] = useState("");
        const inputRef = useRef(null);
        function saveInputText(event) {
          const value = event.target.value;
          setInputText(value);
          // console.log(value);
        }

        function sendMessage() {
          if (inputText === "") {
            inputRef.current.focus();
            return;
          }
          const newChatMessages = [
            ...chatMessages,
            {
              message: inputText,
              sender: "user",
              id: crypto.randomUUID(),
            },
          ];

          setChatMessages(newChatMessages);
          const response = Chatbot.getResponse(inputText);
          setChatMessages([
            ...newChatMessages,
            {
              message: response,
              sender: "robot",
              id: crypto.randomUUID(),
            },
          ]);

          setInputText("");
        }

        return (
          <div className="input-box-container">
            <input
              type="text"
              placeholder="Send a message to Chatbot"
              size="40"
              ref={inputRef}
              className="input-box"
              onChange={saveInputText}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              value={inputText}
            />
            <button className="send-button" onClick={sendMessage}>
              Send
            </button>
          </div>
        );
      }

      export default ChatInput;