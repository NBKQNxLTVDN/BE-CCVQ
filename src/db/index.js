const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const dotEnv = require("dotenv");
const chalk = require("chalk");

dotEnv.config();

connection
  .authenticate()
  .then(() =>
    console.log(chalk.green(`[DATABASE] "${process.env.PG_DB}" is connected`))
  )
  .catch((err) => console.log(err));

const User = connection.define(
  "users",
  {
    role: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    socket_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    // freezeTableName: true,
  }
);

// User.bulkCreate([
//   { role: "controller" },
//   { role: "mc" },
//   { role: "client1" },
//   { role: "client2" },
//   { role: "client3" },
//   { role: "client4" },
// ]).catch((err) => console.log(err));

const Viewer = connection.define(
  "viewers",
  {
    socket_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    // freezeTableName: true,
  }
);

const Chat = connection.define(
  "chats",
  {
    user_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
    },
    socket_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    department: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    // freezeTableName: true,
  }
);

const Message = connection.define("messages", {
  date: {
    type: DataTypes.TIME,
    allowNull: false,
    primaryKey: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.TEXT,
    allowNull: false,
    references: {
      model: "chats",
      key: "user_id",
    },
  },
});

const Score = connection.define("scores", {
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
    defaultValue: "PLAYER_NAME",
  },
  score: {
    type: DataTypes.INTEGER,
  },
  image: {
    type: DataTypes.TEXT,
  },
});

// Score.bulkCreate([
//   { role: "client1", score: 0 },
//   { role: "client2" },
//   { role: "client3" },
//   { role: "client4" },
// ]).catch((err) => console.log(err));

// connection
//   .sync({ force: true })
//   .then(console.log("All tables were created successfully."))
//   .catch((err) => console.log(err));

module.exports = {
  User,
  Viewer,
  Chat,
  Message,
  Score,
};
