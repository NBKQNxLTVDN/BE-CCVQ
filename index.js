const app = require("./src/app");
const http = require("http").Server(app);

const { instrument } = require("@socket.io/admin-ui");

const io = require("socket.io")(http, {
  cors: {
    origin: [
      `http://${process.env.SERVER_IP}:3000`,
      "https://admin.socket.io",
      "http://localhost:3000",
      "http://127.0.0.1:5500",
    ],
    credentials: true,
    methods: ["GET", "POST"],
  },
});
const logger = require("./src/utils/logger");
const socketService = require("./src/services/socket.service");

global.__io = io;

const port = process.env.PORT || 2021;
const DEFAULT_PORT = 3000;
const HOST = "localhost";

global.__io.on("connection", socketService.connection);

instrument(io, {
  auth: false,
});

http.listen(port, () => {
  const { 2: mode } = process.argv;
  if (mode)
    config["is" + mode[0].toUpperCase() + mode.slice(1).toLowerCase()] = true;
  logger.appStarted(DEFAULT_PORT, HOST, port);
});
