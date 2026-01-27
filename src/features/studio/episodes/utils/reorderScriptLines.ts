/**
 * 配列内の要素を1つ上に移動した新しい ID 配列を返す
 *
 * @param lineIds - 現在の行 ID の配列
 * @param targetId - 移動する行の ID
 * @returns 並び替え後の行 ID の配列（移動不可の場合は null）
 */
export function moveLineUp(
  lineIds: string[],
  targetId: string,
): string[] | null {
  const index = lineIds.indexOf(targetId);
  if (index <= 0) {
    return null;
  }

  const newLineIds = [...lineIds];
  [newLineIds[index - 1], newLineIds[index]] = [
    newLineIds[index],
    newLineIds[index - 1],
  ];

  return newLineIds;
}

/**
 * 配列内の要素を1つ下に移動した新しい ID 配列を返す
 *
 * @param lineIds - 現在の行 ID の配列
 * @param targetId - 移動する行の ID
 * @returns 並び替え後の行 ID の配列（移動不可の場合は null）
 */
export function moveLineDown(
  lineIds: string[],
  targetId: string,
): string[] | null {
  const index = lineIds.indexOf(targetId);
  if (index < 0 || index >= lineIds.length - 1) {
    return null;
  }

  const newLineIds = [...lineIds];
  [newLineIds[index], newLineIds[index + 1]] = [
    newLineIds[index + 1],
    newLineIds[index],
  ];

  return newLineIds;
}
