export interface User {

    id: number;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: Address;
    assignee : User
  }

  export interface Address {
    id: number;
    addressLine1: string;
    addressLine2: string;
    city: string;
    userId? : number;
  }
