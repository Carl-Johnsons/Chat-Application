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
  // Extended props
  isOnline: boolean;
};
