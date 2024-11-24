<template>
  <div id="basic-layout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            height: 30px;
            margin-bottom: -20px;
          "
        >
          <a
            href="https://github.com/daydayup-ytb"
            target="_blank"
            style="text-decoration: none; display: flex; align-items: center"
          >
            <icon-github
              style="color: #262626bf"
              :style="{ fontSize: '20px', marginRight: '5px' }"
            />
            <span
              style="margin-bottom: 0; text-decoration: none; color: #262626bf"
              >day-day-up GitHub</span
            >
          </a>
        </div>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#basic-layout {
}

#basic-layout .header {
  box-shadow: #eee 1px 1px 5px;
  z-index: 999;
}

#basic-layout .content {
}

#basic-layout .footer {
  margin-bottom: 16px;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  box-shadow: #eee 0 -2px 5px;
}
</style>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>
