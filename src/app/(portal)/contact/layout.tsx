import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact | Sparks Station',
    description: 'Sparks Stationへのお問い合わせはこちらから。',
    alternates: {
        canonical: '/contact',
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
