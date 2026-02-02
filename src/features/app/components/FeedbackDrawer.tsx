'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  CheckCircleIcon,
  DevicesIcon,
  TrashIcon,
  XIcon,
} from '@phosphor-icons/react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormLabel } from '@/components/dataDisplay/FormLabel/FormLabel';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { Textarea } from '@/components/inputs/Textarea/Textarea';
import { Drawer } from '@/components/utils/Drawer/Drawer';
import { useSubmitFeedback } from '@/features/app/hooks/useSubmitFeedback';
import type { FeedbackInput } from '@/features/app/schemas/feedback';
import { feedbackSchema } from '@/features/app/schemas/feedback';
import { useScreenCapture } from '@/hooks/useScreenCapture';
import { Pages } from '@/libs/pages';

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;
}

const AUTO_CLOSE_DELAY = 3000;

export function FeedbackDrawer({ open, onOpenChange }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FeedbackInput>({
    resolver: zodResolver(feedbackSchema),
    mode: 'onChange',
    defaultValues: { content: '' },
  });

  const { screenshot, previewUrl, isCapturing, capture, clear } =
    useScreenCapture();

  const { isSubmitting, error, submitFeedback } = useSubmitFeedback();
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isSubmitted) return;

    const timer = setTimeout(() => {
      onOpenChange(false);
    }, AUTO_CLOSE_DELAY);

    return () => clearTimeout(timer);
  }, [isSubmitted, onOpenChange]);

  const resetRef = useRef(reset);
  const clearRef = useRef(clear);
  resetRef.current = reset;
  clearRef.current = clear;

  useEffect(() => {
    if (open) return;

    setIsSubmitted(false);
    resetRef.current();
    clearRef.current();
  }, [open]);

  function onSubmit(data: FeedbackInput) {
    submitFeedback(data, {
      screenshot: screenshot ?? undefined,
      onSuccess: () => {
        reset();
        clear();
        setIsSubmitted(true);
      },
    });
  }

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Content
        side="right"
        hidden={isCapturing}
        className="w-feedback-drawer"
      >
        <Drawer.Header className="border-b border-border">
          <span className="text-xl font-semibold">フィードバックを送信</span>
          <div className="ml-auto">
            <Drawer.Close className="p-2 -mr-2 cursor-pointer">
              <XIcon size={24} weight="bold" aria-label="閉じる" />
            </Drawer.Close>
          </div>
        </Drawer.Header>

        {isSubmitted ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <CheckCircleIcon size={48} weight="fill" className="text-green" />
            <p className="text-lg font-semibold">
              フィードバックの送信ありがとうございました
            </p>
            <p className="text-sm text-text-subtle">
              いただいた内容はサービスの改善に役立てさせていただきます。
            </p>
          </div>
        ) : (
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
                    rows={8}
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
              {error && (
                <p className="mb-4 text-sm text-text-danger">{error}</p>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={!isValid}
                loading={isSubmitting}
              >
                送信
              </Button>
            </div>
          </form>
        )}
      </Drawer.Content>
    </Drawer.Root>
  );
}
