import fp from "fastify-plugin";
import { createRoleHandler, getPagingRoleHandler, getRoleByIdHandler, updateRoleHandler } from "../handler/role.handler";

async function role(server, opt) {
    server.post("/role/create", { preValidation: server.authAdmin }, createRoleHandler)  //{ preValidation: server.authAdmin }
    server.put("/role/update/:_id", { preValidation: server.authAdmin }, updateRoleHandler)
    server.get("/role/paging", { preValidation: server.authAdmin }, getPagingRoleHandler)
    server.get("/role/:_id", { preValidation: server.authAdmin }, getRoleByIdHandler)

}

export const rolePlugin = fp(role);
