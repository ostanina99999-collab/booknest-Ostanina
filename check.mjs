// Проверка lib/ без браузера: node check.mjs
import { books } from './js/data/books.js';
import { filterBooks, sortBooks, selectBooks, toggleWish, DEFAULT_FILTERS } from './js/lib/books.js';

const titles = (list) => list.map((b) => b.title);

console.log('1) всего книг:', books.length, '| жанров:', new Set(books.map((b) => b.genre)).size);
console.log('2) поиск "ЛЕМ" (регистр не важен):', titles(filterBooks(books, { ...DEFAULT_FILTERS, query: 'ЛЕМ' })));

const combo = selectBooks(books, { query: '', genre: 'detective', sort: 'year', onlyAvailable: true });
console.log('3) детектив + только доступные + по году:', combo.map((b) => `${b.title} (${b.year})`));

const before = books.map((b) => b.id).join();
sortBooks(books, 'year');
console.log('4) исходный массив не изменился:', before === books.map((b) => b.id).join());

console.log('5) toggleWish:', toggleWish([1, 2], 3), toggleWish([1, 2, 3], 2));
console.log('6) пустой результат:', filterBooks(books, { ...DEFAULT_FILTERS, query: 'zzzz' }).length);
