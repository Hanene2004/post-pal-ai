import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const platformRules: Record<string, any> = {
  instagram: {
    idealLength: "125-150 characters for captions (2,200 max), 3-5 hashtags",
    bestTimes: "11am-1pm, 7pm-9pm (local time)",
    tips: [
      "Start with a pattern-interrupting hook in the first line",
      "Use line breaks for readability - no walls of text",
      "Place hashtags at the end or in first comment",
      "Include a clear call-to-action (save, share, comment)",
      "Use carousel posts for higher engagement",
    ],
    mistakes: [
      "Using too many hashtags (more than 10)",
      "Not responding to comments quickly",
      "Posting without a clear visual strategy",
      "Ignoring Instagram Stories and Reels",
    ],
  },
  tiktok: {
    idealLength: "150-300 characters, focus on the hook in first 3 seconds",
    bestTimes: "12pm, 3pm, and 7pm-9pm (local time)",
    tips: [
      "Hook viewers in the first 1-3 seconds - this is critical",
      "Use trending sounds and effects when relevant",
      "Create content that encourages rewatching",
      "End with a question or call-to-action",
      "Post consistently - 1-3 times daily for growth",
    ],
    mistakes: [
      "Slow or boring intros - you lose viewers immediately",
      "Overusing text on screen",
      "Not engaging with comments",
      "Ignoring trending formats and sounds",
    ],
  },
  linkedin: {
    idealLength: "1,300-2,000 characters, strong first line visible in preview",
    bestTimes: "7am-8am, 12pm, 5pm-6pm (Tue-Thu best)",
    tips: [
      "Start with a personal story or surprising insight",
      "Use short paragraphs and white space",
      "End with a thought-provoking question",
      "Share actionable insights or lessons learned",
      "Avoid links in the post body - put in comments",
    ],
    mistakes: [
      "Being too promotional or salesy",
      "Using excessive emojis or hashtags",
      "Posting on weekends (lower engagement)",
      "Not engaging with other posts before/after your own",
    ],
  },
  twitter: {
    idealLength: "71-100 characters for highest engagement (280 max)",
    bestTimes: "8am-10am, 12pm-1pm, 5pm-6pm (weekdays)",
    tips: [
      "Tweet in threads for complex topics",
      "Use numbers and specific data when possible",
      "Reply to your own tweet to add context",
      "Engage authentically with others in your niche",
      "Use 1-2 relevant hashtags max",
    ],
    mistakes: [
      "Overusing hashtags (more than 2)",
      "Being too vague or generic",
      "Not engaging with replies",
      "Posting during off-peak hours",
    ],
  },
};

const systemPrompt = `You are an expert social media content strategist with deep knowledge of platform algorithms, engagement patterns, and content psychology. 

Your task is to provide specific, actionable advice for creating high-performing social media posts. Your advice should be:
- Platform-specific and algorithm-aware
- Based on current best practices (as of 2025-2026)
- Actionable and specific, not generic
- Focused on genuine engagement, not manipulation

IMPORTANT: Never claim to know secret algorithm details. Focus on publicly known best practices and general engagement principles.

You must respond with valid JSON only. No additional text outside the JSON structure.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { platform, topic, goal, tone, additionalContext } = await req.json();

    if (!platform || !topic || !goal || !tone) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const rules = platformRules[platform.toLowerCase()] || platformRules.instagram;

    const userPrompt = `Generate social media post advice for:

Platform: ${platform}
Topic: ${topic}
Goal: ${goal} (e.g., maximize likes, drive comments, encourage shares, expand reach)
Tone: ${tone}
${additionalContext ? `Additional Context: ${additionalContext}` : ""}

Platform-specific best practices to consider:
- Ideal length: ${rules.idealLength}
- Best posting times: ${rules.bestTimes}

Provide a response in this exact JSON format:
{
  "hook_suggestion": "A compelling opening line/hook specific to this topic and platform (50-100 characters)",
  "post_structure": "A detailed post structure template with placeholders the user can fill in",
  "algorithm_tips": ["Tip 1 specific to this platform and goal", "Tip 2", "Tip 3", "Tip 4"],
  "content_length": "Specific recommendation for this post type",
  "best_posting_time": "Specific recommendation based on the goal",
  "common_mistakes": ["Mistake 1 to avoid", "Mistake 2", "Mistake 3"],
  "engagement_score": 75
}

The engagement_score should be an estimated score from 0-100 based on how well the topic, goal, and tone align with platform best practices. Be realistic but optimistic.

Make the hook_suggestion catchy and specific to the topic, not generic. The post_structure should be a complete template the user can follow.`;

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
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error("Failed to generate content");
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content || "";

    // Parse JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("No JSON found in response:", content);
      throw new Error("Invalid response format");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Validate required fields
    const requiredFields = [
      "hook_suggestion",
      "post_structure",
      "algorithm_tips",
      "content_length",
      "best_posting_time",
      "common_mistakes",
      "engagement_score",
    ];

    for (const field of requiredFields) {
      if (!(field in parsed)) {
        throw new Error(`Missing field: ${field}`);
      }
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in generate-post-advice:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to generate advice" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
