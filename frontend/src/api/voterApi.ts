// import { Platform } from 'react-native';

// const BASE_URL = 
//   Platform.OS === "web" ? 'http://localhost:8000/api' : 'http://192.168.1.7:8000/api';

//   export interface Voter {
//   id: number;
//   voter_id: string;      // Add this
//   full_name: string;     // Add this
//   relative_name?: string;
//   part_number?: string;
//   house_no?: string;
//   age?: number;
//   gender?: string;
// }


// export async function getVoters(): Promise<Voter[]> {
//   const res = await fetch(`${BASE_URL}/voters/`);
//   if (!res.ok) throw new Error("Failed to fetch voters");
//   return res.json();
// }
