import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useTheme } from '../theme/ThemeContext';

export interface SidebarNode {
    id: string | number;
    title: string;
    badge?: string;
    subtitle?: React.ReactNode;
    subNodes?: SidebarNode[];
}

export interface SidebarProps {
    nodes: SidebarNode[];
    activeNodeId: string | number | null;
    activeSubNodeId?: string | number | null;
    onNodeSelect: (nodeId: string | number) => void;
    onSubNodeSelect?: (nodeId: string | number, subNodeId: string | number) => void;
    isMobileMenuOpen: boolean;
    onClose: () => void;
    backLinkUrl?: string;
    backLinkText?: string;
    title?: string;
}

export const Sidebar = ({
    nodes,
    activeNodeId,
    activeSubNodeId,
    onNodeSelect,
    onSubNodeSelect,
    isMobileMenuOpen,
    onClose,
    backLinkUrl,
    backLinkText,
    title,
}: SidebarProps) => {
    const { theme } = useTheme();
    const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
    const [expandedNodes, setExpandedNodes] = useState<Set<string | number>>(new Set([activeNodeId || nodes[0]?.id]));
    const nodeRefs = useRef<{ [key: string | number]: HTMLLIElement | null }>({});
    const prevExpandedNodes = useRef<Set<string | number>>(expandedNodes);

    useEffect(() => {
        const newlyExpanded = Array.from(expandedNodes).find(id => !prevExpandedNodes.current.has(id));
        if (newlyExpanded !== undefined) {
            const element = nodeRefs.current[newlyExpanded];
            if (element) {
                setTimeout(() => {
                    const container = element.closest('aside');
                    if (container) {
                        container.scrollTo({ top: element.offsetTop - 24, behavior: 'smooth' });
                    }
                }, 450);
            }
        }
        prevExpandedNodes.current = new Set(expandedNodes);
    }, [expandedNodes]);

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleNode = (nodeId: string | number, e: React.MouseEvent | React.KeyboardEvent) => {
        e.stopPropagation();
        const newExpanded = new Set(expandedNodes);
        if (newExpanded.has(nodeId)) {
            newExpanded.delete(nodeId);
        } else {
            newExpanded.add(nodeId);
        }
        setExpandedNodes(newExpanded);
    };

    const handleNodeClick = (nodeId: string | number) => {
        if (!expandedNodes.has(nodeId)) {
            setExpandedNodes(new Set(expandedNodes).add(nodeId));
        }
        onNodeSelect(nodeId);
    };

    const handleSubNodeClick = (nodeId: string | number, subNodeId: string | number) => {
        if (onSubNodeSelect) {
            onSubNodeSelect(nodeId, subNodeId);
        }
        if (!isDesktop) {
            onClose();
        }
    };

    return (
        <>
            <AnimatePresence>
                {isMobileMenuOpen && !isDesktop && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm z-30"
                        style={{ top: 'var(--fc-header-height, 80px)' }}
                    />
                )}
            </AnimatePresence>

            <motion.aside
                initial={false}
                animate={{
                    x: isDesktop ? 0 : (isMobileMenuOpen ? 0 : -320),
                    visibility: isDesktop ? "visible" : (isMobileMenuOpen ? "visible" : "hidden"),
                }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="w-80 z-40 overflow-y-auto backdrop-blur-xl border-r shadow-2xl xl:shadow-none xl:sticky
                          fixed left-0 pt-0 pb-24
                          top-[var(--fc-header-height,80px)]
                          h-[calc(100vh-var(--fc-header-height,80px))]"
                style={{
                    backgroundColor: theme.colors.bg.sidebar,
                    borderColor: `${theme.colors.border}30`,
                }}
            >
                {/* Mobile Header: Back Link and Close Button */}
                <div className="flex justify-between items-center px-4 mb-6 sticky top-0 bg-white/80 backdrop-blur-md pt-4 pb-2 z-10 lg:hidden">
                    {backLinkUrl && backLinkText ? (
                        <a href={backLinkUrl} 
                           className="flex-1 btn-interactive interactive-effect group mr-4"
                        >
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            {backLinkText}
                        </a>
                    ) : (
                        <div />
                    )}
                    
                    {!isDesktop && isMobileMenuOpen && (
                        <button
                            onClick={onClose}
                            className="shrink-0 p-2.5 rounded-lg cursor-pointer text-gray-600 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 bg-white"
                            aria-label="Close sidebar"
                            onMouseEnter={(e) => e.currentTarget.style.color = theme.colors.primary.DEFAULT}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#4B5563'}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                <nav className="px-4 lg:pt-8">
                    {title && (
                        <h2 className="text-lg font-serif font-bold mb-6 tracking-wide bg-clip-text text-transparent"
                            style={{ backgroundImage: `linear-gradient(to right, ${theme.colors.primary.DEFAULT}, ${theme.colors.primary.light})` }}
                        >
                            {title}
                        </h2>
                    )}
                    <ul className="space-y-4">
                        {nodes.map((node) => {
                            const isExpanded = expandedNodes.has(node.id);
                            const isActiveNode = activeNodeId === node.id;
                            const hasSubNodes = node.subNodes && node.subNodes.length > 0;

                            return (
                                <li key={node.id} ref={el => { nodeRefs.current[node.id] = el; }} className="flex flex-col relative">
                                    {/* Main Node Card - 1:1 match with original shadow/bg styling */}
                                    <div 
                                        className="rounded-xl transition-all duration-300 group"
                                        style={{
                                            borderLeft: isActiveNode ? '4px solid' : '4px solid transparent',
                                            borderImage: isActiveNode ? `linear-gradient(to bottom, ${theme.colors.secondary.light}, ${theme.colors.secondary.dark}) 1` : 'none',
                                            backgroundColor: isActiveNode ? `${theme.colors.primary.DEFAULT}08` : 'rgba(255, 255, 255, 0.6)',
                                            boxShadow: isActiveNode 
                                                ? `0 8px 24px -6px ${theme.colors.primary.DEFAULT}33` 
                                                : '0 4px 12px -3px rgba(0, 0, 0, 0.1)'
                                        }}
                                    >
                                        <div className="relative flex items-center justify-between p-3.5">
                                            {/* Text Content (Clickable) */}
                                            <div 
                                                className="flex-1 text-left cursor-pointer"
                                                onClick={() => handleNodeClick(node.id)}
                                            >
                                                {node.badge && (
                                                    <span 
                                                        className="block text-xs font-bold uppercase tracking-wider bg-clip-text text-transparent mb-1"
                                                        style={{ backgroundImage: `linear-gradient(to right, ${theme.colors.secondary.light}, ${theme.colors.secondary.dark})` }}
                                                    >
                                                        {node.badge}
                                                    </span>
                                                )}
                                                <span 
                                                    className="block font-semibold text-sm leading-snug transition-colors duration-300 text-gray-800"
                                                >
                                                    {node.title}
                                                </span>
                                                {node.subtitle && (
                                                    <div className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                                                        {node.subtitle}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Expand Toggle */}
                                            {hasSubNodes && (
                                                <button
                                                    onClick={(e) => toggleNode(node.id, e)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                            e.preventDefault();
                                                            toggleNode(node.id, e);
                                                        }
                                                    }}
                                                    className="p-2 rounded-lg cursor-pointer border-2 bg-white/80 transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 shrink-0"
                                                    style={{ 
                                                        borderColor: '#D1D5DB', // gray-300
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.colors.primary.DEFAULT}
                                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#D1D5DB'}
                                                    aria-label={isExpanded ? "Collapse" : "Expand"}
                                                >
                                                    <svg
                                                        className="w-5 h-5 transition-transform duration-400"
                                                        style={{ 
                                                            color: theme.colors.primary.DEFAULT,
                                                            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'
                                                        }}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Subnodes List */}
                                    <AnimatePresence initial={false}>
                                        {isExpanded && hasSubNodes && (
                                            <motion.ul
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                                className="overflow-hidden ml-3 mt-2 space-y-1.5"
                                            >
                                                {node.subNodes!.map((subNode, index) => {
                                                    const isSubActive = activeSubNodeId === subNode.id;
                                                    return (
                                                        <motion.li
                                                            key={subNode.id}
                                                            initial={{ x: -10, opacity: 0 }}
                                                            animate={{ x: 0, opacity: 1 }}
                                                            transition={{ delay: index * 0.05 }}
                                                        >
                                                            <button
                                                                onClick={() => handleSubNodeClick(node.id, subNode.id)}
                                                                className={`group w-full text-left px-3.5 py-2.5 rounded-lg text-sm cursor-pointer transition-all duration-300 flex items-start gap-2.5 bg-transparent border-transparent interactive-effect ${
                                                                    isSubActive ? 'active translate-x-1' : 'hover:translate-x-1'
                                                                }`}
                                                            >
                                                                <span 
                                                                    className="mt-0.5 transition-colors"
                                                                    style={{ color: isSubActive ? theme.colors.secondary.light : theme.colors.secondary.DEFAULT }}
                                                                >
                                                                    →
                                                                </span>
                                                                <span className="flex-1 leading-snug font-medium">
                                                                    {subNode.title}
                                                                </span>
                                                            </button>
                                                        </motion.li>
                                                    );
                                                })}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </motion.aside>
        </>
    );
};
