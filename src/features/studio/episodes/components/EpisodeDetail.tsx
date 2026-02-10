'use client';

import { PencilSimpleIcon } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { useEpisodePlayer } from '@/features/episodes/hooks/useEpisodePlayer';
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

interface Props {
  channelId: string;
  episodeId: string;
}

export function EpisodeDetail({ channelId, episodeId }: Props) {
  const router = useRouter();
  const { channel } = useChannelDetail(channelId);
  const { isEpisodePlaying, playEpisode, pauseEpisode } = useEpisodePlayer(
    channel.name,
  );

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

  // モーダル
  const [isScriptModalOpen, setIsScriptModalOpen] = useState(false);
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);

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

  function handleScriptSubmit(data: ScriptGenerateFormInput) {
    scriptGeneration.generateScript({
      prompt: data.prompt,
      durationMinutes: data.durationMinutes,
    });
    setIsScriptModalOpen(false);
  }

  function handleAudioSubmit(data: GenerateAudioFormInput) {
    audioGeneration.generateAudio({ voiceStyle: data.voiceStyle });
    setIsAudioModalOpen(false);
  }

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <SectionTitle
        title={episode.title}
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
              onPublish={() => publishDialog.open('publish')}
              onUnpublish={() => publishDialog.open('unpublish')}
              onDelete={deleteDialog.open}
            />
          </div>
        }
      />

      {/* エピソード情報 */}
      <EpisodeInfoSection episode={episode} />

      {/* 台本 */}
      <ScriptSection
        channelId={channelId}
        episodeId={episodeId}
        episodeName={episode.title}
      />

      {/* BGM */}
      <BgmSection
        channelId={channelId}
        episodeId={episodeId}
        bgm={episode.bgm}
      />

      {/* 固定ボトムバー */}
      <EpisodeBottomBar
        isPlaying={isEpisodePlaying(episode)}
        hasAudio={!!episode.fullAudio}
        onPlay={() => playEpisode(episode)}
        onPause={pauseEpisode}
        scriptStatus={scriptGeneration.status}
        scriptProgress={scriptGeneration.progress}
        isScriptGenerating={scriptGeneration.isGenerating}
        isScriptCancelable={scriptGeneration.isCancelable}
        isScriptCanceling={scriptGeneration.isCanceling}
        audioStatus={audioGeneration.status}
        audioProgress={audioGeneration.progress}
        isAudioGenerating={audioGeneration.isGenerating}
        isAudioCancelable={audioGeneration.isCancelable}
        isAudioCanceling={audioGeneration.isCanceling}
        onScriptGenerate={() => setIsScriptModalOpen(true)}
        onScriptCancel={scriptGeneration.cancelScript}
        onScriptReset={scriptGeneration.reset}
        onAudioGenerate={() => setIsAudioModalOpen(true)}
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
        open={isAudioModalOpen}
        defaultVoiceStyle={episode.voiceStyle}
        hasScriptLines={scriptLines.length > 0}
        onClose={() => setIsAudioModalOpen(false)}
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
        onClose={publishDialog.close}
        onConfirm={publishDialog.confirm}
      />
    </div>
  );
}
