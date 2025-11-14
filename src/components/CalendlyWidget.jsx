'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function CalWidget({ url }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full rounded-lg border border-border relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}
      <iframe
        src={`https://cal.com/${url}?embed=true&theme=light`}
        width="100%"
        style={{ border: 0, minHeight: '700px', height: '700px' }}
        title="Cal.com Booking"
        allow="payment"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
