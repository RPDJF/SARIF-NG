# 🚀 SARIF-NG

Welcome to **SARIF-NG** — my personal fork of [SARIF Industries' ft_transcendence](https://github.com/fclivaz42/ft_transcendance)  
(also mirrored [here](https://github.com/RPDJF/42-transcendance), my own repo).

👉 If you are curious about this project as a 42 cursus project, you may want to check the original repositories, since this is no longer 42 compliant.

This fork is currently **in development** and focuses on modernizing the project by replacing the frontend with **Angular v17** (instead of the old vanilla TypeScript).  
The goal is simple: 🎯 learn Angular while keeping the spirit of the original project alive.

---

## 📌 Project Status

![status](https://img.shields.io/badge/status-in%20development-orange?style=for-the-badge&logo=angular) ![release](https://img.shields.io/badge/release-none%20yet-lightgrey?style=for-the-badge&logo=github)  
![angular](https://img.shields.io/badge/frontend-angular%20v17-red?style=for-the-badge&logo=angular)

## ⚠️ Current State

👉 The old frontend is set by default. To access the new frontend, add `/v2` to your base route, e.g: `http://localhost:4200/v2` 🚀.

---

## 🧭 What is SARIF-NG?

SARIF-NG is a **web-app** where you can play Pong 🏓 and run tournaments 🏆.

It’s built as a **single-page application**, but this fork is moving away from the original frontend stack to fully embrace **Angular v17** for a modern UI/UX and a smoother developer experience.

This is a **personal learning journey**, so development is experimental and evolving quickly.

---

## frontend-v2

Frontend V2 is not served by default yet.
Take a look at [frontend-v2 readme](./srcs/frontend-v2/README.md)

## 🔧 Using / Launching

Just like the original project, SARIF-NG runs on **Docker** 🐳 with a **Makefile** to standardize commands.  
From inside the project folder:

| Command        | 🛠️ Result                                                                             |
| -------------- | ------------------------------------------------------------------------------------- |
| `make`         | Builds every docker image and launches SARIF-NG.                                      |
| `make all`     | Same as above.                                                                        |
| `make start`   | Starts the containers (builds them if they do not exist).                             |
| `make stop`    | Stops the service and halts the containers.                                           |
| `make down`    | Stops the service and removes the containers.                                         |
| `make status`  | Shortcut for `docker ps -a`                                                           |
| `make network` | Shortcut for `docker network ls`                                                      |
| `make prune`   | Shortcut for `docker system prune -af`                                                |
| `make nuke`    | Deletes SARIF-NG entirely, its persistent data, then calls `prune`. ⚠️ **Dangerous!** |
| `make re`      | Rebuilds the containers without pruning any data.                                     |
| `make rebuild` | Calls `nuke` and rebuilds everything from scratch. ⚠️ **Dangerous!**                  |
| `make restart` | Stops the containers and starts them again.                                           |

---

## 📂 Project Structure

⚠️ Project structure may change

```bash
./SARIF-NG
├─ Makefile                # The dockerfile launcher for the whole app
├─ README.md               # This file ✨
├─ data/                   # Persistent data (e.g. Database)
└─ srcs/
   ├─ module_name/         # Each microservice lives here
   │   ├─ srcs/            # Sources copied into container
   │   ├─ README.md        # Explains what the module does
   │   ├─ Dockerfile       # How the service is built
   │   ├─ docker-compose.yml
   │   └─ package.json     # Dependencies for Node/NPM services
   ├─ docker-compose.yml   # Main docker-compose (ties modules together)
   ├─ dockerignore.example # Example .dockerignore
   └─ env.example          # Example environment variables
```
