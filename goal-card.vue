<template>
  <view class="goal-card">
    <view class="goal-header">
      <text class="goal-title">{{ goal.title }}</text>
      <text class="goal-progress">{{ goal.completedSubGoals }}/{{ goal.subGoals.length }} 已完成</text>
    </view>
    
    <view class="progress-bar">
      <view 
        class="progress" 
        :style="{ width: progress + '%' }"
      ></view>
    </view>
    
    <view class="subgoals">
      <subgoal-item 
        v-for="(subgoal, index) in goal.subGoals" 
        :key="index"
        :subgoal="subgoal"
        @toggle="handleToggleSubGoal(index)"
      />
      
      <button 
        class="add-subgoal-btn" 
        @click="$emit('add-subgoal')"
      >
        添加子目标
      </button>
    </view>
  </view>
</template>

<script setup>
import { defineProps, emit, computed } from 'vue';
import SubgoalItem from '../subgoal-item/subgoal-item.vue';
import { calculateProgress } from '../../utils';

const props = defineProps({
  goal: {
    type: Object,
    required: true,
    default: () => ({
      title: '',
      subGoals: [],
      completedSubGoals: 0
    })
  }
});

const emitEvent = emit();

const progress = computed(() => {
  return calculateProgress(props.goal);
});

const handleToggleSubGoal = (index) => {
  emitEvent('toggle-subgoal', index);
};
</script>

<style scoped>
.goal-card {
  background-color: white;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.goal-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.goal-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.goal-progress {
  font-size: 12px;
  color: #666;
  align-self: center;
}

.progress-bar {
  height: 6px;
  background-color: #eee;
  border-radius: 3px;
  margin-bottom: 16px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #3498db;
  transition: width 0.3s ease;
}

.subgoals {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.add-subgoal-btn {
  margin-top: 8px;
  padding: 8px 0;
  font-size: 14px;
  color: #3498db;
  background-color: transparent;
  border: 1px dashed #3498db;
  border-radius: 4px;
}
</style>
