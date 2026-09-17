export interface EventCardProps {
    date: string;
    title: string;
    time?: string;
    location?: string;
    actionLabel?: string;
    actionUrl?: string;
    className?: string;
}
export declare function EventCard({ date, title, time, location, actionLabel, actionUrl, className }: EventCardProps): import("react").JSX.Element;
