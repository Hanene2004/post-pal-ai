import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Zap, Target, TrendingUp, Sparkles, AlertCircle, Share2 } from "lucide-react";

export default function ViralLab() {
    return (
        <PageTransition>
            <div className="min-h-screen bg-background pattern-dots">

                <main className="container py-8 max-w-7xl mx-auto">
                    <div className="mb-12">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                                    <Zap className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold text-foreground">Viral Lab</h1>
                                    <p className="text-muted-foreground text-lg">Predictive testing for high-performance content hooks</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        <div className="space-y-6">
                            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle>Hook A/B Tester</CardTitle>
                                    <CardDescription>Input two variations to compare their virality potential</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Variation A</label>
                                        <Textarea placeholder="The secret to 10x engagement is..." className="bg-background/50 h-24" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Variation B</label>
                                        <Textarea placeholder="Why your current strategy is failing you (and how to fix it)" className="bg-background/50 h-24" />
                                    </div>
                                    <Button className="w-full gradient-primary gap-2">
                                        <Sparkles className="h-4 w-4" />
                                        Predict Performance
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-base">Engagement Stimulators</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {["Shocking", "Truth", "Stop", "Proven", "Free", "Secret"].map(word => (
                                            <Badge key={word} variant="secondary" className="px-3 py-1 bg-primary/10 text-primary border-primary/20">+{word}</Badge>
                                        ))}
                                    </div>
                                    <p className="text-xs text-muted-foreground">Adding these "Power Words" to your hooks can increase reach by up to 15% based on current trends.</p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card className="glass-card border-border/50 shadow-premium overflow-hidden min-h-[350px] flex flex-col justify-center items-center p-8 text-center relative">
                                <div className="absolute top-4 left-4">
                                    <Badge className="bg-green-500/20 text-green-500 border-green-500/20 text-[10px] font-black uppercase tracking-widest">Variation B Winning</Badge>
                                </div>
                                <div className="relative h-56 w-56 mb-6">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-white/5" />
                                        <circle cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="16" fill="transparent" strokeDasharray={628.3} strokeDashoffset={628.3 * (1 - 0.84)} className="text-primary drop-shadow-[0_0_12px_rgba(var(--primary),0.5)]" />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <motion.span
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="text-6xl font-black text-foreground"
                                        >
                                            84
                                        </motion.span>
                                        <span className="text-[10px] text-muted-foreground/60 font-black uppercase tracking-[0.2em] mt-1">VIRALITY SCORE</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-black tracking-tighter text-foreground">High Potential</h3>
                                    <p className="text-sm text-muted-foreground/60 leading-relaxed max-w-sm">
                                        Variation B uses a <span className="text-primary font-bold">negative-to-positive framing</span> which current algorithms are prioritizing for retention.
                                    </p>
                                </div>
                            </Card>

                            <Card className="glass-card border-border/50 shadow-premium">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-lg font-black tracking-tight flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-primary" />
                                        Psychological Profile
                                    </CardTitle>
                                    <CardDescription className="text-xs font-medium text-muted-foreground/60">Emotional intensity and sharing drivers</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        {[
                                            { label: "Curiosity Gap", value: 92, color: "bg-blue-500" },
                                            { label: "Urgency / FOMO", value: 65, color: "bg-amber-500" },
                                            { label: "Authority Signal", value: 78, color: "bg-emerald-500" },
                                        ].map((m) => (
                                            <div key={m.label} className="space-y-1.5">
                                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                                    <span className="text-muted-foreground/60">{m.label}</span>
                                                    <span className="text-foreground">{m.value}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${m.value}%` }}
                                                        className={`h-full ${m.color} shadow-glow`}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-4 border-t border-border/50">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mb-3">Primary Sharing Driver</h4>
                                        <div className="p-3 rounded-2xl bg-primary/5 border border-primary/10 flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                                                <Share2 className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-foreground">Social Currency</div>
                                                <div className="text-[10px] text-muted-foreground/60 font-medium whitespace-nowrap overflow-hidden text-ellipsis">Users share this to look "in the know" within their niche.</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </PageTransition>
    );
}
