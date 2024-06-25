import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Button, StyleSheet } from "react-native";
import DisplaySchedules from "./DisplaySchedules";
import Icon from "react-native-vector-icons/FontAwesome";

export interface Schedule {
  switchID: number;
  scheduleID: number;
  isActive: boolean;
  repMode: string;
  timeModeON: string;
  dayON: string;
  monON: string;
  yearON: string;
  hourON: string;
  minON: string;
  timeModeOFF: string;
  dayOFF: string;
  monOFF: string;
  yearOFF: string;
  hourOFF: string;
  minOFF: string;
}

interface TableComponentProps {
  schedules: Schedule[];
  setSchedules: React.Dispatch<React.SetStateAction<Schedule[]>>;
}

const TableComponent: React.FC<TableComponentProps> = ({
  schedules,
  setSchedules,
}) => {
  const [localSchedules, setLocalSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    setLocalSchedules(schedules);
  }, [schedules]);

  const default_values: Omit<Schedule, "scheduleID"> = {
    switchID: 1,
    isActive: false,
    repMode: "daily",
    timeModeON: "localTime",
    dayON: "0",
    monON: "0",
    yearON: "5784",
    hourON: "8",
    minON: "00",
    timeModeOFF: "localTime",
    dayOFF: "0",
    monOFF: "0",
    yearOFF: "5784",
    hourOFF: "10",
    minOFF: "00",
  };

  const addSchedule = () => {
    const newSchedule: Schedule = {
      ...default_values,
      scheduleID: localSchedules.length + 1,
    };
    const updatedSchedules = [...localSchedules, newSchedule];
    setLocalSchedules(updatedSchedules);
    setSchedules(updatedSchedules); // Update the parent state
  };

  const deleteSchedule = () => {
    const updatedSchedules = localSchedules.slice(0, -1);
    setLocalSchedules(updatedSchedules);
    setSchedules(updatedSchedules); // Update the parent state
  };

  const updateSchedule = (
    id: number,
    field: string,
    newValue: string | number
  ) => {
    const updatedSchedules = localSchedules.map((schedule) =>
      schedule.scheduleID === id ? { ...schedule, [field]: newValue } : schedule
    );
    setLocalSchedules(updatedSchedules);
    setSchedules(updatedSchedules); // Update the parent state
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.table}>
        <View style={styles.main_header}>
          <Button title="-" onPress={deleteSchedule} />
          <Text style={styles.header_text}>טבלת תזמונים</Text>
          <Button title="+" onPress={addSchedule} />
        </View>
        <View>
          <View style={styles.row}>
            <View style={styles.cell_icon}>
              <Icon name="arrow-down" size={12} color="black" />
            </View>
            <Text style={styles.cell_time_modes}>סוג זמן</Text>
            <Text style={styles.cell_time}>זמן</Text>
            <Text style={styles.cell_day}>יום</Text>
            <Text style={styles.cell}>חזרות</Text>
            <Text style={styles.cell_id}>#</Text>
          </View>
          <View style={styles.data_rows}>
            <DisplaySchedules
              schedules={localSchedules}
              updateSchedule={updateSchedule}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  table: {
    margin: 5,
  },
  main_header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 2,
    borderColor: "#c8e1ff",
    backgroundColor: "#f1f8ff",
  },
  header_text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },

  cell: {
    width: "18.5%",
    padding: 11,
    fontSize: 12,
    textAlign: "center",
    justifyContent: "center",

    borderColor: "#ddd",
    borderWidth: 1,
    fontWeight: "bold",
  },

  cell_id: {
    fontSize: 12,
    width: "6.5%",
    padding: 0,
    textAlign: "center",
    justifyContent: "center",

    borderColor: "#ddd",
    borderWidth: 1,
    fontWeight: "bold",
  },

  cell_time: {
    fontSize: 12,
    width: "19.2%",
    padding: 11,
    textAlign: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    fontWeight: "bold",
  },

  cell_day: {
    fontSize: 12,
    width: "32.2%",
    textAlign: "center",
    borderColor: "#ddd",
    padding: 11,
    borderWidth: 1,
    fontWeight: "bold",
  },

  cell_time_modes: {
    fontSize: 12,
    width: "17.5%",
    padding: 11,
    textAlign: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    fontWeight: "bold",
  },

  cell_icon: {
    width: "6%",
    padding: 2,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  data_rows: {},
});

export default TableComponent;
