<template>
  <layout-default>
    <base-tab-button :class="{ active: currentTab === tab }"
                     v-for="(_, tab) in tabs" :key="tab"
                     @click="currentTab = tab">{{ tab }}
    </base-tab-button>
    <base-tab title="透過 component :is 切換元件">
      <component :is="tabs[currentTab]"></component>
    </base-tab>

    <base-tab-button v-for="m in menu" type="router-link" :to="m.to" :text="m.text"></base-tab-button>
    <base-tab title="透過 router 顯示元件">
      <router-view></router-view>
    </base-tab>
  </layout-default>

</template>

<script setup>
import {ref} from "vue";
import BaseTabButton from "@/components/UI/BaseTabButton.vue";
import BaseTab from "@/components/UI/BaseTab.vue";
import LayoutDefault from "@/components/layout/LayoutDefault.vue";
import Archive from "@/pages/home/components/Archive.vue";
import IntroMonster from "@/components/intro/IntroMonster.vue";
import IntroAbout from "@/components/intro/IntroAbout.vue";

const currentTab = ref('IntroMonster')
const tabs = {
  IntroMonster,
  IntroAbout,
  Archive,
}

const menu = [
  {to: "/Home/IntroMonster", text: "IntroMonster"},
  {to: "/Home/IntroAbout", text: "IntroAbout"},
  {to: "/Home/Archive", text: "Archive"},
]

</script>