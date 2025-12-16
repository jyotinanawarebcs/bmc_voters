// import { createStackNavigator } from "@react-navigation/stack";

// import VoterDetailScreen from "../screens/VoterDetailScreen";
// import { Voter } from "../api/type";

// export type RootStackParamList = {
//   Voters: undefined;
//   VoterDetail: { voter: Voter;
//     allVoters: Voter[];  
//    };
// };

// const Stack = createStackNavigator<RootStackParamList>();


import { Voter } from '../api/type';
import { ProfileVoterData } from '../api/type';

export type RootStackParamList = {
  Dashboard: undefined;
  VoterListScreen: undefined;
  VoterProfileScreen: { 
    voterId?: number;
    voterData?: ProfileVoterData;
  };
};