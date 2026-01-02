-- Create drafts table for storing intermediate content
CREATE TABLE public.drafts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  platform TEXT,
  target_tone TEXT,
  original_content TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.drafts ENABLE ROW LEVEL SECURITY;

-- Drafts policies
CREATE POLICY "Users can view their own drafts" 
ON public.drafts FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own drafts" 
ON public.drafts FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own drafts" 
ON public.drafts FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own drafts" 
ON public.drafts FOR DELETE 
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_drafts_updated_at
BEFORE UPDATE ON public.drafts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
