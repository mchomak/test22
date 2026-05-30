import Image from "next/image";
import { EngineeringScene } from "@/components/interactive/engineering-scene";

export default function HeroBackgroundPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050607]">
      <div className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,#050607_0%,#07100e_44%,#090a0a_100%)]" />
      <Image
        src="/images/engineering-command-center.png"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover opacity-[0.18] mix-blend-screen"
      />
      <div className="hero-grid absolute inset-0 -z-10 opacity-70" />
      <EngineeringScene />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_67%_46%,transparent_0%,rgba(5,6,7,0.2)_30%,rgba(5,6,7,0.84)_78%),linear-gradient(90deg,rgba(5,6,7,0.98)_0%,rgba(5,6,7,0.78)_40%,rgba(5,6,7,0.2)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-36 bg-gradient-to-t from-[#090a0a] to-transparent" />
    </main>
  );
}
