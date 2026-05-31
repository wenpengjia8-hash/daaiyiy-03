// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { ArrowLeft, MoreHorizontal, Star, Clock, Phone, MapPin, Calendar, Circle } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

const doctorsData = {
  1: {
    id: 1,
    name: '李芳',
    title: '执业医师',
    hospital: '西安大爱妇科医院',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face',
    experience: '从事妇产科的临床工作近30年',
    expertise: '针对妇科常见的妇科炎症、不孕不育、月经不调、人工流产、阴道紧缩、漏尿、子宫垂坠等，熟练掌握各类妇科手术。',
    rating: 9.9,
    consultations: 2895,
    intro: `原潍坊妇幼保健院妇产科专家、西安大爱妇科医院妇科主任。近30年的职业生涯中不仅积累了深厚的医学理论知识，还通过实践操作掌握了先进的诊疗技术，针对妇科常见的妇科炎症、宫颈疾病、子宫肌瘤等,熟练掌握多类妇科手术。擅长处理各种常见的妇科疾病以及复杂的疑难杂症，并且能够根据患者的具体情况制定个性化治疗方案。凭借其出色的专业技能、耐心细致的服务态度以及良好的医患沟通技巧，赢得了广大患者的信任与好评。`
  },
  2: {
    id: 2,
    name: '马兰',
    title: '执业医师',
    hospital: '西安大爱妇科医院',
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face',
    experience: '从事产科临床工作35年',
    expertise: '高危妊娠、产前诊断、产后康复、无痛分娩',
    rating: 9.3,
    consultations: 1856,
    intro: `潍坊市著名产科专家，山东省围产医学会委员。从事产科临床工作35年，对高危妊娠的诊治具有丰富的临床经验，擅长产前诊断、胎儿监护及产后康复指导。多次参加国际妇产科学术交流，在国内外核心期刊发表论文20余篇。`
  },
  3: {
    id: 3,
    name: '刘婷',
    title: '主治医师',
    hospital: '西安大爱妇科医院',
    avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=200&h=200&fit=crop&crop=face',
    experience: '从事妇科微创手术15年',
    expertise: '宫腔镜、腹腔镜、妇科肿瘤、私密整形',
    rating: 9.5,
    consultations: 1243,
    intro: `妇科微创手术专家，擅长宫腔镜、腹腔镜等微创手术，对妇科肿瘤的诊治有深入研究。曾在上海复旦大学附属妇产科医院进修学习，参与完成微创手术数千例，深受患者好评。`
  }
};
export default function Doctor(props) {
  const params = props.$w?.page?.dataset?.params || {};
  const doctorId = parseInt(params.id) || 1;
  const doctor = doctorsData[doctorId] || doctorsData[1];
  const {
    toast
  } = useToast();
  const handleBookAppointment = () => {
    props.$w.utils.navigateTo?.({
      pageId: 'submitAppointment',
      params: {
        doctorName: doctor.name,
        department: doctor.hospital,
        date: new Date().toISOString().split('T')[0],
        timeSlot: '上午'
      }
    });
  };
  const handleBack = () => {
    props.$w.utils.navigateBack?.();
  };
  return <div className="min-h-screen bg-gradient-to-b from-rose-50 to-blue-50">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-2">
          <button onClick={handleBack} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <ArrowLeft size={18} className="text-gray-600" />
          </button>
          <div className="text-lg font-bold text-gray-800">医生简介</div>
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

      {/* 医生信息卡片 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex gap-4">
          <img src={doctor.avatar} alt={doctor.name} className="w-20 h-20 rounded-2xl object-cover flex-shrink-0 shadow-md" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-gray-800">{doctor.name}</h2>
              <span className="px-2 py-0.5 bg-rose-100 text-rose-600 text-xs rounded-full font-medium">
                {doctor.title}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-2">{doctor.hospital}</p>
            <span className="inline-block px-3 py-1 bg-orange-50 text-orange-600 text-xs rounded-lg font-medium">
              {doctor.experience}
            </span>
          </div>
        </div>

        {/* 评分和咨询量 */}
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-semibold text-gray-800">{doctor.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">已咨询 {doctor.consultations} 次</span>
          </div>
        </div>
      </div>

      {/* 专业擅长 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-rose-500 rounded-full"></span>
          专业擅长
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {doctor.expertise}
        </p>
      </div>

      {/* 个人简介 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl p-5 shadow-sm mb-4">
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-rose-500 rounded-full"></span>
          个人简介
        </h3>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
          {doctor.intro}
        </p>
      </div>

      {/* 立即预约按钮 */}
      <div className="px-4 pb-8">
        <button onClick={handleBookAppointment} className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-rose-200 hover:opacity-90 transition-opacity">
          立即预约
        </button>
      </div>

      {/* 底部安全区域 */}
      <div className="h-8 bg-white"></div>
    </div>;
}