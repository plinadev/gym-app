export interface IUser {
  id: string;
  clerk_user_id: string;
  name: string;
  email: string;
  created_at: string;
  is_admin: boolean;
  is_active: boolean;
}

export interface IPlan {
  id: string;
  name: string;
  description: string;
  features: string[];
  monthly_price: number;
  quarterly_price: number;
  half_yearly_price: number;
  yearly_price: number;
  created_at: string;
  updated_at: string;
  images: string[];
  is_active: boolean;
}

export interface ISubscription {
  id: string;
  plan_id: string;
  plan: IPlan;
  user_id: string;
  user: IUser;
  payment_id: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  amount: number;
  total_duration: number;
  created_at: string;
}
