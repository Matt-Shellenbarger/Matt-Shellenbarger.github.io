import { 
  useGetProductivitySummary, 
  useGetProductivityHoursImpact, 
  useGetProductivityScatter, 
  useGetProductivityScoreDistribution 
} from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  BarChart, Bar, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, Legend, ResponsiveContainer, ComposedChart, ZAxis
} from "recharts";
import { Clock, TrendingUp, Heart } from "lucide-react";
import { CHART_COLORS, CustomTooltip, CustomLegend } from "@/components/charts/ChartHelpers";
import { useEffect, useState } from "react";

export default function WorkPatterns() {
  const summaryQuery = useGetProductivitySummary();
  const impactQuery = useGetProductivityHoursImpact();
  const scatterQuery = useGetProductivityScatter();
  const distQuery = useGetProductivityScoreDistribution();

  const loading = summaryQuery.isLoading || summaryQuery.isFetching || 
                  impactQuery.isLoading || impactQuery.isFetching ||
                  scatterQuery.isLoading || scatterQuery.isFetching ||
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
      return Array(3).fill(0).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-32 mb-2" />
          </CardContent>
        </Card>
      ));
    }

    const summary = summaryQuery.data;

    return (
      <>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Avg Hours Worked
                </p>
                <p className="text-3xl font-bold mt-2" style={{ color: CHART_COLORS.blue }}>
                  {summary?.avgHours.toFixed(1)}<span className="text-lg text-muted-foreground font-normal ml-1">h/wk</span>
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
                  <TrendingUp className="w-4 h-4" /> Avg Productivity
                </p>
                <p className="text-3xl font-bold mt-2" style={{ color: CHART_COLORS.blue }}>
                  {summary?.avgProductivity.toFixed(1)}
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
                  <Heart className="w-4 h-4" /> Avg Well-being
                </p>
                <p className="text-3xl font-bold mt-2" style={{ color: CHART_COLORS.blue }}>
                  {summary?.avgWellbeing.toFixed(1)}
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
        <h1 className="text-3xl font-bold tracking-tight">Work Patterns</h1>
        <p className="text-muted-foreground mt-1 text-sm">Analyzing how working hours impact productivity and well-being.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderKPIs()}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Dual-axis ComposedChart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Hours Worked vs. Performance & Well-being</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="w-full h-[350px]" /> : (
              <ResponsiveContainer width="100%" height={350} debounce={0}>
                <ComposedChart data={impactQuery.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                  <XAxis dataKey="bucket" tick={{ fontSize: 12, fill: tickColor }} stroke={tickColor} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" tick={{ fontSize: 12, fill: tickColor }} stroke={tickColor} axisLine={false} tickLine={false} domain={[40, 90]} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: tickColor }} stroke={tickColor} axisLine={false} tickLine={false} />
                  <RechartsTooltip content={<CustomTooltip />} isAnimationActive={false} cursor={{ fill: 'rgba(0,0,0,0.05)', stroke: 'none' }} />
                  <Legend content={<CustomLegend />} />
                  <Bar yAxisId="right" dataKey="count" name="Employee Count" fill={gridColor} fillOpacity={0.5} radius={[4, 4, 0, 0]} isAnimationActive={false} />
                  <Line yAxisId="left" type="monotone" dataKey="avgProductivity" name="Avg Productivity" stroke={CHART_COLORS.blue} strokeWidth={3} dot={{ r: 4, fill: CHART_COLORS.blue }} activeDot={{ r: 6 }} isAnimationActive={false} />
                  <Line yAxisId="left" type="monotone" dataKey="avgWellbeing" name="Avg Well-being" stroke={CHART_COLORS.pink} strokeWidth={3} dot={{ r: 4, fill: CHART_COLORS.pink }} activeDot={{ r: 6 }} isAnimationActive={false} />
                </ComposedChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Chart 2: Scatter plot */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Individual Productivity by Hours</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="w-full h-[300px]" /> : (
              <ResponsiveContainer width="100%" height={300} debounce={0}>
                <ScatterChart margin={{ top: 10, right: 20, left: -20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis type="number" dataKey="hoursWorked" name="Hours Worked" tick={{ fontSize: 12, fill: tickColor }} stroke={tickColor} axisLine={false} tickLine={false} domain={['dataMin - 2', 'dataMax + 2']} unit="h" />
                  <YAxis type="number" dataKey="productivityScore" name="Productivity" tick={{ fontSize: 12, fill: tickColor }} stroke={tickColor} axisLine={false} tickLine={false} domain={[20, 100]} />
                  <ZAxis type="category" dataKey="employmentType" name="Type" />
                  <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} isAnimationActive={false} />
                  <Legend content={<CustomLegend />} />
                  <Scatter name="Remote" data={scatterQuery.data?.filter(d => d.employmentType === 'Remote')} fill={CHART_COLORS.blue} fillOpacity={0.6} isAnimationActive={false} />
                  <Scatter name="In-Office" data={scatterQuery.data?.filter(d => d.employmentType === 'In-Office')} fill={CHART_COLORS.purple} fillOpacity={0.6} isAnimationActive={false} />
                </ScatterChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Chart 3: Well-being distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Well-being Score Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="w-full h-[300px]" /> : (
              <ResponsiveContainer width="100%" height={300} debounce={0}>
                <BarChart data={distQuery.data?.wellbeing} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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