export interface EmergencyContact {
    label: string;
    number: string;
    description: string;
}
export interface EmergencyBlockProps {
    title?: string;
    description?: string;
    contacts: EmergencyContact[];
    preheader?: string;
}
export declare function EmergencyBlock({ title, description, contacts, preheader }: EmergencyBlockProps): import("react").JSX.Element;
