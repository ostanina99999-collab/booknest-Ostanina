import { GENRES, SORTS } from './lib/books.js';

const KEY = 'booknest:v1';

// Читаем сохранённое состояние. Если там мусор или ничего нет — возвращаем значения по умолчанию.
export function loadSaved(defaults) {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === null) return defaults;
    const data = JSON.parse(raw);
    return {
      wishlist: Array.isArray(data.wishlist)
        ? data.wishlist.filter(Number.isInteger)
        : defaults.wishlist,
      query: typeof data.query === 'string' ? data.query : defaults.query,
      genre: GENRES.includes(data.genre) ? data.genre : defaults.genre,
      sort: SORTS.includes(data.sort) ? data.sort : defaults.sort,
      onlyAvailable:
        typeof data.onlyAvailable === 'boolean' ? data.onlyAvailable : defaults.onlyAvailable,
    };
  } catch {
    return defaults;
  }
}

export function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // хранилище недоступно или переполнено — приложение продолжает работать без сохранения
  }
}
