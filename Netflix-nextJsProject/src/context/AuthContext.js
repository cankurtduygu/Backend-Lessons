'use client';

//nextjs projesinde react a ait hook kullanacaksam, üstteki gibi "use client" yazmaliyim

// firebase islemleri icin context alanini actik
import { createContext } from 'react';

export const AuthContextt = createContext();

const AuthContextProvider = ({ children }) => {
  return (
    <AuthContextt.Provider value={{}}>
      {children}
    </AuthContextt.Provider>
  );
};

export default AuthContextProvider;
