<template>
  <div id="DoQuestionOnline">
    <div
      style="
        height: 5vh;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px; /* 可选，设置间距 */
      "
    >
      <div
        style="
          height: 100%;
          margin-bottom: 5px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        "
      >
        <img
          class="logo"
          :src="require('@/assets/我家哥哥的蛋.png')"
          @click="toHomePage"
          alt="LOGO"
        />
        <a-divider direction="vertical" />
        <a-button
          :style="buttonStyle"
          @mouseover="handleMouseOver"
          @mouseleave="handleMouseLeave"
          @click="handleClick"
        >
          <icon-menu-unfold style="margin-right: 10px" size="20" />
          题库
          <a-button
            :style="buttonStyle"
            @mouseover="handleMouseOver"
            @mouseleave="handleMouseLeave"
          >
            <icon-launch style="margin: -18px" size="12" />
          </a-button>
        </a-button>
        <a-drawer
          :width="600"
          :visible="visible"
          @cancel="handleCancel"
          :placement="'left'"
          :footer="false"
          unmountOnClose
          :drawer-style="{ borderRadius: '15px' }"
        >
          <template #title>每日一题</template>
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 10px auto 15px;
              border-radius: 10px;
            "
          >
            <a-space direction="vertical">
              <a-list
                style="margin-bottom: 25px"
                :data="questionList"
                :hoverable="true"
                :pagination-props="{
                  bufferSize: 3,
                  showJumper: true,
                  showPageSize: true,
                  showTotal: true,
                  pageSizeOptions: customPageSizeOptions,
                  pageSize: searchParams.pageSize,
                  current: searchParams.current,
                  total,
                }"
                @page-change="onPageChange"
                @page-size-change="onPageSizeChange"
              >
                <template #item="{ item }">
                  <a-list-item>
                    <a-list-item-meta>
                      <template #description>
                        <div
                          style="
                            height: 18px;
                            display: flex;
                            align-items: center;
                          "
                        >
                          <div style="width: 480px; display: flex">
                            <a-link style="color: #262626"
                              >{{ item.title }}
                            </a-link>
                          </div>
                          <div style="width: 30px; display: flex">
                            <span
                              v-if="item.difficulty === 1"
                              style="color: #00af9b"
                            >
                              简单
                            </span>
                            <span
                              v-else-if="item.difficulty === 3"
                              style="color: #ff2d55"
                            >
                              中等
                            </span>
                            <span
                              v-else-if="item.difficulty === 2"
                              style="color: #ffb800"
                            >
                              困难
                            </span>
                          </div>
                        </div>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                </template>
              </a-list>
            </a-space>
          </div>
        </a-drawer>
        <a-button>
          <icon-left />
        </a-button>
        <a-button>
          <icon-right />
        </a-button>
      </div>
      <div
        style="
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <button :class="{ runButton: true }">
          <icon-run size="18" color="#686868" style="margin-right: 7px" />
          <span style="color: #1a1a1a">运行</span>
        </button>
        <button
          @click="doSubmit"
          :class="{
            submitButton: true,
          }"
        >
          <icon-submit size="22" color="#02b128" style="margin-right: 7px" />
          <span style="color: #02b128">提交</span>
        </button>
      </div>
      <div
        style="
          height: 100%;
          margin-bottom: 5px;
          margin-right: 35px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        "
      >
        <div class="icon-css-small">
          <icon-small-bell
            size="20"
            :color="smallColor"
            style="stroke: currentColor; stroke-width: 15px"
          />
        </div>
        <div class="icon-css">
          <icon-flame
            size="20"
            :color="color"
            style="stroke: currentColor; stroke-width: 15px"
          />
          <span
            style="
              font-weight: bold;
              margin-left: 5px;
              margin-right: 5px;
              font-size: 16px;
            "
            >{{ submitNumber }}</span
          >
        </div>
        <div>
          <a-trigger :popup-translate="[-140, 15]" trigger="hover">
            <a-avatar :size="30">
              <img v-if="userAvatar" alt="avatar" :src="userAvatar" />
              <img
                v-else
                alt="avatar"
                src="https://himg.bdimg.com/sys/portraitn/item/03cde88aa5e69cabe59682e58fa3e59abce7b396df8f"
              />
            </a-avatar>
            <template #content>
              <SetCenter />
            </template>
          </a-trigger>
        </div>
      </div>
    </div>
    <div>
      <a-split
        :style="{
          height: '95vh',
          width: '100%',
        }"
        :min="50"
        :max="1869"
        v-model:size="leftSplitSize"
      >
        <template #first>
          <div
            :class="{
              'layout-first': true,
              'layout-first-full-screen': layout_first_full_screen,
              'layout-first-box-shadow': firstSwitch,
            }"
            @click="pitchOn(1)"
          >
            <div class="layout-first-animation"></div>
            <div>
              <div
                style="
                  height: 36px;
                  background: #fafafa;
                  border-radius: 10px 10px 0 0;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  cursor: pointer;
                "
              >
                <a-tabs
                  v-model:selectedTab="selectedTab"
                  style="margin-top: -16px"
                >
                  <a-space :size="-10">
                    <button
                      key="1"
                      :class="{
                        'custom-button': selectedTab === 'description',
                        'active-tab': selectedTab != 'description',
                      }"
                      style="
                        height: 28px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                      "
                      @click="changeTab('description')"
                    >
                      <icon-storage
                        style="color: #007bff; margin-right: 5px"
                        :size="18"
                      />
                      <span style="white-space: nowrap">题目描述</span>
                    </button>
                    <a-divider direction="vertical" />
                    <button
                      key="2"
                      :class="{
                        'custom-button': selectedTab === 'solutions',
                        'active-tab': selectedTab != 'solutions',
                      }"
                      style="
                        height: 28px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-left: 0;
                        cursor: pointer;
                      "
                      @click="changeTab('solutions')"
                    >
                      <icon-experiment
                        style="color: #007bff; margin-right: 5px"
                        :size="18"
                      />
                      <span style="white-space: nowrap">题解</span>
                    </button>
                    <a-divider direction="vertical" />
                    <button
                      key="3"
                      :class="{
                        'custom-button': selectedTab === 'submissions',
                        'active-tab': selectedTab != 'submissions',
                      }"
                      style="
                        height: 28px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-left: 0;
                        cursor: pointer;
                      "
                      @click="changeTab('submissions')"
                    >
                      <icon-schedule
                        style="color: #007bff; margin-right: 5px"
                        :size="18"
                      />
                      <span style="white-space: nowrap">提交记录</span>
                    </button>
                  </a-space>
                </a-tabs>
              </div>
              <template v-if="selectedTab === 'solutions'">
                <div style="overflow: auto; height: 86vh">
                  <AnswerViewPage :question="question" />
                </div>
              </template>
              <template v-if="selectedTab === 'submissions'">
                <div>
                  <NoteViewPage :question="question" />
                </div>
              </template>
              <template v-if="selectedTab === 'description'">
                <div style="overflow: auto; height: 86vh">
                  <QuestionViewPage :question="question" />
                </div>
              </template>
            </div>
          </div>
        </template>
        <template #second>
          <div style="overflow: hidden">
            <a-split
              direction="vertical"
              :style="{ height: '94vh' }"
              :min="41"
              :max="858"
              v-model:size="topSplitSize"
            >
              <template #first>
                <div
                  :class="{
                    'layout-second-first': true,
                    'layout-second-first-full-screen':
                      layout_second_first_full_screen,
                    'layout-second-first-box-shadow': secondSwitch,
                  }"
                  id="code-editor-container"
                  @click="pitchOn(2)"
                >
                  <div>
                    <div
                      style="
                        height: 36px;
                        background: #fafafa;
                        border-radius: 10px 10px 0 0;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        cursor: pointer;
                      "
                    >
                      <button
                        class="custom-button"
                        style="padding: 2px; height: 28px; cursor: pointer"
                      >
                        <a-space
                          style="display: flex; justify-content: center"
                          :size="2"
                        >
                          <icon-code
                            style="color: #02b128; margin-right: 2px"
                            size="22"
                          />
                          <span style="white-space: nowrap">代码</span>
                        </a-space>
                      </button>
                    </div>
                    <div
                      style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: -28px;
                        padding: 4px;
                      "
                    >
                      <a-form
                        :model="form"
                        layout="inline"
                        size="small"
                        style="margin-left: -15px"
                      >
                        <a-form-item field="language">
                          <a-trigger
                            trigger="click"
                            :unmount-on-close="false"
                            position="bl"
                          >
                            <button
                              class="language"
                              style="
                                color: #0000008c;
                                width: 60px;
                                height: 24px;
                              "
                            >
                              {{ form.language }}
                              <icon-down />
                            </button>
                            <template #content>
                              <div
                                style="
                                  width: 470px;
                                  height: 272px;
                                  background-color: #fffffe;
                                  border-radius: 10px;
                                  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
                                  margin-top: 10px;
                                  padding: 8px;
                                  display: flex;
                                "
                              >
                                <div style="width: 149px">
                                  <button
                                    class="language"
                                    style="
                                      width: 140px;
                                      height: 32px;
                                      margin-bottom: 2px;
                                    "
                                  >
                                    C ++
                                  </button>
                                  <button
                                    class="language"
                                    style="
                                      width: 140px;
                                      height: 32px;
                                      margin-bottom: 2px;
                                    "
                                  >
                                    Java
                                  </button>
                                  <button
                                    class="language"
                                    style="
                                      width: 140px;
                                      height: 32px;
                                      margin-bottom: 2px;
                                    "
                                  >
                                    Python
                                  </button>
                                  <button
                                    class="language"
                                    style="
                                      width: 140px;
                                      height: 32px;
                                      margin-bottom: 2px;
                                    "
                                  >
                                    Python3
                                  </button>
                                  <button
                                    class="language"
                                    style="
                                      width: 140px;
                                      height: 32px;
                                      margin-bottom: 2px;
                                    "
                                  >
                                    C
                                  </button>
                                  <button
                                    class="language"
                                    style="
                                      width: 140px;
                                      height: 32px;
                                      margin-bottom: 2px;
                                    "
                                  >
                                    C#
                                  </button>
                                  <button
                                    class="language"
                                    style="
                                      width: 140px;
                                      height: 32px;
                                      margin-bottom: 2px;
                                    "
                                  >
                                    JavaScript
                                  </button>
                                  <button
                                    class="language"
                                    style="
                                      width: 140px;
                                      height: 32px;
                                      margin-bottom: 2px;
                                    "
                                  >
                                    TypeScript
                                  </button>
                                </div>
                                <a-divider direction="vertical" />
                                <div style="width: 149px">
                                  <button
                                    class="language"
                                    style="
                                      width: 140px;
                                      height: 32px;
                                      margin-bottom: 2px;
                                    "
                                  >
                                    PHP
                                  </button>
                                  <button
                                    class="language"
                                    style="
                                      width: 140px;
                                      height: 32px;
                                      margin-bottom: 2px;
                                    "
                                  >
                                    Swift
                                  </button>
                                  <button
                                    class="language"
                                    style="
                                      width: 140px;
                                      height: 32px;
                                      margin-bottom: 2px;
                                    "
                                  >
                                    Kotlin
                                  </button>
                                  <button
                                    class="language"
                                    style="
                                      width: 140px;
                                      height: 32px;
                                      margin-bottom: 2px;
                                    "
                                  >
                                    Dart
                                  </button>
                                  <button
                                    class="language"
                                    style="
                                      width: 140px;
                                      height: 32px;
                                      margin-bottom: 2px;
                                    "
                                  >
                                    Go
                                  </button>
                                  <button
                                    class="language"
                                    style="
                                      width: 140px;
                                      height: 32px;
                                      margin-bottom: 2px;
                                    "
                                  >
                                    Ruby
                                  </button>
                                  <button
                                    class="language"
                                    style="
                                      width: 140px;
                                      height: 32px;
                                      margin-bottom: 2px;
                                    "
                                  >
                                    Scala
                                  </button>
                                  <button
                                    class="language"
                                    style="
                                      width: 140px;
                                      height: 32px;
                                      margin-bottom: 2px;
                                    "
                                  >
                                    Rust
                                  </button>
                                </div>
                                <a-divider direction="vertical" />
                                <div style="width: 149px">
                                  <button
                                    class="language"
                                    style="
                                      width: 140px;
                                      height: 32px;
                                      margin-bottom: 2px;
                                    "
                                  >
                                    Racket
                                  </button>
                                  <button
                                    class="language"
                                    style="
                                      width: 140px;
                                      height: 32px;
                                      margin-bottom: 2px;
                                    "
                                  >
                                    Erlang
                                  </button>
                                  <button
                                    class="language"
                                    style="
                                      width: 140px;
                                      height: 32px;
                                      margin-bottom: 2px;
                                    "
                                  >
                                    Elixir
                                  </button>
                                </div>
                              </div>
                            </template>
                          </a-trigger>
                        </a-form-item>
                      </a-form>
                      <div style="margin-top: -2px; display: flex">
                        <a-space>
                          <a-tooltip
                            background-color="#FFFFFF"
                            position="tr"
                            :content-style="{
                              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                              borderRadius: '10px',
                            }"
                          >
                            <template #content
                              ><span style="color: black; font-size: 13px"
                                >格式化代码</span
                              ></template
                            >
                            <button
                              class="language"
                              style="height: 24px; width: 24px; padding: 2px"
                            >
                              <span>
                                <icon-align-left
                                  :size="16"
                                  style="color: #999999"
                              /></span>
                            </button>
                          </a-tooltip>
                          <a-tooltip
                            background-color="#FFFFFF"
                            position="tr"
                            :content-style="{
                              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                              borderRadius: '10px',
                            }"
                          >
                            <template #content
                              ><span style="color: black; font-size: 13px"
                                >还原到默认的代码模板</span
                              ></template
                            >
                            <button
                              class="language"
                              style="height: 24px; width: 24px; padding: 2px"
                            >
                              <span>
                                <icon-refresh :size="16" style="color: #999999"
                              /></span>
                            </button>
                          </a-tooltip>
                          <a-modal
                            v-model:visible="isInitialise"
                            @cancel="handleCancel"
                          >
                            <template #title>
                              <div
                                style="
                                  display: flex;
                                  align-items: center;
                                  justify-content: center;
                                "
                              >
                                <icon-info-circle-fill
                                  :size="28"
                                  style="color: #165dff"
                                />
                                <span style="font-size: 20px; margin-left: 5px"
                                  >操作确认</span
                                >
                              </div>
                            </template>
                            <div>您将放弃所有更改并初始化代码！</div>
                          </a-modal>
                        </a-space>
                      </div>
                    </div>
                    <a-divider />
                    <CodeEditor
                      :val="question?.initialCode"
                      :language="form.language"
                      :handle-change="changeCode"
                      :style="{
                        height: divHeight - 110 + 'px',
                      }"
                      style="margin-top: -10px"
                    />
                    <div
                      style="
                        height: 30px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 0 12px;
                      "
                    >
                      <span
                        style="
                          color: #00000057;
                          font-size: 12px;
                          white-space: nowrap;
                        "
                        >已储存到本地</span
                      >
                      <span
                        style="
                          color: #00000057;
                          font-size: 12px;
                          white-space: nowrap;
                        "
                        >行 {{ line }}， 列 {{ column }}</span
                      >
                    </div>
                  </div>
                </div>
              </template>
              <template #second>
                <div
                  :class="{
                    'layout-second-second': true,
                    'layout-second-second-full-screen':
                      layout_second_second_full_screen,
                    'layout-second-second-box-shadow': thirdSwitch,
                    'layout-second-second-animation': true,
                  }"
                  @click="pitchOn(3)"
                >
                  <div>
                    <div
                      style="
                        height: 36px;
                        background: #fafafa;
                        border-radius: 10px 10px 0 0;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        cursor: pointer;
                      "
                    >
                      <div style="display: flex; align-items: center">
                        <button
                          :class="{
                            'custom-button': showNum === 1,
                            'active-tab': showNum != 1,
                          }"
                          style="padding: 2px; height: 28px; margin-right: -8px"
                        >
                          <a-space
                            style="display: flex; justify-content: center"
                            :size="2"
                          >
                            <icon-test-case
                              size="15"
                              color="#02b128"
                              style="margin-right: 5px"
                            />
                            <span style="white-space: nowrap; cursor: pointer"
                              >测试用例</span
                            >
                          </a-space>
                        </button>
                        <a-divider direction="vertical" />
                        <button
                          :class="{
                            'custom-button': showNum === 2,
                            'active-tab': showNum != 2,
                          }"
                          style="padding: 2px; height: 28px; margin-left: -10px"
                        >
                          <a-space
                            style="display: flex; justify-content: center"
                            :size="2"
                          >
                            <icon-refresh
                              v-if="isRotate"
                              :style="{ fontSize: '22px' }"
                              spin
                            />
                            <icon-test-result
                              v-else
                              size="24"
                              color="#02b128"
                            />
                            <span style="white-space: nowrap; cursor: pointer"
                              >测试结果</span
                            >
                          </a-space>
                        </button>
                      </div>
                    </div>
                    <div
                      v-if="showNum == 1"
                      style="
                        margin: 16px 20px;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        overflow: auto;
                      "
                    >
                      <div style="display: flex">
                        <a-tag
                          :checked="testCase.id === switchCaseId"
                          checkable
                          :closable="close"
                          size="large"
                          style="border-radius: 5px; margin-right: 10px"
                          v-for="(testCase, index) of testCaseList"
                          :key="index"
                          @click="switchCase(testCase?.id)"
                        >
                          <span style="font-size: 14px"
                            >Case {{ index + 1 }}</span
                          >
                        </a-tag>
                      </div>
                      <div
                        v-for="item of testCase"
                        :key="item.paramName"
                        style="width: 100%; margin-bottom: 7px; margin-top: 7px"
                      >
                        <span style="color: #3c3c4399; font-size: 13px"
                          >{{ item.paramName }}=
                        </span>
                        <a-input
                          :style="{
                            width: '100%',
                            height: '43px',
                            borderRadius: '10px',
                            backgroundColor: '#F2F3F4',
                          }"
                          v-model="item.paramValue"
                          placeholder="请输入测试用例"
                          allow-clear
                        />
                      </div>
                    </div>
                  </div>
                  <div style="height: 91%; overflow: auto">
                    <div
                      v-if="showNum == 2 && isRun && runStatus == 0"
                      style="
                        margin: 16px 20px;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                      "
                    >
                      <div style="display: flex; align-items: center">
                        <span
                          v-if="runResults?.judgeInfo.message === 'Accepted'"
                          style="
                            color: #2db55d;
                            font-size: 22px;
                            margin-right: 15px;
                          "
                          >通过</span
                        >
                        <span
                          v-if="
                            runResults?.judgeInfo.message === 'Wrong Answer'
                          "
                          style="
                            color: #ef4743;
                            font-size: 22px;
                            margin-right: 15px;
                          "
                          >错误解答</span
                        >
                        <span style="color: #3c3c4399; margin-right: 10px"
                          >执行用时：{{ runResults?.judgeInfo.time }}ms</span
                        >
                      </div>
                      <a-divider size="0" :margin="10" />
                      <div style="display: flex">
                        <a-tag
                          :checked="index === indexNumber"
                          checkable
                          :closable="close"
                          size="large"
                          style="border-radius: 5px; margin-right: 10px"
                          v-for="(item, index) of testCaseList"
                          :key="index"
                        >
                          <span style="font-size: 14px">Case {{ index }}</span>
                        </a-tag>
                      </div>
                      <span
                        style="
                          color: #3c3c4399;
                          font-size: 14px;
                          margin-bottom: 10px;
                          margin-top: 20px;
                        "
                        >输入</span
                      >
                      <div
                        style="
                          width: 99%;
                          height: 36px;
                          background-color: #f7f7f8;
                          display: flex;
                          flex-direction: column;
                          align-items: flex-start;
                          justify-content: center;
                          padding: 10px 10px;
                        "
                      >
                        <span
                          style="
                            color: #3c3c4399;
                            font-size: 12px;
                            margin-bottom: 10px;
                          "
                          >{{ inputListName[indexNum][0] }} =</span
                        >
                        <span>{{ testCaseList[indexNum][0] }}</span>
                      </div>
                      <div
                        v-if="inputListName[indexNum][1]"
                        style="
                          width: 99%;
                          height: 36px;
                          background-color: #f7f7f8;
                          display: flex;
                          flex-direction: column;
                          align-items: flex-start;
                          justify-content: center;
                          padding: 10px 10px;
                          margin-top: 10px;
                        "
                      >
                        <span
                          style="
                            color: #3c3c4399;
                            font-size: 12px;
                            margin-bottom: 10px;
                          "
                          >{{ inputListName[indexNum][1] }} =</span
                        >
                        <span>{{ testCaseList[indexNum][1] }}</span>
                      </div>
                      <span
                        style="
                          color: #3c3c4399;
                          font-size: 14px;
                          margin-bottom: 10px;
                          margin-top: 20px;
                        "
                        >预计结果</span
                      >
                      <div
                        style="
                          width: 99%;
                          height: 24px;
                          background-color: #f7f7f8;
                          display: flex;
                          flex-direction: column;
                          align-items: flex-start;
                          justify-content: center;
                          padding: 10px 10px;
                        "
                      >
                        <span>{{ expectedOutput[indexNum] }}</span>
                      </div>
                      <span
                        style="
                          color: #3c3c4399;
                          font-size: 14px;
                          margin-bottom: 10px;
                          margin-top: 20px;
                        "
                        >实际输出</span
                      >
                      <div
                        style="
                          width: 99%;
                          height: 24px;
                          background-color: #f7f7f8;
                          display: flex;
                          flex-direction: column;
                          align-items: flex-start;
                          justify-content: center;
                          padding: 10px 10px;
                        "
                      >
                        <span>{{ actualOutput[indexNum] }}</span>
                      </div>
                    </div>
                    <div
                      v-if="showNum == 2 && isRun && runStatus == 1"
                      style="
                        margin: 16px 20px;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                      "
                    >
                      <div style="display: flex; align-items: center">
                        <span
                          style="
                            color: #ef4743;
                            font-size: 22px;
                            margin-right: 15px;
                          "
                          >测试用例非有效值</span
                        >
                      </div>
                      <a-divider size="0" :margin="10" />
                      <div
                        style="
                          width: 98%;
                          height: 30px;
                          background-color: #feefef;
                          display: flex;
                          flex-direction: column;
                          align-items: flex-start;
                          justify-content: center;
                          padding: 10px 10px;
                          border-radius: 10px;
                        "
                      >
                        <span style="color: #f63636; margin-left: 5px">{{
                          runResults?.error_message
                        }}</span>
                      </div>
                    </div>
                    <div
                      v-if="showNum == 2 && isRun && runStatus == 2"
                      style="
                        margin: 16px 20px;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                      "
                    >
                      <div style="display: flex; align-items: center">
                        <span
                          v-if="runResults.judgeInfo.message == 'Compile Error'"
                          style="
                            color: #ef4743;
                            font-size: 22px;
                            margin-right: 15px;
                          "
                          >编译错误</span
                        >
                        <span
                          v-if="
                            runResults.judgeInfo.message == 'Execution Error'
                          "
                          style="
                            color: #ef4743;
                            font-size: 22px;
                            margin-right: 15px;
                          "
                          >执行错误</span
                        >
                      </div>
                      <a-divider size="0" :margin="10" />
                      <div
                        style="
                          width: 98%;
                          background-color: #feefef;
                          display: flex;
                          flex-direction: column;
                          align-items: flex-start;
                          justify-content: center;
                          padding: 10px 10px;
                          border-radius: 10px;
                        "
                      >
                        <pre
                          style="
                            height: 100%;
                            color: #f63636;
                            line-height: 21px;
                          "
                          >{{ runResults?.error_message }}</pre
                        >
                      </div>
                    </div>
                    <div
                      v-if="showNum == 2 && !isRun"
                      style="
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <span style="color: #3c3c434d">请先执行代码</span>
                    </div>
                  </div>
                </div>
              </template>
              <template #resize-trigger>
                <div class="hover-line">
                  <icon-cut-off-rule
                    style="
                      margin-top: -11px;
                      margin-bottom: -11px;
                      transform: rotate(90deg);
                    "
                  />
                </div>
              </template>
            </a-split>
          </div>
        </template>
        <template #resize-trigger>
          <div class="arrow-cursor">
            <icon-cut-off-rule
              style="margin-right: -12px; margin-left: -12px"
            />
          </div>
        </template>
      </a-split>
    </div>
    <!--    <div class="left">-->
    <!--      <a-card :style="{ width: '100%' }">-->
    <!--        <a-tabs default-active-key="question">-->
    <!--          <a-tab-pane key="question" title="题目">-->
    <!--            <a-scrollbar style="height: 720px; overflow: auto">-->
    <!--              <a-card :bordered="false" v-if="question" :title="question.title">-->
    <!--                <a-descriptions-->
    <!--                  title="判题条件"-->
    <!--                  :column="{ xs: 1, md: 2, lg: 3 }"-->
    <!--                >-->
    <!--                  <a-descriptions-item label="时间限制">-->
    <!--                    <a-tag>{{ question.judgeConfig.timeLimit }}</a-tag>-->
    <!--                  </a-descriptions-item>-->
    <!--                  <a-descriptions-item label="内存限制">-->
    <!--                    <a-tag>{{ question.judgeConfig.memoryLimit }}</a-tag>-->
    <!--                  </a-descriptions-item>-->
    <!--                  <a-descriptions-item label="堆栈限制">-->
    <!--                    <a-tag>{{ question.judgeConfig.stackLimit }}</a-tag>-->
    <!--                  </a-descriptions-item>-->
    <!--                </a-descriptions>-->
    <!--                <MdViewer :value="question.content || ''"></MdViewer>-->
    <!--                <template #extra>-->
    <!--                  <a-space>-->
    <!--                    <a-tag-->
    <!--                      v-for="(tag, index) of question.tags"-->
    <!--                      :key="index"-->
    <!--                      color="green"-->
    <!--                      >{{ tag }}-->
    <!--                    </a-tag>-->
    <!--                  </a-space>-->
    <!--                </template>-->
    <!--              </a-card>-->
    <!--            </a-scrollbar>-->
    <!--          </a-tab-pane>-->
    <!--          <a-tab-pane key="comment" title="评论" disabled> 评论</a-tab-pane>-->
    <!--          <a-tab-pane key="answer" title="答案"> 暂时无法查看答案</a-tab-pane>-->
    <!--        </a-tabs>-->
    <!--      </a-card>-->
    <!--    </div>-->
    <!--    <div class="right">-->
    <!--      <a-card>-->
    <!--        <a-form :model="form" layout="inline">-->
    <!--          <a-form-item field="language" label="编程语言">-->
    <!--            <a-select-->
    <!--              v-model="form.language"-->
    <!--              :style="{ width: '120px' }"-->
    <!--              placeholder="选择编程语言"-->
    <!--            >-->
    <!--              <a-option>java</a-option>-->
    <!--              <a-option>cpp</a-option>-->
    <!--              <a-option>go</a-option>-->
    <!--            </a-select>-->
    <!--          </a-form-item>-->
    <!--        </a-form>-->
    <!--        <CodeEditor-->
    <!--          :val="question?.initialCode"-->
    <!--          :language="form.language"-->
    <!--          :handle-change="changeCode"-->
    <!--        />-->
    <!--      </a-card>-->
    <!--      <a-card>-->
    <!--        <a-collapse>-->
    <!--          <a-collapse-item header="控制台" key="1">-->
    <!--            <template #extra>-->
    <!--              <a-button type="outline" status="warning" @click.stop=""-->
    <!--                >运行 </a-button-->
    <!--              >&nbsp;&nbsp;-->
    <!--              <a-button-->
    <!--                type="outline"-->
    <!--                status="success"-->
    <!--                @click.stop=""-->
    <!--                @click="doSubmit"-->
    <!--                >提交-->
    <!--              </a-button>-->
    <!--            </template>-->
    <!--            <a-tabs default-active-key="test">-->
    <!--              <a-tab-pane key="test" title="测试用例">-->
    <!--                <span>输入</span>-->
    <!--                <a-textarea-->
    <!--                  placeholder="请输入测试用例"-->
    <!--                  allow-clear-->
    <!--                  :auto-size="{-->
    <!--                    minRows: 3,-->
    <!--                    maxRows: 3,-->
    <!--                  }"-->
    <!--                  style="margin-top: 15px"-->
    <!--                />-->
    <!--              </a-tab-pane>-->
    <!--              <a-tab-pane key="result" title="执行结果"> 执行结果</a-tab-pane>-->
    <!--            </a-tabs>-->
    <!--          </a-collapse-item>-->
    <!--        </a-collapse>-->
    <!--      </a-card>-->
    <!--    </div>-->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, withDefaults, defineProps, toRef } from "vue";
import {
  QuestionControllerService,
  QuestionQueryRequest,
  type QuestionSubmitAddRequest,
} from "../../../request";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import IconRun from "@/icon/icon-run.vue";
import IconFlame from "@/icon/icon-flame.vue";
import IconSmallBell from "@/icon/icon-small-bell.vue";
import IconSubmit from "@/icon/icon-submit.vue";
import NoteViewPage from "@/views/question/NoteViewPage.vue";
import AnswerViewPage from "@/views/question/AnswerViewPage.vue";
import QuestionViewPage from "@/components/QuestionViewPage.vue";
import { useStore } from "vuex";
import SetCenter from "@/components/SetCenter.vue";
import { useRoute, useRouter } from "vue-router";
import IconTestCase from "@/icon/icon-test-case.vue";
import IconTestResult from "@/icon/icon-test-result.vue";
import IconCutOffRule from "@/icon/icon-cut-off-rule.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const question = ref();
const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "",
});

const toHomePage = () => {
  window.location.href = "/questionBank"; // 跳转到另一个页面
};

const handleMouseOver = () => {
  buttonStyle.value.backgroundColor = "#E2E2E2";
};

const handleMouseLeave = () => {
  buttonStyle.value.backgroundColor = "#f0f0f0";
};

const testCase = ref();

const buttonStyle = ref({ backgroundColor: "#f0f0f0" });
const smallColor = ref("#737373");
const color = ref("#737373");
const userAvatar = ref(store.state.user?.loginUser?.userAvatar);
const visible = ref(false);
const divHeight = ref(500);
const showNum = ref(1);
const isRotate = ref(false);
const indexNumber = ref(0);
//选中测试用例id
const switchCaseId = ref("1");
const indexNum = ref(0);
const testCaseList = ref([0]);
const inputListName = ref([""]);
const listNum = ref();
const isRun = ref(false);
const runResults = ref();
// 运作状态
const runStatus = ref(0);
// 预计输出
const actualOutput = ref([]);
// 实际输出
const expectedOutput = ref([]);
// 题目描述页面默认标签页
const selectedTab = ref("description");
// 拖动分割条后触发
const currentFirstSize = ref(0.5);
const handleMoveEndFirstSize = () => {
  currentFirstSize.value = leftSplitSize.value;
};

// 拖动分割条后触发
const currentSecondSize = ref(0.68);
const handleMoveEndSecondSize = () => {
  currentSecondSize.value = topSplitSize.value;
};
// 第一个面板是否全屏
const layout_first_full_screen = ref(false);

// 第二个面板是否全屏
const layout_second_first_full_screen = ref(false);

// 第三个面板是否全屏
const layout_second_second_full_screen = ref(false);
// 第二面板分割大小
const topSplitSize = ref(0.6);
// 第一面板分割大小
const leftSplitSize = ref(0.4);

// 给当前面板添加阴影
const firstSwitch = ref(false);
const secondSwitch = ref(false);
const thirdSwitch = ref(false);
const pitchOn = (number: number) => {
  if (number === 1) {
    firstSwitch.value = true;
    secondSwitch.value = false;
    thirdSwitch.value = false;
  }
  if (number === 2) {
    firstSwitch.value = false;
    secondSwitch.value = true;
    thirdSwitch.value = false;
  }
  if (number === 3) {
    firstSwitch.value = false;
    secondSwitch.value = false;
    thirdSwitch.value = true;
  }
};

// 还原到默认的代码模板
const isInitialise = ref(false);
const showInitialise = () => {
  isInitialise.value = !isInitialise.value;
};
const handleClick = () => {
  visible.value = true;
};
const handleCancel = () => {
  visible.value = false;
};

//题库抽屉数据
const questionList = ref([]);
const total = ref(0);
const submitNumber = ref(0);

const searchParams = ref<QuestionQueryRequest>({
  pageSize: 15,
  current: 1,
});

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};
const onPageSizeChange = (pageSize: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageSize: pageSize,
  };
};

const customPageSizeOptions = ref([30, 40, 50]);

const changeCode = (value: string) => {
  form.value.code = value;
};

// 当前代码行数
const line = ref();
const changeLine = (value: string) => {
  line.value = value;
};

// 当前代码列数
const column = ref();
const changeColumn = (value: string) => {
  column.value = value;
};

const loadData = async () => {
  const questionBankRes =
    await QuestionControllerService.listQuestionVoByPageUsingPost(
      searchParams.value
    );
  if (questionBankRes.code === 0) {
    questionList.value = questionBankRes.data.records;
    total.value = questionBankRes.data.total;
  } else {
    message.error("题库加载失败：" + questionBankRes.message);
  }

  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    console.log(res.data);
    question.value = res.data;
    testCaseList.value = question.value?.judgeCase;
    testCase.value = testCaseList.value[0]?.input;
    // codeChange(res.data?.initialCode?.java as string);
    // form.value.code = res.data?.initialCode?.java;
    // console.log(form.value.code);
  } else {
    message.error("加载失败" + res.message);
  }
};

const doSubmit = async () => {
  const res = await QuestionControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value?.id,
  });
  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败");
  }
};

onMounted(() => {
  loadData();
});

// 切换页面
const changeTab = (tab: string) => {
  selectedTab.value = tab;
  router.push({
    path: `/view/question/${question.value?.id}`,
  });
};

//选择测试用例
const switchCase = (id: string) => {
  switchCaseId.value = id;
  let input = testCaseList.value.filter((item) => {
    return item.id === id;
  });
  testCase.value = input[0].input;
};
</script>

<style scoped>
#DoQuestionOnline {
  background-color: #f0f0f0;
  overflow: hidden;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
}

.left {
  width: 40%;
}

.right {
  width: 60%;
}

.logo {
  height: 36px;
  cursor: pointer;
  margin-left: 15px;
}

/* 提交按钮 */
.submitButton {
  border-radius: 0 5px 5px 0; /* 设置圆角大小 */
  background-color: #e7e7e7;
  border: none;
  outline: none;
  width: 100px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.submitButton:hover {
  background-color: #e2e2e2;
}

/* 运行按钮 */
.runButton {
  background-color: #e7e7e7;
  border-radius: 5px 0 0 5px; /* 设置圆角大小 */
  border: none;
  outline: none;
  width: 100px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-right: 1px solid #f0f0f0;
}

.runButton:hover {
  background-color: #e2e2e2;
}

.icon-css-small {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 5px;
  color: #0000008c;
}

.icon-css-small:hover {
  background-color: #e7e7e7;
  color: black;
}

.layout-first {
  position: relative;
  overflow: hidden;
  margin-left: 10px;
  margin-right: 1px;
  border-radius: 10px;
  background: #ffffff;
  height: calc(94vh - 1px);
  margin-top: 1px;
}

.layout-first-box-shadow {
  box-shadow: 0 0 1px rgba(0, 0, 0, 1);
}

.layout-first-full-screen {
  z-index: 1;
  position: absolute;
  top: 5vh;
  left: 0;
  right: 10px;
  height: 94vh;
}

.custom-button {
  border-radius: 5px; /* 设置圆角大小 */
  background-color: #fafafa;
  border: none;
  outline: none;
  margin-left: 5px;
}

.custom-button:hover {
  background-color: #f0f0f0;
}

.active-tab {
  border-radius: 5px; /* 设置圆角大小 */
  background-color: #fafafa;
  border: none;
  outline: none;
  color: #0000008c;
  margin-left: 5px;
}

.active-tab:hover {
  background-color: #f0f0f0;
}

.layout-second-first {
  overflow: hidden;
  border-radius: 10px;
  background: #ffffff;
  height: calc(100% - 2px);
  margin: 1px 10px 1px 2px;
}

.layout-second-first-box-shadow {
  box-shadow: 0 0 1px rgba(0, 0, 0, 1);
}

.layout-second-first-full-screen {
  z-index: 1;
  position: absolute;
  top: 5vh;
  left: 10px;
  right: 0;
  height: 94vh;
}

.layout-second-second {
  border-radius: 10px;
  background: #ffffff;
  overflow: hidden;
  height: calc(100% - 2px);
  margin: 1px 10px 1px 2px;
}

.layout-second-second-box-shadow {
  box-shadow: 0 0 1px rgba(0, 0, 0, 1);
}

.layout-second-second-full-screen {
  z-index: 1;
  position: absolute;
  top: 5vh;
  left: 10px;
  right: 0;
  height: 94vh;
}

.language {
  background-color: transparent;
  border: none;
  border-radius: 5px;
  padding: 3px 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.language:hover {
  background-color: #f5f5f5;
}
</style>
