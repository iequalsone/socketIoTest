import React, { useRef, useState, useEffect } from "react"
import io from "socket.io-client"

const Male = ({ title }) => {
  const socket = useRef(null)
  const [jsonData, setJsonData] = useState(null)

  useEffect(() => {
    socket.current = io("http://localhost:8080")

    socket.current.on("connect", () => {
      console.log("Connection established")
    })

    socket.current.on("receiveJson", (data) => {
      console.log("Received: ", data)
      setJsonData(data)
    })

    return () => {
      console.log("Disconnected")
      socket.current.disconnect()
    }
  }, [])

  const handleProcessing = () => {
    console.log("Emitting event")
    socket.current.emit("jsonProcessed")
    setJsonData(null)
  }

  return (
    <div>
      {jsonData ? (
        <div>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
          <button onClick={handleProcessing}>Done</button>
        </div>
      ) : (
        <p>No data received.</p>
      )}
    </div>
  )
}

export default Male
