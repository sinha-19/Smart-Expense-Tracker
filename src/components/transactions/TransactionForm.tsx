import React from 'react';
import { useForm } from 'react-hook-form';
import { Plus, X } from 'lucide-react';
import { Transaction, TransactionType, CategoryType } from '../../types';
import Button from '../ui/Button';
import { format } from 'date-fns'
interface TransactionFormProps {
  onSubmit: (data: Omit<Transaction, 'id' | 'createdAt' | 'userId'>) => void;
  onCancel: () => void;
  defaultValues?: Partial<Transaction>;
  isEditing?: boolean;
}
const categoryOptions: { value: CategoryType; label: string }[] = [
  { value: 'food', label: 'Food & Dining' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'housing', label: 'Housing & Rent' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'personal', label: 'Personal Care' },
  { value: 'debt', label: 'Debt Payment' },
  { value: 'savings', label: 'Savings' },
  { value: 'gifts', label: 'Gifts & Donations' },
  { value: 'salary', label: 'Salary & Income' },
  { value: 'investments', label: 'Investments' },
  { value: 'other', label: 'Other' },
];
const TransactionForm: React.FC<TransactionFormProps> = ({
  onSubmit,
  onCancel,
  defaultValues,
  isEditing = false,
}) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<
    Omit<Transaction, 'id' | 'createdAt' | 'userId'>
  >({
    defaultValues: {
      amount: defaultValues?.amount || 0,
      type: defaultValues?.type || 'expense',
      category: defaultValues?.category || 'other',
      note: defaultValues?.note || '',
      date: defaultValues?.date 
        ? typeof defaultValues.date === 'string'
          ? defaultValues.date.substring(0, 10)
          : format(new Date(defaultValues.date), 'yyyy-MM-dd')
        : format(new Date(), 'yyyy-MM-dd'),
    },
  });
  const transactionType = watch('type');
  const filteredCategories = categoryOptions.filter(category => {
    if (transactionType === 'income') {
      return ['salary', 'investments', 'other', 'gifts'].includes(category.value);
    }
    return category.value !== 'salary' && category.value !== 'investments';
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold dark:text-white">
          {isEditing ? 'Edit Transaction' : 'Add Transaction'}
        </h2>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={onCancel}
          icon={<X size={18} />}
          aria-label="Close"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400">₹</span>
            </div>
            <input
              id="amount"
              type="number"
              step="0.01"
              {...register('amount', { 
                required: 'Amount is required',
                min: { value: 0.01, message: 'Amount must be greater than 0' } 
              })}
              className="block w-full pl-8 pr-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date
          </label>
          <input
            id="date"
            type="date"
            {...register('date', { required: 'Date is required' })}
            className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
          )}
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Type
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                {...register('type', { required: true })}
                value="expense"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Expense</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                {...register('type', { required: true })}
                value="income"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Income</span>
            </label>
          </div>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">Please select a type</p>
          )}
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            id="category"
            {...register('category', { required: 'Category is required' })}
            className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          >
            {filteredCategories.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Note (Optional)
          </label>
          <textarea
            id="note"
            {...register('note')}
            rows={3}
            className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Add details about this transaction..."
          />
        </div>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" icon={<Plus size={18} />}>
          {isEditing ? 'Update' : 'Add'} Transaction
        </Button>
      </div>
    </form>
  );
};
export default TransactionForm;