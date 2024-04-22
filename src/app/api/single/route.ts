import { TextAnalyzer } from "@/app/lib";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body && body.title && body.text) {
      const title = body.title;
      const text = body.text;
      const keywords = body.keywords;
      const analyzer = new TextAnalyzer();
      const analyzedTitle = analyzer.getNuancedWordFrequency(title, keywords);
      const analyzedText = analyzer.getNuancedWordFrequency(text, keywords);

      return new Response(JSON.stringify({
        title: analyzedTitle,
        text: analyzedText
      }), {
        headers: { 'Content-Type': 'application-json' },
        status: 200
      });
    } else {
      return new Response(JSON.stringify(
        { error: 'Missing body parameters' }), {
        headers: { 'Content-Type': 'application-json' },
        status: 400
      });
    }
  } catch (error) {
    return new Response(JSON.stringify(
      { error }), {
      headers: { 'Content-Type': 'application-json' },
      status: 500
    }
    )
  }
}

export async function GET(req: NextRequest) {
  return new Response(JSON.stringify({ error: "Not allowed" }), {
    headers: { 'Content-Type': 'application-json' },
    status: 405
  })
}

export async function PUT(req: NextRequest) {
  return new Response(JSON.stringify({ error: "Not allowed" }), {
    headers: { 'Content-Type': 'application-json' },
    status: 405
  })
}

export async function PATCH(req: NextRequest) {
  return new Response(JSON.stringify({ error: "Not allowed" }), {
    headers: { 'Content-Type': 'application-json' },
    status: 405
  })
}

export async function DELETE(req: NextRequest) {
  return new Response(JSON.stringify({ error: "Not allowed" }), {
    headers: { 'Content-Type': 'application-json' },
    status: 405
  })
}
