import type { APIRoute } from "astro";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "", //import.meta.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://smartoire.com",
    "X-Title": "Smartoire",
  },
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free", //import.meta.env.MODEL_NAME,
      messages: [
        {
          role: "user",
          content: body.messages,
        },
      ],
      temperature: 0.7,
      max_tokens: 90,
    });

    return new Response(
      JSON.stringify({
        message: completion.choices[0].message.content,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: "Failed to generate response",
        details: error.message,
        status: error.status || 500,
        type: error.name,
      }),
      {
        status: error.status || 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
