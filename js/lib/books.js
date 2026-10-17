// Чистые функции: не трогают DOM и не меняют переданные аргументы.

export const GENRE_NAMES = {
  novel: 'Новелла',
  romance: 'Романтика',
  fantasy: 'Фэнтези',
  detective: 'Детектив',
  scifi: 'Фантастика',
};
export const GENRES = ['', ...Object.keys(GENRE_NAMES)]; // '' = «Все жанры»
export const SORTS = ['title', 'year', 'rating'];

export const DEFAULT_FILTERS = Object.freeze({
  query: '',
  genre: '',
  sort: 'title',
  onlyAvailable: false,
});

export function filterBooks(books, { query, genre, onlyAvailable }) {
  const q = query.trim().toLowerCase();
  return books.filter((book) => {
    const matchesQuery =
      q === '' ||
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q);
    const matchesGenre = genre === '' || book.genre === genre;
    const matchesAvailable = !onlyAvailable || book.available;
    return matchesQuery && matchesGenre && matchesAvailable;
  });
}

export function sortBooks(books, sortKey) {
  const copy = [...books]; // копия, чтобы не испортить исходный массив
  switch (sortKey) {
    case 'year':
      return copy.sort((a, b) => b.year - a.year);
    case 'rating':
      return copy.sort((a, b) => b.rating - a.rating);
    default:
      return copy.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
  }
}

export function selectBooks(books, filters) {
  return sortBooks(filterBooks(books, filters), filters.sort);
}

export function toggleWish(ids, id) {
  return ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
}

export function pickByIds(books, ids) {
  return books.filter((book) => ids.includes(book.id));
}
