import React from 'react';
import ArchiveIcon from '@mui/icons-material/Archive';
import ReportIcon from '@mui/icons-material/Assessment';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import DescriptionIcon from '@mui/icons-material/Description';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import PeopleIcon from '@mui/icons-material/People';
import TextFormatIcon from '@mui/icons-material/TextFormat';

export const WIDTH = 240;
export const MIN_WIDTH = 64;

export interface MenuItem {
  key: string;
  text: string;
  icon: React.ReactElement;
  path?: string;
  children?: MenuItem[];
}

export const MENU_ITEMS: MenuItem[] = [
  { key: 'home', text: '首页', icon: <HomeIcon />, path: '/' },
  {
    key: 'form',
    text: '表单',
    icon: <TextFormatIcon />,
    path: '/form',
  },
  { key: 'pokemon', text: '宝可梦', icon: <CatchingPokemonIcon />, path: '/pokemon' },
  { key: 'top-progress-bar', text: 'TopProgressBar', icon: <CatchingPokemonIcon />, path: '/top-progress-bar' },
  {
    key: 'management',
    text: '管理',
    icon: <PeopleIcon />,
    children: [{ key: 'user-list', text: '用户列表', icon: <ListIcon />, path: '/management/users' }],
  },
  {
    key: 'reports',
    text: '报告',
    icon: <ReportIcon />,
    children: [
      { key: 'report-daily', text: '每日报告', icon: <DescriptionIcon />, path: '/reports/daily' },
      {
        key: 'report-archived',
        text: '归档报告',
        icon: <ArchiveIcon />,
        children: [
          { key: 'report-2023', text: '2023年报告', icon: <ListIcon />, path: '/reports/archived/2023' },
          { key: 'report-2022', text: '2022年报告', icon: <ListIcon />, path: '/reports/archived/2022' },
        ],
      },
    ],
  },
];
