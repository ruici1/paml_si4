import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert, ImageBackground } from "react-native";

const App = () => {
  const [dataKelas, setDataKelas] = useState([
    { id: "1", nama: "Matematika", guru: "Bu Siti", jam: "08:00 - 09:30" },
    { id: "2", nama: "Bahasa Inggris", guru: "Pak Budi", jam: "09:30 - 11:00" },
    { id: "3", nama: "IPA", guru: "Bu Rina", jam: "11:00 - 12:30" },
  ]);
  const [nama, setNama] = useState("");
  const [guru, setGuru] = useState("");
  const [jam, setJam] = useState(""); // New state for Jam Pelajaran
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSave = () => {
    if (!nama || !guru || !jam) {
      Alert.alert("Error", "Nama, Guru, dan Jam Pelajaran harus diisi.");
      return;
    }

    if (editingIndex !== null) {
      const updatedData = [...dataKelas];
      updatedData[editingIndex] = { ...updatedData[editingIndex], nama, guru, jam };
      setDataKelas(updatedData);
      setEditingIndex(null);
    } else {
      setDataKelas([
        ...dataKelas,
        { id: (dataKelas.length + 1).toString(), nama, guru, jam },
      ]);
    }

    setNama("");
    setGuru("");
    setJam("");
  };

  const handleDelete = (index) => {
    const updatedData = dataKelas.filter((_, i) => i !== index);
    setDataKelas(updatedData);
  };

  const handleEdit = (index) => {
    setNama(dataKelas[index].nama);
    setGuru(dataKelas[index].guru);
    setJam(dataKelas[index].jam); // Set the selected jam
    setEditingIndex(index);
  };

  return (
    <ImageBackground source={{ uri: "https://example.com/background-image.jpg" }} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Data Mata Pelajaran</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nama Mata Pelajaran"
            value={nama}
            onChangeText={setNama}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Guru"
            value={guru}
            onChangeText={setGuru}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Jam Pelajaran"
            value={jam}
            onChangeText={setJam}
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.addButton} onPress={handleSave}>
            <Text style={styles.addButtonText}>{editingIndex !== null ? "Simpan" : "Tambah"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tableHeader}>
          <Text style={[styles.cell, styles.headerCell, { flex: 0.5 }]}>ID</Text>
          <Text style={[styles.cell, styles.headerCell, { flex: 2 }]}>Mata Pelajaran</Text>
          <Text style={[styles.cell, styles.headerCell, { flex: 2 }]}>Guru</Text>
          <Text style={[styles.cell, styles.headerCell, { flex: 2 }]}>Jam Pelajaran</Text> {/* New Column */}
          <Text style={[styles.cell, styles.headerCell, { flex: 2 }]}>Aksi</Text>
        </View>

        <FlatList
          data={dataKelas}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.row}>
              <Text style={[styles.cell, { flex: 0.5 }]}>{item.id}</Text>
              <Text style={[styles.cell, { flex: 2 }]}>{item.nama}</Text>
              <Text style={[styles.cell, { flex: 2 }]}>{item.guru}</Text>
              <Text style={[styles.cell, { flex: 2 }]}>{item.jam}</Text> {/* Display Jam Pelajaran */}
              <View style={{ flex: 2, flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(index)}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(index)}>
                  <Text style={styles.buttonText}>Hapus</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: '#fff',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: '#000',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  headerCell: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
  },
  cell: {
    textAlign: "center",
    color: '#000',
  },
  editButton: {
    backgroundColor: '#FFD700',
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
