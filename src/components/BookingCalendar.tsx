import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Venue } from "../utils/mockData";

interface BookingCalendarProps {
  venue: Venue;
}

export function BookingCalendar({
  venue,
}: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      1,
    ).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
      ),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
      ),
    );
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Mock booked dates - in real app, these would come from the venue's bookings
  const bookedDates = [5, 6, 7, 12, 13, 20, 21, 22, 23];
  const today = new Date();
  const isCurrentMonth =
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear();

  return (
    <div className="w-full">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={previousMonth}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-300"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold text-white">
          {monthName}
        </span>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-300"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day Headers */}
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
          (day) => (
            <div
              key={day}
              className="text-center text-xs font-semibold text-gray-400 py-2"
            >
              {day}
            </div>
          ),
        )}

        {/* Empty cells for days before month starts */}
        {Array.from({ length: firstDay }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="aspect-square"
          />
        ))}

        {/* Days */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const isBooked = bookedDates.includes(day);
          const isPast =
            isCurrentMonth && day < today.getDate();
          const isToday =
            isCurrentMonth && day === today.getDate();

          return (
            <div
              key={day}
              className={`aspect-square flex items-center justify-center text-sm rounded-lg ${
                isPast
                  ? "text-gray-600 cursor-not-allowed"
                  : isBooked
                    ? "bg-gray-700 text-gray-500 line-through cursor-not-allowed"
                    : isToday
                      ? "bg-blue-600 text-white font-semibold"
                      : "hover:bg-gray-700 cursor-pointer text-gray-300"
              }`}
              title={
                isBooked
                  ? "Unavailable"
                  : isPast
                    ? "Past date"
                    : "Available"
              }
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-600 rounded"></div>
          <span className="text-gray-400">Today</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-700 rounded"></div>
          <span className="text-gray-400">Booked</span>
        </div>
      </div>
    </div>
  );
}