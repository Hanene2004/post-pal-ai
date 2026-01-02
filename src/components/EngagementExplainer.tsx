import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Lightbulb, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface ScoreFactor {
    name: string;
    score: number;
    maxScore: number;
    impact: "positive" | "negative" | "neutral";
    explanation: string;
}

interface QuickWin {
    action: string;
    impact: number;
    difficulty: "easy" | "medium" | "hard";
}

interface EngagementExplanation {
    totalScore: number;
    factors: ScoreFactor[];
    quickWins: QuickWin[];
    summary: string;
}

interface EngagementExplainerProps {
    post: {
        platform: string;
        topic: string;
        goal: string;
        tone: string;
        hook_suggestion?: string;
        content_length?: string;
        engagement_score?: number;
    };
}

// Calculate detailed engagement score breakdown
function calculateEngagementBreakdown(post: EngagementExplainerProps["post"]): EngagementExplanation {
    const factors: ScoreFactor[] = [];

    const hook = post.hook_suggestion || "";
    const platform = post.platform.toLowerCase();

    // Hook Analysis
    const hasQuestion = hook.includes("?");
    const hasNumbers = /\d+/.test(hook);
    const hookLength = hook.length;

    if (hasQuestion) {
        factors.push({
            name: "Strong Hook (Question)",
            score: 12,
            maxScore: 15,
            impact: "positive",
            explanation: "Questions encourage engagement and responses"
        });
    } else if (hookLength > 0) {
        factors.push({
            name: "Hook Quality",
            score: 6,
            maxScore: 15,
            impact: "neutral",
            explanation: "Adding a question could boost engagement"
        });
    }

    if (hasNumbers) {
        factors.push({
            name: "Data-Driven Content",
            score: 8,
            maxScore: 10,
            impact: "positive",
            explanation: "Numbers and stats attract attention"
        });
    }

    // Platform Fit
    const platformFitScore = getPlatformFitScore(platform, post.tone, hookLength);
    factors.push({
        name: "Platform Optimization",
        score: platformFitScore,
        maxScore: 15,
        impact: platformFitScore >= 10 ? "positive" : "neutral",
        explanation: platformFitScore >= 10
            ? `Well-optimized for ${platform}`
            : `Could be better tailored for ${platform}`
    });

    // Tone Appropriateness
    const toneScore = getToneScore(platform, post.tone, post.goal);
    factors.push({
        name: "Tone Match",
        score: toneScore,
        maxScore: 10,
        impact: toneScore >= 7 ? "positive" : "neutral",
        explanation: `${post.tone.charAt(0).toUpperCase() + post.tone.slice(1)} tone for ${post.goal}`
    });

    // Content Length
    const lengthScore = getLengthScore(platform, hookLength);
    factors.push({
        name: "Optimal Length",
        score: lengthScore.score,
        maxScore: 10,
        impact: lengthScore.impact,
        explanation: lengthScore.explanation
    });

    // Calculate total
    const totalScore = Math.min(100, factors.reduce((sum, f) => sum + f.score, 0));

    // Generate quick wins
    const quickWins: QuickWin[] = [];

    if (!hasQuestion && hookLength > 0) {
        quickWins.push({
            action: "Start hook with a compelling question",
            impact: 8,
            difficulty: "easy"
        });
    }

    if (!hasNumbers) {
        quickWins.push({
            action: "Add specific numbers or statistics",
            impact: 6,
            difficulty: "easy"
        });
    }

    if (platformFitScore < 10) {
        quickWins.push({
            action: `Optimize content specifically for ${platform}'s audience`,
            impact: platformFitScore < 7 ? 10 : 5,
            difficulty: "medium"
        });
    }

    if (lengthScore.impact === "negative") {
        quickWins.push({
            action: lengthScore.explanation.includes("short")
                ? "Expand content with more details"
                : "Trim content to key points",
            impact: 5,
            difficulty: "medium"
        });
    }

    return {
        totalScore,
        factors,
        quickWins,
        summary: generateSummary(totalScore)
    };
}

function getPlatformFitScore(platform: string, tone: string, length: number): number {
    const platformPreferences: Record<string, any> = {
        instagram: { tones: ["casual", "inspiring"], idealLength: [100, 150] },
        linkedin: { tones: ["professional", "educational"], idealLength: [150, 250] },
        twitter: { tones: ["casual", "professional"], idealLength: [50, 100] },
        tiktok: { tones: ["casual", "humorous"], idealLength: [50, 120] }
    };

    const prefs = platformPreferences[platform];
    if (!prefs) return 8;

    let score = 5;
    if (prefs.tones.includes(tone)) score += 5;
    if (length >= prefs.idealLength[0] && length <= prefs.idealLength[1]) score += 5;

    return score;
}

function getToneScore(platform: string, tone: string, goal: string): number {
    const goodMatches: Record<string, string[]> = {
        likes: ["inspiring", "humorous", "casual"],
        comments: ["educational", "professional"],
        shares: ["inspiring", "educational"],
        reach: ["casual", "humorous"]
    };

    return goodMatches[goal.toLowerCase()]?.includes(tone) ? 9 : 6;
}

function getLengthScore(platform: string, length: number): { score: number; impact: "positive" | "negative" | "neutral"; explanation: string } {
    const ranges: Record<string, [number, number]> = {
        instagram: [100, 200],
        linkedin: [150, 300],
        twitter: [50, 150],
        tiktok: [50, 150]
    };

    const [min, max] = ranges[platform] || [100, 200];

    if (length >= min && length <= max) {
        return {
            score: 10,
            impact: "positive",
            explanation: `Perfect length for ${platform} (${length} characters)`
        };
    } else if (length < min) {
        return {
            score: 5,
            impact: "negative",
            explanation: `Too short for ${platform} - aim for ${min}-${max} characters`
        };
    } else {
        return {
            score: 6,
            impact: "negative",
            explanation: `Too long for ${platform} - keep under ${max} characters`
        };
    }
}

function generateSummary(score: number): string {
    if (score >= 80) return "Excellent! This post is highly optimized for engagement.";
    if (score >= 60) return "Good foundation, with room for improvement.";
    if (score >= 40) return "Decent start, but significant improvements needed.";
    return "This post needs major improvements to perform well.";
}

export function EngagementExplainer({ post }: EngagementExplainerProps) {
    const breakdown = calculateEngagementBreakdown(post);

    const positiveFactors = breakdown.factors.filter(f => f.impact === "positive");
    const neutralFactors = breakdown.factors.filter(f => f.impact === "neutral");
    const negativeFactors = breakdown.factors.filter(f => f.impact === "negative");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="glass-card border-white/5 overflow-hidden group shadow-premium">
                <CardHeader className="pb-8 border-b border-white/5">
                    <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shadow-premium">
                            <TrendingUp className="h-5 w-5 text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                        </div>
                        Analysis Breakdown
                    </CardTitle>
                    <CardDescription className="text-muted-foreground/60 font-medium">Understanding your score and how to improve it</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-12">
                    {/* Overall Score */}
                    <div className="relative text-center p-8 glass-dark rounded-3xl border border-white/5 shadow-premium overflow-hidden group/score">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-50" />
                        <div className="relative z-10">
                            <div className="text-6xl font-black tracking-tighter text-foreground mb-3 flex items-baseline justify-center gap-1">
                                <span className="text-glow">{breakdown.totalScore}</span>
                                <span className="text-2xl text-muted-foreground/40 font-bold">/100</span>
                            </div>
                            <p className="text-base font-bold text-muted-foreground/80 mb-6 tracking-tight">{breakdown.summary}</p>
                            <div className="relative h-3 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${breakdown.totalScore}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent shadow-glow"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Positive Factors */}
                    {positiveFactors.length > 0 && (
                        <div className="space-y-6">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 flex items-center gap-2 ml-1">
                                <CheckCircle2 className="h-4 w-4 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
                                What's Working Well
                            </h4>
                            <div className="grid gap-4">
                                {positiveFactors.map((factor, index) => (
                                    <div key={index} className="glass border border-emerald-500/10 rounded-2xl p-5 hover:border-emerald-500/30 transition-all duration-300 shadow-premium group/factor">
                                        <div className="flex items-start justify-between mb-3">
                                            <span className="font-black text-sm tracking-tight text-foreground group-hover/factor:text-emerald-400 transition-colors">{factor.name}</span>
                                            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-black px-2 py-0.5">
                                                +{factor.score}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground/80 font-medium mb-4">{factor.explanation}</p>
                                        <div className="h-1.5 w-full bg-emerald-500/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(factor.score / factor.maxScore) * 100}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Neutral/Improvement Areas */}
                    {neutralFactors.length > 0 && (
                        <div className="space-y-6">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-orange-400 flex items-center gap-2 ml-1">
                                <AlertCircle className="h-4 w-4 drop-shadow-[0_0_8px_rgba(251,146,60,0.4)]" />
                                Room for Improvement
                            </h4>
                            <div className="grid gap-4">
                                {neutralFactors.map((factor, index) => (
                                    <div key={index} className="glass border border-orange-500/10 rounded-2xl p-5 hover:border-orange-500/30 transition-all duration-300 shadow-premium group/factor">
                                        <div className="flex items-start justify-between mb-3">
                                            <span className="font-black text-sm tracking-tight text-foreground group-hover/factor:text-orange-400 transition-colors">{factor.name}</span>
                                            <Badge variant="secondary" className="bg-orange-500/10 text-orange-400 border border-orange-500/20 font-black px-2 py-0.5">
                                                {factor.score}/{factor.maxScore}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground/80 font-medium mb-4">{factor.explanation}</p>
                                        <div className="h-1.5 w-full bg-orange-500/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(factor.score / factor.maxScore) * 100}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quick Wins */}
                    {breakdown.quickWins.length > 0 && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 ml-1">
                                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Lightbulb className="h-4 w-4 text-primary animate-pulse-glow" />
                                </div>
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Priority Quick Wins</h4>
                            </div>
                            <div className="grid gap-3">
                                {breakdown.quickWins.map((win, index) => (
                                    <div key={index} className="flex items-start gap-4 p-5 glass border border-white/5 rounded-2xl hover:border-primary/20 transition-all duration-300 shadow-premium">
                                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-xs font-black border border-primary/20 shrink-0 shadow-premium">
                                            +{win.impact}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-black tracking-tight text-foreground mb-2 leading-tight">{win.action}</p>
                                            <div className="flex items-center gap-3">
                                                <Badge variant="secondary" className="bg-white/5 text-[9px] font-black uppercase tracking-widest px-2 py-0 border-none h-5">
                                                    {win.difficulty}
                                                </Badge>
                                                <span className="text-[10px] text-muted-foreground/50 font-black uppercase tracking-widest">
                                                    Potential: +{win.impact}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}
