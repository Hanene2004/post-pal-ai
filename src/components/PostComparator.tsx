import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, Scale, Trophy, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ComparisonResult {
    draft_a_score: number;
    draft_b_score: number;
    winner: "a" | "b" | "draw";
    reasoning: string;
    metric_comparison: {
        hook_strength: string | number;
        clarity: string | number;
        engagement_potential: string | number;
        platform_fit: string | number;
    };
}

export function PostComparator() {
    const [draftA, setDraftA] = useState("");
    const [draftB, setDraftB] = useState("");
    const [platform, setPlatform] = useState("instagram");
    const [isComparing, setIsComparing] = useState(false);
    const [result, setResult] = useState<ComparisonResult | null>(null);

    const handleCompare = async () => {
        if (!draftA || !draftB) {
            toast.error("Please enter both drafts to compare");
            return;
        }

        setIsComparing(true);
        setResult(null);

        try {
            const { data, error } = await supabase.functions.invoke("compare-posts", {
                body: { draftA, draftB, platform },
            });

            if (error) throw error;
            if (data.error) throw new Error(data.error);

            setResult(data);
            toast.success("Comparison complete!");
        } catch (error) {
            console.error("Error comparing posts:", error);
            toast.error("Failed to compare posts. Please try again.");
        } finally {
            setIsComparing(false);
        }
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-6">
                    <Card className={result?.winner === 'a' ? 'border-primary/50 ring-1 ring-primary/20' : 'border-border/50'}>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Draft A</CardTitle>
                                {result?.winner === 'a' && (
                                    <Badge className="bg-yellow-500 text-white gap-1">
                                        <Trophy className="h-3 w-3" /> Winner
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Textarea
                                placeholder="Enter first draft..."
                                className="min-h-[150px] resize-none"
                                value={draftA}
                                onChange={(e) => setDraftA(e.target.value)}
                            />
                            {result && (
                                <div className="pt-2">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-medium">Engagement Score</span>
                                        <span className="text-sm font-bold">{result.draft_a_score}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all duration-1000"
                                            style={{ width: `${result.draft_a_score}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className={result?.winner === 'b' ? 'border-primary/50 ring-1 ring-primary/20' : 'border-border/50'}>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Draft B</CardTitle>
                                {result?.winner === 'b' && (
                                    <Badge className="bg-yellow-500 text-white gap-1">
                                        <Trophy className="h-3 w-3" /> Winner
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Textarea
                                placeholder="Enter second draft..."
                                className="min-h-[150px] resize-none"
                                value={draftB}
                                onChange={(e) => setDraftB(e.target.value)}
                            />
                            {result && (
                                <div className="pt-2">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-medium">Engagement Score</span>
                                        <span className="text-sm font-bold">{result.draft_b_score}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all duration-1000"
                                            style={{ width: `${result.draft_b_score}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Button
                        className="w-full h-12 gap-2 text-lg font-semibold"
                        onClick={handleCompare}
                        disabled={isComparing || !draftA || !draftB}
                    >
                        {isComparing ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <Scale className="h-5 w-5" />
                        )}
                        Compare & Predict
                    </Button>
                </div>

                <div className="space-y-6">
                    {result ? (
                        <div className="space-y-6 animate-fade-in">
                            <Card className="border-primary/20 bg-primary/5">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-primary">
                                        <Sparkles className="h-5 w-5" />
                                        AI Verdict
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-foreground leading-relaxed">
                                        {result.reasoning}
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary/10">
                                        <div className="space-y-1">
                                            <span className="text-[10px] uppercase text-muted-foreground font-bold">Winning Edge</span>
                                            <p className="text-sm font-medium">
                                                {result.winner === 'a' ? 'Draft A is more compelling' : result.winner === 'b' ? 'Draft B is more effective' : 'Both drafts are equally strong'}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] uppercase text-muted-foreground font-bold">Predicted Lift</span>
                                            <p className="text-sm font-bold text-green-600">
                                                +{Math.abs(result.draft_a_score - result.draft_b_score)}% Engagement
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="grid gap-4">
                                <h4 className="font-semibold text-sm flex items-center gap-2 px-1">
                                    <TrendingUp className="h-4 w-4 text-primary" />
                                    Metric Breakdown
                                </h4>
                                <div className="grid gap-3">
                                    {Object.entries(result.metric_comparison).map(([metric, value], idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/50">
                                            <span className="text-xs font-medium capitalize">{metric.replace('_', ' ')}</span>
                                            <span className="text-xs font-bold text-primary">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-border/50 rounded-xl bg-card/50 p-12 text-center">
                            <div className="mb-4 h-20 w-20 rounded-full bg-secondary flex items-center justify-center text-muted-foreground/50">
                                <Scale className="h-10 w-10" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Compare Two Drafts</h3>
                            <p className="text-sm text-muted-foreground max-w-sm mb-6">
                                Paste two different versions of your post, and our AI will predict which one will perform better and why.
                            </p>
                            <div className="flex gap-4 opacity-50">
                                <div className="flex items-center gap-1 text-xs">
                                    <CheckCircle2 className="h-3 w-3" /> Predicted Impact
                                </div>
                                <div className="flex items-center gap-1 text-xs">
                                    <CheckCircle2 className="h-3 w-3" /> Detailed Reasoning
                                </div>
                                <div className="flex items-center gap-1 text-xs">
                                    <CheckCircle2 className="h-3 w-3" /> Metric Analysis
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
