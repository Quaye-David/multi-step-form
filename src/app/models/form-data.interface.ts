// export interface FormData {
//   personalInfo: {
//     name: string;
//     email: string;
//     phone: string;
//   };
//   plan: {
//     type: 'arcade' | 'advanced' | 'pro';
//     isYearly: boolean;
//     price: number;
//   };
//   addons: {
//     id: string;
//     name: string;
//     price: number;
//     selected: boolean;
//   }[];
// }

export interface FormData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
  };
  plan: {
    type: string;
    isYearly: boolean;
  };
}