import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HeaderNav from './components/HeaderNav';
import StaffGate from './components/StaffGate';
import OrderForm from './components/OrderForm';
import OrdersBoard from './components/OrdersBoard';
import Hero3D from './components/Hero3D';

const LS_KEY = 'quickfast.orders.v1';

function App() {
  const [activeTab, setActiveTab] = useState('order'); // 'order' | 'staff'
  const [staffAuthenticated, setStaffAuthenticated] = useState(false);
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setOrders(JSON.parse(raw));
    } catch (e) {
      console.error('No se pudieron cargar los pedidos', e);
    }
  }, []);

  // Persist orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('No se pudieron guardar los pedidos', e);
    }
  }, [orders]);

  const pendingCount = useMemo(
    () => orders.filter((o) => o.status !== 'listo').length,
    [orders]
  );

  const handleCreateOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
    setActiveTab('staff');
  };

  const handleAdvanceOrder = (id) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        if (o.status === 'pendiente') return { ...o, status: 'preparando' };
        if (o.status === 'preparando') return { ...o, status: 'listo' };
        return o;
      })
    );
  };

  const handleDeleteOrder = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const unlockStaff = () => setStaffAuthenticated(true);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HeaderNav
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        staffAuthenticated={staffAuthenticated}
      />

      <Hero3D />

      <main className="relative -mt-16 z-10">
        <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === 'order' && (
              <motion.section
                key="order"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold tracking-tight">Haz tu pedido</h2>
                  <p className="text-gray-600">Elige del menú y envíalo a la cocina.</p>
                </div>
                <OrderForm onCreateOrder={handleCreateOrder} />
              </motion.section>
            )}

            {activeTab === 'staff' && (
              <motion.section
                key="staff"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-6 flex items-end justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Panel de pedidos</h2>
                    <p className="text-gray-600">
                      {pendingCount} pedido{pendingCount === 1 ? '' : 's'} en curso
                    </p>
                  </div>
                  {!staffAuthenticated && (
                    <span className="text-sm text-gray-500">Se requiere código de acceso</span>
                  )}
                </div>
                {!staffAuthenticated ? (
                  <StaffGate onUnlock={unlockStaff} />
                ) : (
                  <OrdersBoard
                    orders={orders}
                    onAdvance={handleAdvanceOrder}
                    onDelete={handleDeleteOrder}
                  />
                )}
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="py-10 text-center text-sm text-gray-500 mt-auto">
        Hecho con ❤️ para QuickFast — Animaciones con Framer Motion y 3D con Spline
      </footer>
    </div>
  );
}

export default App;
