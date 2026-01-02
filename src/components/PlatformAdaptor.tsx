import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, RefreshCcw, Copy, Check, Repeat } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PlatformIcon, platformColors } from "./PlatformIcon";

const platforms = [
    { id: "instagram", name: "Instagram" },
    { id: "tiktok", name: "TikTok" },
    { id: "linkedin", name: "LinkedIn" },
    { id: "twitter", name: "Twitter/X" },
];

export function PlatformAdaptor() {
    const [content, setContent] = useState("");
    const [sourcePlatform, setSourcePlatform] = useState("linkedin");
    const [targetPlatform, setTargetPlatform] = useState("twitter");
    const [isGenerating, setIsGenerating] = useState(false);
    const [adaptedContent, setAdaptedContent] = useState("");
    const [copied, setCopied] = useState(false);

    const handleAdapt = async () => {
        if (!content.trim()) {
            toast.error("Please enter some content to adapt");
            return;
        }

        if (sourcePlatform === targetPlatform) {
            toast.error("Source and target platforms must be different");
            return;
        }

        setIsGenerating(true);
        try {
            const { data, error } = await supabase.functions.invoke("generate-post-advice", {
                body: {
                    platform: targetPlatform,
                    topic: `ADAPT THIS CONTENT FROM ${sourcePlatform}: ${content}`,
                    goal: "engagement",
                    tone: "consistent with source",
                    additionalContext: `The user wants to adapt this ${sourcePlatform} post for ${targetPlatform}. Maintain the core message but optimize the format, hashtags, and style for ${targetPlatform}.`,
                },
            });

            if (error) throw error;

            // Since generate-post-advice returns hook_suggestion and post_structure,
            // we'll combine them for the adapted post
            const result = `${data.hook_suggestion}\n\n${data.post_structure}`;
            setAdaptedContent(result);
            toast.success("Content adapted successfully!");
        } catch (error) {
            console.error("Error adapting content:", error);
            toast.error("Failed to adapt content. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(adaptedContent);
        setCopied(true);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <Repeat className="h-5 w-5 text-primary" />
                        Platform Adaptor
                    </CardTitle>
                    <CardDescription>
                        Convert your content from one platform to another
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>From</Label>
                            <Select value={sourcePlatform} onValueChange={setSourcePlatform}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {platforms.map((p) => (
                                        <SelectItem key={p.id} value={p.id}>
                                            <div className="flex items-center gap-2">
                                                <PlatformIcon platform={p.id as any} className="h-4 w-4" />
                                                {p.name}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>To</Label>
                            <Select value={targetPlatform} onValueChange={setTargetPlatform}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {platforms.map((p) => (
                                        <SelectItem key={p.id} value={p.id}>
                                            <div className="flex items-center gap-2">
                                                <PlatformIcon platform={p.id as any} className="h-4 w-4" />
                                                {p.name}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Source Content</Label>
                        <Textarea
                            placeholder="Paste your original post here..."
                            className="min-h-[200px] resize-none"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full gap-2"
                        onClick={handleAdapt}
                        disabled={isGenerating || !content}
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Adapting...
                            </>
                        ) : (
                            <>
                                <RefreshCcw className="h-4 w-4" />
                                Adapt Content
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>

            <div className="space-y-6">
                {adaptedContent ? (
                    <Card className="border-primary/20 bg-primary/5 animate-fade-in">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <PlatformIcon platform={targetPlatform as any} className="h-6 w-6" />
                                    Adapted for {targetPlatform.charAt(0).toUpperCase() + targetPlatform.slice(1)}
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
                                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-background/50 rounded-lg p-4 border border-primary/10">
                                <p className="text-sm whitespace-pre-wrap leading-relaxed">
                                    {adaptedContent}
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-3 pt-0">
                            <div className="p-3 bg-primary/10 rounded-lg border border-primary/20 w-full text-xs text-primary font-medium">
                                Optimized for {targetPlatform} algorithms and user behavior.
                            </div>
                        </CardFooter>
                    </Card>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center p-12 bg-card/30 rounded-lg border border-border/50 border-dashed text-center min-h-[400px]">
                        <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center mb-4 text-muted-foreground/30">
                            <Repeat className="h-8 w-8" />
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-1">Preview</h3>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Adapted content will appear here once you click the button.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
