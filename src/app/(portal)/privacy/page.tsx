
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'プライバシーポリシー | Sparks Station',
    alternates: {
        canonical: '/privacy',
    },
};

export default function PrivacyPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-12">
            <header className="space-y-4 border-b border-neutral-800 pb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white">プライバシーポリシー</h1>
                <p className="text-neutral-400">最終更新日: 2026年1月20日</p>
            </header>

            <div className="prose prose-invert prose-emerald max-w-none text-neutral-300">
                <h2>1. はじめに</h2>
                <p>
                    Sparks Station（以下、「当サイト」）は、ユーザーの個人情報の取り扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」）を定めます。
                </p>

                <h2>2. 個人情報の収集方法</h2>
                <p>
                    当サイトは、ユーザーがお問い合わせフォームを利用する際に、氏名（ハンドルネーム）、メールアドレス等の個人情報を収集する場合があります。
                </p>

                <h2>3. 広告の配信について</h2>
                <p>
                    当サイトでは、第三者配信の広告サービス（Googleアドセンス）を利用しています。
                    このような広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報 『Cookie』(氏名、住所、メール アドレス、電話番号は含まれません) を使用することがあります。
                </p>
                <p>
                    またGoogleアドセンスに関して、このプロセスの詳細やこのような情報が広告配信事業者に使用されないようにする方法については、<a href="https://policies.google.com/technologies/ads?hl=ja" className="text-emerald-400 hover:text-emerald-300 underline" target="_blank" rel="noopener noreferrer">Googleのポリシーと規約</a>をご覧ください。
                </p>

                <h2>4. アクセス解析ツールについて</h2>
                <p>
                    当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
                    このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
                    この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
                </p>

                <h2>5. 免責事項</h2>
                <p>
                    当サイトからのリンクやバナーなどで移動したサイトで提供される情報、サービス等について一切の責任を負いません。
                    また当サイトのコンテンツ・情報について、できる限り正確な情報を掲載するよう努めておりますが、正確性や安全性を保証するものではありません。情報が古くなっていることもございます。
                    当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
                </p>

                <h2>6. お問い合わせ</h2>
                <p>
                    本ポリシーに関するお問い合わせは、当サイトのお問い合わせフォームよりお願いいたします。
                </p>
            </div>
        </div>
    );
}
