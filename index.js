const __SCALE = 0.5;
const dockItemList = document.querySelectorAll('.dock-item');
const dockContainer = document.querySelector('.dock')

function resetScale() {
  dockItemList.forEach((item, i) => {
    setElementScale(dockItemList[i], 1)
  })
}

function setElementScale(element, scale) {
  element.style.setProperty('--scale', scale)
}

dockContainer.addEventListener('mouseleave', resetScale)

let i = -1;
const cbList = []
while (++i < dockItemList.length) {
  const item = dockItemList[i];
  const scaleCb = e => {
    const target = e.target;
    const rect = target.getBoundingClientRect();
    const offset = Math.abs(e.clientX - rect.left) / rect.width;
    const prev = item.previousElementSibling
    const next = item.nextElementSibling;
    resetScale()
    if (prev) {
      setElementScale(prev, 1 + __SCALE * Math.abs(offset - 1))
    }

    setElementScale(item, 1 + __SCALE);

    if (next) {
      setElementScale(next, 1 + __SCALE * offset)
    }
  }
  const resetScaleCb = e => {
    setElementScale(item, 1)
  }
  cbList[i] = [scaleCb, resetScaleCb];
  item.addEventListener('mousemove', scaleCb, false)
  // item.addEventListener('mouseleave', resetScaleCb, false)
}
