<template>
  <div class="qian-nav-page" :style="{ backgroundImage: `url('/image/qian/qianbackground.png')` }">
    <PetalFall />
    <div class="page-overlay"></div>

    <header class="qian-header">
      <div class="header-left">
        <div class="brand-mark">
          <div class="brand-flower">✿</div>
        </div>
        <div class="qian-logo">
          <div class="logo-text-top">Qian's Garden</div>
          <div class="logo-text-bottom">专属陪伴</div>
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
            <div class="user-name">千千同学</div>
            <div class="user-lv">Lv.20</div>
          </div>
          <span class="user-arrow">⌄</span>
        </div>
      </div>
    </header>

    <main class="nav-shell">
      <aside class="left-column">
        <section class="panel portrait-panel">
          <div class="portrait-stickers left">♥</div>
          <div class="portrait-stickers right">✿</div>
          <div class="portrait-frame">
            <img src="/image/qian/normal.png" alt="千千同学" class="portrait-img" />
          </div>
          <div class="profile-name-row">
            <div class="profile-name">千千同学</div>
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
            <span>花会在合适时间绽放，你也会在努力之后发光。</span>
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
              <div class="energy-icon sage">🌿</div>
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
          <img src="/image/qian/wink.png" alt="flower sticker" class="bouquet-sticker" loading="lazy" decoding="async" />
        </section>
      </aside>

      <section class="center-column">
        <section class="panel route-panel">
          <div class="route-header">
            <div>
              <div class="route-title">校园导航</div>
              <div class="route-subtitle">智能规划路线，帮你轻松抵达每一个目的地</div>
            </div>
          </div>

          <div class="search-row">
            <div class="search-box">
              <div class="search-tag">从</div>
              <div class="search-main">
                <input
                  v-model="startKeyword"
                  class="search-input"
                  type="text"
                  placeholder="请输入起点"
                  @keydown.enter.prevent="planActualRoute"
                />
                <div class="search-desc">{{ activeRoute.startAddress }}</div>
              </div>
              <button class="search-arrow-btn" @click="locateMe">⌖</button>
            </div>

            <button class="swap-btn" @click="swapAddresses">⇄</button>

            <div class="search-box">
              <div class="search-tag purple">到</div>
              <div class="search-main">
                <input
                  v-model="endKeyword"
                  class="search-input"
                  type="text"
                  placeholder="请输入终点"
                  @keydown.enter.prevent="planActualRoute"
                />
                <div class="search-desc">{{ activeRoute.endAddress }}</div>
              </div>
              <button class="search-arrow-btn" @click="planActualRoute">›</button>
            </div>

            <button class="fav-btn" @click="planActualRoute">{{ isPlanning ? '规划中' : '路线规划' }}</button>
          </div>

          <div class="mode-tabs">
            <button
              v-for="mode in modeOptions"
              :key="mode.key"
              class="mode-tab"
              :class="{ active: currentMode === mode.key }"
              @click="switchMode(mode.key)"
            >
              {{ mode.label }}
            </button>
          </div>

          <div class="map-card">
            <div ref="mapRef" class="amap-canvas"></div>
            <div class="map-theme-overlay"></div>
            <div class="map-theme-glow"></div>
            <div class="map-caption">{{ mapStatus }}</div>
            <div class="map-chip">{{ activeRoute.mapBadge }}</div>
            <div class="map-chip secondary">{{ activeRoute.themeTag }}</div>

            <div v-if="mapErrorDetail" class="map-error-banner">
              {{ mapErrorDetail }}
            </div>

            <div class="map-zoom">
              <button @click="zoomIn">+</button>
              <button @click="zoomOut">-</button>
              <button class="refresh-zoom" @click="refreshMap">↻</button>
            </div>

            <div class="route-bubble">
              <img src="/image/qian/curious.png" alt="route sticker" class="bubble-avatar" loading="lazy" decoding="async" />
              <div class="bubble-copy">{{ activeRoute.bubble }}</div>
            </div>
          </div>

          <div class="route-summary">
            <div class="summary-left">
              <div class="summary-title">推荐路线</div>
              <div class="summary-path">{{ activeRoute.pathName }}</div>
              <div class="summary-note">{{ activeRoute.note }}</div>
            </div>

            <div class="summary-stats">
              <div class="stat-box">
                <div class="stat-number">{{ activeRoute.duration }}</div>
                <div class="stat-unit">分钟</div>
                <div class="stat-label">预计用时</div>
              </div>
              <div class="stat-box">
                <div class="stat-number">{{ activeRoute.distance }}</div>
                <div class="stat-unit">{{ activeRoute.distanceUnit }}</div>
                <div class="stat-label">距离</div>
              </div>
              <div class="stat-box">
                <div class="stat-number">{{ activeRoute.extraValue }}</div>
                <div class="stat-unit">{{ activeRoute.extraUnit }}</div>
                <div class="stat-label">{{ activeRoute.extraLabel }}</div>
              </div>
            </div>

            <div class="summary-actions">
              <button class="primary-action" @click="focusRoute">开始导航</button>
              <button class="ghost-action" @click="refreshMap">刷新路线</button>
            </div>
          </div>

          <div class="quick-area">
            <div class="quick-title">快捷目的地</div>
            <div class="quick-grid">
              <div v-for="spot in quickSpots" :key="spot.name" class="quick-card" @click="applyQuickSpot(spot)">
                <div class="quick-card-icon">{{ spot.icon }}</div>
                <div class="quick-card-name">{{ spot.name }}</div>
                <div class="quick-card-desc">{{ spot.desc }}</div>
              </div>
            </div>
          </div>
        </section>
      </section>

      <aside class="right-column">
        <section class="panel widget weather-panel">
          <div class="widget-header">
            <span>今天天气</span>
            <span class="widget-meta">杭州市 · 西湖区</span>
          </div>
          <div class="weather-main">
            <div class="weather-icon">⛅</div>
            <div class="weather-temp-wrap">
              <div class="weather-temp">24<span>°C</span></div>
              <div class="weather-desc">多云转晴</div>
            </div>
          </div>
          <div class="weather-grid">
            <div class="weather-cell"><strong>22℃ / 28℃</strong><span>体感</span></div>
            <div class="weather-cell"><strong>63%</strong><span>湿度</span></div>
            <div class="weather-cell"><strong>东南风 2级</strong><span>风速</span></div>
            <div class="weather-cell"><strong>28</strong><span>空气优</span></div>
          </div>
          <div class="widget-foot">数据来源：Weather API</div>
        </section>

        <section class="panel widget">
          <div class="widget-header">
            <span>我的位置 / 地图</span>
            <span class="widget-link">查看大图</span>
          </div>
          <div class="mini-map">
            <div class="mini-map-grid"></div>
            <div class="mini-map-route"></div>
            <div class="mini-map-pin"></div>
            <div class="mini-map-label">已连接高德地图</div>
          </div>
          <div class="location-copy">{{ activeRoute.startAddress }}</div>
          <div class="widget-foot">精度：±15m · 更新时间：{{ updateTime }}</div>
        </section>

        <section class="panel widget">
          <div class="widget-header">
            <span>日程提醒</span>
            <span class="widget-link">查看全部</span>
          </div>
          <div class="schedule-item">
            <div class="schedule-time">
              <strong>15:00</strong>
              <span>今天</span>
            </div>
            <div class="schedule-copy">
              <div class="schedule-title">开会：花艺社团例会</div>
              <div class="schedule-meta-line">今天 15:00 · 例会室</div>
            </div>
          </div>
          <div class="schedule-item">
            <div class="schedule-time">
              <strong>19:30</strong>
              <span>今天</span>
            </div>
            <div class="schedule-copy">
              <div class="schedule-title">花艺课程：色彩搭配</div>
              <div class="schedule-meta-line">艺术楼 A 座 204 室</div>
            </div>
          </div>
          <div class="widget-foot">Calendar API</div>
        </section>

        <section class="panel widget route-list-widget">
          <div class="widget-header">
            <span>路线摘要</span>
            <span class="widget-link">查看详情</span>
          </div>
          <div class="route-list">
            <div v-for="item in activeRoute.steps" :key="item.title" class="route-list-item">
              <span class="route-dot"></span>
              <div class="route-list-copy">
                <div class="route-list-title">{{ item.title }}</div>
                <div class="route-list-desc">{{ item.desc }}</div>
              </div>
            </div>
          </div>
          <img src="/image/qian/expect.png" alt="bouquet" class="route-corner-sticker" loading="lazy" decoding="async" />
        </section>
      </aside>
    </main>

    <footer class="tool-footer">
      <div class="footer-title">常用工具 / API 服务</div>
      <div class="tool-grid">
        <div v-for="tool in tools" :key="tool.name" class="tool-card panel">
          <div class="tool-badge" :class="tool.color">{{ tool.badge }}</div>
          <div class="tool-copy">
            <div class="tool-name">{{ tool.name }}</div>
            <div class="tool-desc">{{ tool.desc }}</div>
            <div class="tool-api">{{ tool.api }}</div>
          </div>
          <img :src="tool.sticker" :alt="tool.name" class="tool-sticker" loading="lazy" decoding="async" />
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { loadAmapScript } from '../../utils/amap'
import PetalFall from './PetalFall.vue'

const props = defineProps({
  currentPage: {
    type: String,
    default: 'nav'
  },
  geoLocation: {
    type: Object,
    default: () => ({})
  },
  geoSyncKey: {
    type: Number,
    default: 0
  }
})

defineEmits(['switch-character', 'page-change'])

const defaultStart = {
  name: '杭州市西湖区文一西路 518 号',
  address: '杭州市西湖区文一西路 518 号',
  position: [120.01787, 30.28523]
}

const defaultEnd = {
  name: '浙江大学紫金港校区图书馆',
  address: '浙江大学紫金港校区图书馆',
  position: [120.02383, 30.30947]
}

const mapRef = ref(null)
const mapInstance = ref(null)
const mapStatus = ref('高德地图待规划')
const mapErrorDetail = ref('')
const updateTime = ref(new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }))
const isPlanning = ref(false)
const currentMode = ref('walk')
const startKeyword = ref(defaultStart.address)
const endKeyword = ref(defaultEnd.address)
const geocoderRef = ref(null)
const placeSearchRef = ref(null)
const walkingRef = ref(null)
const drivingRef = ref(null)
const routeOverlays = {
  markers: [],
  polyline: null
}

const modeOptions = [
  { key: 'walk', label: '步行' },
  { key: 'taxi', label: '打车' }
]

const routeThemeMap = {
  walk: {
    themeTag: '柔雾花园',
    strokeColor: '#8f63e5',
    extraLabel: '消耗热量',
    extraUnit: '千卡',
    bubblePrefix: '已为你规划步行路线',
    badge: '步行导航 · 高德真实路线'
  },
  taxi: {
    themeTag: '暮光玫瑰',
    strokeColor: '#d26ea4',
    extraLabel: '预估车费',
    extraUnit: '元',
    bubblePrefix: '已为你规划驾车路线',
    badge: '驾车导航 · 高德真实路线'
  }
}

const activeRoute = reactive({
  mapBadge: '步行导航 · 高德真实路线',
  themeTag: '柔雾花园',
  pathName: '杭州市西湖区文一西路 518 号 → 浙江大学紫金港校区图书馆',
  note: '输入起点与终点后，可使用高德真实路线规划',
  bubble: '已为你规划步行路线，预计 12 分钟可到达。',
  duration: 12,
  distance: 2.8,
  distanceUnit: '公里',
  extraValue: 73,
  extraUnit: '千卡',
  extraLabel: '消耗热量',
  startAddress: defaultStart.address,
  endAddress: defaultEnd.address,
  steps: [
    { title: '从当前位置出发', desc: '输入真实地址后会展示高德路线步骤' },
    { title: '支持步行与驾车', desc: '切换模式后会重新规划实际线路' },
    { title: '点击开始导航', desc: '地图会自动聚焦到整条路线' }
  ]
})

const quickSpots = [
  { icon: '🌸', name: '图书馆', desc: '知识殿堂', query: '浙江大学紫金港校区图书馆' },
  { icon: '🏫', name: '行政楼', desc: '校园服务', query: '浙江大学紫金港校区行政服务办事大厅' },
  { icon: '☕', name: '咖啡角', desc: '香浓时光', query: '浙江大学紫金港校区咖啡馆' },
  { icon: '🎭', name: '体育馆', desc: '活力中心', query: '浙江大学紫金港校区体育馆' },
  { icon: '🌿', name: '校医院', desc: '便民服务', query: '浙江大学紫金港校区校医院' }
]

const syncClock = () => {
  updateTime.value = new Date().toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const sanitizeInstruction = (text) => {
  return String(text || '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

const formatDistance = (meters) => {
  const distance = Number(meters || 0)
  if (distance >= 1000) {
    return {
      value: Number((distance / 1000).toFixed(distance >= 10000 ? 0 : 1)),
      unit: '公里'
    }
  }
  return {
    value: Math.max(1, Math.round(distance)),
    unit: '米'
  }
}

const clearRouteOverlays = () => {
  if (!mapInstance.value) return
  const toRemove = [...routeOverlays.markers]
  if (routeOverlays.polyline) {
    toRemove.push(routeOverlays.polyline)
  }
  if (toRemove.length) {
    mapInstance.value.remove(toRemove)
  }
  routeOverlays.markers = []
  routeOverlays.polyline = null
}

const createMarkerContent = (type) => {
  return `<div class="qian-amap-marker ${type}"><span></span></div>`
}

const drawRouteOverlay = async ({ path, start, end, startLabel, endLabel, strokeColor }) => {
  if (!mapInstance.value) return
  const AMap = await loadAmapScript()
  clearRouteOverlays()

  const startMarker = new AMap.Marker({
    position: start,
    anchor: 'bottom-center',
    content: createMarkerContent('start'),
    zIndex: 120
  })
  startMarker.setLabel({
    offset: new AMap.Pixel(18, -4),
    direction: 'right',
    content: `<div class="qian-amap-label">${startLabel}</div>`
  })

  const endMarker = new AMap.Marker({
    position: end,
    anchor: 'bottom-center',
    content: createMarkerContent('end'),
    zIndex: 121
  })
  endMarker.setLabel({
    offset: new AMap.Pixel(18, -4),
    direction: 'right',
    content: `<div class="qian-amap-label end">${endLabel}</div>`
  })

  const polyline = new AMap.Polyline({
    path,
    isOutline: true,
    outlineColor: 'rgba(255,255,255,0.98)',
    borderWeight: 5,
    strokeColor,
    strokeOpacity: 0.94,
    strokeWeight: 8,
    strokeStyle: 'solid',
    lineJoin: 'round',
    lineCap: 'round',
    showDir: true,
    zIndex: 110
  })

  mapInstance.value.add([polyline, startMarker, endMarker])
  routeOverlays.markers = [startMarker, endMarker]
  routeOverlays.polyline = polyline
}

const initServices = async () => {
  const AMap = await loadAmapScript()
  if (!geocoderRef.value) {
    geocoderRef.value = new AMap.Geocoder({ city: '杭州' })
  }
  if (!placeSearchRef.value) {
    placeSearchRef.value = new AMap.PlaceSearch({
      city: '杭州',
      citylimit: false,
      pageSize: 1
    })
  }
  if (!walkingRef.value) {
    walkingRef.value = new AMap.Walking()
  }
  if (!drivingRef.value) {
    drivingRef.value = new AMap.Driving()
  }
  return AMap
}

const resolveKeyword = async (keyword, fallback = null) => {
  const normalized = String(keyword || '').trim()
  if (!normalized && fallback) {
    return fallback
  }
  if (!normalized) {
    throw new Error('请输入起点和终点')
  }
  if (fallback && (normalized === '当前位置' || normalized === fallback.address || normalized === fallback.name)) {
    return fallback
  }

  await initServices()

  const tryPlaceSearch = () =>
    new Promise((resolve, reject) => {
      placeSearchRef.value.search(normalized, (status, result) => {
        const poi = result?.poiList?.pois?.[0]
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
      geocoderRef.value.getLocation(normalized, (status, result) => {
        const geocode = result?.geocodes?.[0]
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
    return await tryPlaceSearch()
  } catch (error) {
    return tryGeocoder()
  }
}

const extractPathPoints = (steps = [], route = {}) => {
  const path = []

  const pushPoint = (point) => {
    if (!point) return
    if (Array.isArray(point) && point.length >= 2) {
      path.push([point[0], point[1]])
      return
    }
    if (typeof point.lng === 'number' && typeof point.lat === 'number') {
      path.push([point.lng, point.lat])
      return
    }
    if (typeof point.getLng === 'function' && typeof point.getLat === 'function') {
      path.push([point.getLng(), point.getLat()])
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

const updateRouteSummary = ({ start, end, route, steps }) => {
  const theme = routeThemeMap[currentMode.value]
  const distanceInfo = formatDistance(route.distance)
  const durationMinutes = Math.max(1, Math.round(Number(route.time || route.duration || 0) / 60))
  const instructionList = steps
    .map((step) => sanitizeInstruction(step.instruction || step.road || step.assistant_action || step.action))
    .filter(Boolean)
    .slice(0, 3)

  const extraValue =
    currentMode.value === 'walk'
      ? Math.max(1, Math.round((Number(route.distance || 0) / 1000) * 26))
      : Math.max(8, Math.round(Number(route.distance || 0) / 380))

  activeRoute.mapBadge = theme.badge
  activeRoute.themeTag = theme.themeTag
  activeRoute.pathName = `${start.name} → ${end.name}`
  activeRoute.note = `已根据高德地图规划真实路线，共 ${steps.length || 1} 段导航步骤`
  activeRoute.bubble = `${theme.bubblePrefix}，预计 ${durationMinutes} 分钟，前往 ${end.name}。`
  activeRoute.duration = durationMinutes
  activeRoute.distance = distanceInfo.value
  activeRoute.distanceUnit = distanceInfo.unit
  activeRoute.extraValue = extraValue
  activeRoute.extraUnit = theme.extraUnit
  activeRoute.extraLabel = theme.extraLabel
  activeRoute.startAddress = start.address
  activeRoute.endAddress = end.address
  activeRoute.steps =
    instructionList.length > 0
      ? instructionList.map((instruction, index) => ({
          title: instruction,
          desc: index === instructionList.length - 1 ? `目的地：${end.name}` : `第 ${index + 1} 段导航`
        }))
      : [
          { title: '从起点出发', desc: start.name },
          { title: '沿路线前往', desc: `预计 ${durationMinutes} 分钟` },
          { title: '抵达终点', desc: end.name }
        ]

  syncClock()
  mapStatus.value = `${theme.badge}已规划`
  focusRoute()
}

const planRouteByService = async (start, end) => {
  await initServices()
  const service = currentMode.value === 'taxi' ? drivingRef.value : walkingRef.value

  return new Promise((resolve, reject) => {
    service.search(start.position, end.position, (status, result) => {
      const route = result?.routes?.[0] || result?.route?.routes?.[0]
      if (status !== 'complete' || !route) {
        reject(new Error('高德路线规划失败，请尝试更具体的地址'))
        return
      }
      const steps = route.steps || []
      const path = extractPathPoints(steps, route)
      resolve({ route, steps, path: path.length ? path : [start.position, end.position] })
    })
  })
}

const planActualRoute = async () => {
  if (!mapInstance.value || isPlanning.value) return

  try {
    isPlanning.value = true
    mapStatus.value = '正在规划真实路线...'
    mapErrorDetail.value = ''

    const [start, end] = await Promise.all([
      resolveKeyword(startKeyword.value, defaultStart),
      resolveKeyword(endKeyword.value, defaultEnd)
    ])

    const { route, steps, path } = await planRouteByService(start, end)
    const theme = routeThemeMap[currentMode.value]

    await drawRouteOverlay({
      path,
      start: start.position,
      end: end.position,
      startLabel: currentMode.value === 'walk' ? '起点' : '上车点',
      endLabel: '终点',
      strokeColor: theme.strokeColor
    })

    updateRouteSummary({ start, end, route, steps })
  } catch (error) {
    console.error('Qian route plan error:', error)
    mapStatus.value = '路线规划失败'
    mapErrorDetail.value = error?.message || '请尝试输入更完整的起点和终点'
  } finally {
    isPlanning.value = false
  }
}

const initThemeMap = async (force = false) => {
  await nextTick()
  if (!mapRef.value) return

  try {
    mapStatus.value = '高德地图载入中...'
    mapErrorDetail.value = ''
    const AMap = await initServices()

    if (force && mapInstance.value) {
      mapInstance.value.destroy()
      mapInstance.value = null
    }

    if (!mapInstance.value) {
      mapInstance.value = new AMap.Map(mapRef.value, {
        viewMode: '3D',
        zoom: 15,
        center: defaultStart.position,
        mapStyle: 'amap://styles/macaron',
        showIndoorMap: false,
        zooms: [4, 20],
        dragEnable: true,
        resizeEnable: true
      })

      AMap.plugin(['AMap.Scale', 'AMap.ToolBar'], () => {
        if (!mapInstance.value) return
        mapInstance.value.addControl(new AMap.Scale())
        mapInstance.value.addControl(new AMap.ToolBar({ position: 'RB' }))
      })
    } else {
      mapInstance.value.setCenter(defaultStart.position)
      mapInstance.value.resize()
    }

    mapStatus.value = '高德地图已连接'
    await planActualRoute()
  } catch (error) {
    console.error('Qian AMap load error:', error)
    mapStatus.value = '高德地图加载失败'
    mapErrorDetail.value = error?.message || '请检查高德地图 Key 或浏览器控制台报错'
  }
}

const locateMe = async () => {
  mapStatus.value = '正在获取位置...'
  try {
    const AMap = await initServices()
    const geolocation = new AMap.Geolocation({
      enableHighAccuracy: true,
      timeout: 10000,
      zoomToAccuracy: true
    })

    geolocation.getCurrentPosition(async (status, result) => {
      if (status === 'complete') {
        const { position, formattedAddress } = result
        startKeyword.value = formattedAddress || '我的位置'
        if (mapInstance.value) {
          mapInstance.value.setZoomAndCenter(16, [position.lng, position.lat])
        }
        mapStatus.value = '位置已更新'
        await planActualRoute()
      } else {
        console.warn('Qian Geolocation failed, trying IP:', result)
        geolocation.getCityInfo((cityStatus, cityResult) => {
          if (cityStatus === 'complete') {
            startKeyword.value = cityResult.city
            mapStatus.value = '已通过IP定位'
          } else {
            mapStatus.value = '定位失败'
          }
        })
      }
    })
  } catch (error) {
    console.error('Qian Geolocation error:', error)
    mapStatus.value = '定位不可用'
  }
}

watch(() => props.geoSyncKey, async () => {
  const longitude = Number(props.geoLocation?.longitude)
  const latitude = Number(props.geoLocation?.latitude)
  const address = props.geoLocation?.address || props.geoLocation?.name || props.geoLocation?.city

  if (!Number.isFinite(longitude) || !Number.isFinite(latitude) || !address) return

  startKeyword.value = address
  activeRoute.startAddress = address

  if (mapInstance.value) {
    mapInstance.value.setZoomAndCenter(16, [longitude, latitude])
  }

  await planActualRoute()
}, { immediate: true })

const focusRoute = () => {
  if (!mapInstance.value) return
  const overlays = [...routeOverlays.markers]
  if (routeOverlays.polyline) {
    overlays.push(routeOverlays.polyline)
  }
  if (overlays.length) {
    mapInstance.value.setFitView(overlays, false, [76, 110, 120, 90])
  }
}

const refreshMap = async () => {
  await initThemeMap(true)
}

const zoomIn = () => {
  if (!mapInstance.value) return
  mapInstance.value.setZoom(mapInstance.value.getZoom() + 1)
}

const zoomOut = () => {
  if (!mapInstance.value) return
  mapInstance.value.setZoom(mapInstance.value.getZoom() - 1)
}

const switchMode = (mode) => {
  if (currentMode.value === mode) return
  currentMode.value = mode
}

const swapAddresses = () => {
  const start = startKeyword.value
  startKeyword.value = endKeyword.value
  endKeyword.value = start
  planActualRoute()
}

const applyQuickSpot = (spot) => {
  endKeyword.value = spot.query
  planActualRoute()
}

const handleResize = () => {
  if (mapInstance.value) {
    mapInstance.value.resize()
  }
}

watch(currentMode, async () => {
  if (!mapInstance.value) return
  await planActualRoute()
})

onMounted(async () => {
  await initThemeMap()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (mapInstance.value) {
    mapInstance.value.destroy()
    mapInstance.value = null
  }
})

const tools = [
  {
    name: '拍照识别',
    desc: '识别花卉、植物、物体、文字',
    api: 'Vision API',
    badge: '◉',
    color: 'purple',
    sticker: '/image/qian/happy.png'
  },
  {
    name: '课程表 / 日程',
    desc: '查看课程表、管理提醒',
    api: 'Calendar API',
    badge: '◫',
    color: 'blue',
    sticker: '/image/qian/listen.png'
  },
  {
    name: '翻译助手',
    desc: '多语言互译，支持文本语音',
    api: 'Translate API',
    badge: 'A',
    color: 'pink',
    sticker: '/image/qian/curious.png'
  },
  {
    name: '文档总结',
    desc: '上传文档，提炼重点摘要',
    api: 'LLM API',
    badge: '▤',
    color: 'indigo',
    sticker: '/image/qian/cool.png'
  },
  {
    name: '语音对话',
    desc: '语音交流，实时识别与回复',
    api: 'Voice API',
    badge: '◌',
    color: 'violet',
    sticker: '/image/qian/wink.png'
  },
  {
    name: '更多工具',
    desc: '更多实用功能持续更新中',
    api: 'Explore >',
    badge: '⌘',
    color: 'gray',
    sticker: '/image/qian/surpise.png'
  }
]
</script>

<style scoped>
.qian-nav-page {
  position: relative;
  min-height: 100vh;
  color: #5f4d83;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow-x: hidden;
}

.page-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.8), transparent 25%),
    radial-gradient(circle at bottom right, rgba(240, 221, 255, 0.58), transparent 24%),
    rgba(253, 247, 249, 0.88);
  pointer-events: none;
}

.qian-header,
.nav-shell,
.tool-footer {
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
  background: rgba(255, 252, 254, 0.9);
  border-bottom: 1px solid rgba(198, 176, 226, 0.3);
  box-shadow: 0 8px 24px rgba(178, 155, 208, 0.12);
}

.header-left,
.header-right,
.qian-logo,
.user-pill,
.weather-main,
.weather-temp-wrap,
.summary-actions,
.search-box,
.search-main,
.quick-card,
.route-list-item,
.tool-card,
.tool-copy,
.schedule-item,
.schedule-copy,
.profile-name-row {
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
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.95);
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
  letter-spacing: 0.3px;
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
.switch-btn,
.mode-tab,
.swap-btn,
.fav-btn,
.primary-action,
.ghost-action {
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
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.95);
}

.nav-item:hover,
.header-icon:hover,
.mode-tab:hover,
.fav-btn:hover,
.ghost-action:hover {
  background: rgba(219, 198, 246, 0.38);
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
  background: rgba(255, 255, 255, 0.72);
  color: #7652cb;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.85);
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
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(212, 188, 239, 0.42);
  cursor: pointer;
}

.user-thumb {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  background: linear-gradient(180deg, #f8ecff, #efe3ff);
}

.user-meta {
  line-height: 1.15;
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

.user-arrow {
  color: #8566ca;
}

.nav-shell {
  padding: 14px 18px 10px;
  display: grid;
  grid-template-columns: 214px minmax(0, 1fr) 280px;
  gap: 16px;
}

.panel {
  background: rgba(255, 255, 255, 0.66);
  border: 1px solid rgba(210, 186, 235, 0.42);
  border-radius: 22px;
  box-shadow: 0 10px 28px rgba(194, 168, 222, 0.14);
  backdrop-filter: blur(18px);
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.portrait-panel {
  position: relative;
  padding: 14px;
}

.portrait-stickers {
  position: absolute;
  font-size: 26px;
  color: #9d79dc;
  opacity: 0.72;
}

.portrait-stickers.left {
  left: 14px;
  top: 78px;
}

.portrait-stickers.right {
  right: 12px;
  bottom: 138px;
}

.portrait-frame {
  position: relative;
  height: 308px;
  border-radius: 18px;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(253, 247, 255, 0.96), rgba(227, 204, 245, 0.76));
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
  border-radius: inherit;
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

.energy-panel,
.bouquet-panel {
  padding: 14px;
}

.panel-title {
  font-size: 15px;
  font-weight: 700;
  color: #56466f;
}

.energy-grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.energy-item {
  text-align: center;
  padding: 8px 0;
}

.energy-icon {
  width: 40px;
  height: 40px;
  margin: 0 auto 8px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 20px;
  background: rgba(255, 255, 255, 0.74);
}

.energy-icon.peach {
  color: #ef8c9f;
}

.energy-icon.sage {
  color: #7f9b59;
}

.energy-icon.mint {
  color: #73ab72;
}

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
  min-height: 135px;
}

.bouquet-main {
  margin-top: 14px;
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
  right: 10px;
  bottom: 4px;
  width: 92px;
  height: 92px;
  object-fit: contain;
}

.center-column {
  min-width: 0;
}

.route-panel {
  padding: 18px;
}

.route-title {
  font-size: 26px;
  font-weight: 800;
  color: #4c3968;
}

.route-subtitle {
  margin-top: 4px;
  font-size: 13px;
  color: #8f7ea7;
}

.search-row {
  margin-top: 16px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 46px minmax(0, 1fr) 92px;
  gap: 12px;
  align-items: center;
}

.search-box {
  min-width: 0;
  padding: 12px 14px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(215, 194, 239, 0.4);
  gap: 12px;
}

.search-tag {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #f2e8fd;
  color: #8d69dd;
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;
}

.search-tag.purple {
  background: #e8ddfd;
}

.search-main {
  min-width: 0;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
}

.search-input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  font-weight: 700;
  color: #56466f;
  padding: 0;
}

.search-desc {
  width: 100%;
  margin-top: 3px;
  font-size: 12px;
  color: #a08db7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-input::placeholder {
  color: #b79fcb;
  font-weight: 600;
}

.search-arrow-btn {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background: rgba(243, 233, 255, 0.9);
  color: #8d69dd;
  font-size: 15px;
  cursor: pointer;
}

.swap-btn,
.fav-btn {
  height: 42px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.74);
  color: #815dd0;
  font-weight: 700;
}

.mode-tabs {
  margin-top: 12px;
  display: flex;
  gap: 8px;
}

.mode-tab {
  min-width: 96px;
  height: 36px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.6);
  color: #7f6996;
  font-size: 14px;
  font-weight: 700;
}

.mode-tab.active {
  background: linear-gradient(180deg, #b28bf2, #8e63df);
  color: #ffffff;
  box-shadow: 0 8px 18px rgba(145, 102, 223, 0.24);
}

.map-card {
  position: relative;
  height: 388px;
  margin-top: 14px;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.08)), #edf1e6;
  border: 1px solid rgba(218, 202, 235, 0.4);
}

.amap-canvas,
.mini-map-grid {
  position: absolute;
  inset: 0;
}

.map-theme-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(255, 244, 252, 0.1), rgba(248, 240, 255, 0.22)),
    radial-gradient(circle at right bottom, rgba(222, 193, 255, 0.24), transparent 36%);
  pointer-events: none;
}

.map-theme-glow {
  position: absolute;
  inset: auto auto 0 -30px;
  width: 220px;
  height: 140px;
  background: radial-gradient(circle, rgba(231, 211, 255, 0.32), transparent 72%);
  pointer-events: none;
}

.map-caption {
  position: absolute;
  left: 14px;
  top: 14px;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  color: #7253cc;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 6px 14px rgba(152, 118, 208, 0.14);
}

.map-chip {
  position: absolute;
  right: 16px;
  top: 16px;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(154, 118, 235, 0.92);
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 8px 18px rgba(145, 102, 223, 0.22);
}

.map-chip.secondary {
  top: 54px;
  background: rgba(255, 255, 255, 0.88);
  color: #8a64dc;
}

.map-error-banner {
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 16px;
  padding: 10px 14px;
  border-radius: 16px;
  background: rgba(255, 245, 247, 0.92);
  color: #b44d77;
  font-size: 12px;
  line-height: 1.5;
  box-shadow: 0 10px 22px rgba(199, 138, 163, 0.14);
}

.mini-map-grid {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.36) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.36) 1px, transparent 1px);
  background-size: 48px 48px;
  opacity: 0.55;
}

.mini-map-route {
  position: absolute;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
}

.mini-map-pin {
  position: absolute;
  width: 22px;
  height: 22px;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  background: #9c72ea;
  box-shadow: 0 6px 12px rgba(156, 114, 234, 0.2);
}

.route-point::after,
.mini-map-pin::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 6px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ffffff;
}

.map-zoom {
  position: absolute;
  right: 12px;
  bottom: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.map-zoom button {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  border: none;
  background: rgba(255, 255, 255, 0.88);
  color: #7554d3;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(152, 121, 211, 0.16);
}

.map-zoom .refresh-zoom {
  font-size: 17px;
}

.route-bubble {
  position: absolute;
  right: 70px;
  bottom: 26px;
  width: 230px;
  min-height: 120px;
  padding: 14px 16px 14px 78px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 12px 28px rgba(174, 149, 206, 0.16);
}

.bubble-avatar {
  position: absolute;
  left: -18px;
  bottom: -4px;
  width: 104px;
  height: 104px;
  object-fit: contain;
}

.bubble-copy {
  color: #654f84;
  font-size: 18px;
  line-height: 1.5;
  font-weight: 700;
}

.map-card :deep(.amap-layer) {
  filter: saturate(0.78) hue-rotate(12deg) brightness(1.05);
}

.map-card :deep(.amap-logo),
.map-card :deep(.amap-copyright) {
  opacity: 0.38;
}

.map-card :deep(.amap-controls .amap-toolbar),
.map-card :deep(.amap-scalecontrol) {
  filter: saturate(0.7) hue-rotate(12deg);
}

.map-card :deep(.qian-amap-marker) {
  width: 24px;
  height: 24px;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  box-shadow: 0 8px 18px rgba(149, 104, 217, 0.22);
}

.map-card :deep(.qian-amap-marker span) {
  position: absolute;
  left: 6px;
  top: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ffffff;
}

.map-card :deep(.qian-amap-marker.start) {
  background: #8d64e1;
}

.map-card :deep(.qian-amap-marker.end) {
  background: #d97ab2;
}

.map-card :deep(.qian-amap-label) {
  padding: 6px 10px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.95);
  color: #695482;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 8px 18px rgba(161, 134, 199, 0.14);
  border: 1px solid rgba(226, 209, 245, 0.9);
}

.map-card :deep(.qian-amap-label.end) {
  color: #ffffff;
  background: linear-gradient(180deg, #b089f2, #8e63df);
  border-color: rgba(142, 99, 223, 0.95);
}

.route-summary {
  margin-top: 12px;
  padding: 14px 16px;
  border-radius: 18px;
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(217, 197, 239, 0.38);
}

.summary-title,
.quick-title,
.footer-title {
  font-size: 18px;
  font-weight: 800;
  color: #59456f;
}

.summary-path {
  margin-top: 6px;
  font-size: 16px;
  font-weight: 700;
  color: #574472;
}

.summary-note {
  margin-top: 4px;
  font-size: 12px;
  color: #9c8ab4;
}

.summary-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.stat-box {
  text-align: center;
}

.stat-number {
  font-size: 30px;
  line-height: 1;
  font-weight: 900;
  color: #56426f;
}

.stat-unit {
  margin-top: 2px;
  font-size: 12px;
  color: #8d7aa7;
}

.stat-label {
  margin-top: 4px;
  font-size: 11px;
  color: #b09ebf;
}

.summary-actions {
  gap: 10px;
  justify-content: flex-end;
}

.primary-action,
.ghost-action {
  height: 42px;
  padding: 0 18px;
  border-radius: 18px;
  font-size: 14px;
  font-weight: 700;
}

.primary-action {
  color: #ffffff;
  background: linear-gradient(180deg, #aa83f1, #8a61df);
  box-shadow: 0 10px 24px rgba(148, 101, 223, 0.24);
}

.primary-action:hover {
  transform: translateY(-1px);
}

.ghost-action {
  background: rgba(255, 255, 255, 0.82);
  color: #7b5ab8;
}

.quick-area {
  margin-top: 14px;
}

.quick-grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
}

.quick-card {
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 12px 14px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.74);
  border: 1px solid rgba(221, 205, 241, 0.36);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.quick-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(187, 160, 219, 0.16);
}

.quick-card-icon {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: linear-gradient(180deg, #f7efff, #ebe2fb);
  font-size: 22px;
}

.quick-card-name {
  margin-top: 10px;
  font-size: 15px;
  font-weight: 700;
  color: #56426f;
}

.quick-card-desc {
  margin-top: 4px;
  font-size: 11px;
  color: #9a89b2;
}

.right-column {
  gap: 12px;
}

.widget {
  padding: 14px;
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 700;
  color: #59456f;
}

.widget-meta,
.widget-link,
.widget-foot,
.schedule-meta-line {
  font-size: 11px;
  color: #9886ae;
}

.weather-panel {
  min-height: 188px;
}

.weather-main {
  justify-content: flex-start;
  gap: 14px;
  margin-top: 16px;
}

.weather-icon {
  width: 68px;
  height: 68px;
  border-radius: 20px;
  display: grid;
  place-items: center;
  background: linear-gradient(180deg, #eef5ff, #ffffff);
  font-size: 42px;
}

.weather-temp {
  font-size: 54px;
  line-height: 1;
  font-weight: 800;
  color: #45365e;
}

.weather-temp span {
  font-size: 22px;
}

.weather-desc {
  margin-top: 6px;
  font-size: 15px;
  font-weight: 700;
}

.weather-grid {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.weather-cell {
  text-align: center;
}

.weather-cell strong {
  display: block;
  font-size: 13px;
  color: #59456f;
}

.weather-cell span {
  font-size: 11px;
  color: #9b88b1;
}

.widget-foot {
  margin-top: 12px;
}

.mini-map {
  position: relative;
  margin-top: 12px;
  height: 92px;
  border-radius: 18px;
  overflow: hidden;
  background: #eef1e6;
}

.mini-map-route {
  left: 12%;
  top: 46%;
  width: 70%;
  height: 10px;
  transform: rotate(-10deg);
  background: #a178ee;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.8);
}

.mini-map-pin {
  right: 12%;
  top: 24%;
}

.mini-map-label {
  position: absolute;
  left: 10px;
  top: 10px;
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.88);
  color: #805ed3;
  font-size: 11px;
  font-weight: 700;
}

.location-copy {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 700;
  color: #5a4674;
}

.schedule-item {
  align-items: flex-start;
  gap: 12px;
  margin-top: 14px;
}

.schedule-time {
  width: 52px;
  text-align: center;
}

.schedule-time strong {
  display: block;
  font-size: 22px;
  line-height: 1.1;
  color: #7352d1;
}

.schedule-time span {
  font-size: 11px;
  color: #9888af;
}

.schedule-copy {
  flex: 1;
  align-items: flex-start;
  flex-direction: column;
}

.schedule-title {
  font-size: 14px;
  font-weight: 700;
  color: #59456f;
  line-height: 1.5;
}

.route-list-widget {
  position: relative;
  overflow: hidden;
}

.route-list {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.route-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #a47aef;
  margin-top: 7px;
  flex-shrink: 0;
}

.route-list-copy {
  flex: 1;
}

.route-list-title {
  font-size: 14px;
  font-weight: 700;
  color: #59456f;
}

.route-list-desc {
  margin-top: 2px;
  font-size: 12px;
  color: #9684ad;
}

.route-corner-sticker {
  position: absolute;
  right: -4px;
  bottom: -4px;
  width: 112px;
  height: 112px;
  object-fit: contain;
  opacity: 0.92;
}

.tool-footer {
  padding: 0 18px 18px;
}

.tool-grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 12px;
}

.tool-card {
  position: relative;
  min-height: 114px;
  padding: 14px 12px;
  gap: 12px;
  align-items: flex-start;
  overflow: hidden;
}

.tool-badge {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  color: #ffffff;
  font-weight: 800;
  flex-shrink: 0;
}

.tool-badge.purple {
  background: #9f78eb;
}

.tool-badge.blue {
  background: #5f9cff;
}

.tool-badge.pink {
  background: #ef89b0;
}

.tool-badge.indigo {
  background: #6d75e9;
}

.tool-badge.violet {
  background: #ab80f2;
}

.tool-badge.gray {
  background: #8e92a7;
}

.tool-copy {
  flex: 1;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
}

.tool-name {
  font-size: 14px;
  font-weight: 800;
  color: #56426f;
}

.tool-desc {
  margin-top: 4px;
  font-size: 11px;
  line-height: 1.45;
  color: #9886b0;
}

.tool-api {
  margin-top: 8px;
  font-size: 11px;
  color: #7b5ab8;
}

.tool-sticker {
  position: absolute;
  right: -10px;
  bottom: -6px;
  width: 84px;
  height: 84px;
  object-fit: contain;
}

@media (max-width: 1500px) {
  .nav-shell {
    grid-template-columns: 214px minmax(0, 1fr);
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

  .nav-shell {
    grid-template-columns: 1fr;
  }

  .left-column,
  .right-column {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .search-row,
  .route-summary,
  .quick-grid,
  .tool-grid {
    grid-template-columns: 1fr;
  }
}
</style>
