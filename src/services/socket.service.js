const chalk = require("chalk");
const { User, Viewer, Chat, Message, Score } = require("../db/index");

const roleExists = async (role) => {
  const res = await User.count({
    where: {
      role: role,
    },
  });
  if (res > 0) {
    return true;
  }
  return false;
};

const roleClientExists = async (order) => {
  const res = await Score.count({
    where: {
      order: order,
    },
  });
  if (res > 0) {
    return true;
  }
  return false;
};

class SocketService {
  connection(socket) {
    socket.on("ping", () => {
      // const acked = Date.now();
      socket.emit("pong");
    });

    socket.on("latency", (latency) => {
      console.log(latency / 2 + "ms");
    });

    socket.on("disconnect", async () => {
      console.log(chalk.bgRed("[DISCONNECT]"), socket.role, socket.id);
      // delete socket id in the db where role = 'socket.role
      // if (socket.role !== undefined)
      await User.destroy({
        where: { socket_id: socket.id },
      });
      await Viewer.destroy({
        where: { socket_id: socket.id },
      });
    });

    socket.on("ccvq:setName", async (data) => {
      data.role === "client"
        ? (socket.role = data.role + data.position)
        : (socket.role = data.role);

      console.log(chalk.bgGreen("[CONNECTING]"), { id: socket.id, ...data });
      // limit 1 connection of controller, mc, etc.
      if (socket.role !== "viewer" && socket.role !== "chat") {
        let rooms = global.__io.sockets.adapter.rooms;
        let room = rooms.get(socket.role);
        if (room === undefined) {
        } else if (room.size === 1 || room.size > 1) {
          console.log("[ERROR] FULLY CONNECTION, PLEASE TRY TO CONNECT AGAIN");
          socket.emit("socket:errorConnection", {
            msg: "ERROR: FULLY CONNECTION, PLEASE TRY TO CONNECT AGAIN",
          });
          socket.disconnect();
        }
      }
      socket.join(socket.role);

      global.__io
        .fetchSockets()
        .then((sockets) => {
          console.log(chalk.red("# connecting socket: " + sockets.length));
        })
        .catch((e) => console.log(e));

      if (data.role === "controller") {
        if (await roleClientExists(1)) {
          for (let i = 1; i <= process.env.NO_PLAYER; i++) {
            await Score.update(
              {
                score: 0,
              },
              {
                where: {
                  order: i,
                },
              }
            );
          }
        } else {
          for (let i = 1; i <= process.env.NO_PLAYER; i++) {
            await Score.create({
              order: i,
              score: 0,
              name: `PLAYER ${i}`,
            });
          }
        }
      }

      if (data.role === "chat") {
        // save or update to db "chat" userID (PRIMARY KEY), socket.id, name, department
        const res = await Chat.create({
          user_id: data.userID,
          socket_id: socket.id,
          name: data.name,
          department: data.department,
        });
        console.log(res);
      } else if (data.role === "viewer") {
        await Viewer.create({
          socket_id: socket.id,
        });
      } else {
        const res = await roleExists(socket.role);
        if (res) {
          await User.update(
            {
              name: data.name,
              socket_id: socket.id,
              isAdmin: socket.role === "controller",
            },
            {
              where: { role: socket.role },
            }
          );
        } else {
          await User.create({
            role: socket.role,
            name: data.name,
            socket_id: socket.id,
            isAdmin: socket.role === "controller",
          });
        }
        if (data.role === "client") {
          await Score.update(
            {
              name: data.name,
            },
            {
              where: {
                order: data.position,
              },
            }
          );
        }
      }

      await connection(data);
    });

    const connection = async (data) => {
      const users = await User.findAll({
        raw: true,
        attributes: ["role", "name", "socket_id"],
      });
      const scores = await Score.findAll({
        raw: true,
        attributes: ["order", "name", "score"],
      });

      const viewer = await global.__io.in("viewer").fetchSockets();

      console.log("[USERS]", users);
      console.log("[SCORES]", scores);
      console.log("[VIEWERS", viewer.length, "CONNECTIONS]");

      ["controller", "mc", "viewer", "client"].forEach((room) => {
        const sendData = {
          users: users,
          scores: scores,
          info: data
            ? {
                role: socket.role,
                name: data.name,
              }
            : null,
          viewer: viewer.length,
        };
        if (room === "client") {
          for (let i = 0; i < process.env.NO_PLAYER; i++) {
            global.__io
              .in(`client${i + 1}`)
              .emit("server:connectedData", sendData);
          }
        } else global.__io.in(room).emit("server:connectedData", sendData);
      });
    };

    socket.on("controller:talk", (msg) => {
      console.log(chalk.bgYellow("[EVENT]"), msg);
      msg.receivers.forEach((receiver) => {
        if (receiver === "client") {
          for (let i = 0; i < process.env.NO_PLAYER; i++) {
            global.__io.in(`client${i + 1}`).emit(msg.eventName, msg.data);
          }
        } else {
          global.__io.in(receiver).emit(msg.eventName, msg.data);
        }
      });
    });

    socket.on("client:talk", (msg) => {
      console.log(chalk.bgRed("[EVENT]"), msg);
      msg.receivers.forEach((receiver) => {
        if (receiver === "client") {
          for (let i = 0; i < process.env.NO_PLAYER; i++) {
            global.__io.in(`client${i + 1}`).emit(msg.eventName, msg.data);
          }
        } else {
          global.__io.in(receiver).emit(msg.eventName, msg.data);
        }
      });
    });

    socket.on("sendMessage", async (msg) => {
      console.log("[MESSAGE]", msg);
      // save to db "message" store the data of the message (date (PRIMARY KEY), message, type, userID(CONSTRAINT KEY to db "chat") ).
      const res = await Message.create({
        date: msg.date,
        message: msg.message,
        type: msg.type,
        user_id: msg.userID,
      });
      console.log(res);
      global.__io.in("chat").emit("sendMessage", msg);
    });

    socket.on("ccvq:updateScore", async (data) => {
      const { score } = await Score.findByPk(data.order);
      await Score.update(
        {
          score: data.score + score,
        },
        {
          where: {
            order: data.order,
          },
        }
      );
    });

    socket.on("ccvq:updateInfo", async (data) => {
      await Score.update(
        {
          name: data.name,
        },
        {
          where: {
            order: data.order,
          },
        }
      );
      await connection(data);
    });
  }
}

module.exports = new SocketService();
