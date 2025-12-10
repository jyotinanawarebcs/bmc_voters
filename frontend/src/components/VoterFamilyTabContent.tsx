// src/components/VoterFamilyTabContent.tsx

import React from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import {
    Card,
    Text,
    Button,
    Switch,
    Chip,
    Avatar,
} from "react-native-paper";
import Feather from 'react-native-vector-icons/Feather';

// NOTE: This Voter type is defined locally for the component's mock data
interface Voter {
    id: number;
    name: string;
    ward?: string;
    serial?: number;
    booth?: number;
    image?: string;
    isCurrent?: boolean;
}

const FAMILY: Voter[] = [
    { id: 11, name: "Vagh Adinath", ward: "Chalisgaon (Ward 1)", serial: 1387, booth: 0, image: "https://i.pravatar.cc/300?img=5", isCurrent: false },
    { id: 12, name: "Vagh Virendra Bhaskar", ward: "Chalisgaon (Ward 1)", serial: 1913, booth: 0, image: "https://i.pravatar.cc/300?img=10", isCurrent: false },
    { id: 13, name: "Vagh Anita Virendra", ward: "Chalisgaon (Ward 1)", serial: 1914, booth: 0, image: "https://i.pravatar.cc/300?img=20", isCurrent: false },
    { id: 2, name: "Vagh Shivanand Bhaskar", ward: "Chalisgaon (Ward 1)", serial: 2, booth: 0, image: "https://i.pravatar.cc/300?img=12", isCurrent: true },
];

export default function VoterFamilyTabContent() {
    const family = FAMILY;
    
    return (
        <View style={tabStyles.container}>
            <View style={tabStyles.familyHeader}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Feather name="users" size={20} color="#0d2b8f" />
                    <Text style={tabStyles.sectionTitle}>Family Members</Text>
                    <Chip style={tabStyles.countChip}>{family.length}</Chip>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={tabStyles.groupSwitchText}>GROUP BY NAME</Text>
                    <Switch value={false} onValueChange={() => {}} />
                    <Button
                        mode="contained"
                        icon={() => <Feather name="plus" size={16} color="#fff" />}
                        onPress={() => {}}
                        style={{ marginLeft: 10, backgroundColor: '#0d2b8f' }} // Use primary color
                        labelStyle={{ fontSize: 12 }}
                    >
                        Add New
                    </Button>
                </View>
            </View>

            <View style={tabStyles.familyList}>
                {family.map((m) => (
                    <Card key={m.id} style={[tabStyles.familyCard, m.isCurrent ? tabStyles.currentProfile : null]}>
                        <Card.Content style={{ flexDirection: "row", alignItems: "center" }}>
                            <Avatar.Image size={56} source={{ uri: m.image }} />
                            <View style={{ flex: 1, marginLeft: 12 }}>
                                <Text style={tabStyles.familyName}>{m.name}</Text>
                                <Text style={tabStyles.familySub}>{m.ward}</Text>
                                <View style={{ flexDirection: "row", marginTop: 6 }}>
                                    <Chip style={tabStyles.smallChip} textStyle={{fontSize: 12, fontWeight: '500'}}>Booth: {m.booth}</Chip>
                                    <Text style={{ marginLeft: 8, fontWeight: "700" }}>S.No: {m.serial}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={tabStyles.plusBtn}>
                                {/* Show 'user' icon for the current profile, 'plus' for others */}
                                <Feather name={m.isCurrent ? "user" : "plus"} size={18} color="#666" />
                            </TouchableOpacity>
                        </Card.Content>
                    </Card>
                ))}
            </View>
        </View>
    );
}

const tabStyles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 20,
    },
    familyHeader: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: 10,
        flexWrap: 'wrap',
    },
    sectionTitle: { 
        fontSize: 16, 
        fontWeight: "700", 
        marginLeft: 8,
        color: '#222'
    },
    countChip: { 
        marginLeft: 8, 
        backgroundColor: "#e8f0ff",
        height: 28,
        justifyContent: 'center',
    },
    groupSwitchText: { 
        color: "#6b7280", 
        marginRight: 8, 
        fontSize: 12 
    },
    familyList: { 
        flexDirection: "column", 
        gap: 8 
    },
    familyCard: { 
        marginBottom: 8, 
        borderRadius: 10,
        elevation: 1,
        backgroundColor: '#fff',
    },
    smallChip: { 
        height: 28, 
        backgroundColor: "#f2f6ff" 
    },
    familyName: { 
        fontSize: 15, 
        fontWeight: "700" 
    },
    familySub: { 
        fontSize: 13, 
        color: "#6b7280", 
        marginTop: 4 
    },
    plusBtn: { 
        padding: 8 
    },
    currentProfile: { 
        borderLeftWidth: 4, 
        borderLeftColor: "#0d2b8f" 
    },
});