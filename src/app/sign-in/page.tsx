import { redirect } from "next/navigation";
import { bookingUrl } from "@/config/booking";

export default function SignInPage() {
  redirect(bookingUrl("login"));
}
