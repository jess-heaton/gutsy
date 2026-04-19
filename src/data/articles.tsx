import React from 'react';
import Callout from '@/components/blog/Callout';

export interface Reference {
  label: string;
  authors?: string;
  journal?: string;
  year?: number;
  url: string;
}

export interface Author {
  name: string;
  role: string;
  bio: string;
  avatarInitials: string;
}

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  date: string;          // ISO 8601
  updatedDate?: string;  // ISO 8601
  readTime: string;
  tags: string[];
  category: string;
  keywords: string[];
  heroImage: string;
  heroAlt: string;
  heroCredit?: string;
  author: Author;
  reviewer?: Author;
  takeaways: string[];
  references: Reference[];
  content: React.ReactNode;
}

const AUTHOR_EDITORIAL: Author = {
  name: 'Gutsy Editorial',
  role: 'Research team',
  bio: 'The Gutsy editorial team reviews published gastroenterology and FODMAP research, distils it into plain English, and fact-checks every claim against primary sources. We do not accept paid placements from supplement brands.',
  avatarInitials: 'GE',
};

const AUTHOR_DIETITIAN_REVIEW: Author = {
  name: 'Medically reviewed',
  role: 'Dietitian review',
  bio: 'All articles citing clinical recommendations are cross-checked against current Monash University FODMAP research and the British Dietetic Association IBS guidelines. Articles are reviewed at least annually.',
  avatarInitials: 'RD',
};

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
);
const H2 = ({ id, children }: { id?: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-xl font-bold text-gray-900 mt-10 mb-3 scroll-mt-24">{children}</h2>
);
const Li = ({ children }: { children: React.ReactNode }) => (
  <li className="text-gray-700 leading-relaxed mb-1.5 flex gap-2">
    <span className="text-brand-500 flex-shrink-0 mt-0.5">—</span>
    <span>{children}</span>
  </li>
);
const Ul = ({ children }: { children: React.ReactNode }) => (
  <ul className="my-4 space-y-0">{children}</ul>
);
const Em = ({ children }: { children: React.ReactNode }) => (
  <em className="italic text-gray-800">{children}</em>
);

export const articles: Article[] = [
  {
    slug: 'fodzyme',
    title: 'FODzyme: Can You Actually Eat Garlic and Onion Again?',
    subtitle: 'A fructan hydrolase enzyme that works before the damage is done — here\'s what the clinical evidence looks like and how to use it properly.',
    excerpt: 'FODzyme is a digestive enzyme that breaks down fructans — the FODMAP in garlic, onion and wheat — before they ferment in the colon. The evidence is meaningful but has limits.',
    date: '2024-11-12',
    updatedDate: '2025-01-18',
    readTime: '6 min',
    tags: ['enzymes', 'fructans', 'supplements'],
    category: 'Supplements',
    keywords: ['FODzyme', 'fructan hydrolase', 'garlic intolerance', 'onion IBS', 'FODMAP enzyme supplement', 'low FODMAP enzyme', 'Monash FODMAP'],
    heroImage: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Fresh garlic bulbs and red onions on a wooden board',
    heroCredit: 'Photo via Unsplash',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'FODzyme uses an endo-inulinase that breaks fructan chains internally — faster than cheaper exo-type enzymes.',
      'A 2022 double-blind crossover trial showed significantly reduced bloating, pain and flatulence vs. placebo.',
      'It only works on fructans. Lactose, polyols, GOS and excess fructose need different strategies.',
      'Take it at the start of the meal — not with scalding food — and treat it as a tool for unavoidable situations, not a daily licence.',
    ],
    references: [
      {
        label: 'Tuck et al. — Fructan hydrolase enzyme for IBS (2022)',
        authors: 'Tuck CJ, Taylor KM, Gibson PR, et al.',
        journal: 'Clinical and Translational Gastroenterology',
        year: 2022,
        url: 'https://pubmed.ncbi.nlm.nih.gov/35347091/',
      },
      {
        label: 'Monash University — FODMAP research overview',
        url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/',
      },
      {
        label: 'Whelan et al. — Low-FODMAP diet in IBS: clinical evidence',
        authors: 'Whelan K, Martin LD, Staudacher HM, Lomer MCE',
        journal: 'Journal of Human Nutrition and Dietetics',
        year: 2018,
        url: 'https://pubmed.ncbi.nlm.nih.gov/29336079/',
      },
    ],
    content: (
      <>
        <P>
          Garlic and onion are in almost everything. Restaurant food, stock cubes, most sauces, family dinners you can't get out of. If fructans are one of your triggers, you've probably resigned yourself to eating them and suffering — or spending a lot of social energy explaining why you can't.
        </P>
        <P>
          FODzyme is a digestive enzyme supplement that takes a different approach: break the fructans down before they cause trouble. Take a sachet or capsule with your meal, and the enzyme — fructan hydrolase — gets to work in your small intestine, cleaving fructan chains before they reach your colon and ferment.
        </P>
        <P>
          It won't give you a free pass to eat garlic bread every night. But for situations where avoidance isn't realistic, it's a genuinely useful tool.
        </P>

        <H2 id="how-it-works">How it actually works</H2>
        <P>
          Fructans are chains of fructose molecules. Humans don't produce an enzyme that breaks them down, so they pass through the small intestine intact and land in the large intestine, where bacteria ferment them. That fermentation produces gas, triggers cramping, and causes bloating.
        </P>
        <P>
          FODzyme's fructan hydrolase (an endo-inulinase) cuts these chains internally — not from the ends — which means it breaks long chains into small fragments quickly. You've got roughly 2–4 hours in the small intestine before contents move to the colon. The endo approach works within that window.
        </P>

        <Callout variant="tip" title="Timing matters">
          Take it at the start of the meal, not before or after. The enzyme needs to be in the gut at the same time as the food — and well before it reaches the colon.
        </Callout>

        <H2 id="evidence">What the research says</H2>
        <P>
          A 2022 double-blind crossover trial gave participants either FODzyme or placebo with a high-fructan meal. The FODzyme group reported significantly lower bloating, abdominal pain, and flatulence. The effect was meaningful — not marginal.
        </P>
        <P>
          That said, it's one trial. It's not a cure. And it only works on fructans specifically — not lactose, not polyols, not GOS (the FODMAP in legumes). If your triggers are mixed, it helps with one piece of the puzzle.
        </P>

        <H2 id="practical">Worth knowing before you buy</H2>
        <Ul>
          <Li>Works on fructans only — onion, garlic, wheat, rye, leek and asparagus are the main food sources</Li>
          <Li>Fructan hydrolase denatures above about 60°C — don't take it with scalding hot food or drinks</Li>
          <Li>Not a substitute for the elimination phase — use it once you've confirmed fructans are a trigger</Li>
          <Li>It isn't cheap. Factor it in as a supplement for social or unavoidable situations rather than daily use</Li>
          <Li>Look for "endo-inulinase" or "fructan hydrolase" on the label — cheaper "inulinase" blends are usually slower exo enzymes</Li>
        </Ul>

        <Callout variant="success" title="The honest verdict">
          If onion and garlic are your main triggers and you've confirmed this through the reintroduction phase, FODzyme is probably the most targeted thing you can take. It won't work for everyone, but when it does, it's a meaningful quality-of-life improvement.
        </Callout>
      </>
    ),
  },

  {
    slug: 'milkaid',
    title: 'The Milkaid Thing Nobody Tells You',
    subtitle: 'The pharmacy version of this lactase supplement has raspberry flavouring. The website version doesn\'t. Here\'s why that matters for IBS.',
    excerpt: 'Milkaid is a lactase enzyme you take before dairy. What most people don\'t know: the flavoured version sold in pharmacies can add a separate trigger for IBS sufferers.',
    date: '2024-10-28',
    updatedDate: '2025-01-10',
    readTime: '4 min',
    tags: ['lactase', 'dairy', 'supplements'],
    category: 'Supplements',
    keywords: ['Milkaid', 'lactase supplement', 'lactose intolerance', 'dairy IBS', 'low FODMAP dairy', 'lactase enzyme capsules'],
    heroImage: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'A glass of milk on a wooden surface',
    heroCredit: 'Photo via Unsplash',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Lactase supplements like Milkaid help digest lactose, but the supermarket chewables include raspberry flavouring.',
      'The unflavoured capsule version is only available directly from milkaid.com — same dose, no additives.',
      'During strict elimination, lactose-free products are cleaner than relying on enzyme supplements.',
      'Once lactose is confirmed as a trigger in reintroduction, lactase supplements become a useful day-to-day tool.',
    ],
    references: [
      {
        label: 'Misselwitz et al. — Lactose intolerance: diagnosis and management',
        authors: 'Misselwitz B, Butter M, Verbeke K, Fox MR',
        journal: 'Gut',
        year: 2019,
        url: 'https://pubmed.ncbi.nlm.nih.gov/31196878/',
      },
      {
        label: 'Monash University — Lactose and the FODMAP diet',
        url: 'https://www.monashfodmap.com/blog/monashs-new-lactose-app/',
      },
    ],
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

        <H2 id="fix">The fix</H2>
        <P>
          The unflavoured capsule version is only available directly from the Milkaid website. The{' '}
          <a href="https://milkaid.com/product/milkaid-max-capsules-60s/" target="_blank" rel="noopener noreferrer">
            Milkaid Max Capsules (60s)
          </a>{' '}
          contain the enzyme — nothing else added. Same dose as the Max tablets, no raspberry, no unnecessary additives.
        </P>

        <Callout variant="tip" title="Flexibility bonus">
          The capsule format also lets you titrate the dose. For a splash of milk in coffee you can open the capsule and use half. The tablets don't split cleanly.
        </Callout>

        <H2 id="enzymes-vs-elimination">Enzymes vs the elimination diet</H2>
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
    subtitle: 'Why gluten-free diets help IBS sufferers — and why the reason isn\'t what most people think. A look at the Monash crossover trial that changed the conversation.',
    excerpt: 'A Monash University crossover trial showed fructans, not gluten, trigger IBS symptoms in people who think they\'re gluten-sensitive. The implications for how you eat are practical.',
    date: '2024-10-05',
    updatedDate: '2025-02-03',
    readTime: '6 min',
    tags: ['fructans', 'gluten', 'research'],
    category: 'Science',
    keywords: ['fructan vs gluten', 'non-coeliac gluten sensitivity', 'NCGS', 'sourdough IBS', 'gluten-free IBS', 'Monash fructan trial'],
    heroImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Fresh sourdough bread loaves on a dark surface',
    heroCredit: 'Photo via Unsplash',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'A 2017 Monash crossover trial on people who thought they were gluten-sensitive found fructans — not gluten — caused the symptoms.',
      'Gluten-free diets work because most gluten-containing foods are also high in fructans.',
      'Gluten-free products often add inulin or chicory root — both fructans — as fibre.',
      'Genuine long-fermented sourdough is usually tolerated because the starter breaks down most of the fructans.',
    ],
    references: [
      {
        label: 'Skodje et al. — Fructan, rather than gluten, induces symptoms in NCGS (2018)',
        authors: 'Skodje GI, Sarna VK, Minelle IH, et al.',
        journal: 'Gastroenterology',
        year: 2018,
        url: 'https://pubmed.ncbi.nlm.nih.gov/29102613/',
      },
      {
        label: 'Biesiekierski et al. — No effects of gluten in NCGS after low-FODMAP diet',
        journal: 'Gastroenterology',
        year: 2013,
        url: 'https://pubmed.ncbi.nlm.nih.gov/23648697/',
      },
      {
        label: 'Laatikainen et al. — Pilot trial: sourdough vs yeast-fermented bread in IBS',
        journal: 'Nutrients',
        year: 2017,
        url: 'https://pubmed.ncbi.nlm.nih.gov/29231880/',
      },
    ],
    content: (
      <>
        <P>
          A lot of people with IBS try going gluten-free, feel noticeably better, and conclude they're gluten-sensitive. It's a reasonable conclusion — but it's probably wrong.
        </P>
        <P>
          In 2018, Skodje and colleagues at the University of Oslo — working with the Monash group — ran a double-blind crossover trial on 59 people who believed they had non-coeliac gluten sensitivity. Each participant cycled through three diets: high-gluten, placebo, and fructan-containing. The result was clear. Fructans — <Em>not</Em> gluten — triggered significantly more bloating, gut pain and wind. On the low-fructan diet, symptoms dropped substantially. On the gluten variations, not so much.
        </P>

        <H2 id="why-gluten-free-works">Why gluten-free still works</H2>
        <P>
          Most foods that contain gluten also contain fructans. Wheat, rye and barley are all high-fructan grains. When you remove gluten from your diet you're also removing fructans. Symptoms improve, and gluten gets the credit.
        </P>
        <P>
          This matters practically because gluten-free and low-fructan are not the same thing. Gluten-free products often contain:
        </P>
        <Ul>
          <Li>Apple or pear juice (high excess fructose)</Li>
          <Li>Honey (high excess fructose)</Li>
          <Li>Inulin — a fructan added as a prebiotic fibre, often for texture and "gut health" marketing</Li>
          <Li>Chicory root extract — another concentrated fructan source</Li>
        </Ul>
        <P>
          A gluten-free bread made with inulin can trigger IBS symptoms as reliably as regular bread. The label says gluten-free. The FODMAP content says otherwise.
        </P>

        <H2 id="sourdough">The sourdough exception</H2>
        <P>
          Traditional sourdough is often tolerated by IBS sufferers even though it's made from wheat. The long fermentation process — 8–12 hours with a live starter culture — allows bacteria in the dough to break down most of the fructans before the bread reaches you. By the time it's baked, the fructan content is substantially lower.
        </P>

        <Callout variant="warning" title="Real sourdough vs supermarket sourdough">
          This only applies to genuine long-fermented sourdough. Most supermarket "sourdough" is regular bread with a small amount of vinegar or dried sourdough powder added for flavour. Check the ingredients list reads only flour, water, salt, and starter culture.
        </Callout>

        <H2 id="testing">What this means for testing</H2>
        <P>
          If you've never done a proper FODMAP elimination and reintroduction, you don't actually know whether gluten is a problem for you. (If you have coeliac disease, that's a different situation — coeliac is an immune response to gluten itself and requires strict avoidance regardless.) For everyone else, the fructan reintroduction challenge — not the gluten one — is the relevant experiment.
        </P>
        <P>
          The practical upside: if fructans rather than gluten are the issue, your restrictions are different and often more manageable. Gluten-free means avoiding a protein found in many grains. Low-fructan means watching specific foods — and at the right serving sizes, many gluten-containing foods (sourdough, small amounts of pasta) may still be on the table.
        </P>
      </>
    ),
  },

  {
    slug: 'inulinase-vs-fructan-hydrolase',
    title: 'Inulinase vs Fructan Hydrolase: Why It Matters Which One You\'re Getting',
    subtitle: 'Not all fructan-digesting enzymes work the same way — and the cheaper ones may be too slow to matter. A look at the mechanism.',
    excerpt: 'Endo and exo inulinases both break down fructans, but the endo enzyme works meaningfully faster within the short window of the small intestine. Cheaper supplements often use the slower exo type.',
    date: '2024-09-18',
    updatedDate: '2025-01-22',
    readTime: '5 min',
    tags: ['enzymes', 'science', 'fructans'],
    category: 'Science',
    keywords: ['inulinase', 'fructan hydrolase', 'endo inulinase', 'exo inulinase', 'FODMAP enzyme science', 'Aspergillus niger inulinase'],
    heroImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Laboratory glassware in a clean research setting',
    heroCredit: 'Photo via Unsplash',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Exo-inulinase cuts fructan chains one unit at a time — slow, and often not fast enough for meal-time use.',
      'Endo-inulinase (fructan hydrolase) cuts the chain internally at multiple points, working much faster.',
      'Cheaper generic "inulinase" supplements are usually the exo form from Aspergillus niger.',
      'Fructan hydrolase is heat-sensitive — take it with warm, not scalding, food.',
    ],
    references: [
      {
        label: 'Singh et al. — Inulinases: classification and industrial applications',
        journal: 'Critical Reviews in Food Science and Nutrition',
        year: 2017,
        url: 'https://pubmed.ncbi.nlm.nih.gov/26761813/',
      },
      {
        label: 'Tuck et al. — Fructan hydrolase enzyme trial (2022)',
        url: 'https://pubmed.ncbi.nlm.nih.gov/35347091/',
      },
    ],
    content: (
      <>
        <P>
          Both inulinase and fructan hydrolase break down fructans. Both appear on the labels of enzyme supplements. They're not the same thing, and the difference matters if you're trying to figure out why one supplement works better than another.
        </P>

        <H2 id="exo-vs-endo">Exo vs endo: how they cut</H2>
        <P>
          Fructan chains are long strings of fructose molecules. Enzymes that break them down differ in <Em>where</Em> on the chain they attack.
        </P>
        <Ul>
          <Li><strong>Exo-inulinase</strong> cuts from the end of the chain, releasing one fructose molecule at a time. Systematic, but slow. Like unravelling a rope one thread at a time from the tip.</Li>
          <Li><strong>Endo-inulinase (fructan hydrolase)</strong> cuts the chain internally, breaking it into shorter fragments simultaneously. Faster — more like cutting the rope in several places at once.</Li>
        </Ul>
        <P>
          When you take an enzyme supplement with a meal, you've got a limited window — roughly 2–4 hours in the small intestine — before partially digested food moves to the colon. The endo approach processes fructans substantially faster within that window. An exo enzyme might only get through a fraction of the chain before the contents move on.
        </P>

        <H2 id="supplements">Why this matters for supplements</H2>
        <P>
          Many cheaper enzyme supplements list "inulinase" on the label without specifying which type. If the source is <Em>Aspergillus niger</Em> — a common fungal source for food-grade enzymes — it's most likely an exo-inulinase. It'll work to some degree, but it's slower.
        </P>
        <P>
          FODzyme specifically uses an endo-inulinase sourced from a different organism and selected for its activity profile in the gut pH range. This is why it's more expensive than generic "inulinase" blends — and why the effect tends to be more pronounced.
        </P>

        <Callout variant="tip" title="What to look for on the label">
          When comparing enzyme supplements, look for "endo-inulinase" or "fructan hydrolase" rather than just "inulinase." The distinction isn't always on the label — it's worth checking the manufacturer's documentation or contacting them directly.
        </Callout>

        <H2 id="temperature">Temperature and pH sensitivity</H2>
        <P>
          Fructan hydrolase is sensitive to heat — it denatures above around 60°C. This is relevant in a few ways:
        </P>
        <Ul>
          <Li>Don't take it with boiling hot food or drink — let things cool slightly first</Li>
          <Li>The enzyme is stable at gut pH (around 5–7) but not at extremes</Li>
          <Li>Store supplements away from heat and humidity — bathroom cabinets are not ideal</Li>
        </Ul>
        <P>
          The gut environment is actually reasonably hospitable for this enzyme — the small intestine sits at around 37°C and pH 6–7.4, which is within the active range. The meal itself provides the right conditions, which is why timing with food matters.
        </P>

        <H2 id="bottom-line">The bottom line</H2>
        <P>
          If you've tried a fructan enzyme supplement and found it underwhelming, it's worth checking whether you were getting an exo or endo enzyme. The endo version isn't universally available and costs more, but the mechanism is meaningfully different — and the clinical evidence for FODzyme specifically is stronger than for generic blends.
        </P>
      </>
    ),
  },

  {
    slug: 'psyllium-husk',
    title: 'What the Research Actually Says About Psyllium Husk',
    subtitle: 'One of the better-studied supplements in IBS — a practical, evidence-based look at dosing, timing, and when it actually helps.',
    excerpt: 'Psyllium husk has stronger evidence than almost anything else in the gut-health aisle. It helps both IBS-D and IBS-C, doesn\'t ferment at normal doses, and costs almost nothing.',
    date: '2024-08-30',
    updatedDate: '2025-02-15',
    readTime: '7 min',
    tags: ['fibre', 'research', 'supplements'],
    category: 'Evidence',
    keywords: ['psyllium husk IBS', 'soluble fibre IBS', 'Metamucil IBS', 'IBS constipation fibre', 'low FODMAP fibre', 'Bijkerk psyllium trial'],
    heroImage: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'A bowl of whole oats and grains on a wooden surface',
    heroCredit: 'Photo via Unsplash',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'A landmark 2009 BMJ trial found psyllium significantly reduced IBS symptoms vs. placebo; wheat bran made things worse.',
      'Psyllium is a soluble gel-forming fibre — low FODMAP at 5 g, fermenting only at very high doses.',
      'It helps both IBS-D and IBS-C because it normalises transit in either direction.',
      'Start at 1 teaspoon daily with a full glass of water and give it 4–6 weeks before judging.',
    ],
    references: [
      {
        label: 'Bijkerk et al. — Soluble or insoluble fibre in IBS: randomised placebo controlled trial',
        authors: 'Bijkerk CJ, de Wit NJ, Muris JWM, et al.',
        journal: 'BMJ',
        year: 2009,
        url: 'https://pubmed.ncbi.nlm.nih.gov/19713235/',
      },
      {
        label: 'Moayyedi et al. — Effect of fibre supplementation on IBS (meta-analysis)',
        journal: 'American Journal of Gastroenterology',
        year: 2014,
        url: 'https://pubmed.ncbi.nlm.nih.gov/25070054/',
      },
      {
        label: 'Monash University — Psyllium on the low-FODMAP diet',
        url: 'https://www.monashfodmap.com/blog/is-psyllium-low-fodmap/',
      },
    ],
    content: (
      <>
        <P>
          Psyllium husk is one of the few IBS supplements with reasonably solid clinical evidence behind it. That doesn't mean it works for everyone — IBS is too variable for that — but the research is more credible than most things sold in the gut health aisle.
        </P>

        <H2 id="standout-study">The standout study</H2>
        <P>
          A 2009 trial in the BMJ (Bijkerk et al.) randomised 275 IBS patients to psyllium, wheat bran, or placebo over 12 weeks. Psyllium significantly reduced symptom severity. Wheat bran performed no better than placebo and made things worse for some participants.
        </P>
        <P>
          That last part is worth sitting with: insoluble fibre (wheat bran) — which gets pushed as broadly beneficial — actively worsened IBS in a subset of participants. Psyllium is predominantly soluble fibre, which behaves differently.
        </P>

        <H2 id="soluble-vs-insoluble">Why soluble vs insoluble matters</H2>
        <P>
          Insoluble fibre (wheat bran, bran cereal, raw vegetables) adds bulk and speeds transit — good for some types of constipation, bad if your gut is already irritated. It doesn't dissolve in water and passes through largely intact, which means it can physically irritate the gut lining.
        </P>
        <P>
          Soluble fibre dissolves and forms a gel in water. Psyllium is around 70% soluble fibre. The gel slows transit slightly, softens stool, and provides a food source for beneficial gut bacteria — without the fermentation that causes gas (the kind you get with FOS, inulin and GOS).
        </P>

        <H2 id="both-subtypes">IBS-D and IBS-C both respond</H2>
        <P>
          This is unusual. Most interventions help one subtype and worsen the other. Psyllium's gel-forming property regulates transit in both directions: it adds structure for watery stool in IBS-D, and provides bulk and softness to help with IBS-C. The mechanism is the same — it normalises rather than just accelerating or slowing.
        </P>

        <H2 id="fodmap-status">Low FODMAP status</H2>
        <P>
          Psyllium husk powder is low FODMAP at the standard dose (5 g). It doesn't ferment significantly in the colon at normal amounts, which is why it doesn't cause the gas that other fibres do. This makes it compatible with the elimination phase — it won't muddy the symptom picture the way, say, an inulin-containing supplement would.
        </P>

        <Callout variant="warning" title="Dose matters">
          At very high doses (20 g+), psyllium can become fermentable and cause bloating. Start low and stay at the dose that works — more is not automatically better.
        </Callout>

        <H2 id="how-to-take">How to actually take it</H2>
        <Ul>
          <Li>Start at 5 g (about 1 teaspoon) once a day — usually morning works well</Li>
          <Li>Mix with a full glass of water (at least 250 ml) — it needs liquid to form the gel. Without it, it can cause a blockage</Li>
          <Li>Give it 4–6 weeks before deciding whether it's helping. Short trials miss the cumulative effect</Li>
          <Li>Powder dissolves more completely than husks and tends to be gentler. Both are low FODMAP</Li>
          <Li>If you're on medication, take psyllium at least an hour apart — it can reduce absorption of some drugs</Li>
        </Ul>

        <H2 id="limits">What it won't do</H2>
        <P>
          Psyllium isn't a trigger treatment. It won't stop a flare caused by eating something high-FODMAP. Think of it as background infrastructure — something that keeps the gut more stable day-to-day, rather than a rescue tool.
        </P>
        <P>
          It also won't work for everyone. A significant proportion of IBS patients in the Bijkerk trial didn't respond. If you've been taking it correctly for 6 weeks and nothing's changed, it probably isn't your thing.
        </P>

        <Callout variant="success" title="The bottom line">
          Among the things you can actually take for IBS — most of which have weak or no evidence — psyllium sits near the top. Low risk, low cost, low FODMAP, and reasonably well-studied. A sensible starting point before anything more complex.
        </Callout>
      </>
    ),
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return articles.map((a) => a.slug);
}

export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const target = getArticle(slug);
  if (!target) return [];
  return articles
    .filter((a) => a.slug !== slug)
    .map((a) => ({ a, overlap: a.tags.filter((t) => target.tags.includes(t)).length }))
    .sort((x, y) => y.overlap - x.overlap)
    .slice(0, limit)
    .map((x) => x.a);
}
