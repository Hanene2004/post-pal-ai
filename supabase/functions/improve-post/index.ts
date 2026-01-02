import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `You are a world-class social media copywriter. Your goal is to rewrite existing social media posts to significantly increase their engagement, reach, or conversion based on the specified platform and goal.

When rewriting, focus on:
1. Better hooks (the first line)
2. Better flow and readability
3. Removing filler words
4. Strengthening the call-to-action (CTA)
5. Adding platform-specific formatting (like spacing or emojis)

You must respond with valid JSON only. The JSON must follow this structure:
{
  "improved_content": "The full rewritten post",
  "score_boost": 25, // Percentage of predicted improvement (0-100)
  "suggestions": [
     {
       "original": "Short snippet from original",
       "improved": "Short snippet from improved",
       "explanation": "Why this specific change was made"
     },
     ... (3-5 suggestions)
  ],
  "confidence": 0.95 // How confident you are in this improvement (0-1)
}

Only return the JSON. No conversational text.`;

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { content, platform, goal } = await req.json();

        if (!content || !platform || !goal) {
            return new Response(
                JSON.stringify({ error: "Missing required fields" }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        const userPrompt = `Rewrite this post for ${platform} with the goal of ${goal}:

Original Content:
"""
${content}
"""

Provide a high-quality rewrite and specific suggestions for improvements made.`;

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
            throw new Error("Failed to generate response from AI");
        }

        const data = await response.json();
        let contentResult = data.choices?.[0]?.message?.content || "";
        const jsonMatch = contentResult.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            throw new Error("Invalid AI response format");
        }

        const parsed = JSON.parse(jsonMatch[0]);

        return new Response(JSON.stringify(parsed), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error in improve-post:", error);
        return new Response(
            JSON.stringify({ error: error instanceof Error ? error.message : "Failed to improve post" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
});
