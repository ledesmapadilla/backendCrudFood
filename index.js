import colors from "colors";
import Server from "./src/server/config.js";
import router from "./src/routes/index.routes.js";




const server=new Server ()

/* http://localhost:3000/api/productos  esta es la ruta que tengo que construir*/

server.app.use ("/api", router)

server.listen()
