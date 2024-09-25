import { createServer } from "http";
import { crawlData, sendResponse } from "./utils/index.js";

const PORT = 3000;

const server = createServer((_request, response) => {
    crawlData().then(data => {
        sendResponse(response, 200, data)
    }).catch(err => {
        sendResponse(response, 500, { message: "Something went wrong." })
    })
})

server.listen(PORT, () => console.log(`Server running at port ${PORT}`));