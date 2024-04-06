/* CHAT COMUNITARIO */
//Instalamos nodemon -D
//express socket.io express-handlebars
import express from "express";
import exphbs from "express-handlebars";
import { Server } from "socket.io";


const app = express();
const PUERTO = 8080;

//Middleware
app.use(express.static("./src/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Configuramos handelbars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas
app.get("/", (req, res)=>{
    res.render("index")
});
//LIsten
const httpServer = app.listen(PUERTO,()=> {
    console.log(`Escuchando en el Puerto: ${PUERTO}`)
});

//Me guardo una referencia del servidor
//Generamos una instacia Socket.io del lado del backend

const io = new Server(httpServer);


let messages = [];

//Establecemos la conection

io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");

    socket.on("message", data => {
        messages.push(data);

        //Emitimos mensaje para el cliente, con todo el array de datos: 
        io.emit("messagesLogs", messages);

    })
})

