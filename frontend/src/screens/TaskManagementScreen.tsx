import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TaskScreen() {
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), title: newTask, completed: false },
    ]);
    setNewTask("");
  };

  const toggleComplete = (id: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const data =
    activeTab === "active"
      ? tasks.filter((t) => !t.completed)
      : tasks.filter((t) => t.completed);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>

      {/* ---------- TABS ---------- */}
      <View style={styles.toggleBar}>
        <TouchableOpacity
          onPress={() => setActiveTab("active")}
          style={[
            styles.toggleButton,
            activeTab === "active" && styles.activeToggle,
          ]}
        >
          <Text
            style={[
              styles.toggleText,
              activeTab === "active" && styles.activeText,
            ]}
          >
            Active Tasks
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("completed")}
          style={[
            styles.toggleButton,
            activeTab === "completed" && styles.activeToggle,
          ]}
        >
          <Text
            style={[
              styles.toggleText,
              activeTab === "completed" && styles.activeText,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* ---------- ADD TASK ---------- */}
      <View style={styles.addRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={newTask}
          onChangeText={setNewTask}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTask}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* ---------- LIST ---------- */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks here</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.taskCard}
            onPress={() => toggleComplete(item.id)}
          >
            <Text
              style={[
                styles.taskTitle,
                item.completed && styles.completedText,
              ]}
            >
              {item.title}
            </Text>
            <Text style={styles.status}>
              {item.completed ? "✔" : "•"}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 18,
    marginTop:20,
  },

  /* ---------- TOGGLE ---------- */
  toggleBar: {
    flexDirection: "row",
    padding: 4,
    borderRadius: 30,
    backgroundColor: "#E3E8EF",
    marginBottom: 18,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
  },
  activeToggle: {
    backgroundColor: "#007BFF",
    elevation: 3,
  },
  toggleText: {
    fontSize: 14,
    color: "#555",
    fontWeight: "600",
  },
  activeText: {
    color: "#fff",
    fontWeight: "700",
  },

  /* ---------- ADD TASK ---------- */
  addRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 12,
    fontSize: 16,
    elevation: 2,
  },
  addBtn: {
    width: 48,
    height: 48,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    borderRadius: 12,
    elevation: 3,
  },
  addBtnText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "800",
  },

  /* ---------- LIST ---------- */
  taskCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    justifyContent: "space-between",
  },
  taskTitle: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#9CA3AF",
  },
  status: {
    fontSize: 20,
    fontWeight: "700",
    color: "#007BFF",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
});
