"use client";

import { useState, useEffect } from "react";
import { generateDailySlots, TimeSlot } from "@/lib/slots";

interface SlotPickerProps {
  consultId: string | number;
  onSuccess: () => void;
}

export default function SlotPicker({ consultId, onSuccess }: SlotPickerProps) {
	
  // Default to today's date in YYYY-MM-DD format
  const todayStr = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch booked slots for the selected date
  useEffect(() => {
    async function fetchBookedSlots() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/consult/slots?date=${selectedDate}`);
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.message || "Failed to fetch slots");

        // data.bookedTimes should be an array of ISO strings from your database
        const dailySlots = generateDailySlots(selectedDate, data.bookedTimes || []);
        setSlots(dailySlots);
      } catch (err: any) {
        setError(err.message || "Something went wrong loading slots.");
      } finally {
        setLoading(false);
      }
    }

    fetchBookedSlots();
  }, [selectedDate]);

  const handleConfirmBooking = async () => {
    if (!selectedSlot) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/consult/${consultId}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotTime: selectedSlot }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to confirm booking");

      onSuccess();
    } catch (err: any) {
      setError(err.message || "Booking confirmation failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Select a Meeting Time</h2>
        <p className="text-sm text-gray-600">Choose an available date and time slot for your Google Meet session.</p>
      </div>

      {/* Date Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
        <input
          type="date"
          min={todayStr}
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedSlot(null); // Reset slot selection on date change
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Slots Grid */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Available Time Slots</label>
        {loading ? (
          <p className="text-sm text-gray-500 py-4 text-center">Loading available slots...</p>
        ) : error ? (
          <p className="text-sm text-red-600 py-2">{error}</p>
        ) : slots.length === 0 ? (
          <p className="text-sm text-gray-500 py-4 text-center">No slots available for this date.</p>
        ) : (
          <div className="grid grid-cols-3 gap-3 max-h-60 overflow-y-auto p-1">
            {slots.map((slot) => (
              <button
                key={slot.id}
                disabled={slot.isBooked}
                onClick={() => setSelectedSlot(slot.isoString)}
                className={`py-2 px-3 text-sm font-medium rounded-md border transition-all ${
                  slot.isBooked
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through"
                    : selectedSlot === slot.isoString
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                }`}
              >
                {slot.timeString}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleConfirmBooking}
        disabled={!selectedSlot || submitting}
        className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm disabled:opacity-50 transition-colors"
      >
        {submitting ? "Confirming & Creating Meeting..." : "Confirm Booking & Get Meet Link"}
      </button>
    </div>
  );
}