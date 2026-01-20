import { getSortedPostsData } from '@/lib/content';
import PostCard from './components/PostCard';

export default function PortalPage() {
    const posts = getSortedPostsData();

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="text-center space-y-6 py-12">
                <div className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-medium border border-emerald-500/20 mb-4">
                    Micro-SaaS Trends for Engineers
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight">
                    海外の開発・売却事例から<br className="hidden md:block" />
                    <span className="text-emerald-400">「Sparks（種火）」</span>を。
                </h1>
                <p className="text-neutral-400 max-w-xl mx-auto text-lg leading-relaxed">
                    次のプロダクトの種火は、海の向こうに。
                    <br />高額で売却されたSaaSの
                    <br />「なぜ」と「どうやって」を紐解く。
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
                    {posts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </div>
            </section>
        </div>
    );
}
