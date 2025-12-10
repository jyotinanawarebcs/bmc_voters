import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Switch, Image, useWindowDimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native'; 
import { Card, Chip, Avatar, Button, Switch as RNSwitch } from 'react-native-paper'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 

// >>> ADDED: Import the AllContent component
import AllContent from '../components/AllContent'; 

// NOTE: Please ensure these imports are correct in your project structure
import { Voter } from '../api/type'; 
import { RootStackParamList } from '../navigation/types'; 
import ScreenWrapper from "../navigation/ScreenWrapper";

// --- TYPE DEFINITIONS ---
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
    age: string;    
    gender: string; 
    booth: string; 
}

interface FamilyVoter extends Voter {
    isCurrent?: boolean;
    serial: string; 
    booth: string; 
}

// --- MOCK DATA STRUCTURE ---
const MOCK_VOTER_DATA: ProfileVoterData = {
    id: 0, 
    booth: '0', 
    name: "Vagh Shivanand Bhaskar",
    relativeName: "Wagh Bhaskar",
    ward: "Chalisgaon (Ward 1)",
    serial: "2", 
    age: "52", 
    gender: "M",
    assemblyNo: "17/165/72",
    village: "Chalisgaon",
    houseNo: "NA",
    voterCardId: "ZUL1284405",
    address: "List Part No. 165 : 1-Maharana Pratap Housing Society, Chalisgaon",
    pollingStation: "Z.P. Primary School, Room No. 1, Chalisgaon",
    mobileStatus: "+91 98765 43210", 
    colorCode: "Yellow", 
    votedStatus: false, 
    image: 'https://i.pravatar.cc/300?img=12',
};

const FAMILY: FamilyVoter[] = [
    { id: 11, name: "Vagh Adinath", ward: "Chalisgaon (Ward 1)", serial: "1387", booth: "0", image: "https://i.pravatar.cc/300?img=5", isCurrent: false },
    { id: 12, name: "Vagh Virendra Bhaskar", ward: "Chalisgaon (Ward 1)", serial: "1913", booth: "0", image: "https://i.pravatar.cc/300?img=10", isCurrent: false },
    { id: 13, name: "Vagh Anita Virendra", ward: "Chalisgaon (Ward 1)", serial: "1914", booth: "0", image: "https://i.pravatar.cc/300?img=20", isCurrent: false },
    { id: 2, name: "Vagh Shivanand Bhaskar", ward: "Chalisgaon (Ward 1)", serial: "2", booth: "0", image: "https://i.pravatar.cc/300?img=12", isCurrent: true },
];

// Define the route and navigation types
type VoterProfileScreenRouteProp = RouteProp<RootStackParamList, 'VoterProfileScreen'>;
type VoterProfileNavigationProp = NavigationProp<RootStackParamList, 'VoterProfileScreen'>;


// ================= MAIN SCREEN COMPONENT =================
export default function VoterProfileScreen() {
    const navigation = useNavigation<VoterProfileNavigationProp>();
    const route = useRoute<VoterProfileScreenRouteProp>();
    
    const passedVoterData = route.params?.voterData;
    const voterData: ProfileVoterData = { 
        ...MOCK_VOTER_DATA, 
        ...(passedVoterData as unknown as Partial<ProfileVoterData>) 
    };
    
    const { width } = useWindowDimensions();
    const isDesktopLayout = Platform.OS === 'web' && width > 900; 

    const [activeTab, setActiveTab] = useState('Information');
    const [hasVoted, setHasVoted] = useState(voterData.votedStatus);
    
    // 💡 FIX 1: Define the sidebar navigation handler
    const handleMenuNavigation = (menuId: string) => {
        if (menuId === 'dashboard') {
            navigation.navigate('Dashboard'); 
        } else if (menuId === 'voterlist') {
            // Navigate back to the Voter List screen
            navigation.navigate('VoterListScreen'); 
        }
        // Add logic for other menu IDs as needed
    };

    // --- Detail Card Component (Information Tab) ---
    const DetailCard = ({ label, value }: { label: string, value: string }) => (
        <View style={styles.detailCard}>
            <Text style={styles.detailCardLabel}>{label}</Text>
            <Text style={styles.detailCardValue}>{value}</Text>
        </View>
    );

    // --- Block Section Component (Information Tab) ---
    const BlockSection = ({ iconName, text }: { iconName: string, text: string }) => (
        <View style={styles.blockSection}>
            <Feather name={iconName as any} size={20} color="#777" style={{ marginRight: 15 }} />
            <Text style={styles.blockText}>{text}</Text>
        </View>
    );

    // >>> UPDATED: To stop navigation and just set the active tab for component rendering
    const handleAllTabPress = () => {
        setActiveTab('All');
        /* COMMENTED OUT to render AllContent directly on this screen
        navigation.navigate('VoterFamilyScreenAll', { 
            voterId: voterData.id || voterData.voterCardId,
            voterData: voterData
        }); 
        */
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
    
    // --- Family Tab Content (Two-Column Layout) ---
    const FamilyContent = () => (
        <View style={[familyStyles.mainRow, isDesktopLayout ? familyStyles.rowHorizontal : familyStyles.rowVertical]}>
            
            {/* Left Column - Profile Card + Quick Actions */}
            <View style={[familyStyles.leftColumn, isDesktopLayout ? { flex: 0.55 } : { width: "100%" }]}>

                <View style={familyStyles.profileSummary}>
                    <View style={familyStyles.avatarWrap}>
                         <Image source={{ uri: voterData.image }} style={familyStyles.avatar} />
                         <View style={familyStyles.avatarBadge}>
                            <Feather name="check" size={16} color="#fff" />
                        </View>
                    </View>
                    
                    <View style={familyStyles.summaryDetails}>
                        <Text style={familyStyles.profileName}>{voterData.name}</Text>
                        <View style={familyStyles.rowWrap}>
                             <Chip style={familyStyles.chip} textStyle={{fontSize: 12}}>Male</Chip>
                            <Chip style={[familyStyles.chip, familyStyles.chipGray]} textStyle={{fontSize: 12}}>Age: {voterData.age}</Chip>
                        </View>
                        <View style={{ marginTop: 8 }}>
                            <Text style={familyStyles.wardText}>📍 {voterData.ward}</Text>
                        </View>
                    </View>
                </View>
                
                <View style={familyStyles.divider} />

                {/* Details Grid */}
                <View style={familyStyles.infoGrid}>
                    <View style={familyStyles.infoCol}>
                        <Text style={familyStyles.infoLabel}>VOTER ID</Text>
                        <Text style={familyStyles.infoValue}>{voterData.voterCardId}</Text>
                    </View>
                    <View style={familyStyles.infoCol}>
                        <Text style={familyStyles.infoLabel}>SERIAL NO.</Text>
                        <Text style={familyStyles.infoValue}>{voterData.serial}</Text>
                    </View>
                    <View style={familyStyles.infoCol}>
                        <Text style={familyStyles.infoLabel}>BOOTH NO.</Text>
                        <Text style={familyStyles.infoValue}>{voterData.booth}</Text>
                    </View>
                    <View style={familyStyles.infoCol}>
                        <Text style={familyStyles.infoLabel}>COLOR CODE</Text>
                        <View style={familyStyles.colorRow}>
                            <View style={[familyStyles.colorDot, { backgroundColor: voterData.colorCode === 'Yellow' ? '#F2C94C' : 'gray' }]} />
                            <Text style={familyStyles.infoValue}> {voterData.colorCode}</Text>
                        </View>
                    </View>
                </View>

                <View style={[familyStyles.fullWidth, { marginTop: 10 }]}>
                    <Text style={familyStyles.infoLabel}>POLLING STATION</Text>
                    <Text style={familyStyles.infoValueSmall}>{voterData.pollingStation}</Text>
                </View>

                <View style={[familyStyles.rowBetween, { marginTop: 12 }]}>
                    <View>
                        <Text style={familyStyles.infoLabel}>MOBILE NUMBER</Text>
                        <View style={familyStyles.rowWrap}>
                            <Text style={familyStyles.mobileText}>{voterData.mobileStatus}</Text>
                            <TouchableOpacity style={{ marginLeft: 8 }}>
                                <Feather name="edit-2" size={14} color="#0d2b8f" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}> 
                        <Text style={familyStyles.infoLabel}>Voted?</Text>
                        <RNSwitch value={hasVoted} onValueChange={setHasVoted} />
                    </View>
                </View>
                
                {/* Quick Actions */}
                <View style={familyStyles.quickSurface}>
                    <Text style={familyStyles.quickActionTitle}>Quick Actions</Text> 
                    <View style={familyStyles.actionsRow}>
                        <TouchableOpacity style={familyStyles.quickActionBtn}>
                            <Feather name="send" size={18} color="#2e71ff" />
                            <Text style={{fontSize: 12, color: '#2e71ff', marginTop: 4}}>Send SMS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={familyStyles.quickActionBtn}>
                            <Feather name="printer" size={18} color="#2e71ff" />
                            <Text style={{fontSize: 12, color: '#2e71ff', marginTop: 4}}>Print Slip</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={familyStyles.quickActionBtn}>
                            <Feather name="phone" size={18} color="#2e71ff" />
                            <Text style={{fontSize: 12, color: '#2e71ff', marginTop: 4}}>Call</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Right Column - Family Members List (Grid Layout) */}
            <View style={[familyStyles.rightColumn, isDesktopLayout ? { flex: 0.45 } : { width: "100%", marginTop: 20 }]}>
                <View style={familyStyles.familyHeader}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Feather name="users" size={20} color="#0d2b8f" />
                        <Text style={familyStyles.familySectionTitle}>Family Members</Text> 
                        <Chip style={familyStyles.countChip}>{FAMILY.length}</Chip>
                    </View>

                    <View style={familyStyles.headerButtonGroup}>
                        <Text style={familyStyles.groupSwitchText}>GROUP BY NAME</Text>
                        <RNSwitch value={false} onValueChange={() => {}} style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }} />
                        <Button
                            mode="contained"
                            icon={() => <Feather name="plus" size={16} color="#fff" />}
                            onPress={() => {}}
                            style={{ backgroundColor: '#0d2b8f' }} 
                            labelStyle={{ fontSize: 12 }}
                        >
                            Add New
                        </Button>
                    </View>
                </View>

                {/* --- GRID LAYOUT FOR FAMILY MEMBERS --- */}
                <View style={[familyStyles.familyList, isDesktopLayout ? familyStyles.familyGrid : familyStyles.familyListVertical]}>
                    {FAMILY.map((m) => (
                        <Card key={m.id} style={[familyStyles.familyCard, familyStyles.familyGridItem, m.isCurrent ? familyStyles.currentProfile : null]}>
                            <Card.Content style={familyStyles.gridCardContent}>
                                <View style={familyStyles.gridTopRow}>
                                    <Avatar.Image size={40} source={{ uri: m.image }} />
                                    <TouchableOpacity style={familyStyles.plusBtn}>
                                        <Feather name={m.isCurrent ? "user" : "plus"} size={18} color="#666" />
                                    </TouchableOpacity>
                                </View>
                                
                                <Text style={familyStyles.familyName} numberOfLines={1}>{m.name}</Text>
                                <Text style={familyStyles.familySub} numberOfLines={1}>{m.ward}</Text>
                                <View style={familyStyles.gridBottomRow}>
                                    <Text style={familyStyles.serialText}>Booth: {m.booth}</Text>
                                    <Text style={familyStyles.serialText}>S.No: {m.serial}</Text>
                                </View>
                            </Card.Content>
                        </Card>
                    ))}
                </View>
            </View>
        </View>
    );

    // >>> UPDATED: TabContent now renders AllContent when activeTab is 'All'
    const TabContent = () => {
        if (activeTab === 'Information') {
            return InformationContent();
        }
        if (activeTab === 'Family') {
            return FamilyContent(); 
        }
        if (activeTab === 'All') {
            return <AllContent />; // Render the imported AllContent component
        }
        
        return <View style={styles.emptyTab}><Text style={{ color: '#888' }}>Select a tab...</Text></View>
    }


    return (
        <ScreenWrapper 
            activeMenuId="voterlist" 
            headerTitle={voterData.name}
            showBackArrow={true}
            // 💡 FIX 2: Pass the required sidebar navigation handler
            onMenuItemPress={handleMenuNavigation}
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
                
                {/* Changed onPress back to handleAllTabPress (which now only sets the state) */}
                <TouchableOpacity onPress={handleAllTabPress} style={[styles.tabButton, activeTab === 'All' && styles.activeTabButton]}>
                    <View style={styles.tabContent}>
                         {activeTab === 'All' && <View style={styles.activeDot} />}
                        <Text style={[styles.tabText, activeTab === 'All' && styles.activeTabText]}>All</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.profileCard}>
                    
                    {/* Render dynamic tab content */}
                    <TabContent />
                    
                    {/* Action Footer (Only display for Information Tab) */}
                    {activeTab === 'Information' && (
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
                                        <View style={[styles.colorDot, { backgroundColor: voterData.colorCode === 'Yellow' ? '#F2C94C' : 'gray' }]} />
                                        <Text style={styles.mobileText}>{voterData.colorCode}</Text>
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
                    )}
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
}

// ================= STYLES (Omitted for brevity, assuming they are correct) =================
const styles = StyleSheet.create({
    fullScreen: { flex: 1, backgroundColor: '#f3f4f8' }, 
    tabBarContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        height: 60,
        alignItems: 'center'
    },

    tabButton: {
        paddingVertical: 18,
        marginRight: 35,
    },
    tabContent: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    tabText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#6b7280',
    },
    activeTabButton: {
        borderBottomWidth: 3,
        borderBottomColor: '#0a4bff',
    },
    activeTabText: {
        color: '#0a4bff',
        fontWeight: '700',
    },
    activeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#0a4bff',
        marginRight: 6,
    },

    scrollView: {
        padding: 20,
        backgroundColor: '#f3f4f8',
    },

    profileCard: {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 25,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#f0f0f0'
    },

    statCardsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: 25,
    },
    detailCard: {
        flex: 1,
        backgroundColor: '#f9fafb',
        borderRadius: 10,
        padding: 14,
        borderWidth: 1,
        borderColor: '#e5e7eb'
    },
    detailCardLabel: {
        fontSize: 11,
        color: '#6b7280',
        marginBottom: 4,
        fontWeight: '500'
    },
    detailCardValue: {
        fontSize: 17,
        fontWeight: '700',
        color: '#111827'
    },

    infoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 25,
        marginTop: 10,
    },

    blockSection: {
        backgroundColor: "#f9fafb",
        borderRadius: 10,
        padding: 18,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        flexDirection: 'row'
    },
    blockText: {
        fontSize: 14,
        color: '#374151',
        lineHeight: 20,
    },

    actionFooter: {
        marginTop: 30,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb'
    },
    statusRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, },
    statusCol: { flex: 1, },
    statusLabel: { fontSize: 11, color: '#888', fontWeight: '500', marginBottom: 5, },
    mobileEditContainer: { flexDirection: 'row', alignItems: 'center', },
    mobileText: { fontSize: 15, color: '#444', fontWeight: '600', },
    colorCodeContainer: { flexDirection: 'row', alignItems: 'center', },
    colorDot: { width: 16, height: 16, borderRadius: 8, marginRight: 8, borderWidth: 1, borderColor: '#ccc', },
    votingSwitchContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', },
    secondaryActions: { flexDirection: 'row', justifyContent: 'center', marginTop: 20, },
    secondaryActionButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10, },
    secondaryActionText: { fontSize: 14, color: '#666', fontWeight: '600', },
    emptyTab: { height: 300, alignItems: 'center', justifyContent: 'center', }
});


// Styles specific to the Family/Two-Column Layout
const familyStyles = StyleSheet.create({
    mainRow: {
        width: "100%",
        flexDirection: 'row',
        gap: 20
    },

    rowHorizontal: { flexDirection: "row", gap: 20 },
    rowVertical: { flexDirection: "column" },

    leftColumn: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    
    avatarWrap: { position: "relative" },
    rowWrap: { flexDirection: "row", alignItems: "center", gap: 8 },
    rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    mobileText: { fontSize: 14, fontWeight: "600" },
    colorRow: { flexDirection: "row", alignItems: "center" },
    colorDot: { width: 12, height: 12, borderRadius: 6, marginRight: 4, borderWidth: 1, borderColor: '#ccc' }, 
    fullWidth: { width: "100%", }, 
    
    infoValueSmall: { fontSize: 13, color: '#374151' }, 
    
    // Quick Actions
    quickActionTitle: { fontSize: 14, fontWeight: "700", marginBottom: 10, color: '#333' }, 
    quickSurface: {
        marginTop: 20,
        borderRadius: 12,
        padding: 15,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        backgroundColor: '#f9fafb'
    },

    actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },

    quickActionBtn: {
        width: '32%',
        backgroundColor: '#eef4ff',
        borderRadius: 12,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },

    rightColumn: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#e5e7eb'
    },
    
    // Family Member Grid Styles
    familyList: {},
    familyListVertical: { flexDirection: "column", gap: 8 },
    familyGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12
    },
    gridTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5 },
    gridBottomRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 5 },
    plusBtn: { padding: 5 },
    serialText: { fontSize: 12, fontWeight: '500', color: '#444' },
    groupSwitchText: { color: "#6b7280", marginRight: 8, fontSize: 12 },
    
    // Current Styles
    profileSummary: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 12
    },
    avatarBadge: {
        position: 'absolute',
        right: -5,
        bottom: -5,
        backgroundColor: '#2563eb',
        padding: 5,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#fff',
    },

    summaryDetails: {
        marginLeft: 15,
        flex: 1
    },
    profileName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 6
    },
    chip: {
        backgroundColor: '#e0ecff',
        height: 26,
    },
    chipGray: { 
        backgroundColor: '#f2f2f2', 
        marginLeft: 6, 
    },

    wardText: { fontSize: 14, color: '#374151', marginTop: 5 },

    divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 15 },

    infoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 18,
        marginBottom: 10
    },
    infoCol: {
        width: "48%"
    },
    infoLabel: {
        color: '#6b7280',
        fontSize: 12,
        marginBottom: 5
    },

    infoValue: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111'
    },

    familyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        alignItems: 'center'
    },
    
    // NEW STYLE: For the Switch and Button group
    headerButtonGroup: { 
        flexDirection: "row", 
        alignItems: "center", 
        gap: 10, // Added gap for consistent spacing
    },

    familySectionTitle: { fontSize: 17, fontWeight: '700', marginLeft: 8 },
    countChip: {
        backgroundColor: '#e0ecff',
        height: 26
    },

    familyGridItem: {
        width: "48%",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        backgroundColor: '#fff'
    },
    familyCard: { 
        borderRadius: 12,
        backgroundColor: '#fff',
        elevation: 0, 
    },

    gridCardContent: {
        padding: 14,
    },

    familyName: { fontSize: 14, fontWeight: '700', marginTop: 5 },
    familySub: { fontSize: 12, color: '#6b7280', marginTop: 2 },

    currentProfile: {
        backgroundColor: "#f3f6ff",
        borderLeftColor: "#2563eb",
        borderLeftWidth: 4
    }
});