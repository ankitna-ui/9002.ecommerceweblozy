"use client";

import React, { useEffect, useState } from "react";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { Order } from "@/types";
import { useAuth } from "@/hooks/useAuth";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchData() {
      if (!token) return;
      try {
        const res = await fetch("/api/admin/orders", { headers: { "Authorization": token } });
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [token]);

  if (loading) return <div className="p-8 text-center">Loading orders...</div>;

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
        <p className="text-muted-foreground">Track and manage customer orders and fulfillment status.</p>
      </div>
      <OrdersTable orders={orders} />
    </div>
  );
}
