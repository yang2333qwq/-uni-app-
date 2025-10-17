import { toast } from '../utils';

// 目标拆解API（实际项目中替换为真实接口）
export const fetchSubGoals = async (goalTitle) => {
  try {
    toast.loading('正在拆解目标...');
    
    // 模拟API请求延迟
    return new Promise(resolve => {
      setTimeout(() => {
        toast.hideLoading();
        // 生成模拟的子目标（按目标标题动态生成）
        const daysLater = (days) => {
          const date = new Date();
          date.setDate(date.getDate() + days);
          return date.toISOString();
        };
        
        resolve([
          { content: `规划${goalTitle}的具体步骤`, completed: false, dueDate: daysLater(1) },
          { content: `收集${goalTitle}所需资源`, completed: false, dueDate: daysLater(2) },
          { content: `完成${goalTitle}的第一阶段`, completed: false, dueDate: daysLater(4) },
          { content: `检查${goalTitle}进度并调整`, completed: false, dueDate: daysLater(6) },
          { content: `完成${goalTitle}的第二阶段`, completed: false, dueDate: daysLater(8) },
          { content: `最终完成${goalTitle}并总结`, completed: false, dueDate: daysLater(10) }
        ]);
      }, 1000);
    });
  } catch (error) {
    toast.hideLoading();
    toast.error('目标拆解失败，请重试');
    throw error;
  }
};

// 其他目标相关API（实际项目中实现）
export const goalApi = {
  // 获取所有目标
  getAll: async () => {
    // 实际项目中调用后端接口
    return [];
  },
  
  // 保存目标
  save: async (goal) => {
    // 实际项目中调用后端接口
    return goal;
  }
};
