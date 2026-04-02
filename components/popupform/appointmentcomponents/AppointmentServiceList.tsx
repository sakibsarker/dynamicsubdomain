"use client";

interface ServiceListProps {
  services: Array<{ id: number; name: string }>;
  selectedServices: number[];
  onServiceSelect: (serviceId: number) => void;
  isLoading: boolean;
  isError: boolean;
}

export default function AppointmentServiceList({
  services,
  selectedServices,
  onServiceSelect,
  isLoading,
  isError,
}: ServiceListProps) {
  return (
    <div className="space-y-4 p-4">
      <div className="text-lg font-medium">
        Choose a Service form appointment
      </div>
      <div className="space-y-2 max-h-[336px] overflow-y-auto pr-2">
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-12 w-full bg-gray-200 animate-pulse rounded"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-4 text-red-500">
            Error loading services
          </div>
        ) : (
          services.map((service) => (
            <div
              key={service.id}
              className={`px-4 py-3 border rounded-md cursor-pointer transition-colors ${
                selectedServices.includes(service.id)
                  ? "bg-blue-100 border-blue-300 text-blue-800"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              }`}
              onClick={() => onServiceSelect(service.id)}
            >
              <label
                className={`font-normal text-sm cursor-pointer w-full ${
                  selectedServices.includes(service.id)
                    ? "text-blue-800"
                    : "text-gray-700"
                }`}
              >
                {service.name}
              </label>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
