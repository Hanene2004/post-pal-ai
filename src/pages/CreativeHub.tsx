import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePromptGenerator } from "@/components/ImagePromptGenerator";
import { Sparkles, Image as ImageIcon, Layout, Palette, Camera, Share2 } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export default function CreativeHub() {

    return (
        <PageTransition>
            <div className="min-h-screen bg-background pattern-dots">
                <main className="container py-8 max-w-7xl mx-auto">
                    <div className="mb-12">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                                    <Layout className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold text-foreground">Creative Hub</h1>
                                    <p className="text-muted-foreground text-lg">Your central studio for visual storytelling and brand assets</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-8">
                            <motion.div variants={fadeInUp} initial="initial" animate="animate">
                                <ImagePromptGenerator />
                            </motion.div>

                        </div>

                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Palette className="h-5 w-5 text-primary" />
                                            Visual Identity
                                        </CardTitle>
                                        <CardDescription>Keep your AI visuals consistent</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <Label>Primary Palette</Label>
                                            <div className="flex gap-2">
                                                {['#3b82f6', '#6366f1', '#a855f7', '#ec4899'].map(c => (
                                                    <div key={c} className="h-8 w-8 rounded-full border border-border shadow-sm" style={{ backgroundColor: c }} />
                                                ))}
                                                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                                                    <Sparkles className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Default Filter Style</Label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {['Cinematic', 'Minimal', 'Vintage', 'Neon'].map(style => (
                                                    <Button key={style} variant="outline" size="sm" className="justify-start gap-2">
                                                        <Camera className="h-3 w-3" />
                                                        {style}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>

                                        <Button className="w-full gap-2 gradient-primary shadow-glow">
                                            <Sparkles className="h-4 w-4" />
                                            Sync to AI Advisor
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Card className="border-primary/20 bg-primary/5 border-dashed">
                                    <CardContent className="pt-6">
                                        <div className="text-center space-y-4">
                                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                                                <Camera className="h-6 w-6 text-primary" />
                                            </div>
                                            <h3 className="font-bold">Advanced Mockups</h3>
                                            <p className="text-sm text-muted-foreground">Preview your posts on mobile, tablet and desktop devices instantly.</p>
                                            <Button variant="secondary" className="w-full">Upgrade to Pro</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </main>
            </div>
        </PageTransition>
    );
}
