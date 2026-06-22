import { redirect } from "next/navigation";
import { defaultLocale } from "@/data/site";

export default function CasesRedirectPage() {
  redirect(`/${defaultLocale}/cases`);
}
