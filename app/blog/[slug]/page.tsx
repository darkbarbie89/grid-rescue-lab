// app/blog/[slug]/page.tsx
import { BLOG_POSTS } from '@/app/lib/blog-data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// 1. Correct Type Definition for Next.js 15
type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

// 2. Make component 'async' and type the props correctly
export default async function BlogPost(props: { params: Params }) {
  // 3. Await the params before using them
  const params = await props.params;
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans">
      {/* NAV */}
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tighter text-white">
            <span className="text-orange-500">GRID</span>RESCUE<span className="text-neutral-600">LAB</span>
          </Link>
          <Link href="/#calculator" className="text-xs font-bold bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-500 transition">
            OPEN CALCULATOR
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* ARTICLE CONTENT (Left Side) */}
        <article className="lg:col-span-8">
          <div className="mb-8">
            <span className="text-orange-500 text-sm font-mono uppercase tracking-widest">{post.category}</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4 leading-tight">{post.title}</h1>
            <div className="flex items-center text-neutral-500 text-sm space-x-4">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
          
          {/* Render HTML Content safely */}
          <div 
            className="prose prose-invert prose-orange max-w-none prose-lg text-neutral-300"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* SIDEBAR (Affiliate Driver) */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl sticky top-24">
            <h3 className="text-white font-bold text-lg mb-2">⚡ Verify Your Setup</h3>
            <p className="text-neutral-400 text-sm mb-6">Don't guess. Use our engineering calculator to check if your battery can handle the surge.</p>
            <Link href="/#calculator" className="block w-full bg-orange-600 hover:bg-orange-500 text-white text-center font-bold py-3 rounded-lg transition">
              Run Audit Now
            </Link>
          </div>
        </aside>

      </main>
    </div>
  );
}