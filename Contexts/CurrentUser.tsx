import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
  useEffect,
} from "react";

// define what the context provides
type ContentFunctionTypes = {
  currentUser: any;
  setCurrentUser: (user: any) => void;
};

const ContentContext = createContext<ContentFunctionTypes | null>(null);

export const useContentFunction = () => {
  const context = useContext(ContentContext);
  if (!context)
    throw new Error("useContentFunction must be used within a ContentProvider");
  return context;
};

type Props = { children: ReactNode };

export function ContentProvider({ children }: Props) {
  // 🔹 this replaces Redux — single source of truth here
  const [currentUser, setCurrentUser] = useState<any>(null);

  // optional: load cached user on mount
  useEffect(() => {
    const cached = localStorage.getItem("CURRENT_USER");
    if (cached) setCurrentUser(JSON.parse(cached));
  }, []);

  // optional: persist user
  useEffect(() => {
    if (currentUser)
      localStorage.setItem("CURRENT_USER", JSON.stringify(currentUser));
  }, [currentUser]);

  const value = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
    }),
    [currentUser]
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}
