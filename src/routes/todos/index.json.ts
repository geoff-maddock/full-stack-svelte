import type { RequestHandler, RequestEvent } from "@sveltejs/kit";
import { text } from "svelte/internal";

type Todo = {
    created_at: Date;
    text: string;
    done: boolean;
}

let todos: Todo = [];

export const get: RequestHandler = () => {
    return {
        status: 200,
        body: todos
    }
}

export async function post(event: RequestEvent) {
    const data = await event.request.formData();
    console.log('formdata js log of request : ', data.get('text'));

    todos.push({
        created_at: new Date(),
        text: data.get('text'),
        done: false
    })

    return {
        status: 303,
        headers: {
            location: "/"
        }
    }
}
