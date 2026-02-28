import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bus, Search, ArrowDownUp, Clock, ArrowRight, MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";

const routes = [
  { id: "1", name: "Route A - College Main Gate", bus: "KA-01-1234", time: "8:00 AM", status: "on-time" },
  { id: "2", name: "Route B - Thrissur", bus: "KA-01-5678", time: "8:15 AM", status: "delayed" },
  { id: "3", name: "Route C - Chalakudy", bus: "KA-01-9012", time: "8:30 AM", status: "on-time" },
  { id: "4", name: "Route D - Amballur", bus: "KA-01-3456", time: "9:00 AM", status: "cancelled" },
];

const recentSearches = [
  { from: "Amballur", to: "Main Campus", time: "2 hours ago" },
  { from: "Thrissur", to: "College Gate", time: "Yesterday" },
];

const boardingPoints = [
 "Thrissur","Chalakudy","Amballur","Mannuthy","college gate"
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [busSearch, setBusSearch] = useState("");

  const swap = () => { setFrom(to); setTo(from); };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "on-time": return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">On Time</span>;
      case "delayed": return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-warning/10 text-warning">Delayed</span>;
      case "cancelled": return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive">Cancelled</span>;
      default: return null;
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Search Section */}
        <div className="glass-card-strong p-6 animate-fade-in-up">
          <h2 className="text-lg font-semibold font-display text-foreground mb-4">Find Your Bus</h2>

          <div className="space-y-3">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full h-12 pl-10 pr-4 bg-muted/50 border border-border/50 rounded-xl text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 appearance-none"
              >
                <option value="">Select Boarding Point</option>
                {boardingPoints.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div className="flex justify-center">
              <button
                onClick={swap}
                className="p-2 rounded-full bg-muted hover:bg-accent transition-colors"
              >
                <ArrowDownUp className="w-5 h-5 text-primary" />
              </button>
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-destructive" />
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full h-12 pl-10 pr-4 bg-muted/50 border border-border/50 rounded-xl text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 appearance-none"
              >
                <option value="">Select Destination</option>
                {boardingPoints.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <Button
              onClick={() => navigate("/tracking/1")}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base rounded-xl glow-primary"
            >
              <Search className="w-5 h-5 mr-2" />
              Find Buses
            </Button>
          </div>
        </div>

        {/* Search by Bus Number */}
        <div className="glass-card p-4 animate-fade-in-up-delay-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by bus number..."
              value={busSearch}
              onChange={(e) => setBusSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-muted/50 border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
          </div>
        </div>

        {/* Departure Board */}
        <div className="animate-fade-in-up-delay-2">
          <h3 className="text-base font-semibold font-display text-foreground mb-3 flex items-center gap-2">
            <Bus className="w-5 h-5 text-primary" />
            Bus Departure Board
          </h3>
          <div className="space-y-2">
            {routes.filter(r => !busSearch || r.bus.toLowerCase().includes(busSearch.toLowerCase()) || r.name.toLowerCase().includes(busSearch.toLowerCase())).map((route) => (
              <button
                key={route.id}
                onClick={() => navigate(`/tracking/${route.id}`)}
                className="w-full glass-card p-4 flex items-center justify-between hover:bg-accent/50 transition-all duration-200 group text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground text-sm">{route.bus}</span>
                    {getStatusBadge(route.status)}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{route.name}</p>
                </div>
                <div className="flex items-center gap-3 ml-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{route.time}</p>
                    <p className="text-xs text-muted-foreground">Departure</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Searches */}
        <div className="animate-fade-in-up-delay-3">
          <h3 className="text-base font-semibold font-display text-foreground mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-muted-foreground" />
            Recent Searches
          </h3>
          <div className="space-y-2">
            {recentSearches.map((s, i) => (
              <div key={i} className="glass-card p-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-foreground">{s.from}</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  <span className="text-foreground">{s.to}</span>
                </div>
                <span className="text-xs text-muted-foreground">{s.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
