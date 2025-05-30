import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '../components/ui/Button';
import TransactionList from '../components/transactions/TransactionList';
import TransactionForm from '../components/transactions/TransactionForm';
import { useTransactions } from '../contexts/TransactionContext';
import { Transaction } from '../types';
const TransactionsPage: React.FC = () => {
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const handleAddTransaction = async (transaction: Omit<Transaction, 'id' | 'createdAt' | 'userId'>) => {
    try {
      await addTransaction(transaction);
      setShowAddTransaction(false);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };
  const handleUpdateTransaction = async (transaction: Omit<Transaction, 'id' | 'createdAt' | 'userId'>) => {
    if (!editingTransaction) return;
    try {
      await updateTransaction(editingTransaction.id, transaction);
      setEditingTransaction(null);
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };
  const handleDeleteTransaction = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteTransaction(id);
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    }
  };
  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };
  const handleCloseForm = () => {
    setShowAddTransaction(false);
    setEditingTransaction(null);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Transactions</h1>
        <Button 
          variant="primary" 
          size="md" 
          onClick={() => setShowAddTransaction(true)}
          icon={<Plus size={18} />}
        >
          Add Transaction
        </Button>
      </div>
      <TransactionList 
        transactions={transactions}
        onEdit={handleEdit}
        onDelete={handleDeleteTransaction}
      />
      {(showAddTransaction || editingTransaction) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {editingTransaction ? (
                <TransactionForm
                  onSubmit={handleUpdateTransaction}
                  onCancel={handleCloseForm}
                  defaultValues={editingTransaction}
                  isEditing={true}
                />
              ) : (
                <TransactionForm
                  onSubmit={handleAddTransaction}
                  onCancel={handleCloseForm}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default TransactionsPage;