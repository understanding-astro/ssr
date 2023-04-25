import type { APIRoute } from "astro";

export const get: APIRoute = async (ctx) => {
  const productId = ctx.params.id;

  // retrieve relevant search parameters aka URL query parameters
  const searchParams = ctx.url.searchParams;
  const version = searchParams.get("version");
  const publishedDate = searchParams.get("publishedDate");

  try {
    const response = await fetch("https://fakestoreapi.com/products/1");
    const data = await response.json();

    // send new response with the retrieved "version" and "publishedDate"
    return new Response(
      JSON.stringify({ ...data, version, publishedDate, id: productId }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "An error occurred" }), {
      status: 500,
    });
  }
};

/**
 * Handle "DELETE" requests
 * delete is a reserved word in Javascript.
 * Hence, the name "del"
 */
export const del: APIRoute = async (ctx) => {
  const productId = ctx.params.id;
  try {
    const response = await fetch("https://fakestoreapi.com/products/1", {
      method: "DELETE",
    });
    const data = await response.json();

    return new Response(
      JSON.stringify({ id: productId, message: "deleted", title: data.title }),
      {
        status: 202,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "An error occurred" }), {
      status: 500,
    });
  }
};

/**
 * Handle "POST" requests
 */
export const post: APIRoute = async (ctx) => {
  // Get the POST body data
  const data = await ctx.request.json();

  return new Response(JSON.stringify({ message: "Created", data }));
};

export const all: APIRoute = async (ctx) => {
  // get the request method
  const method = ctx.request.method;

  // return a response
  return new Response(
    JSON.stringify({
      method,
      message: "Unsupported HTTP method",
    }),
    {
      status: 501, // unsupported
    }
  );
};
