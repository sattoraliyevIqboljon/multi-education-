import fp from "fastify-plugin";
import { createGroupHandler, deleteGroupHandler, getGroupByIdHandler, getGroupByPagingHandler, updateGroupHandler } from "../handler/group.handler";
import { createTimeTableHandler, deleteTimeTableHandler, getTimeTableByIdHandler, getTimeTableByPagingHandler, updateTimeTableHandler } from "../handler/timeTable.handler";

async function timeTable(server, opt) {
    server.post("/table", { preValidation: server.authAdmin },createTimeTableHandler)
    server.get("/table/:_id", { preValidation: server.authAdmin }, getTimeTableByIdHandler)
    server.get("/table/paging", { preValidation: server.authAdmin }, getTimeTableByPagingHandler)
    server.put("/table/:_id", { preValidation: server.authAdmin }, updateTimeTableHandler)
    server.delete("/table/:_id", { preValidation: server.authAdmin }, deleteTimeTableHandler)
}

export const timeTablePlugin = fp(timeTable);
