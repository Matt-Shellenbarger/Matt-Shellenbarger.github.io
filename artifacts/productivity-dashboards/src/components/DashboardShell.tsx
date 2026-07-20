import { Link, useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCw, Moon, Sun, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const queryClient = useQueryClient();
  const [isDark, setIsDark] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries();
    setTimeout(() => setIsRefreshing(false), 500); // UI feedback
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-6">
        <div className="flex items-center gap-2 font-semibold">
          <Activity className="h-5 w-5 text-primary" />
          <span>Workforce Analytics</span>
        </div>
        <nav className="flex items-center gap-6 text-sm ml-6 flex-1">
          <Link 
            href="/" 
            className={`transition-colors hover:text-foreground/80 ${location === "/" ? "text-foreground font-medium" : "text-foreground/60"}`}
          >
            Overview
          </Link>
          <Link 
            href="/patterns" 
            className={`transition-colors hover:text-foreground/80 ${location === "/patterns" ? "text-foreground font-medium" : "text-foreground/60"}`}
          >
            Work Patterns
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing} className="h-8 gap-2">
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)} className="h-8 w-8">
            {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
        </div>
      </header>
      <main className="flex-1 px-5 py-4 pt-8 pb-8 max-w-[1400px] mx-auto w-full">
        {children}
      </main>
    </div>
  );
}