import React from 'react';
import { useStore } from '../store';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

export function ParticipantList() {
  const participants = useStore((state) => state.participants);

  const statusIcons = {
    pending: <Clock className="h-5 w-5 text-yellow-500" />,
    approved: <CheckCircle className="h-5 w-5 text-green-500" />,
    rejected: <XCircle className="h-5 w-5 text-red-500" />,
  };

  const statusText = {
    pending: 'Pending Review',
    approved: 'Approved',
    rejected: 'Rejected',
  };

  if (participants.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Your Requests</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {participants.map((participant) => (
            <li key={participant.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {participant.fullName}
                    </p>
                  </div>
                  <div className="mt-2 flex">
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{participant.email}</span>
                    </div>
                  </div>
                  {participant.company && (
                    <div className="mt-1 flex">
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{participant.company}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {statusIcons[participant.status]}
                  <span className={`text-sm ${
                    participant.status === 'approved' ? 'text-green-600' :
                    participant.status === 'rejected' ? 'text-red-600' :
                    'text-yellow-600'
                  }`}>
                    {statusText[participant.status]}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}