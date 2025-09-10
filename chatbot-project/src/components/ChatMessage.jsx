import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/user.png';

import './ChatMessage.css';

function ChatMessage({ message, sender }) {
        // const message = props.message;
        // const sender = props.sender;
        // const {message,sender}=props;
        return (
          <div className={sender === "user" ? "user-message" : "robot-message"}>
            {sender === "robot" && (
              <img
                src={RobotProfileImage}
                alt="bot-profile"
                className="chat-message-profile"
              />
            )}
            <div className="chat-message-text">{message}</div>
            {sender === "user" && (
              <img
                src={UserProfileImage}
                alt="user-profile"
                className="chat-message-profile"
              />
            )}
          </div>
        );
      }


      export default ChatMessage;