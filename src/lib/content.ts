/* ------------------------------------------------------------------ */
/*  Deterministic content-variation system for city landing pages      */
/*  Uses stable hash(slug) to pick unique variant combos per city      */
/* ------------------------------------------------------------------ */

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function pick<T>(variants: T[], slug: string, offset = 0): T {
  const idx = (hashStr(slug) + offset) % variants.length;
  return variants[idx];
}

/* ------------------------------------------------------------------ */
/*  Services list                                                      */
/* ------------------------------------------------------------------ */

export const SERVICES = [
  "Fahrzeugbeschriftung",
  "Schaufensterbeschriftung",
  "Schilder & Tafeln",
  "Leuchtreklame",
  "Messebau & Displays",
  "Folierung & Vollverklebung",
  "Werbebanner & Planen",
  "Praxisschilder & Firmenschilder",
] as const;

export type ServiceName = (typeof SERVICES)[number];

/* ------------------------------------------------------------------ */
/*  H1 variants                                                        */
/* ------------------------------------------------------------------ */

const H1_VARIANTS = [
  (c: string) => `Werbetechnik in ${c} – Ihr Partner für Beschriftung & Werbung`,
  (c: string) => `Professionelle Werbetechnik in ${c}`,
  (c: string) => `Werbetechnik ${c} – Schilder, Beschriftung & mehr`,
  (c: string) => `Ihr Werbetechnik-Spezialist in ${c}`,
  (c: string) => `Werbetechnik & Beschriftung in ${c} – Qualität vor Ort`,
  (c: string) => `Werbetechnik ${c}: Schilder, Folierung & Leuchtreklame`,
  (c: string) => `Beschriftung & Werbetechnik in ${c} – regional & zuverlässig`,
  (c: string) => `${c}: Werbetechnik vom Profi – Beratung bis Montage`,
];

/* ------------------------------------------------------------------ */
/*  Meta title & description variants                                  */
/* ------------------------------------------------------------------ */

const TITLE_VARIANTS = [
  (c: string) => `Werbetechnik ${c} ▷ Beschriftung, Schilder & Folierung | Printvertise`,
  (c: string) => `Werbetechnik in ${c} – Schilder, Leuchtreklame & mehr | Printvertise`,
  (c: string) => `${c} Werbetechnik ✓ Professionelle Beschriftung & Werbung | Printvertise`,
  (c: string) => `Werbetechnik ${c}: Fahrzeugbeschriftung, Schilder & Banner | Printvertise`,
  (c: string) => `Professionelle Werbetechnik in ${c} | Printvertise`,
  (c: string) => `Werbetechnik ${c} – Ihr Experte für Beschriftung & Schilder | Printvertise`,
];

const DESC_VARIANTS = [
  (c: string) =>
    `Professionelle Werbetechnik in ${c}: Fahrzeugbeschriftung, Schilder, Leuchtreklame und mehr. ✓ Persönliche Beratung ✓ Hochwertige Materialien ✓ Montage vor Ort. Jetzt anfragen!`,
  (c: string) =>
    `Ihr Werbetechnik-Partner in ${c}. Wir gestalten und produzieren Schilder, Beschriftungen, Banner und Folierungen – regional, schnell und zuverlässig. Kostenlose Erstberatung!`,
  (c: string) =>
    `Werbetechnik ${c}: Von der Fahrzeugbeschriftung bis zur Leuchtreklame – alles aus einer Hand. ✓ Faire Preise ✓ Top-Qualität. Kontaktieren Sie uns!`,
  (c: string) =>
    `Beschriftung, Schilder und Werbebanner in ${c}. Printvertise ist Ihr lokaler Werbetechnik-Experte mit persönlichem Service und schneller Umsetzung.`,
  (c: string) =>
    `Werbetechnik in ${c} gesucht? Wir realisieren Ihre Projekte: Schilder, Folierung, Leuchtreklame, Messestände und mehr. Jetzt unverbindlich anfragen!`,
  (c: string) =>
    `Vom Firmenschild bis zur Vollfolierung – professionelle Werbetechnik in ${c}. Persönliche Beratung, faire Preise und termingerechte Montage.`,
];

/* ------------------------------------------------------------------ */
/*  Intro paragraph variants                                           */
/* ------------------------------------------------------------------ */

const INTRO_VARIANTS = [
  (c: string, hook?: string | null) =>
    `Sie suchen einen zuverlässigen Partner für Werbetechnik in ${c}? Printvertise steht für hochwertige Beschriftungen, Schilder und Werbelösungen direkt vor Ort. ${hook ? hook + " " : ""}Ob Fahrzeugbeschriftung, Schaufensterbeschriftung oder große Leuchtreklame – wir setzen Ihre Marke professionell in Szene.`,
  (c: string, hook?: string | null) =>
    `Werbetechnik ist mehr als nur ein Schild an der Wand. In ${c} realisieren wir individuelle Werbelösungen, die Ihre Zielgruppe erreichen und begeistern. ${hook ? hook + " " : ""}Von der ersten Skizze bis zur Montage betreuen wir jedes Projekt persönlich.`,
  (c: string, hook?: string | null) =>
    `Sichtbarkeit entscheidet über Ihren Geschäftserfolg. Als Werbetechnik-Spezialisten in ${c} helfen wir Ihnen, mit professionellen Beschriftungen, Schildern und Werbeanlagen aufzufallen. ${hook ? hook + " " : ""}Wir verbinden Kreativität mit handwerklicher Präzision.`,
  (c: string, hook?: string | null) =>
    `In ${c} setzen wir auf Werbetechnik, die wirkt. ${hook ? hook + " " : ""}Unsere Leistungen reichen von Fahrzeugfolierung über Firmenschilder bis hin zu großflächigen Bannern. Jedes Projekt wird individuell geplant und termingerecht umgesetzt.`,
  (c: string, hook?: string | null) =>
    `Professionelle Werbetechnik aus ${c} – das ist Printvertise. ${hook ? hook + " " : ""}Wir gestalten, produzieren und montieren Schilder, Beschriftungen, Banner und Leuchtreklame. Alles aus einer Hand, mit persönlicher Beratung und fairen Preisen.`,
  (c: string, hook?: string | null) =>
    `Ihre Marke verdient den besten Auftritt. In ${c} bieten wir Ihnen das komplette Spektrum der Werbetechnik: von der Beratung über das Design bis zur fachgerechten Montage. ${hook ? hook + " " : ""}Lassen Sie uns gemeinsam Ihre Sichtbarkeit steigern.`,
  (c: string, hook?: string | null) =>
    `Ob Start-up, Handwerksbetrieb oder etabliertes Unternehmen – mit unserer Werbetechnik in ${c} werden Sie gesehen. ${hook ? hook + " " : ""}Wir bieten Ihnen maßgeschneiderte Lösungen für jeden Bedarf und jedes Budget.`,
  (c: string, hook?: string | null) =>
    `Werbetechnik in ${c}? Printvertise ist Ihr Ansprechpartner für Schilder, Beschriftungen, Fahrzeugfolierung und Leuchtreklame. ${hook ? hook + " " : ""}Wir stehen für Qualität, Termintreue und faire Preise.`,
];

/* ------------------------------------------------------------------ */
/*  Service section variants                                           */
/* ------------------------------------------------------------------ */

const SERVICE_SECTION_VARIANTS = [
  (c: string) => ({
    heading: `Unsere Leistungen in ${c}`,
    text: `Als Full-Service-Anbieter für Werbetechnik decken wir in ${c} ein breites Leistungsspektrum ab. Ob klassisches Firmenschild, auffällige Fahrzeugbeschriftung oder moderne Leuchtreklame – wir beraten Sie ehrlich und setzen Ihre Wünsche präzise um.`,
  }),
  (c: string) => ({
    heading: `Werbetechnik-Leistungen für ${c}`,
    text: `Von der Idee bis zum fertigen Produkt: In ${c} bieten wir Ihnen alle Leistungen rund um Werbetechnik. Unsere Experten wählen gemeinsam mit Ihnen das passende Material, erstellen professionelle Entwürfe und übernehmen die Montage.`,
  }),
  (c: string) => ({
    heading: `Das bieten wir Ihnen in ${c}`,
    text: `Wir sind Ihr Werbetechnik-Partner in ${c} und Umgebung. Unser Leistungsspektrum umfasst Fahrzeugbeschriftungen, Schaufenstergestaltung, Schilder, Banner, Leuchtreklame und Messeausstattung – alles individuell auf Ihre Marke zugeschnitten.`,
  }),
  (c: string) => ({
    heading: `Werbetechnik-Lösungen in ${c}`,
    text: `Jedes Unternehmen in ${c} ist einzigartig – und genau so sollte auch seine Werbung sein. Wir entwickeln maßgeschneiderte Werbetechnik-Lösungen, die Ihre Marke stärken und Kunden anziehen.`,
  }),
  (c: string) => ({
    heading: `Ihre Werbetechnik in ${c} – unser Handwerk`,
    text: `Mit Erfahrung und Leidenschaft realisieren wir in ${c} Projekte jeder Größe. Vom kleinen Praxisschild bis zur großflächigen Gebäudebeschriftung – Qualität und Kundenzufriedenheit stehen bei uns an erster Stelle.`,
  }),
  (c: string) => ({
    heading: `Professionelle Werbetechnik in ${c}`,
    text: `In ${c} und der Region stehen wir für hochwertige Werbetechnik mit Persönlichkeit. Wir nehmen uns Zeit für Ihre Anforderungen und liefern Ergebnisse, die überzeugen – termingerecht und im Budget.`,
  }),
];

/* ------------------------------------------------------------------ */
/*  Why-us / trust section variants                                    */
/* ------------------------------------------------------------------ */

const TRUST_VARIANTS = [
  (c: string) => ({
    heading: `Warum Printvertise in ${c}?`,
    points: [
      "Persönliche Beratung und Betreuung vor Ort",
      "Hochwertige Materialien namhafter Hersteller",
      "Eigene Produktion – keine langen Wartezeiten",
      "Fachgerechte Montage durch unser erfahrenes Team",
      "Faire und transparente Preise ohne versteckte Kosten",
    ],
  }),
  (c: string) => ({
    heading: `Ihre Vorteile mit Printvertise in ${c}`,
    points: [
      "Alles aus einer Hand – Beratung, Produktion und Montage",
      "Langjährige Erfahrung in der Werbetechnik",
      "Individuelle Lösungen für jede Branche und jedes Budget",
      "Schnelle Reaktionszeiten und zuverlässige Termine",
      "Regionale Präsenz und kurze Wege",
    ],
  }),
  (c: string) => ({
    heading: `Das zeichnet uns aus – Werbetechnik in ${c}`,
    points: [
      "Kreative Gestaltung und technische Präzision",
      "Moderne Produktionsverfahren und Top-Materialien",
      "Persönlicher Ansprechpartner für Ihr Projekt",
      "Umweltfreundliche Druckverfahren auf Wunsch",
      "Kostenlose Erstberatung und unverbindliche Angebote",
    ],
  }),
  (c: string) => ({
    heading: `Werbetechnik-Kompetenz in ${c}`,
    points: [
      "Breites Portfolio von Schildern bis Leuchtreklame",
      "Maßgeschneiderte Konzepte für Ihren Standort",
      "Termintreue und zuverlässige Umsetzung",
      "Nachhaltige Materialien und langlebige Ergebnisse",
      "Zufriedene Kunden in ${c} und Umgebung",
    ],
  }),
  (c: string) => ({
    heading: `Darum Printvertise für ${c}`,
    points: [
      "Wir kennen den lokalen Markt und Ihre Zielgruppe",
      "Von der Kleinbeschriftung bis zum Großprojekt",
      "Eigener Fuhrpark für flexible Montage",
      "Beratung, die auf Ihre Ziele eingeht",
      "Langjährige Partnerschaften mit zufriedenen Kunden",
    ],
  }),
  (c: string) => ({
    heading: `Warum Unternehmen in ${c} auf uns setzen`,
    points: [
      "Höchste Qualitätsstandards bei Material und Verarbeitung",
      "Innovative Technologien für brillante Ergebnisse",
      "Schnelle Projektabwicklung ohne Qualitätsverlust",
      "Faire Festpreise – keine Überraschungen",
      "Regionaler Partner mit überregionaler Kompetenz",
    ],
  }),
];

/* ------------------------------------------------------------------ */
/*  FAQ variants                                                       */
/* ------------------------------------------------------------------ */

const FAQ_POOLS = [
  (c: string) => [
    { q: `Was kostet Werbetechnik in ${c}?`, a: `Die Kosten hängen von Art, Größe und Material ab. Einfache Beschriftungen beginnen ab wenigen hundert Euro, während Leuchtreklame oder Fahrzeugvollverklebungen entsprechend mehr kosten. Wir erstellen Ihnen gerne ein individuelles Angebot.` },
    { q: `Wie lange dauert ein Werbetechnik-Projekt in ${c}?`, a: `Von der Auftragsbestätigung bis zur Montage vergehen in der Regel 5–10 Werktage. Bei dringenden Projekten bieten wir auch Expressproduktion an.` },
    { q: `Bieten Sie auch Montage in ${c} an?`, a: `Ja, wir übernehmen die komplette Montage vor Ort in ${c} und Umgebung. Unser Team arbeitet sauber, termingerecht und nach allen Sicherheitsvorschriften.` },
    { q: `Welche Materialien verwenden Sie?`, a: `Wir setzen auf hochwertige Folien, Acrylglas, Aluminium und Dibond von namhaften Herstellern wie 3M und Orafol. So garantieren wir Langlebigkeit und brillante Farben.` },
    { q: `Kann ich vorher einen Entwurf sehen?`, a: `Selbstverständlich. Bevor wir in die Produktion gehen, erhalten Sie eine Vorschau Ihres Projekts. Änderungswünsche setzen wir unkompliziert um.` },
  ],
  (c: string) => [
    { q: `Welche Werbetechnik-Leistungen bieten Sie in ${c} an?`, a: `Unser Portfolio umfasst Fahrzeugbeschriftung, Schaufenstergestaltung, Firmenschilder, Leuchtreklame, Banner, Messestände und individuelle Werbelösungen.` },
    { q: `Arbeiten Sie auch mit kleinen Unternehmen in ${c}?`, a: `Ja! Ob Einzelunternehmer, Start-up oder großer Konzern – wir bieten für jede Unternehmensgröße passende Werbetechnik-Lösungen in ${c}.` },
    { q: `Wie pflege ich meine Werbetechnik richtig?`, a: `Folierungen und Schilder sind pflegeleicht. In der Regel reicht eine Reinigung mit mildem Seifenwasser. Wir geben Ihnen nach der Montage detaillierte Pflegehinweise.` },
    { q: `Ist eine Vor-Ort-Beratung in ${c} möglich?`, a: `Ja, wir kommen gerne zu Ihnen nach ${c} und beraten Sie direkt vor Ort. So können wir die Gegebenheiten optimal einschätzen und die beste Lösung empfehlen.` },
    { q: `Wie wetterfest sind Ihre Produkte?`, a: `Unsere Materialien sind UV-beständig, wetterfest und langlebig. Außenbeschriftungen halten bei sachgemäßer Pflege in der Regel 5–7 Jahre und länger.` },
  ],
  (c: string) => [
    { q: `Wie beantrage ich eine Genehmigung für Werbung in ${c}?`, a: `Für bestimmte Werbeanlagen wie Leuchtreklame oder größere Schilder kann eine Baugenehmigung nötig sein. Wir unterstützen Sie bei der Antragstellung und kennen die lokalen Vorschriften in ${c}.` },
    { q: `Kann man Fahrzeugbeschriftungen wieder entfernen?`, a: `Ja, professionelle Fahrzeugfolierungen lassen sich rückstandsfrei entfernen. Wichtig ist die Verwendung hochwertiger Folien – und genau darauf setzen wir.` },
    { q: `Was ist der Unterschied zwischen Folierung und Lackierung?`, a: `Eine Folierung ist günstiger, schneller und reversibel – ideal für Werbung und Farbwechsel. Die Lackierung darunter bleibt geschützt. Perfekt für Leasingfahrzeuge.` },
    { q: `Bieten Sie Wartung und Reparatur an?`, a: `Ja, wir bieten auch Wartung und Reparatur bestehender Werbeanlagen an. Ob Folienwechsel, Leuchtmittel-Tausch oder Beschädigungsreparatur – wir kümmern uns darum.` },
    { q: `Erstellen Sie auch das Design?`, a: `Ja, unser Designteam entwickelt gemeinsam mit Ihnen das passende Konzept – von der Farbwahl bis zum Layout. Wenn Sie bereits Druckdaten haben, prüfen wir diese kostenfrei.` },
  ],
  (c: string) => [
    { q: `Was ist die beste Werbetechnik für mein Geschäft in ${c}?`, a: `Das hängt von Ihrer Branche, Ihrem Standort und Ihren Zielen ab. Für Ladenlokale empfehlen sich Schaufenster- und Fassadenbeschriftungen, für mobile Unternehmen Fahrzeugwerbung.` },
    { q: `Wie groß können Werbeanlagen sein?`, a: `Wir realisieren Projekte jeder Größe – von kleinen Aufklebern bis hin zu Großflächenbeschriftungen an Gebäudefassaden. Auch bei komplexen Montagesituationen finden wir die richtige Lösung.` },
    { q: `Welche Druckverfahren nutzen Sie?`, a: `Wir arbeiten mit modernem UV-Druck, Latex-Druck und Lösemitteldruck. Das Verfahren wählen wir je nach Anwendung, Material und gewünschter Haltbarkeit.` },
    { q: `Kann ich meine Werbung in ${c} nachträglich ändern?`, a: `Ja, Aktualisierungen sind jederzeit möglich. Bei Folierungen können einzelne Elemente ausgetauscht werden, ohne die gesamte Beschriftung erneuern zu müssen.` },
    { q: `Wie erreiche ich Sie für ein Projekt in ${c}?`, a: `Nutzen Sie einfach unser Kontaktformular auf dieser Seite oder rufen Sie uns an. Wir melden uns innerhalb eines Werktages bei Ihnen.` },
  ],
  (c: string) => [
    { q: `Kann ich Werbetechnik auch mieten statt kaufen?`, a: `Für temporäre Projekte wie Messen oder Events bieten wir auch Mietlösungen an – z. B. Bannersysteme, Roll-ups oder Messewände. Fragen Sie uns nach den Möglichkeiten.` },
    { q: `Wie nachhaltig ist moderne Werbetechnik?`, a: `Wir legen Wert auf umweltfreundliche Materialien und bieten auf Wunsch PVC-freie Folien, recycelbare Schilder und lösemittelfreie Druckverfahren an.` },
    { q: `Arbeiten Sie auch am Wochenende in ${c}?`, a: `Montagetermine am Wochenende sind nach Absprache möglich – besonders praktisch für Geschäfte und Büros, die den laufenden Betrieb nicht stören möchten.` },
    { q: `Was muss ich für die Erstberatung vorbereiten?`, a: `Am besten bringen Sie Ihr Logo als Vektordatei mit und haben eine grobe Vorstellung von Größe und Einsatzort. Alles Weitere klären wir gemeinsam.` },
    { q: `Gibt es Garantie auf Ihre Werbetechnik?`, a: `Ja, auf unsere Produkte und die Montage geben wir Garantie. Die genaue Dauer hängt vom Material und der Anwendung ab – in der Regel 3–5 Jahre.` },
  ],
  (c: string) => [
    { q: `Werbetechnik in ${c} – lohnt sich das für kleine Betriebe?`, a: `Absolut. Gerade kleine Betriebe profitieren von lokaler Sichtbarkeit. Ein gutes Firmenschild oder eine Fahrzeugbeschriftung sind langfristige Investitionen, die täglich Kunden bringen.` },
    { q: `Wie sieht der Ablauf eines typischen Projekts aus?`, a: `Erstberatung, Aufmaß, Entwurf, Freigabe, Produktion, Montage. Bei uns haben Sie immer einen festen Ansprechpartner, der Sie durch alle Schritte begleitet.` },
    { q: `Können Sie bestehende Schilder erneuern?`, a: `Ja, wir modernisieren vorhandene Werbeanlagen: neue Folierung, LED-Umrüstung oder ein komplett neues Design – wir machen Ihre Werbung wieder frisch.` },
    { q: `Welche Beleuchtungsoptionen gibt es?`, a: `Von klassischer Leuchtkastenbeleuchtung über LED-Einzelbuchstaben bis zu hinterleuchteten Acrylglasschildern – moderne LED-Technik ist langlebig, energieeffizient und sorgt für maximale Sichtbarkeit.` },
    { q: `Liefern Sie auch außerhalb von ${c}?`, a: `Ja, wir sind in ${c} und der gesamten Region aktiv. Auch Projekte in Nachbarstädten und überregional setzen wir gerne um.` },
  ],
];

/* ------------------------------------------------------------------ */
/*  CTA variants                                                       */
/* ------------------------------------------------------------------ */

const CTA_VARIANTS = [
  (c: string) => ({
    heading: `Jetzt Angebot für Werbetechnik in ${c} anfordern`,
    text: `Erzählen Sie uns von Ihrem Projekt. Wir erstellen Ihnen ein unverbindliches Angebot – schnell, transparent und persönlich.`,
  }),
  (c: string) => ({
    heading: `Ihr Werbetechnik-Projekt in ${c} starten`,
    text: `Füllen Sie das Formular aus und wir melden uns innerhalb eines Werktages bei Ihnen. Kostenlose Erstberatung inklusive.`,
  }),
  (c: string) => ({
    heading: `Kostenlose Beratung für ${c} anfragen`,
    text: `Wir freuen uns auf Ihr Projekt. Beschreiben Sie kurz Ihren Bedarf und wir kommen mit einem passenden Vorschlag auf Sie zu.`,
  }),
  (c: string) => ({
    heading: `Kontakt aufnehmen – Werbetechnik ${c}`,
    text: `Schreiben Sie uns und erhalten Sie zeitnah ein individuelles Angebot. Persönlich, unverbindlich und auf den Punkt.`,
  }),
  (c: string) => ({
    heading: `Starten Sie Ihr Projekt in ${c}`,
    text: `Ob Schilder, Beschriftung oder Leuchtreklame – teilen Sie uns Ihre Wünsche mit. Wir beraten Sie gerne persönlich vor Ort.`,
  }),
  (c: string) => ({
    heading: `Unverbindlich anfragen – Werbetechnik ${c}`,
    text: `Nutzen Sie unser Kontaktformular für eine schnelle Anfrage. Wir antworten in der Regel noch am selben Tag.`,
  }),
];

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

export interface CityContent {
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  serviceSection: { heading: string; text: string };
  trust: { heading: string; points: string[] };
  faq: { q: string; a: string }[];
  cta: { heading: string; text: string };
}

export function generateCityContent(
  cityName: string,
  slug: string,
  shortLocalHook?: string | null
): CityContent {
  return {
    h1: pick(H1_VARIANTS, slug, 0)(cityName),
    metaTitle: pick(TITLE_VARIANTS, slug, 1)(cityName),
    metaDescription: pick(DESC_VARIANTS, slug, 2)(cityName),
    intro: pick(INTRO_VARIANTS, slug, 3)(cityName, shortLocalHook),
    serviceSection: pick(SERVICE_SECTION_VARIANTS, slug, 4)(cityName),
    trust: pick(TRUST_VARIANTS, slug, 5)(cityName),
    faq: pick(FAQ_POOLS, slug, 6)(cityName),
    cta: pick(CTA_VARIANTS, slug, 7)(cityName),
  };
}

export function getNearbyCitySlugs(
  allSlugs: string[],
  currentSlug: string,
  count = 8
): string[] {
  const others = allSlugs.filter((s) => s !== currentSlug);
  const h = hashStr(currentSlug);
  const sorted = [...others].sort(
    (a, b) => (hashStr(a + currentSlug) % 9973) - (hashStr(b + currentSlug) % 9973)
  );
  return sorted.slice(0, Math.min(count, sorted.length));
}
