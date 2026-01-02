import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, Copy, Check, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export function ImagePromptGenerator() {
    const [content, setContent] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [prompts, setPrompts] = useState<{ style: string, prompt: string }[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleGenerate = async () => {
        if (!content.trim()) {
            toast.error("Please enter some content or post topic");
            return;
        }

        setIsGenerating(true);
        try {
            const { data, error } = await supabase.functions.invoke("generate-post-advice", {
                body: {
                    platform: "instagram", // use any platform for context
                    topic: `GENERATE 3 IMAGE PROMPTS FOR THIS CONTENT: ${content}`,
                    goal: "visual storytelling",
                    tone: "vivid and descriptive",
                    additionalContext: "The user wants image generation prompts for Midjourney/DALL-E that perfectly match their post content. Give me 3 distinct styles: 1. Professional/Corporate 2. Creative/Artistic 3. Minimalist/Modern. Use the format: {style}: {prompt}",
                },
            });

            if (error) throw error;

            // Parse the hook_suggestion as it likely contains the prompts
            const lines = data.hook_suggestion.split("\n").filter(l => l.includes(":"));
            const parsedPrompts = lines.map(line => {
                const [style, ...prompt] = line.split(":");
                return { style: style.trim(), prompt: prompt.join(":").trim() };
            });

            setPrompts(parsedPrompts.length > 0 ? parsedPrompts : [
                { style: "Professional", prompt: `A high-quality, professional photography scene representing: ${content.substring(0, 100)}... 8k resolution, cinematic lighting.` }
            ]);
            toast.success("Image prompts generated!");
        } catch (error) {
            console.error("Error generating prompts:", error);
            toast.error("Failed to generate prompts. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <ImageIcon className="h-5 w-5 text-accent" />
                        Image Prompt Generator
                    </CardTitle>
                    <CardDescription>
                        Create compelling visual prompts for your AI-generated assets
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Post Content or Topic</Label>
                        <Textarea
                            placeholder="Paste your post or describe the visual you want..."
                            className="min-h-[250px] resize-none"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full gap-2 variant-accent"
                        onClick={handleGenerate}
                        disabled={isGenerating || !content}
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Sparkles className="h-4 w-4" />
                                Generate Prompts
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>

            <div className="space-y-4">
                {prompts.length > 0 ? (
                    prompts.map((p, i) => (
                        <Card key={i} className="border-accent/20 bg-accent/5 animate-fade-in">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-bold uppercase tracking-wider text-accent flex items-center justify-between">
                                    {p.style} Style
                                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopy(p.prompt, i)}>
                                        {copiedIndex === i ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm italic text-muted-foreground leading-relaxed">
                                    "{p.prompt}"
                                </p>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="h-full flex flex-col items-center justify-center p-12 bg-card/30 rounded-lg border border-border/50 border-dashed text-center min-h-[400px]">
                        <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center mb-4 text-muted-foreground/30">
                            <ImageIcon className="h-8 w-8" />
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-1">Visual Suggestions</h3>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            We'll generate detailed image prompts in different styles based on your text.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
