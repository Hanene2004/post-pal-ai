import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, Copy, Check, TrendingUp, Trophy } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PlatformIcon } from "@/components/PlatformIcon";

interface Hook {
    text: string;
    engagement_score: number;
    style: string;
}

export interface HookGeneratorProps {
    onSelect: (hook: string) => void;
}

export function HookGenerator({ onSelect }: HookGeneratorProps) {
    const [topic, setTopic] = useState("");
    const [platform, setPlatform] = useState("instagram");
    const [isGenerating, setIsGenerating] = useState(false);
    const [hooks, setHooks] = useState<Hook[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const generateHooks = async () => {
        if (!topic) {
            toast.error("Please enter a topic");
            return;
        }

        setIsGenerating(true);
        setHooks([]);

        try {
            const { data, error } = await supabase.functions.invoke("generate-hooks", {
                body: { topic, platform },
            });

            if (error) throw error;
            if (data.error) throw new Error(data.error);

            setHooks(data.hooks || []);
            toast.success("Hooks generated!");
        } catch (error) {
            console.error("Error generating hooks:", error);
            toast.error("Failed to generate hooks. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const copyHook = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        toast.success("Hook copied to clipboard!");
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Multiple Hooks Generator</CardTitle>
                    <CardDescription>Generate 5 attention-grabbing hooks ranked by predicted performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="topic">What is your post about?</Label>
                        <Input
                            id="topic"
                            placeholder="e.g., Passive income tips for beginners"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="platform">Platform</Label>
                        <Select value={platform} onValueChange={setPlatform}>
                            <SelectTrigger>
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
                    <Button
                        onClick={generateHooks}
                        disabled={isGenerating || !topic}
                        className="w-full gap-2"
                    >
                        {isGenerating ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Sparkles className="h-4 w-4" />
                        )}
                        Generate Ranked Hooks
                    </Button>
                </CardContent>
            </Card>

            {hooks.length > 0 && (
                <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center gap-2 px-1">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        <h3 className="font-semibold text-lg">Ranked Results</h3>
                    </div>
                    <div className="grid gap-4">
                        {hooks.map((hook, index) => (
                            <Card key={index} className={`relative overflow-hidden ${index === 0 ? 'border-primary/50 shadow-md' : 'border-border/50'}`}>
                                {index === 0 && (
                                    <div className="absolute top-0 right-0">
                                        <Badge className="rounded-none rounded-bl-lg bg-primary text-primary-foreground font-bold">
                                            BEST PERFORMANCE
                                        </Badge>
                                    </div>
                                )}
                                <CardContent className="p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="space-y-3 flex-1">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                                                    {hook.style}
                                                </Badge>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                                                    <TrendingUp className="h-3 w-3" />
                                                    {hook.engagement_score}% match
                                                </div>
                                            </div>
                                            <p className="text-foreground font-medium italic leading-relaxed">
                                                "{hook.text}"
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-9 px-3"
                                                onClick={() => copyHook(hook.text, index)}
                                            >
                                                {copiedIndex === index ? (
                                                    <Check className="h-4 w-4 text-green-500" />
                                                ) : (
                                                    <Copy className="h-4 w-4" />
                                                )}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-9 px-3 text-xs"
                                                onClick={() => onSelect(hook.text)}
                                            >
                                                Use for Post
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
