// Structured content for the redesigned site. Business details stay in ./site.js.

// The four disciplines. `related` points at the detailed service slugs in site.js.
export const pillars = [
  {
    slug: 'branding-identity',
    num: '01',
    title: 'Branding & Identity',
    short: 'Branding',
    art: 'brand',
    accent: '#FFC107',
    tagline: 'Give your idea a face, a name and a voice.',
    summary:
      'Positioning, identity systems and brand voice built around the people you want to reach, so every touchpoint looks and sounds like one company.',
    overview:
      'A brand is the shortcut people use to decide whether to trust you. We start with strategy — who you are for, what you stand for and how you are different — and turn it into a visual and verbal system your team can use every day.',
    deliverables: [
      'Brand positioning & strategy',
      'Logo, colour palette & typography',
      'Visual identity system',
      'Brand voice & messaging',
      'Brand guidelines',
      'Rebranding & brand audits',
      'Brand photography & content style',
      'Launch assets',
    ],
    related: ['branding-advertising', 'professional-shoots', 'content-creation'],
  },
  {
    slug: 'advertising-campaigns',
    num: '02',
    title: 'Advertising & Creative Campaigns',
    short: 'Advertising',
    art: 'ads',
    accent: '#36C8E8',
    tagline: 'Ideas loud enough to be noticed, sharp enough to be remembered.',
    summary:
      'Campaign concepts, ad films, shoots, print, outdoor and influencer work — planned online and offline as one story.',
    overview:
      'Good campaigns start with one clear idea and carry it everywhere the audience is. We write the concept, produce the films, photographs and creatives, then plan where and when they run — from Instagram to hoardings to a launch stage.',
    deliverables: [
      'Campaign strategy & concepts',
      'Ad film production',
      'Product & corporate shoots',
      'Ad creatives (visuals + copy)',
      'Print, hoardings & outdoor',
      'Influencer campaigns',
      'Brand & product launch events',
      'Retail branding & POS',
    ],
    related: ['branding-advertising', 'professional-shoots', 'traditional-marketing', 'event-management'],
  },
  {
    slug: 'digital-marketing-growth',
    num: '03',
    title: 'Digital Marketing & Growth',
    short: 'Marketing',
    art: 'growth',
    accent: '#145BDB',
    tagline: 'Paid, owned and earned — measured every week.',
    summary:
      'Social, performance ads, SEO, content and email working together around leads and conversions, with reporting you can actually read.',
    overview:
      'Growth is a system, not a single channel. We set up the tracking, build the content engine, run paid campaigns and improve search visibility — then report on what moved and move budget to what works.',
    deliverables: [
      'Social media marketing',
      'Meta & Google Ads',
      'Performance campaigns',
      'SEO: technical, on-page & local',
      'Content strategy & calendars',
      'Email marketing',
      'Lead generation & conversion optimisation',
      'Analytics & monthly reporting',
    ],
    related: ['digital-marketing', 'seo', 'content-creation'],
  },
  {
    slug: 'technology-development',
    num: '04',
    title: 'Technology & Software Development',
    short: 'Technology',
    art: 'tech',
    accent: '#36C8E8',
    tagline: 'Websites, web apps and products that look like your brand and load like they mean it.',
    summary:
      'UI/UX, websites, e-commerce and custom web applications — designed, built, launched and looked after in-house.',
    overview:
      'We design and build the digital products your brand lives in: marketing sites, e-commerce stores, dashboards and web apps. Design and engineering sit in the same team, so what launches is what was designed.',
    deliverables: [
      'Product & UI/UX design',
      'Marketing websites & landing pages',
      'Web application development',
      'E-commerce (custom & Shopify)',
      'CMS builds (WordPress & headless)',
      'APIs, databases & integrations',
      'Performance & SEO-ready builds',
      'Maintenance & optimisation',
    ],
    related: ['full-stack-development'],
  },
]

export const process = [
  { k: 'Discover', d: 'We listen first: your business, your audience, your competitors and what success looks like.' },
  { k: 'Define', d: 'A clear strategy and plan — positioning, channels, scope and timeline — agreed before we design anything.' },
  { k: 'Design & build', d: 'Identity, creative, content and code produced by one team, reviewed with you at every milestone.' },
  { k: 'Launch & grow', d: 'We ship, measure and keep improving, with reporting that shows what is working.' },
]

export const industries = [
  {
    slug: 'saas',
    name: 'SaaS & Software',
    art: 'saas',
    accent: '#36C8E8',
    desc: 'Explain complex products simply, build a site that converts trials and keep a steady content engine running.',
    needs: ['Product positioning', 'Conversion-focused website', 'Product UI & marketing design', 'Content & SEO'],
    pillars: ['branding-identity', 'technology-development', 'digital-marketing-growth'],
  },
  {
    slug: 'ai',
    name: 'AI & Automation',
    art: 'ai',
    accent: '#145BDB',
    desc: 'Turn a technical capability into a story buyers trust, with interfaces and demos that make it tangible.',
    needs: ['Category & message clarity', 'Product interface design', 'Explainer content & demos', 'Launch campaigns'],
    pillars: ['branding-identity', 'technology-development', 'advertising-campaigns'],
  },
  {
    slug: 'fintech',
    name: 'FinTech',
    art: 'fintech',
    accent: '#FFC107',
    desc: 'Build credibility from the first impression — a brand, product experience and acquisition funnel that feel safe.',
    needs: ['Trust-led identity', 'Onboarding & app UI', 'Performance marketing', 'Explainer content'],
    pillars: ['branding-identity', 'technology-development', 'digital-marketing-growth'],
  },
  {
    slug: 'healthtech',
    name: 'HealthTech',
    art: 'health',
    accent: '#36C8E8',
    desc: 'Communicate care and clarity to patients, providers and partners, across digital and on-ground channels.',
    needs: ['Human, clear brand voice', 'Accessible web experiences', 'Awareness campaigns', 'Local SEO'],
    pillars: ['branding-identity', 'digital-marketing-growth', 'technology-development'],
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce & D2C',
    art: 'ecom',
    accent: '#FFC107',
    desc: 'Products that photograph well, stores that load fast and ads that pay for themselves.',
    needs: ['Product shoots & reels', 'Store design & build', 'Meta & Google Ads', 'Email & retention'],
    pillars: ['advertising-campaigns', 'technology-development', 'digital-marketing-growth'],
  },
  {
    slug: 'enterprise',
    name: 'Enterprise Technology',
    art: 'enterprise',
    accent: '#145BDB',
    desc: 'Make long sales cycles shorter with sharp positioning, credible content and digital platforms that scale.',
    needs: ['Corporate identity & films', 'Enterprise websites', 'Thought-leadership content', 'Events & launches'],
    pillars: ['branding-identity', 'advertising-campaigns', 'technology-development'],
  },
  {
    slug: 'edtech',
    name: 'EdTech',
    art: 'edtech',
    accent: '#FFC107',
    desc: 'Reach learners and parents where they spend time, and give them a platform that is easy to use.',
    needs: ['Youth-friendly branding', 'Learning platform UI', 'Short-form content', 'Lead generation'],
    pillars: ['branding-identity', 'digital-marketing-growth', 'technology-development'],
  },
  {
    slug: 'cloud-security',
    name: 'Cybersecurity & Cloud',
    art: 'security',
    accent: '#36C8E8',
    desc: 'Translate deep technical value into confidence for decision-makers, without the jargon.',
    needs: ['Positioning & messaging', 'Technical websites', 'Explainer videos', 'Search & LinkedIn growth'],
    pillars: ['branding-identity', 'technology-development', 'digital-marketing-growth'],
  },
]

export const goals = [
  {
    key: 'startup',
    label: 'Launch a startup',
    icon: 'spark',
    pitch: 'From name and logo to a launch-ready website and first campaign, in one plan.',
    pillars: ['branding-identity', 'technology-development', 'advertising-campaigns'],
    type: 'Brand identity',
    cta: 'Plan my launch',
  },
  {
    key: 'saas',
    label: 'Build a SaaS platform',
    icon: 'code',
    pitch: 'Product design, a web application and the marketing site that sells it.',
    pillars: ['technology-development', 'branding-identity', 'digital-marketing-growth'],
    type: 'Web application',
    cta: 'Scope my platform',
  },
  {
    key: 'ai',
    label: 'Develop an AI product',
    icon: 'target',
    pitch: 'Interfaces, positioning and launch content that make an AI product easy to understand and buy.',
    pillars: ['technology-development', 'branding-identity', 'advertising-campaigns'],
    type: 'Web application',
    cta: 'Talk about my AI product',
  },
  {
    key: 'transform',
    label: 'Transform an existing business',
    icon: 'store',
    pitch: 'A brand refresh, a modern website and digital channels that bring in new customers.',
    pillars: ['branding-identity', 'technology-development', 'digital-marketing-growth'],
    type: 'Rebrand',
    cta: 'Start the transformation',
  },
  {
    key: 'brand',
    label: 'Build a brand',
    icon: 'camera',
    pitch: 'Strategy, identity, photography and content that make people remember you.',
    pillars: ['branding-identity', 'advertising-campaigns'],
    type: 'Brand identity',
    cta: 'Build my brand',
  },
  {
    key: 'growth',
    label: 'Scale digital growth',
    icon: 'chart',
    pitch: 'Performance ads, SEO and content working together, reported every month.',
    pillars: ['digital-marketing-growth', 'advertising-campaigns'],
    type: 'Digital marketing',
    cta: 'Grow my numbers',
  },
]

export const projectTypes = [
  'Brand identity',
  'Rebrand',
  'Advertising campaign',
  'Ad film / shoot',
  'Digital marketing',
  'SEO',
  'Website',
  'Web application',
  'E-commerce',
  'Event',
]

export const budgets = ['Under ₹1 lakh', '₹1–3 lakh', '₹3–10 lakh', '₹10 lakh+', 'Not sure yet']

// PLACEHOLDER: these are capability studies that show how we approach each type of project.
// They are not client case studies. Replace them with real projects, screenshots and approved results.
export const work = [
  {
    slug: 'd2c-brand-launch',
    title: 'Launch system for a D2C food label',
    cat: 'Branding',
    sector: 'E-commerce & D2C',
    art: 'ecom',
    accent: '#FFC107',
    size: 'xl',
    summary: 'Identity, packaging direction, product shoot and launch content for a new consumer brand.',
    challenge:
      'A first-time founder with a great product and no brand: no name system, no visual identity, no photography and a launch date three months out.',
    strategy:
      'Position the brand around one simple promise, define the audience, and plan a launch that runs across Instagram, a lightweight store and a handful of retail shelves.',
    creative:
      'A warm, appetite-led identity: bold wordmark, a colour system built from the product itself, and a photography style that works on a phone screen first.',
    development:
      'A fast Shopify storefront with product storytelling, plus a content calendar of reels and posts for the first eight weeks.',
    results:
      'What we would measure: store conversion rate, cost per first purchase, repeat order rate and organic reach in the launch window.',
    deliverables: ['Brand strategy', 'Identity system', 'Product shoot', 'Shopify store', 'Launch content'],
  },
  {
    slug: 'saas-website',
    title: 'Conversion website for a B2B SaaS product',
    cat: 'Technology',
    sector: 'SaaS & Software',
    art: 'saas',
    accent: '#36C8E8',
    size: 'lg',
    summary: 'Messaging, UI design and a fast React marketing site built to turn visitors into demo requests.',
    challenge:
      'A capable product explained in feature lists. Visitors could not tell who it was for or why it was better, and the site was slow on mobile.',
    strategy:
      'Lead with the customer problem, group features into three outcomes, and design one clear path to a demo on every page.',
    creative:
      'A clean product-led visual language: interface close-ups, simple diagrams and a restrained palette that lets the product shine.',
    development:
      'A component-based React site with a headless CMS for the marketing team, built for Core Web Vitals and search from day one.',
    results:
      'What we would measure: demo request rate, page speed scores, organic sign-ups and time to publish new pages.',
    deliverables: ['Messaging', 'UI/UX design', 'React website', 'CMS setup', 'SEO foundation'],
  },
  {
    slug: 'campaign-film',
    title: 'Brand film and campaign for a retail launch',
    cat: 'Advertising',
    sector: 'Retail',
    art: 'film',
    accent: '#FFC107',
    size: 'md',
    summary: 'Concept, ad film, stills and outdoor creative planned as one campaign.',
    challenge: 'A new store opening in a crowded market needed to be known in the neighbourhood before the doors opened.',
    strategy:
      'One idea carried across a 30-second film, social cut-downs, hoardings near the location and an opening-day activation.',
    creative: 'A story-led film shot on location, with stills captured on the same day for print and social.',
    development: 'Edited deliverables for every placement, plus a landing page with directions and offers.',
    results: 'What we would measure: footfall in opening weeks, reach and view-through rate, and offer redemptions.',
    deliverables: ['Campaign concept', 'Ad film', 'Photography', 'Outdoor', 'Launch event'],
  },
  {
    slug: 'growth-engine',
    title: 'Performance and SEO engine for a service business',
    cat: 'Marketing',
    sector: 'Local services',
    art: 'growth',
    accent: '#145BDB',
    size: 'md',
    summary: 'Tracking, paid campaigns, local SEO and monthly reporting set up as one growth system.',
    challenge: 'Leads came only from referrals. Ads had been tried before, with no tracking and no idea what worked.',
    strategy: 'Fix measurement first, then run small tests on Meta and Google, and build local search visibility in parallel.',
    creative: 'Ad creatives in sets of three to test messages, and landing pages matched to each campaign.',
    development: 'Conversion tracking, call tracking and a reporting dashboard the owner can read in five minutes.',
    results: 'What we would measure: cost per qualified lead, Google Business Profile actions and lead-to-customer rate.',
    deliverables: ['Tracking setup', 'Meta & Google Ads', 'Local SEO', 'Landing pages', 'Monthly reports'],
  },
  {
    slug: 'ai-product-ui',
    title: 'Interface and launch story for an AI tool',
    cat: 'Technology',
    sector: 'AI & Automation',
    art: 'ai',
    accent: '#36C8E8',
    size: 'lg',
    summary: 'Product UI, onboarding and launch content that make an AI workflow easy to understand.',
    challenge: 'A powerful model with an interface only engineers could use, and a launch audience of non-technical buyers.',
    strategy: 'Design around the job the user is trying to get done, and show the result before explaining the technology.',
    creative: 'A calm, confident interface with clear states for loading, results and errors, and short demo videos.',
    development: 'A responsive React front end connected to the existing APIs, with onboarding and usage analytics.',
    results: 'What we would measure: activation rate, time to first result, retention after week one and demo-to-trial rate.',
    deliverables: ['UX research', 'Product UI', 'Front-end build', 'Demo videos', 'Launch page'],
  },
  {
    slug: 'event-experience',
    title: 'Product launch event and content',
    cat: 'Advertising',
    sector: 'Corporate',
    art: 'event',
    accent: '#FFC107',
    size: 'xl',
    summary: 'Stage design, run-of-show, live coverage and post-event content for a product launch.',
    challenge: 'A launch that had to impress partners in the room and reach a much bigger audience online the same day.',
    strategy: 'Plan the event and the content together, so every key moment is staged, captured and published quickly.',
    creative: 'Event branding and stage visuals in the product identity, with a reveal moment designed for camera.',
    development: 'Vendor management, run-of-show, live photo and video coverage, and same-day edits for social.',
    results: 'What we would measure: attendance, live and same-day reach, partner enquiries and media pickups.',
    deliverables: ['Event branding', 'Stage design', 'Run-of-show', 'Live coverage', 'Same-day edits'],
  },
]

export const workCats = ['All', 'Branding', 'Advertising', 'Marketing', 'Technology']

// Articles written by the studio. Blocks: { p }, { h }, { ul: [] }, { quote }.
export const articles = [
  {
    slug: 'brand-before-you-scale',
    cat: 'Branding',
    title: 'Brand before you scale: what a startup actually needs on day one',
    excerpt: 'You do not need a 60-page brand book to launch. You need five things done well, and the discipline to use them everywhere.',
    art: 'brand',
    date: '2026-10-28',
    featured: true,
    body: [
      { p: 'Most founders think of branding as a logo. The logo matters, but it is the last thing a customer remembers. What they remember is whether you were clear, consistent and believable every time they met you.' },
      { h: 'The five things to get right first' },
      { ul: [
        'One sentence that says who you are for and what you do for them.',
        'A name and wordmark that are easy to say, spell and search for.',
        'A small colour and type system — two typefaces, three to five colours.',
        'A voice: three adjectives that describe how you sound, and three that you never want to sound like.',
        'A photography or illustration style you can repeat without a big budget.',
      ] },
      { h: 'Why consistency beats perfection' },
      { p: 'A simple identity used the same way on your website, your Instagram grid, your invoices and your packaging builds recognition faster than a brilliant identity used differently everywhere. Write the rules down on two pages and share them with everyone who makes anything for the brand.' },
      { quote: 'Clarity first, consistency second, cleverness third.' },
      { h: 'When to invest more' },
      { p: 'Spend more on brand once you have proof that people want what you sell. That is when a full identity system, guidelines and a launch campaign start paying for themselves, because there is traffic to convert and a story to scale.' },
    ],
  },
  {
    slug: 'reels-views-not-customers',
    cat: 'Content',
    title: 'Why your reels get views but not customers',
    excerpt: 'Reach is not the problem. The gap is usually between what the video promises and what happens after someone taps your profile.',
    art: 'growth',
    date: '2026-10-14',
    body: [
      { p: 'Short-form video is the cheapest reach most brands have ever had. Yet many businesses see thousands of views and almost no enquiries. The video is rarely the only problem.' },
      { h: 'Check the path, not just the post' },
      { ul: [
        'Does the first line of your bio say what you sell and who it is for?',
        'Is there one obvious next step — a link, a WhatsApp button, a store?',
        'Do your pinned posts answer the questions a new visitor has?',
      ] },
      { h: 'Make content that pre-sells' },
      { p: 'Trends bring reach, but customers come from content that shows the product solving a real problem. Mix three kinds of reels: ones that entertain, ones that teach, and ones that show proof — the product in use, the process behind it, or a customer explaining why they chose you.' },
      { h: 'Measure the right thing' },
      { p: 'Track profile visits, link taps and enquiries per post, not just views. A reel with fewer views and more enquiries is the one to make more of.' },
    ],
  },
  {
    slug: 'local-seo-explained',
    cat: 'SEO',
    title: 'Local SEO for Pune businesses, explained without jargon',
    excerpt: 'If customers search for what you do plus “near me”, local SEO decides whether they find you or a competitor.',
    art: 'security',
    date: '2026-09-30',
    body: [
      { p: 'Local SEO is the work that helps your business show up when people nearby search for what you offer. For most service businesses and shops, it is the highest-intent traffic you can get.' },
      { h: 'Start with your Google Business Profile' },
      { ul: [
        'Use your real business name, the right primary category and accurate hours.',
        'Add real photos of your place, team and work — and keep adding them.',
        'Ask happy customers for reviews and reply to every review, good or bad.',
      ] },
      { h: 'Make your website agree with your profile' },
      { p: 'Your name, address and phone number should be written the same way on your website, your profile and directories. Add a page for each service you want to be found for, and mention the areas you serve in plain language.' },
      { h: 'Be patient, then compound' },
      { p: 'Local rankings move over weeks and months, not days. The businesses that win are the ones that keep posting updates, collecting reviews and improving their pages month after month.' },
    ],
  },
  {
    slug: 'product-shoot-startup-budget',
    cat: 'Production',
    title: 'Planning a product shoot on a startup budget',
    excerpt: 'A good shot list saves more money than any equipment choice. Here is how we plan shoots that cover a quarter of content in a day.',
    art: 'film',
    date: '2026-09-12',
    body: [
      { p: 'The most expensive part of a shoot is not the camera. It is the day you spend without a plan, and the second day you have to book because something was missed.' },
      { h: 'Plan the outputs first' },
      { p: 'List every place the images and videos will be used — website hero, product pages, Instagram grid, reels, ads, marketplace listings — and the format each one needs. Then design the shots backwards from that list.' },
      { h: 'Our one-day shot list structure' },
      { ul: [
        'Hero shots for each product on a clean background.',
        'Detail and texture shots for product pages.',
        'Lifestyle shots in context, with hands or people.',
        'Short vertical clips for reels and stories.',
        'Behind-the-scenes clips for organic content.',
      ] },
      { h: 'Reuse everything' },
      { p: 'Shoot horizontal and vertical versions of key moments, capture stills during video takes, and leave space in the frame for text. One well-planned day can feed weeks of content.' },
    ],
  },
  {
    slug: 'meta-ads-vs-google-ads',
    cat: 'Digital',
    title: 'Meta Ads vs Google Ads: where your first ₹50,000 should go',
    excerpt: 'Google captures demand that already exists. Meta creates demand. Your first budget should follow how people buy what you sell.',
    art: 'fintech',
    date: '2026-08-26',
    body: [
      { p: 'Both platforms work. The question is which one matches how your customers decide to buy.' },
      { h: 'Choose Google when people already search for you' },
      { p: 'If customers type what you sell into a search bar — a dentist near me, CRM software for clinics, wedding photographer in Pune — Google Search puts you in front of them at the moment of intent.' },
      { h: 'Choose Meta when you need to be discovered' },
      { p: 'If your product is new, visual or an impulse purchase, people may not know to search for it. Instagram and Facebook let you reach the right audience and show them why they should care.' },
      { h: 'Split the first budget into tests' },
      { ul: [
        'Set up conversion tracking before spending anything.',
        'Run two or three small campaigns with different messages.',
        'Judge them on cost per enquiry or sale, not clicks.',
        'Move budget to what works and cut what does not, every week.',
      ] },
    ],
  },
  {
    slug: 'launch-run-of-show',
    cat: 'Events',
    title: 'The run-of-show checklist we use for every launch',
    excerpt: 'Great launches feel effortless because every minute is written down. This is the structure behind ours.',
    art: 'event',
    date: '2026-08-08',
    body: [
      { p: 'A run-of-show is a minute-by-minute script for an event. It is the single document that keeps the stage, the vendors, the camera team and the client in sync.' },
      { h: 'What goes in it' },
      { ul: [
        'Every segment with start time, duration and owner.',
        'Cues for lights, sound, screens and stage movement.',
        'Who is on stage, where they enter and where they exit.',
        'Moments the camera team must capture, marked clearly.',
        'A backup plan for the three things most likely to go wrong.',
      ] },
      { h: 'Rehearse the transitions' },
      { p: 'Speeches rarely go wrong. Transitions do — the gap between a video ending and a speaker walking on. Rehearse every handover at least once with the full crew.' },
      { h: 'Plan the content, not just the event' },
      { p: 'Decide in advance which moments will be posted the same day, who edits them and who approves them. The event lasts a few hours; the content keeps working for weeks.' },
    ],
  },
]

export function readingTime(article) {
  const words = article.body
    .map((b) => b.p || b.h || b.quote || (b.ul || []).join(' '))
    .join(' ')
    .split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}
