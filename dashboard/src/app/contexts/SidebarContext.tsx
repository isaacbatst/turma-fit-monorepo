'use client'
import { PropsWithChildren, createContext, useContext, useState } from "react";

type SidebarContextType = {
  isOpen: boolean;
  toggleSidebar: () => void;
  setOpen: (value: boolean) => void;
};

const SidebarContext = createContext(null as unknown as SidebarContextType);

export const SidebarContextProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(prev => !prev);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar, setOpen: setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("SidebarContext must be used within SidebarContextProvider");
  }

  return context;
}