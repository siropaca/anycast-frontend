// Backend のプロンプトも同様に更新すること
export const EMOTION_OPTIONS = [
  { value: '', label: '指定なし' },
  {
    label: '非音声化モード',
    options: [
      { value: 'sigh', label: 'ため息' },
      { value: 'laughing', label: '笑い' },
      { value: 'uhm', label: 'えーと' },
      { value: 'clears throat', label: '咳払い' },
    ],
  },
  {
    label: '修飾モード',
    options: [
      { value: 'sarcasm', label: '皮肉' },
      { value: 'robotic', label: 'ロボット風' },
      { value: 'shouting', label: '叫び' },
      { value: 'whispering', label: 'ささやき' },
      { value: 'speaking slowly', label: 'ゆっくり' },
      { value: 'extremely fast', label: '超高速' },
    ],
  },
  {
    label: '発話モード',
    options: [
      { value: 'scared', label: '怯え' },
      { value: 'curious', label: '好奇心' },
      { value: 'bored', label: '退屈' },
      { value: 'angry', label: '怒り' },
      { value: 'excited', label: '興奮' },
      { value: 'empathetic', label: '共感' },
      { value: 'scornful', label: '軽蔑' },
    ],
  },
] as const;
