import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  week_days,
  rep_options,
  time_modes,
  hebrewMonths,
  hebrewMonthDays,
  hebrewYears,
} from "./ModalData";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";
import { Schedule } from "./TableComponent";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomPicker from "../components/CustomPicker";

interface DisplaySchedulesProps {
  schedules: Schedule[];
  updateSchedule: (
    id: number,
    field: string,
    newValue: string | number
  ) => void;
  batchUpdateSchedule: (id: number, newRepMode: string) => void;
}

const DisplaySchedules: React.FC<DisplaySchedulesProps> = ({
  schedules,
  updateSchedule,
  batchUpdateSchedule,
}) => {
  const [monthlyDateState, setmMonthlyDateState] = useState<{
    [key: number]: { dayON: string; dayOFF: string };
  }>({});

  const [yearlyDateState, setmYearlyDateState] = useState<{
    [key: number]: {
      dayON: string;
      monON: string;
      dayOFF: string;
      monOFF: string;
    };
  }>({});

  const [singleDateState, setsingleDateState] = useState<{
    [key: number]: {
      dayON: string;
      monON: string;
      yearON: string;
      dayOFF: string;
      monOFF: string;
      yearOFF: string;
    };
  }>({});

  const hours = Array.from({ length: 24 }, (_, i) => ({
    label: String(i).padStart(2, "0"),
    value: String(i).padStart(2, "0"),
  }));

  const minutes = Array.from({ length: 60 }, (_, i) => ({
    label: String(i).padStart(2, "0"),
    value: String(i).padStart(2, "0"),
  }));

  const formatTimeValue = (value: string) => String(value).padStart(2, "0");

  const [isModalVisible, setModalVisible] = useState(false);
  const [pickerType, setPickerType] = useState("");
  const [currentScheduleID, setCurrentScheduleID] = useState<number | null>(
    null
  );

  const [selectedRepetition, setSelectedRepetition] = useState<{
    [key: number]: { repMode: string };
  }>({});

  const [timeState, setTimeState] = useState<{
    [key: number]: {
      hourON: string;
      minON: string;
      hourOFF: string;
      minOFF: string;
    };
  }>({});

  const [weekDaysState, setWeekDaysState] = useState<{
    [key: number]: { dayON: string; dayOFF: string };
  }>({});

  const [timeMode, setTimeMode] = useState<{
    [key: number]: { timeModeON: string; timeModeOFF: string };
  }>({});

  const toggleModal = (type: string = "", scheduleID: number | null = null) => {
    setPickerType(type);
    setCurrentScheduleID(scheduleID);
    setModalVisible(!isModalVisible);
  };

  const handleConfirm = () => {
    toggleModal();
  };

  return (
    <View style={styles.container}>
      {schedules.map((schedule, index) => (
        <View key={schedule.scheduleID} style={styles.schedule_row}>
          <View style={styles.cell_id}>
            <Text>{schedule.scheduleID.toString()}</Text>
          </View>
          <View style={styles.schedule_data}>
            <View style={styles.cell_rep}>
              <TouchableOpacity
                onPress={() => toggleModal("repetition", schedule.scheduleID)}
              >
                <Text style={styles.editableText}>
                  {rep_options.find((rep) => rep.value === schedule.repMode)
                    ?.label || "בחר חזרות"}
                </Text>
              </TouchableOpacity>
            </View>
            {schedule.repMode === "daily" ? (
              <View style={styles.cell_day}>
                <Text style={styles.editableText}>{"כל יום"}</Text>
                <Text style={styles.editableText}>{"כל יום"}</Text>
              </View>
            ) : null}
            {schedule.repMode === "weekly" ? (
              <View style={styles.cell_day}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      toggleModal("dayON", schedule.scheduleID);
                    }}
                  >
                    <Text style={styles.editableText}>
                      {week_days.find((day) => day.value === schedule.dayON)
                        ?.label || "בחר יום"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={() => toggleModal("dayOFF", schedule.scheduleID)}
                  >
                    <Text style={styles.editableText}>
                      {week_days.find((day) => day.value === schedule.dayOFF)
                        ?.label || "בחר יום"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
            {schedule.repMode === "monthlyHe" ? (
              <View style={styles.cell_day}>
                <TouchableOpacity
                  onPress={() => toggleModal("monthlyON", schedule.scheduleID)}
                >
                  <Text style={styles.editableText}>
                    {hebrewMonthDays.find((day) => day.value === schedule.dayON)
                      ?.label || "בחר יום בחודש"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => toggleModal("monthlyOFF", schedule.scheduleID)}
                >
                  <Text style={styles.editableText}>
                    {hebrewMonthDays.find(
                      (day) => day.value === schedule.dayOFF
                    )?.label || "בחר יום בחודש"}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
            {schedule.repMode === "yearlyHe" ? (
              <View style={styles.cell_day}>
                <TouchableOpacity
                  onPress={() => toggleModal("yearlyON", schedule.scheduleID)}
                >
                  <Text style={styles.editableText}>
                    {
                      hebrewMonthDays.find(
                        (day) => day.value === schedule.dayON
                      )?.label
                    }{" "}
                    {
                      hebrewMonths.find(
                        (month) => month.value === schedule.monON
                      )?.label
                    }
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => toggleModal("yearlyOFF", schedule.scheduleID)}
                >
                  <Text style={styles.editableText}>
                    {
                      hebrewMonthDays.find(
                        (day) => day.value === schedule.dayOFF
                      )?.label
                    }{" "}
                    {
                      hebrewMonths.find(
                        (month) => month.value === schedule.monOFF
                      )?.label
                    }
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
            {schedule.repMode === "singleHe" ? (
              <View style={styles.cell_day}>
                <TouchableOpacity
                  onPress={() => toggleModal("singleON", schedule.scheduleID)}
                >
                  <Text style={styles.editableText}>
                    {`${
                      hebrewMonthDays.find(
                        (day) => day.value === schedule.dayON
                      )?.label
                    } ${
                      hebrewMonths.find(
                        (month) => month.value === schedule.monON
                      )?.label
                    } ${
                      hebrewYears.find((year) => year.value === schedule.yearON)
                        ?.label
                    }`}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => toggleModal("singleOFF", schedule.scheduleID)}
                >
                  <Text style={styles.editableText}>
                    {`${
                      hebrewMonthDays.find(
                        (day) => day.value === schedule.dayOFF
                      )?.label
                    } ${
                      hebrewMonths.find(
                        (month) => month.value === schedule.monOFF
                      )?.label
                    } ${
                      hebrewYears.find(
                        (year) => year.value === schedule.yearOFF
                      )?.label
                    }`}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
            {schedule.repMode === "shabatot" ? (
              <View style={styles.cell_day}>
                <Text style={styles.editableText}>{"ערבי שבתות"}</Text>
                <Text style={styles.editableText}>{"מוצאי שבתות"}</Text>
              </View>
            ) : null}
            {schedule.repMode === "chagim" ? (
              <View style={styles.cell_day}>
                <Text style={styles.editableText}>{"ערבי חגים"}</Text>
                <Text style={styles.editableText}>{"מוצאי חגים"}</Text>
              </View>
            ) : null}

            <View style={styles.cell_time}>
              <TouchableOpacity
                onPress={() => toggleModal("timeON", schedule.scheduleID)}
              >
                <Text style={styles.editableText}>
                  {hours.find(
                    (hour) => hour.value === formatTimeValue(schedule.hourON)
                  )?.label || "00"}
                  :
                  {minutes.find(
                    (minute) => minute.value === formatTimeValue(schedule.minON)
                  )?.label || "00"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleModal("timeOFF", schedule.scheduleID)}
              >
                <Text style={styles.editableText}>
                  {hours.find(
                    (hour) => hour.value === formatTimeValue(schedule.hourOFF)
                  )?.label || "00"}
                  :
                  {minutes.find(
                    (minute) =>
                      minute.value === formatTimeValue(schedule.minOFF)
                  )?.label || "00"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cell_time_modes}>
              <TouchableOpacity
                onPress={() => toggleModal("timeModeON", schedule.scheduleID)}
              >
                <Text style={styles.editableText}>
                  {time_modes.find((mode) => mode.value === schedule.timeModeON)
                    ?.label || "בחר מצב"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleModal("timeModeOFF", schedule.scheduleID)}
              >
                <Text style={styles.editableText}>
                  {time_modes.find(
                    (mode) => mode.value === schedule.timeModeOFF
                  )?.label || "בחר מצב"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cell_icon}>
              {schedule.isActive ? (
                <Icon name="check" size={15} color="green" /> // V icon
              ) : (
                <Icon name="times" size={15} color="red" /> // X icon
              )}
            </View>
          </View>
        </View>
      ))}
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          {pickerType === "repetition" && currentScheduleID !== null && (
            <>
              <Text style={styles.title}>בחר חזרות</Text>
              <Picker
                selectedValue={
                  selectedRepetition[currentScheduleID]?.repMode || ""
                }
                style={styles.fullPicker}
                onValueChange={(itemValue) => {
                  setSelectedRepetition((prev) => {
                    const currentEntry = prev[currentScheduleID] || {
                      repMode: "",
                    };
                    return {
                      ...prev,
                      [currentScheduleID]: {
                        ...currentEntry,
                        repMode: itemValue,
                      },
                    };
                  });
                  batchUpdateSchedule(currentScheduleID, itemValue);
                }}
              >
                {rep_options.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>
            </>
          )}
          {pickerType === "dayON" && currentScheduleID !== null && (
            <>
              <Text style={styles.title}>הדלקה : בחר יום בשבוע</Text>
              <Picker
                selectedValue={weekDaysState[currentScheduleID]?.dayON || ""}
                style={styles.fullPicker}
                onValueChange={(itemValue) => {
                  setWeekDaysState((prev) => ({
                    ...prev,
                    [currentScheduleID]: {
                      ...prev[currentScheduleID],
                      dayON: itemValue,
                    },
                  }));
                  updateSchedule(currentScheduleID, "dayON", itemValue);
                }}
              >
                {week_days.map((day) => (
                  <Picker.Item
                    key={day.value}
                    label={day.label}
                    value={day.value}
                  />
                ))}
              </Picker>
            </>
          )}
          {pickerType === "dayOFF" && currentScheduleID !== null && (
            <>
              <Text style={styles.title}>כיבוי : בחר יום בשבוע</Text>
              <Picker
                selectedValue={weekDaysState[currentScheduleID]?.dayOFF || ""}
                style={styles.fullPicker}
                onValueChange={(itemValue) => {
                  setWeekDaysState((prev) => ({
                    ...prev,
                    [currentScheduleID]: {
                      ...prev[currentScheduleID],
                      dayOFF: itemValue,
                    },
                  }));
                  updateSchedule(currentScheduleID, "dayOFF", itemValue);
                }}
              >
                {week_days.map((day) => (
                  <Picker.Item
                    key={day.value}
                    label={day.label}
                    value={day.value}
                  />
                ))}
              </Picker>
            </>
          )}
          {pickerType === "monthlyON" && currentScheduleID !== null && (
            <>
              <Text style={styles.title}>הדלקה: בחר יום בחודש</Text>
              <Picker
                selectedValue={monthlyDateState[currentScheduleID]?.dayON || ""}
                style={styles.fullPicker}
                onValueChange={(itemValue) => {
                  setmMonthlyDateState((prev) => ({
                    ...prev,
                    [currentScheduleID]: {
                      ...prev[currentScheduleID],
                      dayON: itemValue,
                    },
                  }));
                  updateSchedule(currentScheduleID, "dayON", itemValue);
                }}
              >
                {hebrewMonthDays.map((day) => (
                  <Picker.Item
                    key={day.value}
                    label={day.label}
                    value={day.value}
                  />
                ))}
              </Picker>
            </>
          )}
          {pickerType === "monthlyOFF" && currentScheduleID !== null && (
            <>
              <Text style={styles.title}>כיבוי: בחר יום בחודש</Text>
              <Picker
                selectedValue={
                  monthlyDateState[currentScheduleID]?.dayOFF || ""
                }
                style={styles.fullPicker}
                onValueChange={(itemValue) => {
                  setmMonthlyDateState((prev) => ({
                    ...prev,
                    [currentScheduleID]: {
                      ...prev[currentScheduleID],
                      dayOFF: itemValue,
                    },
                  }));
                  updateSchedule(currentScheduleID, "dayOFF", itemValue);
                }}
              >
                {hebrewMonthDays.map((day) => (
                  <Picker.Item
                    key={day.value}
                    label={day.label}
                    value={day.value}
                  />
                ))}
              </Picker>
            </>
          )}
          {pickerType === "yearlyON" && currentScheduleID !== null && (
            <>
              <Text style={styles.title}>הדלקה: בחר יום וחודש</Text>
              <View style={styles.timePickerContainer}>
                <Picker
                  selectedValue={
                    yearlyDateState[currentScheduleID]?.dayON || ""
                  }
                  style={styles.timePicker}
                  onValueChange={(itemValue) => {
                    setmYearlyDateState((prev) => ({
                      ...prev,
                      [currentScheduleID]: {
                        ...prev[currentScheduleID],
                        dayON: itemValue,
                      },
                    }));
                    updateSchedule(currentScheduleID, "dayON", itemValue);
                  }}
                >
                  {hebrewMonthDays.map((day) => (
                    <Picker.Item
                      key={day.value}
                      label={day.label}
                      value={day.value}
                    />
                  ))}
                </Picker>
                <Picker
                  selectedValue={
                    yearlyDateState[currentScheduleID]?.monON || ""
                  }
                  style={styles.timePicker}
                  onValueChange={(itemValue) => {
                    setmYearlyDateState((prev) => ({
                      ...prev,
                      [currentScheduleID]: {
                        ...prev[currentScheduleID],
                        monON: itemValue,
                      },
                    }));
                    updateSchedule(currentScheduleID, "monON", itemValue);
                  }}
                >
                  {hebrewMonths.map((month) => (
                    <Picker.Item
                      key={month.value}
                      label={month.label}
                      value={month.value}
                    />
                  ))}
                </Picker>
              </View>
            </>
          )}
          {pickerType === "yearlyOFF" && currentScheduleID !== null && (
            <>
              <Text style={styles.title}>כיבוי: בחר יום וחודש</Text>
              <View style={styles.timePickerContainer}>
                <Picker
                  selectedValue={
                    yearlyDateState[currentScheduleID]?.dayOFF || ""
                  }
                  style={styles.timePicker}
                  onValueChange={(itemValue) => {
                    setmYearlyDateState((prev) => ({
                      ...prev,
                      [currentScheduleID]: {
                        ...prev[currentScheduleID],
                        dayOFF: itemValue,
                      },
                    }));
                    updateSchedule(currentScheduleID, "dayOFF", itemValue);
                  }}
                >
                  {hebrewMonthDays.map((day) => (
                    <Picker.Item
                      key={day.value}
                      label={day.label}
                      value={day.value}
                    />
                  ))}
                </Picker>
                <Picker
                  selectedValue={
                    yearlyDateState[currentScheduleID]?.monOFF || ""
                  }
                  style={styles.timePicker}
                  onValueChange={(itemValue) => {
                    setmYearlyDateState((prev) => ({
                      ...prev,
                      [currentScheduleID]: {
                        ...prev[currentScheduleID],
                        monOFF: itemValue,
                      },
                    }));
                    updateSchedule(currentScheduleID, "monOFF", itemValue);
                  }}
                >
                  {hebrewMonths.map((month) => (
                    <Picker.Item
                      key={month.value}
                      label={month.label}
                      value={month.value}
                    />
                  ))}
                </Picker>
              </View>
            </>
          )}
          {pickerType === "singleON" && currentScheduleID !== null && (
            <>
              <Text style={styles.title}>הדלקה: בחר יום חודש ושנה</Text>
              <View style={styles.pickerContainer_HE}>
                <Picker
                  selectedValue={
                    singleDateState[currentScheduleID]?.monON || ""
                  }
                  style={styles.picker_HE}
                  onValueChange={(itemValue) => {
                    setsingleDateState((prev) => ({
                      ...prev,
                      [currentScheduleID]: {
                        ...prev[currentScheduleID],
                        monON: itemValue,
                      },
                    }));
                    updateSchedule(currentScheduleID, "monON", itemValue);
                  }}
                >
                  {hebrewMonths.map((month) => (
                    <Picker.Item
                      key={month.value}
                      label={month.label}
                      value={month.value}
                    />
                  ))}
                </Picker>
                <Picker
                  selectedValue={
                    singleDateState[currentScheduleID]?.dayON || ""
                  }
                  style={styles.picker_HE}
                  onValueChange={(itemValue) => {
                    setsingleDateState((prev) => ({
                      ...prev,
                      [currentScheduleID]: {
                        ...prev[currentScheduleID],
                        dayON: itemValue,
                      },
                    }));
                    updateSchedule(currentScheduleID, "dayON", itemValue);
                  }}
                >
                  {hebrewMonthDays.map((day) => (
                    <Picker.Item
                      key={day.value}
                      label={day.label}
                      value={day.value}
                    />
                  ))}
                </Picker>
              </View>
              <Picker
                selectedValue={singleDateState[currentScheduleID]?.yearON || ""}
                style={styles.yearPicker}
                onValueChange={(itemValue) => {
                  setsingleDateState((prev) => ({
                    ...prev,
                    [currentScheduleID]: {
                      ...prev[currentScheduleID],
                      yearON: itemValue,
                    },
                  }));
                  updateSchedule(currentScheduleID, "yearON", itemValue);
                }}
              >
                {hebrewYears.map((year) => (
                  <Picker.Item
                    key={year.value}
                    label={year.label}
                    value={year.value}
                  />
                ))}
              </Picker>
            </>
          )}
          {pickerType === "singleOFF" && currentScheduleID !== null && (
            <>
              <Text style={styles.title}>כיבוי: בחר יום חודש ושנה</Text>
              <View style={styles.pickerContainer_HE}>
                <Picker
                  selectedValue={
                    singleDateState[currentScheduleID]?.monOFF || ""
                  }
                  style={styles.picker_HE}
                  onValueChange={(itemValue) => {
                    setsingleDateState((prev) => ({
                      ...prev,
                      [currentScheduleID]: {
                        ...prev[currentScheduleID],
                        monOFF: itemValue,
                      },
                    }));
                    updateSchedule(currentScheduleID, "monOFF", itemValue);
                  }}
                >
                  {hebrewMonths.map((month) => (
                    <Picker.Item
                      key={month.value}
                      label={month.label}
                      value={month.value}
                    />
                  ))}
                </Picker>

                <Picker
                  selectedValue={
                    singleDateState[currentScheduleID]?.dayOFF || ""
                  }
                  style={styles.picker_HE}
                  onValueChange={(itemValue) => {
                    setsingleDateState((prev) => ({
                      ...prev,
                      [currentScheduleID]: {
                        ...prev[currentScheduleID],
                        dayOFF: itemValue,
                      },
                    }));
                    updateSchedule(currentScheduleID, "dayOFF", itemValue);
                  }}
                >
                  {hebrewMonthDays.map((day) => (
                    <Picker.Item
                      key={day.value}
                      label={day.label}
                      value={day.value}
                    />
                  ))}
                </Picker>
              </View>

              <Picker
                selectedValue={
                  singleDateState[currentScheduleID]?.yearOFF || ""
                }
                style={styles.yearPicker}
                onValueChange={(itemValue) => {
                  setsingleDateState((prev) => ({
                    ...prev,
                    [currentScheduleID]: {
                      ...prev[currentScheduleID],
                      yearOFF: itemValue,
                    },
                  }));
                  updateSchedule(currentScheduleID, "yearOFF", itemValue);
                }}
              >
                {hebrewYears.map((month) => (
                  <Picker.Item
                    key={month.value}
                    label={month.label}
                    value={month.value}
                  />
                ))}
              </Picker>
            </>
          )}
          {pickerType === "timeON" && currentScheduleID !== null && (
            <>
              <Text style={styles.title}>בחר זמן הדלקה</Text>
              <View style={styles.timePickerContainer}>
                <Picker
                  selectedValue={timeState[currentScheduleID]?.hourON || ""}
                  style={styles.timePicker}
                  onValueChange={(itemValue) => {
                    setTimeState((prev) => ({
                      ...prev,
                      [currentScheduleID]: {
                        ...prev[currentScheduleID],
                        hourON: itemValue,
                      },
                    }));
                    updateSchedule(currentScheduleID, "hourON", itemValue);
                  }}
                >
                  {hours.map((hour) => (
                    <Picker.Item
                      key={hour.value}
                      label={hour.label}
                      value={hour.value}
                    />
                  ))}
                </Picker>
                <Picker
                  selectedValue={timeState[currentScheduleID]?.minON || ""}
                  style={styles.timePicker}
                  onValueChange={(itemValue) => {
                    setTimeState((prev) => ({
                      ...prev,
                      [currentScheduleID]: {
                        ...prev[currentScheduleID],
                        minON: itemValue,
                      },
                    }));
                    updateSchedule(currentScheduleID, "minON", itemValue);
                  }}
                >
                  {minutes.map((minute) => (
                    <Picker.Item
                      key={minute.value}
                      label={minute.label}
                      value={minute.value}
                    />
                  ))}
                </Picker>
              </View>
            </>
          )}

          {pickerType === "timeOFF" && currentScheduleID !== null && (
            <>
              <Text style={styles.title}>בחר זמן כיבוי</Text>
              <View style={styles.timePickerContainer}>
                <Picker
                  selectedValue={timeState[currentScheduleID]?.hourOFF || ""}
                  style={styles.timePicker}
                  onValueChange={(itemValue) => {
                    setTimeState((prev) => ({
                      ...prev,
                      [currentScheduleID]: {
                        ...prev[currentScheduleID],
                        hourOFF: itemValue,
                      },
                    }));
                    updateSchedule(currentScheduleID, "hourOFF", itemValue);
                  }}
                >
                  {hours.map((hour) => (
                    <Picker.Item
                      key={hour.value}
                      label={hour.label}
                      value={hour.value}
                    />
                  ))}
                </Picker>
                <Picker
                  selectedValue={timeState[currentScheduleID]?.minOFF || ""}
                  style={styles.timePicker}
                  onValueChange={(itemValue) => {
                    setTimeState((prev) => ({
                      ...prev,
                      [currentScheduleID]: {
                        ...prev[currentScheduleID],
                        minOFF: itemValue,
                      },
                    }));
                    updateSchedule(currentScheduleID, "minOFF", itemValue);
                  }}
                >
                  {minutes.map((minute) => (
                    <Picker.Item
                      key={minute.value}
                      label={minute.label}
                      value={minute.value}
                    />
                  ))}
                </Picker>
              </View>
            </>
          )}
          {pickerType === "timeModeON" && currentScheduleID !== null && (
            <>
              <Text style={styles.title}>בחר מצב זמן הדלקה</Text>
              <Picker
                selectedValue={timeMode[currentScheduleID]?.timeModeON || ""}
                style={styles.fullPicker}
                onValueChange={(itemValue) => {
                  setTimeMode((prev) => ({
                    ...prev,
                    [currentScheduleID]: {
                      ...prev[currentScheduleID],
                      timeModeON: itemValue,
                    },
                  }));
                  updateSchedule(currentScheduleID, "timeModeON", itemValue);
                }}
              >
                {time_modes.map((mode) => (
                  <Picker.Item
                    key={mode.value}
                    label={mode.label}
                    value={mode.value}
                  />
                ))}
              </Picker>
            </>
          )}
          {pickerType === "timeModeOFF" && currentScheduleID !== null && (
            <>
              <Text style={styles.title}>בחר מצב זמן כיבוי</Text>
              <Picker
                selectedValue={timeMode[currentScheduleID]?.timeModeOFF || ""}
                style={styles.fullPicker}
                onValueChange={(itemValue) => {
                  setTimeMode((prev) => ({
                    ...prev,
                    [currentScheduleID]: {
                      ...prev[currentScheduleID],
                      timeModeOFF: itemValue,
                    },
                  }));
                  updateSchedule(currentScheduleID, "timeModeOFF", itemValue);
                }}
              >
                {time_modes.map((mode) => (
                  <Picker.Item
                    key={mode.value}
                    label={mode.label}
                    value={mode.value}
                  />
                ))}
              </Picker>
            </>
          )}
          <TouchableOpacity
            onPress={handleConfirm}
            style={styles.confirmButton}
          >
            <Text style={styles.confirmButtonText}>אישור</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#fff",
  },

  confirmButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 50,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 18,
  },

  schedule_row: {
    flexDirection: "row", // @@@
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },

  timePicker: {
    width: Dimensions.get("window").width * 0.35,
  },

  picker: {
    flex: 1,
  },

  schedule_data: {
    fontSize: 12,
    width: "64%",
    flexDirection: "row", //@@@
    textAlign: "center",
  },

  cell_id: {
    fontSize: 8,
    width: "6.5%",
    padding: 0,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    fontWeight: "bold",
    display: "flex",
  },

  cell_rep: {
    width: "29%",
    padding: 0,
    fontSize: 12,
    textAlign: "center",
    justifyContent: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    fontWeight: "bold",
  },

  cell_day: {
    fontSize: 12,
    width: "50.5%",
    textAlign: "center",
    justifyContent: "center",
    borderColor: "#ddd",
    padding: 1,
    borderWidth: 1,
    fontWeight: "bold",
  },

  cell_time: {
    fontSize: 13,
    width: "30%",
    padding: 8,
    textAlign: "center",
    justifyContent: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    fontWeight: "bold",
  },

  cell_time_modes: {
    fontSize: 12,
    width: "27%",
    padding: 0,
    textAlign: "center",
    justifyContent: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    fontWeight: "bold",
  },

  cell_icon: {
    width: "9.6%",
    padding: 0,
    borderColor: "#ddd",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  icon: {
    fontSize: 5,
  },

  editableText: {
    fontSize: 12,
    color: "black",
    textAlign: "center",
    marginVertical: 10,
  },

  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.5,
  },

  title: {
    fontSize: 20,
    marginBottom: 12,
  },

  fullPicker: {
    width: Dimensions.get("window").width - 40,
    height: 216,
  },

  pickerContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },

  pickerTContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  picker_HE: {
    flex: 1,
    marginHorizontal: 5,
  },
  pickerContainer_HE: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },

  yearPicker: {
    width: "100%",
    marginBottom: 20,
  },

  timePickerContainer: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "blue",
    marginTop: 20,
  },
});

export default DisplaySchedules;
