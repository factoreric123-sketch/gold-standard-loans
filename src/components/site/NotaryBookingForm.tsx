import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { PACKAGE_TYPES, submitNotaryBooking } from "@/lib/notary-booking.functions";

const input =
  "w-full border border-line bg-background px-4 py-3 text-sm focus:outline-none focus:border-gold";
const label = "block text-xs uppercase tracking-[0.18em] text-foreground/60 mb-2";

const TIMES = Array.from({ length: 29 }, (_, i) => {
  const mins = 7 * 60 + i * 30; // 7:00 – 21:00
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const v = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  const l = `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
  return { v, l };
});

export function NotaryBookingForm() {
  const submit = useServerFn(submitNotaryBooking);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const s = (k: string) => String(f.get(k) ?? "");
    setStatus("sending");
    setErr("");
    try {
      await submit({
        data: {
          name: s("name"),
          company: s("company"),
          email: s("email"),
          phone: s("phone"),
          signing_date: s("signing_date"),
          signing_time: s("signing_time"),
          package_type: s("package_type") as (typeof PACKAGE_TYPES)[number],
          location: s("location"),
          signers: s("signers") ? Number(s("signers")) : undefined,
          notes: s("notes"),
          website: s("website"),
        },
      });
      setStatus("done");
    } catch (x) {
      setStatus("error");
      setErr(x instanceof Error && x.message.length < 120 ? x.message : "Please check the form and try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="border border-gold/60 p-8">
        <h3 className="font-serif text-2xl mb-2">Request received</h3>
        <p className="text-sm text-foreground/60">
          Thank you — Warren will confirm the appointment directly. For same-day signings, please call as well.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div>
        <label className={label} htmlFor="nb-date">Signing date *</label>
        <input id="nb-date" name="signing_date" type="date" min={today} required className={input} />
      </div>
      <div>
        <label className={label} htmlFor="nb-time">Time *</label>
        <select id="nb-time" name="signing_time" required className={input} defaultValue="">
          <option value="" disabled>Select a time</option>
          {TIMES.map((t) => <option key={t.v} value={t.v}>{t.l}</option>)}
        </select>
      </div>
      <div>
        <label className={label} htmlFor="nb-pkg">Package type *</label>
        <select id="nb-pkg" name="package_type" required className={input} defaultValue="">
          <option value="" disabled>Select package</option>
          {PACKAGE_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <div>
        <label className={label} htmlFor="nb-signers">Number of signers</label>
        <input id="nb-signers" name="signers" type="number" min={1} max={20} className={input} />
      </div>
      <div className="md:col-span-2">
        <label className={label} htmlFor="nb-loc">Signing location (address or city) *</label>
        <input id="nb-loc" name="location" required maxLength={300} className={input} />
      </div>
      <div>
        <label className={label} htmlFor="nb-name">Your name *</label>
        <input id="nb-name" name="name" required maxLength={100} className={input} />
      </div>
      <div>
        <label className={label} htmlFor="nb-co">Company (title / escrow / lender)</label>
        <input id="nb-co" name="company" maxLength={150} className={input} />
      </div>
      <div>
        <label className={label} htmlFor="nb-email">Email *</label>
        <input id="nb-email" name="email" type="email" required maxLength={255} className={input} />
      </div>
      <div>
        <label className={label} htmlFor="nb-phone">Phone *</label>
        <input id="nb-phone" name="phone" type="tel" required maxLength={30} className={input} />
      </div>
      <div className="md:col-span-2">
        <label className={label} htmlFor="nb-notes">Notes</label>
        <textarea id="nb-notes" name="notes" rows={3} maxLength={1500} className={input} />
      </div>
      <div className="md:col-span-2 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-gold px-8 py-4 text-sm tracking-wide text-gold-foreground hover:bg-gold/90 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Request signing"}
        </button>
        {status === "error" && <p className="text-sm text-destructive">{err}</p>}
      </div>
    </form>
  );
}
