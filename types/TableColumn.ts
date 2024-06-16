import { ReactNode } from "react";

export type TableColumn<TData> = {
  accessorKey: keyof TData | string;
  header: string;
  Cell?: ReactNode | ((props: { row: TData }) => ReactNode);
};

export const getValueByAccessorKey = <TData>(data: TData, accessorKey: keyof TData | string): any => {
  if (typeof accessorKey === 'string') {
    const keys = accessorKey.split('.');
    let value: any = data;
    for (const key of keys) {
      value = value?.[key];
      if (value === undefined) break;
    }
    return value;
  }
  return data[accessorKey];
};