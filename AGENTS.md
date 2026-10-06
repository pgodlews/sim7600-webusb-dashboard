# Working on this repository

## Purpose and architecture

This is a dependency-free WebUSB dashboard for M5Stack COMX.LTE / SIM7600G modems. Keep it usable as a standalone HTML file in Chrome or Edge, without a backend or external runtime dependencies.

- `src/app.js`: USB transport, AT command queue, LTE/GNSS parsing, NMEA handling, demo data and UI interactions.
- `src/style.css`: responsive dashboard styles.
- `src/index.template.html`: semantic page structure and metadata.
- `assemble.cjs`: combines the source into the distributable `index.html`.
- `tests/transport.cjs`: simulated USB transport and protocol checks.
- `docs/screenshots/`: README screenshots. Use explicitly labelled demo data for repository images.

Edit source files and run `node assemble.cjs`; do not hand-edit the generated `index.html`. Commit the regenerated HTML alongside source changes.

## Hardware and protocol requirements

- Current USB layout: vendor `0x1e0e`, product `0x9001`, AT interface 2, OUT endpoint 3, IN endpoint 4. Validate descriptors before claiming the interface.
- Keep all AT commands sequential. Pause scheduled polling during data transfers.
- Preserve paced upload chunks and check bytes written; oversized writes previously caused modem input problems.
- Validate NMEA checksums and assemble complete multipart GSV cycles before displaying them.
- Keep satellite observations and trails bounded; expire stale observations.
- Distinguish course of motion from true antenna heading. Do not invent RTK, dual-antenna attitude, satellite measurements or position uncertainty.
- Show simulated data only in explicit demo mode. Clear invalid fixes and label disconnected readings as stale.
- Restore the previous NMEA reporting configuration and modem echo on a normal disconnect.

## Privacy and scope

Keep live location and modem identifiers local to the browser. Do not put real coordinates, IMEI, SIM identifiers, credentials or personal logs in screenshots, tests or commits. Map links are explicit user actions; synthetic speed-test traffic goes to Cloudflare using the SIM's data allowance.

Do not add packages, servers or external services unless the requested feature requires them. Preserve the MIT license and Piotr Godlewski copyright. Do not change repository visibility, publish websites or send messages solely because this file exists.

## Verification

Run after relevant source edits:

```sh
node assemble.cjs
node --check src/app.js
node tests/transport.cjs src/app.js
```

For visual changes, inspect desktop and narrow layouts in a supported browser. Report whether checks used simulated USB data or a physical modem. A simulated test does not verify browser permission handling or live satellite reception.
