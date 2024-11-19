import React, { useState } from 'react';
import { CheckCircle, XCircle, LogOut, BarChart, Layout, Mail } from 'lucide-react';
import { useStore } from '../store';
import { CertificateGenerator } from './CertificateGenerator';
import { AdminReport } from './AdminReport';
import { TemplateEditor } from './TemplateEditor';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'pending' | 'report' | 'templates'>('pending');
  const { participants, approveParticipant, rejectParticipant, logout } = useStore();
  const pendingParticipants = participants.filter((p) => p.status === 'pending');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('pending')}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
              activeTab === 'pending'
                ? 'text-white bg-indigo-600 hover:bg-indigo-700'
                : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Mail className="h-4 w-4 mr-2" />
            Pending Requests
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
              activeTab === 'templates'
                ? 'text-white bg-indigo-600 hover:bg-indigo-700'
                : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Layout className="h-4 w-4 mr-2" />
            Template Editor
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
              activeTab === 'report'
                ? 'text-white bg-indigo-600 hover:bg-indigo-700'
                : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <BarChart className="h-4 w-4 mr-2" />
            Reports
          </button>
          <button
            onClick={logout}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      </div>

      {activeTab === 'pending' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {pendingParticipants.map((participant) => (
              <li key={participant.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {participant.fullName}
                    </h3>
                    <p className="text-sm text-gray-500">{participant.email}</p>
                    {participant.company && (
                      <p className="text-sm text-gray-500">
                        Company: {participant.company}
                      </p>
                    )}
                    {participant.jobTitle && (
                      <p className="text-sm text-gray-500">
                        Title: {participant.jobTitle}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => approveParticipant(participant.id)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </button>
                    <button
                      onClick={() => rejectParticipant(participant.id)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </button>
                  </div>
                </div>
                {participant.status === 'approved' && (
                  <div className="mt-4">
                    <CertificateGenerator participant={participant} />
                  </div>
                )}
              </li>
            ))}
            {pendingParticipants.length === 0 && (
              <li className="p-4 text-center text-gray-500">
                No pending participants
              </li>
            )}
          </ul>
        </div>
      )}

      {activeTab === 'templates' && <TemplateEditor />}
      {activeTab === 'report' && <AdminReport />}
    </div>
  );
}