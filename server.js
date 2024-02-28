// import express from "express";
// import cors from "cors";

// const app=express();
// app.use(cors());


// app.get("/getData", (req,res)=>{
//     res.send("Hello");
// });

const app = require("./app");
const connectDatabase = require("./db/Database");
const cloudinary = require("cloudinary");

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});


if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})


const server = app.listen(process.env.PORT, () => {
  console.log(
  `Server is running on http://localhost:${process.env.PORT}`
  );
});
    
// const server = app.listen(8000, () => {
//   console.log(
//   `Server is running on http://localhost:8000 `
//   );
// });

process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
