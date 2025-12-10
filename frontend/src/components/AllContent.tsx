import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Button, Switch as RNSwitch } from 'react-native-paper'; 

// --- MOCK DATA FOR ALL DETAILS ---
const ALL_DETAILS_MOCK = {
    'Mobile - 1': '+91 98765 43210',
    'Mobile - 2': 'Not Available',
    'Color Code': 'Other', 
    'Caste': 'Maratha',
    'Position': 'Ward President',
    'Worker': 'Surekha Jadhav',
    'New Address': 'Flat 101, Blue Heaven Apt.',
    'Society': 'Blue Heaven Apartment',
    'Flat No.': '101',
    'Email': 'vagh.s@example.com',
    'Date of Birth': '15/05/1973',
    'Demands': 'Better water supply',
    'More Information - 1': 'Active member of local party.',
    'More Information - 2': 'Requires financial aid for education.',
};

// --- Editable Detail Component ---
const DetailRow = ({ label, value, isSwitch, switchValue, onToggleSwitch }: { 
    label: string, 
    value?: string, 
    isSwitch?: boolean,
    switchValue?: boolean,
    onToggleSwitch?: (value: boolean) => void
}) => (
    <View style={allStyles.detailRow}>
        <View style={allStyles.labelContainer}>
            <Text style={allStyles.label}>{label}</Text>
        </View>

        <View style={allStyles.valueActionsContainer}>
            {/* Value Display or Switch */}
            {isSwitch ? (
                <View style={allStyles.switchContainer}>
                    <Text style={allStyles.valueText}>{value}</Text>
                    <RNSwitch 
                        value={switchValue} 
                        onValueChange={onToggleSwitch} 
                        style={allStyles.switchStyle} 
                    />
                </View>
            ) : (
                <Text style={allStyles.valueText}>{value}</Text>
            )}
            
            {/* Action Icons */}
            <View style={allStyles.actionIcons}>
                <TouchableOpacity style={allStyles.iconButton}>
                    <Feather name="edit-2" size={16} color="#6b7280" />
                </TouchableOpacity>
                <TouchableOpacity style={allStyles.iconButton}>
                    <Feather name="user" size={16} color="#6b7280" />
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

// ================= ALL CONTENT COMPONENT =================
export default function AllContent() {
    const [isOtherColorCode, setIsOtherColorCode] = useState(ALL_DETAILS_MOCK['Color Code'] === 'Other');

    return (
        <View style={allStyles.container}>
            <View style={allStyles.detailListContainer}>
                {Object.entries(ALL_DETAILS_MOCK).map(([label, value]) => {
                    if (label === 'Color Code') {
                        return (
                            <DetailRow
                                key={label}
                                label={label}
                                value={value}
                                isSwitch={true}
                                switchValue={isOtherColorCode}
                                onToggleSwitch={setIsOtherColorCode}
                            />
                        );
                    }
                    return <DetailRow key={label} label={label} value={value} />;
                })}
            </View>

            <View style={allStyles.buttonContainer}>
                <Button
                    mode="contained"
                    onPress={() => { alert('Changes Saved!'); }}
                    style={allStyles.saveButton}
                    labelStyle={allStyles.saveButtonText}
                >
                    Save Changes
                </Button>
            </View>
        </View>
    );
}


// --- STYLES FOR THE ALL CONTENT COMPONENT ---
const allStyles = StyleSheet.create({
    container: {
        // No top-level padding needed as it inherits from profileCard
    },
    
    detailListContainer: {
        paddingTop: 0, 
        paddingBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f8',
    },
    labelContainer: {
        flex: 1,
        maxWidth: '40%', 
    },
    label: {
        fontSize: 15,
        color: '#1f2937',
        fontWeight: '500',
    },
    
    valueActionsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 15,
    },
    valueText: {
        fontSize: 15,
        color: '#374151',
        fontWeight: '400',
        maxWidth: '60%', 
    },
    
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    switchStyle: {
        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    },

    actionIcons: {
        flexDirection: 'row',
        gap: 10,
    },
    iconButton: {
        padding: 5,
    },

    buttonContainer: {
        paddingTop: 20,
        alignItems: 'flex-end',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        marginTop: 10, 
    },
    saveButton: {
        backgroundColor: '#0d2b8f',
        borderRadius: 8,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
        paddingHorizontal: 10
    }
});