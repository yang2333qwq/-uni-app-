<template>
  <view class="subgoal-item">
    <view 
      class="checkbox" 
      :class="{ checked: subgoal.completed }" 
      @click="$emit('toggle')"
    >
      <text v-if="subgoal.completed" class="check-icon">✓</text>
    </view>
    <text class="subgoal-text" :class="{ completed: subgoal.completed }">{{ subgoal.content }}</text>
    <text class="subgoal-date">{{ formatDate(subgoal.dueDate) }}</text>
  </view>
</template>

<script setup>
import { defineProps, emit } from 'vue';
import { formatDate } from '../../utils';

const props = defineProps({
  subgoal: {
    type: Object,
    required: true,
    default: () => ({
      content: '',
      completed: false,
      dueDate: ''
    })
  }
});

const emitEvent = emit();
</script>

<style scoped>
.subgoal-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #f5f5f5;
}

.subgoal-item:last-child {
  border-bottom: none;
}

.checkbox {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #3498db;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.checkbox.checked {
  background-color: #3498db;
  color: white;
}

.check-icon {
  font-size: 16px;
  color: white;
}

.subgoal-text {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.subgoal-text.completed {
  text-decoration: line-through;
  color: #999;
}

.subgoal-date {
  font-size: 12px;
  color: #999;
  flex-shrink: 0;
}
</style>
