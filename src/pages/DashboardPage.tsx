import React, { useState } from 'react';
import { format, subMonths, addMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import SummaryCard from '../components/dashboard/SummaryCard';
import ExpenseChart from '../components/dashboard/ExpenseChart';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useTransactions } from '../contexts/TransactionContext';
import { useAuth } from '../contexts/AuthContext';
import TransactionForm from '../components/transactions/TransactionForm';
import { Transaction } from '../types';
const DashboardPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const { transactions, addTransaction, getMonthlyData, getCategorySummary } = useTransactions();
  const { currentUser } = useAuth();
  const monthlyData = getMonthlyData(currentDate);
  const expensesByCategory = getCategorySummary('expense', currentDate);
  const handlePreviousMonth = () => {
    setCurrentDate(prev => subMonths(prev, 1));
  };
  const handleNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };
  const handleAddTransaction = async (transaction: Omit<Transaction, 'id' | 'createdAt' | 'userId'>) => {
    try {
      await addTransaction(transaction);
      setShowAddTransaction(false);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };
  const formatMonthYear = (date: Date) => {
    return format(date, 'MMMM yyyy');
  };
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Dashboard</h1>
        <Button 
          variant="primary" 
          size="md" 
          onClick={() => setShowAddTransaction(true)}
          icon={<Plus size={18} />}
        >
          Add Transaction
        </Button>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Welcome{currentUser?.email ? `, ${currentUser.email.split('@')[0]}` : ''}!
        </h2>
      </div>
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePreviousMonth}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
          {formatMonthYear(currentDate)}
        </h3>
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SummaryCard 
          title="Income" 
          amount={monthlyData.totalIncome} 
          type="income" 
        />
        <SummaryCard 
          title="Expenses" 
          amount={monthlyData.totalExpense} 
          type="expense" 
        />
        <SummaryCard 
          title="Balance" 
          amount={monthlyData.balance} 
          type="balance" 
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ExpenseChart data={expensesByCategory} />
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {recentTransactions.length > 0 ? (
              <div className="space-y-4">
                {recentTransactions.map(transaction => (
                  <div key={transaction.id} className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors">
                    <div>
                      <p className="font-medium">{transaction.category}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {format(new Date(transaction.date), 'MMM dd, yyyy')}
                      </p>
                      {transaction.note && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                          {transaction.note}
                        </p>
                      )}
                    </div>
                    <p className={`font-medium ${transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {transaction.type === 'income' ? '+' : '-'}
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(transaction.amount)}
                    </p>
                  </div>
                ))}
                <div className="pt-2 text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.href = '/transactions'}
                  >
                    View All Transactions
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-6">
                No recent transactions to display.
              </p>
            )}
          </CardContent>
        </Card>
      </div>    
      {showAddTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <TransactionForm
                onSubmit={handleAddTransaction}
                onCancel={() => setShowAddTransaction(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DashboardPage;