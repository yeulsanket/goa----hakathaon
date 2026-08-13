export const TITLES = [
  "THE SHIPPER",
  "THE ARCHITECT",
  "THE DEGEN ENGINEER",
  "THE PRODUCT ALCHEMIST",
  "THE NIGHT BUILDER",
  "THE DEBUGGER",
  "THE PROTOTYPER",
  "THE SYSTEM BREAKER",
  "THE AI ALCHEMIST",
  "THE FULL-STACK PIRATE",
  "THE 3AM SHIPPER",
  "THE IDEA MACHINE",
  "THE CODE SURFER",
  "THE MVP MACHINE",
  "THE CHAOS ENGINEER"
];

export function getRandomTitle(): string {
  const index = Math.floor(Math.random() * TITLES.length);
  return TITLES[index];
}

export function generateBuilderId(): string {
  // Generates something like HH-042
  const num = Math.floor(Math.random() * 999).toString().padStart(3, '0');
  return `HH-${num}`;
}
