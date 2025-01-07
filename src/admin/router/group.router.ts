import fp from "fastify-plugin";
import { createGroupHandler, deleteGroupHandler, getGroupByIdHandler, getGroupByPagingHandler, updateGroupHandler } from "../handler/group.handler";

async function group(server, opt) {
    server.post("/group", { preValidation: server.authAdmin }, createGroupHandler)
    server.get("/group/:_id", { preValidation: server.authAdmin }, getGroupByIdHandler)
    server.get("/group/paging", { preValidation: server.authAdmin }, getGroupByPagingHandler)
    server.put("/group/:_id", { preValidation: server.authAdmin }, updateGroupHandler)
    server.delete("/group/:_id", { preValidation: server.authAdmin }, deleteGroupHandler)
}

export const groupPlugin = fp(group);
