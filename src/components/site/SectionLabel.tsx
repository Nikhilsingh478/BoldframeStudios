/** Editorial section label: "01 ——— About us". */
export function SectionLabel({ index, children, dark = false }: { index: string; children: string; dark?: boolean }) {
  return (
    <p className={`bfx-label${dark ? ' bfx-label--dark' : ''}`}>
      <span className="bfx-label-index">{index}</span>
      <span className="bfx-label-rule" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
