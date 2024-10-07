import { TCar, TStock } from "@/types/types";
import { WithId } from "mongodb";

export function formatStocks(stocks: WithId<TStock>[]): TCar[] {
  return stocks.map((stock) => {
    return {
      id: stock._id.toString(),
      markModel: `${stock.mark} ${stock.model}`,
      equipmentName: stock.equipmentName,
      price: stock.price,
      createdAt: stock.createdAt,
      modification: `${stock.engine.volume} ${stock.engine.transmission} (${stock.engine.power} л.с.) ${stock.drive}`,
    };
  });
}
