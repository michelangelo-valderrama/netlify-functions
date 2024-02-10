import type { Handler, HandlerContext, HandlerEvent } from "@netlify/functions"

const onStar = (payload: any): string => {
  const { action, sender, repository } = payload

  return `User ${sender.login} ${action} star on ${repository.name}`
}

const onIssue = (payload: any): string => {
  const { action, issue } = payload

  if (action === "opened") {
    return `An issue was opened with this title: ${issue.title}`
  }

  if (action === "closed") {
    return `An issue was closed by ${issue.user.login}`
  }

  if (action === "reopened") {
    return `An issue was reopened by ${issue.user.login}`
  }

  return `Unhandled action for the issue event ${action}`
}

const notify = async (message: string) => {
  const body = {
    content: message,
  }

  const resp = await fetch(process.env.DISCORD_WEBHOOK_URL ?? "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!resp.ok) {
    console.log("Error sending messago to discord", resp)
    return false
  }

  return true
}

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const githubEvent = event.headers["x-github-event"] ?? "unknow"
  const payload = JSON.parse(event.body ?? "{}")

  console.log(payload)
  let message = ""

  switch (githubEvent) {
    case "star":
      message = onStar(payload)
      break
    case "issues":
      message = onIssue(payload)
      break
    default:
      message = `Unknown event: ${githubEvent}`
      break
  }

  await notify(message)

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  }
}

export { handler }
