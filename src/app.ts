import { envs } from "./config";
import { MongoDatabase } from "./data/mongodb";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";




//Funcion autoinvocada
(() => {
  main();
})();

async function main() {

  //conexion a la base de datos MONGODB
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  //Servidor levantado en express
  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  }).start();
}
