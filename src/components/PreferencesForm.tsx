import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PlatformIcon } from "@/components/PlatformIcon";
import { UserPreferences } from "@/pages/Preferences";
import { Save, Sparkles } from "lucide-react";

const formSchema = z.object({
    favorite_platforms: z.array(z.string()).min(1, "Select at least one platform"),
    content_goals: z.array(z.string()).min(1, "Select at least one goal"),
    preferred_tones: z.array(z.string()).min(1, "Select at least one tone"),
    brand_voice: z.string().optional(),
});

const platforms = [
    { id: "instagram", label: "Instagram", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
    { id: "tiktok", label: "TikTok", color: "bg-gradient-to-r from-black to-cyan-500" },
    { id: "linkedin", label: "LinkedIn", color: "bg-blue-600" },
    { id: "twitter", label: "Twitter/X", color: "bg-black" },
];

const goals = [
    { id: "likes", label: "Maximize Likes", description: "Get more likes and reactions" },
    { id: "comments", label: "Drive Comments", description: "Encourage discussions and engagement" },
    { id: "shares", label: "Encourage Shares", description: "Make content worth sharing" },
    { id: "reach", label: "Expand Reach", description: "Get in front of more people" },
    { id: "followers", label: "Gain Followers", description: "Build your audience" },
    { id: "clicks", label: "Drive Clicks", description: "Get traffic to your links" },
];

const tones = [
    { id: "professional", label: "Professional", description: "Formal and business-focused" },
    { id: "casual", label: "Casual", description: "Friendly and conversational" },
    { id: "educational", label: "Educational", description: "Informative and teaching" },
    { id: "inspiring", label: "Inspiring", description: "Motivational and uplifting" },
    { id: "humorous", label: "Humorous", description: "Fun and entertaining" },
    { id: "storytelling", label: "Storytelling", description: "Narrative and personal" },
];

interface PreferencesFormProps {
    initialPreferences: UserPreferences | null;
    onSave: (data: UserPreferences) => void;
    isSaving: boolean;
}

export function PreferencesForm({ initialPreferences, onSave, isSaving }: PreferencesFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            favorite_platforms: initialPreferences?.favorite_platforms || ["instagram"],
            content_goals: initialPreferences?.content_goals || ["engagement"],
            preferred_tones: initialPreferences?.preferred_tones || ["professional"],
            brand_voice: initialPreferences?.brand_voice || "",
        },
    });

    useEffect(() => {
        if (initialPreferences) {
            form.reset({
                favorite_platforms: initialPreferences.favorite_platforms,
                content_goals: initialPreferences.content_goals,
                preferred_tones: initialPreferences.preferred_tones,
                brand_voice: initialPreferences.brand_voice || "",
            });
        }
    }, [initialPreferences, form]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        onSave(values as UserPreferences);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Favorite Platforms */}
                <Card>
                    <CardHeader>
                        <CardTitle>Favorite Platforms</CardTitle>
                        <CardDescription>
                            Select the social media platforms you use most often
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="favorite_platforms"
                            render={() => (
                                <FormItem>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {platforms.map((platform) => (
                                            <FormField
                                                key={platform.id}
                                                control={form.control}
                                                name="favorite_platforms"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={platform.id}
                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(platform.id)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([...field.value, platform.id])
                                                                            : field.onChange(
                                                                                field.value?.filter((value) => value !== platform.id)
                                                                            );
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <div className="flex items-center gap-2 flex-1">
                                                                <div className={`h-8 w-8 rounded ${platform.color} flex items-center justify-center`}>
                                                                    <PlatformIcon platform={platform.id} className="h-4 w-4 text-white" />
                                                                </div>
                                                                <FormLabel className="font-normal cursor-pointer">
                                                                    {platform.label}
                                                                </FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    );
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* Content Goals */}
                <Card>
                    <CardHeader>
                        <CardTitle>Content Goals</CardTitle>
                        <CardDescription>
                            What do you want to achieve with your content?
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="content_goals"
                            render={() => (
                                <FormItem>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {goals.map((goal) => (
                                            <FormField
                                                key={goal.id}
                                                control={form.control}
                                                name="content_goals"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={goal.id}
                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(goal.id)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([...field.value, goal.id])
                                                                            : field.onChange(
                                                                                field.value?.filter((value) => value !== goal.id)
                                                                            );
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none flex-1">
                                                                <FormLabel className="font-medium cursor-pointer">
                                                                    {goal.label}
                                                                </FormLabel>
                                                                <p className="text-sm text-muted-foreground">
                                                                    {goal.description}
                                                                </p>
                                                            </div>
                                                        </FormItem>
                                                    );
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* Preferred Tones */}
                <Card>
                    <CardHeader>
                        <CardTitle>Preferred Tones</CardTitle>
                        <CardDescription>
                            Select the tones you use most frequently in your content
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="preferred_tones"
                            render={() => (
                                <FormItem>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {tones.map((tone) => (
                                            <FormField
                                                key={tone.id}
                                                control={form.control}
                                                name="preferred_tones"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={tone.id}
                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(tone.id)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([...field.value, tone.id])
                                                                            : field.onChange(
                                                                                field.value?.filter((value) => value !== tone.id)
                                                                            );
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none flex-1">
                                                                <FormLabel className="font-medium cursor-pointer">
                                                                    {tone.label}
                                                                </FormLabel>
                                                                <p className="text-sm text-muted-foreground">
                                                                    {tone.description}
                                                                </p>
                                                            </div>
                                                        </FormItem>
                                                    );
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* Brand Voice Profile */}
                <Card>
                    <CardHeader>
                        <CardTitle>Brand Voice Profile</CardTitle>
                        <CardDescription>
                            Describe your brand's unique voice and writing style to help the AI maintain consistency.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="brand_voice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <textarea
                                            {...field}
                                            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Example: My brand is authoritative but approachable, uses technical jargon correctly, and always maintains a positive, solution-oriented tone..."
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end">
                    <Button type="submit" size="lg" disabled={isSaving} className="gap-2">
                        {isSaving ? (
                            <>
                                <Sparkles className="h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="h-4 w-4" />
                                Save Preferences
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
