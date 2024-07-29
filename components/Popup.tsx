import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";

/**
 * Popup component displays a modal with a message.
 *
 * @param {boolean} visible - Determines whether the modal is visible.
 * @param {string} message - The message to display inside the modal.
 *
 * @returns {JSX.Element} The rendered modal component.
 */

const Popup = ({ visible, message }: { visible: boolean; message: string }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Dimmed background
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20, // Rounded corners
    padding: 35,
    alignItems: "center",
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Shadow elevation
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
});

export default Popup;
