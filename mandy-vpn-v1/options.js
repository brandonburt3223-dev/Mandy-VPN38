const $ = (id) => document.getElementById(id);

async function load() {
  const data = await chrome.storage.local.get({
    proxyHost: "", proxyPort: 443, selectedCountry: "Canada"
  });
  $("host").value = data.proxyHost;
  $("port").value = data.proxyPort;
  $("country").value = data.selectedCountry;
}

$("save").addEventListener("click", async () => {
  const host = $("host").value.trim();
  const port = Number($("port").value);
  const hostnameOk = /^(?=.{1,253}$)([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)(\.([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?))*$/.test(host);

  if (!hostnameOk || !Number.isInteger(port) || port < 1 || port > 65535) {
    $("feedback").textContent = "Enter a valid server hostname and port.";
    return;
  }

  await chrome.storage.local.set({
    proxyHost: host,
    proxyPort: port,
    selectedCountry: $("country").value
  });
  $("feedback").textContent = "Settings saved. Open the extension popup to connect.";
});

load();