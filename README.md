# lab4_docker
# Docker: Докеризация приложения

## Цель лабораторной

Cобрать из исходного кода и запустить в докере рабочее приложение с базой данных (любое опенсорс - Java, python/django/flask, golang).

1. Образ должен быть легковесным.
2. Использовать базовые легковесные образы - alpine.
3. Вся конфигурация приложения должна быть через переменные окружения.
4. Статика (зависимости) должна быть внешним томом `volume`.
5. Создать файл `docker-compose` для старта и сборки.
6. В `docker-compose` нужно использовать базу данных (postgresql, mysql, mongodb etc.).
7. При старте приложения должно быть учтено выполнение автоматических миграций.
8. Контейнер должен запускаться от непривилегированного пользователя.
9. После установки всех нужных утилит, должен очищаться кеш.

## Описание

Это простое веб-приложение на основе Node.js с использованием фреймворка Express и ORM Sequelize для взаимодействия с базой данных PostgreSQL. Приложение контейнеризовано с использованием Docker и управляется с помощью Docker Compose.

## Структура проекта

- **Dockerfile**: Описывает инструкции для сборки Docker-образа.
- **docker-compose.yml**: Конфигурационный файл для Docker Compose, который определяет и управляет многоконтейнерным приложением.
- **config/config.json**: Конфигурационный файл для подключения к базе данных для разных окружений.
- **app.js**: Основной файл приложения, который содержит логику работы сервера.
- **migrations/**: Директория с файлами миграций для управления схемой базы данных.

## Команды для установки и запуска
- Сборка и запуск контейнеров:
 ```bash
docker-compose up --build -d
```
- Остановка контейнеров:
```bash
docker-compose stop
```
- Запуск контейнеров:
```bash
docker-compose start
```
- Полная остановка и удаление контейнеров (полностью останавливает и удаляет все контейнеры, сети и тома, созданные Docker Compose для текущего проекта):
```bash
docker-compose down
```
