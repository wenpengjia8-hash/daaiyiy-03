const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command;

// 查询医生列表
async function getDoctorList(event) {
  const { page = 1, pageSize = 10, keyword = '', title = '' } = event;
  const skip = (page - 1) * pageSize;

  let where = {};
  if (keyword) {
    where.name = db.RegExp({
      regexp: keyword,
      options: 'i'
    });
  }
  if (title) {
    where.title = title;
  }

  try {
    const countResult = await db.collection('doctor').where(where).count();
    const total = countResult.total;

    const listResult = await db.collection('doctor')
      .where(where)
      .orderBy('rating', 'desc')
      .skip(skip)
      .limit(pageSize)
      .get();

    return {
      code: 0,
      message: 'success',
      data: {
        list: listResult.data,
        total,
        page,
        pageSize
      }
    };
  } catch (err) {
    return {
      code: -1,
      message: err.message || '查询失败',
      data: null
    };
  }
}

// 获取医生详情
async function getDoctorDetail(event) {
  const { id } = event;

  if (!id) {
    return {
      code: -1,
      message: '医生ID不能为空',
      data: null
    };
  }

  try {
    const result = await db.collection('doctor').doc(id).get();
    return {
      code: 0,
      message: 'success',
      data: result.data
    };
  } catch (err) {
    return {
      code: -1,
      message: err.message || '查询失败',
      data: null
    };
  }
}

// 添加医生
async function addDoctor(event) {
  const { name, title, avatar, rating, consultations, expertise } = event;

  if (!name || !title) {
    return {
      code: -1,
      message: '医生姓名和职称不能为空',
      data: null
    };
  }

  try {
    const result = await db.collection('doctor').add({
      data: {
        name,
        title,
        avatar: avatar || '',
        rating: rating || 5.0,
        consultations: consultations || 0,
        expertise: expertise || '',
        createTime: db.serverDate(),
        updateTime: db.serverDate()
      }
    });

    return {
      code: 0,
      message: '添加成功',
      data: {
        id: result._id
      }
    };
  } catch (err) {
    return {
      code: -1,
      message: err.message || '添加失败',
      data: null
    };
  }
}

// 更新医生
async function updateDoctor(event) {
  const { id, name, title, avatar, rating, consultations, expertise } = event;

  if (!id) {
    return {
      code: -1,
      message: '医生ID不能为空',
      data: null
    };
  }

  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (title !== undefined) updateData.title = title;
  if (avatar !== undefined) updateData.avatar = avatar;
  if (rating !== undefined) updateData.rating = rating;
  if (consultations !== undefined) updateData.consultations = consultations;
  if (expertise !== undefined) updateData.expertise = expertise;
  updateData.updateTime = db.serverDate();

  try {
    await db.collection('doctor').doc(id).update({
      data: updateData
    });

    return {
      code: 0,
      message: '更新成功',
      data: { id }
    };
  } catch (err) {
    return {
      code: -1,
      message: err.message || '更新失败',
      data: null
    };
  }
}

// 删除医生
async function deleteDoctor(event) {
  const { id } = event;

  if (!id) {
    return {
      code: -1,
      message: '医生ID不能为空',
      data: null
    };
  }

  try {
    await db.collection('doctor').doc(id).remove();
    return {
      code: 0,
      message: '删除成功',
      data: { id }
    };
  } catch (err) {
    return {
      code: -1,
      message: err.message || '删除失败',
      data: null
    };
  }
}

// 获取医生职称统计
async function getTitleStats(event) {
  try {
    const result = await db.collection('doctor').get();
    const stats = {};
    result.data.forEach(doc => {
      const t = doc.title || '未知';
      stats[t] = (stats[t] || 0) + 1;
    });

    return {
      code: 0,
      message: 'success',
      data: stats
    };
  } catch (err) {
    return {
      code: -1,
      message: err.message || '查询失败',
      data: null
    };
  }
}

// 主入口
exports.main = async (event, context) => {
  const { action = 'getList' } = event;

  switch (action) {
    case 'getList':
      return await getDoctorList(event);
    case 'getDetail':
      return await getDoctorDetail(event);
    case 'add':
      return await addDoctor(event);
    case 'update':
      return await updateDoctor(event);
    case 'delete':
      return await deleteDoctor(event);
    case 'getTitleStats':
      return await getTitleStats(event);
    default:
      return {
        code: -1,
        message: `未知操作: ${action}`,
        data: null
      };
  }
};
