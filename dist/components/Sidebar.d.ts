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
export declare const Sidebar: ({ nodes, activeNodeId, activeSubNodeId, onNodeSelect, onSubNodeSelect, isMobileMenuOpen, onClose, backLinkUrl, backLinkText, title, }: SidebarProps) => import("react").JSX.Element;
