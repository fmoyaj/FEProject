import { NextRequest } from "next/server";
import { TextAnalyzer } from "../lib/TextAnalyzer";


export async function POST(req: NextRequest) {
  const body = await req.json();
  if (body) {
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
    })
  }
}

export async function GET(req: NextRequest) {
  // ...
  return new Response(JSON.stringify("no"), {
    headers: { 'Content-Type': 'application-json' },
    status: 200
  })
}
