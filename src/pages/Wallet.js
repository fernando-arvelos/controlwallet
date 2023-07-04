import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <main className="bg-img flex flex-col items-center">
        <div className="header-wallet">
          <Header />
          <WalletForm />
        </div>
        <Table />
      </main>
    );
  }
}

export default Wallet;
