// Cloudflare Web Analytics beacon (cookieless -- the privacy page's "no
// cookies" claim depends on staying with this, no GA). Renders nothing until
// NEXT_PUBLIC_CF_BEACON_TOKEN is set at build time (Workers Builds env var --
// the token comes from Rade's Cloudflare dashboard, see DEV-LOG 008), so a
// local build without the token ships zero analytics code.
const token = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

export default function AnalyticsBeacon() {
  if (!token) {
    return null;
  }
  return (
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
