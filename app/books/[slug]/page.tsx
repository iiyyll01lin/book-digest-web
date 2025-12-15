import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import BookArticleSidebar from '@/components/BookArticleSidebar';
import { getTranslations, getLocale } from 'next-intl/server';
import { getBooksSync, getLocalizedBook } from '@/lib/books';

export default async function BookArticlePage({ params }: { params: { slug: string } }) {
  const t = await getTranslations('books');
  const locale = await getLocale();
  const allBooks = getBooksSync();
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
    <article className="bg-gradient-to-b from-white to-gray-50/50 min-h-screen">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-b from-brand-navy to-brand-blue">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Book Cover */}
            <div className="flex-shrink-0">
              <div className="relative w-48 md:w-56 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/20">
                <Image
                  src={book.coverUrl || '/images/placeholder-cover.svg'}
                  alt={book.title}
                  fill
                  sizes="(max-width: 768px) 192px, 224px"
                  className="object-cover"
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

        {/* Decorative wave - soft pink gradient for visual separation */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="mx-auto max-w-6xl px-6">
            <svg viewBox="0 0 1440 60" className="w-full h-10 md:h-14" preserveAspectRatio="none">
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFA6C3" stopOpacity="0.15" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#113A7A" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <path fill="url(#waveGradient)" d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,40 1440,30 L1440,60 L0,60 Z" />
            </svg>
          </div>
        </div>
      </header>

      {/* Main Content - with frosted glass card effect */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100/50 p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Article Content */}
            <main className="lg:col-span-2 space-y-8">
              {/* Summary Section - Pink theme */}
              <section className="bg-brand-pink/25 rounded-xl p-6 border-l-4 border-brand-pink">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">📖 {t('summary')}</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {book.displaySummary || (locale === 'en' ? 'This book offers profound insights and inspiration...' : '這本書帶給我們許多深刻的思考與啟發...')}
                </p>
              </section>

              {/* Reading Notes Placeholder - Yellow theme */}
              <section className="bg-brand-yellow/15 rounded-xl p-6 border-l-4 border-brand-yellow">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">✍️ {t('readingNotes')}</h2>
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
              </section>

              {/* Discussion Points - Blue theme */}
              <section className="bg-brand-blue/10 rounded-xl p-6 border-l-4 border-brand-blue">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">💬 {t('discussionPoints')}</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue/20 text-brand-navy flex items-center justify-center text-sm font-bold">1</span>
                    <span className="text-gray-700">{t('question1')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue/20 text-brand-navy flex items-center justify-center text-sm font-bold">2</span>
                    <span className="text-gray-700">{t('question2')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue/20 text-brand-navy flex items-center justify-center text-sm font-bold">3</span>
                    <span className="text-gray-700">{t('question3')}</span>
                  </li>
                </ul>
              </section>

              {/* External Links - Navy theme */}
              {book.links && (
                <section className="bg-brand-navy/5 rounded-xl p-6 border-l-4 border-brand-navy">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">🔗 {t('relatedLinks')}</h2>
                  <div className="flex flex-wrap gap-3">
                    {book.links.publisher && (
                      <a
                        href={book.links.publisher}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-brand-navy/10 rounded-full text-gray-700 transition-colors border border-brand-navy/20"
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
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-brand-navy/10 rounded-full text-gray-700 transition-colors border border-brand-navy/20"
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
      </div>
    </article>
  );
}
