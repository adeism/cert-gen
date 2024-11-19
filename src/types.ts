export interface Participant {
  id: string;
  fullName: string;
  email: string;
  company?: string;
  jobTitle?: string;
  completionDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Template {
  id: string;
  name: string;
  imageUrl: string;
  placeholders: string[];
}

export interface Certificate {
  id: string;
  participantId: string;
  templateId: string;
  generatedUrl: string;
  createdAt: string;
  status: 'pending' | 'generated' | 'sent' | 'failed';
}

export interface AdminState {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}