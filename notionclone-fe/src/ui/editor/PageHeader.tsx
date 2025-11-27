import type { CSSProperties } from "react";

interface PageHeaderProps {
  title: string;
  icon?: string; // Page emoji / icon
}

const pageHeaderStyles: Record<string, CSSProperties> = {
  wrap: {
    padding: "48px 80px 24px",
  },
  emojiRow: {
    fontSize: 56,
    lineHeight: 1,
    marginBottom: 12,
  },
  actionRow: {
    display: "flex",
    gap: 8,
    marginBottom: 14,
    fontSize: 13,
    color: "var(--gray-500)",
  },
  actionButton: {
    padding: "4px 10px",
    borderRadius: 6,
    border: "1px solid var(--gray-300)",
    background: "var(--gray-100)",
    cursor: "pointer",
  },
  title: {
    fontSize: 40,
    fontWeight: 700,
    lineHeight: 1.2,
    color: "var(--gray-900)",
    margin: "0 0 12px",
  },
};

const PageHeader = ({ title, icon = "👋" }: PageHeaderProps) => {
  return (
    <header style={pageHeaderStyles.wrap}>
      <div style={pageHeaderStyles.emojiRow}>{icon}</div>

      {/* <div style={pageHeaderStyles.actionRow}>
        <button type="button" style={pageHeaderStyles.actionButton}>
          커버 추가
        </button>
        <button type="button" style={pageHeaderStyles.actionButton}>
          댓글 추가
        </button>
      </div> */}

      <h1 style={pageHeaderStyles.title}>{title}</h1>
    </header>
  );
};

export default PageHeader;
