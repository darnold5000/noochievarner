import { bookingUrl, type BookingKey } from "@/config/booking";

export default function BookingLink({
  destination,
  className,
  children,
}: {
  destination: BookingKey;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={bookingUrl(destination)} className={className}>
      {children}
    </a>
  );
}
