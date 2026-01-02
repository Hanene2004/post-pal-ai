import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PlatformIcon } from "@/components/PlatformIcon";
import { Filter, X } from "lucide-react";

export interface FilterOptions {
    platform: string;
    goal: string;
    tone: string;
    sortBy: "newest" | "oldest" | "engagement";
}

interface FilterPanelProps {
    filters: FilterOptions;
    onChange: (filters: FilterOptions) => void;
    onReset: () => void;
}

const platforms = [
    { id: "instagram", label: "Instagram" },
    { id: "tiktok", label: "TikTok" },
    { id: "linkedin", label: "LinkedIn" },
    { id: "twitter", label: "Twitter/X" },
];

export function FilterPanel({ filters, onChange, onReset }: FilterPanelProps) {
    const hasActiveFilters =
        filters.platform !== "all" ||
        filters.goal !== "all" ||
        filters.tone !== "all" ||
        filters.sortBy !== "newest";

    return (
        <Card className="p-4 space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-medium">Filters</h3>
                </div>
                {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={onReset} className="gap-1 text-xs">
                        <X className="h-3 w-3" />
                        Reset
                    </Button>
                )}
            </div>

            {/* Platforms */}
            <div className="space-y-2">
                <Label className="text-sm font-medium">Platform</Label>
                <Select
                    value={filters.platform}
                    onValueChange={(value) => onChange({ ...filters, platform: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="All Platforms" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Platforms</SelectItem>
                        {platforms.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                                <div className="flex items-center gap-2">
                                    <PlatformIcon platform={p.id} className="h-4 w-4" />
                                    {p.label}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Goal */}
            <div className="space-y-2">
                <Label className="text-sm font-medium">Goal</Label>
                <Select
                    value={filters.goal}
                    onValueChange={(value) => onChange({ ...filters, goal: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="All Goals" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Goals</SelectItem>
                        <SelectItem value="likes">Likes</SelectItem>
                        <SelectItem value="comments">Comments</SelectItem>
                        <SelectItem value="shares">Shares</SelectItem>
                        <SelectItem value="reach">Reach</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Tone */}
            <div className="space-y-2">
                <Label className="text-sm font-medium">Tone</Label>
                <Select
                    value={filters.tone}
                    onValueChange={(value) => onChange({ ...filters, tone: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="All Tones" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Tones</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="educational">Educational</SelectItem>
                        <SelectItem value="inspiring">Inspiring</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Sort By */}
            <div className="space-y-2">
                <Label className="text-sm font-medium">Sort by</Label>
                <Select
                    value={filters.sortBy}
                    onValueChange={(value: any) => onChange({ ...filters, sortBy: value })}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest first</SelectItem>
                        <SelectItem value="oldest">Oldest first</SelectItem>
                        <SelectItem value="engagement">Highest engagement</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </Card>
    );
}
