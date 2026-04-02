"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Vehicle_Database from "@/data/Vehicle_Database.json";
import License_us_states from "@/data/License_us_states.json";
import {
  ChevronDown,
  ArrowLeft,
  Plus,
  ChevronsUpDown,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CarChooseProps {
  onYearSelect?: (year: string) => void;
  onMakeSelect?: (make: string) => void;
  onModelSelect?: (model: string) => void;
  onCustomVehicleSelect?: (name: string) => void;
  onLicensePlateSelect?: (licensePlate: string) => void;
  onVinSelect?: (vin: string) => void;
  onLicenseSelect?: (license: string) => void;
  onValidityChange?: (isValid: boolean) => void;
  onVehicleFromListSelect?: (
    vehicle: {
      make: string;
      year: string;
      model: string;
      license_plate?: string;
      vin?: string;
      license?: string;
    } | null,
  ) => void;
  onCustomerVehicleFromApiSelect?: (vehicle: {
    name: string;
    license_plate?: string;
    vin?: string;
    license?: string;
  }) => void;
  vehicleList?: Array<{
    id?: number;
    make: string;
    year: string;
    model: string;
    license_plate?: string;
    vin?: string;
    license?: string;
  }>;
  customerVehicleList?: Array<{
    id?: number;
    name: string;
    license_plate?: string;
    vin?: string;
    license?: string;
  }>;
}

export default function CarChoose({
  onYearSelect,
  onMakeSelect,
  onModelSelect,
  onCustomVehicleSelect,
  onLicensePlateSelect,
  onVinSelect,
  onLicenseSelect,
  onValidityChange,
  onVehicleFromListSelect,
  onCustomerVehicleFromApiSelect,
  vehicleList = [],
  customerVehicleList = [],
}: CarChooseProps) {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [yearSearch, setYearSearch] = useState("");
  const [makeSearch, setMakeSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const [yearOpen, setYearOpen] = useState(false);
  const [makeOpen, setMakeOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [showCustomVehicleInput, setShowCustomVehicleInput] = useState(false);
  const [customVehicleName, setCustomVehicleName] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [license, setLicense] = useState("");
  const [licenseSearch, setLicenseSearch] = useState("");
  const [showDropdownInterface, setShowDropdownInterface] = useState(false);
  const [selectedStaticVehicleId, setSelectedStaticVehicleId] = useState<
    string | number
  >("");
  const [licensePopoverOpen, setLicensePopoverOpen] = useState(false);

  const yearRef = useRef<HTMLDivElement>(null);
  const makeRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

  const [dropdownPositions, setDropdownPositions] = useState({
    year: "bottom",
    make: "bottom",
    model: "bottom",
  });

  useEffect(() => {
    function updatePositions() {
      if (yearRef.current) {
        const rect = yearRef.current.getBoundingClientRect();
        setDropdownPositions((prev) => ({
          ...prev,
          year: window.innerHeight - rect.bottom < 200 ? "top" : "bottom",
        }));
      }
      if (makeRef.current) {
        const rect = makeRef.current.getBoundingClientRect();
        setDropdownPositions((prev) => ({
          ...prev,
          make: window.innerHeight - rect.bottom < 200 ? "top" : "bottom",
        }));
      }
      if (modelRef.current) {
        const rect = modelRef.current.getBoundingClientRect();
        setDropdownPositions((prev) => ({
          ...prev,
          model: window.innerHeight - rect.bottom < 200 ? "top" : "bottom",
        }));
      }
    }
    if (yearOpen || makeOpen || modelOpen) updatePositions();
  }, [yearOpen, makeOpen, modelOpen]);

  // Validity tracking for estimate flow
  useEffect(() => {
    if (!onValidityChange) return;
    let isValid = false;
    if (showCustomVehicleInput) {
      isValid = customVehicleName.trim().length > 0;
    } else if (showDropdownInterface) {
      isValid = !!selectedYear && !!selectedMake && !!selectedModel;
    } else {
      isValid = !!selectedStaticVehicleId;
    }
    onValidityChange(isValid);
  }, [
    selectedYear,
    selectedMake,
    selectedModel,
    customVehicleName,
    showCustomVehicleInput,
    showDropdownInterface,
    selectedStaticVehicleId,
    onValidityChange,
  ]);

  const vehicleOptions = useMemo(() => {
    return (
      Vehicle_Database as Array<{ Year: string; Make: string; Model: string }>
    ).reduce(
      (acc, vehicle) => {
        if (!acc[vehicle.Year]) acc[vehicle.Year] = {};
        if (!acc[vehicle.Year][vehicle.Make])
          acc[vehicle.Year][vehicle.Make] = [];
        if (!acc[vehicle.Year][vehicle.Make].includes(vehicle.Model)) {
          acc[vehicle.Year][vehicle.Make].push(vehicle.Model);
        }
        return acc;
      },
      {} as Record<string, Record<string, string[]>>,
    );
  }, []);

  const filteredYears = useMemo(() => {
    return Object.keys(vehicleOptions)
      .filter((y) => y.toLowerCase().includes(yearSearch.toLowerCase()))
      .sort((a, b) => parseInt(b) - parseInt(a));
  }, [vehicleOptions, yearSearch]);

  const filteredMakes = useMemo(() => {
    if (!selectedYear) return [];
    return Object.keys(vehicleOptions[selectedYear]).filter((m) =>
      m.toLowerCase().includes(makeSearch.toLowerCase()),
    );
  }, [vehicleOptions, selectedYear, makeSearch]);

  const filteredModels = useMemo(() => {
    if (!selectedYear || !selectedMake) return [];
    return vehicleOptions[selectedYear][selectedMake].filter((m) =>
      m.toLowerCase().includes(modelSearch.toLowerCase()),
    );
  }, [vehicleOptions, selectedYear, selectedMake, modelSearch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (yearRef.current && !yearRef.current.contains(event.target as Node))
        setYearOpen(false);
      if (makeRef.current && !makeRef.current.contains(event.target as Node))
        setMakeOpen(false);
      if (modelRef.current && !modelRef.current.contains(event.target as Node))
        setModelOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const clearAll = () => {
    setSelectedYear("");
    setSelectedMake("");
    setSelectedModel("");
    setCustomVehicleName("");
    setSelectedStaticVehicleId("");
    setLicensePlate("");
    setLicense("");
    onYearSelect?.("");
    onMakeSelect?.("");
    onModelSelect?.("");
    onCustomVehicleSelect?.("");
    onLicensePlateSelect?.("");
    onVinSelect?.("");
    onLicenseSelect?.("");
    onVehicleFromListSelect?.(null);
  };

  const handleBackToStandard = () => {
    setShowCustomVehicleInput(false);
    setShowDropdownInterface(false);
    clearAll();
  };

  const handleShowDropdownInterface = () => {
    setShowDropdownInterface(true);
    setShowCustomVehicleInput(false);
    setSelectedStaticVehicleId("");
    clearAll();
  };

  const handleShowCustomVehicle = () => {
    setShowCustomVehicleInput(true);
    setShowDropdownInterface(false);
    clearAll();
  };

  const handleStaticVehicleSelect = (
    vehicleId: string | number,
    vehicleData?: {
      make: string;
      year: string;
      model: string;
      license_plate?: string;
      vin?: string;
      license?: string;
    },
  ) => {
    setSelectedStaticVehicleId(vehicleId);
    setSelectedYear("");
    setSelectedMake("");
    setSelectedModel("");
    setCustomVehicleName("");
    setLicensePlate(vehicleData?.license_plate || "");
    onYearSelect?.("");
    onMakeSelect?.("");
    onModelSelect?.("");
    onLicensePlateSelect?.(vehicleData?.license_plate || "");
    onVinSelect?.(vehicleData?.vin || "");
    onLicenseSelect?.(vehicleData?.license || "");
    if (!vehicleData && onCustomVehicleSelect)
      onCustomVehicleSelect(String(vehicleId));
    if (onVehicleFromListSelect && vehicleData)
      onVehicleFromListSelect(vehicleData);
  };

  const handleCustomVehicleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setCustomVehicleName(value);
    if (value.trim() && onCustomVehicleSelect) onCustomVehicleSelect(value);
    onVehicleFromListSelect?.(null);
  };

  const handleLicensePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLicensePlate(e.target.value);
    onLicensePlateSelect?.(e.target.value);
  };

  const handleLicenseSelect = (value: string) => {
    setLicense(value);
    setLicenseSearch("");
    setLicensePopoverOpen(false);
    onLicenseSelect?.(value);
  };

  const renderLicenseStateDropdown = () => (
    <div className="grid grid-cols-2 gap-4">
      <input
        placeholder="License Plate"
        value={licensePlate}
        onChange={handleLicensePlateChange}
        className="w-full h-10 px-3 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
      />
      <div className="relative">
        <button
          type="button"
          onClick={() => setLicensePopoverOpen(!licensePopoverOpen)}
          className="w-full h-10 px-3 border border-gray-200 rounded-md flex items-center justify-between text-sm"
        >
          <span className="truncate">
            {license
              ? (License_us_states.states.find(
                  (s) => s.abbreviation === license,
                )?.state || "") +
                " - " +
                license
              : "Select a state"}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
        {licensePopoverOpen && (
          <div className="absolute z-30 w-full mt-1 bg-white border rounded-md shadow-lg max-h-[200px] overflow-auto">
            <div className="p-2 sticky top-0 bg-white border-b">
              <input
                placeholder="Search state..."
                value={licenseSearch}
                onChange={(e) => setLicenseSearch(e.target.value)}
                className="w-full h-8 px-2 border border-gray-200 rounded text-sm focus:outline-none"
              />
            </div>
            {License_us_states.states
              .filter(
                (s) =>
                  s.state.toLowerCase().includes(licenseSearch.toLowerCase()) ||
                  s.abbreviation
                    .toLowerCase()
                    .includes(licenseSearch.toLowerCase()),
              )
              .map((state) => (
                <div
                  key={state.abbreviation}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-sm"
                  onClick={() => handleLicenseSelect(state.abbreviation)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      license === state.abbreviation
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {state.abbreviation} - {state.state}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      <h3 className="font-normal text-sm mb-3 mt-3">
        Please select your vehicle or add a new one.
      </h3>
      <div className="space-y-4 overflow-y-auto flex-1 pr-1 pb-24">
        {!showCustomVehicleInput && !showDropdownInterface ? (
          <>
            <div className="space-y-3">
              <div className="space-y-2">
                <button
                  className="w-full bg-blue-500 hover:bg-blue-600 font-normal text-sm text-white py-2 px-4 rounded-md flex items-center justify-center"
                  onClick={handleShowDropdownInterface}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add a Vehicle
                </button>

                {vehicleList.length > 0 || customerVehicleList.length > 0 ? (
                  <>
                    {vehicleList.map((vehicle, index) => {
                      const vehicleKey = vehicle.id
                        ? `vehicle-${vehicle.id}-${index}`
                        : `vehicle-${vehicle.year}-${vehicle.make}-${vehicle.model}-${index}`;
                      const vehicleId = vehicle.id
                        ? `${vehicle.id}-${index}`
                        : `idx-${index}`;
                      return (
                        <div
                          key={vehicleKey}
                          className={`border rounded-lg p-3 cursor-pointer transition-colors ${selectedStaticVehicleId === vehicleId ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
                          onClick={() =>
                            handleStaticVehicleSelect(vehicleId, vehicle)
                          }
                        >
                          <div className="flex items-center justify-start space-x-1">
                            <div
                              className={`w-4 h-4 rounded-full border-2 ${selectedStaticVehicleId === vehicleId ? "border-blue-500 bg-blue-500" : "border-gray-300"}`}
                            >
                              {selectedStaticVehicleId === vehicleId && (
                                <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                              )}
                            </div>
                            <h4 className="font-normal text-sm">
                              {vehicle.year} {vehicle.make} {vehicle.model}
                            </h4>
                          </div>
                        </div>
                      );
                    })}
                    {customerVehicleList.map((vehicle, index) => {
                      const customerVehicleKey = vehicle.id
                        ? `customer-vehicle-${vehicle.id}-${index}`
                        : `customer-vehicle-${vehicle.name}-${index}`;
                      const vehicleId = vehicle.id
                        ? `${vehicle.id}-cust-${index}`
                        : `cust-${index}`;
                      return (
                        <div
                          key={customerVehicleKey}
                          className={`border rounded-lg p-3 cursor-pointer transition-colors ${selectedStaticVehicleId === vehicleId ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
                          onClick={() => {
                            handleStaticVehicleSelect(vehicleId);
                            onCustomerVehicleFromApiSelect?.({
                              name: vehicle.name,
                              license_plate: vehicle.license_plate,
                              vin: (vehicle as any).vin,
                              license: (vehicle as any).license,
                            });
                          }}
                        >
                          <div className="flex items-center justify-start space-x-1">
                            <div
                              className={`w-4 h-4 rounded-full border-2 ${selectedStaticVehicleId === vehicleId ? "border-blue-500 bg-blue-500" : "border-gray-300"}`}
                            >
                              {selectedStaticVehicleId === vehicleId && (
                                <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                              )}
                            </div>
                            <h4 className="font-normal text-sm">
                              {vehicle.name}
                            </h4>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <h3 className="font-normal text-lg justify-center text-center">
                    Please add your new vehicle.
                  </h3>
                )}
              </div>
            </div>
          </>
        ) : !showCustomVehicleInput ? (
          <>
            <div className="mb-4">
              <button
                className="flex items-center text-gray-500 text-sm hover:text-gray-700"
                onClick={handleBackToStandard}
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Vehicle Year</label>
              <div ref={yearRef} className="relative">
                <button
                  type="button"
                  onClick={() => setYearOpen(!yearOpen)}
                  className="w-full flex items-center justify-between border rounded-lg p-2 bg-white"
                >
                  <span>{selectedYear || "Select a year"}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {yearOpen && (
                  <div
                    className={`absolute z-20 w-full bg-white border rounded-lg max-h-[300px] overflow-auto ${dropdownPositions.year === "top" ? "bottom-full mb-1" : "top-full mt-1"}`}
                  >
                    <div className="p-2 sticky top-0 bg-white z-10 border-b">
                      <input
                        placeholder="Search for year..."
                        value={yearSearch}
                        onChange={(e) => setYearSearch(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full h-8 px-2 border rounded text-sm focus:outline-none"
                      />
                    </div>
                    <div className="max-h-[240px] overflow-y-auto">
                      {filteredYears.map((year) => (
                        <div
                          key={year}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSelectedYear(year);
                            setSelectedMake("");
                            setSelectedModel("");
                            setMakeSearch("");
                            setModelSearch("");
                            setYearOpen(false);
                            onYearSelect?.(year);
                            onMakeSelect?.("");
                            onModelSelect?.("");
                          }}
                        >
                          {year}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Vehicle Make</label>
              <div ref={makeRef} className="relative">
                <button
                  type="button"
                  onClick={() => selectedYear && setMakeOpen(!makeOpen)}
                  className={`w-full flex items-center justify-between border rounded-lg p-2 ${selectedYear ? "bg-white" : "bg-gray-100 cursor-not-allowed"}`}
                  disabled={!selectedYear}
                >
                  <span>
                    {selectedMake ||
                      (selectedYear ? "Select a make" : "First select a year")}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {makeOpen && selectedYear && (
                  <div
                    className={`absolute z-20 w-full bg-white border rounded-lg max-h-[300px] overflow-auto ${dropdownPositions.make === "top" ? "bottom-full mb-1" : "top-full mt-1"}`}
                  >
                    <div className="p-2 sticky top-0 bg-white z-10 border-b">
                      <input
                        placeholder="Search for make..."
                        value={makeSearch}
                        onChange={(e) => setMakeSearch(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full h-8 px-2 border rounded text-sm focus:outline-none"
                      />
                    </div>
                    <div className="max-h-[240px] overflow-y-auto">
                      {filteredMakes.map((make) => (
                        <div
                          key={make}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSelectedMake(make);
                            setSelectedModel("");
                            setModelSearch("");
                            setMakeOpen(false);
                            onMakeSelect?.(make);
                            onModelSelect?.("");
                          }}
                        >
                          {make}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Vehicle Model</label>
              <div ref={modelRef} className="relative">
                <button
                  type="button"
                  onClick={() => selectedMake && setModelOpen(!modelOpen)}
                  className={`w-full flex items-center justify-between border rounded-lg p-2 ${selectedMake ? "bg-white" : "bg-gray-100 cursor-not-allowed"}`}
                  disabled={!selectedMake}
                >
                  <span>
                    {selectedModel ||
                      (selectedMake ? "Select a model" : "First select a make")}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {modelOpen && selectedMake && (
                  <div
                    className={`absolute z-20 w-full bg-white border rounded-lg max-h-[300px] overflow-auto ${dropdownPositions.model === "top" ? "bottom-full mb-1" : "top-full mt-1"}`}
                  >
                    <div className="p-2 sticky top-0 bg-white z-10 border-b">
                      <input
                        placeholder="Search for model..."
                        value={modelSearch}
                        onChange={(e) => setModelSearch(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full h-8 px-2 border rounded text-sm focus:outline-none"
                      />
                    </div>
                    <div className="max-h-[240px] overflow-y-auto">
                      {filteredModels.map((model) => (
                        <div
                          key={model}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSelectedModel(model);
                            setModelOpen(false);
                            onModelSelect?.(model);
                          }}
                        >
                          {model}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                License Plate / State (Optional)
              </label>
              {renderLicenseStateDropdown()}
            </div>

            <div className="p-2 border-t mt-4">
              <button
                className="w-full border border-gray-200 rounded-md py-2 text-sm hover:bg-gray-50"
                onClick={handleShowCustomVehicle}
              >
                Add Vehicle
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <button
                className="flex items-center text-gray-500 text-sm hover:text-gray-700"
                onClick={handleBackToStandard}
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </button>
            </div>

            <div className="space-y-4 p-4">
              <input
                placeholder="Enter vehicle details (e.g., 2019 Honda Civic)"
                value={customVehicleName}
                onChange={handleCustomVehicleChange}
                className="w-full h-12 px-4 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  License Plate / State (Optional)
                </label>
                {renderLicenseStateDropdown()}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Please include year, make and model in your description
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
