import React, { useState } from 'react';
import './chat.css';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
   const[count,SetCount] = useState(0);
  const sendMessage = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { text: input, sender: 'user px-5' }]);
      setInput('');
      setTimeout(() => {
        if(count == 0){
          const aiResponse = `Welcome "${input}" to Ai Pharmacy ... `;
          setMessages(prevMessages => [...prevMessages, { text: aiResponse, sender: 'ai px-5 ms-auto' }]);
          SetCount(1);
        }
        
      }, 1000);
    }
  };
  const clearMessages = () => {
    setMessages([]);
    SetCount(0);
  };
  

  return (
   <div className='chat_bg'>
         <div className='subchat'>
         <div className='chat_title'>
          <img src='img/pharmacyfooter.png' className='chat-img'></img>
    </div>
     <div className="chat-container chat_layouts ">
      <div className="chat-window  ">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
        <button onClick={clearMessages }>Clear</button>
      </div>
    </div>
         </div>
   </div>
  );
}
