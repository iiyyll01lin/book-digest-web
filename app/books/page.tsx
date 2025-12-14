"use client";
import books from '../../data/books.json';
import Link from 'next/link';
import type { Book } from '../../types/book';
import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

// Helper to get localized book data
function getLocalizedBook(book: Book, locale: string) {
  return {
    ...book,
    displayTitle: locale === 'en' && book.titleEn ? book.titleEn : book.title,
    displaySummary: locale === 'en' && book.summaryEn ? book.summaryEn : book.summary,
  };
}

export default function BooksPage() {
  const t = useTranslations('books');
  const locale = useLocale();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(id);
  }, []);

  const data = (books as Book[]).map(b => getLocalizedBook(b, locale));
  return (
    <section className="bg-brand-navy text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-bold tracking-wide">{t('title')}</h1>
        <p className="text-white/80 mt-2">Past reads from our book club.</p>

        {loading ? (
          <ul className="mt-8 grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" aria-busy="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <li key={i} className="group">
                <div className="aspect-[7/10] rounded-2xl overflow-hidden bg-white/10 border border-white/10 animate-pulse" />
                <div className="mt-2 space-y-2">
                  <div className="h-3 w-5/6 bg-white/10 rounded" />
                  <div className="h-3 w-1/2 bg-white/10 rounded" />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-8 grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {data.map((b) => (
              <li key={b.id} className="group">
                <Link href={`/books/${b.slug}`} className="block">
                  <div className="relative aspect-[7/10] bg-white rounded-2xl shadow-xl overflow-hidden">
                    <img
                      src={b.coverUrl || '/images/placeholder-cover.svg'}
                      alt={b.displayTitle}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Hover overlay with book summary */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-4">
                      <h3 className="text-white text-sm md:text-base font-semibold leading-tight line-clamp-2">
                        {b.displayTitle}
                      </h3>
                      <p className="text-white/70 text-xs md:text-sm mt-1">
                        {b.author}
                      </p>
                      {b.displaySummary && (
                        <p className="text-white/80 text-xs mt-2 line-clamp-3 leading-relaxed">
                          {b.displaySummary}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 text-sm group-hover:opacity-50 transition-opacity">
                    <div className="font-semibold line-clamp-2 tracking-wide">{b.displayTitle}</div>
                    <div className="text-white/70">{b.author}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
