<template>
  <div id="user-layout">
    <a-layout style="min-height: 100vh">
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            height: 35px;
            margin-top: 8px;
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
              >daydayup-ytb GitHub</span
            >
          </a>
        </div>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#user-layout {
  text-align: center;
  background-image: url("../assets/背景.png");
  background-size: cover;
  background-color: #f7f8fa;
}

#user-layout .header {
  margin-top: 250px;
}

#user-layout .content {
  margin-bottom: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#user-layout .footer {
  margin-bottom: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>

<script setup lang="ts"></script>
