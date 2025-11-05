import React from 'react';
import { ShoppingCart, LockKeyhole, ChefHat } from 'lucide-react';

const HeaderNav = ({ activeTab, onChangeTab, staffAuthenticated }) => {
  return (
    <header className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-orange-500 text-white font-bold">QF</span>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">QuickFast</h1>
            <p className="text-xs text-gray-500 -mt-0.5">Comida rápida, servicio rápido</p>
          </div>
        </div>
        <nav className="flex items-center gap-2">
          <button
            onClick={() => onChangeTab('order')}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition ${
              activeTab === 'order'
                ? 'bg-orange-500 text-white shadow'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            aria-current={activeTab === 'order' ? 'page' : undefined}
          >
            <ShoppingCart className="w-4 h-4" />
            Hacer pedido
          </button>
          <button
            onClick={() => onChangeTab('staff')}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition ${
              activeTab === 'staff'
                ? 'bg-gray-900 text-white shadow'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            aria-current={activeTab === 'staff' ? 'page' : undefined}
          >
            <ChefHat className="w-4 h-4" />
            Recibir pedidos
            {!staffAuthenticated && (
              <LockKeyhole className="w-4 h-4 ml-1 opacity-70" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default HeaderNav;
