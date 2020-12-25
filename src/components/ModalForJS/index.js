class Modal {
  constructor(options) {
    for (let key in options) {
      if (!options.hasOwnProperty(key)) break;
      this[key] = options[key];
    }
    this.init();
  }

  init() {
    if (this.status === 'modal') {
      this.createEl();
      this.open();
      return;
    }
  }

  createEl() {
    this.modalBox = document.createElement('div');
    this.modalBox.setAttribute('class', 'modal');
    this.modalBox.setAttribute('id', this.id);
    this.modalBox.innerHTML = `
        <div class="modal-content" style="width: ${this.width}">
            <header class="modal-header">
                <h4>${this.title}</h4>
                <span class="close" id="close">×</span>
            </header>
            <div class="modal-body">
                 ${this.contentHtml}
            </div>
            <footer class="modal-footer">
                <button id="cancel">取消</button>
                <button id="sure">确定</button>
            </footer>
        </div>
    `;
    document.body.appendChild(this.modalBox);

    if (this.status === 'modal') {
      let _this = this;
      this.modalBox.onclick = function (e) {
        if ((e.target.getAttribute('id') === 'close' || e.target.getAttribute('id') === 'cancel') || (_this.maskClosable && e.target === _this.modalBox)) {
          _this.close();
        }
        if (e.target.getAttribute('id') === 'sure') {
          _this.onSure(_this);
        }
      }
    }

    this.onMount(this);
    return;
  }

  open() {
    if (this.status === 'modal') {
      this.modalBox.style.display = 'block';
    }
  }

  close() {
    if (this.status === 'modal') {
      this.modalBox.style.display = 'none';
      document.body.removeChild(this.modalBox);
    }
  }
}

window.selfModal = function (props) {
  let _props = {
    status: 'modal',
    id: 'modal',
    contentHtml: `<div>默认内容</div>`,
    maskClosable: true,
    title: '暂无',
    width: '500px',
    onSure:()=>{},
    onMount:()=>{},
    ...props,
  }
  return new Modal(_props);
};
