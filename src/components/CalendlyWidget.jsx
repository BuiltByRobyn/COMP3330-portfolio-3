'use client';

export default function CalWidget({ url }) {
  return (
    <div className="w-full rounded-lg border border-border overflow-hidden" style={{ height: '700px' }}>
      <iframe
        src={`https://cal.com/${url}?embed=true&theme=light`}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: '700px' }}
        title="Cal.com Booking"
        allow="payment"
      />
    </div>
  );
}
