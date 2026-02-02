'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { DevicesIcon, TrashIcon, XIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FormLabel } from '@/components/dataDisplay/FormLabel/FormLabel';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { Textarea } from '@/components/inputs/Textarea/Textarea';
import { Drawer } from '@/components/utils/Drawer/Drawer';
import type { FeedbackInput } from '@/features/app/schemas/feedback';
import { feedbackSchema } from '@/features/app/schemas/feedback';
import { useScreenCapture } from '@/hooks/useScreenCapture';
import { Pages } from '@/libs/pages';

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;
}

export function FeedbackDrawer({ open, onOpenChange }: Props) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FeedbackInput>({
    resolver: zodResolver(feedbackSchema),
    mode: 'onChange',
    defaultValues: { content: '' },
  });

  const { screenshot, previewUrl, isCapturing, capture, clear } =
    useScreenCapture();

  function onSubmit(data: FeedbackInput) {
    // TODO: フィードバック送信処理
    console.log(data, screenshot);
  }

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Content side="right" hidden={isCapturing} className="w-feedback-drawer">
        <Drawer.Header className="border-b border-border">
          <span className="text-xl font-semibold">フィードバックを送信</span>
          <div className="ml-auto">
            <Drawer.Close className="p-2 -mr-2 cursor-pointer">
              <XIcon size={24} weight="bold" aria-label="閉じる" />
            </Drawer.Close>
          </div>
        </Drawer.Header>

        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Drawer.Body>
            <div className="space-y-6 p-4">
              {/* フィードバック入力 */}
              <div className="space-y-4">
                <FormLabel htmlFor="feedback-content" required>
                  フィードバックの内容をご記入ください
                </FormLabel>
                <Textarea
                  id="feedback-content"
                  rows={6}
                  placeholder="問題と思われる点について詳しくお聞かせください"
                  className="w-full"
                  {...register('content')}
                />

                {/* 個人情報の注意 */}
                <p className="text-xs text-text-subtle">
                  氏名、住所、メールアドレス、電話番号、パスワードなどの個人情報はフィードバックに含めないでください。
                </p>
              </div>

              {/* スクリーンショット */}
              <div className="space-y-4">
                <p className="text-sm">
                  スクリーンショットを追加していただくと、フィードバックを把握するうえで役立ちます
                </p>
                {previewUrl ? (
                  <div>
                    {/* biome-ignore lint/performance/noImgElement: Object URL は next/image 非対応 */}
                    <img
                      src={previewUrl}
                      alt="キャプチャしたスクリーンショット"
                      className="w-full rounded-md border border-border"
                    />
                    <div className="mt-2 flex justify-end">
                      <Button
                        type="button"
                        size="sm"
                        variant="solid"
                        color="danger"
                        leftIcon={<TrashIcon size={16} />}
                        onClick={clear}
                      >
                        削除する
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="w-full"
                    leftIcon={<DevicesIcon size={20} />}
                    onClick={capture}
                  >
                    スクリーンショットをキャプチャ
                  </Button>
                )}
              </div>

              {/* 注意文 */}
              <p className="text-xs leading-relaxed text-text-subtle">
                アカウント情報とシステム情報の一部が送信されます。いただいた情報は、
                <Link
                  href={Pages.privacy.path()}
                  target="_blank"
                  className="text-text-link hover:underline"
                >
                  プライバシーポリシー
                </Link>
                と
                <Link
                  href={Pages.terms.path()}
                  target="_blank"
                  className="text-text-link hover:underline"
                >
                  利用規約
                </Link>
                に基づき、問題の解決やサービスの改善に役立てられます。
              </p>
            </div>
          </Drawer.Body>

          {/* フッター */}
          <div className="shrink-0 border-t border-border p-4">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={!isValid}
            >
              送信
            </Button>
          </div>
        </form>
      </Drawer.Content>
    </Drawer.Root>
  );
}
