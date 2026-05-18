<template>
  <div 
    class="ai-avatar" 
    :class="[emotion, { 'is-poked': isPoked }]"
    ref="avatarRef"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    @click="handlePoke"
    :style="{
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${isPoked ? 0.9 : 1})`
    }"
  >
    <div class="avatar-inner">
      <img :key="`${character}-${emotion}`" :src="imageSrc" :alt="character + ' Avatar'" class="avatar-image" />
    </div>
    
    <!-- 装饰性元素 -->
    <div class="sparkle sp-1">✨</div>
    <div class="sparkle sp-2">✦</div>

    <!-- 爱心点击特效 -->
    <div v-if="showHeart" class="poke-heart" :style="{ left: heartX + 'px', top: heartY + 'px' }">❤️</div>

    <!-- 预加载隐藏层，实现无延迟切换 -->
    <div style="display: none;">
      <img v-for="img in preloadImages" :key="img" :src="img" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  emotion: {
    type: String,
    default: 'happy'
  },
  character: {
    type: String,
    default: 'Asuka'
  }
})

// --- 3D 视差跟随逻辑 ---
const avatarRef = ref(null)
const tiltX = ref(0)
const tiltY = ref(0)

const handleMouseMove = (e) => {
  if (!avatarRef.value) return
  const rect = avatarRef.value.getBoundingClientRect()
  // 计算鼠标在元素内的相对位置 (0 到 1)
  const x = (e.clientX - rect.left) / rect.width
  const y = (e.clientY - rect.top) / rect.height
  
  // 将位置映射到旋转角度 (比如最大倾斜 15 度)
  const multiplier = 15
  tiltX.value = (0.5 - y) * multiplier
  tiltY.value = (x - 0.5) * multiplier
}

const handleMouseLeave = () => {
  // 鼠标离开时恢复原状
  tiltX.value = 0
  tiltY.value = 0
}

// --- 点击戳一戳逻辑 ---
const isPoked = ref(false)
const showHeart = ref(false)
const heartX = ref(0)
const heartY = ref(0)

const handlePoke = (e) => {
  if (isPoked.value) return
  
  // 计算爱心出现的位置
  const rect = avatarRef.value.getBoundingClientRect()
  heartX.value = e.clientX - rect.left
  heartY.value = e.clientY - rect.top - 20 // 稍微偏上一点

  isPoked.value = true
  showHeart.value = true

  // 恢复形变
  setTimeout(() => {
    isPoked.value = false
  }, 300)
  
  // 移除爱心
  setTimeout(() => {
    showHeart.value = false
  }, 800)
}

// 根据角色和情绪状态动态计算图片路径
const normalizeEmotion = (emotion) => {
  const normalized = String(emotion || '').trim().toLowerCase()
  const aliasMap = {
    excitement: 'happy',
    cool: 'serious',
    speechless: 'serious',
    surprise: 'curious',
    surpise: 'curious',
    expect: 'curious',
    sleepy: 'sleepy',
    sleep: 'sleepy',
    awkward: 'shy',
    idiot: 'angry'
  }

  return aliasMap[normalized] || normalized || 'happy'
}

const imageSrc = computed(() => {
  const validEmotion = normalizeEmotion(props.emotion)
  
  if (props.character === 'qian') {
    const qianMapping = {
      'happy': 'happy.png',
      'sad': 'sad.png',
      'angry': 'angry.png',
      'think': 'think.png',
      'wink': 'wink.png',
      'curious': 'curious.png',
      'listen': 'listen.png',
      'like': 'happy.png',
      'sleepy': 'sleep.png',
      'serious': 'cool.png',
       'normal': 'normal.png',
       'shy': 'sad.png'
    }
    return `/image/qian/${qianMapping[validEmotion] || 'normal.png'}`
  } else if (props.character === 'campus') {
    const campusMapping = {
      'happy': '微信图片_20260517235327_733_357.png',
      'wink': '微信图片_20260517235405_747_357.png',
      'think': '微信图片_20260517235329_734_357.png',
      'curious': '微信图片_20260517235329_734_357.png',
      'normal': '微信图片_20260517235327_733_357.png',
      'listen': '微信图片_20260517235348_743_357.png',
      'sad': '微信图片_20260517235331_735_357.png',
      'angry': '微信图片_20260517235333_736_357.png',
      'shy': '微信图片_20260517235339_737_357.png',
      'serious': '微信图片_20260517235340_738_357.png',
      'like': '微信图片_20260517235327_733_357.png',
      'sleepy': '微信图片_20260517235331_735_357.png'
    }
    return `/image/campusAsuka/${campusMapping[validEmotion] || campusMapping['happy']}`
  } else {
    // Asuka 默认
    const asukaMapping = {
      'happy': 'happy.png',
      'sad': 'sad.png',
      'angry': 'angry.png',
      'think': 'think.png',
      'wink': 'wink.png',
      'curious': 'curious.png',
      'listen': 'listen.png',
      'serious': 'serious.png',
      'like': 'like.png',
      'sleepy': 'sleepy.png',
       'normal': 'happy.png',
       'shy': 'shy.png'
    }
    return `/image/Asuka/${asukaMapping[validEmotion] || 'happy.png'}`
  }
})

// 预加载两个角色的核心图片，防止切换时闪烁
const preloadImages = [
  '/image/Asuka/happy.png',
  '/image/qian/normal.png',
  '/image/qian/happy.png'
]
</script>

<style scoped>
.ai-avatar {
  width: var(--avatar-size, 260px);
  height: var(--avatar-size, 260px);
  position: relative;
  z-index: 10;
  /* 贴纸浮动阴影效果 */
  filter: drop-shadow(0 15px 35px rgba(0,0,0,0.1));
  /* 调整 transition 使其跟随鼠标时更加顺滑，戳一戳时有果冻弹性 */
  transition: transform 0.15s ease-out, filter 0.3s ease;
  cursor: pointer;
  transform-style: preserve-3d;
}

.ai-avatar:hover {
  filter: drop-shadow(0 25px 45px rgba(0,0,0,0.15));
}

.ai-avatar.is-poked {
  /* 点击时的弹性缩放交由 inline style 的 scale(0.9) 处理，这里只需覆盖过渡速度 */
  transition: transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.poke-heart {
  position: absolute;
  font-size: 24px;
  pointer-events: none;
  z-index: 20;
  animation: floatUp 0.8s ease-out forwards;
}

@keyframes floatUp {
  0% { opacity: 1; transform: translateY(0) scale(0.5); }
  50% { transform: translateY(-30px) scale(1.2); }
  100% { opacity: 0; transform: translateY(-50px) scale(1); }
}

.avatar-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #ffffff;
  border: calc(var(--avatar-size, 260px) * 0.02) solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: inset 0 0 40px rgba(0,0,0,0.05);
  /* 内层也加一点过渡，让背景色切换更柔和 */
  transition: background-color 0.4s ease, border-color 0.4s ease;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  /* 图片切换时的淡入淡出感 */
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0.7; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* 装饰小星星 */
.sparkle {
  position: absolute;
  color: #d1c4e9;
  font-size: calc(var(--avatar-size, 260px) * 0.09);
  animation: twinkle 2s infinite ease-in-out alternate;
  pointer-events: none;
  /* 让星星有种浮在更前面的感觉 */
  transform: translateZ(20px); 
}
.sp-1 { top: 8%; left: -4%; animation-delay: 0s; }
.sp-2 { bottom: 15%; right: -8%; font-size: calc(var(--avatar-size, 260px) * 0.11); color: #ffeb3b; animation-delay: 0.5s; }

@keyframes twinkle {
  0% { opacity: 0.3; transform: scale(0.8) translateZ(20px); }
  100% { opacity: 1; transform: scale(1.2) translateZ(20px); }
}

/* 呼吸动画：通过一个包装器来实现呼吸，以免和鼠标跟随的 transform 冲突。但为了简单，这里我们在原动画基础上做修改 */
/* 注意：由于我们在 JS 中动态设置了 transform，CSS 里的 transform 动画会被覆盖。
   为了兼容，我们可以通过给 avatar-inner 添加动画来实现视觉上的呼吸。*/
@keyframes innerBreathe {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
}

.idle .avatar-inner { animation: innerBreathe 4s infinite ease-in-out; }
.happy .avatar-inner { background-color: #fff8d6; border-color: #fff4b8; transform: scale(1.02); }
.sad .avatar-inner { background-color: #e6f0ff; border-color: #cce0ff; transform: scale(0.98); }
.angry .avatar-inner { background-color: #ffe8e6; border-color: #ffccc7; transform: scale(1.02); }
.thinking .avatar-inner { animation: innerBreathe 2s infinite ease-in-out; background-color: #f0fdf4; border-color: #b7eb8f; }
</style>
