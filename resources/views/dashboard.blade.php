<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>工作台 · 挂号管理系统</title>
    <style>
        * { box-sizing: border-box; }
        body { margin: 0; font-family: "Microsoft YaHei", system-ui, sans-serif; color: #172033; background: #f1f5f9; }
        header { height: 68px; padding: 0 28px; display: flex; align-items: center; justify-content: space-between; color: white; background: #0f6477; }
        .brand { font-size: 18px; font-weight: 700; }
        .user { display: flex; align-items: center; gap: 16px; font-size: 14px; }
        .logout { padding: 8px 14px; border: 1px solid rgba(255,255,255,.35); border-radius: 8px; color: white; background: transparent; cursor: pointer; }
        main { max-width: 1180px; margin: 0 auto; padding: 38px 24px; }
        h1 { margin: 0 0 8px; }
        .lead { color: #64748b; margin-bottom: 30px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 18px; }
        .module { min-height: 150px; padding: 22px; border: 1px solid #e2e8f0; border-radius: 14px; background: white; box-shadow: 0 5px 18px rgba(15,23,42,.04); }
        .icon { width: 42px; height: 42px; display: grid; place-items: center; margin-bottom: 19px; border-radius: 11px; color: #0e7490; background: #ecfeff; font-weight: 700; }
        .module h3 { margin: 0 0 8px; font-size: 16px; }
        .module p { margin: 0; color: #64748b; font-size: 13px; line-height: 1.6; }
    </style>
</head>
<body>
<header>
    <div class="brand">✚ 挂号管理系统</div>
    <div class="user">
        <span>{{ auth()->user()->name }} · {{ auth()->user()->email }}</span>
        <form method="POST" action="{{ route('logout') }}">@csrf<button class="logout">退出登录</button></form>
    </div>
</header>
<main>
    <h1>业务工作台</h1>
    <p class="lead">统一患者预约生命周期 · 当前为第一阶段功能入口</p>
    <section class="grid">
        <article class="module"><div class="icon">患</div><h3>患者档案</h3><p>患者建档、重复检测、敏感信息脱敏与数据范围控制。</p></article>
        <article class="module"><div class="icon">约</div><h3>预约挂号</h3><p>创建预约、改约、取消以及预约状态跟踪。</p></article>
        <article class="module"><div class="icon">诊</div><h3>到院接诊</h3><p>确认到院、分配医生并记录独立到院时间。</p></article>
        <article class="module"><div class="icon">访</div><h3>回访管理</h3><p>回访内容、下次提醒与患者持续跟进。</p></article>
        <article class="module"><div class="icon">费</div><h3>收费记录</h3><p>治疗项目、消费流水和累计金额管理。</p></article>
        <article class="module"><div class="icon">表</div><h3>统计报表</h3><p>预约、到院、渠道与人员绩效聚合分析。</p></article>
        <article class="module"><div class="icon">权</div><h3>组织与权限</h3><p>医院、科室、角色、权限和数据访问范围。</p></article>
        <article class="module"><div class="icon">审</div><h3>审计日志</h3><p>追踪谁在何时以何权限修改了哪些业务数据。</p></article>
    </section>
</main>
</body>
</html>
