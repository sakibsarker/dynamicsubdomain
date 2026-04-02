"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, X } from "lucide-react";
import {
  getServicesByUserId,
  checkCustomerByPhone,
  createCustomerByCreatedId,
  updateCustomerVehicles,
  createPublicEstimate,
} from "@/lib/api";
import {
  formatPhoneForBackend,
  isValidUSPhoneNumber,
} from "@/lib/phoneFormatter";
import toast from "react-hot-toast";
import EstimateServiceList from "./estimatecomponents/EstimateServiceList";
import EstimateDescribeIssue from "./estimatecomponents/EstimateDescribeIssue";
import EstimateCustomerContactCheck from "./estimatecomponents/EstimateCustomerContactCheck";
import EstimateCustomerInformation from "./estimatecomponents/EstimateCustomerInformation";
import CarChoose from "./CarChoose";
import EstimateAdditionalComment from "./estimatecomponents/EstimateAdditionalComment";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  createdBy: number;
}

export default function EstimateServiceSelector({
  open,
  onOpenChange,
  createdBy,
}: Props) {
  const [services, setServices] = useState<Array<{ id: number; name: string }>>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isCreatingCustomer, setIsCreatingCustomer] = useState(false);
  const [isCheckingCustomer, setIsCheckingCustomer] = useState(false);
  const [isUpdatingVehicles, setIsUpdatingVehicles] = useState(false);
  const [isCreatingEstimate, setIsCreatingEstimate] = useState(false);

  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [showAdditionalComment, setShowAdditionalComment] = useState(false);
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
  const [isVehicleSelectionValid, setIsVehicleSelectionValid] = useState(false);
  const [describeIssue, setDescribeIssue] = useState("");
  const [describeIssueMediaIds, setDescribeIssueMediaIds] = useState<number[]>(
    [],
  );
  const [additionalComments, setAdditionalComments] = useState("");
  const [additionalCommentsMediaIds, setAdditionalCommentsMediaIds] = useState<
    number[]
  >([]);
  const [isUploadingDescribeIssue, setIsUploadingDescribeIssue] =
    useState(false);
  const [isUploadingAdditionalComments, setIsUploadingAdditionalComments] =
    useState(false);

  useEffect(() => {
    if (open && createdBy) {
      setIsLoading(true);
      getServicesByUserId(createdBy)
        .then((data) => {
          setServices(data);
          setIsError(false);
        })
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [open, createdBy]);

  const handleServiceSelect = (serviceId: number) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId],
    );
  };

  const handleSave = async () => {
    if (!showOptions && selectedServices.length > 0) {
      setShowOptions(true);
    } else if (
      showOptions &&
      !showCustomerForm &&
      !showContactCheck &&
      !showCarChoose
    ) {
      setShowContactCheck(true);
    } else if (showContactCheck && !showCustomerForm) {
      setShowContactCheck(false);
      setShowCustomerForm(true);
    } else if (showCustomerForm && !showCarChoose) {
      if (
        !customerInfo.firstName ||
        !customerInfo.lastName ||
        !customerInfo.phone ||
        !customerInfo.email
      )
        return;
      setShowCustomerForm(false);
      setShowCarChoose(true);
    } else if (showCarChoose && !showAdditionalComment) {
      const success = await updateCustomerVehiclesData();
      if (success) {
        setShowCarChoose(false);
        setShowAdditionalComment(true);
      }
    } else if (showAdditionalComment) {
      onOpenChange(false);
    }
  };

  const updateCustomerVehiclesData = async () => {
    if (!customerId) return false;
    setIsUpdatingVehicles(true);
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
      setIsUpdatingVehicles(false);
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
        });
      } else if (customVehicle) {
        currentCustomerVehicles.push({
          name: customVehicle,
          ...(selectedLicensePlate
            ? { license_plate: selectedLicensePlate }
            : {}),
        });
      } else if (selectedYear && selectedMake && selectedModel) {
        currentVehicles.push({
          make: selectedMake,
          year: selectedYear,
          model: selectedModel,
          ...(selectedLicensePlate
            ? { license_plate: selectedLicensePlate }
            : {}),
        });
      }
      await updateCustomerVehicles(customerId, {
        vehicle: currentVehicles,
        customer_vehicle: currentCustomerVehicles,
      });
      setCustomerVehicles(currentVehicles);
      setCustomerCustomVehicles(currentCustomerVehicles);
      toast.success("Vehicle information saved!");
      setIsUpdatingVehicles(false);
      return true;
    } catch {
      toast.error("Failed to save vehicle information");
      setIsUpdatingVehicles(false);
      return false;
    }
  };

  const handleBack = () => {
    if (showAdditionalComment) {
      setShowAdditionalComment(false);
      setShowCarChoose(true);
    } else if (showCarChoose) {
      setShowCarChoose(false);
      setShowOptions(true);
    } else if (showCustomerForm) {
      setShowCustomerForm(false);
    } else if (showContactCheck) {
      setShowContactCheck(false);
      setAgreedToTerms(false);
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
      setShowCustomerForm(false);
      setShowCarChoose(true);
    } catch {
      console.error("Failed to create customer");
    }
    setIsCreatingCustomer(false);
  };

  const calculateProgress = () => {
    const totalSteps = 4;
    let currentStep = 1;
    if (showAdditionalComment) currentStep = 4;
    else if (showCarChoose) currentStep = 3;
    else if (showOptions) currentStep = 2;
    return Math.min((currentStep / totalSteps) * 100, 100);
  };

  const resetAllStates = () => {
    setSelectedServices([]);
    setSelectedYear("");
    setSelectedMake("");
    setSelectedModel("");
    setCustomVehicle("");
    setShowOptions(false);
    setShowAdditionalComment(false);
    setShowContactCheck(false);
    setShowCustomerForm(false);
    setShowCarChoose(false);
    setCustomerInfo({ firstName: "", lastName: "", phone: "", email: "" });
    setPhoneNumber("");
    setFoundCustomerName(null);
    setCustomerId(null);
    setCustomerVehicles([]);
    setCustomerCustomVehicles([]);
    setSelectedVehicleFromList(null);
    setSelectedLicensePlate("");
    setAgreedToTerms(false);
    setIsVehicleSelectionValid(false);
    setDescribeIssue("");
    setDescribeIssueMediaIds([]);
    setAdditionalComments("");
    setAdditionalCommentsMediaIds([]);
    setIsUploadingDescribeIssue(false);
    setIsUploadingAdditionalComments(false);
  };

  const handleBookNow = async () => {
    if (selectedServices.length === 0) return;
    const customer_phone = phoneNumber
      ? formatPhoneForBackend(phoneNumber)
      : formatPhoneForBackend(customerInfo.phone);
    const formData = new FormData();
    formData.append(
      "services",
      JSON.stringify(selectedServices.map((id) => ({ service_id: id }))),
    );
    formData.append("describe_issue", describeIssue || "");
    formData.append("additional_comments", additionalComments || "");
    formData.append("customer_phone", customer_phone);
    formData.append("created_by", createdBy.toString());

    if (customVehicle) {
      formData.append(
        "customer_vehicle",
        JSON.stringify({
          name: customVehicle,
          ...(selectedLicensePlate
            ? { license_plate: selectedLicensePlate }
            : {}),
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
        }),
      );
    }
    const allMediaIds = [
      ...describeIssueMediaIds,
      ...additionalCommentsMediaIds,
    ];
    if (allMediaIds.length > 0)
      formData.append("media_ids", JSON.stringify(allMediaIds));

    setIsCreatingEstimate(true);
    try {
      await createPublicEstimate(formData);
      toast.success("Estimate request submitted successfully!");
      resetAllStates();
      onOpenChange(false);
    } catch {
      toast.error("Failed to submit estimate. Please try again.");
    }
    setIsCreatingEstimate(false);
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
          <span className="text-sm font-medium text-gray-600">
            Get Estimate
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
            className="bg-green-600 h-1 transition-all duration-300 ease-in-out"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>

        <div
          className={`p-0 ${showCarChoose ? "flex-1 overflow-hidden" : "overflow-hidden"}`}
        >
          {!showOptions ? (
            <EstimateServiceList
              services={services}
              selectedServices={selectedServices}
              onServiceSelect={handleServiceSelect}
              isLoading={isLoading}
              isError={isError}
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
                            : "Describe Issue"}
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
                  onYearSelect={setSelectedYear}
                  onMakeSelect={setSelectedMake}
                  onModelSelect={setSelectedModel}
                  onCustomVehicleSelect={setCustomVehicle}
                  onLicensePlateSelect={setSelectedLicensePlate}
                  onValidityChange={setIsVehicleSelectionValid}
                  onVehicleFromListSelect={(v) => {
                    if (v) {
                      setSelectedVehicleFromList(v);
                      setSelectedLicensePlate(v.license_plate || "");
                      setCustomVehicle("");
                    }
                  }}
                  onCustomerVehicleFromApiSelect={(v) => {
                    setCustomVehicle(v.name);
                    setSelectedLicensePlate(v.license_plate || "");
                    setSelectedVehicleFromList(null);
                  }}
                  vehicleList={customerVehicles}
                  customerVehicleList={customerCustomVehicles}
                />
              ) : showAdditionalComment ? (
                <EstimateAdditionalComment
                  onCommentsChange={setAdditionalComments}
                  onMediaIdsChange={setAdditionalCommentsMediaIds}
                  onIsUploading={setIsUploadingAdditionalComments}
                />
              ) : showCustomerForm ? (
                <EstimateCustomerInformation
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
                <EstimateCustomerContactCheck
                  phoneNumber={phoneNumber}
                  onPhoneNumberChange={setPhoneNumber}
                  agreedToTerms={agreedToTerms}
                  onAgreedToTermsChange={setAgreedToTerms}
                />
              ) : (
                <EstimateDescribeIssue
                  onDescriptionChange={setDescribeIssue}
                  onMediaIdsChange={setDescribeIssueMediaIds}
                  onIsUploading={setIsUploadingDescribeIssue}
                />
              )}
            </div>
          )}
        </div>

        <div className="px-4 pb-3 pt-2 border-t">
          <button
            onClick={() => {
              if (showAdditionalComment) handleBookNow();
              else if (showContactCheck) handleCheckContact();
              else if (showCustomerForm) handleCreateCustomer();
              else if (showCarChoose) handleSave();
              else handleSave();
            }}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
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
                isUploadingDescribeIssue) ||
              (showAdditionalComment &&
                (isCreatingEstimate ||
                  isUploadingDescribeIssue ||
                  isUploadingAdditionalComments)) ||
              (showCustomerForm &&
                (!customerInfo.firstName ||
                  !customerInfo.lastName ||
                  !customerInfo.phone ||
                  !customerInfo.email)) ||
              (showCarChoose &&
                (!isVehicleSelectionValid || isUpdatingVehicles))
            }
          >
            {showAdditionalComment
              ? isUploadingDescribeIssue || isUploadingAdditionalComments
                ? "Uploading..."
                : isCreatingEstimate
                  ? "Submitting..."
                  : "Submit"
              : showCarChoose
                ? isUpdatingVehicles
                  ? "Saving..."
                  : "Continue"
                : showCustomerForm
                  ? isCreatingCustomer
                    ? "Adding Information..."
                    : "Add Information"
                  : showContactCheck
                    ? isCheckingCustomer
                      ? "Phone checking..."
                      : "Add Phone"
                    : showOptions
                      ? isUploadingDescribeIssue
                        ? "Uploading..."
                        : "Continue"
                      : "Choose Service"}
          </button>
        </div>
      </div>
    </div>
  );
}
