import { createContext, useContext, useState } from "react";

const VitalsContext = createContext();

export function VitalsProvider({ children }) {
  const [vitalsData, setVitalsData] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const updateVitals = (data) => {
    setVitalsData(data);

    // If AI returned advice, push it as a notification
    if (data.shouldNotify && data.advice) {
      const newNotif = {
        id: Date.now(),
        title: "Health Alert",
        message: data.advice,
        emoji: "🤖",
        time: "Today",
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }
  };

  return (
    <VitalsContext.Provider value={{ vitalsData, updateVitals, notifications }}>
      {children}
    </VitalsContext.Provider>
  );
}

export function useVitals() {
  return useContext(VitalsContext);
}
