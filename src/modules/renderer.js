// 可可桌宠 v0.0.1 — Canvas 2D 渲染引擎
import { bus } from './event-bus.js';

const W = 150, H = 200;
const canvas = document.getElementById('keke-canvas');
const ctx = canvas.getContext('2d');
canvas.width = W; canvas.height = H;

const img = new Image();
img.src = '/images/keke_base.png';

let x = W / 2, y = H;
let startTime = Date.now();

img.onload = () => bus.emit('keke:ready');

function draw() {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, W, H);
    if (!img.complete || img.naturalWidth === 0) return;

    const t = (Date.now() - startTime) / 1000;
    const breathY = Math.sin(t * Math.PI / 2) * 3;
    const breathScale = 1 + Math.sin(t * Math.PI / 2) * 0.02;

    // 锚点：底部中心
    const drawX = x - 75;
    const drawY = y - 200 + breathY;
    const dw = 150 * breathScale;
    const dh = 200 * breathScale;
    const offsetX = (dw - 150) / 2;
    const offsetY = (dh - 200);

    ctx.drawImage(img, drawX - offsetX, drawY - offsetY, dw, dh);
}

img.onload = () => draw();
img.onerror = () => {
    // 生成彩色占位图
    ctx.fillStyle = '#FFF5EE';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#7EB5E0';
    ctx.beginPath(); ctx.arc(75, 70, 40, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#FFF';
    ctx.font = '14px sans-serif';
    ctx.fillText('可可', 56, 160);
    draw();
};
