import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-brand-navy to-brand-blue">
      <div className="text-center text-white px-6">
        <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          頁面不存在
        </h2>
        <p className="text-white/70 mb-8 max-w-md mx-auto">
          抱歉，您要找的頁面可能已被移除或暫時無法使用。
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-pink text-brand-navy font-semibold rounded-full hover:brightness-110 transition-all"
        >
          ← 返回首頁
        </Link>
      </div>
    </div>
  );
}
