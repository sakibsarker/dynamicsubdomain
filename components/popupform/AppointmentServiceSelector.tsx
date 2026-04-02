"use client";

import { useMemo, useState, useEffect } from "react";
import { ChevronLeft, X } from "lucide-react";
import {
  getServicesByUserId,
  getAppointmentOptionsByUserId,
  getBusinessHoursByUserId,
  checkCustomerByPhone,
  createCustomerByCreatedId,
  updateCustomerVehicles,
  validateAppointmentSlot,
  createPublicAppointment,
} from "@/lib/api";
import { formatTimeToHHMMAMPM } from "@/lib/dateUtils";
import {
  formatPhoneForBackend,
  isValidUSPhoneNumber,
} from "@/lib/phoneFormatter";
import toast from "react-hot-toast";
import AppointmentServiceList from "./appointmentcomponents/AppointmentServiceList";
import AppointmentOption from "./appointmentcomponents/AppointmentOption";
import AppointmentDateTimePicker from "./appointmentcomponents/AppointmentDateTimePicker";
import AppointmentCustomerContactCheck from "./appointmentcomponents/AppointmentCustomerContactCheck";
import AppointmentCustomerInformation from "./appointmentcomponents/AppointmentCustomerInformation";
import CarChoose from "./CarChoose";
import AppointmentAdditionalComment from "./appointmentcomponents/AppointmentAdditionalComment";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  createdBy: number;
}

export default function AppointmentServiceSelector({
  open,
  onOpenChange,
  createdBy,
}: Props) {
  // API data states
  const [services, setServices] = useState<Array<{ id: number; name: string }>>(
    [],
  );
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isErrorServices, setIsErrorServices] = useState(false);
  const [appointmentOptionsData, setAppointmentOptionsData] =
    useState<any>(null);
  const [isOptionsLoading, setIsOptionsLoading] = useState(true);
  const [isOptionsError, setIsOptionsError] = useState(false);
  const [daysOfWeekData, setDaysOfWeekData] = useState<any>(null);
  const [isDaysLoading, setIsDaysLoading] = useState(true);
  const [isDaysError, setIsDaysError] = useState(false);

  // Loading states
  const [isCreatingCustomer, setIsCreatingCustomer] = useState(false);
  const [isCheckingCustomer, setIsCheckingCustomer] = useState(false);
  const [isCreatingAppointment, setIsCreatingAppointment] = useState(false);
  const [isValidatingSlot, setIsValidatingSlot] = useState(false);

  // Form states
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<{
    id?: number;
    name?: string;
    is_active?: boolean;
  } | null>(null);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [showContactCheck, setShowContactCheck] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [foundCustomerName, setFoundCustomerName] = useState<string | null>(
    null,
  );
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [customerVehicles, setCustomerVehicles] = useState<any[]>([]);
  const [customerCustomVehicles, setCustomerCustomVehicles] = useState<any[]>(
    [],
  );
  const [showCarChoose, setShowCarChoose] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [customVehicle, setCustomVehicle] = useState("");
  const [selectedVehicleFromList, setSelectedVehicleFromList] =
    useState<any>(null);
  const [selectedLicensePlate, setSelectedLicensePlate] = useState("");
  const [selectedVin, setSelectedVin] = useState("");
  const [selectedLicense, setSelectedLicense] = useState("");
  const [isUpdatingVehicleData, setIsUpdatingVehicleData] = useState(false);
  const [carChooseResetKey, setCarChooseResetKey] = useState(0);
  const [showAdditionalComment, setShowAdditionalComment] = useState(false);
  const [additionalComments, setAdditionalComments] = useState("");
  const [additionalCommentsMediaIds, setAdditionalCommentsMediaIds] = useState<
    number[]
  >([]);
  const [isUploadingFiles, setIsUploadingFiles] = useState(false);
  const [slotValidationError, setSlotValidationError] = useState<string | null>(
    null,
  );

  // Fetch data when dialog opens
  useEffect(() => {
    if (open && createdBy) {
      setIsLoadingServices(true);
      getServicesByUserId(createdBy)
        .then((data) => {
          setServices(data);
          setIsErrorServices(false);
        })
        .catch(() => setIsErrorServices(true))
        .finally(() => setIsLoadingServices(false));

      setIsOptionsLoading(true);
      getAppointmentOptionsByUserId(createdBy)
        .then((data) => {
          setAppointmentOptionsData(data);
          setIsOptionsError(false);
        })
        .catch(() => setIsOptionsError(true))
        .finally(() => setIsOptionsLoading(false));

      setIsDaysLoading(true);
      getBusinessHoursByUserId(createdBy)
        .then((data) => {
          setDaysOfWeekData(data);
          setIsDaysError(false);
        })
        .catch(() => setIsDaysError(true))
        .finally(() => setIsDaysLoading(false));
    }
  }, [open, createdBy]);

  const hasSelectedVehicle = useMemo(() => {
    if (selectedVehicleFromList) return true;
    if (customVehicle.trim().length > 0) return true;
    if (selectedYear && selectedMake && selectedModel) return true;
    return false;
  }, [
    customVehicle,
    selectedVehicleFromList,
    selectedYear,
    selectedMake,
    selectedModel,
  ]);

  const resetVehicleSelection = () => {
    setSelectedYear("");
    setSelectedMake("");
    setSelectedModel("");
    setCustomVehicle("");
    setSelectedVehicleFromList(null);
    setSelectedLicensePlate("");
    setSelectedVin("");
    setSelectedLicense("");
    setCarChooseResetKey((prev) => prev + 1);
  };

  const handleSave = async () => {
    if (showCarChoose && !showAdditionalComment) {
      if (!hasSelectedVehicle) {
        toast.error("Please select a vehicle to continue.");
        return;
      }
      await updateCustomerVehiclesData();
      setShowCarChoose(false);
      setShowAdditionalComment(true);
      return;
    }
    if (showCustomerForm && !showCarChoose) {
      if (
        !customerInfo.firstName ||
        !customerInfo.lastName ||
        !customerInfo.phone ||
        !customerInfo.email
      )
        return;
      resetVehicleSelection();
      setShowCustomerForm(false);
      setShowCarChoose(true);
      return;
    }
    if (!showOptions && selectedServices.length > 0) {
      setShowOptions(true);
      return;
    }
    if (
      showOptions &&
      (selectedAppointment ||
        (appointmentOptionsData?.options || []).length === 0) &&
      !showDateTimePicker &&
      !showContactCheck &&
      !showCustomerForm &&
      !showCarChoose &&
      !showAdditionalComment
    ) {
      setShowDateTimePicker(true);
      return;
    }
    if (showAdditionalComment) {
      onOpenChange(false);
    }
  };

  const updateCustomerVehiclesData = async () => {
    if (!customerId) return false;
    setIsUpdatingVehicleData(true);
    let isNewVehicle = false;
    if (selectedVehicleFromList) {
      isNewVehicle = !customerVehicles.some(
        (v: any) =>
          v.make === selectedVehicleFromList.make &&
          v.year === selectedVehicleFromList.year &&
          v.model === selectedVehicleFromList.model,
      );
    } else if (customVehicle) {
      isNewVehicle = !customerCustomVehicles.some(
        (v: any) => v.name === customVehicle,
      );
    } else if (selectedYear && selectedMake && selectedModel) {
      isNewVehicle = true;
    }
    if (!isNewVehicle) {
      setIsUpdatingVehicleData(false);
      return true;
    }
    try {
      const currentVehicles = [...customerVehicles];
      const currentCustomerVehicles = [...customerCustomVehicles];
      if (selectedVehicleFromList) {
        currentVehicles.push({
          make: selectedVehicleFromList.make,
          year: selectedVehicleFromList.year,
          model: selectedVehicleFromList.model,
          ...(selectedVehicleFromList.license_plate || selectedLicensePlate
            ? {
                license_plate:
                  selectedVehicleFromList.license_plate || selectedLicensePlate,
              }
            : {}),
          ...(selectedVin && { vin: selectedVin }),
          ...(selectedLicense && { license: selectedLicense }),
        });
      } else if (customVehicle) {
        currentCustomerVehicles.push({
          name: customVehicle,
          ...(selectedLicensePlate
            ? { license_plate: selectedLicensePlate }
            : {}),
          ...(selectedVin && { vin: selectedVin }),
          ...(selectedLicense && { license: selectedLicense }),
        });
      } else if (selectedYear && selectedMake && selectedModel) {
        currentVehicles.push({
          make: selectedMake,
          year: selectedYear,
          model: selectedModel,
          ...(selectedLicensePlate
            ? { license_plate: selectedLicensePlate }
            : {}),
          ...(selectedVin && { vin: selectedVin }),
          ...(selectedLicense && { license: selectedLicense }),
        });
      }
      await updateCustomerVehicles(customerId, {
        vehicle: currentVehicles,
        customer_vehicle: currentCustomerVehicles,
      });
      setCustomerVehicles(currentVehicles);
      setCustomerCustomVehicles(currentCustomerVehicles);
      toast.success("Vehicle information saved successfully!");
      setIsUpdatingVehicleData(false);
      return true;
    } catch {
      toast.error("Failed to save vehicle information.");
      setIsUpdatingVehicleData(false);
      return false;
    }
  };

  const handleBack = () => {
    if (showAdditionalComment) {
      setShowAdditionalComment(false);
      resetVehicleSelection();
      setShowCarChoose(true);
    } else if (showCarChoose) {
      resetVehicleSelection();
      setShowCarChoose(false);
      setShowOptions(true);
      if (foundCustomerName) setShowContactCheck(true);
      else setShowCustomerForm(true);
    } else if (showCustomerForm) {
      setShowCustomerForm(false);
      setShowContactCheck(true);
    } else if (showContactCheck) {
      setShowContactCheck(false);
      setShowDateTimePicker(true);
      setAgreedToTerms(false);
    } else if (showDateTimePicker) {
      setShowDateTimePicker(false);
      setShowOptions(true);
    } else if (showOptions) {
      setShowOptions(false);
    }
  };

  const handleCheckContact = async () => {
    if (!phoneNumber || !isValidUSPhoneNumber(phoneNumber)) {
      toast.error("Please enter a valid US phone number");
      return;
    }
    if (!agreedToTerms) {
      toast.error("Please agree to the terms");
      return;
    }
    setIsCheckingCustomer(true);
    try {
      const result = await checkCustomerByPhone(
        createdBy,
        formatPhoneForBackend(phoneNumber),
      );
      if (result?.contact_first_name) {
        setFoundCustomerName(result.contact_first_name);
        setCustomerId(result.id);
        setCustomerVehicles(
          Array.isArray(result.vehicle) ? result.vehicle : [],
        );
        setCustomerCustomVehicles(
          Array.isArray(result.customer_vehicle) ? result.customer_vehicle : [],
        );
        resetVehicleSelection();
        setShowContactCheck(false);
        setShowCarChoose(true);
      } else {
        navigateToCustomerForm();
      }
    } catch {
      navigateToCustomerForm();
    }
    setIsCheckingCustomer(false);
  };

  const navigateToCustomerForm = () => {
    setShowContactCheck(false);
    setShowCustomerForm(true);
    setCustomerId(null);
    setCustomerVehicles([]);
    setCustomerCustomVehicles([]);
    resetVehicleSelection();
    setCustomerInfo((prev) => ({ ...prev, phone: phoneNumber }));
  };

  const handleCreateCustomer = async () => {
    setIsCreatingCustomer(true);
    try {
      const result = await createCustomerByCreatedId(createdBy, {
        contact_first_name: customerInfo.firstName,
        contact_last_name: customerInfo.lastName,
        phone_number: formatPhoneForBackend(customerInfo.phone),
        email_address: customerInfo.email,
      });
      setCustomerId(result.id);
      setCustomerVehicles([]);
      setCustomerCustomVehicles([]);
      resetVehicleSelection();
      setShowCustomerForm(false);
      setShowCarChoose(true);
    } catch {
      console.error("Failed to create customer");
    }
    setIsCreatingCustomer(false);
  };

  const calculateProgress = () => {
    const totalSteps = 7;
    let currentStep = 1;
    if (showAdditionalComment) currentStep = 7;
    else if (showCarChoose) currentStep = 6;
    else if (showCustomerForm) currentStep = 5;
    else if (showContactCheck) currentStep = 4;
    else if (showDateTimePicker) currentStep = 3;
    else if (showOptions) currentStep = 2;
    return (currentStep / totalSteps) * 100;
  };

  const resetAllStates = () => {
    setSelectedServices([]);
    setSelectedAppointment(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedYear("");
    setSelectedMake("");
    setSelectedModel("");
    setCustomVehicle("");
    setShowOptions(false);
    setShowDateTimePicker(false);
    setShowContactCheck(false);
    setShowCustomerForm(false);
    setShowCarChoose(false);
    setShowAdditionalComment(false);
    setCustomerInfo({ firstName: "", lastName: "", phone: "", email: "" });
    setPhoneNumber("");
    setFoundCustomerName(null);
    setCustomerId(null);
    setCustomerVehicles([]);
    setCustomerCustomVehicles([]);
    setSelectedVehicleFromList(null);
    setSelectedLicensePlate("");
    setAgreedToTerms(false);
    setIsUpdatingVehicleData(false);
    setCarChooseResetKey((prev) => prev + 1);
    setAdditionalComments("");
    setAdditionalCommentsMediaIds([]);
    setIsUploadingFiles(false);
  };

  const handleValidateSlotAndContinue = async () => {
    setSlotValidationError(null);
    if (!selectedDate || !selectedTime || selectedServices.length === 0) return;
    setIsValidatingSlot(true);
    try {
      const result = await validateAppointmentSlot(createdBy, {
        myservices: selectedServices.map((id) => ({ service_id: id })),
        appointment_date: selectedDate,
        appointment_time: formatTimeToHHMMAMPM(selectedTime),
      });
      if (result.valid) {
        setShowDateTimePicker(false);
        setShowContactCheck(true);
      } else {
        const msg = result.error?.myservices?.[0] || "Slot validation failed.";
        setSlotValidationError(msg);
        toast.error(msg);
      }
    } catch (err: any) {
      const msg = err?.error?.myservices?.[0] || "Slot validation failed.";
      setSlotValidationError(msg);
      toast.error(msg);
    }
    setIsValidatingSlot(false);
  };

  const handleBookNow = async () => {
    if (
      selectedServices.length === 0 ||
      !selectedDate ||
      !selectedTime ||
      ((appointmentOptionsData?.options || []).length > 0 &&
        !selectedAppointment)
    )
      return;
    const customer_phone = phoneNumber
      ? formatPhoneForBackend(phoneNumber)
      : formatPhoneForBackend(customerInfo.phone);
    const formData = new FormData();
    formData.append(
      "myservices",
      JSON.stringify(selectedServices.map((id) => ({ service_id: id }))),
    );
    formData.append(
      "customer_option",
      (selectedAppointment?.id || 0).toString(),
    );
    formData.append(
      "appointment_option",
      (appointmentOptionsData?.id || 0).toString(),
    );
    if (selectedAppointment)
      formData.append("selected_option", JSON.stringify(selectedAppointment));
    formData.append("customer_phone", customer_phone);
    formData.append("appointment_date", selectedDate);
    formData.append("appointment_time", formatTimeToHHMMAMPM(selectedTime));
    formData.append("additional_comments", additionalComments || "");
    formData.append("created_by", createdBy.toString());

    if (customVehicle) {
      formData.append(
        "customer_vehicle",
        JSON.stringify({
          name: customVehicle,
          ...(selectedLicensePlate
            ? { license_plate: selectedLicensePlate }
            : {}),
          ...(selectedVin && { vin: selectedVin }),
          ...(selectedLicense && { license: selectedLicense }),
        }),
      );
    } else if (selectedVehicleFromList) {
      formData.append(
        "vehicle",
        JSON.stringify({
          make: selectedVehicleFromList.make,
          year: selectedVehicleFromList.year,
          model: selectedVehicleFromList.model,
          ...(selectedVehicleFromList.license_plate || selectedLicensePlate
            ? {
                license_plate:
                  selectedVehicleFromList.license_plate || selectedLicensePlate,
              }
            : {}),
          ...(selectedVin && { vin: selectedVin }),
          ...(selectedLicense && { license: selectedLicense }),
        }),
      );
    } else {
      formData.append(
        "vehicle",
        JSON.stringify({
          make: selectedMake,
          year: selectedYear,
          model: selectedModel,
          ...(selectedLicensePlate
            ? { license_plate: selectedLicensePlate }
            : {}),
          ...(selectedVin && { vin: selectedVin }),
          ...(selectedLicense && { license: selectedLicense }),
        }),
      );
    }
    if (additionalCommentsMediaIds.length > 0)
      formData.append("media_ids", JSON.stringify(additionalCommentsMediaIds));

    setIsCreatingAppointment(true);
    try {
      await createPublicAppointment(formData);
      toast.success("Appointment booked successfully! We will see you soon.");
      resetAllStates();
      onOpenChange(false);
    } catch {
      toast.error("Failed to book appointment. Please try again.");
    }
    setIsCreatingAppointment(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => onOpenChange(false)}
    >
      <div
        className={`bg-white rounded-lg shadow-xl sm:max-w-md w-full mx-4 ${showCarChoose ? "h-[550px] max-h-[85vh] flex flex-col" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-3 border-b">
          <span className="sr-only">Service Booking</span>
          <span className="text-sm font-medium text-gray-600">
            Book Appointment
          </span>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="w-full bg-gray-100 h-2.5 overflow-hidden">
          <div
            className="bg-blue-600 h-1 transition-all duration-300 ease-in-out"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>

        <div
          className={`p-0 ${showCarChoose ? "flex-1 overflow-hidden" : "overflow-hidden"}`}
        >
          {!showOptions ? (
            <AppointmentServiceList
              services={services}
              selectedServices={selectedServices}
              onServiceSelect={(id) =>
                setSelectedServices((prev) =>
                  prev.includes(id)
                    ? prev.filter((s) => s !== id)
                    : [...prev, id],
                )
              }
              isLoading={isLoadingServices}
              isError={isErrorServices}
            />
          ) : (
            <div
              className={`p-4 ${showCarChoose ? "h-full flex flex-col" : "space-y-4"}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    onClick={handleBack}
                    className="text-gray-500 hover:text-gray-700 p-1"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <span className="text-sm font-medium text-gray-600 ml-2">
                    {showCarChoose
                      ? "Vehicle Information"
                      : showCustomerForm
                        ? "Customer Details"
                        : showContactCheck
                          ? "Phone Number"
                          : showAdditionalComment
                            ? "Additional Comments"
                            : showDateTimePicker
                              ? "Appointment Time"
                              : "Transportation Options"}
                  </span>
                </div>
                {foundCustomerName && (
                  <span className="text-black/90 font-medium whitespace-nowrap">
                    Hey {foundCustomerName} welcome back!
                  </span>
                )}
              </div>

              {showCarChoose ? (
                <CarChoose
                  key={carChooseResetKey}
                  onYearSelect={setSelectedYear}
                  onMakeSelect={setSelectedMake}
                  onModelSelect={setSelectedModel}
                  onCustomVehicleSelect={setCustomVehicle}
                  onLicensePlateSelect={setSelectedLicensePlate}
                  onVinSelect={setSelectedVin}
                  onLicenseSelect={setSelectedLicense}
                  onVehicleFromListSelect={(v) => {
                    if (v) {
                      setSelectedVehicleFromList(v);
                      setSelectedLicensePlate(v.license_plate || "");
                      setSelectedVin(v.vin || "");
                      setSelectedLicense(v.license || "");
                      setCustomVehicle("");
                    } else {
                      setSelectedVehicleFromList(null);
                      setSelectedLicensePlate("");
                    }
                  }}
                  onCustomerVehicleFromApiSelect={(v) => {
                    setCustomVehicle(v.name);
                    setSelectedLicensePlate(v.license_plate || "");
                    setSelectedVin(v.vin || "");
                    setSelectedLicense(v.license || "");
                    setSelectedVehicleFromList(null);
                  }}
                  vehicleList={customerVehicles}
                  customerVehicleList={customerCustomVehicles}
                />
              ) : showAdditionalComment ? (
                <AppointmentAdditionalComment
                  onCommentsChange={setAdditionalComments}
                  onMediaIdsChange={setAdditionalCommentsMediaIds}
                  onIsUploading={setIsUploadingFiles}
                />
              ) : showCustomerForm ? (
                <AppointmentCustomerInformation
                  customerInfo={customerInfo}
                  onCustomerInfoChange={(e) =>
                    setCustomerInfo({
                      ...customerInfo,
                      [e.target.name]: e.target.value,
                    })
                  }
                  onSubmit={handleCreateCustomer}
                  isLoading={isCreatingCustomer}
                />
              ) : showContactCheck ? (
                <AppointmentCustomerContactCheck
                  phoneNumber={phoneNumber}
                  onPhoneNumberChange={setPhoneNumber}
                  agreedToTerms={agreedToTerms}
                  onAgreedToTermsChange={setAgreedToTerms}
                />
              ) : showDateTimePicker ? (
                <>
                  <AppointmentDateTimePicker
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    onDateChange={setSelectedDate}
                    onTimeChange={setSelectedTime}
                    daysOfWeek={daysOfWeekData?.days_of_week || []}
                    isLoading={isDaysLoading}
                    isError={isDaysError}
                    created_id={createdBy}
                    zone={daysOfWeekData?.zone}
                  />
                  {slotValidationError && (
                    <div className="text-red-500 text-sm mt-2 text-center">
                      {slotValidationError}
                    </div>
                  )}
                </>
              ) : (
                <AppointmentOption
                  appointmentOptions={appointmentOptionsData?.options || []}
                  selectedAppointment={selectedAppointment?.id || null}
                  onAppointmentSelect={setSelectedAppointment}
                  isLoading={isOptionsLoading}
                  isError={isOptionsError}
                />
              )}
            </div>
          )}
        </div>

        <div className="px-4 pb-3 pt-2 border-t">
          <button
            onClick={() => {
              if (showAdditionalComment) handleBookNow();
              else if (showCarChoose) handleSave();
              else if (showCustomerForm) handleCreateCustomer();
              else if (showContactCheck) handleCheckContact();
              else if (showDateTimePicker) handleValidateSlotAndContinue();
              else handleSave();
            }}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              (showContactCheck &&
                (!phoneNumber ||
                  !agreedToTerms ||
                  !isValidUSPhoneNumber(phoneNumber))) ||
              (!showOptions && selectedServices.length === 0) ||
              (showOptions &&
                !showCustomerForm &&
                !showContactCheck &&
                !showCarChoose &&
                !showAdditionalComment &&
                !selectedAppointment &&
                (appointmentOptionsData?.options || []).length > 0) ||
              (showDateTimePicker &&
                (!selectedDate || !selectedTime || isValidatingSlot)) ||
              (showAdditionalComment &&
                (isCreatingAppointment || isUploadingFiles)) ||
              (showCustomerForm &&
                (!customerInfo.firstName ||
                  !customerInfo.lastName ||
                  !customerInfo.phone ||
                  !customerInfo.email)) ||
              (showCarChoose && (!hasSelectedVehicle || isUpdatingVehicleData))
            }
          >
            {showAdditionalComment
              ? isCreatingAppointment
                ? "Booking..."
                : isUploadingFiles
                  ? "Uploading..."
                  : "Book Now"
              : showCarChoose
                ? isUpdatingVehicleData
                  ? "Saving..."
                  : "Continue"
                : showCustomerForm
                  ? "Customer Information"
                  : showContactCheck
                    ? isCheckingCustomer
                      ? "Phone checking..."
                      : "Add Phone"
                    : showDateTimePicker
                      ? isValidatingSlot
                        ? "Checking..."
                        : "Continue"
                      : showOptions
                        ? "Next"
                        : "Choose Service"}
          </button>
        </div>
      </div>
    </div>
  );
}
