import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/MaterialIcons";

interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownComponentProps {
  data: DropdownItem[];
  currentValue: string;
  onValueChange: (newValue: string) => void;
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({
  data,
  currentValue,
  onValueChange,
}) => {
  const [value, setValue] = useState(currentValue);

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={currentValue}
        value={value}
        onChange={(item) => {
          setValue(item.value);
          onValueChange(item.value);
        }}
        renderRightIcon={() => (
          <Icon name="arrow-drop-down" size={24} color="#ffffff" />
        )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#007E97",
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#d1d1d1",
    width: "70%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  dropdown: {
    height: 36,
    backgroundColor: "#007E97",
    borderRadius: 18,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 13,
    color: "#9e9e9e",
    textAlign: "center",
  },
  selectedTextStyle: {
    fontSize: 15,
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
  itemTextStyle: {
    fontSize: 13,
    color: "#424242",
    textAlign: "center",
  },
});
