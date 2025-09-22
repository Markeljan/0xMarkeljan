export type Highlight = {
  /**
   * Unique identifier for the highlight used when syncing scroll and grid state.
   */
  id: string;
  /**
   * Absolute index in the contribution-style grid (0 is top-left, columns flow left to right).
   */
  index: number;
  /**
   * Order in which the highlight appears within the scroll narrative.
   */
  sequence: number;
  title: string;
  period: string;
  summary: string;
  description: string;
  tags: string[];
  intensity: 0 | 1 | 2 | 3 | 4;
  cta?: {
    label: string;
    href: string;
  };
  /**
   * Notes about future content (videos, embeds, etc.) that will be sourced later.
   */
  upcoming?: string;
};

export const highlights: Highlight[] = [
  {
    id: "origins",
    sequence: 0,
    index: 8,
    title: "Discovering the craft",
    period: "2017 → 2019",
    summary: "Honing fundamentals by cloning interfaces and remixing open source experiments.",
    description:
      "I started by recreating interfaces I admired, reverse engineering CSS tricks, and shipping tiny web tools. Those early nights of experimentation taught me how to move fast, listen to feedback, and iterate until interactions felt smooth.",
    tags: ["design systems", "experiments", "self-taught"],
    intensity: 1,
    upcoming: "Collect screenshots from the original experiments and archival tweets.",
  },
  {
    id: "devfolio",
    sequence: 1,
    index: 32,
    title: "Devfolio community builder",
    period: "2020",
    summary: "Mentored new builders and helped produce hackathon experiences across India.",
    description:
      "Working with Devfolio exposed me to relentless builders. I co-created playbooks for onboarding hackers, supported judging workflows, and helped teams translate raw ideas into demos that could shine in front of investors and judges.",
    tags: ["Devfolio", "mentorship", "community"],
    intensity: 2,
    cta: {
      label: "Explore Devfolio",
      href: "https://devfolio.co",
    },
    upcoming: "Embed highlight reels and testimonials from Devfolio events.",
  },
  {
    id: "ethglobal",
    sequence: 2,
    index: 63,
    title: "ETHGlobal marathons",
    period: "2021 → present",
    summary: "Became a regular at ETHGlobal, prototyping ambitious ideas under tight deadlines.",
    description:
      "ETHGlobal events taught me how to orchestrate design, product strategy, and smart contract development within 36 hours. The network I built there now drives collaborations, grants, and new product launches across the web3 ecosystem.",
    tags: ["ETHGlobal", "hackathons", "rapid prototyping"],
    intensity: 3,
    cta: {
      label: "Browse ETHGlobal showcases",
      href: "https://ethglobal.com/showcase",
    },
    upcoming: "Add clips from hackathon demos and behind-the-scenes threads.",
  },
  {
    id: "w3gpt",
    sequence: 3,
    index: 101,
    title: "w3gpt.ai co-pilot",
    period: "2023",
    summary: "Built an AI assistant that helps web3 teams ship faster by answering protocol questions in real-time.",
    description:
      "w3gpt.ai distills dense protocol documentation into conversational insights. I led the product vision, orchestrated the prompt architecture, and designed a clean interface that makes complex flows approachable for both developers and DAO operators.",
    tags: ["AI", "product design", "web3"],
    intensity: 4,
    cta: {
      label: "Visit w3gpt.ai",
      href: "https://w3gpt.ai",
    },
    upcoming: "Record a walkthrough of the onboarding flow and embed an interactive chat preview.",
  },
  {
    id: "web3sim",
    sequence: 4,
    index: 148,
    title: "web3-sim governance lab",
    period: "ETHGlobal Lisbon 2023",
    summary: "Simulated DAO votes with live forked state to help communities test proposals before they ship.",
    description:
      "The simulator replays on-chain activity inside a safe sandbox. I crafted the UX, mapped the architecture, and collaborated on smart contract integrations so DAOs can explore complex proposals without risking treasury funds.",
    tags: ["governance", "simulation", "ETHGlobal"],
    intensity: 4,
    cta: {
      label: "Read the ETHGlobal recap",
      href: "https://ethglobal.com/showcase/web3-sim-ssnxu",
    },
    upcoming: "Embed live proposal simulations pulled directly from the ETHGlobal showcase.",
  },
  {
    id: "midcurve",
    sequence: 5,
    index: 186,
    title: "Midcurve Live dashboards",
    period: "ETHGlobal New York 2023",
    summary: "Delivered streaming analytics for DeFi strategists with a playful, data-rich UI.",
    description:
      "Midcurve Live transforms market structure into an understandable dashboard. I focused on realtime visualizations, color systems for risk, and orchestrated the narrative that helped the project stand out among finalists.",
    tags: ["data viz", "streaming", "defi"],
    intensity: 4,
    cta: {
      label: "See the showcase entry",
      href: "https://ethglobal.com/showcase/midcurve-live-9eucp",
    },
    upcoming: "Bring in animated charts and recorded commentary from the demo stage.",
  },
  {
    id: "funnyagents",
    sequence: 6,
    index: 231,
    title: "funny agents",
    period: "2024",
    summary: "Launched analytics that track on-chain humor markets and agent behavior in real time.",
    description:
      "funny agents celebrates playful corners of crypto. I led the product direction, designing a narrative-driven analytics surface that helps communities understand memecoin liquidity and the characters moving it.",
    tags: ["analytics", "storytelling", "on-chain"],
    intensity: 3,
    cta: {
      label: "Open funny agents",
      href: "https://agents.funny.money/analytics",
    },
    upcoming: "Source highlight clips of the dashboard reacting to viral launches.",
  },
  {
    id: "opensource",
    sequence: 7,
    index: 274,
    title: "Open source + GitHub",
    period: "Ongoing",
    summary: "Documenting experiments and reusable components across public repos.",
    description:
      "Everything from smart-contract quickstarts to polished UI components lives in my GitHub. Sharing the source keeps the community involved and invites contributors to riff on my prototypes.",
    tags: ["github", "open source", "tooling"],
    intensity: 2,
    cta: {
      label: "View GitHub profile",
      href: "https://github.com/markeljan",
    },
    upcoming: "Integrate live contribution stats pulled from the GitHub API.",
  },
  {
    id: "signal",
    sequence: 8,
    index: 320,
    title: "Sharing the signal",
    period: "Now",
    summary: "Curating thoughts, threads, and product teardowns across X and beyond.",
    description:
      "I narrate my process in public to attract collaborators and mentors. Threads unpack product learnings, while quick sketches tease experiments before they reach production.",
    tags: ["storytelling", "public build", "community"],
    intensity: 2,
    cta: {
      label: "Follow on X",
      href: "https://x.com/0xsoko",
    },
    upcoming: "Embed rolling highlights from long-form threads and Spaces recordings.",
  },
];
