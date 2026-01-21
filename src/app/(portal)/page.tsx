import { getSortedPostsData } from '@/lib/content';
import PostCard from './components/PostCard';
import Pagination from './components/Pagination';

const POSTS_PER_PAGE = 6;

export default async function PortalPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const posts = getSortedPostsData();
    const params = await searchParams;
    const page = typeof params.page === 'string' ? parseInt(params.page) : 1;
    const currentPage = isNaN(page) || page < 1 ? 1 : page;

    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const displayedPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="text-center space-y-6 py-12">
                <div className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-medium border border-emerald-500/20 mb-4">
                    Micro-SaaS Trends for Engineers
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight">
                    最新の<span className="text-emerald-400">「開発事例」</span>と<br className="hidden md:block" />
                    先進的な<span className="text-emerald-400">「思想」</span>を<br className="hidden md:block" />
                    <span className="text-emerald-400">「プロダクト」</span>へ。
                </h1>
                <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
                    海の向こうの開発事例と、世界をアップデートする概念。<br />
                    2つの知見を種火（Sparks）に変えて、<br />
                    プロダクトを創り出す。
                </p>
            </section>

            {/* Featured Articles */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                        Latest Analysis
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedPosts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </div>

                <Pagination currentPage={currentPage} totalPages={totalPages} />
            </section>
        </div>
    );
}
