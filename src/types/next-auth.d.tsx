declare module "next-auth" {
    interface Session {
      user: {
        id: string;
        name: string;
        email: string;
        role: string;
        token: string;
        payment: number;
      };
    }
  
    interface User {
      id: string;
      name: string;
      email: string;
      role: string;
      token: string;
      payment: number;
    }
  }  