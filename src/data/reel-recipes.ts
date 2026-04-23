export interface ReelRecipe {
  slug: string;
  videoSrc: string;
  title: string;
  emoji: string;
  accent: string;
  totalTime: string;
  servings: string;
  tags: string[];
  heroImage: string;
  swaps: { original: string; swap: string; why: string }[];
  recipe: string;
  notes: string[];
}

export const reelRecipes: ReelRecipe[] = [
  {
    slug: 'air-fry-chicken-bites',
    videoSrc: '/air-fry-chicken-bites.mp4',
    title: 'Air Fry Chicken Bites',
    emoji: '🍗',
    accent: 'amber',
    totalTime: '25 min',
    servings: '2',
    tags: ['High Protein', 'Gluten-Free', 'Air Fryer', 'Low FODMAP'],
    heroImage:
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c1?auto=format&fit=crop&w=800&q=80',
    swaps: [
      {
        original: 'Garlic powder',
        swap: 'Asafoetida (hing) or garlic-infused oil',
        why: 'Fructans in garlic are water-soluble; infused oil contains only the flavour compounds, not the FODMAPs.',
      },
      {
        original: 'Regular breadcrumbs',
        swap: 'Gluten-free breadcrumbs or rice flour',
        why: 'Wheat breadcrumbs are high in fructans. GF crumbs or rice flour give the same crunch without the trigger.',
      },
      {
        original: 'Onion powder',
        swap: 'Omit or use chives (green tops only)',
        why: 'Onion powder is very high in fructans. Green chive tops are low FODMAP at standard serving sizes.',
      },
    ],
    recipe: `INGREDIENTS
-----------
400 g chicken breast, cut into 2 cm cubes
2 tbsp garlic-infused olive oil (divided)
60 g gluten-free breadcrumbs (or ½ cup rice flour)
2 tbsp grated parmesan
1 tsp smoked paprika
½ tsp dried oregano
¼ tsp asafoetida (hing)
Salt and pepper to taste
Lemon wedges to serve

METHOD
------
1. Preheat air fryer to 200 °C (390 °F).
2. Pat chicken cubes dry with paper towel. Toss in 1 tbsp garlic-infused oil and season with salt and pepper.
3. In a shallow bowl, combine GF breadcrumbs (or rice flour), parmesan, smoked paprika, oregano, and asafoetida.
4. Press each chicken piece firmly into the crumb mixture, coating all sides.
5. Arrange in a single layer in the air fryer basket. Drizzle with remaining garlic-infused oil.
6. Air fry for 10–12 minutes, flipping halfway, until golden and cooked through (internal temp 74 °C / 165 °F).
7. Serve immediately with lemon wedges and a low-FODMAP dipping sauce (e.g. plain lactose-free yogurt with chives).`,
    notes: [
      'Asafoetida has a strong raw smell — it mellows beautifully when cooked. Start with ¼ tsp.',
      'Garlic-infused oil must be commercially produced or strained thoroughly; garlic pieces in the oil reintroduce FODMAPs.',
      'Parmesan is aged and very low in lactose — a standard 2 tbsp serve is safe.',
      'Check GF breadcrumb labels for added onion or garlic powder.',
    ],
  },
  {
    slug: 'avocado-toast',
    videoSrc: '/avo-toast.mp4',
    title: 'Avocado Toast',
    emoji: '🥑',
    accent: 'lime',
    totalTime: '10 min',
    servings: '1',
    tags: ['Vegetarian', 'Quick', 'Breakfast', 'Low FODMAP'],
    heroImage:
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    swaps: [
      {
        original: 'Regular wheat bread',
        swap: 'Sourdough spelt or certified GF bread',
        why: 'Traditional sourdough fermentation reduces fructan content significantly. Spelt sourdough is Monash-tested as low FODMAP at 2 slices.',
      },
      {
        original: 'Half an avocado',
        swap: 'One-eighth avocado (approx. 30 g)',
        why: 'Avocado is high in sorbitol. The Monash safe serve is 30 g (⅛ of a medium avocado). Exceeding this can trigger symptoms.',
      },
      {
        original: 'Garlic or onion on top',
        swap: 'Chives (green tops only) or omit',
        why: 'Garlic and onion are high-fructan triggers. Green chive tops add allium flavour without the FODMAPs.',
      },
    ],
    recipe: `INGREDIENTS
-----------
2 slices sourdough spelt bread (or certified GF bread)
30 g (⅛ medium) ripe avocado
1 tsp lemon juice
Pinch of sea salt flakes
Pinch of red chilli flakes (optional)
1 tbsp chopped fresh chives (green tops only)
1 tsp extra-virgin olive oil
Optional topping: 1 poached egg

METHOD
------
1. Toast bread to your liking.
2. In a small bowl, mash the avocado with lemon juice and a pinch of salt until just combined (keep some texture).
3. Spread avocado evenly over the toast.
4. Drizzle with olive oil, scatter chilli flakes and chives.
5. Top with a poached egg if desired and serve immediately.`,
    notes: [
      'Portion control is critical: 30 g (⅛ avocado) is the Monash-certified low-FODMAP serve. A quarter avocado is moderate; half is high.',
      'Sourdough spelt is low FODMAP at 2 slices — the fermentation process degrades most fructans. Standard spelt (non-sourdough) is not safe.',
      'Lemon juice is fine at 2 tbsp per serve; lime juice is an equal substitute.',
      'Chilli flakes are low FODMAP. Avoid premixed seasoning blends that may contain onion or garlic powder.',
    ],
  },
  {
    slug: 'brownie',
    videoSrc: '/brownie.mp4',
    title: 'Brownie',
    emoji: '🍫',
    accent: 'rose',
    totalTime: '40 min',
    servings: '12',
    tags: ['Dessert', 'Gluten-Free', 'Vegetarian', 'Low FODMAP'],
    heroImage:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    swaps: [
      {
        original: 'Plain wheat flour',
        swap: 'GF plain flour blend or almond flour',
        why: 'Wheat flour is high in fructans. A 1:1 GF blend works well. Almond flour adds richness but keep to ½ cup per serve limit.',
      },
      {
        original: 'Milk chocolate chips',
        swap: 'Dark chocolate >70% cacao, max 30 g per serve',
        why: 'Milk chocolate contains lactose and excess fructose. Dark chocolate >70% is low FODMAP at 30 g; excess fructose drops at higher cacao content.',
      },
      {
        original: 'Regular milk',
        swap: 'Lactose-free milk or rice milk',
        why: 'Lactose can trigger symptoms. Lactose-free dairy retains the same proteins and fat profile without the sugar.',
      },
    ],
    recipe: `INGREDIENTS
-----------
200 g dark chocolate (≥70% cacao), roughly chopped
150 g unsalted butter, cubed
200 g caster sugar
3 large eggs, at room temperature
1 tsp vanilla extract
80 g GF plain flour blend (or 80 g almond flour)
30 g Dutch-process cocoa powder
½ tsp fine salt
Optional: 30 g dark chocolate chips (≥70%) for topping

METHOD
------
1. Preheat oven to 170 °C (340 °F) fan. Grease and line a 20×20 cm square tin.
2. Melt chopped chocolate and butter together in a heatproof bowl over simmering water (or microwave in 30-second bursts), stirring until smooth. Allow to cool slightly.
3. Whisk sugar into the chocolate mixture until combined. Add eggs one at a time, whisking well after each. Stir in vanilla.
4. Sift in GF flour, cocoa powder, and salt. Fold gently until just combined — do not over-mix.
5. Pour batter into prepared tin and smooth the top. Scatter chocolate chips if using.
6. Bake for 22–25 minutes until the top is set and a skewer inserted 2 cm from the edge comes out with moist crumbs (not wet batter).
7. Cool completely in the tin before cutting into 12 squares. The centre firms as it cools.`,
    notes: [
      'Serve size matters: 1 square (1/12 of the batch) is the safe low-FODMAP portion. Larger serves push total sorbitol and fructose up.',
      'Dark chocolate at ≥70% cacao is low FODMAP at 30 g per serve (Monash tested). Avoid added high-fructose corn syrup or fruit extracts.',
      'Almond flour: Monash has tested almond flour — keep total almonds across the day to ≤24 g to stay low FODMAP for GOS.',
      'Dutch-process cocoa is low FODMAP at 1 tbsp (7 g) per serve; this recipe divides to well under that per square.',
    ],
  },
  {
    slug: 'chicken-caesar-wrap',
    videoSrc: '/chicken-caesar-wrap.mp4',
    title: 'Chicken Caesar Wrap',
    emoji: '🌯',
    accent: 'sky',
    totalTime: '20 min',
    servings: '2',
    tags: ['High Protein', 'Lunch', 'Gluten-Free Option', 'Low FODMAP'],
    heroImage:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    swaps: [
      {
        original: 'Regular flour tortilla',
        swap: 'Small GF tortilla or spelt sourdough wrap',
        why: 'Standard flour tortillas are high in fructans. Small GF tortillas (corn or rice-based) or spelt sourdough wraps are Monash-tested safe options.',
      },
      {
        original: 'Garlic in Caesar dressing',
        swap: 'Garlic-infused olive oil',
        why: 'Fructans in garlic are water-soluble; oil-infused versions carry the flavour without the trigger carbohydrates.',
      },
      {
        original: 'Regular mayo or cream',
        swap: 'Lactose-free Greek yogurt',
        why: 'Standard dairy can be high in lactose. Lactose-free Greek yogurt gives the same creamy texture with a protein boost.',
      },
    ],
    recipe: `INGREDIENTS (serves 2)
-----------
2 small GF tortillas or spelt sourdough wraps
2 chicken breasts (approx. 300 g total)
1 tbsp garlic-infused olive oil
Salt and pepper

CAESAR DRESSING
60 g lactose-free Greek yogurt
1 tbsp garlic-infused olive oil
1 tbsp lemon juice
1 tsp Dijon mustard (check label — plain Dijon is low FODMAP)
1 tsp tamari (or Worcestershire sauce — check anchovy variety)
2 tbsp finely grated parmesan
Salt and pepper to taste

TO ASSEMBLE
80 g cos (romaine) lettuce, shredded
20 g parmesan, shaved
Freshly ground black pepper

METHOD
------
1. Season chicken with salt, pepper, and a drizzle of garlic-infused oil. Grill, pan-fry, or air fry until cooked through (74 °C internal). Rest 3 minutes, then slice.
2. Whisk all dressing ingredients together until smooth. Taste and adjust lemon/salt.
3. Warm tortillas for 20 seconds in a dry pan or microwave.
4. Toss lettuce with half the dressing. Lay on each tortilla, top with sliced chicken and shaved parmesan.
5. Drizzle remaining dressing over chicken. Roll tightly, slice diagonally, and serve immediately.`,
    notes: [
      'Parmesan is an aged hard cheese — very low in lactose. Standard serves (20–30 g) are safe on a low-FODMAP diet.',
      'Dijon mustard: check ingredients for garlic or onion powder — plain grain-mustard varieties are fine.',
      'Cos/romaine lettuce is low FODMAP. Avoid adding croutons unless they are certified GF.',
      'Worcestershire sauce contains anchovies and small amounts of garlic — some people tolerate it in small quantities (1 tsp). Tamari is a safer swap.',
    ],
  },
  {
    slug: 'korean-beef-stir-fry',
    videoSrc: '/korean-beef-stir-fry.mp4',
    title: 'Korean Beef Stir Fry',
    emoji: '🥢',
    accent: 'orange',
    totalTime: '25 min',
    servings: '2',
    tags: ['High Protein', 'Gluten-Free', 'Dairy-Free', 'Low FODMAP'],
    heroImage:
      'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&q=80',
    swaps: [
      {
        original: 'Regular soy sauce',
        swap: 'Tamari (gluten-free soy sauce)',
        why: 'Standard soy sauce contains wheat and is therefore high in fructans. Tamari is brewed without wheat and is low FODMAP.',
      },
      {
        original: 'Garlic cloves',
        swap: 'Garlic-infused sesame or olive oil',
        why: 'Fructans leach into water-based sauces from garlic, but not into oil. Use infused oil only — do not add whole garlic to the pan.',
      },
      {
        original: 'Whole spring onion (white + green)',
        swap: 'Green tops of spring onion only',
        why: 'The white bulb of spring onion is high in fructans; the green tops are low FODMAP and still give excellent flavour.',
      },
    ],
    recipe: `INGREDIENTS (serves 2)
-----------
300 g lean beef mince or beef strips
1 tbsp garlic-infused sesame oil
1 tsp fresh ginger, finely grated
3 tbsp tamari
1 tbsp rice wine vinegar
1 tsp sesame oil (plain, for finishing)
1 tsp gochujang (check label: choose brands without garlic/onion in first 3 ingredients)
1 tsp caster sugar or maple syrup
200 g bok choy, halved lengthways
1 medium carrot, julienned or thinly sliced
3 spring onion green tops, sliced
1 tsp toasted sesame seeds
Steamed jasmine rice, to serve

METHOD
------
1. Mix tamari, rice wine vinegar, gochujang, and sugar in a small bowl. Set aside.
2. Heat garlic-infused sesame oil in a wok or large frying pan over high heat until shimmering.
3. Add beef and cook, breaking up mince (or tossing strips), for 3–4 minutes until browned. Push to the side.
4. Add carrot and bok choy stems; stir-fry 2 minutes. Add bok choy leaves.
5. Pour sauce over everything. Toss to coat and cook 1 minute until sauce is slightly glossy.
6. Add grated ginger and toss through (30 seconds).
7. Remove from heat. Finish with plain sesame oil, scatter spring onion greens and sesame seeds.
8. Serve immediately over steamed jasmine rice.`,
    notes: [
      'Gochujang varies by brand. Monash has not fully tested all gochujang — choose a brand with no garlic or onion listed prominently, and use no more than 1 tsp per serve.',
      'Ginger is low FODMAP at up to 1 tsp (5 g) fresh per serve. Do not exceed this.',
      'Green tops of spring onion are safe; the white/light green bulb section is high in fructans — discard it.',
      'Tamari must be certified GF if you have coeliac disease; some tamari is brewed in shared facilities.',
      'Rice is naturally gluten-free and low FODMAP at any standard serving size.',
    ],
  },
  {
    slug: 'protein-bowl',
    videoSrc: '/protein-bowl.mp4',
    title: 'Protein Bowl',
    emoji: '🥗',
    accent: 'emerald',
    totalTime: '30 min',
    servings: '2',
    tags: ['High Protein', 'Vegetarian', 'Meal Prep', 'Low FODMAP'],
    heroImage:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    swaps: [
      {
        original: 'Large serve of lentils or chickpeas',
        swap: 'Canned lentils, well rinsed, max ½ cup (46 g) per serve',
        why: 'Canned legumes have lower FODMAP content than home-cooked; rinsing further reduces oligosaccharides. Serving size is critical.',
      },
      {
        original: 'Garlic in tahini dressing',
        swap: 'Garlic-infused olive oil in dressing',
        why: 'Adds allium depth to the dressing without introducing fructans.',
      },
      {
        original: 'Large portion of sweet potato',
        swap: 'Half cup (75 g) roasted sweet potato per serve',
        why: 'Sweet potato is low FODMAP at ½ cup / 75 g. Larger serves cross into moderate-high mannitol territory.',
      },
    ],
    recipe: `INGREDIENTS (serves 2)
-----------
BASE
160 g (dry) jasmine or brown rice, cooked per packet instructions
75 g sweet potato per person, cubed (150 g total)
1 tbsp olive oil
Salt and pepper

PROTEIN
90 g canned lentils (drained and very well rinsed) per serve
2 large handfuls baby spinach

TAHINI-LEMON DRESSING
3 tbsp tahini
2 tbsp lemon juice
1 tbsp garlic-infused olive oil
2–3 tbsp warm water (to thin)
Salt to taste

TOPPING
2 tbsp pumpkin seeds (pepitas)
Lemon wedges

METHOD
------
1. Preheat oven to 200 °C (390 °F). Toss sweet potato cubes with olive oil, salt, and pepper. Roast 20–25 minutes until golden and tender.
2. While sweet potato roasts, cook rice per packet instructions.
3. Whisk tahini, lemon juice, and garlic-infused oil together. Thin with warm water until pourable. Season with salt.
4. Drain and rinse canned lentils thoroughly under cold running water for at least 30 seconds.
5. Arrange bowls: start with rice, then spinach, roasted sweet potato, and lentils.
6. Drizzle generously with tahini dressing. Top with pumpkin seeds and a lemon wedge.`,
    notes: [
      'Lentil serve is strictly ½ cup (46 g drained weight) per person. More than this pushes GOS levels into moderate-high territory.',
      'Rinse canned lentils thoroughly — this step meaningfully reduces FODMAP content compared to simply draining.',
      'Sweet potato: 75 g per serve is low FODMAP. Butternut pumpkin (½ cup / 45 g) is an alternative if preferred.',
      'Pumpkin seeds (pepitas) are low FODMAP at 2 tbsp (23 g). Sunflower seeds are also safe.',
      'Tahini (sesame paste) is low FODMAP at 1 tbsp per serve. This dressing is divided across 2 serves, so within range.',
      'Spinach is low FODMAP at 1 cup (75 g). Kale (common cup / 75 g) is also safe.',
    ],
  },
  {
    slug: 'tzatziki',
    videoSrc: '/tsatziki.mp4',
    title: 'Tzatziki',
    emoji: '🥒',
    accent: 'teal',
    totalTime: '15 min',
    servings: '4',
    tags: ['Vegetarian', 'Gluten-Free', 'Dip', 'Low FODMAP'],
    heroImage:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    swaps: [
      {
        original: 'Regular Greek yogurt',
        swap: 'Lactose-free Greek yogurt',
        why: 'Standard Greek yogurt can still contain enough residual lactose to trigger symptoms in sensitive individuals. Lactose-free versions have identical texture.',
      },
      {
        original: 'Raw garlic clove',
        swap: 'Garlic-infused olive oil (1 tbsp)',
        why: 'Raw garlic is one of the highest-FODMAP foods. Garlic-infused oil gives identical flavour with zero fructans — the FODMAPs do not transfer to oil.',
      },
      {
        original: 'Unpeeled or unseeded cucumber',
        swap: 'Peeled, deseeded cucumber',
        why: 'The skin and seeds hold more water. Removing them and salting the flesh prevents a watery dip — no FODMAP impact, but better texture.',
      },
    ],
    recipe: `INGREDIENTS (serves 4 as a dip)
-----------
250 g lactose-free Greek yogurt
1 medium Lebanese cucumber (approx. 150 g)
1 tbsp garlic-infused olive oil
1 tbsp fresh lemon juice
2 tbsp fresh dill, finely chopped (or 1 tsp dried dill)
½ tsp sea salt (for salting cucumber) + more to taste
White pepper to taste
Extra dill and a drizzle of olive oil, to serve

METHOD
------
1. Peel the cucumber, halve lengthways, and scoop out seeds with a small spoon. Grate coarsely.
2. Place grated cucumber in a fine-mesh sieve or clean tea towel, sprinkle with ½ tsp salt, and let drain for 10 minutes. Squeeze firmly to remove as much liquid as possible.
3. In a bowl, combine lactose-free yogurt, garlic-infused oil, lemon juice, and fresh dill. Mix well.
4. Fold in drained cucumber. Season with salt and white pepper to taste.
5. Transfer to a serving bowl. Drizzle with a little extra olive oil and scatter fresh dill on top.
6. Refrigerate for at least 20 minutes before serving to let flavours meld.
7. Serve with GF pita, rice crackers, or raw vegetables (carrot sticks, cucumber rounds, capsicum strips).`,
    notes: [
      'No actual garlic should be used — not minced, not crushed, not powdered. Garlic is extremely high in fructans.',
      'Garlic-infused oil must be a commercially made product where garlic pieces have been fully removed, or home-made oil strained to remove all garlic solids.',
      'Lactose-free Greek yogurt retains all the protein and probiotics of regular Greek yogurt — it is simply treated with the lactase enzyme.',
      'Lebanese cucumber is low FODMAP. Standard telegraph cucumbers work equally well.',
      'Fresh dill is preferred; dried dill is safe but reduce to 1 tsp. Avoid dill seed (different FODMAP profile — not well tested).',
      'Serve size: approximately 4–5 tbsp (around 60 g) per person is a generous low-FODMAP dip serve.',
    ],
  },
];

export function getReelRecipe(slug: string): ReelRecipe | undefined {
  return reelRecipes.find((r) => r.slug === slug);
}

export default reelRecipes;
