const __SCALE = 0.5;
const setElementScale = (element, scale) => {
  // const scaleStr = `scale(${scale})`;
  // element.style.setProperty('transform', scaleStr);
  element.style.setProperty('--scale', scale)
}
const dockItemList = document.querySelectorAll('.dock-item');
const dockContainer = document.querySelector('.dock')
dockContainer.addEventListener('mouseleave', e => {
  dockItemList.forEach((item, i) => {
    setElementScale(dockItemList[i], 1)
  })
})
const logger = console.log
let i = -1;
const cbList = []
while (++i < dockItemList.length) {
  const item = dockItemList[i];
  const scaleCb = e => {
    const target = e.target;
    const rect = target.getBoundingClientRect();
    const offset = Math.abs(e.clientX - rect.left) / rect.width;
    setElementScale(item, 1 + __SCALE);
    const prev = item.previousElementSibling
    const next = item.nextElementSibling;
    logger('scale', item)
    if (prev) {
      setElementScale(prev, 1 + __SCALE * Math.abs(offset - 1))
    }
    if (next) {
      setElementScale(next, 1 + __SCALE * Math.abs(offset))
    }
  }
  const resetScaleCb = e => {
    setElementScale(item, 1)
  }
  cbList[i] = [scaleCb, resetScaleCb];
  item.addEventListener('mousemove', scaleCb, false)
  item.addEventListener('mouseleave', resetScaleCb, false)
}
