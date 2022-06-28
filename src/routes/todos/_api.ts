import type { RequestEvent } from "@sveltejs/kit";
import PrismaClient from "$lib/prisma";

const prisma = new PrismaClient();

export const api = async (event: RequestEvent, data?: Record<string, unknown>) => {
    let body = {}
    let status = 500;
    const {params} = event;
    switch (event.request.method.toUpperCase()) {
        case "GET":
            body = await prisma.todo.findMany();
            status = 200;
            break;
        case "POST":
            body = await prisma.todo.create({
                data: {
                    created_at: data.created_at as Date,
                    done: data.done as boolean,
                    text: data.text as string
                }
            })
            status = 201
            break;
        case "DELETE":
            body = await prisma.todo.delete({
                where: {
                    uid: params.uid
                }
            })
            status = 200;
            break;
        case "PATCH":
            body = await prisma.todo.update({
                where: {
                    uid: params.uid
                },
                data: {
                    done: data.done,
                    text: data.text
                }
            })
            status = 200;
            break;    
        default:
            break;
    }

    if (event.request.method.toUpperCase() !== "GET" &&
     event.request.headers.get("accept") != "application/json") {
        return {
            status: 303,
            headers: {
                location: "/"
            }
        }
    }


    return {
        status,
        body
    }
}