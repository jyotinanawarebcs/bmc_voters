import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Modal, Portal, TextInput, Button } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';

interface MobileEditModalProps {
    visible: boolean;
    currentMobile: string;
    onDismiss: () => void;
    onSave: (newMobile: string) => void;
}

const MobileEditModal: React.FC<MobileEditModalProps> = ({ 
    visible, 
    currentMobile, 
    onDismiss, 
    onSave 
}) => {
    const [newMobile, setNewMobile] = useState(currentMobile);
    
    // Reset state when modal is dismissed/closed
    const handleDismiss = () => {
        setNewMobile(currentMobile);
        onDismiss();
    };

    const handleClear = () => {
        setNewMobile('');
    };

    const handleSave = () => {
        // Simple validation: check if the new number is provided
        if (newMobile.trim().length > 5) {
            onSave(newMobile.trim());
        } else {
            // Optionally, show an error message
            alert('Please enter a valid mobile number.');
        }
    };

    return (
        <Portal>
            <Modal 
                visible={visible} 
                onDismiss={handleDismiss} 
                contentContainerStyle={modalStyles.modalContainer}
            >
                <View style={modalStyles.header}>
                    <Text style={modalStyles.headerText}>Edit Mobile Number</Text>
                    <Feather 
                        name="x" 
                        size={24} 
                        color="#fff" 
                        onPress={handleDismiss} 
                        style={modalStyles.closeIcon} 
                    />
                </View>
                
                <View style={modalStyles.content}>
                    <Text style={modalStyles.label}>Enter New Mobile Number</Text>
                    
                    <TextInput
                        mode="outlined"
                        placeholder="+91 98765 43210"
                        value={newMobile}
                        onChangeText={setNewMobile}
                        keyboardType="phone-pad"
                        style={modalStyles.input}
                        outlineStyle={modalStyles.inputOutline}
                        left={<TextInput.Icon icon="phone" size={20} color="#6b7280" />}
                    />
                    
                    <Text style={modalStyles.infoText}>
                        Please verify the number before saving.
                    </Text>
                    
                    <View style={modalStyles.buttonContainer}>
                        <Button 
                            mode="outlined" 
                            onPress={handleClear}
                            labelStyle={modalStyles.clearButtonText}
                            style={modalStyles.clearButton}
                        >
                            Clear
                        </Button>
                        <Button 
                            mode="outlined" 
                            onPress={handleDismiss}
                            labelStyle={modalStyles.cancelButtonText}
                            style={modalStyles.cancelButton}
                        >
                            Cancel
                        </Button>
                        <Button 
                            mode="contained" 
                            onPress={handleSave}
                            labelStyle={modalStyles.saveButtonText}
                            style={modalStyles.saveButton}
                        >
                            Save
                        </Button>
                    </View>
                </View>
            </Modal>
        </Portal>
    );
};

// --- Modal Styles ---
const modalStyles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderRadius: 12,
        overflow: 'hidden',
        maxWidth: 400, // Limit width for web/desktop feel
        alignSelf: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#0a4bff', // Blue color from image
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
    closeIcon: {
        padding: 5,
    },
    content: {
        padding: 20,
    },
    label: {
        fontSize: 14,
        color: '#1f2937',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        marginBottom: 10,
        backgroundColor: '#f9fafb',
    },
    inputOutline: {
        borderRadius: 8,
        borderColor: '#d1d5db',
    },
    infoText: {
        fontSize: 13,
        color: '#6b7280',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
    },
    clearButton: {
        borderColor: '#d1d5db',
        backgroundColor: '#fff',
    },
    cancelButton: {
        borderColor: '#d1d5db',
        backgroundColor: '#fff',
    },
    saveButton: {
        backgroundColor: '#0a4bff',
    },
    clearButtonText: {
        color: '#374151',
        fontWeight: '600',
    },
    cancelButtonText: {
        color: '#374151',
        fontWeight: '600',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
});

export default MobileEditModal;