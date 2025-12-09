// src/api/types.ts

export interface Voter {
  id: number;
  name: string;
  ward: string;
  booth: string;
  serial: string;
  image: string;
}

export const SAMPLE_DATA: Voter[] = [
  {
    id: 1,
    name: "Virendra Bhaskarrao Wagh",
    ward: "Chalisgaon (Ward 1)",
    booth: "0",
    serial: "1",
    image: "https://i.pravatar.cc/300?img=1",
  },
  {
    id: 2,
    name: "Shivanand Bhaskar Wagh",
    ward: "Chalisgaon (Ward 1)",
    booth: "0",
    serial: "2",
    image: "https://i.pravatar.cc/300?img=2",
  },
  // ... include all your 6 voter objects here
  {
    id: 3,
    name: "Arvind Bhalchandra",
    ward: "Chalisgaon (Ward 1)",
    booth: "0",
    serial: "6",
    image: "https://i.pravatar.cc/300?img=6",
  },

  {
    id: 4,
    name: "Revati Tushar Khairnar",
    ward: "Chalisgaon (Ward 1)",
    booth: "0",
    serial: "3",
    image: "https://i.pravatar.cc/300?img=3",
  },
  {
    id: 5,
    name: "Surekha Gorkhnath Dhage",
    ward: "Chalisgaon (Ward 1)",
    booth: "0",
    serial: "4",
    image: "https://i.pravatar.cc/300?img=4",
  },
  {
    id: 6,
    name: "Snehalata Bhalchandra",
    ward: "Chalisgaon (Ward 1)",
    booth: "0",
    serial: "5",
    image: "https://i.pravatar.cc/300?img=5",
  },
  
];