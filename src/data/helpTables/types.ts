export type TableRowType = "text" | "scale" | "boolean";

export interface TableColumn {
  label: string;
  image?: string;
  borderColor?: string;
  backgroundColor?: string;
}

export interface TableRow {
  label: string;
  icon?: string;
  type?: TableRowType;
  scale?: [number, number];
  values: (string | number | boolean | null)[];
}

export interface SimpleTable {
  id: number;
  title: string;
  description?: string | null;
  columns: TableColumn[];
  rows: TableRow[];
}