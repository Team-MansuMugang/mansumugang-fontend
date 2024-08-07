import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import HomeIcon from '../assets/svg/home.svg?react';
import HomeOutlineIcon from '../assets/svg/home-outline.svg?react';
import ArticleIcon from '../assets/svg/article.svg?react';
import ArticleOutlineIcon from '../assets/svg/article-outline.svg?react';
import NotificationsIcon from '../assets/svg/notifications.svg?react';
import NotificationsOutlineIcon from '../assets/svg/notifications-outline.svg?react';
import AccountCircleIcon from '../assets/svg/account-circle.svg?react';
import AccountCircleOutlineIcon from '../assets/svg/account-circle-outline.svg?react';

const NavBar = ({ activeTab = '홈' }) => {
  const navigate = useNavigate();
  const tabs = [
    { name: '홈', url: '/home', Icon: HomeOutlineIcon, ActiveIcon: HomeIcon },
    { name: '커뮤니티', url: '/community', Icon: ArticleOutlineIcon, ActiveIcon: ArticleIcon },
    {
      name: '알람',
      url: '/notifications',
      Icon: NotificationsOutlineIcon,
      ActiveIcon: NotificationsIcon,
    },
    {
      name: '계정',
      url: '/profile',
      Icon: AccountCircleOutlineIcon,
      ActiveIcon: AccountCircleIcon,
    },
  ];

  return (
    <div className="nav-bar">
      {tabs.map(({ name, url, ActiveIcon, Icon }) => (
        <div
          key={name}
          className={`nav-item ${activeTab === name ? 'active' : ''}`}
          onClick={() => navigate(url)}
        >
          {activeTab === name ? <ActiveIcon /> : <Icon />}
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
};

export default NavBar;
