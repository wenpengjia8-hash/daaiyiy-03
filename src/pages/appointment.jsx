// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Calendar, Clock, ChevronRight, Star, MoreHorizontal, Circle, Shield, Pill, Lock, Microscope, Baby, MapPin, TrendingUp, Award, ChevronLeft, Stethoscope, ChevronRightIcon } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

import { TabBar } from '@/components/TabBar';

// 科室数据
const departments = [{
  id: 1,
  name: '妇科中心',
  desc: '妇科检查、早孕筛查、白带异常、妇科各类炎症',
  icon: Shield,
  color: 'from-rose-50 to-pink-50',
  iconColor: 'text-rose-500',
  bgIcon: 'bg-rose-100'
}, {
  id: 2,
  name: '人流中心',
  desc: '药物流产、无痛人流',
  icon: Pill,
  color: 'from-purple-50 to-violet-50',
  iconColor: 'text-purple-500',
  bgIcon: 'bg-purple-100'
}, {
  id: 3,
  name: '私密中心',
  desc: '紧缩针、3D生物束带',
  icon: Lock,
  color: 'from-amber-50 to-orange-50',
  iconColor: 'text-amber-500',
  bgIcon: 'bg-amber-100'
}, {
  id: 4,
  name: '微创中心',
  desc: '子宫肌瘤、卵巢囊肿、宫腹腔镜',
  icon: Microscope,
  color: 'from-sky-50 to-blue-50',
  iconColor: 'text-sky-500',
  bgIcon: 'bg-sky-100'
}, {
  id: 5,
  name: '产科中心',
  desc: '四维彩超、NT、产科检查、无痛分娩、产后调理',
  icon: Baby,
  color: 'from-emerald-50 to-teal-50',
  iconColor: 'text-emerald-500',
  bgIcon: 'bg-emerald-100'
}];

// 医生数据
const doctors = [{
  id: 1,
  name: '李芳',
  title: '执业医师',
  hospital: '西安大爱妇科医院',
  expertise: '妇科炎症、不孕不育、月经不调、人工流产、阴道紧缩',
  rating: 9.9,
  consultations: 2895,
  avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face'
}, {
  id: 2,
  name: '马兰',
  title: '执业医师',
  hospital: '西安大爱妇科医院',
  expertise: '处女膜修补术、阴唇整形、会阴提升、宫腔镜检查、人流',
  rating: 9.3,
  consultations: 2618,
  avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop&crop=face'
}, {
  id: 3,
  name: '柴光兰',
  title: '副主任医师',
  hospital: '西安大爱妇科医院',
  expertise: '妊娠期高血压、糖尿病、麻醉分娩阵痛、导乐分娩',
  rating: 9.6,
  consultations: 2406,
  avatar: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=100&h=100&fit=crop&crop=face'
}];

// 生成未来7天的日期
const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push({
      date: date.getDate(),
      weekDay: ['日', '一', '二', '三', '四', '五', '六'][date.getDay()],
      fullDate: date.toLocaleDateString('zh-CN', {
        month: 'short',
        day: 'numeric'
      }),
      isToday: i === 0
    });
  }
  return dates;
};
export default function Appointment(props) {
  const [activeTab, setActiveTab] = useState('department');
  const [selectedDate, setSelectedDate] = useState(0);
  const [hoveredDept, setHoveredDept] = useState(null);
  const dates = generateDates();
  const {
    toast
  } = useToast();
  const handleDepartmentClick = dept => {
    const centerPages = ['妇科中心', '人流中心', '私密中心', '微创中心', '产科中心'];
    if (centerPages.includes(dept.name)) {
      props.$w.utils.navigateTo?.({
        pageId: 'gynecological',
        params: {
          department: dept.name
        }
      });
    } else {
      toast({
        title: '选择科室',
        description: `您选择了 ${dept.name}，请选择预约日期`
      });
      setActiveTab('date');
    }
  };
  const handleDoctorClick = doctor => {
    props.$w.utils.navigateTo?.({
      pageId: 'submitAppointment',
      params: {
        doctorName: doctor.name,
        department: doctor.department,
        date: dates[selectedDate]?.fullDate || new Date().toISOString().split('T')[0]
      }
    });
  };
  const handleTabChange = tabId => {
    if (tabId === 'home') {
      props.$w.utils.navigateTo?.({
        pageId: 'home',
        params: {}
      });
    } else if (tabId === 'about') {
      props.$w.utils.navigateTo?.({
        pageId: 'about',
        params: {}
      });
    } else if (tabId === 'profile') {
      props.$w.utils.navigateTo?.({
        pageId: 'profile',
        params: {}
      });
    }
  };
  const tabs = [{
    key: 'department',
    label: '按科室预约',
    icon: Stethoscope
  }, {
    key: 'date',
    label: '按日期预约',
    icon: Calendar
  }, {
    key: 'doctor',
    label: '按医生预约',
    icon: Award
  }];
  return <div className="min-h-screen bg-[#F7F5F2] pb-24">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-rose-100 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-rose-500 rounded-full flex items-center justify-center shadow-md shadow-rose-200">
            <Stethoscope size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold text-gray-800">预约中心</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-rose-50 transition-colors">
            <MoreHorizontal size={18} className="text-gray-600" />
          </button>
          <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-rose-50 transition-colors">
            <Circle size={14} className="text-gray-600" fill="currentColor" />
          </button>
        </div>
      </div>

      {/* 导航标签 */}
      <div className="bg-white px-4 pt-2 pb-0">
        <div className="flex justify-between">
          {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex-1 py-3 text-sm font-medium transition-all relative flex items-center justify-center gap-1.5 ${isActive ? 'text-rose-500' : 'text-gray-400 hover:text-gray-600'}`}>
                <Icon size={16} className={isActive ? 'text-rose-500' : 'text-gray-400'} />
                {tab.label}
                {isActive && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-rose-400 to-rose-500 rounded-full" />}
              </button>;
        })}
        </div>
      </div>

      {/* 按科室预约 */}
      {activeTab === 'department' && <div className="p-4 space-y-4">
          {/* 头部说明 */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-800">选择科室</h2>
              <p className="text-gray-400 text-sm mt-0.5">选择您需要就诊的科室</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl flex items-center justify-center">
              <Stethoscope size={20} className="text-rose-500" />
            </div>
          </div>

          {/* 科室列表 */}
          <div className="space-y-3">
            {departments.map(dept => {
          const Icon = dept.icon;
          return <button key={dept.id} onClick={() => handleDepartmentClick(dept)} onMouseEnter={() => setHoveredDept(dept.id)} onMouseLeave={() => setHoveredDept(null)} className={`w-full bg-white rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 border ${hoveredDept === dept.id ? 'border-rose-200 shadow-lg shadow-rose-100 translate-y-[-2px]' : 'border-transparent shadow-sm hover:shadow-md'}`}>
                  {/* 图标 */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${hoveredDept === dept.id ? 'scale-110' : ''}`}>
                    <Icon size={22} className={dept.iconColor} />
                  </div>

                  {/* 内容 */}
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-800 text-base">{dept.name}</div>
                    <div className="text-gray-400 text-sm mt-0.5">{dept.desc}</div>
                  </div>

                  {/* 箭头 */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${hoveredDept === dept.id ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <ChevronRight size={16} />
                  </div>
                </button>;
        })}
          </div>

          {/* 温馨提示 */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock size={16} className="text-amber-600" />
              </div>
              <div>
                <div className="font-medium text-amber-800 text-sm">温馨提示</div>
                <div className="text-amber-600 text-xs mt-1 leading-relaxed">
                  请根据您的症状选择相应科室，如有疑问可先进行在线咨询。急诊患者请直接前往急诊科。
                </div>
              </div>
            </div>
          </div>
        </div>}

      {/* 按日期预约 */}
      {activeTab === 'date' && <div className="p-4 space-y-4">
          {/* 头部说明 */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-800">按日期预约</h2>
              <p className="text-gray-400 text-sm mt-0.5">滑动选择日期和医生</p>
            </div>
            <div className="bg-gradient-to-r from-rose-400 to-rose-500 text-white px-3 py-1.5 rounded-xl text-sm font-medium shadow-md shadow-rose-200">
              {dates[selectedDate]?.fullDate}
            </div>
          </div>

          {/* 日期选择器 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
              {dates.map((date, index) => {
            const fullDateStr = (() => {
              const d = new Date();
              d.setDate(d.getDate() + index);
              return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            })();
            const isSelected = selectedDate === index;
            return <button key={index} onClick={() => setSelectedDate(index)} className={`flex-shrink-0 w-[72px] py-3 rounded-xl flex flex-col items-center transition-all duration-300 ${isSelected ? 'bg-gradient-to-br from-rose-400 to-rose-500 text-white shadow-lg shadow-rose-200 scale-105' : 'bg-gray-50 text-gray-600 hover:bg-rose-50'}`}>
                    <span className={`text-xs font-medium ${isSelected ? 'text-rose-100' : 'text-gray-400'}`}>
                      {date.isToday ? '今天' : `周${date.weekDay}`}
                    </span>
                    <span className={`text-xl font-bold mt-1 ${isSelected ? 'text-white' : ''}`}>
                      {date.date}
                    </span>
                    <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-rose-100' : 'text-gray-400'}`}>
                      {fullDateStr}
                    </span>
                  </button>;
          })}
            </div>
          </div>

          {/* 医生列表 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Award size={18} className="text-rose-500" />
                推荐医生
              </h3>
              <span className="text-xs text-gray-400">共 {doctors.length} 位</span>
            </div>

            {doctors.map(doctor => <div key={doctor.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                {/* 头部区域：头像 + 基本信息 */}
                <div className="p-4 pb-3">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <img src={doctor.avatar} alt={doctor.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-gray-50" />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
                          <Award size={12} className="text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-bold text-gray-900">{doctor.name}</span>
                        <span className="px-2 py-0.5 bg-rose-50 text-rose-600 text-xs font-medium rounded-full border border-rose-100">
                          {doctor.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                        <MapPin size={11} />
                        <span>{doctor.hospital}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star size={13} className="text-amber-400 fill-amber-400" />
                          <span className="text-sm font-bold text-rose-500">{doctor.rating}</span>
                          <span className="text-xs text-gray-400">分</span>
                        </div>
                        <div className="w-px h-3 bg-gray-200" />
                        <div className="text-xs text-gray-500">
                          已咨询 <span className="font-semibold text-gray-700">{doctor.consultations}</span> 次
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 擅长领域 */}
                <div className="px-4 pb-3">
                  <div className="bg-[#FAFAF8] rounded-xl p-3 border border-gray-50">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <TrendingUp size={12} className="text-rose-400" />
                      <span className="text-xs text-gray-400 font-medium">擅长领域</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                      {doctor.expertise}
                    </p>
                  </div>
                </div>

                {/* 底部操作栏 */}
                <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock size={12} />
                    <span>可预约时段充足</span>
                  </div>
                  <button onClick={() => handleDoctorClick(doctor)} className="px-5 py-2 bg-gradient-to-r from-rose-400 to-rose-500 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-rose-200 active:scale-95 transition-all duration-300">
                    预约挂号
                  </button>
                </div>
              </div>)}
          </div>
        </div>}

      {/* 按医生预约 */}
      {activeTab === 'doctor' && <div className="p-4 space-y-4">
          {/* 医生列表容器 */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-gradient-to-b from-rose-400 to-rose-500 rounded-full" />
                <h2 className="text-lg font-bold text-gray-800">按医生预约</h2>
              </div>
              <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-rose-500 transition-colors">
                更多医生
                <ChevronRightIcon size={14} />
              </button>
            </div>

            <div className="space-y-4">
              {doctors.map(doctor => <div key={doctor.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                  {/* 头部区域：头像 + 基本信息 */}
                  <div className="p-4 pb-3">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <img src={doctor.avatar} alt={doctor.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-gray-50" />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
                            <Award size={12} className="text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg font-bold text-gray-900">{doctor.name}</span>
                          <span className="px-2 py-0.5 bg-rose-50 text-rose-600 text-xs font-medium rounded-full border border-rose-100">
                            {doctor.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                          <MapPin size={11} />
                          <span>{doctor.hospital}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Star size={13} className="text-amber-400 fill-amber-400" />
                            <span className="text-sm font-bold text-rose-500">{doctor.rating}</span>
                            <span className="text-xs text-gray-400">分</span>
                          </div>
                          <div className="w-px h-3 bg-gray-200" />
                          <div className="text-xs text-gray-500">
                            已咨询 <span className="font-semibold text-gray-700">{doctor.consultations}</span> 次
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 擅长领域 */}
                  <div className="px-4 pb-3">
                    <div className="bg-[#FAFAF8] rounded-xl p-3 border border-gray-50">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <TrendingUp size={12} className="text-rose-400" />
                        <span className="text-xs text-gray-400 font-medium">擅长领域</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                        {doctor.expertise}
                      </p>
                    </div>
                  </div>

                  {/* 底部操作栏 */}
                  <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Clock size={12} />
                      <span>可预约时段充足</span>
                    </div>
                    <button onClick={() => handleDoctorClick(doctor)} className="px-5 py-2 bg-gradient-to-r from-rose-400 to-rose-500 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-rose-200 active:scale-95 transition-all duration-300">
                      预约挂号
                    </button>
                  </div>
                </div>)}
            </div>
          </div>
        </div>}

      {/* 底部导航栏 */}
      <TabBar activeTab="appointment" onTabChange={handleTabChange} navigateTo={pageId => props.$w.utils.navigateTo?.({
      pageId,
      params: {}
    })} />
    </div>;
}