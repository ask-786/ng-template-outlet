export type User = {
  _id: string;
  age: number;
  eyeColor: string;
  favoriteFruit: string;
  gender: string;
  index: number;
  isActive: boolean;
  name: string;
  registered: string;
  tags: string[];
  company: Company;
};

export type Company = {
  email: string;
  location: Location;
  phone: string;
  title: string;
};

export type Location = {
  address: string;
  country: string;
};
