"use server";

import { MongoDB } from "@/monoDB/MongoService";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await MongoDB.getModelsCount();

  return NextResponse.json(res);
}
