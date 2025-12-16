import axios from 'axios';
import { Platform } from 'react-native';
import { Voter, ApiResponse, PaginationData } from './type';
import { VoterProfileResponse } from './type';

const API_BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:8000/api'
    : 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

export const voterApi = {
 async getVoters(page = 1, pageSize = 6): Promise<PaginationData> {
  try {
    const response = await api.get('/voters/', { params: { page, page_size: pageSize } });
    
    // ADD DETAILED DEBUG LOGS
    console.log("📡 GET VOTERS API RESPONSE:");
    console.log("   URL:", `/voters/?page=${page}&page_size=${pageSize}`);
    console.log("   Status:", response.status);
    console.log("   First voter:", response.data?.data?.voters?.[0]);
    console.log("   First voter photo_url:", response.data?.data?.voters?.[0]?.photo_url);
    console.log("   Full response structure:", Object.keys(response.data));
    
    const apiResponse: ApiResponse<PaginationData> = response.data;
    
    if (apiResponse.success) {
      return apiResponse.data;
    }
    throw new Error(apiResponse.error || 'Failed to fetch voters');
  } catch (error: any) {
    console.error('API Error (getVoters):', error.message);
    throw error;
  }
},

  async searchVoters(query: string, page = 1, pageSize = 20): Promise<PaginationData> {
    try {
      const response = await api.get('/voters/search/', { params: { query, page, page_size: pageSize } });
      const apiResponse: ApiResponse<PaginationData> = response.data;
      if (apiResponse.success) return apiResponse.data;
      throw new Error(apiResponse.error || 'Search failed');
    } catch (error: any) {
      console.error('API Error (searchVoters):', error.message);
      throw error;
    }
  },

//   async getVoterById(id: number): Promise<Voter> {
//     try {
//       const response = await api.get(`/voters/${id}/`);
//       const apiResponse: ApiResponse<Voter> = response.data;
//       if (apiResponse.success) return apiResponse.data;
//       throw new Error(apiResponse.error || 'Voter not found');
//     } catch (error: any) {
//       console.error('API Error (getVoterById):', error.message);
//       throw error;
//     }
//   },


// voterApi.ts mein
 async getVoterById(id: number): Promise<any> {
  try {
    const response = await api.get(`/voters/${id}/`);
    
    // ADD DETAILED DEBUG LOGS
    console.log("📡 GET VOTER BY ID API RESPONSE:");
    console.log("   URL:", `/voters/${id}/`);
    console.log("   Status:", response.status);
    console.log("   Voter data:", response.data?.data);
    console.log("   Voter photo_url:", response.data?.data?.photo_url);
    console.log("   Full response structure:", Object.keys(response.data));
    
    return response.data;
  } catch (error: any) {
    console.error('API Error:', error.message);
    throw error;
  }
},
  async getVoterByVoterId(voterId: string): Promise<Voter> {
    try {
      const response = await api.get(`/voters/voter-id/${voterId}/`);
      const apiResponse: ApiResponse<Voter> = response.data;
      if (apiResponse.success) return apiResponse.data;
      throw new Error(apiResponse.error || 'Voter not found');
    } catch (error: any) {
      console.error('API Error (getVoterByVoterId):', error.message);
      throw error;
    }
  },
  
};
