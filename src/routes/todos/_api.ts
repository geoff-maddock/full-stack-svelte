import type { RequestEvent } from "@sveltejs/kit";

// TODO Persist in database
let todos: Todo[] = [];

export const api = (event: RequestEvent, todo: Todo) => {
    let body = {}
    let status = 500;
    
    switch (event.request.method.toUpperCase()) {
        case "GET":
            body = todos;
            status = 200;
            break;
        case "POST":
            console.log('hitting post');
            todos.push(todo);
            return {
                status: 303,
                headers: {
                    location: "/"
                }
            }
        case "DELETE":
            todos = todos.filter(todo => todo.uid !== event.url.searchParams.get('uid'))
            status = 200;
            break;
        default:
            break;
    }

    return {
        status,
        body
    }
}