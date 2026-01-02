import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { LogOut, LayoutDashboard, Wand2, Settings, BarChart3, Moon, Sun, Layout, Users, Radar, PenTool, Calendar, Fingerprint, Zap, Globe } from "lucide-react";

export function Navbar() {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full transition-all duration-300 bg-background/40 backdrop-blur-xl border-b border-border/50">
      <div className="container flex h-20 items-center justify-between">
        <Link to={user ? "/dashboard" : "/"}>
          <Logo size="sm" />
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full w-9 h-9"
          >
            {theme === "light" ? (
              <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
            ) : (
              <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {user ? (
            <>
              <div className="hidden md:flex items-center gap-2">
                <Link to="/advisor">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Wand2 className="h-4 w-4" />
                    Advisor
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Link to="/analytics">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Analytics
                  </Button>
                </Link>
                <Link to="/creative">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Layout className="h-4 w-4" />
                    Creative Hub
                  </Button>
                </Link>
                <Link to="/competitors">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Users className="h-4 w-4" />
                    Competitors
                  </Button>
                </Link>
                <Link to="/trends">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Radar className="h-4 w-4" />
                    Trends
                  </Button>
                </Link>
                <Link to="/studio">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <PenTool className="h-4 w-4" />
                    Studio
                  </Button>
                </Link>
                <Link to="/calendar">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Calendar className="h-4 w-4" />
                    Calendar
                  </Button>
                </Link>
                <Link to="/architect">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Fingerprint className="h-4 w-4" />
                    Architect
                  </Button>
                </Link>
                <Link to="/lab">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Zap className="h-4 w-4" />
                    Lab
                  </Button>
                </Link>
                <Link to="/audience">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Globe className="h-4 w-4" />
                    Audience
                  </Button>
                </Link>
                <Link to="/preferences">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Settings className="h-4 w-4" />
                    Preferences
                  </Button>
                </Link>
              </div>

              {/* Mobile menu could go here, but for now just show sign out */}
              <Button variant="outline" size="sm" onClick={handleSignOut} className="gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
