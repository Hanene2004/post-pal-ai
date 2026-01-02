import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trash2, Copy, Check, Calendar, MessageSquare, RefreshCcw, PenTool } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";

interface Draft {
    id: string;
    content: string;
    platform: string;
    target_tone: string;
    original_content: string;
    created_at: string;
}

export function DraftsManager() {
    const [drafts, setDrafts] = useState<Draft[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const { user } = useAuth();

    const fetchDrafts = async () => {
        if (!user) return;
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from("drafts")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setDrafts(data || []);
        } catch (error) {
            console.error("Error fetching drafts:", error);
            toast.error("Failed to load drafts");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDrafts();
    }, [user]);

    const handleDelete = async (id: string) => {
        try {
            const { error } = await supabase.from("drafts").delete().eq("id", id);
            if (error) throw error;
            setDrafts(drafts.filter((d) => d.id !== id));
            toast.success("Draft deleted");
        } catch (error) {
            console.error("Error deleting draft:", error);
            toast.error("Failed to delete draft");
        }
    };

    const handleCopy = (content: string, id: string) => {
        navigator.clipboard.writeText(content);
        setCopiedId(id);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopiedId(null), 2000);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary opacity-50" />
            </div>
        );
    }

    if (drafts.length === 0) {
        return (
            <Card className="border-dashed border-2 bg-card/50">
                <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                    <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-4 text-muted-foreground/50">
                        <MessageSquare className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">No drafts yet</h3>
                    <p className="text-sm text-muted-foreground max-w-xs">
                        Save your AI-powered rewrites and tone transformations to see them here.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {drafts.map((draft) => (
                <Card key={draft.id} className="group hover:border-primary/50 transition-colors flex flex-col">
                    <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex flex-wrap gap-2">
                                {draft.platform && (
                                    <Badge variant="secondary" className="text-[10px] uppercase">
                                        {draft.platform}
                                    </Badge>
                                )}
                                {draft.target_tone && (
                                    <Badge variant="outline" className="text-[10px] uppercase border-primary/20 text-primary bg-primary/5">
                                        {draft.target_tone}
                                    </Badge>
                                )}
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                                <Calendar className="h-3 w-3" />
                                {format(new Date(draft.created_at), "MMM d, yyyy")}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 pb-4">
                        <p className="text-sm text-foreground line-clamp-4 whitespace-pre-wrap leading-relaxed italic">
                            "{draft.content}"
                        </p>
                    </CardContent>
                    <CardFooter className="pt-0 flex items-center justify-between border-t border-border/50 mt-auto pt-3">
                        <div className="flex items-center gap-2">
                            {draft.target_tone ? (
                                <RefreshCcw className="h-3.5 w-3.5 text-muted-foreground" title="Tone Transformation" />
                            ) : (
                                <PenTool className="h-3.5 w-3.5 text-muted-foreground" title="Post Rewrite" />
                            )}
                            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
                                {draft.target_tone ? "Tone Transform" : "Post Improvement"}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => handleCopy(draft.content, draft.id)}
                            >
                                {copiedId === draft.id ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                                onClick={() => handleDelete(draft.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
