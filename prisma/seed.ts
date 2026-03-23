import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sizes = {
  tops: ["XS", "S", "M", "L", "XL", "2XL"],
  pants: ["28", "30", "32", "34", "36", "38"],
  oneSize: ["One Size"],
};

const products = [
  // ═══════════════════════════════════════
  // WOMEN'S T-SHIRTS (15)
  // ═══════════════════════════════════════
  { name: "Seoul Nights Crop Tee", slug: "seoul-nights-crop-tee", description: "Cropped cotton tee with holographic Seoul skyline print. Inspired by the neon glow of Gangnam after midnight.", price: 34.00, category: "women", featured: true, images: ["https://picsum.photos/seed/w-tee1/600/800", "https://picsum.photos/seed/w-tee1b/600/800"], colors: ["Black", "Pink"], sizes: sizes.tops },
  { name: "Bias Wrecker Tee", slug: "bias-wrecker-tee", description: "Oversized boyfriend tee with subtle heart-shaped cutout at the back. For when your bias list is a mess.", price: 32.00, category: "women", images: ["https://picsum.photos/seed/w-tee2/600/800"], colors: ["White", "Lavender"], sizes: sizes.tops },
  { name: "Idol Energy Fitted Tee", slug: "idol-energy-fitted-tee", description: "Slim-fit cotton tee with reflective star embroidery. Channel main character energy.", price: 36.00, category: "women", featured: true, images: ["https://picsum.photos/seed/w-tee3/600/800"], colors: ["Hot Pink", "Black"], sizes: sizes.tops },
  { name: "Daydream Baby Tee", slug: "daydream-baby-tee", description: "Y2K-inspired baby tee with dreamy cloud graphics. Soft jersey cotton.", price: 28.00, category: "women", images: ["https://picsum.photos/seed/w-tee4/600/800"], colors: ["Baby Blue", "White"], sizes: sizes.tops },
  { name: "Lightstick Glow Tee", slug: "lightstick-glow-tee", description: "Glow-in-the-dark print tee featuring iconic lightstick silhouettes. Concert-ready.", price: 38.00, category: "women", images: ["https://picsum.photos/seed/w-tee5/600/800"], colors: ["Black", "Navy"], sizes: sizes.tops },
  { name: "Cherry Blossom Boxy Tee", slug: "cherry-blossom-boxy-tee", description: "Relaxed boxy fit tee with delicate sakura embroidery along the hem.", price: 35.00, category: "women", images: ["https://picsum.photos/seed/w-tee6/600/800"], colors: ["Cream", "Blush"], sizes: sizes.tops },
  { name: "Aegyo Queen Graphic Tee", slug: "aegyo-queen-graphic-tee", description: "Soft cotton tee with cute hand-drawn character illustrations. Pure aegyo vibes.", price: 30.00, category: "women", images: ["https://picsum.photos/seed/w-tee7/600/800"], colors: ["Pink", "Yellow"], sizes: sizes.tops },
  { name: "Starlight Mesh Panel Tee", slug: "starlight-mesh-panel-tee", description: "Cotton tee with sheer mesh star-shaped panels at the shoulders. Stage-worthy.", price: 42.00, category: "women", featured: true, images: ["https://picsum.photos/seed/w-tee8/600/800"], colors: ["Black", "Silver"], sizes: sizes.tops },
  { name: "Hangul Love Tee", slug: "hangul-love-tee-w", description: "Minimalist tee with '사랑' (love) in elegant Hangul typography. 100% organic cotton.", price: 33.00, category: "women", images: ["https://picsum.photos/seed/w-tee9/600/800"], colors: ["White", "Black", "Rose"], sizes: sizes.tops },
  { name: "MV Director Tee", slug: "mv-director-tee-w", description: "Vintage-washed tee with retro camcorder graphic. For the creative soul.", price: 36.00, category: "women", images: ["https://picsum.photos/seed/w-tee10/600/800"], colors: ["Washed Black", "Stone"], sizes: sizes.tops },
  { name: "Butterfly Effect Tee", slug: "butterfly-effect-tee", description: "Ethereal butterfly wing print across the back. Lightweight and flowy.", price: 34.00, category: "women", images: ["https://picsum.photos/seed/w-tee11/600/800"], colors: ["Lilac", "White"], sizes: sizes.tops },
  { name: "Encore Cropped Tee", slug: "encore-cropped-tee", description: "Raw-hem crop tee with metallic 'ENCORE' lettering. Made for screaming at concerts.", price: 31.00, category: "women", images: ["https://picsum.photos/seed/w-tee12/600/800"], colors: ["Black", "Red"], sizes: sizes.tops },
  { name: "Moonlight Satin Trim Tee", slug: "moonlight-satin-trim-tee", description: "Cotton tee with satin ribbon trim at the neckline. Elegant meets casual.", price: 39.00, category: "women", images: ["https://picsum.photos/seed/w-tee13/600/800"], colors: ["Ivory", "Dusty Rose"], sizes: sizes.tops },
  { name: "Visual Center Tee", slug: "visual-center-tee-w", description: "Form-fitting tee with holographic center stripe. For the visual of the group.", price: 37.00, category: "women", images: ["https://picsum.photos/seed/w-tee14/600/800"], colors: ["White", "Pink"], sizes: sizes.tops },
  { name: "Hanbok Modern Tee", slug: "hanbok-modern-tee-w", description: "Traditional hanbok ribbon detail reimagined on a modern cotton tee.", price: 40.00, category: "women", featured: true, images: ["https://picsum.photos/seed/w-tee15/600/800"], colors: ["Red", "Gold"], sizes: sizes.tops },

  // ═══════════════════════════════════════
  // MEN'S T-SHIRTS (15)
  // ═══════════════════════════════════════
  { name: "Main Character Oversized Tee", slug: "main-character-oversized-tee", description: "Heavyweight oversized tee with shadow typography. Because you ARE the main character.", price: 38.00, category: "men", featured: true, images: ["https://picsum.photos/seed/m-tee1/600/800", "https://picsum.photos/seed/m-tee1b/600/800"], colors: ["Black", "Charcoal"], sizes: sizes.tops },
  { name: "Hangul Love Tee", slug: "hangul-love-tee-m", description: "Clean minimal tee with '사랑' in brushstroke Hangul. Premium ring-spun cotton.", price: 35.00, category: "men", images: ["https://picsum.photos/seed/m-tee2/600/800"], colors: ["White", "Black"], sizes: sizes.tops },
  { name: "Comeback Season Tee", slug: "comeback-season-tee", description: "Distressed vintage wash tee with 'COMEBACK SZN' graphic. Heavyweight cotton.", price: 36.00, category: "men", images: ["https://picsum.photos/seed/m-tee3/600/800"], colors: ["Washed Black", "Desert Sand"], sizes: sizes.tops },
  { name: "Trainee Era Tee", slug: "trainee-era-tee", description: "Simple, clean-cut tee with minimal 'TRAINEE' tag. The grind never stops.", price: 30.00, category: "men", images: ["https://picsum.photos/seed/m-tee4/600/800"], colors: ["Grey", "White", "Black"], sizes: sizes.tops },
  { name: "Stage Name Tee", slug: "stage-name-tee", description: "Bold oversized tee with embossed lettering. Make your own stage name.", price: 40.00, category: "men", featured: true, images: ["https://picsum.photos/seed/m-tee5/600/800"], colors: ["Black", "Navy"], sizes: sizes.tops },
  { name: "Seoul District Tee", slug: "seoul-district-tee", description: "Neighborhood-inspired graphic tee featuring Hongdae street art motifs.", price: 34.00, category: "men", images: ["https://picsum.photos/seed/m-tee6/600/800"], colors: ["White", "Olive"], sizes: sizes.tops },
  { name: "MV Director Tee", slug: "mv-director-tee-m", description: "Washed cotton tee with film reel graphic. Behind-the-scenes energy.", price: 36.00, category: "men", images: ["https://picsum.photos/seed/m-tee7/600/800"], colors: ["Vintage Black", "Cream"], sizes: sizes.tops },
  { name: "Dance Break Tee", slug: "dance-break-tee", description: "Moisture-wicking cotton blend tee with motion blur print. Built for movement.", price: 38.00, category: "men", images: ["https://picsum.photos/seed/m-tee8/600/800"], colors: ["Black", "Electric Blue"], sizes: sizes.tops },
  { name: "Visual Center Tee", slug: "visual-center-tee-m", description: "Structured fit tee with reflective center seam detail.", price: 37.00, category: "men", images: ["https://picsum.photos/seed/m-tee9/600/800"], colors: ["White", "Black"], sizes: sizes.tops },
  { name: "Maknae Energy Tee", slug: "maknae-energy-tee", description: "Playful graphic tee with youngest-of-the-group energy. Soft cotton jersey.", price: 32.00, category: "men", images: ["https://picsum.photos/seed/m-tee10/600/800"], colors: ["Pink", "Sky Blue"], sizes: sizes.tops },
  { name: "Debut Day Tee", slug: "debut-day-tee", description: "Clean essential tee with embroidered debut date placeholder. Mark your beginning.", price: 33.00, category: "men", images: ["https://picsum.photos/seed/m-tee11/600/800"], colors: ["White", "Black"], sizes: sizes.tops },
  { name: "Soju Night Tee", slug: "soju-night-tee", description: "Relaxed fit tee with soju bottle line art. For late nights in Itaewon.", price: 34.00, category: "men", images: ["https://picsum.photos/seed/m-tee12/600/800"], colors: ["Forest Green", "Black"], sizes: sizes.tops },
  { name: "Mic Drop Heavyweight Tee", slug: "mic-drop-heavyweight-tee", description: "300gsm heavyweight cotton tee with metallic mic drop graphic. Statement piece.", price: 45.00, category: "men", featured: true, images: ["https://picsum.photos/seed/m-tee13/600/800"], colors: ["Black", "Gold"], sizes: sizes.tops },
  { name: "Fanchant Tee", slug: "fanchant-tee", description: "Tee with sound wave pattern from a stadium fanchant. Feel the roar.", price: 35.00, category: "men", images: ["https://picsum.photos/seed/m-tee14/600/800"], colors: ["Navy", "White"], sizes: sizes.tops },
  { name: "Hanbok Modern Tee", slug: "hanbok-modern-tee-m", description: "Traditional jeogori-inspired neckline detail on a modern cotton tee.", price: 42.00, category: "men", images: ["https://picsum.photos/seed/m-tee15/600/800"], colors: ["Red", "Black"], sizes: sizes.tops },

  // ═══════════════════════════════════════
  // UNISEX T-SHIRTS (10)
  // ═══════════════════════════════════════
  { name: "K-Pop Is Life Tee", slug: "kpop-is-life-tee", description: "Unisex relaxed tee with bold statement print. No explanation needed.", price: 32.00, category: "women", images: ["https://picsum.photos/seed/u-tee1/600/800"], colors: ["Black", "White", "Pink"], sizes: sizes.tops },
  { name: "Bias List Tee", slug: "bias-list-tee", description: "Checklist-style graphic tee. Space to write your bias. Unisex oversized fit.", price: 34.00, category: "men", images: ["https://picsum.photos/seed/u-tee2/600/800"], colors: ["White", "Heather Grey"], sizes: sizes.tops },
  { name: "Hallyu Wave Tee", slug: "hallyu-wave-tee", description: "Ocean wave meets Korean wave — watercolor wave print with Hangul accents.", price: 36.00, category: "women", images: ["https://picsum.photos/seed/u-tee3/600/800"], colors: ["Ocean Blue", "White"], sizes: sizes.tops },
  { name: "Stan Culture Tee", slug: "stan-culture-tee", description: "Minimalist 'STAN' in clean sans-serif. Unisex fit. Say it loud.", price: 30.00, category: "men", images: ["https://picsum.photos/seed/u-tee4/600/800"], colors: ["Black", "Red"], sizes: sizes.tops },
  { name: "Photocards & Chill Tee", slug: "photocards-chill-tee", description: "Cozy oversized tee for sorting your photocard collection. Soft washed cotton.", price: 35.00, category: "women", images: ["https://picsum.photos/seed/u-tee5/600/800"], colors: ["Lavender", "Cream"], sizes: sizes.tops },
  { name: "Idol Academy Tee", slug: "idol-academy-tee", description: "Varsity-style tee with 'IDOL ACADEMY' crest. Premium cotton blend.", price: 38.00, category: "men", images: ["https://picsum.photos/seed/u-tee6/600/800"], colors: ["Navy", "White"], sizes: sizes.tops },
  { name: "Slay Repeat Tee", slug: "slay-repeat-tee", description: "Eat. Sleep. Slay. Repeat. Oversized unisex tee with loop print.", price: 33.00, category: "women", images: ["https://picsum.photos/seed/u-tee7/600/800"], colors: ["Black", "Hot Pink"], sizes: sizes.tops },
  { name: "Lightstick Lineup Tee", slug: "lightstick-lineup-tee", description: "All the iconic lightstick designs in a grid pattern. Collector's edition print.", price: 40.00, category: "men", featured: true, images: ["https://picsum.photos/seed/u-tee8/600/800"], colors: ["Black", "White"], sizes: sizes.tops },
  { name: "Streaming Party Tee", slug: "streaming-party-tee", description: "Pixel art tee celebrating the art of 24/7 streaming. Digital love.", price: 34.00, category: "women", images: ["https://picsum.photos/seed/u-tee9/600/800"], colors: ["Purple", "Black"], sizes: sizes.tops },
  { name: "Seoul to Worldwide Tee", slug: "seoul-to-worldwide-tee", description: "Globe graphic with Seoul at the center. 서울 to the world.", price: 36.00, category: "men", images: ["https://picsum.photos/seed/u-tee10/600/800"], colors: ["White", "Black"], sizes: sizes.tops },

  // ═══════════════════════════════════════
  // LONG SLEEVES (15)
  // ═══════════════════════════════════════
  { name: "Midnight Rehearsal Long Sleeve", slug: "midnight-rehearsal-ls", description: "Heavyweight long sleeve with practice room mirror print on the back. Late night grind.", price: 48.00, category: "men", featured: true, images: ["https://picsum.photos/seed/ls1/600/800"], colors: ["Black", "Dark Grey"], sizes: sizes.tops },
  { name: "Cherry Bomb Long Sleeve", slug: "cherry-bomb-ls", description: "Fitted long sleeve with cherry blossom explosion graphic. Spring comeback vibes.", price: 45.00, category: "women", featured: true, images: ["https://picsum.photos/seed/ls2/600/800"], colors: ["White", "Baby Pink"], sizes: sizes.tops },
  { name: "Idol Training Long Sleeve", slug: "idol-training-ls", description: "Performance fabric long sleeve with reflective details. 6AM dance practice ready.", price: 52.00, category: "men", images: ["https://picsum.photos/seed/ls3/600/800"], colors: ["Black", "Navy"], sizes: sizes.tops },
  { name: "Dreamy Ribbon Long Sleeve", slug: "dreamy-ribbon-ls", description: "Soft cotton long sleeve with ribbon cuff details. Sweet and ethereal.", price: 46.00, category: "women", images: ["https://picsum.photos/seed/ls4/600/800"], colors: ["Cream", "Dusty Pink"], sizes: sizes.tops },
  { name: "Seoul Sunset Thermal", slug: "seoul-sunset-thermal", description: "Waffle-knit thermal with gradient sunset colors. Han River golden hour.", price: 55.00, category: "men", images: ["https://picsum.photos/seed/ls5/600/800"], colors: ["Sunset Orange", "Purple Haze"], sizes: sizes.tops },
  { name: "Starlight Stripe Long Sleeve", slug: "starlight-stripe-ls", description: "Breton stripe long sleeve with metallic thread accents. Classic meets K-pop.", price: 44.00, category: "women", images: ["https://picsum.photos/seed/ls6/600/800"], colors: ["Navy/White", "Black/Silver"], sizes: sizes.tops },
  { name: "Era Long Sleeve", slug: "era-long-sleeve", description: "Oversized long sleeve with oversized 'ERA' back print. Every comeback is a new era.", price: 48.00, category: "men", images: ["https://picsum.photos/seed/ls7/600/800"], colors: ["Washed Black", "Bone"], sizes: sizes.tops },
  { name: "Velvet Touch Long Sleeve", slug: "velvet-touch-ls", description: "Velvet-feel long sleeve top with subtle sheen. Red carpet casual.", price: 58.00, category: "women", images: ["https://picsum.photos/seed/ls8/600/800"], colors: ["Burgundy", "Midnight Blue"], sizes: sizes.tops },
  { name: "Comeback Countdown Henley", slug: "comeback-countdown-henley", description: "Waffle henley with embroidered countdown numbers. The wait is almost over.", price: 50.00, category: "men", images: ["https://picsum.photos/seed/ls9/600/800"], colors: ["Oatmeal", "Charcoal"], sizes: sizes.tops },
  { name: "Lace Trim Long Sleeve", slug: "lace-trim-ls", description: "Delicate lace trim at the cuffs and hem. Feminine and bold.", price: 47.00, category: "women", images: ["https://picsum.photos/seed/ls10/600/800"], colors: ["Black", "White"], sizes: sizes.tops },
  { name: "Neon Hangul Long Sleeve", slug: "neon-hangul-ls", description: "Neon-colored Hangul typography down the sleeves. Glows under blacklight.", price: 52.00, category: "men", images: ["https://picsum.photos/seed/ls11/600/800"], colors: ["Black", "White"], sizes: sizes.tops },
  { name: "Angel Wings Long Sleeve", slug: "angel-wings-ls", description: "Sheer mesh wing panels on the back. Angelic concept energy.", price: 55.00, category: "women", images: ["https://picsum.photos/seed/ls12/600/800"], colors: ["White", "Champagne"], sizes: sizes.tops },
  { name: "Practice Room Waffle LS", slug: "practice-room-waffle-ls", description: "Relaxed waffle knit long sleeve. What idols wear between takes.", price: 46.00, category: "men", images: ["https://picsum.photos/seed/ls13/600/800"], colors: ["Grey", "Sage"], sizes: sizes.tops },
  { name: "Flower Path Long Sleeve", slug: "flower-path-ls", description: "Embroidered floral path climbing up one sleeve. 꽃길만 걷자.", price: 50.00, category: "women", images: ["https://picsum.photos/seed/ls14/600/800"], colors: ["Black", "Ivory"], sizes: sizes.tops },
  { name: "World Tour Long Sleeve", slug: "world-tour-ls", description: "Tour-style long sleeve with city names down the back. Collect every stop.", price: 48.00, category: "men", images: ["https://picsum.photos/seed/ls15/600/800"], colors: ["Black", "White"], sizes: sizes.tops },

  // ═══════════════════════════════════════
  // JACKETS (15)
  // ═══════════════════════════════════════
  { name: "Debut Bomber Jacket", slug: "debut-bomber-jacket", description: "Satin bomber with embroidered debut star patches. Your origin story, wearable.", price: 128.00, category: "men", featured: true, images: ["https://picsum.photos/seed/jk1/600/800", "https://picsum.photos/seed/jk1b/600/800"], colors: ["Black", "Navy"], sizes: sizes.tops },
  { name: "Idol Cropped Moto Jacket", slug: "idol-cropped-moto-jacket", description: "Cropped faux leather moto jacket with silver hardware. Stage presence in a jacket.", price: 145.00, category: "women", featured: true, images: ["https://picsum.photos/seed/jk2/600/800"], colors: ["Black", "Red"], sizes: sizes.tops },
  { name: "Lightstick Varsity Jacket", slug: "lightstick-varsity-jacket", description: "Classic varsity jacket with chenille lightstick patch. Fandom pride.", price: 135.00, category: "men", images: ["https://picsum.photos/seed/jk3/600/800"], colors: ["Black/White", "Navy/Gold"], sizes: sizes.tops },
  { name: "Pastel Dream Denim Jacket", slug: "pastel-dream-denim-jacket", description: "Pastel-dyed denim jacket with pearl button details. Soft concept.", price: 118.00, category: "women", images: ["https://picsum.photos/seed/jk4/600/800"], colors: ["Pastel Pink", "Pastel Blue"], sizes: sizes.tops },
  { name: "Comeback Windbreaker", slug: "comeback-windbreaker", description: "Lightweight windbreaker with color-block panels. Airport fashion essential.", price: 95.00, category: "men", images: ["https://picsum.photos/seed/jk5/600/800"], colors: ["Black/Neon", "White/Blue"], sizes: sizes.tops },
  { name: "Tweed Idol Jacket", slug: "tweed-idol-jacket", description: "Cropped tweed jacket with gold chain trim. Music show outfit energy.", price: 155.00, category: "women", featured: true, images: ["https://picsum.photos/seed/jk6/600/800"], colors: ["Pink Tweed", "Black Tweed"], sizes: sizes.tops },
  { name: "Seoul Puffer Jacket", slug: "seoul-puffer-jacket", description: "Oversized puffer with Seoul coordinates embroidered inside. Winter in Korea.", price: 168.00, category: "men", images: ["https://picsum.photos/seed/jk7/600/800"], colors: ["Black", "Silver"], sizes: sizes.tops },
  { name: "Crystal Blazer", slug: "crystal-blazer", description: "Structured blazer with crystal button details. Award show ready.", price: 175.00, category: "women", images: ["https://picsum.photos/seed/jk8/600/800"], colors: ["Black", "White"], sizes: sizes.tops },
  { name: "Track Jacket Seoul Edition", slug: "track-jacket-seoul", description: "Retro track jacket with Korean flag-inspired side stripes.", price: 88.00, category: "men", images: ["https://picsum.photos/seed/jk9/600/800"], colors: ["White/Red/Blue", "Black/Gold"], sizes: sizes.tops },
  { name: "Faux Fur Idol Coat", slug: "faux-fur-idol-coat", description: "Luxe faux fur coat in statement colors. Red carpet winter.", price: 195.00, category: "women", images: ["https://picsum.photos/seed/jk10/600/800"], colors: ["Cream", "Pink"], sizes: sizes.tops },
  { name: "Techwear Utility Jacket", slug: "techwear-utility-jacket", description: "Multi-pocket utility jacket with techwear details. Cyberpunk Seoul.", price: 148.00, category: "men", images: ["https://picsum.photos/seed/jk11/600/800"], colors: ["Black", "Olive"], sizes: sizes.tops },
  { name: "Sequin Performance Jacket", slug: "sequin-performance-jacket", description: "Fully sequined cropped jacket. When the spotlight hits, you shine.", price: 165.00, category: "women", images: ["https://picsum.photos/seed/jk12/600/800"], colors: ["Silver", "Gold"], sizes: sizes.tops },
  { name: "Oversized Denim Idol Jacket", slug: "oversized-denim-idol-jacket", description: "Oversized denim jacket with K-pop patches and pin loops. Customize your fandom.", price: 125.00, category: "men", images: ["https://picsum.photos/seed/jk13/600/800"], colors: ["Medium Wash", "Black Wash"], sizes: sizes.tops },
  { name: "Ribbon Tie Jacket", slug: "ribbon-tie-jacket", description: "Lightweight jacket with oversized ribbon tie closure. Sweet meets street.", price: 110.00, category: "women", images: ["https://picsum.photos/seed/jk14/600/800"], colors: ["Pink", "Black"], sizes: sizes.tops },
  { name: "Holographic Rain Jacket", slug: "holographic-rain-jacket", description: "Iridescent holographic rain jacket. Turn rainy days into music video moments.", price: 135.00, category: "men", images: ["https://picsum.photos/seed/jk15/600/800"], colors: ["Holographic", "Clear/Iridescent"], sizes: sizes.tops },

  // ═══════════════════════════════════════
  // PANTS (15)
  // ═══════════════════════════════════════
  { name: "Stage Cargo Pants", slug: "stage-cargo-pants", description: "Wide-leg cargo pants with multiple utility pockets. Dance practice to the stage.", price: 78.00, category: "men", featured: true, images: ["https://picsum.photos/seed/pt1/600/800"], colors: ["Black", "Khaki"], sizes: sizes.pants },
  { name: "Idol Flare Pants", slug: "idol-flare-pants", description: "High-waist flare pants with satin stripe down the side. Legs for days.", price: 72.00, category: "women", images: ["https://picsum.photos/seed/pt2/600/800"], colors: ["Black", "White"], sizes: sizes.pants },
  { name: "Comeback Straight Leg Jeans", slug: "comeback-straight-jeans", description: "Classic straight leg jeans with subtle star rivets. Clean and versatile.", price: 85.00, category: "men", images: ["https://picsum.photos/seed/pt3/600/800"], colors: ["Indigo", "Black"], sizes: sizes.pants },
  { name: "Crystal Chain Pants", slug: "crystal-chain-pants", description: "Tailored pants with detachable crystal chain detail. Performance-ready.", price: 92.00, category: "women", featured: true, images: ["https://picsum.photos/seed/pt4/600/800"], colors: ["Black", "White"], sizes: sizes.pants },
  { name: "Practice Sweats", slug: "practice-sweats", description: "Premium heavyweight sweatpants. What you wear when the choreography gets real.", price: 65.00, category: "men", images: ["https://picsum.photos/seed/pt5/600/800"], colors: ["Grey", "Black", "Navy"], sizes: sizes.pants },
  { name: "Pleated Wide Leg Trousers", slug: "pleated-wide-trousers", description: "Flowing pleated trousers with a high waist. Elegant K-drama protagonist energy.", price: 88.00, category: "women", images: ["https://picsum.photos/seed/pt6/600/800"], colors: ["Cream", "Black"], sizes: sizes.pants },
  { name: "Parachute Pants", slug: "parachute-pants", description: "Nylon parachute pants with toggle details. Y2K meets K-pop.", price: 70.00, category: "men", images: ["https://picsum.photos/seed/pt7/600/800"], colors: ["Black", "Silver", "White"], sizes: sizes.pants },
  { name: "Vinyl Flare Pants", slug: "vinyl-flare-pants", description: "High-shine vinyl flare pants. Girl group concept shoot essential.", price: 82.00, category: "women", images: ["https://picsum.photos/seed/pt8/600/800"], colors: ["Black", "Red"], sizes: sizes.pants },
  { name: "Distressed Idol Jeans", slug: "distressed-idol-jeans", description: "Strategically ripped slim jeans with paint splatter details.", price: 90.00, category: "men", images: ["https://picsum.photos/seed/pt9/600/800"], colors: ["Light Wash", "Black"], sizes: sizes.pants },
  { name: "Satin Joggers", slug: "satin-joggers", description: "Luxe satin joggers with ribbed cuffs. Airport fashion meets loungewear.", price: 68.00, category: "women", images: ["https://picsum.photos/seed/pt10/600/800"], colors: ["Champagne", "Black"], sizes: sizes.pants },
  { name: "Leather-Look Pants", slug: "leather-look-pants", description: "Faux leather straight leg pants. Dark concept era approved.", price: 95.00, category: "men", images: ["https://picsum.photos/seed/pt11/600/800"], colors: ["Black"], sizes: sizes.pants },
  { name: "Butterfly Embroidered Jeans", slug: "butterfly-embroidered-jeans", description: "Wide-leg jeans with butterfly embroidery climbing up the leg.", price: 98.00, category: "women", images: ["https://picsum.photos/seed/pt12/600/800"], colors: ["Light Blue", "White"], sizes: sizes.pants },
  { name: "Pinstripe Dance Pants", slug: "pinstripe-dance-pants", description: "Tapered pinstripe pants with stretch for full range of motion.", price: 76.00, category: "men", images: ["https://picsum.photos/seed/pt13/600/800"], colors: ["Black/White", "Navy"], sizes: sizes.pants },
  { name: "Ruched Mini Skirt Pants", slug: "ruched-skirt-pants", description: "Skirt-over-pants silhouette with ruched detail. Innovative and bold.", price: 85.00, category: "women", images: ["https://picsum.photos/seed/pt14/600/800"], colors: ["Black", "Pink"], sizes: sizes.pants },
  { name: "Velvet Track Pants", slug: "velvet-track-pants", description: "Plush velvet track pants with side stripe. Cozy flex.", price: 72.00, category: "men", images: ["https://picsum.photos/seed/pt15/600/800"], colors: ["Burgundy", "Black"], sizes: sizes.pants },

  // ═══════════════════════════════════════
  // ACCESSORIES (15)
  // ═══════════════════════════════════════
  { name: "Lightstick Phone Case", slug: "lightstick-phone-case", description: "Clear phone case with holographic lightstick design. Fits iPhone & Samsung.", price: 24.00, category: "accessories", images: ["https://picsum.photos/seed/acc1/600/800"], colors: ["Clear/Holo"], sizes: sizes.oneSize },
  { name: "Idol Chain Necklace", slug: "idol-chain-necklace", description: "Layered silver chain necklace with star pendant. Stage-worthy jewelry.", price: 38.00, category: "accessories", featured: true, images: ["https://picsum.photos/seed/acc2/600/800"], colors: ["Silver", "Gold"], sizes: sizes.oneSize },
  { name: "Fandom Bucket Hat", slug: "fandom-bucket-hat", description: "Cotton bucket hat with subtle lightstick embroidery. Sun protection + stan.", price: 32.00, category: "accessories", images: ["https://picsum.photos/seed/acc3/600/800"], colors: ["Black", "White", "Pink"], sizes: sizes.oneSize },
  { name: "Photocard Holder Lanyard", slug: "photocard-holder-lanyard", description: "Clear photocard display holder on a satin lanyard. Show off your pulls.", price: 18.00, category: "accessories", images: ["https://picsum.photos/seed/acc4/600/800"], colors: ["Pink", "Purple", "Black"], sizes: sizes.oneSize },
  { name: "Korean Wave Tote Bag", slug: "korean-wave-tote", description: "Canvas tote with ocean wave + Hangul design. Fits all your albums.", price: 28.00, category: "accessories", images: ["https://picsum.photos/seed/acc5/600/800"], colors: ["Natural", "Black"], sizes: sizes.oneSize },
  { name: "Crystal Hair Clips Set", slug: "crystal-hair-clips", description: "Set of 4 crystal-embellished hair clips. Music show styling at home.", price: 22.00, category: "accessories", images: ["https://picsum.photos/seed/acc6/600/800"], colors: ["Silver", "Gold"], sizes: sizes.oneSize },
  { name: "Seoul Snapback Cap", slug: "seoul-snapback-cap", description: "Structured snapback with '서울' embroidered in 3D. Adjustable fit.", price: 35.00, category: "accessories", images: ["https://picsum.photos/seed/acc7/600/800"], colors: ["Black", "White"], sizes: sizes.oneSize },
  { name: "Bias Bracelet Set", slug: "bias-bracelet-set", description: "Set of 3 beaded bracelets with letter beads. Spell out your bias.", price: 20.00, category: "accessories", images: ["https://picsum.photos/seed/acc8/600/800"], colors: ["Mixed Pastel", "Black/Silver"], sizes: sizes.oneSize },
  { name: "Album Crossbody Bag", slug: "album-crossbody-bag", description: "Structured crossbody bag sized perfectly for carrying albums. Padded interior.", price: 52.00, category: "accessories", featured: true, images: ["https://picsum.photos/seed/acc9/600/800"], colors: ["Black", "Pink"], sizes: sizes.oneSize },
  { name: "Star Stud Earrings", slug: "star-stud-earrings", description: "Asymmetric star and moon stud earring set. Hypoallergenic surgical steel.", price: 26.00, category: "accessories", images: ["https://picsum.photos/seed/acc10/600/800"], colors: ["Silver", "Gold"], sizes: sizes.oneSize },
  { name: "Concert Sling Bag", slug: "concert-sling-bag", description: "Compact sling bag for concerts — fits phone, lightstick, cards. Hands-free dancing.", price: 42.00, category: "accessories", images: ["https://picsum.photos/seed/acc11/600/800"], colors: ["Black", "Clear"], sizes: sizes.oneSize },
  { name: "Hangul Beanie", slug: "hangul-beanie", description: "Ribbed knit beanie with embroidered Hangul characters. Winter stan essential.", price: 30.00, category: "accessories", images: ["https://picsum.photos/seed/acc12/600/800"], colors: ["Black", "Cream", "Pink"], sizes: sizes.oneSize },
  { name: "Idol Ring Set", slug: "idol-ring-set", description: "Set of 5 stackable rings in mixed metals. Layer like your favorite idol.", price: 34.00, category: "accessories", images: ["https://picsum.photos/seed/acc13/600/800"], colors: ["Silver", "Gold", "Mixed"], sizes: sizes.oneSize },
  { name: "LED Concert Banner", slug: "led-concert-banner", description: "Programmable LED banner for concerts. USB rechargeable. Make your message seen.", price: 45.00, category: "accessories", images: ["https://picsum.photos/seed/acc14/600/800"], colors: ["White"], sizes: sizes.oneSize },
  { name: "Silk Scarf Seoul Print", slug: "silk-scarf-seoul-print", description: "Silk twilly scarf with Seoul landmarks illustration. Tie it anywhere.", price: 38.00, category: "accessories", images: ["https://picsum.photos/seed/acc15/600/800"], colors: ["Pink/Gold", "Blue/Silver"], sizes: sizes.oneSize },

  // ═══════════════════════════════════════
  // SALE (15)
  // ═══════════════════════════════════════
  { name: "Last Season Crop Top", slug: "last-season-crop-top", description: "Cropped ribbed top from our spring collection. Final clearance.", price: 15.00, compareAtPrice: 35.00, category: "sale", images: ["https://picsum.photos/seed/sale1/600/800"], colors: ["Pink", "White"], sizes: sizes.tops },
  { name: "Pre-Debut Practice Shorts", slug: "pre-debut-practice-shorts", description: "Athletic shorts perfect for dance practice. End of line.", price: 18.00, compareAtPrice: 38.00, category: "sale", images: ["https://picsum.photos/seed/sale2/600/800"], colors: ["Black", "Grey"], sizes: sizes.pants },
  { name: "Summer Concert Tee", slug: "summer-concert-tee", description: "Lightweight cotton tee from last summer's concert series. Limited remaining.", price: 16.00, compareAtPrice: 34.00, category: "sale", images: ["https://picsum.photos/seed/sale3/600/800"], colors: ["White", "Yellow"], sizes: sizes.tops },
  { name: "Mesh Layer Top", slug: "mesh-layer-top-sale", description: "Sheer mesh layering top with star print. Sample sale.", price: 20.00, compareAtPrice: 48.00, category: "sale", images: ["https://picsum.photos/seed/sale4/600/800"], colors: ["Black", "White"], sizes: sizes.tops },
  { name: "Mini Fan Bag", slug: "mini-fan-bag-sale", description: "Tiny crossbody for your lightstick and photocards. Last units.", price: 19.00, compareAtPrice: 42.00, category: "sale", images: ["https://picsum.photos/seed/sale5/600/800"], colors: ["Pink", "Black"], sizes: sizes.oneSize },
  { name: "Glitter Ankle Socks 3-Pack", slug: "glitter-ankle-socks", description: "Sparkly ankle socks set. Because even your feet should shine.", price: 10.00, compareAtPrice: 22.00, category: "sale", images: ["https://picsum.photos/seed/sale6/600/800"], colors: ["Mixed"], sizes: sizes.oneSize },
  { name: "Retro Idol Jacket", slug: "retro-idol-jacket-sale", description: "Vintage-style zip-up jacket from our retro concept collection.", price: 55.00, compareAtPrice: 120.00, category: "sale", images: ["https://picsum.photos/seed/sale7/600/800"], colors: ["Red", "Blue"], sizes: sizes.tops },
  { name: "Faded Tour Hoodie", slug: "faded-tour-hoodie-sale", description: "Sun-faded effect hoodie from the world tour merch line. Cozy.", price: 38.00, compareAtPrice: 78.00, category: "sale", images: ["https://picsum.photos/seed/sale8/600/800"], colors: ["Faded Black", "Faded Pink"], sizes: sizes.tops },
  { name: "Neon Sign Tee", slug: "neon-sign-tee-sale", description: "Neon tube light graphic tee. When the sign says 'OPEN', your heart is.", price: 14.00, compareAtPrice: 32.00, category: "sale", images: ["https://picsum.photos/seed/sale9/600/800"], colors: ["Black"], sizes: sizes.tops },
  { name: "Trainee Joggers", slug: "trainee-joggers-sale", description: "Basic training joggers. Slightly imperfect — priced to move.", price: 22.00, compareAtPrice: 55.00, category: "sale", images: ["https://picsum.photos/seed/sale10/600/800"], colors: ["Grey", "Black"], sizes: sizes.pants },
  { name: "Enamel Pin Collection", slug: "enamel-pin-collection-sale", description: "Set of 6 K-pop themed enamel pins. Imperfect packaging, perfect pins.", price: 12.00, compareAtPrice: 28.00, category: "sale", images: ["https://picsum.photos/seed/sale11/600/800"], colors: ["Mixed"], sizes: sizes.oneSize },
  { name: "Satin Bomber (B-Grade)", slug: "satin-bomber-b-grade", description: "Our best-selling satin bomber with minor stitching variations. Still gorgeous.", price: 65.00, compareAtPrice: 128.00, category: "sale", images: ["https://picsum.photos/seed/sale12/600/800"], colors: ["Black", "Navy"], sizes: sizes.tops },
  { name: "Linen Wide Pants", slug: "linen-wide-pants-sale", description: "Summer linen wide-leg pants. Light, breezy, last season.", price: 30.00, compareAtPrice: 72.00, category: "sale", images: ["https://picsum.photos/seed/sale13/600/800"], colors: ["Natural", "Sage"], sizes: sizes.pants },
  { name: "Album Art Tee", slug: "album-art-tee-sale", description: "Abstract album cover art printed on heavyweight cotton. Collector vibes.", price: 18.00, compareAtPrice: 40.00, category: "sale", images: ["https://picsum.photos/seed/sale14/600/800"], colors: ["White", "Black"], sizes: sizes.tops },
  { name: "Debut Era Snapback", slug: "debut-era-snapback-sale", description: "Limited run snapback from our debut collection. Few remaining.", price: 15.00, compareAtPrice: 35.00, category: "sale", images: ["https://picsum.photos/seed/sale15/600/800"], colors: ["Black", "Pink"], sizes: sizes.oneSize },
];

async function main() {
  console.log("Seeding database with 100 K-pop inspired products...\n");

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();

  let count = 0;
  for (const p of products) {
    const { colors, sizes: productSizes, ...productData } = p as any;

    // Generate variants for each size/color combo
    const variants = [];
    for (const color of colors) {
      for (const size of productSizes) {
        const stock = Math.floor(Math.random() * 30) + 5; // 5-34 units
        variants.push({
          size,
          color,
          sku: `TW-${p.slug}-${size}-${color}`.toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 50),
          stock,
        });
      }
    }

    await prisma.product.create({
      data: {
        name: productData.name,
        slug: productData.slug,
        description: productData.description,
        price: productData.price,
        compareAtPrice: productData.compareAtPrice || null,
        category: productData.category,
        images: JSON.stringify(productData.images),
        featured: productData.featured || false,
        variants: { create: variants },
      },
    });

    count++;
    console.log(`  ✓ [${count}/100] ${p.name} (${variants.length} variants)`);
  }

  const totalVariants = await prisma.productVariant.count();
  console.log(`\n✨ Seeded ${count} products with ${totalVariants} total SKU variants!`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
