import React, { useEffect, useMemo, useState } from 'react';
import HeaderNav from './components/HeaderNav';
import StaffGate from './components/StaffGate';
import OrderForm from './components/OrderForm';
import OrdersBoard from './components/OrdersBoard';

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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <HeaderNav
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        staffAuthenticated={staffAuthenticated}
      />

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {activeTab === 'order' && (
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold tracking-tight">Haz tu pedido</h2>
              <p className="text-gray-600">Elige del menú y envíalo a la cocina.</p>
            </div>
            <OrderForm onCreateOrder={handleCreateOrder} />
          </section>
        )}

        {activeTab === 'staff' && (
          <section>
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
          </section>
        )}
      </main>

      <footer className="py-8 text-center text-sm text-gray-500">
        Hecho con ❤️ para QuickFast
      </footer>
    </div>
  );
}

export default App;
