import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const cities = [
  { cityName: "München", slug: "muenchen", region: "Bayern", shortLocalHook: "Von der Theresienwiese bis zum Marienplatz – Ihre Werbung wird in München gesehen." },
  { cityName: "Berlin", slug: "berlin", region: "Berlin", shortLocalHook: "Hauptstadt-Werbung mit Wirkung – von Mitte bis Kreuzberg." },
  { cityName: "Hamburg", slug: "hamburg", region: "Hamburg", shortLocalHook: "Am Hafen, in der City oder auf der Reeperbahn – Werbetechnik, die auffällt." },
  { cityName: "Köln", slug: "koeln", region: "Nordrhein-Westfalen", shortLocalHook: "Ob am Dom oder im Belgischen Viertel – wir bringen Ihre Marke groß raus." },
  { cityName: "Frankfurt am Main", slug: "frankfurt-am-main", region: "Hessen", shortLocalHook: "In der Finanzmetropole zählt professionelle Außenwirkung." },
  { cityName: "Stuttgart", slug: "stuttgart", region: "Baden-Württemberg" },
  { cityName: "Düsseldorf", slug: "duesseldorf", region: "Nordrhein-Westfalen" },
  { cityName: "Leipzig", slug: "leipzig", region: "Sachsen", shortLocalHook: "Leipzigs lebendige Szene verdient kreative Werbetechnik." },
  { cityName: "Nürnberg", slug: "nuernberg", region: "Bayern" },
  { cityName: "Dresden", slug: "dresden", region: "Sachsen" },
  { cityName: "Hannover", slug: "hannover", region: "Niedersachsen" },
  { cityName: "Bremen", slug: "bremen", region: "Bremen" },
  { cityName: "Essen", slug: "essen", region: "Nordrhein-Westfalen" },
  { cityName: "Dortmund", slug: "dortmund", region: "Nordrhein-Westfalen" },
  { cityName: "Augsburg", slug: "augsburg", region: "Bayern" },
];

async function main() {
  for (const city of cities) {
    await prisma.city.upsert({
      where: { slug: city.slug },
      update: { cityName: city.cityName, region: city.region, shortLocalHook: city.shortLocalHook },
      create: city,
    });
  }
  console.log(`Seeded ${cities.length} cities`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
