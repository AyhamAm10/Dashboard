export type reduxUser ={ 
    isAuthenticated: boolean;
  userType: 'admin' | 'superAdmin' | 'sellManager' | null;
}