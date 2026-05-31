// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { ArrowLeft, MoreHorizontal, Minus, Circle, Search, Stethoscope, Baby, NotesMedical, Heartbeat, User, Clock, Check } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

const departments = [{
  id: 1,
  name: '妇科中心',
  icon: Stethoscope,
  active: true
}, {
  id: 2,
  name: '人流中心',
  icon: Baby,
  active: false
}, {
  id: 3,
  name: '私密中心',
  icon: User,
  active: false
}, {
  id: 4,
  name: '微创中心',
  icon: Search,
  active: false
}, {
  id: 5,
  name: '产科中心',
  icon: Heartbeat,
  active: false
}];
const departmentServices = {
  1: [{
    id: 1,
    name: '妇科检查',
    icon: Stethoscope,
    description: '常规妇科检查、阴道镜检查'
  }, {
    id: 2,
    name: '早孕筛查',
    icon: Baby,
    description: '血HCG、B超早孕检测'
  }, {
    id: 3,
    name: '白带异常',
    icon: NotesMedical,
    description: '白带常规、细菌培养检查'
  }, {
    id: 4,
    name: '妇科各类炎症',
    icon: Heartbeat,
    description: '阴道炎、盆腔炎、宫颈炎'
  }, {
    id: 5,
    name: '月经不调',
    icon: Clock,
    description: '内分泌检查、激素治疗'
  }, {
    id: 6,
    name: '子宫肌瘤',
    icon: Stethoscope,
    description: 'B超检查、手术治疗'
  }],
  2: [{
    id: 1,
    name: '人工流产',
    icon: Baby,
    description: '超导可视人流、无痛人流'
  }, {
    id: 2,
    name: '药物流产',
    icon: NotesMedical,
    description: '药物流产、复查'
  }, {
    id: 3,
    name: '引产手术',
    icon: Heartbeat,
    description: '中期引产、晚期引产'
  }, {
    id: 4,
    name: '人流复查',
    icon: Search,
    description: 'B超复查、妇科检查'
  }],
  3: [{
    id: 1,
    name: '处女膜修复',
    icon: Stethoscope,
    description: '处女膜修补、整形'
  }, {
    id: 2,
    name: '阴道紧缩',
    icon: User,
    description: '阴道紧缩术、私密整形'
  }, {
    id: 3,
    name: '阴唇整形',
    icon: Baby,
    description: '阴唇缩小、阴唇漂红'
  }, {
    id: 4,
    name: '私密护理',
    icon: Heartbeat,
    description: '私密SPA、激光护理'
  }],
  4: [{
    id: 1,
    name: '宫腔镜手术',
    icon: Stethoscope,
    description: '宫腔镜检查、手术'
  }, {
    id: 2,
    name: '腹腔镜手术',
    icon: Search,
    description: '腹腔镜下微创手术'
  }, {
    id: 3,
    name: '宫外孕手术',
    icon: Heartbeat,
    description: '腹腔镜宫外孕治疗'
  }, {
    id: 4,
    name: '卵巢囊肿手术',
    icon: Baby,
    description: '微创囊肿剔除术'
  }],
  5: [{
    id: 1,
    name: '产前检查',
    icon: Stethoscope,
    description: '孕期常规检查、胎心监护'
  }, {
    id: 2,
    name: '分娩服务',
    icon: Baby,
    description: '顺产、剖宫产、无痛分娩'
  }, {
    id: 3,
    name: '产后康复',
    icon: Heartbeat,
    description: '产后盆底修复、子宫复旧'
  }, {
    id: 4,
    name: '月子中心',
    icon: User,
    description: '专业月子护理服务'
  }]
};
export default function Gynecological(props) {
  const params = props.$w?.page?.dataset?.params || {};
  const initialDept = params.department || '妇科中心';
  const initialDeptId = departments.find(d => d.name === initialDept)?.id || 1;
  const [activeDept, setActiveDept] = useState(initialDeptId);
  const [selectedService, setSelectedService] = useState(null);
  const {
    toast
  } = useToast();
  const handleDeptClick = deptId => {
    setActiveDept(deptId);
    setSelectedService(null);
    const dept = departments.find(d => d.id === deptId);
    toast({
      title: '切换科室',
      description: `已切换到${dept?.name}`,
      variant: 'default'
    });
  };
  const handleServiceClick = service => {
    setSelectedService(service.id);
    const currentDept = departments.find(d => d.id === activeDept);
    props.$w.utils.navigateTo?.({
      pageId: 'submitAppointment',
      params: {
        doctorName: currentDept?.name || '妇科中心',
        department: currentDept?.name,
        serviceName: service.name,
        date: new Date().toISOString().split('T')[0],
        timeSlot: '上午'
      }
    });
  };
  const handleBack = () => {
    props.$w.utils.navigateBack?.();
  };
  return <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 顶部操作栏 */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={handleBack} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <ArrowLeft size={18} className="text-gray-600" />
          </button>
          <h2 className="text-lg font-bold text-gray-800">{departments.find(d => d.id === activeDept)?.name || '科室预约'}</h2>
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

      <div className="flex flex-1 overflow-hidden">
        {/* 左侧导航栏 */}
        <div className="w-24 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-3 border-b border-gray-200">
            <h1 className="text-sm font-bold text-gray-800 text-center">科室预约</h1>
          </div>
          <nav className="flex-1 overflow-y-auto py-2">
            {departments.map(dept => {
            const Icon = dept.icon;
            const isActive = activeDept === dept.id;
            return <div key={dept.id} onClick={() => handleDeptClick(dept.id)} className={`px-2 py-3 cursor-pointer flex flex-col items-center transition-all ${isActive ? 'bg-pink-50 border-l-4 border-pink-500' : 'hover:bg-gray-50'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isActive ? 'bg-pink-500' : 'bg-gray-100'}`}>
                    <Icon size={18} className={isActive ? 'text-white' : 'text-gray-500'} />
                  </div>
                  <span className={`text-xs mt-1.5 ${isActive ? 'text-pink-600 font-medium' : 'text-gray-500'}`}>
                    {dept.name}
                  </span>
                </div>;
          })}
          </nav>
        </div>

        {/* 右侧内容区域 */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {departments.find(d => d.id === activeDept)?.name}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                {activeDept === 1 && '包括妇科检查、早孕筛查、白带异常等'}
                {activeDept === 2 && '包括药物流产、无痛人流等'}
                {activeDept === 3 && '包括紧缩针、3D生物束带等'}
                {activeDept === 4 && '包括子宫肌瘤、卵巢囊肿等'}
                {activeDept === 5 && '包括四维彩超、NT检查、产科检查等'}
              </p>
            </div>
            <div className="space-y-3">
              {(departmentServices[activeDept] || []).map(service => {
              const Icon = service.icon;
              const isSelected = selectedService === service.id;
              return <div key={service.id} onClick={() => handleServiceClick(service)} className={`p-4 border rounded-xl cursor-pointer transition-all ${isSelected ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isSelected ? 'bg-pink-500' : 'bg-gray-100'}`}>
                          <Icon size={18} className={isSelected ? 'text-white' : 'text-gray-500'} />
                        </div>
                        <div className="ml-3">
                          <span className="font-medium text-gray-800 block">{service.name}</span>
                          <span className="text-xs text-gray-400">{service.description}</span>
                        </div>
                      </div>
                      {isSelected && <Check size={20} className="text-pink-500" />}
                    </div>
                  </div>;
            })}
            </div>
          </div>
        </div>
      </div>
    </div>;
}