"use client";

import { useEffect } from "react";

const WHATSAPP_NUMBERS = {
  delhi: "919599376953",
  noida: "918796946469",
} as const;

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnrollmentModal({ isOpen, onClose }: EnrollmentModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLocationClick = (location: keyof typeof WHATSAPP_NUMBERS) => {
    const number = WHATSAPP_NUMBERS[location];
    const message = encodeURIComponent("Hello! I am interested in enrolling my child at Ukti Early Years.");
    window.open(`https://wa.me/${number}?text=${message}`, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-compact {
          animation: fade-in-up 0.25s ease-out forwards;
        }
      `}} />
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-[2rem] w-full max-w-sm overflow-hidden shadow-xl animate-fade-compact border-2 border-[#F2DA36]">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all z-20"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 md:p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
              Select <span className="text-[#F6892A]">Location</span>
            </h3>
            <p className="text-gray-500 text-sm font-medium">
              Start your enrollment via WhatsApp
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleLocationClick("delhi")}
              className="group relative w-full py-4 px-6 bg-[#F4B325] hover:bg-[#e5a823] text-gray-900 rounded-2xl font-bold transition-all duration-200 flex items-center justify-between text-left"
            >
              <div className="flex flex-col">
                <span className="text-lg leading-tight">Delhi Branch</span>
                <span className="text-[10px] font-medium opacity-80 mt-0.5">W-1, Ground Floor, GK 1, 110048</span>
              </div>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            <button
              onClick={() => handleLocationClick("noida")}
              className="group relative w-full py-4 px-6 bg-[#F6892A] hover:bg-[#e57d24] text-white rounded-2xl font-bold transition-all duration-200 flex items-center justify-between text-left"
            >
              <div className="flex flex-col">
                <span className="text-lg leading-tight">Noida Branch</span>
                <span className="text-[10px] font-medium opacity-80 mt-0.5">B-185, Sec 108, Noida, 201304</span>
              </div>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          <div className="mt-6 text-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              Connect via WhatsApp
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
