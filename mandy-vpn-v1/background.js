const DEFAULTS = {
  proxyHost: "",
  proxyPort: 443,
  selectedCountry: "Canada"
};

async function getSettings() {
  return await chrome.storage.local.get(DEFAULTS);
}

async function applyProxy() {
  const settings = await getSettings();

  if (!settings.proxyHost || !settings.proxyPort) {
    throw new Error("Add your HTTPS proxy server in Settings first.");
  }

  await chrome.proxy.settings.set({
    value: {
      mode: "fixed_servers",
      rules: {
        singleProxy: {
          scheme: "https",
          host: settings.proxyHost,
          port: Number(settings.proxyPort)
        },
        bypassList: ["<local>"]
      }
    },
    scope: "regular"
  });

  await chrome.storage.local.set({
    isEnabled: true,
    connectionState: "routing-enabled"
  });
}

async function clearProxy() {
  await chrome.proxy.settings.clear({ scope: "regular" });
  await chrome.storage.local.set({
    isEnabled: false,
    connectionState: "disconnected"
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  (async () => {
    try {
      if (message?.type === "CONNECT") {
        await applyProxy();
        sendResponse({ ok: true });
      } else if (message?.type === "DISCONNECT") {
        await clearProxy();
        sendResponse({ ok: true });
      } else if (message?.type === "GET_STATUS") {
        const data = await chrome.storage.local.get([
          "isEnabled", "connectionState", "proxyHost", "proxyPort", "selectedCountry"
        ]);
        sendResponse({ ok: true, data });
      } else {
        sendResponse({ ok: false, error: "Unknown request." });
      }
    } catch (error) {
      sendResponse({ ok: false, error: error.message || "Something went wrong." });
    }
  })();
  return true;
});

// Start in a safe, disconnected state. The extension never silently enables a proxy.
chrome.runtime.onInstalled.addListener(async () => {
  await chrome.storage.local.set({
    isEnabled: false,
    connectionState: "disconnected"
  });
});