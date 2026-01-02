import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Logo } from "@/components/Logo";
import { FeatureCard } from "@/components/FeatureCard";
import { PlatformIcon, platformColors } from "@/components/PlatformIcon";
import {
  Sparkles,
  TrendingUp,
  Clock,
  Target,
  Zap,
  BarChart3,
  Brain,
  Shield,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Hooks",
    description: "Generate attention-grabbing opening lines tailored to each platform's unique style.",
  },
  {
    icon: TrendingUp,
    title: "Algorithm Insights",
    description: "Get platform-specific tips based on current best practices and engagement patterns.",
  },
  {
    icon: Clock,
    title: "Optimal Timing",
    description: "Know exactly when to post for maximum visibility and engagement.",
  },
  {
    icon: Target,
    title: "Goal-Oriented",
    description: "Customize advice based on whether you want likes, comments, shares, or reach.",
  },
  {
    icon: Brain,
    title: "Smart Learning",
    description: "Track your results and get increasingly personalized recommendations over time.",
  },
  {
    icon: BarChart3,
    title: "Engagement Scoring",
    description: "Get an estimated engagement score to compare different content approaches.",
  },
];

const platforms = ["instagram", "tiktok", "linkedin", "twitter"];

export default function Index() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background pattern-dots">
        <Navbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 lg:py-24">
          <div className="absolute inset-0 gradient-hero opacity-5" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-50" />

          <div className="container relative">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="mx-auto max-w-4xl text-center"
            >
              <motion.div
                variants={fadeInUp}
                className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20"
              >
                <Zap className="h-4 w-4" />
                AI-Powered Content Optimization
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="mb-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              >
                Create Posts That{" "}
                <span className="text-gradient">Actually Perform</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl"
              >
                Stop guessing what works. Get AI-powered advice for every post with platform-specific
                hooks, optimal timing, and engagement predictions.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
              >
                <Link to="/auth?mode=signup">
                  <Button variant="hero" size="xl" className="gap-2">
                    Get Started Free
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="outline" size="xl">
                    Sign In
                  </Button>
                </Link>
              </motion.div>

              {/* Platform Icons */}
              <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4">
                <span className="text-sm text-muted-foreground">Works with</span>
                <div className="flex items-center gap-3">
                  {platforms.map((platform) => (
                    <motion.div
                      key={platform}
                      whileHover={{ y: -5, scale: 1.1 }}
                      className={`h-10 w-10 rounded-lg ${platformColors[platform]} flex items-center justify-center text-primary-foreground animate-float`}
                      style={{ animationDelay: `${platforms.indexOf(platform) * 0.2}s` }}
                    >
                      <PlatformIcon platform={platform} className="h-5 w-5" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-8 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-y border-primary/10 backdrop-blur-sm">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "10K+", label: "Posts Created" },
                { value: "95%", label: "Satisfaction Rate" },
                { value: "4.8★", label: "Average Rating" },
                { value: "50+", label: "Countries" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 lg:py-20 relative">
          <div className="absolute inset-0 bg-secondary/20 -skew-y-2 transform origin-top-left" />
          <div className="container relative">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                Everything You Need to Create Viral Content
              </h2>
              <p className="text-lg text-muted-foreground">
                From hooks to hashtags, get comprehensive advice for every platform.
              </p>
            </div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {features.map((feature) => (
                <motion.div key={feature.title} variants={staggerItem}>
                  <FeatureCard {...feature} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 lg:py-20">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground">
                Get optimized content advice in three simple steps.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Choose Your Platform",
                  description: "Select Instagram, TikTok, LinkedIn, or Twitter/X",
                },
                {
                  step: "2",
                  title: "Describe Your Content",
                  description: "Tell us your topic, goal, and preferred tone",
                },
                {
                  step: "3",
                  title: "Get AI Advice",
                  description: "Receive hooks, structure, timing, and more",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative text-center p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mx-auto mb-6 h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-button">
                    {item.step}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                  {index < 2 && (
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="hidden md:block absolute top-14 -right-4 z-10"
                    >
                      <ArrowRight className="h-6 w-6 text-muted-foreground/30" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 gradient-hero opacity-5" />
          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-3xl text-center"
            >
              <div className="mb-8 flex justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Logo size="lg" showText={false} />
                </motion.div>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                Ready to Level Up Your Social Game?
              </h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
                Join thousands of content creators who use PostAdvisor to create engaging posts that resonate with their audience.
              </p>
              <Link to="/auth?mode=signup">
                <Button variant="hero" size="xl" className="gap-2 px-12">
                  Start Creating Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-12 bg-card/50 backdrop-blur-sm">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <Logo size="sm" />
              <p className="text-sm text-muted-foreground font-medium">
                © 2026 PostAdvisor AI. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground font-medium">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span>AI Powered</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
}
