'use client';

import { useEffect, useState } from 'react';
import { format, subDays, parseISO } from 'date-fns';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell,
} from 'recharts';
import { getEntriesForDateRange } from '@/lib/store';
import { DayEntry, MealEntry, SymptomEntry, BowelEntry } from '@/lib/types';
import clsx from 'clsx';

const COLORS = { low: '#059669', moderate: '#d97706', high: '#dc2626' };
const SYMPTOM_COLOR = '#f43f5e';
const BOWEL_IDEAL = [3, 4];

function avgOf(arr: number[]) {
  if (!arr.length) return 0;
  return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length * 10) / 10;
}

interface DayStats {
  date: string;
  label: string;
  meals: number;
  highFodmap: number;
  lowFodmap: number;
  worstSymptom: number;
  avgSymptom: number;
  bowelCount: number;
  bowelAvg: number;
}

export default function InsightsPage() {
  const [stats, setStats] = useState<DayStats[]>([]);
  const [fodmapPie, setFodmapPie] = useState<{ name: string; value: number; color: string }[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const data = getEntriesForDateRange(14);
    const days: DayStats[] = [];

    for (let i = 13; i >= 0; i--) {
      const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
      const entries: DayEntry[] = data[date] || [];

      const meals = entries.filter((e) => e.type === 'meal') as MealEntry[];
      const symptoms = entries.filter((e) => e.type === 'symptom') as SymptomEntry[];
      const bowels = entries.filter((e) => e.type === 'bowel') as BowelEntry[];

      const allFoods = meals.flatMap((m) => m.foods);
      const highCount = allFoods.filter((f) => f.fodmapOverall === 'high').length;
      const lowCount = allFoods.filter((f) => f.fodmapOverall === 'low').length;

      const symValues = symptoms.flatMap((s) => [s.bloating, s.pain, s.gas, s.nausea, s.fatigue]).filter((v) => v > 0);
      const worstSym = symValues.length ? Math.max(...symValues) : 0;
      const avgSym = avgOf(symValues);

      const bowelTypes = bowels.map((b) => b.bristolType);
      const bowelAvg = bowelTypes.length ? avgOf(bowelTypes) : 0;

      days.push({
        date,
        label: format(parseISO(date), 'EEE'),
        meals: meals.length,
        highFodmap: highCount,
        lowFodmap: lowCount,
        worstSymptom: worstSym,
        avgSymptom: avgSym,
        bowelCount: bowels.length,
        bowelAvg,
      });
    }

    setStats(days);

    // FODMAP distribution
    const allFoods = Object.values(data).flat().filter((e): e is MealEntry => e.type === 'meal').flatMap((m) => m.foods);
    const low = allFoods.filter((f) => f.fodmapOverall === 'low').length;
    const mod = allFoods.filter((f) => f.fodmapOverall === 'moderate').length;
    const high = allFoods.filter((f) => f.fodmapOverall === 'high').length;
    if (low + mod + high > 0) {
      setFodmapPie([
        { name: 'Low', value: low, color: COLORS.low },
        { name: 'Moderate', value: mod, color: COLORS.moderate },
        { name: 'High', value: high, color: COLORS.high },
      ]);
    }

    setLoaded(true);
  }, []);

  const totalMeals = stats.reduce((a, d) => a + d.meals, 0);
  const totalHighFodmap = stats.reduce((a, d) => a + d.highFodmap, 0);
  const avgSymptom = avgOf(stats.map((d) => d.avgSymptom).filter((v) => v > 0));
  const totalLogged = stats.filter((d) => d.meals + d.bowelCount > 0).length;

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  const hasData = stats.some((d) => d.meals > 0 || d.bowelCount > 0);

  if (!hasData) {
    return (
      <div className="px-4 pt-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Insights</h1>
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <span className="text-6xl">📊</span>
          <p className="text-lg font-bold text-gray-700">Nothing to show yet</p>
          <p className="text-sm text-gray-400 max-w-xs">
            Log a few days of meals and symptoms and patterns will start showing up here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Insights</h1>
        <p className="text-sm text-gray-500 mt-1">Last 14 days</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-2.5">
        <StatCard label="Days tracked" value={totalLogged} sub="out of 14" color="text-indigo-600" bg="bg-indigo-50" />
        <StatCard label="High-FODMAP foods" value={totalHighFodmap} sub="items logged" color={totalHighFodmap > 5 ? 'text-red-600' : 'text-emerald-600'} bg={totalHighFodmap > 5 ? 'bg-red-50' : 'bg-emerald-50'} />
        <StatCard label="Avg. symptom score" value={avgSymptom || '—'} sub="out of 10" color={avgSymptom > 6 ? 'text-red-600' : avgSymptom > 3 ? 'text-amber-600' : 'text-emerald-600'} bg="bg-gray-50" />
        <StatCard label="Meals logged" value={totalMeals} sub="over 14 days" color="text-gray-700" bg="bg-gray-50" />
      </div>

      {/* Symptom trend */}
      <ChartCard title="Symptom Severity" subtitle="Daily worst score (0–10)">
        <ResponsiveContainer width="100%" height={140}>
          <AreaChart data={stats} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
            <defs>
              <linearGradient id="symptomGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={SYMPTOM_COLOR} stopOpacity={0.3} />
                <stop offset="95%" stopColor={SYMPTOM_COLOR} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '12px' }}
              formatter={(v: number) => [v, 'Worst symptom']}
            />
            <Area type="monotone" dataKey="worstSymptom" stroke={SYMPTOM_COLOR} fill="url(#symptomGrad)" strokeWidth={2} dot={{ r: 3, fill: SYMPTOM_COLOR }} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* FODMAP breakdown */}
      <ChartCard title="Daily FODMAP Exposure" subtitle="High vs. low FODMAP foods per day">
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={stats.slice(-7)} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '12px' }}
            />
            <Bar dataKey="lowFodmap" name="Low FODMAP" fill={COLORS.low} radius={[4, 4, 0, 0]} />
            <Bar dataKey="highFodmap" name="High FODMAP" fill={COLORS.high} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* FODMAP pie */}
      {fodmapPie.length > 0 && (
        <ChartCard title="FODMAP Distribution" subtitle="All foods logged in 14 days">
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie data={fodmapPie} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" paddingAngle={3}>
                  {fodmapPie.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1">
              {fodmapPie.map((entry) => (
                <div key={entry.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
                    <span className="text-sm text-gray-700">{entry.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-gray-800">{entry.value}</span>
                    <span className="text-xs text-gray-400">
                      ({Math.round(entry.value / fodmapPie.reduce((a, b) => a + b.value, 0) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      )}

      {/* Bowel pattern */}
      {stats.some((d) => d.bowelCount > 0) && (
        <ChartCard title="Bowel Pattern" subtitle="Average Bristol type per day (4 = ideal)">
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={stats} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
              <defs>
                <linearGradient id="bowelGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 7]} tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '12px' }}
                formatter={(v: number) => [v || '—', 'Bristol type avg']}
              />
              <Area type="monotone" dataKey="bowelAvg" stroke="#8b5cf6" fill="url(#bowelGrad)" strokeWidth={2} dot={{ r: 3, fill: '#8b5cf6' }} />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-400 mt-1">Target zone: Types 3–4 (well-formed stool)</p>
        </ChartCard>
      )}

      <div className="h-4" />
    </div>
  );
}

function StatCard({ label, value, sub, color, bg }: { label: string; value: string | number; sub: string; color: string; bg: string }) {
  return (
    <div className={clsx('rounded-2xl p-3.5 border border-gray-100', bg)}>
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <p className={clsx('text-2xl font-bold mt-1', color)}>{value}</p>
      <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
    </div>
  );
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-4">
      <p className="text-sm font-semibold text-gray-800">{title}</p>
      <p className="text-xs text-gray-400 mb-3">{subtitle}</p>
      {children}
    </div>
  );
}
