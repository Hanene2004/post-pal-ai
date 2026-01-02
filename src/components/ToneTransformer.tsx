import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, RefreshCcw, Copy, Check, MessageSquare, FileDown } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const tones = [
    { id: "professional", label: "Professional", icon: "💼" },
    { id: "casual", label: "Casual", icon: "🍕" },
    { id: "inspiring", label: "Inspiring", icon: "✨" },
    { id: "humorous", label: "Humorous", icon: "😂" },
    { id: "educational", label: "Educational", icon: "📚" },
    { id: "urgent", label: "Urgent", icon: "🚨" },
];

export function ToneTransformer() {
    const [content, setContent] = useState("");
    const [targetTone, setTargetTone] = useState("professional");
    const [isTransforming, setIsTransforming] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [transformedContent, setTransformedContent] = useState("");
    const [copied, setCopied] = useState(false);
    const { user } = useAuth();

    const handleTransform = async () => {
        if (!content) {
            toast.error("Please enter your content");
            return;
        }

        setIsTransforming(true);
        setTransformedContent("");

        try {
            const { data, error } = await supabase.functions.invoke("transform-tone", {
                body: { content, targetTone },
            });

            if (error) throw error;
            if (data.error) throw new Error(data.error);

            setTransformedContent(data.transformed_content);
            toast.success("Tone transformed!");
        } catch (error) {
            console.error("Error transforming tone:", error);
            toast.error("Failed to transform tone. Please try again.");
        } finally {
            setIsTransforming(false);
        }
    };

    const handleSaveDraft = async () => {
        if (!transformedContent || !user) return;

        setIsSaving(true);
        try {
            const { error } = await supabase.from("drafts").insert({
                user_id: user.id,
                content: transformedContent,
                target_tone: targetTone,
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
        if (!transformedContent) return;
        navigator.clipboard.writeText(transformedContent);
        setCopied(true);
        toast.success("Content copied!");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="grid gap-8 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <RefreshCcw className="h-5 w-5 text-primary" />
                            Source Content
                        </CardTitle>
                        <CardDescription>Enter the text you want to change the tone of</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="source-content">Content to Transform</Label>
                            <Textarea
                                id="source-content"
                                placeholder="Paste your content here..."
                                className="min-h-[200px] resize-none"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>

                        <div className="space-y-3">
                            <Label>Select Target Tone</Label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {tones.map((tone) => (
                                    <Button
                                        key={tone.id}
                                        variant={targetTone === tone.id ? "default" : "outline"}
                                        className="justify-start gap-2 h-11"
                                        onClick={() => setTargetTone(tone.id)}
                                    >
                                        <span>{tone.icon}</span>
                                        <span className="text-xs">{tone.label}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <Button
                            className="w-full gap-2"
                            onClick={handleTransform}
                            disabled={isTransforming || !content}
                        >
                            {isTransforming ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Sparkles className="h-4 w-4" />
                            )}
                            Transform Tone
                        </Button>
                    </CardContent>
                </Card>

                <Card className={transformedContent ? "border-primary/50" : "border-border/50 border-dashed"}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-primary" />
                            Transformed Result
                        </CardTitle>
                        <CardDescription>
                            {transformedContent ? `Rewritten in a ${targetTone} tone` : "Your results will appear here"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {transformedContent ? (
                            <div className="space-y-4 animate-fade-in">
                                <div className="p-5 rounded-lg bg-secondary/30 border border-border/50 relative group min-h-[250px]">
                                    <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                                        {transformedContent}
                                    </p>
                                    <div className="absolute top-2 right-2 flex gap-1 items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 w-8 p-0"
                                            onClick={copyToClipboard}
                                        >
                                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 w-8 p-0"
                                            onClick={handleSaveDraft}
                                            disabled={isSaving}
                                        >
                                            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                                        Tone: {targetTone}
                                    </Badge>
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                                        AI Enhanced
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full min-h-[300px] flex items-center justify-center">
                                <div className="text-center p-8 opacity-40">
                                    <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
                                        <Sparkles className="h-8 w-8" />
                                    </div>
                                    <p className="text-sm font-medium">Ready to transform your content</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
