import React from 'react';

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tags: string[];
  emoji: string;
  content: React.ReactNode;
}

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
);
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg font-bold text-gray-900 mt-8 mb-3">{children}</h2>
);
const Callout = ({ emoji, color, children }: { emoji: string; color: string; children: React.ReactNode }) => (
  <div className={`flex gap-3 ${color} rounded-2xl p-4 my-5`}>
    <span className="text-lg flex-shrink-0">{emoji}</span>
    <p className="text-sm leading-relaxed">{children}</p>
  </div>
);
const Li = ({ children }: { children: React.ReactNode }) => (
  <li className="text-gray-700 leading-relaxed mb-1.5 flex gap-2">
    <span className="text-gray-400 flex-shrink-0 mt-0.5">—</span>
    <span>{children}</span>
  </li>
);
const Ul = ({ children }: { children: React.ReactNode }) => (
  <ul className="my-4 space-y-0">{children}</ul>
);

export const articles: Article[] = [
  {
    slug: 'fodzyme',
    title: 'FODzyme: Can You Actually Eat Garlic and Onion Again?',
    subtitle: 'A fructan hydrolase enzyme that works before the damage is done.',
    date: '2024-11-12',
    readTime: '5 min',
    tags: ['enzymes', 'fructans', 'supplements'],
    emoji: '🧪',
    content: (
      <>
        <P>
          Garlic and onion are in everything. Restaurant food, stock cubes, most sauces, family dinners you can't get out of. If fructans are one of your triggers, you've probably resigned yourself to either eating them and suffering, or spending a lot of social energy explaining why you can't.
        </P>
        <P>
          FODzyme is a digestive enzyme supplement that takes a different approach: break the fructans down before they cause trouble. Take a capsule with your meal, and the enzyme — fructan hydrolase — gets to work in your small intestine, cleaving fructan chains before they reach your colon and ferment.
        </P>
        <P>
          It won't give you a free pass to eat garlic bread every night. But for the situations where avoidance isn't realistic, it's a genuinely useful tool.
        </P>

        <H2>How it actually works</H2>
        <P>
          Fructans are chains of fructose molecules. Humans don't produce an enzyme that breaks them down, so they pass through the small intestine intact and land in the large intestine, where bacteria ferment them. That fermentation produces gas, triggers cramping, and causes bloating.
        </P>
        <P>
          FODzyme's fructan hydrolase (an endo-inulinase) cuts these chains internally — not from the ends — which means it breaks long chains into small fragments quickly. You've got roughly 2–4 hours in the small intestine before contents move to the colon. The endo approach works within that window.
        </P>

        <Callout emoji="⏱️" color="bg-indigo-50 text-indigo-800">
          Take it at the start of the meal, not before or after. The enzyme needs to be in the gut at the same time as the food.
        </Callout>

        <H2>What the research says</H2>
        <P>
          A 2022 double-blind crossover trial gave participants either FODzyme or placebo with a high-fructan meal. The FODzyme group reported significantly lower bloating, abdominal pain, and flatulence. The effect was meaningful — not marginal.
        </P>
        <P>
          That said, it's one trial. It's not a cure. And it only works on fructans specifically — not lactose, not polyols, not GOS. If your triggers are mixed, it helps with one piece of the puzzle.
        </P>

        <H2>Worth knowing</H2>
        <Ul>
          <Li>Works on fructans only — onion, garlic, wheat, rye, leek, asparagus are the main ones</Li>
          <Li>Fructan hydrolase denatures at high temperatures — don't take it with scalding hot food or drinks</Li>
          <Li>Not a substitute for the elimination phase — use it once you know fructans are a trigger</Li>
          <Li>It's not cheap. Factor it in as a supplement for social/unavoidable situations rather than daily use</Li>
        </Ul>

        <Callout emoji="✅" color="bg-emerald-50 text-emerald-800">
          If onion and garlic are your main triggers and you've confirmed this through the reintroduction phase, FODzyme is probably the most targeted thing you can take. It won't work for everyone, but when it does, it's a meaningful quality-of-life improvement.
        </Callout>
      </>
    ),
  },

  {
    slug: 'milkaid',
    title: 'The Milkaid Thing Nobody Tells You',
    subtitle: 'The pharmacy version has raspberry flavouring in it. The website version doesn\'t.',
    date: '2024-10-28',
    readTime: '3 min',
    tags: ['lactase', 'dairy', 'supplements'],
    emoji: '🥛',
    content: (
      <>
        <P>
          Milkaid is a lactase enzyme supplement — you take it before eating dairy and it helps you digest lactose. Straightforward enough. What most people don't know: the version sold in pharmacies and supermarkets contains raspberry flavouring.
        </P>
        <P>
          Raspberry flavouring. In a product designed for people with digestive issues.
        </P>
        <P>
          It doesn't affect the efficacy of the enzyme itself. The flavouring is purely cosmetic — the chewable tablets taste like raspberry so they're more palatable. But for people with IBS, artificial flavourings and additives are a known irritant for some. You could be taking a supplement to reduce dairy symptoms while inadvertently adding a separate trigger every time you use it.
        </P>

        <H2>The fix</H2>
        <P>
          The unflavoured capsule version is only available directly from the Milkaid website. The{' '}
          <a
            href="https://milkaid.com/product/milkaid-max-capsules-60s/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800"
          >
            Milkaid Max Capsules (60s)
          </a>{' '}
          contain the enzyme — nothing else added. Same dose as the Max tablets, no raspberry, no unnecessary additives.
        </P>

        <Callout emoji="💡" color="bg-amber-50 text-amber-800">
          The capsule format also gives you more flexibility. If you're having a small amount of dairy — a splash of milk in coffee — you can open the capsule and use half. The tablets don't split cleanly.
        </Callout>

        <H2>A note on lactase vs the elimination diet</H2>
        <P>
          Lactase supplements let you eat dairy without lactose symptoms, but they don't change the fact that lactose is a FODMAP. During the strict elimination phase, it's cleaner to switch to lactose-free products rather than relying on enzyme supplements — the goal of that phase is a complete baseline, and supplements add a variable.
        </P>
        <P>
          Once you're in reintroduction and have confirmed that lactose is a trigger (or isn't), lactase supplements are a useful day-to-day tool. Capsules only, if you can manage it.
        </P>
      </>
    ),
  },

  {
    slug: 'fructan-vs-gluten',
    title: 'It Was Probably the Fructans, Not the Gluten',
    subtitle: 'Why gluten-free diets help IBS sufferers — and why the reason isn\'t what most people think.',
    date: '2024-10-05',
    readTime: '5 min',
    tags: ['fructans', 'gluten', 'research'],
    emoji: '🌾',
    content: (
      <>
        <P>
          A lot of people with IBS try going gluten-free and feel noticeably better. Then they conclude they're gluten-sensitive. It's a reasonable conclusion — but it's probably wrong.
        </P>
        <P>
          In 2017, researchers at Monash University ran a double-blind crossover trial on 59 people who believed they had non-coeliac gluten sensitivity. Each participant cycled through three diets: high gluten, low gluten, and low fructan. The result was clear. Fructans — not gluten — triggered significantly more bloating, gut pain and wind. On the low-fructan diet, symptoms dropped substantially. On the gluten variations, not so much.
        </P>

        <H2>Why gluten-free still works</H2>
        <P>
          Most foods that contain gluten also contain fructans. Wheat, rye, barley — they're all high-fructan grains. When you remove gluten from your diet, you're also removing fructans. Symptoms improve, and gluten gets the credit.
        </P>
        <P>
          This matters practically because gluten-free and low-fructan are not the same thing. Gluten-free products often contain:
        </P>
        <Ul>
          <Li>Apple or pear juice (high fructose)</Li>
          <Li>Honey (high fructose)</Li>
          <Li>Inulin — a fructan added as a prebiotic fibre for texture and gut health marketing</Li>
          <Li>Chicory root extract — another fructan source</Li>
        </Ul>
        <P>
          A gluten-free bread made with inulin can trigger IBS symptoms as reliably as regular bread. The label says gluten-free. The FODMAP content says otherwise.
        </P>

        <H2>The sourdough exception</H2>
        <P>
          Traditional sourdough is often tolerated by IBS sufferers even though it's made from wheat. The long fermentation process — 8–12 hours with a live culture — allows bacteria in the dough to break down most of the fructans before the bread reaches you. By the time it's baked, the fructan content is substantially lower.
        </P>

        <Callout emoji="⚠️" color="bg-red-50 text-red-800">
          This only applies to genuine sourdough — bread made with a starter culture and long fermentation. Most supermarket "sourdough" is regular bread with a small amount of vinegar added for flavour. Check that the ingredients list only flour, water, salt, and starter culture.
        </Callout>

        <H2>What this means for testing</H2>
        <P>
          If you've never done a proper FODMAP elimination and reintroduction, you don't actually know whether gluten is a problem for you. (If you have coeliac disease, that's a different situation — coeliac is an immune response to gluten itself and requires strict avoidance regardless.) For everyone else, the fructan reintroduction test — not the gluten one — is the relevant experiment.
        </P>
        <P>
          The practical upside: if fructans rather than gluten are the issue, your dietary restrictions are different and often more manageable. Gluten-free means avoiding a protein found in many grains. Low-fructan means watching specific foods — but at the right serving sizes, many gluten-containing foods (sourdough, small amounts of pasta) may still be on the table.
        </P>
      </>
    ),
  },

  {
    slug: 'inulinase-vs-fructan-hydrolase',
    title: 'Inulinase vs Fructan Hydrolase: Why It Matters Which One You\'re Getting',
    subtitle: 'Not all fructan-digesting enzymes work the same way.',
    date: '2024-09-18',
    readTime: '4 min',
    tags: ['enzymes', 'science', 'fructans'],
    emoji: '⚗️',
    content: (
      <>
        <P>
          Both inulinase and fructan hydrolase break down fructans. Both appear on the labels of enzyme supplements. They're not the same thing, and the difference matters if you're trying to figure out why one supplement works better than another.
        </P>

        <H2>Exo vs endo: how they cut</H2>
        <P>
          Fructan chains are long strings of fructose molecules. Enzymes that break them down differ in <em>where</em> on the chain they attack.
        </P>
        <Ul>
          <Li><strong>Exo-inulinase</strong> cuts from the end of the chain, releasing one fructose molecule at a time. Systematic, but slow. Like unravelling a rope one thread at a time from the tip.</Li>
          <Li><strong>Endo-inulinase (fructan hydrolase)</strong> cuts the chain internally, breaking it into shorter fragments simultaneously. Faster — more like cutting the rope in several places at once.</Li>
        </Ul>
        <P>
          When you take an enzyme supplement with a meal, you've got a limited window — roughly 2–4 hours in the small intestine — before partially digested food moves to the colon. The endo approach processes fructans substantially faster within that window. An exo enzyme might only get through a fraction of the chain before the contents move on.
        </P>

        <H2>Why this matters for supplements</H2>
        <P>
          Many cheaper enzyme supplements list "inulinase" on the label without specifying which type. If the source is <em>Aspergillus niger</em> — a common fungal source for food-grade enzymes — it's most likely an exo-inulinase. It'll work to some degree, but it's slower.
        </P>
        <P>
          FODzyme specifically uses an endo-inulinase sourced from a different organism and selected for its activity profile in the gut pH range. This is why it's more expensive than generic "inulinase" blends — and why the effect tends to be more pronounced.
        </P>

        <Callout emoji="🔬" color="bg-indigo-50 text-indigo-800">
          When comparing enzyme supplements, look for "endo-inulinase" or "fructan hydrolase" rather than just "inulinase." The distinction isn't always on the label, so it's worth checking the manufacturer's documentation or contacting them directly.
        </Callout>

        <H2>Temperature and pH sensitivity</H2>
        <P>
          Fructan hydrolase is sensitive to heat — it denatures at temperatures above around 60°C. This is relevant in a few ways:
        </P>
        <Ul>
          <Li>Don't take it with boiling hot food or drink — let things cool slightly first</Li>
          <Li>The enzyme is stable at gut pH (around 5–7) but not at extremes</Li>
          <Li>Store supplements away from heat and humidity — bathroom cabinets are not ideal</Li>
        </Ul>
        <P>
          The gut environment is actually reasonably hospitable for this enzyme — the small intestine sits at around 37°C and pH 6–7.4, which is within the active range. The meal itself provides the right conditions, which is why timing with food matters.
        </P>

        <H2>The bottom line</H2>
        <P>
          If you've tried a fructan enzyme supplement and found it underwhelming, it's worth checking whether you were getting an exo or endo enzyme. The endo version isn't universally available and costs more, but the mechanism is meaningfully different — and the clinical evidence for FODzyme specifically is stronger than for generic blends.
        </P>
      </>
    ),
  },

  {
    slug: 'psyllium-husk',
    title: 'What the Research Actually Says About Psyllium Husk',
    subtitle: 'One of the better-studied supplements in IBS — here\'s what the evidence looks like.',
    date: '2024-08-30',
    readTime: '6 min',
    tags: ['fibre', 'research', 'supplements'],
    emoji: '🌿',
    content: (
      <>
        <P>
          Psyllium husk is one of the few IBS supplements with reasonably solid clinical evidence behind it. That doesn't mean it works for everyone — IBS is too variable for that — but the research is more credible than most things sold in the gut health aisle.
        </P>

        <H2>The standout study</H2>
        <P>
          A 2012 trial in the BMJ (Bijkerk et al.) randomised 275 IBS patients to psyllium, wheat bran, or placebo over 12 weeks. Psyllium significantly reduced symptom severity. Wheat bran performed no better than placebo and made things worse for some participants.
        </P>
        <P>
          That last part is worth sitting with: insoluble fibre (wheat bran) — which gets pushed as broadly beneficial — actively worsened IBS in a subset of participants. Psyllium is predominantly soluble fibre, which behaves differently.
        </P>

        <H2>Why soluble vs insoluble matters</H2>
        <P>
          Insoluble fibre (wheat bran, bran cereal, raw vegetables) adds bulk and speeds transit — good for some types of constipation, bad if your gut is already irritated. It doesn't dissolve in water and passes through largely intact, which means it can physically irritate the gut lining.
        </P>
        <P>
          Soluble fibre dissolves and forms a gel in water. Psyllium is around 70% soluble fibre. The gel slows transit slightly, softens stool, and provides a food source for beneficial gut bacteria — without the fermentation that causes gas (the kind you get with FOS, inulin and GOS).
        </P>

        <H2>IBS-D and IBS-C both respond</H2>
        <P>
          This is unusual. Most interventions help one subtype and worsen the other. Psyllium's gel-forming property regulates transit in both directions: it adds structure for watery stool in IBS-D, and provides bulk and softness to help with IBS-C. The mechanism is the same — it normalises, rather than just accelerating or slowing.
        </P>

        <H2>Low FODMAP status</H2>
        <P>
          Psyllium husk powder is low FODMAP at the standard dose (5g). It doesn't ferment significantly in the colon at normal amounts, which is why it doesn't cause the gas that other fibres do. This makes it compatible with the elimination phase — it won't muddy the symptom picture the way, say, an inulin-containing supplement would.
        </P>

        <Callout emoji="⚠️" color="bg-amber-50 text-amber-800">
          At very high doses (20g+), psyllium can become fermentable and cause bloating. Start low and stay at the dose that works — more is not automatically better.
        </Callout>

        <H2>How to actually take it</H2>
        <Ul>
          <Li>Start at 5g (about 1 teaspoon) once a day — usually morning works well</Li>
          <Li>Mix with a full glass of water (at least 250ml) — it needs liquid to form the gel. Without it, it can cause a blockage</Li>
          <Li>Give it 4–6 weeks before deciding if it's helping. Short trials miss the cumulative effect</Li>
          <Li>Powder dissolves more completely than husks and tends to be gentler. Both are low FODMAP</Li>
          <Li>If you're on medication, take psyllium at least an hour apart — it can reduce absorption of some drugs</Li>
        </Ul>

        <H2>What it won't do</H2>
        <P>
          Psyllium isn't a trigger treatment. It won't stop a flare caused by eating something high-FODMAP. Think of it as background infrastructure — something that keeps the gut more stable day-to-day, rather than a rescue tool.
        </P>
        <P>
          It also won't work for everyone. A significant proportion of IBS patients in the Bijkerk trial didn't respond. If you've been taking it correctly for 6 weeks and nothing's changed, it probably isn't your thing.
        </P>

        <Callout emoji="✅" color="bg-emerald-50 text-emerald-800">
          Among the things you can actually take for IBS — most of which have weak or no evidence — psyllium sits near the top. Low risk, low cost, low FODMAP, and reasonably well-studied. A sensible starting point before anything more complex.
        </Callout>
      </>
    ),
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
