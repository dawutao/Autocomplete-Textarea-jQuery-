### Autocomplete Textarea jQuery 插件

**描述:**

Autocomplete Textarea jQuery 通过 '@' 符号触发的无缝自动完成功能增强文本区域。该插件简化了将预定义项目插入可编辑区域的过程，适用于需要快速高效内容插入的场景。

**主要功能:**

- 通过 '@' 符号触发的自动完成功能，简化内容插入。

**用法:**

1. 在 HTML 文件中引入 jQuery 和 Autocomplete Textarea 插件脚本。

   ```html
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="autocomplete-textarea-plugin.css">

   ...
   
   <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
   <script src="autocomplete-textarea-plugin.js"></script>
   ```

2. 创建容器:
创建一个带有唯一 ID 的容器元素，用于应用 Autocomplete Textarea。

    ```html 
    <div id="autocomplete-container"></div>
    ```

3. 初始化插件:
通过在容器元素上调用 autoCompleteTextarea 方法来初始化插件。

    ```js
    $(document).ready(function () {
        $('#autocomplete-container').autoCompleteTextarea({
            items: ['customItem1', 'customItem2', 'customItem3']
        });
    });
    ```
