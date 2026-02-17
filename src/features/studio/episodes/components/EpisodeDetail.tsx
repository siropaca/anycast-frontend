'use client';

import { PencilSimpleIcon } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { Dialog } from '@/components/utils/Dialog/Dialog';
import { useEpisodePlayer } from '@/features/episodes/hooks/useEpisodePlayer';
import { toTrackFromEpisode } from '@/features/player/utils/trackConverter';
import { StatusTag } from '@/features/studio/channels/components/StatusTag';
import { useChannelDetail } from '@/features/studio/channels/hooks/useChannelDetail';
import { BgmSection } from '@/features/studio/episodes/components/BgmSection';
import { EpisodeBottomBar } from '@/features/studio/episodes/components/EpisodeBottomBar';
import { EpisodeDeleteDialog } from '@/features/studio/episodes/components/EpisodeDeleteDialog';
import { EpisodeDetailMenu } from '@/features/studio/episodes/components/EpisodeDetailMenu';
import { EpisodeInfoSection } from '@/features/studio/episodes/components/EpisodeInfoSection';
import { EpisodePublishDialog } from '@/features/studio/episodes/components/EpisodePublishDialog';
import { GenerateAudioModal } from '@/features/studio/episodes/components/GenerateAudioModal';
import { ScriptGenerateModal } from '@/features/studio/episodes/components/ScriptGenerateModal';
import { ScriptSection } from '@/features/studio/episodes/components/ScriptSection';
import { useEpisodeDeleteDialog } from '@/features/studio/episodes/hooks/useEpisodeDeleteDialog';
import { useEpisodeDetail } from '@/features/studio/episodes/hooks/useEpisodeDetail';
import { useEpisodePublishDialog } from '@/features/studio/episodes/hooks/useEpisodePublishDialog';
import { useGenerateEpisodeAudio } from '@/features/studio/episodes/hooks/useGenerateEpisodeAudio';
import { useGenerateScriptAsync } from '@/features/studio/episodes/hooks/useGenerateScriptAsync';
import { useScriptLines } from '@/features/studio/episodes/hooks/useScriptLines';
import type { GenerateAudioFormInput } from '@/features/studio/episodes/schemas/generateAudio';
import type { ScriptGenerateFormInput } from '@/features/studio/episodes/schemas/scriptGenerate';
import { Pages } from '@/libs/pages';
import { usePlayerStore } from '@/stores/playerStore';

type AudioModalMode = 'generate' | 'remix' | null;

interface Props {
  channelId: string;
  episodeId: string;
}

export function EpisodeDetail({ channelId, episodeId }: Props) {
  const router = useRouter();
  const {
    channel,
    isPublished: isChannelPublished,
    publishChannel,
  } = useChannelDetail(channelId);
  const { isEpisodePlaying, playEpisode, pauseEpisode } = useEpisodePlayer(
    channel.name,
  );

  const [showChannelPublishedDialog, setShowChannelPublishedDialog] =
    useState(false);

  const {
    episode,
    isPublished,
    isMutating,
    isDeleting,
    isPublishing,
    isUnpublishing,
    error,
    deleteEpisode,
    publishEpisode,
    unpublishEpisode,
    clearError,
  } = useEpisodeDetail(channelId, episodeId);

  const { scriptLines } = useScriptLines(channelId, episodeId);

  // 台本生成
  const scriptGeneration = useGenerateScriptAsync(channelId, episodeId);

  // 音声生成
  const audioGeneration = useGenerateEpisodeAudio(channelId, episodeId);
  const play = usePlayerStore((s) => s.play);

  // 音声生成完了後にボトムプレイヤーを新しい音声でリセット
  // biome-ignore lint/correctness/useExhaustiveDependencies: episode は handleJobCompleted の refetch 完了後に status が変わるため最新が保証される
  useEffect(() => {
    if (audioGeneration.status === 'completed' && episode.fullAudio) {
      play(toTrackFromEpisode(episode, channel.name));
    }
  }, [audioGeneration.status]);

  // モーダル
  const [isScriptModalOpen, setIsScriptModalOpen] = useState(false);
  const [audioModalMode, setAudioModalMode] = useState<AudioModalMode>(null);

  // ダイアログ
  const deleteDialog = useEpisodeDeleteDialog({
    deleteEpisode,
    clearError,
    isDeleting,
    error,
  });

  const publishDialog = useEpisodePublishDialog({
    publishEpisode,
    unpublishEpisode,
    clearError,
    isMutating: isPublishing || isUnpublishing,
    error,
  });

  async function handleDeleteConfirm() {
    const success = await deleteDialog.confirm();
    if (success) {
      router.push(Pages.studio.channel.path({ id: channelId }));
    }
  }

  async function handlePublishConfirm() {
    if (publishDialog.action === 'publish' && !isChannelPublished) {
      const channelSuccess = await publishChannel();
      if (!channelSuccess) return;
    }

    const success = await publishDialog.confirm();
    if (success && publishDialog.action === 'publish' && !isChannelPublished) {
      setShowChannelPublishedDialog(true);
    }
  }

  function handleScriptSubmit(data: ScriptGenerateFormInput) {
    scriptGeneration.generateScript({
      prompt: data.prompt,
      durationMinutes: data.durationMinutes,
      withEmotion: data.withEmotion,
    });
    setIsScriptModalOpen(false);
  }

  function handleAudioSubmit(data: GenerateAudioFormInput) {
    audioGeneration.generateAudio({
      type: data.type,
      bgmId: data.bgmId,
      systemBgmId: data.systemBgmId,
      bgmVolumeDb: data.bgmVolumeDb,
      fadeOutMs: data.fadeOutMs,
      paddingStartMs: data.paddingStartMs,
      paddingEndMs: data.paddingEndMs,
    });
    setAudioModalMode(null);
  }

  const hasVoiceAudio = !!episode.voiceAudio;

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <SectionTitle
        title={episode.title}
        backHref={Pages.studio.channel.path({ id: channelId })}
        action={
          <div className="flex items-center gap-3">
            <StatusTag isPublished={isPublished} />
            <Button
              size="sm"
              variant="outline"
              color="secondary"
              leftIcon={<PencilSimpleIcon size={16} />}
              href={Pages.studio.editEpisode.path({
                id: channelId,
                episodeId,
              })}
            >
              編集
            </Button>

            <EpisodeDetailMenu
              isPublished={isPublished}
              disabled={isMutating}
              canPublish={!!episode.fullAudio}
              onPublish={() => publishDialog.open('publish')}
              onUnpublish={() => publishDialog.open('unpublish')}
              onDelete={deleteDialog.open}
            />
          </div>
        }
      />

      {/* エピソード情報 */}
      <EpisodeInfoSection episode={episode} />

      {/* BGM */}
      <BgmSection
        channelId={channelId}
        episodeId={episodeId}
        bgm={episode.bgm}
      />

      {/* 台本 */}
      <ScriptSection
        channelId={channelId}
        episodeId={episodeId}
        episodeName={episode.title}
        prompt={scriptGeneration.restoredPrompt}
        onGenerateClick={() => setIsScriptModalOpen(true)}
      />

      {/* 固定ボトムバー */}
      <EpisodeBottomBar
        isPlaying={isEpisodePlaying(episode)}
        hasAudio={!!episode.fullAudio}
        hasVoiceAudio={hasVoiceAudio}
        audioDurationMs={episode.fullAudio?.durationMs}
        audioGeneratedAt={episode.updatedAt}
        onPlay={() => playEpisode(episode)}
        onPause={pauseEpisode}
        scriptStatus={scriptGeneration.status}
        scriptProgress={scriptGeneration.progress}
        scriptStartedAt={scriptGeneration.startedAt}
        isScriptGenerating={scriptGeneration.isGenerating}
        isScriptCancelable={scriptGeneration.isCancelable}
        isScriptCanceling={scriptGeneration.isCanceling}
        audioStatus={audioGeneration.status}
        audioProgress={audioGeneration.progress}
        audioStartedAt={audioGeneration.startedAt}
        isAudioGenerating={audioGeneration.isGenerating}
        isAudioCancelable={audioGeneration.isCancelable}
        isAudioCanceling={audioGeneration.isCanceling}
        onScriptGenerate={() => setIsScriptModalOpen(true)}
        onScriptCancel={scriptGeneration.cancelScript}
        onScriptReset={scriptGeneration.reset}
        onAudioGenerate={() => setAudioModalMode('generate')}
        onAudioRemix={() => setAudioModalMode('remix')}
        onAudioCancel={audioGeneration.cancelAudio}
        onAudioReset={audioGeneration.reset}
      />

      {/* モーダル */}
      <ScriptGenerateModal
        open={isScriptModalOpen}
        restoredPrompt={scriptGeneration.restoredPrompt}
        restoredDurationMinutes={scriptGeneration.restoredDurationMinutes}
        onClose={() => setIsScriptModalOpen(false)}
        onSubmit={handleScriptSubmit}
      />

      <GenerateAudioModal
        open={audioModalMode !== null}
        mode={audioModalMode ?? 'generate'}
        defaultBgm={episode.bgm}
        hasScriptLines={scriptLines.length > 0}
        hasVoiceAudio={hasVoiceAudio}
        onClose={() => setAudioModalMode(null)}
        onSubmit={handleAudioSubmit}
      />

      {/* ダイアログ */}
      <EpisodeDeleteDialog
        episodeName={episode.title}
        open={deleteDialog.isOpen}
        error={deleteDialog.error}
        onClose={deleteDialog.close}
        onConfirm={handleDeleteConfirm}
      />

      <EpisodePublishDialog
        episodeName={episode.title}
        action={publishDialog.action}
        open={publishDialog.isOpen}
        error={publishDialog.error}
        willPublishChannel={!isChannelPublished}
        onClose={publishDialog.close}
        onConfirm={handlePublishConfirm}
      />

      {/* チャンネル自動公開通知ダイアログ */}
      <Dialog.Root
        open={showChannelPublishedDialog}
        onOpenChange={setShowChannelPublishedDialog}
      >
        <Dialog.Content size="sm">
          <Dialog.Title>チャンネルも公開しました</Dialog.Title>
          <Dialog.Description>
            {`エピソードの公開に合わせて、チャンネル「${channel.name}」も公開しました。`}
          </Dialog.Description>
          <Dialog.Footer>
            <Button onClick={() => setShowChannelPublishedDialog(false)}>
              OK
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
