import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

// Pastikan Anda telah menginstal @solana/wallet-adapter-react-ui untuk tombol UI yang siap pakai.
// npm install @solana/wallet-adapter-react-ui

const WalletModal = ({ isOpen, onClose }) => {
  const { connected } = useWallet();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="relative w-full max-w-md p-6 mx-auto rounded-xl shadow-2xl transform transition-all duration-300 ease-out" 
        onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam modal menutupnya
        style={{ 
          // Desain Gradient untuk background modal
          background: 'linear-gradient(135deg, #1e3a8a 0%, #064e3b 100%)' // Gradien Biru Tua ke Hijau Tua
        }}
      >
        
        {/* Header */}
        <h2 className="text-3xl font-bold text-white mb-6 text-center tracking-wider">
          Connect Your Wallet
        </h2>

        {/* Status Koneksi */}
        {connected ? (
          <div className="text-center text-lg text-green-300 mb-4 p-2 border border-green-300 rounded-lg">
            Wallet Connected! 🎉
          </div>
        ) : (
          <p className="text-center text-gray-300 mb-6">
            Pilih penyedia wallet Anda untuk melanjutkan.
          </p>
        )}

        {/* Tombol Utama "Connect" / WalletMultiButton */}
        {/* WalletMultiButton akan menampilkan modal koneksi wallet Solanas secara default */}
        <div className="flex justify-center">
          {/* Untuk memenuhi permintaan "button 'connect'" yang dihias dengan gradient, kita akan menggunakan button standar
             dan membiarkan WalletMultiButton di belakang layar. Namun, cara yang lebih baik adalah menggunakan 
             WalletMultiButton yang sudah disediakan. Karena permintaan spesifik, kita gunakan tombol kustom. 
             Catatan: Dalam implementasi nyata, Anda biasanya menggunakan WalletModalProvider, dan WalletMultiButton akan menangani ini. */}
          <WalletMultiButton>
            <span className="p-3 text-lg font-semibold text-white">
                {connected ? "Change Wallet" : "Connect"}
            </span>
          </WalletMultiButton>
        </div>
        
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-gray-300 transition duration-150"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WalletModal;