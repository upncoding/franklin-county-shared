import { useTheme } from '../theme/ThemeContext';
import { useFloating, autoUpdate, offset, flip, shift, FloatingPortal, type Placement } from '@floating-ui/react';
import { useState } from 'react';

interface SmartTooltipProps {
    triggerText: string;
    tooltipContent: string;
    tooltipId: string;
    isActive: boolean;
    onToggle: () => void;
}

export const SmartTooltip = ({ triggerText, tooltipContent, isActive, onToggle }: SmartTooltipProps) => {
    const { theme } = useTheme();
    const [isHovered, setIsHovered] = useState(false);

    const { refs, floatingStyles } = useFloating({
        placement: 'bottom' as Placement,
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(8),
            flip({
                fallbackAxisSideDirection: 'start',
                padding: 32,
            }),
            shift({
                padding: 32,
            }),
        ],
    });

    const showTooltip = isActive || isHovered;

    return (
        <>
            <button
                type="button"
                ref={refs.setReference}
                className="cursor-help font-bold border-b-2 border-dotted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 rounded-sm transition-colors opacity-90 hover:opacity-100"
                style={{
                    color: theme.colors.primary.DEFAULT,
                    borderColor: theme.colors.primary.DEFAULT,
                }}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggle();
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {triggerText}
            </button>
            {showTooltip && (
                <FloatingPortal>
                    <div
                        // eslint-disable-next-line react-hooks/refs
                        ref={refs.setFloating}
                        style={floatingStyles}
                        className="w-80 max-w-[calc(100vw-4rem)] p-4 bg-gray-900 text-white text-sm leading-relaxed rounded-lg shadow-2xl z-50"
                    >
                        {tooltipContent}
                    </div>
                </FloatingPortal>
            )}
        </>
    );
};
