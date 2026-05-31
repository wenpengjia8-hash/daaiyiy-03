// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Input, Button, Label, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Loader2, User, Lock, ArrowLeft } from 'lucide-react';

export default function AdminLogin(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleLogin = async e => {
    e.preventDefault();

    // 验证规则
    const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
    if (!usernameRegex.test(username)) {
      toast({
        title: '用户名格式错误',
        description: '请输入4-20位字母、数字或下划线',
        variant: 'destructive'
      });
      return;
    }
    if (!password || password.length < 8 || password.length > 32) {
      toast({
        title: '密码格式错误',
        description: '请输入8-32位密码',
        variant: 'destructive'
      });
      return;
    }
    setLoading(true);
    try {
      const tcb = await $w.cloud.getCloudInstance();

      // 使用用户名密码登录
      await tcb.auth().signIn({
        username,
        password
      });

      // 刷新用户信息
      await $w.auth.getUserInfo({
        force: true
      });
      toast({
        title: '登录成功',
        description: '欢迎进入医院管理系统'
      });

      // 跳转到 admin 页面
      $w.utils.navigateTo({
        pageId: 'admin',
        params: {}
      });
    } catch (error) {
      console.error('登录失败:', error);
      toast({
        title: '登录失败',
        description: error.message || '用户名或密码错误',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  const handleBack = () => {
    $w.utils.navigateBack();
  };
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="space-y-1 text-center pb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 14v3m4-3v3m4-3v3M3 21h18M4 18h16M5 18V8a3 3 0 013-3h8a3 3 0 013 3v10" />
              <path d="M12 2v4" />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold text-slate-800">医院管理系统</CardTitle>
          <CardDescription className="text-slate-500">
            请输入管理员账号和密码登录
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-slate-700 font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-blue-500" />
                用户名
              </Label>
              <Input id="username" type="text" placeholder="请输入用户名" value={username} onChange={e => setUsername(e.target.value)} className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500" disabled={loading} />
              <p className="text-xs text-slate-400">4-20位字母、数字或下划线</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-medium flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-500" />
                密码
              </Label>
              <Input id="password" type="password" placeholder="请输入密码" value={password} onChange={e => setPassword(e.target.value)} className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500" disabled={loading} />
              <p className="text-xs text-slate-400">8-32位密码</p>
            </div>
            
            <Button type="submit" className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold text-base shadow-lg shadow-blue-200" disabled={loading}>
              {loading ? <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  登录中...
                </> : '登录'}
            </Button>
          </form>
          
          <Button variant="ghost" className="w-full mt-4 text-slate-500 hover:text-slate-700" onClick={handleBack} disabled={loading}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回
          </Button>
        </CardContent>
      </Card>
    </div>;
}