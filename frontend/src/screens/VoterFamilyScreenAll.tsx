import React, { useState } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    Image,
    TouchableOpacity,
} from "react-native";
import {
    Appbar,
    Card,
    Title,
    Paragraph,
    Text,
    Button,
    Switch,
    Chip,
    Surface,
    Avatar,
    useTheme,
    FAB,
} from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


type Voter = {
    id: number;
    name: string;
    gender?: "Male" | "Female" | "Other";
    age?: number;
    ward?: string;
    voterId?: string;
    serial?: number;
    booth?: number;
    colorCode?: string;
    pollingStation?: string;
    mobile?: string;
    image?: string;
    isCurrent?: boolean;
};

const SAMPLE_VOTER: Voter = {
    id: 2,
    name: "Vagh Shivanand Bhaskar",
    gender: "Male",
    age: 45,
    ward: "Chalisgaon (Ward 1)",
    voterId: "ABC1234567",
    serial: 2,
    booth: 0,
    colorCode: "Yellow",
    pollingStation: "Z.P. Primary School, Room No. 1, Chalisgaon",
    mobile: "+91 98765 43210",
    image: "https://i.pravatar.cc/300?img=12",
    isCurrent: true,
};

const FAMILY: Voter[] = [
    {
        id: 11,
        name: "Vagh Adinath",
        ward: "Chalisgaon (Ward 1)",
        serial: 1387,
        booth: 0,
        image: "https://i.pravatar.cc/300?img=5",
    },
    {
        id: 12,
        name: "Vagh Virendra Bhaskar",
        ward: "Chalisgaon (Ward 1)",
        serial: 1913,
        booth: 0,
        image: "https://i.pravatar.cc/300?img=10",
    },
    {
        id: 13,
        name: "Vagh Anita Virendra",
        ward: "Chalisgaon (Ward 1)",
        serial: 1914,
        booth: 0,
        image: "https://i.pravatar.cc/300?img=20",
    },
    {
        id: 2,
        name: "Vagh Shivanand Bhaskar",
        ward: "Chalisgaon (Ward 1)",
        serial: 2,
        booth: 0,
        image: "https://i.pravatar.cc/300?img=12",
        isCurrent: true,
    },
];

const WINDOW_WIDTH = Dimensions.get("window").width;

export default function VoterProfileScreen() {
    const [voter] = useState<Voter>(SAMPLE_VOTER);
    const [family] = useState<Voter[]>(FAMILY);
    const [voted, setVoted] = useState<boolean>(false);
    const theme = useTheme();

    const isWide = WINDOW_WIDTH >= 900; // tablet/desktop style

    return (
        <View style={styles.root}>
            {/* Top Appbar */}
            <Appbar.Header style={styles.appbar}>
                <Appbar.BackAction onPress={() => { /* navigation.goBack() */ }} color="#fff" />
                <Appbar.Content title={voter.name} titleStyle={{ color: "#fff" }} />
                <Appbar.Action icon="bell-outline" color="#fff" onPress={() => { }} />
                <Appbar.Action icon="cog-outline" color="#fff" onPress={() => { }} />
                <Appbar.Action icon={() => <Feather name="moon" size={20} color="#fff" />} onPress={() => { }} />
            </Appbar.Header>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Top tabs placeholder */}
                <View style={styles.tabsRow}>
                    <TouchableOpacity style={[styles.tabItem]}>
                        <Text style={styles.tabText}>Information</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabItem]}>
                        <Text style={styles.tabText}>Family</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabItem, styles.tabActive]}>
                        <Text style={[styles.tabText, { color: "#fff" }]}>All</Text>
                    </TouchableOpacity>
                </View>

                {/* Main Row */}
                <View style={[styles.mainRow, isWide ? styles.rowHorizontal : styles.rowVertical]}>

                    {/* Left Column - Profile Card + Quick Actions */}
                    <View style={[styles.leftColumn, isWide ? { flex: 0.55 } : { width: "100%" }]}>

                        {/* PROFILE CARD */}
                        <Card style={styles.profileCard}>
                            <Card.Content>
                                <View style={styles.profileTop}>
                                    <View style={styles.avatarWrap}>
                                        <Image source={{ uri: voter.image }} style={styles.avatar} />
                                        <View style={styles.avatarBadge}>
                                            <Feather name="check" size={16} color="#fff" />
                                        </View>
                                    </View>

                                    <View style={{ flex: 1, marginLeft: 12 }}>
                                        <Title style={styles.name}>{voter.name}</Title>
                                        <View style={styles.rowWrap}>
                                            <Chip style={styles.chip}>Male</Chip>
                                            <Chip style={[styles.chip, styles.chipGray]}>Age: {voter.age}</Chip>
                                        </View>
                                        <View style={{ marginTop: 8 }}>
                                            <Text style={styles.wardText}>📍 {voter.ward}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.divider} />

                                <View style={styles.infoGrid}>
                                    <View style={styles.infoCol}>
                                        <Text style={styles.infoLabel}>VOTER ID</Text>
                                        <Text style={styles.infoValue}>{voter.voterId}</Text>
                                    </View>

                                    <View style={styles.infoCol}>
                                        <Text style={styles.infoLabel}>SERIAL NO.</Text>
                                        <Text style={styles.infoValue}>{voter.serial}</Text>
                                    </View>

                                    <View style={styles.infoCol}>
                                        <Text style={styles.infoLabel}>BOOTH NO.</Text>
                                        <Text style={styles.infoValue}>{voter.booth}</Text>
                                    </View>

                                    <View style={styles.infoCol}>
                                        <Text style={styles.infoLabel}>COLOR CODE</Text>
                                        <View style={styles.colorRow}>
                                            <View style={[styles.colorDot, { backgroundColor: "#F2C94C" }]} />
                                            <Text style={styles.infoValue}> {voter.colorCode}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={[styles.fullWidth, { marginTop: 10 }]}>
                                    <Text style={styles.infoLabel}>POLLING STATION</Text>
                                    <Text style={styles.infoValueSmall}>{voter.pollingStation}</Text>
                                </View>

                                <View style={[styles.rowBetween, { marginTop: 12 }]}>
                                    <View>
                                        <Text style={styles.infoLabel}>MOBILE NUMBER</Text>
                                        <View style={styles.rowWrap}>
                                            <Text style={styles.mobileText}>{voter.mobile}</Text>
                                            <TouchableOpacity style={{ marginLeft: 8 }}>
                                                <Feather name="edit-2" size={16} color={theme.colors.primary} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={{ alignItems: "flex-end" }}>
                                        <Text style={styles.infoLabel}>Voted?</Text>
                                        <Switch value={voted} onValueChange={setVoted} />
                                    </View>
                                </View>
                            </Card.Content>
                        </Card>

                        {/* Quick Actions */}
                        <Surface style={styles.quickSurface}>
                            <Text style={styles.sectionTitle}>Quick Actions</Text>

                            <View style={styles.actionsRow}>
                                <Button
                                    mode="contained"
                                    icon={() => <Feather name="send" size={18} color="#2e71ff" />}
                                    compact
                                    contentStyle={styles.actionBtnContent}
                                    style={styles.actionBtn}
                                    onPress={() => { }}
                                >
                                    Send SMS
                                </Button>

                                <Button
                                    mode="contained"
                                    icon={() => <Feather name="printer" size={18} color="#2e71ff" />}
                                    compact
                                    contentStyle={styles.actionBtnContent}
                                    style={styles.actionBtn}
                                    onPress={() => { }}
                                >
                                    Print Slip
                                </Button>

                                <Button
                                    mode="contained"
                                    icon={() => <Feather name="phone" size={18} color="#2e71ff" />}
                                    compact
                                    contentStyle={styles.actionBtnContent}
                                    style={styles.actionBtn}
                                    onPress={() => { }}
                                >
                                    Call
                                </Button>
                            </View>
                        </Surface>
                    </View>

                    {/* Right Column - Family Members */}
                    <View style={[styles.rightColumn, isWide ? { flex: 0.45 } : { width: "100%" }]}>
                        <View style={styles.familyHeader}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Feather name="users" size={20} color="#2e71ff" />
                                <Text style={styles.sectionTitle}>Family Members</Text>
                                <Chip style={styles.countChip}>{family.length}</Chip>
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={styles.groupSwitchText}>GROUP BY NAME</Text>
                                <Switch value={false} onValueChange={() => { }} />
                                <Button
                                    mode="contained"
                                    icon={() => <Feather name="plus" size={16} color="#fff" />}
                                    onPress={() => { }}
                                >
                                    Add New
                                </Button>
                            </View>
                        </View>

                        <View style={styles.familyList}>
                            {family.map((m) => (
                                <Card key={m.id} style={[styles.familyCard, m.isCurrent ? styles.currentProfile : null]}>
                                    <Card.Content style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Avatar.Image size={56} source={{ uri: m.image }} />
                                        <View style={{ flex: 1, marginLeft: 12 }}>
                                            <Text style={styles.familyName}>{m.name}</Text>
                                            <Text style={styles.familySub}>{m.ward}</Text>
                                            <View style={{ flexDirection: "row", marginTop: 6 }}>
                                                <Chip style={styles.smallChip}>Booth: {m.booth}</Chip>
                                                <Text style={{ marginLeft: 8, fontWeight: "700" }}>S.No: {m.serial}</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity style={styles.plusBtn}>
                                            <Feather name={m.isCurrent ? "user" : "plus"} size={18} color="#666" />
                                        </TouchableOpacity>
                                    </Card.Content>
                                </Card>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Footer */}
                <View style={{ height: 40 }} />
                <Text style={styles.footer}>© 2024 Chalisgaon Municipal Council. All rights reserved.</Text>

            </ScrollView>

            {/* Floating Action Button */}
            <FAB
                small={false}
                icon={() => (
                    <MaterialCommunityIcons name="qrcode-scan" size={20} color="#fff" />
                )}
                style={styles.fab}
                onPress={() => { }}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: "#f3f5f7" },
    appbar: { backgroundColor: "#2e71ff" },
    scrollContent: { padding: 18, paddingBottom: 120 },

    tabsRow: { flexDirection: "row", gap: 8, marginBottom: 12 },
    tabItem: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    tabText: { color: "#3a3a3a" },
    tabActive: { backgroundColor: "#2e71ff" },

    mainRow: { width: "100%" },
    rowHorizontal: { flexDirection: "row", alignItems: "flex-start", gap: 16 },
    rowVertical: { flexDirection: "column" },

    leftColumn: {},
    rightColumn: {},

    profileCard: {
        borderRadius: 12,
        marginBottom: 16,
        overflow: "hidden",
    },

    fullWidth: {
        width: "100%",
    },

    profileTop: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
    avatarWrap: { position: "relative" },
    avatar: { width: 96, height: 96, borderRadius: 8 },
    avatarBadge: {
        position: "absolute",
        right: -6,
        bottom: -6,
        backgroundColor: "#2e71ff",
        padding: 6,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#fff",
    },
    name: { fontSize: 20, fontWeight: "700", marginBottom: 6 },
    rowWrap: { flexDirection: "row", alignItems: "center", gap: 8 },

    chip: { marginRight: 8, backgroundColor: "#E8F0FF" },
    chipGray: { backgroundColor: "#f2f2f2", marginLeft: 6 },
    wardText: { color: "#4b5563" },

    divider: { height: 1, backgroundColor: "#eee", marginVertical: 10 },

    infoGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
    infoCol: { width: "50%", marginBottom: 8 },
    infoLabel: { fontSize: 12, color: "#6b7280", marginBottom: 6 },
    infoValue: { fontSize: 14, fontWeight: "700", color: "#111" },
    infoValueSmall: { fontSize: 13, color: "#374151" },

    colorRow: { flexDirection: "row", alignItems: "center" },
    colorDot: { width: 12, height: 12, borderRadius: 6 },

    rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },

    mobileText: { fontSize: 14, fontWeight: "600" },

    quickSurface: { marginTop: 6, padding: 14, borderRadius: 12, elevation: 2 },
    sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 10 },

    actionsRow: { flexDirection: "row", justifyContent: "space-between" },
    actionBtn: { flex: 1, marginHorizontal: 6, borderRadius: 8, backgroundColor: "#eff6ff" },
    actionBtnContent: { height: 48 },
    // reduce text color default for these buttons
    actionBtnLabel: { color: "#2e71ff" },

    familyHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
    countChip: { marginLeft: 8, backgroundColor: "#e8f0ff" },
    groupSwitchText: { color: "#6b7280", marginRight: 8 },

    familyList: { flexDirection: "column", gap: 8 },
    familyCard: { marginBottom: 10, borderRadius: 10 },
    smallChip: { height: 28, backgroundColor: "#f2f6ff" },
    familyName: { fontSize: 15, fontWeight: "700" },
    familySub: { fontSize: 13, color: "#6b7280", marginTop: 4 },
    plusBtn: { padding: 8 },

    currentProfile: { borderLeftWidth: 4, borderLeftColor: "#2e71ff" },

    footer: { textAlign: "center", color: "#6b7280", marginTop: 12 },

    fab: {
        position: "absolute",
        right: 18,
        bottom: 20,
        backgroundColor: "#ff6a00",
    },
});
