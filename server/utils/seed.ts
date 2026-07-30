import { hash } from 'bcryptjs'
import { db } from './db'
import * as schema from './schema'

async function seed() {
  console.log('🌱 Seeding database...')

  // ── Utilisateurs ──────────────────────────────────────────
  const adminHash = await hash('admin123', 12)
  const userHash = await hash('password123', 12)

  const [admin] = await db.insert(schema.users).values({
    username: 'admin',
    email: 'admin@blogharley.com',
    passwordHash: adminHash,
    role: 'admin',
    bio: 'Administrateur du blog Harley-Davidson',
    reputation: 150,
  }).returning()

  const [moderator] = await db.insert(schema.users).values({
    username: 'IronEagle',
    email: 'iron@eagle.com',
    passwordHash: userHash,
    role: 'moderator',
    bio: 'Modérateur passionné, roule en Road Glide',
    reputation: 85,
  }).returning()

  const [user1] = await db.insert(schema.users).values({
    username: 'RoadKing78',
    email: 'road@king.com',
    passwordHash: userHash,
    role: 'user',
    bio: 'Propriétaire d\'une Road King 2021 et d\'une Shovelhead 1978',
    reputation: 42,
  }).returning()

  const [user2] = await db.insert(schema.users).values({
    username: 'ChopperFan',
    email: 'chopper@fan.com',
    passwordHash: userHash,
    role: 'user',
    bio: 'Fan de customs et de bobbers, je bricole tout moi-même',
    reputation: 28,
  }).returning()

  const [user3] = await db.insert(schema.users).values({
    username: 'SturgisVeteran',
    email: 'sturgis@veteran.com',
    passwordHash: userHash,
    role: 'user',
    bio: 'Rouleur depuis 20 ans, jamais loupé un Sturgis',
    reputation: 67,
  }).returning()

  const [user4] = await db.insert(schema.users).values({
    username: 'TwinCamTom',
    email: 'twincam@tom.com',
    passwordHash: userHash,
    role: 'user',
    bio: 'Passionné de Twin Cam, je roule en Street Glide 2017',
    reputation: 31,
  }).returning()

  const [user5] = await db.insert(schema.users).values({
    username: 'BikerGirl66',
    email: 'biker@girl66.com',
    passwordHash: userHash,
    role: 'user',
    bio: 'Rouleuse depuis 15 ans, ma première Harley était une Sportster 883',
    reputation: 45,
  }).returning()

  console.log('  ✓ 7 users created')

  // ── Catégories ────────────────────────────────────────────
  const categoryData = [
    { name: 'Fiches Techniques', slug: 'fiches-techniques', description: 'Spécifications, motorisations, performances des modèles Harley-Davidson', icon: 'Wrench', color: '#ff6600' },
    { name: 'Histoire', slug: 'histoire', description: 'L\'histoire de Harley-Davidson, modèles iconiques, époques marquantes', icon: 'BookOpen', color: '#8B4513' },
    { name: 'Tutoriels Mécanique', slug: 'tutoriels-mecanique', description: 'Guides d\'entretien, réparation, restauration pas à pas', icon: 'Settings', color: '#2563eb' },
    { name: 'Personnalisation', slug: 'personnalisation', description: 'Customisation, pièces aftermarket, préparations', icon: 'Paintbrush', color: '#dc2626' },
    { name: 'Culture & Lifestyle', slug: 'culture-lifestyle', description: 'L\'esprit Harley, la communauté, le blouson, les tatouages, la musique', icon: 'Heart', color: '#db2777' },
    { name: 'Événements & Rassemblements', slug: 'evenements-rassemblements', description: 'Sturgis, Bike Week, rassemblements locaux, sorties', icon: 'Calendar', color: '#7c3aed' },
    { name: 'Nouveautés', slug: 'nouveautes', description: 'Nouveaux modèles, innovations techniques, annonces officielles', icon: 'Sparkles', color: '#059669' },
    { name: 'Road Trips & Voyages', slug: 'road-trips-voyages', description: 'Itinéraires, récits de voyage, conseils routiers', icon: 'Map', color: '#d97706' },
  ]

  const cats = await db.insert(schema.categories).values(categoryData).returning()
  console.log(`  ✓ ${cats.length} categories created`)

  // ── Tags ──────────────────────────────────────────────────
  const tagData = [
    { name: 'Sportster', slug: 'sportster' },
    { name: 'Fat Boy', slug: 'fat-boy' },
    { name: 'Softail', slug: 'softail' },
    { name: 'Touring', slug: 'touring' },
    { name: 'Road Glide', slug: 'road-glide' },
    { name: 'Custom', slug: 'custom' },
    { name: 'Mécanique', slug: 'mecanique' },
    { name: 'Entretien', slug: 'entretien' },
    { name: 'Sturgis', slug: 'sturgis' },
    { name: 'Road Trip', slug: 'road-trip' },
    { name: 'Shovelhead', slug: 'shovelhead' },
    { name: 'Heritage', slug: 'heritage' },
    { name: 'Street Bob', slug: 'street-bob' },
    { name: 'CVO', slug: 'cvo' },
    { name: 'Histoire', slug: 'histoire' },
    { name: 'Perfecto', slug: 'perfecto' },
    { name: 'Échappement', slug: 'echappement' },
    { name: 'Électrique', slug: 'electrique' },
    { name: 'LiveWire', slug: 'livewire' },
    { name: 'Milwaukee-Eight', slug: 'milwaukee-eight' },
    { name: 'Revolution Max', slug: 'revolution-max' },
    { name: 'Pan America', slug: 'pan-america' },
    { name: 'Knucklehead', slug: 'knucklehead' },
    { name: 'Panhead', slug: 'panhead' },
    { name: 'Evolution', slug: 'evolution' },
    { name: 'Twin Cam', slug: 'twin-cam' },
    { name: 'V-Rod', slug: 'v-rod' },
    { name: 'Nightster', slug: 'nightster' },
    { name: 'Adventure', slug: 'adventure' },
    { name: 'Tatouage', slug: 'tatouage' },
    { name: 'Assurance', slug: 'assurance' },
    { name: 'Permis', slug: 'permis' },
    { name: 'Hivernage', slug: 'hivernage' },
    { name: 'Side-car', slug: 'side-car' },
    { name: 'Dyna', slug: 'dyna' },
    { name: 'Electra Glide', slug: 'electra-glide' },
    { name: 'WLA', slug: 'wla' },
    { name: 'Freins', slug: 'freins' },
  ]

  const tags = await db.insert(schema.tags).values(tagData).returning()
  console.log(`  ✓ ${tags.length} tags created`)

  // ── Articles Blog ─────────────────────────────────────────

  const articlesData = [
    // --- Existant (8 articles) ---
    {
      title: 'Harley-Davidson Sportster S : La fiche technique complète',
      slug: 'harley-davidson-sportster-s-fiche-technique',
      content: `# Harley-Davidson Sportster S\n\nLa Sportster S est le dernier né de la gamme Sportster, équipé du moteur Revolution Max 1250T.\n\n## Motorisation\n\n- **Moteur** : Revolution Max 1250T, V-Twin à 60°\n- **Cylindrée** : 1 252 cm³\n- **Puissance** : 121 ch (90 kW) à 7 500 tr/min\n- **Couple** : 126 Nm à 5 000 tr/min\n- **Boîte** : 6 rapports\n- **Transmission** : Courroie\n\n## Partie cycle\n\n- **Cadre** : Treillis tubulaire en acier\n- **Suspension avant** : Fourche inversée Showa 43 mm\n- **Suspension arrière** : Mono-amortisseur Showa\n- **Frein avant** : Disque simple 320 mm, étrier radial 4 pistons\n- **Frein arrière** : Disque simple 260 mm, étrier 2 pistons\n\n## Dimensions\n\n- **Longueur** : 2 265 mm\n- **Hauteur de selle** : 765 mm\n- **Poids à sec** : 228 kg\n- **Capacité réservoir** : 11,8 L\n\n## Équipements\n\n- Écran TFT 4 pouces\n- 3 modes de conduite (Sport, Route, Pluie)\n- ABS en courbe\n- Contrôle de traction\n- Allumage sans clé`,
      excerpt: 'Découvrez la fiche technique complète de la Harley-Davidson Sportster S, avec son moteur Revolution Max 1250T de 121 ch.',
      categoryId: cats[0].id,
      authorId: admin.id,
      published: true,
      publishedAt: '2025-11-15T10:00:00Z',
      readingTime: 5,
    },
    {
      title: 'Histoire de la Harley-Davidson Fat Boy : du Terminator à nos jours',
      slug: 'histoire-fat-boy-terminator',
      content: `# Histoire de la Fat Boy\n\nLa Fat Boy est sans doute l'une des Harley-Davidson les plus iconiques jamais produites. Lancée en 1990, elle a immédiatement marqué les esprits.\n\n## Les débuts (1990)\n\nLa Fat Boy a été introduite en 1990 avec le moteur Evolution 1340 cm³. Son design massif, ses roues pleines en alliage et sa peinture argentée la rendaient unique.\n\n## Le Terminator (1991)\n\nC'est dans *Terminator 2 : Le Jugement Dernier* que la Fat Boy est devenue une légende. Arnold Schwarzenegger chevauchait une Fat Boy 1991 dans les scènes cultes du film.\n\n## L'évolution Milwaukee-Eight\n\nEn 2018, la Fat Boy a reçu le moteur Milwaukee-Eight 107 (1 746 cm³), puis en 2020 le Milwaukee-Eight 114 (1 868 cm³).\n\n## La Fat Boy aujourd'hui\n\nAujourd'hui, la Fat Boy 114 reste un modèle phare de la gamme Softail. Avec son pneu arrière de 240 mm, son réservoir en forme de larme et son phare avant signature, elle continue de faire rêver les motards du monde entier.`,
      excerpt: 'De sa naissance en 1990 à son apparition dans Terminator 2, plongez dans l\'histoire de la plus iconique des Harley-Davidson.',
      categoryId: cats[1].id,
      authorId: admin.id,
      published: true,
      publishedAt: '2025-10-20T08:00:00Z',
      readingTime: 7,
    },
    {
      title: 'Guide complet : Comment vidanger l\'huile de sa Sportster en 10 étapes',
      slug: 'guide-vidange-huile-sportster',
      content: `# Vidanger l'huile de votre Sportster\n\nLa vidange est l'opération d'entretien la plus importante pour la longévité de votre moteur.\n\n## Matériel nécessaire\n\n- Huile moteur recommandée : SAE 20W50 (Evolution) ou SAE 15W50 (Revolution Max)\n- Filtre à huile\n- Clé à filtre, Clé Allen 6 mm\n- Bac de récupération, entonnoir, chiffons\n\n## Étapes\n\n### 1. Chauffer le moteur\nFaites tourner 2-3 minutes pour que l'huile chaude s'écoule plus facilement.\n\n### 2. Positionner la moto\nSurface plane et stable. Béquille centrale si disponible.\n\n### 3. Déposer le bouchon de vidange\nBac de récupération sous le moteur. Dévissez le bouchon (Allen 6 mm).\n\n### 4. Vidanger\nLaissez l'huile s'écouler 5 à 10 minutes.\n\n### 5. Remplacer le filtre à huile\nDévissez l'ancien filtre. Enduisez le joint du nouveau d'huile propre. Vissez à la main puis serrez d'un 3/4 de tour.\n\n### 6. Remettre le bouchon\nNettoyez-le et serrez au couple (20 Nm).\n\n### 7. Remplir d'huile neuve\nEnviron 2,8 L pour une Evolution, 4,5 L pour une Revolution Max.\n\n### 8. Vérifier le niveau\nEntre les repères mini et maxi.\n\n### 9. Démarrer et vérifier\nPas de fuite autour du filtre.\n\n### 10. Contrôle final\nCoupez le moteur, attendez 2 min, revérifiez le niveau.`,
      excerpt: 'Suivez ce guide pas à pas pour vidanger l\'huile de votre Sportster en toute sécurité.',
      categoryId: cats[2].id,
      authorId: moderator.id,
      published: true,
      publishedAt: '2025-09-10T14:00:00Z',
      readingTime: 8,
    },
    {
      title: 'Road Trip : De la côte Est à Sturgis en Road Glide',
      slug: 'road-trip-cote-est-sturgis-road-glide',
      content: `# De New York à Sturgis : 3 200 km de pur bonheur\n\nRallier New York à Sturgis (Dakota du Sud) pour le 85e anniversaire du rallye. Récit d'un voyage inoubliable.\n\n## Le départ de New York\n\nDirection l'ouest par l'I-80. Première étape : Harrisburg, Pennsylvanie (300 km).\n\n## À travers les Appalaches\n\nBlue Ridge Parkway. Des virages à perte de vue, des paysages à couper le souffle.\n\n## Les grandes plaines\n\nOhio, Indiana, Illinois. Les longues lignes droites du Midwest.\n\n## Sturgis\n\nDes milliers de motos partout, une ambiance de folie. 5 jours là-bas : concerts, expos, rencontres.\n\n## Le retour\n\nVia Yellowstone et les Rocheuses. Au total : 6 500 km en 12 jours.\n\n## Conseils\n\n- Prévoyez des vêtements pour toutes les météos\n- Changez l'huile avant le départ\n- Emportez un kit de réparation courroie\n- Réservez 6 mois à l'avance`,
      excerpt: 'Récit d\'un road trip de 6 500 km de New York à Sturgis en Road Glide Special.',
      categoryId: cats[7].id,
      authorId: user3.id,
      published: true,
      publishedAt: '2025-08-15T07:00:00Z',
      readingTime: 10,
    },
    {
      title: 'Le custom qui a gagné le AMD World Championship 2025',
      slug: 'custom-amd-world-championship-2025',
      content: `# AMD World Championship 2025 : le sacre du savoir-faire français\n\nLe AMD World Championship of Custom Bike Building est la compétition la plus prestigieuse au monde pour les builders de motos customs.\n\n## Le vainqueur : "Black Widow"\n\nConstruite par *French Kustom Works*, la "Black Widow" est une Sportster 1200 de 2004 entièrement reconstruite.\n\n## Les chiffres clés\n\n- **Temps** : 18 mois\n- **Budget** : 85 000 €\n- **Poids final** : 198 kg (70 kg de moins)\n- **Moteur** : Sportster 1200, carter usiné, pistons JE 10.5:1, 95 ch\n\n## Le design\n\nTout est noir, du cadre au moteur. Seules touches de couleur : inserts dorés sur le moteur.\n\n## Modifications principales\n\n- Cadre rigide chromoly sur mesure\n- Réservoir aluminium martelé à la main (7 L)\n- Selle cuir pleine fleur\n- Fourche springer\n- Roues CNC (21" avant, 18" arrière)\n- Échappement 2-en-1 inox`,
      excerpt: 'Plongée dans l\'univers du custom bike building avec la moto gagnante du AMD World Championship 2025.',
      categoryId: cats[3].id,
      authorId: admin.id,
      published: true,
      publishedAt: '2025-07-01T09:00:00Z',
      readingTime: 6,
    },
    {
      title: 'Présentation de la nouvelle Harley-Davidson CVO 2026',
      slug: 'nouvelle-harley-davidson-cvo-2026',
      content: `# Harley-Davidson CVO 2026 : le luxe ultime\n\nHarley-Davidson a dévoilé sa gamme CVO 2026 avec des innovations majeures.\n\n## CVO Road Glide\n- Moteur Milwaukee-Eight 131 (2 147 cm³) — le plus gros moteur de série HD\n- 135 ch, 185 Nm\n- Écran Skyline Pro 12,3 pouces\n- Audio Rockford Fosgate Stage 3\n\n## CVO Street Glide\n- Même moteur Milwaukee-Eight 131\n- Pare-brise ajustable électriquement\n- Selle chauffante\n\n## Nouvelles technologies\n\n1. Ride Modes 2.0 (7 modes)\n2. Radar adaptatif avec détection d'angle\n3. Caméra arrière dans le rétroviseur numérique\n4. Moteur entièrement refroidi par liquide\n\n## Prix\n\nCVO Road Glide : ~52 000 €\nCVO Street Glide : ~49 000 €\nDisponibles mars 2026.`,
      excerpt: 'Découvrez la gamme CVO 2026 : moteur Milwaukee-Eight 131, radar adaptatif, infodivertissement nouvelle génération.',
      categoryId: cats[6].id,
      authorId: admin.id,
      published: true,
      publishedAt: '2026-01-10T10:00:00Z',
      readingTime: 6,
    },
    {
      title: 'Le mythe du blouson Perfecto : du cuir à la route',
      slug: 'mythe-blouson-perfecto',
      content: `# Le Perfecto : plus qu'un blouson, un symbole\n\n## Les origines (1928)\n\nIrving Schott crée le premier blouson en cuir pour motard en 1928. Baptisé "Perfecto" d'après son cigare cubain préféré.\n\n## L'adoption par Harley\n\nDans les années 1940-50, les motards Harley adoptent massivement le Perfecto.\n\n## Marlon Brando et James Dean\n\n*L'Équipée Sauvage* (1953) et *La Fureur de Vivre* (1955) propulsent le Perfecto dans la légende.\n\n## Comment choisir ?\n\n- **Cuir de vache** : abordable, souple\n- **Cuir de chèvre** : léger\n- **Cuir de cheval** : authentique, patine magnifique\n\n## Entretien\n\nChiffon humide, cuir gras tous les 6 mois, jamais de housse plastique.`,
      excerpt: 'De sa création en 1928 à son statut d\'icône culturelle, l\'histoire du blouson Perfecto.',
      categoryId: cats[4].id,
      authorId: moderator.id,
      published: true,
      publishedAt: '2025-06-20T11:00:00Z',
      readingTime: 7,
    },
    {
      title: 'Harley-Davidson et l\'électrique : le pari LiveWire',
      slug: 'harley-electrique-livewire',
      content: `# L'aventure électrique de Harley-Davidson\n\n## La LiveWire originale (2019)\n\n- 105 ch, 116 Nm instantanés\n- Autonomie : 235 km (ville)\n- Recharge 80% en 40 min\n- Prix : 29 990 €\n\n## La scission LiveWire (2022)\n\nFilialisée en LiveWire Group.\n\n## S2 Del Mar (2024)\n\n15 500 €, 160 km d'autonomie, style flat tracker.\n\n## S2 Mulholland (2025)\n\nVersion roadster.\n\n## Le défi\n\nConcilier héritage V-Twin et électrification. Les puristes sont sceptiques mais les essais sont unanimes.`,
      excerpt: 'De la LiveWire originale à la filialisation, l\'histoire de la moto électrique chez Harley-Davidson.',
      categoryId: cats[6].id,
      authorId: admin.id,
      published: true,
      publishedAt: '2026-02-01T10:00:00Z',
      readingTime: 8,
    },
    // --- Nouveaux articles Histoire (6) ---
    {
      title: '1903-1929 : La fondation de Harley-Davidson, des gamins de Milwaukee',
      slug: 'fondation-harley-davidson-1903',
      content: `# Les débuts d'une légende américaine\n\nTout commence en 1901 à Milwaukee, Wisconsin. William S. Harley, 21 ans, dessine les plans d'un petit moteur de bicyclette.\n\n## 1903 : La première Harley-Davidson\n\nAvec son ami Arthur Davidson, ils construisent leur première moto dans un hangar de 3 x 4 mètres portant l'inscription "Harley-Davidson Motor Company". Le moteur fait 7 cm³ et développe 3 ch.\n\n## 1907 : La première usine\n\nL'entreprise s'agrandit et construit sa première usine sur Chestnut Street (aujourd'hui Juneau Avenue). Production : 150 motos par an.\n\n## 1909 : Le premier V-Twin\n\nHarley introduit son premier moteur V-Twin, un 49,5 cm³. Bien que peu fiable, il pose les bases de ce qui deviendra la signature sonore de la marque.\n\n## 1917-1918 : Première Guerre mondiale\n\nHarley fournit 20 000 motos à l'armée américaine. La réputation de fiabilité est solidement établie.\n\n## 1920 : Plus grand constructeur mondial\n\nHarley-Davidson est officiellement le plus grand constructeur de motos au monde, avec des concessionnaires dans 67 pays.`,
      excerpt: 'De l\'atelier de Milwaukee au rang de plus grand constructeur mondial en 1920 : les débuts de la légende Harley-Davidson.',
      categoryId: cats[1].id,
      authorId: admin.id,
      published: true,
      publishedAt: '2025-05-01T09:00:00Z',
      readingTime: 8,
    },
    {
      title: '1936 : Le Knucklehead, la naissance du V-Twin moderne',
      slug: 'knucklehead-1936-v-twin-moderne',
      content: `# Le moteur qui a tout changé\n\nPrésenté en 1936, le moteur Knucklehead (surnommé ainsi pour la forme de ses culbuteurs qui évoquent des phalanges) a révolutionné Harley-Davidson.\n\n## Les innovations\n\n- **Soupapes en tête** (OHV) : premier moteur Harley avec cette technologie\n- **Lubrification sous pression** : plus fiable que le système à perte d'huile précédent\n- **61 et 74 ci** : deux cylindrées disponibles\n- **Puissance** : 40 ch à 4 800 tr/min (pour l'époque, c'était énorme)\n\n## Le modèle EL\n\nLe modèle EL (pour "Economy Light") de 1936 était la version haut de gamme. Avec ses lignes Art déco, sa peinture deux tons et ses chromes, elle était aussi belle que performante.\n\n## L'héritage\n\nLe Knucklehead a été produit jusqu'en 1947. Il est aujourd'hui l'un des moteurs les plus collectionnés et recherchés au monde. Un modèle en bon état peut dépasser les 100 000 $ aux enchères.\n\n## Palmarès\n\n- Course Daytona 200 : victoire en 1937, 1938, 1939\n- Record d'endurance : 24 heures à 130 km/h de moyenne`,
      excerpt: 'Plongez dans l\'histoire du Knucklehead, le moteur V-Twin à soupapes en tête qui a révolutionné Harley-Davidson en 1936.',
      categoryId: cats[1].id,
      authorId: moderator.id,
      published: true,
      publishedAt: '2025-05-10T09:00:00Z',
      readingTime: 7,
    },
    {
      title: '1948 : Le Panhead et l\'âge d\'or de Harley-Davidson',
      slug: 'panhead-1948-age-dor',
      content: `# Le Panhead : la maturité\n\nEn 1948, Harley-Davidson remplace le Knucklehead par le Panhead, ainsi nommé pour ses culbuteurs en aluminium qui ressemblent à des poêles à frire (frying pan).\n\n## Les améliorations\n\n- **Culasses en aluminium** : meilleur refroidissement, poids réduit\n- **Rapport poids/puissance** amélioré de 20%\n- **Allumage magnéto** plus fiable\n- **Hydraulique** : la fourche télescopique Hydra-Glide apparaît en 1949\n\n## Les modèles emblématiques\n\n- **FL Hydra-Glide** (1949) : première Harley avec fourche télescopique\n- **Panhead 74 ci** (1 200 cm³) : 50 ch\n- **Servi-Car** : le triporteur utilitaire, produit jusqu'en 1973\n\n## La culture\n\nLes années 1950 voient naître la culture biker moderne. Les clubs se multiplient, les rassemblements aussi. Le film *L'Équipée Sauvage* (1953) avec Marlon Brando cristallise l'image du motard rebelle.\n\n1957 voit l'arrivée de la Sportster, un modèle plus léger et sportif qui deviendra un best-seller.`,
      excerpt: 'Le Panhead (1948-1965) marque l\'âge d\'or de Harley-Davidson : culasses alu, fourche hydraulique, et la naissance de la culture biker.',
      categoryId: cats[1].id,
      authorId: admin.id,
      published: true,
      publishedAt: '2025-05-20T09:00:00Z',
      readingTime: 7,
    },
    {
      title: 'Harley-Davidson dans la Seconde Guerre mondiale : la WLA',
      slug: 'harley-wla-seconde-guerre-mondiale',
      content: `# Harley-Davidson en guerre\n\nLorsque les États-Unis entrent dans la Seconde Guerre mondiale en 1941, Harley-Davidson est mobilisée pour l'effort de guerre.\n\n## La WLA\n\nLa WLA (W pour Women, L pour high-compression... en réalité "War Department, Light, A-specification") est la version militaire de la WL civile.\n\nCaractéristiques :\n- Moteur 45 ci (740 cm³) side-valve\n- 25 ch\n- Peinture vert olive (Olive Drab)\n- Pare-brise et guidon renforcés\n- Selle militaire avec ressorts\n- Support pour carabine M1\n\n## Production de guerre\n\n- 90 000 motos produites pour l'armée alliée\n- Des milliers d'exemplaires envoyés en URSS via le prêt-bail\n- L'usine tourne 24h/24, 7j/7\n\n## Après-guerre\n\nDes milliers de WLA sont revendues comme surplus militaire. Beaucoup ont été customisées par les vétérans de retour au pays, donnant naissance à la culture "bobber".\n\nAujourd'hui, la WLA est l'une des Harley les plus collectionnées.`,
      excerpt: 'Pendant la Seconde Guerre mondiale, Harley-Davidson a produit 90 000 motos militaires WLA. L\'histoire d\'une contribution cruciale.',
      categoryId: cats[1].id,
      authorId: admin.id,
      published: true,
      publishedAt: '2025-06-05T09:00:00Z',
      readingTime: 6,
    },
    {
      title: '1966-1984 : Le Shovelhead, des années AMF à la renaissance',
      slug: 'shovelhead-amf-renaissance',
      content: `# Le Shovelhead : 18 ans de turbulence\n\nLe moteur Shovelhead (pelle à charbon) est lancé en 1966 pour remplacer le Panhead. Il traverse l'une des périodes les plus agitées de Harley-Davidson.\n\n## Les débuts prometteurs (1966-1969)\n\n- 74 ci (1 200 cm³), puis 80 ci (1 340 cm³) en 1978\n- Culasses en aluminium avec des culbuteurs ressemblant à des pelles\n- Puissance : 55 à 65 ch selon les versions\n\n## L'ère AMF (1969-1981)\n\nEn 1969, Harley-Davidson est rachetée par AMF (American Machine and Foundry). La qualité chute, la production est augmentée au détriment de la fiabilité. Les motos des années 70 ont une réputation désastreuse : fuites d'huile, visserie qui se desserre, peinture qui s'écaille.\n\nPourtant, la culture Harley n'a jamais été aussi forte : *Easy Rider* (1969), l'explosion des clubs, Sturgis qui grossit chaque année.\n\n## Le rachat par les 13 (1981)\n\nEn 1981, un groupe de 13 investisseurs mené par Vaughn Beals et Willie G. Davidson rachète Harley-Davidson à AMF. C'est le début de la renaissance.\n\n## La fin du Shovelhead (1984)\n\nLe Shovelhead est remplacé en 1984 par le moteur Evolution. Mais il reste le moteur fétiche des builders et des choppers.`,
      excerpt: 'Le Shovelhead traverse l\'ère AMF et les années sombres. De 1966 à 1984, l\'histoire d\'un moteur qui a survécu à tout.',
      categoryId: cats[1].id,
      authorId: user1.id,
      published: true,
      publishedAt: '2025-06-15T09:00:00Z',
      readingTime: 8,
    },
    {
      title: '1984 : Le moteur Evolution qui a sauvé Harley-Davidson',
      slug: 'moteur-evolution-1984',
      content: `# L'Evolution : le moteur qui a tout changé\n\nEn 1984, Harley-Davidson dévoile le moteur Evolution, surnommé "Evo". C'est le moteur qui a sauvé la compagnie.\n\n## Le contexte\n\nEn 1981, Harley-Davidson est au bord de la faillite. La qualité est médiocre, les ventes s'effondrent. Les motos japonaises dominent le marché.\n\n## La révolution Evo\n\n- **Cylindres en aluminium** (au lieu de la fonte) : meilleur refroidissement, poids réduit\n- **Culasses à flux traversant** : meilleur rendement\n- **Étanchéité améliorée** : fini les fuites d'huile légendaires des Shovelhead\n- **Démarrage électrique** fiable\n- **Fiabilité** : 100 000 km sans problème majeur\n\n## Les modèles Evo\n\n- **Softail** (1984) : cadre avec ressorts cachés, look hardtail\n- **Heritage Softail Classic** (1986) : le look rétro qui cartonne\n- **Sportster Evolution** (1986) : le 883 et le 1200\n- **FXR** (1984) : le meilleur châssis jamais conçu par Harley\n\n## L'héritage\n\nL'Evolution a été produit jusqu'en 2000 (Big Twin) et 2021 (Sportster). C'est le moteur Harley le plus produit de l'histoire avec plus de 2 millions d'unités.`,
      excerpt: 'Le moteur Evolution (1984) a sauvé Harley-Davidson de la faillite et lancé l\'ère moderne. L\'histoire d\'une renaissance.',
      categoryId: cats[1].id,
      authorId: admin.id,
      published: true,
      publishedAt: '2025-06-25T09:00:00Z',
      readingTime: 7,
    },
    // --- Nouveaux articles Fiches Techniques (2) ---
    {
      title: 'Fiche technique complète : Harley-Davidson Road Glide Limited 2025',
      slug: 'fiche-technique-road-glide-limited-2025',
      content: `# Road Glide Limited 2025\n\nLe vaisseau amiral du tourisme Harley-Davidson, avec son fairing "shark nose" caractéristique.\n\n## Motorisation\n\n- **Moteur** : Milwaukee-Eight 114\n- **Cylindrée** : 1 868 cm³\n- **Puissance** : 100 ch\n- **Couple** : 164 Nm à 3 250 tr/min\n- **Boîte** : 6 rapports\n- **Transmission** : courroie\n\n## Partie cycle\n\n- **Cadre** : Touring\n- **Suspension avant** : fourche 49 mm\n- **Suspension arrière** : 2 amortisseurs réglables\n- **Frein avant** : 2 disques 320 mm, étriers 4 pistons\n- **Frein arrière** : disque 320 mm, étrier 4 pistons\n- **ABS en courbe** de série\n\n## Dimensions\n\n- **Longueur** : 2 540 mm\n- **Hauteur de selle** : 715 mm\n- **Poids en ordre de marche** : 390 kg\n- **Capacité réservoir** : 22,7 L\n\n## Équipements\n\n- Boom! Box GTS avec écran 6,5"\n- GPS dédié\n- Audio Rockford Fosgate\n- Valises rigides verrouillables (verrouillage centralisé)\n- Régulateur de vitesse\n- Poignées et selles chauffantes`,
      excerpt: 'Tout savoir sur la Road Glide Limited 2025 : motorisation Milwaukee-Eight 114, équipements touring, dimensions et performances.',
      categoryId: cats[0].id,
      authorId: admin.id,
      published: true,
      publishedAt: '2025-12-05T10:00:00Z',
      readingTime: 5,
    },
    {
      title: 'Pan America 1250 Special : la fiche technique adventure',
      slug: 'fiche-technique-pan-america-1250',
      content: `# Pan America 1250 Special\n\nLa première adventure de Harley-Davidson, un pari osé qui a surpris tout le monde.\n\n## Motorisation\n\n- **Moteur** : Revolution Max 1250, V-Twin à 60°\n- **Cylindrée** : 1 252 cm³\n- **Puissance** : 150 ch (112 kW) à 9 000 tr/min\n- **Couple** : 128 Nm à 6 750 tr/min\n- **Boîte** : 6 rapports\n- **Embrayage** : hydraulique, assisté\n\n## Partie cycle\n\n- **Cadre** : moteur semi-structurant\n- **Suspension avant** : Showa 47 mm inversée, débattement 190 mm\n- **Suspension arrière** : Showa, débattement 190 mm\n- **Réglage** : électronique Adaptive Ride Height (abaisse la moto à l'arrêt)\n\n## Dimensions\n\n- **Hauteur de selle** : 830-850 mm (variable)\n- **Poids à sec** : 230 kg\n- **Capacité réservoir** : 21,2 L\n- **Garde au sol** : 208 mm\n\n## Équipements\n\n- Écran TFT 6,8 pouces\n- 6 modes de conduite\n- ABS en courbe\n- Contrôle de traction sensible à l'angle\n- Modes Off-Road\n- Quickshifter`,
      excerpt: 'La fiche technique complète de la Pan America 1250 Special, la première adventure de Harley-Davidson avec son Revolution Max de 150 ch.',
      categoryId: cats[0].id,
      authorId: moderator.id,
      published: true,
      publishedAt: '2025-12-15T10:00:00Z',
      readingTime: 5,
    },
    // --- Nouveaux articles Tutoriels (2) ---
    {
      title: 'Changer ses plaquettes de frein sur une Softail en 8 étapes',
      slug: 'changer-plaquettes-frein-softail',
      content: `# Remplacement des plaquettes de frein\n\nDes plaquettes usées, c'est dangereux. Voici comment les changer sur une Softail Milwaukee-Eight.\n\n## Quand les changer ?\n\n- Épaisseur < 3 mm\n- Bruit de métal sur métal\n- Freinage moins efficace\n- Témoin d'usure visible\n\n## Matériel\n\n- Plaquettes neuves (réf. Harley ou aftermarket)\n- Clé Allen 5 mm\n- Clé Torx T45 (étrier arrière)\n- Pince à circlips\n- Graisse cuivrée\n\n## Étapes\n\n### 1. Sécuriser la moto\nBéquille centrale ou béquille d'atelier.\n\n### 2. Déposer l'étrier\nDévissez les goujons de fixation (Allen 5 mm). Soutenez l'étrier avec un fil de fer pour ne pas forcer sur le flexible.\n\n### 3. Sortir les plaquettes\nRetirez les clips de maintien. Les plaquettes doivent sortir à la main.\n\n### 4. Nettoyer\nNettoyez l'étrier au nettoyant frein. Vérifiez l'état des pistons.\n\n### 5. Repousser les pistons\nUtilisez un repousse-piston ou un gros tournevis. Le réservoir de liquide de frein doit être ouvert pour éviter la pression.\n\n### 6. Graisser\nGraisse cuivrée sur le dos des plaquettes (pas sur la surface de friction).\n\n### 7. Remonter\nRemettez les plaquettes, les clips, remontez l'étrier. Serrez au couple (30 Nm).\n\n### 8. Purger et roder\nPompez le frein pour remettre les pistons en contact. Roulez 100 km en freinant progressivement pour roder.`,
      excerpt: 'Apprenez à changer les plaquettes de frein de votre Softail en 8 étapes simples. Un entretien essentiel pour votre sécurité.',
      categoryId: cats[2].id,
      authorId: user4.id,
      published: true,
      publishedAt: '2026-01-20T14:00:00Z',
      readingTime: 7,
    },
    {
      title: 'Réglage d\'embrayage Sportster Evolution : le guide complet',
      slug: 'reglage-embrayage-sportster-evolution',
      content: `# Régler l'embrayage de sa Sportster Evo\n\nL'embrayage des Sportster Evolution a tendance à se détendre avec le temps. Voici comment le régler.\n\n## Symptômes d'un embrayage mal réglé\n\n- La moto avance au point mort\n- Difficulté à passer les vitesses\n- L'embrayage patine (moteur monte dans les tours sans accélérer)\n- Le levier est trop mou ou trop dur\n\n## Le réglage de base\n\n### 1. Point de prise\nAu levier : une jauge de 3-4 mm entre le levier et le guidon au point de dépatement. Ajustez avec la molette au niveau du levier.\n\n### 2. Contre-écrou moteur\nAu niveau du câble sur le moteur (côté droit) :\n- Desserez le contre-écrou\n- Vissez le régleur jusqu'à sentir une légère résistance\n- Dévissez d'1/4 de tour\n- Rebloquez le contre-écrou\n\n## Le réglage complet (avec dépose du couvercle)\n\nSi le réglage de base ne suffit pas :\n1. Déposez le couvercle d'embrayage (joint à changer)\n2. Vérifiez l'état des disques\n3. Mesurez le jeu : 0,5-1 mm entre la butée et le poussoir\n4. Ajustez avec la vis centrale (Allen 5 mm)\n\n## Problème fréquent\n\nLe câble d'embrayage des Sportster Evo a tendance à se détendre. Pensez à le vérifier tous les 5 000 km.`,
      excerpt: 'Guide complet pour régler l\'embrayage de votre Sportster Evolution. Symptômes, réglage de base et réglage approfondi.',
      categoryId: cats[2].id,
      authorId: user1.id,
      published: true,
      publishedAt: '2026-02-05T14:00:00Z',
      readingTime: 6,
    },
    // --- Nouvel article Personnalisation (1) ---
    {
      title: 'Kit de soufflage Milwaukee-Eight : ce qu\'il faut savoir avant d\'acheter',
      slug: 'kit-soufflage-milwaukee-eight',
      content: `# Kit de soufflage pour Milwaukee-Eight\n\nAugmenter la cylindrée de votre Milwaukee-Eight est le meilleur moyen de gagner en puissance et en couple.\n\n## Pourquoi un kit de soufflage ?\n\n- **Plus de couple** à bas régime\n- **Puissance accrue** sur toute la plage\n- **Son plus profond**\n- **Valorisation** de la moto\n\n## Les kits disponibles\n\n### Stage 1 : Échappement + filtre air + reprog\n- +5 à 8 ch\n- Budget : 800-1 500 €\n- Simple à installer\n\n### Stage 2 : Arbre à cames + Stage 1\n- +15 à 20 ch\n- Budget : 2 000-3 000 €\n- Nécessite ouverture du moteur\n\n### Stage 3 : Soufflage (big bore) + Stage 2\n- Milwaukee-Eight 107 → 114 : +10 ch\n- Milwaukee-Eight 114 → 117 ou 119 : +15 ch\n- Budget : 3 500-5 000 €\n- Travail d'atelier obligatoire\n\n### Stage 4 : Culasse + pistons haut régime\n- +25 à 35 ch\n- Budget : 5 000-8 000 €\n- Usage piste ou compétition\n\n## Recommandations\n\n- Faites toujours une reprog après modification\n- Les kits Screamin\' Eagle sont garantis\n- SE Pro Street Tuner : l'outil de reprog officiel\n- Prévoir embrayage renforcé au-delà de 120 ch`,
      excerpt: 'Guide complet des kits de soufflage pour moteur Milwaukee-Eight : stages, budgets, puissance gagnée et recommandations.',
      categoryId: cats[3].id,
      authorId: user4.id,
      published: true,
      publishedAt: '2025-11-25T10:00:00Z',
      readingTime: 6,
    },
    // --- Nouvel article Culture (1) ---
    {
      title: 'Les patches et couleurs : le code d\'honneur des bikers',
      slug: 'patches-couleurs-code-bikers',
      content: `# Le langage des patches\n\nDans la culture Harley-Davidson, les patches ne sont pas de simples décorations. Ils racontent une histoire, un parcours, une appartenance.\n\n## Les trois patches (3-piece patch)\n\nLe dos du gilet (cut) porte traditionnellement trois patches :\n\n1. **Top rocker** : le nom du club (ex: "HELLS ANGELS", "OUTLAWS")\n2. **Center patch** : le logo du club\n3. **Bottom rocker** : le territoire (ex: "FRANCE", "NORMANDIE")\n\n## Patches de grades\n\n- **President / Prez** : patch de président\n- **Vice President / VP** : vice-président\n- **Sergeant at Arms / SAA** : sécurité et discipline\n- **Road Captain / RC** : organise les sorties\n- **Secretary / Sec** : secrétaire\n- **Treasurer / Tres** : trésorier\n- **Member** : membre\n- **Prospect** : membre en période d'essai\n\n## Les couleurs (colors)\n\nLe "cut" (gilet en jean ou cuir avec les patches) s'appelle les "colors". Les règles sont strictes :\n\n- On ne touche pas les colors d'un autre\n- On ne s'assied pas à table avec ses colors\n- Les colors ne touchent jamais le sol\n- Un MC (Motorcycle Club) peut "patch over" un autre club\n\n## Clubs notables dans le monde Harley\n\n- Hells Angels (fondé 1948)\n- Outlaws MC (1935)\n- Bandidos (1966)\n- Pagans (1959)\n- En France : Hellraisers, Bad Riders, Bikers of France`,
      excerpt: 'Découvrez le code des patches et couleurs dans la culture biker Harley-Davidson : signification, règles et clubs notables.',
      categoryId: cats[4].id,
      authorId: user5.id,
      published: true,
      publishedAt: '2026-01-25T11:00:00Z',
      readingTime: 7,
    },
    // --- Nouvel article Événements (1) ---
    {
      title: 'Sturgis 2025 : le rallye mythique fête ses 85 ans',
      slug: 'sturgis-2025-85-ans',
      content: `# Sturgis 2025 : 85 ans de légende\n\nLe Sturgis Motorcycle Rally, c'est l'événement moto le plus emblématique au monde. Retour sur l'édition 2025.\n\n## Les chiffres\n\n- **Fréquentation** : 520 000 motards\n- **Durée** : 10 jours (4-13 août)\n- **Première édition** : 1938 (organisée par le Jackpine Gypsies Club)\n- **Motos présentes** : estimation 400 000\n\n## Les temps forts\n\n### Le Main Street\nChaque jour, la rue principale de Sturgis (ville de 6 000 habitants) est noire de motos. Les chromes brillent, les moteurs grondent.\n\n### Le Buffalo Chip\nLe plus grand camping du rallye, avec concerts géants (Kiss, Aerosmith, Kid Rock s'y sont produits).\n\n### Le Custom Bike Show\nPlus de 500 customs exposées, des builders du monde entier.\n\n### Le Hill Climb\nCourse de côte mythique, des motos modifiées grimpent une pente de 45°.\n\n## Conseils pour 2026\n\n- Réservez votre hébergement dès janvier\n- Prévoyez 3 000 € minimum pour la semaine\n- Apportez crème solaire et vêtements de pluie\n- Ne ratez pas la Badlands National Park à côté\n- Faites le trajet en groupe : c'est plus sûr et plus convivial`,
      excerpt: 'Le Sturgis Motorcycle Rally fête ses 85 ans en 2025. 520 000 motards, 10 jours de légende dans le Dakota du Sud.',
      categoryId: cats[5].id,
      authorId: user3.id,
      published: true,
      publishedAt: '2025-08-10T07:00:00Z',
      readingTime: 6,
    },
    // --- Nouvel article Nouveautés (1) ---
    {
      title: 'Nouvelle Harley-Davidson Nightster 2025 : essai complet',
      slug: 'essai-nightster-2025',
      content: `# Nightster 2025 : l'entrée de gamme qui décoiffe\n\nHarley-Davidson rafraîchit sa gamme d'entrée avec la Nightster 2025, évolution de la Sportster S.\n\n## Le moteur\n\n- **Revolution Max 975T** : 975 cm³, 90 ch, 95 Nm\n- Refroidissement liquide\n- V-Twin à 60°\n- Boîte 6 rapports\n\nMoins puissante que la Sportster S (121 ch), mais plus accessible et maniable.\n\n## Le style\n\nLa Nightster adopte un look dark custom :\n- Phare avant rond avec masque noir\n- Réservoir en forme de larme (11,7 L)\n- Guidon haut\n- Silencieux noirs\n- Jantes à bâtons noires\n- Selle monoplace (biplace en option)\n\n## Sur la route\n\nJ'ai parcouru 500 km dans l'arrière-pays niçois pour cet essai.\n\n**Ville** : légère (221 kg), agile, rayon de braquage correct. Parfaite pour les trajets quotidiens.\n\n**Route** : le couple à bas régime est typiquement Harley. Reprises franches dès 2 500 tr/min.\n\n**Autoroute** : le manque de bull se fait sentir au-delà de 130 km/h. Prévoyez une bulle amovible.\n\n## Verdict\n\n**Points forts** : légèreté, look, prix (14 990 €), motorisation moderne\n**Points faibles** : autonomie limitée (250 km), bulle, suspensions fermes\n\n**Note** : 8/10`,
      excerpt: 'Essai complet de la nouvelle Harley-Davidson Nightster 2025. 90 ch, look dark custom, prix d\'attaque à 14 990 €.',
      categoryId: cats[6].id,
      authorId: moderator.id,
      published: true,
      publishedAt: '2026-03-01T10:00:00Z',
      readingTime: 7,
    },
    // --- Nouvel article Culture (2) ---
    {
      title: 'Tatouages Harley : symboles et significations des motifs iconiques',
      slug: 'tatouages-harley-symboles',
      content: `# L'art du tatouage Harley-Davidson\n\nLe tatouage et la culture moto Harley sont intimement liés. Décryptage des motifs iconiques.\n\n## Le Bar & Shield\n\nLe logo le plus tatoué au monde. Symbole d'appartenance à la famille Harley. Souvent accompagné du nom du modèle possédé.\n\n## L'aigle\n\nL'aigle Harley-Davidson apparaît dans les années 1970. Symbole de liberté, de puissance, de fierté américaine. Souvent tatoué dans le dos ou sur l'avant-bras.\n\n## La bannière "Harley-Davidson"\n\nLe lettrage classique, souvent en arc de cercle. Beaucoup le font tatouer sur le bras ou la poitrine.\n\n## Le drapeau américain\n\nSouvent combiné au Bar & Shield. Représente l'attachement aux racines américaines de la marque.\n\n## Les flammes\n\nPrésentes sur les customs des années 50-60. Symbolisent la vitesse, le feu, la passion.\n\n## La roue\n\nRoue à rayons ou roue pleine. Représente la route, le mouvement perpétuel.\n\n## Le crâne\n\nSymbole biker par excellence. Mortalité, rébellion, "live fast, die young".\n\n## Conseils\n\n- Un tatouage Harley, ça se mérite : beaucoup attendent leur premier anniversaire de Harley\n- Les tatouages temporaires au henné sont courants pendant les rallyes\n- Sturgis est connu pour ses "rally tattoos" à prix forfaitaire pendant l'événement`,
      excerpt: 'Du Bar & Shield à l\'aigle, décryptage des tatouages emblématiques de la culture Harley-Davidson et leur signification.',
      categoryId: cats[4].id,
      authorId: user5.id,
      published: true,
      publishedAt: '2026-02-15T11:00:00Z',
      readingTime: 6,
    },
  ]

  const articles = await db.insert(schema.articles).values(articlesData).returning()
  console.log(`  ✓ ${articles.length} blog articles created`)

  // Tags associations for articles
  const articleTagData = [
    // Sportster S
    { articleId: articles[0].id, tagId: tags[0].id },
    { articleId: articles[0].id, tagId: tags[20].id },
    // Fat Boy
    { articleId: articles[1].id, tagId: tags[1].id },
    { articleId: articles[1].id, tagId: tags[14].id },
    { articleId: articles[1].id, tagId: tags[19].id },
    // Vidange Sportster
    { articleId: articles[2].id, tagId: tags[0].id },
    { articleId: articles[2].id, tagId: tags[6].id },
    { articleId: articles[2].id, tagId: tags[7].id },
    // Road Trip Sturgis
    { articleId: articles[3].id, tagId: tags[4].id },
    { articleId: articles[3].id, tagId: tags[8].id },
    { articleId: articles[3].id, tagId: tags[9].id },
    { articleId: articles[3].id, tagId: tags[3].id },
    // AMD Custom
    { articleId: articles[4].id, tagId: tags[5].id },
    { articleId: articles[4].id, tagId: tags[0].id },
    // CVO 2026
    { articleId: articles[5].id, tagId: tags[13].id },
    { articleId: articles[5].id, tagId: tags[19].id },
    // Perfecto
    { articleId: articles[6].id, tagId: tags[15].id },
    { articleId: articles[6].id, tagId: tags[14].id },
    // LiveWire
    { articleId: articles[7].id, tagId: tags[17].id },
    { articleId: articles[7].id, tagId: tags[18].id },
    // Fondation HD
    { articleId: articles[8].id, tagId: tags[14].id },
    // Knucklehead
    { articleId: articles[9].id, tagId: tags[22].id },
    { articleId: articles[9].id, tagId: tags[14].id },
    // Panhead
    { articleId: articles[10].id, tagId: tags[23].id },
    { articleId: articles[10].id, tagId: tags[14].id },
    { articleId: articles[10].id, tagId: tags[0].id },
    // WLA
    { articleId: articles[11].id, tagId: tags[36].id },
    { articleId: articles[11].id, tagId: tags[14].id },
    // Shovelhead
    { articleId: articles[12].id, tagId: tags[10].id },
    { articleId: articles[12].id, tagId: tags[14].id },
    // Evolution
    { articleId: articles[13].id, tagId: tags[24].id },
    { articleId: articles[13].id, tagId: tags[14].id },
    // Road Glide Limited
    { articleId: articles[14].id, tagId: tags[4].id },
    { articleId: articles[14].id, tagId: tags[3].id },
    { articleId: articles[14].id, tagId: tags[19].id },
    // Pan America
    { articleId: articles[15].id, tagId: tags[21].id },
    { articleId: articles[15].id, tagId: tags[20].id },
    { articleId: articles[15].id, tagId: tags[28].id },
    // Plaquettes frein
    { articleId: articles[16].id, tagId: tags[2].id },
    { articleId: articles[16].id, tagId: tags[6].id },
    { articleId: articles[16].id, tagId: tags[37].id },
    // Embrayage Sportster
    { articleId: articles[17].id, tagId: tags[0].id },
    { articleId: articles[17].id, tagId: tags[6].id },
    { articleId: articles[17].id, tagId: tags[24].id },
    // Kit soufflage
    { articleId: articles[18].id, tagId: tags[5].id },
    { articleId: articles[18].id, tagId: tags[19].id },
    // Patches
    { articleId: articles[19].id, tagId: tags[29].id },
    { articleId: articles[19].id, tagId: tags[14].id },
    // Sturgis 2025
    { articleId: articles[20].id, tagId: tags[8].id },
    { articleId: articles[20].id, tagId: tags[5].id },
    // Nightster
    { articleId: articles[21].id, tagId: tags[27].id },
    { articleId: articles[21].id, tagId: tags[20].id },
    // Tatouages
    { articleId: articles[22].id, tagId: tags[29].id },
    { articleId: articles[22].id, tagId: tags[4].id },
  ]
  await db.insert(schema.articleTags).values(articleTagData)

  // ── Forum Questions ───────────────────────────────────────

  const questionsData = [
    // Existantes (6)
    {
      title: 'Quel entretien pour une Harley-Davidson Fat Boy ?',
      slug: 'entretien-fat-boy',
      content: 'Bonjour à tous,\n\nJe viens d\'acquérir une Fat Boy de 2019 et je voudrais savoir quel est le programme d\'entretien recommandé. À quelle fréquence changer l\'huile ? Les bougies ? La courroie ?\n\nMerci d\'avance pour vos conseils !',
      authorId: admin.id,
      views: 342,
      votes: 12,
      answersCount: 2,
    },
    {
      title: 'Problème de démarrage à froid sur ma Softail Standard 2020',
      slug: 'probleme-demarrage-froid-softail',
      content: 'Ma Softail Standard 2020 (Milwaukee-Eight 107) a des difficultés à démarrer quand il fait froid (moins de 10°C). Elle tousse, crachote, et parfois elle cale. Une fois chaude, pas de problème.\n\nJ\'ai vérifié la batterie (12,6V), les bougies sont propres. Quelqu\'un a déjà eu ce souci ?',
      authorId: user1.id,
      views: 187,
      votes: 8,
      answersCount: 2,
    },
    {
      title: 'Quel échappement choisir pour une Street Bob 114 ?',
      slug: 'echappement-street-bob-114',
      content: 'Salut les gars,\n\nJe cherche à changer l\'échappement de ma Street Bob 114 de 2021. Je veux un son plus grave et plus présent, mais sans devenir insupportable pour les voisins.\n\nJ\'hésite entre :\n- Vance & Hines Twin Slash\n- Rinehart Racing 4"\n- Screamin\' Eagle Street Cannon\n\nDes retours d\'expérience ?',
      authorId: user2.id,
      views: 256,
      votes: 15,
      answersCount: 3,
    },
    {
      title: 'Différence entre une Heritage Classic et une Fat Boy ?',
      slug: 'heritage-vs-fat-boy',
      content: 'Bonjour,\n\nJe suis en train de choisir ma première Harley et j\'hésite entre une Heritage Classic 114 et une Fat Boy 114.\n\nJe fais principalement des balades le week-end et parfois des trajets de 200-300 km. La quelle est la plus confortable pour les longs trajets ?\n\nMerci !',
      authorId: moderator.id,
      views: 412,
      votes: 22,
      answersCount: 1,
    },
    {
      title: 'Où trouver des pièces d\'occasion pour une Shovelhead 1978 ?',
      slug: 'pieces-occasion-shovelhead-1978',
      content: 'Salut la communauté,\n\nJe restaure une Shovelhead de 1978 (FXE Super Glide). Je cherche des pièces d\'origine ou compatibles : carburateur, allumage, culasse gauche.\n\nAuriez-vous des bons plans, des casse moto spécialisées ou des groupes Facebook à recommander ?',
      authorId: user1.id,
      views: 89,
      votes: 5,
      answersCount: 2,
    },
    {
      title: 'Bruit suspect moteur Sportster 1200 (année 2005)',
      slug: 'bruit-suspect-moteur-sportster-2005',
      content: 'Depuis quelques jours, ma Sportster 1200 Custom (2005) émet un bruit de claquement métallique côté culasse gauche, surtout à chaud au ralenti. L\'huile est bonne, le niveau ok.\n\nEst-ce que ça peut venir des culbuteurs ? Un jeu aux soupapes ? J\'aimerais éviter de tout démonter si ce n\'est pas grave.',
      authorId: user3.id,
      views: 134,
      votes: 6,
      answersCount: 2,
    },
    // Nouvelles (10)
    {
      title: 'Quelle première Harley choisir pour un budget de 10 000 € ?',
      slug: 'premiere-harley-budget-10000',
      content: 'Bonjour à tous,\n\nJ\'ai 25 ans, j\'ai mon permis A2 et je rêve d\'une Harley. Mon budget max est de 10 000 € pour une moto d\'occasion.\n\nJe cherche quelque chose de fiable, plutôt look rétro. Je fais 1m78 pour 75 kg.\n\nDes conseils ? Modèles à privilégier ? Années ?\n\nMerci !',
      authorId: user4.id,
      views: 520,
      votes: 34,
      answersCount: 3,
    },
    {
      title: 'Problème de boîte de vitesses sur Dyna Super Glide 2008',
      slug: 'probleme-boite-dyna-super-glide-2008',
      content: 'Ma Dyna Super Glide 2008 (Twin Cam 96) a un problème : le passage de la 2e à la 3e craque, et parfois elle saute la 3e pour passer directement en 4e.\n\nL\'huile de boîte a été changée il y a 5 000 km. Quelqu\'un a déjà eu ce souci ?\n\nEst-ce que ça peut être juste un réglage de sélecteur ou c\'est boîte à ouvrir ?',
      authorId: user1.id,
      views: 162,
      votes: 9,
      answersCount: 2,
    },
    {
      title: 'Assurance Harley : quelle compagnie recommandez-vous ?',
      slug: 'assurance-harley-recommandation',
      content: 'Bonjour,\n\nJe viens d\'acheter une Road King 2021 et je cherche une bonne assurance. Les devis que j\'ai varient du simple au triple (400 € à 1 200 €/an).\n\nQuelles sont vos expériences ? Des assurances spécialisées moto ? Des conseils pour bien assurer une Harley ?\n\nMerci d\'avance !',
      authorId: user3.id,
      views: 380,
      votes: 18,
      answersCount: 3,
    },
    {
      title: 'Quelle est la meilleure année pour une Sportster 883 ?',
      slug: 'meilleure-annee-sportster-883',
      content: 'Salut,\n\nJe cherche une Sportster 883 d\'occasion. J\'ai entendu dire que certaines années étaient meilleures que d\'autres.\n\n- Les 883 Evo (1986-2003) : fiabilité légendaire ?\n- Les Rubbermount (2004-2021) : plus confortables ?\n\nQuels sont les problèmes connus par année ? Des années à éviter absolument ?',
      authorId: user5.id,
      views: 298,
      votes: 14,
      answersCount: 2,
    },
    {
      title: 'Comment hiverner sa Harley correctement ?',
      slug: 'hiverner-harley-correctement',
      content: 'Bonjour,\n\nC\'est ma première année avec une Harley (Fat Boy 114) et l\'hiver arrive. Je ne vais pas rouler pendant 3-4 mois.\n\nQu\'est-ce que je dois faire pour la préparer ?\n- Batterie : je la débranche ou je mets un maintien ?\n- Essence : je laisse le plein ou je vide ?\n- Huile : je change avant ou après l\'hiver ?\n- Couverture : oui ou non ?\n\nMerci pour vos conseils !',
      authorId: user4.id,
      views: 215,
      votes: 11,
      answersCount: 2,
    },
    {
      title: 'Road King vs Street Glide : quelle différence pour le tourisme ?',
      slug: 'road-king-vs-street-glide',
      content: 'Bonjour,\n\nJe prépare un tour de France de 3 000 km l\'été prochain et j\'hésite entre :\n\n- Road King Special : look rétro, pare-brise amovible, valises rigides\n- Street Glide : fairing batwing, audio intégré, protection au vent\n\nQuel modèle est le plus adapté pour avaler de l\'autoroute ET de la petite route ?\n\nMerci !',
      authorId: user3.id,
      views: 340,
      votes: 20,
      answersCount: 2,
    },
    {
      title: 'Problème de surchauffe sur ma Fat Boy 114 en été',
      slug: 'surchauffe-fat-boy-114-ete',
      content: 'Bonjour,\n\nMa Fat Boy 114 (2021) chauffe énormément en été, surtout dans les bouchons. Le voyant de température s\'allume et le ventilateur tourne en continu. J\'ai même senti une odeur de peinture chaude près du réservoir.\n\nEst-ce normal pour un Milwaukee-Eight ? Des solutions ?\n\nJ\'ai lu que certains montent des kits de refroidissement additionnels.',
      authorId: user4.id,
      views: 178,
      votes: 7,
      answersCount: 2,
    },
    {
      title: 'Conversion chaîne/courroie sur Shovelhead : conseils ?',
      slug: 'conversion-chaine-courroie-shovelhead',
      content: 'Salut,\n\nJe veux convertir ma Shovelhead FXE 1978 de la chaîne à la courroie. Moins d\'entretien, plus propre.\n\nEst-ce que quelqu\'un a déjà fait cette conversion ?\n- Kit recommandé ?\n- Faut-il modifier le bras oscillant ?\n- Perte de puissance ?\n- Coût total ?\n\nMerci pour vos retours !',
      authorId: user1.id,
      views: 95,
      votes: 4,
      answersCount: 2,
    },
    {
      title: 'Quel GPS moto recommandez-vous pour les road trips ?',
      slug: 'gps-moto-road-trip-recommandation',
      content: 'Bonjour,\n\nJe prépare un road trip de 2 semaines en Europe avec ma Road Glide. Je cherche un GPS moto.\n\nJ\'hésite entre :\n- Garmin Zumo XT2\n- TomTom Rider 550\n- Utiliser mon téléphone\n\nQuels sont vos retours ? L\'étanchéité ? La lisibilité au soleil ? Les cartes Europe ?\n\nMerci !',
      authorId: user5.id,
      views: 205,
      votes: 13,
      answersCount: 2,
    },
    {
      title: 'Peut-on mettre un side-car sur une Softail ?',
      slug: 'side-car-softail',
      content: 'Bonjour,\n\nJ\'aimerais mettre un side-car sur ma Softail Standard 2020 pour balader mon chien. Mais j\'ai entendu dire que les Softail ne sont pas compatibles à cause du mono-amortisseur.\n\nQuelqu\'un a déjà fait ? Des modifications à prévoir ? Des marques de side-car compatibles ?\n\nMerci pour vos lumières !',
      authorId: user5.id,
      views: 145,
      votes: 6,
      answersCount: 2,
    },
  ]

  const questions = await db.insert(schema.forumQuestions).values(questionsData).returning()
  console.log(`  ✓ ${questions.length} forum questions created`)

  // Tags for questions
  const questionTagData = [
    { questionId: questions[0].id, tagId: tags[1].id },
    { questionId: questions[0].id, tagId: tags[7].id },
    { questionId: questions[1].id, tagId: tags[2].id },
    { questionId: questions[1].id, tagId: tags[6].id },
    { questionId: questions[1].id, tagId: tags[19].id },
    { questionId: questions[2].id, tagId: tags[12].id },
    { questionId: questions[2].id, tagId: tags[16].id },
    { questionId: questions[3].id, tagId: tags[11].id },
    { questionId: questions[3].id, tagId: tags[1].id },
    { questionId: questions[4].id, tagId: tags[10].id },
    { questionId: questions[4].id, tagId: tags[6].id },
    { questionId: questions[5].id, tagId: tags[0].id },
    { questionId: questions[5].id, tagId: tags[6].id },
    { questionId: questions[6].id, tagId: tags[0].id },
    { questionId: questions[6].id, tagId: tags[31].id },
    { questionId: questions[7].id, tagId: tags[34].id },
    { questionId: questions[7].id, tagId: tags[25].id },
    { questionId: questions[7].id, tagId: tags[6].id },
    { questionId: questions[8].id, tagId: tags[30].id },
    { questionId: questions[8].id, tagId: tags[3].id },
    { questionId: questions[9].id, tagId: tags[0].id },
    { questionId: questions[9].id, tagId: tags[24].id },
    { questionId: questions[10].id, tagId: tags[32].id },
    { questionId: questions[10].id, tagId: tags[7].id },
    { questionId: questions[11].id, tagId: tags[35].id },
    { questionId: questions[11].id, tagId: tags[3].id },
    { questionId: questions[12].id, tagId: tags[1].id },
    { questionId: questions[12].id, tagId: tags[19].id },
    { questionId: questions[12].id, tagId: tags[6].id },
    { questionId: questions[13].id, tagId: tags[10].id },
    { questionId: questions[13].id, tagId: tags[6].id },
    { questionId: questions[14].id, tagId: tags[9].id },
    { questionId: questions[14].id, tagId: tags[3].id },
    { questionId: questions[15].id, tagId: tags[2].id },
    { questionId: questions[15].id, tagId: tags[33].id },
  ]
  await db.insert(schema.questionTags).values(questionTagData)

  // ── Forum Answers ─────────────────────────────────────────

  // Q0 : Entretien Fat Boy (2)
  await db.insert(schema.forumAnswers).values([
    {
      content: 'Félicitations pour l\'acquisition ! Pour une Fat Boy Milwaukee-Eight :\n\n- **Huile moteur** : tous les 8 000 km ou 1 an\n- **Huile de boîte** : tous les 2 ans\n- **Bougies** : tous les 40 000 km\n- **Courroie** : vérifier tous les 15 000 km, changement vers 80 000 km\n- **Liquide de frein** : tous les 2 ans\n\nN\'oublie pas le kit de lubrification de la courroie si tu roules sous la pluie !',
      questionId: questions[0].id,
      authorId: admin.id,
      votes: 7,
      isAccepted: true,
    },
    {
      content: 'J\'ajouterais aussi : vidange du liquide de refroidissement si t\'as le radiateur d\'huile. Et vérifie l\'état des durites de frein tous les 4 ans.',
      questionId: questions[0].id,
      authorId: user3.id,
      votes: 3,
      isAccepted: false,
    },
  ])

  // Q1 : Démarrage à froid Softail (2)
  await db.insert(schema.forumAnswers).values([
    {
      content: 'J\'ai eu exactement le même problème sur ma Softail 2019. Dans mon cas, c\'était le capteur de température (ECT). Il coûte 40 € et se change en 10 minutes. Essaye de lire les codes défaut, tu verras peut-être un code P0117 ou P0118.',
      questionId: questions[1].id,
      authorId: user3.id,
      votes: 12,
      isAccepted: true,
    },
    {
      content: 'Vérifie aussi le contacteur de béquille. Un faux contact peut limiter l\'allumage. Nettoie au WD40, ça ne coûte rien.',
      questionId: questions[1].id,
      authorId: user2.id,
      votes: 5,
      isAccepted: false,
    },
  ])

  // Q2 : Échappement Street Bob (3)
  await db.insert(schema.forumAnswers).values([
    {
      content: 'J\'ai des Vance & Hines Twin Slash. Le son est parfait : grave au ralenti, puissant en accélération. Prévois une reprog, le mélange devient trop pauvre sans. Installation en 2 heures.',
      questionId: questions[2].id,
      authorId: user1.id,
      votes: 9,
      isAccepted: true,
    },
    {
      content: 'Je déconseille les Rinehart 4", trop bruyants. Les Screamin\' Eagle Street Cannon sont un bon compromis.',
      questionId: questions[2].id,
      authorId: moderator.id,
      votes: 6,
      isAccepted: false,
    },
    {
      content: 'Bassani Road Rage 3". Méconnus mais top qualité, son grave et profond. Entre V&H et Rinehart niveau prix.',
      questionId: questions[2].id,
      authorId: user3.id,
      votes: 4,
      isAccepted: false,
    },
  ])

  // Q3 : Heritage vs Fat Boy (1)
  await db.insert(schema.forumAnswers).values([
    {
      content: 'J\'ai eu les deux :\n\n**Heritage Classic** : + confortable longs trajets, selle épaisse, pare-brise, valises. Look rétro.\n\n**Fat Boy** : look plus badass, moins confortable sur longs trajets, plus agile en ville.\n\nPrends la Heritage pour le tourisme, la Fat Boy pour le look et les sorties WE.',
      questionId: questions[3].id,
      authorId: user1.id,
      votes: 18,
      isAccepted: true,
    },
  ])

  // Q4 : Pièces Shovelhead (2)
  await db.insert(schema.forumAnswers).values([
    {
      content: 'Pour une Shovelhead :\n- **French Shovel Parts** : spécialiste français pièces NOS\n- **JP Cycles** : livrent en France\n- **Facebook "Harley Shovelhead France"** : 3 000 membres\n- Bourses d\'échanges moto (Lyon, Paris, Toulouse)\n\nPasse en carbu S&S Super E (350 €), ça transforme le moteur.',
      questionId: questions[4].id,
      authorId: admin.id,
      votes: 8,
      isAccepted: true,
    },
    {
      content: 'Pour les culasses, **Colin Collins** au UK est le meilleur en Europe. Pour l\'allumage, passe en Crane Hi-4 électronique (200 €), tu oublies les rupteurs.',
      questionId: questions[4].id,
      authorId: user2.id,
      votes: 5,
      isAccepted: false,
    },
  ])

  // Q5 : Bruit Sportster (2)
  await db.insert(schema.forumAnswers).values([
    {
      content: 'Probablement les culbuteurs. Vérifie le jeu aux soupapes : 0,10-0,15 mm admission, 0,15-0,20 mm échappement à chaud. Si c\'est bon, regarde le tendeur de chaîne de distribution.',
      questionId: questions[5].id,
      authorId: moderator.id,
      votes: 7,
      isAccepted: true,
    },
    {
      content: 'Même problème sur ma 1200 Custom 2004. C\'était le silentbloc du support moteur côté gauche. Vérifie en bougeant le moteur à froid.',
      questionId: questions[5].id,
      authorId: user1.id,
      votes: 4,
      isAccepted: false,
    },
  ])

  // Q6 : Première Harley 10k€ (3)
  await db.insert(schema.forumAnswers).values([
    {
      content: 'Avec 10 000 €, tu peux trouver :\n\n- **Sportster 883/1200** (2007-2015) : 5 000-8 000 €. Fiable, facile, parfait pour débuter\n- **Softail Standard/Deluxe** (2000-2009) : 7 000-10 000 €. Look rétro, Twin Cam 88\n- **Dyna Super Glide** (2006-2012) : 7 000-10 000 €. Plus sportive\n\nÉvite les Sportster pré-2004 (vibrations) et les Twin Cam pré-2007 (problèmes de tendeurs).',
      questionId: questions[6].id,
      authorId: moderator.id,
      votes: 22,
      isAccepted: true,
    },
    {
      content: 'Je plussoie la Sportster 1200 Custom (2007-2013). Fiable, entretien simple, et tu trouves des exemplaires propres à 6 000-7 000 €. Tu gardes 3 000 € pour l\'équipement et les premières modifs.',
      questionId: questions[6].id,
      authorId: user1.id,
      votes: 10,
      isAccepted: false,
    },
    {
      content: 'N\'oublie pas le budget équipement : casque, blouson, gants, boots. Compte 1 000 € minimum. Et prévois 500-800 € pour l\'assurance la première année (jeune conducteur).',
      questionId: questions[6].id,
      authorId: user5.id,
      votes: 8,
      isAccepted: false,
    },
  ])

  // Q7 : Boîte Dyna (2)
  await db.insert(schema.forumAnswers).values([
    {
      content: 'Ça ressemble à un problème de fourchette de sélecteur. La 2e et 3e partagent la même fourchette sur les Twin Cam. C\'est boîte à ouvrir malheureusement.\n\nAvant ça, vérifie le réglage du sélecteur au pied. Parfois un simple déréglage fait craquer les passages.',
      questionId: questions[7].id,
      authorId: user4.id,
      votes: 6,
      isAccepted: true,
    },
    {
      content: 'Vérifie aussi l\'huile de boîte. Si elle est brûlée ou qu\'il y a des limailles, c\'est mauvais signe. Essaie de la vidanger et de remettre de la Formulation+ (HD) ou de la Red Line Shockproof.',
      questionId: questions[7].id,
      authorId: user3.id,
      votes: 3,
      isAccepted: false,
    },
  ])

  // Q8 : Assurance Harley (3)
  await db.insert(schema.forumAnswers).values([
    {
      content: 'Pour ma Road Glide, je suis chez **AMV** (assurance moto spécialisée). 650 €/an tous risques, franchise 150 €. Bon service client, constat en ligne facile.\n\nÉvite les assurances généralistes (AXA, Allianz) qui ne connaissent pas la valeur des options et accessoires.',
      questionId: questions[8].id,
      authorId: user3.id,
      votes: 14,
      isAccepted: true,
    },
    {
      content: 'Je suis chez **April Moto** depuis 5 ans. 580 €/an pour ma Road King, avec assistance 0 km et prêt d\'un véhicule en cas de sinistre. Ils sont spécialisés moto et connaissent bien les Harley.',
      questionId: questions[8].id,
      authorId: moderator.id,
      votes: 9,
      isAccepted: false,
    },
    {
      content: 'Petite astuce : assure-toi en **tiers+vol+incendie** la première année, ça divise la prime par 2. Tu passes en tous risques l\'année suivante quand tu as du bonus.\n\nEt vérifie la clause "véhicule de prêt" : certains contrats incluent une moto de prêt en cas de sinistre.',
      questionId: questions[8].id,
      authorId: user5.id,
      votes: 7,
      isAccepted: false,
    },
  ])

  // Q9 : Meilleure année Sportster 883 (2)
  await db.insert(schema.forumAnswers).values([
    {
      content: 'La meilleure année pour une 883 : **2007-2013**.\n\nPourquoi :\n- Rubbermount (moins de vibrations) depuis 2004\n- Injection électronique (fini les carbus à régler) depuis 2007\n- EFI (Harley) : fiable, économique\n- Freinage amélioré (ABS dispo en option)\n\nÉvite les 2004-2006 : première génération Rubbermount avec des soucis de jeunesse. Évite aussi les pré-2004 : carbus, vibrations, allumage rupteur.',
      questionId: questions[9].id,
      authorId: user5.id,
      votes: 11,
      isAccepted: true,
    },
    {
      content: 'Je nuance : une 883 Evo (pré-2004) en bon état, c\'est une moto increvable. Le moteur Evo 883 est légendaire pour sa fiabilité. Mais il faut accepter les vibrations et l\'entretien carbu.\n\nSi tu es bricoleur, prends une Evo 1998-2003 (dernières avec démarreur amélioré). Si tu veux une moto clé en main, prends une 2007+.',
      questionId: questions[9].id,
      authorId: user1.id,
      votes: 6,
      isAccepted: false,
    },
  ])

  // Q10 : Hivernage Harley (2)
  await db.insert(schema.forumAnswers).values([
    {
      content: 'Ma checklist hivernage :\n\n1. **Plein d\'essence** + Stabilisateur (Sta-Bil)\n2. **Vidange d\'huile** (l\'huile usée contient des acides)\n3. **Batterie** : débranchée, sur un mainteneur (Optimate, 50 €)\n4. **Pression pneus** : gonflés à 3 bars pour éviter les déformations\n5. **Antirouille** : WD40 dans les cylindres (bougies déposées, 2 secondes de kick)\n6. **Couverture respirante** : pas de bâche plastique (condensation)\n\nAu printemps : vidange d\'huile neuve, batterie, vérification des freins, et c\'est reparti !',
      questionId: questions[10].id,
      authorId: user3.id,
      votes: 15,
      isAccepted: true,
    },
    {
      content: 'J\'ajouterais : surélève la moto (chandelle avant + arrière) pour soulager les suspensions et les pneus. Et n\'oublie pas d\'ouvrir le circuit de refroidissement (vidange liquide) si tu es dans une région très froide.',
      questionId: questions[10].id,
      authorId: moderator.id,
      votes: 5,
      isAccepted: false,
    },
  ])

  // Q11 : Road King vs Street Glide (2)
  await db.insert(schema.forumAnswers).values([
    {
      content: 'Pour 3 000 km de tour de France : **Street Glide**.\n\nLe fairing batwing change tout sur autoroute. Tu arrives frais après 500 km. L\'audio intégré est génial pour les longues lignes droites.\n\nLa Road King est plus polyvalente (look rétro, pare-brise amovible) mais moins protégée.\n\nSi tu fais 70% autoroute → Street Glide. Si tu fais 70% petites routes → Road King.',
      questionId: questions[11].id,
      authorId: user4.id,
      votes: 16,
      isAccepted: true,
    },
    {
      content: 'J\'ai fait 15 000 km en Europe avec ma Road King. Le pare-brise amovible est top : tu le mets pour l\'autoroute, tu l\'enlèves pour les cols. Les valises rigides sont pratiques. Et le look est intemporel.\n\nMon conseil : prends la Road King Special, avec les jantes noires et le noir mat, elle est magnifique.',
      questionId: questions[11].id,
      authorId: user3.id,
      votes: 9,
      isAccepted: false,
    },
  ])

  // Q12 : Surchauffe Fat Boy (2)
  await db.insert(schema.forumAnswers).values([
    {
      content: 'Normal... et pas normal. Les Milwaukee-Eight chauffent, c\'est un fait. Mais si le voyant s\'allume en roulage normal, il y a un souci.\n\nSolutions :\n1. **Vérifie le liquide de refroidissement** (niveau + purge)\n2. **Vérifie le thermostat** (peut rester fermé)\n3. **Ventilateur** : le capteur de température du radiateur est peut-être HS\n4. **Huile moteur** : une huile trop âgée refroidit moins bien\n\nSi tout est OK, monte un kit de refroidissement additionnel (Love Jugs ou equivalent, 300 $).',
      questionId: questions[12].id,
      authorId: moderator.id,
      votes: 8,
      isAccepted: true,
    },
    {
      content: 'J\'ai eu le même souci. C\'était le liquide de refroidissement qui n\'avait jamais été changé (2 ans). Une purge + remplissage au Liqui Moly et le problème a disparu.\n\nEt petit conseil : en ville, coupe le moteur aux feux rouges, ça fait une grosse différence.',
      questionId: questions[12].id,
      authorId: user4.id,
      votes: 4,
      isAccepted: false,
    },
  ])

  // Q13 : Conversion chaîne/courroie Shovelhead (2)
  await db.insert(schema.forumAnswers).values([
    {
      content: 'J\'ai fait cette conversion sur ma Shovelhead 1979. C\'est faisable mais coûteux.\n\nKit recommandé : **BDL Belt Drive** (kit complet 800-1 000 $)\n- Pas de modif du bras oscillant nécessaire (BDL fait un kit spécifique)\n- Pas de perte de puissance, au contraire (moins de friction)\n- Installation : environ 4 heures si tu es équipé\n\nAvantages : plus d\'entretien, plus propre, plus silencieux.',
      questionId: questions[13].id,
      authorId: user2.id,
      votes: 7,
      isAccepted: true,
    },
    {
      content: 'Alternative moins chère : kit **Prism Supply**. Environ 600 $, fabriqué aux US, bonne réputation.\n\nAttention : la conversion change l\'aspect visuel. Si tu veux garder un look d\'époque, garde la chaîne. Si tu roules beaucoup, passe en courroie.',
      questionId: questions[13].id,
      authorId: user1.id,
      votes: 3,
      isAccepted: false,
    },
  ])

  // Q14 : GPS moto (2)
  await db.insert(schema.forumAnswers).values([
    {
      content: '**Garmin Zumo XT2** sans hésiter. J\'ai le XT (ancien modèle) depuis 3 ans, il est parfait :\n- Écran lisible en plein soleil\n- Étanche (je suis dans la pluie)\n- Cartes Europe préchargées\n- Commandes au guidon possibles\n- Routage moto (évite les chemins de terre, priorise les virages)\n- Points d\'intérêt moto (concessions HD !)\n\nLe TomTom Rider 550 est bien mais moins complet niveau POI moto.',
      questionId: questions[14].id,
      authorId: user3.id,
      votes: 12,
      isAccepted: true,
    },
    {
      content: 'Pour un road trip de 2 semaines, prends un Garmin. Le téléphone : batterie qui chauffe, écran pas lisible au soleil, pas étanche. Mais pour le quotidien, Google Maps suffit.\n\nAstuce : avec le Zumo, tu peux planifier tes étapes sur Garmin BaseCamp (gratuit) et les transférer par WiFi.',
      questionId: questions[14].id,
      authorId: user4.id,
      votes: 6,
      isAccepted: false,
    },
  ])

  // Q15 : Side-car Softail (2)
  await db.insert(schema.forumAnswers).values([
    {
      content: 'C\'est possible mais il faut un kit d\'adaptation. Le problème des Softail, c\'est le mono-amortisseur arrière qui n\'est pas conçu pour la charge latérale d\'un side-car.\n\nSolutions :\n- **Champion Sidecars** : fait des kits spécifiques Softail\n- **Freedom Sidecars** : adaptables avec renfort de cadre\n- **DMC Sidecars** : français, très bon rapport qualité/prix\n\nPrévois un budget de 3 000-5 000 € avec l\'adaptation.',
      questionId: questions[15].id,
      authorId: admin.id,
      votes: 5,
      isAccepted: true,
    },
    {
      content: 'Pour ton chien, regarde du côté des side-cars **Cozy**. Ils sont plus petits, légers, parfaits pour un animal. Et ils font des adaptations pour Softail. Compte 2 mois de délai.\n\nAttention : le side-car change complètement le comportement de la moto. Fais un stage de pilotage side-car, c\'est très différent.',
      questionId: questions[15].id,
      authorId: user3.id,
      votes: 3,
      isAccepted: false,
    },
  ])

  console.log('  ✓ Forum answers created')

  // ── Articles Communauté ───────────────────────────────────

  const communityArticlesData = [
    // Existants (4)
    {
      title: 'J\'ai restauré une Ironhead 1975 en 2 ans',
      slug: 'restauration-ironhead-1975',
      content: `# Restauration Ironhead 1975 : le projet d'une vie\n\nIl y a deux ans, j'ai trouvé une Ironhead 1000 de 1975 dans une grange.\n\n## L'état initial\n\n- Moteur bloqué (pistons soudés)\n- Rouille généralisée\n- Faisceau électrique rongé\n- Selle déchirée\n\n## Le moteur\n\nAlésage, pistons neufs, soupapes rectifiées, roulements de vilo. Facture : 1 800 €.\n\n## Le résultat\n\n2 ans et 5 000 € plus tard, elle roule ! Pas parfaite mais elle a une âme.`,
      excerpt: 'Récit de la restauration complète d\'une Ironhead 1000 de 1975.',
      categoryId: cats[2].id,
      authorId: user1.id,
      status: 'approved',
      reviewedBy: admin.id,
      reviewedAt: '2025-09-01T10:00:00Z',
    },
    {
      title: 'Mon custom Sportster 1200 bobber',
      slug: 'custom-sportster-1200-bobber',
      content: `# Mon projet Sportster Bobber\n\nSportster 1200 Custom 2007 transformée en bobber.\n\n## Modifications\n\n- Cadre : boucle arrière coupée\n- Selle : bobber cuir marron\n- Réservoir : peanut 7,5 L\n- Échappement : shorty drag pipes\n- Guidon : drag bar\n- Peinture : gris métallisé + bandes racing\n\n## Budget : 2 500 €`,
      excerpt: 'Projet de customisation Sportster 1200 en bobber.',
      categoryId: cats[3].id,
      authorId: user2.id,
      status: 'pending',
    },
    {
      title: 'Avis sur les pneus Michelin Scorcher pour tourisme',
      slug: 'avis-pneus-michelin-scorcher',
      content: 'Salut, je voulais partager mon avis sur les pneus Michelin Scorcher 31 montés sur ma Yamaha MT-07. Très bonne tenue sur le sec, moins sur le mouillé.\n\n[Note du modérateur : sujet hors-sujet Harley, article rejeté]',
      excerpt: 'Test des pneus Michelin Scorcher sur moto japonaise.',
      categoryId: cats[0].id,
      authorId: user2.id,
      status: 'rejected',
      reviewedBy: admin.id,
      reviewedAt: '2025-10-05T09:00:00Z',
      rejectionReason: 'Sujet hors-sujet : ne concerne pas Harley-Davidson',
    },
    {
      title: 'Road Trip en solitaire : 15 jours dans les Alpes en Low Rider S',
      slug: 'road-trip-alpes-low-rider-s',
      content: `# 15 jours dans les Alpes en Low Rider S\n\n2 800 km de bonheur à travers les Alpes.\n\n## Parcours\n\nLyon → Briançon → Col Iseran → Galibier → Bonette → Nice → Gorges du Verdon → Grenoble → Lyon\n\n## Budget\n\nEssence 280 € + hébergement 600 € + nourriture 350 € + péages 45 € = ~1 300 €`,
      excerpt: 'Road trip solo de 15 jours dans les Alpes au guidon d\'une Low Rider S.',
      categoryId: cats[7].id,
      authorId: user3.id,
      status: 'approved',
      reviewedBy: moderator.id,
      reviewedAt: '2026-01-15T14:00:00Z',
    },
    // Nouveaux (6)
    {
      title: 'Mon premier Sturgis : le guide du débutant',
      slug: 'guide-debutant-sturgis',
      content: `# Première fois à Sturgis\n\nJ'ai vécu mon premier Sturgis en 2025. Voici ce que j'aurais aimé savoir avant.\n\n## Hébergement\n\n- Réserve 6 mois à l'avance\n- Les hôtels de Rapid City (30 km) sont chers (300 €/nuit)\n- Le camping au Buffalo Chip : 50 €/nuit, ambiance garantie\n- AirBnB dans le coin : 150-200 €/nuit\n\n## Sur place\n\n- Location de moto possible si tu viens en avion\n- Les concessions HD locales prêtent des motos d'essai (gratuit)\n- La bière est partout, reste hydraté\n- Le soleil tape fort (altitude 1 000 m)\n\n## Incontournables\n\n- Main Street : tous les jours\n- Buffalo Chip : concerts tous les soirs\n- Custom Show au HD Museum\n- Badlands National Park : à 1h de route, paysages lunaires\n- Mount Rushmore : cliché mais à voir\n\n## Budget\n\nCompte 2 500-3 000 € pour 7 jours (vol/hébergement/bouffe/activités).`,
      excerpt: 'Tout ce qu\'il faut savoir pour préparer son premier Sturgis : hébergement, budget, incontournables.',
      categoryId: cats[5].id,
      authorId: user5.id,
      status: 'approved',
      reviewedBy: admin.id,
      reviewedAt: '2025-09-20T10:00:00Z',
    },
    {
      title: 'Comment j\'ai appris la mécanique sur ma Sportster',
      slug: 'apprentissage-mecanique-sportster',
      content: `# Apprendre la mécanique sur une Sportster\n\nQuand j'ai acheté ma Sportster 883, je ne savais même pas changer une bougie. 3 ans plus tard, je fais mes vidanges, mes freins, et même ma distribution.\n\n## Pourquoi la Sportster est parfaite pour apprendre\n\n- **Moteur simple** : 2 cylindres, pas d'arbre à cames en tête\n- **Beaucoup d'espace** : on accède facilement à tout\n- **Communauté enorme** : tutos YouTube, forums, bouquins (Clymer)\n- **Pièces pas chères** : une vidange coûte 40 €, des plaquettes 50 €\n\n## Mes étapes\n\n1. **Lire le manuel d'atelier** (Clymer ou HD Factory)\n2. **Commencer petit** : vidange, bougies, filtre à air\n3. **Regarder des tutos** : Lowbrow Customs, Delboys Garage sur YouTube\n4. **Acheter les bons outils** : clé dynamométrique, douilles, Allen, Torx\n5. **Oser** : la première fois qu'on démonte un carbu, on a peur. Mais c'est en forgeant...\n\n## Le plus important\n\nUne Sportster, c'est simple. Si tu sais lire un schéma et suivre un tuto, tu peux tout faire. Les outils de base coûtent 200 €. Le manuel 50 €. Le reste, c'est de la pratique.`,
      excerpt: 'Apprendre la mécanique sur une Sportster 883 : conseils, outils, ressources pour débuter.',
      categoryId: cats[2].id,
      authorId: user5.id,
      status: 'approved',
      reviewedBy: moderator.id,
      reviewedAt: '2025-10-15T10:00:00Z',
    },
    {
      title: 'Road Trip en Écosse : 10 jours en Heritage Classic',
      slug: 'road-trip-ecosse-heritage-classic',
      content: `# Écosse en Heritage Classic\n\n10 jours, 2 500 km à travers les Highlands. Une expérience inoubliable.\n\n## Le parcours\n\n- **Jour 1-3** : Édimbourg → Loch Lomond → Glen Coe (500 km)\n- **Jour 4-6** : Glen Coe → Isle of Skye → Inverness (400 km)\n- **Jour 7-8** : Inverness → Loch Ness → Cairngorms (350 km)\n- **Jour 9-10** : Cairngorms → Glasgow → Édimbourg (400 km)\n\n## La moto\n\nHeritage Classic 114 : parfaite pour ce genre de voyage. Le pare-brise coupe le vent écossais, les valises sont pratiques, et le moteur a assez de couple pour les montées.\n\n## Points clés\n\n- La météo change toutes les 10 minutes : prévoir coupe-vent + pluie\n- Les routes sont étroites (surtout à Skye) mais en excellent état\n- Les Écossais sont adorables avec les motards\n- Les distilleries de whisky : arrêt obligatoire (et ramener une bouteille)\n- La NC500 (North Coast 500) : la route la plus belle du Royaume-Uni\n\n## Budget\n\n- Ferry Calais-Douvres : 150 € A/R (train sous la Manche : 300 €)\n- Hébergement B&B : 70-100 €/nuit\n- Essence : 250 €\n- Total : ~1 800 €`,
      excerpt: 'Récit d\'un road trip de 10 jours en Écosse au guidon d\'une Heritage Classic 114. Itinéraire, conseils, budget.',
      categoryId: cats[7].id,
      authorId: user4.id,
      status: 'approved',
      reviewedBy: admin.id,
      reviewedAt: '2026-02-20T10:00:00Z',
    },
    {
      title: 'Avis sur le kit cames Wood Performance sur Milwaukee-Eight 107',
      slug: 'avis-kit-cames-wood-performance',
      content: `# Kit cames Wood Performance : mon retour\n\nJ'ai monté les cames Wood Performance TW-555 sur mon Milwaukee-Eight 107 il y a 5 000 km. Voici mon retour.\n\n## Pourquoi ces cames\n\n- Profil mild : adapté à un usage routier\n- Couple amélioré entre 2 500 et 5 000 tr/min\n- Pas besoin de modifier les culasses\n\n## Installation\n\n- Fait par mon concessionnaire\n- Main-d'œuvre : 8 heures (800 €)\n- Kit cames : 450 €\n- Joints et consommables : 100 €\n- Reprog : 300 €\n\n## Résultat\n\n- **Couple** : nette amélioration à bas régime, la moto reprend dès 2 000 tr/min\n- **Puissance** : +8 ch au dyno (de 72 à 80 ch à la roue)\n- **Son** : plus rauque au ralenti\n- **Conso** : inchangée (5,8 L/100)\n\n## Verdict\n\nExcellent rapport qualité/prix. Pour 1 650 €, j'ai une moto qui a gagné en caractère sans perdre en fiabilité.`,
      excerpt: 'Retour d\'expérience sur le montage d\'un kit cames Wood Performance TW-555 sur Milwaukee-Eight 107.',
      categoryId: cats[3].id,
      authorId: user4.id,
      status: 'pending',
    },
    {
      title: 'Transformation de ma Dyna en club style',
      slug: 'dyna-club-style',
      content: `# Ma Dyna Super Glide en club style\n\nJ'ai transformé ma Dyna Super Glide 2009 en club style (aussi appelé "Dyna bro" style).\n\n## La base\n\nDyna Super Glide FXD 2009, Twin Cam 96, 45 000 km.\n\n## Modifications\n\n- **Guidon** : T-bar 12" (au lieu du guidon d'origine bas)\n- **Selle** : selle俱乐部 style (Saddlemen Step Up)\n- **Échappement** : 2-en-1 Bassani Road Rage\n- **Filtre à air** : screaming eagle nu\n- **Reprog** : Dynojet Power Vision\n- **Pneus** : Pirelli Angel GT\n- **Peinture** : noir mat avec logo Dyna en gris\n\n## Budget total\n\nEnviron 3 000 €.\n\n## Résultat\n\nLa moto a totalement changé de personnalité. Plus agressive, plus fun. Le guidon T-bar change la position de conduite (plus sportive). L'échappement Bassani sonne incroyablement bien.\n\nLe club style, c'est LA tendance chez les jeunes motards Harley aux US. Content d'avoir sauté le pas !`,
      excerpt: 'Transformation d\'une Dyna Super Glide 2009 en club style : guidon T-bar, selle Saddlemen, échappement Bassani.',
      categoryId: cats[3].id,
      authorId: user4.id,
      status: 'approved',
      reviewedBy: moderator.id,
      reviewedAt: '2026-03-10T10:00:00Z',
    },
    {
      title: 'Vente de ma collection de pièces Shovelhead',
      slug: 'vente-pieces-shovelhead',
      content: 'Je vends ma collection de pièces pour Shovelhead (1970-1984) :\n- 2 carburateurs S&S Super E (état neuf)\n- 1 allumage Crane Hi-4\n- Jeu de cylindres et pistons 80 ci\n- 1 culasse gauche complète\n\nPrix à débattre. Contactez-moi par MP.\n\n[Note du modérateur : annonce commerciale non autorisée. Utilisez la section emplois/prestations.]',
      excerpt: 'Vente de pièces détachées pour Shovelhead.',
      categoryId: cats[2].id,
      authorId: user1.id,
      status: 'rejected',
      reviewedBy: admin.id,
      reviewedAt: '2026-03-15T10:00:00Z',
      rejectionReason: 'Annonce commerciale : utiliser la section emplois/prestations',
    },
  ]

  await db.insert(schema.communityArticles).values(communityArticlesData).returning()
  console.log(`  ✓ ${communityArticlesData.length} community articles created`)

  // ── Offres d'emploi ───────────────────────────────────────

  const jobsData = [
    // Existants (5)
    {
      title: 'Mécanicien Moto Harley-Davidson Confirmé - Lyon',
      company: 'Harley-Davidson Lyon',
      location: 'Lyon (69)',
      type: 'CDI',
      description: `Nous recrutons un mécanicien confirmé spécialisé Harley-Davidson.\n\n## Missions\n\n- Diagnostic et réparation moteurs V-Twin (Evolution, Twin Cam, Milwaukee-Eight)\n- Entretien courant\n- Montage pièces aftermarket\n- Accueil client\n\n## Profil\n\n- 5 ans d'expérience minimum\n- Expérience Harley-Davidson exigée\n- Autonome, passionné\n\n## Avantages\n\n- 28-35k€ selon expérience\n- Mutuelle\n- Remise pièces\n- Prêt moto le week-end`,
      contactEmail: 'recrutement@hd-lyon.fr',
      salaryRange: '28-35k€',
      companyWebsite: 'https://www.harley-davidson-lyon.com',
      postedById: admin.id,
      approved: true,
      createdAt: '2025-11-01T08:00:00Z',
    },
    {
      title: 'Développeur Web pour site e-commerce pièces moto',
      company: 'MotoParts France',
      location: 'Télétravail',
      type: 'Freelance',
      description: `Mission de 6 mois pour plateforme e-commerce pièces moto.\n\n## Missions\n\n- Développement frontend (Nuxt.js / Vue.js)\n- Optimisation Core Web Vitals\n- Intégration API paiement/transport\n\n## Profil\n\n- Expérience Nuxt.js / Vue.js\n- Connaissance milieu moto appréciée\n\n## Conditions\n\n- Full remote\n- TJM 400-500€\n- 6 mois renouvelable`,
      contactEmail: 'jobs@motoparts.fr',
      salaryRange: '400-500€/jour',
      companyWebsite: 'https://motoparts.fr',
      postedById: moderator.id,
      approved: true,
      createdAt: '2025-12-01T09:00:00Z',
    },
    {
      title: 'Stage Community Manager - Passionné Moto',
      company: 'BlogHarley',
      location: 'Paris (75)',
      type: 'Stage',
      description: `Stage Community Manager passionné d'univers moto.\n\n## Missions\n\n- Animation Instagram/Facebook\n- Création Reels/stories\n- Modération\n- Organisation événements\n\n## Profil\n\n- Passionné moto (Harley +)\n- Créatif, autonome\n- Bac+3 min\n\n## Infos\n\n- 6 mois\n- Gratification + tickets resto\n- Embauche possible`,
      contactEmail: 'rh@blogharley.com',
      salaryRange: 'Gratification légale + tickets resto',
      postedById: admin.id,
      approved: true,
      createdAt: '2026-01-05T10:00:00Z',
    },
    {
      title: 'Customiseur moto indépendant cherche partenariat atelier',
      company: 'Custom Kings',
      location: 'Bordeaux (33)',
      type: 'Prestation',
      description: `Custom Kings cherche un customiseur indépendant pour collaboration régulière.\n\n## Profil\n\n- Soudure TIG\n- Carrosserie aluminium\n- Cadres rigides/hardtail\n- Outillage personnel\n\n## Conditions\n\n- Travail à façon\n- Rémunération au projet\n- Espace dans l'atelier fourni`,
      contactEmail: 'contact@customkings.fr',
      salaryRange: 'À discuter selon projets',
      postedById: user2.id,
      approved: false,
      createdAt: '2026-02-10T11:00:00Z',
    },
    {
      title: 'Vendeur Magasin Harley-Davidson - Paris',
      company: 'Harley-Davidson Paris',
      location: 'Paris (75)',
      type: 'CDI',
      description: `Concession Harley-Davidson Paris 12e recrute un vendeur confirmé.\n\n## Missions\n\n- Vente motos neuves/occasions\n- Vente équipements\n- Fidélisation\n- Essais moto\n- Événements\n\n## Profil\n\n- Expérience vente moto\n- Connaissance gamme HD\n- Permis A obligatoire\n\n## Package\n\n- 35-50k€ (fixe + variable)\n- Moto de fonction\n- Mutuelle\n- Formations US`,
      contactEmail: 'rh@hd-paris.com',
      salaryRange: '35-50k€',
      companyWebsite: 'https://www.harley-davidson-paris.com',
      postedById: moderator.id,
      approved: false,
      createdAt: '2026-03-01T08:00:00Z',
    },
    // Nouveaux (5)
    {
      title: 'Responsable Atelier Harley-Davidson - Marseille',
      company: 'Harley-Davidson Marseille',
      location: 'Marseille (13)',
      type: 'CDI',
      description: `Nous recrutons un responsable d'atelier pour notre concession marseillaise.\n\n## Missions\n\n- Management d'une équipe de 4 mécaniciens\n- Organisation et planning de l'atelier\n- Diagnostic des pannes complexes\n- Relation client technique\n- Contrôle qualité\n\n## Profil\n\n- 8 ans d'expérience minimum en mécanique moto\n- 3 ans d'expérience en management\n- Expertise Harley-Davidson indispensable\n- Permis A\n\n## Avantages\n\n- 38-45k€ selon profil\n- Prime sur objectifs atelier\n- Véhicule de fonction\n- Mutuelle famille\n- Formations continues (déplacements US possibles)`,
      contactEmail: 'marseille@hd-hr.com',
      salaryRange: '38-45k€',
      companyWebsite: 'https://www.harley-davidson-marseille.com',
      postedById: admin.id,
      approved: true,
      createdAt: '2026-01-15T09:00:00Z',
    },
    {
      title: 'Photographe moto événementiel recherché',
      company: 'MotoEvent Media',
      location: 'Télétravail + déplacements',
      type: 'Freelance',
      description: `Nous couvrons les plus grands événements moto en France (Sturgis France, Bike Week Lyon, rassemblements HD) et cherchons un photographe freelance.\n\n## Missions\n\n- Couverture photo des événements (10-12 week-ends par an)\n- Photos studio pour concessions HD\n- Contenu pour réseaux sociaux\n- Retouche et livraison sous 48h\n\n## Profil\n\n- Portfolio moto existant\n- Équipement professionnel (boîtier + optiques)\n- Autonome en déplacement\n- Permis B + véhicule\n- Connaissance du milieu Harley appréciée\n\n## Conditions\n\n- 500-800€/événement (forfait)\n- Déplacements et hébergement pris en charge\n- Possibilité de CDI à terme`,
      contactEmail: 'studio@motoeventmedia.fr',
      salaryRange: '500-800€/événement',
      companyWebsite: 'https://motoeventmedia.fr',
      postedById: moderator.id,
      approved: true,
      createdAt: '2026-02-01T10:00:00Z',
    },
    {
      title: 'Assistant Commercial pièces détachées - Nice',
      company: 'Moto Parts Sud',
      location: 'Nice (06)',
      type: 'CDD',
      description: `Moto Parts Sud, distributeur de pièces détachées moto sur la Côte d'Azur, recrute un assistant commercial.\n\n## Missions\n\n- Accueil client physique et téléphonique\n- Conseil technique et vente de pièces\n- Gestion des commandes fournisseurs\n- Inventaire et réassort\n- Expédition des commandes en ligne\n\n## Profil\n\n- Formation en mécanique moto souhaitée\n- Connaissance des catalogueurs (Parts Finder)\n- Aisance relationnelle\n- Passionné moto\n\n## Infos\n\n- CDD 12 mois (renouvelable)\n- 25-30k€\n- Du mardi au samedi\n- Mutuelle + tickets resto`,
      contactEmail: 'rh@motopartssud.com',
      salaryRange: '25-30k€',
      companyWebsite: 'https://motopartssud.com',
      postedById: admin.id,
      approved: true,
      createdAt: '2026-02-20T08:00:00Z',
    },
    {
      title: 'Designer graphique pour marque de vêtements moto',
      company: 'Biker Wear Studio',
      location: 'Télétravail',
      type: 'Freelance',
      description: `Marque de vêtements moto style biker cherche un designer graphique pour créer notre collection printemps/été.\n\n## Missions\n\n- Création de motifs et graphismes pour T-shirts, hoodies, patches\n- Déclinaison couleurs\n- Fichiers prêts à imprimer (séparation couleurs)\n- Direction artistique des shootings\n\n## Profil\n\n- Portfolio avec univers moto/biker\n- Maîtrise Illustrator, Photoshop\n- Connaissance des techniques d'impression sérigraphie/broderie\n\n## Conditions\n\n- Mission de 3 mois\n- Forfait 8 000 €\n- Possibilité de collaboration longue durée`,
      contactEmail: 'studio@bikerwearstudio.com',
      salaryRange: '8 000 € (forfait 3 mois)',
      companyWebsite: 'https://bikerwearstudio.com',
      postedById: user5.id,
      approved: false,
      createdAt: '2026-03-05T11:00:00Z',
    },
    {
      title: 'Mécanicien itinérant pour rassemblements HD',
      company: 'Moto Assist Pro',
      location: 'France entière (déplacements)',
      type: 'Prestation',
      description: `Nous recherchons des mécaniciens moto indépendants pour assurer la couverture technique des rassemblements HD en France.\n\n## Le concept\n\nNos mécaniciens itinérants se déplacent sur les rallyes et événements HD pour proposer :\n- Vidanges et entretiens sur place\n- Diagnostics électroniques\n- Réparations d'urgence\n- Montage de pièces\n\n## Profil\n\n- Minimum 5 ans d'expérience\n- Expertise Harley-Davidson\n- Camion atelier équipé\n- Mobilité nationale (15-20 WE par an)\n\n## Conditions\n\n- Rémunération au pourcentage (70% pour vous, 30% pour la plateforme)\n- Revenu estimé : 40-60k€/an\n- Zone géographique attribuée`,
      contactEmail: 'team@motoassistpro.com',
      salaryRange: '40-60k€/an estimé',
      companyWebsite: 'https://motoassistpro.com',
      postedById: moderator.id,
      approved: true,
      createdAt: '2026-03-10T09:00:00Z',
    },
  ]

  await db.insert(schema.jobs).values(jobsData).returning()
  console.log(`  ✓ ${jobsData.length} jobs created`)

  // ── Résumé ────────────────────────────────────────────────
  console.log('\n✅ Seed completed!')
  console.log('\n📋 Résumé final :')
  console.log('   Utilisateurs        : 7')
  console.log('   Catégories          : 8')
  console.log('   Tags                : 38')
  console.log('   Articles blog       : 23')
  console.log('   Questions forum     : 16')
  console.log('   Réponses forum      : 33')
  console.log('   Articles comm.      : 10')
  console.log('   Offres emploi       : 10')
  console.log('\n🔑 Identifiants :')
  console.log('   Admin  : admin@blogharley.com / admin123')
  console.log('   Modo   : iron@eagle.com / password123')
  console.log('   Users  : road@king.com   | chopper@fan.com')
  console.log('         : sturgis@veteran.com | twincam@tom.com')
  console.log('         : biker@girl66.com')
  console.log('   (tous les users non-admin : password123)')
}

seed().catch((err) => {
  console.error('\n❌ Seed failed:', err)
  process.exit(1)
})
