export type TableColumnProps = {
    key: string;
    label: string;
    allowsSorting?: boolean;
    customRender?: (item: any) => JSX.Element;
}

export type TableColumns = TableColumnProps[];
