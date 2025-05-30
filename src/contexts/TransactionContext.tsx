import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  getDocs,
  orderBy,
  Timestamp,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';
import { Transaction, TransactionType, CategoryType, MonthlyData, CategorySum } from '../types';
import { startOfMonth, endOfMonth, format } from 'date-fns';
const categoryColors: Record<CategoryType, string> = {
  food: '#F87171',
  transportation: '#60A5FA',
  housing: '#34D399',
  utilities: '#A78BFA',
  entertainment: '#FBBF24',
  healthcare: '#EC4899',
  education: '#8B5CF6',
  shopping: '#F472B6',
  personal: '#14B8A6',
  debt: '#EF4444',
  savings: '#22C55E',
  gifts: '#F59E0B',
  salary: '#3B82F6',
  investments: '#10B981',
  other: '#6B7280'
};
interface TransactionContextType {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'userId'>) => Promise<void>;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  getMonthlyData: (date?: Date) => MonthlyData;
  getCategorySummary: (type: TransactionType, date?: Date) => CategorySum[];
}
const TransactionContext = createContext<TransactionContextType | undefined>(undefined);
export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}
export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();
  useEffect(() => {
    if (!currentUser) {
      setTransactions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const transactionsRef = collection(db, 'transactions');
    const q = query(
      transactionsRef, 
      where('userId', '==', currentUser.uid),
      orderBy('date', 'desc')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const transactionsData: Transaction[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          amount: data.amount,
          type: data.type,
          category: data.category,
          note: data.note,
          date: data.date.toDate(),
          createdAt: data.createdAt.toDate(),
          userId: data.userId
        };
      });
      
      setTransactions(transactionsData);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching transactions:", err);
      setError("Failed to load transactions. Please try again later.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  async function addTransaction(transaction: Omit<Transaction, 'id' | 'createdAt' | 'userId'>) {
    if (!currentUser) return;
    
    try {
      await addDoc(collection(db, 'transactions'), {
        ...transaction,
        amount: Number(transaction.amount),
        date: typeof transaction.date === 'string' 
          ? Timestamp.fromDate(new Date(transaction.date)) 
          : Timestamp.fromDate(transaction.date),
        createdAt: Timestamp.now(),
        userId: currentUser.uid
      });
    } catch (err) {
      console.error("Error adding transaction:", err);
      setError("Failed to add transaction. Please try again.");
      throw err;
    }
  }
  async function updateTransaction(id: string, transaction: Partial<Transaction>) {
    if (!currentUser) return; 
    try {
      const transactionRef = doc(db, 'transactions', id);
      const updateData: any = { ...transaction };
      if (transaction.date) {
        updateData.date = typeof transaction.date === 'string' 
          ? Timestamp.fromDate(new Date(transaction.date)) 
          : Timestamp.fromDate(transaction.date);
      }
      if (transaction.amount) {
        updateData.amount = Number(transaction.amount);
      }
      await updateDoc(transactionRef, updateData);
    } catch (err) {
      console.error("Error updating transaction:", err);
      setError("Failed to update transaction. Please try again.");
      throw err;
    }
  }
  async function deleteTransaction(id: string) {
    if (!currentUser) return; 
    try {
      const transactionRef = doc(db, 'transactions', id);
      await deleteDoc(transactionRef);
    } catch (err) {
      console.error("Error deleting transaction:", err);
      setError("Failed to delete transaction. Please try again.");
      throw err;
    }
  }
  function getMonthlyData(date = new Date()): MonthlyData {
    const start = startOfMonth(date);
    const end = endOfMonth(date); 
    const filteredTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate >= start && transactionDate <= end;
    });
    const totalIncome = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      startDate: start,
      endDate: end
    };
  }
  function getCategorySummary(type: TransactionType, date = new Date()): CategorySum[] {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const filteredTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return t.type === type && transactionDate >= start && transactionDate <= end;
    });
    const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
    const categoryMap = new Map<CategoryType, number>();
    filteredTransactions.forEach(t => {
      const currentAmount = categoryMap.get(t.category) || 0;
      categoryMap.set(t.category, currentAmount + t.amount);
    });
    const result: CategorySum[] = Array.from(categoryMap.entries()).map(([category, amount]) => ({
      category,
      amount,
      percentage: totalAmount > 0 ? (amount / totalAmount) * 100 : 0,
      color: categoryColors[category]
    }));
    return result.sort((a, b) => b.amount - a.amount);
  }
  const value = {
    transactions,
    loading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getMonthlyData,
    getCategorySummary
  };
  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}