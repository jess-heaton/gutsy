'use client';

import { useState, useRef, useEffect } from 'react';
import {
  ChefHat, AlertCircle, ArrowRight, CheckCircle, AlertTriangle,
  ClipboardList, Link2, Sparkles, Refrigerator, Camera, X,
  BookOpen, Clock, Users, Trash2, Bookmark, BookmarkCheck,
} from 'lucide-react';
import clsx from 'clsx';

type InputMode = 'recipe' | 'url' | 'describe' | 'fridge' | 'photo';

interface Swap { original: string; swap: string; why: string; }
interface RecipeResult {
  title: string;
  emoji?: string;
  accent?: string;
  tags?: string[];
  totalTime?: string;
  servings?: string;
  swaps: Swap[];
  recipe: string;
  notes: string[];
  lowFodmapConfidence: 'high' | 'medium' | 'low';
}
interface SavedCard {
  id: string;
  title: string;
  emoji: string | null;
  accent: string | null;
  tags: string[] | null;
  total_time: string | null;
  servings: string | null;
  confidence: string | null;
  image_url: string | null;
  created_at: string;
}

const FOOD_PHOTO_MAP: { keys: string[]; id: string }[] = [
  { keys: ['pasta','spaghetti','noodle','linguine','penne','fettuccine','tagliatelle','orzo','rigatoni'], id: '1621996346565-e3dbc646d9a9' },
  { keys: ['salad','greens','lettuce','coleslaw','slaw','cobb'], id: '1512621776951-a57141f2eefd' },
  { keys: ['soup','stew','broth','chowder','bisque','minestrone','ramen'], id: '1547592166-23ac45744acd' },
  { keys: ['chicken','turkey','poultry'], id: '1598103442097-8b74394b95c1' },
  { keys: ['salmon','fish','tuna','cod','seafood','prawn','shrimp','mackerel','halibut','trout'], id: '1580476262798-bddd9f4b7369' },
  { keys: ['curry','masala','tikka','dal','dhal','indian','thai','korma'], id: '1565557623262-b51c2513a641' },
  { keys: ['oat','porridge','granola','muesli'], id: '1517686469429-8bdb88b9f907' },
  { keys: ['bread','toast','sandwich','sourdough','wrap'], id: '1509440159596-0249088772ff' },
  { keys: ['rice','risotto','pilaf','paella','congee','biryani'], id: '1536304929831-ee1ca9d44906' },
  { keys: ['egg','omelette','frittata','scrambled','shakshuka','quiche'], id: '1525351484163-7529414344d8' },
  { keys: ['steak','beef','meat','pork','lamb','venison','mince','meatball'], id: '1544025162-d76694265947' },
  { keys: ['smoothie','juice','shake','blend'], id: '1505252585461-04db1eb84625' },
  { keys: ['bowl','buddha','grain bowl','power bowl'], id: '1546069901-ba9599a7e63c' },
  { keys: ['pizza'], id: '1565299624946-b28f40a0ae38' },
  { keys: ['burger','patty'], id: '1568901346375-23c9450c58cd' },
  { keys: ['taco','burrito','mexican','quesadilla','enchilada'], id: '1565299585323-38d6b0865b47' },
  { keys: ['cake','dessert','sweet','muffin','cookie','biscuit','brownie','chocolate','pudding'], id: '1578985545062-69928b1d9587' },
  { keys: ['stir','wok','asian','chinese','japanese','korean'], id: '1563379926898-05f4575a45d8' },
  { keys: ['vegetable','veg','roast','aubergine','courgette','carrot','plant'], id: '1540420773420-3366772f4999' },
];

function foodImageUrl(title: string, tags: string[] | null): string {
  const hay = [title, ...(tags ?? [])].join(' ').toLowerCase();
  for (const { keys, id } of FOOD_PHOTO_MAP) {
    if (keys.some(k => hay.includes(k))) {
      return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;
    }
  }
  return `https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80`;
}

const ACCENTS: Record<string, { from: string; to: string; ring: string; chip: string }> = {
  amber:   { from: 'from-amber-200',   to: 'to-orange-300',  ring: 'ring-amber-300',   chip: 'bg-amber-100 text-amber-800' },
  rose:    { from: 'from-rose-200',    to: 'to-pink-300',    ring: 'ring-rose-300',    chip: 'bg-rose-100 text-rose-800' },
  emerald: { from: 'from-emerald-200', to: 'to-teal-300',    ring: 'ring-emerald-300', chip: 'bg-emerald-100 text-emerald-800' },
  sky:     { from: 'from-sky-200',     to: 'to-indigo-300',  ring: 'ring-sky-300',     chip: 'bg-sky-100 text-sky-800' },
  violet:  { from: 'from-violet-200',  to: 'to-fuchsia-300', ring: 'ring-violet-300',  chip: 'bg-violet-100 text-violet-800' },
  orange:  { from: 'from-orange-200',  to: 'to-red-300',     ring: 'ring-orange-300',  chip: 'bg-orange-100 text-orange-800' },
  lime:    { from: 'from-lime-200',    to: 'to-green-300',   ring: 'ring-lime-300',    chip: 'bg-lime-100 text-lime-800' },
  teal:    { from: 'from-teal-200',    to: 'to-cyan-300',    ring: 'ring-teal-300',    chip: 'bg-teal-100 text-teal-800' },
};
const accent = (key?: string | null) => ACCENTS[key ?? 'amber'] ?? ACCENTS.amber;

const CONFIDENCE_CONFIG = {
  high:   { label: 'High confidence', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  medium: { label: 'Medium confidence', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
  low:    { label: 'Low confidence — verify with Monash', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' },
};

const MODES: { id: InputMode; icon: React.ElementType; label: string; hint: string }[] = [
  { id: 'recipe',   icon: ClipboardList, label: 'Paste',    hint: 'Paste a full recipe' },
  { id: 'url',      icon: Link2,         label: 'Link',     hint: 'Import from a URL' },
  { id: 'describe', icon: Sparkles,      label: 'Describe', hint: 'Describe any meal' },
  { id: 'fridge',   icon: Refrigerator,  label: 'Fridge',   hint: 'What do you have?' },
  { id: 'photo',    icon: Camera,        label: 'Photo',    hint: 'Snap a recipe card' },
];

function Spinner({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-4 py-16">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-gray-200" />
        <div className="absolute inset-0 rounded-full border-2 border-brand-600 border-t-transparent animate-spin" />
      </div>
      <p className="text-sm font-semibold text-gray-700">{label}</p>
    </div>
  );
}

function RecipeCard({ r, onDelete }: { r: SavedCard; onDelete: () => void }) {
  const a = accent(r.accent);
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white shadow-card hover:shadow-lifted transition-all hover:-translate-y-0.5">
      <a href={`/recipe/${r.id}`} className="block">
        <div className="h-36 relative overflow-hidden">
          {!imgFailed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={r.image_url ?? foodImageUrl(r.title, r.tags)}
              alt={r.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div className={clsx('absolute inset-0 bg-gradient-to-br flex items-center justify-center', a.from, a.to)}>
              <span className="text-5xl drop-shadow-sm" aria-hidden>{r.emoji ?? '🍽️'}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
        <div className="p-3.5">
          <p className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">{r.title}</p>
          <div className="flex items-center gap-3 mt-2 text-2xs text-gray-500">
            {r.total_time && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{r.total_time}</span>}
            {r.servings && <span className="flex items-center gap-1"><Users className="w-3 h-3" />{r.servings}</span>}
          </div>
          {r.tags && r.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {r.tags.slice(0, 3).map((t, i) => (
                <span key={i} className={clsx('text-2xs font-medium px-1.5 py-0.5 rounded-full', a.chip)}>{t}</span>
              ))}
            </div>
          )}
        </div>
      </a>
      <button
        onClick={e => { e.preventDefault(); onDelete(); }}
        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-gray-600 hover:text-red-600"
        aria-label="Delete recipe"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function RecipeDetail({ id, onClose, onDeleted }: { id: string; onClose: () => void; onDeleted: () => void }) {
  const [r, setR] = useState<(SavedCard & { fixed_text: string; swaps: Swap[]; notes: string[]; source_url: string | null }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    fetch(`/api/recipes/${id}`).then(r => r.json()).then(d => { setR(d.recipe); setLoading(false); });
  }, [id]);

  const del = async () => {
    if (!confirm('Delete this recipe?')) return;
    await fetch('/api/recipes', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    onDeleted();
  };

  const a = accent(r?.accent);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start sm:items-center justify-center p-0 sm:p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white w-full sm:max-w-2xl rounded-none sm:rounded-2xl my-0 sm:my-8 overflow-hidden shadow-lifted animate-slide-up" onClick={e => e.stopPropagation()}>
        <div className="h-48 relative overflow-hidden">
          {r && !imgFailed ? (
            <img
              src={r.image_url ?? foodImageUrl(r.title, r.tags)}
              alt={r.title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div className={clsx('absolute inset-0 bg-gradient-to-br flex items-center justify-center', a.from, a.to)}>
              <span className="text-6xl drop-shadow" aria-hidden>{r?.emoji ?? '🍽️'}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          {r && (
            <p className="absolute bottom-4 left-5 text-white font-bold text-lg drop-shadow-sm leading-tight max-w-[80%]">
              {r.title}
            </p>
          )}
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
          {loading || !r ? <Spinner label="Loading…" /> : (
            <>
              <div>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                  {r.total_time && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{r.total_time}</span>}
                  {r.servings && <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{r.servings}</span>}
                </div>
                {r.tags && r.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {r.tags.map((t, i) => (
                      <span key={i} className={clsx('text-2xs font-medium px-2 py-0.5 rounded-full', a.chip)}>{t}</span>
                    ))}
                  </div>
                )}
              </div>

              {r.swaps && r.swaps.length > 0 && (
                <div>
                  <h3 className="text-2xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Swaps</h3>
                  <div className="space-y-1.5">
                    {r.swaps.map((s, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg px-3 py-2 text-xs">
                        <span className="text-red-600 line-through">{s.original}</span>
                        <ArrowRight className="inline w-3 h-3 mx-1.5 text-gray-400" />
                        <span className="font-semibold text-emerald-700">{s.swap}</span>
                        <p className="text-gray-500 mt-0.5">{s.why}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-2xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Recipe</h3>
                <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">{r.fixed_text}</pre>
              </div>

              {r.notes && r.notes.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 space-y-1">
                  {r.notes.map((n, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-amber-800">
                      <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />{n}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button onClick={del} className="flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-800 px-3 py-2">
                  <Trash2 className="w-3.5 h-3.5" />Delete
                </button>
                {r.source_url && (
                  <a href={r.source_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 px-3 py-2">
                    <Link2 className="w-3.5 h-3.5" />Source
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RecipePage() {
  const [mode, setMode] = useState<InputMode>('recipe');
  const [recipe, setRecipe] = useState('');
  const [url, setUrl] = useState('');
  const [describe, setDescribe] = useState('');
  const [fridge, setFridge] = useState('');
  const [imgB64, setImgB64] = useState('');
  const [imgMedia, setImgMedia] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [imgName, setImgName] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<RecipeResult | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveStep, setSaveStep] = useState<'saving' | 'imaging' | 'done' | null>(null);
  const [saved, setSaved] = useState(false);

  const [cards, setCards] = useState<SavedCard[]>([]);

  const loadCards = () => fetch('/api/recipes').then(r => r.json()).then(d => setCards(d.recipes ?? []));
  useEffect(() => { loadCards(); }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) { setError('Image must be under 5 MB'); return; }
    const mt = f.type === 'image/png' ? 'image/png' : f.type === 'image/webp' ? 'image/webp' : 'image/jpeg';
    setImgMedia(mt);
    setImgName(f.name);
    const reader = new FileReader();
    reader.onload = ev => setImgB64((ev.target?.result as string).split(',')[1]);
    reader.readAsDataURL(f);
  };

  const analyse = async () => {
    setError(''); setResult(null); setSaved(false); setLoading(true);
    try {
      const body: Record<string, unknown> = { mode };
      if (mode === 'recipe')   body.recipe = recipe;
      if (mode === 'url')      body.url = url;
      if (mode === 'describe') body.describe = describe;
      if (mode === 'fridge')   body.fridge = fridge;
      if (mode === 'photo')    { body.imageBase64 = imgB64; body.imageMediaType = imgMedia; }

      const res = await fetch('/api/recipe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error ?? 'Analysis failed');
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    if (!result) return;
    setSaving(true);
    setSaveStep('saving');
    try {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: result.title,
          emoji: result.emoji,
          accent: result.accent,
          tags: result.tags,
          totalTime: result.totalTime,
          servings: result.servings,
          recipe: result.recipe,
          swaps: result.swaps,
          notes: result.notes,
          confidence: result.lowFodmapConfidence,
          sourceUrl: mode === 'url' ? url : null,
          originalText: mode === 'recipe' ? recipe : mode === 'describe' ? describe : mode === 'fridge' ? fridge : null,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error ?? 'Save failed');

      // Generate AI image (non-blocking on failure)
      setSaveStep('imaging');
      await fetch('/api/recipe-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeId: data.id, title: result.title, tags: result.tags }),
      }).catch(() => {}); // silently ignore if image gen fails

      setSaved(true);
      setSaveStep('done');
      loadCards();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Save failed');
      setSaveStep(null);
    } finally {
      setSaving(false);
    }
  };

  const canRun =
    (mode === 'recipe'   && recipe.trim())   ||
    (mode === 'url'      && url.trim())      ||
    (mode === 'describe' && describe.trim()) ||
    (mode === 'fridge'   && fridge.trim())   ||
    (mode === 'photo'    && imgB64);

  const cfg = result ? CONFIDENCE_CONFIG[result.lowFodmapConfidence] ?? CONFIDENCE_CONFIG.medium : null;
  const resultAccent = accent(result?.accent);

  const deleteCard = async (id: string) => {
    if (!confirm('Delete this recipe?')) return;
    await fetch('/api/recipes', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    loadCards();
  };

  return (
    <div className="max-w-wide mx-auto px-4 sm:px-6 py-8 lg:py-12 pb-20 lg:pb-12 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Cookbook</h1>
        <p className="text-sm text-gray-500 mt-1">
          Paste a recipe, drop a link, describe a meal, or tell me what's in the fridge — I'll make it FODMAP-safe and save it to your cookbook.
        </p>
      </div>

      {/* Input mode tabs */}
      <div className="grid grid-cols-5 gap-1.5 bg-gray-100 p-1 rounded-2xl">
        {MODES.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => { setMode(id); setError(''); setResult(null); setSaved(false); }}
            className={clsx(
              'flex flex-col items-center gap-1 py-2.5 rounded-xl text-2xs font-semibold transition-all',
              mode === id ? 'bg-white text-brand-700 shadow-card' : 'text-gray-500 hover:text-gray-700',
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Input surfaces */}
      <div className="space-y-3">
        {mode === 'recipe' && (
          <textarea
            placeholder={'Ingredients:\n1 cup chickpeas\n2 cloves garlic\n1 onion\n\nMethod:\n1. …'}
            value={recipe}
            onChange={e => setRecipe(e.target.value)}
            rows={10}
            className="w-full px-3.5 py-3 bg-white border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
          />
        )}

        {mode === 'url' && (
          <input
            type="url"
            placeholder="https://bbcgoodfood.com/recipes/…"
            value={url}
            onChange={e => setUrl(e.target.value)}
            className="w-full px-3.5 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        )}

        {mode === 'describe' && (
          <textarea
            placeholder="e.g. a warm, comforting autumn pasta with mushrooms and pumpkin — ready in 30 min"
            value={describe}
            onChange={e => setDescribe(e.target.value)}
            rows={5}
            className="w-full px-3.5 py-3 bg-white border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        )}

        {mode === 'fridge' && (
          <textarea
            placeholder={'chicken thighs\ncarrots\nspinach\nleftover rice\n1 lemon\ngarlic-infused oil'}
            value={fridge}
            onChange={e => setFridge(e.target.value)}
            rows={7}
            className="w-full px-3.5 py-3 bg-white border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        )}

        {mode === 'photo' && (
          <div>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFile} className="hidden" />
            <button
              onClick={() => fileRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-brand-400 hover:bg-brand-50 transition-colors"
            >
              <Camera className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              {imgName ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-medium text-gray-700">{imgName}</span>
                  <span onClick={e => { e.stopPropagation(); setImgName(''); setImgB64(''); }} className="text-gray-400 hover:text-red-400 cursor-pointer">
                    <X className="w-4 h-4" />
                  </span>
                </div>
              ) : (
                <>
                  <p className="text-sm font-medium text-gray-600">Upload a photo of a recipe</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG, or WebP — under 5 MB</p>
                </>
              )}
            </button>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <button
          onClick={analyse}
          disabled={!canRun || loading}
          className={clsx(
            'w-full py-3 rounded-xl font-semibold text-sm transition-all',
            canRun && !loading
              ? 'bg-brand-700 text-white hover:bg-brand-800 active:scale-98'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed',
          )}
        >
          {loading ? 'Cooking up something safe…' : 'Generate FODMAP-safe recipe'}
        </button>
      </div>

      {loading && <Spinner label="Cooking up something safe…" />}

      {result && (
        <div className="space-y-6 animate-slide-up">
          {/* Hero card */}
          <div className={clsx('rounded-2xl overflow-hidden shadow-card')}>
            <div className={clsx('h-36 bg-gradient-to-br flex items-center justify-center', resultAccent.from, resultAccent.to)}>
              <span className="text-6xl drop-shadow" aria-hidden>{result.emoji ?? '🍽️'}</span>
            </div>
            <div className="bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{result.title}</h2>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    {result.totalTime && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{result.totalTime}</span>}
                    {result.servings && <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />serves {result.servings}</span>}
                  </div>
                </div>
                <button
                  onClick={save}
                  disabled={saving || saved}
                  className={clsx(
                    'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all flex-shrink-0',
                    saved ? 'bg-emerald-50 text-emerald-700' : 'bg-brand-700 text-white hover:bg-brand-800',
                  )}
                >
                  {saved
                    ? <><BookmarkCheck className="w-3.5 h-3.5" />Saved</>
                    : saveStep === 'imaging'
                      ? <><Sparkles className="w-3.5 h-3.5 animate-pulse" />Generating image…</>
                      : saving
                        ? <><Bookmark className="w-3.5 h-3.5" />Saving…</>
                        : <><Bookmark className="w-3.5 h-3.5" />Save</>
                  }
                </button>
              </div>
              {result.tags && result.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {result.tags.map((t, i) => (
                    <span key={i} className={clsx('text-2xs font-medium px-2 py-0.5 rounded-full', resultAccent.chip)}>{t}</span>
                  ))}
                </div>
              )}
              {cfg && (
                <div className={clsx('mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-2xs font-semibold border', cfg.bg, cfg.color, cfg.border)}>
                  {result.lowFodmapConfidence === 'high' ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                  {cfg.label}
                </div>
              )}
            </div>
          </div>

          {result.swaps.length > 0 && (
            <div>
              <h3 className="text-2xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Swaps</h3>
              <div className="space-y-2">
                {result.swaps.map((s, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-red-600 line-through">{s.original}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span className="text-sm font-semibold text-emerald-700">{s.swap}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{s.why}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-2xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Recipe</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">{result.recipe}</pre>
            </div>
          </div>

          {result.notes.length > 0 && (
            <div>
              <h3 className="text-2xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Notes</h3>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-1.5">
                {result.notes.map((n, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800">{n}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cookbook gallery */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-4 h-4 text-brand-700" />
          <h2 className="text-sm font-bold text-gray-900">Your cookbook</h2>
          <span className="text-2xs text-gray-400">{cards.length}</span>
        </div>
        {cards.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <ChefHat className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Saved recipes will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {cards.map(c => (
              <RecipeCard key={c.id} r={c} onDelete={() => deleteCard(c.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
