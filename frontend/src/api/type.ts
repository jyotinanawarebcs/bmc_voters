// src/api/types.ts

// ====== OLD/V1 INTERFACES (Consider removing or marking as deprecated) ======
// export interface Voter {
//   id: number;
//   name: string;
//   ward: string;
//   booth: string;
//   serial: string;
//   image: string;
// }

// ====== NEW/V2 INTERFACES (Current API structure) ======

// Basic Voter interface (for lists, search results)
export interface Voter {
  id: number;
  voter_id: string | null;
  part_number: string | null;
  full_name: string | null;
  relative_name: string | null;
  house_no: string | null;
  age: string | null;
  gender: 'M' | 'F' | 'O' | null;
  gender_display?: string;
  photo_url: string | null;
  
  // Optional display fields
  ward?: string;
  serial?: string;
  booth?: string;
}

// Full Voter Profile Type (from backend)
export interface VoterProfile {
  id: number;
  voter_id: string | null;
  part_number: string | null;
  full_name: string | null;
  relative_name: string | null;
  house_no: string | null;
  age: string | null;
  gender: 'M' | 'F' | 'O' | null;
  gender_display?: string;
  photo_url: string | null;
  
  // Optional extended fields
  ward?: string;
  serial?: string;
  assembly_no?: string;
  village?: string;
  address?: string;
  polling_station?: string;
  mobile_number?: string;
  color_code?: string;
  voted_status?: boolean;
}

// Extended Voter Profile for UI with all required properties
export interface ProfileVoterData extends VoterProfile {
  votedStatus: boolean;
  relativeName: string;
  assemblyNo: string;
  village: string;
  houseNo: string;
  voterCardId: string;
  address: string;
  pollingStation: string;
  mobileStatus: string;
  colorCode: string;
  image: string;

  serial: string;
  age: string;
  gender: 'M' | 'F' | 'O' | null;  // ✔ correct
  booth: string;
  name: string; 
  ward?: string;
  gender_display?: string;
}

// Family Member type
export interface FamilyMember {
  id: number;
  full_name: string;
  relative_name?: string;
  age?: string;
  gender?: string;
  voter_id?: string;
  serial?: string;
  booth?: string;
  photo_url?: string;
  relation?: string;
}

// Extended Family Member for UI
export interface FamilyVoter extends FamilyMember {
  isCurrent?: boolean;
  serial: string; 
  booth: string;
  image: string;
  name: string; // Alias for full_name for UI compatibility
  ward?: string;
}

// ====== API RESPONSE INTERFACES ======

// Voter Profile API Response (if your backend returns nested structure)
export interface VoterProfileResponse {
  success: boolean;
  data: {
    voter: VoterProfile;
    family_members?: FamilyMember[];
  };
  message?: string;
}

// Generic API Response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  error?: string;   // optional, for error messages
  message?: string; // optional, for informational messages
}

// Pagination interfaces
export interface Pagination {
  current_page: number;
  total_pages: number;
  total_items: number;
  page_size: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface PaginationData {
  voters: Voter[];
  pagination: Pagination;
}

// ====== NAVIGATION TYPES ======
export type VoterProfileScreenParams = {
  voterId?: number;
  voterData?: ProfileVoterData;
};

// ====== OLD SAMPLE DATA (Consider removing or moving to a mock data file) ======
// export const SAMPLE_DATA: Voter[] = [
//   {
//     id: 1,
//     name: "Virendra Bhaskarrao Wagh",
//     ward: "Chalisgaon (Ward 1)",
//     booth: "0",
//     serial: "1",
//     image: "https://i.pravatar.cc/300?img=1",
//   },
//   // ... other sample data
// ];