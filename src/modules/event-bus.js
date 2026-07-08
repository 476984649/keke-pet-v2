// 可可桌宠 — 事件总线（唯一跨模块通信桥梁）
class EventBus extends EventTarget {
    emit(name, detail) { this.dispatchEvent(new CustomEvent(name, { detail })); }
    on(name, fn) { this.addEventListener(name, fn); }
    off(name, fn) { this.removeEventListener(name, fn); }
}
export const bus = new EventBus();
