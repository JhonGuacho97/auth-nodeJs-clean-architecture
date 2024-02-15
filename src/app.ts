import { envs } from "./config";
import { Server } from "./presentation/server";


//TODO: Funcion autoinvocada
(() => {
    main();
})()



async function main(){

    //TODO: await base de datos



    //TODO: inicio de nuestro server, esto se comunica con la capa de presentasion.
    new Server({
        port: envs.PORT
    })
      .start();
}