import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `You are a social media performance analyst. Your goal is to compare two post drafts and predict which one will perform better on the specified platform.

Analyze both drafts based on:
1. Hook strength
2. Clarity and flow
3. Call-to-action effectiveness
4. Platform-specific best practices

You must respond with valid JSON only. The JSON must follow this structure:
{
  "draft_a_score": 75,
  "draft_b_score": 82,
  "winner": "b", // "a", "b", or "draw"
  "reasoning": "Detailed explanation of why the winner is better, citing specific strengths and weaknesses.",
  "metric_comparison": {
    "hook_strength": "Draft B (more provocative)",
    "clarity": "Draft A (simpler language)",
    "engagement_potential": "Draft B (sharable advice)",
    "platform_fit": "Draft B (uses proper hashtags)"
  }
}

Only return the JSON. No conversational text.`;

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { draftA, draftB, platform } = await req.json();

        if (!draftA || !draftB || !platform) {
            return new Response(
                JSON.stringify({ error: "Missing required fields" }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        const userPrompt = `Compare these two post drafts for ${platform}:

Draft A:
"""
${draftA}
"""

Draft B:
"""
${draftB}
"""

Predict the winner and provide detailed metrics.`;

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
            throw new Error("Failed to compare posts with AI");
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
        console.error("Error in compare-posts:", error);
        return new Response(
            JSON.stringify({ error: error instanceof Error ? error.message : "Failed to compare posts" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
});
