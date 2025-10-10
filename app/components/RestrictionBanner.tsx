"use client";

import { motion, AnimatePresence } from "framer-motion";

interface RestrictionBannerProps {
  isRestricted: boolean;
}

export default function RestrictionBanner({ isRestricted }: RestrictionBannerProps) {
  if (!isRestricted) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-red-600/95 border-b border-red-500"
      >
        <div className="container mx-auto px-4 py-2">
          <p className="text-white text-xs">
            Access restricted: Services unavailable in sanctioned jurisdictions and certain restricted locations.
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

