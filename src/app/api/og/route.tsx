import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const name = searchParams.get('name') || 'Guest';
        const score = searchParams.get('score') || '0';
        const rank = searchParams.get('rank') || 'Novice';
        const genre = searchParams.get('genre') || 'ALL';
        const rankLabel = searchParams.get('rankLabel') || 'RANK';

        // Load font
        const fontData = await fetch(
            new URL('https://fonts.gstatic.com/s/notoserif/v23/ga6Iaw1J5X9T9RW6j9bNfFcWaA.ttf', import.meta.url)
        ).then((res) => res.arrayBuffer());

        // Load Background Image
        // Note: In Vercel Edge functions, local file access is limited. 
        // We use an absolute URL if possible, or fetch from the deployment URL.
        // For stability in this environment, let's assume the image is available via public URL.
        // However, referencing via origin is often flaky in preview or local.
        // Let's try to use the deployment URL if available, otherwise construct it.
        // A common pattern is to fetch it from the public folder using the properly resolved URL.

        // For this specific fix, we will load the image data as ArrayBuffer just like the font
        // assuming it is in the public folder and we can access it via URL.
        // Actually, for local/edge, `import.meta.url` relative path to `public` doesn't work directly for `fetch` 
        // if it's not bundled.
        // Let's rely on the absolute URL but ensure we have a fallback or correct protocol.

        const origin = new URL(req.url).origin;
        const bgImageUrl = `${origin}/score-card-bg.png`;

        // Fetching the image server-side to pass as data might be safer to avoid mixed content or localhost accessibility issues from the "browser" inside the OG generator.
        const bgImageData = await fetch(bgImageUrl).then(res => res.arrayBuffer());

        // Convert to base64 for embedding (safer for some environments)
        // or just pass the ArrayBuffer if ImageResponse supports it? 
        // ImageResponse supports creating an ImageBitmap or similar, but for JSX `img`, we need a src.
        // src can be a data URL.

        const base64Bg = Buffer.from(bgImageData).toString('base64');
        const bgSrc = `data:image/png;base64,${base64Bg}`;

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        backgroundColor: '#0f0505',
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {/* The Card Container */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '500px',
                            height: '100%',
                            position: 'relative',
                            backgroundColor: '#1a0b0b',
                            overflow: 'hidden',
                            borderLeft: '2px solid #331515',
                            borderRight: '2px solid #331515',
                        }}
                    >
                        {/* Background Image Layer */}
                        <img
                            src={bgSrc}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />

                        {/* Dark Overlay */}
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0,0,0,0.4)',
                            }}
                        />

                        {/* Frame Border */}
                        <div
                            style={{
                                position: 'absolute',
                                top: 20,
                                left: 20,
                                right: 20,
                                bottom: 20,
                                border: '3px solid #b38728',
                                borderRadius: 15,
                                zIndex: 10,
                            }}
                        />

                        {/* Content */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                zIndex: 20,
                                color: '#FEF3C7',
                                width: '100%',
                                paddingTop: 50,
                                paddingBottom: 30,
                                justifyContent: 'space-between',
                                height: '100%',
                            }}
                        >
                            {/* Header */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ fontSize: 40, marginBottom: 5 }}>👑</div>
                                <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: '0.15em', color: 'white', textShadow: '0 4px 8px rgba(0,0,0,0.8)' }}>
                                    TRIAL RECORD
                                </div>
                                <div style={{ width: 80, height: 2, background: '#FDE68A', opacity: 0.8, marginTop: 10 }} />
                            </div>

                            {/* Stats */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: '100%', padding: '0 40px' }}>
                                {/* Name */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}>
                                    <div style={{ fontSize: 14, color: '#FDE68A', letterSpacing: '0.1em', opacity: 0.8 }}>PLAYER NAME</div>
                                    <div style={{ fontSize: 32, fontFamily: '"Noto Serif"', fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>{name}</div>
                                </div>

                                {/* Grid */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: 10 }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: 10, flex: 1, border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                                        <div style={{ fontSize: 12, color: '#FDE68A', opacity: 0.8 }}>GENRE</div>
                                        <div style={{ fontSize: 20, fontFamily: '"Noto Serif"', fontWeight: 'bold' }}>{genre}</div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: 10, flex: 1, border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                                        <div style={{ fontSize: 12, color: '#FDE68A', opacity: 0.8 }}>{rankLabel}</div>
                                        <div style={{ fontSize: 20, fontFamily: '"Noto Serif"', fontWeight: 'bold', color: '#FBBF24' }}>{rank}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Score */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: -10 }}>
                                <div style={{ fontSize: 70, fontWeight: 900, color: 'white', textShadow: '0 4px 6px rgba(0,0,0,0.8)', lineHeight: 1 }}>{Number(score).toLocaleString()}</div>
                                <div style={{ fontSize: 16, letterSpacing: '0.4em', color: '#D97706', fontWeight: 'bold', marginTop: 5 }}>POINTS</div>
                            </div>

                            {/* Footer */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ fontSize: 14, fontWeight: 'bold', letterSpacing: '0.1em', color: '#B45309' }}>Fantasy Quizzes Kingdom</div>
                                <div style={{ fontSize: 10, color: '#92400e', fontStyle: 'italic' }}>by Sparks Station</div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: 'Noto Serif',
                        data: fontData,
                        style: 'normal',
                    },
                ],
            }
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
