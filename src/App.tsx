import React, { useEffect } from 'react';
import { ParticipantForm } from './components/ParticipantForm';
import { ParticipantList } from './components/ParticipantList';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { Award } from 'lucide-react';
import { useStore } from './store';

function App() {
  const { isAdmin, loadInitialData } = useStore();

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Award className="h-8 w-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-900">
                Certificate Generator
              </h1>
            </div>
            <a
              href="/admin"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = '#admin';
                window.location.reload();
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Admin Login
            </a>
          </div>
        </div>
      </header>

      {window.location.hash === '#admin' ? (
        <AdminLogin />
      ) : (
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-medium text-gray-900">
                  Request Certificate
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Enter your details to request a certificate. An admin will review and approve your request.
                </p>
              </div>
              <div className="mt-6">
                <ParticipantForm />
              </div>
            </div>
            <ParticipantList />
          </div>
        </main>
      )}
    </div>
  );
}

export default App;