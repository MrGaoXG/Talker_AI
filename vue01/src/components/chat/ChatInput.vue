<template>
  <div class="chat-input-wrapper">
    <div class="input-inner">
      <button class="attach-btn" title="上传附件">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z" fill="currentColor"></path>
        </svg>
      </button>
      
      <textarea 
        v-model="inputValue" 
        @keydown.enter.exact.prevent="handleSend"
        placeholder="帮我查看今天上海天气，并在下午三点提醒我开会"
        :disabled="disabled"
        rows="1"
      ></textarea>

      <div class="action-group">
        <button class="mic-btn" title="语音输入">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 15C13.6569 15 15 13.6569 15 12V7C15 5.34315 13.6569 4 12 4C10.3431 4 9 5.34315 9 7V12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2"></path>
            <path d="M19 11V12C19 15.866 15.866 19 12 19M5 11V12C5 15.866 8.13401 19 12 19M12 19V22" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
          </svg>
        </button>
        <button class="send-btn" @click="handleSend" :disabled="!inputValue.trim() || disabled">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="icon-arrow-up">
            <path d="M4 12L20 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
            <path d="M14 6L20 12L14 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['send'])
const inputValue = ref('')

const handleSend = () => {
  if (inputValue.value.trim() && !props.disabled) {
    emit('send', inputValue.value.trim())
    inputValue.value = ''
  }
}

// 自动调整高度
watch(inputValue, async () => {
  await nextTick()
  const textarea = document.querySelector('textarea')
  if (textarea) {
    textarea.style.height = 'auto'
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px'
  }
})
</script>

<style scoped>
.chat-input-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-inner {
  width: 100%;
  background: var(--input-bg, #f4f4f4);
  border: 1px solid var(--border-color, transparent);
  border-radius: 18px;
  padding: 10px 12px;
  display: flex;
  align-items: flex-end;
  gap: 12px;
  transition: background-color 0.3s, box-shadow 0.3s;
  box-shadow: inset 0 0 18px rgba(0, 0, 0, 0.2);
}

.input-inner:focus-within {
  background: color-mix(in srgb, var(--input-bg, #1f1f1f) 88%, white 12%);
  border-color: var(--border-color, #e5e5e5);
  box-shadow: 0 0 0 1px var(--border-color, #e5e5e5), 0 4px 14px rgba(0,0,0,0.18);
}

.attach-btn {
  background: transparent;
  border: none;
  color: var(--text-muted, #676767);
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s, background-color 0.2s;
  flex-shrink: 0;
  margin-bottom: 2px;
}

.attach-btn:hover {
  background-color: var(--hover-color, #ececec);
  color: var(--text-main, #0d0d0d);
}

textarea {
  flex: 1;
  border: none;
  outline: none;
  resize: none;
  font-family: inherit;
  font-size: 15px;
  color: var(--text-main, #0d0d0d);
  line-height: 1.5;
  background: transparent;
  max-height: 200px;
  padding: 10px 0;
  margin: 0;
}

textarea::placeholder {
  color: var(--text-muted, #676767);
}

.send-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: var(--icon-bg, #10a37f);
  color: #ffffff;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.2s, transform 0.2s;
  flex-shrink: 0;
  margin-bottom: 6px;
}

.action-group {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.mic-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--border-color, #e5e5e5);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-main, #fff);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.send-btn svg {
  width: 18px;
  height: 18px;
}

.send-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.send-btn:disabled {
  background: var(--border-color, #e5e5e5);
  color: var(--bg-sidebar, #f9f9f9);
  cursor: not-allowed;
}
</style>
