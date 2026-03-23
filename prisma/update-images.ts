import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const pexelsUrl = (id: string) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop`;

const imagePool: Record<string, string[]> = {
  women_tee: ["7124122","7752451","7767439","7752577","6491666","7752454","3420044","7752676","36487921","36136610","7767441","7139617","7767916","7760007","267748","7767853","11883261","9136065","14071489","7767601","713486","36355449","31743247","9579016","6211617"],
  men_tee: ["4196884","4882834","7184397","6181434","5225100","4139530","6062228","7596631","4882831","7164286","6959457","36511060","6069968","16965547","7048485","6315652","10037708","2907034","1390602","7048383","3399981","6069962","7555556","3280724","6863594"],
  jacket: ["3205757","3603940","3205758","2315302","3053475","5584483","3205759","4431012","6277885","2792561","6277884","7792793","3205779","5915712","2345214","893167","1113662","1884656","5635388","2462047","2792647","7242028"],
  long_sleeve: ["5826658","6477427","7760234","6477431","5755039","6665048","5809435","5809636","7760233","3565113","7760239","5675733","7028483","7028484","7028478","6171799","6010834","7028474","7191179","5809164","36463269","5809533"],
  pants: ["7208440","5365647","7075433","7139628","3262909","5365676","1380599","5365669","1380598","7792793","1390600","5535512","7752445","3538028","7690965","5535393","7208437","7752577","7752580","5535511","5365646","1380591"],
  accessories: ["7130033","6617913","1306262","4627902","36263371","36045810","6617915","5405623","5864264","443088","6617903","1204463","1043581","36209790","6956890","346748","1132269","6617916","1381562","36125061","36385203","7318969"],
  sale: ["893169","3616933","3603940","3598015","1938250","3053480","5826658","2523922","3539525","6273402","5809533","7208440","1380595","7550377","3064588","7139628","1683687","1380599","7263256","6630269","4858163","924939"],
};

// Map product categories + slugs to image pools
function getImageCategory(product: { category: string; slug: string }): string {
  const slug = product.slug.toLowerCase();
  
  if (product.category === "sale") return "sale";
  if (product.category === "accessories") return "accessories";
  
  if (slug.includes("jacket") || slug.includes("bomber") || slug.includes("coat") || slug.includes("blazer") || slug.includes("windbreaker") || slug.includes("puffer") || slug.includes("moto")) {
    return "jacket";
  }
  if (slug.includes("pants") || slug.includes("jean") || slug.includes("trouser") || slug.includes("chino") || slug.includes("sweat") || slug.includes("jogger") || slug.includes("cargo") || slug.includes("flare") || slug.includes("shorts") || slug.includes("skirt")) {
    return "pants";
  }
  if (slug.includes("long-sleeve") || slug.includes("-ls") || slug.includes("thermal") || slug.includes("henley") || slug.includes("waffle")) {
    return "long_sleeve";
  }
  
  // T-shirts - split by gender based on category
  if (product.category === "women") return "women_tee";
  if (product.category === "men") return "men_tee";
  
  return "women_tee"; // fallback
}

async function main() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "asc" } });
  
  // Track usage per pool to avoid repeats
  const poolIndex: Record<string, number> = {};
  Object.keys(imagePool).forEach(k => poolIndex[k] = 0);
  
  let updated = 0;
  
  for (const product of products) {
    const imgCat = getImageCategory(product);
    const pool = imagePool[imgCat];
    const idx = poolIndex[imgCat] % pool.length;
    
    // Give each product 2 images from the pool
    const img1 = pexelsUrl(pool[idx]);
    const img2 = pexelsUrl(pool[(idx + 1) % pool.length]);
    
    poolIndex[imgCat] = idx + 2;
    
    await prisma.product.update({
      where: { id: product.id },
      data: { images: JSON.stringify([img1, img2]) },
    });
    
    updated++;
    if (updated % 10 === 0) console.log(`  Updated ${updated}/${products.length}...`);
  }
  
  console.log(`\n✨ Updated images for all ${updated} products!`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
