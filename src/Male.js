import React, { useRef, useState, useEffect } from "react";
import io from "socket.io-client";

const Male = ({ title }) => {
  const [jsonData, setJsonData] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize the socket connection only once when the component mounts
    socketRef.current = io("http://localhost:8080");

    socketRef.current.on("connect", () => {
      console.log("Connection to server established");
    });
    
    socketRef.current.on("receiveJson", (data) => {
      console.log("Received JSON from server: ", data);
      setJsonData(data);
    });
    
    return () => {
      console.log("Disconnected from socket");
      socketRef.current.disconnect();
    };
  }, []);

  const handleJsonProcessing = () => {
    console.log("Emitting jsonProcessed event");
    socketRef.current.emit("jsonProcessed");
    setJsonData(null);
  };

  return (
    <div>
      {jsonData ? (
        <div>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
          <button onClick={handleJsonProcessing}>Done with JSON</button>
        </div>
      ) : (
        <p>No JSON data received.</p>
      )}
    </div>
  );
};

export default Male;
