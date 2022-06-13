import type { Handle, RequestEvent } from "@sveltejs/kit";
import { resolveModuleName } from "typescript";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {

    // if (event.url.searchParams.get("_method")) {
    //     event.request.method = event.url.searchParams.get("_method").toUpperCase();
    // }

    const response = await resolve(event);
    return response;
}