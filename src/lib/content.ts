/* ------------------------------------------------------------------ */
/*  Deterministic content-variation system for city landing pages      */
/*  Uses stable hash(slug) to pick unique variant combos per city      */
/*                                                                     */
/*  Variant counts:                                                    */
/*    H1: 12  |  Title: 10  |  Desc: 10  |  Intro: 12                */
/*    Services: 10  |  Process: 8  |  Trust: 10                       */
/*    FAQ: 10 pools × 6 Qs  |  CTA: 10                               */
/*  Combinatorial space: > 1 Milliarde unique combos                  */
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
/*  Services                                                           */
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
/*  H1 – 12 Varianten                                                 */
/* ------------------------------------------------------------------ */

const H1_VARIANTS = [
  (c: string) => `Werbetechnik in ${c} – Ihr kostenfreies Vergleichsangebot`,
  (c: string) => `Professionelle Werbetechnik in ${c}`,
  (c: string) => `Werbetechnik ${c} – Schilder, Beschriftung & mehr`,
  (c: string) => `Ihr Werbetechnik-Spezialist in ${c}`,
  (c: string) => `Werbetechnik & Beschriftung in ${c} – Qualität vor Ort`,
  (c: string) => `Werbetechnik ${c}: Schilder, Folierung & Leuchtreklame`,
  (c: string) => `Beschriftung & Werbetechnik in ${c} – regional & zuverlässig`,
  (c: string) => `${c}: Werbetechnik vom Profi – Beratung bis Montage`,
  (c: string) => `Werbetechnik in ${c} – Vergleichsangebot sichern`,
  (c: string) => `Außenwerbung & Beschriftung in ${c} – jetzt vergleichen`,
  (c: string) => `Werbetechnik ${c}: Individuelle Lösungen für Ihr Unternehmen`,
  (c: string) => `Maßgeschneiderte Werbetechnik in ${c} – persönlich & fair`,
];

/* ------------------------------------------------------------------ */
/*  Meta title – 10 Varianten                                          */
/* ------------------------------------------------------------------ */

const TITLE_VARIANTS = [
  (c: string) => `Werbetechnik ${c} ▷ Kostenfreies Vergleichsangebot | Printvertise`,
  (c: string) => `Werbetechnik in ${c} – Schilder, Leuchtreklame & mehr | Printvertise`,
  (c: string) => `${c} Werbetechnik ✓ Vergleichsangebot in 24h | Printvertise`,
  (c: string) => `Werbetechnik ${c}: Beschriftung, Schilder & Folierung | Printvertise`,
  (c: string) => `Professionelle Werbetechnik in ${c} | Printvertise`,
  (c: string) => `Werbetechnik ${c} – Angebot kostenlos vergleichen | Printvertise`,
  (c: string) => `Beschriftung & Werbetechnik ${c} ▷ Jetzt Angebot sichern | Printvertise`,
  (c: string) => `Werbetechnik in ${c}: Schilder, Banner & Folierung | Printvertise`,
  (c: string) => `${c}: Werbetechnik-Angebot kostenlos & unverbindlich | Printvertise`,
  (c: string) => `Werbetechnik ${c} – Faire Preise, Top-Qualität | Printvertise`,
];

/* ------------------------------------------------------------------ */
/*  Meta description – 10 Varianten                                    */
/* ------------------------------------------------------------------ */

const DESC_VARIANTS = [
  (c: string) =>
    `Werbetechnik in ${c}: Beschriftung, Schilder, Folierung und Leuchtreklame. Erhalten Sie jetzt Ihr kostenfreies Vergleichsangebot von Printvertise. ✓ Unverbindlich ✓ In 24h`,
  (c: string) =>
    `Ihr Werbetechnik-Partner in ${c}. Schilder, Beschriftungen, Banner und Folierungen – regional und zuverlässig. Kostenfreies Vergleichsangebot anfordern!`,
  (c: string) =>
    `Werbetechnik ${c}: Fahrzeugbeschriftung, Leuchtreklame und Schilder aus einer Hand. ✓ Transparente Preise ✓ Kostenfreies Vergleichsangebot. Jetzt anfragen!`,
  (c: string) =>
    `Beschriftung, Schilder und Werbebanner in ${c}. Printvertise erstellt Ihnen ein kostenfreies Vergleichsangebot – persönlich, transparent und schnell.`,
  (c: string) =>
    `Werbetechnik in ${c} gesucht? Schilder, Folierung, Leuchtreklame und mehr. Sichern Sie sich jetzt Ihr unverbindliches Vergleichsangebot von Printvertise.`,
  (c: string) =>
    `Vom Firmenschild bis zur Vollfolierung – professionelle Werbetechnik in ${c}. Kostenfreies Vergleichsangebot mit transparenter Preisaufstellung erhalten.`,
  (c: string) =>
    `Professionelle Außenwerbung in ${c}: Schilder, Beschriftungen und Leuchtreklame. ✓ Kostenfreies Vergleichsangebot ✓ Keine versteckten Kosten. Printvertise.`,
  (c: string) =>
    `Werbetechnik ${c} – von Fahrzeugbeschriftung bis Messebau. Erhalten Sie Ihr individuelles Vergleichsangebot. Kostenlos, unverbindlich und in 24 Stunden.`,
  (c: string) =>
    `Ihr Vergleichsangebot für Werbetechnik in ${c}: Schilder, Folierung, Banner und Leuchtreklame. Printvertise – faire Preise, persönliche Beratung vor Ort.`,
  (c: string) =>
    `Schilder, Beschriftungen und Werbeanlagen in ${c}. Printvertise liefert Qualität zu fairen Konditionen. Jetzt kostenfreies Vergleichsangebot sichern!`,
];

/* ------------------------------------------------------------------ */
/*  Intro – 12 Varianten                                               */
/* ------------------------------------------------------------------ */

const INTRO_VARIANTS = [
  (c: string, hook?: string | null) =>
    `Sie suchen einen zuverlässigen Partner für Werbetechnik in ${c}? Printvertise steht für hochwertige Beschriftungen, Schilder und Werbelösungen direkt vor Ort. ${hook ? hook + " " : ""}Ob Fahrzeugbeschriftung, Schaufenstergestaltung oder Leuchtreklame – wir setzen Ihre Marke professionell in Szene. Fordern Sie jetzt Ihr kostenfreies Vergleichsangebot an und überzeugen Sie sich von unseren fairen Konditionen.`,
  (c: string, hook?: string | null) =>
    `Werbetechnik ist mehr als nur ein Schild an der Wand. In ${c} realisieren wir individuelle Werbelösungen, die Ihre Zielgruppe erreichen und begeistern. ${hook ? hook + " " : ""}Von der ersten Skizze bis zur fachgerechten Montage betreuen wir jedes Projekt persönlich – und mit unserem kostenfreien Vergleichsangebot sehen Sie vorab transparent, was Ihr Projekt kostet.`,
  (c: string, hook?: string | null) =>
    `Sichtbarkeit entscheidet über Ihren Geschäftserfolg. Als Werbetechnik-Experten in ${c} helfen wir Ihnen, mit professionellen Beschriftungen, Schildern und Werbeanlagen aufzufallen. ${hook ? hook + " " : ""}Wir verbinden Kreativität mit handwerklicher Präzision – und bieten Ihnen ein kostenfreies Vergleichsangebot, damit Sie Preise und Leistungen transparent einschätzen können.`,
  (c: string, hook?: string | null) =>
    `In ${c} setzen wir auf Werbetechnik, die wirkt. ${hook ? hook + " " : ""}Unsere Leistungen reichen von Fahrzeugfolierung über Firmenschilder bis hin zu großflächigen Bannern. Jedes Projekt wird individuell geplant und termingerecht umgesetzt. Ihr Vorteil: Sie erhalten vorab ein kostenfreies Vergleichsangebot mit transparenter Kostenaufstellung.`,
  (c: string, hook?: string | null) =>
    `Professionelle Werbetechnik aus ${c} – das ist Printvertise. ${hook ? hook + " " : ""}Wir gestalten, produzieren und montieren Schilder, Beschriftungen, Banner und Leuchtreklame. Alles aus einer Hand, mit persönlicher Beratung und einem kostenfreien Vergleichsangebot, das Ihnen volle Preistransparenz gibt.`,
  (c: string, hook?: string | null) =>
    `Ihre Marke verdient den besten Auftritt. In ${c} bieten wir Ihnen das komplette Spektrum der Werbetechnik: von der Beratung über das Design bis zur fachgerechten Montage. ${hook ? hook + " " : ""}Lassen Sie uns gemeinsam Ihre Sichtbarkeit steigern – starten Sie mit Ihrem kostenfreien Vergleichsangebot.`,
  (c: string, hook?: string | null) =>
    `Ob Start-up, Handwerksbetrieb oder etabliertes Unternehmen – mit unserer Werbetechnik in ${c} werden Sie gesehen. ${hook ? hook + " " : ""}Wir bieten maßgeschneiderte Lösungen für jeden Bedarf und jedes Budget. Überzeugen Sie sich selbst: Unser kostenfreies Vergleichsangebot zeigt Ihnen auf einen Blick, was möglich ist.`,
  (c: string, hook?: string | null) =>
    `Werbetechnik in ${c}? Printvertise ist Ihr Ansprechpartner für Schilder, Beschriftungen, Fahrzeugfolierung und Leuchtreklame. ${hook ? hook + " " : ""}Wir stehen für Qualität, Termintreue und faire Preise – und machen den Einstieg leicht: mit einem kostenfreien, unverbindlichen Vergleichsangebot.`,
  (c: string, hook?: string | null) =>
    `Gute Werbetechnik macht den Unterschied zwischen „übersehen" und „wahrgenommen". In ${c} sind wir Ihr Partner für wirkungsvolle Außenwerbung, Beschriftungen und Schilder. ${hook ? hook + " " : ""}Starten Sie jetzt und sichern Sie sich Ihr kostenfreies Vergleichsangebot – transparent, fair und individuell auf Ihr Projekt zugeschnitten.`,
  (c: string, hook?: string | null) =>
    `Wer in ${c} auffallen will, braucht professionelle Werbetechnik. Von der Schaufensterbeschriftung über Leuchtreklame bis zur Fahrzeugfolierung – wir realisieren Ihr Projekt termingerecht und in höchster Qualität. ${hook ? hook + " " : ""}Fordern Sie Ihr kostenfreies Vergleichsangebot an und vergleichen Sie selbst.`,
  (c: string, hook?: string | null) =>
    `Beschriftungen, Schilder und Werbeanlagen für Unternehmen in ${c} – dafür steht Printvertise. ${hook ? hook + " " : ""}Unser Anspruch: höchste Qualität zu transparenten Preisen. Deshalb erhalten Sie von uns immer zuerst ein kostenfreies Vergleichsangebot, bevor Sie sich entscheiden.`,
  (c: string, hook?: string | null) =>
    `Sie planen ein Werbetechnik-Projekt in ${c}? Ob Einzelbuchstaben an der Fassade, eine Fahrzeugflotten-Beschriftung oder ein modernes Leuchtschild – wir haben die Lösung. ${hook ? hook + " " : ""}Und das Beste: Ihr Vergleichsangebot ist kostenfrei und unverbindlich. So behalten Sie die volle Kontrolle über Ihr Budget.`,
];

/* ------------------------------------------------------------------ */
/*  Service section – 10 Varianten                                     */
/* ------------------------------------------------------------------ */

const SERVICE_SECTION_VARIANTS = [
  (c: string) => ({
    heading: `Unsere Leistungen in ${c}`,
    text: `Als Full-Service-Anbieter für Werbetechnik decken wir in ${c} ein breites Leistungsspektrum ab. Ob klassisches Firmenschild, auffällige Fahrzeugbeschriftung oder moderne Leuchtreklame – wir beraten Sie ehrlich und erstellen Ihnen ein kostenfreies Vergleichsangebot für Ihre gewünschte Leistung.`,
  }),
  (c: string) => ({
    heading: `Werbetechnik-Leistungen für ${c}`,
    text: `Von der Idee bis zum fertigen Produkt: In ${c} bieten wir Ihnen alle Leistungen rund um Werbetechnik. Unsere Experten wählen gemeinsam mit Ihnen das passende Material, erstellen professionelle Entwürfe und übernehmen die Montage – alles zu transparenten Konditionen.`,
  }),
  (c: string) => ({
    heading: `Das bieten wir Ihnen in ${c}`,
    text: `Wir sind Ihr Werbetechnik-Partner in ${c} und Umgebung. Unser Portfolio umfasst Fahrzeugbeschriftungen, Schaufenstergestaltung, Schilder, Banner, Leuchtreklame und Messeausstattung – individuell auf Ihre Marke zugeschnitten und immer mit transparenter Preisaufstellung.`,
  }),
  (c: string) => ({
    heading: `Werbetechnik-Lösungen in ${c}`,
    text: `Jedes Unternehmen in ${c} ist einzigartig – und genau so sollte auch seine Werbung sein. Wir entwickeln maßgeschneiderte Werbetechnik-Lösungen, die Ihre Marke stärken und Kunden anziehen. Welche Leistung passt zu Ihrem Vorhaben? Unser Vergleichsangebot gibt Ihnen Klarheit.`,
  }),
  (c: string) => ({
    heading: `Ihre Werbetechnik in ${c} – unser Handwerk`,
    text: `Mit Erfahrung und Leidenschaft realisieren wir in ${c} Projekte jeder Größe. Vom kleinen Praxisschild bis zur großflächigen Gebäudebeschriftung – Qualität und Kundenzufriedenheit stehen bei uns an erster Stelle. Lassen Sie sich von unserem Leistungsangebot überzeugen.`,
  }),
  (c: string) => ({
    heading: `Professionelle Werbetechnik in ${c}`,
    text: `In ${c} und der Region stehen wir für hochwertige Werbetechnik mit Persönlichkeit. Wir nehmen uns Zeit für Ihre Anforderungen und liefern Ergebnisse, die überzeugen – termingerecht und zu fairen Konditionen, die Sie vorab in Ihrem Vergleichsangebot einsehen können.`,
  }),
  (c: string) => ({
    heading: `Werbetechnik für Unternehmen in ${c}`,
    text: `Von Einzelhändlern bis zu mittelständischen Betrieben – in ${c} vertrauen Unternehmen auf unsere Werbetechnik-Kompetenz. Beschriftungen, Schilder und Werbeanlagen fertigen wir in eigener Produktion und montieren sie fachgerecht vor Ort.`,
  }),
  (c: string) => ({
    heading: `Unser Leistungsspektrum für ${c}`,
    text: `Wir bieten Ihnen in ${c} das volle Programm moderner Werbetechnik: von der Konzeption über die Fertigung bis zur Montage. Jede Leistung können Sie individuell kombinieren – und in Ihrem kostenfreien Vergleichsangebot sehen Sie genau, was welche Lösung kostet.`,
  }),
  (c: string) => ({
    heading: `Werbetechnik in ${c}: Vielfalt, die begeistert`,
    text: `Ob dezent oder auffällig, klassisch oder modern – in ${c} setzen wir Ihre Vorstellungen in hochwertige Werbetechnik um. Unser Team berät Sie zu Materialien, Gestaltung und Kosten und erstellt Ihnen eine detaillierte, vergleichbare Angebotsübersicht.`,
  }),
  (c: string) => ({
    heading: `Alle Werbetechnik-Leistungen für ${c}`,
    text: `Unter einem Dach finden Sie in ${c} alles, was moderne Werbetechnik zu bieten hat. Wir sind kein anonymer Großbetrieb, sondern Ihr persönlicher Partner vor Ort – mit kurzen Wegen, schneller Umsetzung und einem transparenten Angebot ohne versteckte Kosten.`,
  }),
];

/* ------------------------------------------------------------------ */
/*  Process / Ablauf – 8 Varianten (NEU)                               */
/* ------------------------------------------------------------------ */

const PROCESS_VARIANTS = [
  (c: string) => ({
    heading: `So erhalten Sie Ihr Vergleichsangebot in ${c}`,
    steps: [
      { title: "Projekt beschreiben", text: "Teilen Sie uns über das Formular mit, welche Werbetechnik-Leistung Sie benötigen und beschreiben Sie kurz Ihr Vorhaben." },
      { title: "Vergleichsangebot erhalten", text: "Innerhalb von 24 Stunden erstellen wir Ihnen ein detailliertes Vergleichsangebot mit transparenter Kostenaufstellung." },
      { title: "Entspannt entscheiden", text: "Vergleichen Sie in Ruhe Preise und Leistungen. Erst wenn Sie überzeugt sind, starten wir gemeinsam Ihr Projekt." },
    ],
  }),
  (c: string) => ({
    heading: `In 3 Schritten zu Ihrem Angebot – ${c}`,
    steps: [
      { title: "Anfrage stellen", text: "Wählen Sie Ihre gewünschte Leistung und beschreiben Sie Ihr Projekt. Das dauert nur 2 Minuten." },
      { title: "Angebot prüfen", text: "Wir kalkulieren Ihr Projekt und senden Ihnen ein kostenfreies Vergleichsangebot – klar aufgeschlüsselt und verständlich." },
      { title: "Projekt starten", text: "Sie entscheiden, ob und wann es losgeht. Keine Verpflichtung, kein Druck, keine versteckten Kosten." },
    ],
  }),
  (c: string) => ({
    heading: `Ihr Weg zum Vergleichsangebot in ${c}`,
    steps: [
      { title: "Bedarf mitteilen", text: "Sagen Sie uns, was Sie brauchen: Schilder, Beschriftung, Folierung oder Leuchtreklame? Jedes Detail hilft uns, genauer zu kalkulieren." },
      { title: "Transparentes Angebot", text: "Sie erhalten ein detailliertes Vergleichsangebot, das Material, Produktion und Montage einzeln aufschlüsselt." },
      { title: "Auftrag erteilen – oder nicht", text: `Unser Angebot ist 100 % unverbindlich. Erst wenn Sie zufrieden sind, geht Ihr Werbetechnik-Projekt in ${c} in die Umsetzung.` },
    ],
  }),
  (c: string) => ({
    heading: `So einfach geht's – Werbetechnik in ${c}`,
    steps: [
      { title: "Formular ausfüllen", text: "Beschreiben Sie in wenigen Sätzen, welche Werbetechnik-Lösung Sie für Ihr Unternehmen benötigen." },
      { title: "Persönliche Beratung", text: `Unser Team in ${c} meldet sich bei Ihnen, bespricht Details und erstellt Ihr individuelles Vergleichsangebot.` },
      { title: "Faire Entscheidung", text: "Sie vergleichen Preise und Leistungen in Ruhe. Ohne Zeitdruck, ohne Kleingedrucktes." },
    ],
  }),
  (c: string) => ({
    heading: `Kostenfreies Vergleichsangebot für ${c}`,
    steps: [
      { title: "Projekt skizzieren", text: "Ob grobe Idee oder konkreter Plan – teilen Sie uns mit, was Sie sich vorstellen. Wir kümmern uns um den Rest." },
      { title: "Aufschlüsselung erhalten", text: "Unser Angebot zeigt Ihnen klar: Was kostet Material? Was kostet die Montage? Was kostet das Design? Alles transparent." },
      { title: "Loslegen", text: `Bei Zusage starten wir zeitnah mit der Umsetzung. Fachgerechte Montage in ${c} inklusive.` },
    ],
  }),
  (c: string) => ({
    heading: `Ihr Vergleichsangebot in ${c} – schnell & unkompliziert`,
    steps: [
      { title: "Wunschleistung wählen", text: "Fahrzeugbeschriftung, Schilder, Leuchtreklame oder etwas anderes? Wählen Sie Ihre Leistung im Formular." },
      { title: "Angebot in 24h", text: "Unser Projektteam kalkuliert Ihr Vorhaben und sendet Ihnen ein faires, detailliertes Vergleichsangebot." },
      { title: "Vergleichen & beauftragen", text: "Prüfen Sie unser Angebot in Ruhe. Kein Risiko – Sie gehen erst eine Verpflichtung ein, wenn Sie unterschreiben." },
    ],
  }),
  (c: string) => ({
    heading: `Von der Anfrage zum Angebot – ${c}`,
    steps: [
      { title: "Kontakt aufnehmen", text: `Nutzen Sie unser Formular oder rufen Sie uns an. Schildern Sie uns Ihren Bedarf an Werbetechnik in ${c}.` },
      { title: "Maßgeschneidertes Angebot", text: "Wir erstellen ein auf Ihr Projekt zugeschnittenes Vergleichsangebot – kostenfrei und ohne versteckte Posten." },
      { title: "Umsetzung nach Plan", text: "Nach Ihrer Freigabe setzen wir Ihr Projekt termingerecht und in der vereinbarten Qualität um." },
    ],
  }),
  (c: string) => ({
    heading: `Werbetechnik ${c}: So starten Sie`,
    steps: [
      { title: "Anfrage senden", text: "2 Minuten genügen: Leistung wählen, Projekt beschreiben, Kontaktdaten hinterlassen. Fertig." },
      { title: "Vergleichsangebot studieren", text: "Innerhalb eines Werktages erhalten Sie Ihr kostenfreies Vergleichsangebot – mit allen Positionen auf einen Blick." },
      { title: "Grünes Licht geben", text: `Wenn alles passt, geht es los. Produktion, Lieferung und Montage in ${c} – alles aus einer Hand.` },
    ],
  }),
];

/* ------------------------------------------------------------------ */
/*  Trust / Why-us – 10 Varianten                                     */
/* ------------------------------------------------------------------ */

const TRUST_VARIANTS = [
  (c: string) => ({
    heading: `Warum Printvertise in ${c}?`,
    points: [
      "Kostenfreies Vergleichsangebot mit transparenter Preisaufstellung",
      "Persönliche Beratung und Betreuung vor Ort",
      "Hochwertige Materialien namhafter Hersteller",
      "Eigene Produktion – keine langen Wartezeiten",
      "Fachgerechte Montage durch unser erfahrenes Team",
    ],
  }),
  (c: string) => ({
    heading: `Ihre Vorteile mit Printvertise in ${c}`,
    points: [
      "Unverbindliches Vergleichsangebot in 24 Stunden",
      "Alles aus einer Hand – Beratung, Produktion und Montage",
      "Langjährige Erfahrung in der Werbetechnik",
      "Individuelle Lösungen für jede Branche und jedes Budget",
      "Regionale Präsenz und kurze Wege",
    ],
  }),
  (c: string) => ({
    heading: `Das zeichnet uns aus – Werbetechnik in ${c}`,
    points: [
      "Faire Preise ohne versteckte Kosten",
      "Kreative Gestaltung und technische Präzision",
      "Moderne Produktionsverfahren und Top-Materialien",
      "Persönlicher Ansprechpartner für Ihr Projekt",
      "Kostenfreies Vergleichsangebot vor Projektstart",
    ],
  }),
  (c: string) => ({
    heading: `Werbetechnik-Kompetenz in ${c}`,
    points: [
      "Breites Portfolio von Schildern bis Leuchtreklame",
      "Transparente Kalkulation in Ihrem Vergleichsangebot",
      "Maßgeschneiderte Konzepte für Ihren Standort",
      "Termintreue und zuverlässige Umsetzung",
      `Zufriedene Kunden in ${c} und Umgebung`,
    ],
  }),
  (c: string) => ({
    heading: `Darum Printvertise für ${c}`,
    points: [
      "Wir kennen den lokalen Markt und Ihre Zielgruppe",
      "Von der Kleinbeschriftung bis zum Großprojekt",
      "Eigener Fuhrpark für flexible Montage",
      "Detailliertes Vergleichsangebot statt Pauschalpreis",
      "Langjährige Partnerschaften mit zufriedenen Kunden",
    ],
  }),
  (c: string) => ({
    heading: `Warum Unternehmen in ${c} auf uns setzen`,
    points: [
      "Höchste Qualitätsstandards bei Material und Verarbeitung",
      "Innovative Technologien für brillante Ergebnisse",
      "Schnelle Projektabwicklung ohne Qualitätsverlust",
      "Keine Überraschungen – transparentes Vergleichsangebot",
      "Regionaler Partner mit überregionaler Kompetenz",
    ],
  }),
  (c: string) => ({
    heading: `Printvertise in ${c} – Ihr Vorteil`,
    points: [
      "100 % kostenfreies und unverbindliches Vergleichsangebot",
      "Entwurf und Visualisierung vor Produktionsstart",
      "Nachhaltige Materialien auf Wunsch verfügbar",
      "Flexible Terminplanung, auch am Wochenende",
      "Garantie auf Material und Montage",
    ],
  }),
  (c: string) => ({
    heading: `Was uns in ${c} besonders macht`,
    points: [
      "Individuelle Beratung statt Massenabfertigung",
      "Kurze Reaktionszeiten – Angebot in 24 Stunden",
      "Festpreisangebote ohne Nachforderungen",
      "Hochmoderne Druck- und Schneidetechnik",
      `Persönliche Projektbetreuung in ${c} und Region`,
    ],
  }),
  (c: string) => ({
    heading: `Ihre Werbetechnik in ${c} – fair & transparent`,
    points: [
      "Kostenfreies Vergleichsangebot als Entscheidungsgrundlage",
      "Ehrliche Beratung – wir empfehlen nur, was Sinn macht",
      "Eigene Werkstatt für schnelle Produktion",
      "Montage durch geschultes Fachpersonal",
      "Langlebige Ergebnisse dank Premium-Materialien",
    ],
  }),
  (c: string) => ({
    heading: `Vertrauen Sie Printvertise in ${c}`,
    points: [
      "Transparente Preisgestaltung im Vergleichsangebot",
      "Mehr als 500 erfolgreich umgesetzte Projekte",
      "Partnerschaft mit führenden Materialherstellern",
      "Umweltfreundliche Druckverfahren verfügbar",
      "Zufriedenheitsgarantie auf alle Leistungen",
    ],
  }),
];

/* ------------------------------------------------------------------ */
/*  FAQ – 10 Pools × 6 Fragen                                         */
/* ------------------------------------------------------------------ */

const FAQ_POOLS = [
  (c: string) => [
    { q: `Ist das Vergleichsangebot für Werbetechnik in ${c} wirklich kostenlos?`, a: `Ja, absolut. Unser Vergleichsangebot ist 100 % kostenfrei und unverbindlich. Sie gehen keinerlei Verpflichtung ein. Erst wenn Sie sich für eine Umsetzung entscheiden, entstehen Kosten – und diese kennen Sie vorher genau.` },
    { q: `Wie schnell erhalte ich mein Vergleichsangebot?`, a: `In der Regel erhalten Sie Ihr detailliertes Vergleichsangebot innerhalb von 24 Stunden nach Ihrer Anfrage. Bei komplexeren Projekten kann es bis zu 48 Stunden dauern.` },
    { q: `Was kostet Werbetechnik in ${c}?`, a: `Die Kosten hängen von Art, Größe und Material ab. Einfache Beschriftungen beginnen ab wenigen hundert Euro, Leuchtreklame oder Fahrzeugvollverklebungen kosten entsprechend mehr. Unser kostenfreies Vergleichsangebot schlüsselt alle Positionen transparent auf.` },
    { q: `Bieten Sie auch Montage in ${c} an?`, a: `Ja, wir übernehmen die komplette Montage vor Ort in ${c} und Umgebung. Unser Team arbeitet sauber, termingerecht und nach allen Sicherheitsvorschriften. Die Montagekosten sind im Vergleichsangebot separat ausgewiesen.` },
    { q: `Welche Materialien verwenden Sie?`, a: `Wir setzen auf hochwertige Folien, Acrylglas, Aluminium und Dibond von namhaften Herstellern wie 3M und Orafol. So garantieren wir Langlebigkeit und brillante Farben. Im Vergleichsangebot sehen Sie genau, welches Material wir empfehlen.` },
    { q: `Kann ich vorher einen Entwurf sehen?`, a: `Selbstverständlich. Nach Auftragserteilung erhalten Sie eine Vorschau Ihres Projekts. Änderungswünsche setzen wir unkompliziert um, bevor wir in die Produktion gehen.` },
  ],
  (c: string) => [
    { q: `Welche Werbetechnik-Leistungen bieten Sie in ${c} an?`, a: `Unser Portfolio umfasst Fahrzeugbeschriftung, Schaufenstergestaltung, Firmenschilder, Leuchtreklame, Banner, Messestände und individuelle Werbelösungen. Alle Leistungen können Sie einzeln oder kombiniert in Ihrem Vergleichsangebot anfordern.` },
    { q: `Warum sollte ich ein Vergleichsangebot anfordern?`, a: `Unser Vergleichsangebot gibt Ihnen volle Transparenz: Sie sehen auf einen Blick, was Material, Produktion und Montage kosten. So können Sie fundiert entscheiden und mit anderen Anbietern vergleichen – ohne Verpflichtung.` },
    { q: `Arbeiten Sie auch mit kleinen Unternehmen in ${c}?`, a: `Ja! Ob Einzelunternehmer, Start-up oder großer Konzern – wir bieten für jede Unternehmensgröße passende Werbetechnik-Lösungen in ${c}. Auch für kleine Budgets finden wir die richtige Lösung.` },
    { q: `Ist eine Vor-Ort-Beratung in ${c} möglich?`, a: `Ja, wir kommen gerne zu Ihnen nach ${c} und beraten Sie direkt vor Ort. So können wir die Gegebenheiten optimal einschätzen und die beste Lösung für Ihr Vergleichsangebot empfehlen.` },
    { q: `Wie wetterfest sind Ihre Produkte?`, a: `Unsere Materialien sind UV-beständig, wetterfest und langlebig. Außenbeschriftungen halten bei sachgemäßer Pflege in der Regel 5–7 Jahre und länger. Details zu den Materialien finden Sie in Ihrem Vergleichsangebot.` },
    { q: `Wie pflege ich meine Werbetechnik richtig?`, a: `Folierungen und Schilder sind pflegeleicht. In der Regel reicht eine Reinigung mit mildem Seifenwasser. Nach der Montage geben wir Ihnen detaillierte Pflegehinweise für maximale Lebensdauer.` },
  ],
  (c: string) => [
    { q: `Wie beantrage ich eine Genehmigung für Werbung in ${c}?`, a: `Für bestimmte Werbeanlagen wie Leuchtreklame oder größere Schilder kann eine Baugenehmigung nötig sein. Wir unterstützen Sie bei der Antragstellung und kennen die lokalen Vorschriften in ${c}.` },
    { q: `Was beinhaltet das kostenfreie Vergleichsangebot genau?`, a: `Unser Vergleichsangebot enthält eine detaillierte Aufschlüsselung aller Kosten: Materialien, Produktion, Design (falls gewünscht) und Montage. So können Sie jeden Posten nachvollziehen und vergleichen.` },
    { q: `Kann man Fahrzeugbeschriftungen wieder entfernen?`, a: `Ja, professionelle Fahrzeugfolierungen lassen sich rückstandsfrei entfernen. Wichtig ist die Verwendung hochwertiger Folien – und genau darauf setzen wir. Perfekt für Leasingfahrzeuge.` },
    { q: `Was ist der Unterschied zwischen Folierung und Lackierung?`, a: `Eine Folierung ist günstiger, schneller und reversibel – ideal für Werbung und Farbwechsel. Die Lackierung darunter bleibt geschützt. In Ihrem Vergleichsangebot sehen Sie die genauen Kosten für eine Folierung.` },
    { q: `Bieten Sie Wartung und Reparatur an?`, a: `Ja, wir bieten auch Wartung und Reparatur bestehender Werbeanlagen an. Ob Folienwechsel, Leuchtmittel-Tausch oder Beschädigungsreparatur – wir kümmern uns darum.` },
    { q: `Erstellen Sie auch das Design?`, a: `Ja, unser Designteam entwickelt gemeinsam mit Ihnen das passende Konzept. Wenn Sie bereits Druckdaten haben, prüfen wir diese kostenfrei. Designkosten werden im Vergleichsangebot transparent ausgewiesen.` },
  ],
  (c: string) => [
    { q: `Was ist die beste Werbetechnik für mein Geschäft in ${c}?`, a: `Das hängt von Ihrer Branche, Ihrem Standort und Ihren Zielen ab. Für Ladenlokale empfehlen sich Schaufenster- und Fassadenbeschriftungen, für mobile Unternehmen Fahrzeugwerbung. Unser Vergleichsangebot berücksichtigt Ihre individuelle Situation.` },
    { q: `Bin ich nach der Anfrage zu etwas verpflichtet?`, a: `Nein, in keiner Weise. Das Vergleichsangebot ist kostenfrei und unverbindlich. Sie entscheiden in Ruhe, ob und wann Sie das Projekt umsetzen möchten.` },
    { q: `Wie groß können Werbeanlagen sein?`, a: `Wir realisieren Projekte jeder Größe – von kleinen Aufklebern bis zu Großflächenbeschriftungen an Gebäudefassaden. Auch bei komplexen Montagesituationen finden wir die richtige Lösung.` },
    { q: `Welche Druckverfahren nutzen Sie?`, a: `Wir arbeiten mit modernem UV-Druck, Latex-Druck und Lösemitteldruck. Das Verfahren wählen wir je nach Anwendung, Material und gewünschter Haltbarkeit – und dokumentieren es in Ihrem Vergleichsangebot.` },
    { q: `Kann ich meine Werbung in ${c} nachträglich ändern?`, a: `Ja, Aktualisierungen sind jederzeit möglich. Bei Folierungen können einzelne Elemente ausgetauscht werden, ohne die gesamte Beschriftung erneuern zu müssen.` },
    { q: `Wie erreiche ich Sie für ein Projekt in ${c}?`, a: `Nutzen Sie einfach unser Kontaktformular auf dieser Seite. Wir melden uns innerhalb eines Werktages mit Ihrem kostenfreien Vergleichsangebot bei Ihnen.` },
  ],
  (c: string) => [
    { q: `Kann ich Werbetechnik auch mieten statt kaufen?`, a: `Für temporäre Projekte wie Messen oder Events bieten wir auch Mietlösungen an – z. B. Bannersysteme, Roll-ups oder Messewände. Fragen Sie uns nach den Möglichkeiten in Ihrem Vergleichsangebot.` },
    { q: `Was unterscheidet Printvertise von anderen Anbietern in ${c}?`, a: `Unser kostenfreies Vergleichsangebot mit detaillierter Kostenaufstellung, persönliche Beratung vor Ort und eigene Produktion ohne Zwischenhändler. Das bedeutet faire Preise und kurze Lieferzeiten für Sie.` },
    { q: `Wie nachhaltig ist moderne Werbetechnik?`, a: `Wir legen Wert auf umweltfreundliche Materialien und bieten auf Wunsch PVC-freie Folien, recycelbare Schilder und lösemittelfreie Druckverfahren an.` },
    { q: `Arbeiten Sie auch am Wochenende in ${c}?`, a: `Montagetermine am Wochenende sind nach Absprache möglich – besonders praktisch für Geschäfte und Büros, die den laufenden Betrieb nicht stören möchten.` },
    { q: `Was muss ich für die Erstberatung vorbereiten?`, a: `Am besten bringen Sie Ihr Logo als Vektordatei mit und haben eine grobe Vorstellung von Größe und Einsatzort. Alles Weitere klären wir gemeinsam – und fließt in Ihr Vergleichsangebot ein.` },
    { q: `Gibt es Garantie auf Ihre Werbetechnik?`, a: `Ja, auf unsere Produkte und die Montage geben wir Garantie. Die genaue Dauer hängt vom Material ab – in der Regel 3–5 Jahre. Details dazu finden Sie im Vergleichsangebot.` },
  ],
  (c: string) => [
    { q: `Lohnt sich Werbetechnik für kleine Betriebe in ${c}?`, a: `Absolut. Gerade kleine Betriebe profitieren von lokaler Sichtbarkeit. Ein gutes Firmenschild oder eine Fahrzeugbeschriftung sind langfristige Investitionen, die täglich neue Kunden bringen. Mit unserem Vergleichsangebot sehen Sie, dass professionelle Werbetechnik auch mit kleinem Budget möglich ist.` },
    { q: `Wie sieht der Ablauf eines typischen Projekts aus?`, a: `Erstberatung, Aufmaß, Entwurf, Freigabe, Produktion, Montage. Bei uns haben Sie immer einen festen Ansprechpartner, der Sie durch alle Schritte begleitet. Der erste Schritt ist Ihr kostenfreies Vergleichsangebot.` },
    { q: `Können Sie bestehende Schilder erneuern?`, a: `Ja, wir modernisieren vorhandene Werbeanlagen: neue Folierung, LED-Umrüstung oder ein komplett neues Design. Wir machen Ihre Werbung wieder frisch – zu fairen Konditionen.` },
    { q: `Welche Beleuchtungsoptionen gibt es?`, a: `Von klassischer Leuchtkastenbeleuchtung über LED-Einzelbuchstaben bis zu hinterleuchteten Acrylglasschildern – moderne LED-Technik ist langlebig, energieeffizient und sorgt für maximale Sichtbarkeit.` },
    { q: `Liefern Sie auch außerhalb von ${c}?`, a: `Ja, wir sind in ${c} und der gesamten Region aktiv. Auch Projekte in Nachbarstädten und überregional setzen wir gerne um.` },
    { q: `Wie transparent ist die Preisgestaltung?`, a: `Vollständig transparent. Unser Vergleichsangebot listet jeden Posten einzeln auf: Material, Druck, Konfektionierung, Montage und ggf. Designleistungen. Keine versteckten Kosten, keine Nachforderungen.` },
  ],
  (c: string) => [
    { q: `Was kostet eine Fahrzeugbeschriftung in ${c}?`, a: `Die Kosten für eine Fahrzeugbeschriftung hängen von der Fahrzeuggröße und dem Umfang ab. Einfache Schriftzüge starten ab ca. 300 €, eine Teilfolierung ab ca. 800 € und eine Vollverklebung ab ca. 2.500 €. Genaue Preise erhalten Sie in Ihrem kostenfreien Vergleichsangebot.` },
    { q: `Was kostet ein Firmenschild in ${c}?`, a: `Firmenschilder beginnen je nach Material und Größe ab ca. 200 €. Beleuchtete Schilder oder 3D-Buchstaben liegen höher. In Ihrem Vergleichsangebot sehen Sie die genauen Kosten für Ihre Wunschlösung.` },
    { q: `Wie lange hält eine Fahrzeugfolierung?`, a: `Bei Verwendung hochwertiger Markenfolien und fachgerechter Verklebung hält eine Fahrzeugfolierung 5–7 Jahre. Sie ist UV-beständig, waschstraßenfest und lässt sich rückstandsfrei entfernen.` },
    { q: `Brauche ich eine Genehmigung für mein Firmenschild?`, a: `Das kommt auf die Größe und Art der Werbeanlage an. Kleinere Schilder sind oft genehmigungsfrei, größere Leuchtreklamen benötigen eine Baugenehmigung. Wir beraten Sie zu den Vorschriften in ${c}.` },
    { q: `Wie läuft die Montage ab?`, a: `Unsere Monteure kommen zum vereinbarten Termin zu Ihnen nach ${c}. Die Montage erfolgt schnell und sauber – je nach Projekt in wenigen Stunden bis zu einem Tag. Alle Montagekosten sind im Vergleichsangebot enthalten.` },
    { q: `Kann ich das Vergleichsangebot auch für mehrere Leistungen erhalten?`, a: `Ja, selbstverständlich. Sie können mehrere Leistungen in einer Anfrage kombinieren – zum Beispiel Fahrzeugbeschriftung und Firmenschild. Wir kalkulieren alles transparent in einem Vergleichsangebot.` },
  ],
  (c: string) => [
    { q: `Was spricht für Printvertise in ${c}?`, a: `Unser kostenfreies Vergleichsangebot, persönliche Beratung vor Ort, eigene Produktion ohne Zwischenhändler und über 15 Jahre Erfahrung. Wir setzen auf Qualität, Transparenz und faire Preise.` },
    { q: `Wie schnell können Sie mein Projekt umsetzen?`, a: `Von der Auftragsbestätigung bis zur Montage vergehen in der Regel 5–10 Werktage. Bei dringenden Projekten bieten wir Expressproduktion an. Die Lieferzeit wird im Vergleichsangebot angegeben.` },
    { q: `Bieten Sie Ratenzahlung oder Finanzierung an?`, a: `Für größere Projekte bieten wir nach Absprache flexible Zahlungsmodelle an. Sprechen Sie uns einfach darauf an, wenn Sie Ihr Vergleichsangebot erhalten.` },
    { q: `Kann ich Referenzprojekte in ${c} sehen?`, a: `Ja, wir zeigen Ihnen gerne Referenzprojekte in ${c} und Umgebung. So können Sie sich ein Bild von unserer Arbeit machen, bevor Sie sich entscheiden.` },
    { q: `Was passiert, wenn mir das Ergebnis nicht gefällt?`, a: `Vor der Produktion erhalten Sie immer einen Entwurf zur Freigabe. Änderungswünsche setzen wir unkompliziert um. Auf das fertige Produkt geben wir Garantie.` },
    { q: `Können Sie auch bestehende Designs umsetzen?`, a: `Ja, wenn Sie bereits fertige Druckdaten oder Designvorlagen haben, setzen wir diese gerne um. Wir prüfen Ihre Daten kostenfrei auf Drucktauglichkeit.` },
  ],
  (c: string) => [
    { q: `Werbetechnik in ${c} – was macht gute Außenwerbung aus?`, a: `Gute Außenwerbung ist sichtbar, lesbar und einprägsam. Sie transportiert Ihre Botschaft auf den ersten Blick und passt zu Ihrer Markenidentität. Wir beraten Sie im Rahmen Ihres Vergleichsangebots zur optimalen Gestaltung.` },
    { q: `Was ist bei der Standortwahl für Werbeanlagen zu beachten?`, a: `Sichtachsen, Beleuchtungsverhältnisse und Abstand zum Betrachter sind entscheidend. Bei einer Vor-Ort-Beratung in ${c} analysieren wir die Gegebenheiten und empfehlen die optimale Platzierung.` },
    { q: `Wie unterscheiden sich die Materialien preislich?`, a: `Aluminium-Verbundplatten sind günstiger als Acrylglas, Cast-Folien halten länger als Polymere. In Ihrem Vergleichsangebot empfehlen wir das beste Material für Ihr Budget und erklären die Unterschiede.` },
    { q: `Welche Trends gibt es in der Werbetechnik 2026?`, a: `Nachhaltigkeit, LED-Beleuchtung mit geringem Energieverbrauch, minimalistische Designs und digitale Elemente wie QR-Codes in der Beschriftung liegen im Trend. Wir beraten Sie gerne zu modernen Lösungen.` },
    { q: `Muss ich mich sofort entscheiden?`, a: `Nein, überhaupt nicht. Unser Vergleichsangebot ist unverbindlich und hat keine Ablaufrist. Nehmen Sie sich die Zeit, die Sie brauchen.` },
    { q: `Wie kann ich Kosten sparen, ohne auf Qualität zu verzichten?`, a: `Zum Beispiel durch kluge Materialwahl, optimierte Größen oder den Verzicht auf unnötige Extras. In der Beratung zum Vergleichsangebot zeigen wir Ihnen Einsparpotenziale – ohne Qualitätseinbußen.` },
  ],
  (c: string) => [
    { q: `Erhalte ich ein verbindliches Festpreisangebot?`, a: `Ja. Unser Vergleichsangebot enthält verbindliche Festpreise für alle aufgeführten Leistungen. Es gibt keine Nachforderungen oder versteckte Kosten – vorausgesetzt, der Auftragsumfang ändert sich nicht.` },
    { q: `Wie detailliert ist das Vergleichsangebot?`, a: `Sehr detailliert. Sie sehen die Kosten für jede einzelne Position: Material, Druck, Konfektionierung, Design und Montage. So können Sie unsere Preise transparent mit anderen Angeboten vergleichen.` },
    { q: `Können Sie mehrere Filialen in ${c} ausstatten?`, a: `Ja, wir betreuen auch Filialkonzepte und sorgen für ein einheitliches Erscheinungsbild an allen Standorten. Bei Mehrfachbestellungen bieten wir attraktive Staffelpreise.` },
    { q: `Was passiert bei Beschädigungen nach der Montage?`, a: `Wir bieten Reparaturservice für alle unsere Produkte. Bei Sturmschäden oder Vandalismus sind wir schnell vor Ort. Auf Material und Verarbeitung geben wir Garantie.` },
    { q: `Bieten Sie auch digitale Werbetechnik an?`, a: `Ja, wir integrieren auf Wunsch auch digitale Elemente wie LED-Displays oder interaktive Elemente in Ihre Werbeanlage. Lassen Sie sich in Ihrem Vergleichsangebot auch hierzu beraten.` },
    { q: `Wie umweltfreundlich sind Ihre Produkte?`, a: `Wir bieten PVC-freie Folien, recycelbare Schildmaterialien und lösemittelfreie Druckverfahren an. Nachhaltigkeit ist für uns kein Trend, sondern Standard – ohne Mehrkosten für Sie.` },
  ],
];

/* ------------------------------------------------------------------ */
/*  CTA – 10 Varianten                                                */
/* ------------------------------------------------------------------ */

const CTA_VARIANTS = [
  (c: string) => ({
    heading: `Kostenfreies Vergleichsangebot für Werbetechnik in ${c}`,
    text: `Beschreiben Sie kurz Ihr Vorhaben. Wir erstellen Ihnen ein unverbindliches Vergleichsangebot mit transparenter Kostenaufstellung – persönlich und innerhalb von 24 Stunden.`,
  }),
  (c: string) => ({
    heading: `Ihr Vergleichsangebot für ${c} – kostenlos & unverbindlich`,
    text: `Füllen Sie das Formular aus und erhalten Sie Ihr individuelles Vergleichsangebot. Keine versteckten Kosten, keine Verpflichtung – nur Transparenz.`,
  }),
  (c: string) => ({
    heading: `Vergleichsangebot anfordern – Werbetechnik ${c}`,
    text: `Wir freuen uns auf Ihr Projekt. Beschreiben Sie kurz Ihren Bedarf und wir kommen mit einem fairen, detaillierten Vergleichsangebot auf Sie zu.`,
  }),
  (c: string) => ({
    heading: `Jetzt Vergleichsangebot für ${c} erhalten`,
    text: `Schreiben Sie uns und erhalten Sie zeitnah ein individuelles Vergleichsangebot. Persönlich, transparent und 100 % unverbindlich.`,
  }),
  (c: string) => ({
    heading: `Starten Sie Ihr Projekt in ${c}`,
    text: `Ob Schilder, Beschriftung oder Leuchtreklame – teilen Sie uns Ihre Wünsche mit. Ihr kostenfreies Vergleichsangebot ist der erste Schritt zu Ihrem neuen Auftritt.`,
  }),
  (c: string) => ({
    heading: `Vergleichsangebot sichern – Werbetechnik ${c}`,
    text: `Nutzen Sie unser Kontaktformular für Ihre Anfrage. Wir erstellen Ihnen eine transparente, vergleichbare Kostenaufstellung – in der Regel am selben Tag.`,
  }),
  (c: string) => ({
    heading: `Ihr Werbetechnik-Projekt in ${c} beginnt hier`,
    text: `Erzählen Sie uns von Ihrem Vorhaben und erhalten Sie ein kostenfreies Vergleichsangebot. Faire Preise, persönliche Beratung und höchste Qualität.`,
  }),
  (c: string) => ({
    heading: `Kostenlos vergleichen – Werbetechnik in ${c}`,
    text: `Fordern Sie jetzt Ihr unverbindliches Vergleichsangebot an. Wir schlüsseln alle Kosten transparent auf, damit Sie fundiert entscheiden können.`,
  }),
  (c: string) => ({
    heading: `Werbetechnik ${c}: Ihr Angebot wartet`,
    text: `Beschreiben Sie Ihr Projekt in wenigen Sätzen. Unser Team erstellt Ihnen ein detailliertes Vergleichsangebot – kostenfrei und ohne Kleingedrucktes.`,
  }),
  (c: string) => ({
    heading: `Transparentes Angebot für Werbetechnik in ${c}`,
    text: `Wir glauben an faire Preise und offene Kommunikation. Deshalb erhalten Sie von uns immer ein kostenfreies Vergleichsangebot, bevor Sie sich entscheiden.`,
  }),
];

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

export interface ProcessStep {
  title: string;
  text: string;
}

export interface CityContent {
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  serviceSection: { heading: string; text: string };
  process: { heading: string; steps: ProcessStep[] };
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
    process: pick(PROCESS_VARIANTS, slug, 5)(cityName),
    trust: pick(TRUST_VARIANTS, slug, 6)(cityName),
    faq: pick(FAQ_POOLS, slug, 7)(cityName),
    cta: pick(CTA_VARIANTS, slug, 8)(cityName),
  };
}

export function getNearbyCitySlugs(
  allSlugs: string[],
  currentSlug: string,
  count = 8
): string[] {
  const others = allSlugs.filter((s) => s !== currentSlug);
  const sorted = [...others].sort(
    (a, b) => (hashStr(a + currentSlug) % 9973) - (hashStr(b + currentSlug) % 9973)
  );
  return sorted.slice(0, Math.min(count, sorted.length));
}
