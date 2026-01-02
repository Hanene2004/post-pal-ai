import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard, Wand2, BarChart3, Layout, Users, Radar,
    PenTool, Calendar, Fingerprint, Zap, Globe, Settings,
    LogOut, ChevronLeft, ChevronRight, Menu, Moon, Sun, Search,
    MessageSquare, Sparkles, BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { Separator } from "@/components/ui/separator";

interface SidebarItemProps {
    icon: any;
    label: string;
    href: string;
    active: boolean;
    collapsed: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, active, collapsed }: SidebarItemProps) => {
    return (
        <Link to={href}>
            <div className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group relative",
                active
                    ? "bg-primary/20 text-primary shadow-premium border border-primary/20"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground border border-transparent"
            )}>
                {active && (
                    <motion.div
                        layoutId="active-indicator"
                        className="absolute left-0 w-1 h-5 bg-primary rounded-full"
                    />
                )}
                <Icon className={cn("h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110", active ? "text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" : "group-hover:text-primary")} />
                {!collapsed && (
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm font-semibold whitespace-nowrap tracking-tight"
                    >
                        {label}
                    </motion.span>
                )}
                {collapsed && (
                    <div className="absolute left-full ml-4 px-3 py-1.5 glass-dark text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0 z-50 whitespace-nowrap shadow-2xl">
                        {label}
                    </div>
                )}
            </div>
        </Link>
    );
};

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const { user, signOut } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate("/");
    };

    const navigation = [
        {
            title: "Insights",
            items: [
                { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
                { icon: BarChart3, label: "Analytics", href: "/analytics" },
                { icon: Users, label: "Competitors", href: "/competitors" },
            ]
        },
        {
            title: "Creation",
            items: [
                { icon: Wand2, label: "Advisor", href: "/advisor" },
                { icon: PenTool, label: "Studio", href: "/studio" },
                { icon: Calendar, label: "Calendar", href: "/calendar" },
                { icon: Layout, label: "Creative Hub", href: "/creative" },
            ]
        },
        {
            title: "Intelligence",
            items: [
                { icon: Radar, label: "Trends", href: "/trends" },
                { icon: Zap, label: "Viral Lab", href: "/lab" },
                { icon: Fingerprint, label: "Architect", href: "/architect" },
                { icon: Globe, label: "Audience", href: "/audience" },
            ]
        },
        {
            title: "System",
            items: [
                { icon: Settings, label: "Preferences", href: "/preferences" },
            ]
        }
    ];

    return (
        <aside className={cn(
            "fixed left-0 top-0 h-screen z-50 glass-dark border-r border-white/5 transition-all duration-500 ease-in-out flex flex-col",
            collapsed ? "w-20" : "w-64"
        )}>
            {/* Background decorative blob */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 animate-blob" />

            {/* Header */}
            <div className="p-6 flex items-center justify-between overflow-hidden">
                {!collapsed && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Logo size="sm" />
                    </motion.div>
                )}
                {collapsed && (
                    <div className="h-10 w-10 rounded-xl gradient-premium flex items-center justify-center shrink-0 shadow-premium">
                        <Sparkles className="h-5 w-5 text-white" />
                    </div>
                )}
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 space-y-8 scrollbar-hide">
                {navigation.map((group, idx) => (
                    <div key={idx} className="space-y-4">
                        {!collapsed && (
                            <h3 className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">
                                {group.title}
                            </h3>
                        )}
                        <div className="space-y-1">
                            {group.items.map((item) => (
                                <SidebarItem
                                    key={item.href}
                                    {...item}
                                    active={location.pathname === item.href}
                                    collapsed={collapsed}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border/50 space-y-2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="w-full justify-start gap-3 h-10 px-3 hover:bg-muted"
                >
                    {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    {!collapsed && <span className="text-sm font-medium">Toggle Theme</span>}
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSignOut}
                    className="w-full justify-start gap-3 h-10 px-3 hover:bg-red-500/10 hover:text-red-500"
                >
                    <LogOut className="h-5 w-5" />
                    {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
                </Button>

                <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full bg-muted/50 hover:bg-muted"
                >
                    {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </Button>
            </div>
        </aside>
    );
}
