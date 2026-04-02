"use client";

import { useState } from "react";
import type {
  WebsiteResponse,
  BusinessLogoResponse,
  ThemeName,
} from "@/lib/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PopupProvider } from "@/components/PopupContext";
import AppointmentServiceSelector from "@/components/popupform/AppointmentServiceSelector";
import EstimateServiceSelector from "@/components/popupform/EstimateServiceSelector";
import { Toaster } from "react-hot-toast";

interface Props {
  data: WebsiteResponse;
  logoData: BusinessLogoResponse | null;
  themeName: ThemeName;
  children: React.ReactNode;
}

export default function LayoutClient({
  data,
  logoData,
  themeName,
  children,
}: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEstimatePopupOpen, setIsEstimatePopupOpen] = useState(false);

  return (
    <PopupProvider
      value={{
        onBookAppointment: () => setIsDialogOpen(true),
        onGetEstimate: () => setIsEstimatePopupOpen(true),
      }}
    >
      <Toaster />
      <AppointmentServiceSelector
        createdBy={data.created_by}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
      <EstimateServiceSelector
        createdBy={data.created_by}
        open={isEstimatePopupOpen}
        onOpenChange={setIsEstimatePopupOpen}
      />
      <Header
        data={data}
        logoData={logoData}
        themeName={themeName}
        onBookAppointment={() => setIsDialogOpen(true)}
        onGetEstimate={() => setIsEstimatePopupOpen(true)}
      />
      <div className="flex flex-col flex-1">{children}</div>
      <Footer data={data} logoData={logoData} themeName={themeName} />
    </PopupProvider>
  );
}
