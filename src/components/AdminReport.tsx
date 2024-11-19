import React, { useMemo } from 'react';
import { useStore } from '../store';
import { CheckCircle, XCircle, Clock, Mail, AlertCircle } from 'lucide-react';

export function AdminReport() {
  const { participants, certificates } = useStore();

  const stats = useMemo(() => {
    const approved = participants.filter(p => p.status === 'approved').length;
    const rejected = participants.filter(p => p.status === 'rejected').length;
    const pending = participants.filter(p => p.status === 'pending').length;
    const sent = certificates.filter(c => c.status === 'sent').length;
    const failed = certificates.filter(c => c.status === 'failed').length;

    return { approved, rejected, pending, sent, failed };
  }, [participants, certificates]);

  const recentCertificates = useMemo(() => {
    return [...certificates]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);
  }, [certificates]);

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.approved}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.rejected}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sent Successfully</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.sent}</p>
            </div>
            <Mail className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Failed Deliveries</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.failed}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Certificate Delivery Status */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900">Recent Certificate Deliveries</h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {recentCertificates.map((cert) => {
              const participant = participants.find(p => p.id === cert.participantId);
              return (
                <li key={cert.id} className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {participant?.fullName}
                      </p>
                      <p className="text-sm text-gray-500">{participant?.email}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(cert.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {cert.status === 'sent' && (
                        <span className="flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Sent
                        </span>
                      )}
                      {cert.status === 'failed' && (
                        <span className="flex items-center px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Failed
                        </span>
                      )}
                      {cert.status === 'pending' && (
                        <span className="flex items-center px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
            {recentCertificates.length === 0 && (
              <li className="px-4 py-4 text-center text-gray-500">
                No certificates generated yet
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}