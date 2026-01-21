'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';

export default function PostStats({ slug, theme }: { slug: string, theme: any }) {
    const [stats, setStats] = useState({ helpful: 0, not_helpful: 0, commentCount: 0 });

    useEffect(() => {
        const docRef = doc(db, 'posts_stats', slug);
        const unsubscribe = onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setStats({
                    helpful: data.helpful || 0,
                    not_helpful: data.not_helpful || 0,
                    commentCount: data.commentCount || 0
                });
            }
        });

        return () => unsubscribe();
    }, [slug]);

    return (
        <div className={`flex items-center gap-4 text-xs font-mono mt-auto pt-4 border-t border-neutral-700/50 w-full ${theme.primary}`}>
            <div className="flex items-center gap-1.5" title="参考になった">
                <ThumbsUp size={14} className="opacity-70" />
                <span>{stats.helpful}</span>
            </div>

            <div className="flex items-center gap-1.5 ml-auto" title="コメント数">
                <MessageSquare size={14} className="opacity-70" />
                <span>{stats.commentCount}</span>
            </div>
        </div>
    );
}
