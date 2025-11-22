import { createStackNavigator } from "@react-navigation/stack";
import VotersScreen from "../screens/VotersScreen";
import VoterDetailScreen from "../screens/VoterDetailScreen";
import { Voter } from "../api/voterApi";

export type RootStackParamList = {
  Voters: undefined;
  VoterDetail: { voter: Voter;
    allVoters: Voter[];  
   };
};

const Stack = createStackNavigator<RootStackParamList>();
