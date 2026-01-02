import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, Target, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ContentCalendar() {
    const days = Array.from({ length: 35 }).map((_, i) => ({
        day: (i % 31) + 1,
        posts: Math.random() > 0.7 ? [
            { platform: i % 4 === 0 ? "instagram" : i % 4 === 1 ? "linkedin" : "twitter", time: "10:30 AM" }
        ] : []
    }));

    return (
        <PageTransition>
            <div className="min-h-screen bg-background pattern-dots">

                <main className="container py-8 max-w-7xl mx-auto">
                    <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                            <div className="flex items-center gap-3 mb-1">
                                <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                                    <CalendarIcon className="h-5 w-5 text-primary-foreground" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-foreground">Content Calendar</h1>
                                    <p className="text-muted-foreground text-sm">Strategize and schedule your month ahead</p>
                                </div>
                            </div>
                        </motion.div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
                            <span className="font-bold px-4">January 2026</span>
                            <Button variant="outline" size="icon"><ChevronRight className="h-4 w-4" /></Button>
                            <Button className="gradient-primary ml-2 gap-2">
                                <Plus className="h-4 w-4" />
                                New Post
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-4">
                        <div className="lg:col-span-3">
                            <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
                                <div className="grid grid-cols-7 border-b border-border/50 bg-muted/30">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                        <div key={day} className="py-2 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">{day}</div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7">
                                    {days.map((item, i) => (
                                        <div key={i} className={`min-h-[120px] p-2 border-r border-b border-border/50 last:border-r-0 hover:bg-muted/20 transition-colors group cursor-pointer`}>
                                            <div className="flex justify-between items-start mb-2">
                                                <span className={`text-sm ${i >= 31 ? 'text-muted-foreground/30' : 'font-medium'}`}>{item.day}</span>
                                                {item.posts.length > 0 && <Badge className="h-2 w-2 p-0 bg-primary" />}
                                            </div>
                                            <div className="space-y-1">
                                                {item.posts.map((post, j) => (
                                                    <div key={j} className="text-[10px] p-1.5 rounded-md bg-primary/10 border border-primary/20 text-primary truncate flex items-center gap-1">
                                                        <Badge variant="outline" className="h-3 w-3 p-0 scale-75 uppercase">{post.platform[0]}</Badge>
                                                        {post.time}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button size="icon" variant="ghost" className="h-6 w-6 rounded-full"><Plus className="h-3 w-3" /></Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <Target className="h-4 w-4 text-primary" />
                                        Monthly Goal
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between text-xs">
                                        <span>Publication Rate</span>
                                        <span className="font-bold">12 / 20 posts</span>
                                    </div>
                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[60%]" />
                                    </div>
                                    <p className="text-xs text-muted-foreground">You are 8 posts away from your goal. Keep it up!</p>
                                </CardContent>
                            </Card>

                            <Card className="gradient-primary text-primary-foreground border-none">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Sparkles className="h-5 w-5" />
                                        AI Scheduling
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 text-xs">
                                    <p className="opacity-90 leading-relaxed">
                                        We've identified Friday at **2:15 PM** as your highest potential engagement slot for LinkedIn next week.
                                    </p>
                                    <Button variant="secondary" className="w-full text-xs h-8">Schedule Slot</Button>
                                </CardContent>
                            </Card>

                            <div className="p-4 rounded-xl border border-dashed border-border/50 space-y-3">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    <Clock className="h-3 w-3" />
                                    Unscheduled Drafts
                                </h3>
                                <div className="space-y-2">
                                    {[
                                        "10 Tips for Engagement",
                                        "Productivity Hacks 2.0",
                                        "AI Market Overview"
                                    ].map((draft, i) => (
                                        <div key={i} className="p-2 rounded-lg bg-card border border-border/50 text-xs hover:border-primary/50 cursor-move">
                                            {draft}
                                        </div>
                                    ))}
                                </div>
                                <Button variant="ghost" className="w-full text-xs h-8 text-muted-foreground">Manage All Drafts</Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </PageTransition>
    );
}
