export interface Address {
  street: string;
  city: string;
  zipcode: string;
  geolocation: {
    lat: string;
    long: string;
  };
}

export interface Name {
  firstname: string;
  lastname: string;
}

export interface UserI {
  id?: number;
  username: string;
  email: string;
  password: string;
  phone: string;
  address: Address;
  name: Name;
  __v?: number;
}
