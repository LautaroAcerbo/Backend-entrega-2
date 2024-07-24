import express, { json, urlencoded } from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import handlebars from "express-handlebars"; //Importar Handlebars
import __dirname from "./utils.js"; //Importar __dirname
import viewsRouter from "./routes/views.router.js"; //Importar ViewsRouter
import { Server } from "socket.io";

const app = express();
const PORT = 8080;
app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use(`/`, viewsRouter);

//Configuracion Handlebars para leer el contenido de los endpoints
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
//Utilizar recursos estaticos
app.use(express.static(__dirname + "/public"));

const httpServer = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
const socketServer = new Server(httpServer);

let productsList = [];

socketServer.on("connection", (socketServer) => {
  console.log("Nuevo cliente encontrado");

  socketServer.on("message", (productList) => {
    productsList.push(productList);
    socketServer.emit("infoProduct", productsList);
  });
});
