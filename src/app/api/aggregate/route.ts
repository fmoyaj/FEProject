import { CoreDataAggregator } from "@/app/lib";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body && body.keywords && body.data) {
      const keywords = body.keywords;
      const rawData = body.data;
      const aggregator = new CoreDataAggregator();
      const aggregatedData = aggregator.processData(rawData, keywords);

      return new Response(JSON.stringify(aggregatedData), {
        headers: { 'Content-Type': 'application-json' },
        status: 200
      });
    }

    return new Response(JSON.stringify(
      { error: 'Missing body parameters' }), {
      headers: { 'Content-Type': 'application-json' },
      status: 400
    });

  } catch (error) {
    return new Response(JSON.stringify(
      { error }), {
      headers: { 'Content-Type': 'application-json' },
      status: 500
    });
  }
}

export async function GET(req: NextRequest) {
  return new Response(JSON.stringify({ error: "Not allowed" }), {
    headers: { 'Content-Type': 'application-json' },
    status: 405
  });
}

export async function PUT(req: NextRequest) {
  return new Response(JSON.stringify({ error: "Not allowed" }), {
    headers: { 'Content-Type': 'application-json' },
    status: 405
  });
}

export async function PATCH(req: NextRequest) {
  return new Response(JSON.stringify({ error: "Not allowed" }), {
    headers: { 'Content-Type': 'application-json' },
    status: 405
  });
}

export async function DELETE(req: NextRequest) {
  return new Response(JSON.stringify({ error: "Not allowed" }), {
    headers: { 'Content-Type': 'application-json' },
    status: 405
  });
}
