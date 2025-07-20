# 🧩 ШРИ 2025 — Домашнее задание: Инфраструктура

## 🌍 Доступность приложения

Приложение успешно задеплоено и доступно по следующему адресу:

🔗 http://89.169.178.109/hw/store/

---

## 🧪 CI-пайплайн (Pull Requests)

Workflow: `ci-pr.yml`

Каждое открытие или обновление Pull Request'а в `main` запускает автоматические проверки:

- 🔬 Статический анализ: `npm run lint`
- 🧪 Тестирование: `npm test`

Если хотя бы один шаг завершится с ошибкой, PR не будет доступен для слияния.

---

## 📦 Релиз (Release workflow)

Workflow: `release-app.yml`

Ручной запуск в GitHub Actions (через `workflow_dispatch`) выполняет:

1. Создание новой ветки `releases/<version>`
2. Сборка Docker-образа
3. Публикация образов в Yandex Container Registry:
   ```
   cr.yandex/<ID>/app:<version>
   cr.yandex/<ID>/app:<version>_latest
   ```
4. Создание GitHub Issue с подробностями:
   - Версия
   - Автор
   - Дата
   - Список изменений
   - Ссылка на образ
5. Добавление git-тега: `v<version>`

---

## 🛠 Экстренные фиксы (Hotfix)

Workflow: `hotfix-release.yml`

Позволяет создать хотфикс для уже выпущенного релиза:

- Принимает номер версии (`version`)
- Сборка фикса с тегом `fix<N>` и перетирание `latest`
- Теги:
  ```
  cr.yandex/<ID>/app:<version>_fix<N>
  cr.yandex/<ID>/app:<version>_latest
  ```
- Создание git-тега `v<version>_fix<N>`
- Комментарий в GitHub Issue с данными фикса (время, автор, коммиты)

---

## 🚀 Продакшн-деплой

Workflow: `deploy-prod.yml`

Позволяет вручную задеплоить конкретную версию на виртуальную машину в Яндекс Облаке:

- Подключение по SSH
- `docker pull` нужного образа
- Остановка и удаление предыдущего контейнера
- Запуск приложения с маппингом портов:
  ```bash
  docker run -d \
    --name shri-infra \
    --restart unless-stopped \
    -p 80:3000 \
    -e NODE_ENV=production \
    cr.yandex/<ID>/app:<version>_latest
  ```
- Проверка доступности через `curl`
- Комментарий в GitHub Issue

---

## 🔒 Безопасность ветки `main`

- Нельзя пушить напрямую
- Обязательные проверки CI
- Только через Pull Request

---

## 🧾 About.tsx

Файл `src/client/pages/About.tsx` отредактирован:
- Заменено `[Your Name]` на `Aleksandr Slednikov`
- Тесты обновлены и проходят ✅

---

## 🛠 Используемые технологии

- ⚙️ Docker + GitHub Actions
- ☁️ Yandex Cloud + Container Registry
- 🧠 Node.js + TypeScript + React
- 🔁 GitHub CLI (`gh`)
- 🧼 CI: линтинг, тестирование, автосборки и релизы
- 🗃 Git-теги, релизные ветки, hotfix-флоу

---

## 🧼 Чистота и порядок

- Все workflows успешно проверены
- Автоматизация охватывает весь релизный цикл
- Проект протестирован: от PR до продакшн-деплоя.
