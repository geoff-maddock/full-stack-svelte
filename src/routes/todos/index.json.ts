import type { RequestHandler, RequestEvent } from "@sveltejs/kit";
import {api} from "./_api";

type Todo = {
    created_at: Date;
    text: string;
    done: boolean;
}

// TODO move to database
let todos: Todo = [];

export const get: RequestHandler = (event) => {
    return api(event);
}

export const post: RequestHandler = async(event) => {
    const data = await event.request.formData();
    // console.log('request to json:', data);
    console.log(...data)
    const {text} = Object.fromEntries(data)
    return api(event, {
        created_at: new Date(),
        text: text,
        done: false
    });
}
