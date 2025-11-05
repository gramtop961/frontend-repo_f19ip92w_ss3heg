import React, { useState } from 'react';
import { LockKeyhole, KeyRound } from 'lucide-react';

const StaffGate = ({ onUnlock }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim().toLowerCase() === 'quickfast') {
      setError('');
      onUnlock();
    } else {
      setError('Código incorrecto. Intenta nuevamente.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gray-900 text-white grid place-items-center">
          <LockKeyhole className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Acceso del personal</h2>
          <p className="text-sm text-gray-500">Ingresa el código para ver los pedidos.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            placeholder="••••••••"
            autoFocus
          />
          {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 w-full justify-center bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-black transition"
        >
          <KeyRound className="w-4 h-4" />
          Desbloquear
        </button>
      </form>
    </div>
  );
};

export default StaffGate;
