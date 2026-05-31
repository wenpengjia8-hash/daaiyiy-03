// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { Calendar, Clock, Stethoscope, User, ChevronLeft, Filter, RefreshCw, FileText, Phone, AlertCircle, CheckCircle2, XCircle, Clock3 } from 'lucide-react';

import { TabBar } from '@/components/TabBar';

// 状态配置
const statusConfig = {
  pending: {
    label: '待确认',
    color: 'bg-amber-100 text-amber-700',
    icon: Clock3
  },
  confirmed: {
    label: '已确认',
    color: 'bg-emerald-100 text-emerald-700',
    icon: CheckCircle2
  },
  completed: {
    label: '已完成',
    color: 'bg-blue-100 text-blue-700',
    icon: CheckCircle2
  },
  cancelled: {
    label: '已取消',
    color: 'bg-red-100 text-red-700',
    icon: XCircle
  }
};

// 状态筛选选项
const statusFilters = [{
  value: 'all',
  label: '全部'
}, {
  value: 'pending',
  label: '待确认'
}, {
  value: 'confirmed',
  label: '已确认'
}, {
  value: 'completed',
  label: '已完成'
}, {
  value: 'cancelled',
  label: '已取消'
}];
export default function MyAppointments(props) {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('myAppointments');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // 获取当前用户信息
  useEffect(() => {
    const user = props.$w?.auth?.currentUser;
    if (user) {
      setCurrentUser(user);
    }
  }, [props.$w?.auth?.currentUser]);

  // 加载预约列表
  const loadAppointments = async () => {
    if (!props.$w?.cloud?.callDataSource) {
      toast({
        title: '提示',
        description: '数据服务未就绪',
        variant: 'default'
      });
      return;
    }
    setLoading(true);
    try {
      const whereConditions = [];

      // 按状态筛选
      if (statusFilter !== 'all') {
        whereConditions.push({
          status: {
            $eq: statusFilter
          }
        });
      }
      const result = await props.$w.cloud.callDataSource({
        dataSourceName: 'appointment',
        methodName: 'wedaGetRecordsV2',
        params: {
          filter: {
            where: whereConditions.length > 0 ? {
              $and: whereConditions
            } : {}
          },
          orderBy: [{
            appointmentDate: 'desc'
          }],
          select: {
            $master: true
          },
          getCount: true,
          pageSize: 50,
          pageNumber: 1
        }
      });
      const records = result?.records || [];
      setAppointments(records);
    } catch (error) {
      console.error('加载预约列表失败:', error);
      toast({
        title: '加载失败',
        description: error.message || '请检查网络连接',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // 初始加载
  useEffect(() => {
    loadAppointments();
  }, [statusFilter]);

  // 处理标签切换
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
    } else if (tab === 'about') {
      props.$w.utils.navigateTo?.({
        pageId: 'about',
        params: {}
      });
    } else if (tab === 'profile') {
      props.$w.utils.navigateTo?.({
        pageId: 'profile',
        params: {}
      });
    }
  };

  // 格式化日期
  const formatDate = dateStr => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    });
  };

  // 获取状态配置
  const getStatusConfig = status => {
    return statusConfig[status] || statusConfig.pending;
  };

  // 渲染预约卡片
  const renderAppointmentCard = appointment => {
    const status = getStatusConfig(appointment.status);
    const StatusIcon = status.icon;
    return <div key={appointment._id} className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100">
        {/* 头部：状态和日期 */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${status.color}`}>
              <StatusIcon size={14} />
              {status.label}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {formatDate(appointment.appointmentDate)}
          </div>
        </div>

        {/* 预约信息 */}
        <div className="space-y-3">
          {/* 科室 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center flex-shrink-0">
              <Stethoscope className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <div className="text-xs text-gray-500">预约科室</div>
              <div className="text-gray-800 font-medium">{appointment.department || '-'}</div>
            </div>
          </div>

          {/* 医生 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <div className="text-xs text-gray-500">预约医生</div>
              <div className="text-gray-800 font-medium">{appointment.doctorName || '-'}</div>
            </div>
          </div>

          {/* 时间段 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <div className="text-xs text-gray-500">预约时段</div>
              <div className="text-gray-800 font-medium">{appointment.timeSlot || '-'}</div>
            </div>
          </div>

          {/* 项目 */}
          {appointment.serviceName && <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <div className="text-xs text-gray-500">预约项目</div>
                <div className="text-gray-800 font-medium">{appointment.serviceName}</div>
              </div>
            </div>}
        </div>

        {/* 分隔线 */}
        <div className="border-t border-gray-100 my-4"></div>

        {/* 底部信息 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Phone size={14} />
            <span>{appointment.phone || '-'}</span>
          </div>
          <div className="text-xs text-gray-400">
            预约人: {appointment.patientName || '-'}
          </div>
        </div>

        {/* 症状描述 */}
        {appointment.symptoms && <div className="mt-4 p-3 bg-gray-50 rounded-xl">
            <div className="text-xs text-gray-500 mb-1">症状描述</div>
            <div className="text-sm text-gray-700">{appointment.symptoms}</div>
          </div>}

        {/* 备注 */}
        {appointment.remark && <div className="mt-3 p-3 bg-amber-50 rounded-xl">
            <div className="text-xs text-amber-600 mb-1 flex items-center gap-1">
              <AlertCircle size={12} />
              备注
            </div>
            <div className="text-sm text-amber-700">{appointment.remark}</div>
          </div>}
      </div>;
  };
  return <div className="min-h-screen bg-gray-50 pb-24">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex justify-between items-center border-b border-gray-100 sticky top-0 z-10">
        <div onClick={() => props.$w.utils.navigateBack?.()} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </div>
        <div className="text-lg font-bold text-gray-800">我的预约</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowFilterPanel(!showFilterPanel)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors relative">
            <Filter className="w-5 h-5 text-gray-600" />
            {statusFilter !== 'all' && <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full"></span>}
          </button>
          <button onClick={loadAppointments} disabled={loading} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <RefreshCw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* 筛选面板 */}
      {showFilterPanel && <div className="bg-white px-4 py-4 border-b border-gray-100">
          <div className="text-sm font-medium text-gray-700 mb-3">按状态筛选</div>
          <div className="flex flex-wrap gap-2">
            {statusFilters.map(filter => <button key={filter.value} onClick={() => {
          setStatusFilter(filter.value);
          setShowFilterPanel(false);
        }} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${statusFilter === filter.value ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {filter.label}
              </button>)}
          </div>
        </div>}

      {/* 当前筛选状态 */}
      {statusFilter !== 'all' && <div className="bg-rose-50 px-4 py-2 flex items-center justify-between">
          <div className="text-sm text-rose-700">
            当前筛选: <span className="font-medium">{statusFilters.find(f => f.value === statusFilter)?.label}</span>
          </div>
          <button onClick={() => setStatusFilter('all')} className="text-sm text-rose-600 hover:text-rose-700 font-medium">
            清除筛选
          </button>
        </div>}

      {/* 内容区域 */}
      <div className="px-4 pt-4">
        {loading ?
      // 加载状态
      <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin mb-4"></div>
            <div className="text-gray-500">加载中...</div>
          </div> : appointments.length === 0 ?
      // 空状态
      <div className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-10 h-10 text-gray-300" />
            </div>
            <div className="text-gray-500 text-lg font-medium mb-2">
              {statusFilter !== 'all' ? '该状态下暂无预约' : '暂无预约记录'}
            </div>
            <div className="text-gray-400 text-sm">
              {statusFilter !== 'all' ? '试试其他筛选条件' : '快去预约挂号吧'}
            </div>
            <button onClick={() => props.$w.utils.navigateTo?.({
          pageId: 'appointment',
          params: {}
        })} className="mt-6 px-6 py-3 bg-rose-500 text-white rounded-full font-medium hover:bg-rose-600 transition-colors">
              去预约
            </button>
          </div> :
      // 预约列表
      <>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500">
                共 <span className="font-medium text-gray-800">{appointments.length}</span> 条预约记录
              </div>
            </div>
            {appointments.map(renderAppointmentCard)}
          </>}
      </div>

      {/* 底部导航栏 */}
      <TabBar activeTab="myAppointments" onTabChange={handleTabChange} navigateTo={pageId => props.$w.utils.navigateTo?.({
      pageId,
      params: {}
    })} />
    </div>;
}