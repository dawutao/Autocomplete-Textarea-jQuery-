(function ($) {
    // 定义插件的构造函数
    function AutocompleteTextarea(element, options) {

        this.$element = $(element);
        this.options = $.extend({
            items: []
        }, options);

        // 初始化插件
        this.init();

        // 将实例存储到元素的 data 属性中
        this.$element.data("autocompleteTextarea", this);
    }

    // 在构造函数的原型上添加方法
    AutocompleteTextarea.prototype = {
        constructor: AutocompleteTextarea,

        init: function () {
            // 创建编辑区域和下拉菜单
            this.$editableDiv = $('<div>', {
                class: 'form-control autocomplete-textarea',
                contenteditable: true
            });

            this.$dropdown = $('<div>', {
                class: 'autocomplete-dropdown list-group',
                style: 'display: none;'
            });

            // 将编辑区域和下拉菜单添加到容器中
            this.$element.addClass("autocomplete-container")
                .append(this.$editableDiv, this.$dropdown);

            // 绑定事件等...
            this.bindEvents();
        },

        bindEvents: function () {
            var _this = this;

            this.$editableDiv.on('keydown', function (e) {
                // 处理键盘事件...
                _this.handleKeydown(e);
            });

            // 其他事件绑定...
        },

        handleKeydown: function (e) {
            const text = e.key;
            if (text === '@') {
                this.showDropdown();
            } else if (text === 'Backspace') {
                this.handleBackspace();
            } else {
                this.hideDropdown();
            }
        },

        showDropdown: function () {
            // 显示下拉菜单的逻辑...
            this.$dropdown.empty();
            this.options.items.forEach(item => {
                const link = $('<a>', {
                    class: 'dropdown-item list-group-item list-group-item-action',
                    href: '#',
                    text: item
                });

                link.on('click', () => {
                    this.insertItem(item);
                });

                this.$dropdown.append(link);
            });

            const { top, left } = this.getCursorPos(this.$editableDiv[0]);
            this.$dropdown.css({ top, left: left + 20 });

            this.$dropdown.show();

            $(document).on('click.autocomplete', (e) => {
                if (!$(e.target).closest('.autocomplete-container').length) {
                    this.hideDropdown();
                }
            });
        },

        hideDropdown: function () {
            // 隐藏下拉菜单的逻辑...
            this.$dropdown.hide();
            $(document).off('click.autocomplete');
        },

        insertItem: function (item) {
            // 插入项目的逻辑...
            const sel = window.getSelection();
            const range = sel.getRangeAt(0);
            var tnode = range.commonAncestorContainer;
            var start = range.startOffset;
            var text = tnode.textContent;

            const spanElement = document.createElement('span');
            spanElement.className = 'insertitem text-white';
            spanElement.innerText = `[${item}]`;
            const emptyNode = document.createTextNode('\u200B');

            const firstTextNode = document.createTextNode(text.substring(0, start - 1));
            const lastTextNode = document.createTextNode(text.substring(start));

            const fragment = new DocumentFragment();
            fragment.append(firstTextNode, spanElement, emptyNode, lastTextNode);
            tnode.replaceWith(fragment);

            // 设置光标位置
            const newRange = document.createRange();
            newRange.setStart(lastTextNode, 0);
            newRange.collapse();
            sel.removeAllRanges();
            sel.addRange(newRange);

            this.hideDropdown();
        },

        handleBackspace: function () {
            // 处理退格键的逻辑...
            const sel = window.getSelection();
            const range = sel.getRangeAt(0);
            const startOffset = range.startOffset;

            const spanContainer = range.startContainer.parentElement;

            if (spanContainer && spanContainer.classList.contains('insertitem')) {
                if (startOffset > 0) {
                    spanContainer.parentNode.removeChild(spanContainer);
                }
            }
        },

        getCursorPos: function (element) {
            // 获取光标位置的逻辑...
            const sel = window.getSelection();

            if (sel.rangeCount > 0) {
                const range = sel.getRangeAt(0);

                if (range.startContainer === range.endContainer && range.startOffset === range.endOffset) {
                    const space = document.createTextNode('\u200B');
                    range.insertNode(space);
                    range.selectNodeContents(space);
                }

                const rect = range.getClientRects()[0];

                if (rect) {
                    const top = rect.top - element.getBoundingClientRect().top;
                    const left = rect.left - element.getBoundingClientRect().left;

                    return {
                        top, left
                    };
                }
            }
        },

        // 新添加的方法
        getText: function () {

            const zeroWidthRegex = /[\u200B-\u200D]/g;

            // 替换匹配到的零宽字符为一个空格
            const stringWithoutZeroWidth = this.$editableDiv.text().trim().replace(zeroWidthRegex, '');
            
            // 获取编辑区域的文本内容（包含换行）
            return stringWithoutZeroWidth;
        },

        // 新添加的方法
        destroy: function () {
            // 移除编辑区域和下拉菜单
            this.$editableDiv.remove();
            this.$dropdown.remove();

            // 还原原始的 HTML 内容
            this.$element.html(this.originalContent);

            // 解绑事件
            this.$element.off();

            // 删除存储的实例数据
            this.$element.removeData("autocompleteTextarea");
        },

    };

    // 将插件添加到 jQuery 的命名空间中
    $.fn.autoCompleteTextarea = function (options) {
        var result;

        this.each(function () {
            var instance = $(this).data("autocompleteTextarea");

            // 如果 options 是字符串 "getText"，则直接调用 getText 方法
            if (typeof options === "string" && options === "getText") {
                if (instance) {
                    result = instance.getText();
                }
            } else if (typeof options === "string" && options === "destroy") {
                if (instance) {
                    instance.destroy();
                }
            } else {
                // 否则创建 AutocompleteTextarea 实例并初始化插件
                new AutocompleteTextarea(this, options);
            }
        });

        // 返回结果，如果存在的话
        return result !== undefined ? result : this;
    };
})(jQuery);
