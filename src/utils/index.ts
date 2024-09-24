import type { ServerResponse } from "http";

export const sendResponse = (response: ServerResponse, statusCode: number, data: any) => {
    response.writeHead(statusCode, { "Content-Type": "application/json" });
    response.end(JSON.stringify(data));
};