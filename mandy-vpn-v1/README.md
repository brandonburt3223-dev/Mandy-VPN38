# Mandy VPN — Chrome extension starter (v1.0)

This is the first UI and proxy-control prototype for Mandy VPN.

## What it does
- Provides a blue-and-pink Chrome extension popup.
- Saves an HTTPS proxy hostname and port.
- Uses `chrome.proxy.settings` to direct Chrome traffic through that configured HTTPS proxy.
- Provides a disconnect action that clears the extension's proxy setting.

## What it does NOT do yet
- It does not include or operate VPN servers.
- It does not create a full-device VPN tunnel.
- It does not authenticate to a proxy requiring credentials.
- It does not verify proxy reachability, exit country, encryption quality, DNS handling, WebRTC behavior, or anonymity.
- It does not include a kill switch or automatic fail-closed behavior.
- The country selector is only a label until a real server is deployed in that country.

**Do not enter an unknown/public proxy.** For development, use only a proxy endpoint you control or are explicitly authorized to use. Do not expose an unauthenticated open proxy to the internet.

## Load in Chrome
1. Extract the ZIP.
2. Open `chrome://extensions`.
3. Turn on **Developer mode**.
4. Select **Load unpacked** and choose the `mandy-vpn-v1` folder.
5. Open the Mandy VPN extension and select the gear icon.
6. Enter the hostname and port of an HTTPS forward proxy you control.
7. Save, then use Connect.

The extension can change Chrome's proxy configuration. A successful button action is **not** proof that traffic is reaching the proxy. Verify using a controlled test server and independent IP/DNS leak tests before relying on it.

## Before a public release
Build a proper backend with secure server provisioning, authenticated access, abuse controls, monitoring, privacy-preserving operations, tested DNS behavior, WebRTC safeguards, reliable failure handling, and a clear privacy policy. Never advertise locations where no server exists.
