export type SignupParams = {
  name: string;
  email: string;
  phone: string;
  password: string;
  address: string;
};
export type User = {
  _id: string;
  name?: string;

  Email?: string;
  password?: string;
};

export type LoginParams = {
  email: string;
  password: string;
};
