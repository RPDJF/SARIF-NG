# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: fclivaz <fclivaz@student.42lausanne.ch>    +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2025/02/22 22:04:45 by fclivaz           #+#    #+#              #
#    Updated: 2025/08/03 02:03:58 by fclivaz          ###   LAUSANNE.ch        #
#                                                                              #
# **************************************************************************** #

NAME = sarif-ng

DATADIR = data
SSLDIR = ssl

SHELL = /bin/bash

GENERATOR = dd if=/dev/random of=/dev/stdout bs=256 count=1 2>/dev/null | base64 | tr -d '\n'

${NAME}: all

all: start

build:
	mkdir -p ${DATADIR}
	mkdir -p ${SSLDIR}
	docker compose -p ${NAME} -f ./srcs/docker-compose.yml build
	@if [ ! -f "${SSLDIR}/sarif-ng.crt" ] || [ ! -f "${SSLDIR}/sarif-ng.key" ]; then \
			echo "Generating self-signed certificate..."; \
			openssl req -x509 -newkey rsa:2048 -nodes \
					-keyout "${SSLDIR}/sarif-ng.key" -out "${SSLDIR}/sarif-ng.crt" -days 365 \
					-subj "/C=CH/ST=Vaud/L=Lausanne/O=42/OU=42/CN=sarif-ng.42lausanne.ch" \
					-addext "subjectAltName=DNS:sarif-ng.42lausanne.ch,DNS:*.sarif-ng.42lausanne.ch"; \
	fi

up: build
	API_KEY="$$($(GENERATOR))" docker compose -p ${NAME} -f ./srcs/docker-compose.yml up -d

down:
	docker compose -p ${NAME} -f ./srcs/docker-compose.yml down

start: up
	docker compose -p ${NAME} -f ./srcs/docker-compose.yml start

stop:
	docker compose -p ${NAME} -f ./srcs/docker-compose.yml stop

status:
	docker ps -a

network:
	docker network ls

prune:
	docker system prune -f

nuke: down
	docker compose -p ${NAME} -f ./srcs/docker-compose.yml down -v --rmi all --remove-orphans
	docker system prune -f
	sudo rm -rf ${DATADIR}
	rm -rf ${SSLDIR}

re: down all

rebuild: nuke
	make all

restart: stop start
