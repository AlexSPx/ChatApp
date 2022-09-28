import React, { createContext, PropsWithChildren, useState } from "react";

export interface ModalsInterface {
  modals: JSX.Element[];
  setModals: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
}

export const ModalContext = createContext<ModalsInterface | null>(null);

export const ModalContextProvider: React.FunctionComponent<
  PropsWithChildren
> = ({ children }) => {
  const [modals, setModals] = useState<JSX.Element[]>([]);

  return (
    <ModalContext.Provider
      value={{
        modals,
        setModals,
      }}
    >
      {modals}
      {children}
    </ModalContext.Provider>
  );
};
