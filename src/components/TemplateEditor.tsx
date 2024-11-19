import React, { useState } from 'react';
import { useStore } from '../store';
import { Plus, Save, Trash2, Image } from 'lucide-react';

export function TemplateEditor() {
  const { templates, addTemplate, updateTemplate, deleteTemplate } = useStore();
  const [editingTemplate, setEditingTemplate] = useState<string | null>(null);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    imageUrl: '',
    placeholders: ['{{fullName}}', '{{completionDate}}'],
  });

  const handleSaveTemplate = (template: any) => {
    if (editingTemplate) {
      updateTemplate(editingTemplate, template);
      setEditingTemplate(null);
    } else {
      addTemplate(template);
    }
    setNewTemplate({ name: '', imageUrl: '', placeholders: ['{{fullName}}', '{{completionDate}}'] });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Certificate Templates
          </h3>
          
          {/* Template Form */}
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Template Name
                </label>
                <input
                  type="text"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  value={newTemplate.imageUrl}
                  onChange={(e) => setNewTemplate({ ...newTemplate, imageUrl: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Placeholders (comma-separated)
              </label>
              <input
                type="text"
                value={newTemplate.placeholders.join(', ')}
                onChange={(e) => setNewTemplate({
                  ...newTemplate,
                  placeholders: e.target.value.split(',').map(p => p.trim())
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <button
              onClick={() => handleSaveTemplate(newTemplate)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Template
            </button>
          </div>
        </div>
      </div>

      {/* Template List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {templates.map((template) => (
            <li key={template.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-gray-900">{template.name}</h4>
                  <div className="mt-2 flex items-center">
                    <Image className="h-4 w-4 text-gray-500 mr-2" />
                    <p className="text-sm text-gray-500">{template.imageUrl}</p>
                  </div>
                  <div className="mt-1">
                    <p className="text-sm text-gray-500">
                      Placeholders: {template.placeholders.join(', ')}
                    </p>
                  </div>
                </div>
                <div className="ml-4 flex items-center space-x-2">
                  <button
                    onClick={() => deleteTemplate(template.id)}
                    className="inline-flex items-center p-2 border border-transparent rounded-full text-red-600 hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}