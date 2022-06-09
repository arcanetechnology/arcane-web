/** @format */

export type Index = string | number;

export type Row<K extends Index = Index> = number | string | Record<K, string>;
export type OptionalColumnProps<K extends Index = Index> = {
  label: string;
  sortable: boolean;
  onClick: (e: MouseEvent, row: Row<K>) => void;
};
export type Column<K extends Index = Index> = {
  id: K;
} & Partial<OptionalColumnProps<K>>;
