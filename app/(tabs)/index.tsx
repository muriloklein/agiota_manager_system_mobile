import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

const API_URL = "http://localhost:3002/api/webmob";

interface Client {
  id: number;
  name: string;
  phone: string;
  address: string;
  bill: string;
}

export default function HomeScreen() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentClient, setCurrentClient] = useState<Partial<Client>>({
    name: "",
    phone: "",
    address: "",
    bill: "",
  });

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<Client[]>(`${API_URL}/clients`);
      setClients(response.data || []);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      setClients([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveClient = async () => {
    setIsLoading(true);
    try {
      if (currentClient.id) {
        await axios.put(`${API_URL}/client/${currentClient.id}`, currentClient);
      } else {
        await axios.post(`${API_URL}/client`, currentClient);
      }
      setShowModal(false);
      fetchClients();
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClient = async (id: number) => {
    setIsLoading(true);
    try {
      await axios.delete(`${API_URL}/client/${id}`);
      fetchClients();
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Client }) => (
    <View style={styles.item}>
      <Text style={styles.text}>
        <Text style={styles.label}>Nome:</Text> {item.name} {"\n"}
        <Text style={styles.label}>Conta (R$):</Text> {item.bill}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setCurrentClient(item);
            setShowModal(true);
          }}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDeleteClient(item.id)}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator size="large" color="#fff" />}
      <FlatList
        data={clients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setCurrentClient({ name: "", phone: "", address: "", bill: "" });
          setShowModal(true);
        }}
      >
        <Text style={styles.addButtonText}>Adicionar Cliente</Text>
      </TouchableOpacity>

      <Modal visible={showModal} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={currentClient.name}
              onChangeText={(text) =>
                setCurrentClient((prev) => ({ ...prev, name: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              value={currentClient.phone}
              onChangeText={(text) =>
                setCurrentClient((prev) => ({ ...prev, phone: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Endereço"
              value={currentClient.address}
              onChangeText={(text) =>
                setCurrentClient((prev) => ({ ...prev, address: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Valor Devido"
              keyboardType="numeric"
              value={currentClient.bill?.toString()}
              onChangeText={(text) =>
                setCurrentClient((prev) => ({ ...prev, bill: text }))
              }
            />
            <View style={styles.modalActions}>
              <Button title="Salvar" onPress={handleSaveClient} />
              <Button title="Cancelar" onPress={() => setShowModal(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    padding: 16,
  },
  item: {
    backgroundColor: "#333",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 24,
    textAlign: "left",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    color: "#3498db",
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    marginTop: 8,
  },
  button: {
    padding: 8,
    backgroundColor: "#555",
    borderRadius: 4,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: "#f55",
  },
  buttonText: {
    color: "#fff",
  },
  addButton: {
    backgroundColor: "#1e90ff",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    width: "90%",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 16,
    padding: 8,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
