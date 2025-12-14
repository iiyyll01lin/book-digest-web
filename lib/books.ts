import type { Book } from '@/types/book';

// Lazy load books data - only loaded once and cached
let booksCache: Book[] | null = null;

export async function getBooks(): Promise<Book[]> {
  if (booksCache) return booksCache;
  
  const booksData = await import('@/data/books.json');
  booksCache = booksData.default as Book[];
  return booksCache;
}

// Synchronous version for client components that need immediate access
export function getBooksSync(): Book[] {
  // Dynamic require for sync access - will be bundled
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const booksData = require('@/data/books.json');
  return booksData.default || booksData;
}

// Get a single book by slug
export async function getBookBySlug(slug: string): Promise<Book | undefined> {
  const books = await getBooks();
  return books.find((b) => b.slug === slug);
}

// Get books sorted by date (newest first)
export async function getRecentBooks(limit: number = 40): Promise<Book[]> {
  const books = await getBooks();
  return [...books]
    .sort((a, b) => {
      if (!a.readDate && !b.readDate) return 0;
      if (!a.readDate) return 1;
      if (!b.readDate) return -1;
      return new Date(b.readDate).getTime() - new Date(a.readDate).getTime();
    })
    .slice(0, limit);
}

// Helper to get localized book data
export function getLocalizedBook(book: Book, locale: string) {
  return {
    ...book,
    displayTitle: locale === 'en' && book.titleEn ? book.titleEn : book.title,
    displaySummary: locale === 'en' && book.summaryEn ? book.summaryEn : book.summary,
  };
}

// Helper to get localized title
export function getLocalizedTitle(book: Book, locale: string): string {
  if (locale === 'en' && book.titleEn) return book.titleEn;
  return book.title;
}
