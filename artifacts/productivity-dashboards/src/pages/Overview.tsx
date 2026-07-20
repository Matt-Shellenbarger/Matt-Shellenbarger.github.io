import { 
  useGetProductivitySummary, 
  useGetProductivityByType, 
  useGetProductivityRiskProfile, 
  useGetProductivityScoreDistribution 
} from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, Cell
} from "recharts";
import { Users, TrendingUp, Heart, AlertTriangle } from "lucide-react";
import { CHART_COLORS, CustomTooltip, CustomLegend } from "@/components/charts/ChartHelpers";
import { useEffect, useState } from "react";

export default function Overview() {
  const summaryQuery = useGetProductivitySummary();
  const byTypeQuery = useGetProductivityByType();
  const riskQuery = useGetProductivityRiskProfile();
  const distQuery = useGetProductivityScoreDistribution();

  const loading = summaryQuery.isLoading || summaryQuery.isFetching || 
                  byTypeQuery.isLoading || byTypeQuery.isFetching ||
                  riskQuery.isLoading || riskQuery.isFetching ||
                  distQuery.isLoading || distQuery.isFetching;

  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    setIsDark(document.documentElement.classList.contains('dark'));
    return () => observer.disconnect();
  }, []);

  const gridColor = isDark ? "rgba(255,255,255,0.08)" : "#e5e5e5";
  const tickColor = isDark ? "#98999C" : "#71717a";

  const renderKPIs = () => {
    if (loading) {
      return Array(4).fill(0).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-3 w-40" />
          </CardContent>
        </Card>
      ));
    }

    const summary = summaryQuery.data;
    const risk = riskQuery.data;
    
    const remoteRisk = risk?.find(r => r.employmentType === 'Remote')?.burnoutRisk || 0;
    const officeRisk = risk?.find(r => r.employmentType === 'In-Office')?.burnoutRisk || 0;

    return (
      <>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                  <Users className="w-4 h-4" /> Total Employees
                </p>
                <p className="text-3xl font-bold mt-2" style={{ color: CHART_COLORS.blue }}>
                  {summary?.totalEmployees.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {summary?.remoteCount} Remote / {summary?.inOfficeCount} In-Office
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Productivity Gap
                </p>
                <p className="text-3xl font-bold mt-2 text-green-600 dark:text-green-500">
                  +{summary?.productivityGap.toFixed(1)} pts
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Remote leads In-Office
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                  <Heart className="w-4 h-4" /> Well-being Gap
                </p>
                <p className="text-3xl font-bold mt-2 text-green-600 dark:text-green-500">
                  +{summary?.wellbeingGap.toFixed(1)} pts
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Remote leads In-Office
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Burnout Risk
                </p>
                <p className="text-3xl font-bold mt-2" style={{ color: CHART_COLORS.red }}>
                  {officeRisk} <span className="text-xl text-muted-foreground font-normal">vs {remoteRisk}</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  In-Office vs Remote
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </>
    );
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground mt-1 text-sm">Comparing productivity and well-being between Remote and In-Office employees.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {renderKPIs()}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Row 1, Chart 1 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Avg Productivity & Well-being</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="w-full h-[300px]" /> : (
              <ResponsiveContainer width="100%" height={300} debounce={0}>
                <BarChart data={byTypeQuery.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                  <XAxis dataKey="employmentType" tick={{ fontSize: 12, fill: tickColor }} stroke={tickColor} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: tickColor }} stroke={tickColor} axisLine={false} tickLine={false} domain={[40, 100]} />
                  <RechartsTooltip content={<CustomTooltip />} isAnimationActive={false} cursor={false} />
                  <Legend content={<CustomLegend />} />
                  <Bar dataKey="avgProductivity" name="Productivity" fill={CHART_COLORS.blue} fillOpacity={0.9} radius={[4, 4, 0, 0]} isAnimationActive={false} />
                  <Bar dataKey="avgWellbeing" name="Well-being" fill={CHART_COLORS.purple} fillOpacity={0.9} radius={[4, 4, 0, 0]} isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Row 1, Chart 2 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Avg Hours Worked (Weekly)</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="w-full h-[300px]" /> : (
              <ResponsiveContainer width="100%" height={300} debounce={0}>
                <BarChart data={byTypeQuery.data} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 12, fill: tickColor }} stroke={tickColor} axisLine={false} tickLine={false} domain={[0, 50]} />
                  <YAxis dataKey="employmentType" type="category" tick={{ fontSize: 12, fill: tickColor }} stroke={tickColor} axisLine={false} tickLine={false} />
                  <RechartsTooltip content={<CustomTooltip />} isAnimationActive={false} cursor={false} />
                  <Bar dataKey="avgHours" name="Hours Worked" fill={CHART_COLORS.green} fillOpacity={0.9} radius={[0, 4, 4, 0]} isAnimationActive={false} barSize={40}>
                    {byTypeQuery.data?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.employmentType === "Remote" ? CHART_COLORS.blue : CHART_COLORS.purple} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Row 2, Chart 1 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Burnout Risk vs High Performers</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="w-full h-[300px]" /> : (
              <ResponsiveContainer width="100%" height={300} debounce={0}>
                <BarChart data={riskQuery.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                  <XAxis dataKey="employmentType" tick={{ fontSize: 12, fill: tickColor }} stroke={tickColor} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: tickColor }} stroke={tickColor} axisLine={false} tickLine={false} />
                  <RechartsTooltip content={<CustomTooltip />} isAnimationActive={false} cursor={false} />
                  <Legend content={<CustomLegend />} />
                  <Bar dataKey="burnoutRisk" name="Burnout Risk" fill={CHART_COLORS.red} fillOpacity={0.9} radius={[4, 4, 0, 0]} isAnimationActive={false} />
                  <Bar dataKey="highPerformers" name="High Performers" fill={CHART_COLORS.green} fillOpacity={0.9} radius={[4, 4, 0, 0]} isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Row 2, Chart 2 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Productivity Score Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="w-full h-[300px]" /> : (
              <ResponsiveContainer width="100%" height={300} debounce={0}>
                <BarChart data={distQuery.data?.productivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                  <XAxis dataKey="bucket" tick={{ fontSize: 12, fill: tickColor }} stroke={tickColor} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: tickColor }} stroke={tickColor} axisLine={false} tickLine={false} />
                  <RechartsTooltip content={<CustomTooltip />} isAnimationActive={false} cursor={false} />
                  <Legend content={<CustomLegend />} />
                  <Bar dataKey="remote" name="Remote" stackId="a" fill={CHART_COLORS.blue} fillOpacity={0.9} isAnimationActive={false} />
                  <Bar dataKey="inOffice" name="In-Office" stackId="a" fill={CHART_COLORS.purple} fillOpacity={0.9} radius={[4, 4, 0, 0]} isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}