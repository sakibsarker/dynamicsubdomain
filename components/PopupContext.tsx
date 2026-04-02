"use client";

import { createContext, useContext } from "react";

interface PopupContextType {
  onBookAppointment: () => void;
  onGetEstimate: () => void;
}

const PopupContext = createContext<PopupContextType>({
  onBookAppointment: () => {},
  onGetEstimate: () => {},
});

export const PopupProvider = PopupContext.Provider;
export const usePopup = () => useContext(PopupContext);
