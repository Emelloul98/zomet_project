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
  swID: number
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
      alert("Failed to send data.");
    }
    setSchedule(schedule);
  } catch (error: unknown) {
    if ((error as { name: string }).name === "AbortError") {
      alert("Request timed out.");
    } else {
      alert(error);
    }
  }
}

interface ResponseData {
  switchID: number;
  numSchedules: number;
  Schedules: Schedule;
}
export async function getCurrentData(
  setSchedule: React.Dispatch<React.SetStateAction<Schedule[]>>,
  swID: number
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 1000); // Set timeout to 1 second

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
      const scheduleArray = Object.values(data.Schedules);
      setSchedule(scheduleArray);
    } else {
      alert(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error: unknown) {
    alert(error);
  }
}

export async function setSwitchMode(switchID: number, mode: string) {
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
    if (response.ok) {
      return;
    } else {
      alert("Failed to setSwitchMode.");
    }
  } catch (error) {
    alert("Failed setSwitchMode.$");
    alert("Error: " + error);
    console.error("Error:", error);
  }
}

export async function setLightMode(switchID: number, state: string) {
  const response = await fetch(
    `${ZAC_URL}/Set?Switch&ID=${switchID + 1}&State=${state}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.ok) {
    return;
  }
}

