import { atomWithStorage } from 'jotai/utils';

/**
 * 侧边栏是否折叠
 */
export const sidebarCollapsedAtom = atomWithStorage('sidebarCollapsed', false);
