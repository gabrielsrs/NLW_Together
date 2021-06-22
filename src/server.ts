import express from "express";

const app = express();

app.get("/test", (request, response) => {});

app.listen(5000, () => console.log("Server is run!"));
