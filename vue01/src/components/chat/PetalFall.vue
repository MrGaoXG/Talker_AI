<template>
  <div class="petal-container" aria-hidden="true">
    <div v-for="n in 20" :key="n" class="petal" :style="petalStyle(n)" />
  </div>
</template>

<script setup>
const petalStyle = (seed) => {
  const pseudoRandom = (s) => {
    let x = Math.sin(s * 12.9898 + 78.233) * 43758.5453
    return x - Math.floor(x)
  }
  const left = pseudoRandom(seed * 1.1) * 100
  const delay = pseudoRandom(seed * 2.2) * 15
  const duration = 8 + pseudoRandom(seed * 3.3) * 12
  const size = 8 + pseudoRandom(seed * 4.4) * 14
  const drift = -30 + pseudoRandom(seed * 5.5) * 60
  const rotation = pseudoRandom(seed * 6.6) * 360
  const hue = 280 + pseudoRandom(seed * 7.7) * 40

  return {
    left: `${left}%`,
    width: `${size}px`,
    height: `${size * 1.3}px`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    '--drift': `${drift}px`,
    '--start-rotation': `${rotation}deg`,
    background: `hsla(${hue}, 60%, 75%, ${0.3 + pseudoRandom(seed * 8.8) * 0.4})`,
    borderRadius: `${pseudoRandom(seed * 9.9) > 0.5 ? '50% 0 50% 0' : '0 50% 0 50%'}`,
    opacity: 0
  }
}
</script>

<style scoped>
.petal-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 5;
  overflow: hidden;
}

.petal {
  position: absolute;
  top: -5%;
  animation: petalFall linear infinite;
  will-change: transform;
}

@keyframes petalFall {
  0% {
    opacity: 0;
    transform: translateY(0) translateX(0) rotate(var(--start-rotation)) scale(0.6);
  }
  5% {
    opacity: 0.7;
  }
  50% {
    opacity: 0.5;
    transform: translateY(50vh) translateX(var(--drift)) rotate(calc(var(--start-rotation) + 180deg)) scale(1);
  }
  95% {
    opacity: 0.4;
  }
  100% {
    opacity: 0;
    transform: translateY(105vh) translateX(calc(var(--drift) * -0.5)) rotate(calc(var(--start-rotation) + 360deg)) scale(0.3);
  }
}
</style>
