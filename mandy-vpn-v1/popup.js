const $ = (id) => document.getElementById(id);
const connectButton = $("connectButton");

async function refresh() {
  const response = await chrome.runtime.sendMessage({ type: "GET_STATUS" });
  if (!response?.ok) return;

  const d = response.data || {};
  const enabled = Boolean(d.isEnabled);
  $("statusTitle").textContent = enabled ? "Proxy routing enabled" : "Not connected";
  $("statusDetail").textContent = enabled
    ? "Chrome proxy settings are pointing to your configured server."
    : "Your browser is not using Mandy VPN.";
  $("statusOrb").classList.toggle("active", enabled);
  connectButton.textContent = enabled ? "Disconnect" : "Connect";
  $("countryName").textContent = d.selectedCountry || "Canada";
  $("serverLabel").textContent = d.proxyHost
    ? `${d.proxyHost}:${d.proxyPort}`
    : "Configure a server to activate";
}

connectButton.addEventListener("click", async () => {
  connectButton.disabled = true;
  $("notice").textContent = "Updating Chrome proxy settings…";
  const current = await chrome.runtime.sendMessage({ type: "GET_STATUS" });
  const action = current?.data?.isEnabled ? "DISCONNECT" : "CONNECT";
  const result = await chrome.runtime.sendMessage({ type: action });
  $("notice").textContent = result?.ok
    ? (action === "CONNECT"
        ? "Proxy routing is enabled. This does not verify server reachability or anonymity."
        : "Proxy routing has been disabled.")
    : (result?.error || "Could not update proxy settings.");
  connectButton.disabled = false;
  await refresh();
});

$("settings").addEventListener("click", () => chrome.runtime.openOptionsPage());
refresh();