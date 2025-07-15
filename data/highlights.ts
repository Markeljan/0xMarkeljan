export type Highlight = {
  /**
   * Index position within the contribution grid.
   * 0 is the top-left cell, counting column by column.
   */
  index: number;
  title: string;
  description: string;
  link?: string;
  level: number; // intensity 0-4
};

export const highlights: Highlight[] = [
  {
    index: 0,
    title: "First Lines of Code",
    description: "Started exploring programming and web development.",
    level: 1,
  },
  {
    index: 50,
    title: "ETHGlobal Hacks",
    description: "Participated in multiple ETHGlobal hackathons to sharpen my web3 skills.",
    link: "https://ethglobal.com/showcase",
    level: 3,
  },
  {
    index: 100,
    title: "w3gpt.ai",
    description: "Built an AI assistant for web3 developers.",
    link: "https://w3gpt.ai",
    level: 4,
  },
  {
    index: 150,
    title: "web3-sim",
    description: "A simulator for exploring blockchain governance.",
    link: "https://ethglobal.com/showcase/web3-sim-ssnxu",
    level: 4,
  },
  {
    index: 200,
    title: "midcurve live",
    description: "Streaming analytics dashboard built during ETHGlobal.",
    link: "https://ethglobal.com/showcase/midcurve-live-9eucp",
    level: 4,
  },
  {
    index: 250,
    title: "funny agents",
    description: "Analytics for memecoin agents.",
    link: "https://agents.funny.money/analytics",
    level: 2,
  },
  {
    index: 300,
    title: "Open Source Contributions",
    description: "Ongoing GitHub contributions and personal projects.",
    link: "https://github.com/markeljan",
    level: 3,
  },
];
