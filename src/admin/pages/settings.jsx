import React, { useEffect, useState } from "react";
import { Box, H2, Text, Button, Input } from "@adminjs/design-system";

const SettingsPage = (props) => {
  const currentAdmin = props?.currentAdmin;

  const [settings, setSettings] = useState([]);

  // Role check
  if (currentAdmin?.role !== "admin") {
    return (
      <Box>
        <H2>Access Denied</H2>
        <Text>You are not allowed to view this page.</Text>
      </Box>
    );
  }

  //Load settings
  useEffect(() => {
    async function fetchSettings() {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setSettings(data);
    }

    fetchSettings();
  }, []);

  //Handle change
  const handleChange = (index, value) => {
    const updated = [...settings];
    updated[index].value = value;
    setSettings(updated);
  };

  // Save update
  const handleSave = async (setting) => {
    await fetch(`/api/settings/${setting.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: setting.value }),
    });

    alert("Updated successfully!");
  };

  return (
    <Box variant="white" p="xl">
      <H2>System Settings</H2>

      {settings.map((setting, index) => (
        <Box key={setting.id} mt="lg">
          <Text>{setting.key}</Text>

          <Input
            value={setting.value}
            onChange={(e) => handleChange(index, e.target.value)}
          />

          <Button mt="sm" onClick={() => handleSave(setting)}>
            Save
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default SettingsPage;