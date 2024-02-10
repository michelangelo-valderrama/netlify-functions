import type { Handler, HandlerContext, HandlerEvent } from "@netlify/functions"

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const myImportantVariable = process.env.MY_IMPORTANT_VARIABLE

  if (!myImportantVariable) {
    throw new Error("missing MY_IMPORTANT_VARIABLE")
  }

  console.log({ myImportantVariable })

  return {
    statusCode: 200,
    body: JSON.stringify({ myImportantVariable }),
    headers: {
      "Content-Type": "application/json",
    },
  }
}

export { handler }
