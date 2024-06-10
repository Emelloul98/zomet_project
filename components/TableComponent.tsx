import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Table, TableWrapper, Row } from "react-native-table-component";

const TableComponent: React.FC = () => {
  const [tableHead, setTableHead] = useState<string[]>([
    "Head1",
    "Head2",
    "Head3",
    "Head4",
  ]);
  const [tableData, setTableData] = useState<string[][]>([
    ["1", "2", "3", "4"],
    ["a", "b", "c", "d"],
    ["1", "2", "3", "4"],
    ["a", "b", "c", "d"],
  ]);

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
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6, textAlign: "center" },
  row: { flexDirection: "row", backgroundColor: "#FFF1C1" },
  cell: { flex: 1, borderWidth: 1, borderColor: "#C1C0B9", padding: 10 }, // Add padding to the cells
  input: { height: 40, textAlign: "center" },
});

export default TableComponent;
