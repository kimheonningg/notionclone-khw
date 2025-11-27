import "@blocknote/core/style.css";
import "@blocknote/mantine/style.css";

import type { CSSProperties } from "react";
import { useEffect, useMemo } from "react";

import { filterSuggestionItems } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import {
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";

import type { Page } from "../../types/page";

const editorStyles: Record<string, CSSProperties> = {
  wrap: {
    margin: "0 auto",
  },
};

interface PageEditorProps {
  page: Page;
  onChangeBlocks: (blocks: any) => void;
  onCreateChildPage: () => string; // Make new child page and return id
}

const PageEditor = ({
  page,
  onChangeBlocks,
  onCreateChildPage,
}: PageEditorProps) => {
  const editor = useCreateBlockNote({
    initialContent: page.blocks,
  });

  // Switch content when page changes
  useEffect(() => {
    editor.replaceBlocks(editor.document, page.blocks);
  }, [page.id]);

  // Slash menu items
  const slashItems = useMemo(() => {
    const base = getDefaultReactSlashMenuItems(editor);

    const newPageItem = {
      title: "새 페이지",
      aliases: ["page"],
      group: "Navigation",
      subtext: "현재 페이지의 하위 페이지를 만듭니다",
      onItemClick: () => {
        const newId = onCreateChildPage();
        console.log("created child page", newId);
      },
    };

    return [...base, newPageItem];
  }, [editor, onCreateChildPage]);

  // Editor is changed-> send blocks to the upper component
  useEffect(() => {
    return editor.onChange(() => {
      onChangeBlocks(editor.document);
    });
  }, [editor, onChangeBlocks]);

  return (
    <main style={editorStyles.wrap}>
      <BlockNoteView editor={editor} theme="light" slashMenu={false}>
        <SuggestionMenuController
          triggerCharacter="/"
          getItems={async (query) => filterSuggestionItems(slashItems, query)}
        />
      </BlockNoteView>
    </main>
  );
};

export default PageEditor;
