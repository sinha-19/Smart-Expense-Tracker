import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, LogOut, Mail, Phone, Globe } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { useTransactions } from '../contexts/TransactionContext';
const ProfilePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser, logout } = useAuth();
  const { transactions } = useTransactions();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };
  const exportTransactionsCSV = () => {
    setLoading(true);
    try {
      const headers = ['Date', 'Type', 'Category', 'Amount', 'Note'];
      const csvRows = [
        headers.join(','),
        ...transactions.map(t => {
          const date = new Date(t.date).toLocaleDateString();
          const type = t.type;
          const category = t.category;
          const amount = t.amount;
          const note = t.note ? `"${t.note.replace(/"/g, '""')}"` : '';
          return [date, type, category, amount, note].join(',');
        })
      ];
      const csvString = csvRows.join('\n');
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `expense-tracker-export-${new Date().toISOString().slice(0, 10)}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting transactions:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold dark:text-white mb-6">Profile</h1>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                <p className="mt-1 text-lg dark:text-white">{currentUser?.email}</p>
              </div>          
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Created</h3>
                <p className="mt-1 dark:text-white">
                  {currentUser?.metadata.creationTime 
                    ? new Date(currentUser.metadata.creationTime).toLocaleDateString() 
                    : 'Not available'}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              icon={<LogOut size={16} />}
            >
              Sign Out
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Export your transaction data as a CSV file for backup or analysis in other applications.
            </p>
            <Button 
              variant="outline" 
              onClick={exportTransactionsCSV}
              isLoading={loading}
              icon={<Download size={16} />}
            >
              Export Transactions (CSV)
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Author Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Developer</h3>
                <p className="mt-1 dark:text-white">Saket Kumar Sinha</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-gray-500" />
                <a href="mailto:imsaket123@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                  imsaket123@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-gray-500" />
                <p className="dark:text-white">+91-91620-87327</p>
              </div>
              <div className="flex items-center space-x-2">
                <Globe size={16} className="text-gray-500" />
                <a href="https://sinha-19.github.io/Portfolio/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  https://sinha-19.github.io/Portfolio/
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>App Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Version</h3>
                <p className="mt-1 dark:text-white">1.0.0</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Tech Stack</h3>
                <p className="mt-1 dark:text-white">Typescript, ffReact, Firebase, Tailwind CSS</p>
              </div>
              <div className="pt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                © 2025 Smart Expense Tracker. All rights reserved.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default ProfilePage;