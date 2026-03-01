import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bus, Eye, EyeOff, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const roles = [
  { id: "student", label: "Student", icon: "🎓" },
  { id: "driver", label: "Driver", icon: "🚌" },
  { id: "admin", label: "Admin", icon: "⚙️" },
] as const;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<string>("student");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  // Clear previous errors
  setEmailError("");
  setPasswordError("");
  

  let isValid = true;

  if (!email.trim()) {
    setEmailError("Email / College ID is required");
    isValid = false;
  }

  if (!password.trim()) {
    setPasswordError("Password is required");
    isValid = false;
  }

  if (!isValid) return;

  setLoading(true);

  try {
    // Simulated login (replace with Supabase later)
    setTimeout(() => {
      setLoading(false);



      localStorage.setItem(
        "user",
        JSON.stringify({
          email,
          role,
        })
      );

      navigate("/dashboard");
    }, 800);
  } catch (error) {
    setLoading(false);
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4 glow-primary">
            <Bus className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold font-display text-foreground">
            Where Is My <span className="text-gradient">Bus</span>
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">College Bus Tracking System</p>
        </div>

        {/* Login Card */}
        <div className="glass-card-strong p-8">
          {/* Role Selector */}
          <div className="flex gap-2 mb-6">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  role === r.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                <span className="mr-1">{r.icon}</span> {r.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-muted-foreground">
                College ID / Email
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="Enter your college ID or email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-muted/50 border-border/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground/50"
              />
              {emailError && (
  <p className="text-red-500 text-sm mt-1">{emailError}</p>
)}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-muted-foreground">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-muted/50 border-border/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground/50 pr-12"
                />
                {passwordError && (
  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(c) => setRemember(c === true)}
                  className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                  Remember me
                </label>
              </div>
              <button type="button" className="text-sm text-primary hover:text-primary/80 transition-colors">
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base rounded-xl glow-primary transition-all duration-200"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <button className="text-primary hover:text-primary/80 transition-colors font-medium">
              Contact Admin
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground/50 mt-6">
          © 2026 Where Is My Bus • College Bus Tracking System
        </p>
      </div>
    </div>
  );
};

export default Login;
