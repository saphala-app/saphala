export type SignInType = {
  email: string;
  password?: string;
};

export type SignUpType = {
  email: string;
  username: string;
  password?: string;
  full_name?: string;
  avatar?: string;
  isOAuthUser?: boolean;
};
