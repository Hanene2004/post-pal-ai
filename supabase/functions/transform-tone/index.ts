import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `You are a social media tone expert. Your task is to rewrite the provided content into the specified target tone while preserving the original meaning and core message.

Tones Guide:
- Professional: Formal, authoritative, clear, and business-focused.
- Casual: Relaxed, friendly, conversational, uses contractions.
- Inspiring: Motivational, uplifting, uses powerful adjectives and vision.
- Humorous: Lighthearted, witty, potentially uses puns or relatable irony.
- Educational: Informative, clear, structured, focuses on teaching or sharing facts.
- Urgent: Fast-paced, uses time-sensitive language, high-energy.

You must respond with valid JSON only. The JSON must follow this structure:
{
  "transformed_content": "The full rewritten text in the new tone"
}

Only return the JSON. No conversational text.`;

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { content, targetTone } = await req.json();

        if (!content || !targetTone) {
            return new Response(
                JSON.stringify({ error: "Missing required fields" }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        const userPrompt = `Transform the tone of this content to "${targetTone}":

Content:
"""
${content}
"""

Provide the transformed version in JSON format.`;

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
            throw new Error("Failed to transform tone with AI");
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
        console.error("Error in transform-tone:", error);
        return new Response(
            JSON.stringify({ error: error instanceof Error ? error.message : "Failed to transform tone" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
});
