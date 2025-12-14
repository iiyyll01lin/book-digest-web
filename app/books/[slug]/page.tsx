'use client';
import books from '../../../data/books.json';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Book } from '../../../types/book';
import BookArticleSidebar from '@/components/BookArticleSidebar';
import { useTranslations, useLocale } from 'next-intl';

// Helper to get localized book data
function getLocalizedBook(book: Book, locale: string) {
  return {
    ...book,
    displayTitle: locale === 'en' && book.titleEn ? book.titleEn : book.title,
    displaySummary: locale === 'en' && book.summaryEn ? book.summaryEn : book.summary,
  };
}

export default function BookArticlePage({ params }: { params: { slug: string } }) {
  const t = useTranslations('books');
  const locale = useLocale();
  const allBooks = books as Book[];
  const rawBook = allBooks.find((b) => b.slug === params.slug);
  if (!rawBook) return notFound();
  
  const book = getLocalizedBook(rawBook, locale);

  // Get other articles for sidebar (exclude current)
  const otherArticles = allBooks
    .filter((b) => b.slug !== params.slug)
    .slice(0, 5)
    .map((b) => ({ 
      slug: b.slug, 
      title: locale === 'en' && b.titleEn ? b.titleEn : b.title 
    }));

  return (
    <article className="bg-white min-h-screen">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-b from-brand-navy to-brand-blue">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Book Cover */}
            <div className="flex-shrink-0">
              <div className="w-48 md:w-56 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/20">
                <img
                  src={book.coverUrl || '/images/placeholder-cover.svg'}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Book Info */}
            <div className="text-center md:text-left text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {book.displayTitle}
              </h1>
              <p className="mt-3 text-lg md:text-xl text-white/80">
                by {book.author}
              </p>
              {book.tags && book.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-3 py-1 text-sm bg-white/10 rounded-full text-white/90"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              {book.readDate && (
                <p className="mt-4 text-sm text-white/60">
                  {t('bookClubDate')}{new Date(book.readDate).toLocaleDateString(locale === 'en' ? 'en-US' : 'zh-TW', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full h-8 md:h-12 fill-white">
            <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,40 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Article Content */}
          <main className="lg:col-span-2">
            {/* Summary Section */}
            <section className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📖 {t('summary')}</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {book.displaySummary || (locale === 'en' ? 'This book offers profound insights and inspiration...' : '這本書帶給我們許多深刻的思考與啟發...')}
              </p>
            </section>

            {/* Reading Notes Placeholder */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">✍️ {t('readingNotes')}</h2>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <p className="text-gray-600 italic">
                  {t('notesComingSoon')}
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  {t('notesNotice')}
                </p>
                <Link
                  href="/events"
                  className="inline-flex items-center mt-4 px-4 py-2 bg-brand-pink text-brand-navy font-semibold rounded-full hover:brightness-110 transition-all"
                >
                  {t('register')}
                </Link>
              </div>
            </section>

            {/* Discussion Points */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">💬 {t('discussionPoints')}</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-pink/20 text-brand-navy flex items-center justify-center text-sm font-bold">1</span>
                  <span className="text-gray-700">{t('question1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-pink/20 text-brand-navy flex items-center justify-center text-sm font-bold">2</span>
                  <span className="text-gray-700">{t('question2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-pink/20 text-brand-navy flex items-center justify-center text-sm font-bold">3</span>
                  <span className="text-gray-700">{t('question3')}</span>
                </li>
              </ul>
            </section>

            {/* External Links */}
            {book.links && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">🔗 {t('relatedLinks')}</h2>
                <div className="flex flex-wrap gap-3">
                  {book.links.publisher && (
                    <a
                      href={book.links.publisher}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      {t('buyBook')}
                    </a>
                  )}
                  {book.links.notes && (
                    <a
                      href={book.links.notes}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {t('fullNotes')}
                    </a>
                  )}
                </div>
              </section>
            )}

            {/* Back to Books */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link
                href="/books"
                className="inline-flex items-center gap-2 text-brand-navy hover:text-brand-pink transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {t('backToBooks')}
              </Link>
            </div>
          </main>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookArticleSidebar articles={otherArticles} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
