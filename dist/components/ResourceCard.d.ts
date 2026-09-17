export interface ResourceCardProps {
    name: string;
    description: string;
    categories?: string[];
    address?: string;
    hours?: string;
    website?: string;
    email?: string;
    phone?: string;
    className?: string;
}
export declare function ResourceCard({ name, description, categories, address, hours, website, email, phone, className }: ResourceCardProps): import("react").JSX.Element;
