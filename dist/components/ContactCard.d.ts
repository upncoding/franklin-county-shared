export interface ContactCardProps {
    title: string;
    number: string;
    description: string;
    href?: string;
    className?: string;
}
export declare function ContactCard({ title, number, description, href, className }: ContactCardProps): import("react").JSX.Element;
