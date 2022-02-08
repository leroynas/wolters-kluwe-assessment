export enum SUBJECTS {
  HOW_TO_LOGIN = 'how-to-login',
  WHY_DOES_IE_NOT_WORK = 'why-does-ie-not-work',
  LOST_PASSWORD = 'lost-password',
  OTHER = 'other',
}

export enum CONTACT {
  EMAIL = 'email',
  SMS = 'sms',
  PHONE = 'phone',
}

export enum STATUSES {
  OPEN = 'open',
  CLOSED = 'closed',
}

export type Item = {
  id: string;
  name: string;
  subject: string;
  status: STATUSES;
  contact: CONTACT;
};

export type UpdateItemFunc = (item: Item) => void;
export type AddItemFunc = (item: Item) => void;
