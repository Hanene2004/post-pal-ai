import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PreferencesForm } from "@/components/PreferencesForm";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Settings } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";

export interface UserPreferences {
  favorite_platforms: string[];
  content_goals: string[];
  preferred_tones: string[];
  brand_voice?: string;
}

export default function Preferences() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchPreferences();
    }
  }, [user]);

  const fetchPreferences = async () => {
    try {
      const { data, error } = await supabase
        .from("user_preferences")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      if (data) {
        setPreferences({
          favorite_platforms: data.favorite_platforms || [],
          content_goals: data.content_goals || [],
          preferred_tones: data.preferred_tones || [],
          brand_voice: data.brand_voice || "",
        });
      }
    } catch (error) {
      console.error("Error fetching preferences:", error);
      toast.error("Failed to load preferences");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: UserPreferences) => {
    if (!user) return;

    setSaving(true);

    try {
      const { error } = await supabase
        .from("user_preferences")
        .upsert({
          user_id: user.id,
          favorite_platforms: data.favorite_platforms,
          content_goals: data.content_goals,
          preferred_tones: data.preferred_tones,
          brand_voice: data.brand_voice,
        });

      if (error) throw error;

      setPreferences(data);
      toast.success("Preferences saved successfully!");
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast.error("Failed to save preferences. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pattern-dots">

        <main className="container py-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center shadow-button">
                <Settings className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Preferences</h1>
            </div>
            <p className="text-muted-foreground">
              Customize your content creation experience and save your brand voice
            </p>
          </motion.div>

          <div className="max-w-2xl">
            <PreferencesForm
              initialPreferences={preferences}
              onSave={handleSave}
              isSaving={saving}
            />
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
