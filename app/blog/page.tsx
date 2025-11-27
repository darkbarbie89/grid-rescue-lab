// app/blog/page.tsx
import { BLOG_POSTS } from '@/app/lib/blog-data';
import Link from 'next/link';

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans">
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tighter text-white">
            <span className="text-orange-500">GRID</span>RESCUE<span className="text-neutral-600">LAB</span>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">Field Reports & Lab Data</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-orange-500/50 transition-all">
              <div className="p-8">
                <div className="text-xs font-mono text-orange-500 mb-2 uppercase">{post.category}</div>
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">{post.title}</h2>
                <p className="text-neutral-400 line-clamp-3">{post.excerpt}</p>
                <div className="mt-6 text-sm text-neutral-600">Read Analysis &rarr;</div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}