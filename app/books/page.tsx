"use client";
import books from '../../data/books.json';
import Link from 'next/link';
import type { Book } from '../../types/book';
import { useEffect, useState } from 'react';

export default function BooksPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(id);
  }, []);

  const data = books as Book[];
  return (
    <section className="bg-brand-navy text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-bold tracking-wide">Books</h1>
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
                  <div className="aspect-[7/10] bg-white rounded-2xl shadow-xl overflow-hidden">
                    <img
                      src={b.coverUrl || '/images/placeholder-cover.svg'}
                      alt={b.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-2 text-sm">
                    <div className="font-semibold line-clamp-2 tracking-wide">{b.title}</div>
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
