export interface BadgeProps {
    children: React.ReactNode;
    variant?: 'blue' | 'green' | 'red' | 'gray' | 'primary' | 'secondary';
    className?: string;
}
export declare function Badge({ children, variant, className }: BadgeProps): import("react").JSX.Element;
