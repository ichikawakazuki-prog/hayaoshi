
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Gamepad2, Sparkles, Construction } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Products | Sparks Station',
    description: 'Sparks Stationが開発・運営しているプロダクト一覧。',
    alternates: {
        canonical: '/products',
    },
};

export default function ProductsPage() {
    return (
        <div className="space-y-12">
            <header className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-white">Products</h1>
                <p className="text-neutral-400">
                    分析から得られた知見を実装した、私たちのプロダクトポートフォリオ。
                </p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Product 1: Fantasy Quizzes Kingdom */}
                <Link href="/FantasyQuizzesKingdom" className="group block relative bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1">
                    <div className="aspect-video relative">
                        <Image
                            src="/key-visual.png"
                            alt="Fantasy Quizzes Kingdom"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Gamepad2 className="w-5 h-5 text-amber-400" />
                                <span className="text-xs font-bold bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30">
                                    LIVE DEMO
                                </span>
                            </div>
                            <h2 className="text-xl font-bold text-white mb-1">Fantasy Quizzes Kingdom</h2>
                            <p className="text-sm text-neutral-300 line-clamp-1">
                                リアルタイム対戦型クイズプラットフォーム
                            </p>
                        </div>
                    </div>
                    <div className="p-6">
                        <p className="text-sm text-neutral-400 leading-relaxed">
                            Firebaseを活用した、数ミリ秒を争う早押しクイズアプリ。ホスト・ゲスト機能、リアルタイム同期、アニメーション演出など、モダンWeb技術の粋を集めた実験的プロダクト。
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <span className="text-xs bg-neutral-800 text-neutral-400 px-2 py-1 rounded">Next.js</span>
                            <span className="text-xs bg-neutral-800 text-neutral-400 px-2 py-1 rounded">Firebase</span>
                            <span className="text-xs bg-neutral-800 text-neutral-400 px-2 py-1 rounded">Tailwind</span>
                        </div>
                    </div>
                </Link>

            </div>
        </div>
    );
}
