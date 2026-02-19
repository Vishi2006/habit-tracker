import React from 'react';

export default function FlashMessage({ message, type = 'info', onClose }) {
  const isSuccess = type === 'success';
  const bg = isSuccess ? 'bg-accent-green/20 text-accent-green' : 'bg-accent-red/20 text-accent-red';
  return (
    <div
      className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg border border-border ${bg} flex items-center justify-between gap-4 min-w-100`}
      role="alert"
    >
      <span className="text-sm font-medium">{message}</span>
      {onClose && (
        <button type="button" onClick={onClose} className="text-current hover:opacity-80" aria-label="Close">
          ✕
        </button>
      )}
    </div>
  );
}
