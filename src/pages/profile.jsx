// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { MapPin, Phone, Car, Calendar, Clock, ChevronLeft, MoreHorizontal, ClipboardList } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function Profile(props) {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const handleTabChange = tab => {
    setActiveTab(tab);
    if (tab === 'home') {
      props.$w.utils.navigateTo?.({
        pageId: 'home',
        params: {}
      });
    } else if (tab === 'appointment') {
      props.$w.utils.navigateTo?.({
        pageId: 'appointment',
        params: {}
      });
    } else if (tab === 'myAppointments') {
      props.$w.utils.navigateTo?.({
        pageId: 'myAppointments',
        params: {}
      });
    } else if (tab === 'about') {
      props.$w.utils.navigateTo?.({
        pageId: 'about',
        params: {}
      });
    }
  };

  // 跳转到我的预约页面
  const handleGoToMyAppointments = () => {
    props.$w.utils.navigateTo?.({
      pageId: 'myAppointments',
      params: {}
    });
  };
  const handleRoute = () => {
    props.$w.utils.navigateTo?.({
      pageId: 'route',
      params: {}
    });
  };
  const handlePhoneCall = () => {
    toast({
      title: '拨打电话',
      description: '正在连接 16652865395...',
      variant: 'default'
    });
  };
  return <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex justify-between items-center border-b border-gray-100 sticky top-0 z-10">
        <div onClick={() => props.$w.utils.navigateBack?.()} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </div>
        <div className="text-lg font-bold text-gray-800">我的挂号</div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </div>

      {/* 快捷入口卡片 */}
      <div className="bg-white mx-4 mt-4 p-4 rounded-2xl shadow-sm">
        <div className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-rose-500" />
          快捷服务
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={handleGoToMyAppointments} className="flex items-center gap-3 p-4 bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors">
            <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-800">我的预约</div>
              <div className="text-xs text-gray-500">查看预约记录</div>
            </div>
          </button>
          <button onClick={() => props.$w.utils.navigateTo?.({
          pageId: 'appointment',
          params: {}
        })} className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-800">去挂号</div>
              <div className="text-xs text-gray-500">预约医生</div>
            </div>
          </button>
        </div>
      </div>

      {/* 医院信息卡片 */}
      <div className="bg-white mx-4 mt-4 p-4 rounded-2xl shadow-sm">
        {/* 医院名称和类型 */}
        <div className="flex justify-between items-start mb-3">
          <div className="text-xl font-bold text-gray-800">西安大爱妇科医院</div>
          <div className="bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mr-1.5"></span>
            专科医院
          </div>
        </div>
        
        {/* 医院地址 */}
        <div className="flex items-start mb-4">
          <MapPin className="w-5 h-5 text-rose-500 mr-2 flex-shrink-0 mt-0.5" />
          <div className="text-gray-700 text-sm leading-relaxed">
            潍坊市奎文区健康东街14370号金宇国际商务广场商务楼
          </div>
        </div>
        
        {/* 操作按钮 */}
        <div className="flex gap-3">
          <button onClick={handleRoute} className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <Car className="w-4 h-4" />
            <span className="font-medium">来院路线</span>
          </button>
          <button onClick={handlePhoneCall} className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <Phone className="w-4 h-4" />
            <span className="font-medium">电话咨询</span>
          </button>
        </div>
      </div>

      {/* 预约注意事项 */}
      <div className="bg-white mx-4 mt-4 p-5 rounded-2xl shadow-sm">
        <div className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-rose-500" />
          预约注意事项
        </div>
        <div className="border-l-2 border-rose-400 pl-4 space-y-3">
          <div className="text-gray-800 font-medium">
            【网上预约挂号，优先就诊。】
          </div>
          <div className="text-gray-600 text-sm leading-relaxed">
            1、准时到达：按预约时间提前15-30分钟到医院取号、报到。
          </div>
          <div className="text-gray-600 text-sm leading-relaxed">
            2、就诊时：清楚告诉医生你的症状、正在吃的所有药、过敏史。
          </div>
          <div className="text-gray-600 text-sm leading-relaxed">
            3、听懂医嘱：认真听医生说的诊断、用药方法、复查时间，不明白马上问。
          </div>
        </div>
      </div>

      {/* 暂无挂号信息 */}
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Calendar className="w-10 h-10 text-gray-300" />
        </div>
        <div className="text-gray-400 text-base">暂无挂号信息</div>
        <div className="text-gray-300 text-sm mt-1">快去预约挂号吧</div>
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab="profile" onTabChange={handleTabChange} navigateTo={pageId => props.$w.utils.navigateTo?.({
      pageId,
      params: {}
    })} />
    </div>;
}