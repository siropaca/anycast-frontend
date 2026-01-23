'use client';

import { useVoiceList } from '@/features/studio/voices/hooks/useVoiceList';

export function VoiceList() {
  const { voices } = useVoiceList();

  return (
    <div>
      <ul className="space-y-2">
        {voices.length === 0 && <li>ボイスがありません</li>}

        {voices.map((voice) => (
          <li key={voice.id} className="border">
            <div className="flex-1">
              <span className="font-medium">{voice.name}</span>
              <span className="ml-2 text-sm text-gray-500">
                ({voice.gender})
              </span>
            </div>

            <audio controls preload="metadata" className="mt-2 w-full">
              <source src={voice.sampleAudioUrl} />
            </audio>
          </li>
        ))}
      </ul>
    </div>
  );
}
