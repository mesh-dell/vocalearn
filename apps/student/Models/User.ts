export type UserProfileToken = {
  token: string;
  role: string;
};

export type UserProfile = {
  email: string;
  admissionId: string;
  admissionYear: number;
  gender: string;
  className: string;
};
