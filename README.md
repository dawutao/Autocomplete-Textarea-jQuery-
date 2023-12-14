概述:
Autocomplete Textarea jQuery 插件是一款专业设计的工具，通过 '@' 符号触发的无缝自动完成功能增强文本区域。该插件简化了将预定义项目插入可编辑区域的过程，适用于需要快速高效内容插入的场景。

用法:
引入脚本:

在 HTML 文件中引入 jQuery 和 Autocomplete Textarea 插件脚本。

html
Copy code
<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
<script src="autocomplete-textarea-plugin.js"></script>
创建容器:

创建一个带有唯一 ID 的容器元素，用于应用 Autocomplete Textarea。

html
Copy code
<div id="autocomplete-container"></div>
初始化插件:

通过在容器元素上调用 autocompleteTextarea 方法来初始化插件。

javascript
Copy code
$(document).ready(function () {
    $('#autocomplete-container').autocompleteTextarea({
        items: ['customItem1', 'customItem2', 'customItem3']
    });
});
方法:
插入文本:

通过 getText 方法以编程方式检索带有自动完成功能的编辑内容。

javascript
Copy code
var textContent = $('#autocomplete-container').autocompleteTextarea("getText");
安装:
下载 autocomplete-textarea-plugin.js 文件并将其包含在项目中。确保在包含插件脚本之前包含 jQuery。

贡献:
欢迎贡献！如果发现错误或有改进建议，请创建问题或提交拉取请求。

许可证:
此 Autocomplete Textarea jQuery 插件是开源的，根据 MIT 许可证 提供。
