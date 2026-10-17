import { books } from './data/books.js';
import { DEFAULT_FILTERS, toggleWish } from './lib/books.js';
import { loadSaved, save } from './storage.js';
import { render } from './ui/render.js';

const defaults = { ...DEFAULT_FILTERS, wishlist: [] };

// Единственный объект состояния
let state = loadSaved(defaults);

function setState(patch) {
  state = { ...state, ...patch };
  save(state);
  // Если файла обложки нет — подставляем заглушку.
// Событие error не всплывает, поэтому слушаем его на стадии перехвата (третий аргумент true).
const NO_COVER = 'images/no-cover.svg';
document.querySelector('#catalog').addEventListener(
  'error',
  (event) => {
    const img = event.target;
    if (img.tagName !== 'IMG' || img.dataset.fallback === '1') return;
    img.dataset.fallback = '1';
    img.src = NO_COVER;
  },
  true,
);

render(state, books);
}

const form = document.querySelector('#filters');

// Одно событие на всю форму фильтров
form.addEventListener('input', () => {
  setState({
    query: form.elements.q.value,
    genre: form.elements.genre.value,
    sort: form.elements.sort.value,
    onlyAvailable: form.elements.available.checked,
  });
});

// Без этого страница перезагрузится при отправке формы (например, по Enter в поиске)
form.addEventListener('submit', (event) => {
  event.preventDefault();
});

// Делегирование: один слушатель на <main> обслуживает все кнопки, даже созданные позже
document.querySelector('main').addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  if (button === null) return;

  const id = Number(button.dataset.id);
  switch (button.dataset.action) {
    case 'toggle-wish':
    case 'remove-wish':
      setState({ wishlist: toggleWish(state.wishlist, id) });
      break;
    case 'reset':
      setState({ ...DEFAULT_FILTERS });
      break;
    default:
      break;
  }
});

// Если файла обложки нет — подставляем заглушку.
// Событие error не всплывает, поэтому слушаем его на стадии перехвата (третий аргумент true).
const NO_COVER = 'images/no-cover.svg';
document.querySelector('#catalog').addEventListener(
  'error',
  (event) => {
    const img = event.target;
    if (img.tagName !== 'IMG' || img.dataset.fallback === '1') return;
    img.dataset.fallback = '1';
    img.src = NO_COVER;
  },
  true,
);

render(state, books);
