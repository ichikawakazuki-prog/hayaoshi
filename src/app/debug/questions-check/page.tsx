"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function CheckQuestions() {
    const [stats, setStats] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function check() {
            try {
                const snap = await getDocs(collection(db, "questions"));
                const counts: Record<string, number> = {};
                snap.forEach(doc => {
                    const data = doc.data();
                    // Use 'Unknown' if category is missing or empty
                    const cat = data.category || "undefined";
                    counts[cat] = (counts[cat] || 0) + 1;
                });
                setStats(counts);
            } catch (e: any) {
                console.error(e);
                setStats({ error: 1 });
            } finally {
                setLoading(false);
            }
        }
        check();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-10 text-white bg-black min-h-screen">
            <h1>Category Stats</h1>
            <pre id="stats-output">{JSON.stringify(stats, null, 2)}</pre>
        </div>
    );
}
