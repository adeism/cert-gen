import { Participant, Template, Certificate } from './types';

const STORAGE_KEYS = {
  PARTICIPANTS: 'certificate_generator_participants',
  TEMPLATES: 'certificate_generator_templates',
  CERTIFICATES: 'certificate_generator_certificates',
};

export const storage = {
  getParticipants(): Participant[] {
    const data = localStorage.getItem(STORAGE_KEYS.PARTICIPANTS);
    return data ? JSON.parse(data) : [];
  },

  saveParticipants(participants: Participant[]): void {
    localStorage.setItem(STORAGE_KEYS.PARTICIPANTS, JSON.stringify(participants));
  },

  getCertificates(): Certificate[] {
    const data = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
    return data ? JSON.parse(data) : [];
  },

  saveCertificates(certificates: Certificate[]): void {
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certificates));
  },

  getTemplates(): Template[] {
    const data = localStorage.getItem(STORAGE_KEYS.TEMPLATES);
    return data ? JSON.parse(data) : [
      {
        id: '1',
        name: 'Professional Certificate',
        imageUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=1200&q=80',
        placeholders: ['{{fullName}}', '{{completionDate}}', '{{company}}'],
      },
      {
        id: '2',
        name: 'Achievement Award',
        imageUrl: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&w=1200&q=80',
        placeholders: ['{{fullName}}', '{{completionDate}}', '{{jobTitle}}'],
      },
    ];
  },

  saveTemplates(templates: Template[]): void {
    localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(templates));
  },
};