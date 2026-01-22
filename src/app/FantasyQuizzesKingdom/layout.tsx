import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";
import Script from "next/script";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Fantasy Quizzes Kingdom | リアルタイムクイズバトル",
    description: "ファンタジーの世界で知識を武器に戦おう。ソロモードでランキングに挑戦するか、マルチモードで友達と対戦するか。インストール不要の無料Webクイズゲーム。",
    openGraph: {
        title: "Fantasy Quizzes Kingdom | リアルタイムクイズバトル",
        description: "知識と速さで運命を切り拓け。最大同時対戦可能なRPG風クイズゲーム。",
        images: ["/key-visual.png"],
    },
    alternates: {
        canonical: '/FantasyQuizzesKingdom',
    },
};

export default function QuizLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3577742758028719"
                crossOrigin="anonymous"
                strategy="lazyOnload"
            />
            <AuthProvider>
                <div className="flex-grow">
                    {children}
                </div>
                <Footer />
                <Toaster />
            </AuthProvider>
        </>
    );
}
