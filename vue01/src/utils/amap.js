export const AMAP_CONFIG = {
  key: '4e1e0f69eed277a8fd9cea5abb031acd',
  securityJsCode: 'YOUR_AMAP_SECURITY_JS_CODE',
  version: '2.0',
  plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.Geolocation', 'AMap.Driving', 'AMap.PlaceSearch', 'AMap.Walking', 'AMap.Geocoder']
}

export const loadAmapScript = () => {
  const desiredSrc = `https://webapi.amap.com/maps?v=${AMAP_CONFIG.version}&key=${AMAP_CONFIG.key}&plugin=${AMAP_CONFIG.plugins.join(',')}`

  if (!AMAP_CONFIG.key || AMAP_CONFIG.key === 'YOUR_AMAP_KEY') {
    return Promise.reject(new Error('当前未检测到有效的高德地图 Key'))
  }

  if (AMAP_CONFIG.securityJsCode && AMAP_CONFIG.securityJsCode !== 'YOUR_AMAP_SECURITY_JS_CODE') {
    window._AMapSecurityConfig = {
      securityJsCode: AMAP_CONFIG.securityJsCode
    }
  }

  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[data-amap-loader="true"]')

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
      if (window.AMap) {
        resolve(window.AMap)
        return
      }
      reject(new Error('高德地图脚本已加载，但 AMap 对象未初始化'))
    }
    script.onerror = () => reject(new Error('高德地图脚本加载失败'))
    document.head.appendChild(script)
  })
}
