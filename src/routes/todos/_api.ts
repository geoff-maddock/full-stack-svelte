import type { RequestEvent } from "@sveltejs/kit";

// TODO Persist in database
let todos: Todo[] = [];

export const api = (event: RequestEvent, data?: Record<string, unknown>) => {
    let body = {}
    let status = 500;
    const {params} = event;
    switch (event.request.method.toUpperCase()) {
        case "GET":
            body = todos;
            status = 200;
            break;
        case "POST":
            todos.push(data as Todo);
            body = data as Todo
            status = 201
            break;
        case "DELETE":
            todos = todos.filter(todo => todo.uid !== params.uid)
            status = 200;
            break;
        case "PATCH":
            todos = todos.map(todo => {
                if (todo.uid === params.uid) {
                    if (data.text) todo.text = data.text as string;
                    else todo.done = data.done as boolean;
                }
                return todo;
            });
            status = 200;
            break;    
        default:
            break;
    }

    if (event.request.method.toUpperCase() !== "GET") {
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