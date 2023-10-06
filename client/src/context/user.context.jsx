
import React, { createContext, useReducer, useState, useEffect } from "react";
import UserReducer from "../reducers/UserReducer";
import { fetchUsersAndDocuments } from "../utils/firebase";

// Create contexts with default values
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(UserReducer, INITIAL_STATE);

  const setCurrentUser = (user) => {
    dispatch({ type: 'SET_CURRENT_USER', payload: user });
  };

  const value = { currentUser, setCurrentUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};



export const UserDetailContext = createContext({
  userDetail: {},
});

export const UserDetailsProvider = ({ children }) => {
  const [userDetail, setuserDetail] = useState({});

  useEffect(() => {
    const fetchUserDetailMap = async () => {
      const userDetailMap = await fetchUsersAndDocuments();
      setuserDetail(userDetailMap)
    };
    fetchUserDetailMap();
  }, []);

  const value = { userDetail };

  return (
    <UserDetailContext.Provider value={value}>
      {children}
    </UserDetailContext.Provider>
  );
};

