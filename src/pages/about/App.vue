<template>
  <layout-default>
    <base-tab>
      <intro-about></intro-about>
    </base-tab>
    <base-tab>
      <contact-me></contact-me>
    </base-tab>
    <base-tab>
      <contact-history></contact-history>
    </base-tab>
  </layout-default>
</template>

<script setup>
import LayoutDefault from "@/components/layout/LayoutDefault.vue";
import ContactMe from "./components/ContactMe.vue"
import BaseTab from "@/components/UI/BaseTab.vue";
import ContactHistory from "@/pages/about/components/ContactHistory.vue";
import IntroAbout from "@/pages/about/components/IntroAbout.vue";
</script>
