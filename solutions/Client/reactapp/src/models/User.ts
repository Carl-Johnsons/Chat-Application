export type User = {
  id: string;
  phoneNumber: string;
  password?: string;
  name: string;
  dob: string;
  gender: string;
  avatarUrl: string;
  backgroundUrl: string;
  introduction: string;
  email?: string;
  refreshToken?: string;
  active: boolean;
  role: string;
  // Extended props
  isOnline: boolean;
};
