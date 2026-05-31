// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { LayoutDashboard, Users, Calendar, Stethoscope, Settings, BarChart3, ChevronRight, LogOut, Menu, X, Search, Plus, Edit, Trash2, Eye, UserCog, Shield, Clock, Check, Filter, CalendarDays, Building2, Phone, FileText, Award, Image, AlertCircle } from 'lucide-react';

// 模拟数据 - 医生列表
const mockDoctors = [{
  id: '1',
  name: '张医生',
  department: '妇科',
  title: '主任医师',
  avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200',
  status: 'active',
  patients: 128
}, {
  id: '2',
  name: '李医生',
  department: '产科',
  title: '副主任医师',
  avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200',
  status: 'active',
  patients: 96
}, {
  id: '3',
  name: '王医生',
  department: '儿科',
  title: '主治医师',
  avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200',
  status: 'active',
  patients: 84
}, {
  id: '4',
  name: '赵医生',
  department: '妇科',
  title: '主治医师',
  avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=200',
  status: 'inactive',
  patients: 0
}];

// 模拟数据 - 预约列表
const mockAppointments = [{
  id: '1',
  patientName: '王小明',
  phone: '138****1234',
  department: '妇科',
  doctor: '张医生',
  date: '2026-05-27',
  time: '09:00',
  status: 'pending'
}, {
  id: '2',
  patientName: '李小红',
  phone: '139****5678',
  department: '产科',
  doctor: '李医生',
  date: '2026-05-27',
  time: '10:30',
  status: 'confirmed'
}, {
  id: '3',
  patientName: '张小华',
  phone: '137****9012',
  department: '儿科',
  doctor: '王医生',
  date: '2026-05-28',
  time: '14:00',
  status: 'pending'
}, {
  id: '4',
  patientName: '刘小丽',
  phone: '136****3456',
  department: '妇科',
  doctor: '张医生',
  date: '2026-05-26',
  time: '11:00',
  status: 'completed'
}, {
  id: '5',
  patientName: '陈小军',
  phone: '135****7890',
  department: '产科',
  doctor: '李医生',
  date: '2026-05-26',
  time: '15:30',
  status: 'cancelled'
}];

// 模拟数据 - 科室列表
const mockDepartments = [{
  id: '1',
  name: '妇科',
  description: '妇科疾病诊疗',
  doctorCount: 2,
  status: 'active'
}, {
  id: '2',
  name: '产科',
  description: '孕产妇保健与分娩',
  doctorCount: 1,
  status: 'active'
}, {
  id: '3',
  name: '儿科',
  description: '儿童疾病诊疗',
  doctorCount: 1,
  status: 'active'
}, {
  id: '4',
  name: '新生儿科',
  description: '新生儿护理与治疗',
  doctorCount: 0,
  status: 'inactive'
}];

// 模拟数据 - 统计
const mockStats = {
  todayAppointments: 12,
  totalPatients: 456,
  totalDoctors: 4,
  completedRate: 78
};
// 数据概览组件
function DashboardContent({
  stats,
  appointments,
  doctors
}) {
  const statCards = [{
    label: '今日预约',
    value: stats.todayAppointments,
    icon: Calendar,
    color: 'bg-rose-500'
  }, {
    label: '总患者数',
    value: stats.totalPatients,
    icon: Users,
    color: 'bg-blue-500'
  }, {
    label: '医生数量',
    value: stats.totalDoctors,
    icon: Stethoscope,
    color: 'bg-green-500'
  }, {
    label: '完成率',
    value: `${stats.completedRate}%`,
    icon: BarChart3,
    color: 'bg-purple-500'
  }];
  return <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>;
      })}
      </div>

      {/* 最近预约 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">最近预约</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 text-gray-500 text-sm font-medium">患者姓名</th>
                <th className="text-left py-3 px-4 text-gray-500 text-sm font-medium">科室</th>
                <th className="text-left py-3 px-4 text-gray-500 text-sm font-medium">医生</th>
                <th className="text-left py-3 px-4 text-gray-500 text-sm font-medium">预约时间</th>
                <th className="text-left py-3 px-4 text-gray-500 text-sm font-medium">状态</th>
              </tr>
            </thead>
            <tbody>
              {appointments.slice(0, 5).map(apt => <tr key={apt.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">{apt.patientName}</td>
                  <td className="py-3 px-4 text-gray-600">{apt.department}</td>
                  <td className="py-3 px-4 text-gray-600">{apt.doctor}</td>
                  <td className="py-3 px-4 text-gray-600">{apt.date} {apt.time}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : apt.status === 'confirmed' ? 'bg-green-100 text-green-700' : apt.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                      {apt.status === 'pending' ? '待确认' : apt.status === 'confirmed' ? '已确认' : apt.status === 'completed' ? '已完成' : '已取消'}
                    </span>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
}

// 预约管理组件
function AppointmentContent({
  appointments,
  setAppointments,
  searchKeyword,
  setSearchKeyword,
  toast,
  $w
}) {
  const [loading, setLoading] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // 筛选状态
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // 科室列表
  const departmentList = ['妇科', '产科', '儿科', '新生儿科', '内科', '外科'];

  // 状态列表
  const statusList = [{
    value: 'pending',
    label: '待确认',
    color: 'bg-yellow-100 text-yellow-700'
  }, {
    value: 'confirmed',
    label: '已确认',
    color: 'bg-green-100 text-green-700'
  }, {
    value: 'completed',
    label: '已完成',
    color: 'bg-blue-100 text-blue-700'
  }, {
    value: 'cancelled',
    label: '已取消',
    color: 'bg-red-100 text-red-700'
  }];

  // 加载预约列表
  const loadAppointments = async () => {
    if (!$w?.cloud?.callDataSource) {
      return;
    }
    setLoading(true);
    try {
      // 构建查询条件
      const whereConditions = {};

      // 日期范围筛选
      if (dateRange.start || dateRange.end) {
        whereConditions.appointmentDate = {};
        if (dateRange.start) {
          whereConditions.appointmentDate.$gte = new Date(dateRange.start).toISOString();
        }
        if (dateRange.end) {
          whereConditions.appointmentDate.$lte = new Date(dateRange.end + 'T23:59:59').toISOString();
        }
      }

      // 科室筛选
      if (departmentFilter) {
        whereConditions.department = {
          $eq: departmentFilter
        };
      }

      // 状态筛选
      if (statusFilter) {
        whereConditions.status = {
          $eq: statusFilter
        };
      }
      const res = await $w.cloud.callDataSource({
        dataSourceName: 'appointment',
        methodName: 'wedaGetRecordsV2',
        params: {
          filter: {
            where: whereConditions
          },
          select: {
            $master: true
          },
          getCount: true,
          pageSize: 200,
          pageNumber: 1
        }
      });
      const records = res?.records || [];
      const newAppointments = records.map(item => ({
        id: item._id || item.id,
        patientName: item.patientName || '',
        phone: item.phone || '',
        doctor: item.doctorName || '',
        department: item.department || '',
        serviceName: item.serviceName || '',
        date: item.appointmentDate ? new Date(item.appointmentDate).toLocaleDateString('zh-CN') : '',
        time: item.timeSlot || '',
        symptoms: item.symptoms || '',
        status: item.status || 'pending',
        remark: item.remark || ''
      }));
      setAppointments(newAppointments);
    } catch (error) {
      toast({
        title: '加载预约数据失败',
        description: error.message || '请检查网络连接',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // 更新预约状态
  const updateAppointmentStatus = async (id, newStatus) => {
    if (!$w?.cloud?.callDataSource) {
      toast({
        title: '系统错误',
        description: '无法调用数据源',
        variant: 'destructive'
      });
      return;
    }
    try {
      await $w.cloud.callDataSource({
        dataSourceName: 'appointment',
        methodName: 'wedaUpdateV2',
        params: {
          filter: {
            where: {
              _id: {
                $eq: id
              }
            }
          },
          data: {
            status: newStatus
          }
        }
      });
      setAppointments(appointments.map(apt => apt.id === id ? {
        ...apt,
        status: newStatus
      } : apt));
      toast({
        title: '状态已更新',
        description: `预约状态已修改为${newStatus === 'confirmed' ? '已确认' : newStatus === 'completed' ? '已完成' : '已取消'}`
      });
    } catch (error) {
      toast({
        title: '更新失败',
        description: error.message || '请稍后重试',
        variant: 'destructive'
      });
    }
  };

  // 删除预约
  const deleteAppointment = async id => {
    if (!$w?.cloud?.callDataSource) {
      toast({
        title: '系统错误',
        description: '无法调用数据源',
        variant: 'destructive'
      });
      return;
    }
    try {
      await $w.cloud.callDataSource({
        dataSourceName: 'appointment',
        methodName: 'wedaDeleteV2',
        params: {
          filter: {
            where: {
              _id: {
                $eq: id
              }
            }
          }
        }
      });
      setAppointments(appointments.filter(apt => apt.id !== id));
      toast({
        title: '删除成功',
        description: '预约记录已删除'
      });
    } catch (error) {
      toast({
        title: '删除失败',
        description: error.message || '请稍后重试',
        variant: 'destructive'
      });
    }
  };

  // 查看详情
  const handleViewDetail = apt => {
    setSelectedAppointment(apt);
    setShowDetailModal(true);
  };

  // 重置筛选条件
  const resetFilters = () => {
    setDateRange({
      start: '',
      end: ''
    });
    setDepartmentFilter('');
    setStatusFilter('');
    setSearchKeyword('');
  };

  // 应用筛选
  const applyFilters = () => {
    loadAppointments();
  };
  useEffect(() => {
    loadAppointments();
  }, []);

  // 本地搜索过滤（在已加载的数据中搜索）
  const filteredAppointments = appointments.filter(apt => (apt.patientName || '').includes(searchKeyword) || (apt.phone || '').includes(searchKeyword) || (apt.doctor || '').includes(searchKeyword));
  const handleStatusChange = (id, newStatus) => {
    updateAppointmentStatus(id, newStatus);
  };
  const handleDelete = id => {
    if (window.confirm('确定要删除这条预约记录吗？')) {
      deleteAppointment(id);
    }
  };
  return <div className="space-y-6">
      {/* 搜索和筛选栏 */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-4">
        {/* 搜索行 */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="搜索患者姓名、手机号、医生..." value={searchKeyword} onChange={e => setSearchKeyword(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent" />
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${showFilters ? 'bg-rose-100 text-rose-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            <Filter size={18} />
            筛选
            {(dateRange.start || dateRange.end || departmentFilter || statusFilter) && <span className="w-2 h-2 bg-rose-500 rounded-full" />}
          </button>
          <button onClick={loadAppointments} disabled={loading} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2 disabled:opacity-50">
            <Clock size={20} className={loading ? 'animate-spin' : ''} />
            {loading ? '刷新中...' : '刷新'}
          </button>
        </div>

        {/* 筛选面板 */}
        {showFilters && <div className="pt-4 border-t border-gray-100 space-y-4">
            {/* 日期范围 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-2 flex items-center gap-2">
                  <CalendarDays size={16} />
                  开始日期
                </label>
                <input type="date" value={dateRange.start} onChange={e => setDateRange(prev => ({
              ...prev,
              start: e.target.value
            }))} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2 flex items-center gap-2">
                  <CalendarDays size={16} />
                  结束日期
                </label>
                <input type="date" value={dateRange.end} onChange={e => setDateRange(prev => ({
              ...prev,
              end: e.target.value
            }))} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent" />
              </div>
            </div>

            {/* 科室和状态筛选 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-2">预约科室</label>
                <select value={departmentFilter} onChange={e => setDepartmentFilter(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white">
                  <option value="">全部科室</option>
                  {departmentList.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">预约状态</label>
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white">
                  <option value="">全部状态</option>
                  {statusList.map(status => <option key={status.value} value={status.value}>{status.label}</option>)}
                </select>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button onClick={resetFilters} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium">
                重置
              </button>
              <button onClick={applyFilters} className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 font-medium">
                应用筛选
              </button>
            </div>
          </div>}
      </div>

      {/* 加载状态 */}
      {loading && appointments.length === 0 && <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
          <span className="ml-3 text-gray-500">加载预约数据中...</span>
        </div>}

      {/* 预约列表 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-4 px-6 text-gray-500 text-sm font-medium">患者信息</th>
              <th className="text-left py-4 px-6 text-gray-500 text-sm font-medium">科室/医生</th>
              <th className="text-left py-4 px-6 text-gray-500 text-sm font-medium">预约时间</th>
              <th className="text-left py-4 px-6 text-gray-500 text-sm font-medium">状态</th>
              <th className="text-left py-4 px-6 text-gray-500 text-sm font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length === 0 ? <tr>
                <td colSpan={5} className="py-12 text-center text-gray-500">
                  {loading ? '加载中...' : '暂无预约记录'}
                </td>
              </tr> : filteredAppointments.map(apt => <tr key={apt.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div>
                    <p className="font-medium text-gray-800">{apt.patientName}</p>
                    <p className="text-sm text-gray-500">{apt.phone}</p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <p className="text-gray-800">{apt.department}</p>
                    <p className="text-sm text-gray-500">{apt.doctor}</p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <p className="text-gray-800">{apt.date}</p>
                    <p className="text-sm text-gray-500">{apt.time}</p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : apt.status === 'confirmed' ? 'bg-green-100 text-green-700' : apt.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                    {apt.status === 'pending' ? '待确认' : apt.status === 'confirmed' ? '已确认' : apt.status === 'completed' ? '已完成' : '已取消'}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleViewDetail(apt)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="查看详情">
                      <Eye size={18} />
                    </button>
                    {apt.status === 'pending' && <button onClick={() => handleStatusChange(apt.id, 'confirmed')} className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="确认">
                        <Check size={18} />
                      </button>}
                    {apt.status === 'confirmed' && <button onClick={() => handleStatusChange(apt.id, 'completed')} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="完成">
                        <Check size={18} />
                      </button>}
                    <button onClick={() => handleDelete(apt.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="删除">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>

      {/* 详情弹窗 */}
      {showDetailModal && selectedAppointment && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">预约详情</h2>
              <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">患者姓名</label>
                  <p className="font-medium text-gray-800">{selectedAppointment.patientName || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">联系电话</label>
                  <p className="font-medium text-gray-800">{selectedAppointment.phone || '-'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">预约科室</label>
                  <p className="font-medium text-gray-800">{selectedAppointment.department || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">预约医生</label>
                  <p className="font-medium text-gray-800">{selectedAppointment.doctor || '-'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">预约日期</label>
                  <p className="font-medium text-gray-800">{selectedAppointment.date || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">预约时间</label>
                  <p className="font-medium text-gray-800">{selectedAppointment.time || '-'}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">预约项目</label>
                <p className="font-medium text-gray-800">{selectedAppointment.serviceName || '-'}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">症状描述</label>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedAppointment.symptoms || '无'}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">预约状态</label>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${selectedAppointment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : selectedAppointment.status === 'confirmed' ? 'bg-green-100 text-green-700' : selectedAppointment.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                  {selectedAppointment.status === 'pending' ? '待确认' : selectedAppointment.status === 'confirmed' ? '已确认' : selectedAppointment.status === 'completed' ? '已完成' : '已取消'}
                </span>
              </div>
              {selectedAppointment.remark && <div>
                <label className="block text-sm text-gray-500 mb-1">备注</label>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedAppointment.remark}</p>
              </div>}
            </div>
            <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3">
              {selectedAppointment.status === 'pending' && <button onClick={() => {
            updateAppointmentStatus(selectedAppointment.id, 'confirmed');
            setShowDetailModal(false);
          }} className="px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium">
                  确认预约
                </button>}
              {selectedAppointment.status === 'confirmed' && <button onClick={() => {
            updateAppointmentStatus(selectedAppointment.id, 'completed');
            setShowDetailModal(false);
          }} className="px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                  标记完成
                </button>}
              <button onClick={() => setShowDetailModal(false)} className="px-5 py-2.5 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium">
                关闭
              </button>
            </div>
          </div>
        </div>}
    </div>;
}

// 医生管理组件
function DoctorContent({
  doctors,
  setDoctors,
  searchKeyword,
  setSearchKeyword,
  toast,
  $w,
  loadDoctors,
  doctorsLoading
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    avatar: '',
    rating: '',
    consultations: '',
    expertise: ''
  });
  const [editFormData, setEditFormData] = useState({
    name: '',
    title: '',
    avatar: '',
    rating: '',
    consultations: '',
    expertise: ''
  });
  const filteredDoctors = doctors.filter(doc => doc.name.includes(searchKeyword) || doc.department && doc.department.includes(searchKeyword));
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleEditInputChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 打开编辑弹窗
  const handleEdit = doctor => {
    setEditingDoctor(doctor);
    setEditFormData({
      name: doctor.name || '',
      title: doctor.title || '',
      avatar: doctor.avatar || '',
      rating: doctor.rating || '',
      consultations: doctor.consultations || '',
      expertise: doctor.expertise || ''
    });
    setShowEditModal(true);
  };

  // 提交编辑
  const handleEditSubmit = async () => {
    if (!editFormData.name.trim()) {
      toast({
        title: '请填写医生姓名',
        variant: 'destructive'
      });
      return;
    }
    if (!editFormData.title.trim()) {
      toast({
        title: '请填写职称',
        variant: 'destructive'
      });
      return;
    }
    if (!$w?.cloud?.callDataSource) {
      toast({
        title: '系统错误',
        description: '无法调用数据源',
        variant: 'destructive'
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await $w.cloud.callDataSource({
        dataSourceName: 'doctor',
        methodName: 'wedaUpdateV2',
        params: {
          filter: {
            where: {
              _id: {
                $eq: editingDoctor.id
              }
            }
          },
          data: {
            name: editFormData.name.trim(),
            title: editFormData.title.trim(),
            avatar: editFormData.avatar.trim() || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200',
            rating: Number(editFormData.rating) || 0,
            consultations: Number(editFormData.consultations) || 0,
            expertise: editFormData.expertise.trim() || ''
          }
        }
      });

      // 更新本地列表
      setDoctors(doctors.map(doc => doc.id === editingDoctor.id ? {
        ...doc,
        name: editFormData.name.trim(),
        title: editFormData.title.trim(),
        avatar: editFormData.avatar.trim() || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200',
        rating: Number(editFormData.rating) || 0,
        consultations: Number(editFormData.consultations) || 0,
        expertise: editFormData.expertise.trim() || '',
        patients: Number(editFormData.consultations) || 0
      } : doc));
      toast({
        title: '编辑成功',
        description: `医生 "${editFormData.name}" 信息已更新`
      });
      setShowEditModal(false);
      setEditingDoctor(null);
    } catch (error) {
      toast({
        title: '编辑失败',
        description: error.message || '请稍后重试',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast({
        title: '请填写医生姓名',
        variant: 'destructive'
      });
      return;
    }
    if (!formData.title.trim()) {
      toast({
        title: '请填写职称',
        variant: 'destructive'
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'doctor',
        methodName: 'wedaCreateV2',
        params: {
          data: {
            name: formData.name.trim(),
            title: formData.title.trim(),
            avatar: formData.avatar.trim() || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200',
            rating: Number(formData.rating) || 0,
            consultations: Number(formData.consultations) || 0,
            expertise: formData.expertise.trim() || ''
          }
        }
      });

      // 立即将新医生添加到列表（乐观更新）
      const newDoctor = {
        id: result?._id || result?.id || Date.now().toString(),
        name: formData.name.trim(),
        title: formData.title.trim(),
        avatar: formData.avatar.trim() || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200',
        rating: Number(formData.rating) || 0,
        consultations: Number(formData.consultations) || 0,
        expertise: formData.expertise.trim() || '',
        status: 'active',
        patients: Number(formData.consultations) || 0
      };
      setDoctors(prev => [...prev, newDoctor]);
      toast({
        title: '添加成功',
        description: `医生 "${formData.name}" 已添加`
      });

      // 重置表单并关闭弹窗
      setFormData({
        name: '',
        title: '',
        avatar: '',
        rating: '',
        consultations: '',
        expertise: ''
      });
      setShowAddModal(false);

      // 延迟刷新完整列表，给服务器同步时间
      setTimeout(() => {
        if (loadDoctors) {
          loadDoctors();
        }
      }, 800);
    } catch (error) {
      toast({
        title: '添加失败',
        description: error.message || '请稍后重试',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleStatusChange = (id, newStatus) => {
    setDoctors(doctors.map(doc => doc.id === id ? {
      ...doc,
      status: newStatus
    } : doc));
    toast({
      title: '状态已更新',
      description: newStatus === 'active' ? '医生已启用' : '医生已禁用'
    });
  };
  // 删除医生 - 调用数据模型 API
  const handleDelete = async doctor => {
    if (!window.confirm(`确定要删除医生 "${doctor.name}" 吗？此操作不可恢复。`)) {
      return;
    }
    if (!$w?.cloud?.callDataSource) {
      toast({
        title: '系统错误',
        description: '无法调用数据源',
        variant: 'destructive'
      });
      return;
    }
    try {
      await $w.cloud.callDataSource({
        dataSourceName: 'doctor',
        methodName: 'wedaDeleteV2',
        params: {
          filter: {
            where: {
              _id: {
                $eq: doctor.id
              }
            }
          }
        }
      });

      // 更新本地列表
      setDoctors(doctors.filter(doc => doc.id !== doctor.id));
      toast({
        title: '删除成功',
        description: `医生 "${doctor.name}" 已删除`
      });
    } catch (error) {
      toast({
        title: '删除失败',
        description: error.message || '请稍后重试',
        variant: 'destructive'
      });
    }
  };
  return <div className="space-y-6">
      {/* 搜索栏 */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="搜索医生姓名、科室..." value={searchKeyword} onChange={e => setSearchKeyword(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent" />
        </div>
        <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 flex items-center gap-2">
          <Plus size={20} />
          添加医生
        </button>
      </div>

      {/* 医生列表 */}
      {doctorsLoading && doctors.length === 0 && <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
          <span className="ml-3 text-gray-500">加载中...</span>
        </div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doc => <div key={doc.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <img src={doc.avatar} alt={doc.name} className="w-16 h-16 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">{doc.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${doc.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {doc.status === 'active' ? '在职' : '离职'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{doc.department || '妇科'} · {doc.title}</p>
                <p className="text-sm text-rose-600 mt-2">已接诊 {doc.patients || doc.consultations || 0} 人</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
              <button onClick={() => handleEdit(doc)} className="flex-1 px-3 py-2 text-sm text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 flex items-center justify-center gap-1">
                <Edit size={16} />
                编辑
              </button>
              <button onClick={() => handleStatusChange(doc.id, doc.status === 'active' ? 'inactive' : 'active')} className="flex-1 px-3 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-1">
                {doc.status === 'active' ? '禁用' : '启用'}
              </button>
              <button onClick={() => handleDelete(doc)} className="px-3 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100">
                <Trash2 size={16} />
              </button>
            </div>
          </div>)}
      </div>

      {/* 添加医生弹窗 */}
      {showAddModal && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">添加医生</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">医生姓名 <span className="text-red-500">*</span></label>
                <input type="text" value={formData.name} onChange={e => handleInputChange('name', e.target.value)} placeholder="请输入医生姓名" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">职称 <span className="text-red-500">*</span></label>
                <select value={formData.title} onChange={e => handleInputChange('title', e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white">
                  <option value="">请选择职称</option>
                  <option value="主任医师">主任医师</option>
                  <option value="副主任医师">副主任医师</option>
                  <option value="主治医师">主治医师</option>
                  <option value="住院医师">住院医师</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">头像 URL</label>
                <input type="text" value={formData.avatar} onChange={e => handleInputChange('avatar', e.target.value)} placeholder="请输入头像图片地址（可选）" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">评分</label>
                  <input type="number" min="0" max="5" step="0.1" value={formData.rating} onChange={e => handleInputChange('rating', e.target.value)} placeholder="0-5" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">咨询次数</label>
                  <input type="number" min="0" value={formData.consultations} onChange={e => handleInputChange('consultations', e.target.value)} placeholder="0" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">擅长领域</label>
                <textarea value={formData.expertise} onChange={e => handleInputChange('expertise', e.target.value)} placeholder="请输入擅长领域，多个用逗号分隔" rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none" />
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3">
              <button onClick={() => setShowAddModal(false)} className="px-5 py-2.5 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium">
                取消
              </button>
              <button onClick={handleSubmit} disabled={isSubmitting} className="px-5 py-2.5 bg-rose-500 text-white rounded-lg hover:bg-rose-600 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                {isSubmitting ? '提交中...' : '确认添加'}
              </button>
            </div>
          </div>
        </div>}

      {/* 编辑医生弹窗 */}
      {showEditModal && editingDoctor && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">编辑医生</h2>
              <button onClick={() => {
            setShowEditModal(false);
            setEditingDoctor(null);
          }} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">医生姓名 <span className="text-red-500">*</span></label>
                <input type="text" value={editFormData.name} onChange={e => handleEditInputChange('name', e.target.value)} placeholder="请输入医生姓名" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">职称 <span className="text-red-500">*</span></label>
                <select value={editFormData.title} onChange={e => handleEditInputChange('title', e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white">
                  <option value="">请选择职称</option>
                  <option value="主任医师">主任医师</option>
                  <option value="副主任医师">副主任医师</option>
                  <option value="主治医师">主治医师</option>
                  <option value="住院医师">住院医师</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">头像 URL</label>
                <input type="text" value={editFormData.avatar} onChange={e => handleEditInputChange('avatar', e.target.value)} placeholder="请输入头像图片地址（可选）" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">评分</label>
                  <input type="number" min="0" max="5" step="0.1" value={editFormData.rating} onChange={e => handleEditInputChange('rating', e.target.value)} placeholder="0-5" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">咨询次数</label>
                  <input type="number" min="0" value={editFormData.consultations} onChange={e => handleEditInputChange('consultations', e.target.value)} placeholder="0" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">擅长领域</label>
                <textarea value={editFormData.expertise} onChange={e => handleEditInputChange('expertise', e.target.value)} placeholder="请输入擅长领域，多个用逗号分隔" rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none" />
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3">
              <button onClick={() => {
            setShowEditModal(false);
            setEditingDoctor(null);
          }} className="px-5 py-2.5 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium">
                取消
              </button>
              <button onClick={handleEditSubmit} disabled={isSubmitting} className="px-5 py-2.5 bg-rose-500 text-white rounded-lg hover:bg-rose-600 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                {isSubmitting ? '保存中...' : '保存修改'}
              </button>
            </div>
          </div>
        </div>}
    </div>;
}

// 科室管理组件
function DepartmentContent({
  departments,
  setDepartments,
  toast
}) {
  const handleStatusChange = (id, newStatus) => {
    setDepartments(departments.map(dept => dept.id === id ? {
      ...dept,
      status: newStatus
    } : dept));
    toast({
      title: '状态已更新',
      description: newStatus === 'active' ? '科室已启用' : '科室已禁用'
    });
  };
  const handleDelete = id => {
    setDepartments(departments.filter(dept => dept.id !== id));
    toast({
      title: '删除成功',
      description: '科室信息已删除'
    });
  };
  return <div className="space-y-6">
      {/* 操作栏 */}
      <div className="flex items-center justify-between">
        <div className="text-gray-600">共 {departments.length} 个科室</div>
        <button className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 flex items-center gap-2">
          <Plus size={20} />
          添加科室
        </button>
      </div>

      {/* 科室列表 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-4 px-6 text-gray-500 text-sm font-medium">科室名称</th>
              <th className="text-left py-4 px-6 text-gray-500 text-sm font-medium">科室描述</th>
              <th className="text-left py-4 px-6 text-gray-500 text-sm font-medium">医生数量</th>
              <th className="text-left py-4 px-6 text-gray-500 text-sm font-medium">状态</th>
              <th className="text-left py-4 px-6 text-gray-500 text-sm font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {departments.map(dept => <tr key={dept.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-6 font-medium text-gray-800">{dept.name}</td>
                <td className="py-4 px-6 text-gray-600">{dept.description}</td>
                <td className="py-4 px-6 text-gray-600">{dept.doctorCount} 人</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${dept.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {dept.status === 'active' ? '启用' : '禁用'}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg" title="编辑">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleStatusChange(dept.id, dept.status === 'active' ? 'inactive' : 'active')} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title={dept.status === 'active' ? '禁用' : '启用'}>
                      {dept.status === 'active' ? '禁用' : '启用'}
                    </button>
                    <button onClick={() => handleDelete(dept.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="删除">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>;
}

// 人员管理组件
function StaffContent({
  toast,
  $w
}) {
  const [staff, setStaff] = React.useState([]);
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [roleFilter, setRoleFilter] = React.useState('all');
  const [loading, setLoading] = React.useState(true);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [editingStaff, setEditingStaff] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: '',
    position: '',
    department: '',
    phone: '',
    email: '',
    role: 'doctor',
    status: 'active',
    joinDate: ''
  });

  // 从 doctor 数据模型加载数据
  React.useEffect(() => {
    loadStaffData();
  }, []);
  const loadStaffData = async () => {
    try {
      setLoading(true);
      const tcb = await $w.cloud.getCloudInstance();
      const db = tcb.database();
      const result = await db.collection('doctor').get();
      if (result.data && result.data.length > 0) {
        // 将 doctor 数据转换为人员管理格式
        const formattedStaff = result.data.map(doc => ({
          id: doc._id,
          name: doc.name || '',
          position: doc.position || doc.title || '医生',
          department: doc.department || '妇科',
          phone: doc.phone || '138****8888',
          email: doc.email || `${doc.name}@hospital.com`,
          role: doc.role || 'doctor',
          status: doc.status || 'active',
          joinDate: doc.joinDate || '2020-01-01',
          avatar: doc.avatar || '',
          expertise: doc.expertise || ''
        }));
        setStaff(formattedStaff);
      } else {
        setStaff([]);
      }
    } catch (error) {
      console.error('加载人员数据失败:', error);
      toast({
        title: '加载失败',
        description: '无法加载人员信息，请稍后重试',
        variant: 'destructive'
      });
      setStaff([]);
    } finally {
      setLoading(false);
    }
  };
  // 分页状态
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const filteredStaff = staff.filter(s => {
    const matchSearch = s.name.includes(searchKeyword) || s.position.includes(searchKeyword) || s.department.includes(searchKeyword);
    const matchRole = roleFilter === 'all' || s.role === roleFilter;
    return matchSearch && matchRole;
  });

  // 分页数据
  const totalPages = Math.ceil(filteredStaff.length / pageSize);
  const paginatedStaff = filteredStaff.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // 重置页码当筛选条件变化时
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword, roleFilter]);
  const handleStatusChange = async (id, newStatus) => {
    try {
      const tcb = await $w.cloud.getCloudInstance();
      const db = tcb.database();
      await db.collection('doctor').doc(id).update({
        data: {
          status: newStatus,
          updatedAt: Date.now()
        }
      });
      setStaff(staff.map(s => s.id === id ? {
        ...s,
        status: newStatus
      } : s));
      toast({
        title: '状态已更新',
        description: newStatus === 'active' ? '人员已启用' : '人员已禁用'
      });
    } catch (error) {
      console.error('更新状态失败:', error);
      toast({
        title: '更新失败',
        description: error.message || '请稍后重试',
        variant: 'destructive'
      });
    }
  };
  const handleDelete = async staffMember => {
    if (!confirm(`确定要删除人员 "${staffMember.name}" 吗？此操作不可恢复。`)) {
      return;
    }
    try {
      const tcb = await $w.cloud.getCloudInstance();
      const db = tcb.database();
      await db.collection('doctor').doc(staffMember.id).remove();
      setStaff(staff.filter(s => s.id !== staffMember.id));
      toast({
        title: '删除成功',
        description: '人员信息已删除'
      });
    } catch (error) {
      console.error('删除人员失败:', error);
      toast({
        title: '删除失败',
        description: error.message || '请稍后重试',
        variant: 'destructive'
      });
    }
  };
  const handleAdd = () => {
    setEditingStaff(null);
    setFormData({
      name: '',
      position: '',
      department: '',
      phone: '',
      email: '',
      role: 'doctor',
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0]
    });
    setShowAddModal(true);
  };
  const handleEdit = staffMember => {
    setEditingStaff(staffMember);
    setFormData({
      name: staffMember.name,
      position: staffMember.position,
      department: staffMember.department,
      phone: staffMember.phone,
      email: staffMember.email,
      role: staffMember.role,
      status: staffMember.status,
      joinDate: staffMember.joinDate
    });
    setShowAddModal(true);
  };
  // 表单验证
  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: '验证失败',
        description: '请输入姓名',
        variant: 'destructive'
      });
      return false;
    }
    if (!formData.position.trim()) {
      toast({
        title: '验证失败',
        description: '请输入职位',
        variant: 'destructive'
      });
      return false;
    }
    if (!formData.department.trim()) {
      toast({
        title: '验证失败',
        description: '请输入部门',
        variant: 'destructive'
      });
      return false;
    }
    if (formData.phone && !/^1[3-9]\d{9}$/.test(formData.phone)) {
      toast({
        title: '验证失败',
        description: '请输入正确的手机号码',
        variant: 'destructive'
      });
      return false;
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: '验证失败',
        description: '请输入正确的邮箱地址',
        variant: 'destructive'
      });
      return false;
    }
    return true;
  };
  const handleSave = async () => {
    if (!validateForm()) return;
    try {
      const tcb = await $w.cloud.getCloudInstance();
      const db = tcb.database();
      const saveData = {
        name: formData.name.trim(),
        position: formData.position.trim(),
        department: formData.department.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        role: formData.role,
        status: formData.status,
        joinDate: formData.joinDate,
        title: formData.position.trim(),
        updatedAt: Date.now()
      };
      if (editingStaff) {
        // 更新现有记录
        await db.collection('doctor').doc(editingStaff.id).update({
          data: saveData
        });
        setStaff(staff.map(s => s.id === editingStaff.id ? {
          ...s,
          ...formData
        } : s));
        toast({
          title: '更新成功',
          description: '人员信息已更新'
        });
      } else {
        // 创建新记录
        const result = await db.collection('doctor').add({
          data: {
            ...saveData,
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + Date.now(),
            consultations: 0,
            rating: 5.0,
            expertise: '',
            createdAt: Date.now()
          }
        });
        setStaff([...staff, {
          id: result._id,
          ...formData
        }]);
        toast({
          title: '添加成功',
          description: '新人员已添加'
        });
      }
      setShowAddModal(false);
    } catch (error) {
      console.error('保存人员失败:', error);
      toast({
        title: '保存失败',
        description: error.message || '请稍后重试',
        variant: 'destructive'
      });
    }
  };
  const getRoleBadge = role => {
    const roleMap = {
      admin: {
        label: '管理员',
        className: 'bg-purple-100 text-purple-700'
      },
      doctor: {
        label: '医生',
        className: 'bg-blue-100 text-blue-700'
      },
      nurse: {
        label: '护士',
        className: 'bg-green-100 text-green-700'
      }
    };
    const config = roleMap[role] || {
      label: role,
      className: 'bg-gray-100 text-gray-700'
    };
    return <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.className}`}>{config.label}</span>;
  };
  return <div className="space-y-6">
      {/* 操作栏 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-gray-600">共 {staff.length} 名人员</div>
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
            <option value="all">全部角色</option>
            <option value="admin">管理员</option>
            <option value="doctor">医生</option>
            <option value="nurse">护士</option>
          </select>
        </div>
        <button onClick={handleAdd} className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 flex items-center gap-2">
          <Plus size={20} />
          添加人员
        </button>
      </div>

      {/* 搜索栏 */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input type="text" value={searchKeyword} onChange={e => setSearchKeyword(e.target.value)} placeholder="搜索姓名、职位、部门..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" />
        </div>
      </div>

      {/* 人员列表 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-4 px-6 text-gray-500 text-sm font-medium">姓名</th>
              <th className="text-left py-4 px-6 text-gray-500 text-sm font-medium">职位</th>
              <th className="text-left py-4 px-6 text-gray-500 text-sm font-medium">部门</th>
              <th className="text-left py-4 px-6 text-gray-500 text-sm font-medium">角色</th>
              <th className="text-left py-4 px-6 text-gray-500 text-sm font-medium">联系电话</th>
              <th className="text-left py-4 px-6 text-gray-500 text-sm font-medium">入职日期</th>
              <th className="text-left py-4 px-6 text-gray-500 text-sm font-medium">状态</th>
              <th className="text-left py-4 px-6 text-gray-500 text-sm font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map(s => <tr key={s.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-6 font-medium text-gray-800">{s.name}</td>
                <td className="py-4 px-6 text-gray-600">{s.position}</td>
                <td className="py-4 px-6 text-gray-600">{s.department}</td>
                <td className="py-4 px-6">{getRoleBadge(s.role)}</td>
                <td className="py-4 px-6 text-gray-600">{s.phone}</td>
                <td className="py-4 px-6 text-gray-600">{s.joinDate}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${s.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {s.status === 'active' ? '在职' : '离职'}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleEdit(s)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg" title="编辑">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleStatusChange(s.id, s.status === 'active' ? 'inactive' : 'active')} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title={s.status === 'active' ? '禁用' : '启用'}>
                      <Shield size={18} />
                    </button>
                    <button onClick={() => handleDelete(s)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="删除">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>)}
          </tbody>
        </table>
        {loading && <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
          </div>}
        {!loading && filteredStaff.length === 0 && <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <Users size={48} className="mb-4 opacity-50" />
            <p>暂无人员信息</p>
            <p className="text-sm mt-2">点击"添加人员"按钮添加新人员</p>
          </div>}
      </div>

      {/* 添加/编辑弹窗 */}
      {showAddModal && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {editingStaff ? '编辑人员' : '添加人员'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                <input type="text" value={formData.name} onChange={e => setFormData({
              ...formData,
              name: e.target.value
            })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" placeholder="请输入姓名" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">职位</label>
                  <input type="text" value={formData.position} onChange={e => setFormData({
                ...formData,
                position: e.target.value
              })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" placeholder="如：主治医师" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">部门</label>
                  <input type="text" value={formData.department} onChange={e => setFormData({
                ...formData,
                department: e.target.value
              })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" placeholder="如：妇科" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">角色</label>
                  <select value={formData.role} onChange={e => setFormData({
                ...formData,
                role: e.target.value
              })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500">
                    <option value="doctor">医生</option>
                    <option value="nurse">护士</option>
                    <option value="admin">管理员</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
                  <select value={formData.status} onChange={e => setFormData({
                ...formData,
                status: e.target.value
              })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500">
                    <option value="active">在职</option>
                    <option value="inactive">离职</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">联系电话</label>
                <input type="text" value={formData.phone} onChange={e => setFormData({
              ...formData,
              phone: e.target.value
            })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" placeholder="请输入联系电话" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                <input type="email" value={formData.email} onChange={e => setFormData({
              ...formData,
              email: e.target.value
            })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" placeholder="请输入邮箱地址" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">入职日期</label>
                <input type="date" value={formData.joinDate} onChange={e => setFormData({
              ...formData,
              joinDate: e.target.value
            })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                取消
              </button>
              <button onClick={handleSave} className="flex-1 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600">
                {editingStaff ? '保存修改' : '确认添加'}
              </button>
            </div>
          </div>
        </div>}
    </div>;
}

// 数据统计组件
function StatisticsContent() {
  return <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 预约趋势 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">本周预约趋势</h3>
          <div className="h-64 flex items-end justify-around gap-2">
            {[65, 78, 52, 89, 72, 95, 68].map((value, index) => <div key={index} className="flex flex-col items-center gap-2">
                <div className="w-12 bg-gradient-to-t from-rose-400 to-rose-500 rounded-t-lg" style={{
              height: `${value * 2}px`
            }} />
                <span className="text-xs text-gray-500">
                  {['周一', '周二', '周三', '周四', '周五', '周六', '周日'][index]}
                </span>
              </div>)}
          </div>
        </div>

        {/* 科室分布 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">科室预约分布</h3>
          <div className="space-y-4">
            {[{
            name: '妇科',
            value: 45,
            color: 'bg-rose-500'
          }, {
            name: '产科',
            value: 30,
            color: 'bg-blue-500'
          }, {
            name: '儿科',
            value: 25,
            color: 'bg-green-500'
          }].map((item, index) => <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-700">{item.name}</span>
                  <span className="text-gray-500">{item.value}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{
                width: `${item.value}%`
              }} />
                </div>
              </div>)}
          </div>
        </div>
      </div>

      {/* 数据报表 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">月度数据报表</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 text-gray-500 text-sm font-medium">月份</th>
                <th className="text-left py-3 px-4 text-gray-500 text-sm font-medium">预约总数</th>
                <th className="text-left py-3 px-4 text-gray-500 text-sm font-medium">完成数</th>
                <th className="text-left py-3 px-4 text-gray-500 text-sm font-medium">取消数</th>
                <th className="text-left py-3 px-4 text-gray-500 text-sm font-medium">完成率</th>
              </tr>
            </thead>
            <tbody>
              {[{
              month: '2026年1月',
              total: 320,
              completed: 280,
              cancelled: 40,
              rate: '87.5%'
            }, {
              month: '2026年2月',
              total: 298,
              completed: 265,
              cancelled: 33,
              rate: '88.9%'
            }, {
              month: '2026年3月',
              total: 356,
              completed: 310,
              cancelled: 46,
              rate: '87.1%'
            }, {
              month: '2026年4月',
              total: 380,
              completed: 335,
              cancelled: 45,
              rate: '88.2%'
            }, {
              month: '2026年5月',
              total: 342,
              completed: 298,
              cancelled: 44,
              rate: '87.1%'
            }].map((row, index) => <tr key={index} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">{row.month}</td>
                  <td className="py-3 px-4 text-gray-600">{row.total}</td>
                  <td className="py-3 px-4 text-green-600">{row.completed}</td>
                  <td className="py-3 px-4 text-red-600">{row.cancelled}</td>
                  <td className="py-3 px-4 text-gray-600">{row.rate}</td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
}

// 内容管理组件
function ContentManagementContent({
  toast,
  $w
}) {
  const [content, setContent] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editForm, setEditForm] = React.useState({});
  const [newSpecialty, setNewSpecialty] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [recordId, setRecordId] = React.useState(null);

  // 从 about 数据模型加载数据
  React.useEffect(() => {
    loadAboutData();
  }, []);
  const loadAboutData = async () => {
    try {
      setLoading(true);
      const tcb = await $w.cloud.getCloudInstance();
      const db = tcb.database();
      const result = await db.collection('about').limit(1).get();
      if (result.data && result.data.length > 0) {
        const data = result.data[0];
        setRecordId(data._id);

        // 转换数据格式
        const formattedData = {
          hospitalName: data.hospitalName || '',
          hospitalLevel: data.hospitalLevels?.[0] || '二级专科',
          isMedicalInsurance: data.hospitalLevels?.includes('医保定点') || false,
          slogan: data.slogan || '',
          description: Array.isArray(data.description) ? data.description.join('\n\n') : data.description || '',
          chiefDoctors: data.statistics?.[0]?.value || '30+',
          medicalStaff: data.statistics?.[1]?.value || '200+',
          beds: data.statistics?.[2]?.value || '280',
          phone: data.phone || '',
          address: data.address || '',
          transportInfo: data.locationDetail || '',
          bannerImage: data.coverImage || '',
          specialties: data.featuredDepartments || []
        };
        setContent(formattedData);
        setEditForm(formattedData);
      } else {
        // 使用默认值
        const defaultData = getDefaultData();
        setContent(defaultData);
        setEditForm(defaultData);
      }
    } catch (error) {
      console.error('加载 about 数据失败:', error);
      toast({
        title: '加载失败',
        description: '无法加载医院介绍内容，请稍后重试',
        variant: 'destructive'
      });
      const defaultData = getDefaultData();
      setContent(defaultData);
      setEditForm(defaultData);
    } finally {
      setLoading(false);
    }
  };

  // 默认数据
  const getDefaultData = () => ({
    hospitalName: '西安大爱妇科医院',
    hospitalLevel: '二级专科',
    isMedicalInsurance: true,
    slogan: '专业妇产 · 值得信赖 · 守护健康',
    description: '西安大爱妇科医院坐落于健康东街城市中心腹地，占地面积4000多平米，12层就诊大楼医疗面积15000平米，病床数280张，项目总投资1.2亿元。是西安地区规模大的专业妇产医院，在陕西省内名列前茅。\n\n大爱妇产是西安市卫生局直属的三级专科医院，现有员工200余名，其中，主任医师、副主任医师30多名，以及由主任护师组成的专业化护理团队。医院科室齐全，分为妇科部、产科部、新生儿科部、外科、内科、急诊科及影像、放射、检验等多个功能科室，提供与国际接轨的高品质医疗。\n\n各科室主任都由在西安市乃至陕西省妇产科领域享有盛誉、具有30年以上临床经验的专家担任，确保医疗安全和医疗质量。大爱设有专人值守的24小时健康顾问热线，所有曾经咨询和就诊的患者都将分别录入健康档案，永久保存，随时查阅。',
    chiefDoctors: '30+',
    medicalStaff: '200+',
    beds: '280',
    phone: '029-88886666',
    address: '陕西省西安市健康东街168号',
    transportInfo: '地铁2号线健康路站A出口步行300米',
    bannerImage: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&h=400&fit=crop',
    specialties: ['妇科中心', '产科中心', '新生儿科', '计划生育', '私密整形', '不孕不育']
  });
  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleAddSpecialty = () => {
    if (newSpecialty.trim() && !editForm.specialties?.includes(newSpecialty.trim())) {
      setEditForm(prev => ({
        ...prev,
        specialties: [...(prev.specialties || []), newSpecialty.trim()]
      }));
      setNewSpecialty('');
    }
  };
  const handleRemoveSpecialty = index => {
    setEditForm(prev => ({
      ...prev,
      specialties: prev.specialties?.filter((_, i) => i !== index) || []
    }));
  };
  const handleSave = async () => {
    try {
      setSaving(true);
      const tcb = await $w.cloud.getCloudInstance();
      const db = tcb.database();

      // 将 description 拆分为多个段落
      const paragraphs = editForm.description?.split('\n\n').filter(p => p.trim()) || [];

      // 构建要保存的数据 - 新数据结构
      const saveData = {
        _id: 'about_default',
        // 固定ID，便于查询
        name: editForm.hospitalName,
        level: editForm.hospitalLevel,
        mission: editForm.slogan,
        // 将 description 拆分为多个字段
        introduction: paragraphs[0] || '',
        hardware: paragraphs[1] || '',
        qualifications: paragraphs[2] || '',
        service_model: paragraphs[3] || '',
        social_responsibility: paragraphs[4] || '',
        contact: editForm.phone,
        address: editForm.address,
        cover_image: editForm.bannerImage,
        featured_departments: editForm.specialties || [],
        updated_at: Date.now()
      };
      if (recordId) {
        // 更新现有记录
        await db.collection('about').doc(recordId).update({
          data: saveData
        });
      } else {
        // 创建新记录（使用固定ID）
        try {
          await db.collection('about').doc('about_default').set({
            data: {
              ...saveData,
              created_at: Date.now()
            }
          });
          setRecordId('about_default');
        } catch (e) {
          // 如果 doc 已存在，使用 add
          const result = await db.collection('about').add({
            data: {
              ...saveData,
              created_at: Date.now()
            }
          });
          setRecordId(result._id);
        }
      }
      setContent({
        ...editForm
      });
      setIsEditing(false);
      toast({
        title: '保存成功',
        description: '医院介绍内容已更新'
      });
    } catch (error) {
      console.error('保存 about 数据失败:', error);
      toast({
        title: '保存失败',
        description: error.message || '请稍后重试',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };
  const handleCancel = () => {
    setEditForm({
      ...content
    });
    setIsEditing(false);
  };

  // 加载状态
  if (loading) {
    return <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
      </div>;
  }
  return <div className="space-y-6 max-w-4xl">
      {/* 操作栏 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">关于页面内容管理</h2>
          <p className="text-sm text-gray-500 mt-1">管理医院介绍页面的展示内容</p>
        </div>
        {!isEditing ? <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 flex items-center gap-2">
            <Edit size={20} />
            编辑内容
          </button> : <div className="flex items-center gap-3">
            <button onClick={handleCancel} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
              取消
            </button>
            <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Check size={20} />}
              {saving ? '保存中...' : '保存修改'}
            </button>
          </div>}
      </div>

      {/* 基本信息 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Building2 size={20} className="text-rose-500" />
          基本信息
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">医院名称</label>
            {isEditing ? <input type="text" value={editForm.hospitalName} onChange={e => handleInputChange('hospitalName', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" /> : <p className="text-gray-800">{content.hospitalName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">医院等级</label>
            {isEditing ? <select value={editForm.hospitalLevel} onChange={e => handleInputChange('hospitalLevel', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white">
                <option value="二级专科">二级专科</option>
                <option value="三级甲等">三级甲等</option>
                <option value="三级乙等">三级乙等</option>
                <option value="二级甲等">二级甲等</option>
                <option value="二级乙等">二级乙等</option>
              </select> : <p className="text-gray-800">{content.hospitalLevel}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">宣传标语</label>
            {isEditing ? <input type="text" value={editForm.slogan} onChange={e => handleInputChange('slogan', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" /> : <p className="text-gray-800">{content.slogan}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">医保定点</label>
            {isEditing ? <div className="flex items-center gap-3">
                <button onClick={() => handleInputChange('isMedicalInsurance', !editForm.isMedicalInsurance)} className={`w-12 h-6 rounded-full relative transition-colors ${editForm.isMedicalInsurance ? 'bg-rose-500' : 'bg-gray-300'}`}>
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${editForm.isMedicalInsurance ? 'right-1' : 'left-1'}`} />
                </button>
                <span className="text-sm text-gray-600">{editForm.isMedicalInsurance ? '是' : '否'}</span>
              </div> : <p className="text-gray-800">{content.isMedicalInsurance ? '是' : '否'}</p>}
          </div>
        </div>
      </div>

      {/* 医院数据 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 size={20} className="text-rose-500" />
          医院数据
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">主任医师数量</label>
            {isEditing ? <input type="text" value={editForm.chiefDoctors} onChange={e => handleInputChange('chiefDoctors', e.target.value)} placeholder="如：30+" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" /> : <p className="text-gray-800">{content.chiefDoctors}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">医护人员数量</label>
            {isEditing ? <input type="text" value={editForm.medicalStaff} onChange={e => handleInputChange('medicalStaff', e.target.value)} placeholder="如：200+" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" /> : <p className="text-gray-800">{content.medicalStaff}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">开放床位</label>
            {isEditing ? <input type="text" value={editForm.beds} onChange={e => handleInputChange('beds', e.target.value)} placeholder="如：280" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" /> : <p className="text-gray-800">{content.beds}</p>}
          </div>
        </div>
      </div>

      {/* 联系方式 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Phone size={20} className="text-rose-500" />
          联系方式
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">预约电话</label>
            {isEditing ? <input type="text" value={editForm.phone} onChange={e => handleInputChange('phone', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" /> : <p className="text-gray-800">{content.phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">医院地址</label>
            {isEditing ? <input type="text" value={editForm.address} onChange={e => handleInputChange('address', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" /> : <p className="text-gray-800">{content.address}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">交通信息</label>
            {isEditing ? <input type="text" value={editForm.transportInfo} onChange={e => handleInputChange('transportInfo', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" /> : <p className="text-gray-800">{content.transportInfo}</p>}
          </div>
        </div>
      </div>

      {/* 医院介绍 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FileText size={20} className="text-rose-500" />
          医院详细介绍
        </h3>
        {isEditing ? <textarea value={editForm.description} onChange={e => handleInputChange('description', e.target.value)} rows={8} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none" /> : <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {content.description}
          </div>}
      </div>

      {/* 特色科室 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Award size={20} className="text-rose-500" />
          特色科室
        </h3>
        {isEditing && <div className="flex items-center gap-2 mb-4">
            <input type="text" value={newSpecialty} onChange={e => setNewSpecialty(e.target.value)} placeholder="输入新科室名称" className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" onKeyPress={e => e.key === 'Enter' && handleAddSpecialty()} />
            <button onClick={handleAddSpecialty} className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 flex items-center gap-1">
              <Plus size={18} />
              添加
            </button>
          </div>}
        <div className="flex flex-wrap gap-2">
          {(isEditing ? editForm.specialties : content.specialties).map((item, index) => <span key={index} className="px-3 py-1.5 bg-rose-50 text-rose-600 text-sm font-medium rounded-full border border-rose-100 flex items-center gap-2">
              {item}
              {isEditing && <button onClick={() => handleRemoveSpecialty(index)} className="text-rose-400 hover:text-rose-600">
                  <X size={14} />
                </button>}
            </span>)}
        </div>
      </div>

      {/* 横幅图片 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Image size={20} className="text-rose-500" />
          医院横幅图片
        </h3>
        {isEditing ? <div>
            <input type="text" value={editForm.bannerImage} onChange={e => handleInputChange('bannerImage', e.target.value)} placeholder="请输入图片URL" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 mb-4" />
            {editForm.bannerImage && <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <img src={editForm.bannerImage} alt="医院横幅" className="w-full h-full object-cover" />
              </div>}
          </div> : <div className="relative w-full h-48 rounded-lg overflow-hidden">
            <img src={content.bannerImage} alt="医院横幅" className="w-full h-full object-cover" />
          </div>}
      </div>

      {/* 提示信息 */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Check size={20} className="text-green-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-green-800">已连接数据模型</h4>
            <p className="text-sm text-green-700 mt-1">
              内容已关联到 about 数据模型，修改后将自动同步到 about 页面。
            </p>
          </div>
        </div>
      </div>
    </div>;
}

// 系统设置组件
function SettingsContent() {
  const {
    toast
  } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settingsId, setSettingsId] = useState('system_default');
  const [formData, setFormData] = useState({
    hospital_name: '',
    hospital_level: '二级专科',
    contact_phone: '',
    address: '',
    business_hours: '',
    introduction: ''
  });

  // 医院等级选项
  const hospitalLevels = ['三级甲等', '二级甲等', '二级专科', '一级医院', '社区医院'];

  // 加载系统设置
  useEffect(() => {
    loadSettings();
  }, []);
  const loadSettings = async () => {
    try {
      setLoading(true);
      const tcb = await $w.cloud.getCloudInstance();
      const db = tcb.database();

      // 查询系统设置
      const result = await db.collection('system_setting').get();
      if (result.data && result.data.length > 0) {
        const settings = result.data[0];
        setSettingsId(settings._id);
        setFormData({
          hospital_name: settings.hospital_name || '',
          hospital_level: settings.hospital_level || '二级专科',
          contact_phone: settings.contact_phone || '',
          address: settings.address || '',
          business_hours: settings.business_hours || '',
          introduction: settings.introduction || ''
        });
      } else {
        // 没有设置记录，使用默认值
        setFormData({
          hospital_name: '西安大爱妇科医院',
          hospital_level: '二级专科',
          contact_phone: '029-85269595',
          address: '北京市朝阳区健康路88号',
          business_hours: '周一至周日 08:00-18:00',
          introduction: '西安大爱妇科医院是一家专注于女性健康的大型综合性医院，拥有先进的医疗设备和专业的医疗团队。'
        });
      }
    } catch (error) {
      console.error('加载系统设置失败:', error);
      toast({
        title: '加载失败',
        description: error.message || '请稍后重试',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // 保存设置
  const handleSave = async () => {
    try {
      setSaving(true);
      const tcb = await $w.cloud.getCloudInstance();
      const db = tcb.database();
      const saveData = {
        hospital_name: formData.hospital_name,
        hospital_level: formData.hospital_level,
        contact_phone: formData.contact_phone,
        address: formData.address,
        business_hours: formData.business_hours,
        introduction: formData.introduction,
        updatedAt: Date.now()
      };

      // 检查是否已有记录
      const existingResult = await db.collection('system_setting').where({
        _id: settingsId
      }).get();
      if (existingResult.data && existingResult.data.length > 0) {
        // 更新现有记录
        await db.collection('system_setting').doc(settingsId).update({
          data: saveData
        });
      } else {
        // 创建新记录
        await db.collection('system_setting').add({
          data: {
            ...saveData,
            createdAt: Date.now()
          }
        });
      }
      toast({
        title: '保存成功',
        description: '系统设置已更新'
      });
    } catch (error) {
      console.error('保存系统设置失败:', error);
      toast({
        title: '保存失败',
        description: error.message || '请稍后重试',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  // 处理输入变化
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  if (loading) {
    return <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
      </div>;
  }
  return <div className="space-y-6 max-w-3xl">
      {/* 基本设置 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">基本设置</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">医院名称</label>
            <input type="text" value={formData.hospital_name} onChange={e => handleChange('hospital_name', e.target.value)} placeholder="请输入医院名称" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">医院等级</label>
            <select value={formData.hospital_level} onChange={e => handleChange('hospital_level', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500">
              {hospitalLevels.map(level => <option key={level} value={level}>{level}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">联系电话</label>
            <input type="text" value={formData.contact_phone} onChange={e => handleChange('contact_phone', e.target.value)} placeholder="请输入联系电话" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">医院地址</label>
            <input type="text" value={formData.address} onChange={e => handleChange('address', e.target.value)} placeholder="请输入医院地址" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">营业时间</label>
            <input type="text" value={formData.business_hours} onChange={e => handleChange('business_hours', e.target.value)} placeholder="如：周一至周日 08:00-18:00" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">医院简介</label>
            <textarea value={formData.introduction} onChange={e => handleChange('introduction', e.target.value)} placeholder="请输入医院简介" rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none" />
          </div>
        </div>
      </div>

      {/* 保存按钮 */}
      <div className="flex justify-end">
        <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
          {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
          {saving ? '保存中...' : '保存设置'}
        </button>
      </div>
    </div>;
}
export default function Admin(props) {
  const {
    toast
  } = useToast();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState(mockAppointments);
  const [departments, setDepartments] = useState(mockDepartments);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [doctorsLoading, setDoctorsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // 检查登录状态
  useEffect(() => {
    checkAuthStatus();
  }, []);
  const checkAuthStatus = () => {
    try {
      const adminAuth = localStorage.getItem('adminAuth');
      if (!adminAuth) {
        // 未登录，跳转到登录页
        toast({
          title: '请先登录',
          description: '正在跳转到登录页面...',
          variant: 'destructive'
        });
        setTimeout(() => {
          props.$w.utils.redirectTo({
            pageId: 'adminLogin',
            params: {}
          });
        }, 1000);
        setCheckingAuth(false);
        return;
      }
      const authData = JSON.parse(adminAuth);
      // 检查是否过期
      if (authData.expiry && new Date().getTime() > authData.expiry) {
        localStorage.removeItem('adminAuth');
        toast({
          title: '登录已过期',
          description: '请重新登录',
          variant: 'destructive'
        });
        setTimeout(() => {
          props.$w.utils.redirectTo({
            pageId: 'adminLogin',
            params: {}
          });
        }, 1000);
        setCheckingAuth(false);
        return;
      }
      setIsAuthenticated(true);
      setCheckingAuth(false);
    } catch (error) {
      console.error('检查登录状态失败:', error);
      localStorage.removeItem('adminAuth');
      setTimeout(() => {
        props.$w.utils.redirectTo({
          pageId: 'adminLogin',
          params: {}
        });
      }, 1000);
      setCheckingAuth(false);
    }
  };

  // 退出登录
  const handleLogout = async () => {
    try {
      // 清除本地存储的登录状态
      localStorage.removeItem('adminAuth');
      toast({
        title: '已退出登录',
        description: '正在跳转...'
      });
      setTimeout(() => {
        props.$w.utils.redirectTo({
          pageId: 'home',
          params: {}
        });
      }, 1000);
    } catch (error) {
      console.error('退出登录失败:', error);
      toast({
        title: '退出失败',
        description: error.message || '请重试',
        variant: 'destructive'
      });
    }
  };

  // 加载医生列表
  const loadDoctors = async () => {
    if (!props.$w?.cloud?.callDataSource) {
      if (doctors.length === 0) {
        setDoctors(mockDoctors);
      }
      return;
    }
    setDoctorsLoading(true);
    try {
      const res = await props.$w.cloud.callDataSource({
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
          pageSize: 200,
          pageNumber: 1
        }
      });
      const records = res?.records || [];
      const newDoctors = records.map(item => ({
        id: item._id || item.id,
        name: item.name,
        title: item.title,
        avatar: item.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200',
        rating: item.rating,
        consultations: item.consultations,
        expertise: item.expertise,
        status: 'active',
        patients: item.consultations || 0
      }));
      setDoctors(newDoctors);
    } catch (error) {
      toast({
        title: '加载医生数据失败',
        description: error.message || '请检查网络连接',
        variant: 'destructive'
      });
      // 失败时不覆盖现有数据，避免丢失已添加的医生
      if (doctors.length === 0) {
        setDoctors(mockDoctors);
      }
    } finally {
      setDoctorsLoading(false);
    }
  };
  useEffect(() => {
    loadDoctors();
  }, []);

  // 菜单项配置
  const menuItems = [{
    id: 'dashboard',
    label: '数据概览',
    icon: LayoutDashboard
  }, {
    id: 'appointments',
    label: '预约管理',
    icon: Calendar
  }, {
    id: 'doctors',
    label: '医生管理',
    icon: Stethoscope
  }, {
    id: 'departments',
    label: '科室管理',
    icon: Users
  }, {
    id: 'staff',
    label: '人员管理',
    icon: UserCog
  }, {
    id: 'statistics',
    label: '数据统计',
    icon: BarChart3
  }, {
    id: 'content',
    label: '内容管理',
    icon: FileText
  }, {
    id: 'settings',
    label: '系统设置',
    icon: Settings
  }];
  ;

  // 渲染对应内容
  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardContent stats={mockStats} appointments={appointments} doctors={doctors} />;
      case 'appointments':
        return <AppointmentContent appointments={appointments} setAppointments={setAppointments} searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} toast={toast} $w={props.$w} />;
      case 'doctors':
        return <DoctorContent doctors={doctors} setDoctors={setDoctors} searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} toast={toast} $w={props.$w} loadDoctors={loadDoctors} doctorsLoading={doctorsLoading} />;
      case 'departments':
        return <DepartmentContent departments={departments} setDepartments={setDepartments} toast={toast} />;
      case 'staff':
        return <StaffContent toast={toast} $w={$w} />;
      case 'statistics':
        return <StatisticsContent />;
      case 'content':
        return <ContentManagementContent toast={toast} $w={props.$w} />;
      case 'settings':
        return <SettingsContent />;
      default:
        return <DashboardContent stats={mockStats} appointments={appointments} doctors={doctors} />;
    }
  };
  // 如果正在检查登录状态，显示加载状态
  if (checkingAuth) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500">正在检查登录状态...</p>
        </div>
      </div>;
  }

  // 如果未登录，不渲染内容
  if (!isAuthenticated) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">请先登录</p>
          <p className="text-sm text-gray-400">正在跳转到登录页面...</p>
        </div>
      </div>;
  }
  return <div className="flex h-screen bg-gray-50">
      {/* 侧边栏 */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-slate-800 to-slate-900 text-white transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700">
          {sidebarOpen && <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">医院管理</span>
            </div>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-slate-700 rounded">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* 菜单 */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {menuItems.map(item => {
          const Icon = item.icon;
          return <button key={item.id} onClick={() => setActiveMenu(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${activeMenu === item.id ? 'bg-rose-500 text-white border-l-4 border-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>;
        })}
        </nav>

        {/* 退出按钮 */}
        <div className="p-4 border-t border-slate-700">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors">
            <LogOut size={20} />
            {sidebarOpen && <span>退出登录</span>}
          </button>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部栏 */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <h1 className="text-xl font-bold text-gray-800">
            {menuItems.find(m => m.id === activeMenu)?.label || '数据概览'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
                <span className="text-rose-600 font-medium">管</span>
              </div>
              <span className="text-sm">管理员</span>
            </div>
          </div>
        </header>

        {/* 内容区 */}
        <div className="flex-1 overflow-auto p-6">
          {renderContent()}
        </div>
      </main>
    </div>;
}