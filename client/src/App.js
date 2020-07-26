import React, { useState, useEffect, useRef } from 'react'
import "./App.css"
import io from 'socket.io-client'

const socket = io.connect('http://localhost:4000');

socket.on('error', function (err) {
  console.log('received socket error:')
  console.log(err)
})

const Chat = () => {
  const [messages, setMessages] = useState([])

  socket.on('msg', function(msg){
    setMessages(messages.concat(msg))
  });

  //const messagesEndRef = useRef(null);
  /*const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom, [messages]);*/

  return (
    <div className="App">
      <h1>Chat App</h1>
      <h2>Chats:</h2>
      <div className="Messages">
        {messages.map((msg) =>
          <Message
            user={msg.user}
            message={msg.message}
          />
        )}
      </div>
      <MessageEntry
        setMessages={setMessages}
        messages={messages}
      />
    </div>
  );
};

const Message = (props) => {
  return (
    <div className="Chat">
      <b>{props.user}</b>: {props.message}
    </div>
  )
}

const MessageEntry = (props) => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    //props.setMessages(props.messages.concat({"id":props.messages.length + 1, "message": message, "user": name}));
    socket.emit('msg', {"message": message, "user": name});
    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <br/>
      <input
        type="text"
        placeholder="Enter message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <br/>
      <button>Send</button>
    </form>
  )
}


const App = () => {
  return (
    <div className="App">
      <Chat />
    </div>
  );

}

export default App;
