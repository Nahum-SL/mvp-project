export function getPriorityScore(meta: {
  impact: number;
  effort: number;
  risk: number;
}) {
  return (
    meta.impact * 0.5 + (100 - meta.effort) * 0.3 + (100 - meta.risk) * 0.2
  );
}
