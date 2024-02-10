import type { Handler, HandlerContext, HandlerEvent } from "@netlify/functions"

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello" }),
    headers: {
      "Content-Type": "application/json",
    },
  }
}

export { handler }
