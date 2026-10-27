export interface ActionCardProps {
    preheader?: string;
    title: string;
    url: string;
    className?: string;
    available?: boolean;
    unavailableTooltip?: string;
}
export declare function ActionCard({ preheader, title, url, className, available, unavailableTooltip }: ActionCardProps): import("react").JSX.Element;
