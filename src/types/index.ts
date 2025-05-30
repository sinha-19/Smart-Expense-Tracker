export type TransactionType = 'income' | 'expense';
export type CategoryType = 
  | 'food' 
  | 'transportation' 
  | 'housing' 
  | 'utilities' 
  | 'entertainment' 
  | 'healthcare' 
  | 'education' 
  | 'shopping' 
  | 'personal' 
  | 'debt' 
  | 'savings' 
  | 'gifts' 
  | 'salary' 
  | 'investments' 
  | 'other';
export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: CategoryType;
  note?: string;
  date: Date | string;
  createdAt: Date | string;
  userId: string;
}
export interface MonthlyData {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  startDate: Date;
  endDate: Date;
}
export interface CategorySum {
  category: CategoryType;
  amount: number;
  percentage: number;
  color: string;
}