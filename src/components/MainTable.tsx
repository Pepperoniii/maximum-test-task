"use client";
import { TModel } from "@/types/types";
import { Pagination, Select, Table } from "antd";
import { useEffect, useState } from "react";

import Title from "antd/es/typography/Title";
import styles from "./MainTable.module.css";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Марка/модель",
    dataIndex: "markModel",
    key: "markModel",
  },
  {
    title: "Модификация",
    dataIndex: "modification",
    key: "modification",
  },
  {
    title: "Комплектация",
    dataIndex: "equipmentName",
    key: "equipmentName",
  },
  {
    title: "Стоимость",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Дата создания",
    dataIndex: "createdAt",
    key: "createdAt",
  },
];

const MainTable = () => {
  const [data, setData] = useState({
    stocks: [],
    total: 0,
    offset: 0,
  });

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [loading, setLoading] = useState(true);
  const [models, setModels] = useState<TModel[]>([]);
  const [currentModels, setCurrentModels] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    const queryModels = currentModels.reduce(
      (acc, model) => acc + `&model=${model}`,
      ""
    );
    fetch(
      `/api/stock?limit=${pagination.pageSize}&offset=${
        pagination.current * pagination.pageSize
      }&${queryModels}`
    )
      .then((res) => res.json())
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  }, [pagination, currentModels]);

  useEffect(() => {
    fetch("/api/stock/models")
      .then((res) => res.json())
      .then((res: TModel[]) => setModels(res));
  }, []);

  const onClickModel = (model: string) => {
    setCurrentModels((state) => {
      return [...state, model];
    });
  };

  const onChangeSelect = (value: string[]) => {
    setCurrentModels(value);
  };

  return (
    <div>
      <div className={styles.models}>
        {models.map((item) => {
          return (
            <button onClick={() => onClickModel(item.model)}>
              {item.model} <span>{item.count}</span>
            </button>
          );
        })}
      </div>

      <Title level={5}>Модели</Title>
      <Select
        mode="tags"
        style={{ width: "100%" }}
        placeholder="Tags Mode"
        onChange={onChangeSelect}
        value={currentModels}
        open={false}
        className={styles.select}
      />

      <Table
        dataSource={data.stocks}
        columns={columns}
        pagination={false}
        size="middle"
        loading={loading}
      />

      <Pagination
        className={styles.pagination}
        total={data.total - pagination.pageSize}
        pageSize={pagination.pageSize}
        pageSizeOptions={[10, 20, 50, 100]}
        current={pagination.current}
        onChange={(page, pageSize) => {
          setPagination({
            pageSize,
            current: page,
          });
        }}
        onShowSizeChange={(current, pageSize) => {
          setPagination({
            current,
            pageSize,
          });
        }}
      />
    </div>
  );
};
export default MainTable;
