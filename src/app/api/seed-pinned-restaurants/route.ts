import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const RESTAURANTS = [
  {
    slug: 'chipotle-fodmap',
    restaurant: 'Chipotle Mexican Grill',
    image_url: '/chipotle.png',
    analysis: {
      summary: 'Chipotle is one of the most IBS-friendly fast-food chains — build your own bowl and skip the beans, salsas with garlic/onion, and flour tortillas. Stick to rice, grilled protein, corn salsa, lettuce, cheese, and sour cream.',
      items: [
        { name: 'Burrito Bowl (customised)', status: 'safe', reason: 'Completely customisable — build with rice, grilled protein, corn salsa, romaine, and cheese for a safe low-FODMAP meal.', modifications: 'No beans, no sofritas, no green or red tomatillo salsa, no fajita onion. Ask for extra fajita bell peppers only.' },
        { name: 'Salad Bowl', status: 'safe', reason: 'Romaine base with grilled protein and safe toppings is an excellent low-FODMAP option.', modifications: 'Choose vinaigrette dressing on the side; skip beans and high-FODMAP salsas.' },
        { name: 'Cilantro-Lime White Rice', status: 'safe', reason: 'Plain white rice with lime and cilantro — low FODMAP and a great filler.', modifications: null },
        { name: 'Cilantro-Lime Brown Rice', status: 'safe', reason: 'Brown rice is low FODMAP and adds fibre, though some with IBS tolerate white rice better.', modifications: null },
        { name: 'Grilled Chicken', status: 'safe', reason: 'Plain grilled chicken is naturally low FODMAP.', modifications: null },
        { name: 'Steak', status: 'safe', reason: 'Grilled steak is low FODMAP — a solid protein choice.', modifications: null },
        { name: 'Carnitas (Pork)', status: 'safe', reason: 'Slow-cooked pork is generally low FODMAP.', modifications: null },
        { name: 'Romaine Lettuce', status: 'safe', reason: 'Low FODMAP in any quantity.', modifications: null },
        { name: 'Fresh Tomato Salsa (Pico de Gallo)', status: 'safe', reason: 'Tomato, cilantro, jalapeño, and lime — low FODMAP at a normal serving.', modifications: null },
        { name: 'Corn Salsa', status: 'safe', reason: 'Corn in small–moderate serves is low FODMAP. A tablespoon or two is fine.', modifications: 'Limit to one serving (approx. 2 tbsp).' },
        { name: 'Cheese', status: 'safe', reason: 'Hard cheeses are low in lactose and low FODMAP.', modifications: null },
        { name: 'Sour Cream', status: 'modify', reason: 'Contains lactose — a small dollop is usually tolerated; a large serving may trigger symptoms.', modifications: 'Ask for a small portion (about 1 tbsp).' },
        { name: 'Guacamole', status: 'modify', reason: 'Avocado is low FODMAP up to about 1/8 of a fruit. Chipotle\'s serving is generous — eat half.', modifications: 'Ask for a half portion, or eat only half of the standard serve.' },
        { name: 'Fajita Veggies (bell peppers only)', status: 'modify', reason: 'Bell peppers are low FODMAP but the mix includes onion, which is high FODMAP.', modifications: 'Ask staff to serve only the bell pepper pieces, no onion.' },
        { name: 'Corn Tortilla Tacos (2)', status: 'modify', reason: 'Two small corn tortillas are within low-FODMAP limits; three or more can push fructan content higher.', modifications: 'Limit to 2 tacos; fill with safe toppings only.' },
        { name: 'Black Beans', status: 'avoid', reason: 'Very high in GOS and fructans — a classic IBS trigger.', modifications: null },
        { name: 'Pinto Beans', status: 'avoid', reason: 'High FODMAP; avoid during elimination and limit heavily in maintenance.', modifications: null },
        { name: 'Sofritas (Tofu)', status: 'avoid', reason: 'Contains garlic and onion in the braising sauce — high FODMAP.', modifications: null },
        { name: 'Tomatillo Green-Chili Salsa', status: 'avoid', reason: 'Contains garlic and tomatillos — high fructan content.', modifications: null },
        { name: 'Tomatillo Red-Chili Salsa', status: 'avoid', reason: 'Contains garlic and onion — avoid during elimination.', modifications: null },
        { name: 'Flour Tortilla (Burrito or Quesadilla)', status: 'avoid', reason: 'Wheat flour is high in fructans — one of the biggest IBS triggers.', modifications: null },
        { name: 'Barbacoa (Beef)', status: 'modify', reason: 'The marinade contains garlic and cumin. Small amounts may be tolerated; larger serves may cause symptoms.', modifications: 'Choose chicken, steak, or carnitas if sensitive to garlic.' },
      ],
      sources: [{ url: 'https://www.chipotle.com/menu', title: 'Chipotle Mexican Grill — Menu' }],
    },
  },
  {
    slug: 'jamba-fodmap',
    restaurant: 'Jamba Juice',
    image_url: '/jamba.png',
    analysis: {
      summary: 'Jamba Juice smoothies can be adapted for IBS, but many standard blends contain high-FODMAP fruits like mango, peach, and apple juice. Focus on strawberry and orange-based drinks, ask for no added sweeteners, and choose a lactose-free or oat-free base.',
      items: [
        { name: 'Orange Carrot Karma Smoothie', status: 'safe', reason: 'Orange juice, carrot, and banana are all low FODMAP in standard serving sizes.', modifications: 'Ask to confirm no apple juice added.' },
        { name: 'Strawberry Surf Rider', status: 'modify', reason: 'Strawberry and lemonade base are safe; some versions add peach juice which is high FODMAP.', modifications: 'Request no peach juice; substitute with orange juice.' },
        { name: 'Berry UpBEET Smoothie', status: 'modify', reason: 'Blueberries and beets are low FODMAP; check if the blend includes apple juice or apple base, which is high FODMAP.', modifications: 'Ask to swap apple juice for orange juice.' },
        { name: 'Purely Carrot Juice', status: 'safe', reason: 'Plain carrot juice is low FODMAP.', modifications: null },
        { name: 'Freshly Squeezed Orange Juice', status: 'safe', reason: 'Orange juice (125 ml / small serve) is low FODMAP.', modifications: 'Stick to a small (16 oz or less) to keep fructose in range.' },
        { name: 'Classic Green Fusion', status: 'modify', reason: 'Spinach and kale are safe; the blend often contains mango or apple — both high FODMAP.', modifications: 'Ask to sub mango/apple with banana or extra pineapple (1/2 cup pineapple is fine).' },
        { name: 'Mango-a-go-go Smoothie', status: 'avoid', reason: 'Mango is very high in excess fructose — a key IBS trigger.', modifications: null },
        { name: 'Peach Perfection Smoothie', status: 'avoid', reason: 'Peach and peach juice are high FODMAP (sorbitol and fructose).', modifications: null },
        { name: 'Caribbean Passion Smoothie', status: 'avoid', reason: 'Contains peach juice and mango — both high FODMAP.', modifications: null },
        { name: 'Apple-n-Charge Smoothie', status: 'avoid', reason: 'Apple is high in fructose and sorbitol — avoid during elimination.', modifications: null },
        { name: 'Acai Super Antioxidant Smoothie', status: 'modify', reason: 'Acai itself is low FODMAP, but blends often include mango or apple. Confirm ingredients.', modifications: 'Request no mango; ask what fruit base is used.' },
        { name: 'Peanut Butter Moo\'d Smoothie', status: 'modify', reason: 'Peanut butter is low FODMAP; banana is safe. Watch for added honey (high FODMAP) or regular cow\'s milk.', modifications: 'Request no honey; ask for lactose-free milk.' },
        { name: 'Watermelon Breeze Smoothie', status: 'avoid', reason: 'Watermelon is high in fructose and a known IBS trigger.', modifications: null },
        { name: 'Boosted options / add-ins', status: 'modify', reason: 'Many boosts (wheatgrass, inulin, FOS fibre) are high FODMAP. Plain protein powder is usually fine.', modifications: 'Skip fibre boosts and wheatgrass; plain whey or rice protein is OK.' },
      ],
      sources: [{ url: 'https://www.jamba.com/menu', title: 'Jamba — Menu' }],
    },
  },
  {
    slug: 'starbucks-fodmap',
    restaurant: 'Starbucks',
    image_url: '/starbucks.png',
    analysis: {
      summary: 'Starbucks is manageable if you stick to plain coffee and tea, use lactose-free milk, and skip flavoured syrups. Most pastries and sweet drinks are high FODMAP, but espresso-based drinks made with lactose-free milk are generally safe.',
      items: [
        { name: 'Espresso / Americano', status: 'safe', reason: 'Black coffee is low FODMAP — a safe base for any Starbucks visit.', modifications: null },
        { name: 'Cold Brew Coffee (black)', status: 'safe', reason: 'Plain cold brew is low FODMAP. Avoid the vanilla sweet cream cold foam topping.', modifications: null },
        { name: 'Pike Place Drip Coffee', status: 'safe', reason: 'Brewed coffee is low FODMAP. Add lactose-free milk if desired.', modifications: null },
        { name: 'Peppermint Tea (herbal)', status: 'safe', reason: 'Peppermint tea is low FODMAP and may actually help IBS symptoms.', modifications: null },
        { name: 'Green Tea (unsweetened)', status: 'safe', reason: 'Plain green tea is low FODMAP.', modifications: null },
        { name: 'Chamomile Tea', status: 'safe', reason: 'Plain chamomile is low FODMAP and gut-soothing.', modifications: null },
        { name: 'Latte', status: 'modify', reason: 'Regular milk contains lactose. Safe with lactose-free milk and no flavoured syrup.', modifications: 'Order with lactose-free milk, no vanilla or other syrups, no whipped cream.' },
        { name: 'Flat White', status: 'modify', reason: 'Made with whole milk; safe if you swap for lactose-free milk.', modifications: 'Lactose-free milk only.' },
        { name: 'Cappuccino', status: 'modify', reason: 'Same as latte — the milk is the issue, not the espresso.', modifications: 'Lactose-free milk; skip any syrup.' },
        { name: 'Iced Coffee', status: 'modify', reason: 'Safe if you skip syrups and use lactose-free milk.', modifications: 'No classic syrup; lactose-free milk if adding any.' },
        { name: 'Bacon & Gruyère Egg Bites', status: 'safe', reason: 'Mostly egg, cheese, and bacon — low FODMAP ingredients.', modifications: null },
        { name: 'Egg White & Red Pepper Egg Bites', status: 'safe', reason: 'Egg whites, red pepper, and spinach — all low FODMAP.', modifications: null },
        { name: 'String Cheese snack', status: 'safe', reason: 'Hard cheese is low in lactose and low FODMAP.', modifications: null },
        { name: 'Chai Latte', status: 'avoid', reason: 'Starbucks chai concentrate contains honey and apple juice — both high FODMAP.', modifications: null },
        { name: 'Vanilla Latte (with syrup)', status: 'avoid', reason: 'Vanilla syrup uses high-fructose corn syrup — high FODMAP. Sugar-free syrups often use sorbitol or other polyols — also problematic.', modifications: null },
        { name: 'Caramel Macchiato', status: 'avoid', reason: 'Vanilla syrup + caramel drizzle = double hit of high-FODMAP sweeteners.', modifications: null },
        { name: 'Frappuccino (any)', status: 'avoid', reason: 'Heavy on syrups, Frappuccino base (high HFCS), and whole milk — very high FODMAP.', modifications: null },
        { name: 'Croissant', status: 'avoid', reason: 'Wheat flour (fructans) — avoid during elimination.', modifications: null },
        { name: 'Blueberry Muffin', status: 'avoid', reason: 'Wheat flour, excess sugar, and a large serve of blueberries push this well into high-FODMAP territory.', modifications: null },
        { name: 'Oatmeal (Classic or Honey Nut)', status: 'avoid', reason: 'The portion of oats is above the low-FODMAP limit, and toppings include dried fruit and honey — all high FODMAP.', modifications: null },
        { name: 'Matcha Latte', status: 'modify', reason: 'Matcha itself is fine, but the standard version uses whole milk and sweetener. Use lactose-free milk, no sweetener.', modifications: 'Lactose-free milk, no classic syrup or pump sweetener.' },
      ],
      sources: [{ url: 'https://www.starbucks.com/menu', title: 'Starbucks — Menu' }],
    },
  },
];

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (secret !== process.env.SEED_SECRET && secret !== 'gutsy-seed-2025') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return Response.json({ error: 'Please sign in to gutsy first, then visit this URL.' }, { status: 401 });
    }

    const results: { slug: string; status: string }[] = [];

    for (const r of RESTAURANTS) {
      // Skip if already exists
      const { data: existing } = await supabase
        .from('menu_scans')
        .select('slug')
        .eq('slug', r.slug)
        .maybeSingle();

      if (existing) {
        results.push({ slug: r.slug, status: 'already_exists' });
        continue;
      }

      const { error } = await supabase.from('menu_scans').insert({
        user_id: user.id,
        slug: r.slug,
        restaurant: r.restaurant,
        image_url: r.image_url,
        analysis: r.analysis,
        is_public: true,
      });

      results.push({ slug: r.slug, status: error ? `error: ${error.message}` : 'inserted' });
    }

    return Response.json({ ok: true, results });
  } catch (err) {
    return Response.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}
