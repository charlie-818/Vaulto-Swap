"use client";

interface RestrictionBannerProps {
  isRestricted: boolean;
}

export default function RestrictionBanner({ isRestricted }: RestrictionBannerProps) {
  if (!isRestricted) return null;

  return (
    <div className="bg-red-600">
      <div className="container mx-auto px-4 py-2">
        <p className="text-white text-xs">
          Access restricted: Services unavailable in sanctioned jurisdictions and certain restricted locations.
        </p>
      </div>
    </div>
  );
}

