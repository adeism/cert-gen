import React, { useState } from 'react';
import { useStore } from '../store';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import type { Participant } from '../types';

interface Props {
  participant: Participant;
}

export function CertificateGenerator({ participant }: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const { templates, generateCertificate } = useStore();
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]?.id);

  const handleGenerate = async () => {
    if (!selectedTemplate) {
      setError('Please select a template');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setStatus('idle');

    try {
      await generateCertificate(participant.id, selectedTemplate);
      setStatus('success');
    } catch (err) {
      setError('Failed to generate certificate. Please try again.');
      setStatus('error');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mt-4 bg-gray-50 p-4 rounded-md">
      <h4 className="text-sm font-medium text-gray-900 mb-3">
        Generate Certificate
      </h4>
      <div className="space-y-4">
        <div>
          <label htmlFor="template" className="block text-sm font-medium text-gray-700">
            Select Template
          </label>
          <select
            id="template"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>

        {status === 'success' && (
          <div className="flex items-center text-sm text-green-600">
            <CheckCircle className="h-4 w-4 mr-2" />
            Certificate generated and sent successfully!
          </div>
        )}

        {error && (
          <div className="flex items-center text-sm text-red-600">
            <AlertCircle className="h-4 w-4 mr-2" />
            {error}
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
          <Send className="h-4 w-4 mr-2" />
          {isGenerating ? 'Generating...' : 'Generate & Send'}
        </button>
      </div>
    </div>
  );
}