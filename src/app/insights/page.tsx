'use client';

import { useEffect, useState } from 'react';
import { format, subDays, parseISO } from 'date-fns';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from 'recharts';
import { getEntriesForDateRange } from '@/lib/store';
import { DayEntry, MealEntry, SymptomEntry, BowelEntry } from '@/lib/types';
import clsx from 'clsx';

const TOOLTIP_STYLE = {
  borderRadius: '10px', border: '1px solid #e5e7eb',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: '12px', padding: '8px 12px',
};

function avg(arr: number[]) {
  return arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length * 10) / 10 : 0;
}

interface Day {
  date: string; label: string;
  meals: number; highFodmap: number; lowFodmap: number;
  worstSymptom: number; bowelCount: number; bowelAvg: number;
}

function StatCard({ label, value, sub, color }: { label: string; value: string|number; sub: string; color: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</p>
      <p className={clsx('text-2xl font-bold tabular-nums mt-1', color)}>{value}</p>
      <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
    </div>
  );
}

function ChartCard({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <p className="text-sm font-semibold text-gray-900 mb-0.5">{title}</p>
      {note && <p className="text-xs text-gray-400 mb-4">{note}</p>}
      {!note && <div className="mb-4" />}
      {children}
    </div>
  );
}

export default function InsightsPage() {
  const [days, setDays] = useState<Day[]>([]);
  const [pie, setPie] = useState<{ name: string; value: number; color: string }[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const data = getEntriesForDateRange(14);
    const built: Day[] = [];

    for (let i = 13; i >= 0; i--) {
      const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
      const entries: DayEntry[] = data[date] || [];
      const meals    = entries.filter(e => e.type === 'meal') as MealEntry[];
      const symptoms = entries.filter(e => e.type === 'symptom') as SymptomEntry[];
      const bowels   = entries.filter(e => e.type === 'bowel') as BowelEntry[];
      const foods    = meals.flatMap(m => m.foods);
      const symVals  = symptoms.flatMap(s => [s.bloating, s.pain, s.gas, s.nausea, s.fatigue]).filter(v => v > 0);

      built.push({
        date, label: format(parseISO(date), 'EEE'),
        meals: meals.length,
        highFodmap: foods.filter(f => f.fodmapOverall === 'high').length,
        lowFodmap:  foods.filter(f => f.fodmapOverall === 'low').length,
        worstSymptom: symVals.length ? Math.max(...symVals) : 0,
        bowelCount: bowels.length,
        bowelAvg:   avg(bowels.map(b => b.bristolType)),
      });
    }

    setDays(built);

    const allFoods = Object.values(data).flat()
      .filter((e): e is MealEntry => e.type === 'meal')
      .flatMap(m => m.foods);

    const lo  = allFoods.filter(f => f.fodmapOverall === 'low').length;
    const mo  = allFoods.filter(f => f.fodmapOverall === 'moderate').length;
    const hi  = allFoods.filter(f => f.fodmapOverall === 'high').length;

    if (lo + mo + hi > 0) {
      setPie([
        { name: 'Low',      value: lo, color: '#16a34a' },
        { name: 'Moderate', value: mo, color: '#d97706' },
        { name: 'High',     value: hi, color: '#dc2626' },
      ]);
    }
    setReady(true);
  }, []);

  if (!ready) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-6 h-6 border-2 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
    </div>
  );

  const hasData = days.some(d => d.meals > 0 || d.bowelCount > 0);
  const totalMeals   = days.reduce((a, d) => a + d.meals, 0);
  const totalHigh    = days.reduce((a, d) => a + d.highFodmap, 0);
  const avgSym       = avg(days.map(d => d.worstSymptom).filter(v => v > 0));
  const daysLogged   = days.filter(d => d.meals + d.bowelCount > 0).length;

  if (!hasData) return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Insights</h1>
      <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
        <p className="text-3xl mb-3">📊</p>
        <p className="text-base font-semibold text-gray-700">No data yet</p>
        <p className="text-sm text-gray-400 mt-1 max-w-xs mx-auto">
          Log a few days of meals and symptoms and patterns will start appearing here.
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Insights</h1>
        <p className="text-sm text-gray-400 mt-1">Last 14 days</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Days tracked"     value={daysLogged}          sub="out of 14"  color="text-brand-700" />
        <StatCard label="High-FODMAP items" value={totalHigh}          sub="items logged" color={totalHigh > 5 ? 'text-high' : 'text-low'} />
        <StatCard label="Avg symptom score" value={avgSym || '—'}      sub="out of 10"  color={!avgSym ? 'text-gray-400' : avgSym > 6 ? 'text-high' : avgSym > 3 ? 'text-moderate' : 'text-low'} />
        <StatCard label="Meals logged"      value={totalMeals}         sub="total"      color="text-gray-900" />
      </div>

      {/* Symptom trend */}
      <ChartCard title="Symptom severity" note="Daily worst score over 14 days">
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={days} margin={{ top: 4, right: 4, left: -30, bottom: 0 }}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#f43f5e" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity={0}   />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis domain={[0,10]}  tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [v || '—', 'Worst']} />
            <Area type="monotone" dataKey="worstSymptom" stroke="#f43f5e" fill="url(#g1)" strokeWidth={2} dot={{ r: 3, fill: '#f43f5e', strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* FODMAP bar chart */}
      <ChartCard title="FODMAP exposure" note="High vs. low items per day (last 7 days)">
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={days.slice(-7)} margin={{ top: 4, right: 4, left: -30, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Bar dataKey="lowFodmap"  name="Low"  fill="#16a34a" radius={[3,3,0,0]} />
            <Bar dataKey="highFodmap" name="High" fill="#dc2626" radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Pie + bowel in two columns on larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pie.length > 0 && (
          <ChartCard title="FODMAP split" note="All foods logged">
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={100} height={100}>
                <PieChart>
                  <Pie data={pie} cx="50%" cy="50%" innerRadius={30} outerRadius={48} dataKey="value" paddingAngle={3}>
                    {pie.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 flex-1">
                {pie.map(e => (
                  <div key={e.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} />
                      <span className="text-xs text-gray-600">{e.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-800 tabular-nums">{e.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>
        )}

        {days.some(d => d.bowelCount > 0) && (
          <ChartCard title="Bowel pattern" note="Bristol type avg (4 = ideal)">
            <ResponsiveContainer width="100%" height={100}>
              <AreaChart data={days} margin={{ top: 4, right: 4, left: -30, bottom: 0 }}>
                <defs>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#7c3aed" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0,7]}  tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [v || '—', 'Bristol avg']} />
                <Area type="monotone" dataKey="bowelAvg" stroke="#7c3aed" fill="url(#g2)" strokeWidth={2} dot={{ r: 3, fill: '#7c3aed', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        )}
      </div>
    </div>
  );
}
