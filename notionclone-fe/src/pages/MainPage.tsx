import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";

import { KeyboardDoubleArrowRight } from "@mui/icons-material";

import {
  welcomeId,
  NOTION_WELCOME_TITLE,
  NOTION_WELCOME_CONTENT,
} from "../constants/notionWelcome";

import Sidebar from "../ui/sidebar/Sidebar";
import SearchOverlay from "../ui/search/SearchOverlay";

import PageHeader from "../ui/editor/PageHeader";
import PageEditor from "../ui/editor/PageEditor";

const mainPageStyles: Record<string, CSSProperties> = {
  wrap: {
    display: "flex",
    height: "100vh",
  },
  collapsedButton: {
    position: "fixed",
    top: 16,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 8,
    border: "1px solid var(--gray-300)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1100,
  },
  content: {
    flex: 1,
    overflowY: "auto",
    background: "white",
  },
  contentInner: {
    maxWidth: 1200,
    margin: "0 auto",
    paddingBottom: 80,
  },
  placeholder: {
    padding: "80px 80px",
    color: "var(--gray-500)",
  },
  placeholderTitle: {
    margin: "0 0 8px",
    fontSize: 24,
    fontWeight: 600,
    color: "var(--gray-800)",
  },
  placeholderText: {
    margin: 0,
    fontSize: 14,
  },
};

const MainPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  // Sidebar active id
  const [activeId, setActiveId] = useState<string | undefined>(welcomeId);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSidebarItemClick = (id: string) => {
    setActiveId(id);

    if (id === "search") {
      setSearchOpen(true);
    }
  };

  const renderMainContent = (): ReactNode => {
    if (activeId === "welcome") {
      return (
        <>
          <PageHeader title={NOTION_WELCOME_TITLE} icon="👋" />
          <PageEditor
            page={{
              id: welcomeId,
              parentId: null,
              title: NOTION_WELCOME_TITLE,
              blocks: NOTION_WELCOME_CONTENT,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }}
            onChangeBlocks={(blocks) => {
              console.log("updated blocks", blocks);
            }}
            onCreateChildPage={() => {
              const newId = crypto.randomUUID();
              console.log("child page created:", newId);
              return newId;
            }}
          />
        </>
      );
    } else {
      return <> {/* TODO */} </>;
    }
  };

  return (
    <div style={mainPageStyles.wrap}>
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        activeId={activeId}
        onItemClick={handleSidebarItemClick}
      />
      {collapsed && (
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          style={mainPageStyles.collapsedButton}
        >
          <KeyboardDoubleArrowRight fontSize="small" />
        </button>
      )}

      {/* Main Content */}
      <div style={mainPageStyles.content}>
        <div style={mainPageStyles.contentInner}>{renderMainContent()}</div>
      </div>

      {/* SearchOverlay */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
};

export default MainPage;
