# Фильмопоиск
Связь - тг @irkatyman

### Как проверять
1. Установить бэк из задания, запустить в разных терминалах npm run start:main и npm run start:actors
2. В ветке *main* проверить все фичи, кроме некста, там лежат все правки и фичи
3. В PR Next есть все изменения. В ветке *rebase-to-next* проверить некст, там лежит миграция, из-за времени не все правки успела довнести на эту ветку

## Стэк

1. React + React-router-dom
2. TypeScript
3. Axios
4. Jest + Testing-library
5. Eslint + Stylelint
6. CSS modules
7. FSD архитектура
8. React redux + RTK Query

### Дополнительные библиотеки
1. react-tooltip
3. formik
4. yup

### Страницы
/movies - все фильмы
/movies/:id - конкретный фильм


### Самооценка по пунктам
- Шапка:
✅ Позиционируется липко (стики);

-- Авторизация:

✅ Для реализации модального окна используется портал;

✅ После успешной авторизации кнопка «Войти» меняется на заглушку иконки пользователя и кнопку «Выйти»;

✅ Сохраняем авторизационный токен из ответа ручки бэка /login (например, в localStorage);

✅ С токеном стоит работать через thunk (мидлвара) - есть, работаю с токеном в rtk в baseQuery с помощью своей мидлвары;

✅ По клику на кнопку «Выйти» удаляем токен и снимаем авторизацию;

✅ При инициализации приложения проверяем авторизационный токен;

✅ Реализована страница списка фильмов


-- Поиск

✅ Поиск происходит во время ввода пользователем символов. Дёргаем ручку /search;


-- Фильтры

✅ Реализованы фильтры с dropdown;

✅ Фильтры сохраняются в query-params;

⚠️ Реализован список фильмов с пагинацией - список есть, но без пагинации;


-- Страница фильма

--- Реализована работа с получением данных:

✅ Дёргаем ручку /movie:id;

✅ Соответствующие данные отрисованы;

--- Возможность поставить оценку:

✅ Оценку для фильма достаём из ручки /movie/:id;

✅ Если пользователь авторизован, даём возможность поставить оценку — запрос мутации;

✅ После выставления оценки обновляем кеш запроса /movie/:id - есть, после выставления оценки инвалидируется тег фильма


-- Общий функционал:

✅ Реализовать единообразную обработку ошибок для запросов - axiosBaseQuery обработчик;

✅ Реализован лоадер;

✅ Используем debounce для поиска фильма и выставления оценки;


-- Стор:

✅ Используется rtk и rtk-query;

✅ Данные корректно разбиты на модули (пример — авторизация, searchParams из фильтров) - разбито на авторизацию и фильмы;

✅ Селекторы написаны оптимально (нет переизбытка дублирования);


-- Миграция на Next:

⚠️ Реализована миграция с использованием SSR - страницы грузятся через перезагрузку (при переходе в рамках одной сессии страница не меняется;

⚠️ Для картинок используется Image некста. Скрины фильма, которые вне вьюпорта грузятся лениво - для svg картинок используется SVGR, для обычных картинок Image не реализовано;

❌ Фильтры реализованы с помощью сегментов вместо query-параметров.
