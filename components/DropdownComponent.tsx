import React, { useState } from "react";
import { StyleSheet, View, TextStyle } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";
import { StyleProp } from "react-native";

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
        placeholderStyle={styles.placeholderStyle} // Optional: Placeholder text style
        selectedTextStyle={styles.selectedTextStyle} // Optional: Selected item text style
        itemTextStyle={styles.itemTextStyle} // Customizing item text style
        data={data}
        labelField="label"
        valueField="value"
        placeholder={currentValue}
        value={value}
        onChange={(item) => {
          setValue(item.value);
          onValueChange(item.value);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 5,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#231dd3",
    width: '50%',
  },

  placeholderStyle: {
    fontSize: 11, // Optional: Font size for the placeholder text
  },
  selectedTextStyle: {
    fontSize: 11, // Optional: Font size for the selected item text
  },
  itemTextStyle: {
    fontSize: 11, // Customize the font size for item text
  },
});
