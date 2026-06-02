# ERP — Frontend (erp-appSide)

Web client for the **Employee Referral Program** system: employees refer
candidates for open positions, and HR manages positions and candidate statuses
from a dedicated portal.

The API it talks to lives in **[erp](https://github.com/jzpasion/erp)** (Express + Socket.IO + MySQL).

---

## Tech stack

| | |
| --- | --- |
| Framework | React 16 (Create React App) |
| Routing | React Router 5 |
| UI | React-Bootstrap, SweetAlert2 |
| Realtime | Socket.IO client |

## Features / pages

| Route | Page | Notes |
| --- | --- | --- |
| `/` | Home | "Are you an employee?" gate |
| `/employee` | Employee dashboard | Browse open positions and refer candidates |
| `/HRLogin` | HR login | Credentials verified by the backend |
| `/6RXYPvzzDGiNphnUrytD` | **HR portal** | Overview + Candidates tabs, manage positions & statuses |
| `/aboutERP` | About ERP | What the referral program is |
| `/about-company` | About the company | Pulled from the brand config |
| `/Contact` | Contact | Pulled from the brand config |

## Project structure

```
src/
├── index.js                  # Router + navbar
├── config/brand.js           # Company name, contact, about copy (single source of truth)
├── component/
│   ├── brand-logo.svg        # Logo
│   ├── js/                   # Page components (Login, Employee, HR, About…)
│   ├── css/                  # Per-page styles (themed via CSS variables in index.css)
│   └── Tabs/                 # Custom tab component used by the HR portal
public/
Dockerfile                    # Multi-stage build → served by nginx
nginx.conf
```

## Prerequisites

- **Node.js 16** is recommended. This app uses Create React App 3 / webpack 4,
  which fails on Node 17+ with `ERR_OSSL_EVP_UNSUPPORTED`. On a newer Node, run
  with the legacy OpenSSL flag:

  ```bash
  # PowerShell
  $env:NODE_OPTIONS="--openssl-legacy-provider"
  # bash
  export NODE_OPTIONS=--openssl-legacy-provider
  ```

- The [backend](https://github.com/jzpasion/erp) running (default `http://localhost:8080`).

## Run locally

```bash
npm install
npm start            # http://localhost:3000
```

Point the app at your backend with `REACT_APP_SOCKET_ENDPOINT` (defaults to
`http://localhost:8080`):

```bash
# bash
REACT_APP_SOCKET_ENDPOINT=http://localhost:8080 npm start
```

## Run with Docker

The backend address is **baked in at build time** (Create React App only exposes
`REACT_APP_*` vars during the build), so pass it as a build arg:

```bash
docker build --build-arg REACT_APP_SOCKET_ENDPOINT=http://localhost:8081 -t erp-app .
docker run -p 3000:80 erp-app        # http://localhost:3000
```

## Configuration

| Variable | Default | Description |
| --- | --- | --- |
| `REACT_APP_SOCKET_ENDPOINT` | `http://localhost:8080` | Backend base URL (REST + Socket.IO) |

### Re-branding

All brand text — company name, logo alt text, contact details, and the About
page copy — comes from a single file: [`src/config/brand.js`](src/config/brand.js).
Change the values there to re-brand the whole app. Swap
[`src/component/brand-logo.svg`](src/component/brand-logo.svg) for your own logo.

### Theming

Colors live as CSS variables in [`src/index.css`](src/index.css) (`--bg`,
`--surface`, `--accent`, `--text`, …). Override them in one place to re-skin.

## HR portal login

The HR portal is gated by a login whose credentials are checked **on the server**
(not in this bundle). Defaults: `HRadmin` / `hradmin1234` — configurable via the
backend's `HR_ADMIN_USER` / `HR_ADMIN_PASSWORD` environment variables.

## Build

```bash
npm run build        # production build into ./build
```
