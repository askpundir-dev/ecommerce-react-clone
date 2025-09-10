import { useState, useEffect } from "react";
import ChatInput from "./components/ChatInput.jsx";
import ChatMessages from "./components/ChatMessages.jsx";
import MoveInputBox from "./components/MoveInputBox.jsx";
import "./App.css";





function App() {
  const [chatMessages, setChatMessages] = useState([]);

  const [isTop, setIsTop] = useState(() => {
    const saved = localStorage.getItem("inputbox-position");
    return saved === "true"; // convert string → boolean
  });

  useEffect(() => {
    localStorage.setItem("inputbox-position", isTop);
  }, [isTop]);

  return (
    <div className="app-container">
      {isTop && (
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      )}

      <ChatMessages chatMessages={chatMessages} isTop={isTop} />

      {!isTop && (
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      )}

      <MoveInputBox isTop={isTop} setIsTop={setIsTop} />
    </div>
  );
}

export default App;
