// Web3Forms only accepts submissions from the browser (server calls are rejected
// on the free plan), so owner email alerts are sent client-side after a save.
const WEB3FORMS_KEY = "2fb7050f-5c48-468f-a1c0-2f0e073f38c5";

export async function notifyOwner(subject: string, fields: Record<string, unknown>) {
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject,
        from_name: "The Discount Mortgage Store website",
        ...fields,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
