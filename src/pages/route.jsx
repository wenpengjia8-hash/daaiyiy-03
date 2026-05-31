// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { ArrowLeft, MoreHorizontal, MapPin, Phone, Navigation, Clock, Ruler, Car, Bus, Circle } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

export default function Route(props) {
  const {
    toast
  } = useToast();
  const [isLocating, setIsLocating] = useState(false);
  const hospitalInfo = {
    name: '西安大爱妇科医院',
    address: '潍坊市奎文区健康东街14370号金宇国际商务广场商务楼',
    phone: '16652865395',
    distance: '962.6公里',
    driveTime: '1926分钟',
    busTime: '3851分钟'
  };
  const handleMyLocation = () => {
    setIsLocating(true);
    toast({
      title: '定位中',
      description: '正在获取您的位置...',
      variant: 'default'
    });
    setTimeout(() => {
      setIsLocating(false);
      toast({
        title: '定位成功',
        description: '已获取您的位置信息',
        variant: 'default'
      });
    }, 1500);
  };
  const handleNavigation = () => {
    toast({
      title: '开始导航',
      description: '正在为您规划路线...',
      variant: 'default'
    });
  };
  const handleCall = () => {
    toast({
      title: '拨打电话',
      description: `正在拨打 ${hospitalInfo.phone}...`,
      variant: 'default'
    });
  };
  return <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-2">
          <button onClick={() => props.$w.utils.navigateBack?.()} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <ArrowLeft size={18} className="text-gray-600" />
          </button>
          <div className="text-lg font-bold text-gray-800">来院路线</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <MoreHorizontal size={18} className="text-gray-600" />
          </div>
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <Circle size={14} className="text-gray-600" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* 地图展示区域 */}
      <div className="relative h-72 bg-gray-200">
        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=400&fit=crop" alt="地图" className="w-full h-full object-cover" />
        {/* 地图上的医院标记 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <MapPin className="w-10 h-10 text-red-500 fill-current" />
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              西安大爱妇科医院
            </div>
          </div>
        </div>
        {/* 距离标记 */}
        <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-lg border-2 border-red-400 text-red-500 font-semibold text-sm">
          {hospitalInfo.distance}
        </div>
        {/* 腾讯地图标志 */}
        <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded text-xs text-gray-600 flex items-center gap-1">
          <span className="w-4 h-4 bg-blue-500 rounded text-white text-[8px] flex items-center justify-center">地</span>
          腾讯地图
        </div>
      </div>

      {/* 功能按钮区域 */}
      <div className="flex justify-around p-4 bg-white">
        <button onClick={handleMyLocation} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl px-4 py-3 flex items-center justify-center gap-2 flex-1 mx-1 shadow-md">
          <MapPin className="w-4 h-4" />
          我的位置
        </button>
        <button onClick={handleNavigation} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl px-4 py-3 flex items-center justify-center gap-2 flex-1 mx-1 shadow-md">
          <Navigation className="w-4 h-4" />
          开始导航
        </button>
        <button onClick={handleCall} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl px-4 py-3 flex items-center justify-center gap-2 flex-1 mx-1 shadow-md">
          <Phone className="w-4 h-4" />
          电话咨询
        </button>
      </div>

      {/* 医院信息卡片 */}
      <div className="mx-4 mt-2 bg-white rounded-2xl p-4 shadow-sm">
        {/* 医院名称和标签 */}
        <div className="flex justify-between items-start mb-3">
          <div className="text-lg font-semibold text-gray-800">{hospitalInfo.name}</div>
          <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            专科医院
          </div>
        </div>
        {/* 医院地址 */}
        <div className="flex items-start gap-2 mb-4">
          <MapPin className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-gray-600 leading-relaxed">{hospitalInfo.address}</span>
        </div>
        {/* 距离信息 */}
        <div className="flex items-center gap-3 py-3 border-t border-gray-100">
          <Ruler className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">距离</span>
          <span className="text-sm font-medium text-gray-800">{hospitalInfo.distance}</span>
        </div>
        {/* 交通时间 */}
        <div className="flex items-center gap-3 py-3 border-t border-gray-100">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">交通时间</span>
          <div className="flex items-center gap-1 text-sm">
            <Car className="w-3 h-3 text-gray-400" />
            <span className="text-gray-800">驾车{hospitalInfo.driveTime}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Bus className="w-3 h-3 text-gray-400" />
            <span className="text-gray-800">公交{hospitalInfo.busTime}</span>
          </div>
        </div>
        {/* 电话号码 */}
        <div className="flex items-center justify-between py-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-400" />
            <span className="text-lg font-semibold text-blue-600">{hospitalInfo.phone}</span>
          </div>
          <button onClick={handleCall} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            点击拨打
          </button>
        </div>
      </div>

      {/* 底部占位 */}
      <div className="h-20"></div>
    </div>;
}