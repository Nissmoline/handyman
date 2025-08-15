# 🍪 Система управления Cookies - Handyman24

## Обзор

Система управления cookies в проекте Handyman24 соответствует требованиям GDPR и обеспечивает прозрачное управление согласием пользователей на использование cookies.

## Компоненты

### 1. CookieConsent.vue
Основной компонент для получения согласия пользователя на использование cookies.

**Функции:**
- Показывает баннер согласия при первом посещении
- Предоставляет выбор между "Аπαραίτητα μόνο" и "Αποδοχή όλων"
- Детальная информация о типах cookies
- Ссылка на настройки cookies

### 2. CookieSettings.vue
Компонент для управления настройками cookies.

**Функции:**
- Изменение предпочтений пользователя
- Включение/отключение аналитических cookies
- Сохранение настроек в localStorage

### 3. utils/cookies.js
Утилита для управления cookies и согласием.

**Основные методы:**
- `hasConsent(type)` - проверка согласия
- `setConsent(type)` - установка согласия
- `enableAnalytics()` - включение аналитики
- `disableAnalytics()` - отключение аналитики
- `shouldShowBanner()` - нужно ли показать баннер

## Типы Cookies

### 1. Απαραίτητα Cookies (Essential)
- **Назначение:** Базовая функциональность сайта
- **Примеры:** Сессии, корзина, настройки
- **Статус:** Всегда включены, нельзя отключить

### 2. Αναλυτικά Cookies (Analytics)
- **Назначение:** Анализ использования сайта
- **Примеры:** Google Analytics, Google Tag Manager
- **Статус:** Требует согласия пользователя

### 3. Λειτουργικά Cookies (Functional)
- **Назначение:** Улучшение функциональности
- **Примеры:** Предпочтения пользователя
- **Статус:** Требует согласия пользователя

## Интеграция с Google Analytics

### Настройка в index.html
```javascript
// Проверяем согласие на cookies перед загрузкой аналитики
const cookieConsent = localStorage.getItem('cookie_consent');
if (cookieConsent === 'all') {
  gtag('consent', 'update', {
    'analytics_storage': 'granted',
    'ad_storage': 'granted'
  });
  gtag('config', 'G-L1M82F3KQR');
} else {
  // По умолчанию отключаем аналитику до получения согласия
  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied'
  });
  gtag('config', 'G-L1M82F3KQR', {
    'anonymize_ip': true
  });
}
```

### Включение аналитики после согласия
```javascript
// В CookieManager.enableAnalytics()
if (window.gtag) {
  window.gtag('consent', 'update', {
    'analytics_storage': 'granted',
    'ad_storage': 'granted'
  });
}
```

## Использование в компонентах

### Проверка согласия
```javascript
import CookieManager from '@/utils/cookies.js'

// Проверка полного согласия
if (CookieManager.hasConsent('all')) {
  // Пользователь согласился на все cookies
}

// Проверка минимального согласия
if (CookieManager.hasConsent('essential')) {
  // Пользователь согласился на необходимые cookies
}
```

### Установка согласия
```javascript
// Согласие на все cookies
CookieManager.setConsent('all')

// Согласие только на необходимые
CookieManager.setConsent('essential')
```

## Хранение данных

### localStorage
- `cookie_consent`: тип согласия ('all', 'essential', null)
- `cookie_consent_date`: дата согласия (ISO string)

### Пример данных
```javascript
{
  cookie_consent: 'all',
  cookie_consent_date: '2024-01-15T10:30:00.000Z'
}
```

## GDPR Соответствие

### Принципы
1. **Прозрачность:** Пользователь информирован о всех типах cookies
2. **Согласие:** Явное согласие перед установкой cookies
3. **Контроль:** Возможность изменить настройки в любое время
4. **Минимизация:** Использование только необходимых cookies

### Требования
- ✅ Информация о типах cookies
- ✅ Возможность выбора
- ✅ Простое отключение
- ✅ Сохранение предпочтений
- ✅ Доступ к настройкам

## Тестирование

### Очистка согласия для тестирования
```javascript
// В консоли браузера
CookieManager.clearConsent()
// или
localStorage.removeItem('cookie_consent')
localStorage.removeItem('cookie_consent_date')
```

### Проверка состояния
```javascript
// Проверка текущего согласия
console.log('Consent:', localStorage.getItem('cookie_consent'))
console.log('Date:', localStorage.getItem('cookie_consent_date'))
```

## Доступ к настройкам

### Через футер
- Ссылка "Ρυθμίσεις Cookies" в футере сайта

### Через баннер согласия
- Кнопка "Ρυθμίσεις Cookies" в баннере согласия

## Обновления и поддержка

### Добавление новых типов cookies
1. Обновить CookieConsent.vue с новым типом
2. Обновить CookieSettings.vue с переключателем
3. Обновить utils/cookies.js с логикой управления

### Изменение текстов
Все тексты находятся в компонентах и легко редактируются для изменения языка или содержания.

## Безопасность

- Данные хранятся только в localStorage браузера
- Нет передачи данных на сервер без согласия
- Аналитика отключена по умолчанию
- IP адреса анонимизированы при отключенной аналитике
