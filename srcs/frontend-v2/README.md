# 🎨 frontend-v2

This is the **frontend module** of SARIF-NG, rewritten with **Angular v17** + **SSR** and styled with **TailwindCSS**.  
It replaces the old vanilla TypeScript frontend.

---

## ⚠️ Docker Setup

In order to load `frontend-v2` instead of the old `frontend` module, you need to manually change your route from:
`https://localhost` to `https://localhost/v2`

## ⚠️ Development Setup

Before coding, make sure to use the correct Node version for this module:

```bash
nvm install
nvm use
```

---

## 🛠️ Run in Dev Mode

```bash
npm i
npm start
```

App will be available at 👉 [http://localhost:4200](http://localhost:4200)

---

## 🏗️ Run for Production

Whenver possible, simply use the docker-compose with its docker-entrypoint.
It will handle https on its own by default.

👉 frontend only runs in https only (at least for now).

```bash
export CERT_PATH="/etc/ssl/certs/sarif.crt"
export KEY_PATH="/etc/ssl/private/sarif.key"
npm run build
npm run serve:ssr:frontend-v2
```

App will be available at 👉 [https://localhost:4200](https://localhost:4200)

---

✨ That’s it — the Angular frontend of SARIF-NG 🚀
