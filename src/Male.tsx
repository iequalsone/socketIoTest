import React, { useRef, useState, useEffect } from "react"
import io, { Socket } from "socket.io-client"

const Male = ({ title }: { title: string }) => {
  const [jsonData, setJsonData] = useState(null)
  const socket = useRef<Socket | null>(null)

  useEffect(() => {
    if (!socket) {
      return
    }

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
      socket.current?.disconnect()
    }
  }, [])

  const handleProcessing = () => {
    console.log("Emitting event")
    socket.current?.emit("jsonProcessed")
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
