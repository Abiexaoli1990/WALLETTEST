import React, { useState, useMemo } from 'react';
import WalletModal from './WalletModal';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

// Import CSS untuk Wallet UI Adapter (Harus ada di file CSS global Anda)
// import '@solana/wallet-adapter-react-ui/styles.css'; 

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Pilih jaringan Solana
  const network = 'devnet'; // atau 'mainnet-beta', 'testnet'
  const endpoint = useMemo(() => `https://api.${network}.solana.com`, [network]);

  // Daftar wallet yang ingin didukung
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      // Tambahkan wallet lain di sini
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {/* Main Content */}
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <h1 className="text-4xl font-extrabold mb-8">
              Solana DApp Demo
            </h1>
            
            {/* Tombol Pemicu Modal */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3 rounded-full text-lg font-bold shadow-lg transition duration-300 ease-in-out"
              style={{
                // Desain Gradient untuk Tombol Pemicu
                background: 'linear-gradient(90deg, #10b981 0%, #3b82f6 100%)', // Gradien Hijau ke Biru
                boxShadow: '0 4px 15px rgba(59, 130, 246, 0.5)'
              }}
            >
              Connect Wallet
            </button>
          </div>
          
          {/* Modal Pemanggil Wallet */}
          <WalletModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
          />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;