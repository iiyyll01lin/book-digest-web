import books from '../../../data/books.json';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Book } from '../../../types/book';

export default function BookModalPage({ params }: { params: { slug: string } }) {
  const book = (books as Book[]).find((b) => b.slug === params.slug);
  if (!book) return notFound();

  return (
    <section className="bg-black/60 text-white min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="bg-brand-navy rounded-xl overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-white">
              <img src={book.coverUrl || '/images/placeholder-cover.svg'} alt={book.title} className="w-full h-full object-cover" />
            </div>
            <div className="md:w-2/3 p-6">
              <h1 className="text-2xl font-bold">{book.title}</h1>
              <p className="text-white/80">{book.author}</p>
              <p className="mt-4 text-sm text-white/90">{book.summary}</p>
              <div className="mt-6">
                <Link href="/books" className="inline-flex items-center rounded-full bg-brand-pink text-brand-navy px-4 py-2 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-pink focus-visible:ring-offset-brand-navy">Close</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
