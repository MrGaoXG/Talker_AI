<template>
  <!-- Asuka 专属：赛博朋克 / EVA 机械舱布局 -->
  <div v-if="currentCharacter === 'Asuka'" class="eva-layout theme-asuka">
    <header class="top-nav">
      <div class="brand-block">
        <div class="brand-mark">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
          </svg>
        </div>
        <div class="brand-text">
          <div class="brand-title">明日香 AI 助手</div>
          <div class="brand-subtitle">EVA-02 / PRODUCTION MODEL</div>
        </div>
      </div>

      <nav class="main-nav">
        <button class="nav-item nav-btn" :class="{ active: asukaPage === 'home' }" @click="asukaPage = 'home'">首页</button>
        <button class="nav-item nav-btn" :class="{ active: asukaPage === 'chat' }" @click="asukaPage = 'chat'">对话</button>
        <button class="nav-item nav-btn" :class="{ active: asukaPage === 'nav' }" @click="asukaPage = 'nav'">导航</button>
        <button class="nav-item nav-btn" :class="{ active: asukaPage === 'weather' }" @click="asukaPage = 'weather'">天气</button>
        <button class="nav-item nav-btn" :class="{ active: asukaPage === 'schedule' }" @click="asukaPage = 'schedule'">日程</button>
        <button class="nav-item nav-btn" @click="asukaPage = 'home'">API中心</button>
        <button class="nav-item nav-btn" @click="asukaPage = 'home'">设置</button>
      </nav>

      <div class="top-actions">
        <button class="top-locate-btn" :disabled="locatingUser" title="获取当前位置" @click="requestAmapGeolocation">
          <span class="locate-icon" :class="{ rotating: locatingUser }">⌖</span>
          <span class="locate-text">{{ locatingUser ? '定位中...' : '定位' }}</span>
        </button>
        <div class="top-location-pill" :title="currentGeoText">{{ currentGeoText }}</div>
        <div class="character-switch">
          <button
            :class="['switch-btn', { active: currentCharacter === 'Asuka' }]"
            @click="currentCharacter = 'Asuka'"
          >
            Asuka
          </button>
          <button
            :class="['switch-btn', { active: currentCharacter === 'qian' }]"
            @click="currentCharacter = 'qian'"
          >
            Qian
          </button>
          <button
            :class="['switch-btn', { active: currentCharacter === 'campus' }]"
            @click="currentCharacter = 'campus'"
          >
            Campus
          </button>
        </div>
        <div class="notification-bell">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
          <span class="bell-dot">3</span>
        </div>
        <div class="pilot-card">
          <div class="pilot-avatar">
            <img :src="pilotThumb" alt="pilot" />
          </div>
          <div class="pilot-meta">
            <div class="pilot-name">Pilot_02</div>
            <div class="pilot-level">适格者等级: Lv.02</div>
          </div>
          <div class="pilot-arrow">▾</div>
        </div>
      </div>
    </header>

    <main :class="['eva-grid', { 'eva-grid-focus': asukaPage !== 'home' && asukaPage !== 'weather', 'eva-grid-weather': asukaPage === 'weather' }]">
      <aside v-if="asukaPage !== 'weather'" class="left-panel panel-frame">
        <div class="portrait-card">
          <div class="portrait-head">
            <div>
              <div class="portrait-name">ASUKA</div>
              <div class="portrait-sub">SHIKINAMI LANGLEY</div>
            </div>
          </div>
          <div class="portrait-visual">
            <img :src="pilotPortrait" alt="portrait" />
          </div>
          <div class="portrait-footer">
            <div class="status-online">
              <span class="status-dot"></span>
              在线状态
            </div>
            <div class="status-highlight">随时待命中!</div>
          </div>
        </div>

        <div class="info-card">
          <div class="section-title">核心能力</div>
          <div class="ability-list">
            <div class="ability-item"><span>多模态对话</span><span>LLM API</span></div>
            <div class="ability-item"><span>工具调用</span><span>Tools API</span></div>
            <div class="ability-item"><span>记忆存储</span><span>Memory API</span></div>
            <div class="ability-item"><span>语音交互</span><span>Voice API</span></div>
            <div class="ability-item"><span>图像理解</span><span>Vision API</span></div>
          </div>
        </div>

        <div class="system-card">
          <div class="system-stripes"></div>
          <div class="system-meta">
            <div class="system-title">NERV Intelligence System</div>
            <div class="system-desc">GOD'S IN HIS HEAVEN. ALL'S RIGHT WITH THE WORLD.</div>
          </div>
        </div>
      </aside>

      <!-- Weather Page Left Panel -->
      <aside v-else class="left-panel panel-frame weather-left-sidebar">
        <div class="portrait-card weather-portrait">
          <div class="portrait-status-badge">
            <span class="status-dot"></span>
            ONLINE
          </div>
          <div class="portrait-visual">
            <img :src="pilotPortrait" alt="portrait" />
          </div>
          <div class="portrait-info">
            <div class="portrait-name">ASUKA</div>
            <div class="portrait-sub">SHIKINAMI LANGLEY</div>
            <div class="portrait-level-tag">LV.02 <span>适格者驾驶员</span></div>
            <div class="portrait-id">EVA-02 PILOT</div>
          </div>
          <div class="portrait-status-text">
            在线状态
            <div class="status-highlight">随时待命中!</div>
          </div>
          <div class="portrait-wave">
            <svg viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0 10 Q25 0 50 10 T100 10" fill="none" stroke="currentColor" stroke-width="0.5" />
            </svg>
          </div>
        </div>

        <div class="info-card weather-ability-card">
          <div class="section-title">天气能力</div>
          <div class="ability-list">
            <div class="ability-item">
              <span class="ability-icon">◎</span>
              <span>实时天气查询</span>
              <span class="ability-tag">Weather API</span>
            </div>
            <div class="ability-item">
              <span class="ability-icon">◎</span>
              <span>未来天气预报</span>
              <span class="ability-tag">Weather API</span>
            </div>
            <div class="ability-item">
              <span class="ability-icon">◎</span>
              <span>降水雷达图</span>
              <span class="ability-tag">Maps API</span>
            </div>
            <div class="ability-item">
              <span class="ability-icon">◎</span>
              <span>空气质量监测</span>
              <span class="ability-tag">AQI API</span>
            </div>
            <div class="ability-item">
              <span class="ability-icon">◎</span>
              <span>天气预警推送</span>
              <span class="ability-tag">Alert API</span>
            </div>
            <div class="ability-item">
              <span class="ability-icon">◎</span>
              <span>生活指数建议</span>
              <span class="ability-tag">Index API</span>
            </div>
          </div>
        </div>

        <div class="unit-card weather-unit-card panel-frame">
          <div class="unit-card-title">EVA-02 状态</div>
          <div class="unit-card-sub">PRODUCTION MODEL</div>
          <div class="unit-visual">
            <img :src="unitPortrait" alt="unit" />
          </div>
          <div class="unit-stats">
            <div class="unit-stat-row">
              <span>系统状态: 正常</span>
              <span>同步率: 98%</span>
            </div>
            <div class="unit-progress-bar">
              <span style="width: 98%"></span>
            </div>
          </div>
        </div>
      </aside>

      <section class="center-panel">
        <template v-if="asukaPage === 'home'">
        <section class="hero-panel panel-frame">
          <div class="hero-header">
            <div class="hero-status">
              <span class="online-ring"></span>
              <span>ONLINE</span>
            </div>
            <div class="hero-label">明日香 AI 助手</div>
          </div>

          <div class="hero-body">
            <div class="hero-avatar-zone">
              <AiAvatar :emotion="currentEmotion" :character="currentCharacter" />
            </div>
            <div class="hero-bubble-zone">
              <SpeechBubble :text="latestAiMessage" @typing-end="handleTypingEnd" />
            </div>
          </div>

          <div class="mission-input">
            <div class="mission-text">帮我查看今天上海天气，并在下午三点提醒我开会</div>
            <div class="mission-icons">
              <span class="mission-icon">🎤</span>
              <span class="mission-icon primary">➤</span>
            </div>
          </div>
          <div class="input-real">
            <ChatInput @send="handleSendMsg" :disabled="isTyping || isThinking" />
          </div>
        </section>

        <section class="status-cards">
          <div class="mini-card panel-frame">
            <div class="mini-header">
              <span>地图导航</span>
              <span class="mini-tag">API</span>
            </div>
            <div class="map-card">
              <div class="map-grid"></div>
              <div class="map-route"></div>
              <div class="map-point point-a"></div>
              <div class="map-point point-b"></div>
            </div>
            <div class="mini-body">
              <div>目的地: 上海国际会议中心</div>
              <div>预计耗时: 32分钟 • 16.8公里</div>
            </div>
            <button class="card-btn">开始导航</button>
          </div>

          <div class="mini-card panel-frame">
            <div class="mini-header">
              <span>定位服务</span>
              <span class="mini-tag">API</span>
            </div>
            <div class="location-pin"></div>
            <div class="mini-body emphasis">
              <div>当前位置:</div>
              <div>上海市 浦东新区</div>
              <div>陆家嘴环路1000号</div>
            </div>
            <div class="mini-foot">31.2304°N、121.4737°E</div>
            <button class="card-btn">刷新定位</button>
          </div>

          <div class="mini-card panel-frame">
            <div class="mini-header">
              <span>天气查询</span>
              <span class="mini-tag">API</span>
            </div>
            <div class="weather-visual">
              <div class="weather-icon">{{ weatherToday.icon }}</div>
              <div class="weather-temp">{{ weatherToday.temp }}℃</div>
            </div>
            <div class="mini-body">
              <div>{{ weatherToday.summary }}</div>
              <div>{{ weatherToday.low }} - {{ weatherToday.high }}</div>
            </div>
            <div class="weather-meta">
              <span>湿度 {{ weatherToday.humidity }}</span>
              <span>风速 {{ weatherToday.wind }}</span>
              <span>空气 {{ airQuality.value }}</span>
            </div>
          </div>

          <div class="mini-card panel-frame">
            <div class="mini-header">
              <span>日程提醒</span>
              <span class="mini-tag">API</span>
            </div>
            <div class="schedule-date">{{ homeScheduleDate }}</div>
            <div v-if="nextScheduleItem" class="schedule-item">
              <div class="schedule-time">{{ nextScheduleItem.time }}</div>
              <div class="schedule-content">
                <div>{{ nextScheduleItem.title }}</div>
                <div>{{ nextScheduleItem.location }}</div>
              </div>
            </div>
            <div v-else class="schedule-home-empty">暂无待执行日程</div>
            <div class="schedule-switch">
              <span>{{ homeScheduleStatus }}</span>
              <span class="toggle-dot"></span>
            </div>
          </div>
        </section>
        </template>

        <template v-else-if="asukaPage === 'chat'">
          <section class="chat-page panel-frame">
            <div class="chat-page-header">
              <div>
                <div class="chat-page-title">ASUKA DIALOG TERMINAL</div>
                <div class="chat-page-subtitle">同步率已建立，进入专属对话页面</div>
              </div>
              <div class="chat-page-status">
                <span class="online-ring"></span>
                <span>{{ isThinking ? '思考中' : '待命中' }}</span>
              </div>
            </div>

            <div class="chat-page-body">
              <div class="chat-scene-list panel-frame">
                <div class="chat-side-title">对话场景</div>
                <div class="chat-scene-item active">
                  <div class="chat-scene-name">作战指挥</div>
                  <div class="chat-scene-desc">会议、提醒、指令同步</div>
                </div>
                <div class="chat-scene-item">
                  <div class="chat-scene-name">日常陪伴</div>
                  <div class="chat-scene-desc">闲聊、鼓励、情绪互动</div>
                </div>
                <div class="chat-scene-item">
                  <div class="chat-scene-name">导航任务</div>
                  <div class="chat-scene-desc">地图、路线、定位联动</div>
                </div>
                <div class="chat-scene-item">
                  <div class="chat-scene-name">资料解析</div>
                  <div class="chat-scene-desc">文档、图片、信息提炼</div>
                </div>

                <div class="chat-side-title secondary">最近记录</div>
                <div class="chat-history-mini" v-if="currentMessages.length === 0">
                  暂无记录，开始和明日香对话吧。
                </div>
                <div v-else class="chat-history-mini-list">
                  <div
                    v-for="(msg, index) in currentMessages.slice(-4)"
                    :key="`mini-${index}`"
                    class="chat-history-mini-item"
                  >
                    <span>{{ msg.role === 'user' ? 'YOU' : 'ASUKA' }}</span>
                    <strong>{{ msg.content.slice(0, 24) }}</strong>
                  </div>
                </div>
              </div>

              <div class="chat-core panel-frame">
                <div class="chat-core-top">
                  <div class="chat-core-badge">MAGI / DIALOG CORE</div>
                  <div class="chat-core-meta">当前表情: {{ currentEmotion }}</div>
                </div>

                <div class="chat-core-stage">
                  <div class="chat-focus-avatar">
                    <AiAvatar :emotion="currentEmotion" :character="currentCharacter" />
                  </div>
                  <div class="chat-focus-bubble">
                    <SpeechBubble :text="latestAiMessage" @typing-end="handleTypingEnd" />
                  </div>
                </div>

                <div class="chat-log panel-frame" ref="historyRef">
                  <div v-for="(msg, index) in currentMessages" :key="index" :class="['chat-log-item', msg.role]">
                    <div class="chat-log-role">{{ msg.role === 'user' ? 'YOU' : 'ASUKA' }}</div>
                    <div class="chat-log-content">{{ msg.content }}</div>
                  </div>
                  <div v-if="isThinking" class="chat-log-item assistant">
                    <div class="chat-log-role">ASUKA</div>
                    <div class="chat-log-content">...</div>
                  </div>
                </div>

                <div class="chat-focus-input">
                  <ChatInput @send="handleSendMsg" :disabled="isTyping || isThinking" />
                </div>
              </div>

              <div class="chat-task-panel panel-frame">
                <div class="chat-side-title">推荐任务</div>
                <div class="task-card hot">
                  <div class="task-title">会议提醒 + 天气联动</div>
                  <div class="task-desc">查看天气并为今天 15:00 创建提醒</div>
                  <button class="task-btn">立即执行</button>
                </div>
                <div class="task-card">
                  <div class="task-title">目的地导航</div>
                  <div class="task-desc">输入会议地点，生成高德路线</div>
                  <button class="task-btn">打开地图</button>
                </div>
                <div class="task-card compact">
                  <div class="task-title">快捷指令</div>
                  <div class="quick-grid">
                    <button class="quick-chip">查天气</button>
                    <button class="quick-chip">加提醒</button>
                    <button class="quick-chip">去导航</button>
                    <button class="quick-chip">继续聊天</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </template>

        <template v-else-if="asukaPage === 'nav'">
          <section class="nav-page panel-frame">
            <div class="nav-page-header">
              <div>
                <div class="chat-page-title">NAVIGATION CONTROL</div>
                <div class="chat-page-subtitle">根据参考图切换到独立导航视图</div>
              </div>
              <div class="nav-top-tools">
                <div class="nav-status-pill">{{ amapStatus }}</div>
                <button class="card-btn nav-refresh-btn" @click="initAmapMap">刷新地图</button>
              </div>
            </div>

            <div class="nav-page-body">
              <div class="nav-main-column">
                <div class="nav-search-bar panel-frame">
                  <div class="nav-search-field">
                    <span class="nav-search-label">起点</span>
                    <input
                      v-model="navStart"
                      class="nav-search-input"
                      type="text"
                      placeholder="请输入起点"
                      @keydown.enter.prevent="planAsukaRoute"
                    />
                  </div>
                  <div class="nav-search-sep"></div>
                  <div class="nav-search-field">
                    <span class="nav-search-label">终点</span>
                    <input
                      v-model="navEnd"
                      class="nav-search-input"
                      type="text"
                      placeholder="请输入终点"
                      @keydown.enter.prevent="planAsukaRoute"
                    />
                  </div>
                  <button class="nav-go-btn" :disabled="amapPlanning" @click="planAsukaRoute">
                    {{ amapPlanning ? '规划中...' : '开始导航' }}
                  </button>
                </div>

                <div class="nav-map-large panel-frame">
                  <div ref="amapContainerRef" class="amap-canvas"></div>
                  <div v-if="amapStatus !== '高德地图已连接'" class="amap-empty-state">
                    <div class="amap-empty-title">{{ amapStatus }}</div>
                    <div class="amap-empty-text">
                      {{ amapErrorDetail || '请检查高德 Key、安全密钥和 localhost 白名单配置。' }}
                    </div>
                  </div>
                  <div class="nav-map-overlay">
                    <div class="nav-map-badge">目的地: {{ amapRouteSummary.destination }}</div>
                    <div class="nav-map-chip">{{ amapRouteSummary.etaLabel }}</div>
                  </div>
                </div>

                <div class="nav-bottom-grid">
                  <div class="mini-card panel-frame">
                    <div class="mini-header">
                      <span>路线摘要</span>
                      <span class="mini-tag">ROUTE</span>
                    </div>
                    <div class="mini-body emphasis">
                      <div>{{ amapRouteSummary.distanceText }}</div>
                      <div>{{ amapRouteSummary.durationText }}</div>
                    </div>
                    <div class="mini-foot">{{ amapRouteSummary.pathName }}</div>
                  </div>

                  <div class="mini-card panel-frame">
                    <div class="mini-header">
                      <span>定位状态</span>
                      <span class="mini-tag">GPS</span>
                    </div>
                    <div class="mini-body">
                      <div>当前位置: {{ amapRouteSummary.startAddress }}</div>
                      <div>经纬度: {{ amapRouteSummary.startCoordText }}</div>
                      <div>定位精度: 以高德解析结果为准</div>
                    </div>
                    <button class="card-btn" @click="fillAsukaCurrentLocation">使用默认起点</button>
                  </div>
                </div>
              </div>

              <div class="nav-side-stack">
                <div class="mini-card panel-frame nav-steps-card">
                  <div class="mini-header">
                    <span>导航步骤</span>
                    <span class="mini-tag">STEP</span>
                  </div>
                  <div class="nav-step-list">
                    <div
                      v-for="(step, index) in amapRouteSummary.steps"
                      :key="`${index}-${step.title}`"
                      class="nav-step-item"
                      :class="{ active: index === 0 }"
                    >
                      <div class="nav-step-index">{{ String(index + 1).padStart(2, '0') }}</div>
                      <div class="nav-step-copy">
                        <div>{{ step.title }}</div>
                        <span>{{ step.desc }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mini-card panel-frame nav-ops-card">
                  <div class="mini-header">
                    <span>导航操作</span>
                    <span class="mini-tag">OPS</span>
                  </div>
                  <div class="quick-grid nav-op-grid">
                    <button class="quick-chip" :class="{ active: asukaNavMode === 'driving' }" @click="setAsukaNavMode('driving')">切换驾车</button>
                    <button class="quick-chip" :class="{ active: asukaNavMode === 'walking' }" @click="setAsukaNavMode('walking')">切换步行</button>
                    <button class="quick-chip">附近停车</button>
                    <button class="quick-chip" @click="focusAsukaRoute">聚焦路线</button>
                  </div>
                  <div class="nav-side-note">当前模式：{{ asukaNavMode === 'driving' ? '驾车规划' : '步行规划' }}，输入起终点后会直接调用高德真实路线。</div>
                </div>
              </div>
            </div>
          </section>
        </template>

        <template v-else-if="asukaPage === 'weather'">
          <section class="weather-page-v2">
            <!-- Top Weather Summary -->
            <div class="weather-summary-card panel-frame">
              <div class="summary-backdrop">
                <img src="/image/Asuka/ground.jpg" alt="city backdrop" />
              </div>
              <div class="summary-content">
                <div class="summary-topbar">
                  <div class="summary-location-group">
                    <div class="summary-location-pill">
                      <span class="location-icon">📍</span>
                      <span class="location-text">{{ weatherToday.city }}</span>
                    </div>
                    <button class="summary-chip-btn" type="button" @click="showWeatherCityPicker = !showWeatherCityPicker">
                      {{ showWeatherCityPicker ? '收起城市' : '切换城市' }}
                    </button>
                  </div>
                  <div class="summary-update-group">
                    <span class="summary-update-time">更新时间 | 14:45</span>
                    <button class="summary-refresh-btn" type="button" :disabled="weatherLoading" @click="fetchWeatherData">
                      ↻
                    </button>
                  </div>
                </div>
                <div v-if="showWeatherCityPicker" class="weather-city-panel">
                  <form class="weather-city-form weather-city-form-inline" @submit.prevent="handleCityWeatherSearch">
                    <input
                      v-model.trim="weatherCityInput"
                      class="weather-city-input"
                      type="text"
                      placeholder="输入城市名，如：上海、北京、东京"
                    />
                    <button class="weather-city-btn" type="submit" :disabled="weatherLoading">
                      确认切换
                    </button>
                    <button class="weather-city-btn locate-btn" type="button" :disabled="weatherLoading" @click="requestAmapGeolocation">
                      定位
                    </button>
                  </form>
                  <div v-if="weatherSuggestions.length" class="weather-suggestion-list weather-suggestion-inline">
                    <button
                      v-for="item in weatherSuggestions"
                      :key="`${item.latitude}-${item.longitude}-${item.city}`"
                      class="weather-suggestion-item"
                      type="button"
                      @click="selectWeatherSuggestion(item)"
                    >
                      <strong>{{ item.name }}</strong>
                      <span>{{ item.city }}</span>
                    </button>
                  </div>
                </div>
                <div v-if="weatherError" class="weather-error-note weather-error-inline">{{ weatherError }}</div>
                <div class="summary-main-row">
                  <div class="summary-temp-block">
                    <div class="temp-large">{{ weatherToday.temp }}<span class="unit">°C</span></div>
                    <div class="temp-range">{{ weatherToday.low }} ~ {{ weatherToday.high }}</div>
                  </div>
                  <div class="summary-condition-block">
                    <div class="weather-icon-main">{{ weatherToday.icon }}</div>
                    <div class="weather-info">
                      <div class="weather-text-main">{{ weatherToday.summary }}</div>
                    </div>
                  </div>
                </div>
                <div class="weather-metrics-grid summary-metrics-row">
                  <div class="metric-item summary-metric-item">
                    <span class="metric-icon">🌡</span>
                    <div class="metric-copy">
                      <span class="metric-label">体感</span>
                      <span class="metric-value">{{ weatherMetrics[3].value }}</span>
                    </div>
                  </div>
                  <div class="metric-item summary-metric-item">
                    <span class="metric-icon">💧</span>
                    <div class="metric-copy">
                      <span class="metric-label">湿度</span>
                      <span class="metric-value">{{ weatherToday.humidity }}</span>
                    </div>
                  </div>
                  <div class="metric-item summary-metric-item">
                    <span class="metric-icon">🌬</span>
                    <div class="metric-copy">
                      <span class="metric-label">风向风力</span>
                      <span class="metric-value">东南风 2级</span>
                    </div>
                  </div>
                  <div class="metric-item summary-metric-item">
                    <span class="metric-icon">☀</span>
                    <div class="metric-copy">
                      <span class="metric-label">紫外线</span>
                      <span class="metric-value">中等</span>
                    </div>
                  </div>
                  <div class="metric-item summary-metric-item">
                    <span class="metric-icon">☁</span>
                    <div class="metric-copy">
                      <span class="metric-label">空气质量</span>
                      <span class="metric-value">优 28</span>
                    </div>
                  </div>
                  <div class="metric-item summary-metric-item">
                    <span class="metric-icon">👁</span>
                    <div class="metric-copy">
                      <span class="metric-label">能见度</span>
                      <span class="metric-value">16.8 km</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 24h Hourly Forecast with Chart -->
            <div class="weather-hourly-card panel-frame">
              <div class="card-header">
                <div class="card-title">24小时预报</div>
                <div class="card-actions">
                  <button class="toggle-btn active">折线图</button>
                  <button class="toggle-btn">列表视图</button>
                </div>
              </div>
              <div class="hourly-chart-container">
                <div class="hourly-chart-y-axis">
                  <span>30°C</span>
                  <span>25°C</span>
                  <span>20°C</span>
                  <span>15°C</span>
                </div>
                <div class="hourly-chart-main">
                  <div class="chart-scroll">
                    <div class="chart-content">
                      <svg width="800" height="120" viewBox="0 0 800 120" class="chart-svg">
                        <path d="M0,60 L100,70 L200,50 L300,40 L400,60 L500,80 L600,85 L700,90 L800,80" fill="none" stroke="var(--accent)" stroke-width="2" />
                        <circle v-for="(p, i) in [60,70,50,40,60,80,85,90,80]" :key="i" :cx="i*100" :cy="p" r="3" fill="var(--accent)" />
                        <text v-for="(p, i) in [60,70,50,40,60,80,85,90,80]" :key="'t'+i" :x="i*100" :y="p-10" fill="#fff" font-size="10" text-anchor="middle">{{ 30 - Math.round(p/4) }}°</text>
                      </svg>
                      <div class="chart-x-labels">
                        <span v-for="item in hourlyForecast.slice(0, 9)" :key="item.time">{{ item.time }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 7-day Forecast -->
            <div class="weather-weekly-card panel-frame">
              <div class="card-header">
                <div class="card-title">7天预报</div>
                <button class="view-more-btn">查看更长预报 ›</button>
              </div>
              <div class="weekly-list">
                <div class="weekly-item" v-for="item in weeklyForecast" :key="item.date">
                  <div class="week-day">{{ item.day }} {{ item.date }}</div>
                  <div class="week-icon">{{ item.icon }}</div>
                  <div class="week-text">{{ item.text }}</div>
                  <div class="week-temp">{{ item.high }} / {{ item.low }}</div>
                </div>
              </div>
            </div>

            <!-- Bottom Floating Chat Bubble -->
            <div class="weather-floating-chat">
              <div class="chibi-asuka">
                <img :src="pilotThumb" alt="chibi asuka" />
              </div>
              <div class="chat-bubble-v2">
                好的，上海今天多云转晴，22°C ~ 28°C，空气质量优，下午降雨概率较低，适合出行，记得注意防晒哦！❤️
                <span class="bubble-tail"></span>
              </div>
              <div class="weather-actions-bar">
                <button class="action-btn">📍 切换城市</button>
                <button class="action-btn">📅 查看未来7天</button>
                <button class="action-btn">🚗 出行建议</button>
                <button class="action-btn">👕 穿衣推荐</button>
                <button class="action-btn">👁 空气质量详情</button>
              </div>
            </div>
          </section>
        </template>

        <template v-else-if="asukaPage === 'schedule'">
          <section class="schedule-page">
            <section class="schedule-hero panel-frame">
              <div class="schedule-hero-top">
                <div>
                  <div class="schedule-hero-kicker">SCHEDULE CONTROL CENTER</div>
                  <div class="schedule-hero-title">今日作战日程</div>
                  <div class="schedule-hero-date">{{ scheduleDateLabel }}</div>
                </div>
                <div class="schedule-hero-badge">{{ scheduleSummary.status }}</div>
              </div>

              <div class="schedule-hero-main">
                <div class="schedule-hero-copy">
                  <div class="schedule-hero-focus">{{ scheduleSummary.focus }}</div>
                  <p class="schedule-hero-desc">{{ scheduleSummary.description }}</p>
                </div>
                <div class="schedule-hero-progress">
                  <strong>{{ scheduleSummary.progress }}</strong>
                  <span>已完成进度</span>
                </div>
              </div>

              <div class="schedule-hero-metrics">
                <div class="schedule-metric-card" v-for="item in scheduleMetrics" :key="item.label">
                  <span>{{ item.label }}</span>
                  <strong>{{ item.value }}</strong>
                </div>
              </div>
            </section>

            <div class="schedule-content-grid">
              <div class="schedule-main-stack">
                <section class="schedule-panel panel-frame">
                  <div class="schedule-panel-head">
                    <div>
                      <div class="schedule-panel-title">{{ editingScheduleId ? '编辑日程' : '新增日程' }}</div>
                      <div class="schedule-panel-subtitle">支持手动添加，已完成或已过期任务会自动清理</div>
                    </div>
                    <div class="schedule-panel-tag">CREATE</div>
                  </div>

                  <form class="schedule-form" @submit.prevent="submitScheduleItem">
                    <input v-model.trim="scheduleDraft.title" class="schedule-input" type="text" placeholder="日程标题" />
                    <input v-model="scheduleDraft.date" class="schedule-input" type="date" />
                    <input v-model="scheduleDraft.time" class="schedule-input" type="time" />
                    <select v-model="scheduleDraft.category" class="schedule-input schedule-select">
                      <option v-for="item in scheduleCategories" :key="item" :value="item">{{ item }}</option>
                    </select>
                    <input v-model.trim="scheduleDraft.location" class="schedule-input" type="text" placeholder="地点，可选" />
                    <textarea
                      v-model.trim="scheduleDraft.note"
                      class="schedule-input schedule-textarea"
                      placeholder="备注，可选"
                    ></textarea>
                    <div class="schedule-form-actions">
                      <span class="schedule-form-tip">{{ scheduleFormMessage }}</span>
                      <div class="schedule-form-btns">
                        <button v-if="editingScheduleId" class="schedule-cancel-btn" type="button" @click="cancelScheduleEdit">
                          取消编辑
                        </button>
                        <button class="schedule-submit-btn" type="submit">
                          {{ editingScheduleId ? '保存修改' : '添加日程' }}
                        </button>
                      </div>
                    </div>
                  </form>
                </section>

                <section class="schedule-panel panel-frame">
                  <div class="schedule-panel-head">
                    <div>
                      <div class="schedule-panel-title">今日时间轴</div>
                      <div class="schedule-panel-subtitle">按时间顺序同步明日香今天的重要安排</div>
                    </div>
                    <div class="schedule-panel-tag">TODAY</div>
                  </div>

                  <div v-if="todayTimeline.length" class="schedule-timeline">
                    <div class="schedule-timeline-item" v-for="item in todayTimeline" :key="item.time">
                      <div class="schedule-timeline-time">{{ item.time }}</div>
                      <div class="schedule-timeline-dot" :class="{ active: item.active }"></div>
                      <div class="schedule-timeline-card">
                        <div class="schedule-timeline-top">
                          <strong>{{ item.title }}</strong>
                          <div class="schedule-timeline-actions">
                            <span :class="['schedule-chip', getScheduleCategoryClass(item.category)]">{{ item.category }}</span>
                            <span :class="['schedule-chip', item.typeClass]">{{ item.type }}</span>
                            <button class="schedule-action-btn" @click="startEditSchedule(item)">编辑</button>
                            <button class="schedule-action-btn success" @click="completeScheduleItem(item.id)">完成</button>
                            <button class="schedule-action-btn danger" @click="removeScheduleItem(item.id)">删除</button>
                          </div>
                        </div>
                        <div class="schedule-timeline-location">{{ item.location }}</div>
                        <p class="schedule-timeline-desc">{{ item.desc }}</p>
                      </div>
                    </div>
                  </div>
                  <div v-else class="schedule-empty-state">当前没有待执行日程，先在上方添加一个吧。</div>
                </section>

                <section class="schedule-panel panel-frame">
                  <div class="schedule-panel-head">
                    <div>
                      <div class="schedule-panel-title">重点任务</div>
                      <div class="schedule-panel-subtitle">优先级高的事项已整理为可执行卡片</div>
                    </div>
                    <div class="schedule-panel-tag">TASK</div>
                  </div>

                  <div v-if="focusTasks.length" class="schedule-task-grid">
                    <div class="schedule-task-card" v-for="item in focusTasks" :key="item.title">
                      <div class="schedule-task-top">
                        <strong>{{ item.title }}</strong>
                        <div class="schedule-task-badges">
                          <span :class="['schedule-chip', getScheduleCategoryClass(item.category)]">{{ item.category }}</span>
                          <span>{{ item.badge }}</span>
                        </div>
                      </div>
                      <div class="schedule-task-meta">{{ item.time }} · {{ item.owner }}</div>
                      <p>{{ item.desc }}</p>
                      <div class="schedule-task-progress">
                        <span :style="{ width: item.progress }"></span>
                      </div>
                    </div>
                  </div>
                  <div v-else class="schedule-empty-state">当前没有重点任务，今天节奏看起来很轻松。</div>
                </section>
              </div>

              <div class="schedule-side-stack">
                <section class="schedule-panel panel-frame schedule-calendar-card">
                  <div class="schedule-panel-head">
                    <div>
                      <div class="schedule-panel-title">本周安排</div>
                      <div class="schedule-panel-subtitle">快速查看接下来几天的重点行程</div>
                    </div>
                    <div class="schedule-panel-tag">WEEK</div>
                  </div>

                  <div v-if="weekAgenda.length" class="schedule-calendar-list">
                    <div class="schedule-calendar-item" v-for="item in weekAgenda" :key="item.day">
                      <div class="schedule-calendar-date">
                        <strong>{{ item.day }}</strong>
                        <span>{{ item.date }}</span>
                      </div>
                      <div class="schedule-calendar-copy">
                        <div>
                          {{ item.title }}
                          <span :class="['schedule-chip', 'inline-chip', getScheduleCategoryClass(item.category)]">{{ item.category }}</span>
                        </div>
                        <span>{{ item.note }}</span>
                      </div>
                    </div>
                  </div>
                  <div v-else class="schedule-empty-state">本周暂无后续安排。</div>
                </section>

                <section class="schedule-panel panel-frame">
                  <div class="schedule-panel-head">
                    <div>
                      <div class="schedule-panel-title">提醒事项</div>
                      <div class="schedule-panel-subtitle">会前、出发前和晚间复盘提醒已开启</div>
                    </div>
                    <div class="schedule-panel-tag">ALERT</div>
                  </div>

                  <div v-if="reminders.length" class="schedule-reminder-list">
                    <div class="schedule-reminder-item" v-for="item in reminders" :key="item.title">
                      <strong>{{ item.title }}</strong>
                      <span>{{ item.desc }}</span>
                    </div>
                  </div>
                  <div v-else class="schedule-empty-state">暂无提醒事项。</div>
                </section>

                <section class="schedule-panel panel-frame schedule-stats-card">
                  <div class="schedule-panel-head">
                    <div>
                      <div class="schedule-panel-title">执行状态</div>
                      <div class="schedule-panel-subtitle">当前节奏稳定，今天保持高同步率</div>
                    </div>
                    <div class="schedule-panel-tag">SYNC</div>
                  </div>

                  <div class="schedule-stats-grid">
                    <div class="schedule-stat-box" v-for="item in scheduleStats" :key="item.label">
                      <span>{{ item.label }}</span>
                      <strong>{{ item.value }}</strong>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </template>
      </section>

      <aside v-if="asukaPage === 'home' || asukaPage === 'weather'" class="right-panel">
        <!-- Default Home Right Panel -->
        <template v-if="asukaPage === 'home'">
          <div class="unit-card panel-frame">
            <div class="unit-card-title">EVA-02</div>
            <div class="unit-card-sub">PRODUCTION MODEL</div>
            <div class="unit-visual">
              <img :src="unitPortrait" alt="unit" />
            </div>
            <div class="unit-foot">状态: 战斗机能</div>
          </div>

          <div class="tool-card panel-frame">
            <div class="section-title">快捷工具</div>
            <div class="tool-grid">
              <div class="tool-item">语音对话</div>
              <div class="tool-item">拍照识别</div>
              <div class="tool-item">文档解析</div>
              <div class="tool-item">翻译助手</div>
            </div>
          </div>

          <div class="mood-card panel-frame">
            <div class="section-title">心情指数</div>
            <div class="mood-body">
              <div class="mood-avatar">
                <img :src="moodThumb" alt="mood" />
              </div>
              <div class="mood-score">
                <div class="score-value">92%</div>
                <div class="score-label">元气值</div>
              </div>
            </div>
            <div class="mood-note">今天也要元气满满哦！</div>
          </div>

          <div class="voice-card panel-frame">
            <div class="section-title">语音助手</div>
            <div class="voice-note">点击下方按钮开始语音通话</div>
            <div class="wave-bars">
              <span v-for="item in 14" :key="item"></span>
            </div>
            <button class="voice-btn">🎙</button>
            <div class="voice-foot">支持连续对话</div>
          </div>
        </template>

        <!-- Weather Specific Right Panel -->
        <template v-else-if="asukaPage === 'weather'">
          <div class="radar-card panel-frame">
            <div class="card-header">
              <div class="card-title">降水雷达图</div>
              <div class="card-time">14:42 更新</div>
            </div>
            <div class="radar-map-container">
              <img src="/image/qian/backgroun1.png" alt="radar placeholder" class="radar-placeholder" loading="lazy" decoding="async" />
              <div class="radar-overlay">
                <div class="radar-scan"></div>
                <div class="location-dot" style="left: 60%; top: 40%"></div>
                <span class="location-label" style="left: 62%; top: 42%">上海市</span>
              </div>
            </div>
            <div class="radar-legend">
              <span>小雨</span>
              <div class="legend-bar"></div>
              <span>暴雨</span>
            </div>
          </div>

          <div class="life-index-card panel-frame">
            <div class="card-header">
              <div class="card-title">生活指数</div>
              <button class="view-more-btn">更多指数 ›</button>
            </div>
            <div class="index-grid">
              <div class="index-item">
                <div class="index-icon">👕</div>
                <div class="index-meta">
                  <div class="index-label">穿衣建议</div>
                  <div class="index-value">舒适</div>
                  <div class="index-desc">22~28°C</div>
                </div>
              </div>
              <div class="index-item">
                <div class="index-icon">☀</div>
                <div class="index-meta">
                  <div class="index-label">紫外线</div>
                  <div class="index-value">中等</div>
                  <div class="index-desc">UV 4</div>
                </div>
              </div>
              <div class="index-item">
                <div class="index-icon">🚗</div>
                <div class="index-meta">
                  <div class="index-label">洗车指数</div>
                  <div class="index-value">较适宜</div>
                  <div class="index-desc">未来24小时</div>
                </div>
              </div>
              <div class="index-item">
                <div class="index-icon">🏃</div>
                <div class="index-meta">
                  <div class="index-label">运动指数</div>
                  <div class="index-value">较适宜</div>
                  <div class="index-desc">室外活动</div>
                </div>
              </div>
              <div class="index-item">
                <div class="index-icon">☔</div>
                <div class="index-meta">
                  <div class="index-label">降雨概率</div>
                  <div class="index-value">20%</div>
                  <div class="index-desc">下午较低</div>
                </div>
              </div>
              <div class="index-item">
                <div class="index-icon">🍃</div>
                <div class="index-meta">
                  <div class="index-label">空气质量</div>
                  <div class="index-value">优</div>
                  <div class="index-desc">AQI 28</div>
                </div>
              </div>
            </div>
          </div>

          <div class="weather-alert-card-v2 panel-frame">
            <div class="card-header">
              <div class="card-title">天气预警</div>
              <button class="view-more-btn">更多预警 ›</button>
            </div>
            <div class="alert-content">
              <div class="alert-badge warning">
                <span class="alert-icon">⚠</span>
                大风黄色预警
                <span class="alert-status">生效中</span>
              </div>
              <p class="alert-text">
                上海市气象台2025年05月20日13时45分发布大风黄色预警信号：
                受冷空气影响，预计今天下午到明天，本市将出现陆地阵风6-7级，沿江沿海地区阵风7-8级的大风，请注意防范。
              </p>
              <div class="alert-footer">发布时间: 05-20 13:45</div>
            </div>
          </div>
        </template>
      </aside>
    </main>
  </div>

  <!-- Qian 专属：保留首页，并支持切换到独立导航页 -->
  <template v-else-if="currentCharacter === 'qian'">
    <QianLayout
      v-if="qianPage === 'home'"
      :messages="currentMessages"
      :is-thinking="isThinking"
      :is-typing="isTyping"
      :current-emotion="currentEmotion"
      :latest-ai-message="latestAiMessage"
      :current-character="currentCharacter"
      :current-page="qianPage"
      @send="handleSendMsg"
      @typing-end="handleTypingEnd"
      @page-change="qianPage = $event"
      @switch-character="(char) => currentCharacter = char || 'Asuka'"
    />

    <QianNavLayout
      v-else-if="qianPage === 'nav'"
      :current-page="qianPage"
      :geo-location="weatherLocation"
      :geo-sync-key="geoSyncKey"
      @page-change="qianPage = $event"
      @switch-character="(char) => currentCharacter = char || 'Asuka'"
    />

    <QianWeatherLayout
      v-else-if="qianPage === 'weather'"
      :current-page="qianPage"
      :weather-loading="weatherLoading"
      :weather-error="weatherError"
      :weather-today="weatherToday"
      :weather-metrics="weatherMetrics"
      :hourly-forecast="hourlyForecast"
      :weekly-forecast="weeklyForecast"
      :air-quality="airQuality"
      :weather-indices="weatherIndices"
      :weather-alerts="weatherAlerts"
      :weather-hero-badge="weatherHeroBadge"
      :weather-date-label="weatherDateLabel"
      :weather-city-input="weatherCityInput"
      :weather-suggestions="weatherSuggestions"
      :weather-rain-trend="weatherRainTrend"
      :weather-sun-cycle="weatherSunCycle"
      @page-change="qianPage = $event"
      @switch-character="(char) => currentCharacter = char || 'Asuka'"
      @refresh-weather="fetchWeatherData"
      @search-weather="handleCityWeatherSearch"
      @update-weather-city-input="weatherCityInput = $event"
      @select-weather-suggestion="selectWeatherSuggestion"
    />

    <QianScheduleLayout
      v-else
      :current-page="qianPage"
      :schedule-items="activeScheduleItems"
      :schedule-categories="scheduleCategories"
      :schedule-draft="scheduleDraft"
      :schedule-form-message="scheduleFormMessage"
      :editing-schedule-id="editingScheduleId"
      :weather-today="weatherToday"
      @page-change="qianPage = $event"
      @switch-character="(char) => currentCharacter = char || 'Asuka'"
      @update-schedule-draft="updateScheduleDraftField"
      @submit-schedule="submitScheduleItem"
      @cancel-schedule-edit="cancelScheduleEdit"
      @start-create-schedule="startCreateSchedule"
      @start-edit-schedule="startEditSchedule"
      @complete-schedule-item="completeScheduleItem"
      @remove-schedule-item="removeScheduleItem"
    />
  </template>

  <!-- Campus 专属：校园风 Asuka 布局 -->
  <CampusLayout
    v-else-if="currentCharacter === 'campus'"
    :messages="currentMessages"
    :is-thinking="isThinking"
    :is-typing="isTyping"
    :current-emotion="currentEmotion"
    :latest-ai-message="latestAiMessage"
    :current-character="currentCharacter"
    @send="handleSendMsg"
    @typing-end="handleTypingEnd"
    @switch-character="(char) => currentCharacter = char || 'Asuka'"
  />
</template>

<script setup>
import { ref, computed, nextTick, watch, onMounted, onBeforeUnmount } from 'vue'
import AiAvatar from './components/chat/AiAvatar.vue'
import SpeechBubble from './components/chat/SpeechBubble.vue'
import ChatInput from './components/chat/ChatInput.vue'
import QianLayout from './components/chat/QianLayout.vue'
import QianNavLayout from './components/chat/QianNavLayout.vue'
import QianWeatherLayout from './components/chat/QianWeatherLayout.vue'
import QianScheduleLayout from './components/chat/QianScheduleLayout.vue'
import CampusLayout from './components/chat/CampusLayout.vue'
import { loadAmapScript } from './utils/amap'

// #region debug-point D:reporter
const reportAmapAppDebug = () => {
  // Silent in production
  // fetch('http://127.0.0.1:7777/event', ...)
}
// #endregion

// 分角色存储对话记录
const messagesMap = ref({
  Asuka: [],
  qian: [],
  campus: []
})

const currentMessages = computed(() => {
  const list = messagesMap.value[currentCharacter.value]
  return Array.isArray(list) ? list : []
})

const historyRef = ref(null)
const isThinking = ref(false)
const isTyping = ref(false)
const currentCharacter = ref('qian')
const qianPage = ref('home')
const asukaPage = ref('home')
const ASUKA_DEFAULT_START = {
  name: '上海市浦东新区陆家嘴环路1000号',
  address: '上海市浦东新区陆家嘴环路1000号',
  position: [121.4737, 31.2304]
}
const ASUKA_DEFAULT_END = {
  name: '上海国际会议中心',
  address: '上海国际会议中心',
  position: [121.4905, 31.2397]
}
const amapContainerRef = ref(null)
const amapInstance = ref(null)
const amapStatus = ref('地图待连接')
const amapErrorDetail = ref('')
const navStart = ref(ASUKA_DEFAULT_START.address)
const navEnd = ref(ASUKA_DEFAULT_END.address)
const amapPlanning = ref(false)
const asukaNavMode = ref('driving')
const amapGeocoderRef = ref(null)
const amapPlaceSearchRef = ref(null)
const amapWalkingRef = ref(null)
const amapDrivingRef = ref(null)
const amapPlanTraceSeed = ref(0)
const amapRouteSummary = ref({
  destination: ASUKA_DEFAULT_END.name,
  etaLabel: 'ETA --',
  distanceText: '--',
  durationText: '预计 -- 分钟',
  pathName: `${ASUKA_DEFAULT_START.name} → ${ASUKA_DEFAULT_END.name}`,
  startAddress: ASUKA_DEFAULT_START.address,
  startCoordText: `${ASUKA_DEFAULT_START.position[0]}, ${ASUKA_DEFAULT_START.position[1]}`,
  steps: [
    { title: '等待路径规划', desc: '请输入起点和终点后点击开始导航。' },
    { title: '支持驾车与步行', desc: '切换模式后会自动重新规划。' },
    { title: '地图联动展示', desc: '规划成功后会自动聚焦整条路线。' }
  ]
})
const amapRouteOverlays = {
  markers: [],
  polyline: null
}
const WEATHER_COORDS = {
  latitude: 31.2304,
  longitude: 121.4737,
  city: '上海市 浦东新区'
}
const WEATHER_REFRESH_INTERVAL = 30 * 60 * 1000
const SCHEDULE_CLEANUP_INTERVAL = 60 * 1000
const SCHEDULE_STORAGE_KEY = 'asuka_schedule_items_v1'
const WEATHER_LOCATION_STORAGE_KEY = 'asuka_weather_location_v1'
const scheduleCategories = ['会议', '出行', '学习', '提醒']
const weatherRefreshTimer = ref(null)
const scheduleCleanupTimer = ref(null)
const weatherSuggestTimer = ref(null)
const skipWeatherSuggestOnce = ref(false)
const showWeatherCityPicker = ref(false)
const weatherLoading = ref(false)
const weatherError = ref('')
const weatherLastSyncedAt = ref(0)
const weatherLocation = ref({ ...WEATHER_COORDS })
const locatingUser = ref(false)
const geoSyncKey = ref(0)
const weatherCityInput = ref(WEATHER_COORDS.city)
const weatherSuggestions = ref([])
const weatherToday = ref({
  city: WEATHER_COORDS.city,
  notice: '等待同步实时天气',
  summary: '天气数据准备中',
  description: '正在同步实时天气，请稍候。',
  temp: '--',
  high: '--',
  low: '--',
  icon: '⛅',
  humidity: '--',
  wind: '--'
})
const weatherMetrics = ref([
  { label: '降水概率', value: '--' },
  { label: '风速', value: '--' },
  { label: '日出日落', value: '-- / --' },
  { label: '体感温度', value: '--' }
])
const weatherRainTrend = ref([])
const weatherSunCycle = ref({
  sunrise: '--',
  sunset: '--'
})
const hourlyForecast = ref([])
const weeklyForecast = ref([])
const airQuality = ref({
  value: '--',
  level: '待同步',
  pm25: '--',
  humidity: '--',
  uv: '--'
})
const weatherIndices = ref([])
const weatherAlerts = ref([])
const currentGeoText = computed(() => weatherLocation.value.address || weatherLocation.value.name || weatherLocation.value.city || '未定位')
const scheduleFormMessage = ref('设置标题、日期和时间后即可添加。')
const scheduleDraft = ref(createScheduleDraft())
const scheduleItems = ref([])
const editingScheduleId = ref('')
const weatherCodeMap = {
  0: { text: '晴', icon: '☀️' },
  1: { text: '晴间多云', icon: '🌤' },
  2: { text: '局部多云', icon: '⛅' },
  3: { text: '阴', icon: '☁️' },
  45: { text: '有雾', icon: '🌫️' },
  48: { text: '冻雾', icon: '🌫️' },
  51: { text: '小毛毛雨', icon: '🌦️' },
  53: { text: '毛毛雨', icon: '🌦️' },
  55: { text: '毛毛雨增强', icon: '🌧️' },
  61: { text: '小雨', icon: '🌦️' },
  63: { text: '中雨', icon: '🌧️' },
  65: { text: '大雨', icon: '🌧️' },
  66: { text: '冻雨', icon: '🌧️' },
  67: { text: '强冻雨', icon: '🌧️' },
  71: { text: '小雪', icon: '🌨️' },
  73: { text: '中雪', icon: '🌨️' },
  75: { text: '大雪', icon: '❄️' },
  80: { text: '阵雨', icon: '🌦️' },
  81: { text: '阵雨增强', icon: '🌧️' },
  82: { text: '强阵雨', icon: '⛈️' },
  95: { text: '雷暴', icon: '⛈️' },
  96: { text: '雷暴夹冰雹', icon: '⛈️' },
  99: { text: '强雷暴夹冰雹', icon: '⛈️' }
}
const weatherHeroBadge = computed(() => {
  if (weatherLoading.value) return '天气同步中...'
  if (weatherError.value) return '天气同步失败'
  return weatherToday.value.notice
})
const activeScheduleItems = computed(() => {
  return [...scheduleItems.value]
    .filter(item => !item.completed && !isScheduleExpired(item))
    .sort((a, b) => getScheduleTimestamp(a) - getScheduleTimestamp(b))
})
const nextScheduleItem = computed(() => {
  const next = activeScheduleItems.value[0]
  if (!next) return null
  return {
    ...next,
    location: next.location || '未设置地点'
  }
})
const homeScheduleDate = computed(() => {
  if (!nextScheduleItem.value) return '今天暂无待办日程'
  return `${formatScheduleDateLabel(nextScheduleItem.value.date)} · 下一项`
})
const homeScheduleStatus = computed(() => {
  return activeScheduleItems.value.length > 0
    ? `${activeScheduleItems.value.length} 项待执行`
    : '自动提醒待机中'
})
const scheduleSummary = computed(() => {
  const total = scheduleItems.value.length
  const pending = activeScheduleItems.value.length
  const completedCount = Math.max(total - pending, 0)
  const progress = total === 0 ? 0 : Math.round((completedCount / total) * 100)
  const next = activeScheduleItems.value[0]
  return {
    status: pending > 0 ? `${pending} 项待执行 / ${completedCount} 项已处理` : '今日已清空 / 状态稳定',
    focus: next
      ? `下一项：${next.time} ${next.title}`
      : '当前没有待执行日程，节奏非常轻松',
    description: next
      ? `最近需要关注的是“${next.title}”，地点${next.location || '未设置'}。到时间后可直接标记完成，系统也会自动清理过期项目。`
      : '你可以在下方直接新增日程。已完成或已过期的项目会自动删除，页面会持续保持清爽。',
    progress: `${progress}%`
  }
})
const scheduleMetrics = computed(() => {
  const todayCount = activeScheduleItems.value.filter(item => item.date === toDateInputValue(new Date())).length
  return [
    { label: '今日行程', value: `${todayCount} 项` },
    { label: '待执行', value: `${activeScheduleItems.value.length} 条` },
    { label: '已清理', value: `${Math.max(scheduleItems.value.length - activeScheduleItems.value.length, 0)} 条` },
    { label: '同步率', value: activeScheduleItems.value.length > 0 ? '实时' : '空闲' }
  ]
})
const todayTimeline = computed(() => {
  const today = toDateInputValue(new Date())
  const base = activeScheduleItems.value.filter(item => item.date === today)
  const items = (base.length ? base : activeScheduleItems.value).slice(0, 6)
  return items.map((item, index) => {
    const diffMinutes = Math.round((getScheduleTimestamp(item) - Date.now()) / 60000)
    let type = '待办'
    let typeClass = 'soft'
    if (diffMinutes <= 90) {
      type = '即将开始'
      typeClass = 'orange'
    } else if (diffMinutes <= 240) {
      type = '今日重点'
      typeClass = 'amber'
    } else if (item.date !== today) {
      type = '后续安排'
      typeClass = 'red'
    }
    return {
      ...item,
      type,
      typeClass,
      location: item.location || '未设置地点',
      desc: item.note || '暂无额外备注',
      active: index === 0
    }
  })
})
const focusTasks = computed(() => {
  return activeScheduleItems.value.slice(0, 3).map((item, index) => ({
    title: item.title,
    category: item.category || '提醒',
    badge: `P${index + 1}`,
    time: `${formatScheduleDateLabel(item.date)} ${item.time}`,
    owner: item.location || '未设置地点',
    desc: item.note || '暂无备注，可直接在日程中补充说明。',
    progress: `${Math.max(28, 86 - index * 24)}%`
  }))
})
const weekAgenda = computed(() => {
  return activeScheduleItems.value.slice(0, 5).map(item => ({
    day: formatWeekdayLabel(item.date),
    date: item.date.slice(5),
    title: item.title,
    category: item.category || '提醒',
    note: `${item.time} · ${item.location || '未设置地点'}`
  }))
})
const reminders = computed(() => {
  return activeScheduleItems.value.slice(0, 3).map(item => {
    const diffMinutes = Math.max(0, Math.round((getScheduleTimestamp(item) - Date.now()) / 60000))
    return {
      title: `${item.category || '提醒'} · ${item.title}`,
      desc: diffMinutes > 0
        ? `距离开始约 ${diffMinutes} 分钟，地点 ${item.location || '未设置'}。`
        : `该事项已到时间，建议立即处理。`
    }
  })
})
const scheduleStats = computed(() => {
  const pending = activeScheduleItems.value.length
  const total = scheduleItems.value.length
  const completionRate = total === 0 ? '0%' : `${Math.round(((total - pending) / total) * 100)}%`
  return [
    { label: '完成率', value: completionRate },
    { label: '待执行', value: `${pending} 项` },
    { label: '下一项', value: nextScheduleItem.value ? nextScheduleItem.value.time : '--' },
    { label: '自动清理', value: '开启' }
  ]
})
// weatherHeroStyle removed as it's no longer used in V2 layout
function pad2(value) {
  return String(value).padStart(2, '0')
}
function toDateInputValue(date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`
}
function toTimeInputValue(date) {
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`
}
function createScheduleDraft(offsetHours = 1) {
  const date = new Date()
  date.setHours(date.getHours() + offsetHours, 0, 0, 0)
  return {
    title: '',
    date: toDateInputValue(date),
    time: toTimeInputValue(date),
    category: '会议',
    location: '',
    note: ''
  }
}
function createScheduleItem(payload) {
  return {
    id: `${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
    title: payload.title,
    date: payload.date,
    time: payload.time,
    category: payload.category || '提醒',
    location: payload.location || '',
    note: payload.note || '',
    completed: false,
    createdAt: Date.now()
  }
}
function createDefaultScheduleItems() {
  const base = new Date()
  const soon = new Date(base)
  soon.setHours(soon.getHours() + 1, 0, 0, 0)
  const later = new Date(base)
  later.setHours(later.getHours() + 4, 30, 0, 0)
  const tomorrow = new Date(base)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(10, 0, 0, 0)
  return [
    createScheduleItem({
      title: '资料确认',
      date: toDateInputValue(soon),
      time: toTimeInputValue(soon),
      category: '学习',
      location: '作战资料室',
      note: '核对会议材料与待同步重点。'
    }),
    createScheduleItem({
      title: '团队会议',
      date: toDateInputValue(later),
      time: toTimeInputValue(later),
      category: '会议',
      location: '上海国际会议中心 3F',
      note: '提前 20 分钟到场，确认路线和投屏。'
    }),
    createScheduleItem({
      title: '会后复盘',
      date: toDateInputValue(tomorrow),
      time: toTimeInputValue(tomorrow),
      category: '提醒',
      location: '线上同步',
      note: '整理纪要，补充后续执行人。'
    })
  ]
}
function normalizeScheduleItem(item) {
  return {
    ...item,
    category: scheduleCategories.includes(item?.category) ? item.category : '提醒',
    location: item?.location || '',
    note: item?.note || '',
    completed: Boolean(item?.completed)
  }
}
function getScheduleTimestamp(item) {
  return new Date(`${item.date}T${item.time}:00`).getTime()
}
function isScheduleExpired(item) {
  const timestamp = getScheduleTimestamp(item)
  return Number.isFinite(timestamp) && timestamp < Date.now()
}
function formatScheduleDateLabel(dateText) {
  const today = toDateInputValue(new Date())
  const tomorrow = toDateInputValue(new Date(Date.now() + 24 * 60 * 60 * 1000))
  if (dateText === today) return '今天'
  if (dateText === tomorrow) return '明天'
  return dateText.slice(5).replace('-', '/')
}
function formatWeekdayLabel(dateText) {
  const date = new Date(`${dateText}T00:00:00`)
  return new Intl.DateTimeFormat('zh-CN', { weekday: 'short' }).format(date)
}
function cleanupScheduleItems() {
  const filtered = scheduleItems.value
    .filter(item => !item.completed && !isScheduleExpired(item))
    .sort((a, b) => getScheduleTimestamp(a) - getScheduleTimestamp(b))
  if (filtered.length !== scheduleItems.value.length) {
    scheduleItems.value = filtered
  }
}
function persistScheduleItems() {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(scheduleItems.value))
}
function loadScheduleItems() {
  if (typeof window === 'undefined') return
  const raw = window.localStorage.getItem(SCHEDULE_STORAGE_KEY)
  if (!raw) {
    scheduleItems.value = createDefaultScheduleItems()
    persistScheduleItems()
    return
  }
  try {
    const parsed = JSON.parse(raw)
    scheduleItems.value = Array.isArray(parsed) ? parsed.map(normalizeScheduleItem) : []
  } catch (error) {
    scheduleItems.value = createDefaultScheduleItems()
  }
  cleanupScheduleItems()
}
function findScheduleConflict(payload, excludeId = '') {
  return scheduleItems.value.find(item => {
    if (item.id === excludeId) return false
    if (item.completed || isScheduleExpired(item)) return false
    return item.date === payload.date && item.time === payload.time
  })
}
function addScheduleItem() {
  if (!scheduleDraft.value.title || !scheduleDraft.value.date || !scheduleDraft.value.time) {
    scheduleFormMessage.value = '请至少填写标题、日期和时间。'
    return
  }
  const nextItem = createScheduleItem(scheduleDraft.value)
  if (isScheduleExpired(nextItem)) {
    scheduleFormMessage.value = '新日程的时间已经过期，请重新设置。'
    return
  }
  const conflictItem = findScheduleConflict(nextItem)
  if (conflictItem) {
    scheduleFormMessage.value = `时间冲突：${nextItem.time} 已存在“${conflictItem.title}”。`
    return
  }
  scheduleItems.value = [...scheduleItems.value, nextItem].sort((a, b) => getScheduleTimestamp(a) - getScheduleTimestamp(b))
  persistScheduleItems()
  scheduleDraft.value = createScheduleDraft()
  scheduleFormMessage.value = `已添加：${nextItem.title}`
}
function updateScheduleItem() {
  if (!editingScheduleId.value) {
    addScheduleItem()
    return
  }
  if (!scheduleDraft.value.title || !scheduleDraft.value.date || !scheduleDraft.value.time) {
    scheduleFormMessage.value = '请至少填写标题、日期和时间。'
    return
  }
  const currentItem = scheduleItems.value.find(item => item.id === editingScheduleId.value)
  if (!currentItem) {
    editingScheduleId.value = ''
    scheduleDraft.value = createScheduleDraft()
    scheduleFormMessage.value = '未找到要编辑的日程，已切回新增模式。'
    return
  }
  const updatedItem = {
    id: editingScheduleId.value,
    title: scheduleDraft.value.title,
    date: scheduleDraft.value.date,
    time: scheduleDraft.value.time,
    category: scheduleDraft.value.category || '提醒',
    location: scheduleDraft.value.location || '',
    note: scheduleDraft.value.note || '',
    completed: currentItem.completed || false,
    createdAt: currentItem.createdAt || Date.now()
  }
  if (isScheduleExpired(updatedItem)) {
    scheduleFormMessage.value = '修改后的日程时间已经过期，请重新设置。'
    return
  }
  const conflictItem = findScheduleConflict(updatedItem, editingScheduleId.value)
  if (conflictItem) {
    scheduleFormMessage.value = `时间冲突：${updatedItem.time} 已存在“${conflictItem.title}”。`
    return
  }
  scheduleItems.value = scheduleItems.value
    .map(item => (item.id === editingScheduleId.value ? { ...item, ...updatedItem } : item))
    .sort((a, b) => getScheduleTimestamp(a) - getScheduleTimestamp(b))
  persistScheduleItems()
  scheduleFormMessage.value = `已更新：${updatedItem.title}`
  editingScheduleId.value = ''
  scheduleDraft.value = createScheduleDraft()
}
function submitScheduleItem() {
  if (editingScheduleId.value) {
    updateScheduleItem()
    return
  }
  addScheduleItem()
}
function startEditSchedule(item) {
  editingScheduleId.value = item.id
  scheduleDraft.value = {
    title: item.title,
    date: item.date,
    time: item.time,
    category: item.category || '提醒',
    location: item.location || '',
    note: item.note || ''
  }
  scheduleFormMessage.value = `正在编辑：${item.title}`
}
function startCreateSchedule(preset = {}) {
  editingScheduleId.value = ''
  scheduleDraft.value = {
    ...createScheduleDraft(),
    ...preset
  }
  scheduleFormMessage.value = preset?.date
    ? `已切换到新增模式，准备为 ${formatScheduleDateLabel(preset.date)} 创建日程。`
    : '已切换到新增模式，可以继续添加日程。'
}
function cancelScheduleEdit() {
  editingScheduleId.value = ''
  scheduleDraft.value = createScheduleDraft()
  scheduleFormMessage.value = '已取消编辑，可以继续新增日程。'
}
function updateScheduleDraftField(payload) {
  const field = payload?.field
  if (!field) return
  scheduleDraft.value = {
    ...scheduleDraft.value,
    [field]: payload.value
  }
}
function removeScheduleItem(id) {
  const target = scheduleItems.value.find(item => item.id === id)
  if (editingScheduleId.value === id) {
    cancelScheduleEdit()
  }
  scheduleItems.value = scheduleItems.value.filter(item => item.id !== id)
  persistScheduleItems()
  scheduleFormMessage.value = target ? `已删除：${target.title}` : '该日程已删除。'
}
function completeScheduleItem(id) {
  const target = scheduleItems.value.find(item => item.id === id)
  if (editingScheduleId.value === id) {
    cancelScheduleEdit()
  }
  scheduleItems.value = scheduleItems.value.map(item => {
    if (item.id !== id) return item
    return { ...item, completed: true }
  })
  cleanupScheduleItems()
  persistScheduleItems()
  scheduleFormMessage.value = target ? `已完成：${target.title}` : '该日程已标记完成。'
}
function getWeatherDisplay(code) {
  return weatherCodeMap[code] || { text: '天气同步中', icon: '⛅' }
}
function getScheduleCategoryClass(category) {
  if (category === '会议') return 'red'
  if (category === '出行') return 'orange'
  if (category === '学习') return 'amber'
  return 'soft'
}
function formatTemperature(value, withUnit = true) {
  if (!Number.isFinite(value)) return '--'
  return withUnit ? `${Math.round(value)}℃` : `${Math.round(value)}`
}
function formatTimeText(isoString) {
  if (!isoString) return '--'
  return isoString.slice(11, 16)
}
function getAqiLevel(value) {
  if (!Number.isFinite(value)) return '待同步'
  if (value <= 50) return '优'
  if (value <= 100) return '良'
  if (value <= 150) return '轻度污染'
  if (value <= 200) return '中度污染'
  return '重度污染'
}
function buildWeatherIndices(feelsLike, uvIndex, aqiValue) {
  return [
    {
      label: '穿衣',
      level: feelsLike >= 28 ? '轻薄短袖' : feelsLike >= 20 ? '薄外套' : '适当加衣',
      tip: feelsLike >= 28 ? '体感偏暖，建议轻便穿着并及时补水。' : '早晚温差仍在，建议薄外套随身携带。'
    },
    {
      label: '出行',
      level: aqiValue <= 50 ? '适宜' : '注意防护',
      tip: aqiValue <= 50 ? '空气质量不错，通勤和散步体验都比较舒适。' : '建议减少长时间户外停留，必要时佩戴口罩。'
    },
    {
      label: '紫外线',
      level: uvIndex >= 6 ? '较强' : '适中',
      tip: uvIndex >= 6 ? '午后紫外线较强，外出请注意遮阳。' : '紫外线强度适中，日间活动压力不大。'
    }
  ]
}
function buildWeatherAlerts(maxRain, maxWind, currentText) {
  return [
    {
      title: '实时天气同步',
      desc: `当前以“${currentText}”为主，页面数据会自动刷新。`
    },
    {
      title: maxRain >= 50 ? '降水概率偏高' : '降水影响较低',
      desc: maxRain >= 50 ? `未来 24 小时最高降水概率约 ${maxRain}%，出门建议带伞。`
        : `未来 24 小时最高降水概率约 ${maxRain}%，整体出行压力不大。`
    },
    {
      title: maxWind >= 25 ? '风力增强提醒' : '风力平稳',
      desc: maxWind >= 25 ? `阵风峰值约 ${Math.round(maxWind)} km/h，傍晚出行注意保暖。`
        : `风速维持在 ${Math.round(maxWind)} km/h 左右，体感整体稳定。`
    }
  ]
}
async function fetchWeatherData() {
  weatherLoading.value = true
  weatherError.value = ''
  try {
    const { latitude, longitude, city } = weatherLocation.value
    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&timezone=Asia%2FShanghai`
    const airUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=us_aqi,pm2_5,uv_index&timezone=Asia%2FShanghai`
    const [forecastRes, airRes] = await Promise.all([fetch(forecastUrl), fetch(airUrl)])
    if (!forecastRes.ok || !airRes.ok) {
      throw new Error('天气接口请求失败')
    }
    const forecastData = await forecastRes.json()
    const airData = await airRes.json()
    const current = forecastData.current || {}
    const hourly = forecastData.hourly || {}
    const daily = forecastData.daily || {}
    const airCurrent = airData.current || {}
    const currentDisplay = getWeatherDisplay(current.weather_code)
    const high = daily.temperature_2m_max?.[0]
    const low = daily.temperature_2m_min?.[0]
    const firstRainChance = hourly.precipitation_probability?.[0] ?? 0
    const maxRain = Math.max(...(hourly.precipitation_probability || [0]).slice(0, 24))
    const maxWind = Math.max(...(hourly.wind_speed_10m || [current.wind_speed_10m || 0]).slice(0, 24))
    const aqiValue = Number(airCurrent.us_aqi)
    const uvIndex = Number(airCurrent.uv_index)
    const humidity = Number(current.relative_humidity_2m)
    const feelsLike = Number(current.apparent_temperature)

    weatherToday.value = {
      city,
      notice: `${currentDisplay.text} / 实时同步`,
      summary: currentDisplay.text,
      description: `当前体感约 ${formatTemperature(feelsLike)}，湿度 ${Number.isFinite(humidity) ? `${Math.round(humidity)}%` : '--'}，适合按最新天气调整出行安排。`,
      temp: formatTemperature(Number(current.temperature_2m), false),
      high: formatTemperature(high),
      low: formatTemperature(low),
      icon: currentDisplay.icon,
      humidity: Number.isFinite(humidity) ? `${Math.round(humidity)}%` : '--',
      wind: Number.isFinite(current.wind_speed_10m) ? `${Math.round(current.wind_speed_10m)} km/h` : '--'
    }
    weatherMetrics.value = [
      { label: '降水概率', value: `${Math.round(firstRainChance)}%` },
      { label: '风速', value: weatherToday.value.wind },
      { label: '日出日落', value: `${formatTimeText(daily.sunrise?.[0])} / ${formatTimeText(daily.sunset?.[0])}` },
      { label: '体感温度', value: formatTemperature(feelsLike) }
    ]
    weatherSunCycle.value = {
      sunrise: formatTimeText(daily.sunrise?.[0]),
      sunset: formatTimeText(daily.sunset?.[0])
    }
    weatherRainTrend.value = (hourly.time || []).slice(0, 4).map((time, index) => ({
      label: index === 0 ? '现在' : `${time.slice(11, 13)}时`,
      value: `${Math.round(hourly.precipitation_probability?.[index] ?? 0)}%`
    }))
    hourlyForecast.value = (hourly.time || []).slice(0, 14).map((time, index) => {
      const display = getWeatherDisplay(hourly.weather_code?.[index])
      return {
        time: time.slice(11, 16),
        icon: display.icon,
        temp: formatTemperature(Number(hourly.temperature_2m?.[index])),
        text: display.text,
        precipitation: `${Math.round(hourly.precipitation_probability?.[index] ?? 0)}%`
      }
    })
    weeklyForecast.value = (daily.time || []).slice(0, 7).map((dateText, index) => {
      const display = getWeatherDisplay(daily.weather_code?.[index])
      return {
        day: index === 0 ? '今天' : formatWeekdayLabel(dateText),
        date: dateText.slice(5).replace('-', '/'),
        icon: display.icon,
        text: display.text,
        low: formatTemperature(Number(daily.temperature_2m_min?.[index])),
        high: formatTemperature(Number(daily.temperature_2m_max?.[index])),
        level: `${Math.max(36, 90 - index * 7)}%`
      }
    })
    airQuality.value = {
      value: Number.isFinite(aqiValue) ? `${Math.round(aqiValue)}` : '--',
      level: getAqiLevel(aqiValue),
      pm25: Number.isFinite(airCurrent.pm2_5) ? `${Math.round(airCurrent.pm2_5)} ug/m3` : '--',
      humidity: weatherToday.value.humidity,
      uv: Number.isFinite(uvIndex) ? `${Math.round(uvIndex)}` : '--'
    }
    weatherIndices.value = buildWeatherIndices(feelsLike, uvIndex, aqiValue)
    weatherAlerts.value = buildWeatherAlerts(maxRain, maxWind, currentDisplay.text)
    weatherLastSyncedAt.value = Date.now()
  } catch (error) {
    console.error('Weather sync error:', error)
    weatherError.value = '实时天气同步失败，当前保留最近一次可用展示。'
  } finally {
    weatherLoading.value = false
  }
}
async function searchCityLocation(cityName, count = 1) {
  const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=${count}&language=zh&format=json`
  const response = await fetch(geocodeUrl)
  if (!response.ok) {
    throw new Error('城市查询失败')
  }
  const data = await response.json()
  const results = data.results || []
  if (!results.length) {
    throw new Error('未找到该城市')
  }
  const normalized = results.map(result => ({
    latitude: result.latitude,
    longitude: result.longitude,
    name: result.name,
    city: [result.country, result.admin1, result.name].filter(Boolean).join(' · ')
  }))
  return count === 1 ? normalized[0] : normalized
}
async function handleCityWeatherSearch() {
  if (!weatherCityInput.value) {
    weatherError.value = '请输入要查询的城市名称。'
    return
  }
  try {
    const nextLocation = await searchCityLocation(weatherCityInput.value)
    weatherLocation.value = nextLocation
    weatherSuggestions.value = []
    showWeatherCityPicker.value = false
    await fetchWeatherData()
  } catch (error) {
    console.error('City search error:', error)
    weatherError.value = error?.message || '城市切换失败，请稍后再试。'
  }
}
async function fetchWeatherSuggestions(keyword) {
  if (!keyword || keyword.trim().length < 2) {
    weatherSuggestions.value = []
    return
  }
  try {
    const suggestions = await searchCityLocation(keyword, 5)
    weatherSuggestions.value = suggestions
  } catch (error) {
    weatherSuggestions.value = []
  }
}
function selectWeatherSuggestion(item) {
  skipWeatherSuggestOnce.value = true
  weatherCityInput.value = item.name
  weatherLocation.value = {
    latitude: item.latitude,
    longitude: item.longitude,
    city: item.city
  }
  weatherSuggestions.value = []
  showWeatherCityPicker.value = false
  fetchWeatherData()
}
function persistWeatherLocation() {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(WEATHER_LOCATION_STORAGE_KEY, JSON.stringify(weatherLocation.value))
}
function loadWeatherLocation() {
  if (typeof window === 'undefined') return
  const raw = window.localStorage.getItem(WEATHER_LOCATION_STORAGE_KEY)
  if (!raw) return
  try {
    const parsed = JSON.parse(raw)
    if (parsed?.latitude && parsed?.longitude && parsed?.city) {
      weatherLocation.value = parsed
      weatherCityInput.value = parsed.city.split(' · ').pop() || parsed.city
    }
  } catch (error) {
    weatherLocation.value = { ...WEATHER_COORDS }
  }
}

const parseGeolocationPayload = (result = {}) => {
  const position = result?.position
  const longitude = Number(position?.lng)
  const latitude = Number(position?.lat)

  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    throw new Error('定位结果缺少有效坐标')
  }

  const addressComponent = result?.addressComponent || {}
  const city = addressComponent.city || addressComponent.province || addressComponent.district || '未知位置'
  const district = addressComponent.district || ''
  const formattedAddress = result?.formattedAddress || [
    addressComponent.province,
    addressComponent.city,
    addressComponent.district,
    addressComponent.township,
    addressComponent.street,
    addressComponent.streetNumber
  ].filter(Boolean).join('')

  return {
    latitude,
    longitude,
    city: `${city} ${district}`.trim(),
    name: formattedAddress || city,
    address: formattedAddress || city
  }
}

const reverseGeocodeAmapLocation = async ({ longitude, latitude, fallback = {} }) => {
  await ensureAmapServices()

  return new Promise((resolve) => {
    if (!amapGeocoderRef.value) {
      resolve(fallback)
      return
    }

    amapGeocoderRef.value.getAddress([longitude, latitude], (status, result) => {
      if (status !== 'complete') {
        resolve(fallback)
        return
      }

      const regeocode = result?.regeocode || {}
      const addressComponent = regeocode.addressComponent || {}
      const cityValue = Array.isArray(addressComponent.city)
        ? addressComponent.city[0]
        : addressComponent.city
      const city = cityValue || addressComponent.province || addressComponent.district || fallback.city || '未知位置'
      const district = addressComponent.district || ''
      const formattedAddress = regeocode.formattedAddress || fallback.address || fallback.name || city

      resolve({
        latitude,
        longitude,
        city: `${city} ${district}`.trim(),
        name: formattedAddress,
        address: formattedAddress
      })
    })
  })
}
const scheduleDateLabel = computed(() => {
  return new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
})
const weatherDateLabel = computed(() => {
  return new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
})

const pilotPortrait = computed(() => {
  if (currentCharacter.value === 'Asuka') return '/image/Asuka/cool.png'
  if (currentCharacter.value === 'campus') return '/image/campusAsuka/微信图片_20260517235327_733_357.png'
  return '/image/qian/cool.png'
})

const pilotThumb = computed(() => {
  if (currentCharacter.value === 'Asuka') return '/image/Asuka/happy.png'
  if (currentCharacter.value === 'campus') return '/image/campusAsuka/微信图片_20260517235327_733_357.png'
  return '/image/qian/happy.png'
})

const moodThumb = computed(() => {
  if (currentCharacter.value === 'Asuka') return '/image/Asuka/excitement.png'
  if (currentCharacter.value === 'campus') return '/image/campusAsuka/微信图片_20260517235405_747_357.png'
  return '/image/qian/surpise.png'
})

const unitPortrait = computed(() => {
  if (currentCharacter.value === 'Asuka') return '/image/Asuka/serious.png'
  if (currentCharacter.value === 'campus') return '/image/campusAsuka/微信图片_20260517235329_734_357.png'
  return '/image/qian/think.png'
})

const currentEmotion = computed(() => {
  if (isThinking.value) return 'think'
  const aiMessages = currentMessages.value.filter(m => m.role === 'assistant')
  return aiMessages.length ? aiMessages[aiMessages.length - 1].emotion : 'happy'
})

const latestAiMessage = computed(() => {
  if (isThinking.value) return '...'
  const aiMessages = currentMessages.value.filter(m => m.role === 'assistant')
  return aiMessages.length
    ? aiMessages[aiMessages.length - 1].content
    : '好的，上海今日多云转晴，22℃~28℃。我已经为你创建了下午3:00的会议提醒，还可以继续为你导航、定位或查询更多信息。'
})

// DeepSeek API 配置
const DEEPSEEK_API_KEY = 'sk-9be4c0e009d543d086aacc6d098b08db' // 请在此处填入您的 API Key
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'

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
    shy: 'shy',
    awkward: 'shy',
    idiot: 'angry'
  }

  return aliasMap[normalized] || normalized || 'happy'
}

const handleSendMsg = async (text) => {
  const roleSnapshot = currentCharacter.value
  messagesMap.value[roleSnapshot].push({ role: 'user', content: text })
  scrollToBottom()
  isThinking.value = true
  
  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat", // 对应 DeepSeek-V4-Pro 或其最新可用模型名
        messages: [
          {
            role: "system",
            content: `你是一个可爱的AI助手。根据当前角色（${roleSnapshot}）进行回复。
            如果是 Asuka，语气要傲娇、活泼、充满元气；
            如果是 qian，语气要温柔、清新、知性；
            如果是 campus，语气要充满校园气息、热情、乐于助人。
            请在回复内容的开头使用 [emotion] 标签来表达你的情绪，可选标签有：
            [happy], [sad], [angry], [think], [wink], [curious], [listen], [serious], [like], [sleepy], [shy]。
            例如：[happy] 见到你真高兴！`
          },
          ...messagesMap.value[roleSnapshot].map(m => ({ role: m.role, content: m.content }))
        ],
        temperature: 0.7
      })
    })

    const data = await response.json()
    isThinking.value = false

    if (data.choices && data.choices.length > 0) {
      const rawAiResponse = data.choices[0].message.content
      const { emotion, cleanText } = parseEmotion(rawAiResponse)
      
      messagesMap.value[roleSnapshot].push({ role: 'assistant', content: cleanText, emotion })
      isTyping.value = true
      scrollToBottom()
    } else {
      throw new Error('API 响应异常')
    }
  } catch (error) { 
    console.error('DeepSeek API Error:', error)
    isThinking.value = false
    messagesMap.value[roleSnapshot].push({ 
      role: 'assistant', 
      content: '抱歉，我现在连接大模型出了一点小状况，请稍后再试。', 
      emotion: 'sad' 
    })
    isTyping.value = true
    scrollToBottom()
  }
}

const handleTypingEnd = () => {
  isTyping.value = false
  setTimeout(() => {
    const lastMsgIndex = currentMessages.value.length - 1
    const lastMessage = lastMsgIndex >= 0 ? currentMessages.value[lastMsgIndex] : null
    if (lastMessage?.role === 'assistant') {
      // 保持当前表情或者恢复成默认的 happy，这里暂时保持气泡对应的最后情绪比较好
      // 也可以强制改回 'happy'
      // currentMessages.value[lastMsgIndex].emotion = 'happy'
    }
  }, 3000)
}

const parseEmotion = (rawText) => {
  // 使用更宽松的正则，忽略前导空白和换行
  const match = rawText.match(/^\s*\[(.*?)\]\s*(.*)/s)
  if (match) { 
    return { emotion: normalizeEmotion(match[1]), cleanText: match[2] } 
  }
  return { emotion: 'happy', cleanText: rawText }
}

const scrollToBottom = async () => {
  await nextTick()
  if (historyRef.value) {
    historyRef.value.scrollTop = historyRef.value.scrollHeight
  }
}

const sanitizeAmapInstruction = (text) => {
  return String(text || '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

const formatAmapDistance = (meters) => {
  const distance = Number(meters || 0)
  if (distance >= 1000) {
    return `${Number((distance / 1000).toFixed(distance >= 10000 ? 0 : 1))} km`
  }
  return `${Math.max(1, Math.round(distance))} m`
}

const isValidAmapCoord = (coord) => {
  return Array.isArray(coord) && coord.length >= 2 && typeof coord[0] === 'number' && typeof coord[1] === 'number' && !isNaN(coord[0]) && !isNaN(coord[1])
}

const extractAmapPathPoints = (steps = [], route = {}) => {
  const path = []

  const pushPoint = (point) => {
    if (!point) return
    let lng, lat
    if (Array.isArray(point) && point.length >= 2) {
      lng = point[0]
      lat = point[1]
    } else if (typeof point.lng === 'number' && typeof point.lat === 'number') {
      lng = point.lng
      lat = point.lat
    } else if (typeof point.getLng === 'function' && typeof point.getLat === 'function') {
      lng = point.getLng()
      lat = point.getLat()
    }

    if (typeof lng === 'number' && typeof lat === 'number' && !isNaN(lng) && !isNaN(lat)) {
      path.push([lng, lat])
    }
  }

  steps.forEach((step) => {
    if (Array.isArray(step.path)) {
      step.path.forEach(pushPoint)
    }
    if (Array.isArray(step.tmcs)) {
      step.tmcs.forEach((tmc) => {
        if (Array.isArray(tmc.path)) {
          tmc.path.forEach(pushPoint)
        }
      })
    }
  })

  if (!path.length && Array.isArray(route.path)) {
    route.path.forEach(pushPoint)
  }

  return path
}

const clearAmapRouteOverlays = () => {
  if (!amapInstance.value) return
  const overlays = [...amapRouteOverlays.markers]
  if (amapRouteOverlays.polyline) {
    overlays.push(amapRouteOverlays.polyline)
  }
  if (overlays.length) {
    amapInstance.value.remove(overlays)
  }
  amapRouteOverlays.markers = []
  amapRouteOverlays.polyline = null
}

const ensureAmapServices = async () => {
  const AMap = await loadAmapScript()
  // #region debug-point D:service-constructors
  reportAmapAppDebug('D', 'ensureAmapServices received AMap', {
    hasMapCtor: Boolean(AMap?.Map),
    hasGeocoderCtor: Boolean(AMap?.Geocoder),
    hasPlaceSearchCtor: Boolean(AMap?.PlaceSearch),
    hasWalkingCtor: Boolean(AMap?.Walking),
    hasDrivingCtor: Boolean(AMap?.Driving)
  })
  // #endregion
  if (!amapGeocoderRef.value) {
    amapGeocoderRef.value = new AMap.Geocoder()
  }
  if (!amapPlaceSearchRef.value) {
    amapPlaceSearchRef.value = new AMap.PlaceSearch({
      city: '全国',
      citylimit: false,
      pageSize: 1
    })
  }
  if (!amapWalkingRef.value) {
    amapWalkingRef.value = new AMap.Walking()
  }
  if (!amapDrivingRef.value) {
    amapDrivingRef.value = new AMap.Driving()
  }
  // #region debug-point D:service-created
  reportAmapAppDebug('D', 'ensureAmapServices instances ready', {
    hasGeocoderInstance: Boolean(amapGeocoderRef.value),
    hasPlaceSearchInstance: Boolean(amapPlaceSearchRef.value),
    hasWalkingInstance: Boolean(amapWalkingRef.value),
    hasDrivingInstance: Boolean(amapDrivingRef.value),
    hasSecurityConfig: Boolean(window._AMapSecurityConfig),
    securityConfigKeys: Object.keys(window._AMapSecurityConfig || {})
  })
  // #endregion
  return AMap
}

const resolveAmapKeyword = async (keyword, fallback = null) => {
  const normalized = String(keyword || '').trim()
  const traceId = `keyword-${Date.now()}-${++amapPlanTraceSeed.value}`
  // #region debug-point A:keyword-entry
  reportAmapAppDebug('A', 'resolveAmapKeyword entered', {
    traceId,
    normalized,
    hasFallback: Boolean(fallback),
    fallbackAddress: fallback?.address || ''
  })
  // #endregion
  if (!normalized && fallback) {
    // #region debug-point A:keyword-fallback-empty
    reportAmapAppDebug('A', 'resolveAmapKeyword used fallback for empty keyword', {
      traceId,
      normalized,
      fallbackAddress: fallback?.address || ''
    })
    // #endregion
    return fallback
  }
  if (!normalized) {
    throw new Error('请输入起点和终点')
  }
  if (fallback && (normalized === '当前位置' || normalized === fallback.address || normalized === fallback.name)) {
    // #region debug-point A:keyword-fallback-match
    reportAmapAppDebug('A', 'resolveAmapKeyword matched fallback directly', {
      traceId,
      normalized,
      fallbackAddress: fallback.address,
      fallbackName: fallback.name
    })
    // #endregion
    return fallback
  }

  await ensureAmapServices()

  const tryPlaceSearch = () =>
    new Promise((resolve, reject) => {
      const callbackWatchdog = window.setTimeout(() => {
        // #region debug-point A:place-search-timeout
        reportAmapAppDebug('A', 'resolveAmapKeyword place search callback pending after timeout', {
          traceId,
          normalized
        })
        // #endregion
      }, 8000)
      // #region debug-point A:place-search-dispatch
      reportAmapAppDebug('A', 'resolveAmapKeyword dispatching place search', {
        traceId,
        normalized
      })
      // #endregion
      amapPlaceSearchRef.value.search(normalized, (status, result) => {
        window.clearTimeout(callbackWatchdog)
        const poi = result?.poiList?.pois?.[0]
        // #region debug-point A:place-search-callback
        reportAmapAppDebug('A', 'resolveAmapKeyword place search callback', {
          traceId,
          normalized,
          status,
          info: result?.info || '',
          infocode: result?.infocode || result?.infoCode || '',
          resultKeys: Object.keys(result || {}).slice(0, 8),
          poiCount: result?.poiList?.pois?.length || 0,
          hasLocation: Boolean(poi?.location)
        })
        // #endregion
        if (status === 'complete' && poi?.location) {
          resolve({
            name: poi.name || normalized,
            address: poi.address ? `${poi.name} · ${poi.address}` : poi.name || normalized,
            position: [poi.location.lng, poi.location.lat]
          })
          return
        }
        reject(new Error('place search miss'))
      })
    })

  const tryGeocoder = () =>
    new Promise((resolve, reject) => {
      let settled = false
      const callbackWatchdog = window.setTimeout(() => {
        if (settled) return
        settled = true
        // #region debug-point C:geocoder-timeout
        reportAmapAppDebug('C', 'resolveAmapKeyword geocoder callback pending after timeout', {
          traceId,
          normalized
        })
        // #endregion
        reject(new Error(`地址解析超时：${normalized}，请尝试输入更完整的地址`))
      }, 8000)
      // #region debug-point A:geocoder-dispatch
      reportAmapAppDebug('A', 'resolveAmapKeyword dispatching geocoder', {
        traceId,
        normalized
      })
      // #endregion
      amapGeocoderRef.value.getLocation(normalized, (status, result) => {
        if (settled) return
        settled = true
        window.clearTimeout(callbackWatchdog)
        const geocode = result?.geocodes?.[0]
        // #region debug-point A:geocoder-callback
        reportAmapAppDebug('A', 'resolveAmapKeyword geocoder callback', {
          traceId,
          normalized,
          status,
          info: result?.info || '',
          infocode: result?.infocode || result?.infoCode || '',
          resultKeys: Object.keys(result || {}).slice(0, 8),
          geocodeCount: result?.geocodes?.length || 0,
          hasLocation: Boolean(geocode?.location)
        })
        // #endregion
        if (status === 'complete' && geocode?.location) {
          resolve({
            name: normalized,
            address: geocode.formattedAddress || normalized,
            position: [geocode.location.lng, geocode.location.lat]
          })
          return
        }
        reject(new Error(`未找到地址：${normalized}`))
      })
    })

  try {
    const placeResult = await tryPlaceSearch()
    // #region debug-point A:keyword-place-success
    reportAmapAppDebug('A', 'resolveAmapKeyword resolved by place search', {
      traceId,
      normalized,
      resolvedAddress: placeResult.address,
      position: placeResult.position
    })
    // #endregion
    return placeResult
  } catch (error) {
    // #region debug-point A:keyword-place-failed
    reportAmapAppDebug('A', 'resolveAmapKeyword place search failed, fallback to geocoder', {
      traceId,
      normalized,
      errorMessage: error?.message || '',
      errorName: error?.name || ''
    })
    // #endregion
    const geocodeResult = await tryGeocoder()
    // #region debug-point A:keyword-geocoder-success
    reportAmapAppDebug('A', 'resolveAmapKeyword resolved by geocoder', {
      traceId,
      normalized,
      resolvedAddress: geocodeResult.address,
      position: geocodeResult.position
    })
    // #endregion
    return geocodeResult
  }
}

const drawAmapRouteOverlay = async ({ path, start, end }) => {
  if (!amapInstance.value) return
  const AMap = await ensureAmapServices()
  clearAmapRouteOverlays()

  // 验证坐标有效性，防止 Pixel(NaN, NaN) 错误
  if (!isValidAmapCoord(start) || !isValidAmapCoord(end)) {
    console.error('Invalid start or end position for route overlay:', { start, end })
    throw new Error('起止点坐标无效，无法在地图上显示')
  }

  const validPath = (path || []).filter(isValidAmapCoord)
  if (validPath.length < 2) {
    console.warn('Route path has insufficient valid points:', path)
  }

  const strokeColor = asukaNavMode.value === 'walking' ? '#ff9f78' : '#ff4b2a'
  const startMarker = new AMap.Marker({
    position: start,
    title: '起点',
    label: {
      content: '<div class="asuka-amap-label">起点</div>',
      direction: 'right',
      offset: new AMap.Pixel(12, -4)
    }
  })
  const endMarker = new AMap.Marker({
    position: end,
    title: '终点',
    label: {
      content: '<div class="asuka-amap-label end">终点</div>',
      direction: 'right',
      offset: new AMap.Pixel(12, -4)
    }
  })
  const polyline = new AMap.Polyline({
    path: validPath,
    isOutline: true,
    outlineColor: 'rgba(255,255,255,0.95)',
    borderWeight: 4,
    strokeColor,
    strokeOpacity: 0.96,
    strokeWeight: 7,
    lineJoin: 'round',
    lineCap: 'round',
    showDir: true,
    zIndex: 90
  })

  try {
    amapInstance.value.add([polyline, startMarker, endMarker])
    amapRouteOverlays.markers = [startMarker, endMarker]
    amapRouteOverlays.polyline = polyline
  } catch (err) {
    console.error('Failed to add route overlays to map:', err)
    throw new Error('无法在地图上绘制路径，请尝试刷新页面')
  }
}

const updateAmapRouteSummary = ({ start, end, route, steps }) => {
  const durationMinutes = Math.max(1, Math.round(Number(route.time || route.duration || 0) / 60))
  const instructionList = steps
    .map((step) => sanitizeAmapInstruction(step.instruction || step.road || step.assistant_action || step.action))
    .filter(Boolean)
    .slice(0, 4)

  amapRouteSummary.value = {
    destination: end.name,
    etaLabel: `ETA ${durationMinutes} min`,
    distanceText: formatAmapDistance(route.distance),
    durationText: `预计 ${durationMinutes} 分钟`,
    pathName: `${start.name} → ${end.name}`,
    startAddress: start.address,
    startCoordText: `${start.position[0].toFixed(4)}, ${start.position[1].toFixed(4)}`,
    steps: instructionList.length
      ? instructionList.map((instruction, index) => ({
          title: instruction,
          desc: index === instructionList.length - 1 ? `目的地：${end.name}` : `第 ${index + 1} 段导航`
        }))
      : [
          { title: '从起点出发', desc: start.name },
          { title: '沿推荐路线前进', desc: `预计 ${durationMinutes} 分钟` },
          { title: '抵达终点', desc: end.name }
        ]
  }
}

const focusAsukaRoute = () => {
  if (!amapInstance.value) return
  const overlays = [...amapRouteOverlays.markers]
  if (amapRouteOverlays.polyline) {
    overlays.push(amapRouteOverlays.polyline)
  }
  if (overlays.length) {
    amapInstance.value.setFitView(overlays, false, [72, 88, 88, 72])
  }
}

const planAsukaRoute = async () => {
  const traceId = `asuka-route-${Date.now()}-${++amapPlanTraceSeed.value}`
  // #region debug-point C:plan-entry
  reportAmapAppDebug('C', 'planAsukaRoute entered', {
    traceId,
    hasMapInstance: Boolean(amapInstance.value),
    isPlanning: amapPlanning.value,
    mode: asukaNavMode.value,
    startKeyword: navStart.value,
    endKeyword: navEnd.value,
    currentStatus: amapStatus.value
  })
  // #endregion
  if (!amapInstance.value || amapPlanning.value) {
    // #region debug-point C:plan-early-return
    reportAmapAppDebug('C', 'planAsukaRoute returned early', {
      traceId,
      hasMapInstance: Boolean(amapInstance.value),
      isPlanning: amapPlanning.value
    })
    // #endregion
    return
  }

  try {
    amapPlanning.value = true
    amapStatus.value = '路径规划中...'
    amapErrorDetail.value = ''

    const [start, end] = await Promise.all([
      resolveAmapKeyword(navStart.value, ASUKA_DEFAULT_START),
      resolveAmapKeyword(navEnd.value, ASUKA_DEFAULT_END)
    ])
    const service = asukaNavMode.value === 'walking' ? amapWalkingRef.value : amapDrivingRef.value
    // #region debug-point B:service-selected
    reportAmapAppDebug('B', 'planAsukaRoute selected navigation service', {
      traceId,
      mode: asukaNavMode.value,
      hasService: Boolean(service),
      hasWalkingInstance: Boolean(amapWalkingRef.value),
      hasDrivingInstance: Boolean(amapDrivingRef.value),
      startPosition: start.position,
      endPosition: end.position
    })
    // #endregion

    const result = await new Promise((resolve, reject) => {
      const callbackWatchdog = window.setTimeout(() => {
        // #region debug-point C:search-timeout
        reportAmapAppDebug('C', 'planAsukaRoute search callback still pending after timeout', {
          traceId,
          mode: asukaNavMode.value,
          startPosition: start.position,
          endPosition: end.position
        })
        // #endregion
      }, 10000)
      // #region debug-point B:search-dispatch
      reportAmapAppDebug('B', 'planAsukaRoute dispatching service.search', {
        traceId,
        mode: asukaNavMode.value,
        startPosition: start.position,
        endPosition: end.position
      })
      // #endregion
      service.search(start.position, end.position, (status, payload) => {
        window.clearTimeout(callbackWatchdog)
        const route = payload?.routes?.[0] || payload?.route?.routes?.[0]
        // #region debug-point C:search-callback
        reportAmapAppDebug('C', 'planAsukaRoute service.search callback fired', {
          traceId,
          status,
          hasPayload: Boolean(payload),
          info: payload?.info || '',
          infocode: payload?.infocode || payload?.infoCode || '',
          payloadKeys: Object.keys(payload || {}).slice(0, 8),
          hasRoute: Boolean(route),
          routeCount: payload?.routes?.length || payload?.route?.routes?.length || 0
        })
        // #endregion
        if (status !== 'complete' || !route) {
          reject(new Error('高德路线规划失败，请尝试输入更具体的地址'))
          return
        }
        const steps = route.steps || []
        const path = extractAmapPathPoints(steps, route)
        // #region debug-point D:route-resolved
        reportAmapAppDebug('D', 'planAsukaRoute resolved route payload', {
          traceId,
          stepCount: steps.length,
          pathPointCount: path.length,
          routeDistance: route.distance || 0,
          routeDuration: route.time || route.duration || 0
        })
        // #endregion
        resolve({ route, steps, path: path.length ? path : [start.position, end.position] })
      })
    })

    await drawAmapRouteOverlay({
      path: result.path,
      start: start.position,
      end: end.position
    })
    updateAmapRouteSummary({
      start,
      end,
      route: result.route,
      steps: result.steps
    })
    focusAsukaRoute()
    amapStatus.value = '路线已规划'
    // #region debug-point D:plan-success
    reportAmapAppDebug('D', 'planAsukaRoute completed successfully', {
      traceId,
      summaryPathName: amapRouteSummary.value.pathName,
      distanceText: amapRouteSummary.value.distanceText,
      durationText: amapRouteSummary.value.durationText,
      overlayMarkerCount: amapRouteOverlays.markers.length,
      hasPolyline: Boolean(amapRouteOverlays.polyline)
    })
    // #endregion
  } catch (error) {
    amapStatus.value = '路线规划失败'
    // #region debug-point D:plan-error
    reportAmapAppDebug('D', 'planAsukaRoute failed', {
      traceId,
      errorMessage: error?.message || '',
      errorName: error?.name || '',
      detail: amapErrorDetail.value,
      mode: asukaNavMode.value
    })
    // #endregion
    console.error('Asuka route plan error:', error)
    amapErrorDetail.value = error?.message || '请尝试输入更完整的起点和终点'
  } finally {
    amapPlanning.value = false
    // #region debug-point D:plan-finally
    reportAmapAppDebug('D', 'planAsukaRoute finalized', {
      traceId,
      isPlanning: amapPlanning.value,
      currentStatus: amapStatus.value,
      errorDetail: amapErrorDetail.value
    })
    // #endregion
  }
}

const setAsukaNavMode = async (mode) => {
  if (asukaNavMode.value === mode) return
  asukaNavMode.value = mode
  if (asukaPage.value === 'nav' && currentCharacter.value === 'Asuka' && amapInstance.value) {
    await planAsukaRoute()
  }
}

const requestAmapGeolocation = async () => {
  const prevStatus = amapStatus.value
  amapStatus.value = '正在获取您的地理位置...'
  locatingUser.value = true
  try {
    const AMap = await ensureAmapServices()
    return new Promise((resolve, reject) => {
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,
        timeout: 10000,
        zoomToAccuracy: true,
        noIpLocate: 0, // 优先使用浏览器定位
        noGeoLocation: 0
      })

      geolocation.getCurrentPosition(async (status, result) => {
        if (status === 'complete') {
          const parsedLocation = parseGeolocationPayload(result)
          const newLocation = await reverseGeocodeAmapLocation({
            longitude: parsedLocation.longitude,
            latitude: parsedLocation.latitude,
            fallback: parsedLocation
          })

          // 1. 同步更新天气位置
          weatherLocation.value = newLocation
          geoSyncKey.value += 1
          weatherCityInput.value = newLocation.city.split(' ').filter(Boolean)[0] || newLocation.city
          persistWeatherLocation()
          await fetchWeatherData()

          // 2. 同步更新导航起点
          navStart.value = newLocation.address

          // 3. 刷新地图视图 (如果地图已存在)
          if (amapInstance.value) {
            amapInstance.value.setZoomAndCenter(15, [newLocation.longitude, newLocation.latitude])
            // 如果在导航页，重新规划路线
            if (asukaPage.value === 'nav') {
              await planAsukaRoute()
            }
          }

          amapStatus.value = '位置已更新'
          resolve(newLocation)
        } else {
          console.warn('Geolocation failed, falling back to IP:', result)
          // 如果高精度定位失败，尝试获取大概位置
          geolocation.getCityInfo(async (cityStatus, cityResult) => {
            if (cityStatus === 'complete') {
              const cityName = cityResult?.city || cityResult?.province || '未知位置'
              weatherCityInput.value = cityName.split(/[\s·]/).filter(Boolean)[0] || cityName
              try {
                const cityLocation = await searchCityLocation(cityName)
                weatherLocation.value = {
                  latitude: cityLocation.latitude,
                  longitude: cityLocation.longitude,
                  city: cityLocation.city,
                  name: cityLocation.name,
                  address: cityLocation.city
                }
                await fetchWeatherData()
              } catch (error) {
                weatherLocation.value = {
                  ...weatherLocation.value,
                  city: cityName,
                  name: cityName,
                  address: cityName
                }
              }
              geoSyncKey.value += 1
              persistWeatherLocation()
              amapStatus.value = '已通过IP获取大概位置'
              resolve(weatherLocation.value)
            } else {
              amapStatus.value = '自动定位失败，已使用默认位置'
              reject(new Error(result?.message || '定位失败'))
            }
          })
        }
      })
    })
  } catch (error) {
    console.error('Geolocation error:', error)
    amapStatus.value = '定位功能不可用'
    setTimeout(() => { amapStatus.value = prevStatus }, 3000)
    throw error
  } finally {
    locatingUser.value = false
  }
}

const fillAsukaCurrentLocation = async () => {
  try {
    const location = await requestAmapGeolocation()
    navStart.value = location?.address || ASUKA_DEFAULT_START.address
    if (amapInstance.value) {
      await planAsukaRoute()
    }
  } catch (error) {
    navStart.value = ASUKA_DEFAULT_START.address
    if (amapInstance.value) {
      await planAsukaRoute()
    }
  }
}

const initAmapMap = async () => {
  await nextTick()
  if (asukaPage.value !== 'nav' || currentCharacter.value !== 'Asuka' || !amapContainerRef.value) return

  try {
    // #region debug-point E:init-start
    reportAmapAppDebug('E', 'initAmapMap start', {
      page: asukaPage.value,
      character: currentCharacter.value,
      hasContainer: Boolean(amapContainerRef.value),
      hasMapInstance: Boolean(amapInstance.value)
    })
    // #endregion
    amapStatus.value = '高德地图载入中...'
    amapErrorDetail.value = ''
    const AMap = await ensureAmapServices()

    if (amapInstance.value) {
      // 切换页面回来时，容器 div 已被 Vue 销毁并重建，旧的地图实例已失效
      // 必须销毁旧实例并重新创建，否则会导致坐标转换失败 (Pixel NaN)
      try {
        amapInstance.value.destroy()
      } catch (e) {
        console.warn('Failed to destroy old amap instance:', e)
      }
      amapInstance.value = null
    }

    amapInstance.value = new AMap.Map(amapContainerRef.value, {
      viewMode: '3D',
      zoom: 14,
      center: [weatherLocation.value.longitude, weatherLocation.value.latitude],
      mapStyle: 'amap://styles/darkblue'
    })

    AMap.plugin(['AMap.Scale', 'AMap.ToolBar'], () => {
      amapInstance.value.addControl(new AMap.Scale())
      amapInstance.value.addControl(new AMap.ToolBar({ position: 'RB' }))
    })

    setTimeout(() => {
      amapInstance.value && amapInstance.value.resize()
    }, 80)

    amapStatus.value = '高德地图已连接'
    await planAsukaRoute()
  } catch (error) {
    // #region debug-point E:init-error
    reportAmapAppDebug('E', 'initAmapMap failed', {
      status: amapStatus.value,
      errorMessage: error?.message || '',
      errorName: error?.name || '',
      detail: amapErrorDetail.value
    })
    // #endregion
    console.error('AMap load error:', error)
    amapErrorDetail.value = error?.message || '请检查高德地图配置'
    if (!amapStatus.value.includes('请先')) {
      amapStatus.value = '高德地图加载失败'
    }
  }
}

watch([asukaPage, currentCharacter], async ([page, character]) => {
  if (page === 'nav' && character === 'Asuka') {
    await initAmapMap()
  }
  if (character === 'Asuka' && page === 'weather' && Date.now() - weatherLastSyncedAt.value > 10 * 60 * 1000) {
    await fetchWeatherData()
  }
  if (character === 'Asuka' && page === 'schedule') {
    cleanupScheduleItems()
  }
})

watch([qianPage, currentCharacter], async ([page, character]) => {
  if (character === 'qian' && page === 'weather' && Date.now() - weatherLastSyncedAt.value > 10 * 60 * 1000) {
    await fetchWeatherData()
  }
  if (character === 'qian' && page === 'schedule') {
    cleanupScheduleItems()
  }
})

watch(scheduleItems, () => {
  persistScheduleItems()
}, { deep: true })

watch(weatherLocation, () => {
  persistWeatherLocation()
}, { deep: true })

watch(weatherCityInput, (value) => {
  if (skipWeatherSuggestOnce.value) {
    skipWeatherSuggestOnce.value = false
    return
  }
  if (weatherSuggestTimer.value) {
    clearTimeout(weatherSuggestTimer.value)
  }
  weatherSuggestTimer.value = setTimeout(() => {
    fetchWeatherSuggestions(value)
  }, 240)
})

onMounted(async () => {
  loadWeatherLocation()
  loadScheduleItems()
  cleanupScheduleItems()
  
  // 如果没有保存的位置，或者明确需要自动定位
  if (!localStorage.getItem(WEATHER_LOCATION_STORAGE_KEY)) {
    try {
      await requestAmapGeolocation()
    } catch (e) {
      console.warn('Initial geolocation failed, using default.', e)
      await fetchWeatherData()
    }
  } else {
    await fetchWeatherData()
  }

  weatherRefreshTimer.value = window.setInterval(() => {
    fetchWeatherData()
  }, WEATHER_REFRESH_INTERVAL)
  scheduleCleanupTimer.value = window.setInterval(() => {
    cleanupScheduleItems()
  }, SCHEDULE_CLEANUP_INTERVAL)
  if (asukaPage.value === 'nav' && currentCharacter.value === 'Asuka') {
    await initAmapMap()
  }
})

onBeforeUnmount(() => {
  if (weatherRefreshTimer.value) {
    clearInterval(weatherRefreshTimer.value)
  }
  if (scheduleCleanupTimer.value) {
    clearInterval(scheduleCleanupTimer.value)
  }
  if (weatherSuggestTimer.value) {
    clearTimeout(weatherSuggestTimer.value)
  }
  clearAmapRouteOverlays()
  if (amapInstance.value) {
    amapInstance.value.destroy()
    amapInstance.value = null
  }
})
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background: #070303;
}

/* EVA 布局原有样式保持不变... */
.eva-layout {
  --bg-page: radial-gradient(circle at top, rgba(255, 60, 24, 0.22), transparent 28%), #080405;
  --panel-bg: linear-gradient(180deg, rgba(20, 10, 10, 0.96), rgba(12, 5, 5, 0.96));
  --panel-soft: linear-gradient(180deg, rgba(34, 10, 10, 0.92), rgba(17, 6, 6, 0.92));
  --text-main: #ffe9df;
  --text-soft: #cfa39a;
  --text-dim: #8b5550;
  --accent: #ff5b35;
  --accent-strong: #ff2f15;
  --accent-soft: rgba(255, 91, 53, 0.18);
  --line: rgba(255, 89, 48, 0.55);
  --line-soft: rgba(255, 89, 48, 0.24);
  --glow: 0 0 0 1px rgba(255, 100, 61, 0.35), 0 0 18px rgba(255, 73, 25, 0.2), inset 0 0 24px rgba(255, 73, 25, 0.1);
  --input-bg: rgba(36, 16, 16, 0.95);
  --primary-color: #ff5930;
  --hover-color: rgba(255, 91, 53, 0.12);
  --border-color: rgba(255, 89, 48, 0.4);
  --icon-bg: linear-gradient(180deg, #ff7149, #ff4a26);
  --icon-text: #fff7f3;
  --bubble-fill: #fff9f5;
  --bubble-border: #ff6a47;
  --bubble-text: #2c1a16;
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 100vh;
  color: var(--text-main);
  background: var(--bg-page);
  position: relative;
  overflow: hidden;
}

.eva-layout::before {
  content: "";
  position: fixed;
  inset: 0;
  background:
    linear-gradient(rgba(255, 70, 30, 0.05), rgba(255, 70, 30, 0.05)),
    repeating-linear-gradient(
      0deg,
      transparent 0,
      transparent 31px,
      rgba(255, 80, 40, 0.03) 32px
    );
  pointer-events: none;
}

.eva-layout.theme-qian {
  --bg-page: radial-gradient(circle at top, rgba(171, 123, 255, 0.25), transparent 30%), #0b0710;
  --panel-bg: linear-gradient(180deg, rgba(20, 12, 32, 0.96), rgba(11, 7, 20, 0.96));
  --panel-soft: linear-gradient(180deg, rgba(29, 16, 48, 0.92), rgba(14, 8, 26, 0.92));
  --text-main: #f2ebff;
  --text-soft: #cfbdee;
  --text-dim: #8e77b6;
  --accent: #b07dff;
  --accent-strong: #9456ff;
  --accent-soft: rgba(176, 125, 255, 0.16);
  --line: rgba(176, 125, 255, 0.55);
  --line-soft: rgba(176, 125, 255, 0.26);
  --glow: 0 0 0 1px rgba(176, 125, 255, 0.35), 0 0 18px rgba(148, 86, 255, 0.2), inset 0 0 24px rgba(148, 86, 255, 0.12);
  --input-bg: rgba(29, 18, 45, 0.95);
  --primary-color: #aa7bff;
  --hover-color: rgba(176, 125, 255, 0.12);
  --border-color: rgba(176, 125, 255, 0.4);
  --icon-bg: linear-gradient(180deg, #c196ff, #9b67ff);
  --icon-text: #fbf8ff;
  --bubble-fill: #fff9ff;
  --bubble-border: #b07dff;
  --bubble-text: #2d2140;
}

.top-nav {
  height: 58px;
  display: grid;
  grid-template-columns: 260px 1fr 320px;
  align-items: center;
  gap: 14px;
  padding: 8px 14px 0;
  box-sizing: border-box;
  flex-shrink: 0;
}

.brand-block,
.pilot-card,
.brand-text,
.pilot-meta,
.hero-header,
.mini-header,
.weather-visual,
.schedule-item,
.schedule-switch,
.ability-item,
.tool-item,
.mood-body,
.voice-card {
  display: flex;
  align-items: center;
}

.brand-block {
  gap: 12px;
  color: var(--accent);
}

.brand-mark {
  width: 30px;
  height: 30px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: var(--accent-soft);
  box-shadow: var(--glow);
  font-size: 15px;
}

.brand-text {
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.brand-title {
  font-size: 17px;
  font-weight: 800;
  color: var(--accent);
}

.brand-subtitle {
  font-size: 9px;
  color: var(--text-dim);
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.main-nav {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.nav-item {
  position: relative;
  color: var(--text-main);
  font-size: 15px;
  padding: 8px 0;
}

.nav-btn {
  border: none;
  background: transparent;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
}

.nav-item.active,
.nav-item:hover {
  color: #fff;
}

.nav-item.active::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -6px;
  height: 3px;
  background: var(--accent);
  box-shadow: 0 0 14px var(--accent);
}

.top-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}

.top-locate-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--panel-soft);
  border: 1px solid var(--line-soft);
  color: var(--text-soft);
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  font-size: 13px;
}

.top-locate-btn:hover {
  border-color: var(--line);
  color: var(--text-main);
  background: var(--hover-color);
  box-shadow: 0 0 10px var(--accent-soft);
}

.top-locate-btn .locate-icon {
  font-size: 16px;
  color: var(--accent);
}

.top-locate-btn .locate-icon.rotating {
  animation: locate-rotate 1.2s linear infinite;
}

.top-location-pill {
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid var(--line-soft);
  color: var(--text-soft);
  background: var(--panel-soft);
  font-size: 12px;
}

@keyframes locate-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.character-switch {
  display: flex;
  padding: 4px;
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.25);
}

.switch-btn {
  border: 0;
  background: transparent;
  color: var(--text-soft);
  padding: 6px 12px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 12px;
}

.switch-btn.active {
  background: var(--accent-soft);
  color: #fff;
  box-shadow: inset 0 0 0 1px var(--line);
}

.notification-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--accent-strong);
  color: white;
  display: grid;
  place-items: center;
  font-size: 10px;
  font-weight: 700;
}

.pilot-card {
  gap: 10px;
  justify-content: flex-end;
  padding: 6px 10px;
  border-radius: 14px;
  border: 1px solid var(--line-soft);
  background: rgba(0, 0, 0, 0.2);
}

.pilot-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid var(--line);
}

.pilot-avatar img,
.unit-visual img,
.portrait-visual img,
.mood-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pilot-meta,
.hero-status,
.hero-avatar-zone,
.hero-bubble-zone,
.tool-grid,
.ability-list,
.voice-card,
.mood-card,
.info-card,
.system-card {
  flex-direction: column;
}

.pilot-meta {
  align-items: flex-start;
  gap: 3px;
}

.pilot-name {
  font-weight: 700;
  color: #fff;
  font-size: 13px;
}

.pilot-level {
  font-size: 10px;
  color: var(--text-soft);
}

.eva-grid {
  flex: 1;
  display: grid;
  grid-template-columns: 240px 1fr 260px; /* Reduced sidebar widths slightly */
  gap: 12px;
  padding: 10px 14px 14px;
  box-sizing: border-box;
  min-height: 0;
  overflow: hidden;
}

@media (max-width: 1400px) {
  .eva-grid {
    grid-template-columns: 220px 1fr 240px;
  }
}

@media (max-width: 1200px) {
  .eva-grid {
    grid-template-columns: 200px 1fr 220px;
  }
}

.eva-grid-focus {
  grid-template-columns: 240px minmax(0, 1fr);
  height: 100%;
  max-height: 100%;
}

.eva-grid-weather {
  grid-template-columns: 220px minmax(0, 1fr) 240px;
}

.panel-frame {
  background: var(--panel-bg);
  border: 1px solid var(--line);
  box-shadow: var(--glow);
  border-radius: 18px;
  position: relative;
}

.panel-frame::after {
  content: "";
  position: absolute;
  inset: 8px;
  border: 1px solid var(--line-soft);
  border-radius: 12px;
  pointer-events: none;
}

.left-panel,
.right-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.portrait-card,
.info-card,
.system-card,
.unit-card,
.tool-card,
.mood-card,
.voice-card,
.hero-panel,
.mini-card {
  padding: 12px;
  box-sizing: border-box;
}

.portrait-card {
  min-height: 294px;
}

.portrait-name {
  font-size: 32px;
  font-weight: 900;
  color: #fff;
  line-height: 1;
}

.portrait-sub,
.unit-card-sub,
.mini-tag,
.section-title,
.mini-foot,
.voice-foot,
.mood-note,
.voice-note {
  color: var(--text-soft);
}

.portrait-sub {
  font-size: 11px;
  margin-top: 4px;
  letter-spacing: 1.2px;
}

.portrait-visual {
  height: 170px;
  margin: 10px 0;
  border-radius: 14px;
  overflow: hidden;
  background: radial-gradient(circle at center, rgba(255, 120, 80, 0.35), transparent 70%);
}

.portrait-footer {
  padding-top: 8px;
}

.status-online {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 12px;
}

.status-dot,
.online-ring {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #29ff7a;
  box-shadow: 0 0 10px #29ff7a;
}

.status-highlight {
  margin-top: 6px;
  color: #61ff9b;
  font-weight: 700;
  font-size: 12px;
}

.section-title {
  font-size: 13px;
  margin-bottom: 8px;
}

.ability-list {
  gap: 6px;
}

.ability-item {
  justify-content: space-between;
  font-size: 12px;
  padding: 4px 0;
  border-bottom: 1px solid var(--line-soft);
}

.system-card {
  margin-top: auto;
  min-height: 82px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}

.system-stripes {
  height: 18px;
  background: repeating-linear-gradient(135deg, transparent 0 12px, rgba(255, 90, 48, 0.26) 12px 24px);
}

.system-title {
  font-size: 12px;
  text-transform: uppercase;
}

.system-desc {
  font-size: 10px;
  color: var(--text-dim);
  margin-top: 4px;
}

.center-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.chat-page,
.nav-page,
.weather-page,
.schedule-page {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
}

.chat-page-header,
.nav-page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-shrink: 0;
}

.chat-page-title {
  font-size: 22px;
  font-weight: 900;
  color: #fff;
  letter-spacing: 0.8px;
}

.chat-page-subtitle {
  margin-top: 4px;
  font-size: 11px;
  color: var(--text-soft);
}

.chat-page-status {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6cffae;
  font-size: 12px;
  font-weight: 700;
}

.chat-page-body {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 180px minmax(0, 1.75fr) 200px;
  gap: 12px;
  overflow: hidden;
}

.chat-scene-list,
.chat-task-panel {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
  overflow-y: auto;
}

.chat-side-title {
  font-size: 13px;
  font-weight: 800;
  color: #fff;
  letter-spacing: 0.8px;
}

.chat-side-title.secondary {
  margin-top: 8px;
}

.chat-scene-item,
.chat-history-mini,
.chat-history-mini-item,
.task-card {
  border-radius: 14px;
  border: 1px solid var(--line-soft);
  background: rgba(255, 255, 255, 0.03);
}

.chat-scene-item {
  padding: 12px;
  cursor: pointer;
}

.chat-scene-item.active {
  background: rgba(255, 91, 53, 0.12);
  box-shadow: inset 0 0 0 1px var(--line);
}

.chat-scene-name,
.task-title {
  font-size: 13px;
  font-weight: 800;
  color: #fff;
}

.chat-scene-desc,
.task-desc,
.chat-history-mini,
.chat-history-mini-item strong {
  margin-top: 4px;
  font-size: 11px;
  line-height: 1.5;
  color: var(--text-soft);
}

.chat-history-mini {
  padding: 12px;
}

.chat-history-mini-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chat-history-mini-item {
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.chat-history-mini-item span {
  font-size: 10px;
  color: var(--text-dim);
}

.chat-core {
  min-height: 0;
  display: grid;
  grid-template-rows: auto 220px minmax(0, 1fr) auto;
  gap: 10px;
  padding: 14px;
  overflow: hidden;
}

.chat-core-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.chat-core-badge {
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(255, 91, 53, 0.12);
  border: 1px solid var(--line);
  color: #fff;
  font-size: 11px;
  font-weight: 800;
}

.chat-core-meta {
  color: var(--text-soft);
  font-size: 11px;
}

.chat-core-stage {
  display: grid;
  grid-template-columns: 190px 1fr;
  gap: 12px;
  align-items: center;
  border-radius: 18px;
  padding: 12px;
  background:
    radial-gradient(circle at 22% 72%, rgba(255, 84, 48, 0.36), transparent 24%),
    linear-gradient(180deg, rgba(32, 8, 8, 0.6), rgba(20, 8, 8, 0.2));
  border: 1px solid var(--line-soft);
}

.chat-log {
  min-height: 0;
  max-height: 100%;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  scrollbar-gutter: stable;
}

.chat-log-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.chat-log-item.user {
  align-items: flex-end;
}

.chat-log-role {
  font-size: 10px;
  color: var(--text-dim);
  letter-spacing: 1.2px;
}

.chat-log-content {
  max-width: 84%;
  padding: 10px 12px;
  border-radius: 14px;
  font-size: 14px;
  line-height: 1.6;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--line-soft);
}

.chat-log-item.user .chat-log-content {
  background: rgba(255, 91, 53, 0.14);
  border-color: var(--line);
}

.chat-focus {
  min-height: 0;
  display: grid;
  grid-template-rows: 240px 1fr auto;
  gap: 8px;
  padding: 14px;
}

.chat-focus-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  --avatar-size: 155px;
}

.chat-focus-bubble {
  min-height: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  --bubble-scale: 0.92;
}

.chat-focus-input {
  margin-top: 2px;
}

.task-card {
  padding: 10px;
}

.task-card.hot {
  background: linear-gradient(180deg, rgba(255, 91, 53, 0.18), rgba(255, 91, 53, 0.08));
}

.task-btn {
  width: 100%;
  margin-top: 10px;
  height: 34px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  background: linear-gradient(180deg, #ff6f4a, #ff4320);
  color: #fff;
  font-size: 12px;
  font-weight: 800;
}

.task-card.compact {
  margin-top: 0;
}

.quick-grid {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.quick-chip {
  height: 34px;
  border-radius: 999px;
  border: 1px solid var(--line-soft);
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
  font-size: 12px;
  cursor: pointer;
}

.quick-chip.active {
  background: rgba(255, 91, 53, 0.16);
  border-color: rgba(255, 91, 53, 0.42);
}

.nav-page-body {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) 320px;
  gap: 12px;
  overflow: hidden;
}

.nav-top-tools {
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-status-pill {
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid var(--line-soft);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 11px;
}

.nav-refresh-btn {
  width: auto;
  padding: 0 14px;
}

.nav-main-column {
  min-height: 0;
  display: grid;
  grid-template-rows: auto minmax(320px, 1fr) auto;
  gap: 12px;
  overflow: hidden;
}

.nav-search-bar {
  padding: 12px;
  display: grid;
  grid-template-columns: 1fr 10px 1fr 112px;
  gap: 10px;
  align-items: center;
  overflow: hidden;
}

.nav-search-field {
  min-width: 0;
  border-radius: 14px;
  border: 1px solid var(--line-soft);
  background: rgba(255, 255, 255, 0.04);
  padding: 10px 12px;
}

.nav-search-label {
  display: block;
  font-size: 10px;
  color: var(--text-dim);
  margin-bottom: 4px;
}

.nav-search-value {
  font-size: 13px;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-search-input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: #fff;
  font-size: 13px;
  line-height: 1.3;
  padding: 0;
}

.nav-search-input::placeholder {
  color: var(--text-dim);
}

.nav-search-sep {
  width: 10px;
  height: 2px;
  background: var(--line);
  border-radius: 999px;
  justify-self: center;
}

.nav-go-btn {
  height: 44px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(180deg, #ff6f4a, #ff4320);
  color: #fff;
  font-weight: 800;
  cursor: pointer;
}

.nav-go-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.nav-map-large {
  position: relative;
  min-height: 0;
  height: 100%;
  overflow: hidden;
  background: #10131d;
}

.amap-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.amap-empty-state {
  position: absolute;
  inset: 18px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(8, 12, 22, 0.74);
  text-align: center;
}

.amap-empty-title {
  color: #fff;
  font-size: 15px;
  font-weight: 800;
}

.amap-empty-text {
  max-width: 420px;
  color: var(--text-soft);
  font-size: 12px;
  line-height: 1.7;
}

.nav-map-overlay {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  z-index: 2;
  pointer-events: none;
}

.nav-map-badge {
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(10, 14, 24, 0.76);
  color: #fff;
  font-size: 12px;
  border: 1px solid rgba(255, 255, 255, 0.14);
}

.nav-map-chip {
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 91, 53, 0.84);
  color: #fff;
  font-size: 12px;
  font-weight: 800;
}

.nav-map-large :deep(.asuka-amap-label) {
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(10, 14, 24, 0.82);
  color: #fff;
  font-size: 11px;
  border: 1px solid rgba(255, 255, 255, 0.16);
}

.nav-map-large :deep(.asuka-amap-label.end) {
  background: rgba(255, 75, 42, 0.88);
}

.nav-bottom-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  align-items: stretch;
}

.nav-side-stack {
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  padding-right: 2px;
}

.nav-steps-card,
.nav-ops-card {
  padding: 14px;
  min-height: 0;
}

.nav-bottom-grid .mini-card {
  min-width: 0;
  padding: 12px;
}

.nav-bottom-grid .mini-body,
.nav-bottom-grid .mini-foot {
  word-break: break-word;
}

.nav-bottom-grid .mini-body {
  font-size: 12px;
}

.nav-bottom-grid .mini-foot {
  font-size: 11px;
  line-height: 1.45;
}

.nav-step-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-step-item {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 10px;
  padding: 12px;
  border-radius: 14px;
  border: 1px solid var(--line-soft);
  background: rgba(255, 255, 255, 0.03);
}

.nav-step-item.active {
  background: rgba(255, 91, 53, 0.12);
  box-shadow: inset 0 0 0 1px var(--line);
}

.nav-step-index {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 91, 53, 0.16);
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 12px;
  font-weight: 900;
}

.nav-step-copy div {
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-step-copy span,
.nav-side-note {
  display: block;
  margin-top: 4px;
  color: var(--text-soft);
  font-size: 11px;
  line-height: 1.5;
}

.nav-step-copy span {
  max-height: 34px;
  overflow: hidden;
}

.nav-op-grid {
  margin-top: 0;
}

.weather-page {
  gap: 12px;
}

.weather-hero,
.weather-panel {
  padding: 16px;
  box-sizing: border-box;
}

.weather-hero {
  min-height: 250px;
  overflow: hidden;
}

/* Weather V2 Styles */
.weather-page-v2 {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
  overflow-y: auto;
  padding-bottom: 20px;
}

.weather-summary-card {
  min-height: 168px;
  height: auto;
  max-height: 228px;
  overflow: hidden;
  display: flex;
  position: relative;
  border-radius: 16px;
}

.summary-backdrop {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.summary-backdrop img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.4;
}

.summary-content {
  position: relative;
  z-index: 1;
  padding: 14px 18px 12px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
  min-width: 0;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-gutter: stable;
  padding-right: 12px;
}

.summary-content::-webkit-scrollbar {
  width: 8px;
}

.summary-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 999px;
}

.summary-content::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(255, 102, 64, 0.95), rgba(179, 34, 20, 0.95));
  border-radius: 999px;
}

.summary-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, rgba(255, 120, 80, 1), rgba(215, 45, 28, 1));
}

.summary-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.summary-location-group {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex-wrap: wrap;
}

.summary-location-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(12, 7, 8, 0.82);
  box-shadow: inset 0 0 0 1px rgba(255, 88, 47, 0.08);
}

.summary-chip-btn {
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(255, 115, 74, 0.25);
  background: rgba(28, 10, 9, 0.85);
  color: var(--text-soft);
  font-size: 12px;
  cursor: pointer;
}

.summary-update-group {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.location-info {
  font-size: 14px;
  min-width: 0;
}

.location-text {
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
}

.summary-main-row {
  display: flex;
  align-items: center;
  gap: 22px;
  min-width: 0;
}

.summary-temp-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.summary-condition-block {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.temp-large {
  font-size: 72px;
  font-weight: 900;
  color: #fff;
  line-height: 0.92;
  letter-spacing: -2px;
}

.temp-large .unit {
  font-size: 26px;
  font-weight: 700;
  margin-left: 2px;
}

.weather-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.weather-icon-main {
  font-size: 54px;
  line-height: 1;
}

.weather-text-main {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
}

.temp-range {
  font-size: 15px;
  color: rgba(255, 239, 233, 0.9);
}

.weather-metrics-grid {
  margin-top: auto;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 10px;
}

.summary-metric-item {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.metric-copy {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.weather-city-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(9, 6, 7, 0.78);
  backdrop-filter: blur(8px);
}

.weather-city-form-inline {
  margin-top: 0;
  flex-wrap: wrap;
  align-items: center;
}

.weather-city-form-inline .weather-city-input {
  flex: 1 1 280px;
}

.weather-suggestion-inline {
  max-height: 180px;
  overflow-y: auto;
  padding-right: 4px;
}

.weather-error-inline {
  margin-top: -2px;
  font-size: 12px;
  color: #ff9d8a;
}

.metric-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metric-icon {
  font-size: 15px;
  color: #ff5130;
  line-height: 1;
}

.metric-label {
  font-size: 10px;
  color: rgba(255, 239, 233, 0.55);
  white-space: nowrap;
}

.metric-value {
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
}

.summary-update-time {
  font-size: 11px;
  color: rgba(255, 239, 233, 0.62);
  white-space: nowrap;
}

.summary-refresh-btn {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(12, 7, 8, 0.82);
  color: #fff;
  cursor: pointer;
  line-height: 1;
}

.weather-hourly-card,
.weather-weekly-card {
  padding: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.card-title {
  font-size: 15px;
  font-weight: 800;
  color: #fff;
}

.card-actions {
  display: flex;
  gap: 8px;
}

.toggle-btn {
  padding: 4px 12px;
  border-radius: 6px;
  border: 1px solid var(--line-soft);
  background: transparent;
  color: var(--text-soft);
  font-size: 11px;
  cursor: pointer;
}

.toggle-btn.active {
  background: var(--accent-soft);
  color: #fff;
  border-color: var(--accent);
}

.hourly-chart-container {
  display: flex;
  gap: 16px;
  height: 140px;
}

.hourly-chart-y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--text-dim);
  font-size: 10px;
  padding: 10px 0 20px;
}

.hourly-chart-main {
  flex: 1;
  overflow: hidden;
}

.chart-scroll {
  overflow-x: auto;
  padding-bottom: 8px;
}

.chart-content {
  width: 800px;
  height: 120px;
  position: relative;
}

.chart-svg {
  width: 100%;
  height: 100px;
}

.chart-x-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  color: var(--text-soft);
  font-size: 11px;
}

.weekly-list {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  overflow-x: auto; /* Allow horizontal scroll if squeezed */
  padding-bottom: 4px;
}

.weekly-item {
  flex: 0 0 auto; /* Don't shrink too much */
  min-width: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 10px 8px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--line-soft);
}

.week-day {
  font-size: 11px;
  color: var(--text-soft);
}

.week-icon {
  font-size: 24px;
}

.week-text {
  font-size: 12px;
}

.week-temp {
  font-size: 13px;
  font-weight: 700;
}

.view-more-btn {
  border: none;
  background: transparent;
  color: var(--text-soft);
  font-size: 11px;
  cursor: pointer;
}

/* Floating Chat and Actions */
.weather-floating-chat {
  position: static;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  background: transparent;
  padding: 8px 4px 0;
  z-index: 10;
}

.chibi-asuka {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
}

.chibi-asuka img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.chat-bubble-v2 {
  flex: 1;
  background: #fff;
  color: #222;
  padding: 12px 20px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.5;
  position: relative;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

.bubble-tail {
  position: absolute;
  left: -8px;
  top: 20px;
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 10px solid #fff;
}

.weather-actions-bar {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex: 1 1 100%;
}

.action-btn {
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--line-soft);
  background: rgba(20, 10, 10, 0.8);
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
}

/* Right Panel Weather Styles */
.radar-card,
.life-index-card,
.weather-alert-card-v2 {
  padding: 16px;
}

.card-time {
  font-size: 11px;
  color: var(--text-dim);
}

.radar-map-container {
  height: 180px;
  margin: 12px 0;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  background: #000;
}

.radar-placeholder {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
}

.radar-overlay {
  position: absolute;
  inset: 0;
}

.radar-scan {
  position: absolute;
  inset: 0;
  background: conic-gradient(from 0deg, rgba(41, 255, 122, 0.2), transparent 90deg);
  animation: radar-spin 4s linear infinite;
}

@keyframes radar-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.location-dot {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 10px #fff;
}

.location-label {
  position: absolute;
  font-size: 10px;
  color: #fff;
}

.radar-legend {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  color: var(--text-dim);
}

.legend-bar {
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(90deg, #29ff7a, #ffff00, #ff9900, #ff0000);
}

.index-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); /* More flexible grid */
  gap: 10px;
  margin-top: 12px;
}

.index-item {
  display: flex;
  gap: 8px;
  padding: 8px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--line-soft);
}

.index-icon {
  font-size: 20px;
}

.index-label {
  font-size: 11px;
  color: var(--text-dim);
}

.index-value {
  font-size: 13px;
  font-weight: 700;
  color: var(--accent);
}

.index-desc {
  font-size: 10px;
  color: var(--text-dim);
}

.alert-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 800;
  margin-bottom: 12px;
}

.alert-badge.warning {
  background: rgba(255, 153, 0, 0.2);
  color: #ff9900;
  border: 1px solid #ff9900;
}

.alert-status {
  font-size: 10px;
  padding: 2px 6px;
  background: #ff9900;
  color: #000;
  border-radius: 4px;
  margin-left: 8px;
}

.alert-text {
  font-size: 12px;
  line-height: 1.6;
  color: var(--text-soft);
}

.alert-footer {
  margin-top: 12px;
  font-size: 11px;
  color: var(--text-dim);
}

/* Left Panel Weather Specifics */
.weather-left-sidebar {
  gap: 12px;
}

.weather-portrait {
  min-height: auto;
  padding-bottom: 20px;
}

.portrait-status-badge {
  position: absolute;
  left: 12px;
  top: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 800;
  background: rgba(0,0,0,0.5);
  padding: 4px 8px;
  border-radius: 4px;
  z-index: 2;
}

.portrait-info {
  margin-top: -40px;
  position: relative;
  z-index: 2;
}

.portrait-level-tag {
  font-size: 12px;
  font-weight: 800;
  color: var(--accent);
  margin-top: 4px;
}

.portrait-level-tag span {
  font-size: 10px;
  color: var(--text-dim);
  margin-left: 4px;
}

.portrait-id {
  font-size: 9px;
  color: var(--text-dim);
  margin-top: 2px;
}

.portrait-status-text {
  margin-top: 12px;
  font-size: 11px;
  color: var(--text-dim);
}

.portrait-wave {
  margin-top: 12px;
  height: 20px;
  color: var(--accent);
  opacity: 0.5;
}

.weather-ability-card .ability-item {
  gap: 8px;
  border-bottom: 1px solid var(--line-soft);
}

.ability-icon {
  color: var(--accent);
}

.ability-tag {
  margin-left: auto;
  font-size: 10px;
  color: var(--text-dim);
}

.weather-unit-card {
  margin-top: auto;
}

.unit-stats {
  margin-top: 10px;
}

.unit-stat-row {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--text-soft);
  margin-bottom: 6px;
}

.unit-progress-bar {
  height: 4px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
  overflow: hidden;
}

.unit-progress-bar span {
  display: block;
  height: 100%;
  background: var(--accent);
  box-shadow: 0 0 10px var(--accent);
}

.notification-bell {
  position: relative;
  cursor: pointer;
}

.bell-dot {
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--accent-strong);
  color: #fff;
  font-size: 9px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pilot-arrow {
  font-size: 10px;
  color: var(--text-dim);
  margin-left: 4px;
}

@media (max-width: 1500px) {
  .eva-grid-weather {
    grid-template-columns: 200px minmax(0, 1fr) 220px;
  }
}

@media (max-width: 1280px) {
  .eva-grid-weather {
    grid-template-columns: minmax(0, 1fr);
  }

  .weather-left-sidebar,
  .right-panel {
    display: none;
  }

  .weather-summary-card {
    min-height: unset;
  }
}

@media (max-width: 780px) {
  .summary-content {
    padding: 16px;
  }

  .summary-topbar,
  .summary-location-group,
  .summary-update-group,
  .summary-actions {
    align-items: flex-start;
    justify-content: flex-start;
  }

  .summary-update-time {
    white-space: normal;
  }

  .summary-main-row {
    gap: 14px;
  }

  .summary-condition-block {
    gap: 16px;
  }

  .temp-large {
    font-size: 52px;
  }

  .weather-text-main {
    font-size: 18px;
  }

  .weather-icon-main {
    font-size: 44px;
  }

  .weather-metrics-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.weather-hero::after {
  inset: 10px;
}

.weather-hero-top,
.weather-hero-main,
.weather-hero-metrics,
.weather-panel-head,
.weather-air-meta {
  display: flex;
}

.weather-hero-top,
.weather-panel-head {
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.weather-hero-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.weather-city-form {
  margin-top: 14px;
  display: flex;
  gap: 10px;
  position: relative;
}

.weather-city-input {
  flex: 1;
  min-width: 0;
  height: 40px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(10, 10, 10, 0.3);
  color: #fff;
  outline: none;
  font-size: 13px;
}

.weather-city-input::placeholder {
  color: rgba(255, 239, 233, 0.52);
}

.weather-city-btn {
  height: 40px;
  padding: 0 18px;
  border: none;
  border-radius: 999px;
  background: linear-gradient(180deg, #ff6f4a, #ff4320);
  color: #fff;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
}

.weather-suggestion-list {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.weather-suggestion-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(10, 10, 10, 0.26);
  color: #fff;
  cursor: pointer;
  text-align: left;
}

.weather-suggestion-item strong {
  font-size: 13px;
}

.weather-suggestion-item span {
  font-size: 11px;
  color: var(--text-soft);
}

.weather-hero-kicker,
.weather-panel-subtitle,
.weather-hero-date,
.weather-index-item p,
.weather-alert-item span,
.weather-week-day span,
.weather-hourly-text {
  color: var(--text-soft);
}

.weather-hero-kicker {
  font-size: 11px;
  letter-spacing: 1.6px;
}

.weather-hero-city {
  margin-top: 8px;
  font-size: 34px;
  font-weight: 900;
  color: #fff;
}

.weather-hero-date {
  margin-top: 6px;
  font-size: 12px;
}

.weather-hero-badge,
.weather-panel-tag {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(10, 10, 10, 0.3);
  color: #fff;
  font-size: 11px;
  padding: 8px 12px;
}

.weather-refresh-btn {
  height: 38px;
  padding: 0 16px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(10, 10, 10, 0.34);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.weather-refresh-btn:disabled {
  opacity: 0.65;
  cursor: wait;
}

.weather-hero-main {
  justify-content: space-between;
  align-items: flex-end;
  gap: 18px;
  margin-top: 28px;
}

.weather-hero-copy {
  max-width: 540px;
}

.weather-hero-summary {
  font-size: 18px;
  font-weight: 800;
  color: #fff;
}

.weather-hero-range {
  margin-top: 8px;
  font-size: 13px;
  color: #ffd8ce;
}

.weather-hero-desc {
  margin: 14px 0 0;
  max-width: 520px;
  line-height: 1.7;
  font-size: 13px;
  color: #fff4ef;
}

.weather-error-note {
  margin-top: 14px;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(255, 91, 53, 0.12);
  border: 1px solid rgba(255, 91, 53, 0.22);
  color: #ffe6de;
  font-size: 12px;
}

.weather-hero-temp {
  display: flex;
  align-items: flex-start;
  color: #fff;
  text-shadow: 0 10px 32px rgba(0, 0, 0, 0.22);
}

.weather-hero-temp-value {
  font-size: 88px;
  line-height: 0.9;
  font-weight: 900;
}

.weather-hero-temp-unit {
  margin-top: 10px;
  font-size: 26px;
  font-weight: 700;
}

.weather-hero-metrics {
  gap: 10px;
  margin-top: 24px;
  flex-wrap: wrap;
}

.weather-metric-card {
  min-width: 120px;
  padding: 12px 14px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(10, 10, 10, 0.32);
  backdrop-filter: blur(8px);
}

.weather-metric-card span,
.weather-air-meta span {
  display: block;
  font-size: 10px;
  color: rgba(255, 239, 233, 0.74);
}

.weather-metric-card strong,
.weather-air-meta strong {
  display: block;
  margin-top: 6px;
  color: #fff;
  font-size: 16px;
}

.weather-content-grid {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) 320px;
  gap: 12px;
  overflow: hidden;
}

.weather-main-stack,
.weather-side-stack {
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  padding-right: 2px;
}

.weather-panel-title {
  font-size: 18px;
  font-weight: 900;
  color: #fff;
}

.weather-panel-subtitle {
  margin-top: 5px;
  font-size: 11px;
}

.weather-hourly-list {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 10px;
}

.weather-hourly-item,
.weather-index-item,
.weather-alert-item {
  border-radius: 16px;
  border: 1px solid var(--line-soft);
  background: rgba(255, 255, 255, 0.03);
}

.weather-hourly-item {
  padding: 14px 10px;
  text-align: center;
}

.weather-hourly-time {
  display: block;
  font-size: 11px;
  color: var(--text-dim);
}

.weather-hourly-icon {
  display: block;
  margin-top: 12px;
  font-size: 24px;
}

.weather-hourly-temp {
  display: block;
  margin-top: 12px;
  color: #fff;
  font-size: 18px;
}

.weather-hourly-text {
  display: block;
  margin-top: 8px;
  font-size: 11px;
}

.weather-week-list {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.weather-week-row {
  display: grid;
  grid-template-columns: 110px 120px minmax(90px, 1fr) 90px;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 16px;
  border: 1px solid var(--line-soft);
  background: rgba(255, 255, 255, 0.03);
}

.weather-week-day strong,
.weather-index-item strong,
.weather-alert-item strong {
  display: block;
  color: #fff;
}

.weather-week-day strong {
  font-size: 14px;
}

.weather-week-day span {
  margin-top: 4px;
  font-size: 11px;
}

.weather-week-condition {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff7f2;
  font-size: 13px;
}

.weather-week-icon {
  font-size: 20px;
}

.weather-week-bar {
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.weather-week-bar span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #ff8d56, #ffd09a);
}

.weather-week-range {
  justify-self: end;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.weather-air-card {
  background:
    radial-gradient(circle at top right, rgba(255, 118, 82, 0.18), transparent 40%),
    var(--panel-bg);
}

.weather-air-score {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  margin-top: 14px;
}

.weather-air-score strong {
  font-size: 56px;
  line-height: 1;
  color: #fff;
}

.weather-air-score span {
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 800;
  color: #83ffb2;
}

.weather-air-meta {
  margin-top: 16px;
  gap: 10px;
}

.weather-air-meta div {
  flex: 1;
  padding: 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--line-soft);
}

.weather-index-list,
.weather-alert-list {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.weather-index-item,
.weather-alert-item {
  padding: 12px 14px;
}

.weather-index-item span {
  display: inline-block;
  margin-top: 4px;
  font-size: 11px;
  color: #ffd1c0;
}

.weather-index-item p,
.weather-alert-item span {
  margin: 8px 0 0;
  font-size: 12px;
  line-height: 1.6;
}

.weather-alert-card {
  background:
    linear-gradient(180deg, rgba(255, 91, 53, 0.12), rgba(255, 91, 53, 0.04)),
    var(--panel-bg);
}

.schedule-page {
  gap: 12px;
}

.schedule-home-empty {
  margin: 10px 0 0;
  padding: 16px 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-soft);
  font-size: 12px;
  text-align: center;
}

.schedule-hero,
.schedule-panel {
  padding: 16px;
  box-sizing: border-box;
}

.schedule-hero {
  min-height: 240px;
  background:
    radial-gradient(circle at top right, rgba(255, 114, 73, 0.18), transparent 34%),
    linear-gradient(135deg, rgba(32, 12, 12, 0.96), rgba(18, 8, 8, 0.92));
}

.schedule-hero-top,
.schedule-hero-main,
.schedule-hero-metrics,
.schedule-panel-head,
.schedule-timeline-top,
.schedule-task-top,
.schedule-stats-grid {
  display: flex;
}

.schedule-hero-top,
.schedule-panel-head,
.schedule-task-top {
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.schedule-hero-kicker,
.schedule-hero-date,
.schedule-panel-subtitle,
.schedule-timeline-location,
.schedule-timeline-desc,
.schedule-calendar-copy span,
.schedule-reminder-item span,
.schedule-task-card p {
  color: var(--text-soft);
}

.schedule-hero-kicker {
  font-size: 11px;
  letter-spacing: 1.6px;
}

.schedule-hero-title {
  margin-top: 8px;
  font-size: 34px;
  font-weight: 900;
  color: #fff;
}

.schedule-hero-date {
  margin-top: 6px;
  font-size: 12px;
}

.schedule-hero-badge,
.schedule-panel-tag,
.schedule-chip {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 11px;
  padding: 8px 12px;
}

.schedule-hero-main {
  justify-content: space-between;
  align-items: flex-end;
  gap: 18px;
  margin-top: 24px;
}

.schedule-hero-copy {
  max-width: 580px;
}

.schedule-hero-focus {
  font-size: 20px;
  font-weight: 800;
  color: #fff;
}

.schedule-hero-desc {
  margin: 12px 0 0;
  font-size: 13px;
  line-height: 1.7;
  color: #fff2ed;
}

.schedule-hero-progress {
  min-width: 160px;
  padding: 18px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--line-soft);
  text-align: right;
}

.schedule-hero-progress strong {
  display: block;
  font-size: 48px;
  line-height: 1;
  color: #fff;
}

.schedule-hero-progress span {
  display: block;
  margin-top: 8px;
  font-size: 11px;
  color: var(--text-soft);
}

.schedule-hero-metrics {
  gap: 10px;
  margin-top: 22px;
  flex-wrap: wrap;
}

.schedule-metric-card,
.schedule-stat-box {
  min-width: 120px;
  padding: 12px 14px;
  border-radius: 16px;
  border: 1px solid var(--line-soft);
  background: rgba(255, 255, 255, 0.03);
}

.schedule-metric-card span,
.schedule-stat-box span {
  display: block;
  font-size: 10px;
  color: rgba(255, 235, 227, 0.74);
}

.schedule-metric-card strong,
.schedule-stat-box strong {
  display: block;
  margin-top: 6px;
  font-size: 18px;
  color: #fff;
}

.schedule-content-grid {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) 320px;
  gap: 12px;
  overflow: hidden;
}

.schedule-main-stack,
.schedule-side-stack {
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  padding-right: 2px;
}

.schedule-panel-title {
  font-size: 18px;
  font-weight: 900;
  color: #fff;
}

.schedule-panel-subtitle {
  margin-top: 5px;
  font-size: 11px;
}

.schedule-form {
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.schedule-input {
  width: 100%;
  min-width: 0;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid var(--line-soft);
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
  font-size: 13px;
  box-sizing: border-box;
  outline: none;
}

.schedule-select {
  appearance: none;
}

.schedule-input::placeholder {
  color: var(--text-dim);
}

.schedule-input:focus {
  border-color: var(--line);
  box-shadow: 0 0 0 1px rgba(255, 91, 53, 0.16);
}

.schedule-textarea,
.schedule-form-actions {
  grid-column: 1 / -1;
}

.schedule-textarea {
  min-height: 92px;
  resize: vertical;
  font-family: inherit;
}

.schedule-form-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.schedule-form-btns {
  display: flex;
  align-items: center;
  gap: 10px;
}

.schedule-form-tip {
  color: var(--text-soft);
  font-size: 11px;
  line-height: 1.5;
}

.schedule-submit-btn,
.schedule-action-btn {
  border: none;
  cursor: pointer;
  font-family: inherit;
}

.schedule-cancel-btn {
  height: 40px;
  padding: 0 16px;
  border-radius: 12px;
  border: 1px solid var(--line-soft);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 12px;
  cursor: pointer;
}

.schedule-submit-btn {
  height: 40px;
  padding: 0 18px;
  border-radius: 12px;
  background: linear-gradient(180deg, #ff6f4a, #ff4320);
  color: #fff;
  font-size: 12px;
  font-weight: 800;
}

.schedule-timeline {
  position: relative;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.schedule-timeline::before {
  content: "";
  position: absolute;
  left: 67px;
  top: 10px;
  bottom: 10px;
  width: 2px;
  background: linear-gradient(180deg, rgba(255, 91, 53, 0.4), rgba(255, 91, 53, 0.08));
}

.schedule-timeline-item {
  position: relative;
  display: grid;
  grid-template-columns: 54px 12px 1fr;
  gap: 14px;
  align-items: start;
}

.schedule-timeline-time {
  padding-top: 4px;
  color: #fff;
  font-size: 12px;
  font-weight: 800;
}

.schedule-timeline-dot {
  position: relative;
  z-index: 1;
  width: 12px;
  height: 12px;
  margin-top: 7px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.22);
  box-shadow: 0 0 0 4px rgba(255, 91, 53, 0.08);
}

.schedule-timeline-dot.active {
  background: #ff7048;
  box-shadow: 0 0 0 5px rgba(255, 91, 53, 0.14), 0 0 14px rgba(255, 91, 53, 0.35);
}

.schedule-timeline-card,
.schedule-calendar-item,
.schedule-reminder-item,
.schedule-task-card {
  border-radius: 16px;
  border: 1px solid var(--line-soft);
  background: rgba(255, 255, 255, 0.03);
}

.schedule-timeline-card,
.schedule-task-card,
.schedule-reminder-item,
.schedule-calendar-item {
  padding: 14px;
}

.schedule-timeline-top strong,
.schedule-calendar-copy div,
.schedule-task-top strong,
.schedule-reminder-item strong {
  color: #fff;
}

.schedule-timeline-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.schedule-timeline-location {
  margin-top: 6px;
  font-size: 11px;
}

.schedule-timeline-desc {
  margin: 8px 0 0;
  font-size: 12px;
  line-height: 1.6;
}

.schedule-chip {
  padding: 4px 10px;
  font-size: 10px;
}

.schedule-chip.red {
  background: rgba(255, 78, 78, 0.14);
}

.schedule-chip.orange {
  background: rgba(255, 139, 76, 0.14);
}

.schedule-chip.amber {
  background: rgba(255, 196, 89, 0.12);
}

.schedule-chip.soft {
  background: rgba(255, 255, 255, 0.08);
}

.schedule-action-btn {
  height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  font-size: 11px;
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
}

.schedule-action-btn.success {
  background: rgba(59, 201, 124, 0.16);
  border: 1px solid rgba(59, 201, 124, 0.25);
}

.schedule-action-btn.danger {
  background: rgba(255, 91, 53, 0.16);
  border: 1px solid rgba(255, 91, 53, 0.25);
}

.schedule-task-grid,
.schedule-calendar-list,
.schedule-reminder-list {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.schedule-task-meta {
  margin-top: 8px;
  font-size: 11px;
  color: #ffd4c8;
}

.schedule-task-card p {
  margin: 8px 0 0;
  font-size: 12px;
  line-height: 1.6;
}

.schedule-task-top span {
  font-size: 11px;
  color: #ffd4c8;
}

.schedule-task-badges {
  display: flex;
  align-items: center;
  gap: 8px;
}

.schedule-task-progress {
  height: 8px;
  margin-top: 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.schedule-task-progress span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #ff8c59, #ffd09a);
}

.schedule-calendar-card {
  background:
    radial-gradient(circle at top right, rgba(255, 114, 73, 0.12), transparent 36%),
    var(--panel-bg);
}

.schedule-calendar-item {
  display: grid;
  grid-template-columns: 70px 1fr;
  gap: 12px;
  align-items: center;
}

.schedule-calendar-date strong {
  display: block;
  color: #fff;
  font-size: 14px;
}

.schedule-calendar-date span {
  display: block;
  margin-top: 4px;
  font-size: 11px;
  color: var(--text-soft);
}

.schedule-calendar-copy div {
  font-size: 13px;
  font-weight: 700;
}

.inline-chip {
  display: inline-flex;
  margin-left: 8px;
  vertical-align: middle;
}

.schedule-calendar-copy span,
.schedule-reminder-item span {
  display: block;
  margin-top: 5px;
  font-size: 11px;
  line-height: 1.6;
}

.schedule-stats-card {
  background:
    linear-gradient(180deg, rgba(255, 91, 53, 0.1), rgba(255, 91, 53, 0.04)),
    var(--panel-bg);
}

.schedule-stats-grid {
  margin-top: 14px;
  gap: 10px;
  flex-wrap: wrap;
}

.schedule-empty-state {
  margin-top: 14px;
  padding: 18px 16px;
  border-radius: 16px;
  border: 1px dashed var(--line-soft);
  background: rgba(255, 255, 255, 0.02);
  color: var(--text-soft);
  font-size: 12px;
  line-height: 1.7;
  text-align: center;
}

.hero-panel {
  min-height: 360px;
}

.hero-header {
  justify-content: space-between;
  margin-bottom: 10px;
}

.hero-status {
  gap: 8px;
  font-weight: 700;
  color: #6cffae;
  font-size: 12px;
}

.hero-label {
  color: var(--accent);
  font-weight: 800;
  font-size: 18px;
}

.hero-body {
  min-height: 210px;
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 8px;
  align-items: center;
  background:
    radial-gradient(circle at 22% 72%, rgba(255, 84, 48, 0.36), transparent 24%),
    linear-gradient(180deg, rgba(32, 8, 8, 0.6), rgba(20, 8, 8, 0.2));
  border: 1px solid var(--line-soft);
  border-radius: 18px;
  padding: 10px;
}

.hero-avatar-zone {
  justify-content: center;
  --avatar-size: 180px;
}

.hero-bubble-zone {
  min-height: 180px;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  --bubble-top: 0px;
  --bubble-right: 0px;
  --bubble-scale: 1;
}

.mission-input {
  margin-top: 10px;
  background: var(--panel-soft);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}

.mission-text {
  font-size: 14px;
}

.mission-icons {
  display: flex;
  gap: 6px;
}

.mission-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.06);
}

.mission-icon.primary {
  background: linear-gradient(180deg, #ff6f4a, #ff3f1a);
  color: white;
}

.input-real {
  margin-top: 8px;
}

.status-cards {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.mini-card {
  min-height: 184px;
}

.mini-header {
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 12px;
}

.mini-tag {
  font-size: 10px;
  border: 1px solid var(--line-soft);
  padding: 2px 6px;
  border-radius: 999px;
}

.map-card {
  height: 78px;
  border-radius: 12px;
  background: #f3f0ec;
  position: relative;
  overflow: hidden;
}

.map-grid {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(0, 0, 0, 0.06) 1px, transparent 1px) 0 0 / 28px 28px,
    linear-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px) 0 0 / 28px 28px;
}

.map-route {
  position: absolute;
  left: 24px;
  right: 26px;
  top: 28px;
  height: 4px;
  border-radius: 999px;
  background: #4a8cff;
  transform: rotate(12deg);
}

.map-point,
.location-pin,
.toggle-dot {
  border-radius: 50%;
}

.map-point {
  position: absolute;
  width: 14px;
  height: 14px;
  background: #ff4f36;
}

.point-a {
  left: 22px;
  top: 52px;
}

.point-b {
  right: 20px;
  top: 18px;
}

.mini-body {
  font-size: 11px;
  line-height: 1.5;
  color: var(--text-soft);
  margin: 8px 0;
}

.mini-body.emphasis {
  font-size: 15px;
  color: #fff4ed;
  font-weight: 700;
}

.mini-foot {
  font-size: 10px;
  margin-bottom: 8px;
}

.card-btn {
  width: 100%;
  margin-top: auto;
  border: 0;
  border-radius: 12px;
  height: 34px;
  background: linear-gradient(180deg, #ff6f4a, #ff4320);
  color: white;
  font-weight: 800;
  cursor: pointer;
  font-size: 12px;
}

.location-pin {
  width: 48px;
  height: 48px;
  margin: 8px auto;
  background: radial-gradient(circle at 50% 40%, #ff9f78 0 18%, #ff4b2a 18% 60%, transparent 61%);
  position: relative;
}

.location-pin::after {
  content: "";
  position: absolute;
  left: 15px;
  top: 32px;
  width: 18px;
  height: 18px;
  background: #ff4b2a;
  transform: rotate(45deg);
}

.weather-visual {
  justify-content: space-between;
  margin: 8px 0;
}

.weather-icon {
  font-size: 36px;
}

.weather-temp {
  font-size: 40px;
  font-weight: 900;
  color: white;
}

.weather-meta {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: var(--text-soft);
}

.schedule-date {
  font-size: 11px;
  color: #fff;
  margin-bottom: 8px;
}

.schedule-item {
  align-items: stretch;
  gap: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 14px;
}

.schedule-time {
  font-size: 22px;
  font-weight: 900;
  color: #fff;
}

.schedule-content {
  color: var(--text-soft);
  line-height: 1.4;
  font-size: 11px;
}

.schedule-switch {
  justify-content: space-between;
  margin-top: 10px;
  font-size: 11px;
}

.toggle-dot {
  width: 36px;
  height: 20px;
  background: linear-gradient(90deg, rgba(255,255,255,0.14), rgba(255,255,255,0.08));
  position: relative;
}

.toggle-dot::after {
  content: "";
  position: absolute;
  right: 2px;
  top: 2px;
  width: 16px;
  height: 16px;
  background: var(--accent);
  border-radius: 50%;
}

.unit-card-title {
  font-size: 30px;
  font-weight: 900;
  color: #fff;
}

.unit-visual {
  height: 100px;
  border-radius: 14px;
  overflow: hidden;
  margin: 8px 0 10px;
  background: rgba(255, 255, 255, 0.04);
}

.unit-foot {
  color: var(--text-soft);
  font-size: 11px;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.tool-item {
  justify-content: center;
  min-height: 54px;
  text-align: center;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--line-soft);
  font-size: 11px;
}

.mood-body {
  justify-content: space-between;
  gap: 12px;
}

.mood-avatar {
  width: 78px;
  height: 78px;
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255,255,255,0.04);
}

.score-value {
  font-size: 40px;
  font-weight: 900;
  color: white;
}

.score-label {
  color: var(--text-soft);
  font-size: 11px;
}

.mood-note {
  margin-top: 6px;
  font-size: 11px;
}

.voice-card {
  align-items: center;
  text-align: center;
}

.wave-bars {
  width: 100%;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin: 8px 0 12px;
}

.wave-bars span {
  width: 4px;
  border-radius: 999px;
  background: linear-gradient(180deg, transparent, var(--accent), transparent);
  animation: voiceWave 1.1s ease-in-out infinite;
}

.wave-bars span:nth-child(odd) {
  height: 28px;
}

.wave-bars span:nth-child(even) {
  height: 18px;
  animation-delay: 0.2s;
}

.voice-btn {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 0;
  background: linear-gradient(180deg, #ff6f4a, #ff4320);
  color: white;
  font-size: 22px;
  cursor: pointer;
  box-shadow: 0 0 18px rgba(255, 73, 25, 0.35);
}

.input-footer {
  margin-top: 6px;
  font-size: 11px;
  color: var(--text-dim);
}

.message-row,
.chat-history,
.chat-scroll-area,
.chat-content-container {
  display: none;
}

@keyframes voiceWave {
  0%,
  100% {
    opacity: 0.35;
    transform: scaleY(0.7);
  }
  50% {
    opacity: 1;
    transform: scaleY(1.15);
  }
}

@media (max-width: 1400px) {
  .eva-grid {
    grid-template-columns: 240px 1fr 260px;
  }

  .status-cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .weather-hourly-list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 1100px) {
  .top-nav,
  .eva-grid {
    grid-template-columns: 1fr;
  }

  .main-nav {
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 18px;
  }

  .hero-body {
    grid-template-columns: 1fr;
  }

  .weather-content-grid,
  .weather-week-row,
  .schedule-content-grid,
  .schedule-calendar-item {
    grid-template-columns: 1fr;
  }

  .weather-hero-main,
  .schedule-hero-main {
    flex-direction: column;
    align-items: flex-start;
  }

  .weather-air-meta,
  .schedule-stats-grid {
    flex-direction: column;
  }

  .weather-hero-actions,
  .weather-city-form,
  .schedule-form,
  .schedule-form-actions,
  .schedule-timeline-actions {
    width: 100%;
  }

  .weather-hero-actions,
  .weather-city-form,
  .schedule-form-actions,
  .schedule-timeline-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .schedule-timeline::before {
    left: 63px;
  }
}
</style>
