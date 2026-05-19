<template>
  <div class="qian-schedule-page" :style="{ backgroundImage: `url('/image/qian/qianbackground.png')` }">
    <PetalFall />
    <div class="page-overlay"></div>

    <header class="qian-header">
      <div class="header-left">
        <div class="brand-mark">
          <div class="brand-flower">✿</div>
        </div>
        <div class="qian-logo">
          <div class="logo-text-top">Qian's Garden</div>
          <div class="logo-text-bottom">AI助手</div>
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
        <button class="nav-item active">
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

    <main class="schedule-shell">
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
            <span>日程已经替你整理成更清晰的节奏表，今天就按这个步调推进吧。</span>
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
            <div class="bouquet-count">{{ bouquetCount }}</div>
            <div class="bouquet-unit">束</div>
          </div>
          <img src="/image/qian/wink.png" alt="flower sticker" class="bouquet-sticker" loading="lazy" decoding="async" />
        </section>
      </aside>

      <section class="center-column">
        <section class="panel schedule-board-panel">
          <div class="board-head">
            <div class="board-title-wrap">
              <div class="board-kicker">我的日程</div>
              <div class="board-title">{{ weekRangeLabel }}</div>
              <div class="board-subtitle">{{ selectedDateLabel }} · {{ selectedDateSummary }}</div>
            </div>
            <div class="board-actions">
              <button class="board-chip" type="button" @click="goToToday">今天</button>
              <button class="board-icon-btn" type="button" @click="moveWeek(-1)">‹</button>
              <button class="board-icon-btn" type="button" @click="moveWeek(1)">›</button>
            </div>
          </div>

          <div class="planner-tabs-wrap">
            <div class="planner-tabs">
              <div class="planner-label">时间</div>
              <button
                v-for="day in weekDays"
                :key="day.key"
                class="planner-day"
                :class="{ active: day.key === selectedDateKey, today: day.isToday }"
                type="button"
                @click="selectDate(day.key)"
              >
                <strong>{{ day.label }}</strong>
                <span>{{ day.shortDate }}</span>
              </button>
            </div>
          </div>

          <div class="planner-body">
            <div class="timeline-axis">
              <div v-for="time in timeSlots" :key="time" class="time-slot">{{ time }}</div>
            </div>

            <div class="planner-grid">
              <div class="grid-lines">
                <span v-for="line in horizontalLines" :key="`h-${line}`" class="h-line" :style="{ top: `${line}px` }"></span>
                <span v-for="line in verticalLines" :key="`v-${line}`" class="v-line" :style="{ left: `${line}px` }"></span>
              </div>

              <div
                v-for="item in plannerEvents"
                :key="item.id"
                class="planner-event"
                :class="[item.colorClass, { selected: item.date === selectedDateKey }]"
                :style="item.style"
                @click="selectDate(item.date)"
              >
                <span class="planner-event-time">{{ item.time }}</span>
                <strong>{{ item.title }}</strong>
                <em>{{ item.location }}</em>
                <button class="planner-mini-btn" type="button" @click.stop="handleEdit(item)">编辑</button>
              </div>

              <div class="planner-guide-line"></div>

              <div class="planner-character">
                <img src="/image/qian/happy.png" alt="schedule sticker" class="planner-character-img" loading="lazy" decoding="async" />
                <div class="planner-character-note">
                  日程我已经帮你整理好了，重要事项优先处理，别担心我会继续提醒你。
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="bottom-grid">
          <section class="panel agenda-panel">
            <div class="panel-head">
              <div>
                <div class="panel-head-title">{{ selectedDateLabel }}安排</div>
                <div class="panel-head-subtitle">点击右侧月历或上方周历可切换查看不同日期</div>
              </div>
              <button class="soft-btn" type="button" @click="prepareDraftForSelectedDate">为这一天新建</button>
            </div>

            <div v-if="selectedDateItems.length" class="agenda-list">
              <div v-for="item in selectedDateItems" :key="item.id" class="agenda-item">
                <div class="agenda-time">{{ item.time }}</div>
                <div class="agenda-main">
                  <div class="agenda-top">
                    <strong>{{ item.title }}</strong>
                    <span class="task-tag" :class="item.colorClass">{{ item.category }}</span>
                  </div>
                  <div class="agenda-meta">{{ item.location }}</div>
                  <div class="agenda-desc">{{ item.note }}</div>
                  <div class="agenda-actions">
                    <button class="agenda-btn" type="button" @click="handleEdit(item)">编辑</button>
                    <button class="agenda-btn success" type="button" @click="handleComplete(item.id)">完成</button>
                    <button class="agenda-btn danger" type="button" @click="handleRemove(item.id)">删除</button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="empty-state">
              当前日期还没有安排，右侧可以先选日期，再在下方新建一个日程。
            </div>
          </section>

          <section class="panel editor-panel">
            <div class="panel-head">
              <div>
                <div class="panel-head-title">{{ props.editingScheduleId ? '编辑日程' : '新增日程' }}</div>
                <div class="panel-head-subtitle">这里接入真实新增、编辑、完成逻辑，会直接更新当前日程数据。</div>
              </div>
              <span class="editor-badge">{{ props.editingScheduleId ? 'EDIT' : 'CREATE' }}</span>
            </div>

            <div class="quick-template-row">
              <button
                v-for="item in quickTemplates"
                :key="item.title"
                class="template-chip"
                type="button"
                @click="applyQuickTemplate(item)"
              >
                {{ item.title }}
              </button>
            </div>

            <form class="schedule-form" @submit.prevent="handleSubmit">
              <input
                class="schedule-input"
                type="text"
                placeholder="日程标题"
                :value="props.scheduleDraft.title"
                @input="updateDraftField('title', $event.target.value)"
              />
              <input
                class="schedule-input"
                type="date"
                :value="props.scheduleDraft.date"
                @input="updateDraftField('date', $event.target.value)"
              />
              <input
                class="schedule-input"
                type="time"
                :value="props.scheduleDraft.time"
                @input="updateDraftField('time', $event.target.value)"
              />
              <select
                class="schedule-input"
                :value="props.scheduleDraft.category"
                @change="updateDraftField('category', $event.target.value)"
              >
                <option v-for="item in props.scheduleCategories" :key="item" :value="item">{{ item }}</option>
              </select>
              <input
                class="schedule-input full"
                type="text"
                placeholder="地点"
                :value="props.scheduleDraft.location"
                @input="updateDraftField('location', $event.target.value)"
              />
              <textarea
                class="schedule-input schedule-textarea full"
                placeholder="备注"
                :value="props.scheduleDraft.note"
                @input="updateDraftField('note', $event.target.value)"
              ></textarea>

              <div class="form-footer full">
                <span class="form-tip">{{ props.scheduleFormMessage }}</span>
                <div class="form-actions">
                  <button
                    v-if="props.editingScheduleId"
                    class="soft-btn"
                    type="button"
                    @click="$emit('cancel-schedule-edit')"
                  >
                    取消
                  </button>
                  <button class="primary-btn" type="submit">
                    {{ props.editingScheduleId ? '保存修改' : '添加日程' }}
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </section>

      <aside class="right-column">
        <section class="panel weather-card">
          <div class="widget-head">
            <span>今天天气</span>
            <span class="widget-meta">{{ weatherCityText }}</span>
          </div>
          <div class="weather-top">
            <div class="weather-icon">{{ weatherIconText }}</div>
            <div class="weather-temp-wrap">
              <strong>{{ weatherTempText }}</strong>
              <span>{{ weatherSummaryText }}</span>
            </div>
          </div>
          <div class="weather-metrics">
            <div class="weather-metric">
              <span>{{ weatherRangeText }}</span>
              <em>温度</em>
            </div>
            <div class="weather-metric">
              <span>{{ weatherHumidityText }}</span>
              <em>湿度</em>
            </div>
            <div class="weather-metric">
              <span>{{ weatherWindText }}</span>
              <em>风速</em>
            </div>
          </div>
        </section>

        <section class="panel month-card">
          <div class="widget-head">
            <span>{{ monthLabel }}</span>
            <div class="month-toolbar">
              <div class="view-switch">
                <button class="view-switch-btn" :class="{ active: calendarViewMode === 'month' }" type="button" @click="calendarViewMode = 'month'">月</button>
                <button class="view-switch-btn" :class="{ active: calendarViewMode === 'week' }" type="button" @click="calendarViewMode = 'week'">周</button>
              </div>
              <div class="month-actions">
                <button class="month-nav-btn" type="button" @click="moveMonth(-1)">‹</button>
                <button class="month-nav-btn" type="button" @click="moveMonth(1)">›</button>
              </div>
            </div>
          </div>
          <div class="month-weekhead">
            <span v-for="item in weekHeadLabels" :key="item">{{ item }}</span>
          </div>
          <div v-if="calendarViewMode === 'month'" class="month-grid">
            <button
              v-for="day in monthGrid"
              :key="day.key"
              class="month-day"
              :class="{ muted: !day.inMonth, active: day.key === selectedDateKey, marked: day.hasEvent, today: day.isToday }"
              type="button"
              @click="selectMonthDate(day)"
            >
              {{ day.day }}
            </button>
          </div>
          <div v-else class="week-calendar-strip">
            <button
              v-for="day in weekDays"
              :key="`week-${day.key}`"
              class="week-calendar-day"
              :class="{ active: day.key === selectedDateKey, marked: day.hasEvent, today: day.isToday }"
              type="button"
              @click="selectDate(day.key)"
            >
              <span>{{ day.label }}</span>
              <strong>{{ day.shortDate }}</strong>
              <em>{{ day.countLabel }}</em>
            </button>
          </div>
          <div class="month-detail">
            <div class="month-detail-head">
              <div>
                <div class="month-detail-title">{{ selectedDateLabel }}</div>
                <div class="month-detail-subtitle">{{ selectedDateSummary }}</div>
              </div>
              <button class="soft-btn detail-open-btn" type="button" @click="openDetailDrawer">详情</button>
            </div>
            <div v-if="selectedDateItems.length" class="month-detail-list">
              <div v-for="item in selectedDateItems.slice(0, 2)" :key="`month-${item.id}`" class="month-detail-item">
                <strong>{{ item.time }} {{ item.title }}</strong>
                <span>{{ item.location }}</span>
              </div>
            </div>
            <div v-else class="month-empty">这一天还没有日程，点击下方“为这一天新建”可以快速添加。</div>
            <div class="month-detail-actions">
              <button class="text-link-btn" type="button" @click="startCreateForSelectedDate">为这一天新建</button>
              <button class="text-link-btn" type="button" @click="openDetailDrawer">打开当日详情</button>
            </div>
          </div>
        </section>

        <section class="panel reminder-card">
          <div class="widget-head">
            <span>即将到来的提醒</span>
            <button class="text-link-btn" type="button" @click="showAllReminders = !showAllReminders">
              {{ showAllReminders ? '收起' : '查看全部' }}
            </button>
          </div>
          <div class="reminder-list">
            <div v-for="item in visibleReminderItems" :key="item.id" class="reminder-item">
              <div class="reminder-time">{{ item.dateLabel }} {{ item.time }}</div>
              <div class="reminder-title">{{ item.title }}</div>
              <div class="reminder-meta">{{ item.location }}</div>
              <div class="reminder-actions">
                <button class="mini-action-btn" type="button" @click="handleEdit(item)">编辑</button>
                <button class="mini-action-btn success" type="button" @click="handleComplete(item.id)">完成</button>
              </div>
            </div>
          </div>
        </section>

        <section class="panel checklist-card">
          <div class="widget-head">
            <span>今日执行清单</span>
            <span class="widget-meta">{{ checklistDoneCount }}/{{ checklistItems.length }} 已完成</span>
          </div>
          <div class="checklist-list">
            <label v-for="item in checklistItems" :key="item.id" class="checklist-item">
              <span class="check-icon" :class="{ checked: item.done }"></span>
              <span class="check-copy">
                <strong>{{ item.title }}</strong>
                <em>{{ item.desc }}</em>
              </span>
            </label>
          </div>
        </section>

        <section class="panel status-card">
          <div class="widget-head">
            <span>日程同步状态</span>
            <span class="panel-link">管理设置</span>
          </div>
          <div class="status-list">
            <div v-for="item in statusItems" :key="item.title" class="status-item">
              <div>
                <strong>{{ item.title }}</strong>
                <span>{{ item.desc }}</span>
              </div>
              <em>{{ item.state }}</em>
            </div>
          </div>
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

    <transition name="detail-fade">
      <div v-if="detailDrawerOpen" class="detail-overlay" @click.self="closeDetailDrawer">
        <section class="detail-sheet panel">
          <div class="detail-sheet-head">
            <div>
              <div class="detail-sheet-title">{{ selectedDateLabel }}详情</div>
              <div class="detail-sheet-subtitle">{{ selectedDateSummary }}</div>
            </div>
            <button class="detail-close" type="button" @click="closeDetailDrawer">关闭</button>
          </div>
          <div class="detail-sheet-actions">
            <button class="soft-btn" type="button" @click="goToToday">回到今天</button>
            <button class="primary-btn" type="button" @click="startCreateForSelectedDate">新增日程</button>
          </div>
          <div v-if="selectedDateItems.length" class="detail-timeline">
            <div v-for="item in selectedDateItems" :key="`drawer-${item.id}`" class="detail-item">
              <div class="detail-item-time">{{ item.time }}</div>
              <div class="detail-item-main">
                <div class="detail-item-top">
                  <strong>{{ item.title }}</strong>
                  <span class="task-tag" :class="item.colorClass">{{ item.category }}</span>
                </div>
                <div class="detail-item-meta">{{ item.location }}</div>
                <div class="detail-item-desc">{{ item.note }}</div>
                <div class="detail-item-actions">
                  <button class="agenda-btn" type="button" @click="handleEdit(item)">编辑</button>
                  <button class="agenda-btn success" type="button" @click="handleComplete(item.id)">完成</button>
                  <button class="agenda-btn danger" type="button" @click="handleRemove(item.id)">删除</button>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="empty-state detail-empty">
            当前日期暂无日程，你可以直接在这里新建，也可以切回月历继续选择其他日期。
          </div>
        </section>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import PetalFall from './PetalFall.vue'

const props = defineProps({
  currentPage: {
    type: String,
    default: 'schedule'
  },
  scheduleItems: {
    type: Array,
    default: () => []
  },
  scheduleCategories: {
    type: Array,
    default: () => ['会议', '出行', '学习', '提醒']
  },
  scheduleDraft: {
    type: Object,
    default: () => ({
      title: '',
      date: '',
      time: '',
      category: '会议',
      location: '',
      note: ''
    })
  },
  scheduleFormMessage: {
    type: String,
    default: ''
  },
  editingScheduleId: {
    type: String,
    default: ''
  },
  weatherToday: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits([
  'switch-character',
  'page-change',
  'update-schedule-draft',
  'submit-schedule',
  'cancel-schedule-edit',
  'start-create-schedule',
  'start-edit-schedule',
  'complete-schedule-item',
  'remove-schedule-item'
])

const weekHeadLabels = ['一', '二', '三', '四', '五', '六', '日']
const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']
const GRID_WIDTH = 860
const TIME_AXIS_WIDTH = 72
const HEADER_HEIGHT = 48
const SLOT_HEIGHT = 36

const showAllReminders = ref(false)
const detailDrawerOpen = ref(false)
const calendarViewMode = ref('month')
const weekAnchor = ref(new Date())
const monthCursor = ref(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
const selectedDateKey = ref('')

const pad2 = (value) => String(value).padStart(2, '0')
const dateKey = (date) => `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`
const parseDateKey = (value) => new Date(`${value}T00:00:00`)
const cloneDate = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())
const isValidDate = (date) => Number.isFinite(date?.getTime?.())

const getWeekStart = (date) => {
  const copy = cloneDate(date)
  const day = copy.getDay() || 7
  copy.setDate(copy.getDate() - day + 1)
  return copy
}

const formatMonthDay = (date) => `${date.getMonth() + 1}/${date.getDate()}`
const formatFullDate = (value) => {
  const date = parseDateKey(value)
  if (!isValidDate(date)) return value
  return `${date.getMonth() + 1}月${date.getDate()}日`
}
const formatMonthLabel = (date) => `${date.getFullYear()} 年 ${date.getMonth() + 1} 月`
const formatWeekday = (date) => new Intl.DateTimeFormat('zh-CN', { weekday: 'short' }).format(date)

const normalizedScheduleItems = computed(() => {
  const base = Array.isArray(props.scheduleItems) ? props.scheduleItems : []
  return [...base]
    .map((item, index) => ({
      id: item.id || `qian-schedule-${index}`,
      title: item.title || '未命名日程',
      date: item.date || dateKey(new Date()),
      time: item.time || '09:00',
      category: item.category || '提醒',
      location: item.location || '未设置地点',
      note: item.note || '保持好节奏，按时完成即可。'
    }))
    .sort((a, b) => new Date(`${a.date}T${a.time}:00`).getTime() - new Date(`${b.date}T${b.time}:00`).getTime())
})

const todayKey = computed(() => dateKey(new Date()))

if (!selectedDateKey.value) {
  selectedDateKey.value = todayKey.value
}

watch(todayKey, (value) => {
  if (!selectedDateKey.value) {
    selectedDateKey.value = value
  }
})

watch(selectedDateKey, (value) => {
  const parsed = parseDateKey(value)
  if (!isValidDate(parsed)) return
  weekAnchor.value = parsed
  monthCursor.value = new Date(parsed.getFullYear(), parsed.getMonth(), 1)
})

watch(() => props.scheduleDraft.date, (value) => {
  if (!value) return
  const parsed = parseDateKey(value)
  if (!isValidDate(parsed)) return
  selectedDateKey.value = value
})

const displayedWeekStart = computed(() => getWeekStart(weekAnchor.value))

const weekDays = computed(() => {
  return Array.from({ length: 7 }, (_, index) => {
    const date = cloneDate(displayedWeekStart.value)
    date.setDate(displayedWeekStart.value.getDate() + index)
    return {
      key: dateKey(date),
      label: formatWeekday(date),
      shortDate: formatMonthDay(date),
      isToday: dateKey(date) === todayKey.value,
      hasEvent: normalizedScheduleItems.value.some((item) => item.date === dateKey(date)),
      countLabel: `${normalizedScheduleItems.value.filter((item) => item.date === dateKey(date)).length || 0} 项`
    }
  })
})

const weekRangeLabel = computed(() => {
  const start = cloneDate(displayedWeekStart.value)
  const end = cloneDate(displayedWeekStart.value)
  end.setDate(start.getDate() + 6)
  return `${formatMonthLabel(start)} ${formatMonthDay(start)} - ${formatMonthDay(end)}`
})

const selectedDateLabel = computed(() => {
  if (selectedDateKey.value === todayKey.value) return '今天'
  return formatFullDate(selectedDateKey.value)
})

const selectedDateItems = computed(() =>
  normalizedScheduleItems.value
    .filter((item) => item.date === selectedDateKey.value)
    .map((item) => ({
      ...item,
      colorClass: getCategoryColor(item.category)
    }))
)

const selectedDateSummary = computed(() => {
  if (selectedDateItems.value.length) {
    return `共 ${selectedDateItems.value.length} 项安排，最近一项 ${selectedDateItems.value[0].time}`
  }
  return '当前日期暂无安排'
})

const horizontalLines = computed(() => Array.from({ length: timeSlots.length }, (_, index) => HEADER_HEIGHT + SLOT_HEIGHT * index))
const verticalLines = computed(() => {
  const columnWidth = (GRID_WIDTH - TIME_AXIS_WIDTH) / 7
  return Array.from({ length: 6 }, (_, index) => TIME_AXIS_WIDTH + columnWidth * (index + 1))
})

const getCategoryColor = (category) => {
  if (category === '会议') return 'lavender'
  if (category === '学习') return 'rose'
  if (category === '出行') return 'amber'
  return 'violet'
}

const timeToOffset = (timeText) => {
  const [hours, minutes] = String(timeText || '08:00').split(':').map(Number)
  const hour = Number.isFinite(hours) ? hours : 8
  const minute = Number.isFinite(minutes) ? minutes : 0
  return Math.max(0, (hour - 8) * SLOT_HEIGHT + (minute / 60) * SLOT_HEIGHT)
}

const plannerEvents = computed(() => {
  const items = normalizedScheduleItems.value
    .filter((item) => weekDays.value.some((day) => day.key === item.date))
    .slice(0, 12)

  const columnWidth = (GRID_WIDTH - TIME_AXIS_WIDTH) / 7
  const dayGroups = new Map()

  items.forEach((item) => {
    const bucketKey = `${item.date}-${item.time}`
    const list = dayGroups.get(bucketKey) || []
    list.push(item)
    dayGroups.set(bucketKey, list)
  })

  return items.map((item) => {
    const dayIndex = weekDays.value.findIndex((day) => day.key === item.date)
    const bucketKey = `${item.date}-${item.time}`
    const group = dayGroups.get(bucketKey) || [item]
    const groupIndex = group.findIndex((current) => current.id === item.id)
    const laneCount = Math.min(group.length, 2)
    const laneWidth = laneCount > 1 ? columnWidth * 0.42 : columnWidth * 0.78
    const leftBase = TIME_AXIS_WIDTH + dayIndex * columnWidth + 10
    const laneGap = columnWidth * 0.06
    const left = leftBase + (laneCount > 1 ? groupIndex * (laneWidth + laneGap) : 0)
    const top = HEADER_HEIGHT + timeToOffset(item.time) + 4

    return {
      ...item,
      colorClass: getCategoryColor(item.category),
      style: {
        left: `${left}px`,
        top: `${top}px`,
        width: `${laneWidth}px`,
        height: `${item.date === selectedDateKey.value ? 72 : 66}px`
      }
    }
  })
})

const upcomingItems = computed(() =>
  normalizedScheduleItems.value.map((item) => ({
    ...item,
    timestamp: new Date(`${item.date}T${item.time}:00`).getTime()
  }))
)

const visibleReminderItems = computed(() => {
  const base = upcomingItems.value.map((item) => ({
    ...item,
    dateLabel: item.date === todayKey.value ? '今天' : formatFullDate(item.date)
  }))
  return showAllReminders.value ? base.slice(0, 8) : base.slice(0, 3)
})

const checklistItems = computed(() => {
  const base = normalizedScheduleItems.value.filter((item) => item.date === todayKey.value).slice(0, 3)
  return base.map((item, index) => ({
    id: item.id,
    title: item.title,
    desc: `${item.time} · ${item.location}`,
    done: index === base.length - 1 && base.length > 1
  }))
})

const checklistDoneCount = computed(() => checklistItems.value.filter((item) => item.done).length)
const bouquetCount = computed(() => Math.max(normalizedScheduleItems.value.length + 6, 12))

const monthLabel = computed(() => formatMonthLabel(monthCursor.value))

const monthGrid = computed(() => {
  const firstDay = new Date(monthCursor.value.getFullYear(), monthCursor.value.getMonth(), 1)
  const startOffset = (firstDay.getDay() + 6) % 7
  const gridStart = new Date(firstDay)
  gridStart.setDate(firstDay.getDate() - startOffset)

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart)
    date.setDate(gridStart.getDate() + index)
    const key = dateKey(date)
    return {
      key,
      day: date.getDate(),
      inMonth: date.getMonth() === monthCursor.value.getMonth(),
      isToday: key === todayKey.value,
      hasEvent: normalizedScheduleItems.value.some((item) => item.date === key)
    }
  })
})

const statusItems = computed(() => {
  const total = normalizedScheduleItems.value.length
  const todayCount = normalizedScheduleItems.value.filter((item) => item.date === todayKey.value).length
  return [
    { title: 'Google 日历', desc: `已关联 ${total} 项待办`, state: '已同步' },
    { title: '手机日历', desc: `今日安排 ${todayCount} 项`, state: '已同步' },
    { title: '本地提醒', desc: props.editingScheduleId ? '编辑模式已开启' : '自动提醒中', state: '已同步' }
  ]
})

const quickTemplates = [
  { title: '课程', category: '学习', time: '10:00', location: '艺术楼教室', note: '提前准备课程材料。' },
  { title: '会议', category: '会议', time: '15:00', location: '例会室', note: '提前 10 分钟到场。' },
  { title: '出行', category: '出行', time: '17:30', location: '校园门口', note: '出门前检查路线与天气。' },
  { title: '提醒', category: '提醒', time: '20:00', location: '线上 / 宿舍', note: '完成后记得记录总结。' }
]

const updateDraftField = (field, value) => {
  emit('update-schedule-draft', { field, value })
}

const applyQuickTemplate = (template) => {
  updateDraftField('title', template.title)
  updateDraftField('date', selectedDateKey.value || todayKey.value)
  updateDraftField('time', template.time)
  updateDraftField('category', template.category)
  updateDraftField('location', template.location)
  updateDraftField('note', template.note)
}

const prepareDraftForSelectedDate = () => {
  emit('start-create-schedule', {
    date: selectedDateKey.value || todayKey.value,
    time: props.scheduleDraft.time || '15:00'
  })
}

const handleSubmit = () => {
  emit('submit-schedule')
}

const handleEdit = (item) => {
  emit('start-edit-schedule', item)
  selectDate(item.date)
  detailDrawerOpen.value = false
}

const handleComplete = (id) => {
  emit('complete-schedule-item', id)
}

const handleRemove = (id) => {
  emit('remove-schedule-item', id)
}

const startCreateForSelectedDate = () => {
  prepareDraftForSelectedDate()
  detailDrawerOpen.value = false
}

const selectDate = (key) => {
  selectedDateKey.value = key
}

const selectMonthDate = (day) => {
  selectDate(day.key)
  if (calendarViewMode.value === 'month') {
    detailDrawerOpen.value = true
  }
}

const moveWeek = (offset) => {
  const next = cloneDate(displayedWeekStart.value)
  next.setDate(displayedWeekStart.value.getDate() + offset * 7)
  weekAnchor.value = next
  monthCursor.value = new Date(next.getFullYear(), next.getMonth(), 1)
}

const goToToday = () => {
  const today = new Date()
  weekAnchor.value = today
  monthCursor.value = new Date(today.getFullYear(), today.getMonth(), 1)
  selectedDateKey.value = todayKey.value
}

const moveMonth = (offset) => {
  monthCursor.value = new Date(monthCursor.value.getFullYear(), monthCursor.value.getMonth() + offset, 1)
}

const openDetailDrawer = () => {
  detailDrawerOpen.value = true
}

const closeDetailDrawer = () => {
  detailDrawerOpen.value = false
}

const weatherIconText = computed(() => props.weatherToday?.icon || '🌤')
const weatherCityText = computed(() => props.weatherToday?.city || '杭州 · 西湖区')
const weatherTempText = computed(() => `${props.weatherToday?.temp || '24'}°C`)
const weatherSummaryText = computed(() => props.weatherToday?.summary || '多云转晴')
const weatherRangeText = computed(() => `${props.weatherToday?.low || '22℃'} / ${props.weatherToday?.high || '28℃'}`)
const weatherHumidityText = computed(() => props.weatherToday?.humidity || '63%')
const weatherWindText = computed(() => props.weatherToday?.wind || '东南风 2级')

const tools = [
  { name: '拍照识别', desc: '识别花卉、植物、物体、文字', api: 'Vision API', badge: '◉', color: 'purple', sticker: '/image/qian/happy.png' },
  { name: '课程表 / 日程', desc: '查看课程表、管理提醒', api: 'Calendar API', badge: '◫', color: 'blue', sticker: '/image/qian/listen.png' },
  { name: '翻译助手', desc: '多语言互译，支持文本语音', api: 'Translate API', badge: 'A', color: 'pink', sticker: '/image/qian/curious.png' },
  { name: '文档总结', desc: '上传文档，提炼重点摘要', api: 'LLM API', badge: '▤', color: 'indigo', sticker: '/image/qian/cool.png' },
  { name: '语音对话', desc: '语音交流，实时识别与回复', api: 'Voice API', badge: '◌', color: 'violet', sticker: '/image/qian/wink.png' },
  { name: '更多工具', desc: '更多实用功能持续更新中', api: 'Explore >', badge: '⌘', color: 'gray', sticker: '/image/qian/surpise.png' }
]
</script>

<style scoped>
.qian-schedule-page {
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
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.82), transparent 25%),
    radial-gradient(circle at bottom right, rgba(240, 221, 255, 0.58), transparent 24%),
    rgba(253, 247, 249, 0.88);
  pointer-events: none;
}

.qian-header,
.schedule-shell,
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
.profile-name-row,
.widget-head,
.weather-top,
.weather-temp-wrap,
.tool-card,
.tool-copy,
.board-head,
.board-actions,
.agenda-top,
.agenda-actions,
.form-actions {
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
.board-chip,
.board-icon-btn,
.planner-day,
.month-day,
.month-nav-btn,
.soft-btn,
.primary-btn,
.agenda-btn,
.mini-action-btn,
.template-chip,
.planner-mini-btn,
.text-link-btn {
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
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
.board-chip:hover,
.board-icon-btn:hover,
.planner-day:hover,
.month-nav-btn:hover,
.soft-btn:hover,
.template-chip:hover,
.text-link-btn:hover {
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

.schedule-shell {
  padding: 14px 18px 10px;
  display: grid;
  grid-template-columns: 214px minmax(0, 1fr) 298px;
  gap: 16px;
  align-items: start;
}

.panel {
  background: rgba(255, 255, 255, 0.66);
  border: 1px solid rgba(210, 186, 235, 0.42);
  border-radius: 22px;
  box-shadow: 0 10px 28px rgba(194, 168, 222, 0.14);
  backdrop-filter: blur(18px);
}

.left-column,
.right-column,
.center-column {
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
.bouquet-panel,
.weather-card,
.month-card,
.reminder-card,
.checklist-card,
.status-card,
.agenda-panel,
.editor-panel,
.schedule-board-panel {
  padding: 14px;
}

.panel-title,
.widget-head,
.board-kicker,
.panel-head-title,
.footer-title {
  color: #59456f;
}

.panel-title {
  font-size: 15px;
  font-weight: 700;
}

.energy-grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.energy-item {
  text-align: center;
}

.energy-icon {
  width: 40px;
  height: 40px;
  margin: 0 auto 8px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.74);
  font-size: 20px;
}

.energy-icon.peach {
  color: #ef8c9f;
}

.energy-icon.sage {
  color: #8c78d8;
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

.board-head {
  justify-content: space-between;
  gap: 16px;
}

.board-title {
  margin-top: 4px;
  font-size: 20px;
  font-weight: 900;
  color: #45345e;
}

.board-kicker {
  font-size: 14px;
  font-weight: 700;
}

.board-subtitle,
.panel-head-subtitle,
.widget-meta,
.panel-link,
.agenda-meta,
.agenda-desc,
.month-weekhead span,
.month-empty,
.month-detail-item span,
.reminder-time,
.reminder-meta,
.check-copy em,
.status-item span,
.weather-metric em {
  color: #9886ae;
}

.board-subtitle {
  margin-top: 6px;
  font-size: 12px;
}

.board-actions {
  gap: 8px;
  align-self: flex-start;
}

.board-chip,
.board-icon-btn,
.soft-btn,
.primary-btn,
.template-chip {
  height: 34px;
  border-radius: 17px;
  font-size: 12px;
  font-weight: 700;
}

.board-chip,
.board-icon-btn,
.soft-btn,
.template-chip {
  background: rgba(255, 255, 255, 0.82);
  color: #7a5cc6;
}

.board-chip,
.soft-btn,
.primary-btn,
.template-chip {
  padding: 0 14px;
}

.board-icon-btn {
  width: 34px;
}

.primary-btn {
  background: linear-gradient(180deg, #b18af1, #8f63df);
  color: #ffffff;
  box-shadow: 0 10px 18px rgba(143, 99, 223, 0.24);
}

.primary-btn:hover,
.agenda-btn.success:hover,
.mini-action-btn.success:hover {
  transform: translateY(-1px);
}

.planner-tabs-wrap {
  margin-top: 14px;
  overflow-x: auto;
}

.planner-tabs {
  min-width: 940px;
  display: grid;
  grid-template-columns: 72px repeat(7, minmax(0, 1fr));
  gap: 8px;
}

.planner-label,
.planner-day {
  height: 48px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  text-align: center;
}

.planner-label {
  background: rgba(255, 255, 255, 0.76);
  font-size: 12px;
  font-weight: 700;
  color: #9684ad;
}

.planner-day {
  background: rgba(255, 255, 255, 0.76);
}

.planner-day strong {
  display: block;
  font-size: 13px;
  color: #574472;
}

.planner-day span {
  display: block;
  margin-top: 2px;
  font-size: 11px;
  color: #9886ae;
}

.planner-day.today {
  box-shadow: inset 0 0 0 1px rgba(166, 138, 223, 0.42);
}

.planner-day.active {
  background: linear-gradient(180deg, #b28bf2, #8e63df);
}

.planner-day.active strong,
.planner-day.active span {
  color: #ffffff;
}

.planner-body {
  margin-top: 12px;
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 8px;
  overflow-x: auto;
}

.timeline-axis {
  padding-top: 48px;
  display: grid;
  grid-template-rows: repeat(14, 36px);
  flex-shrink: 0;
}

.time-slot {
  font-size: 12px;
  color: #9684ad;
  display: flex;
  align-items: center;
  justify-content: center;
}

.planner-grid {
  position: relative;
  width: 860px;
  flex-shrink: 0;
  height: 560px;
  border-radius: 24px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.84), rgba(252, 247, 255, 0.88)),
    rgba(255, 255, 255, 0.4);
  overflow: hidden;
}

.grid-lines {
  position: absolute;
  inset: 0;
}

.h-line,
.v-line {
  position: absolute;
  background: rgba(211, 194, 234, 0.6);
}

.h-line {
  left: 0;
  right: 0;
  height: 1px;
}

.v-line {
  top: 0;
  bottom: 0;
  width: 1px;
}

.planner-guide-line {
  position: absolute;
  left: 72px;
  right: 0;
  top: 228px;
  height: 2px;
  background: rgba(152, 120, 208, 0.36);
}

.planner-event {
  position: absolute;
  padding: 10px 12px;
  border-radius: 16px;
  box-sizing: border-box;
  box-shadow: 0 10px 20px rgba(187, 160, 219, 0.14);
  z-index: 2;
}

.planner-event.selected {
  box-shadow: 0 14px 24px rgba(168, 135, 223, 0.24);
}

.planner-event.lavender {
  background: rgba(236, 229, 255, 0.96);
  border: 1px solid rgba(168, 145, 228, 0.48);
}

.planner-event.rose {
  background: rgba(255, 236, 241, 0.96);
  border: 1px solid rgba(226, 156, 177, 0.46);
}

.planner-event.amber {
  background: rgba(255, 241, 221, 0.96);
  border: 1px solid rgba(222, 182, 120, 0.46);
}

.planner-event.violet {
  background: rgba(244, 236, 255, 0.96);
  border: 1px solid rgba(184, 153, 227, 0.46);
}

.planner-event-time {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  color: #8e71c7;
}

.planner-event strong,
.agenda-top strong,
.month-detail-item strong,
.reminder-title,
.status-item strong,
.check-copy strong {
  display: block;
  color: #5a4674;
}

.planner-event strong {
  margin-top: 4px;
  font-size: 13px;
}

.planner-event em {
  display: block;
  margin-top: 3px;
  font-size: 11px;
  color: #8c7ba6;
  font-style: normal;
}

.planner-mini-btn {
  position: absolute;
  right: 8px;
  top: 8px;
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.82);
  color: #795ed0;
  font-size: 10px;
  font-weight: 700;
}

.planner-character {
  position: absolute;
  left: 158px;
  bottom: 0;
  width: 366px;
  min-height: 182px;
  z-index: 1;
}

.planner-character-img {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 176px;
  height: 176px;
  object-fit: contain;
  z-index: 2;
  filter: drop-shadow(0 16px 26px rgba(168, 140, 206, 0.22));
}

.planner-character-note {
  position: absolute;
  right: 10px;
  top: 0;
  width: 184px;
  min-height: 92px;
  padding: 14px 16px;
  border-radius: 22px 22px 22px 10px;
  background: rgba(255, 255, 255, 0.95);
  color: #6a557f;
  font-size: 13px;
  line-height: 1.7;
  z-index: 3;
  box-sizing: border-box;
  box-shadow: 0 14px 26px rgba(183, 157, 214, 0.16);
}

.planner-character-note::after {
  content: '';
  position: absolute;
  left: -8px;
  bottom: 18px;
  width: 16px;
  height: 16px;
  background: rgba(255, 255, 255, 0.95);
  transform: rotate(45deg);
  border-radius: 0 0 6px 0;
}

.bottom-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.95fr);
  gap: 14px;
}

.panel-head,
.widget-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.panel-head-title,
.widget-head {
  font-size: 15px;
  font-weight: 800;
}

.panel-head-subtitle {
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.5;
}

.editor-badge {
  flex-shrink: 0;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(238, 228, 252, 0.9);
  color: #7f62cd;
  font-size: 11px;
  font-weight: 800;
}

.agenda-list,
.reminder-list,
.status-list,
.month-detail-list {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.agenda-item,
.reminder-item,
.status-item,
.month-detail-item {
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.74);
  border: 1px solid rgba(221, 205, 241, 0.36);
}

.agenda-item {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 12px;
  padding: 12px;
}

.agenda-time {
  font-size: 20px;
  font-weight: 800;
  color: #7352d1;
  text-align: center;
}

.agenda-top {
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}

.task-tag {
  flex-shrink: 0;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  color: #ffffff;
}

.task-tag.lavender,
.task-tag.violet {
  background: #a37ceb;
}

.task-tag.rose {
  background: #df88a2;
}

.task-tag.amber {
  background: #dc9d52;
}

.agenda-meta,
.agenda-desc {
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.55;
}

.agenda-actions {
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.agenda-btn,
.mini-action-btn {
  height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: #ffffff;
  background: rgba(163, 124, 235, 0.92);
}

.agenda-btn.success,
.mini-action-btn.success {
  background: rgba(98, 179, 113, 0.95);
}

.agenda-btn.danger {
  background: rgba(221, 113, 132, 0.95);
}

.quick-template-row {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.schedule-form {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.schedule-input {
  width: 100%;
  min-width: 0;
  padding: 12px 14px;
  border-radius: 16px;
  border: 1px solid rgba(221, 205, 241, 0.5);
  background: rgba(255, 255, 255, 0.8);
  color: #5d4a78;
  box-sizing: border-box;
  font-size: 13px;
  outline: none;
}

.schedule-input:focus {
  border-color: rgba(160, 126, 231, 0.8);
  box-shadow: 0 0 0 3px rgba(176, 142, 241, 0.12);
}

.schedule-input.full,
.form-footer.full {
  grid-column: 1 / -1;
}

.schedule-textarea {
  min-height: 90px;
  resize: vertical;
  font-family: inherit;
}

.form-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.form-tip {
  font-size: 12px;
  line-height: 1.5;
  color: #8d7aa7;
}

.weather-top {
  gap: 14px;
  margin-top: 14px;
}

.weather-icon {
  width: 58px;
  height: 58px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  background: linear-gradient(180deg, #eef5ff, #ffffff);
  font-size: 34px;
}

.weather-temp-wrap {
  flex-direction: column;
  align-items: flex-start;
}

.weather-temp-wrap strong {
  font-size: 38px;
  line-height: 1;
  font-weight: 900;
  color: #45365e;
}

.weather-temp-wrap span {
  margin-top: 4px;
  font-size: 14px;
  font-weight: 700;
  color: #816ba2;
}

.weather-metrics {
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.weather-metric {
  padding: 10px 8px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.74);
  text-align: center;
}

.weather-metric span {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #59456f;
}

.weather-metric em {
  display: block;
  margin-top: 4px;
  font-size: 11px;
  font-style: normal;
}

.month-actions {
  display: flex;
  gap: 8px;
}

.month-toolbar,
.view-switch,
.month-detail-head,
.month-detail-actions,
.detail-sheet-head,
.detail-sheet-actions,
.detail-item-top,
.detail-item-actions {
  display: flex;
  align-items: center;
}

.month-toolbar {
  gap: 10px;
}

.view-switch {
  padding: 3px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.76);
}

.view-switch-btn {
  min-width: 34px;
  height: 28px;
  border-radius: 999px;
  background: transparent;
  color: #8c79a6;
  font-size: 12px;
  font-weight: 700;
}

.view-switch-btn.active {
  background: linear-gradient(180deg, #b28bf2, #8e63df);
  color: #ffffff;
}

.month-nav-btn {
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.78);
  color: #7b5ab8;
  font-size: 14px;
}

.month-weekhead {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  text-align: center;
  font-size: 11px;
}

.month-grid {
  margin-top: 8px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}

.week-calendar-strip {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 8px;
}

.week-calendar-day {
  padding: 10px 8px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.72);
  color: #87749d;
  text-align: center;
}

.week-calendar-day span,
.week-calendar-day strong,
.week-calendar-day em {
  display: block;
}

.week-calendar-day span {
  font-size: 11px;
}

.week-calendar-day strong {
  margin-top: 4px;
  font-size: 14px;
  color: #59456f;
}

.week-calendar-day em {
  margin-top: 4px;
  font-style: normal;
  font-size: 10px;
  color: #9f8eb1;
}

.week-calendar-day.marked {
  box-shadow: inset 0 0 0 1px rgba(166, 138, 223, 0.34);
}

.week-calendar-day.today {
  font-weight: 800;
}

.week-calendar-day.active {
  background: linear-gradient(180deg, #b28bf2, #8e63df);
}

.week-calendar-day.active span,
.week-calendar-day.active strong,
.week-calendar-day.active em {
  color: #ffffff;
}

.month-day {
  height: 32px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.72);
  color: #87749d;
  font-size: 12px;
}

.month-day.muted {
  opacity: 0.4;
}

.month-day.marked {
  box-shadow: inset 0 0 0 1px rgba(166, 138, 223, 0.34);
}

.month-day.today {
  font-weight: 800;
}

.month-day.active {
  background: linear-gradient(180deg, #b28bf2, #8e63df);
  color: #ffffff;
}

.month-detail {
  margin-top: 12px;
  padding: 12px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.7);
}

.month-detail-head {
  justify-content: space-between;
  gap: 10px;
}

.month-detail-title {
  font-size: 14px;
  font-weight: 800;
  color: #59456f;
}

.month-detail-subtitle {
  margin-top: 4px;
  font-size: 11px;
  color: #9886ae;
}

.detail-open-btn {
  flex-shrink: 0;
}

.month-detail-item,
.reminder-item,
.status-item {
  padding: 12px;
}

.month-empty {
  margin-top: 10px;
  font-size: 12px;
  line-height: 1.6;
}

.month-detail-actions {
  justify-content: space-between;
  gap: 10px;
  margin-top: 10px;
}

.text-link-btn {
  background: transparent;
  color: #7b5ab8;
  font-size: 12px;
  font-weight: 700;
}

.reminder-title {
  margin-top: 4px;
  font-size: 14px;
}

.reminder-time,
.reminder-meta,
.check-copy em,
.status-item span {
  font-size: 11px;
}

.reminder-meta {
  margin-top: 4px;
}

.reminder-actions {
  margin-top: 10px;
  display: flex;
  gap: 8px;
}

.checklist-list {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.checklist-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.74);
  border: 1px solid rgba(221, 205, 241, 0.36);
}

.check-icon {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  border-radius: 50%;
  border: 2px solid rgba(169, 145, 227, 0.7);
  box-sizing: border-box;
  flex-shrink: 0;
}

.check-icon.checked {
  background: linear-gradient(180deg, #b28bf2, #8e63df);
  border-color: transparent;
  box-shadow: inset 0 0 0 4px rgba(255, 255, 255, 0.9);
}

.check-copy strong {
  font-size: 14px;
}

.check-copy em {
  display: block;
  margin-top: 4px;
  line-height: 1.5;
  font-style: normal;
}

.status-list {
  margin-top: 12px;
}

.status-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.status-item em {
  flex-shrink: 0;
  font-style: normal;
  font-size: 11px;
  font-weight: 700;
  color: #73b471;
}

.empty-state {
  margin-top: 12px;
  padding: 18px 16px;
  border-radius: 16px;
  border: 1px dashed rgba(184, 160, 223, 0.54);
  background: rgba(255, 255, 255, 0.52);
  font-size: 12px;
  line-height: 1.7;
  color: #8d7aa7;
  text-align: center;
}

.detail-overlay {
  position: fixed;
  inset: 0;
  z-index: 30;
  display: flex;
  justify-content: flex-end;
  padding: 22px;
  background: rgba(70, 49, 103, 0.2);
  backdrop-filter: blur(8px);
}

.detail-sheet {
  width: min(460px, calc(100vw - 32px));
  max-height: calc(100vh - 44px);
  padding: 18px;
  overflow-y: auto;
}

.detail-sheet-head {
  justify-content: space-between;
  gap: 12px;
}

.detail-sheet-title {
  font-size: 20px;
  font-weight: 900;
  color: #59456f;
}

.detail-sheet-subtitle {
  margin-top: 6px;
  font-size: 12px;
  color: #9886ae;
}

.detail-close {
  height: 34px;
  padding: 0 14px;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  color: #7b5ab8;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.detail-sheet-actions {
  gap: 10px;
  margin-top: 16px;
}

.detail-timeline {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-item {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 12px;
  padding: 14px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(221, 205, 241, 0.36);
}

.detail-item-time {
  font-size: 20px;
  font-weight: 900;
  color: #7352d1;
  text-align: center;
}

.detail-item-top {
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}

.detail-item-meta,
.detail-item-desc {
  margin-top: 5px;
  font-size: 12px;
  line-height: 1.6;
  color: #9886ae;
}

.detail-item-actions {
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.detail-empty {
  margin-top: 16px;
}

.detail-fade-enter-active,
.detail-fade-leave-active {
  transition: opacity 0.2s ease;
}

.detail-fade-enter-from,
.detail-fade-leave-to {
  opacity: 0;
}

.tool-footer {
  padding: 0 18px 18px;
}

.footer-title {
  font-size: 18px;
  font-weight: 800;
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
  .schedule-shell {
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

@media (max-width: 1260px) {
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

  .schedule-shell {
    grid-template-columns: 1fr;
  }

  .left-column,
  .right-column {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .bottom-grid,
  .tool-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .left-column,
  .right-column {
    grid-template-columns: 1fr;
  }

  .schedule-form {
    grid-template-columns: 1fr;
  }

  .agenda-item {
    grid-template-columns: 1fr;
  }

  .detail-item {
    grid-template-columns: 1fr;
  }

  .weather-metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
