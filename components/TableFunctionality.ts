import { Schedule } from "./TableComponent"; // Adjust the import path as needed

const ZAC_URL = "http://192.168.4.1";

function createJson(schedule: Schedule[], swID: number) {
  const result = {
    switchID: swID,
    numSchedules: schedule.length,
    Schedules: {} as Record<string, any>,
  };

  schedule.forEach((sched, index) => {
    const scheduleKey = `Schedule_${index + 1}`;
    result.Schedules[scheduleKey] = {
      switchID: swID,
      scheduleID: sched.scheduleID,
      isActive: sched.isActive,
      repMode: sched.repMode,
      timeModeON: sched.timeModeON,
      dayON: sched.dayON,
      monON: sched.monON,
      yearON: sched.yearON,
      hourON: sched.hourON,
      minON: sched.minON,
      timeModeOFF: sched.timeModeOFF,
      dayOFF: sched.dayOFF,
      monOFF: sched.monOFF,
      yearOFF: sched.yearOFF,
      hourOFF: sched.hourOFF,
      minOFF: sched.minOFF,
    };
  });

  return JSON.stringify(result);
}

export async function sendCurrentData(
  schedule: Schedule[],
  setSchedule: React.Dispatch<React.SetStateAction<Schedule[]>>,
  swID: number,
  setConnectToChip: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    schedule.forEach((sched) => {
      sched.isActive = true;
    });
    const table_json = createJson(schedule, swID + 1);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000); // Set timeout to 1 second

    const response = await fetch(
      `${ZAC_URL}/Post?ScheduleTable&SwitchID=${swID + 1}`,
      {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
        body: table_json,
      }
    );

    clearTimeout(timeoutId); // Clear the timeout if the fetch completes successfully

    const data = await response.text();
    if (data !== "Schedule table stored successfully.") {
      schedule.forEach((sched) => {
        sched.isActive = false;
      });
      setConnectToChip(false);
    }
    setSchedule(schedule);
  } catch (error: unknown) {
    setConnectToChip(false);
  }
}

interface ResponseData {
  switchID: number;
  numSchedules: number;
  Schedules: Schedule;
}
export async function getCurrentData(
  setSchedule: React.Dispatch<React.SetStateAction<Schedule[]>>,
  swID: number,
  setConnectToChip: React.Dispatch<React.SetStateAction<boolean>>
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000); // Set timeout to 1 second

  try {
    const response = await fetch(
      `${ZAC_URL}/Get?ScheduleTable&SwitchID=${swID + 1}`,
      {
        method: "GET",
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (response.ok) {
      const data: ResponseData = await response.json();
      const scheduleArray: Schedule[] = Object.values(data.Schedules).map(
        (schedule: any) => ({
          switchID: Number(schedule.switchID),
          scheduleID: Number(schedule.scheduleID),
          isActive: schedule.isActive === "true" || schedule.isActive === true,
          repMode: String(schedule.repMode),
          timeModeON: String(schedule.timeModeON),
          dayON: String(schedule.dayON),
          monON: String(schedule.monON),
          yearON: String(schedule.yearON),
          hourON: String(schedule.hourON),
          minON: String(schedule.minON),
          timeModeOFF: String(schedule.timeModeOFF),
          dayOFF: String(schedule.dayOFF),
          monOFF: String(schedule.monOFF),
          yearOFF: String(schedule.yearOFF),
          hourOFF: String(schedule.hourOFF),
          minOFF: String(schedule.minOFF),
        })
      );

      setSchedule(scheduleArray);
    } else {
      setConnectToChip(false);
    }
  } catch (error: unknown) {
    setConnectToChip(false);
  }
}

export async function setSwitchMode(
  switchID: number,
  mode: string,
  setConnectToChip: React.Dispatch<React.SetStateAction<boolean>>
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000); // Set timeout to 1 second

  try {
    const response = await fetch(
      `${ZAC_URL}/Set?OperationMode&ID=${switchID + 1}&Mode=${mode}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // timeout: 3000, // Note: fetch does not support timeout natively
      }
    );

    clearTimeout(timeoutId);
    if (response.ok) {
      return;
    } else {
      setConnectToChip(false);
    }
  } catch (error) {
    setConnectToChip(false);
  }
}

export async function setLightMode(
  switchID: number,
  state: string,
  setConnectToChip: React.Dispatch<React.SetStateAction<boolean>>
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000); // Set timeout to 1 second
  try {
    const response = await fetch(
      `${ZAC_URL}/Set?Switch&ID=${switchID + 1}&State=${state}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    clearTimeout(timeoutId);

    if (response.ok) {
      return;
    } else {
      setConnectToChip(false);
    }
  } catch (error) {
    setConnectToChip(false);
  }
}
