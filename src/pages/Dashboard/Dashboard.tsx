import React from "react";
import { Users, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { cn } from "../../lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: string; positive: boolean };
  borderColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  borderColor,
}) => (
  <div
    className={cn(
      "bg-surface p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300",
      `border-t-4 ${borderColor}`,
    )}
  >
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
    </div>
    <div className="text-3xl font-bold text-primary mb-1">{value}</div>
    <div className="text-sm text-foreground-secondary">{title}</div>
    {trend && (
      <div
        className={cn(
          "flex items-center gap-1 mt-2 text-xs",
          trend.positive ? "text-success" : "text-error",
        )}
      >
        <TrendingUp
          className={cn("w-3 h-3", !trend.positive && "rotate-180")}
        />
        {trend.value}
      </div>
    )}
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Employees"
          value={156}
          icon={<Users className="w-6 h-6" />}
          borderColor="border-primary"
          trend={{ value: "+3.2% from last month", positive: true }}
        />
        <StatCard
          title="Attendance Today"
          value={142}
          icon={<CheckCircle className="w-6 h-6" />}
          borderColor="border-success"
          trend={{ value: "5.2% from yesterday", positive: true }}
        />
        <StatCard
          title="Pending Leaves"
          value={8}
          icon={<Clock className="w-6 h-6" />}
          borderColor="border-warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { user: "John Doe", action: "clocked in", time: "9:00 AM" },
              {
                user: "Jane Smith",
                action: "requested leave",
                time: "9:15 AM",
              },
              { user: "Robert Brown", action: "clocked out", time: "5:00 PM" },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <span className="font-medium text-foreground">
                    {activity.user}
                  </span>
                  <span className="text-foreground-secondary">
                    {" "}
                    {activity.action}
                  </span>
                </div>
                <span className="text-sm text-foreground-tertiary">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-foreground-secondary">Present Today</span>
              <span className="font-semibold text-success">142</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground-secondary">Absent Today</span>
              <span className="font-semibold text-error">14</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground-secondary">On Leave</span>
              <span className="font-semibold text-warning">8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground-secondary">Late Arrivals</span>
              <span className="font-semibold text-info">5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
