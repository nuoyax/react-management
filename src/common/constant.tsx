import React from 'react';
import ArchiveIcon from '@mui/icons-material/Archive';
import ReportIcon from '@mui/icons-material/Assessment';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import DescriptionIcon from '@mui/icons-material/Description';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';

import { Construction, Group, Settings, Token, Tab, Videocam, Topic } from '@mui/icons-material';
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
  // { key: 'threeBuild', text: '三维场景重建', icon: <Construction />, path: '/threeBuild' },
  // {
  //   key: 'visionMixin',
  //   text: '视觉融合',
  //   icon: <Visibility />,
  //   children: [{ key: 'visionMixin-1', text: '视觉融合', icon: <Visibility />, path: '/visionMixin/page1' }],
  // },
  {
    key: 'dataAnalysis',
    text: '数据分析',
    icon: <Token />,
    children: [{ key: 'dataAnalysis-1', text: '数据列表', icon: <Token />, path: '/dataAnalysis/page1' }],
  },
  {
    key: 'realTime',
    text: '实时监控',
    icon: <Videocam />,
    children: [{ key: 'realTime-1', text: '数字孪生', icon: <Videocam />, path: '/realTime/page1' }],
  },
  {
    key: 'trainSupport',
    text: '培训支持',
    icon: <Topic />,
    children: [{ key: 'trainSupport-1', text: '培训列表', icon: <Topic />, path: '/trainSupport/page1' }],
  },
  // { key: 'pokemon', text: '宝可梦', icon: <CatchingPokemonIcon />, path: '/pokemon' },
  // { key: 'top-progress-bar', text: 'TopProgressBar', icon: <CatchingPokemonIcon />, path: '/top-progress-bar' },
  {
    key: 'senseManagement',
    text: '场景管理',
    icon: <Tab />,
    children: [{ key: 'senseManagement-1', text: '场景列表', icon: <Tab />, path: '/senseManagement/page1' }],
  },
  // {
  //   key: 'management',
  //   text: '管理',
  //   icon: <PeopleIcon />,
  //   children: [{ key: 'user-list', text: '用户列表', icon: <ListIcon />, path: '/management/users' }],
  // },

  { key: 'userAdmin', text: '用户管理', icon: <Group />, path: '/userAdmin' },
  { key: 'systemConfig', text: '系统配置', icon: <Settings />, path: '/systemConfig' },
  // {
  //   key: 'reports',
  //   text: '数据报告',
  //   icon: <ReportIcon />,
  //   children: [
  //     { key: 'report-daily', text: '每日报告', icon: <DescriptionIcon />, path: '/reports/daily' },
  //     {
  //       key: 'report-archived',
  //       text: '归档报告',
  //       icon: <ArchiveIcon />,
  //       children: [
  //         { key: 'report-2023', text: '2023年报告', icon: <ListIcon />, path: '/reports/archived/2023' },
  //         { key: 'report-2022', text: '2022年报告', icon: <ListIcon />, path: '/reports/archived/2022' },
  //       ],
  //     },
  //   ],
  // },
];
