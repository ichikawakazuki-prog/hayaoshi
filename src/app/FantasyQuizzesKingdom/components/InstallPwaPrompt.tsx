"use client";

import { useEffect, useState } from "react";
import { Download, X, Share } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InstallPwaPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [showIOSGuide, setShowIOSGuide] = useState(false);

    useEffect(() => {
        // Check if already in standalone mode (PWA)
        if (window.matchMedia("(display-mode: standalone)").matches) {
            setIsStandalone(true);
            return;
        }

        // Android/Desktop: Listen for prompt event
        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsVisible(true);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        // iOS Detection
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
        if (isIosDevice) {
            setIsIOS(true);
            setIsVisible(true); // Always show for iOS if not standalone
        }

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt
            );
        };
    }, []);

    const handleInstallClick = async () => {
        if (isIOS) {
            setShowIOSGuide(true);
        } else if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === "accepted") {
                setDeferredPrompt(null);
                setIsVisible(false);
            }
        }
    };

    if (isStandalone || !isVisible) return null;

    return (
        <>
            {/* Bottom Floating Bar */}
            <AnimatePresence>
                {!showIOSGuide && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-8 md:w-96"
                    >
                        <div className="bg-slate-900/95 border-2 border-amber-500/50 rounded-xl p-4 shadow-2xl backdrop-blur-sm relative overflow-hidden">
                            {/* Decorative Glow */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-50" />

                            <div className="flex items-center justify-between gap-4">
                                <div className="flex-1">
                                    <h3 className="text-amber-400 font-bold text-sm tracking-wider flex items-center gap-2">
                                        <Download className="w-4 h-4" />
                                        APP INSTALL
                                    </h3>
                                    <p className="text-slate-300 text-xs mt-1 leading-tight">
                                        アプリ版で全画面プレイ！
                                        <br />
                                        <span className="opacity-75">
                                            {isIOS
                                                ? "ホーム画面に追加して起動"
                                                : "インストールして快適に遊ぶ"}
                                        </span>
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    <button
                                        onClick={handleInstallClick}
                                        className="bg-gradient-to-b from-amber-400 to-amber-600 text-slate-900 font-bold text-xs px-4 py-2 rounded-lg shadow-lg hover:brightness-110 active:scale-95 transition-all border border-amber-300"
                                    >
                                        インストール
                                    </button>
                                    <button
                                        onClick={() => setIsVisible(false)}
                                        className="p-2 text-slate-400 hover:text-white transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* iOS Installation Guide Modal */}
            <AnimatePresence>
                {showIOSGuide && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setShowIOSGuide(false)}
                    >
                        <motion.div
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            exit={{ y: 100 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-slate-900 border-2 border-amber-500 rounded-xl p-6 w-full max-w-sm relative shadow-[0_0_50px_rgba(251,191,36,0.2)]"
                        >
                            <button
                                onClick={() => setShowIOSGuide(false)}
                                className="absolute top-2 right-2 p-2 text-slate-400 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-slate-800 rounded-2xl mx-auto mb-4 border border-amber-500/30 flex items-center justify-center">
                                    <span className="text-3xl">👑</span>
                                </div>
                                <h3 className="text-xl font-bold text-amber-500 mb-2">
                                    インストール方法
                                </h3>
                                <p className="text-slate-300 text-sm">
                                    Safariのメニューから簡単にアプリ化できます
                                </p>
                            </div>

                            <div className="space-y-4 text-sm text-slate-200">
                                <div className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                                    <div className="shrink-0 w-8 h-8 bg-slate-700 rounded flex items-center justify-center text-blue-400">
                                        <Share className="w-5 h-5" />
                                    </div>
                                    <span>
                                        1. 画面下部（または上部）の
                                        <br />
                                        <span className="font-bold text-blue-300">「共有」</span>
                                        ボタンをタップ
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                                    <div className="shrink-0 w-8 h-8 bg-slate-700 rounded flex items-center justify-center text-white">
                                        <span className="font-bold text-lg">+</span>
                                    </div>
                                    <span>
                                        2. メニューから
                                        <br />
                                        <span className="font-bold text-white">
                                            「ホーム画面に追加」
                                        </span>
                                        を選択
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                                    <div className="shrink-0 w-8 h-8 bg-slate-700 rounded flex items-center justify-center text-amber-500">
                                        <span className="font-bold text-lg">Add</span>
                                    </div>
                                    <span>
                                        3. 右上の
                                        <span className="font-bold text-amber-400">「追加」</span>
                                        をタップして完了！
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <button
                                    onClick={() => setShowIOSGuide(false)}
                                    className="text-slate-400 text-sm hover:text-white underline decoration-dashed"
                                >
                                    閉じる
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
