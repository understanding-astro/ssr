import type { APIRoute } from "astro";

export const get: APIRoute = (ctx) => {
  const auth = ctx.request.headers.get("Authorization");

  if (!auth) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  return new Response(JSON.stringify({ message: "Hello world" }), {
    status: 200,
  });
};
