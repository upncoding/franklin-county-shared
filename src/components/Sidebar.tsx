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
}

export const Sidebar = ({
    nodes,
    activeNodeId,
    activeSubNodeId,
    onNodeSelect,
    onSubNodeSelect,
    isMobileMenuOpen,
    onClose,
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
                          fixed left-0 pt-6 xl:pt-12 pb-24
                          top-[var(--fc-header-height,80px)]
                          h-[calc(100vh-var(--fc-header-height,80px))]"
                style={{
                    backgroundColor: theme.colors.bg.sidebar,
                    borderColor: `${theme.colors.border}30`,
                }}
            >
                <nav className="px-4">
                    <h2 className="text-xs font-black tracking-widest text-gray-400 uppercase mb-6 px-4">
                        Contents
                    </h2>
                    <ul className="space-y-4">
                        {nodes.map((node) => {
                            const isExpanded = expandedNodes.has(node.id);
                            const isActiveNode = activeNodeId === node.id;
                            const hasSubNodes = node.subNodes && node.subNodes.length > 0;

                            return (
                                <li key={node.id} ref={el => { nodeRefs.current[node.id] = el; }} className="flex flex-col relative">
                                    {/* Main Node Card */}
                                    <div 
                                        className="rounded-xl transition-all duration-300 interactive-effect"
                                        style={{
                                            borderLeft: isActiveNode ? '4px solid' : '4px solid transparent',
                                            borderImage: isActiveNode ? `linear-gradient(to bottom, ${theme.colors.secondary.light}, ${theme.colors.secondary.dark}) 1` : 'none',
                                            backgroundColor: isActiveNode ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                                            padding: '0.25rem',
                                        }}
                                    >
                                        <div className="relative flex items-center justify-between p-2">
                                            {/* Text Content (Clickable) */}
                                            <div 
                                                className="flex-1 text-left cursor-pointer pr-2"
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
                                                    className="block font-bold text-[15px] leading-snug transition-colors duration-300"
                                                    style={{ color: isActiveNode ? theme.colors.primary.DEFAULT : theme.colors.text.primary }}
                                                >
                                                    {node.title}
                                                </span>
                                                {node.subtitle && (
                                                    <div className="text-xs text-gray-500 mt-1.5 flex items-center gap-1 font-medium">
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
                                                    className="p-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 shrink-0"
                                                    aria-label={isExpanded ? "Collapse" : "Expand"}
                                                >
                                                    <svg
                                                        className="w-5 h-5 transition-transform duration-300"
                                                        style={{ 
                                                            color: isActiveNode ? theme.colors.primary.DEFAULT : theme.colors.text.secondary,
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
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                className="overflow-hidden ml-3 mt-2 space-y-1"
                                            >
                                                {node.subNodes!.map((subNode, index) => {
                                                    const isSubActive = activeSubNodeId === subNode.id;
                                                    return (
                                                        <motion.li
                                                            key={subNode.id}
                                                            initial={{ x: -10, opacity: 0 }}
                                                            animate={{ x: 0, opacity: 1 }}
                                                            transition={{ delay: index * 0.03 }}
                                                        >
                                                            <button
                                                                onClick={() => handleSubNodeClick(node.id, subNode.id)}
                                                                className="group w-full text-left px-3.5 py-2 rounded-lg text-sm cursor-pointer transition-all duration-300 flex items-start gap-2 interactive-effect bg-transparent"
                                                                style={{
                                                                    transform: isSubActive ? 'translateX(4px)' : 'none'
                                                                }}
                                                            >
                                                                <span 
                                                                    className="mt-[2px] transition-colors"
                                                                    style={{ color: isSubActive ? theme.colors.secondary.DEFAULT : `${theme.colors.secondary.DEFAULT}80` }}
                                                                >
                                                                    →
                                                                </span>
                                                                <span 
                                                                    className="flex-1 leading-snug font-medium"
                                                                    style={{ color: isSubActive ? theme.colors.primary.DEFAULT : theme.colors.text.primary }}
                                                                >
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
