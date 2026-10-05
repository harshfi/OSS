import { motion } from "motion/react";
import { WhatsappIcon, WHATSAPP_COMMUNITY_URL } from "@/components/icons/WhatsappIcon";
import { Users } from "lucide-react";

export function FloatingWhatsappButton() {
  return (
    <div className="fixed bottom-16 md:bottom-6 right-4 md:right-6 z-40">
      <motion.a
        href={WHATSAPP_COMMUNITY_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join our WhatsApp Community"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 md:px-4 md:py-3 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.65)] transition-all duration-300 font-medium"
      >
        {/* Pulse ring animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />

        <WhatsappIcon className="w-6 h-6 shrink-0 fill-white" />
        
        <div className="hidden sm:flex flex-col text-left leading-tight">
          <span className="text-[11px] font-semibold text-emerald-100 flex items-center gap-1 uppercase tracking-wider">
            <Users className="w-3 h-3" /> Community
          </span>
          <span className="text-xs font-bold whitespace-nowrap">Join on WhatsApp</span>
        </div>

        {/* Floating tooltip for mobile / extra visual cue */}
        <span className="sr-only">Join our WhatsApp Community</span>
      </motion.a>
    </div>
  );
}
