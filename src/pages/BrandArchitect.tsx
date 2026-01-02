import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Fingerprint, MessageSquare, ShieldCheck, Zap, Plus, Search } from "lucide-react";

export default function BrandArchitect() {
    const personas = [
        { id: 1, name: "The Thought Leader", tone: "Professional / Visionary", stability: 95, active: true },
        { id: 2, name: "The Tech Minimalist", tone: "Clean / Technical", stability: 88, active: false },
        { id: 3, name: "Community Connector", tone: "Empathetic / Engaging", stability: 92, active: false },
    ];

    return (
        <PageTransition>
            <div className="min-h-screen bg-background pattern-dots">

                <main className="container py-8 max-w-7xl mx-auto">
                    <div className="mb-12">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                                    <Fingerprint className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold text-foreground">Brand Architect</h1>
                                    <p className="text-muted-foreground text-lg">Define and interact with AI-driven brand personas</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Active Personas</h2>
                                <Button size="sm" variant="outline" className="gap-2">
                                    <Plus className="h-4 w-4" /> New
                                </Button>
                            </div>
                            {personas.map((p) => (
                                <Card key={p.id} className={`border-border/50 bg-card/50 backdrop-blur-sm cursor-pointer transition-all hover:border-primary/50 ${p.active ? 'ring-2 ring-primary/20 border-primary/50' : ''}`}>
                                    <CardHeader className="p-4">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-lg">{p.name}</CardTitle>
                                            <Badge variant={p.active ? "default" : "secondary"}>{p.active ? "Active" : "Draft"}</Badge>
                                        </div>
                                        <CardDescription>{p.tone}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-muted-foreground">Tone Stability</span>
                                            <span className="font-bold">{p.stability}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-primary" style={{ width: `${p.stability}%` }} />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="lg:col-span-2 space-y-6">
                            <Card className="glass-card border-border/50 shadow-premium h-full flex flex-col min-h-[600px] overflow-hidden">
                                <CardHeader className="border-b border-border/50 bg-surface">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <CardTitle className="flex items-center gap-2 text-xl font-black tracking-tight">
                                                <MessageSquare className="h-5 w-5 text-primary text-glow" />
                                                Persona Strategy Chat
                                            </CardTitle>
                                            <CardDescription className="text-xs font-medium text-muted-foreground/60">Interaction Engine: "The Thought Leader"</CardDescription>
                                        </div>
                                        <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest border-primary/30 text-primary">
                                            98% Alignment
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1 p-6 space-y-6 overflow-y-auto pattern-grid">
                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 rounded-2xl bg-surface border border-white/10 flex items-center justify-center text-xs font-black shadow-premium">U</div>
                                        <div className="bg-surface border border-border/50 p-4 rounded-3xl rounded-tl-none max-w-[80%] text-sm font-medium leading-relaxed shadow-premium">
                                            How should we announce the new AI features next week?
                                        </div>
                                    </div>
                                    <div className="flex gap-4 flex-row-reverse">
                                        <div className="h-10 w-10 rounded-2xl gradient-premium flex items-center justify-center text-xs text-white font-black shadow-premium">AI</div>
                                        <div className="bg-primary/10 border border-primary/20 p-4 rounded-3xl rounded-tr-none max-w-[80%] text-sm font-medium leading-relaxed shadow-premium">
                                            Focus on the human element. Don't just list specs; frame it as <span className="text-primary font-bold italic">"augmenting human creativity."</span> I suggest a 3-part series: 1. The Vision, 2. The Implementation, 3. The Result. Shall we draft the first hook?
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-4 border-t border-border/50 bg-surface">
                                    <div className="flex w-full gap-3">
                                        <Input placeholder="Direct message your brand persona..." className="bg-background/50 h-12 rounded-2xl border-white/10 focus:border-primary/50 transition-all font-medium" />
                                        <Button className="gradient-premium h-12 px-6 rounded-2xl font-black shadow-premium">Send</Button>
                                    </div>
                                </CardFooter>
                            </Card>

                            <div className="grid gap-6 md:grid-cols-2">
                                <Card className="glass-card border-border/50 shadow-premium">
                                    <CardHeader>
                                        <CardTitle className="text-base font-black tracking-tight flex items-center gap-2">
                                            <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                            Authenticity Shield
                                        </CardTitle>
                                        <CardDescription className="text-xs font-medium text-muted-foreground/60">Voice consistency monitoring</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <p className="text-xs text-muted-foreground/80 leading-relaxed font-medium">
                                                Current output aligns <span className="text-emerald-500 font-bold">94%</span> with your historical brand voice samples.
                                            </p>
                                            <div className="h-2 w-full bg-surface rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: "94%" }} />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="glass-card border-border/50 shadow-premium">
                                    <CardHeader>
                                        <CardTitle className="text-base font-black tracking-tight flex items-center gap-2">
                                            <Zap className="h-4 w-4 text-primary" />
                                            Persona Lexicon
                                        </CardTitle>
                                        <CardDescription className="text-xs font-medium text-muted-foreground/60">Signature vocabulary</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {["Synergy", "Augmented", "Paradigm", "Frictionless", "Velocity"].map(word => (
                                                <Badge key={word} variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-[10px] font-black uppercase tracking-widest">{word}</Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </PageTransition>
    );
}
