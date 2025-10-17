<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="navbar">
      <text class="title">目标督促助手</text>
      <button @click="showAddModal = true" class="add-btn">+</button>
    </view>

    <!-- 目标列表区域 -->
    <view class="goals-container">
      <view v-if="goals.length === 0" class="empty-state">
        <image src="/static/empty.png" mode="widthFix" class="empty-img"></image>
        <text class="empty-text">还没有目标哦，开始创建第一个目标吧！</text>
      </view>
      
      <goal-card 
        v-for="goal in goals" 
        :key="goal.id"
        :goal="goal"
        @toggle-subgoal="toggleSubGoal(goal.id, $event)"
        @add-subgoal="handleAddSubGoal(goal.id)"
      />
    </view>

    <!-- 添加目标弹窗 -->
    <add-goal-modal 
      :show="showAddModal"
      @close="showAddModal = false"
      @confirm="createGoal"
    />
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import GoalCard from '../../components/goal-card/goal-card.vue';
import AddGoalModal from '../../components/add-goal-modal/add-goal-modal.vue';
import { storage, toast } from '../../utils';
import { fetchSubGoals } from '../../api/goal';

// 状态管理
const goals = ref([]);
const showAddModal = ref(false);

// 初始化 - 从本地存储加载目标数据
onMounted(() => {
  const savedGoals = storage.get('goals');
  if (savedGoals) {
    goals.value = savedGoals;
  }
});

// 保存目标数据到本地存储
const saveGoals = () => {
  storage.set('goals', goals.value);
};

// 创建新目标并调用大模型拆解
const createGoal = async (title) => {
  try {
    // 调用API进行目标拆解
    const subGoals = await fetchSubGoals(title);
    
    // 创建新目标
    const newGoal = {
      id: Date.now().toString(),
      title,
      subGoals,
      completedSubGoals: 0,
      createdAt: new Date().toISOString()
    };
    
    goals.value.unshift(newGoal);
    saveGoals();
    showAddModal.value = false;
    toast.success('目标创建成功');
  } catch (error) {
    console.error('创建目标失败:', error);
  }
};

// 切换子目标完成状态
const toggleSubGoal = (goalId, subGoalIndex) => {
  const goal = goals.value.find(g => g.id === goalId);
  if (goal) {
    const subGoal = goal.subGoals[subGoalIndex];
    const wasCompleted = subGoal.completed;
    
    subGoal.completed = !wasCompleted;
    goal.completedSubGoals += wasCompleted ? -1 : 1;
    
    saveGoals();
    
    // 如果是完成最后一个子目标，显示庆祝信息
    if (goal.completedSubGoals === goal.subGoals.length) {
      toast.success('恭喜完成所有目标！');
    }
  }
};

// 添加自定义子目标
const handleAddSubGoal = (goalId) => {
  uni.showModal({
    title: '添加子目标',
    content: '请输入子目标内容',
    editable: true,
    placeholderText: '输入子目标...',
    success: (res) => {
      if (res.confirm && res.content.trim()) {
        const goal = goals.value.find(g => g.id === goalId);
        if (goal) {
          // 设置7天后为截止日期
          const dueDate = new Date();
          dueDate.setDate(dueDate.getDate() + 7);
          
          goal.subGoals.push({
            content: res.content.trim(),
            completed: false,
            dueDate: dueDate.toISOString()
          });
          
          saveGoals();
        }
      }
    }
  });
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #3498db;
  color: white;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.add-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: white;
  color: #3498db;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  padding: 0;
  line-height: 36px;
}

.goals-container {
  flex: 1;
  padding: 16px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}

.empty-img {
  width: 120px;
  margin-bottom: 20px;
}

.empty-text {
  color: #999;
  font-size: 14px;
}
</style>
