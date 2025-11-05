import React from 'react';
import { CheckCircle2, Clock, Trash2, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';

const Currency = ({ value }) => (
  <span>{value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</span>
);

const StatusBadge = ({ status }) => {
  const map = {
    pendiente: 'bg-amber-100 text-amber-800',
    preparando: 'bg-blue-100 text-blue-800',
    listo: 'bg-emerald-100 text-emerald-800',
  };
  const label = {
    pendiente: 'Pendiente',
    preparando: 'Preparando',
    listo: 'Listo',
  }[status];
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${map[status]}`}>{label}</span>
  );
};

const OrdersBoard = ({ orders, onAdvance, onDelete }) => {
  const grouped = {
    pendiente: orders.filter((o) => o.status === 'pendiente'),
    preparando: orders.filter((o) => o.status === 'preparando'),
    listo: orders.filter((o) => o.status === 'listo'),
  };

  const Column = ({ title, status, children }) => (
    <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">{title}</h3>
        <StatusBadge status={status} />
      </div>
      <div className="space-y-3 min-h-[120px]">
        {children}
      </div>
    </div>
  );

  const OrderCard = ({ order, idx }) => (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: idx * 0.03 }}
      className="border border-gray-200 rounded-xl p-3 bg-white shadow-xs"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-md bg-gray-900 text-white grid place-items-center shadow">
            <Utensils className="w-4 h-4" />
          </div>
          <div>
            <p className="font-medium">{order.customer}</p>
            <p className="text-xs text-gray-500">#{order.id.slice(-6)}</p>
          </div>
        </div>
        <span className="text-sm font-medium"><Currency value={order.total} /></span>
      </div>
      <ul className="mt-2 text-sm text-gray-700 list-disc list-inside space-y-0.5">
        {order.items.map((it) => (
          <li key={it.id}>
            {it.qty}× {it.name}
          </li>
        ))}
      </ul>
      {order.notes && (
        <p className="mt-2 text-xs text-gray-500">Nota: {order.notes}</p>
      )}
      <div className="mt-3 flex items-center justify-end gap-2">
        {order.status !== 'listo' && (
          <button
            onClick={() => onAdvance(order.id)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm bg-gray-900 text-white hover:bg-black"
          >
            {order.status === 'pendiente' ? (
              <>
                <Clock className="w-4 h-4" /> A preparar
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" /> Marcar listo
              </>
            )}
          </button>
        )}
        <button
          onClick={() => onDelete(order.id)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <Trash2 className="w-4 h-4" />
          Eliminar
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Column title="Pendientes" status="pendiente">
        {grouped.pendiente.length === 0 && (
          <p className="text-sm text-gray-500">Sin pedidos pendientes.</p>
        )}
        {grouped.pendiente.map((o, i) => (
          <OrderCard key={o.id} order={o} idx={i} />
        ))}
      </Column>
      <Column title="En preparación" status="preparando">
        {grouped.preparando.length === 0 && (
          <p className="text-sm text-gray-500">Nada en preparación.</p>
        )}
        {grouped.preparando.map((o, i) => (
          <OrderCard key={o.id} order={o} idx={i} />
        ))}
      </Column>
      <Column title="Listos" status="listo">
        {grouped.listo.length === 0 && (
          <p className="text-sm text-gray-500">Aún no hay pedidos listos.</p>
        )}
        {grouped.listo.map((o, i) => (
          <OrderCard key={o.id} order={o} idx={i} />
        ))}
      </Column>
    </div>
  );
};

export default OrdersBoard;
