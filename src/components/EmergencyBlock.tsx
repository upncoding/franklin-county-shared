import { useTheme } from '../theme/ThemeContext';

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

export function EmergencyBlock({ 
    title = "Need Immediate Help?", 
    description = "If you or someone you know is in crisis, help is available 24/7 through these dedicated services.", 
    contacts,
    preheader = "Crisis & Support"
}: EmergencyBlockProps) {
    const { theme } = useTheme();

    return (
        <section aria-label="Crisis and Emergency Contacts" className="py-16 relative overflow-hidden" style={{ background: theme.colors.bg.mainTo }}>
            {/* Subtle Background pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
                <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${theme.colors.secondary.dark} 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="w-full md:w-1/3">
                        <div className="inline-block px-4 py-1 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] mb-4" style={{ backgroundColor: theme.colors.secondary.DEFAULT, color: theme.colors.text.primary }}>
                            {preheader}
                        </div>
                        <h2 className="text-4xl font-serif font-black leading-tight mb-4" style={{ color: theme.colors.text.primary }}>
                            {title}
                        </h2>
                        <p className="text-lg leading-relaxed" style={{ color: theme.colors.text.muted }}>
                            {description}
                        </p>
                    </div>

                    <div className="w-full md:w-2/3 grid sm:grid-cols-2 gap-6">
                        {contacts.map((contact, i) => (
                            <div
                                key={i}
                                className="p-6 sm:p-8 rounded-3xl border transition-all duration-300 group hover-lift elevation-sm fluid-container"
                                style={{
                                    backgroundColor: theme.colors.bg.card,
                                    borderColor: `${theme.colors.secondary.DEFAULT}20`
                                }}
                            >
                                <span className="block text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: theme.colors.secondary.dark }}>{contact.label}</span>
                                <div className="flex flex-col gap-2">
                                    {contact.number.split(' or ').map((num, idx) => (
                                        <a
                                            key={idx}
                                            href={`tel:${num.replace(/[^0-9]/g, '')}`}
                                            className="font-black block hover:underline decoration-4 underline-offset-8 whitespace-nowrap"
                                            style={{ 
                                                color: theme.colors.text.primary, 
                                                textDecorationColor: theme.colors.secondary.DEFAULT,
                                                fontSize: 'clamp(1rem, 10.5cqw, 1.875rem)'
                                            }}
                                            aria-label={`Call ${contact.label}: ${num}`}
                                        >
                                            {num}
                                        </a>
                                    ))}
                                </div>
                                <p className="text-sm font-medium mt-1" style={{ color: theme.colors.text.muted }}>{contact.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
