# BE-CCVQ
# Database Update

This season of CCVQ, we will have a PostgreSQL database to save all the data needed in the competition.

## Installation

To be able to use the database, you have to install PostgreSQL on your computer. Go to this link: https://www.youtube.com/watch?v=wXH49V4xJNY and follow the instruction.

## Usage

### Create database and tables

After you finished installing PostgreSQL, open psql application. A cmd will appear on your screen. Key in the server, database, port, username and password as they appear. If this is your first time using psql, keep pressing ENTER until you are required to type the password. Type the one that you chose when installing PostgreSQL.

At this step, you can now start creating database and tables for it (there are 5 tables in the database). Copy these command and paste into the cmd. (Remember to press ENTER after each command).

```sh
# create database

# switch to ccvq_database
# create tables
# users

# viewers

# chats

# messages

# scores
DROP DATABASE ccvq_database;
CREATE DATABASE ccvq_database;
\connect ccvq_database;
CREATE TABLE IF NOT EXISTS "users" ("role" TEXT NOT NULL , "name" TEXT NOT NULL, "socket_id" TEXT NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("role"));
CREATE TABLE IF NOT EXISTS "viewers" ("id" SERIAL, "socket_id" TEXT NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
CREATE TABLE IF NOT EXISTS "chats" ("user_id" TEXT NOT NULL , "socket_id" TEXT NOT NULL, "name" TEXT NOT NULL, "department" TEXT NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("user_id"));
CREATE TABLE IF NOT EXISTS "messages" ("date" TIME NOT NULL , "message" TEXT NOT NULL, "type" TEXT NOT NULL, "user_id" TEXT NOT NULL REFERENCES "chats" ("user_id"), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("date"));
CREATE TABLE IF NOT EXISTS "scores" ("order" INTEGER NOT NULL, "name" TEXT, "score" INTEGER,"image" TEXT, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("order"));
```

When you want to run the database, go to .env file in the BE section. Check if the environment parameters are correct or not (especially PG_DB, PG_USERNAME, PG_PASSWORD, PG_PORT). The parameters should be matched with those you used to create the database.

### Working with the database

Add a new connection (e.g. client1):

```javascript
const newEntry = User.create({
  role: "client1",
  name: data.name,
  socket_id: socket.id,
}).catch(function (err) {
  console.log(err);
});
```

Update a connection (e.g. client1):

```javascript
const newEntry = User.update(
  {
    name: data.name,
    socket_id: socket.id,
  },
  {
    where: { role: "client1" },
  }
).catch(function (err) {
  console.log(err);
});
```

Delete a connection (e.g. client1):

```javascript
User.destroy({
  where: { role: "client1" },
}).catch(function (err) {
  console.log(err);
});
```

Find all connections:

```javascript
User.findAll()
  .then(function (result) {
    // Do something with the result
  })
  .catch(function (err) {
    console.log(err);
  });
```

Find all connections that match a criterion (e.g. role: client1):

```javascript
User.findAll({
  where: {
    role: "client1",
  },
})
  .then(function (result) {
    // Do something with the result
  })
  .catch(function (err) {
    console.log(err);
  });
```
