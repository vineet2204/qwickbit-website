"use client";

import { useEffect, useState } from "react";

export default function NotFoundPage() {
  // Only render analytics on client
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-900 text-white">
     
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-xl">Page Not Found</p>
    </div>
  );
}
