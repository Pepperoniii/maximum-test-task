import { Document, WithId } from "mongodb";
import { TStock } from "./types";

export type GetStocksResponse = {
  stocks: WithId<TStock>[];
  total?: number;
  offset?: number;
};

export type GetModelsResponse = Document[] | undefined;
