/**
 * ジョブの状態を表す型
 *
 * - idle: 初期状態
 * - pending: ジョブ開始待ち
 * - processing: 処理中
 * - completed: 完了
 * - failed: 失敗
 */
export type JobStatus = 'idle' | 'pending' | 'processing' | 'completed' | 'failed';
