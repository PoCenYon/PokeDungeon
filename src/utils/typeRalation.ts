export function calculateTypeEffectiveness(moveType: string, targetTypes: string[]): number {
  // 타입 상성 표 정의
  const typeChart: Record<string, Record<string, number>> = {
    불: { 풀: (1.4), 얼음: (1.4), 벌레: (1.4), 강철: (1.4), 물: (0.7), 바위: (0.7), 불: (0.7), 드래곤: (0.7) },
    물: { 불: (1.4), 땅: (1.4), 바위: (1.4), 물: (0.7), 풀: (0.7), 드래곤: (0.7) },
    풀: { 물: (1.4), 땅: (1.4), 바위: (1.4), 불: (0.7), 풀: (0.7), 비행: (0.7), 벌레: (0.7), 독: (0.7), 드래곤: (0.7), 강철: (0.7) },
    전기: { 물: (1.4), 비행: (1.4), 풀: (0.7), 전기: (0.7), 드래곤: (0.7), 땅: (0.5) },
    얼음: { 풀: (1.4), 땅: (1.4), 비행: (1.4), 드래곤: (1.4), 불: (0.7), 물: (0.7), 강철: (0.7), 얼음: (0.7) },
    격투: { 얼음: (1.4), 바위: (1.4), 악: (1.4), 노말: (1.4), 강철: (1.4), 벌레: (0.7), 독: (0.7), 비행: (0.7), 에스퍼: (0.7), 페어리: (0.7), 고스트: (0.5) },
    독: { 풀: (1.4), 페어리: (1.4), 독: (0.7), 땅: (0.7), 바위: (0.7), 고스트: (0.7), 강철: (0.5) },
    땅: { 불: (1.4), 전기: (1.4), 독: (1.4), 바위: (1.4), 강철: (1.4), 풀: (0.7), 벌레: (0.7), 비행: (0.5) },
    비행: { 풀: (1.4), 격투: (1.4), 벌레: (1.4), 전기: (0.7), 바위: (0.7), 강철: (0.7) },
    에스퍼: { 격투: (1.4), 독: (1.4), 에스퍼: (0.7), 악: (0.7), 강철: (0.7) },
    벌레: { 풀: (1.4), 에스퍼: (1.4), 악: (1.4), 불: (0.7), 격투: (0.7), 독: (0.7), 비행: (0.7), 고스트: (0.7), 강철: (0.7), 페어리: (0.7) },
    바위: { 불: (1.4), 얼음: (1.4), 비행: (1.4), 벌레: (1.4), 격투: (0.7), 땅: (0.7), 강철: (0.7) },
    고스트: { 에스퍼: (1.4), 고스트: (1.4), 악: (0.7), 노말: (0.5) },
    드래곤: { 드래곤: (1.4), 강철: (0.7), 페어리: (0.5) },
    악: { 에스퍼: (1.4), 고스트: (1.4), 격투: (0.7), 악: (0.7), 페어리: (0.7) },
    강철: { 얼음: (1.4), 바위: (1.4), 페어리: (1.4), 불: (0.7), 물: (0.7), 전기: (0.7), 강철: (0.7) },
    페어리: { 격투: (1.4), 악: (1.4), 드래곤: (1.4), 불: (0.7), 독: (0.7), 강철: (0.7) },
    노말: { 바위: (0.7), 강철: (0.7), 고스트: (0.5) },
  };

  let damageModifier = 1;

  // 각 대상 타입에 대해 상성 계산
  targetTypes.some((targetType) => {
    const effectiveness = typeChart[moveType]?.[targetType] ?? 1; // 특별한 상성관계 없으면 1

    if (effectiveness === 0.5) {
      // 0.5 상성에 해당하는 경우, 즉 무효일 경우 
      damageModifier = 0.5;
      return true; // 즉시 종료
    }

    damageModifier *= effectiveness; // 0.5이 아닌 경우 기존 방식으로 계산
    return false; // 계속 다음 타입으로 진행
  });

  return damageModifier;
}