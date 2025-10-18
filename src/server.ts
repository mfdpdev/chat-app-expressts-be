import express from "express"

const server = express();

//middlware
server.use(express.json())

const prefix: string = "/api/v1";

// server.use();
// server.use();
// server.use();

export default server;
