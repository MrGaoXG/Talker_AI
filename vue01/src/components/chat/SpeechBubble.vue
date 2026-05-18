<template>
  <div class="speech-bubble-container" :class="{ visible: text }">
    <div class="speech-bubble">
      <div class="bubble-content">
        {{ displayedText }}<span class="cursor" v-show="isTyping"></span>
      </div>
      <!-- 完美还原图片的弯曲尾巴 SVG -->
      <svg class="bubble-tail" width="35" height="35" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- 尾巴填充，与气泡背景融合 -->
        <path d="M25 0 C25 15 15 30 0 40 C15 30 35 15 35 0 Z" fill="var(--bubble-fill, #ffffff)" />
        <!-- 尾巴右侧描边 -->
        <path d="M25 0 C25 15 15 30 0 40" stroke="var(--bubble-border, #d1c4e9)" stroke-width="3" fill="none" stroke-linecap="round"/>
        <!-- 尾巴左侧描边 -->
        <path d="M0 40 C15 30 35 15 35 0" stroke="var(--bubble-border, #d1c4e9)" stroke-width="3" fill="none" stroke-linecap="round"/>
        <!-- 覆盖顶部描边的白块，让尾巴和气泡内部无缝连接 -->
        <rect x="23" y="-5" width="14" height="8" fill="var(--bubble-fill, #ffffff)" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['typing-end'])

const displayedText = ref('')
const isTyping = ref(false)
let typingInterval = null

const startTyping = (newText) => {
  if (typingInterval) clearInterval(typingInterval)
  
  displayedText.value = ''
  isTyping.value = true
  let index = 0
  
  typingInterval = setInterval(() => {
    if (index < newText.length) {
      displayedText.value += newText.charAt(index)
      index++
    } else {
      clearInterval(typingInterval)
      isTyping.value = false
      emit('typing-end')
    }
  }, 50) 
}

watch(() => props.text, (newText) => {
  if (newText) {
    startTyping(newText)
  } else {
    displayedText.value = ''
    isTyping.value = false
  }
}, { immediate: true })

onUnmounted(() => {
  if (typingInterval) clearInterval(typingInterval)
})
</script>

<style scoped>
.speech-bubble-container {
  opacity: 0;
  transform: translateY(15px) scale(0.9);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  top: var(--bubble-top, -80px);
  right: var(--bubble-right, -60px);
  z-index: 20;
}

.speech-bubble-container.visible {
  opacity: 1;
  transform: translateY(0) scale(var(--bubble-scale, 1));
}

.speech-bubble {
  background: var(--bubble-fill, #ffffff);
  /* 还原图片中的大圆角（类似椭圆） */
  border-radius: 40px;
  border: 3px solid var(--bubble-border, #d1c4e9);
  padding: 18px 30px;
  position: relative;
  display: inline-block;
  min-width: 120px;
  max-width: 280px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.bubble-content {
  font-size: 17px;
  color: var(--bubble-text, #555);
  line-height: 1.6;
  text-align: center;
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 2;
  white-space: pre-line;
}

.bubble-tail {
  position: absolute;
  bottom: -32px;
  left: 60px; /* 尾巴在偏左的位置 */
  z-index: 1;
  /* 调整尾巴角度，指向下方的头像 */
  transform: rotate(-10deg);
}

.bubble-tail path[fill] {
  fill: var(--bubble-fill, #ffffff);
}

.bubble-tail path[stroke] {
  stroke: var(--bubble-border, #d1c4e9);
}

.bubble-tail rect {
  fill: var(--bubble-fill, #ffffff);
}

/* 光标 */
.cursor {
  display: inline-block;
  width: 4px;
  height: 18px;
  background-color: var(--bubble-border, #d1c4e9);
  border-radius: 2px;
  animation: blink 1s step-end infinite;
  margin-left: 4px;
  vertical-align: middle;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
