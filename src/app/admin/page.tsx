"use client";

import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Loader2, Lock, LogIn, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const WHITELIST = ["ichikawa.kazuki@shibaurafzk.com"];

export default function AdminPage() {
    const { user, loading, loginWithGoogle } = useAuth();
    const router = useRouter();

    const isAnonymous = user?.isAnonymous;
    const isAuthorized = user && !isAnonymous && user.email && WHITELIST.includes(user.email);

    useEffect(() => {
        if (isAuthorized) {
            router.push("/admin/questions");
        }
    }, [isAuthorized, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white p-4 flex items-center justify-center">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <Lock className="mx-auto h-12 w-12 text-amber-500 mb-4" />
                    <h1 className="text-3xl font-black gold-text italic tracking-widest uppercase">
                        Admin Access
                    </h1>
                    <p className="text-amber-200/40 text-sm mt-2">
                        管理者としてログインしてください
                    </p>
                </div>

                <Card className="fantasy-card border-none bg-black/60 p-8 text-center space-y-6">
                    {!user || isAnonymous ? (
                        <>
                            <p className="text-sm text-amber-100/60 leading-relaxed">
                                管理機能を使用するには、管理用のGoogleアカウントで認証が必要です。
                            </p>
                            <Button
                                onClick={loginWithGoogle}
                                className="w-full h-14 bg-white text-black hover:bg-slate-200 font-bold flex items-center justify-center gap-3"
                            >
                                <LogIn className="h-5 w-5" />
                                Googleでログイン
                            </Button>
                        </>
                    ) : !isAuthorized ? (
                        <div className="space-y-4">
                            <p className="text-red-400 font-bold">
                                アクセス権限がありません
                            </p>
                            <p className="text-xs text-white/40">
                                アカウント: {user.email}<br />
                                このアカウントは許可リストに含まれていません。
                            </p>
                            <div className="flex flex-col gap-2">
                                <Button
                                    onClick={loginWithGoogle}
                                    className="w-full bg-amber-600 hover:bg-amber-500 text-black font-bold"
                                >
                                    別のアカウントでログイン
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => window.location.href = "/"}
                                    className="w-full border-white/10 text-white/40"
                                >
                                    ホームに戻る
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <Loader2 className="h-8 w-8 animate-spin text-amber-500 mx-auto" />
                            <p className="text-sm text-amber-400">管理画面へ移動中...</p>
                        </div>
                    )}
                </Card>
            </div>
        </main>
    );
}
