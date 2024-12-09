// form-data.interface.ts
export interface FormData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
  };
  plan: {
    type: PlanType;
    isYearly: boolean;
    price: number;
  };
  addons: {
    id: string;
    name: string;
    price: number;
    selected: boolean;
  }[];
}
type PlanType = '' | 'arcade' | 'advanced' | 'pro';

export enum ButtonType {
  BACK = 'back',
  NEXT = 'next',
  CONFIRM = 'confirm'
}

export interface NavigationButton {
  type: ButtonType;
  label: string;
  visible: boolean;
  disabled?: boolean;
  className: string;
}