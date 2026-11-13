"use client";

import { useState } from "react";
import ConsultForm from "./ConsultForm";
import SlotPicker from "./SlotPicker";

export default function ConsultFlow() {
  const [consultId, setConsultId] = useState<string | number | null>(null);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100">
      {!consultId ? (
        <>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Consult Now</h1>
          <p className="text-gray-600 mb-6 text-sm">
            Enter your details below to pick an available meeting time.
          </p>
          <ConsultForm onSuccess={(id) => setConsultId(id)} />
        </>
      ) : !isConfirmed ? (
        <SlotPicker 
          consultId={consultId} 
          onSuccess={() => setIsConfirmed(true)} 
        />
      ) : (
        <div className="text-center py-6 space-y-3">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
            ✓
          </div>
          <h2 className="text-xl font-bold text-gray-900">Booking Confirmed!</h2>
          <p className="text-sm text-gray-600">
            We have sent your Google Calendar invite and meeting link to your email.
          </p>
        </div>
      )}
    </div>
  );
}