<template>
  <uni-popup v-model:show="show" mode="bottom" class="goal-modal">
    <view class="modal-content">
      <text class="modal-title">创建新目标</text>
      <input 
        v-model="goalTitle" 
        placeholder="输入你的大目标..." 
        class="goal-input"
        @confirm="handleConfirm"
      />
      <view class="modal-actions">
        <button @click="handleCancel" class="cancel-btn">取消</button>
        <button @click="handleConfirm" class="confirm-btn">创建并拆解</button>
      </view>
    </view>
  </uni-popup>
</template>

<script setup>
import { defineProps, emit, ref, watch } from 'vue';
import uniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

const emitEvent = emit();
const goalTitle = ref('');

// 监听弹窗显示状态，重置输入
watch(
  () => props.show,
  (newVal) => {
    if (!newVal) {
      goalTitle.value = '';
    }
  }
);

const handleCancel = () => {
  emitEvent('close');
};

const handleConfirm = () => {
  if (goalTitle.value.trim()) {
    emitEvent('confirm', goalTitle.value.trim());
    goalTitle.value = '';
  } else {
    uni.showToast({
      title: '请输入目标内容',
      icon: 'none'
    });
  }
};
</script>

<style scoped>
.goal-modal {
  padding: 20px;
}

.modal-content {
  background-color: white;
  border-radius: 16px 16px 0 0;
  padding: 20px;
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  display: block;
}

.goal-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 16px;
}

.modal-actions {
  display: flex;
  gap: 16px;
}

.cancel-btn, .confirm-btn {
  flex: 1;
  padding: 12px 0;
  border-radius: 8px;
  font-size: 16px;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #333;
}

.confirm-btn {
  background-color: #3498db;
  color: white;
}
</style>
