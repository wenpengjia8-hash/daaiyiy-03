// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Home, Calendar, FileText, User, ClipboardList } from 'lucide-react';

export function TabBar({
  activeTab = 'home',
  onTabChange,
  navigateTo
}) {
  const tabs = [{
    id: 'home',
    label: '首页',
    icon: Home,
    pageId: 'home'
  }, {
    id: 'appointment',
    label: '挂号',
    icon: Calendar,
    pageId: 'appointment'
  }, {
    id: 'myAppointments',
    label: '预约',
    icon: ClipboardList,
    pageId: 'myAppointments'
  }, {
    id: 'about',
    label: '简介',
    icon: FileText,
    pageId: 'about'
  }, {
    id: 'profile',
    label: '我的',
    icon: User,
    pageId: 'profile'
  }];
  const handleTabClick = tab => {
    if (onTabChange) {
      onTabChange(tab.id);
    }
    if (navigateTo && tab.pageId) {
      navigateTo(tab.pageId);
    }
  };
  return <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 px-4 safe-area-bottom">
      {tabs.map(tab => {
      const Icon = tab.icon;
      const isActive = activeTab === tab.id;
      return <button key={tab.id} onClick={() => handleTabClick(tab)} className={`flex flex-col items-center gap-1 min-w-[60px] ${isActive ? 'text-pink-500' : 'text-gray-400'}`}>
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className={`text-xs ${isActive ? 'font-medium' : ''}`}>
              {tab.label}
            </span>
          </button>;
    })}
    </div>;
}