import { selectBooks, pickByIds, GENRE_NAMES } from '../lib/books.js';

// Создаёт элемент. Текст всегда через textContent, поэтому innerHTML не нужен.
function el(tag, text, attrs = {}) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
  return node;
}

function createCard(book, isWished) {
  const item = el('li');
  const card = el('article', undefined, { class: 'card' });

  const figure = el('figure');
  figure.append(
    el('img', undefined, {
      src: book.cover,
      alt: `Обложка книги «${book.title}»`,
      width: '300',
      height: '450',
      loading: 'lazy',
    }),
  );

  const title = el('h3');
  title.append(el('a', book.title, { href: 'book.html' }));

  const meta = el('p', `${book.author} · ${GENRE_NAMES[book.genre]} · `);
  meta.append(
    el('time', String(book.year), { datetime: String(book.year) }),
    ` · рейтинг ${book.rating}`,
  );

  card.append(figure, title, meta);

  if (book.description) card.append(el('p', book.description));

  card.append(el('p', book.available ? 'Доступна' : 'Сейчас выдана'));

  card.append(
    el('button', isWished ? 'В моём списке' : 'Хочу прочитать', {
      type: 'button',
      class: 'btn',
      'data-action': 'toggle-wish',
      'data-id': String(book.id),
      'aria-pressed': String(isWished),
    }),
  );

  if (book.available) card.append(el('a', 'Взять на срок', { class: 'btn', href: 'loan.html' }));

  item.append(card);
  return item;
}

function syncForm(state) {
  const form = document.querySelector('#filters');
  // Пишем в поле только если значение изменилось, чтобы не сбивать курсор при вводе
  if (form.elements.q.value !== state.query) form.elements.q.value = state.query;
  if (form.elements.genre.value !== state.genre) form.elements.genre.value = state.genre;
  if (form.elements.sort.value !== state.sort) form.elements.sort.value = state.sort;
  form.elements.available.checked = state.onlyAvailable;
}

function renderCatalog(visible, wishlist) {
  const list = document.querySelector('#catalog');
  list.replaceChildren(...visible.map((book) => createCard(book, wishlist.includes(book.id))));
  document.querySelector('#results-title').textContent = `Найдено книг: ${visible.length}`;
  document.querySelector('#empty').hidden = visible.length !== 0;
}

function renderWishlist(wished) {
  const list = document.querySelector('#wishlist-list');
  const items = wished.map((book) => {
    const li = el('li');
    li.append(
      el('span', `${book.title} — ${book.author} `),
      el('button', 'Удалить', {
        type: 'button',
        class: 'btn',
        'data-action': 'remove-wish',
        'data-id': String(book.id),
      }),
    );
    return li;
  });
  list.replaceChildren(...items);
  document.querySelector('#wishlist-empty').hidden = wished.length !== 0;
  document.querySelector('#wish-count').textContent = String(wished.length);
}

// Единственная функция, которая меняет страницу. Интерфейс = функция от state.
export function render(state, books) {
  syncForm(state);
  renderCatalog(selectBooks(books, state), state.wishlist);
  renderWishlist(pickByIds(books, state.wishlist));
}
