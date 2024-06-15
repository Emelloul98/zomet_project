import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Schedule } from "./TableComponent";
import DropdownComponent from "./DropdownComponent";

interface DisplaySchedulesProps {
  schedules: Schedule[];
  updateSchedule: (
    id: number,
    field: string,
    newValue: string | number
  ) => void;
}

const week_days = [
  { label: "א", value: "1" },
  { label: "ב", value: "2" },
  { label: "ג", value: "3" },
  { label: "ד", value: "4" },
  { label: "ה", value: "5" },
  { label: "ו", value: "6" },
  { label: "ש", value: "7" },
];

const hours = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString();
  return { label: hour, value: hour };
});

const minutes = Array.from({ length: 60 }, (_, i) => {
  const minute = i.toString();
  return { label: minute, value: minute };
});

const rep_options = [
  { label: "AM", value: "AM" },
  { label: "PM", value: "PM" },
];

const time_modes = [
  { label: "AM", value: "AM" },
  { label: "PM", value: "PM" },
];

const DisplaySchedules: React.FC<DisplaySchedulesProps> = ({
  schedules,
  updateSchedule,
}) => {
  return (
    <View style={styles.container}>
      {schedules.map((schedule) => (
        <View key={schedule.scheduleID} style={styles.schedule_row}>
          <Text style={styles.id}>{schedule.scheduleID}</Text>
          <Text style={styles.rep_mode}>{schedule.repMode}</Text>
          <View style={styles.schedule_data}>
            <View style={styles.data_group}>
              <DropdownComponent
                data={week_days}
                currentValue={schedule.dayON.toString()}
                onValueChange={(newValue) =>
                  updateSchedule(schedule.scheduleID, "dayON", newValue)
                }
              />
              <DropdownComponent
                data={week_days}
                currentValue={schedule.dayOFF.toString()}
                onValueChange={(newValue) =>
                  updateSchedule(schedule.scheduleID, "dayOFF", newValue)
                }
              />
            </View>
            <View style={styles.data_group}>
              <DropdownComponent
                data={minutes}
                currentValue={schedule.minON.toString()}
                onValueChange={(newValue) =>
                  updateSchedule(schedule.scheduleID, "minON", newValue)
                }
              />
              <DropdownComponent
                data={minutes}
                currentValue={schedule.minOFF.toString()}
                onValueChange={(newValue) =>
                  updateSchedule(schedule.scheduleID, "minOFF", newValue)
                }
              />
            </View>
            <View style={styles.data_group}>
              <DropdownComponent
                data={hours}
                currentValue={schedule.hourON.toString()}
                onValueChange={(newValue) =>
                  updateSchedule(schedule.scheduleID, "hourON", newValue)
                }
              />
              <DropdownComponent
                data={hours}
                currentValue={schedule.hourOFF.toString()}
                onValueChange={(newValue) =>
                  updateSchedule(schedule.scheduleID, "hourOFF", newValue)
                }
              />
            </View>
            <View style={styles.data_group}>
              <DropdownComponent
                data={time_modes}
                currentValue={schedule.timeModeON}
                onValueChange={(newValue) =>
                  updateSchedule(schedule.scheduleID, "timeModeON", newValue)
                }
              />
              <DropdownComponent
                data={time_modes}
                currentValue={schedule.timeModeOFF}
                onValueChange={(newValue) =>
                  updateSchedule(schedule.scheduleID, "timeModeOFF", newValue)
                }
              />
            </View>
          </View>
          <Text style={styles.is_burned}>{schedule.isActive.toString()}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  schedule_row: {
    flexDirection: "row-reverse",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  id: {
    fontSize: 12,
    width: "4%",
    padding: 4,
    borderColor: "#ddd",
    borderWidth: 1,
    textAlign: "center",
  },
  rep_mode: {
    fontSize: 12,
    width: "16%",
    padding: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    textAlign: "center",
  },
  schedule_data: {
    fontSize: 12,
    width: "64%",
    flexDirection: "row-reverse",
    textAlign: "center",
  },
  is_burned: {
    fontSize: 12,
    width: "16%",
    padding: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    textAlign: "center",
  },
  value_cell: {
    fontSize: 12,
    padding: 5,
    textAlign: "center",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  data_group: {
    width: "25%",
  },
});

export default DisplaySchedules;
