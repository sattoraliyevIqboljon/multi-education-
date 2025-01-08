import fp from "fastify-plugin";
import { createTimeTableHandler, deleteTimeTableHandler, getTimeTableByDateHandler, getTimeTableByIdHandler, getTimeTableByPagingHandler, updateTimeTableHandler } from "../handler/timeTable.handler";

async function timeTable(server, opt) {
    server.post("/table", { preValidation: server.authAdmin },createTimeTableHandler)
    server.get("/table/:_id", { preValidation: server.authAdmin }, getTimeTableByIdHandler)
    server.get("/table/paging", { preValidation: server.authAdmin }, getTimeTableByPagingHandler)
    server.put("/table/:_id", { preValidation: server.authAdmin }, updateTimeTableHandler)
    server.delete("/table/:_id", { preValidation: server.authAdmin }, deleteTimeTableHandler)
    server.get("/table", { preValidation: server.authAdmin }, getTimeTableByDateHandler)


    
}

export const timeTablePlugin = fp(timeTable);
