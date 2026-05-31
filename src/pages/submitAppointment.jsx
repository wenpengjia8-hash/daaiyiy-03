// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ChevronLeft, User, Phone, FileText, Clock, Calendar, Check, MoreHorizontal, Circle } from 'lucide-react';

export default function SubmitAppointment(props) {
  const params = props.$w?.page?.dataset?.params || {};
  const [formData, setFormData] = useState({
    doctorName: params.doctorName || '李芳',
    serviceName: params.serviceName || '',
    department: params.department || '',
    date: params.date || '2026-05-21',
    timeSlot: params.timeSlot || '上午',
    patientName: '',
    phone: params.phone || '13991806920',
    symptoms: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    toast
  } = useToast();
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleTimeSlotSelect = slot => {
    setFormData(prev => ({
      ...prev,
      timeSlot: slot
    }));
  };
  const isFormValid = formData.patientName.trim() !== '' && formData.symptoms.trim() !== '';
  const handleSubmit = async () => {
    if (!isFormValid) {
      toast({
        title: '请填写完整信息',
        description: '请填写姓名和症状描述',
        variant: 'destructive'
      });
      return;
    }
    setIsSubmitting(true);
    try {
      // 调用数据模型创建预约记录
      const result = await props.$w.cloud.callDataSource({
        dataSourceName: 'appointment',
        methodName: 'wedaCreateV2',
        params: {
          data: {
            patientName: formData.patientName,
            phone: formData.phone,
            doctorName: formData.doctorName,
            serviceName: formData.serviceName,
            department: formData.department,
            appointmentDate: formData.date,
            timeSlot: formData.timeSlot,
            symptoms: formData.symptoms,
            status: 'pending'
          }
        }
      });
      console.log('预约创建成功:', result);
      toast({
        title: '提交成功',
        description: `已成功预约${formData.doctorName}医生，${formData.date} ${formData.timeSlot}`,
        variant: 'default'
      });
      setTimeout(() => {
        props.$w.utils.navigateBack?.();
      }, 1500);
    } catch (error) {
      console.error('预约创建失败:', error);
      toast({
        title: '提交失败',
        description: error.message || '请稍后重试',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="min-h-screen bg-gray-50">
      {/* 页面标题栏 */}
      <div className="bg-white px-4 py-3 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-2">
          <button onClick={() => props.$w.utils.navigateBack?.()} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <ChevronLeft size={18} className="text-gray-600" />
          </button>
          <div className="text-lg font-bold text-gray-800">提交挂号</div>
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

      {/* 主内容区域 */}
      <div className="pb-8">
        {/* 预约医生/科室 */}
        <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center">
            <User className="w-5 h-5 text-gray-400 mr-3" />
            <span className="text-base text-gray-800">{formData.serviceName ? '预约项目' : '预约医生'}</span>
          </div>
          <div className="flex items-center">
            <span className="text-base text-gray-600 mr-2">{formData.serviceName || formData.doctorName}</span>
            <span className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-full">已选择</span>
          </div>
        </div>

        {/* 预约日期 */}
        <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-gray-400 mr-3" />
            <span className="text-base text-gray-800">预约日期</span>
          </div>
          <span className="text-base text-gray-600">{formData.date}</span>
        </div>

        {/* 预约时间段 */}
        <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-gray-400 mr-3" />
            <span className="text-base text-gray-800">预约时间段</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => handleTimeSlotSelect('上午')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${formData.timeSlot === '上午' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
              上午
            </button>
            <button onClick={() => handleTimeSlotSelect('下午')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${formData.timeSlot === '下午' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
              下午
            </button>
          </div>
        </div>

        {/* 姓名 */}
        <div className="bg-white px-4 py-4 flex items-center border-b border-gray-100">
          <User className="w-5 h-5 text-gray-400 mr-3" />
          <span className="text-base text-gray-800 w-20 flex-shrink-0">姓名</span>
          <input type="text" value={formData.patientName} onChange={e => handleInputChange('patientName', e.target.value)} placeholder="请输入姓名" className="flex-1 text-base text-gray-600 outline-none placeholder:text-gray-300" />
        </div>

        {/* 联系电话 */}
        <div className="bg-white px-4 py-4 flex items-center border-b border-gray-100">
          <Phone className="w-5 h-5 text-gray-400 mr-3" />
          <span className="text-base text-gray-800 w-20 flex-shrink-0">联系电话</span>
          <span className="text-base text-gray-600">{formData.phone}</span>
        </div>

        {/* 症状描述 */}
        <div className="bg-white px-4 py-4">
          <div className="flex items-start mb-3">
            <FileText className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
            <span className="text-base text-gray-800">症状描述</span>
          </div>
          <textarea value={formData.symptoms} onChange={e => handleInputChange('symptoms', e.target.value)} placeholder="请输入" rows={4} className="w-full px-3 py-3 text-base text-gray-600 bg-gray-50 rounded-lg outline-none resize-none placeholder:text-gray-300" />
        </div>
      </div>

      {/* 提交按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white px-5 py-4 pb-8">
        <button onClick={handleSubmit} disabled={!isFormValid || isSubmitting} className={`w-full py-3 rounded-full text-lg font-medium text-center transition-colors ${isFormValid ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-300 text-white cursor-not-allowed'}`}>
          {isFormValid ? isSubmitting ? '提交中...' : '提交预约' : '请填写完整信息'}
        </button>
      </div>
    </div>;
}