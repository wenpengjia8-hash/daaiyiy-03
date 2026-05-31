// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast, Input, Button, Label, Card, CardContent, CardDescription, CardHeader, CardTitle, Checkbox } from '@/components/ui';
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
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingAutoLogin, setCheckingAutoLogin] = useState(true);

  // 自动登录检查
  useEffect(() => {
    checkAutoLogin();
  }, []);

  // 检查自动登录
  const checkAutoLogin = async () => {
    try {
      // 检查本地存储的登录状态
      const adminAuth = localStorage.getItem('adminAuth');
      if (adminAuth) {
        const authData = JSON.parse(adminAuth);
        const {
          username: savedUsername,
          password: savedPassword,
          expiry
        } = authData;

        // 检查是否过期
        if (expiry && new Date().getTime() > expiry) {
          localStorage.removeItem('adminAuth');
          setCheckingAutoLogin(false);
          return;
        }

        // 自动填充用户名
        if (savedUsername) {
          setUsername(savedUsername);
        }

        // 如果有记住的密码，尝试自动登录
        if (savedUsername && savedPassword) {
          setPassword(savedPassword);
          setRememberMe(true);
          // 延迟执行自动登录，让用户看到页面
          setTimeout(() => {
            performLogin(savedUsername, savedPassword, true);
          }, 500);
          return;
        }
      }
    } catch (error) {
      console.error('自动登录检查失败:', error);
    }
    setCheckingAutoLogin(false);
  };

  // 执行登录
  const performLogin = async (loginUsername, loginPassword, isAutoLogin = false) => {
    if (!isAutoLogin) {
      setLoading(true);
    }
    try {
      const tcb = await $w.cloud.getCloudInstance();

      // 查询管理员数据模型验证登录
      const db = tcb.database();
      const adminResult = await db.collection('admin').where({
        username: loginUsername,
        password: loginPassword,
        status: 'active'
      }).get();
      if (!adminResult.data || adminResult.data.length === 0) {
        throw new Error('用户名或密码错误');
      }
      const adminData = adminResult.data[0];

      // 更新最后登录时间
      await db.collection('admin').doc(adminData._id).update({
        lastLoginTime: new Date().getTime()
      });

      // 保存登录状态到本地存储
      const authData = {
        username: loginUsername,
        password: rememberMe ? loginPassword : '',
        role: adminData.role,
        loginTime: new Date().getTime(),
        expiry: new Date().getTime() + 7 * 24 * 60 * 60 * 1000 // 7天过期
      };
      localStorage.setItem('adminAuth', JSON.stringify(authData));
      if (!isAutoLogin) {
        toast({
          title: '登录成功',
          description: '欢迎进入医院管理系统'
        });
      }

      // 跳转到 admin 页面
      $w.utils.navigateTo({
        pageId: 'admin',
        params: {}
      });
    } catch (error) {
      console.error('登录失败:', error);
      if (!isAutoLogin) {
        toast({
          title: '登录失败',
          description: error.message || '用户名或密码错误',
          variant: 'destructive'
        });
      }
      // 自动登录失败，清除存储
      if (isAutoLogin) {
        localStorage.removeItem('adminAuth');
      }
    } finally {
      setLoading(false);
      setCheckingAutoLogin(false);
    }
  };
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
    if (!password || password.length < 6 || password.length > 32) {
      toast({
        title: '密码格式错误',
        description: '请输入6-32位密码',
        variant: 'destructive'
      });
      return;
    }
    await performLogin(username, password);
  };
  const handleBack = () => {
    $w.utils.navigateBack();
  };

  // 如果正在检查自动登录，显示加载状态
  if (checkingAutoLogin) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-slate-500">正在检查登录状态...</p>
        </div>
      </div>;
  }
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
              <p className="text-xs text-slate-400">6-32位密码</p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" checked={rememberMe} onCheckedChange={checked => setRememberMe(checked === true)} />
              <Label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer">
                记住密码
              </Label>
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