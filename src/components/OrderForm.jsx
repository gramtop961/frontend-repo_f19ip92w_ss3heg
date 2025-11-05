import React, { useMemo, useState } from 'react';
import { Plus, Minus, ShoppingCart, StickyNote } from 'lucide-react';

const MENU = [
  { id: 'b1', name: 'Hamburguesa Clásica', price: 6.5 },
  { id: 'b2', name: 'Hamburguesa Doble Queso', price: 8.0 },
  { id: 'p1', name: 'Papas Fritas', price: 2.5 },
  { id: 'p2', name: 'Aros de Cebolla', price: 3.0 },
  { id: 'd1', name: 'Refresco', price: 1.8 },
  { id: 'd2', name: 'Limonada', price: 2.0 },
];

const Currency = ({ value }) => (
  <span>{value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</span>
);

const OrderForm = ({ onCreateOrder }) => {
  const [quantities, setQuantities] = useState({});
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');

  const cart = useMemo(() => {
    return MENU.filter((m) => (quantities[m.id] || 0) > 0).map((m) => ({
      ...m,
      qty: quantities[m.id] || 0,
      lineTotal: (quantities[m.id] || 0) * m.price,
    }));
  }, [quantities]);

  const total = useMemo(
    () => cart.reduce((sum, i) => sum + i.lineTotal, 0),
    [cart]
  );

  const adjustQty = (id, delta) => {
    setQuantities((prev) => {
      const next = { ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) };
      return next;
    });
  };

  const resetForm = () => {
    setQuantities({});
    setName('');
    setNotes('');
  };

  const submit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    const order = {
      id: `${Date.now()}`,
      customer: name.trim() || 'Sin nombre',
      notes: notes.trim(),
      items: cart.map(({ id, name, price, qty }) => ({ id, name, price, qty })),
      total,
      status: 'pendiente',
      createdAt: new Date().toISOString(),
    };
    onCreateOrder(order);
    resetForm();
  };

  return (
    <div className="grid md:grid-cols-5 gap-6">
      <div className="md:col-span-3 space-y-4">
        <h2 className="text-lg font-semibold">Menú</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {MENU.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500"><Currency value={item.price} /></p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => adjustQty(item.id, -1)}
                    className="w-8 h-8 rounded-md border border-gray-300 text-gray-700 grid place-items-center hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center tabular-nums">{quantities[item.id] || 0}</span>
                  <button
                    type="button"
                    onClick={() => adjustQty(item.id, 1)}
                    className="w-8 h-8 rounded-md bg-orange-500 text-white grid place-items-center hover:bg-orange-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="md:col-span-2">
        <form onSubmit={submit} className="border border-gray-200 rounded-xl p-4 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-orange-500" />
            Tu pedido
          </h2>
          <div className="space-y-2 max-h-56 overflow-auto pr-1">
            {cart.length === 0 && (
              <p className="text-sm text-gray-500">Agrega productos del menú.</p>
            )}
            {cart.map((line) => (
              <div key={line.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{line.qty}× {line.name}</span>
                <span className="font-medium"><Currency value={line.lineTotal} /></span>
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del cliente</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Ej. Ana Pérez"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <StickyNote className="w-4 h-4 text-gray-400" /> Notas (opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Sin pepinillos, poco hielo, etc."
              rows={3}
            />
          </div>
          <div className="flex items-center justify-between border-t pt-3">
            <span className="text-sm text-gray-600">Total</span>
            <span className="text-lg font-semibold"><Currency value={total} /></span>
          </div>
          <button
            type="submit"
            disabled={cart.length === 0}
            className="w-full inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4" />
            Enviar pedido
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
