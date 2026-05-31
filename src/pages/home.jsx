// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { MapPin, Phone, ChevronRight as ChevronRightIcon, Star, Clock, Calendar, MessageCircle, Stethoscope, Navigation, Bell, MoreHorizontal, Circle, Heart, Shield, Baby, Sparkles, Microscope, Users, Award, TrendingUp } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';

// 分类数据 - 使用 lucide 图标
const categories = [{
  id: 1,
  name: '计划生育',
  icon: Shield,
  color: 'bg-rose-50 text-rose-500',
  bgColor: 'bg-rose-500'
}, {
  id: 2,
  name: '私密整形',
  icon: Sparkles,
  color: 'bg-violet-50 text-violet-500',
  bgColor: 'bg-violet-500'
}, {
  id: 3,
  name: '宫颈疾病',
  icon: Microscope,
  color: 'bg-amber-50 text-amber-500',
  bgColor: 'bg-amber-500'
}, {
  id: 4,
  name: '阴道炎症',
  icon: Heart,
  color: 'bg-pink-50 text-pink-500',
  bgColor: 'bg-pink-500'
}, {
  id: 5,
  name: '不孕不育',
  icon: Users,
  color: 'bg-teal-50 text-teal-500',
  bgColor: 'bg-teal-500'
}, {
  id: 6,
  name: '产科产检',
  icon: Baby,
  color: 'bg-sky-50 text-sky-500',
  bgColor: 'bg-sky-500'
}];

// 服务数据
const services = [{
  id: 'appointment',
  title: '预约挂号',
  desc: '一键预约 优先就诊',
  icon: Stethoscope,
  bgColor: 'bg-gradient-to-br from-rose-400 to-rose-500',
  cardBg: 'bg-rose-50'
}, {
  id: 'consult',
  title: '在线咨询',
  desc: '一对一咨询 优先就诊',
  icon: MessageCircle,
  bgColor: 'bg-gradient-to-br from-amber-400 to-orange-500',
  cardBg: 'bg-amber-50'
}];
export default function Home(props) {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('home');
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoadingDoctors(true);
        const result = await props.$w.cloud.callDataSource({
          dataSourceName: 'doctor',
          methodName: 'wedaGetRecordsV2',
          params: {
            filter: {
              where: {}
            },
            select: {
              $master: true
            },
            getCount: true,
            pageSize: 10,
            pageNumber: 1
          }
        });
        const records = result?.records || [];
        if (records.length > 0) {
          const formattedDoctors = records.map(doc => ({
            id: doc._id,
            name: doc.name,
            title: doc.title,
            avatar: doc.avatar,
            rating: doc.rating,
            consultations: doc.consultations,
            expertise: doc.expertise
          }));
          setDoctors(formattedDoctors);
        }
      } catch (error) {
        console.error('获取医生数据失败:', error);
        toast({
          title: '数据加载失败',
          description: '无法获取医生推荐数据，请稍后重试'
        });
      } finally {
        setLoadingDoctors(false);
      }
    };
    fetchDoctors();
  }, []);
  const handleAppointment = (doctorName, doctorId) => {
    props.$w.utils.navigateTo?.({
      pageId: 'doctor',
      params: {
        doctorId,
        doctorName
      }
    });
  };
  const handleCategoryClick = (categoryId, categoryName) => {
    props.$w.utils.navigateTo?.({
      pageId: 'gynecological',
      params: {
        categoryId,
        categoryName
      }
    });
  };
  const handleTabChange = tabId => {
    setActiveTab(tabId);
    if (tabId === 'home') return;
    if (tabId === 'appointment') {
      props.$w.utils.navigateTo?.({
        pageId: 'appointment',
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
  const handleServiceClick = service => {
    if (service === 'appointment') {
      props.$w.utils.navigateTo?.({
        pageId: 'appointment',
        params: {}
      });
    } else if (service === 'consult') {
      toast({
        title: '在线咨询',
        description: '正在连接在线医生，请稍候...'
      });
    }
  };
  return <div className="min-h-screen bg-[#F7F5F2] pb-20">
      {/* 顶部导航栏 */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 px-4 py-3 flex items-center justify-between border-b border-gray-100/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-rose-500 rounded-lg flex items-center justify-center">
            <Heart size={16} className="text-white" />
          </div>
          <h1 className="text-lg font-bold text-gray-800">西安大爱妇科医院</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
            <MoreHorizontal size={18} />
          </button>
          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
            <Circle size={18} />
          </button>
        </div>
      </div>

      {/* 医院图片横幅 */}
      <div className="relative w-full h-52 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=400&fit=crop" alt="医院环境" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full">
              <span className="text-xs text-white font-medium">三级甲等</span>
            </div>
            <div className="px-2 py-0.5 bg-rose-500/80 backdrop-blur-sm rounded-full">
              <span className="text-xs text-white font-medium">医保定点</span>
            </div>
          </div>
          <p className="text-white text-sm opacity-90">专业妇科 · 温馨服务 · 守护健康</p>
        </div>
      </div>

      {/* 就诊提示 */}
      <div className="mx-4 -mt-3 relative z-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 bg-rose-50 rounded-full flex items-center justify-center flex-shrink-0">
            <Bell size={16} className="text-rose-500" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-800">就诊提示</span>
              <span className="text-xs text-gray-400">|</span>
              <span className="text-sm text-gray-500 truncate">预约挂号可享优先就诊通道</span>
            </div>
          </div>
          <ChevronRightIcon size={16} className="text-gray-300 flex-shrink-0" />
        </div>
      </div>

      {/* 功能按钮区域 */}
      <div className="p-4 grid grid-cols-2 gap-3">
        {services.map(service => {
        const IconComponent = service.icon;
        return <div key={service.id} onClick={() => handleServiceClick(service.id)} className={`${service.cardBg} rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:shadow-lg transition-all duration-300 active:scale-[0.98]`}>
              <div className={`w-12 h-12 ${service.bgColor} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                <IconComponent size={24} className="text-white" />
              </div>
              <div>
                <div className="text-base font-bold text-gray-800">{service.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">{service.desc}</div>
              </div>
            </div>;
      })}
      </div>

      {/* 妇科中心 */}
      <div className="mx-4 mb-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-rose-400 to-rose-500 rounded-full" />
              <h2 className="text-lg font-bold text-gray-800">妇科中心</h2>
            </div>
            <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-rose-500 transition-colors">
              全部服务
              <ChevronRightIcon size={14} />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-y-5 gap-x-4">
            {categories.map(category => {
            const IconComponent = category.icon;
            return <div key={category.id} onClick={() => handleCategoryClick(category.id, category.name)} className="flex flex-col items-center gap-2.5 cursor-pointer group">
                  <div className={`w-14 h-14 ${category.color} rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md`}>
                    <IconComponent size={24} />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">{category.name}</span>
                </div>;
          })}
          </div>
        </div>
      </div>

      {/* 医生推荐 */}
      <div className="mx-4 mb-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-rose-400 to-rose-500 rounded-full" />
              <h2 className="text-lg font-bold text-gray-800">医生推荐</h2>
            </div>
            <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-rose-500 transition-colors">
              更多医生
              <ChevronRightIcon size={14} />
            </button>
          </div>

          <div className="space-y-4">
            {loadingDoctors && <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
              </div>}
            {!loadingDoctors && doctors.length === 0 && <div className="text-center py-12">
                <Stethoscope size={40} className="text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-400">暂无医生数据</p>
              </div>}
            {!loadingDoctors && doctors.length > 0 && doctors.map(doctor => <div key={doctor.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
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
                        <span>西安大爱妇科医院</span>
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
                  <button onClick={() => handleAppointment(doctor.name, doctor.id)} className="px-5 py-2 bg-gradient-to-r from-rose-400 to-rose-500 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-rose-200 active:scale-95 transition-all duration-300">
                    预约挂号
                  </button>
                </div>
              </div>)}
          </div>
        </div>
      </div>

      {/* 底部导航 */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} navigateTo={pageId => props.$w.utils.navigateTo?.({
      pageId,
      params: {}
    })} />
    </div>;
}