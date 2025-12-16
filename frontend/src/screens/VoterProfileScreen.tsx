import React, { useState, useEffect, useCallback } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform,
    Switch, Image, useWindowDimensions, ActivityIndicator
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Card, Chip, Avatar, Button, Switch as RNSwitch } from 'react-native-paper';

import AllContent from '../components/AllContent';
import { RootStackParamList } from '../navigation/types';
import ScreenWrapper from "../navigation/ScreenWrapper";
import { voterApi } from '../api/voterApi';
import { ProfileVoterData, FamilyVoter } from '../api/type';

type VoterProfileScreenRouteProp = RouteProp<RootStackParamList, 'VoterProfileScreen'>;

type NavigationProps = {
    navigate: (screen: keyof RootStackParamList, params?: any) => void;
    goBack: () => void;
};

export default function VoterProfileScreen() {
    const navigation = useNavigation<NavigationProps>();
    const route = useRoute<VoterProfileScreenRouteProp>();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [voterData, setVoterData] = useState<ProfileVoterData | null>(null);
    const [familyMembers, setFamilyMembers] = useState<FamilyVoter[]>([]);

    const passedVoterData = route.params?.voterData;
    const voterId = route.params?.voterId || passedVoterData?.id;

    const { width } = useWindowDimensions();
    const isDesktopLayout = Platform.OS === 'web' && width > 900;

    const [activeTab, setActiveTab] = useState('Information');
    const [hasVoted, setHasVoted] = useState(false);

    const fetchVoterData = useCallback(async () => {
        if (!voterId) {
            setError('No voter ID provided');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await voterApi.getVoterById(voterId);

            if (response.success && response.data) {
                const apiVoter = response.data;

                const transformedVoter: ProfileVoterData = {
                    id: apiVoter.id,
                    name: apiVoter.full_name || "N/A",
                    full_name: apiVoter.full_name || "N/A",
                    relativeName: apiVoter.relative_name || "N/A",
                    relative_name: apiVoter.relative_name || "N/A",
                    ward: apiVoter.ward || "Chalisgaon (Ward 1)",
                    serial: apiVoter.part_number || "N/A",
                    age: apiVoter.age || "N/A",
                    gender: apiVoter.gender || "N/A",
                    gender_display: apiVoter.gender_display || (apiVoter.gender === 'M' ? 'Male' : apiVoter.gender === 'F' ? 'Female' : 'Other'),
                    assemblyNo: apiVoter.part_number || "N/A",
                    village: "Chalisgaon",
                    houseNo: apiVoter.house_no || "N/A",
                    house_no: apiVoter.house_no || "N/A",
                    voterCardId: apiVoter.voter_id || "N/A",
                    voter_id: apiVoter.voter_id || "N/A",
                    address: "List Part No. " + (apiVoter.part_number || "N/A") + " : 1-Maharana Pratap Housing Society, Chalisgaon",
                    pollingStation: "Z.P. Primary School, Room No. 1, Chalisgaon",
                    mobileStatus: "+91 98765 43210",
                    colorCode: "Yellow",
                    votedStatus: apiVoter.voted_status || false,
                    image: apiVoter.photo_url || `https://i.pravatar.cc/300?img=${apiVoter.id % 70 + 1}`,
                    photo_url: apiVoter.photo_url || `https://i.pravatar.cc/300?img=${apiVoter.id % 70 + 1}`,
                    booth: "0",
                    part_number: apiVoter.part_number || "N/A"
                };

                setVoterData(transformedVoter);
                setHasVoted(apiVoter.voted_status || false);

                const FAMILY: FamilyVoter[] = [
                    {
                        id: 11,
                        name: "Vagh Adinath",
                        full_name: "Vagh Adinath",
                        ward: "Chalisgaon (Ward 1)",
                        serial: "1387",
                        booth: "0",
                        image: "https://i.pravatar.cc/300?img=5",
                        isCurrent: false
                    },
                    {
                        id: 12,
                        name: "Vagh Virendra Bhaskar",
                        full_name: "Vagh Virendra Bhaskar",
                        ward: "Chalisgaon (Ward 1)",
                        serial: "1913",
                        booth: "0",
                        image: "https://i.pravatar.cc/300?img=10",
                        isCurrent: false
                    },
                    {
                        id: 13,
                        name: "Vagh Anita Virendra",
                        full_name: "Vagh Anita Virendra",
                        ward: "Chalisgaon (Ward 1)",
                        serial: "1914",
                        booth: "0",
                        image: "https://i.pravatar.cc/300?img=20",
                        isCurrent: false
                    },
                    {
                        id: apiVoter.id,
                        name: apiVoter.full_name || "Current Voter",
                        full_name: apiVoter.full_name || "Current Voter",
                        ward: apiVoter.ward || "Chalisgaon (Ward 1)",
                        serial: apiVoter.part_number || "N/A",
                        booth: "0",
                        image: apiVoter.photo_url || `https://i.pravatar.cc/300?img=${apiVoter.id % 70 + 1}`,
                        isCurrent: true
                    },
                ];

                setFamilyMembers(FAMILY);
            } else {
                throw new Error(response.message || 'Failed to fetch voter data');
            }
        } catch (err: any) {
            console.error('Error fetching voter data:', err);
            setError(err.message || 'Failed to load voter data');

            const MOCK_VOTER_DATA: ProfileVoterData = {
                id: voterId || 0,
                booth: '0',
                name: "Vagh Shivanand Bhaskar",
                full_name: "Vagh Shivanand Bhaskar",
                relativeName: "Wagh Bhaskar",
                relative_name: "Wagh Bhaskar",
                ward: "Chalisgaon (Ward 1)",
                serial: "2",
                part_number: "2",
                age: "52",
                gender: "M",
                gender_display: "Male",
                assemblyNo: "17/165/72",
                village: "Chalisgaon",
                houseNo: "NA",
                house_no: "NA",
                voterCardId: "ZUL1284405",
                voter_id: "ZUL1284405",
                address: "List Part No. 165 : 1-Maharana Pratap Housing Society, Chalisgaon",
                pollingStation: "Z.P. Primary School, Room No. 1, Chalisgaon",
                mobileStatus: "+91 98765 43210",
                colorCode: "Yellow",
                votedStatus: false,
                image: 'https://i.pravatar.cc/300?img=12',
                photo_url: 'https://i.pravatar.cc/300?img=12'
            };

            const FAMILY: FamilyVoter[] = [
                {
                    id: 11,
                    name: "Vagh Adinath",
                    full_name: "Vagh Adinath",
                    ward: "Chalisgaon (Ward 1)",
                    serial: "1387",
                    booth: "0",
                    image: "https://i.pravatar.cc/300?img=5",
                    isCurrent: false
                },
                {
                    id: 12,
                    name: "Vagh Virendra Bhaskar",
                    full_name: "Vagh Virendra Bhaskar",
                    ward: "Chalisgaon (Ward 1)",
                    serial: "1913",
                    booth: "0",
                    image: "https://i.pravatar.cc/300?img=10",
                    isCurrent: false
                },
                {
                    id: 13,
                    name: "Vagh Anita Virendra",
                    full_name: "Vagh Anita Virendra",
                    ward: "Chalisgaon (Ward 1)",
                    serial: "1914",
                    booth: "0",
                    image: "https://i.pravatar.cc/300?img=20",
                    isCurrent: false
                },
                {
                    id: voterId || 2,
                    name: "Vagh Shivanand Bhaskar",
                    full_name: "Vagh Shivanand Bhaskar",
                    ward: "Chalisgaon (Ward 1)",
                    serial: "2",
                    booth: "0",
                    image: "https://i.pravatar.cc/300?img=12",
                    isCurrent: true
                },
            ];

            setVoterData(MOCK_VOTER_DATA);
            setFamilyMembers(FAMILY);
            setHasVoted(false);
        } finally {
            setLoading(false);
        }
    }, [voterId]);

    useEffect(() => {
        fetchVoterData();
    }, [fetchVoterData]);

    const handleMenuNavigation = (menuId: string) => {
        if (menuId === 'dashboard') {
            navigation.navigate('Dashboard');
        } else if (menuId === 'voterlist') {
            navigation.navigate('VoterListScreen');
        }
    };

    const handleVoteStatusUpdate = async (newStatus: boolean) => {
        if (!voterData) return;

        try {
            setHasVoted(newStatus);
        } catch (error) {
            console.error('Error updating vote status:', error);
            setHasVoted(!newStatus);
        }
    };

    const DetailCard = ({ label, value }: { label: string, value: string }) => (
        <View style={styles.detailCard}>
            <Text style={styles.detailCardLabel}>{label}</Text>
            <Text style={styles.detailCardValue}>{value}</Text>
        </View>
    );

    const BlockSection = ({ iconName, text }: { iconName: string, text: string }) => (
        <View style={styles.blockSection}>
            <Feather name={iconName as any} size={20} color="#777" style={{ marginRight: 15 }} />
            <Text style={styles.blockText}>{text}</Text>
        </View>
    );

    const InformationContent = () => {
        if (!voterData) return null;

        return (
            <View>
                <View style={styles.statCardsRow}>
                    <DetailCard label="WARD" value={voterData.ward || "N/A"} />
                    <DetailCard label="SERIAL NO." value={voterData.serial} />
                    <DetailCard label="AGE" value={voterData.age} />
                    {/* <DetailCard label="GENDER" value={voterData.gender_display || voterData.gender} /> */}
                    <DetailCard
                        label="GENDER"
                        value={
                            voterData.gender_display ||
                            (voterData.gender ? voterData.gender.toString() : "N/A")
                        }
                    />

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
    };

    const FamilyContent = () => {
        if (!voterData) return null;

        return (
            <View style={[familyStyles.mainRow, isDesktopLayout ? familyStyles.rowHorizontal : familyStyles.rowVertical]}>
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
                                <Chip style={familyStyles.chip} textStyle={{ fontSize: 12 }}>
                                    {voterData.gender_display || voterData.gender}
                                </Chip>
                                <Chip style={[familyStyles.chip, familyStyles.chipGray]} textStyle={{ fontSize: 12 }}>
                                    Age: {voterData.age}
                                </Chip>
                            </View>
                            <View style={{ marginTop: 8 }}>
                                <Text style={familyStyles.wardText}>📍 {voterData.ward}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={familyStyles.divider} />

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
                            <RNSwitch value={hasVoted} onValueChange={handleVoteStatusUpdate} />
                        </View>
                    </View>

                    <View style={familyStyles.quickSurface}>
                        <Text style={familyStyles.quickActionTitle}>Quick Actions</Text>
                        <View style={familyStyles.actionsRow}>
                            <TouchableOpacity style={familyStyles.quickActionBtn}>
                                <Feather name="send" size={18} color="#2e71ff" />
                                <Text style={{ fontSize: 12, color: '#2e71ff', marginTop: 4 }}>Send SMS</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={familyStyles.quickActionBtn}>
                                <Feather name="printer" size={18} color="#2e71ff" />
                                <Text style={{ fontSize: 12, color: '#2e71ff', marginTop: 4 }}>Print Slip</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={familyStyles.quickActionBtn}>
                                <Feather name="phone" size={18} color="#2e71ff" />
                                <Text style={{ fontSize: 12, color: '#2e71ff', marginTop: 4 }}>Call</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={[familyStyles.rightColumn, isDesktopLayout ? { flex: 0.45 } : { width: "100%", marginTop: 20 }]}>
                    <View style={familyStyles.familyHeader}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Feather name="users" size={20} color="#0d2b8f" />
                            <Text style={familyStyles.familySectionTitle}>Family Members</Text>
                            <Chip style={familyStyles.countChip}>{familyMembers.length}</Chip>
                        </View>

                        <View style={familyStyles.headerButtonGroup}>
                            <Text style={familyStyles.groupSwitchText}>GROUP BY NAME</Text>
                            <RNSwitch value={false} onValueChange={() => { }} style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }} />
                            <Button
                                mode="contained"
                                icon={() => <Feather name="plus" size={16} color="#fff" />}
                                onPress={() => { }}
                                style={{ backgroundColor: '#0d2b8f' }}
                                labelStyle={{ fontSize: 12 }}
                            >
                                Add New
                            </Button>
                        </View>
                    </View>

                    <View style={[familyStyles.familyList, isDesktopLayout ? familyStyles.familyGrid : familyStyles.familyListVertical]}>
                        {familyMembers.map((m) => (
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
    };

    const TabContent = () => {
        switch (activeTab) {
            case 'Information':
                return <InformationContent />;
            case 'Family':
                return <FamilyContent />;
            case 'All':
                return <AllContent />;
            default:
                return (
                    <View style={styles.emptyTab}>
                        <Text style={{ color: '#888' }}>Select a tab...</Text>
                    </View>
                );
        }
    };

    if (loading) {
        return (
            <ScreenWrapper
                activeMenuId="voterlist"
                headerTitle="Loading..."
                showBackArrow={true}
                onMenuItemPress={handleMenuNavigation}
            >
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0d2b8f" />
                    <Text style={styles.loadingText}>Loading voter data...</Text>
                </View>
            </ScreenWrapper>
        );
    }

    if (error && !voterData) {
        return (
            <ScreenWrapper
                activeMenuId="voterlist"
                headerTitle="Error"
                showBackArrow={true}
                onMenuItemPress={handleMenuNavigation}
            >
                <View style={styles.errorContainer}>
                    <Feather name="alert-circle" size={50} color="#ff6b6b" />
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={fetchVoterData}>
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            </ScreenWrapper>
        );
    }

    return (
        <ScreenWrapper
            activeMenuId="voterlist"
            headerTitle={voterData?.name || "Voter Profile"}
            showBackArrow={true}
            onMenuItemPress={handleMenuNavigation}
        >
            <View style={styles.tabBarContainer}>
                <TouchableOpacity
                    onPress={() => setActiveTab('Information')}
                    style={[styles.tabButton, activeTab === 'Information' && styles.activeTabButton]}
                >
                    <View style={styles.tabContent}>
                        {activeTab === 'Information' && <View style={styles.activeDot} />}
                        <Text style={[styles.tabText, activeTab === 'Information' && styles.activeTabText]}>Information</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setActiveTab('Family')}
                    style={[styles.tabButton, activeTab === 'Family' && styles.activeTabButton]}
                >
                    <View style={styles.tabContent}>
                        {activeTab === 'Family' && <View style={styles.activeDot} />}
                        <Text style={[styles.tabText, activeTab === 'Family' && styles.activeTabText]}>Family</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setActiveTab('All')}
                    style={[styles.tabButton, activeTab === 'All' && styles.activeTabButton]}
                >
                    <View style={styles.tabContent}>
                        {activeTab === 'All' && <View style={styles.activeDot} />}
                        <Text style={[styles.tabText, activeTab === 'All' && styles.activeTabText]}>All</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.profileCard}>
                    <TabContent />

                    {activeTab === 'Information' && voterData && (
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
                                            onValueChange={handleVoteStatusUpdate}
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
    emptyTab: { height: 300, alignItems: 'center', justifyContent: 'center', },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f4f8'
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666'
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f4f8',
        padding: 20
    },
    errorText: {
        marginTop: 20,
        fontSize: 16,
        color: '#666',
        textAlign: 'center'
    },
    retryButton: {
        marginTop: 20,
        backgroundColor: '#0d2b8f',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    }
});

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

    headerButtonGroup: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
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