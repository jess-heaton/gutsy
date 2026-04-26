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
    title: 'FODzyme Review: What It Actually Does (and What the Evidence Really Shows)',
    subtitle: 'Three enzymes targeting fructans, GOS, and lactose — but the clinical evidence is less robust than most reviews admit. Here\'s an honest look.',
    excerpt: 'FODzyme contains three FODMAP-targeting enzymes including fructan hydrolase, alpha-galactosidase, and lactase. The science is promising but less settled than most reviews suggest — here\'s what\'s real.',
    date: '2024-11-12',
    updatedDate: '2026-04-26',
    readTime: '7 min',
    tags: ['enzymes', 'fructans', 'supplements'],
    category: 'Supplements',
    keywords: ['FODzyme review', 'fructan hydrolase', 'garlic intolerance', 'onion IBS', 'FODMAP enzyme supplement', 'Kiwi Biosciences', 'alpha-galactosidase IBS'],
    heroImage: '/FODZYME-Pasta-2.png',
    heroAlt: 'Pasta dish with garlic and herbs',
    heroCredit: null,
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'FODzyme contains three enzymes: fructan hydrolase (garlic, onion, wheat), alpha-galactosidase (beans, legumes), and lactase (dairy) — not just fructans.',
      'The best available human evidence is a 2026 open-label cohort study — there is no published double-blind placebo-controlled RCT yet.',
      'It does not help with polyols (sorbitol, mannitol) and actually increases free fructose — caution if you have fructose malabsorption.',
      'Denatures above 60°C / 140°F — add it just before eating, not to steaming hot food.',
    ],
    references: [
      {
        label: 'Castro Ochoa et al. — In vitro efficacy of FODZYME in simulated GI environment (2023)',
        authors: 'Castro Ochoa KF, Samant S, Liu A, et al.',
        journal: 'Gastro Hep Advances',
        year: 2023,
        url: 'https://www.sciencedirect.com/science/article/pii/S2772572322001844',
      },
      {
        label: 'Kaye et al. — Real-world cohort study of FODMAP-targeting enzyme blend (2026)',
        authors: 'Kaye G, Meyers A, Hachuel D, Wells A, Wallach T, Thor P, et al.',
        journal: 'Gastro Hep Advances',
        year: 2026,
        url: 'https://www.ghadvances.org/article/S2772-5723(26)00019-1/fulltext',
      },
      {
        label: 'Monash University — FODzyme digestive enzymes for FODMAPs',
        url: 'https://www.monashfodmap.com/blog/fodzyme-digestive-enzymes-designed-for-fodmaps/',
      },
      {
        label: 'Biesiekierski et al. — Fructans, not gluten, as the cause of symptoms in non-coeliac gluten sensitivity (2018)',
        authors: 'Biesiekierski JR, Peters SL, Newnham ED, et al.',
        journal: 'Gastroenterology',
        year: 2018,
        url: 'https://pubmed.ncbi.nlm.nih.gov/29102613/',
      },
      {
        label: 'NCT06628869 — Effects of oral fructanase on GI symptoms after inulin challenge (ongoing RCT)',
        url: 'https://clinicaltrials.gov/study/NCT06628869',
      },
    ],
    content: (
      <>
        <P>
          Garlic and onion are in almost everything. Restaurant food, stock cubes, most sauces, family dinners you can't quietly opt out of. If fructans are your trigger, you've probably resigned yourself to the choice between suffering or spending social energy explaining yourself.
        </P>
        <P>
          FODzyme, made by Boston-based biotech Kiwi Biosciences (Y Combinator-backed, founded 2020), takes a different approach: break the problematic molecules down before they reach your colon. Sprinkle the powder on your food at the start of the meal and the enzymes get to work in your small intestine.
        </P>
        <P>
          It's a genuinely interesting product. But a lot of what's written about it online is either inaccurate or oversimplified. Here's what the evidence actually shows.
        </P>

        <H2 id="how-it-works">What's actually in it — three enzymes, not one</H2>
        <P>
          Most reviews describe FODzyme as a "fructan enzyme." That's underselling it. The current formulation contains three separate enzymes:
        </P>
        <Ul>
          <Li><Em>Fructan hydrolase</Em> — breaks down fructans found in garlic, onion, wheat, rye, leek, and asparagus</Li>
          <Li><Em>Alpha-galactosidase</Em> — breaks down GOS (galacto-oligosaccharides) in beans, lentils, and legumes</Li>
          <Li><Em>Lactase</Em> — breaks down lactose in dairy products</Li>
        </Ul>
        <P>
          This makes it meaningfully broader than a single-enzyme product like Beano (alpha-galactosidase only) or standard lactase tablets. The fructan hydrolase is the novel piece — it's derived from <Em>Aspergillus tubingensis</Em> and has both endo and exo activity, meaning it cleaves fructan chains at internal points and at the ends.
        </P>
        <P>
          One important consequence of how fructan hydrolase works: breaking down fructans releases free fructose. If fructose malabsorption is one of your triggers, that released fructose could cause problems. FODzyme is not suitable for people with fructose intolerance.
        </P>

        <Callout variant="tip" title="Timing matters">
          Add FODzyme to your food right before eating — not before or after. The powder form is intentional: it means the enzymes can mix directly with food in the stomach. Eat within a few minutes of adding it.
        </Callout>

        <H2 id="evidence">What the research actually shows</H2>
        <P>
          This is where a lot of reviews get it wrong. FODzyme does not yet have a published randomised, double-blind, placebo-controlled clinical trial in IBS patients. The existing evidence is:
        </P>
        <Ul>
          <Li><Em>2023 in vitro study</Em> (Castro Ochoa et al., <Em>Gastro Hep Advances</Em>) — tested FODZYME in a validated laboratory simulator of the human GI tract (SHIME®). Found 90% of inulin degraded within 30 minutes, with reduced gas production. This is lab evidence, not human trial evidence.</Li>
          <Li><Em>2026 real-world cohort study</Em> (Kaye et al., <Em>Gastro Hep Advances</Em>) — 118 participants who had purchased FODzyme completed surveys at baseline and 4 weeks. 78% reported clinically meaningful improvement in bloating and flatulence; 65% in abdominal pain. This was open-label (no placebo group), so placebo effect cannot be ruled out. Funded by Kiwi Biosciences, though independently analysed.</Li>
          <Li><Em>2024 safety study</Em> — randomised, placebo-controlled, showing a good safety profile with no serious adverse events.</Li>
          <Li><Em>Ongoing RCT</Em> (NCT06628869) — a proper double-blind crossover trial testing fructanase after a 25g inulin challenge. Results pending.</Li>
        </Ul>
        <P>
          The 2026 cohort results are encouraging, and the in vitro mechanism is well-supported. But the honest summary is: we don't yet have a published gold-standard trial. The product may well work — but be appropriately sceptical of reviews that treat the current evidence as definitive.
        </P>

        <H2 id="wheat-gluten">What about "wheat sensitivity"?</H2>
        <P>
          Research by Biesiekierski et al. found that many people who believe they react to gluten are actually reacting to fructans in wheat — not gluten itself. FODzyme can help that group by degrading the fructans before they ferment.
        </P>
        <P>
          It does not break down gluten protein. It will not help anyone with coeliac disease and is not a substitute for a gluten-free diet in that context. The overlap between "I react to wheat" and "I react to fructans in wheat" is significant but not total.
        </P>

        <H2 id="practical">Before you buy</H2>
        <Ul>
          <Li>Denatures above 60°C / 140°F — if it's too hot to comfortably hold in your mouth, it's too hot for FODzyme. Works well with room-temperature, warm, and chilled foods.</Li>
          <Li>Does not work on polyols (sorbitol, mannitol) — if stone fruit, mushrooms, or artificial sweeteners are triggers, FODzyme won't help with those.</Li>
          <Li>Not for fructose malabsorption — the enzyme breaks fructans into free fructose, which may worsen symptoms if fructose is also a trigger for you.</Li>
          <Li>Use it after your elimination and reintroduction phases, once you know what your actual triggers are — not as a shortcut through elimination.</Li>
          <Li>The powder (jar or stick packs) works faster than capsules because it contacts food directly in the stomach. The stick packs are convenient for eating out.</Li>
          <Li>Pricing is around £55–65 for 60 doses on subscription. At roughly £1 per meal, it's not cheap — most useful for unavoidable situations rather than every meal.</Li>
        </Ul>

        <Callout variant="success" title="The honest verdict">
          FODzyme is the most targeted product available for fructan, GOS, and lactose sensitivity, and the mechanism is sound. The evidence isn't as strong as most reviews imply — there's no published RCT yet — but the real-world cohort data is promising and the safety profile is good. If you've completed reintroduction and know fructans are your main trigger, it's worth trying cautiously.
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
    heroImage: '/almond-milk.png',
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

  {
    slug: 'ttg-iga-celiac-testing',
    title: 'The tTG-IgA Test: How to Properly Test for Coeliac Disease',
    subtitle: 'The blood test most people get told to take — and the critical mistake that makes it come back falsely negative. A plain-English guide to doing this properly.',
    excerpt: 'The tTG-IgA blood test is the standard first step for diagnosing coeliac disease — but if you\'ve already cut out gluten, it will almost certainly come back negative even if you have coeliac. Here\'s what you need to know before you test.',
    date: '2026-04-20',
    readTime: '8 min',
    tags: ['coeliac', 'testing', 'science'],
    category: 'Science',
    keywords: [
      'tTG-IgA test', 'coeliac disease test', 'celiac blood test', 'how to test for coeliac',
      'anti-tissue transglutaminase', 'IgA deficiency coeliac', 'gluten challenge', 'coeliac vs IBS',
      'coeliac diagnosis UK', 'false negative coeliac test',
    ],
    heroImage: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Blood sample vials in a clinical laboratory',
    heroCredit: 'Photo via Unsplash',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'You must be eating gluten daily for at least 6 weeks before the tTG-IgA test — otherwise it will likely come back falsely negative.',
      'Around 1 in 30 people have IgA deficiency, which can make the tTG-IgA test misleading — a total IgA level should always be checked at the same time.',
      'A positive tTG-IgA is not a diagnosis on its own — a specialist referral and usually a biopsy is needed to confirm.',
      'If you\'ve already gone gluten-free, you can still get tested, but you\'ll need to do a formal gluten challenge first.',
      'Genetic testing (HLA-DQ2/DQ8) can rule coeliac out completely — if you don\'t carry those genes, coeliac is essentially impossible.',
    ],
    references: [
      {
        label: 'NICE — Coeliac disease: recognition, assessment and management (NG20)',
        journal: 'National Institute for Health and Care Excellence',
        year: 2015,
        url: 'https://www.nice.org.uk/guidance/ng20',
      },
      {
        label: 'Rubio-Tapia et al. — ACG Clinical Guidelines: Diagnosis and Management of Celiac Disease',
        authors: 'Rubio-Tapia A, Hill ID, Kelly CP, et al.',
        journal: 'American Journal of Gastroenterology',
        year: 2013,
        url: 'https://pubmed.ncbi.nlm.nih.gov/23609613/',
      },
      {
        label: 'Catassi C, Fasano A — Celiac disease diagnosis: simple rules are better than complicated algorithms',
        authors: 'Catassi C, Fasano A',
        journal: 'American Journal of Medicine',
        year: 2010,
        url: 'https://pubmed.ncbi.nlm.nih.gov/20399314/',
      },
      {
        label: 'Volta et al. — IgA anti-tissue transglutaminase antibodies as predictors of silent coeliac disease',
        authors: 'Volta U, Molinaro N, De Franceschi L, et al.',
        journal: 'Scandinavian Journal of Gastroenterology',
        year: 1998,
        url: 'https://pubmed.ncbi.nlm.nih.gov/9517537/',
      },
      {
        label: 'Rashid M, Lee J — Serologic testing in coeliac disease',
        authors: 'Rashid M, Lee J',
        journal: 'Canadian Family Physician',
        year: 2016,
        url: 'https://pubmed.ncbi.nlm.nih.gov/27606794/',
      },
      {
        label: 'Leffler DA, Schuppan D — Update on serologic testing in celiac disease',
        authors: 'Leffler DA, Schuppan D',
        journal: 'American Journal of Gastroenterology',
        year: 2010,
        url: 'https://pubmed.ncbi.nlm.nih.gov/20485286/',
      },
    ],
    content: (
      <>
        <P>
          If you've been having gut symptoms — bloating, chronic diarrhoea, stomach pain, unexplained fatigue — your GP will probably suggest a blood test for coeliac disease. The test is called the tTG-IgA. It's widely available, relatively cheap, and a good first step.
        </P>
        <P>
          But there's a catch that a surprising number of people — and even some GPs — don't mention: if you've already cut gluten out of your diet, the test will almost certainly come back negative even if you have coeliac disease. That false negative can follow someone for years, leaving them without a proper diagnosis and without knowing whether they need to be strictly gluten-free for life.
        </P>
        <P>
          This article explains what the tTG-IgA test actually measures, how to make sure you do it correctly, and what to do if the situation is more complicated.
        </P>

        <H2 id="what-it-measures">What tTG-IgA actually tests for</H2>
        <P>
          Let's start with the basics. Coeliac disease is an autoimmune condition — not a food intolerance. When someone with coeliac disease eats gluten (the protein found in wheat, rye and barley), their immune system treats it as an attack and produces antibodies against it.
        </P>
        <P>
          One of those antibodies targets an enzyme in the gut wall called <Em>tissue transglutaminase</Em> (tTG). The blood test measures how much anti-tTG antibody is present in your blood. The "IgA" part refers to the class of antibody being measured — IgA is the type the immune system typically produces in the gut lining.
        </P>
        <P>
          In plain terms: the test detects whether your immune system is actively fighting something it thinks is being caused by gluten in your gut. If there's no gluten coming in, there's nothing for the immune system to react to — and the antibody levels fall. That's why eating gluten before the test is non-negotiable.
        </P>

        <Callout variant="warning" title="The most common mistake">
          Many people suspect coeliac disease, cut out gluten to see if they feel better, feel better (for various reasons), and then get tested — and get a negative result. That negative result does not mean they don't have coeliac. It means the test couldn't detect it.
        </Callout>

        <H2 id="gluten-first">You must be eating gluten before the test</H2>
        <P>
          Current UK guidelines (NICE NG20) and international guidelines both require that you eat a normal gluten-containing diet for at least <Em>6 weeks</Em> before a tTG-IgA blood test. This means actual gluten, every day — bread, pasta, cereals — not just occasional exposure.
        </P>
        <P>
          The exact amount recommended is roughly <Em>2 slices of regular wheat bread per day</Em> (or equivalent). Less than this and antibody levels may not be reliably elevated, even in someone with active coeliac disease.
        </P>

        <Callout variant="tip" title="What counts as gluten exposure">
          Gluten is found in: wheat (bread, pasta, cereals, pizza, biscuits), rye (rye bread, some crispbreads), and barley (beer, malt vinegar, some soups). Oats are naturally gluten-free but are often contaminated — for testing purposes, stick to regular wheat products.
        </Callout>

        <P>
          If you've been eating gluten normally and your symptoms prompted you to get tested — brilliant, you don't need to change anything before the test. The problem arises when people have already changed their diet before seeking a diagnosis.
        </P>

        <H2 id="iga-deficiency">The false negative nobody warns you about: IgA deficiency</H2>
        <P>
          Even if you've been eating gluten consistently, the tTG-IgA test can still come back falsely negative in one important scenario: IgA deficiency.
        </P>
        <P>
          Around 1 in 30 people have lower-than-normal levels of IgA antibodies in their blood — not because of any problem, just natural variation. If you can't produce enough IgA, you can't produce enough anti-tTG IgA — so the test will look negative even if coeliac disease is present.
        </P>
        <P>
          This is why the tTG-IgA test should <Em>always</Em> be ordered alongside a <Em>total serum IgA</Em> level. The total IgA tells you whether your body is even capable of producing IgA antibodies in meaningful quantities. If IgA comes back low, the tTG-IgA result is unreliable, and the doctor should order a different test — usually a tTG-IgG or DGP-IgG antibody test instead.
        </P>
        <P>
          Ask your GP directly: <Em>"Are you testing my total IgA as well?"</Em> If they only order the tTG-IgA alone, you could get a false all-clear.
        </P>

        <H2 id="reading-results">What the numbers mean</H2>
        <P>
          The result will usually come back as a number with a reference range — something like "12 U/mL (normal: below 7 U/mL)". Different labs use different units and thresholds, so what matters is how your result compares to your lab's normal range, not the raw number.
        </P>
        <Ul>
          <Li><strong>Clearly positive (more than 10× the upper limit of normal)</strong> — This is strongly suggestive of coeliac disease. In children, guidelines now allow a diagnosis without biopsy at this level. In adults, a referral and biopsy is still usually needed.</Li>
          <Li><strong>Mildly elevated (just above normal)</strong> — Borderline results need further investigation. They could indicate coeliac, early coeliac, or something else. Don't ignore a borderline result.</Li>
          <Li><strong>Normal (within reference range)</strong> — If you've been eating gluten consistently for 6+ weeks and your total IgA is also normal, a negative result makes coeliac unlikely. Not impossible, but unlikely.</Li>
        </Ul>

        <Callout variant="tip" title="A positive blood test is not a diagnosis">
          A raised tTG-IgA gets you referred to a gastroenterologist — it doesn't confirm coeliac on its own. The definitive diagnosis in adults still usually requires an endoscopy with small bowel biopsies, which look directly at whether gluten has damaged the gut lining.
        </Callout>

        <H2 id="after-positive">What happens after a positive result</H2>
        <P>
          A positive tTG-IgA should trigger a referral to a gastroenterologist or specialist. From there, you'll usually be offered a gastroscopy (endoscopy) — a camera passed down through your mouth into the small intestine, with tiny biopsy samples taken from the gut lining.
        </P>
        <P>
          The biopsies look for characteristic damage called <Em>villous atrophy</Em> — the tiny finger-like projections lining the gut wall become blunted or worn away in coeliac disease, reducing the surface area for nutrient absorption. This damage is what causes the symptoms and the long-term complications of undiagnosed coeliac (anaemia, bone density loss, fertility problems, and others).
        </P>
        <P>
          Critically: you need to keep eating gluten until after the biopsy. Going gluten-free between your blood test and your endoscopy will allow the gut lining to start healing, which can make the biopsy look normal even if you have coeliac.
        </P>

        <H2 id="already-gone-gluten-free">If you've already gone gluten-free</H2>
        <P>
          This is a common situation. You cut out gluten, felt better, then discovered you should have tested first. You have options — but none of them are simple.
        </P>
        <P>
          The standard approach is a <Em>gluten challenge</Em>: reintroducing a set amount of gluten daily for a minimum of 6 weeks before retesting with the blood test, or 2 weeks before an endoscopy biopsy. For many people, this is unpleasant — you're deliberately triggering symptoms you've worked to avoid — but it's the only way to get a reliable result if you want a confirmed diagnosis.
        </P>
        <P>
          A confirmed diagnosis matters for several reasons:
        </P>
        <Ul>
          <Li>If you have coeliac disease, trace exposure (cross-contamination, hidden gluten in sauces) matters medically — not just as a preference</Li>
          <Li>Family members should be screened if you have confirmed coeliac — it's strongly genetic</Li>
          <Li>You may be eligible for NHS dietitian support and monitoring</Li>
          <Li>It changes how seriously you and others need to take your dietary needs in medical and social contexts</Li>
        </Ul>

        <P>
          If you genuinely can't or won't do a gluten challenge, genetic testing offers a partial answer.
        </P>
        <P>
          Coeliac disease is almost always associated with specific gene variants called HLA-DQ2 and HLA-DQ8. If you test negative for both, coeliac disease is essentially ruled out — the negative predictive value is very high. This test doesn't diagnose coeliac, but it can confirm you don't have the genetic predisposition needed for it to develop.
        </P>

        <Callout variant="success" title="When to suspect coeliac vs IBS vs something else">
          Coeliac and IBS overlap significantly in symptoms — both cause bloating, pain, and altered bowel habits. Pointers that make coeliac more likely: symptoms that started after significant gut illness, unexplained iron-deficiency or B12 deficiency, osteoporosis younger than expected, a first-degree relative with confirmed coeliac, or symptoms that have never improved even on a strict low-FODMAP diet. Any of these alongside gut symptoms warrants testing before assuming IBS.
        </Callout>
      </>
    ),
  },

  // ── IS X LOW FODMAP? series ──────────────────────────────────────────────

  {
    slug: 'is-banana-low-fodmap',
    title: 'Is Banana Low FODMAP?',
    subtitle: 'Ripeness makes a dramatic difference — here\'s exactly which banana is safe for IBS and why overripe is the worst choice.',
    excerpt: 'Unripe bananas are low FODMAP; overripe ones are high in free fructose. Ripeness and portion size both matter enormously.',
    date: '2025-03-01',
    readTime: '4 min',
    tags: ['fodmap', 'fruit', 'fructose'],
    category: 'Diet',
    keywords: ['is banana low FODMAP', 'banana IBS', 'banana FODMAP', 'ripe banana IBS', 'unripe banana low FODMAP', 'FODMAP fruit list'],
    heroImage: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Fresh yellow bananas on a wooden surface',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Unripe (slightly green) bananas are low FODMAP at 1 medium (100 g).',
      'Ripe (fully yellow, no spots) bananas are low FODMAP only at a small 81 g portion.',
      'Overripe bananas — used in baking — are high FODMAP due to excess free fructose.',
      'Stick to slightly underripe bananas for the most predictable gut response.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Banana', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
      { label: 'Gibson PR, Shepherd SJ — Evidence-based dietary management of functional GI symptoms', journal: 'Journal of Gastroenterology and Hepatology', year: 2010, url: 'https://pubmed.ncbi.nlm.nih.gov/20136989/' },
    ],
    content: (
      <>
        <P>Bananas are one of the most popular fruits on earth — and for people with IBS, one of the most confusing. The answer isn't simply yes or no: it depends almost entirely on how ripe the banana is.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <P>Monash University — who maintain the gold-standard FODMAP database — rate bananas as follows:</P>
        <Ul>
          <Li>Unripe (firm, some green on skin): <Em>low FODMAP</Em> at 1 medium (100 g)</Li>
          <Li>Ripe (fully yellow, soft): <Em>low FODMAP</Em> at a small portion (81 g) only</Li>
          <Li>Overripe (brown spots, very soft): <Em>high FODMAP</Em> — excess fructose</Li>
        </Ul>
        <P>As a banana ripens, starches break down into free sugars. The proportion of fructose relative to glucose rises — and when fructose exceeds glucose, the excess passes into the colon and ferments, triggering IBS symptoms in sensitive people.</P>
        <H2 id="portions">Portion size in practice</H2>
        <Callout variant="tip" title="Buy slightly underripe">
          Purchase bananas when still slightly green and eat them within a day or two. This gives you the lowest fructose load with the most room for error on portion size.
        </Callout>
        <P>Bananas vary widely in size. A large banana can weigh 150 g — well over the safe threshold for ripe fruit. Weigh until you have a sense of what 100 g looks like.</P>
        <H2 id="practical">Safe ways to eat bananas on a low-FODMAP diet</H2>
        <Ul>
          <Li>Eat unripe or just-ripe bananas as a snack — portable and filling</Li>
          <Li>Slice into oatmeal or rice-based cereal</Li>
          <Li>Blend into smoothies when still firm (frozen unripe banana works well)</Li>
          <Li>Avoid banana bread — traditional recipes deliberately use overripe bananas</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-avocado-low-fodmap',
    title: 'Is Avocado Low FODMAP?',
    subtitle: 'Avocado is high in polyols — but a very small serving fits within the low-FODMAP threshold. Here\'s exactly how much you can eat.',
    excerpt: 'Avocado contains sorbitol and mannitol but is low FODMAP at a small 30 g (one-eighth) serving. Larger portions are a common IBS trigger.',
    date: '2025-03-02',
    readTime: '4 min',
    tags: ['fodmap', 'fruit', 'polyols'],
    category: 'Diet',
    keywords: ['is avocado low FODMAP', 'avocado IBS', 'avocado FODMAP', 'guacamole low FODMAP', 'polyol foods IBS', 'avocado serving size IBS'],
    heroImage: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Halved avocado showing the stone inside',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Avocado is low FODMAP at a very small 30 g serving (about one-eighth of a fruit).',
      'A standard half-avocado (75 g) is high FODMAP — sorbitol is the main culprit.',
      'Guacamole made with large avocado portions, plus added garlic/onion, is almost always high FODMAP.',
      'Use a small sliced portion as a topping rather than eating avocado as a standalone.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Avocado', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
      { label: 'Halmos EP et al. — A diet low in FODMAPs reduces symptoms of IBS', journal: 'Gastroenterology', year: 2014, url: 'https://pubmed.ncbi.nlm.nih.gov/24076059/' },
    ],
    content: (
      <>
        <P>Avocado has earned superfood status for its healthy fats, but its FODMAP content catches many IBS patients off guard. The fruit is rich in sorbitol — a polyol that is poorly absorbed in the small intestine and rapidly fermented in the colon.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>30 g (one-eighth of an avocado): <Em>low FODMAP</Em></Li>
          <Li>75 g (one-quarter): <Em>moderate FODMAP</Em> — sorbitol approaching threshold</Li>
          <Li>125 g (one-half): <Em>high FODMAP</Em> — clearly symptomatic for most sensitive people</Li>
        </Ul>
        <P>The sorbitol content in avocado is meaningful — even a quarter of a fruit can push some people over their personal threshold, especially if they have stacked other polyol sources in the same meal.</P>
        <H2 id="guacamole">What about guacamole?</H2>
        <Callout variant="warning" title="Guacamole is almost always high FODMAP">
          Most guacamole recipes use a whole avocado per serving plus garlic and onion. Even if you make it at home with no added aromatics, the avocado portion alone usually exceeds the low-FODMAP limit.
        </Callout>
        <P>If you want guacamole, make it at home with 30 g of avocado per serving, lemon juice, tomato, and a pinch of cumin. Skip the garlic — use garlic-infused olive oil for the flavour without the fructans.</P>
        <H2 id="practical">How to enjoy avocado safely</H2>
        <Ul>
          <Li>Slice a small wedge (30 g) onto salads or grain bowls</Li>
          <Li>Use as a thin spread on low-FODMAP sourdough bread</Li>
          <Li>Add to smoothies in a 30 g portion alongside other low-FODMAP ingredients</Li>
          <Li>Weigh portions until you have a reliable visual sense — avocados vary hugely in size</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-oatmeal-low-fodmap',
    title: 'Is Oatmeal Low FODMAP?',
    subtitle: 'Oats are one of the most useful breakfast staples on a low-FODMAP diet — but portion size and toppings make or break it.',
    excerpt: 'Plain rolled oats are low FODMAP at 52 g dry. Oatmeal is a safe, filling, high-fibre breakfast option for most people with IBS.',
    date: '2025-03-03',
    readTime: '4 min',
    tags: ['fodmap', 'grains', 'breakfast'],
    category: 'Diet',
    keywords: ['is oatmeal low FODMAP', 'oats IBS', 'oatmeal FODMAP', 'porridge low FODMAP', 'low FODMAP breakfast', 'rolled oats FODMAP'],
    heroImage: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Bowl of oatmeal topped with fresh fruit',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Rolled oats are low FODMAP at 52 g dry (about ½ cup) — a normal breakfast-sized portion.',
      'Instant flavoured oats often contain high-FODMAP additives like honey, apple, or inulin — read labels.',
      'Cook with lactose-free milk or a certified low-FODMAP plant milk (e.g. rice milk).',
      'Toppings matter: banana, blueberries, maple syrup, and walnuts all pair well within FODMAP limits.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Rolled Oats', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
      { label: 'Staudacher HM et al. — Comparison of symptom response in IBS with low FODMAP diet vs standard advice', journal: 'Journal of Human Nutrition and Dietetics', year: 2011, url: 'https://pubmed.ncbi.nlm.nih.gov/21615553/' },
    ],
    content: (
      <>
        <P>Oatmeal — or porridge, if you're British — is one of the few truly convenient, filling breakfasts that works on a low-FODMAP diet. Plain rolled oats come in well under the threshold for all FODMAP categories at a standard serving size.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Rolled oats 52 g dry (½ cup): <Em>low FODMAP</Em></Li>
          <Li>Steel-cut oats 52 g dry: <Em>low FODMAP</Em></Li>
          <Li>Instant plain oats 52 g: <Em>low FODMAP</Em></Li>
          <Li>Instant flavoured sachets: <Em>check label</Em> — often contain honey, apple, or chicory root</Li>
        </Ul>
        <P>Oats contain small amounts of GOS and fructans, but at a standard portion they don't exceed the threshold that triggers symptoms in most people.</P>
        <H2 id="toppings">The toppings problem</H2>
        <Callout variant="warning" title="Toppings can flip a safe bowl into a trigger">
          A plain oat bowl is fine — but adding honey (high fructose), dried fruit, or a large ripe banana can push total FODMAPs over your threshold before you've left the breakfast table.
        </Callout>
        <P>Safe topping combinations: sliced unripe banana + walnuts (10 nuts max), blueberries (40 g) + maple syrup, or sliced strawberries + a spoonful of peanut butter.</P>
        <H2 id="milk">Which milk to cook with</H2>
        <Ul>
          <Li>Lactose-free cow's milk: low FODMAP</Li>
          <Li>Rice milk (plain): low FODMAP</Li>
          <Li>Unsweetened almond milk (250 ml): low FODMAP</Li>
          <Li>Oat milk: <Em>check label</Em> — some brands add inulin or are made from concentrated oat extract higher in GOS</Li>
          <Li>Regular cow's milk: high FODMAP (lactose)</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-coffee-low-fodmap',
    title: 'Is Coffee Low FODMAP?',
    subtitle: 'Good news for caffeine dependants: black coffee is low FODMAP. The problem is almost always what you put in it.',
    excerpt: 'Plain black coffee — espresso, filter, instant — is low FODMAP. Milk additions, flavoured syrups, and large volumes are the common pitfalls.',
    date: '2025-03-04',
    readTime: '4 min',
    tags: ['fodmap', 'drinks', 'caffeine'],
    category: 'Diet',
    keywords: ['is coffee low FODMAP', 'coffee IBS', 'coffee FODMAP', 'espresso low FODMAP', 'caffeine IBS', 'low FODMAP drinks'],
    heroImage: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Espresso shot in a white cup on a saucer',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Black coffee (espresso, filter, instant) is low FODMAP — no significant FODMAP content.',
      'Milk is the most common IBS problem with coffee — use lactose-free or a certified low-FODMAP plant milk.',
      'Flavoured syrups, especially caramel and hazelnut, often contain high-fructose corn syrup or chicory root.',
      'Caffeine itself can independently stimulate the gut — even low-FODMAP coffee can worsen IBS-D via this mechanism.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Coffee', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
      { label: 'Rao SSC et al. — Is coffee a colonic stimulant?', journal: 'European Journal of Gastroenterology & Hepatology', year: 1998, url: 'https://pubmed.ncbi.nlm.nih.gov/9581995/' },
    ],
    content: (
      <>
        <P>If you have IBS, the prospect of giving up coffee is a grim one. Fortunately, you don't have to — at least not for FODMAP reasons. The coffee itself is fine. The variables that cause problems are milk, syrups, and volume.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Espresso (1–2 shots): <Em>low FODMAP</Em></Li>
          <Li>Filter / drip coffee (250 ml): <Em>low FODMAP</Em></Li>
          <Li>Instant coffee (1 tsp / 250 ml): <Em>low FODMAP</Em></Li>
          <Li>Chicory coffee blends: <Em>high FODMAP</Em> — chicory root is inulin/fructan</Li>
          <Li>Coffee with regular milk: <Em>high FODMAP</Em> — lactose from milk</Li>
        </Ul>
        <H2 id="milk">Sorting out your milk</H2>
        <Callout variant="tip" title="Switch the milk, keep the coffee">
          Lactose-free milk froths identically to regular milk and makes a proper flat white or latte with no FODMAP concerns. Unsweetened almond milk (250 ml) also works for most café-style drinks.
        </Callout>
        <P>Oat milk deserves a special mention: some brands are low FODMAP, others aren't. The concentration of GOS varies by production method. Look for Monash-certified options if oat milk is your preference.</P>
        <H2 id="caffeine">Caffeine as a separate gut irritant</H2>
        <P>Even with perfect FODMAP compliance, caffeine stimulates the gastrocolic reflex — the wave of muscle contractions that moves content through the colon. In people with IBS-D (diarrhoea-predominant), this can trigger urgency regardless of the FODMAP status of the coffee. If symptoms persist despite switching to low-FODMAP milk, consider reducing overall caffeine intake rather than eliminating coffee entirely.</P>
      </>
    ),
  },

  {
    slug: 'is-garlic-low-fodmap',
    title: 'Is Garlic Low FODMAP?',
    subtitle: 'Garlic is one of the highest-fructan foods tested — but there is a way to get the flavour without the FODMAPs.',
    excerpt: 'Fresh garlic is high FODMAP in any amount. Garlic-infused olive oil is the established low-FODMAP workaround that actually delivers the flavour.',
    date: '2025-03-05',
    readTime: '5 min',
    tags: ['fodmap', 'fructans', 'cooking'],
    category: 'Diet',
    keywords: ['is garlic low FODMAP', 'garlic IBS', 'garlic FODMAP', 'garlic-infused oil FODMAP', 'fructan foods', 'low FODMAP cooking without garlic'],
    heroImage: '/garlic.png',
    heroAlt: 'Garlic bulbs and cloves on a rustic wooden board',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Fresh garlic is high FODMAP at any amount — even a fraction of a clove is enough to trigger symptoms in sensitive individuals.',
      'Garlic-infused olive oil is low FODMAP — fructans are water-soluble and don\'t transfer into oil.',
      'Garlic powder is also high FODMAP (concentrated fructans); asafoetida (hing) is a low-FODMAP alternative.',
      'Ready-made sauces and soups almost always contain garlic — check every label during the elimination phase.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Garlic', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
      { label: 'Tuck CJ et al. — Fructan hydrolase enzyme for IBS (2022)', journal: 'Clinical and Translational Gastroenterology', year: 2022, url: 'https://pubmed.ncbi.nlm.nih.gov/35347091/' },
    ],
    content: (
      <>
        <P>Garlic is arguably the highest-risk FODMAP food in practical cooking. It's in almost everything — restaurant dishes, stock cubes, pasta sauces, spice blends — and even small amounts contain enough fructans to cause significant symptoms in IBS patients who are fructan-sensitive.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Fresh garlic clove (any amount): <Em>high FODMAP</Em></Li>
          <Li>Garlic powder / granules: <Em>high FODMAP</Em></Li>
          <Li>Garlic salt: <Em>high FODMAP</Em> (contains garlic powder)</Li>
          <Li>Garlic-infused olive oil: <Em>low FODMAP</Em></Li>
          <Li>Asafoetida (hing) powder in oil: <Em>low FODMAP</Em> (the pure resin form)</Li>
        </Ul>
        <H2 id="infused-oil">Why garlic-infused oil is safe</H2>
        <P>Fructans — garlic's problematic FODMAP — are water-soluble, not fat-soluble. When garlic is steeped in oil, the flavour compounds transfer across but the fructans stay behind. This is why commercially produced garlic-infused olive oil is reliably low FODMAP, provided no garlic particles remain in the oil.</P>
        <Callout variant="warning" title="Don't DIY infused oil with garlic pieces">
          Homemade garlic oil with the cloves left in is not equivalent to commercial infused oil — and carries a botulism risk if stored incorrectly. Use a certified commercial product or make fresh portions that you use immediately.
        </Callout>
        <H2 id="practical">Cooking without garlic</H2>
        <Ul>
          <Li>Use garlic-infused olive oil as the base for frying or dressings</Li>
          <Li>Add asafoetida (a pinch in hot oil) for a similar savoury depth</Li>
          <Li>Use the green tops of spring onions (scallions) — they're low FODMAP and provide an allium note</Li>
          <Li>During re-introduction, test garlic in a small controlled amount — some people tolerate modest portions after the elimination phase</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-onion-low-fodmap',
    title: 'Is Onion Low FODMAP?',
    subtitle: 'Onion is one of the most potent FODMAP sources in the Western diet — but the green spring onion tops are completely safe.',
    excerpt: 'All varieties of onion — white, brown, red, shallot — are high FODMAP. The green tops of spring onions are the one exception that is genuinely low FODMAP.',
    date: '2025-03-06',
    readTime: '5 min',
    tags: ['fodmap', 'fructans', 'cooking'],
    category: 'Diet',
    keywords: ['is onion low FODMAP', 'onion IBS', 'onion FODMAP', 'spring onion low FODMAP', 'fructan foods IBS', 'low FODMAP alternatives to onion'],
    heroImage: '/honey.png',
    heroAlt: 'Red and white onions on a market stall',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'All onion varieties (white, brown, red, shallot, leek bulb) are high FODMAP — fructans accumulate even in small amounts.',
      'Onion powder is even more concentrated and should be treated as strictly high FODMAP.',
      'The green tops (leaves) of spring onions are low FODMAP and can be used freely.',
      'Like garlic, onion fructans are water-soluble — they transfer into stocks and soups, making those broths high FODMAP.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Onion varieties', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
      { label: 'Shepherd SJ, Gibson PR — Fructose malabsorption and symptoms of IBS', journal: 'Clinical Gastroenterology and Hepatology', year: 2006, url: 'https://pubmed.ncbi.nlm.nih.gov/16630379/' },
    ],
    content: (
      <>
        <P>Onion is one of the two most problematic FODMAP foods in everyday cooking — the other being garlic. Both are fructan-heavy, both appear in almost every savoury recipe, and both can cause significant symptoms in even tiny amounts for fructan-sensitive IBS patients.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Brown / yellow onion: <Em>high FODMAP</Em> at any amount</Li>
          <Li>White onion: <Em>high FODMAP</Em></Li>
          <Li>Red onion: <Em>high FODMAP</Em></Li>
          <Li>Shallot: <Em>high FODMAP</Em></Li>
          <Li>Leek bulb (white part): <Em>high FODMAP</Em></Li>
          <Li>Spring onion / scallion — green tops only: <Em>low FODMAP</Em></Li>
          <Li>Chives: <Em>low FODMAP</Em></Li>
        </Ul>
        <H2 id="stocks">The stock problem</H2>
        <Callout variant="warning" title="Onion cooked in stock makes the whole liquid high FODMAP">
          Fructans are water-soluble. Simmering an onion in water — as you would for any stock or soup — transfers fructans into the liquid. Removing the onion afterwards does not make the broth safe. Use certified low-FODMAP stock cubes or make your own with low-FODMAP vegetables.
        </Callout>
        <H2 id="practical">Low-FODMAP onion alternatives</H2>
        <Ul>
          <Li>Spring onion green tops — use freely; slice and add at the end of cooking</Li>
          <Li>Chives — mild onion flavour, low FODMAP, great raw</Li>
          <Li>Garlic-infused oil — replaces both onion and garlic depth in fried bases</Li>
          <Li>Asafoetida (hing) — a small pinch in hot oil gives an allium note</Li>
        </Ul>
        <P>Re-introduction: after the strict elimination phase, onion is typically one of the harder foods to re-introduce. Start with a very small amount (a few rings) as a controlled test meal, and note symptoms over the following 24 hours.</P>
      </>
    ),
  },

  {
    slug: 'is-broccoli-low-fodmap',
    title: 'Is Broccoli Low FODMAP?',
    subtitle: 'Broccoli florets at a measured portion are low FODMAP — but the stalk and larger servings tip into high-FODMAP territory.',
    excerpt: 'Broccoli heads (florets) are low FODMAP at 75 g. Broccoli stalk is higher in fructans and should be kept to very small portions.',
    date: '2025-03-07',
    readTime: '4 min',
    tags: ['fodmap', 'vegetables', 'fructans'],
    category: 'Diet',
    keywords: ['is broccoli low FODMAP', 'broccoli IBS', 'broccoli FODMAP', 'broccoli serving size FODMAP', 'low FODMAP vegetables', 'broccoli florets FODMAP'],
    heroImage: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Fresh broccoli florets on a light background',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Broccoli heads/florets are low FODMAP at ¾ cup (75 g) — a normal side-dish portion.',
      'Broccoli stalk has higher fructan content; keep to 45 g or less.',
      'Larger servings of broccoli (the whole crown) can tip into high-FODMAP territory due to GOS and fructans.',
      'Frozen broccoli florets are a convenient low-FODMAP option — serve from frozen at a measured weight.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Broccoli', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
      { label: 'Halmos EP et al. — A diet low in FODMAPs reduces symptoms of IBS', journal: 'Gastroenterology', year: 2014, url: 'https://pubmed.ncbi.nlm.nih.gov/24076059/' },
    ],
    content: (
      <>
        <P>Broccoli sits in a complicated middle ground on the FODMAP spectrum. It's not freely low FODMAP, but it's entirely manageable with portion awareness — and florets behave differently from stalks.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Broccoli florets / heads, 75 g: <Em>low FODMAP</Em></Li>
          <Li>Broccoli florets, 250 g (a very large serving): <Em>high FODMAP</Em></Li>
          <Li>Broccoli stalk, 45 g: <Em>low FODMAP</Em></Li>
          <Li>Broccoli stalk, larger amounts: <Em>higher FODMAP</Em></Li>
        </Ul>
        <P>The FODMAPs in broccoli are primarily GOS and fructans — both found throughout the plant but in higher concentrations in the stalk and in large portions of florets.</P>
        <H2 id="portions">Serving sizes in real meals</H2>
        <Callout variant="tip" title="75 g is roughly what fits in one hand">
          A normal side serving of broccoli — about three to four large florets — is right in the low-FODMAP zone. The problem arises when broccoli becomes the bulk of a meal or is piled high onto a plate.
        </Callout>
        <H2 id="practical">Including broccoli in a low-FODMAP diet</H2>
        <Ul>
          <Li>Steam or roast florets and serve as a measured side (75 g)</Li>
          <Li>Add to stir-fries where the total vegetable portion is spread across multiple low-FODMAP vegetables</Li>
          <Li>Avoid stalk-heavy "broccoli stems" sold in supermarkets — stalk content is higher in FODMAPs</Li>
          <Li>Broccolini (baby broccoli) has been tested separately by Monash — check the app for current ratings</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-spinach-low-fodmap',
    title: 'Is Spinach Low FODMAP?',
    subtitle: 'Spinach is one of the most reliably safe vegetables on the low-FODMAP diet — and a versatile way to get greens without gut drama.',
    excerpt: 'Baby spinach is low FODMAP at 75 g. It\'s one of the safest, most nutrient-dense greens you can eat on a low-FODMAP diet.',
    date: '2025-03-08',
    readTime: '3 min',
    tags: ['fodmap', 'vegetables', 'leafy-greens'],
    category: 'Diet',
    keywords: ['is spinach low FODMAP', 'spinach IBS', 'spinach FODMAP', 'low FODMAP greens', 'low FODMAP vegetables list', 'baby spinach FODMAP'],
    heroImage: '/spinach.png',
    heroAlt: 'Fresh baby spinach leaves in a bowl',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Baby spinach is low FODMAP at 75 g — a generous salad-sized portion.',
      'Larger portions (over 100 g, which would be a large bunch) remain low FODMAP.',
      'Creamed spinach in restaurants often contains garlic, onion, and cream — those additions are the FODMAP risk, not the spinach itself.',
      'Spinach is an excellent source of folate, iron, and vitamin K — a genuinely useful dietary staple.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Spinach', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>One of the most frustrating aspects of the low-FODMAP diet is losing beloved healthy foods. Spinach, fortunately, is not one of them. It's one of the most reliably green-lit vegetables in the Monash database.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Baby spinach, 75 g (a large salad bowl): <Em>low FODMAP</Em></Li>
          <Li>Cooked spinach, 75 g: <Em>low FODMAP</Em></Li>
          <Li>Frozen spinach, 75 g: <Em>low FODMAP</Em></Li>
        </Ul>
        <P>Spinach contains no significant amounts of any FODMAP class at typical serving sizes. You can eat it without portion anxiety.</P>
        <H2 id="practical">Using spinach on a low-FODMAP diet</H2>
        <Callout variant="success" title="Spinach is a reliable FODMAP-safe green">
          Use it freely as a salad base, wilt it into eggs or pasta, blend it into smoothies, or stir it into soups. The spinach itself will not be the problem.
        </Callout>
        <Ul>
          <Li>Salad base: combine with cucumber, tomato, carrot, and a low-FODMAP dressing</Li>
          <Li>Scrambled eggs: wilt a handful into eggs with garlic-infused oil</Li>
          <Li>Smoothies: a handful with banana (unripe) and rice milk blends well</Li>
          <Li>Soups: stir in at the end to keep nutrients; use low-FODMAP stock as the base</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-strawberry-low-fodmap',
    title: 'Is Strawberry Low FODMAP?',
    subtitle: 'Strawberries are one of the few genuinely generous FODMAP-safe fruits — you can eat a proper portion without counting every berry.',
    excerpt: 'Strawberries are low FODMAP at 10 medium berries (150 g). They contain no excess fructose, no sorbitol, and no lactose.',
    date: '2025-03-09',
    readTime: '3 min',
    tags: ['fodmap', 'fruit', 'safe-foods'],
    category: 'Diet',
    keywords: ['is strawberry low FODMAP', 'strawberry IBS', 'strawberry FODMAP', 'low FODMAP fruits', 'safe fruits IBS', 'strawberry serving FODMAP'],
    heroImage: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Fresh red strawberries in a white bowl',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Strawberries are low FODMAP at 10 medium berries (150 g) — a generous and satisfying portion.',
      'They contain no significant excess fructose, sorbitol, or mannitol.',
      'Strawberry jam, on the other hand, often contains high-fructose corn syrup or concentrated fruit — check labels.',
      'Fresh, frozen, or freeze-dried strawberries all remain low FODMAP at the same weight.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Strawberry', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>On a diet where apples, pears, watermelon, and mangoes are off limits in normal portions, strawberries are a genuinely welcome exception. They are low FODMAP at a quantity that actually feels like a serving of fruit.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Fresh strawberries, 150 g (10 medium): <Em>low FODMAP</Em></Li>
          <Li>Frozen strawberries (no added sugar), 150 g: <Em>low FODMAP</Em></Li>
          <Li>Freeze-dried strawberries, 150 g equivalent: <Em>low FODMAP</Em></Li>
          <Li>Strawberry jam: <Em>check label</Em> — many brands add HFCS or fruit concentrate</Li>
        </Ul>
        <H2 id="practical">Ways to use strawberries</H2>
        <Callout variant="success" title="One of the best fruits for IBS">
          Strawberries pair beautifully with low-FODMAP dairy alternatives, oatmeal, rice pudding, and dark chocolate. Use them as a reliable sweet hit when other fruits feel risky.
        </Callout>
        <Ul>
          <Li>Top oatmeal with sliced strawberries and a drizzle of maple syrup</Li>
          <Li>Blend into smoothies with lactose-free yogurt and unripe banana</Li>
          <Li>Macerate with a little sugar and lemon juice for a simple fruit sauce</Li>
          <Li>Serve with lactose-free cream or coconut cream for dessert</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-apple-low-fodmap',
    title: 'Is Apple Low FODMAP?',
    subtitle: 'Apples are one of the most common IBS triggers — and there is no low-FODMAP serving size that makes them safe for most people.',
    excerpt: 'Apples are high FODMAP at any meaningful serving size due to high fructose and sorbitol content. Even one small apple exceeds safe limits.',
    date: '2025-03-10',
    readTime: '4 min',
    tags: ['fodmap', 'fruit', 'fructose', 'polyols'],
    category: 'Diet',
    keywords: ['is apple low FODMAP', 'apple IBS', 'apple FODMAP', 'apple IBS trigger', 'fructose foods IBS', 'low FODMAP fruit alternatives to apple'],
    heroImage: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Red and green apples in a wooden crate',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Apples are high FODMAP at any typical serving size — both fructose and sorbitol are well over threshold.',
      'A small 20 g nibble may technically fall below threshold, but this is not a practical eating amount.',
      'Apple juice, cider, and apple-based sauces are also high FODMAP.',
      'Replace apple in recipes with rhubarb, strawberries, or unripe banana depending on the dish.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Apple', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
      { label: 'Muir JG et al. — Fructan and free fructose content of common Australian vegetables and fruit', journal: 'Journal of Agricultural and Food Chemistry', year: 2007, url: 'https://pubmed.ncbi.nlm.nih.gov/17497876/' },
    ],
    content: (
      <>
        <P>Apples are frequently identified as an IBS trigger even by people who have never heard of FODMAPs. There's a simple reason: they contain both excess fructose and sorbitol — two separate FODMAP classes — in quantities that easily exceed what the small intestine can absorb.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Apple, any variety, 1 medium (150 g): <Em>high FODMAP</Em></Li>
          <Li>Apple juice (125 ml): <Em>high FODMAP</Em></Li>
          <Li>Applesauce (½ cup): <Em>high FODMAP</Em></Li>
          <Li>Dried apple: <Em>high FODMAP</Em> (concentrated sugars)</Li>
          <Li>Apple cider (alcoholic): <Em>high FODMAP</Em></Li>
        </Ul>
        <P>Unlike some high-FODMAP foods where a small portion is safe, apples don't have a practical low-FODMAP serving. Monash lists 20 g as amber-rated — that is barely two bites, which is not a useful amount of fruit.</P>
        <H2 id="why">Why apples are a double problem</H2>
        <P>The fructose in apples exceeds the glucose content — this ratio means the excess fructose cannot hitchhike on glucose transporters across the gut wall and instead passes to the colon. On top of that, sorbitol (the polyol responsible for the "sugar-free" laxative effect in some products) adds a second route to osmotic diarrhoea and bloating.</P>
        <H2 id="alternatives">Lower-FODMAP fruit alternatives</H2>
        <Callout variant="tip" title="These fruits can fill the apple-shaped gap">
          Strawberries, blueberries (40 g), grapes (130 g), oranges, and ripe kiwi are all low FODMAP at satisfying portions. For cooking, rhubarb softens similarly to stewed apple and is low FODMAP.
        </Callout>
      </>
    ),
  },

  {
    slug: 'is-rice-low-fodmap',
    title: 'Is Rice Low FODMAP?',
    subtitle: 'Rice is one of the most reliably safe staple foods on the low-FODMAP diet — all common varieties are green-lit at normal portions.',
    excerpt: 'White rice, brown rice, basmati, jasmine — all are low FODMAP at typical serving sizes. Rice is a cornerstone of low-FODMAP meal planning.',
    date: '2025-03-11',
    readTime: '3 min',
    tags: ['fodmap', 'grains', 'staples'],
    category: 'Diet',
    keywords: ['is rice low FODMAP', 'rice IBS', 'rice FODMAP', 'white rice low FODMAP', 'brown rice FODMAP', 'low FODMAP grains'],
    heroImage: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Bowl of steamed white rice with chopsticks',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'All common rice types — white, brown, basmati, jasmine, wild — are low FODMAP at normal portions.',
      'Rice flour is also low FODMAP and useful in gluten-free baking.',
      'Flavoured rice sachets or pre-seasoned packets may contain onion or garlic powder — always check.',
      'Rice is one of the safest grains during the IBS elimination phase and a reliable carbohydrate base.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Rice varieties', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>When you're newly on a low-FODMAP diet and the list of things you can't eat seems impossibly long, rice is one of the first reassurances: it's universally safe, filling, and adaptable.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>White rice, cooked (180 g / 1 cup): <Em>low FODMAP</Em></Li>
          <Li>Brown rice, cooked (180 g): <Em>low FODMAP</Em></Li>
          <Li>Basmati rice (180 g cooked): <Em>low FODMAP</Em></Li>
          <Li>Jasmine rice (180 g cooked): <Em>low FODMAP</Em></Li>
          <Li>Wild rice (180 g cooked): <Em>low FODMAP</Em></Li>
          <Li>Rice flour: <Em>low FODMAP</Em></Li>
          <Li>Rice cakes (plain): <Em>low FODMAP</Em></Li>
        </Ul>
        <H2 id="practical">Making rice the centre of low-FODMAP meals</H2>
        <Callout variant="success" title="Rice: the ultimate low-FODMAP base">
          Rice bowls, stir-fries over rice, rice-based soups, and fried rice (egg + spring onion tops + low-FODMAP vegetables) are all easy, satisfying meal templates that remain safe throughout the elimination phase.
        </Callout>
        <Ul>
          <Li>Serve with grilled chicken or salmon and low-FODMAP vegetables for a complete meal</Li>
          <Li>Use rice flour in pancakes, coating for proteins, or simple baked goods</Li>
          <Li>Rice cakes with peanut butter (2 tbsp) and sliced strawberries make a quick snack</Li>
          <Li>Avoid pre-seasoned rice pouches — most contain onion or garlic powder</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-bread-low-fodmap',
    title: 'Is Bread Low FODMAP?',
    subtitle: 'Most wheat bread is high FODMAP — but sourdough and gluten-free options can work. Here\'s how to choose without giving up bread entirely.',
    excerpt: 'Standard wheat bread is high FODMAP due to fructans. Sourdough fermentation reduces fructans significantly. Certified gluten-free bread is low FODMAP.',
    date: '2025-03-12',
    readTime: '5 min',
    tags: ['fodmap', 'grains', 'wheat', 'fructans'],
    category: 'Diet',
    keywords: ['is bread low FODMAP', 'bread IBS', 'bread FODMAP', 'sourdough low FODMAP', 'gluten-free bread FODMAP', 'wheat bread IBS'],
    heroImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Sliced sourdough bread on a wooden cutting board',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Standard wheat bread is high FODMAP — fructans are the main problem, not gluten itself.',
      'Traditional sourdough (slow-fermented wheat) is low FODMAP at 2 slices — fermentation degrades fructans.',
      'Gluten-free bread made with rice, oat, or potato flour is reliably low FODMAP.',
      'Spelt sourdough is also low FODMAP at 2 slices — spelt fructans are degraded by proper fermentation.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Bread', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
      { label: 'Biesiekierski JR et al. — Gluten causes GI symptoms in subjects without coeliac disease', journal: 'American Journal of Gastroenterology', year: 2011, url: 'https://pubmed.ncbi.nlm.nih.gov/21224837/' },
    ],
    content: (
      <>
        <P>Bread is one of the trickiest FODMAP categories because the answer isn't simply "wheat = bad, gluten-free = good." The type of bread, the fermentation process, and the specific flour all matter.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>White wheat sandwich bread (2 slices): <Em>high FODMAP</Em></Li>
          <Li>Wholemeal wheat bread (2 slices): <Em>high FODMAP</Em></Li>
          <Li>Wheat sourdough — traditional slow-fermented (2 slices): <Em>low FODMAP</Em></Li>
          <Li>Spelt sourdough (2 slices): <Em>low FODMAP</Em></Li>
          <Li>Gluten-free bread (rice/corn/potato base): <Em>low FODMAP</Em></Li>
          <Li>Rye bread: <Em>high FODMAP</Em></Li>
        </Ul>
        <H2 id="sourdough">Why sourdough is different</H2>
        <P>Traditional sourdough uses a long, slow fermentation process (typically 8–24 hours). During this time, naturally occurring bacteria and wild yeast metabolise much of the fructan content in wheat. The result is a bread made from wheat that is nonetheless low in fructans — and thus low FODMAP at a two-slice portion.</P>
        <Callout variant="warning" title="Commercial 'sourdough' is not always true sourdough">
          Many supermarket sourdough loaves are made quickly with added vinegar to simulate the sour flavour, without the actual long fermentation. These do not have the same fructan reduction and are likely high FODMAP. Look for bread with a genuine long-fermentation process or buy from a bakery you trust.
        </Callout>
        <H2 id="practical">Bread options in practice</H2>
        <Ul>
          <Li>Buy traditional sourdough from an artisan bakery and confirm the fermentation time</Li>
          <Li>Stock gluten-free bread for convenience — most major brands are reliable</Li>
          <Li>Rice cakes are a useful bread substitute for snacks and light meals</Li>
          <Li>Corn tortillas are low FODMAP and make excellent wraps</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-milk-low-fodmap',
    title: 'Is Milk Low FODMAP?',
    subtitle: 'Regular cow\'s milk is high in lactose — the most commonly known FODMAP. But lactose-free milk is completely safe and nutritionally identical.',
    excerpt: 'Regular cow\'s milk is high FODMAP due to lactose. Lactose-free cow\'s milk, A2 milk aside, is a reliable low-FODMAP swap. Plant milks vary.',
    date: '2025-03-13',
    readTime: '5 min',
    tags: ['fodmap', 'dairy', 'lactose'],
    category: 'Diet',
    keywords: ['is milk low FODMAP', 'milk IBS', 'lactose FODMAP', 'lactose-free milk low FODMAP', 'plant milk FODMAP', 'dairy IBS'],
    heroImage: '/almond-milk.png',
    heroAlt: 'Glass of milk and a jug on a white background',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Regular cow\'s milk is high FODMAP — lactose is the primary FODMAP in dairy.',
      'Lactose-free cow\'s milk is low FODMAP and nutritionally equivalent to regular milk.',
      'A2 milk still contains lactose and is not low FODMAP despite marketing claims.',
      'Among plant milks: rice milk and almond milk (unsweetened, 250 ml) are low FODMAP; oat milk varies by brand.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Milk and dairy', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
      { label: 'Lomer MCE et al. — Review article: lactose intolerance in clinical practice', journal: 'Alimentary Pharmacology & Therapeutics', year: 2007, url: 'https://pubmed.ncbi.nlm.nih.gov/17593059/' },
    ],
    content: (
      <>
        <P>Lactose is the FODMAP most people encounter first — because lactose intolerance is widely known even outside the IBS world. But the solution is simpler than many people realise: lactose-free milk is identical to regular milk in nutrition and taste, just without the gut problem.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Regular cow's milk (full-fat, semi, skimmed): <Em>high FODMAP</Em></Li>
          <Li>Lactose-free cow's milk: <Em>low FODMAP</Em></Li>
          <Li>A2 milk: <Em>high FODMAP</Em> (still contains lactose)</Li>
          <Li>Rice milk (plain): <Em>low FODMAP</Em></Li>
          <Li>Unsweetened almond milk (250 ml): <Em>low FODMAP</Em></Li>
          <Li>Oat milk: <Em>varies</Em> — some certified brands are low FODMAP; others add GOS-rich ingredients</Li>
          <Li>Soy milk (made from soy protein, not whole soy beans): <Em>low FODMAP</Em></Li>
          <Li>Coconut milk (canned, 120 ml): <Em>low FODMAP</Em></Li>
        </Ul>
        <H2 id="lactose-free">How lactose-free milk works</H2>
        <P>Lactose-free milk is regular cow's milk with the enzyme lactase added. Lactase splits lactose into glucose and galactose — both of which are absorbed easily. The nutritional profile is identical; it tastes very slightly sweeter due to the simple sugars.</P>
        <Callout variant="tip" title="A2 milk is not a lactose-free alternative">
          A2 milk contains only A2 beta-casein protein rather than A1, which may reduce digestive discomfort in some people for protein-related reasons — but it still contains full lactose and is not suitable as a low-FODMAP dairy swap.
        </Callout>
        <H2 id="plant-milks">Plant milk guide</H2>
        <Ul>
          <Li>Rice milk: safe and neutral-tasting; low in protein</Li>
          <Li>Almond milk: low FODMAP at 250 ml; choose unsweetened, no inulin added</Li>
          <Li>Coconut milk (carton, 250 ml): low FODMAP</Li>
          <Li>Hemp milk: low FODMAP</Li>
          <Li>Oat milk: check label — some brands certified low FODMAP by Monash</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-cheese-low-fodmap',
    title: 'Is Cheese Low FODMAP?',
    subtitle: 'Hard, aged cheeses are almost all low FODMAP. Soft and fresh cheeses retain lactose and are the ones to watch.',
    excerpt: 'Cheddar, parmesan, brie, and camembert are all low FODMAP — lactose is expelled in the whey during cheesemaking. Ricotta and cottage cheese are high FODMAP.',
    date: '2025-03-14',
    readTime: '4 min',
    tags: ['fodmap', 'dairy', 'lactose'],
    category: 'Diet',
    keywords: ['is cheese low FODMAP', 'cheese IBS', 'cheese FODMAP', 'cheddar low FODMAP', 'ricotta FODMAP', 'low FODMAP dairy'],
    heroImage: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Selection of cheese and crackers on a wooden board',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Hard and aged cheeses (cheddar, parmesan, Swiss, brie, camembert) are low FODMAP — lactose drains away with the whey.',
      'Fresh and soft cheeses (ricotta, cottage cheese, cream cheese, mascarpone) are high FODMAP.',
      'Feta is low FODMAP at a 45 g portion — surprisingly safe given its soft texture.',
      'Halloumi is low FODMAP at 80 g.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Cheese varieties', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Cheese is one of the more counter-intuitive parts of the low-FODMAP diet. Many people assume all dairy is off limits — but the cheesemaking process fundamentally changes the lactose content, and most aged cheeses are completely safe.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Cheddar: <Em>low FODMAP</Em></Li>
          <Li>Parmesan: <Em>low FODMAP</Em></Li>
          <Li>Swiss / Emmental: <Em>low FODMAP</Em></Li>
          <Li>Brie: <Em>low FODMAP</Em></Li>
          <Li>Camembert: <Em>low FODMAP</Em></Li>
          <Li>Feta: <Em>low FODMAP</Em> (45 g)</Li>
          <Li>Halloumi: <Em>low FODMAP</Em> (80 g)</Li>
          <Li>Mozzarella (fresh): <Em>low FODMAP</Em> (65 g)</Li>
          <Li>Ricotta: <Em>high FODMAP</Em></Li>
          <Li>Cottage cheese: <Em>high FODMAP</Em></Li>
          <Li>Cream cheese: <Em>high FODMAP</Em></Li>
          <Li>Mascarpone: <Em>high FODMAP</Em></Li>
        </Ul>
        <H2 id="why">Why hard cheeses are safe</H2>
        <P>During cheesemaking, curds are separated from whey. Lactose is water-soluble and stays with the whey — which is drained off. The longer and more extensively a cheese is aged, the less residual lactose it retains. Hard, aged cheeses like cheddar and parmesan contain virtually no detectable lactose.</P>
        <H2 id="practical">Cheese in practice</H2>
        <Callout variant="success" title="A cheese board can be entirely low FODMAP">
          Cheddar, brie, camembert, hard goat's cheese, grapes (130 g), walnuts, and gluten-free crackers make a fully low-FODMAP cheese board for gatherings.
        </Callout>
      </>
    ),
  },

  {
    slug: 'is-egg-low-fodmap',
    title: 'Is Egg Low FODMAP?',
    subtitle: 'Eggs are unambiguously low FODMAP — and one of the most versatile, nutrient-dense protein sources on the diet.',
    excerpt: 'Eggs contain no FODMAPs. They are safe in any quantity and preparation method, making them one of the most reliable foods in the low-FODMAP toolkit.',
    date: '2025-03-15',
    readTime: '3 min',
    tags: ['fodmap', 'protein', 'safe-foods'],
    category: 'Diet',
    keywords: ['is egg low FODMAP', 'eggs IBS', 'eggs FODMAP', 'low FODMAP protein sources', 'eggs safe for IBS', 'low FODMAP breakfast foods'],
    heroImage: '/egg.png',
    heroAlt: 'Fresh eggs in a carton on a kitchen counter',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Eggs contain no FODMAPs — safe in any number and preparation method.',
      'Fried, boiled, scrambled, poached, baked: all low FODMAP.',
      'The risk with egg dishes is the additions: cream, onion, garlic, wheat toast, regular milk.',
      'Eggs are one of the most complete proteins available and an anchor food during the elimination phase.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Egg', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>If there is one food that gives no cause for concern on the low-FODMAP diet, it is the egg. It contains no fermentable carbohydrates whatsoever — no lactose, no fructose, no GOS, no polyols, no fructans.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Boiled eggs: <Em>low FODMAP</Em></Li>
          <Li>Fried eggs (in low-FODMAP oil): <Em>low FODMAP</Em></Li>
          <Li>Scrambled eggs: <Em>low FODMAP</Em> (watch additions)</Li>
          <Li>Omelette: <Em>low FODMAP</Em> (watch fillings)</Li>
          <Li>Poached eggs: <Em>low FODMAP</Em></Li>
          <Li>Hard-boiled (any number): <Em>low FODMAP</Em></Li>
        </Ul>
        <H2 id="additions">Watch what you add</H2>
        <Callout variant="warning" title="The egg is safe — the recipe may not be">
          Eggs Benedict with hollandaise is fine — if you skip the wheat English muffin and use lactose-free butter. Scrambled eggs become high FODMAP if you add regular milk and serve with garlic toast. Assess the whole dish, not just the egg.
        </Callout>
        <H2 id="practical">Egg-based meals for the elimination phase</H2>
        <Ul>
          <Li>Scrambled eggs with spring onion tops and wilted spinach in garlic-infused oil</Li>
          <Li>Hard-boiled eggs as a portable protein snack</Li>
          <Li>Frittata with low-FODMAP vegetables (courgette, red pepper, cherry tomatoes)</Li>
          <Li>Fried rice (rice + egg + soy sauce + spring onion)</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-chicken-low-fodmap',
    title: 'Is Chicken Low FODMAP?',
    subtitle: 'Plain chicken contains no FODMAPs — it\'s the marinades, coatings, and sauces that create the IBS risk.',
    excerpt: 'Plain chicken breast, thigh, or any cut is completely low FODMAP. Garlic, onion, wheat flour coatings, and flavoured marinades are where the problems arise.',
    date: '2025-03-16',
    readTime: '3 min',
    tags: ['fodmap', 'protein', 'meat'],
    category: 'Diet',
    keywords: ['is chicken low FODMAP', 'chicken IBS', 'chicken FODMAP', 'low FODMAP meat', 'plain chicken IBS safe', 'low FODMAP protein'],
    heroImage: '/chicken.png',
    heroAlt: 'Grilled chicken breast on a wooden board',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Plain chicken — any cut, any cooking method — contains zero FODMAPs.',
      'Rotisserie chicken is often seasoned with garlic and onion — always check.',
      'Chicken stock cubes and many marinades contain garlic or onion powder, making them high FODMAP.',
      'Wheat-coated or breadcrumbed chicken (schnitzel, nuggets) is high FODMAP unless made with gluten-free coating.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Chicken', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Chicken is one of the safest, most versatile proteins on the low-FODMAP diet. All proteins — meat, poultry, fish — contain no fermentable carbohydrates. The issue with chicken dishes is almost always the seasoning, coating, or sauce.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Plain chicken breast / thigh / drumstick: <Em>low FODMAP</Em></Li>
          <Li>Roast chicken (no seasoning or with herbs only): <Em>low FODMAP</Em></Li>
          <Li>Rotisserie / shop-bought roast chicken: <Em>check ingredients</Em> — often garlic rubbed</Li>
          <Li>Chicken in garlic-and-herb marinade: <Em>high FODMAP</Em></Li>
          <Li>Breaded chicken / schnitzel (wheat coating): <Em>high FODMAP</Em></Li>
          <Li>Chicken nuggets: <Em>high FODMAP</Em> (wheat coating, often garlic seasoning)</Li>
        </Ul>
        <H2 id="practical">Cooking chicken safely</H2>
        <Callout variant="tip" title="Season with low-FODMAP herbs instead">
          Fresh herbs — thyme, rosemary, oregano, parsley, chives — are all low FODMAP and add genuine flavour. Paprika, cumin, turmeric, and black pepper are also safe. Build flavour without garlic or onion.
        </Callout>
        <Ul>
          <Li>Marinate in garlic-infused oil, lemon juice, and fresh herbs</Li>
          <Li>Coat in gluten-free breadcrumbs or rice flour for a crispy texture</Li>
          <Li>Poach in low-FODMAP stock for soups and salads</Li>
          <Li>Shred and add to rice bowls with low-FODMAP vegetables and a tamari-based dressing</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-salmon-low-fodmap',
    title: 'Is Salmon Low FODMAP?',
    subtitle: 'Salmon is completely FODMAP-free and one of the best omega-3 sources you can eat freely on a low-FODMAP diet.',
    excerpt: 'Plain salmon — fresh, frozen, or tinned — contains no FODMAPs. It\'s safe in any portion and one of the most nutritionally valuable foods on the diet.',
    date: '2025-03-17',
    readTime: '3 min',
    tags: ['fodmap', 'protein', 'fish'],
    category: 'Diet',
    keywords: ['is salmon low FODMAP', 'salmon IBS', 'salmon FODMAP', 'fish low FODMAP', 'low FODMAP omega 3', 'tinned salmon FODMAP'],
    heroImage: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Fresh salmon fillet on a chopping board',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Plain salmon — fresh, frozen, or tinned in spring water — contains zero FODMAPs.',
      'Smoked salmon is low FODMAP unless cured with honey or garlic.',
      'Flavoured tinned salmon often contains garlic or onion — read the label.',
      'Salmon is an excellent source of omega-3 fatty acids, which may have modest anti-inflammatory effects in IBS.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Salmon', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Like all plain fish and meat, salmon is inherently FODMAP-free. The challenge is simply making sure nothing you add or buy pre-prepared contains FODMAPs.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Fresh salmon fillet (any amount): <Em>low FODMAP</Em></Li>
          <Li>Frozen salmon (no seasoning): <Em>low FODMAP</Em></Li>
          <Li>Tinned salmon in spring water: <Em>low FODMAP</Em></Li>
          <Li>Smoked salmon (plain): <Em>low FODMAP</Em></Li>
          <Li>Smoked salmon with honey glaze: <Em>check label</Em></Li>
          <Li>Flavoured tinned salmon: <Em>check ingredients</Em></Li>
        </Ul>
        <H2 id="practical">Salmon in a low-FODMAP diet</H2>
        <Callout variant="success" title="Salmon is a nutritional powerhouse on the low-FODMAP diet">
          Omega-3 fatty acids may reduce gut inflammation, and salmon's high protein content supports satiety — particularly useful when you're managing an already restricted diet.
        </Callout>
        <Ul>
          <Li>Pan-fry in garlic-infused oil with lemon and fresh dill</Li>
          <Li>Bake with a crust of gluten-free breadcrumbs, lemon zest, and parsley</Li>
          <Li>Flake tinned salmon into rice with spring onion tops and soy sauce</Li>
          <Li>Serve on low-FODMAP sourdough toast with cucumber and plain lactose-free cream alternative</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-almond-low-fodmap',
    title: 'Is Almond Low FODMAP?',
    subtitle: 'Almonds are low FODMAP at 10 nuts — a precise limit worth knowing because larger amounts quickly become high FODMAP.',
    excerpt: 'Almonds are low FODMAP at exactly 10 nuts (23 g). Beyond that, GOS and fructan content rises rapidly. Almond flour is similarly portion-sensitive.',
    date: '2025-03-18',
    readTime: '4 min',
    tags: ['fodmap', 'nuts', 'snacks'],
    category: 'Diet',
    keywords: ['is almond low FODMAP', 'almonds IBS', 'almond FODMAP', 'almond flour low FODMAP', 'nuts IBS', 'low FODMAP nuts list'],
    heroImage: '/almond.png',
    heroAlt: 'Raw almonds scattered on a rustic wooden surface',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Almonds are low FODMAP at exactly 10 nuts (23 g) — this is a firm limit, not a rough guide.',
      'At 20 nuts (46 g), almonds become high FODMAP — GOS content doubles and crosses the threshold.',
      'Almond flour (24 g / ¼ cup) is low FODMAP; larger amounts used in baking can accumulate.',
      'Almond milk (250 ml, unsweetened) is low FODMAP regardless of the whole-almond limit.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Almonds', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Almonds sit in a frustrating middle position on the FODMAP spectrum: they're not freely safe, but they're not off limits either. Ten nuts is the line, and it matters.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>10 almonds (23 g): <Em>low FODMAP</Em></Li>
          <Li>20 almonds (46 g): <Em>high FODMAP</Em></Li>
          <Li>Almond flour, 24 g (¼ cup): <Em>low FODMAP</Em></Li>
          <Li>Almond butter, 2 tbsp: <Em>low FODMAP</Em></Li>
          <Li>Unsweetened almond milk (250 ml): <Em>low FODMAP</Em></Li>
          <Li>Blanched almonds: same limits as whole almonds</Li>
        </Ul>
        <P>The FODMAPs in almonds are GOS (galacto-oligosaccharides) and fructans. These accumulate linearly — the more almonds you eat, the higher the FODMAP load.</P>
        <H2 id="snacking">Snacking safely on almonds</H2>
        <Callout variant="tip" title="Count them before eating — don't eat from the packet">
          It's easy to eat 20–30 almonds mindlessly from a shared bowl. Count out 10 and put the rest away before you sit down. This is one of the most common accidental FODMAP exposures on an otherwise clean diet.
        </Callout>
        <H2 id="alternatives">Other nuts for variety</H2>
        <Ul>
          <Li>Macadamia nuts (20 nuts): low FODMAP</Li>
          <Li>Pecans (10 halves): low FODMAP</Li>
          <Li>Walnuts (10 halves): low FODMAP</Li>
          <Li>Peanuts (32 nuts / 28 g): low FODMAP</Li>
          <Li>Cashews (10 nuts): high FODMAP — GOS-heavy</Li>
          <Li>Pistachios: high FODMAP</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-peanut-butter-low-fodmap',
    title: 'Is Peanut Butter Low FODMAP?',
    subtitle: 'Good news: peanut butter is low FODMAP at a normal serving size and one of the most practical proteins on the diet.',
    excerpt: 'Plain peanut butter is low FODMAP at 2 tablespoons (32 g). Watch for added honey, high-fructose corn syrup, or inulin in flavoured brands.',
    date: '2025-03-19',
    readTime: '3 min',
    tags: ['fodmap', 'nuts', 'protein', 'snacks'],
    category: 'Diet',
    keywords: ['is peanut butter low FODMAP', 'peanut butter IBS', 'peanut butter FODMAP', 'low FODMAP nut butter', 'peanuts IBS safe', 'low FODMAP snacks'],
    heroImage: '/peanut-butter.png',
    heroAlt: 'Jar of peanut butter with a wooden spoon',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Plain peanut butter is low FODMAP at 2 tablespoons (32 g).',
      'Peanuts themselves are low FODMAP at 32 nuts (28 g).',
      'Honey-roasted peanut butter is high FODMAP — honey is a high-fructose sweetener.',
      'Choose natural peanut butter with just peanuts (and maybe salt) — avoid brands with added sugars, palm oil, or "fibre" (often inulin).',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Peanut butter', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Peanut butter is one of the most practical and satisfying low-FODMAP foods: high in protein, shelf-stable, versatile, and safe at a normal portion. The key is choosing the right brand.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Plain peanut butter, 2 tbsp (32 g): <Em>low FODMAP</Em></Li>
          <Li>Peanuts, 32 nuts (28 g): <Em>low FODMAP</Em></Li>
          <Li>Honey-roasted peanut butter: <Em>high FODMAP</Em></Li>
          <Li>Reduced-fat peanut butter: <Em>check label</Em> — often has added sugar or maltodextrin</Li>
          <Li>Natural peanut butter (just peanuts + salt): <Em>low FODMAP</Em></Li>
        </Ul>
        <H2 id="practical">Using peanut butter on a low-FODMAP diet</H2>
        <Callout variant="success" title="One of the easiest low-FODMAP protein hits">
          Two tablespoons of peanut butter on a rice cake, paired with sliced strawberries and a drizzle of maple syrup — quick, satisfying, and completely low FODMAP.
        </Callout>
        <Ul>
          <Li>Spread on rice cakes or low-FODMAP sourdough toast</Li>
          <Li>Stir into oatmeal with sliced unripe banana</Li>
          <Li>Make a low-FODMAP satay sauce: peanut butter + tamari + ginger + lime</Li>
          <Li>Add to smoothies for protein and creaminess</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-tofu-low-fodmap',
    title: 'Is Tofu Low FODMAP?',
    subtitle: 'Firm tofu is low FODMAP — but silken tofu is high. The type of tofu makes all the difference.',
    excerpt: 'Firm and extra-firm tofu are low FODMAP at normal serving sizes. Silken tofu retains GOS from soy and is high FODMAP.',
    date: '2025-03-20',
    readTime: '4 min',
    tags: ['fodmap', 'protein', 'vegan', 'soy'],
    category: 'Diet',
    keywords: ['is tofu low FODMAP', 'tofu IBS', 'tofu FODMAP', 'silken tofu FODMAP', 'firm tofu low FODMAP', 'vegan low FODMAP protein'],
    heroImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Block of firm tofu on a wooden board',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Firm tofu is low FODMAP at 170 g (a generous serving) — GOS is drained away with the water during pressing.',
      'Silken / soft tofu is high FODMAP — it retains the GOS-rich liquid it was set in.',
      'Marinated or seasoned tofu packets often contain garlic or onion — check labels.',
      'Tofu is one of the best low-FODMAP vegan protein sources alongside tempeh.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Tofu', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Tofu presents a clear case where understanding food processing makes all the difference. Both firm and silken tofu start from the same soybeans — but the manufacturing steps change the FODMAP profile entirely.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Firm tofu, 170 g: <Em>low FODMAP</Em></Li>
          <Li>Extra-firm tofu, 170 g: <Em>low FODMAP</Em></Li>
          <Li>Silken tofu: <Em>high FODMAP</Em></Li>
          <Li>Soft tofu: <Em>high FODMAP</Em></Li>
          <Li>Flavoured / marinated tofu: <Em>check ingredients</Em></Li>
        </Ul>
        <H2 id="why">Why firmness determines FODMAP content</H2>
        <P>GOS — the oligosaccharide found in soy — is water-soluble. When firm tofu is pressed and drained, most of the GOS-containing liquid is expelled. Silken tofu is not pressed; it sets in its own liquid, retaining the GOS content. The result is two very different FODMAP profiles from the same starting ingredient.</P>
        <H2 id="practical">Cooking with firm tofu</H2>
        <Callout variant="tip" title="Press it for better texture">
          Pressing firm tofu for 30 minutes before cooking removes excess moisture, improves texture for frying and baking, and further reduces any residual FODMAP content. Wrap in a clean cloth and place a heavy pan on top.
        </Callout>
        <Ul>
          <Li>Cube and stir-fry in garlic-infused oil with low-FODMAP vegetables and tamari</Li>
          <Li>Marinate in soy sauce, ginger, and sesame oil; bake until crispy</Li>
          <Li>Crumble and season with turmeric for a scrambled egg substitute</Li>
          <Li>Add to miso soup — but check miso brand (most are low FODMAP)</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-tomato-low-fodmap',
    title: 'Is Tomato Low FODMAP?',
    subtitle: 'Fresh tomatoes are low FODMAP at a single serving — but concentrated tomato products like paste and sun-dried tomatoes are higher.',
    excerpt: 'One medium fresh tomato (65 g) is low FODMAP. Tomato paste, sun-dried tomatoes, and large quantities of tinned tomato can accumulate FODMAPs.',
    date: '2025-03-21',
    readTime: '4 min',
    tags: ['fodmap', 'vegetables', 'cooking'],
    category: 'Diet',
    keywords: ['is tomato low FODMAP', 'tomato IBS', 'tomato FODMAP', 'tomato paste FODMAP', 'tinned tomato FODMAP', 'cherry tomato low FODMAP'],
    heroImage: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Ripe red tomatoes on the vine',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'One medium tomato (65 g) is low FODMAP; 5 cherry tomatoes are also low FODMAP.',
      'Tinned whole tomatoes are low FODMAP at 100 g — but larger amounts used in sauces can accumulate fructose.',
      'Tomato paste is concentrated: keep to 2 tablespoons or less per serving.',
      'Sun-dried tomatoes are high FODMAP — the concentration of fructans and fructose is too high.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Tomato', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Tomatoes sit at an interesting point in the FODMAP spectrum: fresh tomatoes are safe at normal amounts, but concentrating them — as in paste, sun-dried, or large-batch sauce — raises the fructose load significantly.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Fresh tomato, 1 medium (65 g): <Em>low FODMAP</Em></Li>
          <Li>Cherry tomatoes, 5 (75 g): <Em>low FODMAP</Em></Li>
          <Li>Tinned tomatoes, 100 g: <Em>low FODMAP</Em></Li>
          <Li>Tinned tomatoes, 400 g can (used in a sauce for one): <Em>higher FODMAP</Em></Li>
          <Li>Tomato paste, 2 tbsp: <Em>low FODMAP</Em></Li>
          <Li>Sun-dried tomatoes: <Em>high FODMAP</Em></Li>
          <Li>Passata (120 ml): <Em>low FODMAP</Em></Li>
        </Ul>
        <H2 id="sauces">Tomato-based sauces</H2>
        <Callout variant="warning" title="Pasta sauce portions matter">
          A bolognese or marinara using a whole 400 g can of tomatoes between two servings means 200 g of tomatoes per person — above the safe threshold. Use 100 g per serve or use passata to control concentration.
        </Callout>
        <H2 id="practical">Low-FODMAP tomato cooking</H2>
        <Ul>
          <Li>Fresh tomatoes in salads, on eggs, or sliced with mozzarella — freely safe</Li>
          <Li>Use passata as a pasta sauce base (120 ml per person) with garlic-infused oil and fresh basil</Li>
          <Li>Limit tomato paste to 2 tbsp per portion in recipes</Li>
          <Li>Skip sun-dried tomatoes; use fresh roasted tomatoes instead</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-carrot-low-fodmap',
    title: 'Is Carrot Low FODMAP?',
    subtitle: 'Carrots are one of the most reliably safe vegetables on the low-FODMAP diet — and you can eat them in generous amounts.',
    excerpt: 'Carrots are low FODMAP at any normal serving size. They contain no significant amounts of any FODMAP class and are one of the safest vegetables available.',
    date: '2025-03-22',
    readTime: '3 min',
    tags: ['fodmap', 'vegetables', 'safe-foods'],
    category: 'Diet',
    keywords: ['is carrot low FODMAP', 'carrots IBS', 'carrot FODMAP', 'low FODMAP vegetables', 'safe vegetables IBS', 'carrot juice FODMAP'],
    heroImage: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Fresh whole carrots with their green tops',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Carrots are low FODMAP at any normal serving — eat them freely.',
      'Carrot sticks make one of the best low-FODMAP snacks, especially with peanut butter or plain hummus (small amounts).',
      'Carrot juice may concentrate sugars — stick to fresh whole carrots for the most predictable response.',
      'Baby carrots, cooked carrots, and raw carrots all have the same FODMAP status: safe.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Carrot', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>When everything seems to need careful measuring and label-reading, carrots are a relief. They are unconditionally low FODMAP across all forms and serving sizes you're likely to encounter.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Raw carrot (1 medium, 61 g): <Em>low FODMAP</Em></Li>
          <Li>Cooked carrot: <Em>low FODMAP</Em></Li>
          <Li>Baby carrots: <Em>low FODMAP</Em></Li>
          <Li>Frozen carrots: <Em>low FODMAP</Em></Li>
          <Li>Carrot juice: <Em>low FODMAP</Em> at small amounts but check for added ingredients</Li>
        </Ul>
        <H2 id="practical">Carrots in a low-FODMAP diet</H2>
        <Callout variant="success" title="Carrots are a universal safe vegetable">
          Use them as a reliable bulk vegetable in soups, stews, stir-fries, and salads. They add sweetness, colour, and fibre without any FODMAP risk.
        </Callout>
        <Ul>
          <Li>Raw sticks with 2 tbsp peanut butter as a snack</Li>
          <Li>Roasted with olive oil, cumin, and lemon as a side dish</Li>
          <Li>Add generously to low-FODMAP soups and stews</Li>
          <Li>Grate raw into rice paper rolls with cucumber and rice noodles</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-sweet-potato-low-fodmap',
    title: 'Is Sweet Potato Low FODMAP?',
    subtitle: 'Sweet potato is low FODMAP in a modest serving — but it\'s one of the more portion-sensitive vegetables on the list.',
    excerpt: 'Sweet potato is low FODMAP at 70 g. Beyond that, mannitol content rises and becomes symptomatic for many people. Kumara behaves similarly.',
    date: '2025-03-23',
    readTime: '4 min',
    tags: ['fodmap', 'vegetables', 'polyols'],
    category: 'Diet',
    keywords: ['is sweet potato low FODMAP', 'sweet potato IBS', 'sweet potato FODMAP', 'kumara FODMAP', 'mannitol foods IBS', 'low FODMAP vegetables'],
    heroImage: '/sweetpotato.png',
    heroAlt: 'Sweet potatoes on a rustic wooden surface',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Sweet potato is low FODMAP at 70 g (roughly half a small sweet potato).',
      'At 100 g and above, mannitol content rises into the moderate/high range.',
      'This is a meaningful portion limit — a typical baked sweet potato weighs 200–250 g.',
      'Regular white potato has no meaningful FODMAP limit — a useful swap when you want a larger portion.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Sweet Potato', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Sweet potato is nutritious and delicious, but it comes with a genuine portion caveat that catches many people out. A standard restaurant or home serving of sweet potato often well exceeds the low-FODMAP limit.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Sweet potato, 70 g (roughly half a small potato): <Em>low FODMAP</Em></Li>
          <Li>Sweet potato, 100 g: <Em>moderate FODMAP</Em> — mannitol approaching limit</Li>
          <Li>Sweet potato, 200 g (a standard baked sweet potato): <Em>high FODMAP</Em></Li>
          <Li>Sweet potato fries (restaurant portion): <Em>likely high FODMAP</Em></Li>
        </Ul>
        <P>Mannitol is a sugar alcohol (polyol) that is poorly absorbed in the small intestine. It draws water into the gut and ferments in the colon — contributing to both diarrhoea and bloating.</P>
        <H2 id="swap">When to swap for regular potato</H2>
        <Callout variant="tip" title="Regular white potato has no meaningful FODMAP limit">
          If you want a bigger portion of potato, use regular white or red potato. It's low FODMAP at large portions (300 g) and can be baked, mashed, or roasted without concern. Reserve sweet potato for small-portion uses.
        </Callout>
        <H2 id="practical">Using sweet potato within limits</H2>
        <Ul>
          <Li>Add 70 g of diced sweet potato to a stir-fry or soup for sweetness and colour</Li>
          <Li>Serve a small portion alongside a main rather than as the bulk carbohydrate</Li>
          <Li>Pair with regular potato in dishes requiring a larger carb volume</Li>
          <Li>Roast and weigh before serving — it shrinks during cooking</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-honey-low-fodmap',
    title: 'Is Honey Low FODMAP?',
    subtitle: 'Honey is high FODMAP — it\'s one of the most concentrated sources of excess fructose in the diet. Maple syrup is the practical swap.',
    excerpt: 'Honey is high FODMAP due to its high free fructose content. Even a teaspoon is enough to trigger symptoms in fructose-sensitive IBS patients.',
    date: '2025-03-24',
    readTime: '4 min',
    tags: ['fodmap', 'sweeteners', 'fructose'],
    category: 'Diet',
    keywords: ['is honey low FODMAP', 'honey IBS', 'honey FODMAP', 'honey IBS trigger', 'fructose sweeteners', 'low FODMAP sweetener alternatives'],
    heroImage: '/honey.png',
    heroAlt: 'Golden honey dripping from a wooden dipper',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Honey is high FODMAP — it contains high levels of free fructose relative to glucose.',
      'Even 1 teaspoon (7 g) is rated amber/high by Monash — a real risk for fructose-sensitive patients.',
      'Maple syrup is the established low-FODMAP sweetener swap — safe at 2 tablespoons.',
      'Watch for honey in "healthy" products: granola, energy bars, flavoured nuts, and herbal teas often contain it.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Honey', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
      { label: 'Gibson PR, Shepherd SJ — Personal view: food for thought — western lifestyle and susceptibility to Crohn\'s disease', journal: 'Alimentary Pharmacology & Therapeutics', year: 2005, url: 'https://pubmed.ncbi.nlm.nih.gov/15771916/' },
    ],
    content: (
      <>
        <P>Honey is widely perceived as a "natural" and therefore gut-friendly sweetener. For IBS patients managing fructose malabsorption, it is one of the more problematic foods — because it is largely fructose with a ratio that exceeds glucose at any meaningful quantity.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Honey, any variety (1 tsp / 7 g): <Em>high FODMAP</Em></Li>
          <Li>Manuka honey: <Em>high FODMAP</Em> — no exception based on antibacterial properties</Li>
          <Li>Raw honey: <Em>high FODMAP</Em></Li>
          <Li>Maple syrup (2 tbsp / 53 g): <Em>low FODMAP</Em></Li>
          <Li>White table sugar (sucrose): <Em>low FODMAP</Em> at 1 tbsp</Li>
          <Li>Rice malt syrup: <Em>low FODMAP</Em></Li>
        </Ul>
        <H2 id="hidden">Hidden honey in products</H2>
        <Callout variant="warning" title="Honey is in more products than you expect">
          Granola, muesli bars, flavoured yogurt, herbal teas, glazed nuts, and many "clean eating" snacks list honey as a primary sweetener. During elimination, read every label — products marketed as natural or healthy are not automatically low FODMAP.
        </Callout>
        <H2 id="swaps">Low-FODMAP sweetener alternatives</H2>
        <Ul>
          <Li>Maple syrup — flavour-rich, widely available, low FODMAP at 2 tbsp</Li>
          <Li>White or brown sugar (sucrose) — small amounts low FODMAP</Li>
          <Li>Rice malt syrup — low FODMAP, mild flavour</Li>
          <Li>Stevia (pure) — low FODMAP, no calories</Li>
          <Li>Glucose syrup — low FODMAP, useful in baking</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-dark-chocolate-low-fodmap',
    title: 'Is Dark Chocolate Low FODMAP?',
    subtitle: 'Dark chocolate is low FODMAP in a small portion — one of the more welcome findings in the Monash database.',
    excerpt: 'Dark chocolate (>70% cocoa) is low FODMAP at 30 g. Milk chocolate is higher in lactose and often lower-rated. Portion control is key.',
    date: '2025-03-25',
    readTime: '4 min',
    tags: ['fodmap', 'snacks', 'sweeteners'],
    category: 'Diet',
    keywords: ['is dark chocolate low FODMAP', 'dark chocolate IBS', 'chocolate FODMAP', 'low FODMAP chocolate', 'dark chocolate IBS safe', 'low FODMAP dessert'],
    heroImage: '/choc.png',
    heroAlt: 'Broken squares of dark chocolate on a white surface',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Dark chocolate (>70% cocoa) is low FODMAP at 30 g (roughly 2–3 squares of a standard bar).',
      'Milk chocolate is higher FODMAP due to lactose and often lower cocoa solids.',
      'Chocolate with added ingredients — dried fruit, nuts over threshold, caramel — may not be low FODMAP overall.',
      'Cocoa powder (1 tbsp) is low FODMAP and useful for baking.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Chocolate', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Having to give up chocolate entirely would make an already restrictive diet feel punishing. Fortunately, the Monash data offers good news: dark chocolate is low FODMAP at a real portion of 30 g.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Dark chocolate, &gt;70% cocoa (30 g): <Em>low FODMAP</Em></Li>
          <Li>Dark chocolate, &gt;70% cocoa (50 g): <Em>moderate–high FODMAP</Em></Li>
          <Li>Milk chocolate (30 g): <Em>moderate FODMAP</Em> — lactose content</Li>
          <Li>White chocolate: <Em>high FODMAP</Em> — primarily milk solids</Li>
          <Li>Cocoa powder, 1 tbsp: <Em>low FODMAP</Em></Li>
          <Li>Dark chocolate with dried cranberries/raisins: <Em>high FODMAP</Em></Li>
        </Ul>
        <H2 id="practical">Eating chocolate on a low-FODMAP diet</H2>
        <Callout variant="tip" title="Choose a high-quality 70–85% bar">
          Higher cocoa percentage means less added sugar and milk fat, and a lower FODMAP load per gram. A good 80% bar at 30 g is satisfying, genuinely low FODMAP, and doesn't require eating the whole bar to feel like you've had a treat.
        </Callout>
        <Ul>
          <Li>Break off 2–3 squares (30 g) and put the bar away</Li>
          <Li>Use cocoa powder in low-FODMAP baked goods (brownies with gluten-free flour)</Li>
          <Li>Melt dark chocolate for dipping strawberries — a perfect low-FODMAP dessert</Li>
          <Li>Avoid chocolate bars with caramel centres — caramel contains excess fructose or sorbitol</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-maple-syrup-low-fodmap',
    title: 'Is Maple Syrup Low FODMAP?',
    subtitle: 'Maple syrup is the go-to low-FODMAP sweetener — a genuinely safe alternative to honey that works in almost every application.',
    excerpt: 'Pure maple syrup is low FODMAP at up to 2 tablespoons (53 g). It\'s the most versatile natural sweetener on the low-FODMAP diet.',
    date: '2025-03-26',
    readTime: '3 min',
    tags: ['fodmap', 'sweeteners', 'safe-foods'],
    category: 'Diet',
    keywords: ['is maple syrup low FODMAP', 'maple syrup IBS', 'maple syrup FODMAP', 'low FODMAP sweetener', 'honey alternative IBS', 'low FODMAP baking sweetener'],
    heroImage: '/maple-syrup.png',
    heroAlt: 'Maple syrup pouring from a glass jug over pancakes',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Pure maple syrup is low FODMAP at 2 tablespoons (53 g) — a generous amount.',
      'It contains mainly sucrose, glucose, and fructose in approximately equal ratios — no excess fructose problem.',
      '"Pancake syrup" or flavoured syrups are often high-fructose corn syrup, not maple — check labels.',
      'Maple syrup works as a 1:1 honey substitute in most recipes.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Maple Syrup', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>After discovering honey is off limits, many people worry there's nothing left to sweeten food with. Maple syrup solves that problem entirely. It's the most practical, flavour-forward low-FODMAP sweetener available.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Pure maple syrup, 2 tbsp (53 g): <Em>low FODMAP</Em></Li>
          <Li>Pancake / waffle syrup (artificial): <Em>check label</Em> — often HFCS</Li>
          <Li>Maple-flavoured syrup: <Em>likely high FODMAP</Em></Li>
          <Li>Maple sugar: <Em>low FODMAP</Em> at small amounts</Li>
        </Ul>
        <H2 id="why-safe">Why maple syrup is safe when honey isn't</H2>
        <P>Honey has a high ratio of free fructose to glucose — the excess fructose overwhelms absorption capacity and passes to the colon. Maple syrup's sugar composition (primarily sucrose with balanced glucose and fructose) doesn't create this imbalance. The fructose in maple syrup is accompanied by enough glucose to support its absorption.</P>
        <H2 id="practical">Using maple syrup</H2>
        <Callout variant="success" title="A 1:1 honey replacement in most recipes">
          Use maple syrup anywhere a recipe calls for honey: dressings, marinades, oatmeal toppings, baking, and hot drinks. Start with the same volume and adjust to taste.
        </Callout>
        <Ul>
          <Li>Drizzle over oatmeal with blueberries and walnuts</Li>
          <Li>Use in low-FODMAP salad dressings (maple + Dijon + apple cider vinegar + olive oil)</Li>
          <Li>Brush onto salmon or chicken before roasting</Li>
          <Li>Sweeten lactose-free yogurt instead of flavoured varieties</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-wine-low-fodmap',
    title: 'Is Wine Low FODMAP?',
    subtitle: 'Dry red and white wine are low FODMAP at one glass — sweet wines and large quantities are where IBS risk rises.',
    excerpt: 'Dry wine — red, white, or rosé — is low FODMAP at one standard 150 ml glass. Sweet wines, dessert wines, and wine with mixers require more care.',
    date: '2025-03-27',
    readTime: '4 min',
    tags: ['fodmap', 'drinks', 'alcohol'],
    category: 'Diet',
    keywords: ['is wine low FODMAP', 'wine IBS', 'wine FODMAP', 'red wine IBS', 'alcohol low FODMAP', 'low FODMAP drinks alcohol'],
    heroImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Two glasses of red wine on a wooden table',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Dry red, white, and rosé wine are low FODMAP at one standard glass (150 ml).',
      'Sweet wines and dessert wines contain more residual sugar and are higher FODMAP.',
      'Alcohol independently stimulates the gut — even FODMAP-compliant drinks can worsen IBS-D.',
      'Wine mixed with high-FODMAP juice (apple juice, mango juice) makes the whole drink high FODMAP.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Wine', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
      { label: 'Halmos EP et al. — Predictors of symptom resolution in adults with IBS', journal: 'Clinical Gastroenterology and Hepatology', year: 2020, url: 'https://pubmed.ncbi.nlm.nih.gov/31678300/' },
    ],
    content: (
      <>
        <P>For many people, the idea of giving up a glass of wine at dinner is a social and psychological hurdle that makes an already difficult diet feel unbearable. Good news: a single glass of dry wine is low FODMAP.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Dry red wine, 150 ml (1 glass): <Em>low FODMAP</Em></Li>
          <Li>Dry white wine, 150 ml: <Em>low FODMAP</Em></Li>
          <Li>Rosé, 150 ml: <Em>low FODMAP</Em></Li>
          <Li>Sparkling wine / champagne, 150 ml: <Em>low FODMAP</Em></Li>
          <Li>Sweet white wine / Riesling, 150 ml: <Em>moderate FODMAP</Em></Li>
          <Li>Dessert wine / port, 60 ml: <Em>high FODMAP</Em></Li>
          <Li>Wine + apple juice (sangria style): <Em>high FODMAP</Em></Li>
        </Ul>
        <H2 id="alcohol">Alcohol as a gut irritant beyond FODMAPs</H2>
        <Callout variant="warning" title="Even low-FODMAP alcohol can worsen IBS">
          Alcohol increases gut permeability and stimulates bowel motility. If you have IBS-D, you may find that even one compliant glass of wine worsens symptoms — not because of FODMAPs, but because of the alcohol itself. Track this during your elimination phase.
        </Callout>
        <H2 id="practical">Drinking alcohol with IBS</H2>
        <Ul>
          <Li>Stick to one glass of dry wine per sitting</Li>
          <Li>Drink with food rather than on an empty stomach</Li>
          <Li>Avoid wines described as "sweet" or "off-dry" on the label</Li>
          <Li>Use sparkling water as a mixer rather than juices</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-beer-low-fodmap',
    title: 'Is Beer Low FODMAP?',
    subtitle: 'Regular beer — in a single serving — is low FODMAP. It\'s made primarily from water, barley, hops and yeast, which ferment away most fructans.',
    excerpt: 'One standard can or glass of beer (375 ml) is low FODMAP. The fermentation process eliminates most fructans from the barley. Gluten-free beer is also safe.',
    date: '2025-03-28',
    readTime: '4 min',
    tags: ['fodmap', 'drinks', 'alcohol'],
    category: 'Diet',
    keywords: ['is beer low FODMAP', 'beer IBS', 'beer FODMAP', 'gluten-free beer FODMAP', 'alcohol IBS', 'low FODMAP alcoholic drinks'],
    heroImage: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Glass of golden beer with foam on a bar counter',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'One standard serving of beer (375 ml can or pint) is low FODMAP — fermentation degrades barley fructans.',
      'Gluten-free beer is also low FODMAP at one serving.',
      'Craft beers with added fruit, honey, or lactose adjuncts may be high FODMAP — check ingredients.',
      'Alcohol itself can worsen IBS symptoms via gut motility effects — separate from FODMAP content.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Beer', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Beer is made from wheat or barley — both fructan-containing grains. So how can it be low FODMAP? The answer is the same as sourdough bread: fermentation.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Regular lager / ale, 375 ml (1 can / standard glass): <Em>low FODMAP</Em></Li>
          <Li>Gluten-free beer, 375 ml: <Em>low FODMAP</Em></Li>
          <Li>Stout / porter, 375 ml: <Em>low FODMAP</Em></Li>
          <Li>Beer with added fruit puree (many craft beers): <Em>check ingredients</Em></Li>
          <Li>Milk stout (lactose added): <Em>high FODMAP</Em></Li>
          <Li>Beer with honey: <Em>high FODMAP</Em></Li>
        </Ul>
        <H2 id="fermentation">Why fermentation makes beer safe</H2>
        <P>During brewing, yeast ferments the grain sugars into alcohol and CO₂. The fructans in barley are also significantly degraded by this process — what ends up in your glass contains very little of the original fructan content. This is why a standard serving of beer clears the FODMAP threshold.</P>
        <Callout variant="warning" title="Craft beer adjuncts are unpredictable">
          The explosion of craft brewing has introduced beers made with lactose (for smoothness), honey (for sweetness), and fruit purees (for flavour). Any of these can make an otherwise low-FODMAP beer high FODMAP. Check tap descriptions and bottle labels carefully.
        </Callout>
        <H2 id="practical">Beer and IBS in practice</H2>
        <Ul>
          <Li>One standard serving is safe from a FODMAP perspective</Li>
          <Li>Monitor whether alcohol itself (not FODMAPs) worsens your symptoms</Li>
          <Li>Avoid sharing pitchers — portion control is harder</Li>
          <Li>Choose simple lagers, ales, or pale ales over complex craft beers with added ingredients</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-almond-milk-low-fodmap',
    title: 'Is Almond Milk Low FODMAP?',
    subtitle: 'Unsweetened almond milk is a reliable low-FODMAP dairy alternative — but not all almond milks are equal.',
    excerpt: 'Unsweetened almond milk is low FODMAP at 250 ml. Flavoured, sweetened, or protein-enriched versions may contain high-FODMAP additives.',
    date: '2025-03-29',
    readTime: '4 min',
    tags: ['fodmap', 'dairy-alternatives', 'drinks'],
    category: 'Diet',
    keywords: ['is almond milk low FODMAP', 'almond milk IBS', 'almond milk FODMAP', 'plant milk FODMAP', 'dairy free IBS', 'low FODMAP milk alternative'],
    heroImage: '/almond-milk.png',
    heroAlt: 'Glass of almond milk with whole almonds on the side',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Unsweetened almond milk is low FODMAP at 250 ml — a full glass or large coffee.',
      'Sweetened versions, vanilla-flavoured, and "protein" almond milks may contain inulin or high-FODMAP syrups.',
      'Almonds are only low FODMAP at 10 nuts — but almond milk contains so little actual almond that the GOS doesn\'t accumulate.',
      'Always choose "unsweetened" and check the ingredient list for chicory root, inulin, or honey.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Almond milk', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Almond milk is one of the most popular dairy alternatives, and unlike whole almonds (which have a strict 10-nut limit), almond milk is safe at a full glass. The reason is dilution: commercial almond milk is mostly water, with a small amount of almond providing flavour and a small amount of nutrients.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Unsweetened almond milk, 250 ml: <Em>low FODMAP</Em></Li>
          <Li>Sweetened almond milk: <Em>check label</Em> — added sugars may include HFCS</Li>
          <Li>Vanilla almond milk: <Em>check label</Em> — often contains added syrups</Li>
          <Li>Protein almond milk: <Em>check label</Em> — often contains inulin (chicory root) for fibre</Li>
          <Li>Barista almond milk: <Em>varies</Em> — some brands add inulin; others don't</Li>
        </Ul>
        <H2 id="label">How to read the label</H2>
        <Callout variant="tip" title="Three things to check on every almond milk label">
          (1) Sweeteners: look for "chicory root extract", "inulin", "agave", or "honey" — all high FODMAP. (2) Thickeners: carrageenan and locust bean gum are low FODMAP, but inulin added for fibre is not. (3) Protein enrichment: added pea protein is fine; added chicory-derived fibre is not.
        </Callout>
        <H2 id="practical">Using almond milk in everyday cooking</H2>
        <Ul>
          <Li>Coffee and tea — froths well for lattes if it's a barista edition (check label)</Li>
          <Li>Oatmeal and cereals — mild flavour that doesn't overpower</Li>
          <Li>Smoothies — neutral base that works with most fruits</Li>
          <Li>Baking — swap 1:1 for regular milk in most recipes</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-blueberry-low-fodmap',
    title: 'Is Blueberry Low FODMAP?',
    subtitle: 'Blueberries are low FODMAP in a small portion — but double the serving and you\'ve crossed into high-FODMAP territory.',
    excerpt: 'Blueberries are low FODMAP at 40 g (about 28 berries). At 80 g, excess fructose becomes a problem. They\'re worth including, but portion control matters.',
    date: '2025-03-30',
    readTime: '4 min',
    tags: ['fodmap', 'fruit', 'fructose'],
    category: 'Diet',
    keywords: ['is blueberry low FODMAP', 'blueberries IBS', 'blueberry FODMAP', 'blueberry serving size IBS', 'low FODMAP berries', 'fructose in blueberries'],
    heroImage: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Fresh blueberries in a white bowl',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Blueberries are low FODMAP at 40 g (roughly 28 berries) — a modest but real portion.',
      'At 80 g, excess fructose rises above threshold — the serving effectively doubles the FODMAP load.',
      'Fresh and frozen blueberries have the same FODMAP status at equal weights.',
      'Blueberry jam and dried blueberries are high FODMAP — concentration elevates fructose significantly.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Blueberry', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Blueberries are nutritionally excellent — rich in antioxidants and low in calories — but their FODMAP portion limit is tighter than many people realise. Forty grams is the line, and it's easy to exceed without noticing.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Blueberries, 40 g (~28 berries): <Em>low FODMAP</Em></Li>
          <Li>Blueberries, 80 g (~56 berries): <Em>high FODMAP</Em> — excess fructose</Li>
          <Li>Frozen blueberries, 40 g: <Em>low FODMAP</Em></Li>
          <Li>Dried blueberries: <Em>high FODMAP</Em></Li>
          <Li>Blueberry jam: <Em>high FODMAP</Em></Li>
        </Ul>
        <H2 id="practical">Including blueberries on a low-FODMAP diet</H2>
        <Callout variant="tip" title="Measure before you add to oatmeal or smoothies">
          Blueberries are most often eaten mindlessly — poured into oatmeal, thrown into a smoothie, or grabbed by the handful. Until you have a reliable visual sense of what 40 g looks like, weigh them.
        </Callout>
        <Ul>
          <Li>Add 40 g to oatmeal with maple syrup</Li>
          <Li>Blend 40 g (frozen works well) into a smoothie with lactose-free yogurt and banana</Li>
          <Li>Use as a cake or muffin topping within portion limits</Li>
          <Li>Combine with strawberries for a larger apparent fruit portion — both are low FODMAP at their respective limits</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-mango-low-fodmap',
    title: 'Is Mango Low FODMAP?',
    subtitle: 'Mango is safe at a small 40 g serving — but most people eat far more than that, tipping it into high-FODMAP territory.',
    excerpt: 'Mango is low FODMAP at 40 g (about 2 small cubes). A standard eating portion of mango is high FODMAP due to excess fructose.',
    date: '2025-03-31',
    readTime: '4 min',
    tags: ['fodmap', 'fruit', 'fructose'],
    category: 'Diet',
    keywords: ['is mango low FODMAP', 'mango IBS', 'mango FODMAP', 'mango serving size FODMAP', 'tropical fruit IBS', 'fructose in mango'],
    heroImage: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Sliced ripe mango on a white plate',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Mango is low FODMAP at only 40 g — approximately 2 small cubes.',
      'A normal mango portion (100–150 g, half a mango) is high FODMAP due to excess free fructose.',
      'Dried mango, mango juice, and mango smoothie bases are high FODMAP.',
      'Pineapple is a better low-FODMAP tropical fruit choice — you can eat 130 g safely.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Mango', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Mango is beloved in cuisines across the world, but its fructose content makes it one of the more restrictive fruits on the low-FODMAP diet. The safe window — 40 g — is a garnish, not a serving.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Mango, 40 g (~2 small cubes): <Em>low FODMAP</Em></Li>
          <Li>Mango, 100 g (about ⅓ of a mango): <Em>high FODMAP</Em></Li>
          <Li>Dried mango: <Em>high FODMAP</Em></Li>
          <Li>Mango juice: <Em>high FODMAP</Em></Li>
          <Li>Frozen mango: same limits as fresh (by weight)</Li>
        </Ul>
        <H2 id="alternatives">Better tropical fruit alternatives</H2>
        <Callout variant="tip" title="Pineapple gives you a more satisfying tropical portion">
          Pineapple is low FODMAP at 130 g — more than three times the mango limit. If you're craving tropical fruit, pineapple is the more practical choice. Papaya (ripe) is also low FODMAP at 140 g.
        </Callout>
        <H2 id="practical">Using mango without overdoing it</H2>
        <Ul>
          <Li>Use as a garnish or flavour accent — a few cubes on a rice bowl or salsa</Li>
          <Li>Combine with 40 g mango + pineapple for a tropical fruit mix within limits</Li>
          <Li>Avoid mango smoothie bases sold in cafés — they use large volumes</Li>
          <Li>Re-introduction: test larger mango portions after the elimination phase to find your personal threshold</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-potato-low-fodmap',
    title: 'Is Potato Low FODMAP?',
    subtitle: 'Plain potato is one of the most reliable and freely portioned low-FODMAP starchy foods — a genuine staple of the diet.',
    excerpt: 'White, red, and yellow potatoes are low FODMAP at generous serving sizes. Plain mashed, boiled, roasted, or baked potato is completely safe.',
    date: '2025-04-01',
    readTime: '3 min',
    tags: ['fodmap', 'vegetables', 'staples'],
    category: 'Diet',
    keywords: ['is potato low FODMAP', 'potato IBS', 'potato FODMAP', 'mashed potato low FODMAP', 'chips FODMAP', 'low FODMAP starchy vegetables'],
    heroImage: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Various types of potatoes on a rustic wooden surface',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Plain white, red, and yellow-fleshed potatoes are low FODMAP at generous portions (300 g or more).',
      'Potato skins contain slightly more FODMAPs but remain safe at normal eating amounts.',
      'The problems arise with additions: garlic, cream, butter substitutes, or onion.',
      'Potato crisps (plain, salted) are low FODMAP — flavoured varieties with onion or garlic powder are not.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Potato', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Potato is one of the great consolations of the low-FODMAP diet. At a time when so many foods require careful measuring and label-reading, plain potato just works — at a satisfying, no-fuss portion.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>White / red / yellow potato, 300 g: <Em>low FODMAP</Em></Li>
          <Li>Boiled, mashed, baked, roasted potato: <Em>low FODMAP</Em></Li>
          <Li>Plain potato crisps / chips (salted): <Em>low FODMAP</Em></Li>
          <Li>Potato with garlic butter: <Em>high FODMAP</Em> — garlic is the issue</Li>
          <Li>Instant mash with added dairy: <Em>check label</Em></Li>
          <Li>Restaurant-style loaded potato (sour cream, cheese, chives): <Em>low FODMAP</Em> if made with lactose-free sour cream and hard cheese</Li>
        </Ul>
        <H2 id="mash">The mashed potato trap</H2>
        <Callout variant="warning" title="Mashed potato additions are usually the FODMAP source">
          Plain mash (potato + lactose-free butter + lactose-free milk + salt) is low FODMAP. Add garlic, onion, cream (high lactose), or a cream cheese stir-in, and it becomes high FODMAP. The potato is never the problem.
        </Callout>
        <H2 id="practical">Potato on a low-FODMAP diet</H2>
        <Ul>
          <Li>Roast with garlic-infused oil, rosemary, and sea salt</Li>
          <Li>Mash with lactose-free butter and milk + chives</Li>
          <Li>Bake and top with lactose-free sour cream, hard cheese, and spring onion tops</Li>
          <Li>Make wedges with paprika and olive oil as a side dish</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-cauliflower-low-fodmap',
    title: 'Is Cauliflower Low FODMAP?',
    subtitle: 'Cauliflower is high FODMAP at most eating portions — a surprise to many given its superfood reputation.',
    excerpt: 'Cauliflower is high FODMAP even at 100 g due to mannitol and fructan content. It\'s one of the more counterintuitive vegetables on the diet.',
    date: '2025-04-02',
    readTime: '4 min',
    tags: ['fodmap', 'vegetables', 'polyols', 'fructans'],
    category: 'Diet',
    keywords: ['is cauliflower low FODMAP', 'cauliflower IBS', 'cauliflower FODMAP', 'cauliflower rice FODMAP', 'mannitol foods', 'high FODMAP vegetables'],
    heroImage: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Fresh white cauliflower head on a dark background',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Cauliflower is high FODMAP at typical eating portions — mannitol and fructans are both present.',
      'Even a 50 g portion is moderate FODMAP — there is no generous "safe" serving size.',
      'Cauliflower rice (a popular low-carb staple) is high FODMAP unless eaten in very small amounts.',
      'Broccoli heads at 75 g are a better low-FODMAP cruciferous vegetable choice.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Cauliflower', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Cauliflower has been elevated in modern nutrition culture — cauliflower rice, cauliflower pizza crust, cauliflower mash. For people with IBS on a low-FODMAP diet, this trend is unfortunately misaligned with the food's actual FODMAP profile.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Cauliflower, 50 g: <Em>moderate FODMAP</Em></Li>
          <Li>Cauliflower, 100 g (a small side dish): <Em>high FODMAP</Em></Li>
          <Li>Cauliflower rice (100 g serving): <Em>high FODMAP</Em></Li>
          <Li>Cauliflower pizza crust: <Em>high FODMAP</Em></Li>
          <Li>Frozen cauliflower: same FODMAP content by weight</Li>
        </Ul>
        <H2 id="alternatives">What to use instead</H2>
        <Callout variant="tip" title="Use celeriac for mash, broccoli for roasted veg">
          For mash: celeriac is low FODMAP at 75 g and has a similar creamy texture when cooked. For roasted cruciferous vegetables: broccoli florets at 75 g are safe. For rice alternatives: regular rice or quinoa.
        </Callout>
        <H2 id="reintro">After the elimination phase</H2>
        <P>Cauliflower is a useful candidate to test during the FODMAP re-introduction phase. Some people can tolerate a small side serving (50 g) without symptoms — especially those who are not sensitive to mannitol specifically. Testing polyols systematically will tell you where your personal limit lies.</P>
      </>
    ),
  },

  {
    slug: 'is-celery-low-fodmap',
    title: 'Is Celery Low FODMAP?',
    subtitle: 'Celery is high FODMAP at most eating amounts — even a single stalk can exceed the mannitol threshold for sensitive individuals.',
    excerpt: 'Celery is high FODMAP due to mannitol. One small stalk (10 g) is the maximum low-FODMAP portion — not a practical eating amount for most dishes.',
    date: '2025-04-03',
    readTime: '4 min',
    tags: ['fodmap', 'vegetables', 'polyols'],
    category: 'Diet',
    keywords: ['is celery low FODMAP', 'celery IBS', 'celery FODMAP', 'mannitol vegetables IBS', 'high FODMAP vegetables list', 'celery juice FODMAP'],
    heroImage: '/celery.png',
    heroAlt: 'Fresh celery stalks on a white background',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Celery is high FODMAP beyond 10 g (one thin slice or a tiny piece) — mannitol is the culprit.',
      'A single medium celery stalk (40 g) is well over the safe limit.',
      'Celery juice — currently popular as a wellness drink — is high FODMAP and particularly risky.',
      'Fennel (bulb, 50 g) and cucumber are low-FODMAP alternatives that provide a similar crunchy texture.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Celery', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Celery appears harmless — low calorie, high water content, used in countless soups and salads. But from a FODMAP perspective, it carries a surprisingly meaningful mannitol load that makes it one of the more problematic vegetables at everyday serving sizes.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Celery, 10 g (one thin slice): <Em>low FODMAP</Em></Li>
          <Li>Celery, 1 medium stalk (40 g): <Em>high FODMAP</Em></Li>
          <Li>Celery as a soup base (half a bunch): <Em>high FODMAP</Em></Li>
          <Li>Celery juice: <Em>high FODMAP</Em></Li>
          <Li>Celery salt: <Em>small amounts low FODMAP</Em> — the quantity used in cooking is tiny</Li>
        </Ul>
        <H2 id="alternatives">Low-FODMAP alternatives for crunch and flavour</H2>
        <Callout variant="tip" title="These vegetables fill the celery gap">
          Cucumber and fennel bulb (50 g) provide a similar fresh, crunchy quality without the mannitol risk. Carrot sticks do the same job for crudités. For a mirepoix base in soups, use carrot and fennel instead of the traditional carrot/celery/onion.
        </Callout>
        <H2 id="practical">Re-introduction guidance</H2>
        <P>During polyol re-introduction testing, celery is worth testing if you want to determine whether mannitol specifically triggers your symptoms. If you tolerate mannitol (which would also mean tolerating mushrooms, sweet potato in larger amounts, and cauliflower), you may find you can tolerate a small amount of celery. Test one variable at a time.</P>
      </>
    ),
  },

  {
    slug: 'is-pineapple-low-fodmap',
    title: 'Is Pineapple Low FODMAP?',
    subtitle: 'Pineapple is one of the best tropical fruits on the low-FODMAP diet — a generous 130 g serving fits comfortably within safe limits.',
    excerpt: 'Fresh pineapple is low FODMAP at 130 g. It contains no excess fructose, no polyols, and minimal fructans — making it freely safe at normal portions.',
    date: '2025-04-04',
    readTime: '3 min',
    tags: ['fodmap', 'fruit', 'safe-foods'],
    category: 'Diet',
    keywords: ['is pineapple low FODMAP', 'pineapple IBS', 'pineapple FODMAP', 'tropical fruit low FODMAP', 'safe fruits IBS', 'pineapple juice FODMAP'],
    heroImage: 'https://images.unsplash.com/photo-1490885578174-acda8905c2c6?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Fresh pineapple slices on a white plate',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Fresh pineapple is low FODMAP at 130 g — a satisfying, generous tropical portion.',
      'Pineapple juice may be higher FODMAP once concentrated — stick to whole fruit.',
      'Tinned pineapple in juice is lower FODMAP than in syrup; drain and rinse.',
      'Pineapple is a great alternative to mango when you want a tropical flavour without portion anxiety.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Pineapple', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>When tropical fruits like mango and watermelon are off limits in normal amounts, pineapple is a welcome exception. Its FODMAP content at a reasonable portion is low across all categories.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Fresh pineapple, 130 g (about 2–3 rings): <Em>low FODMAP</Em></Li>
          <Li>Frozen pineapple, 130 g: <Em>low FODMAP</Em></Li>
          <Li>Tinned pineapple in juice (130 g, drained): <Em>low FODMAP</Em></Li>
          <Li>Tinned pineapple in syrup: <Em>higher FODMAP</Em> — syrup concentrates sugars</Li>
          <Li>Pineapple juice (125 ml): <Em>low FODMAP</Em> at this amount but less satisfying than whole fruit</Li>
        </Ul>
        <H2 id="practical">Using pineapple in cooking</H2>
        <Callout variant="success" title="One of the most versatile tropical options on a low-FODMAP diet">
          Pineapple works in savoury dishes (stir-fries, salsas), fruit salads, smoothies, and as a fresh snack. The enzyme bromelain it contains may also have mild anti-inflammatory properties.
        </Callout>
        <Ul>
          <Li>Add cubed fresh pineapple to chicken stir-fries for a sweet-sour note</Li>
          <Li>Combine with cucumber and mint for a refreshing salad</Li>
          <Li>Blend with lactose-free coconut milk for a low-FODMAP smoothie</Li>
          <Li>Grill pineapple rings and serve with lactose-free ice cream for dessert</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-watermelon-low-fodmap',
    title: 'Is Watermelon Low FODMAP?',
    subtitle: 'Watermelon is one of the highest-FODMAP fruits — it contains both excess fructose and mannitol, making even small servings a risk.',
    excerpt: 'Watermelon is high FODMAP at any practical serving size. It contains both free fructose and mannitol, making it one of the most potent fruit triggers for IBS.',
    date: '2025-04-05',
    readTime: '4 min',
    tags: ['fodmap', 'fruit', 'fructose', 'polyols'],
    category: 'Diet',
    keywords: ['is watermelon low FODMAP', 'watermelon IBS', 'watermelon FODMAP', 'high FODMAP fruits', 'fructose foods IBS', 'summer fruit IBS'],
    heroImage: 'https://images.unsplash.com/photo-1563114773-84221bd62daa?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Sliced watermelon on a picnic table',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Watermelon is high FODMAP at any practical serving — both excess fructose and mannitol are present.',
      'A 150 g portion (a normal slice) is definitively high FODMAP — there is no safe "small" eating amount.',
      'Watermelon juice and watermelon-flavoured drinks are also high FODMAP.',
      'Honeydew melon is also high FODMAP; cantaloupe/rockmelon at 120 g is low FODMAP.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Watermelon', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Watermelon's high water content makes it seem innocent, but it is one of the most problematic fruits for IBS patients managing FODMAP intake. Unlike some fruits where a small portion is safe, watermelon contains two separate FODMAP classes at significant levels.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Watermelon, any typical serving: <Em>high FODMAP</Em></Li>
          <Li>Watermelon, 150 g (1 slice): <Em>high FODMAP</Em> — excess fructose + mannitol</Li>
          <Li>Watermelon juice: <Em>high FODMAP</Em></Li>
          <Li>Honeydew melon: <Em>high FODMAP</Em></Li>
          <Li>Cantaloupe / rockmelon, 120 g: <Em>low FODMAP</Em></Li>
        </Ul>
        <H2 id="why">Why watermelon is particularly problematic</H2>
        <P>Watermelon has both excess fructose (more fructose than glucose in the sugar profile) and significant mannitol content. These two FODMAP classes act through different gut mechanisms, so their effects can compound. This makes watermelon one of the more reliably symptomatic foods for people with IBS, particularly those with mixed FODMAP sensitivities.</P>
        <H2 id="alternatives">Summer fruit alternatives</H2>
        <Callout variant="tip" title="Cantaloupe is the low-FODMAP melon">
          Cantaloupe (rockmelon) is low FODMAP at 120 g — a proper wedge — and provides a similar refreshing, juicy quality to watermelon. Strawberries are another excellent summer fruit option.
        </Callout>
      </>
    ),
  },

  {
    slug: 'is-orange-low-fodmap',
    title: 'Is Orange Low FODMAP?',
    subtitle: 'Oranges are low FODMAP — one of the better citrus options for getting vitamin C without gut consequences.',
    excerpt: 'A medium orange (130 g) is low FODMAP. Orange juice in larger amounts may be higher — whole fruit is always the safer choice.',
    date: '2025-04-06',
    readTime: '3 min',
    tags: ['fodmap', 'fruit', 'citrus'],
    category: 'Diet',
    keywords: ['is orange low FODMAP', 'orange IBS', 'orange FODMAP', 'orange juice FODMAP', 'citrus low FODMAP', 'vitamin C IBS diet'],
    heroImage: 'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Fresh oranges sliced in half showing the interior',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'One medium orange (130 g) is low FODMAP — a normal portion of fruit.',
      'Orange juice at 125 ml is low FODMAP; larger glasses (250 ml) may accumulate fructose.',
      'Mandarins and clementines are also low FODMAP at 2 fruits (120 g).',
      'Orange peel / zest is low FODMAP and a great flavour addition to baking and dressings.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Orange', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>When apples, pears, and mangoes are off the table, finding reliable low-FODMAP fruit can feel limiting. Oranges provide a genuinely useful, vitamin C-rich option at a satisfying portion.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Orange, 1 medium (130 g): <Em>low FODMAP</Em></Li>
          <Li>Mandarin / clementine, 2 fruits (120 g): <Em>low FODMAP</Em></Li>
          <Li>Orange juice, 125 ml: <Em>low FODMAP</Em></Li>
          <Li>Orange juice, 250 ml (a large glass): <Em>moderate–high FODMAP</Em></Li>
          <Li>Orange zest: <Em>low FODMAP</Em></Li>
          <Li>Blood orange (130 g): <Em>low FODMAP</Em></Li>
        </Ul>
        <H2 id="practical">Using orange in a low-FODMAP diet</H2>
        <Callout variant="success" title="Citrus zest is a great flavour tool">
          Orange and lemon zest add bright flavour to dressings, baked goods, and marinades with no FODMAP risk. Always use organic citrus if eating the zest to avoid pesticide residues on the skin.
        </Callout>
        <Ul>
          <Li>Eat whole as a snack — peel and eat, or segment into a salad</Li>
          <Li>Add zest to low-FODMAP pancakes, muffins, or salad dressings</Li>
          <Li>Squeeze over salmon or chicken before roasting</Li>
          <Li>Stick to 125 ml of juice if you prefer drinking citrus</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-lemon-low-fodmap',
    title: 'Is Lemon Low FODMAP?',
    subtitle: 'Lemon juice and zest are completely low FODMAP — one of the most useful flavour tools available on the diet.',
    excerpt: 'Lemon juice and zest are low FODMAP in the amounts used in cooking and dressings. Lemon is a reliable, flavour-forward ingredient with no gut concerns.',
    date: '2025-04-07',
    readTime: '3 min',
    tags: ['fodmap', 'fruit', 'citrus', 'cooking'],
    category: 'Diet',
    keywords: ['is lemon low FODMAP', 'lemon IBS', 'lemon juice FODMAP', 'citrus IBS', 'low FODMAP flavouring', 'lemon zest FODMAP'],
    heroImage: '/lemon.png',
    heroAlt: 'Fresh lemon halves and whole lemons on a white surface',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Lemon juice is low FODMAP at 30 ml (2 tablespoons) — a normal cooking or dressing amount.',
      'Lemon zest is low FODMAP and adds significant flavour without any FODMAP concerns.',
      'Lime juice and lime zest are also low FODMAP.',
      'Lemon cordial and lemon-flavoured drinks often contain HFCS — check labels separately.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Lemon', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Lemon is one of the most useful ingredients in low-FODMAP cooking — not because it adds bulk, but because it lifts every dish it touches. Salt and acid are the foundation of good flavour, and lemon provides the acid without any FODMAP concerns at cooking amounts.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Lemon juice, 30 ml (2 tbsp): <Em>low FODMAP</Em></Li>
          <Li>Lemon zest: <Em>low FODMAP</Em></Li>
          <Li>Lime juice and zest: <Em>low FODMAP</Em></Li>
          <Li>Lemon cordial (commercial): <Em>check label</Em> — often HFCS or sorbitol</Li>
          <Li>Lemon curd: <Em>check label</Em> — may contain high-FODMAP sweeteners</Li>
        </Ul>
        <H2 id="cooking">Using lemon in low-FODMAP cooking</H2>
        <Callout variant="success" title="Lemon is the single most useful flavour tool on the low-FODMAP diet">
          A squeeze of lemon brightens virtually any savoury dish and cuts through the richness of protein-heavy meals. It replaces the flavour depth that garlic and onion would otherwise provide.
        </Callout>
        <Ul>
          <Li>Dress any salad with lemon juice + olive oil + Dijon mustard + maple syrup</Li>
          <Li>Squeeze over fish, chicken, or roasted vegetables just before serving</Li>
          <Li>Add zest to rice, risotto, or pasta for brightness</Li>
          <Li>Use in marinades alongside garlic-infused oil and fresh herbs</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-cucumber-low-fodmap',
    title: 'Is Cucumber Low FODMAP?',
    subtitle: 'Cucumber is one of the most freely safe vegetables on the low-FODMAP diet — eat as much as you like.',
    excerpt: 'Cucumber is low FODMAP at any typical serving size. It contains no significant FODMAPs and is one of the most reliable salad and snacking vegetables available.',
    date: '2025-04-08',
    readTime: '3 min',
    tags: ['fodmap', 'vegetables', 'safe-foods'],
    category: 'Diet',
    keywords: ['is cucumber low FODMAP', 'cucumber IBS', 'cucumber FODMAP', 'low FODMAP salad vegetables', 'safe vegetables IBS', 'cucumber snack FODMAP'],
    heroImage: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Fresh sliced cucumber on a white background',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Cucumber is low FODMAP at any practical serving size — eat freely.',
      'Both regular and mini cucumbers are low FODMAP.',
      'Pickled cucumber (gherkins) is low FODMAP if pickled in vinegar/salt brine — not if sweetened.',
      'Tzatziki dip depends on the base: lactose-free yogurt version is low FODMAP; regular yogurt is not.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Cucumber', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Cucumber is one of the most unconditionally safe vegetables you can eat on a low-FODMAP diet. No portion anxiety, no measuring, no special considerations — just slice and eat.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Fresh cucumber (any amount): <Em>low FODMAP</Em></Li>
          <Li>Mini / Persian cucumbers: <Em>low FODMAP</Em></Li>
          <Li>Pickled cucumber in brine (vinegar/salt): <Em>low FODMAP</Em></Li>
          <Li>Sweetened pickle / bread and butter pickles: <Em>check label</Em></Li>
        </Ul>
        <H2 id="practical">Cucumber in everyday eating</H2>
        <Callout variant="success" title="Cucumber is a reliable bulk ingredient">
          Use cucumber freely to add volume, crunch, and water content to meals without any FODMAP concern. It's particularly useful as a snack vehicle for low-FODMAP dips.
        </Callout>
        <Ul>
          <Li>Slice with hummus (small portion) or peanut butter as a snack</Li>
          <Li>Add to salads with spinach, tomato, and carrot</Li>
          <Li>Make a simple Greek-style salad with cucumber, tomato, olives, and feta</Li>
          <Li>Use in sushi rolls with rice and salmon or avocado (within the 30 g avocado limit)</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-bell-pepper-low-fodmap',
    title: 'Is Bell Pepper Low FODMAP?',
    subtitle: 'Red, yellow, and orange bell peppers are low FODMAP — and a great way to add colour, sweetness, and vitamin C to low-FODMAP meals.',
    excerpt: 'Red, yellow, and orange bell peppers are low FODMAP at 52 g. Green bell pepper is slightly higher in fructans but still manageable in small portions.',
    date: '2025-04-09',
    readTime: '4 min',
    tags: ['fodmap', 'vegetables', 'safe-foods'],
    category: 'Diet',
    keywords: ['is bell pepper low FODMAP', 'capsicum low FODMAP', 'bell pepper IBS', 'pepper FODMAP', 'low FODMAP vegetables', 'capsicum FODMAP serving'],
    heroImage: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Red, yellow, and green bell peppers on a market stall',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Red, yellow, and orange bell peppers are low FODMAP at 52 g (about half a medium pepper).',
      'Green bell pepper contains slightly more fructans — keep to a small portion (52 g).',
      'Roasted red peppers from a jar are low FODMAP if canned in brine (not in a sauce with garlic).',
      'Bell pepper is one of the best sources of vitamin C available on the low-FODMAP diet.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Bell Pepper / Capsicum', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Bell peppers — or capsicum — are a versatile, colourful, nutritious vegetable that fits well within the low-FODMAP diet. The colour matters slightly: red, yellow, and orange are the most reliably safe.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Red bell pepper, 52 g (½ medium pepper): <Em>low FODMAP</Em></Li>
          <Li>Yellow bell pepper, 52 g: <Em>low FODMAP</Em></Li>
          <Li>Orange bell pepper, 52 g: <Em>low FODMAP</Em></Li>
          <Li>Green bell pepper, 52 g: <Em>low FODMAP</Em> (slightly more fructans, still safe at this portion)</Li>
          <Li>Roasted red pepper in brine (jar): <Em>low FODMAP</Em></Li>
          <Li>Stuffed peppers with rice and mince: <Em>low FODMAP</Em> if filling uses low-FODMAP ingredients</Li>
        </Ul>
        <H2 id="practical">Using bell pepper in low-FODMAP cooking</H2>
        <Callout variant="success" title="Red pepper adds sweetness and colour to virtually any dish">
          Roasted red pepper is one of the most useful low-FODMAP additions to pasta sauces, grain bowls, omelettes, and wraps. It provides a depth of flavour that can compensate for the absence of garlic and onion.
        </Callout>
        <Ul>
          <Li>Slice into stir-fries with rice, egg, and spring onion tops</Li>
          <Li>Roast with olive oil until caramelised and serve as a side</Li>
          <Li>Use blended roasted red pepper as a pasta sauce base</Li>
          <Li>Add raw to salads for crunch and sweetness</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-kale-low-fodmap',
    title: 'Is Kale Low FODMAP?',
    subtitle: 'Kale is low FODMAP at a 75 g serving — a genuinely useful, nutrient-dense green that works well on the diet.',
    excerpt: 'Kale is low FODMAP at 75 g. It\'s one of the most nutritious leafy greens available and a reliable low-FODMAP choice for salads, soups, and smoothies.',
    date: '2025-04-10',
    readTime: '3 min',
    tags: ['fodmap', 'vegetables', 'leafy-greens'],
    category: 'Diet',
    keywords: ['is kale low FODMAP', 'kale IBS', 'kale FODMAP', 'low FODMAP greens', 'leafy greens IBS', 'kale chips FODMAP'],
    heroImage: '/kale.png',
    heroAlt: 'Fresh green kale leaves on a dark background',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Kale is low FODMAP at 75 g — a full, satisfying salad or soup portion.',
      'Kale chips made with oil and salt are low FODMAP in reasonable amounts.',
      'Kale smoothies are low FODMAP if you use low-FODMAP fruits and milk.',
      'Kale is one of the most nutrient-dense foods available — rich in K, C, and folate.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Kale', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Kale has had a sustained moment in nutrition culture, and for people with IBS, the good news is that the FODMAP data supports including it. At a 75 g portion it clears the threshold for all FODMAP classes.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Kale, raw or cooked (75 g): <Em>low FODMAP</Em></Li>
          <Li>Kale chips, small portion: <Em>low FODMAP</Em></Li>
          <Li>Kale in smoothies (75 g): <Em>low FODMAP</Em></Li>
          <Li>Cavolo nero (Tuscan kale), 75 g: <Em>low FODMAP</Em></Li>
        </Ul>
        <H2 id="practical">Kale in a low-FODMAP diet</H2>
        <Callout variant="success" title="Kale is a versatile, genuinely low-FODMAP leafy green">
          Unlike some vegetables where you need to weigh carefully, kale gives you a real, usable serving at the safe threshold. A large salad bowl or a full portion in soup is within limits.
        </Callout>
        <Ul>
          <Li>Massage raw kale with olive oil and lemon for a robust salad base</Li>
          <Li>Stir into soups and stews in the last few minutes of cooking</Li>
          <Li>Blend into green smoothies with pineapple, ginger, and rice milk</Li>
          <Li>Toss with olive oil, salt, and nutritional yeast; bake at low temperature for kale chips</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-grape-low-fodmap',
    title: 'Is Grape Low FODMAP?',
    subtitle: 'Grapes are low FODMAP at a generous serving — one of the more accessible fruits on the diet.',
    excerpt: 'Red and green grapes are low FODMAP at up to 19 grapes (130 g). They\'re a reliable snack fruit with no excess fructose or polyol concerns.',
    date: '2025-04-11',
    readTime: '3 min',
    tags: ['fodmap', 'fruit', 'safe-foods'],
    category: 'Diet',
    keywords: ['is grape low FODMAP', 'grapes IBS', 'grapes FODMAP', 'low FODMAP fruit snack', 'grape serving size FODMAP', 'red grape IBS'],
    heroImage: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Bunch of fresh red grapes on a white background',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Grapes are low FODMAP at 19 grapes (130 g) — red, green, or black varieties.',
      'Raisins and dried grapes are high FODMAP due to concentrated sugars.',
      'Grape juice at 125 ml is low FODMAP; larger glasses may accumulate fructose.',
      'Wine made from grapes is also low FODMAP at one glass — fermentation changes the sugar profile.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Grapes', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Grapes offer a satisfying sweetness and portability that makes them one of the better snack fruits on the low-FODMAP diet. The portion is generous enough to feel like a real serving of fruit.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Red / green / black grapes, 19 grapes (130 g): <Em>low FODMAP</Em></Li>
          <Li>Seedless grapes (any colour), 130 g: <Em>low FODMAP</Em></Li>
          <Li>Raisins: <Em>high FODMAP</Em></Li>
          <Li>Sultanas: <Em>high FODMAP</Em></Li>
          <Li>Grape juice, 125 ml: <Em>low FODMAP</Em></Li>
        </Ul>
        <H2 id="practical">Grapes in everyday eating</H2>
        <Callout variant="success" title="Grapes are a portable, no-prep low-FODMAP snack">
          Wash, count out roughly 19, and eat. They require no preparation and travel well. Keep a portion in a small container for when snack options feel limited on the go.
        </Callout>
        <Ul>
          <Li>Add to a low-FODMAP cheese board alongside cheddar and crackers</Li>
          <Li>Slice in half and add to grain salads with quinoa, cucumber, and feta</Li>
          <Li>Freeze for a cold snack in summer (frozen grapes are a popular alternative to ice cream)</Li>
          <Li>Pair with walnuts and a square of dark chocolate for a balanced snack</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-pasta-low-fodmap',
    title: 'Is Pasta Low FODMAP?',
    subtitle: 'Small portions of wheat pasta are low FODMAP — and gluten-free pasta is a reliable everyday alternative.',
    excerpt: 'Wheat pasta is low FODMAP at 74 g cooked. Gluten-free pasta (rice, corn, or quinoa base) is unambiguously low FODMAP at normal serving sizes.',
    date: '2025-04-12',
    readTime: '5 min',
    tags: ['fodmap', 'grains', 'wheat'],
    category: 'Diet',
    keywords: ['is pasta low FODMAP', 'pasta IBS', 'pasta FODMAP', 'gluten free pasta FODMAP', 'wheat pasta IBS', 'low FODMAP dinner ideas'],
    heroImage: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Plate of pasta with tomato sauce and fresh basil',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Wheat pasta is low FODMAP at 74 g cooked (about half a cup, al dente) — fructans don\'t accumulate at this portion.',
      'A large restaurant serving of pasta (200–250 g cooked) is likely high FODMAP.',
      'Gluten-free pasta (rice, corn, quinoa flour) is low FODMAP at full serving sizes with no portion concern.',
      'The sauce matters more than the pasta: garlic, onion, and cream can easily make an otherwise safe dish high FODMAP.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Pasta', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
      { label: 'Halmos EP et al. — A diet low in FODMAPs reduces symptoms of IBS', journal: 'Gastroenterology', year: 2014, url: 'https://pubmed.ncbi.nlm.nih.gov/24076059/' },
    ],
    content: (
      <>
        <P>Pasta is a staple in most Western diets, and the prospect of giving it up indefinitely is genuinely discouraging. The FODMAP data offers more nuance than you might expect: both wheat pasta in a controlled portion and gluten-free pasta at full servings are valid options.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Wheat pasta, 74 g cooked: <Em>low FODMAP</Em></Li>
          <Li>Wheat pasta, 150+ g cooked: <Em>high FODMAP</Em></Li>
          <Li>Gluten-free pasta (rice/corn/quinoa), 145 g cooked: <Em>low FODMAP</Em></Li>
          <Li>Spelt pasta: <Em>high FODMAP</Em> — spelt is higher in fructans than wheat pasta</Li>
          <Li>Legume pasta (chickpea, red lentil): <Em>check</Em> — may be high in GOS</Li>
        </Ul>
        <H2 id="serving">The serving size challenge</H2>
        <Callout variant="warning" title="74 g cooked wheat pasta is less than you think">
          A typical home-cooked pasta portion is 100–120 g cooked; a restaurant serving can be 200–250 g. The low-FODMAP limit for wheat pasta is tight. If you want a larger portion, switch to gluten-free pasta where the limit is around 145 g cooked — a much more practical eating amount.
        </Callout>
        <H2 id="sauce">Making low-FODMAP pasta sauces</H2>
        <Ul>
          <Li>Use garlic-infused olive oil as a base instead of fried garlic</Li>
          <Li>Passata (120 ml per serving) + fresh basil + olive oil = simple marinara</Li>
          <Li>Toss with roasted red pepper, anchovies, capers, and olive oil</Li>
          <Li>Make a pesto with basil, pine nuts, parmesan, and garlic-infused oil</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-greek-yogurt-low-fodmap',
    title: 'Is Greek Yogurt Low FODMAP?',
    subtitle: 'Greek yogurt — when properly strained — is lower in lactose than regular yogurt, and some versions are low FODMAP. Brand and type matter.',
    excerpt: 'Plain, strained Greek yogurt can be low FODMAP at 170 g if enough whey (and lactose) has been drained off. Unstrained Greek-style yogurt is high FODMAP.',
    date: '2025-04-13',
    readTime: '4 min',
    tags: ['fodmap', 'dairy', 'lactose'],
    category: 'Diet',
    keywords: ['is Greek yogurt low FODMAP', 'Greek yogurt IBS', 'yogurt FODMAP', 'lactose in Greek yogurt', 'low FODMAP dairy', 'yogurt IBS safe'],
    heroImage: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Bowl of thick Greek yogurt with berries on top',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Properly strained (thick, dense) Greek yogurt may be low FODMAP at 170 g — whey removal takes most of the lactose with it.',
      'Greek-style yogurt (just thickened with additives, not strained) retains full lactose and is high FODMAP.',
      'Flavoured Greek yogurts often contain honey, fruit concentrates, or inulin — read labels.',
      'Lactose-free yogurt (any type) is the most reliable low-FODMAP choice.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Greek yogurt', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Greek yogurt is not all the same product. True Greek yogurt is made by straining regular yogurt through a cloth until much of the whey drains away — concentrating the protein and removing significant lactose. "Greek-style" yogurt is thickened by other means and retains far more lactose.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Properly strained Greek yogurt, plain (170 g): <Em>low FODMAP</Em> (if dense and thick)</Li>
          <Li>Greek-style yogurt (not strained): <Em>high FODMAP</Em></Li>
          <Li>Flavoured Greek yogurt: <Em>check label</Em> — often honey, fruit concentrate, or inulin</Li>
          <Li>Lactose-free yogurt, any type: <Em>low FODMAP</Em></Li>
          <Li>Regular plain yogurt: <Em>high FODMAP</Em></Li>
        </Ul>
        <H2 id="strain">How to identify real Greek yogurt</H2>
        <Callout variant="tip" title="Real Greek yogurt stands on a spoon">
          If you tilt a spoon of Greek yogurt and it slides off immediately like regular yogurt, it's likely not properly strained. Authentic strained yogurt is thick enough to hold its shape briefly. Brands that list "strained" or show a significantly higher protein content per serving are generally the real thing.
        </Callout>
        <H2 id="practical">Yogurt on a low-FODMAP diet</H2>
        <Ul>
          <Li>Lactose-free yogurt is the safest universal choice — use freely</Li>
          <Li>Strained Greek yogurt as a sour cream substitute in recipes</Li>
          <Li>Top with strawberries, maple syrup, and walnuts for breakfast</Li>
          <Li>Use as a base for tzatziki with cucumber and fresh dill (no garlic, or use garlic-infused oil)</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-cabbage-low-fodmap',
    title: 'Is Cabbage Low FODMAP?',
    subtitle: 'Common green cabbage is low FODMAP at a 75 g serving — a useful, affordable vegetable for the elimination phase.',
    excerpt: 'Green (common) cabbage is low FODMAP at 75 g. Savoy cabbage has slightly higher FODMAP content. Both are manageable with careful portions.',
    date: '2025-04-14',
    readTime: '4 min',
    tags: ['fodmap', 'vegetables', 'cooking'],
    category: 'Diet',
    keywords: ['is cabbage low FODMAP', 'cabbage IBS', 'cabbage FODMAP', 'coleslaw FODMAP', 'savoy cabbage FODMAP', 'low FODMAP vegetables list'],
    heroImage: '/cabbage.png',
    heroAlt: 'Fresh green cabbage cut in half on a wooden board',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Green / white cabbage is low FODMAP at 75 g — a reasonable side-dish portion.',
      'Savoy cabbage is lower in FODMAPs at 75 g but has higher content than common cabbage in larger amounts.',
      'Red cabbage is low FODMAP at 75 g.',
      'Coleslaw dressing often contains honey or high-FODMAP vinegars — make your own with lactose-free mayo and apple cider vinegar.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Cabbage', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Cabbage is one of the more affordable vegetables on the low-FODMAP diet and works well in a range of cooking styles — stir-fried, braised, raw in slaw, or fermented as sauerkraut.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Green / white cabbage, 75 g: <Em>low FODMAP</Em></Li>
          <Li>Red cabbage, 75 g: <Em>low FODMAP</Em></Li>
          <Li>Savoy cabbage, 75 g: <Em>low FODMAP</Em></Li>
          <Li>Sauerkraut (fermented cabbage), 30 g: <Em>low FODMAP</Em> — fermentation degrades fructans</Li>
          <Li>Kimchi: <Em>check ingredients</Em> — most traditional kimchi contains garlic and onion</Li>
        </Ul>
        <H2 id="sauerkraut">Fermented cabbage as a gut health tool</H2>
        <Callout variant="tip" title="Sauerkraut is a rare fermented food that is low FODMAP">
          Most fermented foods haven't been tested by Monash, but sauerkraut specifically is low FODMAP at 30 g. The lactic acid fermentation degrades fructans. It also provides beneficial bacteria — a potential bonus for gut health, though the evidence for probiotics in IBS is mixed.
        </Callout>
        <H2 id="practical">Cabbage in low-FODMAP cooking</H2>
        <Ul>
          <Li>Stir-fry shredded cabbage with ginger, tamari, and sesame oil</Li>
          <Li>Make a simple slaw with red cabbage, carrot, and lactose-free mayo dressing</Li>
          <Li>Braise with apple cider vinegar and a pinch of cumin for a German-style side</Li>
          <Li>Stuff large cabbage leaves with seasoned rice and mince (stuffed cabbage rolls)</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-beetroot-low-fodmap',
    title: 'Is Beetroot Low FODMAP?',
    subtitle: 'Beetroot is high FODMAP — its fructan and GOS content make it a reliable IBS trigger at normal serving sizes.',
    excerpt: 'Beetroot is high FODMAP at eating portions due to fructans and GOS. Even two small slices exceed the threshold for many people.',
    date: '2025-04-15',
    readTime: '4 min',
    tags: ['fodmap', 'vegetables', 'fructans'],
    category: 'Diet',
    keywords: ['is beetroot low FODMAP', 'beetroot IBS', 'beet FODMAP', 'beetroot juice FODMAP', 'high FODMAP vegetables', 'root vegetables IBS'],
    heroImage: '/beetroot.png',
    heroAlt: 'Fresh whole beetroots with their green tops',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Beetroot is high FODMAP at any practical eating amount — fructans and GOS are both present.',
      'Two to three slices (44 g) is already high FODMAP — there is no realistic safe serving.',
      'Beetroot juice (a popular health drink) is high FODMAP — avoid during the elimination phase.',
      'Red-coloured urine after eating beetroot is normal (beturia) — not a sign of a health problem.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Beetroot', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Beetroot is nutritionally impressive and widely regarded as a health food — but for IBS patients on a low-FODMAP diet, it is one of the more problematic vegetables due to its double FODMAP content.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Beetroot, 44 g (2–3 slices): <Em>high FODMAP</Em> — fructans + GOS</Li>
          <Li>Pickled beetroot (vinegar-brined): <Em>high FODMAP</Em></Li>
          <Li>Beetroot juice: <Em>high FODMAP</Em></Li>
          <Li>Beetroot hummus: <Em>high FODMAP</Em> (both the beet and chickpea base)</Li>
        </Ul>
        <H2 id="alternatives">What to use for the same colour and earthiness</H2>
        <Callout variant="tip" title="Carrot and red cabbage can substitute in some roles">
          For salads where you want a jewel-coloured root vegetable, roasted carrot and red cabbage provide visual interest without the FODMAP burden. They won't replicate beetroot's earthy flavour exactly, but they're safe and nutritious alternatives.
        </Callout>
        <H2 id="reintro">Testing beetroot in re-introduction</H2>
        <P>During FODMAP re-introduction, beetroot is tested as part of the GOS and fructan ladders. If you find you tolerate both GOS (legumes, brassicas) and fructans (wheat, garlic in small amounts) well, you may be able to reintroduce beetroot in small amounts. Test systematically rather than guessing.</P>
      </>
    ),
  },

  {
    slug: 'is-zucchini-low-fodmap',
    title: 'Is Zucchini (Courgette) Low FODMAP?',
    subtitle: 'Zucchini is low FODMAP at 65 g — a useful vegetable for the elimination phase, especially as a pasta substitute.',
    excerpt: 'Zucchini (courgette) is low FODMAP at 65 g. Larger portions increase mannitol load. It\'s a practical vegetable for low-FODMAP cooking and a popular pasta substitute.',
    date: '2025-04-16',
    readTime: '4 min',
    tags: ['fodmap', 'vegetables', 'polyols'],
    category: 'Diet',
    keywords: ['is zucchini low FODMAP', 'courgette low FODMAP', 'zucchini IBS', 'courgette FODMAP', 'zoodles FODMAP', 'low FODMAP vegetables'],
    heroImage: '/courgette.png',
    heroAlt: 'Fresh green zucchini on a wooden board',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Zucchini is low FODMAP at 65 g — about half a small courgette.',
      'Larger portions (150 g+) increase mannitol content into moderate/high territory.',
      'Zoodles (spiralised zucchini) used as a pasta substitute: keep to around 65 g per serving.',
      'Zucchini is low in calories and high in water — useful for adding bulk to low-FODMAP meals.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Zucchini / Courgette', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Zucchini (courgette) is one of the most popular low-carb vegetable alternatives — spiralised as "zoodles," roasted, stuffed, or fried. For the low-FODMAP diet, it's a useful vegetable with a defined portion limit worth knowing.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Zucchini / courgette, 65 g: <Em>low FODMAP</Em></Li>
          <Li>Zucchini, 150 g (a whole medium courgette): <Em>moderate FODMAP</Em> — mannitol accumulating</Li>
          <Li>Spiralised zucchini (zoodles), 65 g: <Em>low FODMAP</Em></Li>
          <Li>Stuffed zucchini (depending on filling): check filling FODMAPs</Li>
        </Ul>
        <H2 id="practical">Low-FODMAP uses for zucchini</H2>
        <Callout variant="tip" title="Zoodles work well as a partial pasta substitute">
          Rather than replacing pasta entirely with zoodles (which would require a larger portion), combine 65 g of zoodles with 74 g of cooked gluten-free pasta for a mixed bowl that feels more substantial.
        </Callout>
        <Ul>
          <Li>Slice and add to stir-fries alongside bell pepper and carrot</Li>
          <Li>Grill or roast as a simple side with olive oil and lemon</Li>
          <Li>Spiralise 65 g as a pasta base with low-FODMAP marinara</Li>
          <Li>Slice thin and layer into a low-FODMAP frittata with egg and parmesan</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-chickpea-low-fodmap',
    title: 'Is Chickpea Low FODMAP?',
    subtitle: 'Canned, rinsed chickpeas are low FODMAP in a small 42 g portion — larger amounts are a significant GOS source.',
    excerpt: 'Canned chickpeas rinsed under water are low FODMAP at 42 g. Beyond that, GOS accumulates rapidly and becomes a common IBS trigger.',
    date: '2025-04-17',
    readTime: '4 min',
    tags: ['fodmap', 'legumes', 'vegan', 'protein'],
    category: 'Diet',
    keywords: ['is chickpea low FODMAP', 'chickpeas IBS', 'chickpea FODMAP', 'hummus low FODMAP', 'canned chickpeas FODMAP', 'GOS foods IBS'],
    heroImage: '/chickpeas.png',
    heroAlt: 'Bowl of cooked chickpeas on a wooden surface',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Canned chickpeas, drained and rinsed, are low FODMAP at 42 g (¼ cup).',
      'At 120 g (a standard hummus serving base), chickpeas are high FODMAP.',
      'Rinsing canned legumes removes a portion of water-soluble GOS from the surface — always rinse.',
      'Hummus is high FODMAP at most restaurant serving sizes — make a small batch at home from 42 g chickpeas.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Chickpeas', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
      { label: 'Tuck CJ et al. — Fermentable oligosaccharides, disaccharides, monosaccharides and polyols — implications for IBS', journal: 'Journal of Gastroenterology and Hepatology', year: 2014, url: 'https://pubmed.ncbi.nlm.nih.gov/24703459/' },
    ],
    content: (
      <>
        <P>Chickpeas are a staple protein for vegetarian and vegan low-FODMAP dieters, but the portion limit requires real discipline. Forty-two grams sounds like very little — and it is — but within that limit they're a valuable food.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Canned chickpeas (drained, rinsed), 42 g (¼ cup): <Em>low FODMAP</Em></Li>
          <Li>Canned chickpeas, 120 g: <Em>high FODMAP</Em></Li>
          <Li>Dried chickpeas, cooked: same limits as canned by weight</Li>
          <Li>Chickpea flour: <Em>high FODMAP</Em></Li>
          <Li>Hummus (commercial, 2 tbsp): <Em>moderate FODMAP</Em> — check brand; most are higher than 42 g chickpeas</Li>
        </Ul>
        <H2 id="rinsing">Why rinsing matters</H2>
        <P>GOS is water-soluble. The liquid in a can of chickpeas (aquafaba) contains a concentrated amount of GOS — draining and thoroughly rinsing under cold water removes a meaningful portion from the surface of the chickpeas. Never use the canning liquid in low-FODMAP cooking.</P>
        <Callout variant="warning" title="Aquafaba is high FODMAP — avoid in low-FODMAP baking">
          Aquafaba (chickpea brine) is used in vegan baking as an egg substitute. It is high FODMAP and should not be used during the elimination phase.
        </Callout>
        <H2 id="practical">Getting protein from chickpeas within limits</H2>
        <Ul>
          <Li>Add 42 g to salads for protein without exceeding the limit</Li>
          <Li>Make a small-batch hummus with exactly 42 g chickpeas + tahini + lemon + garlic-infused oil</Li>
          <Li>Pair with other low-FODMAP proteins (egg, chicken) in the same meal</Li>
          <Li>Consider canned lentils or firm tofu as higher-volume low-FODMAP vegan protein alternatives</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-lentil-low-fodmap',
    title: 'Is Lentil Low FODMAP?',
    subtitle: 'Canned, rinsed lentils are low FODMAP in a modest 46 g portion — a surprising find for a legume often assumed to be off limits.',
    excerpt: 'Canned red or green lentils, drained and rinsed, are low FODMAP at 46 g. Larger amounts are high FODMAP due to GOS and fructan accumulation.',
    date: '2025-04-18',
    readTime: '4 min',
    tags: ['fodmap', 'legumes', 'protein', 'vegan'],
    category: 'Diet',
    keywords: ['is lentil low FODMAP', 'lentils IBS', 'lentil FODMAP', 'canned lentils FODMAP', 'vegan protein IBS', 'GOS foods IBS'],
    heroImage: '/lentils.png',
    heroAlt: 'Red lentils in a white bowl on a wooden surface',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Canned lentils (drained and rinsed) are low FODMAP at 46 g per serving.',
      'Larger portions quickly become high FODMAP — the limit is tight.',
      'French green (Puy) lentils and red lentils are both tested as low FODMAP in canned form at this portion.',
      'Dried lentils cooked from scratch typically contain more GOS than canned — use canned for the elimination phase.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Lentils', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Lentils are widely expected to be strictly off limits on a low-FODMAP diet — and in large amounts, they are. But canned, rinsed lentils at a small serving are one of the better-kept secrets of the diet for people seeking plant-based protein.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Canned lentils (drained, rinsed), 46 g: <Em>low FODMAP</Em></Li>
          <Li>Canned lentils, 100 g: <Em>high FODMAP</Em></Li>
          <Li>Dried red lentils, cooked from scratch: <Em>higher FODMAP</Em> — use canned</Li>
          <Li>Lentil soup (restaurant): <Em>assume high FODMAP</Em> — large portions, often garlic/onion base</Li>
          <Li>Puy / French green lentils, 46 g canned: <Em>low FODMAP</Em></Li>
        </Ul>
        <H2 id="why-canned">Why canned lentils differ from dried</H2>
        <P>Cooking lentils from dried releases GOS into the cooking water. Canned lentils have already been cooked and then stored in liquid that you drain away — removing a proportion of water-soluble GOS. The rinse step removes more from the surface. This is why canned, rinsed lentils are more reliable than home-cooked dried lentils for FODMAP-sensitive individuals.</P>
        <Callout variant="tip" title="Drain and rinse thoroughly — 30 seconds under cold running water">
          Don't just tip the liquid off. Rinse the lentils under running water in a sieve until the water runs clear. This step makes a measurable difference to GOS content.
        </Callout>
        <H2 id="practical">Using lentils in low-FODMAP cooking</H2>
        <Ul>
          <Li>Add 46 g to salads alongside cucumber, tomato, and feta</Li>
          <Li>Mix into rice dishes for texture and protein</Li>
          <Li>Make a small-portion dhal using canned lentils, turmeric, cumin, and garlic-infused oil</Li>
          <Li>Combine with firm tofu and carrot in a grain bowl for a vegan low-FODMAP meal</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-pumpkin-low-fodmap',
    title: 'Is Pumpkin Low FODMAP?',
    subtitle: 'Canned pumpkin puree is low FODMAP at 75 g — but butternut squash is high FODMAP and often confused with pumpkin.',
    excerpt: 'Canned pumpkin puree is low FODMAP at 75 g. Fresh pumpkin varies by variety. Butternut squash is high FODMAP and not a safe swap.',
    date: '2025-04-19',
    readTime: '4 min',
    tags: ['fodmap', 'vegetables', 'polyols'],
    category: 'Diet',
    keywords: ['is pumpkin low FODMAP', 'pumpkin IBS', 'pumpkin FODMAP', 'butternut squash FODMAP', 'canned pumpkin FODMAP', 'low FODMAP vegetables'],
    heroImage: 'https://images.unsplash.com/photo-1509622905150-fa66d3906e09?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Autumn pumpkins on a wooden table',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Canned pumpkin puree is low FODMAP at 75 g — useful in baking and soups.',
      'Butternut squash (often called pumpkin in UK and Australia) is high FODMAP — don\'t confuse them.',
      'Japanese / kabocha pumpkin has not been tested as comprehensively — use canned pumpkin for safety.',
      'Kent / Queensland pumpkin at 75 g is low FODMAP in some Monash ratings — check the app for the most current data.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Pumpkin', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Pumpkin is confusing in the FODMAP context partly because the word "pumpkin" covers many different varieties — and they don't all have the same FODMAP profile. The safest approach is to use canned pumpkin puree during the elimination phase, where Monash's rating is clear.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Canned pumpkin puree, 75 g: <Em>low FODMAP</Em></Li>
          <Li>Butternut squash / butternut pumpkin: <Em>high FODMAP</Em> — mannitol</Li>
          <Li>Kent / Queensland pumpkin, 75 g: <Em>low FODMAP</Em> (per Monash)</Li>
          <Li>Japanese / kabocha pumpkin: <Em>check current Monash app</Em></Li>
          <Li>Pumpkin seeds: <Em>low FODMAP</Em> (2 tbsp / 23 g)</Li>
        </Ul>
        <H2 id="butternut">The butternut confusion</H2>
        <Callout variant="warning" title="Butternut squash is commonly called 'pumpkin' in some countries">
          In Australian and British supermarkets, what's sold as "pumpkin" is often butternut squash — which is high FODMAP. If the vegetable has a long neck and bulbous base, smooth tan/beige skin, and orange flesh, it is butternut squash and should be avoided during elimination.
        </Callout>
        <H2 id="practical">Using pumpkin in low-FODMAP cooking</H2>
        <Ul>
          <Li>Add 75 g of canned pumpkin to soups for body and natural sweetness</Li>
          <Li>Use in low-FODMAP muffins and pancakes (swap for part of the flour)</Li>
          <Li>Roast Kent pumpkin cubes with olive oil and cinnamon as a side dish</Li>
          <Li>Make a pumpkin curry with coconut milk, ginger, and turmeric</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-soy-sauce-low-fodmap',
    title: 'Is Soy Sauce Low FODMAP?',
    subtitle: 'Traditional soy sauce is low FODMAP in small amounts — and tamari (wheat-free soy sauce) is also safe and coeliac-friendly.',
    excerpt: 'Soy sauce is low FODMAP at 2 tablespoons. Tamari is a gluten-free alternative that is also low FODMAP and delivers the same umami flavour.',
    date: '2025-04-20',
    readTime: '3 min',
    tags: ['fodmap', 'condiments', 'cooking'],
    category: 'Diet',
    keywords: ['is soy sauce low FODMAP', 'soy sauce IBS', 'soy sauce FODMAP', 'tamari low FODMAP', 'low FODMAP condiments', 'gluten free soy sauce IBS'],
    heroImage: '/soy-sauce.png',
    heroAlt: 'Bottle of soy sauce with chopsticks on a wooden surface',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Soy sauce is low FODMAP at 2 tablespoons — the brewing process breaks down GOS and fructans.',
      'Tamari (wheat-free / gluten-free soy sauce) is also low FODMAP and suitable for coeliac disease.',
      'Sweet soy sauce (kecap manis) may contain high-FODMAP sweeteners — check labels.',
      'Use soy sauce / tamari as a flavour base in stir-fries, marinades, and dressings.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Soy Sauce', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Soy sauce is made from fermented soybeans — and like other fermented products, the fermentation process reduces the FODMAP content significantly. The result is a condiment that provides deep umami flavour and is safe at cooking amounts.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Soy sauce (traditional), 2 tbsp (42 ml): <Em>low FODMAP</Em></Li>
          <Li>Tamari (gluten-free soy sauce), 2 tbsp: <Em>low FODMAP</Em></Li>
          <Li>Coconut aminos (soy-free alternative), 1 tbsp: <Em>low FODMAP</Em></Li>
          <Li>Sweet soy sauce / kecap manis: <Em>check label</Em></Li>
          <Li>Teriyaki sauce: <Em>often high FODMAP</Em> — garlic, onion, and/or honey in most brands</Li>
        </Ul>
        <H2 id="practical">Cooking with soy sauce</H2>
        <Callout variant="success" title="Soy sauce is one of the best umami tools on a low-FODMAP diet">
          Without garlic and onion, building deep savoury flavour requires umami sources. Soy sauce (or tamari), along with miso, parmesan, and anchovies, provides that depth without any FODMAP concerns at normal cooking amounts.
        </Callout>
        <Ul>
          <Li>Use tamari as the base for stir-fry sauces with ginger and sesame oil</Li>
          <Li>Marinate chicken or tofu in tamari, garlic-infused oil, and lemon</Li>
          <Li>Dress rice bowls with a small amount of tamari + rice wine vinegar + sesame oil</Li>
          <Li>Use in lieu of Worcestershire sauce in savoury recipes (most Worcestershire contains garlic)</Li>
        </Ul>
      </>
    ),
  },

  {
    slug: 'is-quinoa-low-fodmap',
    title: 'Is Quinoa Low FODMAP?',
    subtitle: 'Quinoa is low FODMAP and one of the most nutritionally complete grains available for the low-FODMAP diet.',
    excerpt: 'Quinoa is low FODMAP at 155 g cooked (1 cup). It\'s a complete protein, high in fibre, and one of the most versatile grains for low-FODMAP meal planning.',
    date: '2025-04-20',
    readTime: '3 min',
    tags: ['fodmap', 'grains', 'protein', 'vegan'],
    category: 'Diet',
    keywords: ['is quinoa low FODMAP', 'quinoa IBS', 'quinoa FODMAP', 'low FODMAP grains', 'gluten free grains IBS', 'quinoa serving size FODMAP'],
    heroImage: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Bowl of cooked quinoa with vegetables',
    author: AUTHOR_EDITORIAL,
    reviewer: AUTHOR_DIETITIAN_REVIEW,
    takeaways: [
      'Quinoa is low FODMAP at 155 g cooked (1 cup) — a full, satisfying grain serving.',
      'It\'s a complete protein — containing all nine essential amino acids — particularly useful for vegan low-FODMAP dieters.',
      'Quinoa flakes (used in porridge) are also low FODMAP.',
      'Rinse quinoa before cooking to remove saponins — the bitter natural coating that can irritate some guts.',
    ],
    references: [
      { label: 'Monash University FODMAP Diet App — Quinoa', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
    ],
    content: (
      <>
        <P>Quinoa offers something rare in the low-FODMAP diet: a grain that's both safe and complete as a protein source. For anyone avoiding gluten or looking to replace wheat-based grains, it's one of the most nutritionally valuable staples available.</P>
        <H2 id="rating">FODMAP status at a glance</H2>
        <Ul>
          <Li>Cooked quinoa, 155 g (1 cup): <Em>low FODMAP</Em></Li>
          <Li>Quinoa flakes, 45 g: <Em>low FODMAP</Em></Li>
          <Li>Quinoa flour: <Em>low FODMAP</Em> at small baking amounts</Li>
          <Li>Pre-seasoned quinoa packets: <Em>check label</Em> — often contain garlic or onion</Li>
        </Ul>
        <H2 id="practical">Quinoa as a dietary staple</H2>
        <Callout variant="success" title="Quinoa is the best protein-rich grain for vegan low-FODMAP eating">
          Unlike rice (which provides carbohydrate but limited protein) or pasta (which requires careful portioning), quinoa provides a meaningful protein contribution alongside its carbohydrate content — reducing the dependency on legumes for plant-based protein.
        </Callout>
        <Ul>
          <Li>Use as a base for grain bowls with roasted vegetables, feta, and lemon dressing</Li>
          <Li>Cook quinoa flakes as porridge with almond milk and maple syrup</Li>
          <Li>Mix into salads with spinach, cucumber, tomato, and a tahini dressing</Li>
          <Li>Stuff bell peppers with quinoa, minced meat, and low-FODMAP spices</Li>
        </Ul>
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
