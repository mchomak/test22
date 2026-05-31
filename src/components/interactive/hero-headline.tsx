export function HeroHeadline() {
  return (
    <h1 className="max-w-5xl text-balance text-5xl font-semibold leading-[0.96] text-white sm:text-6xl md:text-7xl xl:text-8xl">
      <span className="block overflow-hidden pb-1">
        <span className="block">
          Python backend
        </span>
      </span>
      <span className="block overflow-hidden pb-2">
        <span className="block text-zinc-300">
          под ключ
        </span>
      </span>
      <span
        className="relative mt-4 block w-fit overflow-hidden text-2xl leading-tight text-emerald-200 sm:text-3xl md:text-4xl"
      >
        для ботов, AI и платежей
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-70"
        />
      </span>
    </h1>
  );
}
