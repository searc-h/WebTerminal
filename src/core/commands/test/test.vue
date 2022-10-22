<template>
    <div style="background-color: ;black">
        可以看到test指令用法：<br>
        test  {{"<"}} who > [-f 从哪个开始] [-t 去哪里] [-s 是否自身打开] <br>

        其中 {{"<"}} who > 是必填内容 <br>
        其中 [-f ] [-t ] [-s ]都是选填选项 <br>
        所以我们可以这样使用: <br>
        test nihao <br>
        test 你好 -f cq -t cd <br>
        test nihao -f 重庆 -t 成都 -s true <br>
        
    </div>
</template>
<script setup lang="ts">


</script>
<style lang="">
    
</style>