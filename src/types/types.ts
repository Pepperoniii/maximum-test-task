export type TStock = {
  mark: string;
  model: string;
  engine: {
    power: number;
    volume: number;
    transmission: string;
    fuel: string;
  };
  drive: string;
  equipmentName: string;
  price: number;
  createdAt: string;
};

export type TCar = {
  id: string;
  markModel: string;
  modification: string;
  equipmentName: string;
  price: number;
  createdAt: string;
};

export type TModel = { count: number; model: string };
