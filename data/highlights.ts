export type Highlight = {
  title: string;
  description: string;
  link?: string;
  level: number; // intensity 0-4
};

export const highlights: Highlight[] = [
  {
    title: "First Lines of Code",
    description: "Started exploring programming and web development.",
    level: 1,
  },
  {
    title: "ETHGlobal Hacks",
    description: "Participated in multiple ETHGlobal hackathons to sharpen my web3 skills.",
    link: "https://ethglobal.com/showcase",
    level: 3,
  },
  {
    title: "w3gpt.ai",
    description: "Built an AI assistant for web3 developers.",
    link: "https://w3gpt.ai",
    level: 4,
  },
  {
    title: "web3-sim",
    description: "A simulator for exploring blockchain governance.",
    link: "https://ethglobal.com/showcase/web3-sim-ssnxu",
    level: 4,
  },
  {
    title: "midcurve live",
    description: "Streaming analytics dashboard built during ETHGlobal.",
    link: "https://ethglobal.com/showcase/midcurve-live-9eucp",
    level: 4,
  },
  {
    title: "funny agents",
    description: "Analytics for memecoin agents.",
    link: "https://agents.funny.money/analytics",
    level: 2,
  },
  {
    title: "Open Source Contributions",
    description: "Ongoing GitHub contributions and personal projects.",
    link: "https://github.com/markeljan",
    level: 3,
  },
];
