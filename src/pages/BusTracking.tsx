import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, Share2, Bell, MapPin, Clock, Plus, AlertTriangle, Map, List,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";

interface Stop {
  name: string;
  arrival: string;
  departure: string;
  distance: string;
  status: "completed" | "current" | "upcoming";
}

const busData: { number: string; route: string; status: "on-time" | "delayed" | "cancelled" } = {
  number: "KA-01-1234",
  route: "Route A – College Main Gate",
  status: "on-time",
};

const stops: Stop[] = [
  { name: "Thrissur", arrival: "7:30 AM", departure: "7:32 AM", distance: "0 km", status: "completed" },
  { name: "Chalakudy", arrival: "7:42 AM", departure: "7:44 AM", distance: "4.2 km", status: "completed" },
  { name: "Paliyekkara", arrival: "7:55 AM", departure: "7:57 AM", distance: "8.1 km", status: "completed" },
  { name: "Amballur", arrival: "8:05 AM", departure: "8:07 AM", distance: "11.5 km", status: "current" },
  { name: "Thalore", arrival: "8:18 AM", departure: "8:19 AM", distance: "15.3 km", status: "upcoming" },
  { name: "Mannuthy", arrival: "8:28 AM", departure: "8:29 AM", distance: "18.7 km", status: "upcoming" },
  { name: "Kodakara", arrival: "8:33 AM", departure: "8:34 AM", distance: "19.9 km", status: "upcoming" },
  { name: "College Main Gate", arrival: "8:40 AM", departure: "—", distance: "22.0 km", status: "upcoming" },
];

const statusConfig = {
  "on-time": { label: "On Time", className: "bg-success/10 text-success border-success/20" },
  delayed: { label: "Delayed by 10 min", className: "bg-warning/10 text-warning border-warning/20" },
  cancelled: { label: "Cancelled", className: "bg-destructive/10 text-destructive border-destructive/20" },
};

const BusTracking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [view, setView] = useState<"timeline" | "map">("timeline");
  const status = statusConfig[busData.status];

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 animate-fade-in-up">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div>
              <h1 className="text-lg font-bold font-display text-foreground">{busData.number}</h1>
              <p className="text-sm text-muted-foreground">{busData.route}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors">
              <Share2 className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors">
              <Bell className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Status Banner */}
        <div className={`rounded-xl border px-4 py-3 mb-4 animate-fade-in-up-delay-1 ${status.className}`}>
          <div className="flex items-center gap-2 text-sm font-medium">
            {busData.status === "cancelled" && <AlertTriangle className="w-4 h-4" />}
            {status.label}
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-4 animate-fade-in-up-delay-1">
          <button
            onClick={() => setView("timeline")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              view === "timeline" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            <List className="w-4 h-4" /> Timeline
          </button>
          <button
            onClick={() => setView("map")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              view === "map" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            <Map className="w-4 h-4" /> Map
          </button>
        </div>

        {view === "timeline" ? (
          /* Timeline */
          <div className="relative animate-fade-in-up-delay-2">
            {/* Vertical Line */}
            <div className="timeline-line" />

            <div className="space-y-0">
              {stops.map((stop, index) => (
                <div key={index} className="relative pl-14 pb-6 group">
                  {/* Dot */}
                  <div className="absolute left-[15px] top-1 z-10">
                    {stop.status === "current" ? (
                      <div className="timeline-dot-active animate-bus" />
                    ) : stop.status === "completed" ? (
                      <div className="timeline-dot-completed" />
                    ) : (
                      <div className="timeline-dot" />
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className={`glass-card p-4 transition-all duration-200 ${
                      stop.status === "current"
                        ? "border-primary/30 bg-primary/5"
                        : stop.status === "completed"
                        ? "opacity-60"
                        : "hover:bg-accent/30"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <MapPin className={`w-4 h-4 ${
                            stop.status === "current" ? "text-primary" : "text-muted-foreground"
                          }`} />
                          <h3 className={`font-semibold text-sm ${
                            stop.status === "current" ? "text-primary" : "text-foreground"
                          }`}>
                            {stop.name}
                          </h3>
                          {stop.status === "current" && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                              Current
                            </span>
                          )}
                        </div>

                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Arr: {stop.arrival}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Dep: {stop.departure}
                          </span>
                          <span>{stop.distance}</span>
                        </div>
                      </div>

                      {stop.status === "upcoming" && (
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          ETA {stop.arrival}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Map Placeholder */
          <div className="glass-card-strong p-12 flex flex-col items-center justify-center text-center animate-fade-in-up-delay-2">
            <Map className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold font-display text-foreground mb-2">Map View</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Connect Google Maps API to see live bus location on the map. Enable Lovable Cloud to configure the API key.
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default BusTracking;
