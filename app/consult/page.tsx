import type { Metadata } from "next";
import ConsultFlow from "@/components/ConsultFlow";

export const metadata: Metadata = {
  title: "Consult Now | Hubble by Cavli Wireless",
  description: "Schedule a consultation with our IoT and cellular connectivity experts.",
};

export default function ConsultPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8">
        <ConsultFlow />
      </div>
    </main>
  );
}