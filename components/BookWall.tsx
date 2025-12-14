// filepath: /mnt/d/workspace/book-digest-web/components/BookWall.tsx
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import booksData from '@/data/books.json';

type Book = {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  author: string;
  coverUrl?: string;
  readDate?: string;
};

// Helper to get localized book title
function getLocalizedTitle(book: Book, locale: string): string {
  if (locale === 'en' && book.titleEn) return book.titleEn;
  return book.title;
}

export default function BookWall() {
  const t = useTranslations('home');
  const locale = useLocale();
  // Sort books by readDate descending (newest first) and take first 40
  const sortedBooks = [...(booksData as Book[])].sort((a, b) => {
    if (!a.readDate && !b.readDate) return 0;
    if (!a.readDate) return 1;
    if (!b.readDate) return -1;
    return new Date(b.readDate).getTime() - new Date(a.readDate).getTime();
  }).slice(0, 40);

  return (
    <section aria-labelledby="books-wall-heading" className="bg-brand-navy">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-end justify-between gap-4">
          <h2 id="books-wall-heading" className="text-2xl md:text-3xl font-bold tracking-wide text-white">{t('recentReads')}</h2>
          <Link href="/books" className="text-sm font-semibold text-brand-pink hover:underline">{t('viewAll')}</Link>
        </div>

        <ul className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
          {sortedBooks.map((book) => (
            <li key={book.id} className="group">
              <Link href={`/books/${book.slug}`} className="block">
                <div className="relative aspect-[7/10] overflow-hidden rounded-xl md:rounded-2xl bg-white shadow ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-[1.03]">
                  <Image
                    src={book.coverUrl || '/images/placeholder-cover.svg'}
                    alt={book.title}
                    fill
                    sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 16vw, 12.5vw"
                    className="object-cover"
                  />
                  {/* Hover overlay with book info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 md:p-3">
                    <h3 className="text-white text-xs md:text-sm font-semibold leading-tight line-clamp-2">
                      {getLocalizedTitle(book, locale)}
                    </h3>
                    <p className="text-white/70 text-[10px] md:text-xs mt-1 truncate">
                      {book.author}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-6 text-center md:hidden">
          <Link href="/books" className="inline-flex items-center rounded-full bg-brand-pink px-5 py-2.5 font-semibold text-brand-navy">{t('browseBooks')}</Link>
        </div>
      </div>
    </section>
  );
}
