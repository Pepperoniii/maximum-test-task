"use server";

import { MongoDB } from "@/monoDB/MongoService";
import { formatStocks } from "@/utils/formatStocks";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const limit = searchParams.get("limit") || "10";
  const offset = searchParams.get("offset") || "0";
  const models = searchParams.getAll("model");

  const res = await MongoDB.getStocks({
    limit: Number(limit),
    offset: Number(offset),
    models,
  });

  return NextResponse.json({ ...res, stocks: formatStocks(res.stocks) });
}
