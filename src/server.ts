import { createServer } from "http";
import { sendResponse } from "./utils/index.js";

const hostname = '127.0.0.1';

const server = createServer((request, response) => {
    sendResponse(response, 200, { message: "You got it!" })
})

server.listen(3000, () => console.log(`Server running at port 3000`));