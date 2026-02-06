import type { Metadata } from 'next';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.terms.title,
};

export default function TermsPage() {
  return (
    <div className="space-y-6">
      <SectionTitle title={Pages.terms.title} />

      <div className="space-y-8 text-sm leading-relaxed text-text-subtle">
        <p>
          この利用規約（以下「本規約」）は、Anycast（以下「本サービス」）の利用に関する条件を定めるものです。本サービスをご利用いただく前に、本規約をよくお読みください。本サービスを利用することにより、本規約に同意したものとみなされます。
        </p>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-text-main">第1条（定義）</h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              「本サービス」とは、当社が提供するポッドキャスト配信プラットフォーム「Anycast」を指します。
            </li>
            <li>
              「ユーザー」とは、本サービスを利用するすべての方を指します。
            </li>
            <li>
              「コンテンツ」とは、本サービス上で配信される音声、テキスト、画像その他の情報を指します。
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-text-main">
            第2条（アカウント）
          </h3>
          <ul className="list-decimal space-y-1 pl-5">
            <li>
              ユーザーは、正確かつ最新の情報を提供してアカウントを登録するものとします。
            </li>
            <li>
              アカウントの管理責任はユーザーにあり、第三者への貸与・譲渡はできません。
            </li>
            <li>
              アカウントの不正利用が判明した場合、当社は事前の通知なくアカウントを停止できるものとします。
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-text-main">
            第3条（禁止事項）
          </h3>
          <p>
            ユーザーは、本サービスの利用にあたり以下の行為を行ってはなりません。
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>法令または公序良俗に反する行為</li>
            <li>他のユーザーまたは第三者の権利を侵害する行為</li>
            <li>本サービスの運営を妨害する行為</li>
            <li>不正アクセスまたはそれを試みる行為</li>
            <li>虚偽の情報を登録・投稿する行為</li>
            <li>その他、当社が不適切と判断する行為</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-text-main">
            第4条（コンテンツ）
          </h3>
          <ul className="list-decimal space-y-1 pl-5">
            <li>
              ユーザーが投稿・配信するコンテンツの権利はユーザーに帰属します。
            </li>
            <li>
              ユーザーは、本サービス上でコンテンツを配信することにより、当社に対してコンテンツの表示・配信に必要な範囲でのライセンスを付与するものとします。
            </li>
            <li>
              当社は、法令違反や本規約に反するコンテンツを事前の通知なく削除できるものとします。
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-text-main">
            第5条（知的財産権）
          </h3>
          <p>
            本サービスに関する知的財産権は、当社または正当な権利者に帰属します。本規約に基づく本サービスの利用許諾は、知的財産権の譲渡を意味するものではありません。
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-text-main">
            第6条（免責事項）
          </h3>
          <ul className="list-decimal space-y-1 pl-5">
            <li>
              当社は、本サービスの完全性、正確性、有用性等について保証いたしません。
            </li>
            <li>
              当社は、本サービスの利用に起因してユーザーに生じた損害について、当社の故意または重過失による場合を除き、責任を負いません。
            </li>
            <li>
              当社は、本サービスの中断・停止・終了について、事前に通知するよう努めますが、緊急の場合はこの限りではありません。
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-text-main">
            第7条（規約の変更）
          </h3>
          <p>
            当社は、必要に応じて本規約を変更できるものとします。変更後の利用規約は、本サービス上に掲載した時点で効力を生じるものとします。
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-bold text-text-main">
            第8条（準拠法・管轄裁判所）
          </h3>
          <p>
            本規約は日本法に準拠し、本規約に関する紛争については東京地方裁判所を第一審の専属的合意管轄裁判所とします。
          </p>
        </section>

        <p className="text-text-subtle">制定日: 2025年1月1日</p>
      </div>
    </div>
  );
}
