export interface PDFPlaceholderProps {
    title: string;
    filename?: string;
    description?: string;
    url?: string;
    available?: boolean;
    unavailableMessage?: string;
    unavailableTooltip?: string;
}
export declare function PDFPlaceholder({ title, filename, description, url, available, unavailableMessage, unavailableTooltip }: PDFPlaceholderProps): import("react").JSX.Element | null;
