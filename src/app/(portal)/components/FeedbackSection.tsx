'use client';

import VoteButtons from './VoteButtons';
import CommentSection from './CommentSection';

export default function FeedbackSection({ slug }: { slug: string }) {
    return (
        <div className="max-w-2xl mx-auto space-y-16 border-t border-neutral-800 pt-16">
            <VoteButtons slug={slug} />
            <CommentSection slug={slug} />
        </div>
    );
}
