const tickerItems =
  "⚡ ELECTRICIAN  🔧 PLUMBER  🎨 PAINTER  🪚 CARPENTER  🔩 MECHANIC  ✂️ TAILOR  ❄️ AC TECHNICIAN  ⚡ ELECTRICIAN";

export function MarqueeTicker() {
  return (
    <section className="bg-crimson py-3 text-white">
      <div className="ticker-mask">
        <div className="ticker-track flex w-max items-center gap-10">
          <p className="display-heading text-[22px] tracking-[0.12em]">{tickerItems}</p>
          <p className="display-heading text-[22px] tracking-[0.12em]">{tickerItems}</p>
        </div>
      </div>
    </section>
  );
}
