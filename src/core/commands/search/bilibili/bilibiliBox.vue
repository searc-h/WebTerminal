<template>
    <div>
        <iframe
        frameborder="no"
        marginwidth="0"
        marginheight="0"
        width="1000"
        height="700"
        :src="videoPath"
        />

    </div>
</template>
<script lang="ts" setup>
import {ref ,computed} from 'vue'
interface Props {
    bvid:string
}

let errorHint = ref<string>("")

let {bvid} = defineProps<Props>()

const videoPath = computed(() => {
  return `https://player.bilibili.com/player.html?bvid=${bvid}`;
});

</script>
<style>
    
</style>