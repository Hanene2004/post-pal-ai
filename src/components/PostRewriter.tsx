import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, Wand2, ArrowRight, CheckCircle2, AlertCircle, Copy, Check, FileDown } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface ImprovementSuggestion {
    original: string;
    improved: string;
    explanation: string;
}

interface RewriteResult {
    improved_content: string;
    score_boost: number;
    suggestions: ImprovementSuggestion[];
    confidence: number;
}

export function PostRewriter() {
    const [content, setContent] = useState("");
    const [platform, setPlatform] = useState("instagram");
    const [goal, setGoal] = useState("engagement");
    const [isRewriting, setIsRewriting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [result, setResult] = useState<RewriteResult | null>(null);
    const [copied, setCopied] = useState(false);
    const { user } = useAuth();

    const handleRewrite = async () => {
        if (!content) {
            toast.error("Please enter your existing post content");
            return;
        }

        setIsRewriting(true);
        setResult(null);

        try {
            const { data, error } = await supabase.functions.invoke("improve-post", {
                body: { content, platform, goal },
            });

            if (error) throw error;
            if (data.error) throw new Error(data.error);

            setResult(data);
            toast.success("Post improved successfully!");
        } catch (error) {
            console.error("Error rewriting post:", error);
            toast.error("Failed to improve post. Please try again.");
        } finally {
            setIsRewriting(false);
        }
    };

    const handleSaveDraft = async () => {
        if (!result || !user) return;

        setIsSaving(true);
        try {
            const { error } = await supabase.from("drafts").insert({
                user_id: user.id,
                content: result.improved_content,
                platform,
                original_content: content,
            });

            if (error) throw error;
            toast.success("Saved to drafts!");
        } catch (error) {
            console.error("Error saving draft:", error);
            toast.error("Failed to save draft");
        } finally {
            setIsSaving(false);
        }
    };

    const copyToClipboard = () => {
        if (!result) return;
        navigator.clipboard.writeText(result.improved_content);
        setCopied(true);
        toast.success("Improved content copied!");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="grid gap-8 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Wand2 className="h-5 w-5 text-primary" />
                            Original Post
                        </CardTitle>
                        <CardDescription>Paste your existing content to see how it can be improved</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="content">Your Post Content</Label>
                            <Textarea
                                id="content"
                                placeholder="Paste your post here..."
                                className="min-h-[200px] resize-none"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="platform">Platform</Label>
                                <Select value={platform} onValueChange={setPlatform}>
                                    <SelectTrigger id="platform">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="instagram">Instagram</SelectItem>
                                        <SelectItem value="tiktok">TikTok</SelectItem>
                                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                                        <SelectItem value="twitter">Twitter/X</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="goal">Goal</Label>
                                <Select value={goal} onValueChange={setGoal}>
                                    <SelectTrigger id="goal">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="engagement">Engagement</SelectItem>
                                        <SelectItem value="reach">Reach</SelectItem>
                                        <SelectItem value="leads">Leads</SelectItem>
                                        <SelectItem value="sales">Sales</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Button
                            className="w-full gap-2"
                            onClick={handleRewrite}
                            disabled={isRewriting || !content}
                        >
                            {isRewriting ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Sparkles className="h-4 w-4" />
                            )}
                            Improve My Post
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {result ? (
                        <div className="space-y-6 animate-fade-in">
                            <Card className="border-primary/50 overflow-hidden">
                                <CardHeader className="bg-primary/5 pb-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg">Improved Version</CardTitle>
                                            <CardDescription>Optimized for {platform} {goal}</CardDescription>
                                        </div>
                                        <div className="text-right">
                                            <Badge className="bg-green-600 text-white animate-pulse">
                                                +{result.score_boost}% Impact
                                            </Badge>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-4">
                                    <div className="p-4 rounded-lg bg-secondary/30 border border-border/50 relative group">
                                        <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                                            {result.improved_content}
                                        </p>
                                        <div className="absolute top-2 right-2 flex gap-1 items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                                onClick={copyToClipboard}
                                            >
                                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                                onClick={handleSaveDraft}
                                                disabled={isSaving}
                                            >
                                                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                                        AI Confidence: {Math.round(result.confidence * 100)}%
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="space-y-4">
                                <h4 className="font-semibold text-sm flex items-center gap-2 px-1">
                                    <AlertCircle className="h-4 w-4 text-primary" />
                                    Key Improvements Made
                                </h4>
                                {result.suggestions.map((suggestion, idx) => (
                                    <Card key={idx} className="border-border/50">
                                        <CardContent className="p-4 space-y-3">
                                            <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-muted-foreground">
                                                <span className="text-destructive font-bold">Before:</span>
                                                <span className="truncate">{suggestion.original}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-primary">
                                                <span className="text-green-600 font-bold">After:</span>
                                                <span className="truncate">{suggestion.improved}</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground bg-secondary/30 p-2 rounded border border-border/10 italic">
                                                "{suggestion.explanation}"
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full min-h-[400px] flex items-center justify-center border-2 border-dashed border-border/50 rounded-xl bg-card/50">
                            <div className="text-center p-8">
                                <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground opacity-50">
                                    <ArrowRight className="h-8 w-8" />
                                </div>
                                <h3 className="text-lg font-medium text-foreground mb-2">Rewrite Results</h3>
                                <p className="text-sm text-muted-foreground max-w-xs">
                                    Your improved content and suggestions will appear here once you click the button.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
