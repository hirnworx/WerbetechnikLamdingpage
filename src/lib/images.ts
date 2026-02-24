function unsplash(id: string, w = 1200, h = 800) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

export const HERO_IMAGES = [
  unsplash("photo-1486406146926-c627a92ad1ab", 1920, 1080),
  unsplash("photo-1497366216548-37526070297c", 1920, 1080),
  unsplash("photo-1504384308090-c894fdcc538d", 1920, 1080),
  unsplash("photo-1497366811353-6870744d04b2", 1920, 1080),
  unsplash("photo-1517245386807-bb43f82c33c4", 1920, 1080),
  unsplash("photo-1460925895917-afdab827c52f", 1920, 1080),
];

export const SERVICE_IMAGES: Record<string, string> = {
  "Fahrzeugbeschriftung": unsplash("photo-1619642751034-765dfdf7c58e", 600, 400),
  "Schaufensterbeschriftung": unsplash("photo-1582037928769-181f2644ecb7", 600, 400),
  "Schilder & Tafeln": unsplash("photo-1633613286991-611fe299c4be", 600, 400),
  "Leuchtreklame": unsplash("photo-1563089145-599997674d42", 600, 400),
  "Messebau & Displays": unsplash("photo-1540575467063-178a50c2df87", 600, 400),
  "Folierung & Vollverklebung": unsplash("photo-1618843479313-40f8afb4b4d8", 600, 400),
  "Werbebanner & Planen": unsplash("photo-1611532736597-de2d4265fba3", 600, 400),
  "Praxisschilder & Firmenschilder": unsplash("photo-1497366754035-f200968a6e72", 600, 400),
};

export const SERVICE_DESCRIPTIONS: Record<string, string> = {
  "Fahrzeugbeschriftung": "Verwandeln Sie Ihr Fahrzeug in einen mobilen Werbeträger mit professioneller Beschriftung.",
  "Schaufensterbeschriftung": "Gestalten Sie Ihr Schaufenster als Blickfang mit hochwertiger Folienbeschriftung.",
  "Schilder & Tafeln": "Individuelle Schilder und Tafeln für Ihre Geschäftsräume und Außenwerbung.",
  "Leuchtreklame": "Auffällige Leuchtwerbung, die Tag und Nacht für Aufmerksamkeit sorgt.",
  "Messebau & Displays": "Professionelle Messeauftritte mit individuellen Displays und Standbau.",
  "Folierung & Vollverklebung": "Kreative Folierungen für Fahrzeuge, Möbel und Oberflächen aller Art.",
  "Werbebanner & Planen": "Großformatige Banner und Planen für maximale Sichtbarkeit.",
  "Praxisschilder & Firmenschilder": "Hochwertige Schilder für Praxen, Kanzleien und Unternehmen.",
};

export const ABOUT_IMAGE = unsplash("photo-1522071820081-009f0129c71c", 800, 600);
export const CTA_BG_IMAGE = unsplash("photo-1497366216548-37526070297c", 1920, 800);
export const CITY_CARD_FALLBACK = unsplash("photo-1449824913935-59a10b8d2000", 600, 400);

export function getHeroImage(slug: string): string {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = ((h << 5) - h + slug.charCodeAt(i)) | 0;
  }
  return HERO_IMAGES[Math.abs(h) % HERO_IMAGES.length];
}
