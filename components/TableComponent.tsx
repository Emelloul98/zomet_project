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
  setSchedule: React.Dispatch<React.SetStateAction<Schedule[]>>;
  swID: number;
}

const TableComponent: React.FC<TableComponentProps> = ({
  schedules,
  setSchedule,
  swID,
}) => {
  const [localSchedules, setLocalSchedules] = useState<Schedule[]>(schedules);

  useEffect(() => {
    setLocalSchedules(schedules);
    setSchedule(schedules);
  }, [schedules]);

  const default_values: Omit<Schedule, "scheduleID"> = {
    switchID: swID,
    isActive: false,
    repMode: "daily",
    timeModeON: "localTime",
    dayON: "0",
    monON: "0",
    yearON: "0",
    hourON: "00",
    minON: "00",
    timeModeOFF: "localTime",
    dayOFF: "0",
    monOFF: "0",
    yearOFF: "0",
    hourOFF: "00",
    minOFF: "00",
  };

  const addSchedule = () => {
    const newSchedule: Schedule = {
      ...default_values,
      scheduleID: localSchedules.length + 1,
    };
    const updatedSchedules = [...localSchedules, newSchedule];
    setLocalSchedules(updatedSchedules);
    setSchedule(updatedSchedules); // Update the parent state
  };

  const deleteSchedule = () => {
    const updatedSchedule = localSchedules.slice(0, -1);
    setLocalSchedules(updatedSchedule);
    setSchedule(updatedSchedule); // Update the parent state
  };

  const updateSchedule = (
    id: number,
    field: string,
    newValue: string | number
  ) => {
    const updatedSchedules = localSchedules.map((schedule) => {
      if (schedule.scheduleID === id) {
        if (field !== "isActive" && schedule.isActive) {
          return { ...schedule, [field]: newValue, isActive: false };
        } else {
          return { ...schedule, [field]: newValue };
        }
      }
      return schedule;
    });

    setLocalSchedules(updatedSchedules);
    setSchedule(updatedSchedules); // Update the parent state
  };

  const batchUpdateSchedule = (id: number, newRepMode: string) => {
    const ZERO = "0";
    const DOUBLE_ZERO = "00";
    const ONE = "1";
    const YEAR_5784 = "5784";
    const local = "localTime";

    const updates: { field: string; newValue: string | number | boolean }[] =
      [];

    updates.push({ field: "repMode", newValue: newRepMode });
    updates.push({ field: "isActive", newValue: false });

    switch (newRepMode) {
      case "daily":
        updates.push(
          { field: "timeModeON", newValue: local },
          { field: "timeModeOFF", newValue: local },
          { field: "monON", newValue: ZERO },
          { field: "yearON", newValue: ZERO },
          { field: "hourON", newValue: DOUBLE_ZERO },
          { field: "minON", newValue: DOUBLE_ZERO },
          { field: "monOFF", newValue: ZERO },
          { field: "yearOFF", newValue: ZERO },
          { field: "hourOFF", newValue: DOUBLE_ZERO },
          { field: "minOFF", newValue: DOUBLE_ZERO },
          { field: "dayON", newValue: ZERO },
          { field: "dayOFF", newValue: ZERO }
        );
        break;
      case "weekly":
        updates.push(
          { field: "dayON", newValue: ONE },
          { field: "monON", newValue: ZERO },
          { field: "yearON", newValue: ZERO },
          { field: "dayOFF", newValue: ONE },
          { field: "monOFF", newValue: ZERO },
          { field: "yearOFF", newValue: ZERO }
        );
        break;
      case "monthlyHe":
        updates.push(
          { field: "dayON", newValue: ONE },
          { field: "monON", newValue: ZERO },
          { field: "yearON", newValue: ZERO },
          { field: "dayOFF", newValue: ONE },
          { field: "monOFF", newValue: ZERO },
          { field: "yearOFF", newValue: ZERO }
        );
        break;
      case "yearlyHe":
        updates.push(
          { field: "dayON", newValue: ONE },
          { field: "monON", newValue: ONE },
          { field: "yearON", newValue: ZERO },
          { field: "dayOFF", newValue: ONE },
          { field: "monOFF", newValue: ONE },
          { field: "yearOFF", newValue: ZERO }
        );
        break;
      case "singleHe":
        updates.push(
          { field: "dayON", newValue: ONE },
          { field: "monON", newValue: ONE },
          { field: "yearON", newValue: YEAR_5784 },
          { field: "dayOFF", newValue: ONE },
          { field: "monOFF", newValue: ONE },
          { field: "yearOFF", newValue: YEAR_5784 }
        );
        break;
      case "shabatot":
      case "chagim":
        updates.push(
          { field: "timeModeON", newValue: local },
          { field: "timeModeOFF", newValue: local },
          { field: "monON", newValue: ZERO },
          { field: "yearON", newValue: ZERO },
          { field: "hourON", newValue: DOUBLE_ZERO },
          { field: "minON", newValue: DOUBLE_ZERO },
          { field: "monOFF", newValue: ZERO },
          { field: "yearOFF", newValue: ZERO },
          { field: "hourOFF", newValue: DOUBLE_ZERO },
          { field: "minOFF", newValue: DOUBLE_ZERO },
          { field: "dayON", newValue: ZERO },
          { field: "dayOFF", newValue: ZERO }
        );
        break;
      default:
        console.warn(`Unknown repMode: ${newRepMode}`);
        return;
    }

    const updatedSchedules = localSchedules.map((schedule) => {
      if (schedule.scheduleID === id) {
        const updatedSchedule = updates.reduce(
          (acc, update) => {
            return { ...acc, [update.field]: update.newValue };
          },
          { ...schedule }
        );
        return updatedSchedule;
      }
      return schedule;
    });

    setLocalSchedules(updatedSchedules);
    setSchedule(updatedSchedules); // Update the parent state once
  };

  return (
    <SafeAreaView>
      <View style={styles.table}>
        <View style={styles.main_header}>
          <Button title="-" onPress={deleteSchedule} color={"#007E97"} />
          <Text style={styles.header_text}>טבלת תזמונים</Text>
          <Button title="+" onPress={addSchedule} color={"#007E97"} />
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
              batchUpdateSchedule={batchUpdateSchedule} // Add this line
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  table: {
    margin: 5,
  },
  main_header: {
    flexDirection: "row-reverse", //@@@
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
    flexDirection: "row-reverse", //@@@
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
