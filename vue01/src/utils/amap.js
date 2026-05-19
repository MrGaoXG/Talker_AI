export const AMAP_CONFIG = {
  key: '4e1e0f69eed277a8fd9cea5abb031acd',
  securityJsCode: 'YOUR_AMAP_SECURITY_JS_CODE',
  serviceHost: '',
  version: '2.0',
  plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.Geolocation', 'AMap.Driving', 'AMap.PlaceSearch', 'AMap.Walking', 'AMap.Geocoder']
}

// #region debug-point A:reporter
const reportAmapLoaderDebug = () => {
  // Silent in production
  // fetch('http://127.0.0.1:7777/event', ...)
}
// #endregion

export const loadAmapScript = () => {
  const runtimeConfig = typeof window !== 'undefined' && window.__AMAP_CONFIG__
    ? window.__AMAP_CONFIG__
    : {}
  const sanitizedRuntimeConfig = Object.fromEntries(
    Object.entries(runtimeConfig).filter(([, value]) => {
      if (Array.isArray(value)) return value.length > 0
      return value !== '' && value !== null && value !== undefined
    })
  )
  const config = {
    ...AMAP_CONFIG,
    ...sanitizedRuntimeConfig
  }
  const pluginList = Array.isArray(config.plugins) ? config.plugins : AMAP_CONFIG.plugins
  const desiredSrc = `https://webapi.amap.com/maps?v=${config.version}&key=${config.key}&plugin=${pluginList.join(',')}`

  // #region debug-point A:config
  reportAmapLoaderDebug('A', 'loadAmapScript config resolved', {
    hasRuntimeConfig: Object.keys(runtimeConfig).length > 0,
    hasSanitizedRuntimeConfig: Object.keys(sanitizedRuntimeConfig).length > 0,
    keyTail: String(config.key || '').slice(-6),
    hasSecurityJsCode: Boolean(config.securityJsCode && config.securityJsCode !== 'YOUR_AMAP_SECURITY_JS_CODE'),
    serviceHost: config.serviceHost || '',
    version: config.version,
    pluginCount: pluginList.length,
    desiredSrc
  })
  // #endregion

  if (!config.key || config.key === 'YOUR_AMAP_KEY') {
    // #region debug-point A:key-missing
    reportAmapLoaderDebug('A', 'loadAmapScript rejected due to invalid key', {
      keyPresent: Boolean(config.key),
      keyValue: config.key || ''
    })
    // #endregion
    return Promise.reject(new Error('当前未检测到有效的高德地图 Key'))
  }

  const securityConfig = {}
  if (config.securityJsCode && config.securityJsCode !== 'YOUR_AMAP_SECURITY_JS_CODE') {
    securityConfig.securityJsCode = config.securityJsCode
  }
  if (config.serviceHost) {
    securityConfig.serviceHost = config.serviceHost
  }
  if (Object.keys(securityConfig).length) {
    window._AMapSecurityConfig = securityConfig
  }

  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[data-amap-loader="true"]')

    // #region debug-point C:existing-script
    reportAmapLoaderDebug('C', 'loadAmapScript existing script state', {
      hasWindowAMap: Boolean(window.AMap),
      hasExistingScript: Boolean(existingScript),
      existingSrc: existingScript?.src || '',
      srcMatches: Boolean(existingScript && existingScript.src === desiredSrc),
      hasSecurityConfig: Object.keys(securityConfig).length > 0
    })
    // #endregion

    if (window.AMap && existingScript && existingScript.src === desiredSrc) {
      resolve(window.AMap)
      return
    }

    if (existingScript && existingScript.src !== desiredSrc) {
      existingScript.remove()
      try {
        delete window.AMap
      } catch (error) {
        window.AMap = undefined
      }
    }

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.AMap))
      existingScript.addEventListener('error', reject)
      return
    }

    const script = document.createElement('script')
    script.src = desiredSrc
    script.async = true
    script.dataset.amapLoader = 'true'
    script.onload = () => {
      // #region debug-point B:onload
      reportAmapLoaderDebug('B', 'amap script onload fired', {
        hasWindowAMap: Boolean(window.AMap),
        hasMapCtor: Boolean(window.AMap?.Map),
        hasGeocoderCtor: Boolean(window.AMap?.Geocoder),
        hasDrivingCtor: Boolean(window.AMap?.Driving),
        hasWalkingCtor: Boolean(window.AMap?.Walking)
      })
      // #endregion
      if (window.AMap) {
        resolve(window.AMap)
        return
      }
      reject(new Error('高德地图脚本已加载，但 AMap 对象未初始化'))
    }
    script.onerror = (event) => {
      // #region debug-point B:onerror
      reportAmapLoaderDebug('B', 'amap script onerror fired', {
        src: script.src,
        eventType: event?.type || 'error',
        hasSecurityJsCode: Boolean(config.securityJsCode && config.securityJsCode !== 'YOUR_AMAP_SECURITY_JS_CODE'),
        serviceHost: config.serviceHost || ''
      })
      // #endregion
      reject(new Error('高德地图脚本加载失败'))
    }
    document.head.appendChild(script)
  })
}
