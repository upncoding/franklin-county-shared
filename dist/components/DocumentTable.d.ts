export interface DocumentLink {
    label: string;
    url: string;
}
export interface DocumentRow {
    date: string;
    title: string;
    links: DocumentLink[];
}
export interface DocumentTableProps {
    rows: DocumentRow[];
}
export declare function DocumentTable({ rows }: DocumentTableProps): import("react").JSX.Element;
