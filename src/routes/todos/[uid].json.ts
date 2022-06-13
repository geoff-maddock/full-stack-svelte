import type { RequestHandler } from "@sveltejs/kit"
import { api } from "./_api";

export const del: RequestHandler = (event) => {
    console.log('delete log');
    return api(event);
}