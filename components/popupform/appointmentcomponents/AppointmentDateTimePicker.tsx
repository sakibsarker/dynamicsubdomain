"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { convertToTimezone, generateTimeSlots } from "@/lib/timezone";
import { useState, useEffect } from "react";

interface DateTimePickerProps {
  selectedDate: string | null;
  selectedTime: string | null;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  daysOfWeek: Array<{
    day: string;
    is_open: boolean;
    time_slots: Array<{ open: string; close: string }>;
  }>;
  isLoading: boolean;
  isError: boolean;
  created_id: number;
  zone?: string;
}

export default function AppointmentDateTimePicker({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  daysOfWeek,
  isLoading,
  isError,
  zone,
}: DateTimePickerProps) {
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    if (selectedDate) {
      const [y, m, d] = selectedDate.split("-").map(Number);
      const dateObj = new Date(y, m - 1, d);
      return zone ? convertToTimezone(dateObj, zone) : dateObj;
    }
    const initDate = new Date();
    return zone ? convertToTimezone(initDate, zone) : initDate;
  });

  useEffect(() => {
    if (zone) {
      let baseDate = new Date();
      if (selectedDate) {
        const [y, m, d] = selectedDate.split("-").map(Number);
        baseDate = new Date(y, m - 1, d);
      }
      setCurrentDate(convertToTimezone(baseDate, zone));
    }
  }, [zone, selectedDate]);

  const [weekDates, setWeekDates] = useState<
    Array<{ day: string; date: string; fullDate: Date; disabled: boolean }>
  >([]);

  useEffect(() => {
    const dates = [];
    const dayNames = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const today = zone ? convertToTimezone(new Date(), zone) : new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);

      const day = dayNames[date.getDay()];
      const dateNum = date.getDate().toString().padStart(2, "0");

      const dayData = daysOfWeek.find((d) => d.day === day);
      const dateOnly = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
      );
      const todayOnly = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );
      const isDisabled = !dayData?.is_open || dateOnly < todayOnly;

      dates.push({
        day,
        date: dateNum,
        fullDate: new Date(date),
        disabled: isDisabled,
      });
    }

    setWeekDates(dates);
  }, [currentDate, daysOfWeek, zone]);

  const handleDateSelect = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    onDateChange(`${year}-${month}-${day}`);
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const formatMonth = (date: Date) => {
    return new Intl.DateTimeFormat("default", {
      month: "long",
      year: "numeric",
      timeZone: zone || undefined,
    }).format(date);
  };

  const isSelected = (calendarDate: Date) => {
    if (!selectedDate) return false;
    const year = calendarDate.getFullYear();
    const month = String(calendarDate.getMonth() + 1).padStart(2, "0");
    const day = String(calendarDate.getDate()).padStart(2, "0");
    return selectedDate === `${year}-${month}-${day}`;
  };

  if (isLoading) return <div>Loading days of the week...</div>;
  if (isError) return <div>Failed to load days of the week.</div>;

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="text-base font-medium">
            {formatMonth(currentDate)}
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="p-1 text-blue-500 hover:bg-blue-50 rounded-full"
              onClick={goToPreviousWeek}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              className="p-1 text-blue-500 hover:bg-blue-50 rounded-full"
              onClick={goToNextWeek}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-6">
          {weekDates.map((item) => (
            <div
              key={item.date + item.day}
              className="flex flex-col items-center"
            >
              <div
                className={cn(
                  "text-xs font-medium mb-1",
                  isSelected(item.fullDate) && !item.disabled
                    ? "text-blue-500"
                    : "text-gray-400",
                )}
              >
                {item.day.slice(0, 3)}
              </div>
              <button
                className={cn(
                  "w-10 h-10 rounded-md flex items-center justify-center text-sm",
                  isSelected(item.fullDate) && !item.disabled
                    ? "bg-blue-500 text-white"
                    : item.disabled
                      ? "text-gray-300"
                      : "text-gray-700 hover:bg-gray-100",
                )}
                onClick={() =>
                  !item.disabled && handleDateSelect(item.fullDate)
                }
                disabled={item.disabled}
              >
                {item.date}
              </button>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="grid grid-cols-2 gap-3 max-h-[168px] overflow-y-auto pr-2">
            {daysOfWeek
              .find(
                (d) =>
                  d.day === weekDates.find((w) => isSelected(w.fullDate))?.day,
              )
              ?.time_slots.map((slot, index) => {
                const timeSlots = generateTimeSlots(slot.open, slot.close);
                return (
                  <div key={index} className="col-span-2">
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time, idx) => (
                        <button
                          key={idx}
                          className={cn(
                            "py-2 px-3 border border-gray-200 rounded-md text-sm",
                            selectedTime === time
                              ? "border-blue-500 bg-blue-50 text-blue-500"
                              : "text-gray-700 hover:border-gray-300",
                          )}
                          onClick={() => onTimeChange(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
