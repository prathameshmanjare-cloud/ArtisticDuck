export const contact = {
  phone: '+91 95959 87199',
  phoneHref: 'tel:+919595987199',
  whatsapp: 'https://wa.me/919595987199',
  email: 'admt.enquiry@gmail.com',
  address: 'Pune, Maharashtra',
}

// TODO: swap in the real handles once they are live.
export const socials = [
  { label: 'Instagram', href: 'https://instagram.com/' },
  { label: 'LinkedIn', href: 'https://linkedin.com/' },
  { label: 'YouTube', href: 'https://youtube.com/' },
  { label: 'Behance', href: 'https://behance.net/' },
]

export const nav = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/work' },
  { label: 'Careers', to: '/careers' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
]

export const services = [
  {
    slug: 'professional-shoots',
    icon: 'camera',
    title: 'Professional Shoots',
    short: 'Shoots',
    tone: '#ffb715',
    intro:
      'Frames that make people stop scrolling. From a single product on a sweep to a full ad film crew on location, we plan, light and shoot it.',
    points: [
      'Corporate shoots (office, team, brand identity)',
      'Product photography & videography',
      'Ad film production',
      'Cinematic storytelling shoots',
      'Event coverage (corporate & social)',
      'Drone shoots & aerial videography',
      'Model & influencer-based shoots',
      'Studio & on-location setups',
    ],
  },
  {
    slug: 'content-creation',
    icon: 'phone',
    title: 'Content Creation',
    short: 'Content',
    tone: '#ff751f',
    intro:
      'A steady feed of things worth watching. Strategy, scripts, reels, design and copy, planned on a calendar so your brand never goes quiet.',
    points: [
      'Social media content strategy',
      'Instagram reels & short-form videos',
      'YouTube video production & editing',
      'Scriptwriting & storytelling',
      'Graphic design (posts, banners, thumbnails)',
      'Motion graphics & animations',
      'Copywriting (captions, blogs, ads)',
      'Content calendar planning',
    ],
  },
  {
    slug: 'branding-advertising',
    icon: 'target',
    title: 'Branding & Advertisements',
    short: 'Branding',
    tone: '#bcd4f5',
    intro:
      'The name, the look, the voice and the campaigns that carry them. We build identities with a point of view, then put them in front of the right people.',
    points: [
      'Brand identity development (logo, color palette, typography)',
      'Brand positioning & strategy',
      'Campaign planning (online + offline)',
      'Ad creatives (visuals + copy)',
      'Print media ads (hoardings, brochures, pamphlets)',
      'Influencer marketing campaigns',
      'Rebranding & brand audits',
    ],
  },
  {
    slug: 'traditional-marketing',
    icon: 'store',
    title: 'Traditional Marketing',
    short: 'Traditional',
    tone: '#bfe6d0',
    intro:
      'Some customers are still found on the street, in the paper and on the radio. We run the offline side with the same discipline as the online one.',
    points: [
      'Newspaper & magazine ads',
      'Hoardings & outdoor advertising',
      'Flyer & pamphlet distribution',
      'Radio advertising',
      'Event-based promotions',
      'Local market activations',
      'Retail branding & POS materials',
    ],
  },
  {
    slug: 'digital-marketing',
    icon: 'chart',
    title: 'Digital Marketing',
    short: 'Digital',
    tone: '#ffb715',
    intro:
      'Paid, owned and earned, measured every week. Campaigns built around leads and conversions, with reports you can actually read.',
    points: [
      'Social media marketing (Instagram, Facebook, LinkedIn)',
      'Paid ads (Meta Ads, Google Ads)',
      'Performance marketing campaigns',
      'Email marketing campaigns',
      'Influencer collaborations',
      'Analytics & reporting',
      'Lead generation strategies',
      'Conversion optimization',
    ],
  },
  {
    slug: 'seo',
    icon: 'search',
    title: 'SEO',
    short: 'SEO',
    tone: '#ff751f',
    intro:
      'Get found by people already looking for you. Audits, keywords, technical fixes and local listings that compound month after month.',
    points: [
      'Website audit & SEO strategy',
      'Keyword research & planning',
      'On-page SEO optimization',
      'Technical SEO (site speed, indexing, schema)',
      'Off-page SEO (backlinks, outreach)',
      'Local SEO (Google My Business optimization)',
      'Monthly SEO reporting & insights',
    ],
  },
  {
    slug: 'full-stack-development',
    icon: 'code',
    title: 'Full Stack Development',
    short: 'Development',
    tone: '#bcd4f5',
    intro:
      'Websites and web apps that look like your brand and load like they mean it. Designed, built, launched and looked after in-house.',
    points: [
      'Website design (UI/UX)',
      'Frontend development (React, HTML, CSS)',
      'Backend development (APIs, databases)',
      'E-commerce website development',
      'CMS-based websites (WordPress, Shopify)',
      'Website maintenance & optimization',
      'Landing page design for campaigns',
      'Web app development',
    ],
  },
  {
    slug: 'event-management',
    icon: 'spark',
    title: 'Event Management',
    short: 'Events',
    tone: '#bfe6d0',
    intro:
      'Launches, stages and crowds. We handle the branding, the vendors and the run-of-show so the day goes the way it was planned.',
    points: [
      'Corporate events',
      'Brand launches & product launches',
      'Promotional events',
      'College & youth events',
      'Live shows & stage management',
      'Event branding & setup',
      'Vendor management',
      'End-to-end execution',
    ],
  },
]

// PLACEHOLDER: the portfolio, partner, award and client details are still being collected.
// Replace these slides with real work as soon as it is available.
export const showcase = [
  {
    tag: 'Portfolio',
    title: 'Launch films for first-time founders',
    body: 'Ad films, product shoots and reels made to introduce new brands to the world.',
    art: 'film',
  },
  {
    tag: 'Partnerships',
    title: 'One team across shoot, content and code',
    body: 'We partner with studios, creators and platforms so every project has the right hands on it.',
    art: 'link',
  },
  {
    tag: 'Awards',
    title: 'Recognition, in progress',
    body: 'Our shelf is being built one campaign at a time. Ask us about the work we are proudest of.',
    art: 'star',
  },
  {
    tag: 'Clients',
    title: 'Startups, retailers, colleges and corporates',
    body: 'From a two-person D2C label to multi-city events, the brief changes and the care does not.',
    art: 'grid',
  },
  {
    tag: 'Testimonials',
    title: '“They stopped being a vendor in week two.”',
    body: 'Founder, consumer startup, Pune. (Sample quote, replace with a real client testimonial.)',
    art: 'quote',
  },
]

// PLACEHOLDER: replace with real client logos.
export const clients = [
  'Northline', 'Kavya Foods', 'Studio Ember', 'Orbit Labs', 'Sahyadri Co.',
  'Bloom & Bark', 'Urban Tiffin', 'Maple Health', 'Tarang Events', 'Pixel Mill',
]

export const roles = [
  {
    group: 'Creative & Production',
    icon: 'camera',
    items: ['Video Editor Intern', 'Cinematographer Intern', 'Photographer Intern', 'Motion Graphics Designer'],
  },
  {
    group: 'Content & Social Media',
    icon: 'phone',
    items: ['Social Media Manager Intern', 'Content Writer / Scriptwriter', 'Reel Creator / Short-form Specialist'],
  },
  {
    group: 'Marketing & Strategy',
    icon: 'target',
    items: ['Digital Marketing Intern', 'Performance Marketing Intern', 'SEO Intern', 'Brand Strategy Intern'],
  },
  {
    group: 'Technical Roles',
    icon: 'code',
    items: ['Web Developer Intern (Frontend/Backend)', 'UI/UX Designer', 'Full Stack Developer Intern'],
  },
  {
    group: 'Event Management',
    icon: 'spark',
    items: ['Event Coordinator Intern', 'On-ground Execution Team'],
  },
]

// PLACEHOLDER: article topics until the blog content is finalised.
export const posts = [
  { cat: 'Branding', title: 'Brand before you scale: what a startup actually needs on day one', read: '6 min' },
  { cat: 'Content', title: 'Why your reels get views but not customers', read: '4 min' },
  { cat: 'SEO', title: 'Local SEO for Pune businesses, explained without jargon', read: '7 min' },
  { cat: 'Production', title: 'Planning a product shoot on a startup budget', read: '5 min' },
  { cat: 'Digital', title: 'Meta Ads vs Google Ads: where your first ₹50,000 should go', read: '8 min' },
  { cat: 'Events', title: 'The run-of-show checklist we use for every launch', read: '5 min' },
]
