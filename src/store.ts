import { create } from 'zustand';
import { Participant, Template, Certificate, AdminState } from './types';
import emailjs from '@emailjs/browser';
import { storage } from './storage';

interface Store extends AdminState {
  participants: Participant[];
  templates: Template[];
  certificates: Certificate[];
  addParticipant: (participant: Omit<Participant, 'id' | 'status'>) => void;
  approveParticipant: (id: string) => void;
  rejectParticipant: (id: string) => void;
  generateCertificate: (participantId: string, templateId: string) => Promise<void>;
  addTemplate: (template: Omit<Template, 'id'>) => void;
  updateTemplate: (id: string, template: Omit<Template, 'id'>) => void;
  deleteTemplate: (id: string) => void;
  loadInitialData: () => void;
}

const ADMIN_PASSWORD = 'admin123'; // In production, use proper authentication

export const useStore = create<Store>((set, get) => ({
  isAdmin: false,
  participants: storage.getParticipants(),
  templates: storage.getTemplates(),
  certificates: storage.getCertificates(),

  loadInitialData: () => {
    set({
      participants: storage.getParticipants(),
      templates: storage.getTemplates(),
      certificates: storage.getCertificates(),
    });
  },

  login: (password: string) => {
    if (password === ADMIN_PASSWORD) {
      set({ isAdmin: true });
      return true;
    }
    return false;
  },

  logout: () => set({ isAdmin: false }),
  
  addParticipant: (participant) => {
    const newParticipant = {
      ...participant,
      id: crypto.randomUUID(),
      status: 'pending' as const,
    };
    
    set((state) => {
      const newParticipants = [...state.participants, newParticipant];
      storage.saveParticipants(newParticipants);
      return { participants: newParticipants };
    });
  },

  approveParticipant: (id: string) =>
    set((state) => {
      const newParticipants = state.participants.map((p) =>
        p.id === id ? { ...p, status: 'approved' as const } : p
      );
      storage.saveParticipants(newParticipants);
      return { participants: newParticipants };
    }),

  rejectParticipant: (id: string) =>
    set((state) => {
      const newParticipants = state.participants.map((p) =>
        p.id === id ? { ...p, status: 'rejected' as const } : p
      );
      storage.saveParticipants(newParticipants);
      return { participants: newParticipants };
    }),
    
  generateCertificate: async (participantId: string, templateId: string) => {
    const state = get();
    const participant = state.participants.find((p) => p.id === participantId);
    const template = state.templates.find((t) => t.id === templateId);
    
    if (!participant || !template) {
      throw new Error('Participant or template not found');
    }

    try {
      // Replace with your EmailJS credentials
      await emailjs.send(
        'service_id', // Your EmailJS service ID
        'template_id', // Your EmailJS template ID
        {
          to_email: participant.email,
          to_name: participant.fullName,
          certificate_url: template.imageUrl,
          company: participant.company || '',
          job_title: participant.jobTitle || '',
          completion_date: new Date().toLocaleDateString(),
        },
        'your_public_key' // Your EmailJS public key
      );

      const newCertificate = {
        id: crypto.randomUUID(),
        participantId,
        templateId,
        generatedUrl: template.imageUrl,
        createdAt: new Date().toISOString(),
        status: 'sent' as const,
      };

      set((state) => {
        const newCertificates = [...state.certificates, newCertificate];
        storage.saveCertificates(newCertificates);
        return { certificates: newCertificates };
      });
    } catch (error) {
      console.error('Failed to send certificate:', error);
      
      const failedCertificate = {
        id: crypto.randomUUID(),
        participantId,
        templateId,
        generatedUrl: template.imageUrl,
        createdAt: new Date().toISOString(),
        status: 'failed' as const,
      };

      set((state) => {
        const newCertificates = [...state.certificates, failedCertificate];
        storage.saveCertificates(newCertificates);
        return { certificates: newCertificates };
      });
      
      throw error;
    }
  },

  addTemplate: (template) => {
    const newTemplate = {
      ...template,
      id: crypto.randomUUID(),
    };
    
    set((state) => {
      const newTemplates = [...state.templates, newTemplate];
      storage.saveTemplates(newTemplates);
      return { templates: newTemplates };
    });
  },

  updateTemplate: (id, template) => {
    set((state) => {
      const newTemplates = state.templates.map((t) =>
        t.id === id ? { ...template, id } : t
      );
      storage.saveTemplates(newTemplates);
      return { templates: newTemplates };
    });
  },

  deleteTemplate: (id) => {
    set((state) => {
      const newTemplates = state.templates.filter((t) => t.id !== id);
      storage.saveTemplates(newTemplates);
      return { templates: newTemplates };
    });
  },
}));