// useAuthenticated.js
import { useEffect,useState } from "react";
export const useAuthenticated = () => {
    // create state
    const [auth, setAuth] = useState();
    useEffect(() => {
      const isAuth = async () => {
        // assign state
        setAuth(true);
      };
      try {
        // Delete the token cookie
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        
        // Check if JSESSIONID cookie exists
        const jsessionIdCookie = document.cookie.match(/JSESSIONID=[^;]+/);
        if (jsessionIdCookie) {
            // Delete the JSESSIONID cookie
            document.cookie = jsessionIdCookie[0] + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }

        // Navigate to the home page or any other desired page
       
    } catch (error) {
        console.error("Error during logout:", error);
        // Handle error during logout here
    }
      isAuth();
    }, [setAuth]);
  
    // return state
    return auth;
  };
