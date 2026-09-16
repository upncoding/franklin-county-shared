interface SmartTooltipProps {
    triggerText: string;
    tooltipContent: string;
    tooltipId: string;
    isActive: boolean;
    onToggle: () => void;
}
export declare const SmartTooltip: ({ triggerText, tooltipContent, isActive, onToggle }: SmartTooltipProps) => import("react").JSX.Element;
export {};
