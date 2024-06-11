import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Table, Row, TableWrapper } from "react-native-table-component";
import { normalize, normalizeHeight } from "@/styles/globalDimension";

const [tableHead, setTableHead] = useState<string[]>([
  "סטטוס",
  "סוג זמן",
  "שעה",
  "דקה",
  "יום",
  "חזרות",
  "#",
]);
const [tableData, setTableData] = useState<string[][]>([
  ["1", "2", "3", "4"],
  ["a", "b", "c", "d"],
  ["1", "2", "3", "4"],
  ["a", "b", "c", "d"],
]);
const TableComponent: React.FC = () => {
  const handleInputChange = (
    value: string,
    rowIndex: number,
    colIndex: number
  ) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = value;
    setTableData(newData);
  };

  const renderCell = (cellData: string, rowIndex: number, colIndex: number) => (
    <TextInput
      style={styles.input}
      value={cellData}
      onChangeText={(text) => handleInputChange(text, rowIndex, colIndex)}
    />
  );

  const sendCurToServer = () => {
    const jsonStr = JSON.stringify({ data: tableData });
    fetch("https://nodejsserver-production-try.up.railway.app/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonStr,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((text) => {
        try {
          const data = JSON.parse(text);
          alert("Data sent to server successfully!");
          console.log(data);
        } catch (error) {
          throw new Error("Failed to parse JSON response");
        }
      })
      .catch((error) => {
        alert(error.message || "Failed to send data to server.");
        console.error("Error:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        {tableData.map((rowData, rowIndex) => (
          <TableWrapper key={rowIndex} style={styles.row}>
            {rowData.map((cellData, colIndex) => (
              <View key={colIndex} style={styles.cell}>
                {renderCell(cellData, rowIndex, colIndex)}
              </View>
            ))}
          </TableWrapper>
        ))}
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: {
    height: normalizeHeight(40),
    width: normalize(220),
    backgroundColor: "#f1f8ff",
  },
  text: { margin: 6, textAlign: "center" },
  cell: { flex: 1, borderWidth: 1, borderColor: "#C1C0B9" },
  row: { flexDirection: "row", backgroundColor: "#FFF1C1" },
  input: { height: 40, textAlign: "center" },
});

export default TableComponent;
