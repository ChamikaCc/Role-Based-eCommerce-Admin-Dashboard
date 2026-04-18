import React, { useEffect, useState } from "react";
import { Box, H2, H4, Text } from "@adminjs/design-system";

const DashboardPage = (props) => {
  const currentAdmin = props?.currentAdmin;

  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/dashboard");
      const data = await res.json();
      setStats(data);
    }
    fetchData();
  }, []);

  return (
    <Box variant="grey" p="xl">
      <H2>eCommerce Admin Dashboard</H2>

      <Text mt="lg">Welcome, {currentAdmin?.email}</Text>
      <Text>Your role: {currentAdmin?.role}</Text>

      
      <Box mt="xl">
        <H4>System Stats</H4>
        <Text>Total Users: {stats.users}</Text>
        <Text>Total Products: {stats.products}</Text>
        <Text>Total Orders: {stats.orders}</Text>
      </Box>

      {/*Role-based UI*/}
      {currentAdmin?.role === "admin" ? (
        <Box mt="xl">
          <H4>Admin Summary</H4>
          <Text>- Full system access</Text>
          <Text>- Can manage users, settings</Text>
        </Box>
      ) : (
        <Box mt="xl">
          <H4>User Summary</H4>
          <Text>- Limited access</Text>
          <Text>- Users/Settings hidden</Text>
        </Box>
      )}
    </Box>
  );
};

export default DashboardPage;