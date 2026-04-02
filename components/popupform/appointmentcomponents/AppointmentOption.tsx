"use client";

interface AppointmentOptionProps {
  appointmentOptions: Array<{
    id?: number;
    name?: string;
    is_active?: boolean;
  }>;
  selectedAppointment: number | null;
  onAppointmentSelect: (option: {
    id?: number;
    name?: string;
    is_active?: boolean;
  }) => void;
  isLoading: boolean;
  isError: boolean;
}

export default function AppointmentOption({
  appointmentOptions,
  selectedAppointment,
  onAppointmentSelect,
  isLoading,
  isError,
}: AppointmentOptionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
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
            Error loading options
          </div>
        ) : (
          appointmentOptions.map((option) => (
            <div
              key={option.id}
              className={`px-4 py-3 border rounded-md cursor-pointer transition-colors ${
                selectedAppointment === option.id
                  ? "bg-blue-100 border-blue-300 text-blue-800"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              }`}
              onClick={() => option.id && onAppointmentSelect(option)}
            >
              <label
                className={`font-normal text-sm cursor-pointer w-full ${
                  selectedAppointment === option.id
                    ? "text-blue-800"
                    : "text-gray-700"
                }`}
              >
                {option.name}
              </label>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
