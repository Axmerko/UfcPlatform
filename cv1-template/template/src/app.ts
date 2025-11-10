import {server} from "./api/server.js";
import mongo from "./database/mongo.js";

const port = process.env.PORT || 3000;

async function init() {
    console.log("Connecting to Mongo...");
    await mongo.connect();

    server.listen(port, () => {
        console.log(`jsem na portu ${port}`);
    });
}

init();
