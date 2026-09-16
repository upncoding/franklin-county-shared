import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useTheme } from '../theme/ThemeContext';

export interface SidebarNode {
    id: string | number;
    title: string;
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
        // Detect newly expanded module
        const newlyExpanded = Array.from(expandedNodes).find(id => !prevExpandedNodes.current.has(id));

        if (newlyExpanded !== undefined) {
            const element = nodeRefs.current[newlyExpanded];
            if (element) {
                // Wait for expansion animation to start so we scroll to correct height
                setTimeout(() => {
                    const container = element.closest('aside');
                    if (container) {
                        container.scrollTo({
                            top: element.offsetTop - 24, // Keep slight padding at top
                            behavior: 'smooth'
                        });
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
            {/* Mobile Backdrop */}
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

            {/* Sidebar - Premium Glassmorphism */}
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
                    <ul className="space-y-3">
                        {nodes.map((node) => {
                            const isExpanded = expandedNodes.has(node.id);
                            const isActiveNode = activeNodeId === node.id;
                            const hasSubNodes = node.subNodes && node.subNodes.length > 0;

                            return (
                                <li key={node.id} ref={el => { nodeRefs.current[node.id] = el; }} className="flex flex-col">
                                    <div className="flex relative">
                                        <button
                                            onClick={() => handleNodeClick(node.id)}
                                            className={`group flex-1 flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 font-bold interactive-effect ${
                                                isActiveNode
                                                    ? 'shadow-sm ring-1 ring-inset'
                                                    : 'opacity-80 hover:opacity-100'
                                            }`}
                                            style={{
                                                backgroundColor: isActiveNode ? theme.colors.primary.DEFAULT : 'transparent',
                                                color: isActiveNode ? theme.colors.text.onDark : theme.colors.text.primary,
                                                borderColor: isActiveNode ? `${theme.colors.primary.DEFAULT}30` : 'transparent',
                                            }}
                                        >
                                            <span className="text-left line-clamp-2 pr-2 leading-snug text-[15px]">
                                                {node.title}
                                            </span>
                                        </button>
                                        
                                        {hasSubNodes && (
                                            <button
                                                onClick={(e) => toggleNode(node.id, e)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        e.preventDefault();
                                                        toggleNode(node.id, e);
                                                    }
                                                }}
                                                className={`absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-transform duration-300 hover:bg-black/5 focus-visible:ring-2 focus-visible:outline-none ${
                                                    isExpanded ? 'rotate-90' : 'rotate-0'
                                                }`}
                                                style={{ color: isActiveNode ? theme.colors.text.onDark : theme.colors.text.primary }}
                                                aria-label={isExpanded ? "Collapse section" : "Expand section"}
                                                aria-expanded={isExpanded}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="m9 18 6-6-6-6"/>
                                                </svg>
                                            </button>
                                        )}
                                    </div>

                                    <AnimatePresence initial={false}>
                                        {isExpanded && hasSubNodes && (
                                            <motion.ul
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                className="overflow-hidden relative mt-1 ml-4"
                                            >
                                                {/* Left line guide */}
                                                <div 
                                                    className="absolute left-[11px] top-2 bottom-2 w-[2px] rounded-full"
                                                    style={{ backgroundColor: `${theme.colors.border}40` }}
                                                />
                                                
                                                <div className="py-2 space-y-1 pl-6 relative">
                                                    {node.subNodes!.map((subNode) => {
                                                        const isSubActive = activeSubNodeId === subNode.id;
                                                        return (
                                                            <li key={subNode.id} className="relative">
                                                                <button
                                                                    onClick={() => handleSubNodeClick(node.id, subNode.id)}
                                                                    className={`w-full text-left px-3 py-2 text-[14px] leading-tight font-medium rounded-lg transition-all duration-200 interactive-effect ${
                                                                        isSubActive 
                                                                            ? 'font-bold' 
                                                                            : 'opacity-70 hover:opacity-100'
                                                                    }`}
                                                                    style={{
                                                                        color: isSubActive ? theme.colors.primary.DEFAULT : theme.colors.text.primary,
                                                                        backgroundColor: isSubActive ? `${theme.colors.primary.DEFAULT}15` : 'transparent',
                                                                    }}
                                                                >
                                                                    {subNode.title}
                                                                </button>
                                                            </li>
                                                        );
                                                    })}
                                                </div>
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
