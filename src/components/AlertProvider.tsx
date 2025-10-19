import { createContext, useState } from "react";

interface IAlert {
  severity: "success" | "info" | "warning" | "error" | undefined;
  message: string;
  show: boolean;
}

interface AlertContextType {
  alert: IAlert | undefined;
  setAlert: React.Dispatch<React.SetStateAction<IAlert | undefined>>;
}

export const AlertContext = createContext<AlertContextType>({
  alert: undefined,
  setAlert: () => {},
});

const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alert, setAlert] = useState<IAlert | undefined>({
    severity: undefined,
    message: "",
    show: false,
  });

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
