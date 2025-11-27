import type { Page, BreadcrumbItem } from "../types/page";

export const getBreadcrumbs = (
  startPage: Page | null,
  allPages: Record<string, Page>
): BreadcrumbItem[] => {
  if (!startPage) return [];

  const path: BreadcrumbItem[] = [];
  let current: Page | null | undefined = startPage;

  while (current) {
    // In [Root, Parent, Current] order- shift at front
    path.unshift({
      id: current.id,
      title: current.title || "제목 없는 페이지",
    });

    // Move to parent page
    if (current.parentId) {
      current = allPages[current.parentId];
    } else {
      current = null; // Root
    }
  }

  return path;
};
