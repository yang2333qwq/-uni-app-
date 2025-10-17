// 日期格式化工具
export const formatDate = (isoString) => {
  const date = new Date(isoString);
  return `${date.getMonth() + 1}月${date.getDate()}日`;
};

// 计算目标完成百分比
export const calculateProgress = (goal) => {
  if (goal.subGoals.length === 0) return 0;
  return Math.round((goal.completedSubGoals / goal.subGoals.length) * 100);
};

// 存储工具
export const storage = {
  get(key) {
    const value = uni.getStorageSync(key);
    return value ? JSON.parse(value) : null;
  },
  
  set(key, value) {
    uni.setStorageSync(key, JSON.stringify(value));
  },
  
  remove(key) {
    uni.removeStorageSync(key);
  }
};

// 提示工具
export const toast = {
  success(title) {
    uni.showToast({ title, icon: 'success' });
  },
  
  error(title) {
    uni.showToast({ title, icon: 'none' });
  },
  
  loading(title = '加载中...') {
    uni.showLoading({ title });
  },
  
  hideLoading() {
    uni.hideLoading();
  }
};
