import { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import './ChatMessages.css';

  function ChatMessages({ chatMessages, isTop }) {
        const divRef = useRef(null);

        useEffect(() => {
          if (divRef.current) {
             divRef.current.scrollTop = divRef.current.scrollHeight;
          }
        }, [chatMessages]);

        return (
          <div ref={divRef} className="chat-messages-container">
            {chatMessages.length === 0 ? (
              <>
                <p className="empty-container">
                  Welcome to the chatbot project! Send a message using the
                  textbox {isTop ? "above" : "below"}.
                </p>

                <div className="description-container">
                  <h3 className="description-heading">Current functions:</h3>
                  <ul className="current-functions-list">
                    <li>Flip a coin</li>
                    <li>Roll a dice</li>
                    <li>Get today's date</li>
                    <li>Greetings</li>
                  </ul>
                </div>
              </>
            ) : (
              chatMessages.map((chatMessage) => (
                <ChatMessage
                  key={chatMessage.id}
                  message={chatMessage.message}
                  sender={chatMessage.sender}
                />
              ))
            )}
          </div>
        );
      }

      export default ChatMessages;