export interface PageHeaderProps {
    title?: string;
    subtitle?: string;
    image?: string;
    video?: string;
    /** If true, the header takes up min-h-screen. Otherwise h-[60vh] */
    isHomePage?: boolean;
}
export declare function PageHeader({ title, subtitle, image, video, isHomePage }: PageHeaderProps): import("react").JSX.Element | null;
