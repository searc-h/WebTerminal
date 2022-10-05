<template >
    <div class="content-output">
      内容
        <template v-if="output.type === 'text'">
            <a-tag v-if="outputTagColor" :color="outputTagColor"
                >{{ output.status }}
            </a-tag>
            <span v-if="output.type === 'text'"  />
        </template>
        <component :is="output.component" 
        v-if="output.type === 'component'"
        v-bind="output.props ?? {}"></component>
    </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';
import OutputType = Terminal.OutputType;
import { computed, toRefs } from "vue";

interface contentProps {
  output: OutputType;
}

let props = defineProps<contentProps>()
let {output} = toRefs(props)

const outputTagColor = computed((): string => {
  if (!output.value.status) {
    return "";
  }
  switch (output.value.status) {
    case "info":
      return "dodgerblue";
    case "success":
      return "limegreen";
    case "warning":
      return "darkorange";
    case "error":
      return "#c0300f";
    case "system":
      return "#bfc4c9";
    default:
      return "";
  }
});
</script>
<style>
    .content-output :deep(.ant-tag) {
        border-radius: 0;
        font-size: 16px;
        border: none;
    }
</style>