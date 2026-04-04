import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await response.json();

    console.log("OpenRouter response:", data);

    return NextResponse.json({
      result: data.choices?.[0]?.message?.content || "No response",
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}