import { createContext, useReducer } from "react";
export const ContextProvider = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, user: action.payload };
    }
    case "LOGOUT": {
      return {
        ...state,
        user: null,
      };
    }
    case "PROFILE": {
      return {
        ...state,
        userName: action.payload,
      };
    }
    case "AUTH_READY": {
      return {
        ...state,
        readyAuth: true,
      };
    }
    default: {
      return state;
    }
  }
}

function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    userName: null,
    readyAuth: false,
  });
  console.log(state);
  return (
    <div>
      <ContextProvider.Provider value={{ ...state, dispatch }}>
        {children}
      </ContextProvider.Provider>
    </div>
  );
}

export default GlobalContextProvider;
