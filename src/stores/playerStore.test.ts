import type { Track } from '@/stores/playerStore';
import { usePlayerStore } from '@/stores/playerStore';

function createTrack(overrides: Partial<Track> = {}): Track {
  return {
    id: 'track-1',
    type: 'episode',
    title: 'テストトラック',
    channelName: 'テストチャンネル',
    artworkUrl: 'https://example.com/artwork.png',
    audioUrl: 'https://example.com/audio.mp3',
    durationMs: 300000,
    ...overrides,
  };
}

describe('playerStore', () => {
  beforeEach(() => {
    usePlayerStore.setState({
      currentTrack: null,
      queue: [],
      queueIndex: 0,
      isPlaying: false,
      currentTimeMs: 0,
      durationMs: 0,
      volume: 0.8,
      isMuted: false,
    });
  });

  describe('play()', () => {
    it('トラックを設定して再生を開始する', () => {
      const track = createTrack();
      usePlayerStore.getState().play(track);

      const state = usePlayerStore.getState();
      expect(state.currentTrack).toEqual(track);
      expect(state.isPlaying).toBe(true);
      expect(state.currentTimeMs).toBe(0);
      expect(state.durationMs).toBe(300000);
    });

    it('キューなしの場合はトラック単体をキューに設定する', () => {
      const track = createTrack();
      usePlayerStore.getState().play(track);

      const state = usePlayerStore.getState();
      expect(state.queue).toEqual([track]);
      expect(state.queueIndex).toBe(0);
    });

    it('キューありの場合はキューを設定しインデックスを合わせる', () => {
      const track1 = createTrack({ id: 'track-1' });
      const track2 = createTrack({ id: 'track-2', title: 'トラック2' });
      const track3 = createTrack({ id: 'track-3', title: 'トラック3' });
      const queue = [track1, track2, track3];

      usePlayerStore.getState().play(track2, queue);

      const state = usePlayerStore.getState();
      expect(state.queue).toEqual(queue);
      expect(state.queueIndex).toBe(1);
      expect(state.currentTrack).toEqual(track2);
    });
  });

  describe('pause()', () => {
    it('isPlaying を false にする', () => {
      const track = createTrack();
      usePlayerStore.getState().play(track);
      usePlayerStore.getState().pause();

      expect(usePlayerStore.getState().isPlaying).toBe(false);
    });
  });

  describe('resume()', () => {
    it('currentTrack がある場合は isPlaying を true にする', () => {
      const track = createTrack();
      usePlayerStore.getState().play(track);
      usePlayerStore.getState().pause();
      usePlayerStore.getState().resume();

      expect(usePlayerStore.getState().isPlaying).toBe(true);
    });

    it('currentTrack がない場合は何もしない', () => {
      usePlayerStore.getState().resume();

      expect(usePlayerStore.getState().isPlaying).toBe(false);
    });
  });

  describe('stop()', () => {
    it('currentTrack を null にして再生を停止する', () => {
      const track = createTrack();
      usePlayerStore.getState().play(track);
      usePlayerStore.getState().stop();

      const state = usePlayerStore.getState();
      expect(state.currentTrack).toBeNull();
      expect(state.isPlaying).toBe(false);
      expect(state.currentTimeMs).toBe(0);
      expect(state.durationMs).toBe(0);
      expect(state.queue).toEqual([]);
      expect(state.queueIndex).toBe(0);
    });
  });

  describe('next()', () => {
    it('キューの次のトラックを再生する', () => {
      const track1 = createTrack({ id: 'track-1' });
      const track2 = createTrack({ id: 'track-2', title: 'トラック2' });
      usePlayerStore.getState().play(track1, [track1, track2]);
      usePlayerStore.getState().next();

      const state = usePlayerStore.getState();
      expect(state.currentTrack).toEqual(track2);
      expect(state.queueIndex).toBe(1);
      expect(state.isPlaying).toBe(true);
      expect(state.currentTimeMs).toBe(0);
    });

    it('キュー末尾の場合は何もしない', () => {
      const track1 = createTrack({ id: 'track-1' });
      const track2 = createTrack({ id: 'track-2' });
      usePlayerStore.getState().play(track2, [track1, track2]);
      usePlayerStore.getState().next();

      const state = usePlayerStore.getState();
      expect(state.currentTrack).toEqual(track2);
      expect(state.queueIndex).toBe(1);
    });

    it('キューが単体の場合は何もしない', () => {
      const track = createTrack();
      usePlayerStore.getState().play(track);
      usePlayerStore.getState().next();

      const state = usePlayerStore.getState();
      expect(state.currentTrack).toEqual(track);
      expect(state.queueIndex).toBe(0);
    });
  });

  describe('previous()', () => {
    it('再生位置が3秒以上の場合は先頭にシークする', () => {
      const track = createTrack();
      usePlayerStore.getState().play(track);
      usePlayerStore.getState().setCurrentTime(5000);
      usePlayerStore.getState().previous();

      const state = usePlayerStore.getState();
      expect(state.currentTimeMs).toBe(0);
      expect(state.currentTrack).toEqual(track);
    });

    it('再生位置が3秒未満で前のトラックがある場合は前のトラックを再生する', () => {
      const track1 = createTrack({ id: 'track-1' });
      const track2 = createTrack({ id: 'track-2', title: 'トラック2' });
      usePlayerStore.getState().play(track2, [track1, track2]);
      usePlayerStore.getState().setCurrentTime(1000);
      usePlayerStore.getState().previous();

      const state = usePlayerStore.getState();
      expect(state.currentTrack).toEqual(track1);
      expect(state.queueIndex).toBe(0);
      expect(state.isPlaying).toBe(true);
      expect(state.currentTimeMs).toBe(0);
    });

    it('再生位置が3秒未満でキュー先頭の場合は先頭にシークする', () => {
      const track1 = createTrack({ id: 'track-1' });
      const track2 = createTrack({ id: 'track-2' });
      usePlayerStore.getState().play(track1, [track1, track2]);
      usePlayerStore.getState().setCurrentTime(1000);
      usePlayerStore.getState().previous();

      const state = usePlayerStore.getState();
      expect(state.currentTimeMs).toBe(0);
      expect(state.currentTrack).toEqual(track1);
      expect(state.queueIndex).toBe(0);
    });

    it('単体再生の場合は先頭にシークする', () => {
      const track = createTrack();
      usePlayerStore.getState().play(track);
      usePlayerStore.getState().setCurrentTime(1000);
      usePlayerStore.getState().previous();

      expect(usePlayerStore.getState().currentTimeMs).toBe(0);
    });
  });

  describe('seek()', () => {
    it('currentTimeMs を更新する', () => {
      usePlayerStore.getState().seek(50000);

      expect(usePlayerStore.getState().currentTimeMs).toBe(50000);
    });
  });

  describe('setVolume()', () => {
    it('volume を更新する', () => {
      usePlayerStore.getState().setVolume(0.5);

      expect(usePlayerStore.getState().volume).toBe(0.5);
    });

    it('volume が0より大きい場合はミュートを解除する', () => {
      usePlayerStore.setState({ isMuted: true });
      usePlayerStore.getState().setVolume(0.5);

      expect(usePlayerStore.getState().isMuted).toBe(false);
    });

    it('volume が0の場合はミュート状態を維持する', () => {
      usePlayerStore.setState({ isMuted: true });
      usePlayerStore.getState().setVolume(0);

      expect(usePlayerStore.getState().isMuted).toBe(true);
    });
  });

  describe('toggleMute()', () => {
    it('ミュート状態を切り替える', () => {
      usePlayerStore.getState().toggleMute();
      expect(usePlayerStore.getState().isMuted).toBe(true);

      usePlayerStore.getState().toggleMute();
      expect(usePlayerStore.getState().isMuted).toBe(false);
    });
  });

  describe('setCurrentTime()', () => {
    it('currentTimeMs を更新する', () => {
      usePlayerStore.getState().setCurrentTime(12345);

      expect(usePlayerStore.getState().currentTimeMs).toBe(12345);
    });
  });

  describe('setDuration()', () => {
    it('durationMs を更新する', () => {
      usePlayerStore.getState().setDuration(60000);

      expect(usePlayerStore.getState().durationMs).toBe(60000);
    });
  });

  describe('setIsPlaying()', () => {
    it('isPlaying を更新する', () => {
      usePlayerStore.getState().setIsPlaying(true);
      expect(usePlayerStore.getState().isPlaying).toBe(true);

      usePlayerStore.getState().setIsPlaying(false);
      expect(usePlayerStore.getState().isPlaying).toBe(false);
    });
  });
});
