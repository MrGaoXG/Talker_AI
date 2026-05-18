<template>
  <div class="qian-weather-page" :style="{ backgroundImage: `url('/image/qian/qianbackground.png')` }">
    <div class="page-overlay"></div>

    <header class="qian-header">
      <div class="header-left">
        <div class="brand-mark">
          <div class="brand-flower">✿</div>
        </div>
        <div class="qian-logo">
          <div class="logo-text-top">FLOWERS STUDIO</div>
          <div class="logo-text-bottom">AI 助手</div>
        </div>
      </div>

      <nav class="qian-nav">
        <button class="nav-item" :class="{ active: props.currentPage === 'home' }" @click="$emit('page-change', 'home')">
          <span class="nav-icon">⌂</span>
          <span>首页</span>
        </button>
        <button class="nav-item" @click="$emit('page-change', 'home')">
          <span class="nav-icon">◌</span>
          <span>对话</span>
        </button>
        <button class="nav-item" :class="{ active: props.currentPage === 'nav' }" @click="$emit('page-change', 'nav')">
          <span class="nav-icon">⌘</span>
          <span>导航</span>
        </button>
        <button class="nav-item">
          <span class="nav-icon">◎</span>
          <span>定位</span>
        </button>
        <button class="nav-item" :class="{ active: props.currentPage === 'weather' }" @click="$emit('page-change', 'weather')">
          <span class="nav-icon">☼</span>
          <span>天气</span>
        </button>
        <button class="nav-item" :class="{ active: props.currentPage === 'schedule' }" @click="$emit('page-change', 'schedule')">
          <span class="nav-icon">☷</span>
          <span>日程</span>
        </button>
        <button class="nav-item">
          <span class="nav-icon">⌗</span>
          <span>API中心</span>
        </button>
        <button class="nav-item">
          <span class="nav-icon">⚙</span>
          <span>设置</span>
        </button>
      </nav>

      <div class="header-right">
        <button class="header-icon">◔</button>
        <button class="header-icon switch-btn" @click="$emit('switch-character', 'Asuka')">Asuka</button>
        <button class="header-icon switch-btn" @click="$emit('switch-character', 'campus')">Campus</button>
        <div class="user-pill" @click="$emit('switch-character', 'Asuka')">
          <img src="/image/qian/happy.png" alt="avatar" class="user-thumb" />
          <div class="user-meta">
            <div class="user-name">花语同学</div>
            <div class="user-lv">Lv.20</div>
          </div>
          <span class="user-arrow">⌄</span>
        </div>
      </div>
    </header>

    <main class="weather-shell">
      <aside class="left-column">
        <section class="panel portrait-panel">
          <div class="portrait-stickers left">♥</div>
          <div class="portrait-stickers right">✿</div>
          <div class="portrait-frame">
            <img src="/image/qian/normal.png" alt="花语同学" class="portrait-img" />
          </div>
          <div class="profile-name-row">
            <div class="profile-name">花语同学</div>
            <span class="profile-tag">AI 助手</span>
          </div>
          <div class="profile-desc">你的花艺学伴 & 生活小助手</div>
          <div class="level-box">
            <div class="level-top">
              <span>Lv.20</span>
              <span>2680 / 3000</span>
            </div>
            <div class="level-track">
              <div class="level-fill"></div>
            </div>
          </div>
          <div class="quote-box">
            <span class="quote-icon">❝</span>
            <span>花会在合适的时候绽放，你也会努力之后发光。</span>
          </div>
        </section>

        <section class="panel energy-panel">
          <div class="panel-title">今日花语能量</div>
          <div class="energy-grid">
            <div class="energy-item">
              <div class="energy-icon peach">🌸</div>
              <div class="energy-value">86</div>
              <div class="energy-label">灵感值</div>
            </div>
            <div class="energy-item">
              <div class="energy-icon sage">🪻</div>
              <div class="energy-value">92</div>
              <div class="energy-label">专注值</div>
            </div>
            <div class="energy-item">
              <div class="energy-icon mint">🍀</div>
              <div class="energy-value">75</div>
              <div class="energy-label">幸运值</div>
            </div>
          </div>
        </section>

        <section class="panel bouquet-panel">
          <div class="panel-title">本周照料的花束</div>
          <div class="bouquet-main">
            <div class="bouquet-count">12</div>
            <div class="bouquet-unit">束</div>
          </div>
          <img src="/image/qian/expect.png" alt="flower sticker" class="bouquet-sticker" />
        </section>
      </aside>

      <section class="center-column">
        <section
          class="panel weather-hero"
          :style="{ backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.42), rgba(255, 255, 255, 0.52)), url('/image/qian/backgroun1.png')` }"
        >
          <div class="hero-head">
            <div class="hero-head-title">
              <span class="hero-flower">✿</span>
              <span>今日天气</span>
            </div>
            <div class="hero-badge">{{ props.weatherHeroBadge }}</div>
          </div>

          <div class="hero-main">
            <div class="hero-info">
              <div class="city-row">
                <span class="city-dot">📍</span>
                <strong>{{ props.weatherToday.city }}</strong>
                <button class="city-switch-btn" @click="$emit('search-weather')">切换城市</button>
              </div>

              <form class="city-search-form" @submit.prevent="$emit('search-weather')">
                <input
                  :value="props.weatherCityInput"
                  class="city-input"
                  type="text"
                  placeholder="输入城市名，例如：杭州、上海、北京"
                  @input="$emit('update-weather-city-input', $event.target.value)"
                />
                <button class="city-submit" type="submit" :disabled="props.weatherLoading">
                  {{ props.weatherLoading ? '同步中...' : '查询天气' }}
                </button>
              </form>

              <div v-if="props.weatherSuggestions.length" class="suggestion-list">
                <button
                  v-for="item in props.weatherSuggestions"
                  :key="`${item.latitude}-${item.longitude}-${item.city}`"
                  class="suggestion-item"
                  type="button"
                  @click="$emit('select-weather-suggestion', item)"
                >
                  <strong>{{ item.name }}</strong>
                  <span>{{ item.city }}</span>
                </button>
              </div>

              <div class="temp-row">
                <div class="temp-main">
                  <span class="temp-value">{{ props.weatherToday.temp }}</span>
                  <span class="temp-unit">°C</span>
                </div>
                <div class="temp-side">
                  <div class="temp-icon">{{ props.weatherToday.icon }}</div>
                  <div class="temp-summary">{{ props.weatherToday.summary }}</div>
                </div>
              </div>

              <div class="hero-detail-row">
                <div class="detail-chip">
                  <span class="detail-value">{{ props.weatherToday.low }} / {{ props.weatherToday.high }}</span>
                  <span class="detail-label">最低 / 最高</span>
                </div>
                <div class="detail-chip">
                  <span class="detail-value">{{ props.weatherToday.humidity }}</span>
                  <span class="detail-label">湿度</span>
                </div>
                <div class="detail-chip">
                  <span class="detail-value">{{ props.weatherToday.wind }}</span>
                  <span class="detail-label">风速</span>
                </div>
                <div class="detail-chip">
                  <span class="detail-value">{{ props.airQuality.value }}</span>
                  <span class="detail-label">空气质量</span>
                </div>
              </div>

              <div class="hero-time-row">
                <span>更新时间：{{ props.weatherDateLabel }}</span>
                <button class="refresh-btn" :disabled="props.weatherLoading" @click="$emit('refresh-weather')">
                  {{ props.weatherLoading ? '刷新中...' : '刷新天气' }}
                </button>
              </div>
            </div>

            <div class="hero-art">
              <div class="hero-art-shell">
                <div class="hero-sparkle sparkle-a">✦</div>
                <div class="hero-sparkle sparkle-b">✿</div>
                <div class="art-note">
                  <div class="art-note-title">花语提醒</div>
                  <div class="art-note-copy">{{ heroBubble }}</div>
                </div>
                <div class="hero-sticker-halo"></div>
                <img src="/image/qian/happy.png" alt="qian sticker" class="hero-sticker" />
              </div>
            </div>
          </div>

          <div class="metric-strip">
            <div class="metric-card" v-for="item in props.weatherMetrics" :key="item.label">
              <div class="metric-label">{{ item.label }}</div>
              <div class="metric-value">{{ item.value }}</div>
            </div>
          </div>

          <div v-if="props.weatherError" class="weather-error-note">{{ props.weatherError }}</div>
        </section>

        <section class="panel forecast-panel">
          <div class="panel-head">
            <div>
              <div class="panel-head-title">24 小时预报</div>
              <div class="panel-head-subtitle">未来时段温度与天气变化</div>
            </div>
            <div class="panel-tag">24H</div>
          </div>
          <div class="hourly-list">
            <div class="hourly-item" v-for="item in props.hourlyForecast" :key="item.time">
              <div class="hourly-time">{{ item.time }}</div>
              <div class="hourly-icon">{{ item.icon }}</div>
              <div class="hourly-text">{{ item.text }}</div>
              <div class="hourly-temp">{{ item.temp }}</div>
            </div>
          </div>
        </section>

        <section class="panel week-panel">
          <div class="panel-head">
            <div>
              <div class="panel-head-title">7 天预报</div>
              <div class="panel-head-subtitle">工作日天气平稳，周末适合外出和拍照</div>
            </div>
            <div class="panel-tag">WEEK</div>
          </div>
          <div class="week-list">
            <div class="week-item" v-for="item in props.weeklyForecast" :key="`${item.day}-${item.date}`">
              <div class="week-top">
                <strong>{{ item.day }}</strong>
                <span>{{ item.date }}</span>
              </div>
              <div class="week-icon">{{ item.icon }}</div>
              <div class="week-text">{{ item.text }}</div>
              <div class="week-range">{{ item.low }} / {{ item.high }}</div>
            </div>
          </div>
        </section>

        <section class="tool-section">
          <div class="tool-title">常用工具 / API 服务</div>
          <div class="tool-grid">
            <div v-for="tool in tools" :key="tool.name" class="tool-card panel">
              <div class="tool-icon" :class="tool.color">{{ tool.icon }}</div>
              <div class="tool-copy">
                <div class="tool-name">{{ tool.name }}</div>
                <div class="tool-desc">{{ tool.desc }}</div>
              </div>
              <img :src="tool.sticker" :alt="tool.name" class="tool-sticker" />
            </div>
          </div>
        </section>
      </section>

      <aside class="right-column">
        <section class="panel side-card">
          <div class="side-head">
            <span>降水趋势</span>
            <button class="more-link" type="button" @click="openMorePanel('rain')">更多</button>
          </div>
          <div class="rain-copy">{{ rainSummary }}</div>
          <div class="rain-overview">
            <div class="rain-overview-main">
              <strong>{{ rainPeak }}</strong>
              <span>峰值概率</span>
            </div>
            <div class="rain-overview-side">
              <div class="rain-overview-chip">均值 {{ rainAverage }}</div>
              <div class="rain-overview-chip">样本 {{ rainTrendItems.length }} 段</div>
            </div>
          </div>
          <div class="rain-chart-card">
            <div class="rain-chart-grid">
              <span v-for="step in 4" :key="`grid-${step}`" class="rain-grid-line"></span>
            </div>
            <svg class="rain-chart-svg" viewBox="0 0 240 132" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="qianRainLine" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stop-color="#d8c1fb" />
                  <stop offset="100%" stop-color="#8f63e5" />
                </linearGradient>
                <linearGradient id="qianRainFill" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stop-color="rgba(143, 99, 229, 0.28)" />
                  <stop offset="100%" stop-color="rgba(143, 99, 229, 0.03)" />
                </linearGradient>
              </defs>
              <polyline class="rain-area" :points="rainAreaPoints" fill="url(#qianRainFill)" />
              <polyline class="rain-line-svg" :points="rainPolylinePoints" fill="none" stroke="url(#qianRainLine)" />
              <circle
                v-for="point in rainChartPoints"
                :key="point.key"
                class="rain-point-svg"
                :cx="point.x"
                :cy="point.y"
                r="4.8"
              />
            </svg>
            <div class="rain-axis">
              <div v-for="item in rainTrendItems" :key="`${item.label}-axis`" class="rain-axis-item">
                <span class="rain-axis-time">{{ item.label }}</span>
                <strong class="rain-axis-value">{{ item.value }}</strong>
              </div>
            </div>
          </div>
        </section>

        <section class="panel side-card">
          <div class="side-head">
            <span>生活指数</span>
            <button class="more-link" type="button" @click="openMorePanel('life')">更多</button>
          </div>
          <div class="life-grid">
            <div v-for="item in displayIndices" :key="item.label" class="life-item">
              <div class="life-icon">{{ item.icon }}</div>
              <div class="life-copy">
                <strong>{{ item.label }}</strong>
                <span>{{ item.level }}</span>
              </div>
            </div>
          </div>
        </section>

        <section class="panel side-card">
          <div class="side-head">
            <span>天气提醒</span>
            <button class="more-link" type="button" @click="openMorePanel('alert')">更多</button>
          </div>
          <div class="alert-list">
            <div v-for="item in props.weatherAlerts" :key="item.title" class="alert-item">
              <div class="alert-title">{{ item.title }}</div>
              <div class="alert-desc">{{ item.desc }}</div>
            </div>
          </div>
        </section>

        <section class="panel side-card sun-card">
          <div class="side-head">
            <span>日出日落</span>
            <button class="more-link" type="button" @click="openMorePanel('sun')">更多</button>
          </div>
          <div
            class="sun-image"
            :style="{ backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.04)), url('/image/qian/sun.jpg')` }"
          ></div>
          <div class="sun-times">
            <div class="sun-time-item">
              <span>日出</span>
              <strong>{{ props.weatherSunCycle.sunrise }}</strong>
            </div>
            <div class="sun-time-item">
              <span>日落</span>
              <strong>{{ props.weatherSunCycle.sunset }}</strong>
            </div>
          </div>
        </section>
      </aside>
    </main>

    <transition name="detail-fade">
      <div v-if="activeMorePanel" class="detail-overlay" @click.self="closeMorePanel">
        <section class="detail-sheet panel">
          <div class="detail-sheet-head">
            <div>
              <div class="detail-sheet-title">{{ detailPanelMeta.title }}</div>
              <div class="detail-sheet-subtitle">{{ detailPanelMeta.subtitle }}</div>
            </div>
            <button class="detail-close" type="button" @click="closeMorePanel">关闭</button>
          </div>

          <div v-if="activeMorePanel === 'rain'" class="detail-sheet-body">
            <div class="detail-highlight-grid">
              <div class="detail-highlight-card">
                <span>最大降水概率</span>
                <strong>{{ rainPeak }}</strong>
              </div>
              <div class="detail-highlight-card">
                <span>平均概率</span>
                <strong>{{ rainAverage }}</strong>
              </div>
              <div class="detail-highlight-card">
                <span>当前天气</span>
                <strong>{{ props.weatherToday.summary || '--' }}</strong>
              </div>
            </div>
            <div class="detail-list">
              <div v-for="item in rainDetailList" :key="`${item.time}-${item.precipitation}`" class="detail-list-row">
                <span>{{ item.time }}</span>
                <strong>{{ item.precipitation }}</strong>
                <em>{{ item.text }}</em>
              </div>
            </div>
          </div>

          <div v-else-if="activeMorePanel === 'life'" class="detail-sheet-body">
            <div class="detail-card-grid">
              <div v-for="item in displayIndices" :key="`detail-${item.label}`" class="detail-card">
                <div class="detail-card-icon">{{ item.icon }}</div>
                <div class="detail-card-title">{{ item.label }}</div>
                <div class="detail-card-copy">{{ item.level }}</div>
              </div>
            </div>
          </div>

          <div v-else-if="activeMorePanel === 'alert'" class="detail-sheet-body">
            <div class="detail-list">
              <div v-for="item in alertDetailList" :key="item.title" class="detail-note-card">
                <div class="detail-note-title">{{ item.title }}</div>
                <div class="detail-note-copy">{{ item.desc }}</div>
              </div>
            </div>
          </div>

          <div v-else-if="activeMorePanel === 'sun'" class="detail-sheet-body">
            <div class="detail-highlight-grid">
              <div class="detail-highlight-card">
                <span>日出</span>
                <strong>{{ props.weatherSunCycle.sunrise }}</strong>
              </div>
              <div class="detail-highlight-card">
                <span>日落</span>
                <strong>{{ props.weatherSunCycle.sunset }}</strong>
              </div>
              <div class="detail-highlight-card">
                <span>白昼时长</span>
                <strong>{{ dayLengthText }}</strong>
              </div>
            </div>
            <div class="sun-detail-visual">
              <div
                class="sun-image large"
                :style="{ backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.04)), url('/image/qian/sun.jpg')` }"
              ></div>
            </div>
          </div>
        </section>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  currentPage: {
    type: String,
    default: 'weather'
  },
  weatherLoading: Boolean,
  weatherError: String,
  weatherToday: {
    type: Object,
    default: () => ({})
  },
  weatherMetrics: {
    type: Array,
    default: () => []
  },
  hourlyForecast: {
    type: Array,
    default: () => []
  },
  weeklyForecast: {
    type: Array,
    default: () => []
  },
  airQuality: {
    type: Object,
    default: () => ({})
  },
  weatherIndices: {
    type: Array,
    default: () => []
  },
  weatherAlerts: {
    type: Array,
    default: () => []
  },
  weatherHeroBadge: String,
  weatherDateLabel: String,
  weatherCityInput: String,
  weatherSuggestions: {
    type: Array,
    default: () => []
  },
  weatherRainTrend: {
    type: Array,
    default: () => []
  },
  weatherSunCycle: {
    type: Object,
    default: () => ({ sunrise: '--', sunset: '--' })
  }
})

defineEmits([
  'page-change',
  'switch-character',
  'refresh-weather',
  'update-weather-city-input',
  'search-weather',
  'select-weather-suggestion'
])

const activeMorePanel = ref('')

const parsePercent = (value) => {
  const numeric = Number(String(value || '').replace('%', '').trim())
  return Number.isFinite(numeric) ? numeric : 0
}

const rainTrendItems = computed(() => {
  const items = props.weatherRainTrend?.length
    ? props.weatherRainTrend
    : [
        { label: '现在', value: '0%' },
        { label: '1时', value: '0%' },
        { label: '2时', value: '0%' },
        { label: '3时', value: '0%' }
      ]

  return items.map((item) => ({
    ...item,
    numeric: parsePercent(item.value)
  }))
})

const rainPeak = computed(() => `${Math.max(...rainTrendItems.value.map((item) => item.numeric), 0)}%`)

const rainAverage = computed(() => {
  if (!rainTrendItems.value.length) return '0%'
  const total = rainTrendItems.value.reduce((sum, item) => sum + item.numeric, 0)
  return `${Math.round(total / rainTrendItems.value.length)}%`
})

const rainSummary = computed(() => {
  const peak = Math.max(...rainTrendItems.value.map((item) => item.numeric), 0)
  if (peak >= 70) return '未来几小时有明显降水，请提前准备雨具'
  if (peak >= 40) return '未来几小时有一定降水概率，建议关注出行变化'
  return '未来几小时降水概率较低，适合轻松出行'
})

const rainChartPoints = computed(() => {
  const width = 240
  const paddingX = 12
  const top = 18
  const bottom = 98
  const usableWidth = width - paddingX * 2
  const count = Math.max(rainTrendItems.value.length - 1, 1)

  return rainTrendItems.value.map((item, index) => {
    const x = paddingX + (usableWidth / count) * index
    const ratio = Math.min(Math.max(item.numeric / 100, 0), 1)
    const y = bottom - (bottom - top) * ratio
    return {
      key: `${item.label}-${index}`,
      x: Number(x.toFixed(2)),
      y: Number(y.toFixed(2)),
      value: item.value,
      label: item.label
    }
  })
})

const rainPolylinePoints = computed(() => rainChartPoints.value.map((item) => `${item.x},${item.y}`).join(' '))

const rainAreaPoints = computed(() => {
  if (!rainChartPoints.value.length) return ''
  const first = rainChartPoints.value[0]
  const last = rainChartPoints.value[rainChartPoints.value.length - 1]
  return `${first.x},108 ${rainPolylinePoints.value} ${last.x},108`
})

const heroBubble = computed(() => {
  const city = props.weatherToday?.city || '当前城市'
  const summary = props.weatherToday?.summary || '天气晴朗'
  const temp = props.weatherToday?.temp || '--'
  return `${city}今天 ${summary}，体感约 ${temp}，出门前我已经帮你把重点天气整理好了。`
})

const displayIndices = computed(() => {
  const base = props.weatherIndices.map((item, index) => ({
    ...item,
    icon: ['👗', '🌤', '🧴'][index] || '✨'
  }))

  const extras = [
    { label: '洗车', level: '较适宜', icon: '🚗' },
    { label: '空调', level: '较舒适', icon: '🧊' },
    { label: '晨练', level: '较适宜', icon: '🌿' }
  ]

  return [...base, ...extras].slice(0, 6)
})

const rainDetailList = computed(() =>
  (props.hourlyForecast || []).slice(0, 8).map((item) => ({
    time: item.time,
    precipitation: item.precipitation || '--',
    text: item.text || '--'
  }))
)

const alertDetailList = computed(() => {
  if (props.weatherAlerts?.length) return props.weatherAlerts
  return [
    {
      title: '暂无特殊天气提醒',
      desc: '当前天气较平稳，建议按实时温度和风速正常安排出行。'
    }
  ]
})

const dayLengthText = computed(() => {
  const sunrise = props.weatherSunCycle?.sunrise
  const sunset = props.weatherSunCycle?.sunset
  if (!sunrise || !sunset || sunrise === '--' || sunset === '--') return '--'

  const [sunriseHour, sunriseMinute] = sunrise.split(':').map(Number)
  const [sunsetHour, sunsetMinute] = sunset.split(':').map(Number)
  if (![sunriseHour, sunriseMinute, sunsetHour, sunsetMinute].every(Number.isFinite)) return '--'

  const startMinutes = sunriseHour * 60 + sunriseMinute
  const endMinutes = sunsetHour * 60 + sunsetMinute
  const diff = Math.max(endMinutes - startMinutes, 0)
  return `${Math.floor(diff / 60)}小时${diff % 60}分`
})

const detailPanelMeta = computed(() => {
  const metaMap = {
    rain: {
      title: '降水趋势详情',
      subtitle: '结合未来小时降水概率，方便你安排出行和拍照时间'
    },
    life: {
      title: '生活指数详情',
      subtitle: '把穿搭、出行、防晒和活动建议集中展示'
    },
    alert: {
      title: '天气提醒详情',
      subtitle: '把当前值得注意的天气提示单独展开查看'
    },
    sun: {
      title: '日出日落详情',
      subtitle: '查看当天的日照节奏，方便安排拍摄和散步时间'
    }
  }

  return metaMap[activeMorePanel.value] || { title: '', subtitle: '' }
})

const openMorePanel = (panelKey) => {
  activeMorePanel.value = panelKey
}

const closeMorePanel = () => {
  activeMorePanel.value = ''
}

const tools = [
  { name: '拍照识别', desc: '识别花卉、植物、物体、文字', icon: '📷', color: 'purple', sticker: '/image/qian/normal.png' },
  { name: '课程表 / 日程', desc: '查看课程表、管理提醒', icon: '📅', color: 'blue', sticker: '/image/qian/listen.png' },
  { name: '翻译助手', desc: '多语言互译，支持文本与语音', icon: 'A', color: 'pink', sticker: '/image/qian/curious.png' },
  { name: '文档总结', desc: '上传文档，智能提炼重点摘要', icon: '📄', color: 'indigo', sticker: '/image/qian/cool.png' },
  { name: '语音对话', desc: '语音交流，实时识别与回复', icon: '🎙️', color: 'green', sticker: '/image/qian/happy.png' },
  { name: '更多工具', desc: '更多实用工具持续更新中', icon: '🎲', color: 'gray', sticker: '/image/qian/surpise.png' }
]
</script>

<style scoped>
.qian-weather-page {
  position: relative;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #5c4e79;
}

.page-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.8), transparent 24%),
    linear-gradient(180deg, rgba(255, 248, 252, 0.88), rgba(251, 244, 250, 0.93));
}

.qian-header,
.weather-shell {
  position: relative;
  z-index: 1;
}

.qian-header {
  height: 64px;
  padding: 0 20px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 20px;
  background: rgba(255, 252, 254, 0.92);
  border-bottom: 1px solid rgba(211, 192, 235, 0.4);
  box-shadow: 0 8px 20px rgba(187, 166, 212, 0.12);
}

.header-left,
.header-right,
.user-pill,
.qian-logo,
.weather-shell,
.profile-name-row,
.energy-grid,
.hero-head,
.city-row,
.temp-row,
.temp-side,
.hero-time-row,
.metric-strip,
.panel-head,
.tool-card,
.tool-copy,
.side-head,
.life-copy,
.sun-times {
  display: flex;
  align-items: center;
}

.header-left {
  gap: 10px;
}

.brand-mark {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: linear-gradient(145deg, #f8e9ff, #ebd7ff);
}

.brand-flower {
  font-size: 24px;
  color: #9b7ae2;
}

.qian-logo {
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
}

.logo-text-top {
  font-size: 18px;
  font-weight: 800;
  color: #44345f;
}

.logo-text-bottom {
  font-size: 14px;
  color: #8f7aa9;
}

.qian-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.nav-item,
.header-icon,
.city-switch-btn,
.city-submit,
.refresh-btn {
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-item {
  height: 38px;
  padding: 0 14px;
  border-radius: 19px;
  background: transparent;
  color: #4f456b;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
}

.nav-item.active {
  background: linear-gradient(180deg, #eadcf9, #d9c2f8);
  color: #6f4ed4;
}

.nav-icon {
  font-size: 14px;
}

.header-right {
  gap: 10px;
}

.header-icon {
  min-width: 36px;
  height: 36px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.78);
  color: #7652cb;
}

.switch-btn {
  padding: 0 12px;
  font-size: 13px;
  font-weight: 700;
}

.user-pill {
  gap: 10px;
  padding: 6px 10px 6px 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(212, 188, 239, 0.42);
  cursor: pointer;
}

.user-thumb {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  font-size: 15px;
  font-weight: 700;
  color: #47365f;
}

.user-lv {
  font-size: 11px;
  color: #8f70c7;
}

.weather-shell {
  padding: 14px 18px 18px;
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr) 290px;
  gap: 16px;
  align-items: start;
}

.panel {
  background: rgba(255, 255, 255, 0.68);
  border: 1px solid rgba(211, 192, 235, 0.46);
  border-radius: 22px;
  box-shadow: 0 10px 30px rgba(196, 172, 220, 0.12);
  backdrop-filter: blur(18px);
}

.left-column,
.right-column,
.center-column {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.portrait-panel,
.energy-panel,
.bouquet-panel,
.side-card,
.forecast-panel,
.week-panel {
  padding: 14px;
}

.portrait-panel {
  position: relative;
}

.portrait-stickers {
  position: absolute;
  font-size: 24px;
  color: #9d79dc;
  opacity: 0.72;
}

.portrait-stickers.left {
  left: 12px;
  top: 72px;
}

.portrait-stickers.right {
  right: 14px;
  bottom: 138px;
}

.portrait-frame {
  height: 286px;
  border-radius: 18px;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(252, 246, 255, 0.96), rgba(234, 219, 247, 0.76));
}

.portrait-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-name-row {
  justify-content: flex-start;
  gap: 8px;
  margin-top: 10px;
}

.profile-name {
  font-size: 28px;
  font-weight: 800;
  color: #47355f;
}

.profile-tag {
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  background: #e9def8;
  color: #7b5ab8;
}

.profile-desc {
  margin-top: 6px;
  font-size: 13px;
  color: #8f7ea6;
}

.level-box {
  margin-top: 14px;
}

.level-top {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 700;
  color: #6c558f;
}

.level-track {
  margin-top: 6px;
  height: 6px;
  border-radius: 999px;
  background: #eadff5;
  overflow: hidden;
}

.level-fill {
  width: 86%;
  height: 100%;
  background: linear-gradient(90deg, #9e78eb, #b892ff);
}

.quote-box {
  margin-top: 12px;
  padding: 12px 14px;
  border-radius: 16px;
  display: flex;
  gap: 8px;
  align-items: flex-start;
  background: rgba(248, 240, 253, 0.74);
  color: #7b688f;
  font-size: 13px;
  line-height: 1.5;
}

.quote-icon {
  color: #a286dd;
}

.panel-title {
  font-size: 15px;
  font-weight: 700;
  color: #56466f;
}

.energy-grid {
  margin-top: 12px;
  justify-content: space-between;
  gap: 8px;
}

.energy-item {
  flex: 1;
  text-align: center;
}

.energy-icon {
  width: 42px;
  height: 42px;
  margin: 0 auto 8px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.78);
  font-size: 20px;
}

.energy-icon.peach { color: #ef8c9f; }
.energy-icon.sage { color: #8b7ad9; }
.energy-icon.mint { color: #73ab72; }

.energy-value {
  font-size: 30px;
  font-weight: 800;
  color: #5a4674;
}

.energy-label {
  font-size: 12px;
  color: #9480ab;
}

.bouquet-panel {
  position: relative;
  min-height: 132px;
}

.bouquet-main {
  margin-top: 16px;
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.bouquet-count {
  font-size: 54px;
  font-weight: 900;
  color: #7554d3;
  line-height: 1;
}

.bouquet-unit {
  font-size: 18px;
  font-weight: 700;
  color: #9380b0;
}

.bouquet-sticker {
  position: absolute;
  right: 8px;
  bottom: 6px;
  width: 88px;
  height: 88px;
  object-fit: contain;
}

.weather-hero {
  padding: 14px;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}

.hero-head {
  justify-content: space-between;
  gap: 12px;
}

.hero-head-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 800;
  color: #5f4d83;
}

.hero-flower {
  color: #a47ae4;
}

.hero-badge {
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.86);
  color: #7e61ca;
  font-size: 12px;
  font-weight: 700;
}

.hero-main {
  margin-top: 14px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 250px;
  gap: 18px;
  align-items: end;
}

.city-row {
  gap: 8px;
  font-size: 18px;
  color: #45365f;
}

.city-switch-btn,
.city-submit,
.refresh-btn {
  height: 34px;
  padding: 0 14px;
  border-radius: 17px;
  background: rgba(255, 255, 255, 0.88);
  color: #7e61ca;
  font-size: 12px;
  font-weight: 700;
}

.city-search-form {
  margin-top: 12px;
  display: flex;
  gap: 10px;
}

.city-input {
  flex: 1;
  height: 40px;
  border-radius: 18px;
  border: 1px solid rgba(214, 194, 239, 0.68);
  background: rgba(255, 255, 255, 0.9);
  padding: 0 14px;
  outline: none;
  font-size: 14px;
  color: #5f4d83;
}

.suggestion-list {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.suggestion-item {
  border: none;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 8px 12px;
  cursor: pointer;
  color: #6f5a89;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.suggestion-item span {
  font-size: 11px;
  color: #9a88b4;
}

.temp-row {
  margin-top: 18px;
  gap: 18px;
  align-items: flex-end;
}

.temp-main {
  display: flex;
  align-items: flex-start;
  gap: 4px;
  color: #3f3158;
}

.temp-value {
  font-size: 82px;
  line-height: 0.92;
  font-weight: 900;
}

.temp-unit {
  margin-top: 10px;
  font-size: 30px;
  font-weight: 800;
}

.temp-side {
  gap: 10px;
  padding-bottom: 12px;
}

.temp-icon {
  font-size: 34px;
}

.temp-summary {
  font-size: 22px;
  font-weight: 700;
}

.hero-detail-row {
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.detail-chip {
  padding: 10px 12px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.84);
}

.detail-value {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: #584473;
}

.detail-label {
  display: block;
  margin-top: 4px;
  font-size: 11px;
  color: #9886af;
}

.hero-time-row {
  margin-top: 14px;
  justify-content: space-between;
  gap: 12px;
  color: #826ea1;
  font-size: 12px;
}

.hero-art {
  position: relative;
  min-height: 228px;
}

.hero-art-shell {
  position: absolute;
  inset: 0;
}

.hero-sparkle {
  position: absolute;
  color: rgba(142, 99, 223, 0.56);
  font-size: 20px;
}

.sparkle-a {
  right: 140px;
  top: 18px;
}

.sparkle-b {
  right: 40px;
  top: 56px;
  font-size: 24px;
}

.art-note {
  position: absolute;
  left: 8px;
  top: 8px;
  max-width: 190px;
  padding: 14px 16px;
  border-radius: 22px 22px 22px 8px;
  background: rgba(255, 255, 255, 0.92);
  color: #6e5a89;
  font-size: 14px;
  line-height: 1.65;
  box-shadow: 0 14px 30px rgba(185, 165, 214, 0.18);
}

.art-note::after {
  content: '';
  position: absolute;
  right: 20px;
  bottom: -10px;
  width: 18px;
  height: 18px;
  border-radius: 0 0 12px 0;
  background: rgba(255, 255, 255, 0.92);
  transform: rotate(35deg);
}

.art-note-title {
  position: relative;
  z-index: 1;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #9a7adb;
  margin-bottom: 6px;
}

.art-note-copy {
  position: relative;
  z-index: 1;
}

.hero-sticker-halo {
  position: absolute;
  right: 10px;
  bottom: 8px;
  width: 168px;
  height: 168px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(229, 202, 255, 0.64), rgba(229, 202, 255, 0.06) 72%, transparent 76%);
}

.hero-sticker {
  position: absolute;
  right: -2px;
  bottom: -18px;
  width: 202px;
  height: 202px;
  object-fit: contain;
  filter: drop-shadow(0 20px 28px rgba(178, 155, 217, 0.28));
}

.metric-strip {
  margin-top: 14px;
  gap: 10px;
}

.metric-card {
  flex: 1;
  padding: 10px 12px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.84);
}

.metric-label {
  font-size: 12px;
  color: #9988b0;
}

.metric-value {
  margin-top: 6px;
  font-size: 15px;
  font-weight: 800;
  color: #59456f;
}

.weather-error-note {
  margin-top: 12px;
  padding: 10px 14px;
  border-radius: 14px;
  background: rgba(255, 245, 247, 0.92);
  color: #b44d77;
  font-size: 12px;
}

.panel-head {
  justify-content: space-between;
  gap: 12px;
}

.panel-head-title {
  font-size: 16px;
  font-weight: 800;
  color: #5f4d83;
}

.panel-head-subtitle {
  margin-top: 4px;
  font-size: 12px;
  color: #9b89b4;
}

.panel-tag {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(238, 228, 252, 0.9);
  color: #7f62cd;
  font-size: 12px;
  font-weight: 700;
}

.hourly-list {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(74px, 1fr));
  gap: 8px;
}

.hourly-item {
  padding: 10px 6px;
  text-align: center;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.7);
}

.hourly-time,
.hourly-text {
  font-size: 11px;
  color: #8f7ba8;
}

.hourly-icon {
  margin: 8px 0 6px;
  font-size: 24px;
}

.hourly-temp {
  font-size: 14px;
  font-weight: 800;
  color: #53416d;
}

.week-list {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 8px;
}

.week-item {
  padding: 12px 8px;
  border-radius: 16px;
  text-align: center;
  background: rgba(255, 255, 255, 0.72);
}

.week-top {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.week-top strong {
  font-size: 13px;
  color: #5c4e79;
}

.week-top span,
.week-text {
  font-size: 11px;
  color: #9a89b2;
}

.week-icon {
  margin: 10px 0 6px;
  font-size: 24px;
}

.week-range {
  margin-top: 8px;
  font-size: 13px;
  font-weight: 800;
  color: #5a4674;
}

.tool-title {
  margin: 2px 0 12px;
  font-size: 16px;
  font-weight: 800;
  color: #5f4d83;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 10px;
}

.tool-card {
  position: relative;
  min-height: 108px;
  padding: 12px;
  gap: 10px;
  overflow: hidden;
}

.tool-icon {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  color: #ffffff;
  font-weight: 700;
  flex-shrink: 0;
}

.tool-icon.purple { background: #9f78eb; }
.tool-icon.blue { background: #6aa9ff; }
.tool-icon.pink { background: #ef89b0; }
.tool-icon.indigo { background: #6d75e9; }
.tool-icon.green { background: #55b26e; }
.tool-icon.gray { background: #8e92a7; }

.tool-copy {
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
}

.tool-name {
  font-size: 13px;
  font-weight: 800;
  color: #56426f;
}

.tool-desc {
  margin-top: 4px;
  font-size: 10px;
  line-height: 1.45;
  color: #9886b0;
}

.tool-sticker {
  position: absolute;
  right: -8px;
  bottom: -8px;
  width: 76px;
  height: 76px;
  object-fit: contain;
}

.side-head {
  justify-content: space-between;
  gap: 10px;
  font-size: 15px;
  font-weight: 800;
  color: #5f4d83;
}

.more-link {
  border: none;
  background: rgba(239, 230, 252, 0.76);
  height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  font-size: 11px;
  color: #9a89b2;
  cursor: pointer;
}

.rain-copy {
  margin-top: 12px;
  font-size: 12px;
  color: #8f7ca8;
}

.rain-overview {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.rain-overview-main strong {
  display: block;
  font-size: 30px;
  line-height: 1;
  color: #6e4fc5;
}

.rain-overview-main span {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #9a89b2;
}

.rain-overview-side {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rain-overview-chip {
  padding: 6px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
  color: #8f72c9;
  background: rgba(255, 255, 255, 0.72);
}

.rain-chart-card {
  margin-top: 14px;
  position: relative;
  padding: 12px 12px 10px;
  border-radius: 18px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.84), rgba(247, 239, 255, 0.78)),
    rgba(255, 255, 255, 0.56);
  overflow: hidden;
}

.rain-chart-grid,
.rain-chart-svg,
.rain-axis {
  position: relative;
  z-index: 1;
}

.rain-chart-grid {
  position: absolute;
  inset: 12px 12px 44px;
  pointer-events: none;
}

.rain-grid-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  border-top: 1px dashed rgba(171, 144, 218, 0.32);
}

.rain-grid-line:nth-child(1) { top: 8%; }
.rain-grid-line:nth-child(2) { top: 34%; }
.rain-grid-line:nth-child(3) { top: 60%; }
.rain-grid-line:nth-child(4) { top: 86%; }

.rain-chart-svg {
  display: block;
  width: 100%;
  height: 132px;
}

.rain-line-svg {
  stroke-width: 4.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.rain-point-svg {
  fill: #ffffff;
  stroke: #8f63e5;
  stroke-width: 3;
}

.rain-axis {
  margin-top: 4px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}

.rain-axis-item {
  text-align: center;
}

.rain-axis-time {
  display: block;
  font-size: 11px;
  color: #9a89b2;
}

.rain-axis-value {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #5d4a78;
}

.detail-overlay {
  position: relative;
  position: fixed;
  inset: 0;
  z-index: 30;
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  background: rgba(84, 63, 118, 0.2);
  backdrop-filter: blur(10px);
}

.detail-sheet {
  width: min(460px, 100%);
  padding: 18px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(249, 243, 255, 0.94));
}

.detail-sheet-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.detail-sheet-title {
  font-size: 22px;
  font-weight: 900;
  color: #543f76;
}

.detail-sheet-subtitle {
  margin-top: 6px;
  font-size: 12px;
  line-height: 1.6;
  color: #907ea9;
}

.detail-close {
  border: none;
  height: 34px;
  padding: 0 14px;
  border-radius: 999px;
  background: #eadcf9;
  color: #795ed0;
  font-weight: 700;
  cursor: pointer;
}

.detail-sheet-body {
  margin-top: 18px;
}

.detail-highlight-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.detail-highlight-card,
.detail-card,
.detail-note-card,
.detail-list-row {
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(220, 204, 243, 0.7);
}

.detail-highlight-card {
  padding: 14px;
}

.detail-highlight-card span {
  display: block;
  font-size: 12px;
  color: #9a88b2;
}

.detail-highlight-card strong {
  display: block;
  margin-top: 8px;
  font-size: 22px;
  color: #5d4a78;
}

.detail-list {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.detail-list-row {
  display: grid;
  grid-template-columns: 72px 72px 1fr;
  gap: 12px;
  align-items: center;
  padding: 12px 14px;
}

.detail-list-row span,
.detail-list-row em {
  font-size: 12px;
  color: #9583ad;
}

.detail-list-row strong {
  font-size: 15px;
  color: #5d4a78;
}

.detail-list-row em {
  font-style: normal;
}

.detail-card-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.detail-card {
  padding: 14px;
}

.detail-card-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: rgba(239, 230, 252, 0.94);
}

.detail-card-title {
  margin-top: 12px;
  font-size: 15px;
  font-weight: 800;
  color: #5d4a78;
}

.detail-card-copy {
  margin-top: 6px;
  font-size: 12px;
  line-height: 1.5;
  color: #9583ad;
}

.detail-note-card {
  padding: 14px;
}

.detail-note-title {
  font-size: 15px;
  font-weight: 800;
  color: #5d4a78;
}

.detail-note-copy {
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.65;
  color: #8f7ca8;
}

.sun-detail-visual {
  margin-top: 16px;
}

.sun-image.large {
  height: 180px;
}

.detail-fade-enter-active,
.detail-fade-leave-active {
  transition: opacity 0.2s ease;
}

.detail-fade-enter-from,
.detail-fade-leave-to {
  opacity: 0;
}

.life-grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.life-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.72);
}

.life-icon {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: rgba(239, 230, 252, 0.92);
}

.life-copy {
  flex-direction: column;
  align-items: flex-start;
}

.life-copy strong {
  font-size: 13px;
  color: #5d4a78;
}

.life-copy span {
  font-size: 11px;
  color: #9583ad;
}

.alert-list {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.alert-item {
  padding: 10px 12px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.72);
}

.alert-title {
  font-size: 13px;
  font-weight: 800;
  color: #5d4a78;
}

.alert-desc {
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.5;
  color: #9483ad;
}

.sun-image {
  margin-top: 12px;
  height: 96px;
  border-radius: 16px;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}

.sun-times {
  margin-top: 12px;
  justify-content: space-between;
  gap: 10px;
}

.sun-time-item {
  flex: 1;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.72);
}

.sun-time-item span {
  display: block;
  font-size: 11px;
  color: #9886af;
}

.sun-time-item strong {
  display: block;
  margin-top: 6px;
  font-size: 16px;
  color: #5b4774;
}

@media (max-width: 1500px) {
  .weather-shell {
    grid-template-columns: 220px minmax(0, 1fr);
  }

  .right-column {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .tool-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 1200px) {
  .qian-header {
    height: auto;
    padding: 12px 16px;
    grid-template-columns: 1fr;
  }

  .qian-nav {
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .header-right {
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .weather-shell {
    grid-template-columns: 1fr;
  }

  .left-column,
  .right-column {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hero-main,
  .tool-grid,
  .week-list {
    grid-template-columns: 1fr;
  }

  .hero-detail-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .detail-sheet {
    width: 100%;
  }
}

@media (max-width: 900px) {
  .detail-highlight-grid,
  .detail-card-grid {
    grid-template-columns: 1fr;
  }

  .detail-list-row {
    grid-template-columns: 1fr;
  }
}
</style>
