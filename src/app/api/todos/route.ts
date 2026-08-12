import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import type { Todo } from "@/types/todo";

const STORAGE_KEY = "todos";

function getRedis() {
  return new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });
}

export async function GET() {
  const redis = getRedis();
  const todos = (await redis.get<Todo[]>(STORAGE_KEY)) ?? [];
  return NextResponse.json(todos);
}

export async function PUT(request: Request) {
  const redis = getRedis();
  const todos = (await request.json()) as Todo[];
  await redis.set(STORAGE_KEY, todos);
  return NextResponse.json({ ok: true });
}
