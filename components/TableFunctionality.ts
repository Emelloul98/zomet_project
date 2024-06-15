import { Schedule } from './TableComponent';  // Adjust the import path as needed

export function sendCurrentData(schedules: Schedule[]) {
  const table_json = JSON.stringify(schedules);

  fetch("https://nodejsserver-production-try.up.railway.app/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: table_json,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      alert("Data sent successfully!");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to send data.");
    });
}

export function getCurrentData(setSchedules: React.Dispatch<React.SetStateAction<Schedule[]>>) {
  fetch("https://nodejsserver-production-try.up.railway.app", {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })  
    .then((data) => {
      console.log("Success:", data);
      setSchedules(data); // Update the schedules state with the retrieved data
      alert("Data retrieved successfully!");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to retrieve data.");
    });
}