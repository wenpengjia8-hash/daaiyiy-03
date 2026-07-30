<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>登录 · 挂号管理系统</title>
    <style>
        * { box-sizing: border-box; }
        body {
            margin: 0;
            min-height: 100vh;
            font-family: "Microsoft YaHei", Inter, system-ui, sans-serif;
            color: #172033;
            background: #edf4f8;
        }
        .page { min-height: 100vh; display: grid; grid-template-columns: minmax(420px, 1.15fr) minmax(400px, .85fr); }
        .hero {
            position: relative;
            padding: 64px clamp(48px, 7vw, 110px);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow: hidden;
            color: white;
            background: linear-gradient(145deg, #075985 0%, #0e7490 52%, #0f766e 100%);
        }
        .hero::before, .hero::after {
            content: ""; position: absolute; border-radius: 999px; border: 1px solid rgba(255,255,255,.14);
        }
        .hero::before { width: 520px; height: 520px; right: -210px; top: -210px; }
        .hero::after { width: 340px; height: 340px; left: -170px; bottom: -130px; }
        .brand, .hero-main, .hero-foot { position: relative; z-index: 1; }
        .brand { display: flex; align-items: center; gap: 14px; font-weight: 700; letter-spacing: .04em; }
        .logo { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 13px; background: white; color: #0e7490; font-size: 25px; box-shadow: 0 10px 25px rgba(0,0,0,.12); }
        .eyebrow { color: #99f6e4; font-size: 13px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; }
        h1 { max-width: 650px; margin: 18px 0; font-size: clamp(42px, 5vw, 68px); line-height: 1.08; letter-spacing: -.035em; }
        .hero p { max-width: 610px; color: #d5f4f5; font-size: 17px; line-height: 1.8; }
        .flow { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 34px; }
        .flow span { padding: 9px 13px; border: 1px solid rgba(255,255,255,.2); border-radius: 999px; background: rgba(255,255,255,.08); font-size: 12px; }
        .hero-foot { color: #a5d8df; font-size: 12px; }
        .panel { display: grid; place-items: center; padding: 40px; background: #f8fafc; }
        .card { width: min(100%, 430px); }
        .card h2 { margin: 0 0 10px; font-size: 30px; letter-spacing: -.025em; }
        .subtitle { margin: 0 0 32px; color: #64748b; line-height: 1.7; }
        label { display: block; margin: 0 0 9px; font-size: 14px; font-weight: 700; color: #334155; }
        .field { margin-bottom: 21px; }
        input[type=email], input[type=password] {
            width: 100%; height: 52px; padding: 0 15px; border: 1px solid #cbd5e1; border-radius: 10px;
            background: white; font-size: 15px; outline: none; transition: .2s;
        }
        input:focus { border-color: #0891b2; box-shadow: 0 0 0 4px rgba(8,145,178,.1); }
        .options { display: flex; justify-content: space-between; align-items: center; margin: 4px 0 25px; color: #64748b; font-size: 14px; }
        .remember { display: flex; align-items: center; gap: 8px; }
        button {
            width: 100%; height: 52px; border: 0; border-radius: 10px; cursor: pointer;
            color: white; background: #0e7490; font-size: 15px; font-weight: 700; box-shadow: 0 8px 22px rgba(14,116,144,.22);
        }
        button:hover { background: #155e75; }
        .error { margin: -10px 0 18px; padding: 11px 13px; border-radius: 8px; color: #b42318; background: #fef3f2; font-size: 13px; }
        .notice { margin-top: 24px; padding: 14px; border-radius: 10px; color: #526173; background: #eef2f6; font-size: 12px; line-height: 1.65; }
        @media (max-width: 850px) {
            .page { grid-template-columns: 1fr; }
            .hero { min-height: 300px; padding: 36px 28px; }
            .hero-main { margin: 52px 0 28px; }
            h1 { font-size: 38px; }
            .flow, .hero-foot { display: none; }
            .panel { padding: 48px 24px; }
        }
    </style>
</head>
<body>
<main class="page">
    <section class="hero">
        <div class="brand"><span class="logo">✚</span><span>挂号管理系统</span></div>
        <div class="hero-main">
            <div class="eyebrow">Hospital Operations Platform</div>
            <h1>让每一次预约，都清晰可追溯</h1>
            <p>面向医院内部人员的患者预约与运营管理平台，统一管理从咨询建档、预约到院到接诊回访的完整业务生命周期。</p>
            <div class="flow">
                <span>咨询线索</span><span>患者建档</span><span>预约挂号</span><span>到院接诊</span><span>治疗消费</span><span>持续回访</span>
            </div>
        </div>
        <div class="hero-foot">内部业务系统 · 所有访问与操作均会记录审计日志</div>
    </section>
    <section class="panel">
        <div class="card">
            <h2>欢迎回来</h2>
            <p class="subtitle">请使用医院内部账号登录管理后台</p>
            <form method="POST" action="{{ route('login.store') }}">
                @csrf
                <div class="field">
                    <label for="email">登录邮箱</label>
                    <input id="email" name="email" type="email" value="{{ old('email') }}" placeholder="name@hospital.com" autocomplete="username" autofocus required>
                </div>
                @error('email') <div class="error">{{ $message }}</div> @enderror
                <div class="field">
                    <label for="password">登录密码</label>
                    <input id="password" name="password" type="password" placeholder="请输入登录密码" autocomplete="current-password" required>
                </div>
                @error('password') <div class="error">{{ $message }}</div> @enderror
                <div class="options">
                    <label class="remember"><input type="checkbox" name="remember" value="1"> 保持登录状态</label>
                    <span>忘记密码请联系管理员</span>
                </div>
                <button type="submit">安全登录</button>
            </form>
            <div class="notice">这是医院内部系统。请勿共享账号或在公共设备保存密码；患者资料的查看和修改将受到权限与审计规则约束。</div>
        </div>
    </section>
</main>
</body>
</html>
