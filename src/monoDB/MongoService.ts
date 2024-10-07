import { GetModelsResponse, GetStocksResponse } from "@/types/mongo";
import { TStock } from "@/types/types";
import { Db } from "mongodb";
import { connectDB } from "./db";

export class MongoService {
  private db: Db | null = null;

  constructor() {
    this.connect();
  }

  private async connect() {
    if (!this.db) {
      const client = await connectDB();
      this.db = client.db("hrTest");
    }
  }

  async getStocks({
    limit = 10,
    offset = 0,
    models,
  }: {
    limit?: number;
    offset?: number;
    models?: string[];
  }): Promise<GetStocksResponse> {
    await this.connect();

    const filter: any = {};
    if (models && models.length > 0) {
      filter.model = { $in: models };
    }

    const stocks = await this.db
      ?.collection<TStock>("stock")
      .find(filter)
      .skip(offset)
      .limit(limit)
      .toArray();

    const total = await this.db
      ?.collection<TStock>("stock")
      .countDocuments(filter);

    if (!stocks) return { stocks: [], total, offset };
    return { stocks, total, offset };
  }

  async getModelsCount(): Promise<GetModelsResponse> {
    await this.connect();

    const modelsCount = await this.db
      ?.collection<TStock>("stock")
      .aggregate([
        {
          $group: {
            _id: "$model",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            model: "$_id",
            count: 1,
          },
        },
      ])
      .toArray();

    if (!modelsCount) {
      return [];
    }

    return modelsCount || [];
  }
}

export const MongoDB = new MongoService();
