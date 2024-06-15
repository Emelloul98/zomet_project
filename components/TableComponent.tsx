import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Button, StyleSheet } from "react-native";
import DisplaySchedules from "./DisplaySchedules";

export interface Schedule {
  switchID: number;
  scheduleID: number;
  isActive: boolean;
  repMode: string;
  timeModeON: string;
  dayON: number;
  monON: number;
  yearON: number;
  hourON: number;
  minON: number;
  timeModeOFF: string;
  dayOFF: number;
  monOFF: number;
  yearOFF: number;
  hourOFF: number;
  minOFF: number;
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

  const default_values = {
    switchID: 1,
    isActive: true,
    repMode: "Daily",
    timeModeON: "AM",
    dayON: 1,
    monON: 1,
    yearON: 2024,
    hourON: 8,
    minON: 0,
    timeModeOFF: "PM",
    dayOFF: 1,
    monOFF: 1,
    yearOFF: 2024,
    hourOFF: 6,
    minOFF: 0,
  };

  const addSchedule = () => {
    let new_row = { ...default_values, scheduleID: localSchedules.length + 1 };
    setLocalSchedules([...localSchedules, new_row]);
    setSchedules([...localSchedules, new_row]); // Update the parent state
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
            <Text style={styles.cell}> ---</Text>
            <Text style={styles.cell}>סוג זמן</Text>
            <Text style={styles.cell}>שעה</Text>
            <Text style={styles.cell}>דקה</Text>
            <Text style={styles.cell}>יום</Text>
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
    margin: 6,
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
    width: "16%",
    padding: 10,
    fontSize: 12,
    textAlign: "center",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  cell_id: {
    fontSize: 12,
    width: "4%",
    padding: 4,
    textAlign: "center",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  data_rows: {},
});

export default TableComponent;
