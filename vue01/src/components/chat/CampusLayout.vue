<template>
  <div class="campus-dashboard" :style="{ backgroundImage: `url('/image/campusAsuka/微信图片_20260517232226_731_357.jpg')` }">
    <div class="campus-overlay"></div>
    <!-- 顶部导航栏 -->
    <header class="campus-header">
      <div class="header-left">
        <div class="campus-logo">
          <div class="logo-text-top"><span class="red-dot">●</span> 明日香校园 AI 助手</div>
          <div class="logo-text-bottom">你的校园生活全能搭子 <span class="sparkle">✦</span></div>
        </div>
      </div>
      <nav class="campus-nav">
        <a class="nav-item active" href="#"><span class="icon">🏠</span> 首页</a>
        <a class="nav-item" href="#"><span class="icon">💬</span> 对话</a>
        <a class="nav-item" href="#"><span class="icon">🏫</span> 校园导航</a>
        <a class="nav-item" href="#"><span class="icon">📍</span> 定位</a>
        <a class="nav-item" href="#"><span class="icon">⛅</span> 天气</a>
        <a class="nav-item" href="#"><span class="icon">📅</span> 日程</a>
        <a class="nav-item" href="#"><span class="icon">💠</span> API中心</a>
        <a class="nav-item" href="#"><span class="icon">⚙️</span> 设置</a>
      </nav>
      <div class="header-right">
        <div class="notif-btn">🔔 <span class="badge">3</span></div>
        <div class="user-pill" @click="$emit('switch-character', 'Asuka')">
          <img src="/image/campusAsuka/微信图片_20260517235327_733_357.png" alt="avatar" class="user-thumb" />
          <div class="user-info">
            <div class="user-name">明日香同学</div>
            <div class="user-lv">上海樱花校园 · 大一</div>
          </div>
          <span class="chevron">⌄</span>
        </div>
      </div>
    </header>

    <div class="campus-main-grid">
      <!-- 左侧：角色信息卡片 -->
      <aside class="campus-left-col">
        <div class="portrait-card campus-panel">
          <div class="portrait-box">
            <img src="/image/campusAsuka/微信图片_20260517235327_733_357.png" alt="Asuka" class="main-portrait-static" />
          </div>
          <div class="char-meta">
            <div class="char-name">明日香 Asuka <span class="campus-badge">校园AI助手</span></div>
            <div class="lv-progress">
              <div class="lv-text">Lv.2</div>
              <div class="progress-bar"><div class="progress-fill" style="width: 45%"></div></div>
              <div class="exp-text">320 / 600</div>
            </div>
          </div>
          <div class="quote-box">
            <span class="quote-mark">“</span>
            元气满满的一天，从有我陪伴开始吧！💪 ✨
          </div>
          <div class="stats-grid">
            <div class="stat-item"><div class="val">128 次</div><div class="lbl">对话次数</div></div>
            <div class="stat-item"><div class="val">56 件</div><div class="lbl">帮助解决</div></div>
            <div class="stat-item"><div class="val">14 天</div><div class="lbl">陪伴天数</div></div>
          </div>
        </div>
      </aside>

      <!-- 中间：对话区域 -->
      <section class="campus-center-col">
        <div class="chat-container campus-panel">
          <div class="chat-header">
            <div class="chat-title">
              <span class="status-dot">●</span>
              大模型对话中 · <span class="subtitle">Powered by 多模型混合驱动</span>
            </div>
            <div class="chat-actions">
              <button class="close-btn">×</button>
            </div>
          </div>

          <div class="chat-history" ref="historyRef">
            <div class="message-row user">
              <div class="user-avatar-placeholder">👤</div>
              <div class="msg-bubble">
                帮我查看今天上海天气，并提醒我下午三点上社团活动，还想查一下图书馆位置
                <span class="msg-time">10:28</span>
              </div>
            </div>

            <div class="message-row assistant">
              <img src="/image/campusAsuka/微信图片_20260517235327_733_357.png" alt="avatar" class="msg-avatar" />
              <div class="msg-bubble assistant-bubble">
                <div class="ai-header">好的！小事交给我 ~</div>
                <div class="campus-info-card">
                  <div class="info-item">⛅ 上海今天多云，气温 22~28℃，东南风 2 级，适合出行，记得随身带一件薄外套哦~</div>
                  <div class="info-item">📅 已为你创建 15:00 的社团活动提醒，届时我会准时提醒你！(已同步到你的日历)</div>
                  <div class="info-item">📍 图书馆位于校园东北角，靠近樱花大道，我为你准备了导航路线，点击下方卡片即可查看详情。</div>
                  <div class="info-item">需要我带你去吗？出发吧！🏃✨</div>
                </div>
                <span class="msg-time">10:28</span>
              </div>
            </div>

            <div v-for="(msg, index) in props.messages" :key="index" :class="['message-row', msg.role]">
              <div v-if="msg.role === 'user'" class="user-avatar-placeholder">👤</div>
              <img 
                v-else
                src="/image/campusAsuka/微信图片_20260517235327_733_357.png" 
                alt="avatar" 
                class="msg-avatar" 
              />
              <div class="msg-bubble" :class="{ 'assistant-bubble': msg.role === 'assistant' }">
                <div v-if="msg.role === 'assistant'" class="ai-header">好的！小事交给我 ~</div>
                {{ msg.content }}
              </div>
            </div>
          </div>

          <!-- 浮动交互人物与气泡框 (新增表情包切换联动) -->
          <div class="campus-interaction-zone">
             <div class="bubble-wrapper">
               <SpeechBubble 
                  v-if="props.latestAiMessage && props.isTyping" 
                  :text="props.latestAiMessage" 
                  @typing-end="$emit('typing-end')" 
               />
             </div>
             <div class="avatar-wrapper">
               <AiAvatar :emotion="props.currentEmotion" :character="'campus'" />
             </div>
          </div>

          <div class="suggestion-pills">
            <button class="pill">带我去图书馆</button>
            <button class="pill">社团活动详情</button>
            <button class="pill">明天的天气呢？</button>
            <button class="pill">附近有什么好吃的？</button>
          </div>

          <div class="chat-input-area">
            <div class="input-box-container">
              <div class="input-main">
                <input 
                  v-model="inputVal"
                  @keydown.enter="handleSend"
                  placeholder="输入你的问题，明日香帮你吧！" 
                  :disabled="props.isThinking || props.isTyping"
                />
                <div class="input-icons">
                  <span class="icon">📎</span>
                  <span class="icon">🎤</span>
                </div>
              </div>
              <button 
                class="send-btn" 
                @click="handleSend" 
                :disabled="!inputVal.trim() || props.isThinking || props.isTyping"
              >➤</button>
            </div>
          </div>
        </div>
      </section>

      <!-- 右侧：挂件区域 -->
      <aside class="campus-right-col">
        <div class="widget campus-panel weather-widget">
          <div class="widget-header">今日天气 <span class="tag">Weather API</span> <span class="pin">📌</span></div>
          <div class="weather-content">
            <div class="weather-main">
              <div class="weather-icon">☀️</div>
              <div class="temp">24<span class="unit">℃</span></div>
              <div class="cond">多云 | 空气优 32</div>
            </div>
            <div class="weather-range">22℃ ~ 28℃ | 东南风 2级 | 湿度 58%</div>
          </div>
        </div>

        <div class="widget campus-panel map-widget">
          <div class="widget-header">我的位置 <span class="tag">Maps API</span> <span class="refresh">🔄 刷新</span></div>
          <div class="map-container">
            <div class="map-placeholder">
              <div class="map-pin">📍</div>
            </div>
            <div class="map-info">
              <div class="loc-name">当前位置</div>
              <div class="loc-addr">樱花大道88号<br>明日香大学（主校区）</div>
              <button class="view-nearby">查看周边</button>
            </div>
          </div>
        </div>

        <div class="widget campus-panel schedule-widget">
          <div class="widget-header">日程提醒 <span class="tag">Calendar API</span> <span class="add-new">+ 新建</span></div>
          <div class="schedule-date">今天 5月20日 星期二</div>
          <div class="sch-item">
            <div class="sch-time">15:00<div class="sch-status">即将开始</div></div>
            <div class="sch-detail">
              <div class="sch-title">社团活动（动漫社）</div>
              <div class="sch-loc">大学生活动中心 · 3楼 会议室A</div>
            </div>
          </div>
          <div class="sch-item">
            <div class="sch-time">18:30</div>
            <div class="sch-detail">
              <div class="sch-title">高数作业截止</div>
              <div class="sch-loc">线上提交</div>
            </div>
          </div>
          <div class="view-all">查看完整日程 →</div>
        </div>
      </aside>
    </div>

    <!-- 底部：工具栏 -->
    <footer class="campus-footer">
      <div class="tools-grid">
        <div class="tool-card campus-panel">
          <div class="tool-header">
            <div class="tool-icon orange">📷</div>
            <div class="tool-name">拍照识别 <span class="tag">Vision API</span></div>
          </div>
          <div class="tool-desc">拍照识别物/试卷题目解析<br>植物识别 / 文档扫描</div>
          <button class="tool-btn">立即使用</button>
          <img src="/image/campusAsuka/微信图片_20260517235340_738_357.png" alt="sticker" class="tool-sticker" />
        </div>
        <div class="tool-card campus-panel">
          <div class="tool-header">
            <div class="tool-icon red">📅</div>
            <div class="tool-name">课程表 <span class="tag">School API</span></div>
          </div>
          <div class="tool-desc">查看本周课程安排<br>查询教室 / 考勤查询</div>
          <button class="tool-btn">查看课程表</button>
          <img src="/image/campusAsuka/微信图片_20260517235341_739_357.png" alt="sticker" class="tool-sticker" />
        </div>
        <div class="tool-card campus-panel">
          <div class="tool-header">
            <div class="tool-icon blue">A</div>
            <div class="tool-name">翻译助手 <span class="tag">Translate API</span></div>
          </div>
          <div class="tool-desc">中英互译 / 日语互译<br>多语种精准翻译</div>
          <button class="tool-btn">开始翻译</button>
          <img src="/image/campusAsuka/微信图片_20260517235348_743_357.png" alt="sticker" class="tool-sticker" />
        </div>
        <div class="tool-card campus-panel">
          <div class="tool-header">
            <div class="tool-icon yellow">📄</div>
            <div class="tool-name">文档总结 <span class="tag">LLM API</span></div>
          </div>
          <div class="tool-desc">论文 / 文章 / PPT 总结<br>重点提炼 / 思维导图</div>
          <button class="tool-btn">上传文档</button>
          <img src="/image/campusAsuka/微信图片_20260517235349_744_357.png" alt="sticker" class="tool-sticker" />
        </div>
        <div class="tool-card campus-panel">
          <div class="tool-header">
            <div class="tool-icon cyan">🎙️</div>
            <div class="tool-name">语音对话 <span class="tag">Voice API</span></div>
          </div>
          <div class="tool-desc">语音输入 / 语音问答<br>中英互译对话</div>
          <button class="tool-btn">开始对话</button>
          <img src="/image/campusAsuka/微信图片_20260517235352_745_357.png" alt="sticker" class="tool-sticker" />
        </div>
        <div class="tool-card campus-panel">
          <div class="tool-header">
            <div class="tool-icon purple">💠</div>
            <div class="tool-name">更多工具 <span class="tag">API Center</span></div>
          </div>
          <div class="tool-desc">连接更多 API 能力<br>解锁无限可能</div>
          <button class="tool-btn">前往 API 中心</button>
          <img src="/image/campusAsuka/微信图片_20260517235405_747_357.png" alt="sticker" class="tool-sticker" />
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import AiAvatar from './AiAvatar.vue'
import SpeechBubble from './SpeechBubble.vue'

const props = defineProps({
  messages: Array,
  isThinking: Boolean,
  isTyping: Boolean,
  currentEmotion: String,
  latestAiMessage: String,
  currentCharacter: String
})

const emit = defineEmits(['switch-character', 'send', 'typing-end'])
const historyRef = ref(null)
const inputVal = ref('')

const handleSend = () => {
  if (inputVal.value.trim() && !props.isThinking && !props.isTyping) {
    emit('send', inputVal.value.trim())
    inputVal.value = ''
  }
}

const scrollToBottom = async () => {
  await nextTick()
  if (historyRef.value) {
    historyRef.value.scrollTop = historyRef.value.scrollHeight
  }
}

watch(() => props.messages, scrollToBottom, { deep: true })
onMounted(scrollToBottom)
</script>

<style scoped>
.campus-dashboard {
  width: 100vw;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  color: #4a4a4a;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  position: relative;
}

.campus-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(2px);
  pointer-events: none;
}

.campus-panel {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.8);
  position: relative;
  z-index: 1;
}

/* Header */
.campus-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  background: white;
  position: sticky;
  top: 0;
  z-index: 100;
}

.campus-logo { display: flex; flex-direction: column; }
.logo-text-top { font-size: 20px; font-weight: 900; color: #ff5b35; display: flex; align-items: center; gap: 8px; }
.red-dot { font-size: 14px; }
.logo-text-bottom { font-size: 11px; color: #999; margin-left: 25px; }

.campus-nav { display: flex; gap: 20px; }
.nav-item {
  text-decoration: none; color: #333; font-weight: bold; font-size: 14px;
  display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 8px;
}
.nav-item.active { background: #ff5b35; color: white; }

.header-right { display: flex; align-items: center; gap: 20px; }
.notif-btn { font-size: 18px; position: relative; cursor: pointer; color: #333; }
.notif-btn .badge {
  position: absolute; top: -5px; right: -8px; background: #ff4d4f; color: white;
  font-size: 10px; padding: 0px 4px; border-radius: 10px;
}

.user-pill {
  display: flex; align-items: center; gap: 10px;
  padding: 4px; border-radius: 20px; cursor: pointer;
}
.user-thumb { width: 32px; height: 32px; border-radius: 50%; }
.user-name { font-size: 13px; font-weight: bold; }
.user-lv { font-size: 10px; color: #999; }

/* Main Content */
.campus-main-grid {
  flex: 1;
  display: grid;
  grid-template-columns: 240px 1fr 280px;
  gap: 15px;
  padding: 15px 40px;
  position: relative;
  z-index: 1;
}

/* Left Column */
.campus-left-col { display: flex; flex-direction: column; gap: 15px; }
.portrait-card { 
  padding: 15px; 
  transform: translateY(-50px); /* 进一步向上移动人物卡片 */
  position: relative;
  z-index: 10;
  margin-bottom: -40px; /* 补偿位移，防止下方出现大片空白 */
}
.main-portrait-static { width: 100%; border-radius: 8px; }
.char-name { font-size: 16px; font-weight: bold; display: flex; align-items: center; gap: 5px; }
.campus-badge { font-size: 10px; background: #fff1ed; color: #ff5b35; padding: 1px 6px; border-radius: 4px; border: 1px solid #ff5b35; }
.lv-progress { margin-top: 10px; }
.lv-text { font-size: 12px; font-weight: bold; color: #ff5b35; }
.progress-bar { height: 6px; background: #eee; border-radius: 3px; overflow: hidden; margin-top: 4px; }
.progress-fill { height: 100%; background: #ff5b35; }
.exp-text { font-size: 10px; color: #999; text-align: right; }
.quote-box { margin-top: 10px; font-size: 12px; color: #666; font-style: italic; background: #fffaf5; padding: 8px; border-radius: 6px; }
.stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; margin-top: 15px; padding-top: 10px; border-top: 1px dashed #eee; }
.stat-item { text-align: center; }
.stat-item .val { font-size: 13px; font-weight: bold; }
.stat-item .lbl { font-size: 10px; color: #999; }

/* Center Column */
.campus-center-col { display: flex; flex-direction: column; }
.chat-container { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.chat-header { padding: 12px 20px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
.status-dot { color: #ff5b35; margin-right: 5px; }
.chat-title { font-weight: bold; font-size: 14px; }
.subtitle { color: #999; font-weight: normal; font-size: 11px; }

.chat-history { 
  height: 480px; /* 固定高度，开启内部滚动 */
  overflow-y: auto; 
  padding: 20px; 
  display: flex; 
  flex-direction: column; 
  gap: 20px; 
}
.message-row { display: flex; gap: 12px; max-width: 90%; position: relative; }
.message-row.user { align-self: flex-end; flex-direction: row-reverse; }
.user-avatar-placeholder { width: 36px; height: 36px; border-radius: 50%; background: #eee; display: flex; align-items: center; justify-content: center; }
.msg-avatar { width: 40px; height: 40px; border-radius: 50%; }

.msg-bubble { padding: 12px 15px; border-radius: 12px; font-size: 14px; line-height: 1.5; position: relative; }
.message-row.user .msg-bubble { background: #ff5b35; color: white; border-top-right-radius: 0; }
.message-row.assistant .msg-bubble { background: white; border: 1.5px solid #ff5b35; border-top-left-radius: 0; color: #333; }

.msg-time { font-size: 10px; color: #999; margin-top: 5px; display: block; text-align: right; }
.ai-header { font-weight: bold; color: #333; margin-bottom: 5px; }

.campus-info-card { margin-top: 10px; display: flex; flex-direction: column; gap: 8px; }
.info-item { background: #fff5f2; padding: 10px; border-radius: 8px; font-size: 12px; border-left: 3px solid #ff5b35; }

.bubble-chibi { position: absolute; right: -40px; bottom: 0; width: 80px; }
.bubble-chibi img { width: 100%; }

.campus-interaction-zone {
  position: absolute;
  right: 20px;
  bottom: 100px; /* 调整位置，防止遮挡输入框 */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  pointer-events: none;
  z-index: 100;
}

.avatar-wrapper {
  --avatar-size: 150px;
  pointer-events: auto;
}

.bubble-wrapper {
  margin-bottom: -20px;
  margin-right: 40px;
  --bubble-scale: 0.8;
  --bubble-top: 0;
  --bubble-right: 0;
}

.suggestion-pills { padding: 0 20px 10px; display: flex; gap: 10px; overflow-x: auto; }
.pill { background: white; border: 1px solid #ff5b35; color: #ff5b35; padding: 5px 12px; border-radius: 20px; font-size: 12px; white-space: nowrap; cursor: pointer; }

.chat-input-area { padding: 15px 20px; border-top: 1px solid #eee; }
.input-box-container { display: flex; align-items: center; gap: 10px; background: #fff; border: 1.5px solid #ff5b35; padding: 8px 15px; border-radius: 12px; }
.input-main { flex: 1; display: flex; align-items: center; gap: 10px; }
.input-main input { flex: 1; border: none; outline: none; font-size: 14px; }
.input-icons { display: flex; gap: 10px; color: #999; font-size: 18px; }
.send-btn { background: #ff5b35; color: white; border: none; width: 36px; height: 36px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; }

/* Right Column Widgets */
.campus-right-col { display: flex; flex-direction: column; gap: 15px; }
.widget { padding: 15px; }
.widget-header { font-size: 13px; font-weight: bold; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; }
.tag { font-size: 9px; color: #999; font-weight: normal; border: 1px solid #eee; padding: 1px 5px; border-radius: 4px; }

.weather-main { display: flex; align-items: center; gap: 10px; }
.temp { font-size: 28px; font-weight: 900; color: #ff5b35; }
.weather-range { font-size: 10px; color: #999; margin-top: 5px; }

.map-placeholder { height: 80px; background: #eee; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
.map-info { margin-top: 10px; }
.loc-name { font-size: 12px; font-weight: bold; }
.loc-addr { font-size: 10px; color: #999; line-height: 1.4; }
.view-nearby { width: 100%; margin-top: 8px; padding: 5px; border: 1px solid #eee; background: white; border-radius: 6px; font-size: 11px; }

.sch-item { display: flex; gap: 10px; margin-bottom: 10px; }
.sch-time { font-size: 14px; font-weight: bold; color: #ff5b35; min-width: 40px; }
.sch-status { font-size: 8px; color: #ff4d4f; }
.sch-title { font-size: 12px; font-weight: bold; }
.sch-loc { font-size: 10px; color: #999; }
.view-all { text-align: right; font-size: 11px; color: #ff5b35; margin-top: 5px; cursor: pointer; }

/* Footer */
.campus-footer { padding: 0 40px 20px; position: relative; z-index: 1; }
.tools-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; }
.tool-card { padding: 12px; position: relative; min-height: 140px; display: flex; flex-direction: column; }
.tool-header { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.tool-icon { width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; }
.tool-icon.orange { background: #ff7850; }
.tool-icon.red { background: #ff4d4f; }
.tool-icon.blue { background: #40a9ff; }
.tool-icon.yellow { background: #ffc53d; }
.tool-icon.cyan { background: #36cfc9; }
.tool-icon.purple { background: #9254de; }
.tool-name { font-size: 12px; font-weight: bold; }
.tool-desc { font-size: 9px; color: #999; line-height: 1.3; margin-bottom: 10px; }
.tool-btn { margin-top: auto; padding: 4px 10px; border: 1px solid #eee; background: white; border-radius: 4px; font-size: 10px; width: fit-content; }
.tool-sticker { position: absolute; right: -5px; bottom: -5px; width: 70px; pointer-events: none; }

/* Scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-thumb { background: #ff5b35; border-radius: 2px; }
</style>
