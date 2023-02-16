<template>
  <layout-default>
    <base-tab>
      <main>
        <template v-for="m in menu">
          <router-link :to="m.to">{{ m.text }}</router-link>
          |
        </template>
        <router-view></router-view>
      </main>
    </base-tab>
  </layout-default>
</template>

<script>
import LayoutDefault from "@/components/layout/LayoutDefault.vue";
import BaseTab from "@/components/UI/BaseTab.vue";

export default {
  components: {
    LayoutDefault,
    BaseTab,
  },
  data() {
    return {
      menu:[
        { to: "/teams", text: "teams" },
        { to: "/teams/users", text: "all users" },
      ],
      teams: [
        { id: 't1', name: 'Frontend Engineers', members: ['u1', 'u2'] },
        { id: 't2', name: 'Backend Engineers', members: ['u1', 'u2', 'u3'] },
        { id: 't3', name: 'Client Consulting', members: ['u4', 'u5'] },
      ],
      users: [
        { id: 'u1', fullName: 'Max Schwarz', role: 'Engineer' },
        { id: 'u2', fullName: 'Praveen Kumar', role: 'Engineer' },
        { id: 'u3', fullName: 'Julie Jones', role: 'Engineer' },
        { id: 'u4', fullName: 'Alex Blackfield', role: 'Consultant' },
        { id: 'u5', fullName: 'Marie Smith', role: 'Consultant' },
      ],
    };
  },
  provide() {
    return {
      teams: this.teams,
      users: this.users,
    };
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>