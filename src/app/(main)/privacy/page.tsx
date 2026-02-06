import type { Metadata } from 'next';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.privacy.title,
};

export default function PrivacyPage() {
  return (
    <div className="space-y-6">
      <SectionTitle title={Pages.privacy.title} />

      <div className="space-y-8 text-sm leading-relaxed text-text-subtle">
        <p>
          Anycast（以下「本サービス」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。本プライバシーポリシーは、本サービスにおける個人情報の取り扱いについて定めるものです。
        </p>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-text-main">
            1. 収集する情報
          </h3>
          <p>本サービスでは、以下の情報を収集することがあります。</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              アカウント情報: ユーザー名、メールアドレス、プロフィール画像など
            </li>
            <li>
              利用情報:
              再生履歴、お気に入り、フォロー情報、再生リストなどのサービス利用状況
            </li>
            <li>
              技術情報: IPアドレス、ブラウザ情報、デバイス情報、アクセスログなど
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-text-main">
            2. 情報の利用目的
          </h3>
          <p>収集した情報は、以下の目的で利用します。</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>本サービスの提供・運営・改善</li>
            <li>ユーザー体験のパーソナライズ</li>
            <li>コンテンツのおすすめ機能の提供</li>
            <li>ユーザーサポートへの対応</li>
            <li>不正利用の防止およびセキュリティの確保</li>
            <li>利用状況の統計・分析</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-text-main">
            3. 情報の第三者提供
          </h3>
          <p>
            当社は、以下の場合を除き、ユーザーの個人情報を第三者に提供することはありません。
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>ユーザーの同意がある場合</li>
            <li>法令に基づく場合</li>
            <li>
              人の生命、身体または財産の保護のために必要な場合であって、本人の同意を得ることが困難な場合
            </li>
            <li>
              サービス提供に必要な範囲で業務委託先に提供する場合（適切な管理を義務付けます）
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-text-main">
            4. データの保存と管理
          </h3>
          <p>
            当社は、収集した個人情報を適切な安全管理措置を講じて保管します。不要となった個人情報は、合理的な期間内に削除または匿名化します。
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-text-main">
            5. Cookieの使用
          </h3>
          <p>
            本サービスでは、ユーザー体験の向上やアクセス分析のためにCookieを使用することがあります。ブラウザの設定によりCookieを無効にすることも可能ですが、一部の機能が制限される場合があります。
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-text-main">
            6. ユーザーの権利
          </h3>
          <p>ユーザーは、自身の個人情報について以下の権利を有します。</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>個人情報の開示・訂正・削除の請求</li>
            <li>個人情報の利用停止の請求</li>
            <li>アカウントの削除</li>
          </ul>
          <p>これらの請求は、お問い合わせページよりご連絡ください。</p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-text-main">
            7. ポリシーの変更
          </h3>
          <p>
            当社は、必要に応じて本プライバシーポリシーを変更することがあります。重要な変更がある場合は、本サービス上で通知します。
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-text-main">
            8. お問い合わせ
          </h3>
          <p>
            個人情報の取り扱いに関するお問い合わせは、お問い合わせページよりご連絡ください。
          </p>
        </section>

        <p className="text-text-subtle">制定日: 2025年1月1日</p>
      </div>
    </div>
  );
}
