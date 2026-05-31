// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { ChevronLeft, MoreHorizontal, Circle, Phone, MapPin, Clock, Award, Users, Building2, Heart, Navigation } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

import { TabBar } from '@/components/TabBar';
export default function About(props) {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = React.useState('about');
  const [aboutData, setAboutData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  // 从数据模型加载 about 页面内容
  React.useEffect(() => {
    loadAboutData();
  }, []);
  const loadAboutData = async () => {
    try {
      setLoading(true);
      const tcb = await props.$w.cloud.getCloudInstance();
      const db = tcb.database();
      // 优先读取 about_default 记录（新数据模型结构）
      const result = await db.collection('about').where({
        _id: 'about_default'
      }).limit(1).get();
      if (result.data && result.data.length > 0) {
        const data = result.data[0];
        // 强制使用正确的电话和地址，忽略数据模型中的旧值
        setAboutData({
          hospitalName: data.name || '西安雁塔大爱医院',
          pageTitle: '医院介绍',
          hospitalLevels: ['国家二级医院', '医保定点'],
          slogan: data.mission || '患者为中心，全心全意服务',
          coverImage: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&h=400&fit=crop',
          statistics: [{
            icon: 'Award',
            label: '特色科室',
            value: '7+'
          }, {
            icon: 'Users',
            label: '服务人次',
            value: '万+'
          }, {
            icon: 'Heart',
            label: '始创年份',
            value: '2002'
          }],
          description: [data.introduction, data.hardware, data.qualifications, data.service_model].filter(Boolean),
          featuredDepartments: data.departments || ['产科', '妇科', '中医科', '医疗美容科', '腋臭专科', '疤痕科', '皮肤性病科'],
          phone: '029-85269595',
          phoneDescription: '24小时健康顾问热线',
          address: '陕西西安市雁塔区兴善寺东街77号',
          locationDetail: ''
        });
      } else {
        // 如果没有数据，使用默认值
        setAboutData(getDefaultAboutData());
      }
    } catch (error) {
      console.error('加载 about 数据失败:', error);
      toast({
        title: '加载失败',
        description: '无法加载医院介绍内容，请稍后重试',
        variant: 'destructive'
      });
      // 使用默认值
      setAboutData(getDefaultAboutData());
    } finally {
      setLoading(false);
    }
  };

  // 默认数据
  const getDefaultAboutData = () => ({
    hospitalName: '西安雁塔大爱医院',
    pageTitle: '医院介绍',
    hospitalLevels: ['国家二级医院', '医保定点'],
    slogan: '患者为中心，全心全意服务',
    coverImage: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&h=400&fit=crop',
    statistics: [{
      icon: 'Award',
      label: '特色科室',
      value: '7+'
    }, {
      icon: 'Users',
      label: '服务人次',
      value: '万+'
    }, {
      icon: 'Heart',
      label: '始创年份',
      value: '2002'
    }],
    description: ['西安雁塔大爱医院始创于2002年，是一所集医疗、健康服务于一体的国家二级医院，凭借扎实的人才储备、完善的诊疗配置、创新的服务模式与鲜明的公益底色，成为区域内颇具口碑的综合性医疗服务机构。', '医院配备四维彩超仪、多参数心电监护仪、多普勒胎心监测仪、十二导全自动心电图机、全自动血液/尿液分析仪等全流程先进医疗设备，为临床诊断准确性与治疗安全性提供硬核支撑。诊疗科目覆盖全面，既设有产科、妇科、中医科等基础核心科室，也打造了医疗美容科、腋臭专科、疤痕科、皮肤性病科等特色专科，满足多元就医需求。', '依托全国三甲医院专家资源组建核心诊疗团队，是西安交大一附院医联体成员单位与西安市女性健康教育基地，更荣获"三星级党支部"称号，多重资质加持，从根本上保障医疗服务的专业性、权威性与公益性。', '医院始终以"患者为中心，全心全意服务"为核心宗旨，创新性打造"3H"服务模式——融合优质医疗服务（Hospital）、酒店式人文服务（Hotel）、家的亲切温馨（Home）。提供专属导医陪诊服务，医护人员全员践行"微笑服务"，从患者需求出发提供全流程、全方位关怀。', '医院坚守"汇聚点滴，传递大爱"的公益信念，积极开展女性健康普查、社区义诊、贫困患者医疗援助等行动，累计服务群众超万人次。未来，医院将持续以高品质医疗服务为基石，以专业团队与细致关怀为依托，全方位守护百姓健康，为区域医疗健康事业贡献力量。'],
    featuredDepartments: ['产科', '妇科', '中医科', '医疗美容科', '腋臭专科', '疤痕科', '皮肤性病科'],
    phone: '029-85269595',
    phoneDescription: '24小时健康顾问热线',
    address: '陕西西安市雁塔区兴善寺东街77号',
    locationDetail: ''
  });
  const handleTabChange = tabId => {
    setActiveTab(tabId);
    if (tabId === 'home') {
      props.$w.utils.navigateTo?.({
        pageId: 'home',
        params: {}
      });
    } else if (tabId === 'appointment') {
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
  const handleBack = () => {
    props.$w.utils.navigateBack?.();
  };
  const handleCall = () => {
    toast({
      title: '拨打电话',
      description: '正在为您拨打 029-85269595...'
    });
  };
  const handleNavigate = () => {
    toast({
      title: '导航',
      description: '正在为您规划路线...'
    });
  };
  return <div className="min-h-screen bg-[#F7F5F2] pb-20">
      {/* 顶部导航栏 */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 px-4 py-3 flex items-center justify-between border-b border-gray-100/50">
        <div className="flex items-center gap-2">
          <button onClick={handleBack} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
            <ChevronLeft size={18} />
          </button>
          <h1 className="text-lg font-bold text-gray-800">医院介绍</h1>
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

      {/* 加载状态 */}
      {loading && <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
        </div>}

      {/* 医院图片横幅 */}
      {!loading && aboutData && <div className="relative w-full h-56 overflow-hidden">
        <img src={aboutData.coverImage} alt="医院大楼" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-2">
            {aboutData.hospitalLevels?.map((level, index) => <div key={index} className={`px-2.5 py-1 backdrop-blur-sm rounded-full ${index === 0 ? 'bg-white/20' : 'bg-rose-500/80'}`}>
                <span className="text-xs text-white font-medium">{level}</span>
              </div>)}
          </div>
          <h2 className="text-2xl font-bold text-white">{aboutData.hospitalName}</h2>
          <p className="text-white/80 text-sm mt-1">{aboutData.slogan}</p>
        </div>
      </div>}

      {/* 医院基本信息卡片 */}
      {!loading && aboutData && <div className="mx-4 -mt-4 relative z-10">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-rose-500 rounded-xl flex items-center justify-center shadow-md">
              <Building2 size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{aboutData.hospitalName}</h3>
              <p className="text-xs text-gray-400">{aboutData.hospitalLevels?.join(' · ')}单位</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {aboutData.statistics?.map((stat, index) => {
            const IconComponent = {
              Award,
              Users,
              Heart
            }[stat.icon] || Award;
            return <div key={index} className="bg-[#FAFAF8] rounded-xl p-3 text-center">
                  <div className="w-8 h-8 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-1.5">
                    <IconComponent size={16} className="text-rose-500" />
                  </div>
                  <div className="text-sm font-bold text-gray-800">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>;
          })}
          </div>
        </div>
      </div>}

      {/* 医院介绍 */}
      {!loading && aboutData && <div className="mx-4 mt-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-gradient-to-b from-rose-400 to-rose-500 rounded-full" />
            <h2 className="text-lg font-bold text-gray-800">医院介绍</h2>
          </div>

          <div className="space-y-4 text-gray-600 leading-relaxed">
            {aboutData.description?.map((paragraph, index) => <p key={index} className="text-sm">{paragraph}</p>)}
          </div>

          {/* 特色科室标签 */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1.5 mb-3">
              <Clock size={12} className="text-rose-400" />
              <span className="text-xs text-gray-400 font-medium">特色科室</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {aboutData.featuredDepartments?.map((item, index) => <span key={index} className="px-3 py-1.5 bg-rose-50 text-rose-600 text-xs font-medium rounded-full border border-rose-100">
                  {item}
                </span>)}
            </div>
          </div>
        </div>
      </div>}

      {/* 联系方式 */}
      {!loading && aboutData && <div className="mx-4 mt-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-gradient-to-b from-rose-400 to-rose-500 rounded-full" />
            <h2 className="text-lg font-bold text-gray-800">联系我们</h2>
          </div>

          {/* 预约电话 */}
          <div className="flex items-center gap-4 p-4 bg-[#FAFAF8] rounded-xl mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-rose-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
              <Phone size={22} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-400 mb-0.5">预约电话</div>
              <div className="text-lg font-bold text-gray-800">{aboutData.phone}</div>
              <div className="text-xs text-gray-400 mt-0.5">{aboutData.phoneDescription}</div>
            </div>
            <button onClick={handleCall} className="px-4 py-2 bg-gradient-to-r from-rose-400 to-rose-500 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-rose-200 active:scale-95 transition-all duration-300 flex-shrink-0">
              拨打
            </button>
          </div>

          {/* 地址 */}
          <div className="flex items-center gap-4 p-4 bg-[#FAFAF8] rounded-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
              <MapPin size={22} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-400 mb-0.5">医院地址</div>
              <div className="text-base font-bold text-gray-800">{aboutData.address}</div>
              <div className="text-xs text-gray-400 mt-0.5">{aboutData.locationDetail}</div>
            </div>
            <button onClick={handleNavigate} className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-amber-200 active:scale-95 transition-all duration-300 flex-shrink-0">
              <Navigation size={14} className="inline mr-1" />
              导航
            </button>
          </div>
        </div>
      </div>}

      {/* 底部导航栏 */}
      <TabBar activeTab="about" onTabChange={handleTabChange} navigateTo={pageId => props.$w.utils.navigateTo?.({
      pageId,
      params: {}
    })} />
    </div>;
}