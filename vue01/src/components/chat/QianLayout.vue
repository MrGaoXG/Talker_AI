<template>
  <div class="qian-dashboard" :style="{ backgroundImage: `url('/qianbackground.png')` }">
    <PetalFall />

    <!-- 天气关联横幅 -->
    <div v-if="weatherBanner.show" class="weather-banner" :class="weatherBanner.type">
      <span class="weather-banner-icon">{{ weatherBanner.icon }}</span>
      <span>{{ weatherBanner.text }}</span>
    </div>

    <!-- 首次访问彩蛋 -->
    <Teleport to="body">
      <div v-if="showFirstVisit" class="first-visit-overlay" @click="dismissFirstVisit">
        <div class="first-visit-card">
          <div class="first-visit-sparkle">✨</div>
          <div class="first-visit-title">欢迎来到 Qian's Garden</div>
          <div class="first-visit-typewriter">
            <span class="typewriter-text">{{ typewriterDisplay }}</span>
            <span class="typewriter-cursor" :class="{ blink: typewriterDone }">|</span>
          </div>
          <div v-if="typewriterDone" class="first-visit-hint">点击任意位置进入花园 🌸</div>
        </div>
      </div>
    </Teleport>

    <!-- 顶部导航栏 -->
    <header class="qian-header">
      <div class="header-left">
        <div class="qian-logo">
          <div class="logo-text-top">Qian's Garden</div>
          <div class="logo-text-bottom">AI助手 <span class="sparkle">✦</span></div>
        </div>
        
        <!-- 新增：返回 Asuka 切换按钮 -->
        <div class="character-switch-container">
          <button class="switch-to-asuka" @click="$emit('switch-character', 'Asuka')">
            <span class="icon">🔄</span> Asuka
          </button>
          <button class="switch-to-campus" @click="$emit('switch-character', 'campus')">
            <span class="icon">🏫</span> Campus
          </button>
        </div>
      </div>
      <nav class="qian-nav">
        <button class="nav-item" :class="{ active: props.currentPage === 'home' }" @click="$emit('page-change', 'home')"><span class="icon">🏠</span> 首页</button>
        <button class="nav-item" @click="$emit('page-change', 'home')"><span class="icon">💬</span> 对话</button>
        <button class="nav-item" :class="{ active: props.currentPage === 'nav' }" @click="$emit('page-change', 'nav')"><span class="icon">🧭</span> 导航</button>
        <button class="nav-item"><span class="icon">📍</span> 定位</button>
        <button class="nav-item" :class="{ active: props.currentPage === 'weather' }" @click="$emit('page-change', 'weather')"><span class="icon">⛅</span> 天气</button>
        <button class="nav-item" :class="{ active: props.currentPage === 'schedule' }" @click="$emit('page-change', 'schedule')"><span class="icon">📅</span> 日程</button>
        <button class="nav-item"><span class="icon">💠</span> API中心</button>
        <button class="nav-item"><span class="icon">⚙️</span> 设置</button>
      </nav>
      <div class="header-right">
        <div class="notif-btn">🔔</div>
        <div class="user-pill" @click="$emit('switch-character')">
          <img src="/image/qian/happy.png" alt="avatar" class="user-thumb" />
          <div class="user-info">
            <div class="user-name">千千同学</div>
            <div class="user-lv">Lv.20</div>
          </div>
          <span class="chevron">⌄</span>
        </div>
      </div>
    </header>

    <div class="qian-main-grid">
      <div class="qian-sticker-layer" aria-hidden="true">
        <img
          src="/image/qian/微信图片_20260518185636_754_357.png"
          alt=""
          class="floating-page-sticker sticker-one"
        />
        <img
          src="/image/qian/微信图片_20260518185638_755_357.png"
          alt=""
          class="floating-page-sticker sticker-two"
        />
        <img
          src="/image/qian/微信图片_20260518185639_756_357.png"
          alt=""
          class="floating-page-sticker sticker-three"
        />
      </div>

      <!-- 左侧：角色信息卡片 -->
      <aside class="qian-left-col">
        <div class="portrait-card glass-panel">
          <div class="portrait-box">
            <img src="/image/qian/happy.png" alt="Qian" class="main-portrait-static" />
            <div class="portrait-overlay">Qian's Garden</div>
          </div>
          <div class="char-meta">
            <div class="char-name">千千同学 <span class="ai-badge">AI 助手</span></div>
            <div class="char-desc">🌸 你的专属花园伙伴</div>
            <div class="lv-progress">
              <div class="lv-text">Lv.20</div>
              <div class="progress-bar"><div class="progress-fill" style="width: 85%"></div></div>
              <div class="exp-text">2680 / 3000</div>
            </div>
          </div>
          <div class="quote-box">
            <span class="quote-mark">"</span>
            {{ dailyFlowerQuote }}
          </div>

          <div class="garden-card glass-panel">
            <div class="garden-title">🌸 花园</div>
            <div class="garden-flowers">
              <span v-for="i in gardenFlowerCount" :key="i" class="garden-flower" :style="{ animationDelay: (i * 0.15) + 's' }">🌸</span>
              <span v-if="gardenFlowerCount === 0" class="garden-empty">和千千多聊聊天，花园就会开花哦 🌱</span>
            </div>
            <div v-if="gardenFlowerCount > 0" class="garden-count">已绽放 {{ gardenFlowerCount }} 朵花</div>
          </div>
        </div>

        <div class="energy-card glass-panel">
          <div class="card-title">今日花语能量 ⓘ</div>
          <div class="energy-stats">
            <div class="stat-item"><span class="icon">🌸</span><div class="val">86</div><div class="lbl">灵感值</div></div>
            <div class="stat-item"><span class="icon">🌿</span><div class="val">92</div><div class="lbl">专注值</div></div>
            <div class="stat-item"><span class="icon">🍀</span><div class="val">75</div><div class="lbl">幸运值</div></div>
          </div>
        </div>

        <div class="flower-card glass-panel">
          <div class="card-title">本周照料的花束</div>
          <div class="flower-count">12 <span class="unit">束</span></div>
          <img src="/image/qian/wink.png" alt="flower" class="flower-img" loading="lazy" decoding="async" />
        </div>
      </aside>

      <!-- 中间：对话区域 -->
      <section class="qian-center-col">
        <div class="chat-container glass-panel">
          <div class="chat-header">
            <div class="chat-title">
              <span class="icon">💠</span>
              与千千的聊天
              <div class="chat-subtitle">基于大语言模型 · LLM API</div>
            </div>
            <div class="chat-actions">
              <button class="new-chat-btn">🆕 新建对话</button>
              <button class="more-btn">···</button>
            </div>
          </div>

          <div class="chat-history" ref="historyRef">
            <!-- 欢迎状态下的屏幕中央大角色 (根据 222.png 强化显示) -->
            <div v-if="props.messages.length === 0" class="center-welcome-zone">
               <div class="welcome-character-box">
                 <SpeechBubble 
                    v-if="props.latestAiMessage" 
                    :text="props.latestAiMessage" 
                    @typing-end="$emit('typing-end')" 
                 />
                 <AiAvatar :emotion="props.currentEmotion" :character="props.currentCharacter" />
               </div>
               <div class="welcome-text">{{ welcomeGreeting }}</div>
            </div>
            
            <div v-for="(msg, index) in props.messages" :key="index" :class="['message-row', msg.role]">
              <img 
                :src="msg.role === 'user' ? '/image/qian/normal.png' : '/image/qian/happy.png'" 
                alt="avatar" 
                class="msg-avatar" 
              />
              <div class="msg-bubble">
                <div v-if="msg.role === 'assistant'" class="ai-header">
                  千千同学 <span class="time">10:30</span>
                </div>
                {{ msg.content }}
                
                <!-- 模拟卡片逻辑 -->
                <div class="ai-summary-card" v-if="msg.role === 'assistant' && msg.content.includes('策划')">
                  <div class="sum-item">⛅ 今天天气：多云转晴 22℃ ~ 28℃</div>
                  <div class="sum-item">📅 提醒已创建：今天 15:00 开会</div>
                  <div class="sum-item">📍 导航已准备：前往「花艺教室」</div>
                </div>
              </div>
            </div>

            <!-- 思考中状态 -->
            <div v-if="props.isThinking" class="message-row assistant">
              <img src="/image/qian/think.png" alt="qian" class="msg-avatar" />
              <div class="msg-bubble thinking-dots">
                <span class="dot"></span><span class="dot"></span><span class="dot"></span>
              </div>
            </div>
          </div>

          <!-- 对话进行时的浮动交互人物 (固定在对话区中心/右侧，根据 222.png 逻辑) -->
          <div v-if="props.messages.length > 0" class="floating-side-character">
             <SpeechBubble 
                v-if="props.latestAiMessage && props.isTyping" 
                :text="props.latestAiMessage" 
                @typing-end="$emit('typing-end')" 
             />
             <AiAvatar :emotion="props.currentEmotion" :character="props.currentCharacter" />
          </div>

          <div class="chat-input-area">
            <div 
                class="input-box-container"
                :class="{ 'is-disabled': props.isThinking || props.isTyping }"
                @click="textareaRef?.focus()"
              >
              <div class="input-main">
                <textarea 
                  ref="textareaRef"
                  v-model="inputVal"
                  @keydown="handleKeydown"
                  placeholder="输入消息, Enter 发送, Shift + Enter 换行" 
                  :disabled="props.isThinking || props.isTyping"
                  rows="1"
                ></textarea>
              </div>
              
              <div class="input-toolbar">
                <div class="tools-left">
                  <button class="tool-btn" @click.stop><span class="icon">🌐</span> 联网搜索</button>
                  <button class="tool-btn" @click.stop><span class="icon">📎</span> 附件</button>
                  <button class="tool-btn" @click.stop><span class="icon">🧩</span> 插件</button>
                </div>
                <div class="tools-right">
                  <div class="model-selector">
                    <span class="model-badge">GPT-4o</span>
                    <span class="chevron">⌄</span>
                  </div>
                  <button class="voice-btn" @click.stop>🎤</button>
                  <button 
                    class="send-btn" 
                    @click.stop="handleSend" 
                    :disabled="!inputVal.trim() || props.isThinking || props.isTyping"
                  >
                    <span class="send-icon">🚀</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 右侧：挂件区域 -->
      <aside class="qian-right-col">
        <div class="widget glass-panel weather-widget">
          <div class="widget-header">今日天气 <span class="loc">杭州市 · 西湖区 ⌄</span></div>
          <div class="weather-main">
            <div class="weather-icon">☀️</div>
            <div class="temp">24<span class="unit">℃</span></div>
            <div class="cond">多云转晴</div>
          </div>
          <div class="weather-details">
            <div class="det-item"><span>22℃ / 28℃</span><div class="lbl">温度</div></div>
            <div class="det-item"><span>63%</span><div class="lbl">湿度</div></div>
            <div class="det-item"><span>东南风 2级</span><div class="lbl">风向</div></div>
            <div class="det-item"><span class="aqi">28</span><div class="lbl">空气优</div></div>
          </div>
        </div>

        <div class="widget glass-panel map-widget">
          <div class="widget-header">我的位置 / 地图 <span class="link">查看大图</span></div>
          <div class="map-preview">
            <div class="map-pin">📍</div>
          </div>
          <div class="loc-desc">我在 杭州市西湖区文一西路 518 号</div>
          <div class="loc-meta">精度: ±15m • 更新时间: 10:30</div>
        </div>

        <div class="widget glass-panel schedule-widget">
          <div class="widget-header">日程提醒 <span class="link">查看全部</span></div>
          <div class="sch-item">
            <div class="sch-time">15:00<div class="day">今天</div></div>
            <div class="sch-info">开会：花艺社团例会 <span class="tag">即将开始</span></div>
          </div>
          <div class="sch-item">
            <div class="sch-time">19:30<div class="day">今天</div></div>
            <div class="sch-info">花艺课程：色彩搭配</div>
          </div>
        </div>
      </aside>
    </div>

    <!-- 底部：API 工具服务 -->
    <footer class="qian-footer">
      <div class="footer-title">常用工具 / API 服务</div>
      <div class="tools-grid">
        <div class="tool-card glass-panel">
          <div class="tool-icon bg-purple">📷</div>
          <div class="tool-meta">
            <div class="tool-name">拍照识别</div>
            <div class="tool-desc">识别花卉、植物、物体、文字等</div>
          </div>
          <img src="/image/qian/curious.png" alt="sticker" class="card-sticker" loading="lazy" decoding="async" />
        </div>
        <div class="tool-card glass-panel">
          <div class="tool-icon bg-blue">📅</div>
          <div class="tool-meta">
            <div class="tool-name">课程表 / 日程</div>
            <div class="tool-desc">查看课程表、管理日程与提醒</div>
          </div>
          <img src="/image/qian/expect.png" alt="sticker" class="card-sticker" loading="lazy" decoding="async" />
        </div>
        <div class="tool-card glass-panel">
          <div class="tool-icon bg-pink">A</div>
          <div class="tool-meta">
            <div class="tool-name">翻译助手</div>
            <div class="tool-desc">多语言互译，支持文本与语音</div>
          </div>
          <img src="/image/qian/listen.png" alt="sticker" class="card-sticker" loading="lazy" decoding="async" />
        </div>
        <div class="tool-card glass-panel">
          <div class="tool-icon bg-indigo">📄</div>
          <div class="tool-meta">
            <div class="tool-name">文档总结</div>
            <div class="tool-desc">上传文档，智能提炼重点摘要</div>
          </div>
          <img src="/image/qian/cool.png" alt="sticker" class="card-sticker" loading="lazy" decoding="async" />
        </div>
        <div class="tool-card glass-panel">
          <div class="tool-icon bg-green">🎙️</div>
          <div class="tool-meta">
            <div class="tool-name">语音对话</div>
            <div class="tool-desc">语音交流，实时识别与回复</div>
          </div>
          <img src="/image/qian/happy.png" alt="sticker" class="card-sticker" loading="lazy" decoding="async" />
        </div>
        <div class="tool-card glass-panel">
          <div class="tool-icon bg-gray">🎲</div>
          <div class="tool-meta">
            <div class="tool-name">更多工具</div>
            <div class="tool-desc">更多实用工具持续更新中</div>
          </div>
          <img src="/image/qian/surpise.png" alt="sticker" class="card-sticker" loading="lazy" decoding="async" />
        </div>
        <div class="tool-card glass-panel wish-trigger-card" @click="showWishBottle = true">
          <div class="tool-icon bg-gold">🌟</div>
          <div class="tool-meta">
            <div class="tool-name">许愿瓶</div>
            <div class="tool-desc">写下心愿，千千帮你守护</div>
          </div>
          <img src="/image/qian/expect.png" alt="sticker" class="card-sticker" loading="lazy" decoding="async" />
        </div>
      </div>
    </footer>

    <!-- 许愿瓶弹窗 -->
    <Teleport to="body">
      <div v-if="showWishBottle" class="wish-overlay" @click.self="showWishBottle = false">
        <div class="wish-modal glass-panel">
          <div class="wish-modal-header">
            <div class="wish-modal-title">🌟 许愿瓶</div>
            <button class="wish-close-btn" @click="showWishBottle = false">✕</button>
          </div>
          <div class="wish-input-area">
            <textarea
              v-model="wishInput"
              placeholder="写下你的心愿吧..."
              class="wish-textarea"
              maxlength="100"
              rows="3"
            ></textarea>
            <div class="wish-chars">{{ wishInput.length }}/100</div>
          </div>
          <button class="wish-submit-btn" @click="submitWish" :disabled="!wishInput.trim() || wishSubmitted">
            <template v-if="wishSubmitted">千千已收到你的心愿 💫</template>
            <template v-else>投进许愿瓶 🌟</template>
          </button>
          <div v-if="wishReply" class="wish-reply">{{ wishReply }}</div>
          <div v-if="savedWishes.length > 0" class="wish-history">
            <div class="wish-history-title">已许下的心愿 ({{ savedWishes.length }})</div>
            <div v-for="(w, idx) in savedWishes" :key="idx" class="wish-history-item">
              <span class="wish-star">⭐</span>
              <span>{{ w.text }}</span>
            </div>
          </div>
          <div class="wish-floating-sticker">
            <img src="/image/qian/wink.png" alt="qian" class="wish-qian-sticker" />
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import AiAvatar from './AiAvatar.vue'
import SpeechBubble from './SpeechBubble.vue'
import PetalFall from './PetalFall.vue'

const props = defineProps({
  messages: Array,
  isThinking: Boolean,
  isTyping: Boolean,
  currentEmotion: String,
  latestAiMessage: String,
  currentCharacter: String,
  currentPage: {
    type: String,
    default: 'home'
  },
  weatherToday: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['switch-character', 'send', 'typing-end', 'page-change'])
const historyRef = ref(null)
const inputVal = ref('')
const textareaRef = ref(null)

const welcomeGreeting = computed(() => {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 12) {
    return '早上好呀，今天阳光正好，一起开启美好的一天吧 ☀️'
  } else if (hour >= 12 && hour < 18) {
    return '下午好～记得喝杯茶休息一下，我一直在这里陪你 🌸'
  } else if (hour >= 18 && hour < 22) {
    return '晚上好，今天过得怎么样？无论好坏都可以跟我说说 ✨'
  } else {
    return '夜深了，别太累哦。我在呢，晚安好梦 🌙'
  }
})

const FIRST_VISIT_KEY = 'qian_garden_visited'
const FIRST_VISIT_MSG = '这里是一座只为你盛开的花园。无论开心还是难过，我都会在这里，听你说每一句话，陪你度过每一个瞬间。'

const showFirstVisit = ref(false)
const typewriterDisplay = ref('')
const typewriterDone = ref(false)

const startTypewriter = () => {
  let i = 0
  typewriterDisplay.value = ''
  typewriterDone.value = false
  const timer = setInterval(() => {
    typewriterDisplay.value += FIRST_VISIT_MSG[i]
    i++
    if (i >= FIRST_VISIT_MSG.length) {
      clearInterval(timer)
      typewriterDone.value = true
    }
  }, 80)
}

const dismissFirstVisit = () => {
  if (!typewriterDone.value) return
  showFirstVisit.value = false
  try {
    localStorage.setItem(FIRST_VISIT_KEY, '1')
  } catch (e) { /* ignore */ }
}

onMounted(() => {
  let visited = false
  try {
    visited = localStorage.getItem(FIRST_VISIT_KEY) === '1'
  } catch (e) { /* ignore */ }
  if (!visited) {
    showFirstVisit.value = true
    setTimeout(startTypewriter, 400)
  }
})

const FLOWER_QUOTES = [
  '每一朵花都有它盛开的时节，你也一样 🌷',
  '不用追赶太阳，你本身就是一束光 ✨',
  '今天也要像向日葵一样，面朝阳光 🌻',
  '温柔是这个世界最强大的力量 🌸',
  '花会沿路盛开，你的未来也是 🌺',
  '保持热爱，奔赴你的花海 💐',
  '你笑起来的样子，比花还好看 😊',
  '风会记得每一朵花的香 🌬️',
  '不必成为玫瑰，做你自己的花 🌼',
  '世界很大，但你是独一无二的 🌍',
  '今天的你，也是闪闪发光的 ⭐',
  '慢慢来，花不是一天盛开的 🌱',
  '把烦恼都种进土里，会长出快乐 🌿',
  '你是四月天里最温柔的风 🍃',
  '即使微小如雏菊，也有自己的春天 🌾',
  '每一天都是新的花期，尽情绽放吧 🌷',
  '愿你被世界温柔以待 💫',
  '雨后的彩虹，是你微笑的弧度 🌈',
  '星星会说话，石头会开花 🌟',
  '生活明朗，万物可爱，人间值得 💖',
  '把日子过成诗，把生活过成花 🌸',
  '月光落在你肩上，温柔了时光 🌙',
  '你值得世间所有的美好 💎',
  '心若向阳，无畏悲伤 ☀️',
  '像樱花一样，在最美的时刻绽放 🌸',
  '岁月漫长，然而值得等待 ⏳',
  '种自己的花，爱自己的宇宙 🪐',
  '你是藏在云层里的月亮 🌛',
  '愿你此生尽兴，赤诚善良 🎀',
  '春天会来，你也会越来越好 🌿',
  '总有一个人，会为你翻山越岭而来 🏔️'
]

const dailyFlowerQuote = computed(() => {
  const day = new Date().getDate() - 1
  return FLOWER_QUOTES[day % FLOWER_QUOTES.length]
})

const weatherBanner = computed(() => {
  const text = (props.weatherToday.summary || '') + (props.weatherToday.description || '')
  const lower = text.toLowerCase()
  if (lower.includes('雨') || lower.includes('rain')) {
    return { show: true, type: 'rain', icon: '🌧️', text: '下雨了，记得带伞哦 🌂 千千在这里陪你' }
  }
  if (lower.includes('雪') || lower.includes('snow')) {
    return { show: true, type: 'snow', icon: '❄️', text: '下雪了，多穿点衣服，别着凉啦 ⛄' }
  }
  if (lower.includes('晴') || lower.includes('clear') || lower.includes('sun')) {
    return { show: true, type: 'sun', icon: '☀️', text: '今天阳光正好，适合出去走走哦 🌻' }
  }
  if (lower.includes('阴') || lower.includes('cloud')) {
    return { show: false, type: '', icon: '', text: '' }
  }
  return { show: false, type: '', icon: '', text: '' }
})

const GARDEN_KEY = 'qian_garden_msg_count'
const MAX_FLOWERS = 12

const updateGardenFromMessages = () => {
  const msgs = props.messages || []
  if (!msgs.length) return
  try {
    localStorage.setItem(GARDEN_KEY, String(msgs.length))
  } catch (e) { /* ignore */ }
}

watch(() => (props.messages || []).length, updateGardenFromMessages)

const gardenFlowerCount = computed(() => {
  try {
    const raw = localStorage.getItem(GARDEN_KEY)
    const count = raw ? parseInt(raw, 10) : 0
    return Math.min(Math.floor(count / 3), MAX_FLOWERS)
  } catch (e) {
    return 0
  }
})

const showWishBottle = ref(false)
const wishInput = ref('')
const wishSubmitted = ref(false)
const wishReply = ref('')
const savedWishes = ref([])

const WISHES_KEY = 'qian_garden_wishes'

const loadWishes = () => {
  try {
    savedWishes.value = JSON.parse(localStorage.getItem(WISHES_KEY) || '[]')
  } catch (e) {
    savedWishes.value = []
  }
}

const submitWish = () => {
  if (!wishInput.value.trim() || wishSubmitted.value) return
  const text = wishInput.value.trim()
  savedWishes.value.push({ text, date: new Date().toLocaleDateString('zh-CN') })
  try {
    localStorage.setItem(WISHES_KEY, JSON.stringify(savedWishes.value))
  } catch (e) { /* ignore */ }
  wishSubmitted.value = true
  wishReply.value = '我收到啦，会帮你守护这个愿望 🌟'
  setTimeout(() => {
    wishSubmitted.value = false
    wishInput.value = ''
    wishReply.value = ''
  }, 3000)
}

loadWishes()

const handleSend = () => {
  if (inputVal.value.trim() && !props.isThinking && !props.isTyping) {
    emit('send', inputVal.value.trim())
    inputVal.value = ''
    // 发送后重置高度
    if (textareaRef.value) {
      textareaRef.value.style.height = 'auto'
    }
  }
}

const handleKeydown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}

// 自动调整高度逻辑
watch(inputVal, async () => {
  await nextTick()
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height = Math.min(textareaRef.value.scrollHeight, 150) + 'px'
  }
})

// 自动滚动到底部
const scrollToBottom = async () => {
  await nextTick()
  if (historyRef.value) {
    historyRef.value.scrollTop = historyRef.value.scrollHeight
  }
}

watch(() => props.messages, scrollToBottom, { deep: true })
watch(() => props.isThinking, scrollToBottom)

onMounted(scrollToBottom)
</script>

<style scoped>
.qian-dashboard {
  position: relative;
  width: 100vw;
  min-height: 100vh; /* 改为最小高度，允许内容撑开 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  color: #5a4b81;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow-y: auto; /* 允许整体垂直滚动 */
  overflow-x: hidden;
}

.glass-panel {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20px);
  border: 1.5px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(157, 120, 210, 0.08);
}

/* 顶部导航 */
.qian-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 30px;
}

.character-switch-container {
  margin-left: 10px;
  display: flex;
  gap: 8px;
}

.switch-to-asuka, .switch-to-campus {
  background: rgba(124, 92, 255, 0.05);
  border: 1px solid rgba(124, 92, 255, 0.2);
  padding: 5px 12px;
  border-radius: 12px;
  color: #7c5cff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s;
}

.switch-to-asuka:hover, .switch-to-campus:hover {
  background: #7c5cff;
  color: white;
}

.switch-to-campus {
  color: #ff7850;
  border-color: rgba(255, 120, 80, 0.3);
  background: rgba(255, 120, 80, 0.05);
}

.switch-to-campus:hover {
  background: #ff7850;
  border-color: #ff7850;
}

.qian-logo {
  display: flex;
  flex-direction: column;
}
.logo-text-top { font-size: 18px; font-weight: 800; letter-spacing: 1px; color: #7c5cff; }
.logo-text-bottom { font-size: 14px; color: #8a73b5; }
.sparkle { color: #ffeb3b; }

.qian-nav {
  display: flex;
  background: rgba(255, 255, 255, 0.5);
  padding: 6px;
  border-radius: 30px;
  gap: 5px;
}
.nav-item {
  padding: 8px 18px;
  border-radius: 25px;
  border: none;
  background: transparent;
  text-decoration: none;
  color: #8a73b5;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s;
  cursor: pointer;
}
.nav-item.active { background: #7c5cff; color: white; }
.nav-item:hover:not(.active) { background: rgba(124, 92, 255, 0.1); }

.header-right { display: flex; align-items: center; gap: 20px; }
.notif-btn { font-size: 20px; cursor: pointer; }
.user-pill {
  background: white;
  padding: 5px 15px 5px 5px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
.user-thumb { width: 32px; height: 32px; border-radius: 50%; }
.user-name { font-size: 14px; font-weight: bold; }
.user-lv { font-size: 11px; background: #e2d4f5; padding: 1px 6px; border-radius: 10px; color: #7c5cff; width: fit-content; }

/* 主网格 */
.qian-main-grid {
  flex: 1;
  position: relative;
  display: grid;
  grid-template-columns: 280px 1fr 300px;
  gap: 20px;
  padding: 20px 30px;
  /* 移除 overflow: hidden，允许随内容增长 */
}

.qian-sticker-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 3;
}

.floating-page-sticker {
  position: absolute;
  object-fit: contain;
  filter: drop-shadow(0 12px 24px rgba(124, 92, 255, 0.16));
  opacity: 0.98;
}

.sticker-one {
  left: 212px;
  top: 78px;
  width: 92px;
}

.sticker-two {
  right: 222px;
  top: 92px;
  width: 108px;
}

.sticker-three {
  right: 78px;
  bottom: 64px;
  width: 120px;
}

/* 左侧栏 */
.qian-left-col { display: flex; flex-direction: column; gap: 20px; flex-shrink: 0; }
.portrait-card { padding: 20px; display: flex; flex-direction: column; gap: 15px; }
.main-portrait-static { width: 100%; display: block; border-radius: 15px; }

.interactive-avatar {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  /* 调整气泡在卡片内的位置 */
  --avatar-size: 180px;
  --bubble-scale: 0.75;
  --bubble-top: -60px;
  --bubble-right: -20px;
}

.center-welcome-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;
  gap: 30px;
}

.welcome-character-box {
  position: relative;
  --avatar-size: 260px;
  --bubble-scale: 1;
}

.welcome-text {
  font-size: 22px;
  font-weight: bold;
  color: #7c5cff;
  text-shadow: 0 2px 10px rgba(124, 92, 255, 0.1);
}

.floating-side-character {
  position: absolute;
  right: 20px;
  bottom: 140px; /* 输入框上方 */
  z-index: 1500;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  --avatar-size: 160px;
  --bubble-scale: 0.8;
}

.bubble-interactive-avatar {
  position: absolute;
  right: -80px;
  bottom: -20px;
  --avatar-size: 120px;
  --bubble-scale: 0.6;
}
.char-meta { font-size: 18px; font-weight: bold; }
.char-desc { font-size: 13px; color: #8a73b5; }
.lv-progress { margin-top: 10px; }
.lv-text { font-size: 12px; font-weight: bold; margin-bottom: 5px; }
.progress-bar { height: 6px; background: #e2d4f5; border-radius: 3px; overflow: hidden; }
.progress-fill { height: 100%; background: linear-gradient(to right, #7c5cff, #9d78d2); }
.exp-text { font-size: 11px; color: #8a73b5; text-align: right; margin-top: 3px; }
.quote-box {
  background: rgba(124, 92, 255, 0.05);
  padding: 12px; border-radius: 12px; font-size: 13px; line-height: 1.5; font-style: italic;
}
.quote-mark { color: #7c5cff; font-size: 24px; position: absolute; opacity: 0.2; }

.energy-card { padding: 12px; }
.energy-stats { display: flex; justify-content: space-between; margin-top: 10px; }
.stat-item { text-align: center; }
.stat-item .val { font-size: 18px; font-weight: bold; color: #7c5cff; }
.stat-item .lbl { font-size: 11px; color: #8a73b5; }

.flower-card { padding: 12px; position: relative; }
.flower-count { font-size: 28px; font-weight: 900; color: #7c5cff; }
.flower-count .unit { font-size: 14px; font-weight: normal; }
.flower-img { width: 80px; position: absolute; right: 10px; bottom: 10px; opacity: 0.8; }

/* 中间栏 */
.qian-center-col { 
  display: flex; 
  flex-direction: column;
  position: relative;
  min-height: 600px;
}
.chat-container { 
  flex: 1; 
  display: flex; 
  flex-direction: column; 
  background: rgba(255, 255, 255, 0.4);
  position: relative;
  border-radius: 20px;
  overflow: hidden; /* 内部容器保持圆角裁切 */
}
.chat-header {
  padding: 15px 25px; 
  border-bottom: 1px solid rgba(124, 92, 255, 0.1);
  display: flex; 
  justify-content: space-between; 
  align-items: center;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(5px);
  flex-shrink: 0;
}
.chat-title { font-weight: bold; font-size: 16px; }
.chat-subtitle { font-size: 11px; font-weight: normal; color: #8a73b5; margin-top: 2px; }
.chat-actions { display: flex; gap: 10px; }
.new-chat-btn {
  background: #7c5cff; color: white; border: none; padding: 6px 15px;
  border-radius: 20px; font-size: 13px; cursor: pointer;
}

.chat-history {
  height: 500px; /* 给对话历史一个固定或最大高度，或者由内容撑开 */
  overflow-y: auto;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.message-row { display: flex; gap: 15px; max-width: 85%; position: relative; }
.message-row.user { align-self: flex-end; flex-direction: row-reverse; }
.msg-avatar { width: 40px; height: 40px; border-radius: 50%; border: 2px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
.msg-bubble {
  background: white; padding: 15px; border-radius: 18px; font-size: 15px; line-height: 1.6;
  box-shadow: 0 4px 15px rgba(124, 92, 255, 0.05);
  position: relative;
}
.message-row.user .msg-bubble { background: #7c5cff; color: white; border-bottom-right-radius: 4px; }
.message-row.assistant .msg-bubble { background: white; border-bottom-left-radius: 4px; }
.ai-header { font-weight: bold; font-size: 13px; margin-bottom: 5px; display: flex; justify-content: space-between; }
.ai-header .time { font-weight: normal; color: #8a73b5; font-size: 11px; }
.ai-summary-card {
  margin-top: 15px; padding-top: 15px; border-top: 1px dashed #e2d4f5;
  display: flex; flex-direction: column; gap: 8px; font-size: 13px; color: #7c5cff;
}

.thinking-dots { display: flex; align-items: center; gap: 4px; padding: 10px 20px; }
.thinking-dots .dot { width: 6px; height: 6px; background-color: #d1c4e9; border-radius: 50%; animation: typingBounce 1.4s infinite both; }
.thinking-dots .dot:nth-child(1) { animation-delay: -0.32s; }
.thinking-dots .dot:nth-child(2) { animation-delay: -0.16s; }
@keyframes typingBounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }

.chat-empty-hint { text-align: center; color: #8a73b5; margin-top: 50px; font-style: italic; }

.chat-input-area { 
  flex-shrink: 0;
  padding: 10px 20px 20px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(124, 92, 255, 0.05);
  z-index: 1000;
}

.input-box-container {
  background: #ffffff; 
  border-radius: 20px; 
  padding: 12px 16px;
  box-shadow: 0 4px 20px rgba(124, 92, 255, 0.12); 
  transition: all 0.3s ease;
  border: 2px solid #b07dff; 
  display: flex; 
  flex-direction: column;
  min-height: 100px;
  /* 移除 transform，回归正常布局流 */
}

.input-box-container:focus-within {
  border-color: #7c5cff;
  box-shadow: 0 8px 30px rgba(124, 92, 255, 0.12);
  background: #fff;
}

.input-box-container.is-disabled {
  background: #f5f5f7;
  border-color: #eee;
  opacity: 0.8;
  cursor: not-allowed;
}

.input-main {
  flex: 1;
  display: flex;
  margin-bottom: 8px;
}

.input-main textarea {
  width: 100%; 
  border: none; 
  outline: none; 
  font-size: 15px; 
  resize: none;
  font-family: inherit;
  line-height: 1.5;
  max-height: 120px;
  background: transparent;
  color: #443b5a;
  padding: 5px 0;
}

.input-main textarea::placeholder {
  color: #b0a4cc;
}

.input-toolbar { 
  display: flex; 
  justify-content: space-between; 
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid rgba(124, 92, 255, 0.05);
}

.tools-left { display: flex; gap: 8px; }

.tool-btn {
  background: rgba(124, 92, 255, 0.05); 
  border: none; 
  padding: 6px 12px; 
  border-radius: 12px;
  font-size: 12px; 
  color: #7c5cff; 
  cursor: pointer; 
  display: flex; 
  align-items: center; 
  gap: 5px;
  font-weight: 500;
  transition: all 0.2s;
}

.tool-btn:hover {
  background: rgba(124, 92, 255, 0.12);
}

.tools-right { display: flex; align-items: center; gap: 12px; }

.model-selector { 
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f8f6ff;
  padding: 6px 12px;
  border-radius: 12px;
  cursor: pointer;
  border: 1px solid #eee;
}

.model-badge {
  font-size: 12px;
  font-weight: 600;
  color: #5a4b81;
}

.model-selector .chevron {
  font-size: 10px;
  color: #8a73b5;
}

.voice-btn { 
  background: none; 
  border: none; 
  font-size: 18px; 
  cursor: pointer; 
  opacity: 0.7;
  transition: opacity 0.2s;
}
.voice-btn:hover { opacity: 1; }

.send-btn {
  background: #7c5cff; 
  color: white; 
  border: none; 
  width: 40px; 
  height: 40px;
  border-radius: 14px; 
  cursor: pointer; 
  display: flex; 
  align-items: center; 
  justify-content: center;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(124, 92, 255, 0.3);
}

.send-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(124, 92, 255, 0.4);
  background: #6a49f5;
}

.send-btn:disabled {
  background: #d1c4e9;
  box-shadow: none;
  cursor: not-allowed;
}

.send-icon {
  font-size: 18px;
}

/* 右侧栏 */
.qian-right-col { display: flex; flex-direction: column; gap: 20px; flex-shrink: 0; }
.widget { padding: 15px; }
.widget-header { font-size: 14px; font-weight: bold; margin-bottom: 15px; display: flex; justify-content: space-between; }
.widget-header .loc, .widget-header .link { font-weight: normal; font-size: 11px; color: #8a73b5; cursor: pointer; }

.weather-main { display: flex; align-items: center; gap: 15px; margin-bottom: 15px; }
.weather-icon { font-size: 40px; }
.temp { font-size: 36px; font-weight: bold; color: #7c5cff; }
.temp .unit { font-size: 18px; }
.cond { font-size: 14px; font-weight: bold; }
.weather-details { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.det-item span { font-size: 13px; font-weight: bold; }
.det-item .lbl { font-size: 11px; color: #8a73b5; }
.aqi { color: #4caf50; }

.map-preview {
  height: 120px; background: #e2d4f5; border-radius: 10px; margin-bottom: 10px;
  display: flex; align-items: center; justify-content: center; font-size: 24px;
}
.loc-desc { font-size: 13px; font-weight: bold; line-height: 1.4; }
.loc-meta { font-size: 11px; color: #8a73b5; margin-top: 5px; }

.sch-item { display: flex; gap: 15px; margin-bottom: 15px; }
.sch-time { text-align: center; min-width: 45px; }
.sch-time { font-size: 16px; font-weight: bold; color: #7c5cff; }
.sch-time .day { font-size: 10px; font-weight: normal; color: #8a73b5; }
.sch-info { font-size: 13px; font-weight: bold; line-height: 1.4; }
.sch-info .tag { background: rgba(255, 60, 24, 0.1); color: #ff3c18; font-size: 10px; padding: 1px 5px; border-radius: 4px; margin-left: 5px; }

/* 底部工具 */
.qian-footer { padding: 0 30px 20px; flex-shrink: 0; }
.footer-title { font-size: 15px; font-weight: bold; margin-bottom: 15px; }
.tools-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 12px; }
.card-sticker {
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 50px;
  opacity: 0.9;
  pointer-events: none;
}

.weather-banner {
  position: relative;
  z-index: 10;
  padding: 10px 24px;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  animation: bannerSlideDown 0.5s ease;
}

.weather-banner.rain {
  background: linear-gradient(90deg, rgba(100, 140, 200, 0.85), rgba(80, 120, 190, 0.85));
}

.weather-banner.snow {
  background: linear-gradient(90deg, rgba(180, 210, 240, 0.85), rgba(160, 200, 235, 0.85));
  color: #3a4a6a;
}

.weather-banner.sun {
  background: linear-gradient(90deg, rgba(255, 180, 80, 0.85), rgba(255, 150, 50, 0.85));
}

.weather-banner-icon {
  margin-right: 8px;
  font-size: 18px;
}

@keyframes bannerSlideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.garden-card {
  padding: 14px;
  margin-top: 12px;
}

.garden-title {
  font-size: 14px;
  font-weight: 700;
  color: #7c5cff;
  margin-bottom: 10px;
}

.garden-flowers {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  min-height: 30px;
  align-items: center;
}

.garden-flower {
  font-size: 18px;
  animation: flowerBloom 0.4s ease both;
}

@keyframes flowerBloom {
  from { opacity: 0; transform: scale(0) rotate(-10deg); }
  to { opacity: 1; transform: scale(1) rotate(0); }
}

.garden-empty {
  font-size: 12px;
  color: #8a73b5;
  font-style: italic;
}

.garden-count {
  margin-top: 8px;
  font-size: 12px;
  color: #7c5cff;
  font-weight: 600;
}

.wish-trigger-card {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.08), rgba(255, 180, 50, 0.12)) !important;
  border-color: rgba(255, 200, 50, 0.3) !important;
}

.bg-gold {
  background: linear-gradient(135deg, #ffd700, #ffb830);
  color: #fff;
}

.wish-overlay {
  position: fixed;
  inset: 0;
  z-index: 100000;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: overlayFadeIn 0.3s ease;
}

.wish-modal {
  position: relative;
  background: rgba(255, 255, 255, 0.96);
  border-radius: 24px;
  padding: 32px;
  max-width: 440px;
  width: 90%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(124, 92, 255, 0.2);
  animation: cardRise 0.4s ease 0.1s both;
}

.wish-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.wish-modal-title {
  font-size: 22px;
  font-weight: 800;
  color: #7c5cff;
}

.wish-close-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: #aaa;
  cursor: pointer;
}

.wish-input-area {
  position: relative;
  margin-bottom: 16px;
}

.wish-textarea {
  width: 100%;
  border: 2px solid rgba(124, 92, 255, 0.2);
  border-radius: 14px;
  padding: 14px;
  font-size: 15px;
  font-family: inherit;
  resize: none;
  outline: none;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.wish-textarea:focus {
  border-color: #7c5cff;
}

.wish-chars {
  text-align: right;
  font-size: 11px;
  color: #8a73b5;
  margin-top: 4px;
}

.wish-submit-btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #7c5cff, #9d78d2);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

.wish-submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(124, 92, 255, 0.3);
}

.wish-submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  color: #fff;
}

.wish-reply {
  text-align: center;
  margin-top: 14px;
  font-size: 15px;
  color: #7c5cff;
  font-weight: 600;
  animation: wishReplyFade 0.5s ease;
}

@keyframes wishReplyFade {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

.wish-history {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(124, 92, 255, 0.1);
}

.wish-history-title {
  font-size: 13px;
  color: #8a73b5;
  margin-bottom: 12px;
  font-weight: 600;
}

.wish-history-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  font-size: 14px;
  color: #5a4b81;
  border-bottom: 1px dashed rgba(124, 92, 255, 0.08);
}

.wish-star {
  flex-shrink: 0;
}

.wish-floating-sticker {
  position: absolute;
  bottom: -20px;
  right: -20px;
  pointer-events: none;
}

.wish-qian-sticker {
  width: 80px;
  opacity: 0.8;
  animation: wishStickerFloat 3s ease-in-out infinite;
}

@keyframes wishStickerFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.first-visit-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  animation: overlayFadeIn 0.6s ease;
}

@keyframes overlayFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.first-visit-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 50px 40px;
  max-width: 520px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(124, 92, 255, 0.25);
  animation: cardRise 0.5s ease 0.2s both;
  cursor: default;
}

@keyframes cardRise {
  from { opacity: 0; transform: translateY(30px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.first-visit-sparkle {
  font-size: 48px;
  margin-bottom: 16px;
  animation: sparklePulse 2s infinite ease-in-out;
}

@keyframes sparklePulse {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.2) rotate(10deg); }
}

.first-visit-title {
  font-size: 26px;
  font-weight: 800;
  color: #7c5cff;
  margin-bottom: 24px;
  letter-spacing: 1px;
}

.first-visit-typewriter {
  font-size: 17px;
  color: #5a4b81;
  line-height: 1.9;
  min-height: 100px;
  text-align: left;
  padding: 0 10px;
}

.typewriter-cursor {
  color: #7c5cff;
  font-weight: bold;
}

.typewriter-cursor.blink {
  animation: cursorBlink 0.8s infinite;
}

@keyframes cursorBlink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.first-visit-hint {
  margin-top: 30px;
  font-size: 15px;
  color: #8a73b5;
  animation: hintFadeIn 0.6s ease;
}

@keyframes hintFadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.tool-card { padding: 15px; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: transform 0.2s; position: relative; overflow: hidden; }
.tool-card:hover { transform: translateY(-5px); }
.tool-icon {
  width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center;
  font-size: 20px; color: white; flex-shrink: 0;
}
.bg-purple { background: #7c5cff; }
.bg-blue { background: #2196f3; }
.bg-pink { background: #e91e63; }
.bg-indigo { background: #3f51b5; }
.bg-green { background: #4caf50; }
.bg-gray { background: #9e9e9e; }
.tool-name { font-size: 13px; font-weight: bold; }
.tool-desc { font-size: 10px; color: #8a73b5; margin-top: 2px; }

/* 自适应滚动条 */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(124, 92, 255, 0.2); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(124, 92, 255, 0.4); }

@media (max-width: 1400px) {
  .sticker-one {
    left: 188px;
    width: 82px;
  }

  .sticker-two {
    right: 188px;
    width: 96px;
  }

  .sticker-three {
    right: 56px;
    width: 108px;
  }
}

@media (max-width: 1200px) {
  .qian-sticker-layer {
    display: none;
  }
}
</style>
