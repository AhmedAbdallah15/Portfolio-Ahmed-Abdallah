export const profile = {
  name: 'Ahmed Abdallah',
  role: 'Graphic designer & visual storyteller',
  email: 'ahmedabdallah0100152@gmail.com',
  phone: '+20 115 839 1166',
  phoneHref: 'tel:+201158391166',
  socials: [
    { label: 'Upwork', url: 'https://www.upwork.com/freelancers/ahmeda1775?mp_source=share' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ahmed-abdallah-mossad/' },
  ],
  introduction: 'I create visual identities and compelling artwork for conferences, medical congresses, and event communications. Expressive imagery, clear information, and a story worth remembering.',
};

export const categories = ['All work', 'Medical congresses', 'Pediatric stories', 'Destination & place'] as const;
export type Category = typeof categories[number];
export interface GalleryItem { id: string; caption: string }
export interface Project {
  slug: string; title: string; subtitle: string; year: string;
  category: Exclude<Category, 'All work'>; cover: string; color: string;
  overview: string; approach: string; deliverables: string[];
  pages: string; gallery: GalleryItem[]; event?: string;
}
const art = (id: string, caption: string): GalleryItem => ({ id, caption });

export const services = [
  { title: 'Conference key visuals', description: 'Hero artwork, headline treatments, and a visual identity that gives your event its own voice.' },
  { title: 'Medical event design', description: 'Clear, theme-led communication for healthcare audiences, with a human story at its heart.' },
  { title: 'Print & digital artwork', description: 'A consistent visual language across posters, event signage, invitations, and social campaigns.' },
  { title: 'Creative visual storytelling', description: 'Characters, environments, and atmosphere that turn a conference theme into a memorable world.' },
];

export const projects: Project[] = [
  {
    slug: 'efncc', title: 'EFNCC', subtitle: 'A storybook world of nutrition & care', year: '2026', category: 'Medical congresses', cover: 'p01-02', color: '#dce4d1', pages: '11–17',
    overview: 'An immersive botanical atmosphere brings the Nutrition & Child Care Conference into a warm, inviting visual world. Nutritional imagery and a storybook-inspired focal scene connect the medical theme with a sense of curiosity.',
    approach: 'Woodland elements carry the identity from the main poster into the event environment, hospitality, and digital campaign. Participant materials balance the expressive imagery with practical readability.',
    deliverables: ['Event key visual', 'Welcome & agenda stands', 'Sponsors board', 'Participation certificate', 'Hospitality print series', 'Participant badge', 'Registration & speaker campaign'],
    gallery: [art('p01-02','Conference key visual — nutrition, nature, and a storybook focal scene'),art('p12-01','Welcome stand'),art('p12-02','Digital agenda / QR stand'),art('p13-01','Sponsors board'),art('p13-02','Participation certificate design'),art('p14-01','Lunch signage'),art('p14-02','Lunch-box artwork'),art('p14-03','Coffee-break signage'),art('p15-01','Participant name badge'),art('p16-01','Registration campaign'),art('p16-02','Speaker announcement'),art('p17-01','Four-speaker announcement grid')],
  },
  {
    slug: 'pedo-alex', title: 'PEDO ALEX', subtitle: 'A little wonder. An entire ocean.', year: '2026', category: 'Medical congresses', cover: 'p04-05', color: '#d3e9e5', pages: '20–25',
    overview: 'An energetic marine-inspired identity for the Alexandria Pediatric Congress. Lively color, a central child character, and an ocean setting give the event an imaginative, recognizable visual story.',
    approach: 'The underwater identity extends into large-format welcome signage, participant materials, and the digital campaign. Marine textures and coordinated color link practical event communications with the main artwork.',
    deliverables: ['Event key visual', 'Welcome banner', 'Attendance certificate', 'Gala invitation', 'Coffee-break signage & badge', 'Registration & workshop posts', 'Speaker & event campaign'],
    gallery: [art('p04-05','Alexandria Pediatric Congress — marine-inspired key visual'),art('p21-01','Large-format welcome banner'),art('p22-01','Attendance certificate design'),art('p22-02','Gala dinner invitation'),art('p23-01','Coffee-break signage'),art('p23-02','Participant identification badge'),art('p24-01','Registration campaign'),art('p24-02','Pre-congress workshop announcement'),art('p25-01','Speaker announcement'),art('p25-02','Claim Your Victory — event campaign')],
  },
  {
    slug: 'aspec-26', title: 'ASPEC 26', subtitle: 'Clinical clarity, in vibrant cyan', year: '2026', category: 'Medical congresses', cover: 'p04-01', color: '#dcebee', pages: '6–10',
    overview: 'A bold title system and medical-inspired imagery establish an immediately recognizable identity for the Ain Shams Pediatric Congress. A vibrant cyan palette gives the conference a clear and confident presence.',
    approach: 'The identity moves between large-scale event communication and compact social formats. A welcome LED tower, agenda roll-up, sponsor recognition, digital campaign, and dinner invitation each adapt the same visual language to a different use.',
    deliverables: ['Event key visual', 'Welcome LED tower', 'Agenda QR roll-up', 'Sponsors board', 'Landscape event visual', 'Speaker & countdown posts', 'Dinner invitation'],
    gallery: [art('p04-01','Ain Shams Pediatric Congress — cyan conference key visual'),art('p07-01','Welcome / LED tower'),art('p07-02','Agenda QR / roll-up'),art('p08-01','Sponsors board'),art('p08-02','Landscape main event visual'),art('p09-01','Speaker announcement'),art('p09-02','Countdown and registration campaign'),art('p10-01','Printed dinner invitation — front'),art('p10-02','Printed dinner invitation — back')],
  },
  {
    slug: 'pediascape', title: 'Pediascape', subtitle: 'One city. Two different moods.', year: '2027', category: 'Destination & place', cover: 'p02-01', color: '#eadfca', pages: '33–34, 37',
    overview: 'Two complementary visual directions for the Cairo conference campaign. Childhood discovery and recognizable architecture connect the event identity to its setting.',
    approach: 'Golden hour uses a warm panoramic Cairo composition and an optimistic sense of exploration. The evening direction reimagines the same event theme through a dramatic dusk palette and architectural lighting. Both retain a coherent conference identity.',
    deliverables: ['Golden-hour key visual', 'Evening key visual', 'Visual mood study'],
    gallery: [art('p02-01','Golden hour — a child overlooking Cairo’s warm panoramic skyline'),art('p01-01','Evening atmosphere — dramatic architecture and a dusk palette')],
  },
  {
    slug: 'clinical-pearls', title: 'Pediatric Clinical Pearls', subtitle: 'A softer side of clinical communication', year: '2026', category: 'Medical congresses', cover: 'p04-03', color: '#e7e4ed', pages: '18',
    overview: 'A soft illustrated environment builds warmth and trust for the DK Pediatric Association conference. The artwork supports the clinical topic while keeping event information readable.',
    approach: 'A gentle palette, child-centered imagery, and a structured information layout bring a reassuring tone to the conference poster.',
    deliverables: ['Event key visual / poster'], gallery: [art('p04-03','Pediatric Clinical Pearls — soft illustrated conference poster')],
  },
  {
    slug: 'heart-is-life', title: 'Heart Is Life', subtitle: 'A medical message with a human heart', year: '2026', category: 'Medical congresses', cover: 'p04-04', color: '#ebdfdb', pages: '19',
    overview: 'A restrained red-and-white concept for the Annual International Congress. An emotive heart motif connects the medical message with a human story.',
    approach: 'Strong typography, a limited palette, and a central image create a direct, emotionally grounded conference visual.',
    deliverables: ['Event key visual / poster'], gallery: [art('p04-04','Heart Is Life — red-and-white congress key visual')],
  },
  {
    slug: 'endo-pedia-secrets', title: 'ENDO-PEDIA Secrets', subtitle: 'Clinical themes, a playful voice', year: '2026', category: 'Pediatric stories', cover: 'p26-01', color: '#d4e8e2', pages: '27–28',
    overview: 'Fresh mint textures, a playful typographic voice, and an expressive group portrait form a friendly, approachable pediatric conference campaign.',
    approach: 'The mint-led identity carries from the full event poster into a speaker spotlight and an eight-day countdown, keeping the visual language recognizable across social formats.',
    deliverables: ['Event key visual', 'Speaker spotlight', 'Countdown artwork'], gallery: [art('p26-01','ENDO-PEDIA Secrets — pediatric conference key visual'),art('p28-01','Speaker spotlight'),art('p28-02','08 days left — countdown artwork')],
  },
  {
    slug: 'pedia-forum', title: 'Pedia Forum', subtitle: 'Every journey begins with curiosity', year: '2026', category: 'Pediatric stories', cover: 'p04-06', color: '#eadbcf', pages: '29',
    overview: 'A cinematic shoreline, warm sunset lighting, and a journey-driven child character give the annual pediatric conference a strong sense of mood and movement.',
    approach: 'The shoreline becomes a narrative setting. Warm light and the child’s forward movement frame the event information within a story of exploration.',
    deliverables: ['Event key visual / poster'], gallery: [art('p04-06','Pedia Forum — child on a cinematic shoreline at sunset')],
  },
  {
    slug: 'pedia-mansoura', title: 'Pedia Mansoura', subtitle: 'A bright new world to explore', year: '2027', category: 'Pediatric stories', cover: 'p01-03', color: '#e3e6cf', pages: '30',
    overview: 'A bright explorer character and layered cityscape create a youthful event narrative for the Sixth Pediatric Conference.',
    approach: 'Expressive character imagery and local architectural layers are paired with a confident, structured system for the event information.',
    deliverables: ['Event key visual / poster'], gallery: [art('p01-03','Sixth Pedia Mansoura Conference — explorer character and layered cityscape')],
  },
  {
    slug: 'mapc-aswan', title: 'MAPC Aswan', subtitle: 'Rooted in a remarkable place', year: '2027', category: 'Destination & place', cover: 'p04-07', color: '#e5d8c4', pages: '32',
    overview: 'Ancient Egyptian architecture and Nubian-inspired motifs anchor the Medical Awareness Pediatric Conference in its host city.',
    approach: 'Historic landmarks, local culture, and warm desert tones become the foundation of a destination-led visual identity. The setting is part of the event’s story.',
    deliverables: ['Event key visual / poster'], gallery: [art('p04-07','MAPC Aswan — ancient Egyptian architecture and Nubian-inspired motifs')],
  },
  {
    slug: 'canal-pediatric', title: 'Canal Pediatric Conference', subtitle: 'Care, connection, and the spirit of Ismailia', year: '2027', category: 'Destination & place', cover: 'p35-01', color: '#dce6e7', pages: '35–36',
    overview: 'A playful, optimistic identity for the 5th International Canal Pediatric Conference. Puzzle-piece typography, colorful details, and joyful child imagery bring together care, collaboration, and the spirit of Ismailia.',
    approach: 'The main poster turns the number five into a colorful puzzle landmark. A companion conference board carries the same visual language into a clear hierarchy for leadership and event information.',
    event: '8–10 July 2027 · Tolip El Forsan Club, Ismailia',
    deliverables: ['Conference identity', 'Key visual / poster', 'Conference board'], gallery: [art('p35-01','Canal Pediatric Conference — puzzle-piece poster for the 5th International event'),art('p36-01','Companion conference leadership board')],
  },
  {
    slug: 'pedo-alex-2027', title: 'PEDO ALEX 2027', subtitle: 'A doorway to discovery in Alexandria', year: '2027', category: 'Medical congresses', cover: 'pedo-alex-2027', color: '#171b25', pages: 'Owner-supplied artwork',
    overview: 'A conference poster for the 2027 Alexandria Pediatric Congress, organized by the Egyptian Pediatric Association – Alexandria. A child steps through a blue doorway toward Alexandria’s waterfront, linking pediatric care with discovery and the city’s identity.',
    approach: 'A lighthouse title treatment, oversized pencil, painted textures, and local landmarks bring together learning and place. Warm orange and deep blue give the event details a clear visual hierarchy.',
    event: '25–26 May 2027 · Tolip Hotel, Alexandria',
    deliverables: ['Conference key visual / poster'], gallery: [art('pedo-alex-2027','PEDO ALEX 2027 — Alexandria Pediatric Congress, doorway and lighthouse key visual')],
  },
  {
    slug: 'el-beheira-pedia-forum', title: 'El-Beheira Pedia Forum', subtitle: 'A pediatric world drawn with imagination', year: '2027', category: 'Pediatric stories', cover: 'el-beheira-pedia-forum', color: '#171b25', pages: 'Owner-supplied artwork',
    overview: 'An El-Beheira Pedia Forum poster, in collaboration with Pediatricians Foundation in Egypt. A child drawing a colorful coastal cityscape establishes a playful, approachable visual language for the pediatric event.',
    approach: 'Crayon lettering, hand-drawn clouds, a smiling sun, and bright waterfront details carry the theme from the headline to the conference information. The supplied poster retains its original event and leadership details.',
    event: 'July 2027 · Tolip Hotel, Alexandria',
    deliverables: ['Conference key visual / poster'], gallery: [art('el-beheira-pedia-forum','El-Beheira Pedia Forum — colorful crayon lettering and child-drawn waterfront artwork')],
  },
  {
    slug: 'al-noor-al-shefaa-2027', title: 'Al Noor & Al Shefaa Hospital', subtitle: 'A light, uplifting pediatric conference identity', year: '2027', category: 'Medical congresses', cover: 'al-noor-al-shefaa-2027', color: '#171b25', pages: 'Owner-supplied artwork',
    overview: 'The 9th annual conference poster for Al Noor & Al Shefaa Hospital, in collaboration with El-Zayat Kids Clinics. A joyful child and flowing violet fabric form the central image around the theme “Towards Scientific Based Daily Practice.”',
    approach: 'A coordinated lavender palette, expressive fabric movement, and large serif typography create a light, uplifting composition. Structured bands organize the conference leadership, date, and location.',
    event: '21 January 2027 · Tanta, Egypt',
    deliverables: ['Conference key visual / poster'], gallery: [art('al-noor-al-shefaa-2027','Al Noor & Al Shefaa Hospital — 9th annual conference poster with violet fabric and child imagery')],
  },
];
