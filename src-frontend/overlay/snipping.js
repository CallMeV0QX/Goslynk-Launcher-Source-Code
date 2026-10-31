const { invoke } = window.__TAURI__.core;
const { getCurrentWindow } = window.__TAURI__.window;
const { listen } = window.__TAURI__.event;

const bgCanvas = document.getElementById('bg-canvas');
const maskCanvas = document.getElementById('mask-canvas');
const drawCanvas = document.getElementById('draw-canvas');
const bgCtx = bgCanvas.getContext('2d');
const maskCtx = maskCanvas.getContext('2d');
const drawCtx = drawCanvas.getContext('2d');
const toolbar = document.getElementById('toolbar');

let width = window.innerWidth;
let height = window.innerHeight;

let state = 'IDLE'; // IDLE -> SELECTING -> DRAWING
let selection = null;
let isDragging = false;
let dragMode = null; // 'create', 'move', 'nw', 'ne', 'sw', 'se', 'n', 's', 'w', 'e'
let startPos = { x: 0, y: 0 };
let currentTool = 'rect';
let currentColor = '#ff3b30';
let dragOffset = { x: 0, y: 0 };

let shapes = [];
let base64Image = "";

// Init listeners
listen("show-snipping", (e) => {
  base64Image = e.payload;
  width = window.innerWidth;
  height = window.innerHeight;
  bgCanvas.width = width; bgCanvas.height = height;
  maskCanvas.width = width; maskCanvas.height = height;
  drawCanvas.width = width; drawCanvas.height = height;
  
  const img = new Image();
  img.onload = () => {
    bgCtx.drawImage(img, 0, 0, width, height);
    state = 'SELECTING';
    selection = null;
    shapes = [];
    toolbar.classList.add('hidden');
    drawMask();
    redrawDrawCanvas();
  };
  img.src = "data:image/png;base64," + base64Image;
});

function drawMask() {
  maskCtx.clearRect(0, 0, width, height);
  maskCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  maskCtx.fillRect(0, 0, width, height);

  if (selection) {
    maskCtx.clearRect(selection.x, selection.y, selection.w, selection.h);
    maskCtx.strokeStyle = '#3b82f6';
    maskCtx.lineWidth = 1;
    maskCtx.strokeRect(selection.x, selection.y, selection.w, selection.h);

    if (state === 'SELECTING') {
      drawResizeHandles();
    }
  }
}

const handleSize = 8;
function getHandles() {
  if (!selection) return {};
  const { x, y, w, h } = selection;
  const hw = handleSize / 2;
  return {
    nw: { x: x - hw, y: y - hw, w: handleSize, h: handleSize, cursor: 'nwse-resize' },
    ne: { x: x + w - hw, y: y - hw, w: handleSize, h: handleSize, cursor: 'nesw-resize' },
    sw: { x: x - hw, y: y + h - hw, w: handleSize, h: handleSize, cursor: 'nesw-resize' },
    se: { x: x + w - hw, y: y + h - hw, w: handleSize, h: handleSize, cursor: 'nwse-resize' },
    n: { x: x + w/2 - hw, y: y - hw, w: handleSize, h: handleSize, cursor: 'ns-resize' },
    s: { x: x + w/2 - hw, y: y + h - hw, w: handleSize, h: handleSize, cursor: 'ns-resize' },
    w: { x: x - hw, y: y + h/2 - hw, w: handleSize, h: handleSize, cursor: 'ew-resize' },
    e: { x: x + w - hw, y: y + h/2 - hw, w: handleSize, h: handleSize, cursor: 'ew-resize' },
  };
}

function drawResizeHandles() {
  const handles = getHandles();
  maskCtx.fillStyle = '#3b82f6';
  for (const k in handles) {
    const h = handles[k];
    maskCtx.fillRect(h.x, h.y, h.w, h.h);
  }
}

function hitTest(x, y) {
  if (state === 'SELECTING' && selection) {
    const handles = getHandles();
    for (const k in handles) {
      const h = handles[k];
      if (x >= h.x && x <= h.x + h.w && y >= h.y && y <= h.y + h.h) {
        return k;
      }
    }
    if (x >= selection.x && x <= selection.x + selection.w && y >= selection.y && y <= selection.y + selection.h) {
      return 'move';
    }
  }
  return null;
}

drawCanvas.addEventListener('mousemove', (e) => {
  if (!isDragging) {
    const hit = hitTest(e.clientX, e.clientY);
    if (hit && hit !== 'move') {
      const handles = getHandles();
      drawCanvas.style.cursor = handles[hit].cursor;
    } else if (hit === 'move') {
      drawCanvas.style.cursor = 'move';
    } else if (state === 'DRAWING' && isInSelection(e.clientX, e.clientY)) {
      drawCanvas.style.cursor = currentTool === 'text' ? 'text' : 'crosshair';
    } else {
      drawCanvas.style.cursor = 'crosshair';
    }
  } else {
    // dragging
    const cx = e.clientX;
    const cy = e.clientY;
    
    if (state === 'SELECTING') {
      if (dragMode === 'create') {
        selection.x = Math.min(startPos.x, cx);
        selection.y = Math.min(startPos.y, cy);
        selection.w = Math.abs(cx - startPos.x);
        selection.h = Math.abs(cy - startPos.y);
      } else if (dragMode === 'move') {
        selection.x = cx - dragOffset.x;
        selection.y = cy - dragOffset.y;
      } else {
        // resize
        if (dragMode.includes('w')) {
          const right = selection.x + selection.w;
          selection.x = Math.min(cx, right);
          selection.w = right - selection.x;
        }
        if (dragMode.includes('e')) {
          selection.w = Math.max(0, cx - selection.x);
        }
        if (dragMode.includes('n')) {
          const bottom = selection.y + selection.h;
          selection.y = Math.min(cy, bottom);
          selection.h = bottom - selection.y;
        }
        if (dragMode.includes('s')) {
          selection.h = Math.max(0, cy - selection.y);
        }
      }
      
      // clamp to screen
      if (selection.x < 0) { selection.w += selection.x; selection.x = 0; }
      if (selection.y < 0) { selection.h += selection.y; selection.y = 0; }
      if (selection.x + selection.w > width) selection.w = width - selection.x;
      if (selection.y + selection.h > height) selection.h = height - selection.y;
      
      drawMask();
      showToolbar();
    } else if (state === 'DRAWING') {
      redrawDrawCanvas();
      drawTempShape(cx, cy);
    }
  }
});

drawCanvas.addEventListener('mousedown', (e) => {
  if (e.button !== 0 || state === 'IDLE') return;

  const hit = hitTest(e.clientX, e.clientY);
  
  if (state === 'SELECTING') {
    isDragging = true;
    startPos = { x: e.clientX, y: e.clientY };
    if (hit) {
      dragMode = hit;
      if (hit === 'move') {
        dragOffset = { x: e.clientX - selection.x, y: e.clientY - selection.y };
      }
    } else {
      dragMode = 'create';
      selection = { x: startPos.x, y: startPos.y, w: 0, h: 0 };
    }
  } else if (state === 'DRAWING') {
    if (!isInSelection(e.clientX, e.clientY)) {
      // User clicked outside while drawing, maybe they want to restart selection?
      // For now, just ignore or close toolbar? 
      // Zalo usually allows clicking outside to cancel. Let's just return.
      return;
    }
    
    if (currentTool === 'text') {
      createTextbox(e.clientX, e.clientY);
      return;
    }

    isDragging = true;
    startPos = { x: e.clientX, y: e.clientY };
  }
});

drawCanvas.addEventListener('mouseup', (e) => {
  if (!isDragging) return;
  isDragging = false;

  if (state === 'SELECTING') {
    if (selection.w < 10 || selection.h < 10) {
      selection = null;
      toolbar.classList.add('hidden');
      drawMask();
      return;
    }
    showToolbar();
  } else if (state === 'DRAWING') {
    commitShape(e.clientX, e.clientY);
  }
});

function isInSelection(x, y) {
  if (!selection) return false;
  return x >= selection.x && x <= selection.x + selection.w &&
    y >= selection.y && y <= selection.y + selection.h;
}

function showToolbar() {
  if (!selection) return;
  toolbar.classList.remove('hidden');
  let tx = selection.x + selection.w - toolbar.offsetWidth;
  let ty = selection.y + selection.h + 8;
  if (tx < 0) tx = selection.x;
  if (ty + toolbar.offsetHeight > height) {
    ty = selection.y - toolbar.offsetHeight - 8;
  }
  toolbar.style.left = `${tx}px`;
  toolbar.style.top = `${ty}px`;
}

function redrawDrawCanvas() {
  drawCtx.clearRect(0, 0, width, height);
  for (const shape of shapes) {
    renderShape(shape);
  }
}

function drawTempShape(x, y) {
  x = Math.max(selection.x, Math.min(x, selection.x + selection.w));
  y = Math.max(selection.y, Math.min(y, selection.y + selection.h));

  renderShape({
    tool: currentTool,
    color: currentColor,
    x1: startPos.x, y1: startPos.y,
    x2: x, y2: y
  });
}

function commitShape(x, y) {
  x = Math.max(selection.x, Math.min(x, selection.x + selection.w));
  y = Math.max(selection.y, Math.min(y, selection.y + selection.h));

  if (Math.abs(x - startPos.x) < 2 && Math.abs(y - startPos.y) < 2) return;

  shapes.push({
    tool: currentTool,
    color: currentColor,
    x1: startPos.x, y1: startPos.y,
    x2: x, y2: y
  });
  redrawDrawCanvas();
}

function renderShape(shape) {
  drawCtx.save();
  drawCtx.strokeStyle = shape.color;
  drawCtx.fillStyle = shape.color;
  drawCtx.lineWidth = 3;
  drawCtx.lineCap = 'round';
  drawCtx.lineJoin = 'round';

  if (shape.tool === 'rect') {
    let rx = Math.min(shape.x1, shape.x2);
    let ry = Math.min(shape.y1, shape.y2);
    let rw = Math.abs(shape.x2 - shape.x1);
    let rh = Math.abs(shape.y2 - shape.y1);
    drawCtx.strokeRect(rx, ry, rw, rh);
  } else if (shape.tool === 'arrow') {
    drawArrow(drawCtx, shape.x1, shape.y1, shape.x2, shape.y2);
  } else if (shape.tool === 'text') {
    drawCtx.font = '16px "Inter", sans-serif';
    drawCtx.textBaseline = 'top';
    drawCtx.fillText(shape.text, shape.x1, shape.y1);
  } else if (shape.tool === 'blur') {
    let bx = Math.min(shape.x1, shape.x2);
    let by = Math.min(shape.y1, shape.y2);
    let bw = Math.abs(shape.x2 - shape.x1);
    let bh = Math.abs(shape.y2 - shape.y1);

    drawCtx.beginPath();
    drawCtx.rect(bx, by, bw, bh);
    drawCtx.clip();

    drawCtx.filter = 'blur(8px)';
    drawCtx.drawImage(bgCanvas, 0, 0);
    drawCtx.filter = 'none';
  }

  drawCtx.restore();
}

function drawArrow(ctx, fromx, fromy, tox, toy) {
  const headlen = 10;
  const dx = tox - fromx;
  const dy = toy - fromy;
  const angle = Math.atan2(dy, dx);
  ctx.beginPath();
  ctx.moveTo(fromx, fromy);
  ctx.lineTo(tox, toy);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(tox, toy);
  ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
  ctx.fill();
}

function createTextbox(x, y) {
  const input = document.createElement('textarea');
  input.className = 'text-input-overlay';
  input.style.left = x + 'px';
  input.style.top = y + 'px';
  input.style.color = currentColor;
  input.style.position = 'absolute';
  input.style.zIndex = '1000';
  input.style.background = 'transparent';
  input.style.border = '1px dashed ' + currentColor;
  input.style.outline = 'none';
  input.style.font = '16px "Inter", sans-serif';
  input.style.padding = '2px';
  input.style.resize = 'none';
  input.style.overflow = 'hidden';
  input.style.whiteSpace = 'pre';
  input.style.pointerEvents = 'auto'; // allow clicking inside
  
  document.body.appendChild(input);
  input.focus();

  const removeInput = () => {
    if (input.value.trim() !== '') {
      shapes.push({
        tool: 'text',
        color: currentColor,
        x1: x + 2,
        y1: y + 2,
        text: input.value
      });
      redrawDrawCanvas();
    }
    if (document.body.contains(input)) {
        input.remove();
    }
  };

  input.addEventListener('blur', removeInput);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      input.value = '';
      input.blur();
    }
    // stop propagation so window listener doesn't close window
    e.stopPropagation();
  });

  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = (input.scrollHeight) + 'px';
    input.style.width = 'auto';
    input.style.width = (input.scrollWidth + 20) + 'px';
  });
}

document.querySelectorAll('.tool-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent window click
    document.querySelector('.tool-btn.active').classList.remove('active');
    btn.classList.add('active');
    currentTool = btn.dataset.tool;
    // Chuyển sang DRAWING state
    if (state === 'SELECTING' && selection) {
      state = 'DRAWING';
      drawMask(); // Xoá 8 handles
    }
  });
});

document.querySelectorAll('.color-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    document.querySelector('.color-btn.active').classList.remove('active');
    btn.classList.add('active');
    currentColor = btn.dataset.color;
    // Chuyển sang DRAWING state
    if (state === 'SELECTING' && selection) {
      state = 'DRAWING';
      drawMask();
    }
  });
});

function getFinalBase64() {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = selection.w;
  tempCanvas.height = selection.h;
  const tCtx = tempCanvas.getContext('2d');

  tCtx.drawImage(bgCanvas, selection.x, selection.y, selection.w, selection.h, 0, 0, selection.w, selection.h);
  tCtx.drawImage(drawCanvas, selection.x, selection.y, selection.w, selection.h, 0, 0, selection.w, selection.h);

  return tempCanvas.toDataURL('image/png').split(',')[1];
}

document.getElementById('btn-copy').addEventListener('click', async (e) => {
  e.stopPropagation();
  const b64 = getFinalBase64();
  await invoke('copy_snipped_image', { base64: b64 });
  getCurrentWindow().hide();
});

document.getElementById('btn-save').addEventListener('click', async (e) => {
  e.stopPropagation();
  const b64 = getFinalBase64();
  await invoke('save_snipped_image', { base64: b64 });
  getCurrentWindow().hide();
});

document.getElementById('btn-close').addEventListener('click', (e) => {
  e.stopPropagation();
  getCurrentWindow().hide();
});

window.addEventListener('keydown', async (e) => {
  if (e.key === 'Escape') {
    getCurrentWindow().hide();
  } else if (e.key === 'c' && e.ctrlKey) {
    if (selection) {
      const b64 = getFinalBase64();
      await invoke('copy_snipped_image', { base64: b64 });
      getCurrentWindow().hide();
    }
  } else if (e.key === 's' && e.ctrlKey) {
    e.preventDefault();
    if (selection) {
      const b64 = getFinalBase64();
      await invoke('save_snipped_image', { base64: b64 });
      getCurrentWindow().hide();
    }
  }
});
