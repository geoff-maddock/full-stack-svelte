import type { RequestHandler } from "@sveltejs/kit"
import { api } from "./_api";

export const del: RequestHandler = (event) => {
    console.log('delete log');
    return api(event);
}

export const patch: RequestHandler = async(event) => {
    const data = await event.request.formData();
    const {text} = Object.fromEntries(data);
    console.log(text);
    return api(event, {
        text: text
    })
}