// 可可桌宠 v0.0.1 — 交互层
import { bus } from './event-bus.js';

const canvas = document.getElementById('keke-canvas');

// 单击 → 喵~
canvas.addEventListener('click', () => {
    console.log('喵~');
    bus.emit('keke:meow');
});

// 右键菜单
canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const menu = document.getElementById('context-menu');
    menu.classList.toggle('hidden');
    menu.style.left = e.clientX + 'px';
    menu.style.top = e.clientY + 'px';
});

document.getElementById('menu-quit').addEventListener('click', () => {
    window.__TAURI__?.window?.appWindow?.close();
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('#context-menu') && !e.target.closest('canvas')) {
        document.getElementById('context-menu').classList.add('hidden');
    }
});
