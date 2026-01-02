import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `You are an expert copywriter specializing in high-converting social media hooks. 
Your goal is to generate scroll-stopping opening lines for social media posts.

For each hook, provide:
1. The text of the hook.
2. An estimated engagement score (0-100) based on platform dynamics.
3. The style of the hook (e.g., "The Question", "The Shocking Fact", "The Personal Story", "The Contradiction", "The Result").

You must respond with valid JSON only. The JSON must contain a "hooks" array with exactly 5 unique hooks.
Example structure:
{
  "hooks": [
    { "text": "Hook 1...", "engagement_score": 85, "style": "The Question" },
    ...
  ]
}

Only return the JSON. No conversational text.`;

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { topic, platform } = await req.json();

        if (!topic || !platform) {
            return new Response(
                JSON.stringify({ error: "Missing required fields" }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        const userPrompt = `Generate 5 ranked hooks for:
Topic: ${topic}
Platform: ${platform}

Ensure the hooks are tailored to ${platform}'s audience and algorithm and that they are genuinely engaging and varied in style.`;

        const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
        if (!LOVABLE_API_KEY) {
            throw new Error("LOVABLE_API_KEY is not configured");
        }

        const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${LOVABLE_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "google/gemini-2.5-flash",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt },
                ],
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to generate hooks from AI");
        }

        const data = await response.json();
        let content = data.choices?.[0]?.message?.content || "";
        const jsonMatch = content.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            throw new Error("Invalid AI response format");
        }

        const parsed = JSON.parse(jsonMatch[0]);

        return new Response(JSON.stringify(parsed), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error in generate-hooks:", error);
        return new Response(
            JSON.stringify({ error: error instanceof Error ? error.message : "Failed to generate hooks" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
});
