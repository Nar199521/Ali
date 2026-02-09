import { SiteFooter } from "@/components/site-footer";

interface SuperDealsLayoutProps {
    children: React.ReactNode;
}

export default function SuperDealsLayout({ children }: SuperDealsLayoutProps) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
            <SiteFooter />
        </div>
    );
}