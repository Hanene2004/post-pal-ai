import React from "react";
import { Sidebar } from "./Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
    children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    const { user } = useAuth();

    if (!user) return <>{children}</>;

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <Sidebar />
            <div className="flex-1 transition-all duration-300 ml-20 lg:ml-64">
                {children}
            </div>
        </div>
    );
}
