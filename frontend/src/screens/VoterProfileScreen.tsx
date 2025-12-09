import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Switch, Image, useWindowDimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
// 💡 FIXED IMPORT: Removed StackNavigationProp and imported NavigationProp
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native'; 

// --- IMPORT TYPES and WRAPPER ---
import { Voter } from '../api/type'; // Assuming your base Voter type is here
import { RootStackParamList } from '../navigation/types'; 
import ScreenWrapper from "../navigation/ScreenWrapper";

// Define the full expected data structure for the profile screen
interface ProfileVoterData extends Voter {
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
    
    // 💡 FIX 1: Added missing properties
    age: string;    
    gender: string; 
}

// --- Mock Data Structure (Used as fallback/template) ---
const MOCK_VOTER_DATA: ProfileVoterData = {
    // Required Voter fields (adjust based on your actual Voter type)
    id: 0, 
    booth: '0', 
    name: "Vagh Shivanand Bhaskar",
    
    // Detailed Profile fields
    relativeName: "Wagh Bhaskar",
    ward: "1",
    serial: "2",
    
    // 💡 FIX 2: Added to mock data type compliance
    age: "52", 
    gender: "M",
    
    assemblyNo: "17/165/72",
    village: "Chalisgaon",
    houseNo: "NA",
    voterCardId: "ZUL1284405",
    address: "List Part No. 165 : 1-Maharana Pratap Housing Society, Chalisgaon",
    pollingStation: "0 -",
    mobileStatus: "Not Available",
    colorCode: "Other",
    votedStatus: false, 
    image: '', 
};

// Define the route type for this screen (for accessing parameters)
type VoterProfileScreenRouteProp = RouteProp<RootStackParamList, 'VoterProfileScreen'>;

// 💡 FIX 3: Define the navigation prop using NavigationProp
type VoterProfileNavigationProp = NavigationProp<
  RootStackParamList,
  'VoterProfileScreen' // Base screen for this component
>;


// ================= MAIN SCREEN COMPONENT =================
export default function VoterProfileScreen() {
    // 💡 FIX: Type the navigation hook correctly
    const navigation = useNavigation<VoterProfileNavigationProp>();
    const route = useRoute<VoterProfileScreenRouteProp>();
    
    // Merge data from route params with mock data as fallback
    const passedVoterData = route.params?.voterData;

    // Safely merge and assert the full expected type
    const voterData: ProfileVoterData = { 
        ...MOCK_VOTER_DATA, 
        ...(passedVoterData as unknown as Partial<ProfileVoterData>) 
    };
    
    const { width } = useWindowDimensions();
    const isWeb = Platform.OS === 'web' && width > 768; 

    const [activeTab, setActiveTab] = useState('Information');
    const [hasVoted, setHasVoted] = useState(voterData.votedStatus);

    // --- Detail Card Component ---
    const DetailCard = ({ label, value }: { label: string, value: string }) => (
        <View style={styles.detailCard}>
            <Text style={styles.detailCardLabel}>{label}</Text>
            <Text style={styles.detailCardValue}>{value}</Text>
        </View>
    );

    // --- Block Section Component ---
    const BlockSection = ({ iconName, text }: { iconName: string, text: string }) => (
        <View style={styles.blockSection}>
            <Feather name={iconName as any} size={20} color="#777" style={{ marginRight: 15 }} />
            <Text style={styles.blockText}>{text}</Text>
        </View>
    );

    // 💡 NAVIGATION HANDLER: Redirects to VoterFamilyScreenAll
    const handleAllTabPress = () => {
        setActiveTab('All');
        
        // Navigation is now correctly typed and accepted
        navigation.navigate('VoterFamilyScreenAll', { 
            voterId: voterData.id || voterData.voterCardId,
            voterData: voterData
        });
    };
    
    // --- Information Tab Content ---
    const InformationContent = () => (
        <View>
            <View style={styles.statCardsRow}>
                <DetailCard label="WARD" value={voterData.ward} />
                <DetailCard label="SERIAL NO." value={voterData.serial} />
                <DetailCard label="AGE" value={voterData.age} />
                <DetailCard label="GENDER" value={voterData.gender} />
            </View>

            <View style={styles.infoGrid}>
                <DetailCard label="Relative's Name" value={voterData.relativeName} />
                <DetailCard label="Assembly No." value={voterData.assemblyNo} />
                <DetailCard label="Village" value={voterData.village} />
                <DetailCard label="House No." value={voterData.houseNo} />
                <DetailCard label="Voter Card ID" value={voterData.voterCardId} />
                <View style={{ flex: 1 }} />
            </View>

            <BlockSection iconName="home" text={`ADDRESS\n${voterData.address}`} />
            
            <BlockSection iconName="user" text={`POLLING STATION\n${voterData.pollingStation}`} />
        </View>
    );
    
    const TabContent = () => {
        if (activeTab === 'Information') return InformationContent();
        if (activeTab === 'Family') return <View style={styles.emptyTab}><Text style={{ color: '#888' }}>Family Content Here...</Text></View>
        return <View style={styles.emptyTab}><Text style={{ color: '#888' }}>Loading Family List...</Text></View>
    }


    return (
        <ScreenWrapper 
            activeMenuId="voterlist" 
            headerTitle={voterData.name}
            headerSubtitle={isWeb ? `Home > Voter Profile > ${voterData.name}` : undefined}
            showBackArrow={true}
        >
            <View style={styles.tabBarContainer}>
                <TouchableOpacity onPress={() => setActiveTab('Information')} style={[styles.tabButton, activeTab === 'Information' && styles.activeTabButton]}>
                    <View style={styles.tabContent}>
                        {activeTab === 'Information' && <View style={styles.activeDot} />}
                        <Text style={[styles.tabText, activeTab === 'Information' && styles.activeTabText]}>Information</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('Family')} style={[styles.tabButton, activeTab === 'Family' && styles.activeTabButton]}>
                    <View style={styles.tabContent}>
                        {activeTab === 'Family' && <View style={styles.activeDot} />}
                        <Text style={[styles.tabText, activeTab === 'Family' && styles.activeTabText]}>Family</Text>
                    </View>
                </TouchableOpacity>
                
                {/* NAVIGATION ON PRESS */}
                <TouchableOpacity onPress={handleAllTabPress} style={[styles.tabButton, activeTab === 'All' && styles.activeTabButton]}>
                    <View style={styles.tabContent}>
                         {activeTab === 'All' && <View style={styles.activeDot} />}
                        <Text style={[styles.tabText, activeTab === 'All' && styles.activeTabText]}>All</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.profileCard}>
                    {/* Profile Summary */}
                    <View style={styles.profileSummary}>
                        <Image source={{ uri: voterData.image }} style={styles.imagePlaceholder} />
                        <View style={styles.summaryDetails}>
                            <Text style={styles.profileName}>{voterData.name}</Text>
                            <View style={styles.activeTag}>
                                <Text style={styles.activeTagText}>Active Voter</Text>
                            </View>
                        </View>
                    </View>
                    
                    {/* Tab Content */}
                    <TabContent />
                    
                    {/* Action Footer */}
                    <View style={styles.actionFooter}>
                        <View style={styles.statusRow}>
                            <View style={styles.statusCol}>
                                <Text style={styles.statusLabel}>MOBILE NUMBER</Text>
                                <View style={styles.mobileEditContainer}>
                                    <Text style={styles.mobileText}>{voterData.mobileStatus}</Text>
                                    <Feather name="edit-2" size={14} color="#0d2b8f" style={{ marginLeft: 5 }} />
                                </View>
                            </View>
                            <View style={styles.statusCol}>
                                <Text style={styles.statusLabel}>COLOR CODE</Text>
                                <View style={styles.colorCodeContainer}>
                                    <View style={[styles.colorDot, { backgroundColor: 'gray' }]} />
                                    <Text style={styles.mobileText}>Other</Text>
                                </View>
                            </View>
                            <View style={[styles.statusCol, { alignItems: 'flex-end' }]}>
                                <Text style={styles.statusLabel}>VOTING STATUS</Text>
                                <View style={styles.votingSwitchContainer}>
                                    <Text style={styles.mobileText}>Voted</Text>
                                    <Switch
                                        trackColor={{ false: "#ccc", true: "#0d2b8f" }}
                                        thumbColor={hasVoted ? "#fff" : "#fff"}
                                        onValueChange={setHasVoted}
                                        value={hasVoted}
                                        style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Favorite/Report Actions */}
                        <View style={styles.secondaryActions}>
                            <TouchableOpacity style={styles.secondaryActionButton}>
                                <Feather name="star" size={16} color="#666" style={{ marginRight: 5 }} />
                                <Text style={styles.secondaryActionText}>Add to Favorites</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.secondaryActionButton}>
                                <Feather name="flag" size={16} color="#666" style={{ marginRight: 5 }} />
                                <Text style={styles.secondaryActionText}>Report Issue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
}

// ================= STYLES =================
const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: '#f5f6fb',
    },
    
    // --- Tab Bar ---
    tabBarContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    tabButton: {
        paddingVertical: 15,
        marginRight: 30,
    },
    tabContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabText: {
        fontSize: 14,
        color: '#777',
        fontWeight: '500',
    },
    activeTabButton: {
        borderBottomWidth: 2,
        borderBottomColor: '#0d2b8f',
    },
    activeTabText: {
        color: '#0d2b8f',
        fontWeight: '600',
    },
    activeDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#0d2b8f',
        marginRight: 5,
    },

    // --- Scroll Content & Main Card ---
    scrollView: {
        flex: 1,
        padding: 16,
    },
    profileCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },

    // --- Profile Summary ---
    profileSummary: {
        flexDirection: 'row',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 20,
    },
    imagePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 10,
        backgroundColor: '#ccc',
        marginRight: 20,
    },
    summaryDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    profileName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#222',
        marginBottom: 5,
    },
    activeTag: {
        backgroundColor: '#d6f5d6',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    activeTagText: {
        color: '#228b22',
        fontSize: 12,
        fontWeight: '600',
    },

    // --- Stat Cards Row (4 Columns) ---
    statCardsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
        gap: 10,
    },
    detailCard: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 12,
        minHeight: 60,
    },
    detailCardLabel: {
        fontSize: 11,
        color: '#888',
        fontWeight: '500',
        marginBottom: 4,
    },
    detailCardValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
    },

    // --- Info Grid (2 Columns) ---
    infoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
        gap: 20,
    },

    // --- Block Sections (Address/Polling) ---
    blockSection: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
    },
    blockText: {
        fontSize: 14,
        color: '#444',
        lineHeight: 20,
    },
    
    // --- Action Footer ---
    actionFooter: {
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statusCol: {
        flex: 1,
    },
    statusLabel: {
        fontSize: 11,
        color: '#888',
        fontWeight: '500',
        marginBottom: 5,
    },
    mobileEditContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mobileText: {
        fontSize: 15,
        color: '#444',
        fontWeight: '600',
    },
    colorCodeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    colorDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    votingSwitchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    // --- Secondary Actions ---
    secondaryActions: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    secondaryActionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    secondaryActionText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '600',
    },
    
    emptyTab: {
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
    }
});