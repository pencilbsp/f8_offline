import { Elysia } from "elysia";
import { readFileSync } from "node:fs";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hello, i am Pen")
  .get("/api/posts", async ({ query }) => {
    const text = readFileSync("posts.json", "utf8");
    const allPost = JSON.parse(text);

    const page = Number(query.page || 1);
    const limit = Number(query.limit || 4);

    const start = (page - 1) * limit;
    const end = page * limit;
    const data = allPost.slice(start, end);

    return new Response(
      JSON.stringify({
        data,
        _pagination: { total: allPost.length, page, limit },
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  })
  .get("/api/questions", () => {
    const text = readFileSync("questions.json", "utf8");
    const questions = JSON.parse(text);

    return new Response(
      JSON.stringify(
        questions.map((q) => ({
          ...q,
          answerCount: q.answerIds.length,
          answerIds: undefined,
        }))
      ),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  })
  .post("/api/question", ({ body }) => {
    const text = readFileSync("questions.json", "utf8");
    const questions = JSON.parse(text);

    const { action, questionId, answerIds } = body;

    const question = questions.find((q) => q.id === questionId);

    let isCorrect = true;
    let correctAnswerIds = question.answerIds;
    if (action === "answer" && question && Array.isArray(answerIds)) {
      if (answerIds.length === question.answerIds.length) {
        for (const answerId of answerIds) {
          if (question.answerIds.includes(answerId)) continue;
          else {
            isCorrect = false;
            break;
          }
        }
      } else isCorrect = false;
    } else isCorrect = false;

    return new Response(JSON.stringify({ isCorrect, correctAnswerIds }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  })
  .listen(8080);

console.log(`🦊 Elysia is running at on port ${app.server?.port}...`);
