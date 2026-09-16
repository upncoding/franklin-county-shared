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
export declare const Sidebar: ({ nodes, activeNodeId, activeSubNodeId, onNodeSelect, onSubNodeSelect, isMobileMenuOpen, onClose, }: SidebarProps) => import("react").JSX.Element;
