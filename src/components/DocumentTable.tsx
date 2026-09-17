import { useTheme } from '../theme/ThemeContext';

export interface DocumentLink {
    label: string;
    url: string;
}

export interface DocumentRow {
    date: string;
    title: string;
    links: DocumentLink[];
}

export interface DocumentTableProps {
    rows: DocumentRow[];
}

export function DocumentTable({ rows }: DocumentTableProps) {
    const { theme } = useTheme();

    return (
        <>
            {/* Desktop Table View */}
            <table className="w-full text-sm text-left hidden md:table">
                <thead>
                    <tr className="border-b-2" style={{ borderColor: `${theme.colors.secondary.DEFAULT}40` }}>
                        <th className="font-bold pb-3" style={{ color: theme.colors.secondary.dark }}>Date</th>
                        <th className="font-bold pb-3" style={{ color: theme.colors.secondary.dark }}>Title</th>
                        <th className="font-bold pb-3" style={{ color: theme.colors.secondary.dark }}>Documents</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {rows.map((row, i) => (
                        <tr key={i}>
                            <td className="py-4 font-medium" style={{ color: theme.colors.text.primary }}>{row.date}</td>
                            <td className="py-4" style={{ color: theme.colors.text.primary }}>{row.title}</td>
                            <td className="py-4">
                                <div className="flex gap-4">
                                    {row.links.map((link, j) => (
                                        <span key={j}>
                                            <a href={link.url} className="font-bold hover:underline" style={{ color: theme.colors.secondary.dark }}>
                                                {link.label}
                                            </a>
                                            {j < row.links.length - 1 && (
                                                <span className="ml-4" style={{ color: theme.colors.text.muted }}>|</span>
                                            )}
                                        </span>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
                {rows.map((row, i) => (
                    <div key={i} className="p-4 rounded-lg border border-gray-100 bg-white shadow-sm">
                        <div className="text-xs uppercase tracking-wider font-bold mb-1" style={{ color: theme.colors.secondary.dark }}>{row.date}</div>
                        <div className="font-bold mb-3" style={{ color: theme.colors.text.primary }}>{row.title}</div>
                        <div className="flex flex-wrap gap-4 text-sm font-bold" style={{ color: theme.colors.secondary.dark }}>
                            {row.links.map((link, j) => (
                                <span key={j} className="flex items-center">
                                    <a href={link.url} className="hover:underline">{link.label}</a>
                                    {j < row.links.length - 1 && (
                                        <span className="mx-4 font-normal text-gray-300">|</span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
