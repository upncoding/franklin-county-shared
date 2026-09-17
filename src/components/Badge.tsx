import { useTheme } from '../theme/ThemeContext';

export interface BadgeProps {
    children: React.ReactNode;
    variant?: 'blue' | 'green' | 'red' | 'gray' | 'primary' | 'secondary';
    className?: string;
}

export function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
    const { theme } = useTheme();
    const baseClasses = 'inline-block px-4 py-1 rounded-full font-bold text-xs uppercase tracking-widest';
    
    if (variant === 'primary') {
        return (
            <div className={`${baseClasses} ${className}`} style={{ backgroundColor: theme.colors.primary.DEFAULT, color: '#ffffff' }}>
                {children}
            </div>
        );
    }
    if (variant === 'secondary') {
        return (
            <div className={`${baseClasses} ${className}`} style={{ backgroundColor: theme.colors.secondary.DEFAULT, color: theme.colors.primary.dark }}>
                {children}
            </div>
        );
    }

    const variants = {
        blue: 'bg-blue-100 text-blue-800',
        green: 'bg-green-100 text-green-800',
        red: 'bg-red-100 text-red-800',
        gray: 'bg-gray-100 text-gray-800',
    };

    return (
        <div className={`${baseClasses} ${variants[variant as keyof typeof variants]} ${className}`}>
            {children}
        </div>
    );
}
