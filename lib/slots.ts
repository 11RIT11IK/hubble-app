// lib/slots.ts

export interface TimeSlot {
  id: string;
  timeString: string; 
  isoString: string; 
  isBooked: boolean;
}

export function generateDailySlots(dateStr: string, bookedIsoTimes: string[]): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const baseDate = new Date(dateStr);

  const bookedTimestamps = bookedIsoTimes.map((time) => new Date(time).getTime());

  // Loop from 9 AM (9) to 5 PM (17)
  for (let hour = 9; hour < 17; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const slotDate = new Date(baseDate);
      slotDate.setHours(hour, minute, 0, 0);

      const isoString = slotDate.toISOString();
      const timeString = slotDate.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });

      // Check if this slot's time exists in our booked list
      const isBooked = bookedTimestamps.includes(slotDate.getTime());

      slots.push({
        id: isoString,
        timeString,
        isoString,
        isBooked,
      });
    }
  }

  return slots;
}