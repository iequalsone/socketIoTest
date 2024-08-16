const express = require("express")
const http = require("http")
const { Server } = require("socket.io")

const app = express()
const server = app.listen(8080, () => {
  console.log("Server is running on port 8080")
})

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
})

app.get("/", (req, res) => {
  res.send("Socket.IO Server Running")
})

io.on("connection", (socket) => {
  console.log("Connected")

  // This message is sent and received by the client
  const firstJson = { message: "hello" }
  socket.emit("receiveJson", firstJson)

  socket.on("jsonProcessed", () => {
    console.log("Client has processed the first JSON.")
    setTimeout(() => {
      // This message is not received by the client
      const secondJson = { message: "This is your second JSON!" }
      socket.emit("receiveJson", secondJson)
    }, 1000) // 1-second delay
  })

  socket.on("disconnect", () => {
    console.log("User disconnected")
  })
})
