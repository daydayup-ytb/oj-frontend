<template>
  <div id="questionsView">
    <a-row class="grid-demo">
      <a-col :span="17">
        <div>
          <a-form :model="searchParams" layout="inline">
            <a-space
              :size="-28"
              style="display: flex; justify-content: center; margin-left: -8px"
            >
              <a-form-item>
                <a-button
                  style="
                    width: 103px;
                    height: 32px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-radius: 5px;
                  "
                  @click="rotateQuestionListIcon"
                  >题单
                  <icon-down :size="16" v-if="!isRotatedQuestionListIcon" />
                  <icon-down :size="16" v-else :rotate="180" />
                </a-button>
              </a-form-item>
              <a-form-item>
                <a-trigger
                  position="bl"
                  :popup-visible="isShowedDifficultyOptions"
                >
                  <a-button
                    style="
                      width: 103px;
                      height: 32px;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      border-radius: 5px;
                    "
                    @click="rotateDifficultyIcon"
                    >难度
                    <icon-down
                      :size="16"
                      :class="{
                        'rotate-clockwise': isRotatedDifficultyIcon,
                        'rotate-counterclockwise': !isRotatedDifficultyIcon,
                      }"
                    />
                  </a-button>
                  <template #content>
                    <div class="demo-basic">
                      <button
                        class="transparent-btn"
                        @click="doFilterDifficulty(1)"
                      >
                        <span style="color: #00af9b">简单</span>
                        <img
                          v-if="checkedDifficulty === 1"
                          :src="require('@/assets/对.png')"
                          alt=""
                          class="small-image"
                        />
                      </button>
                      <button
                        class="transparent-btn"
                        @click="doFilterDifficulty(2)"
                      >
                        <span style="color: #ffb800">中等</span>
                        <img
                          v-if="checkedDifficulty === 2"
                          :src="require('@/assets/对.png')"
                          alt=""
                          class="small-image"
                        />
                      </button>
                      <button
                        class="transparent-btn"
                        @click="doFilterDifficulty(3)"
                      >
                        <span style="color: #ff2d55">困难</span>
                        <img
                          v-if="checkedDifficulty === 3"
                          :src="require('@/assets/对.png')"
                          alt=""
                          class="small-image"
                        />
                      </button>
                    </div>
                  </template>
                </a-trigger>
              </a-form-item>
              <a-form-item>
                <a-trigger position="bl" :popup-visible="isShowedStateOptions">
                  <a-button
                    style="
                      width: 103px;
                      height: 32px;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      border-radius: 5px;
                    "
                    @click="rotateStateIcon"
                    >状态
                    <icon-down
                      :size="16"
                      :class="{
                        'rotate-clockwise': isRotatedStateIcon,
                        'rotate-counterclockwise': !isRotatedStateIcon,
                      }"
                    />
                  </a-button>
                  <template #content>
                    <div class="demo-basic">
                      <button class="transparent-btn" @click="doFilterState(1)">
                        <div style="display: flex; align-content: center">
                          <img
                            :src="require('@/assets/横杠.png')"
                            alt=""
                            style="margin-right: 5px"
                          />
                          <span style="color: #262626">未开始</span>
                        </div>
                        <img
                          v-if="checkedState === 1"
                          :src="require('@/assets/对.png')"
                          alt=""
                          class="small-image"
                        />
                      </button>
                      <button class="transparent-btn" @click="doFilterState(2)">
                        <div style="display: flex; align-content: center">
                          <img
                            :src="require('@/assets/对号.png')"
                            alt=""
                            style="margin-right: 5px"
                          />
                          <span style="color: #262626">已解答</span>
                        </div>
                        <img
                          v-if="checkedState === 2"
                          :src="require('@/assets/对.png')"
                          alt=""
                          class="small-image"
                        />
                      </button>
                      <button class="transparent-btn" @click="doFilterState(3)">
                        <div style="display: flex; align-content: center">
                          <img
                            :src="require('@/assets/尝试过.png')"
                            alt=""
                            style="margin-right: 5px; width: 16px; height: 16px"
                          />
                          <span style="color: #262626">尝试过</span>
                        </div>
                        <img
                          v-if="checkedState === 3"
                          :src="require('@/assets/对.png')"
                          alt=""
                          class="small-image"
                        />
                      </button>
                    </div>
                  </template>
                </a-trigger>
              </a-form-item>
              <a-form-item>
                <a-trigger
                  trigger="click"
                  :unmount-on-close="false"
                  position="bl"
                  @hide="closeTagList"
                  @show="showTagList"
                >
                  <a-button
                    style="
                      width: 103px;
                      height: 32px;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      border-radius: 5px;
                    "
                    @click="rotateTagIcon"
                    >标签
                    <a-tag
                      v-if="checkedTagList.length != 0"
                      color="#D9DBDE"
                      style="
                        color: #262626bf;
                        border-radius: 100%;
                        transform: scale(0.8);
                      "
                      >{{ checkedTagList.length }}
                    </a-tag>
                    <icon-down
                      :size="16"
                      :class="{
                        'rotate-clockwise': isRotatedTagIcon,
                        'rotate-counterclockwise': !isRotatedTagIcon,
                      }"
                    />
                  </a-button>
                  <template #content>
                    <div
                      style="
                        margin-top: 4px;
                        padding: 10px;
                        width: 300px;
                        height: 472px;
                        background-color: var(--color-bg-popup);
                        border-radius: 4px;
                        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
                        text-align: center;
                      "
                    >
                      <a-input
                        v-model:value="Tag"
                        style="border-radius: 5px; margin-bottom: 10px"
                        :style="{ width: '300px' }"
                        placeholder="筛选标签"
                        allow-clear
                        @input="filterTag"
                        @clear="closeTagsList"
                      >
                        <template #prefix>
                          <icon-search />
                        </template>
                      </a-input>
                      <div
                        style="width: 310px; height: 400px"
                        class="outer-div"
                      >
                        <div style="text-align: left; margin-bottom: 10px">
                          <a-tag
                            checkable
                            :checked="true"
                            style="
                              border-radius: 10px;
                              margin-right: 5px;
                              margin-bottom: 5px;
                            "
                            v-for="(tag, index) of filteredTagList"
                            :key="index"
                            :color="
                              checkedTagList.includes(tag) ? '#165dff' : 'gray'
                            "
                            @click="doTagCheck(tag)"
                          >
                            {{ tag }}
                          </a-tag>
                        </div>
                        <a-space
                          direction="vertical"
                          style="margin-bottom: 15px"
                        >
                          <div
                            style="
                              display: flex;
                              align-items: center;
                              justify-content: space-between;
                            "
                          >
                            <span style="color: #262626bf">基本</span>
                            <icon-down
                              @click="rotateBasicIcon"
                              style="color: #636c7b; cursor: pointer"
                              :class="{
                                'rotate-clockwise': isRotatedBasicIcon,
                                'rotate-counterclockwise': !isRotatedBasicIcon,
                              }"
                            />
                          </div>
                          <div
                            style="
                              display: flex;
                              flex-wrap: wrap;
                              align-items: center;
                              width: 300px;
                            "
                          >
                            <a-tag
                              checkable
                              :checked="true"
                              style="
                                border-radius: 10px;
                                margin-right: 5px;
                                margin-bottom: 5px;
                              "
                              v-for="(tag, index) of basicTagList.slice(
                                0,
                                showedBasicTagListNum
                              )"
                              :key="index"
                              :color="
                                checkedTagList.includes(tag)
                                  ? '#165dff'
                                  : 'gray'
                              "
                              @click="doTagCheck(tag)"
                            >
                              {{ tag }}
                            </a-tag>
                          </div>
                        </a-space>
                        <a-space
                          direction="vertical"
                          style="margin-bottom: 15px"
                        >
                          <div
                            style="
                              display: flex;
                              align-items: center;
                              justify-content: space-between;
                            "
                          >
                            <span style="color: #262626bf">算法</span>
                            <icon-down
                              @click="rotateAlgorithmIcon"
                              style="color: #636c7b; cursor: pointer"
                              :class="{
                                'rotate-clockwise': isRotatedAlgorithmIcon,
                                'rotate-counterclockwise':
                                  !isRotatedAlgorithmIcon,
                              }"
                            />
                          </div>
                          <div
                            style="
                              display: flex;
                              flex-wrap: wrap;
                              align-items: center;
                              width: 300px;
                            "
                          >
                            <a-tag
                              checkable
                              :checked="true"
                              style="
                                border-radius: 10px;
                                margin-right: 5px;
                                margin-bottom: 5px;
                              "
                              v-for="(tag, index) of algorithmTagList.slice(
                                0,
                                showedAlgorithmTagListNum
                              )"
                              :key="index"
                              :color="
                                checkedTagList.includes(tag)
                                  ? '#165dff'
                                  : 'gray'
                              "
                              @click="doTagCheck(tag)"
                            >
                              {{ tag }}
                            </a-tag>
                          </div>
                        </a-space>
                        <a-space
                          direction="vertical"
                          style="margin-bottom: 15px"
                        >
                          <div
                            style="
                              display: flex;
                              align-items: center;
                              justify-content: space-between;
                            "
                          >
                            <span style="color: #262626bf">基础数据结构</span>
                            <icon-down
                              @click="rotateDataStructureIcon"
                              style="color: #636c7b; cursor: pointer"
                              :class="{
                                'rotate-clockwise': isRotatedDataStructureIcon,
                                'rotate-counterclockwise':
                                  !isRotatedDataStructureIcon,
                              }"
                            />
                          </div>
                          <div
                            style="
                              display: flex;
                              flex-wrap: wrap;
                              align-items: center;
                              width: 300px;
                            "
                          >
                            <a-tag
                              checkable
                              :checked="true"
                              style="
                                border-radius: 10px;
                                margin-right: 5px;
                                margin-bottom: 5px;
                              "
                              v-for="(tag, index) of dataStructureTagList.slice(
                                0,
                                showedDataStructureTagListNum
                              )"
                              :key="index"
                              :color="
                                checkedTagList.includes(tag)
                                  ? '#165dff'
                                  : 'gray'
                              "
                              @click="doTagCheck(tag)"
                            >
                              {{ tag }}
                            </a-tag>
                          </div>
                        </a-space>
                        <a-space
                          direction="vertical"
                          style="margin-bottom: 15px"
                        >
                          <div
                            style="
                              display: flex;
                              align-items: center;
                              justify-content: space-between;
                            "
                          >
                            <span style="color: #262626bf">高级数据结构</span>
                            <icon-down
                              @click="rotateAdvancedDataStructureIcon"
                              style="color: #636c7b; cursor: pointer"
                              :class="{
                                'rotate-clockwise':
                                  isRotatedAdvancedDataStructureIcon,
                                'rotate-counterclockwise':
                                  !isRotatedAdvancedDataStructureIcon,
                              }"
                            />
                          </div>
                          <div
                            style="
                              display: flex;
                              flex-wrap: wrap;
                              align-items: center;
                              width: 300px;
                            "
                          >
                            <a-tag
                              checkable
                              :checked="true"
                              style="
                                border-radius: 10px;
                                margin-right: 5px;
                                margin-bottom: 5px;
                              "
                              v-for="(
                                tag, index
                              ) of advancedDataStructureTagList.slice(
                                0,
                                showedAdvancedDataStructureTagListNum
                              )"
                              :key="index"
                              :color="
                                checkedTagList.includes(tag)
                                  ? '#165dff'
                                  : 'gray'
                              "
                              @click="doTagCheck(tag)"
                            >
                              {{ tag }}
                            </a-tag>
                          </div>
                        </a-space>
                        <a-space
                          direction="vertical"
                          style="margin-bottom: 15px"
                        >
                          <div
                            style="
                              display: flex;
                              align-items: center;
                              justify-content: space-between;
                            "
                          >
                            <span style="color: #262626bf">技巧</span>
                            <icon-down
                              @click="rotateSkillIcon"
                              style="color: #636c7b; cursor: pointer"
                              :class="{
                                'rotate-clockwise': isRotatedSkillIcon,
                                'rotate-counterclockwise': !isRotatedSkillIcon,
                              }"
                            />
                          </div>
                          <div
                            style="
                              display: flex;
                              flex-wrap: wrap;
                              align-items: center;
                              width: 300px;
                            "
                          >
                            <a-tag
                              checkable
                              :checked="true"
                              style="
                                border-radius: 10px;
                                margin-right: 5px;
                                margin-bottom: 5px;
                              "
                              v-for="(tag, index) of skillTagList.slice(
                                0,
                                showedSkillTagListNum
                              )"
                              :key="index"
                              :color="
                                checkedTagList.includes(tag)
                                  ? '#165dff'
                                  : 'gray'
                              "
                              @click="doTagCheck(tag)"
                            >
                              {{ tag }}
                            </a-tag>
                          </div>
                        </a-space>
                        <a-space
                          direction="vertical"
                          style="margin-bottom: 15px"
                        >
                          <div
                            style="
                              display: flex;
                              align-items: center;
                              justify-content: space-between;
                            "
                          >
                            <span style="color: #262626bf">数学</span>
                            <icon-down
                              @click="rotateArithIcon"
                              style="color: #636c7b; cursor: pointer"
                              :class="{
                                'rotate-clockwise': isRotatedArithIcon,
                                'rotate-counterclockwise': !isRotatedArithIcon,
                              }"
                            />
                          </div>
                          <div
                            style="
                              display: flex;
                              flex-wrap: wrap;
                              align-items: center;
                              width: 300px;
                            "
                          >
                            <a-tag
                              checkable
                              :checked="true"
                              style="
                                border-radius: 10px;
                                margin-right: 5px;
                                margin-bottom: 5px;
                              "
                              v-for="(tag, index) of arithTagList.slice(
                                0,
                                showedArithTagListNum
                              )"
                              :key="index"
                              :color="
                                checkedTagList.includes(tag)
                                  ? '#165dff'
                                  : 'gray'
                              "
                              @click="doTagCheck(tag)"
                            >
                              {{ tag }}
                            </a-tag>
                          </div>
                        </a-space>
                        <a-space direction="vertical">
                          <div
                            style="
                              display: flex;
                              align-items: center;
                              justify-content: space-between;
                            "
                          >
                            <span style="color: #262626bf">其他</span>
                            <icon-down
                              @click="rotateOtherIcon"
                              style="color: #636c7b; cursor: pointer"
                              :class="{
                                'rotate-clockwise': isRotatedOtherIcon,
                                'rotate-counterclockwise': !isRotatedOtherIcon,
                              }"
                            />
                          </div>
                          <div
                            style="
                              display: flex;
                              flex-wrap: wrap;
                              align-items: center;
                              width: 300px;
                              margin-bottom: 10px;
                            "
                          >
                            <a-tag
                              checkable
                              :checked="true"
                              style="
                                border-radius: 10px;
                                margin-right: 5px;
                                margin-bottom: 5px;
                              "
                              v-for="(tag, index) of otherTagList.slice(
                                0,
                                showedOtherTagListNum
                              )"
                              :key="index"
                              :color="
                                checkedTagList.includes(tag)
                                  ? '#165dff'
                                  : 'gray'
                              "
                              @click="doTagCheck(tag)"
                            >
                              {{ tag }}
                            </a-tag>
                          </div>
                        </a-space>
                      </div>
                      <a-divider style="margin-top: 1px; margin-bottom: 10px" />
                      <div
                        style="
                          display: flex;
                          align-items: center;
                          justify-content: space-between;
                        "
                      >
                        <span
                          v-if="!isShowedAllTagList"
                          style="color: #007aff; cursor: pointer"
                          @click="showAllTagList"
                          >展开全部</span
                        >
                        <span
                          v-else
                          style="color: #007aff; cursor: pointer"
                          @click="showAllTagList"
                          >收起全部</span
                        >
                        <div style="color: #3c3c4399">
                          <icon-loop
                            size="16"
                            style="cursor: pointer"
                            @click="resetTagList"
                          />
                          <span style="cursor: pointer" @click="resetTagList"
                            >重置</span
                          >
                        </div>
                      </div>
                    </div>
                  </template>
                </a-trigger>
              </a-form-item>
              <a-form-item>
                <a-input
                  :default-value="formattedSearchText"
                  style="border-radius: 5px"
                  :style="{ width: '250px' }"
                  placeholder="请输入题目标题！"
                  @input="onSearch"
                >
                  <template #prefix>
                    <icon-search />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-trigger
                  trigger="click"
                  :unmount-on-close="false"
                  position="br"
                >
                  <a-button style="border-radius: 5px">
                    <icon-settings
                      :size="20"
                      style="margin-left: -5px; margin-right: -5px"
                    />
                  </a-button>
                  <template #content>
                    <div class="demo-basic">
                      <button class="transparent-but">
                        <button
                          v-if="!display"
                          class="transparent-butt"
                          @click="doSelect"
                        ></button>
                        <button
                          v-if="display"
                          class="transparent-butto"
                          @click="doSelect"
                        >
                          <img
                            :src="require('@/assets/白对.png')"
                            alt=""
                            style="margin-top: -2px; margin-left: -6px"
                          />
                        </button>
                        <span>显示标签</span>
                      </button>
                      <!--                      <button class="transparent-but">-->
                      <!--                        <button class="transparent-butt"></button>-->
                      <!--                        <span>显示企业</span>-->
                      <!--                      </button>-->
                    </div>
                  </template>
                </a-trigger>
              </a-form-item>
              <a-form-item>
                <button
                  style="
                    width: 115px;
                    height: 32px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-radius: 5px;
                    border: none; /* 隐藏边框 */
                    background-color: transparent; /* 设置背景为透明 */
                    cursor: pointer; /* 设置鼠标指针为手型 */
                    margin-left: 5px;
                  "
                >
                  <a-avatar
                    :size="30"
                    :style="{ backgroundColor: '#3370ff' }"
                    style="
                      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                      margin-left: 5px;
                    "
                  >
                    <img
                      alt="avatar"
                      :src="require('@/assets/随机.png')"
                      style="
                        transform: scale(0.8);
                        margin-top: -2px;
                        margin-left: -1px;
                      "
                      @click="doRandomQuestion"
                    />
                  </a-avatar>
                  <span
                    style="margin-left: 10px; color: #3370ff"
                    @click="doRandomQuestion"
                    >随机一题</span
                  >
                </button>
              </a-form-item>
            </a-space>
          </a-form>
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <div>
              <a-tag
                closable
                v-if="checkedDifficulty === 1"
                style="
                  color: #00af9b;
                  margin-top: 5px;
                  margin-left: 8px;
                  border-radius: 15px;
                "
                @close="clearDifficultyTag"
                >简单
              </a-tag>
              <a-tag
                closable
                v-if="checkedDifficulty === 2"
                style="
                  color: #ffb800;
                  margin-top: 5px;
                  margin-left: 8px;
                  border-radius: 15px;
                "
                @close="clearDifficultyTag"
                >中等
              </a-tag>
              <a-tag
                closable
                v-if="checkedDifficulty === 3"
                style="
                  color: #ff2d55;
                  margin-top: 5px;
                  margin-left: 8px;
                  border-radius: 15px;
                "
                @close="clearDifficultyTag"
                >困难
              </a-tag>
              <a-tag
                closable
                v-if="checkedState === 1"
                style="
                  color: #262626;
                  margin-top: 5px;
                  margin-left: 8px;
                  border-radius: 15px;
                "
                @close="clearStateTag"
                ><img
                  :src="require('@/assets/横杠.png')"
                  alt=""
                  style="margin-right: 5px"
                />未开始
              </a-tag>
              <a-tag
                closable
                v-if="checkedState === 2"
                style="
                  color: #262626;
                  margin-top: 5px;
                  margin-left: 8px;
                  border-radius: 15px;
                "
                @close="clearStateTag"
                ><img
                  :src="require('@/assets/对号.png')"
                  alt=""
                  style="margin-right: 5px"
                />已解答
              </a-tag>
              <a-tag
                closable
                v-if="checkedState === 3"
                style="
                  color: #262626;
                  margin-top: 5px;
                  margin-left: 8px;
                  border-radius: 15px;
                "
                @close="clearStateTag"
                ><img
                  :src="require('@/assets/尝试过.png')"
                  alt=""
                  style="margin-right: 5px; width: 16px; height: 16px"
                />尝试过
              </a-tag>
              <a-tag
                closable
                style="margin-top: 5px; margin-left: 8px; border-radius: 15px"
                v-for="(tag, index) of checkedTagList"
                :key="index"
                @close="clearTag(tag)"
              >
                {{ tag }}
              </a-tag>
            </div>
            <span
              v-if="
                checkedDifficulty != 0 ||
                checkedState != 0 ||
                checkedTagList.length != 0
              "
              style="color: #3c3c4399; cursor: pointer"
              @click="resetCheckedTagList"
              ><icon-loop
                :size="16"
                style="margin-right: 2px; cursor: pointer"
              />重置</span
            >
          </div>
          <div
            style="
              width: 900px;
              background-color: #ffffff;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 10px;
              overflow: hidden; /* 添加这一行以避免斑马纹效果在边缘溢出 */
              margin: -10px auto 15px;
            "
          >
            <a-space direction="vertical">
              <div
                style="
                  display: flex;
                  align-items: center;
                  height: 44px;
                  margin-top: 10px;
                "
              >
                <div
                  style="
                    width: 84px;
                    display: flex;
                    margin-left: 20px;
                    color: #8a8a8e;
                  "
                >
                  状态
                </div>
                <div style="width: 298px; display: flex">
                  <button
                    class="custom-but"
                    @click="doQuestionSorting(numberQuestion)"
                  >
                    题目
                    <a-space direction="vertical" :size="-11">
                      <icon-caret-up v-if="upQuestion" :size="12" />
                      <icon-caret-down v-if="downQuestion" :size="12" />
                    </a-space>
                  </button>
                </div>
                <div style="width: 136px; display: flex; color: #8a8a8e">
                  <button class="custom-but">
                    题解
                    <a-space direction="vertical" :size="-11">
                      <icon-caret-up :size="12" />
                      <icon-caret-down :size="12" />
                    </a-space>
                  </button>
                </div>
                <div style="width: 180px; display: flex">
                  <button
                    class="custom-but"
                    @click="sortByPassRate(numberPassRate)"
                  >
                    通过率
                    <a-space direction="vertical" :size="-11">
                      <icon-caret-up v-if="upPass_rate" :size="12" />
                      <icon-caret-down v-if="downPass_rate" :size="12" />
                    </a-space>
                  </button>
                </div>
                <div style="width: 148px; display: flex">
                  <button
                    class="custom-but"
                    @click="doDifficultySorting(numberDifficulty)"
                  >
                    难度
                    <a-space direction="vertical" :size="-11">
                      <icon-caret-up v-if="upDifficulty" :size="12" />
                      <icon-caret-down v-if="downDifficulty" :size="12" />
                    </a-space>
                  </button>
                </div>
              </div>
              <a-divider style="margin-top: -10px; margin-bottom: -10px" />
              <a-list
                style="margin-top: -17px; margin-bottom: 25px"
                :data="questionList"
                :bordered="false"
                :split="false"
              >
                <template #item="{ item, index }">
                  <a-list-item
                    :style="{
                      background: index % 2 === 1 ? '#F7F8FA' : 'transparent',
                      borderRadius: '10px',
                    }"
                  >
                    <a-list-item-meta>
                      <template #description>
                        <div
                          :style="{ height: dynamicHeight + 'px' }"
                          style="display: flex; align-items: center"
                        >
                          <div style="width: 84px; display: flex">
                            <a-trigger
                              auto-fit-position
                              :unmount-on-close="false"
                              ><img
                                style="
                                  width: 19px;
                                  height: 19px;
                                  cursor: pointer;
                                  margin-top: 3px;
                                "
                                v-if="item.state == 3"
                                alt="avatar"
                                :src="require('@/assets/通过.png')"
                              />
                              <template #content>
                                <div class="adopt-basic">已解答</div>
                              </template>
                            </a-trigger>
                            <a-trigger
                              auto-fit-position
                              :unmount-on-close="false"
                            >
                              <img
                                style="
                                  width: 18px;
                                  height: 18px;
                                  cursor: pointer;
                                  margin-top: 3px;
                                "
                                v-if="item.state == 2"
                                alt="avatar"
                                :src="require('@/assets/尝试过.png')"
                              />
                              <template #content>
                                <div class="Attempted-basic">尝试过</div>
                              </template>
                            </a-trigger>
                          </div>
                          <div style="width: 300px; display: flex">
                            <a-space direction="vertical" :size="1">
                              <a-link
                                :href="`/question/doOnline/${item.id}`"
                                :hoverable="false"
                                ><span class="hover-effect">
                                  {{ item.title }}
                                </span>
                              </a-link>
                              <a-space v-if="display">
                                <a-tag
                                  v-for="(tag, index) of item.tags"
                                  :key="index"
                                  :color="
                                    checkedTagList.includes(tag)
                                      ? '#165dff'
                                      : 'gray'
                                  "
                                  style="border-radius: 20px"
                                >
                                  {{ tag }}
                                </a-tag>
                              </a-space>
                            </a-space>
                          </div>
                          <div style="width: 145px; display: flex">
                            1
                            <icon-player
                              size="18"
                              style="margin-left: 5px; margin-top: 2px"
                            />
                          </div>
                          <div style="width: 180px; display: flex">
                            <a-statistic
                              :value="item.passRate"
                              :precision="2"
                              :value-style="{
                                color: '#262626',
                                fontSize: '14px',
                              }"
                            >
                              <template #suffix>%</template>
                            </a-statistic>
                          </div>
                          <div style="width: 148px; display: flex">
                            <span
                              v-if="item.difficulty === 1"
                              style="color: #00af9b"
                            >
                              简单
                            </span>
                            <span
                              v-else-if="item.difficulty === 2"
                              style="color: #ffb800"
                            >
                              中等
                            </span>
                            <span
                              v-else-if="item.difficulty === 3"
                              style="color: #ff2d55"
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
        </div>
        <div style="display: flex; justify-content: flex-end">
          <a-pagination
            :total="total"
            show-jumper
            show-page-size
            :base-size="5"
            :buffer-size="2"
            @change="onPageChange"
            @pageSizeChange="onPageSizeChange"
            :pageSize="pageSize"
            :current="current"
            :pageSizeOptions="customPageSizeOptions"
            :page-item-style="{
              borderRadius: '5px',
              backgroundColor: '#F2F3F4',
            }"
            :active-page-item-style="{
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#FFFFFF',
              color: '#1a1a1a',
              borderRadius: '5px',
            }"
          >
            <template #page-item="{ page }"> {{ page }}</template>
            <template #page-item-step="{ type }">
              <icon-right
                :style="
                  type === 'previous'
                    ? { transform: `rotate(180deg)` }
                    : undefined
                "
              />
            </template>
            <template #page-item-ellipsis>
              <icon-sun-fill />
            </template>
          </a-pagination>
        </div>
      </a-col>
      <a-col :span="7">
        <div class="right">
          <div class="calendar">
            <calendar-collapse>
              <template #header>
                <calendar-header />
              </template>
              <template #content>
                <calendar-week />
                <CalendarTable />
              </template>
            </calendar-collapse>
          </div>
          <div v-if="store.state.user?.loginUser?.id" style="margin-left: 10px">
            <div
              style="
                width: 270px;
                height: 152px;
                border-radius: 10px;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.125);
              "
            >
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 16px;
                "
              >
                <span>当前进度</span>
                <div style="display: flex; justify-content: center">
                  <a-space></a-space>
                  <a-button
                    style="
                      width: 108px;
                      height: 24px;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      border-radius: 5px 0 0 5px; /* 左上角和左下角为圆角 */
                      font-size: 12px; /* 调整字体大小 */
                      margin-right: 1px; /* 添加右边距 */
                    "
                    >我的进度
                    <icon-down />
                  </a-button>
                  <a-button
                    style="
                      border-radius: 0 5px 5px 0; /* 左上角和左下角为圆角 */
                      width: 22px;
                      height: 24px;
                    "
                  >
                    <icon-settings
                      :size="20"
                      style="margin-left: -7px; margin-right: -7px"
                    />
                  </a-button>
                </div>
              </div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 0 20px 0 20px;
                "
              >
                <div class="progress-container">
                  <a-progress
                    type="circle"
                    :stroke-width="3"
                    :show-text="false"
                    percent="0.22"
                    :style="{ transform: 'scale(1.18)' }"
                    :size="'large'"
                    :color="{ '0%': '#FFA116', '100%': '#FFA116' }"
                  />
                  <div class="progress-text" v-if="true">
                    <span style="font-size: 12px; color: #3c3c4399">全部</span>
                    <span
                      style="
                        font-size: 24px;
                        color: #1c1c1c;
                        font-weight: bold;
                        margin-top: 3px;
                      "
                      >11</span
                    >
                    <a-divider margin="0" />
                    <span
                      style="font-size: 12px; color: #3c3c434d; margin-top: 3px"
                      >200</span
                    >
                  </div>
                  <!--                  <div-->
                  <!--                    class="progress-text"-->
                  <!--                    style="cursor: default"-->
                  <!--                    v-if="false"-->
                  <!--                  >-->
                  <!--                    <a-statistic-->
                  <!--                      value="0.22 * 100"-->
                  <!--                      :precision="1"-->
                  <!--                      :value-style="{-->
                  <!--                        color: '#1c1c1c',-->
                  <!--                        fontSize: '19px',-->
                  <!--                        fontWeight: 'bold',-->
                  <!--                      }"-->
                  <!--                    >-->
                  <!--                      <template #suffix>%</template>-->
                  <!--                    </a-statistic>-->
                  <!--                    <span-->
                  <!--                      style="-->
                  <!--                        font-size: 12px;-->
                  <!--                        color: #3c3c4399;-->
                  <!--                        white-space: nowrap;-->
                  <!--                      "-->
                  <!--                      >提交通过率</span-->
                  <!--                    >-->
                  <!--                  </div>-->
                  <!--                  <div-->
                  <!--                    class="progress-text"-->
                  <!--                    v-if="briefnessSubmissionPassRateNumShow"-->
                  <!--                  >-->
                  <!--                    <a-statistic-->
                  <!--                      :value="briefnessSubmissionPassRateNum * 100"-->
                  <!--                      :precision="1"-->
                  <!--                      :value-style="{-->
                  <!--                        color: '#00af9b',-->
                  <!--                        fontSize: '19px',-->
                  <!--                        fontWeight: 'bold',-->
                  <!--                      }"-->
                  <!--                    >-->
                  <!--                      <template #suffix>%</template>-->
                  <!--                    </a-statistic>-->
                  <!--                    <span-->
                  <!--                      style="-->
                  <!--                        font-size: 12px;-->
                  <!--                        color: #3c3c4399;-->
                  <!--                        white-space: nowrap;-->
                  <!--                      "-->
                  <!--                      >提交通过率</span-->
                  <!--                    >-->
                  <!--                  </div>-->
                  <!--                  <div-->
                  <!--                    class="progress-text"-->
                  <!--                    v-if="mediumSubmissionPassRateNumShow"-->
                  <!--                  >-->
                  <!--                    <a-statistic-->
                  <!--                      :value="mediumSubmissionPassRateNum * 100"-->
                  <!--                      :precision="1"-->
                  <!--                      :value-style="{-->
                  <!--                        color: '#ffb800',-->
                  <!--                        fontSize: '19px',-->
                  <!--                        fontWeight: 'bold',-->
                  <!--                      }"-->
                  <!--                    >-->
                  <!--                      <template #suffix>%</template>-->
                  <!--                    </a-statistic>-->
                  <!--                    <span-->
                  <!--                      style="-->
                  <!--                        font-size: 12px;-->
                  <!--                        color: #3c3c4399;-->
                  <!--                        white-space: nowrap;-->
                  <!--                      "-->
                  <!--                      >提交通过率</span-->
                  <!--                    >-->
                  <!--                  </div>-->
                  <!--                  <div-->
                  <!--                    class="progress-text"-->
                  <!--                    v-if="difficultySubmissionPassRateNumShow"-->
                  <!--                  >-->
                  <!--                    <a-statistic-->
                  <!--                      :value="difficultySubmissionPassRateNum * 100"-->
                  <!--                      :precision="1"-->
                  <!--                      :value-style="{-->
                  <!--                        color: '#ff2d55',-->
                  <!--                        fontSize: '19px',-->
                  <!--                        fontWeight: 'bold',-->
                  <!--                      }"-->
                  <!--                    >-->
                  <!--                      <template #suffix>%</template>-->
                  <!--                    </a-statistic>-->
                  <!--                    <span-->
                  <!--                      style="-->
                  <!--                        font-size: 12px;-->
                  <!--                        color: #3c3c4399;-->
                  <!--                        white-space: nowrap;-->
                  <!--                      "-->
                  <!--                      >提交通过率</span-->
                  <!--                    >-->
                  <!--                  </div>-->
                </div>
                <div style="display: flex; gap: 15px; height: 68px">
                  <div style="width: 24px; cursor: pointer">
                    <span style="color: #00af9b; font-size: 12px">简单</span>
                    <div style="margin-top: 10px; font-weight: bold">11</div>
                    <a-divider :margin="4" />
                    <div style="font-size: 12px; color: #3c3c434d">22</div>
                  </div>
                  <div style="width: 24px; cursor: pointer">
                    <span style="color: #ffb800; font-size: 12px">中等</span>
                    <div style="margin-top: 10px; font-weight: bold">33</div>
                    <a-divider :margin="4" />
                    <div style="font-size: 12px; color: #3c3c434d">100</div>
                  </div>
                  <div style="width: 24px; cursor: pointer">
                    <span style="color: #ff2d55; font-size: 12px">困难</span>
                    <div style="margin-top: 10px; font-weight: bold">20</div>
                    <a-divider :margin="4" />
                    <div style="font-size: 12px; color: #3c3c434d">80</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  QuestionControllerService,
  QuestionQueryRequest,
} from "../../../req/question";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";
import IconPlayer from "@/icon/icon-player.vue";
import { useStore } from "vuex";
import CalendarCollapse from "@/components/calendar/calendar-collapse.vue";
import CalendarHeader from "@/components/calendar/calendar-header.vue";
import CalendarWeek from "@/components/calendar/calendar-week.vue";
import CalendarTable from "@/components/calendar/calendar-table.vue";

const router = useRouter();
const route = useRoute();
const store = useStore();

//题单图标是否旋转
const isRotatedQuestionListIcon = ref(false);
//难度按钮是否旋转
const isRotatedDifficultyIcon = ref(false);
//状态按钮是否旋转
const isRotatedStateIcon = ref(false);
//标签按钮是否旋转
const isRotatedTagIcon = ref(false);
//基本图标是否旋转
const isRotatedBasicIcon = ref(false);
//展示的基本标签列表数量
const showedBasicTagListNum = ref(6);
//算法图标是否旋转
const isRotatedAlgorithmIcon = ref(false);
//展示的算法标签列表数量
const showedAlgorithmTagListNum = ref(4);
//算法图标是否旋转
const isRotatedDataStructureIcon = ref(false);
//展示的数据结构标签列表数量
const showedDataStructureTagListNum = ref(5);
//数据结构图标是否旋转
const isRotatedAdvancedDataStructureIcon = ref(false);
//展示的高级数据结构标签列表数量
const showedAdvancedDataStructureTagListNum = ref(4);
//技巧图标是否旋转
const isRotatedSkillIcon = ref(false);
//展示的技巧标签列表数量
const showedSkillTagListNum = ref(5);
//数学图标是否旋转
const isRotatedArithIcon = ref(false);
//展示的数学标签列表数量
const showedArithTagListNum = ref(5);
//其他图标是否旋转
const isRotatedOtherIcon = ref(false);
//展示的其他标签列表数量
const showedOtherTagListNum = ref(5);

//旋转题单图标
const rotateQuestionListIcon = () => {
  isRotatedQuestionListIcon.value = !isRotatedQuestionListIcon.value;
};

// 旋转难度按钮时,取消其他按钮旋转状态
const rotateDifficultyIcon = () => {
  isRotatedDifficultyIcon.value = !isRotatedDifficultyIcon.value;
  isShowedDifficultyOptions.value = !isShowedDifficultyOptions.value;
  isRotatedStateIcon.value = false;
  isShowedStateOptions.value = false;
};

// 旋转状态按钮时,取消其他按钮旋转状态
const rotateStateIcon = () => {
  isRotatedStateIcon.value = !isRotatedStateIcon.value;
  isShowedStateOptions.value = !isShowedStateOptions.value;
  isRotatedDifficultyIcon.value = false;
  isShowedDifficultyOptions.value = false;
};

//旋转标签按钮
const rotateTagIcon = () => {
  isRotatedTagIcon.value = !isRotatedTagIcon.value;
};

// 开启标签按钮时关闭其他按钮
const showTagList = () => {
  isRotatedStateIcon.value = false;
  isShowedStateOptions.value = false;
  isRotatedDifficultyIcon.value = false;
  isShowedDifficultyOptions.value = false;
};

// 关闭时转动标签Icon图标
const closeTagList = () => {
  isRotatedTagIcon.value = false;
};

//旋转基础图标
const rotateBasicIcon = () => {
  isRotatedBasicIcon.value = !isRotatedBasicIcon.value;
  if (isRotatedBasicIcon.value) {
    showedBasicTagListNum.value = 10;
  } else {
    showedBasicTagListNum.value = 6;
  }
};

//旋转算法图标
const rotateAlgorithmIcon = () => {
  isRotatedAlgorithmIcon.value = !isRotatedAlgorithmIcon.value;
  if (isRotatedAlgorithmIcon.value) {
    showedAlgorithmTagListNum.value = 11;
  } else {
    showedAlgorithmTagListNum.value = 4;
  }
};

//旋转数据结构图标
const rotateDataStructureIcon = () => {
  isRotatedDataStructureIcon.value = !isRotatedDataStructureIcon.value;
  if (isRotatedDataStructureIcon.value) {
    showedDataStructureTagListNum.value = 19;
  } else {
    showedDataStructureTagListNum.value = 5;
  }
};

//旋转高级数据结构图标
const rotateAdvancedDataStructureIcon = () => {
  isRotatedAdvancedDataStructureIcon.value =
    !isRotatedAdvancedDataStructureIcon.value;
  if (isRotatedAdvancedDataStructureIcon.value) {
    showedAdvancedDataStructureTagListNum.value = 5;
  } else {
    showedAdvancedDataStructureTagListNum.value = 4;
  }
};

//旋转技巧图标
const rotateSkillIcon = () => {
  isRotatedSkillIcon.value = !isRotatedSkillIcon.value;
  if (isRotatedSkillIcon.value) {
    showedSkillTagListNum.value = 9;
  } else {
    showedSkillTagListNum.value = 5;
  }
};

//旋转数学图标
const rotateArithIcon = () => {
  isRotatedArithIcon.value = !isRotatedArithIcon.value;
  if (isRotatedArithIcon.value) {
    showedArithTagListNum.value = 9;
  } else {
    showedArithTagListNum.value = 5;
  }
};

//旋转其他图标
const rotateOtherIcon = () => {
  isRotatedOtherIcon.value = !isRotatedOtherIcon.value;
  if (isRotatedOtherIcon.value) {
    showedOtherTagListNum.value = 8;
  } else {
    showedOtherTagListNum.value = 5;
  }
};

const isShowedAllTagList = ref(false);
// 标签按钮展开全部
const showAllTagList = () => {
  if (!isShowedAllTagList.value) {
    isRotatedOtherIcon.value = true;
    showedOtherTagListNum.value = 8;
    isRotatedArithIcon.value = true;
    showedArithTagListNum.value = 9;
    isRotatedSkillIcon.value = true;
    showedSkillTagListNum.value = 9;
    isRotatedAdvancedDataStructureIcon.value = true;
    showedAdvancedDataStructureTagListNum.value = 5;
    isRotatedDataStructureIcon.value = true;
    showedDataStructureTagListNum.value = 19;
    isRotatedAlgorithmIcon.value = true;
    showedAlgorithmTagListNum.value = 11;
    isRotatedBasicIcon.value = true;
    showedBasicTagListNum.value = 10;
  } else {
    isRotatedOtherIcon.value = false;
    showedOtherTagListNum.value = 5;
    isRotatedArithIcon.value = false;
    showedArithTagListNum.value = 5;
    isRotatedSkillIcon.value = false;
    showedSkillTagListNum.value = 5;
    isRotatedAdvancedDataStructureIcon.value = false;
    showedAdvancedDataStructureTagListNum.value = 4;
    isRotatedDataStructureIcon.value = false;
    showedDataStructureTagListNum.value = 5;
    isRotatedAlgorithmIcon.value = false;
    showedAlgorithmTagListNum.value = 4;
    isRotatedBasicIcon.value = false;
    showedBasicTagListNum.value = 6;
  }
  isShowedAllTagList.value = !isShowedAllTagList.value;
};
//基础标签列表
const basicTagList = [
  "数组",
  "字符串",
  "排序",
  "矩阵",
  "模拟",
  "枚举",
  "字符串匹配",
  "桶排序",
  "计数排序",
  "基数排序",
];
//算法标签列表
const algorithmTagList = [
  "动态规划",
  "贪心",
  "深度优先搜索",
  "二分查找",
  "广度优先搜索",
  "回溯",
  "递归",
  "分治",
  "记忆化搜索",
  "归并排序",
  "快速选择",
];
//数据结构标签列表
const dataStructureTagList = [
  "哈希表",
  "数",
  "二叉树",
  "栈",
  "堆（优先队列）",
  "图",
  "链表",
  "单调栈",
  "有序集合",
  "二叉搜索树",
  "队列",
  "拓扑排序",
  "最短路",
  "单调队列",
  "双向链表",
  "最小生成树",
  "强连通分量",
  "欧拉回路",
  "双连通分量",
];
//高级数据结构标签列表
const advancedDataStructureTagList = [
  "并查集",
  "字典树",
  "线段树",
  "树状数组",
  "后缀数组",
];
//技巧标签列表
const skillTagList = [
  "双指针",
  "位运算",
  "前缀和",
  "滑动窗口",
  "计数",
  "状态压缩",
  "哈希函数",
  "滚动哈希",
  "扫描线",
];
//数学标签列表
const arithTagList = [
  "数学",
  "数论",
  "几何",
  "组合数学",
  "博弈",
  "随机化",
  "概率与统计",
  "水塘抽样",
  "拒绝采样",
];
//其他标签列表
const otherTagList = [
  "数据库",
  "设计",
  "数据流",
  "脑筋急转弯",
  "交互",
  "迭代器",
  "多线程",
  "Shell",
];

//当前页
const current = ref<number>(parseInt(route.query.current as string) || 1);
//每页展示数据行数
const pageSize = ref<number>(parseInt(route.query.pageSize as string) || 15);
const sortField = ref(route.query.sortField as string);
const sortOrder = ref(route.query.sortOrder as string);

interface Question {
  status: number | undefined;
  id: number;
  // 其他题目属性...
}

// 题目数据列表
const questionList = ref<Question[]>([]);
// 题目总数
const total = ref(0);

const dynamicHeight = ref(9);

// 默认查询数据参数
const defaultSearchParams = {
  pageSize: pageSize.value,
  current: current.value,
  sortField: sortField.value || undefined,
  sortOrder: sortOrder.value || undefined,
};

//查询参数
const searchParams = ref<QuestionQueryRequest>({
  ...defaultSearchParams,
});
//每页展示数据行数选项
const customPageSizeOptions = ref([15, 30, 50, 100]);

//选中的难度参数
const checkedDifficulty = ref(0);
//选中的状态参数
const checkedState = ref(0);

const isShowedDifficultyOptions = ref(false);

const isShowedStateOptions = ref(false);

const display = ref(false);

const numberQuestion = ref(1);

const numberDifficulty = ref(1);

const numberPassRate = ref(1);

const upQuestion = ref(true);
const downQuestion = ref(true);

const upPass_rate = ref(true);
const downPass_rate = ref(true);

const upDifficulty = ref(true);
const downDifficulty = ref(true);

const doSelect = () => {
  display.value = !display.value;
  if (display.value) {
    dynamicHeight.value = 36;
  } else {
    dynamicHeight.value = 9;
  }
};

const Tag = ref("");

// 获取题目数据
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    console.log(res.data.records);
    questionList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("题目页面加载失败：" + res.message);
  }
};

/**
 * 监听 searchParams 变量，改变是触发页面的更新加载
 */
watchEffect(() => {
  searchParams.value = {
    ...searchParams.value,
    searchText: route.query.search,
  } as never;
  loadData();
});

// 进度条数据

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  return;
});

// 改变页码
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
  current.value = page;
  router.push({
    query: searchParams.value as any,
  });
  window.scrollTo({
    top: 10,
    behavior: "smooth",
  });
};

// 改变页数
const onPageSizeChange = (size: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageSize: size,
  };
  pageSize.value = size;
  router.push({
    query: searchParams.value as any,
  });
};

// 筛选难度
const doFilterDifficulty = (difficultyParam: number) => {
  if (checkedDifficulty.value != difficultyParam) {
    searchParams.value = {
      ...searchParams.value,
      difficulty: difficultyParam,
    };
    checkedDifficulty.value = difficultyParam;
    isRotatedDifficultyIcon.value = !isRotatedDifficultyIcon.value;
    isShowedDifficultyOptions.value = !isShowedDifficultyOptions.value;
  } else {
    searchParams.value = {
      ...searchParams.value,
      difficulty: undefined,
    };
    checkedDifficulty.value = 0;
    isRotatedDifficultyIcon.value = !isRotatedDifficultyIcon.value;
    isShowedDifficultyOptions.value = !isShowedDifficultyOptions.value;
  }
};

// 筛选状态
const doFilterState = (stateParam: number) => {
  if (checkedState.value != stateParam) {
    searchParams.value = {
      ...searchParams.value,
      state: stateParam,
    };
    checkedState.value = stateParam;
    isRotatedStateIcon.value = !isRotatedStateIcon.value;
    isShowedStateOptions.value = !isShowedStateOptions.value;
  } else {
    checkedState.value = 0;
    searchParams.value = {
      ...searchParams.value,
      state: undefined,
    };
    isRotatedStateIcon.value = !isRotatedStateIcon.value;
    isShowedStateOptions.value = !isShowedStateOptions.value;
  }
  return;
};

// 清除难度标签
const clearDifficultyTag = () => {
  searchParams.value = {
    ...searchParams.value,
    difficulty: undefined,
  };
  checkedDifficulty.value = 0;
};

// 清除状态标签
const clearStateTag = () => {
  checkedState.value = 0;
  searchParams.value = {
    ...searchParams.value,
  };
};
// 清除标签
const clearTag = (tag: string) => {
  searchParams.value = {
    ...searchParams.value,
  };
  if (searchParams.value) {
    if (!searchParams.value.tags) {
      searchParams.value.tags = [];
    }
    checkedTagList.value = checkedTagList.value.filter((t) => t !== tag);
    searchParams.value.tags = searchParams.value.tags.filter((t) => t !== tag);
  }
};

// 将搜索框上的内容同步到url上
const searchText = ref(route.query.search);
const formattedSearchText: string =
  typeof searchText.value === "string" ? searchText.value : "";

// 查询
const onSearch = (value: string) => {
  if (value) {
    router.push({
      query: {
        ...(searchParams.value as any),
        search: value,
      },
    });
  } else {
    router.push({
      query: {
        pageSize: searchParams.value.pageSize,
        current: searchParams.value.current,
      },
    });
  }
};

// 随机一题
const doRandomQuestion = async () => {
  const questionListNum = questionList.value.length; // 获取当前题目总数

  if (questionListNum === 0) {
    return; // 题目列表为空，直接返回
  }

  const randomIndex = Math.floor(Math.random() * (questionListNum - 1)); // 生成随机题目索引

  if (randomIndex >= questionListNum) {
    return; // 随机索引超出范围，直接返回
  }

  const randomQuestionId = questionList.value[randomIndex].id; // 获取随机题目的 ID

  // 这里可以根据获取到的随机题目 ID 执行相关操作，比如跳转到对应题目页面等
  await router.push({
    path: `/question/doOnline/${randomQuestionId}`,
  });
};

// 题目排序
const doQuestionSorting = (number: number) => {
  return;
};

// 通过率排序
const sortByPassRate = (number: number) => {
  return;
};

// 难度排序
const doDifficultySorting = (number: number) => {
  return;
};

// 选中的标签列表
const checkedTagList = ref<string[]>([]);

//标签选中
const doTagCheck = (tag: string) => {
  searchParams.value = {
    ...searchParams.value,
  };
  if (!checkedTagList.value.includes(tag)) {
    if (searchParams.value) {
      if (!searchParams.value.tags) {
        searchParams.value.tags = [];
      }

      checkedTagList.value.push(tag);
      searchParams.value.tags.push(tag);
    }
  } else {
    if (searchParams.value) {
      if (!searchParams.value.tags) {
        searchParams.value.tags = [];
      }
      checkedTagList.value = checkedTagList.value.filter((t) => t !== tag);
      searchParams.value.tags = searchParams.value.tags.filter(
        (t) => t !== tag
      );
    }
  }
};

// 重置标签搜索列表
const resetTagList = () => {
  searchParams.value = {
    ...searchParams.value,
  };
  checkedTagList.value = [];
  searchParams.value.tags = [];
};

// 删除所有搜索条件
const resetCheckedTagList = () => {
  searchParams.value = {
    ...searchParams.value,
    difficulty: undefined,
  };
  checkedTagList.value = [];
  searchParams.value.tags = [];
  checkedDifficulty.value = 0;
  checkedState.value = 0;
};

// 查询标签链表
const filteredTagList = ref<string[]>([]);
const filterTag = (value: string) => {
  if (value) {
    console.log("tag数据:", value);
    const searchTerm = value;
    const filteredBasicTags = basicTagList.filter((basicTag) =>
      basicTag.includes(searchTerm)
    );
    const filteredAlgorithmTags = algorithmTagList.filter((algorithmTag) =>
      algorithmTag.includes(searchTerm)
    );
    const filteredDate_StructureTags = dataStructureTagList.filter(
      (date_StructureTag) => date_StructureTag.includes(searchTerm)
    );
    const filteredAdvanced_Date_StructureTags =
      advancedDataStructureTagList.filter((advanced_Date_StructureTag) =>
        advanced_Date_StructureTag.includes(searchTerm)
      );
    const filteredSkillTags = skillTagList.filter((skillTag) =>
      skillTag.includes(searchTerm)
    );
    const filteredArithTags = arithTagList.filter((arithTag) =>
      arithTag.includes(searchTerm)
    );
    const filteredOtherTags = otherTagList.filter((otherTag) =>
      otherTag.includes(searchTerm)
    );

    // 将筛选出的标签数据放入 filteredTagList 数组中
    filteredTagList.value = [
      ...filteredBasicTags,
      ...filteredAlgorithmTags,
      ...filteredDate_StructureTags,
      ...filteredAdvanced_Date_StructureTags,
      ...filteredSkillTags,
      ...filteredArithTags,
      ...filteredOtherTags,
    ];
  } else {
    filteredTagList.value = [];
  }
};

// 标签搜索清楚按钮
const closeTagsList = () => {
  filteredTagList.value = [];
};
</script>

<style scoped>
#questionsView {
  max-width: 1280px;
  margin: 20px auto;
}

.right {
  margin-left: 10px;
}

.calendar {
  display: flex;
  flex-direction: column;
  width: 260px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.125);
  margin-left: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
  padding: 5px;
}

.demo-basic {
  margin-top: 4px;
  width: 120px;
  background-color: var(--color-bg-popup);
  text-align: center;
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}

.transparent-btn {
  width: 124px;
  height: 32px;
  background-color: transparent;
  border: none; /* 移除边框 */
  border-radius: 5px; /* 添加圆角 */
  transition: background-color 0.3s;
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: space-between; /* 水平居中对齐 */
  align-items: center; /* 垂直居中对齐 */
}

.transparent-btn:hover {
  background-color: #f7f7f8; /* 在悬停时更改背景颜色为 #f0f0f0 */
}

.transparent-but {
  width: 124px;
  height: 32px;
  background-color: transparent;
  border: none; /* 移除边框 */
  border-radius: 5px; /* 添加圆角 */
  transition: background-color 0.3s;
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中对齐 */
  align-items: center; /* 垂直居中对齐 */
  color: #262626bf;
}

.transparent-but:hover {
  background-color: #f7f7f8; /* 在悬停时更改背景颜色为 #f0f0f0 */
  color: #4e2626;
}

.transparent-butt {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border: none;
  border-radius: 3px;
}

.transparent-butt:hover {
  background-color: #dedfe2;
}

.transparent-butto {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border: none;
  border-radius: 3px;
  background-color: #007aff;
}

.small-image {
  width: 18px; /* 设置图像的宽度 */
  height: auto; /* 保持高度自适应 */
}

.custom-but {
  height: 43px;
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none; /* 移除边框 */
  background-color: transparent; /* 设置背景为透明 */
  color: #8a8a8e;
  cursor: pointer; /* 设置鼠标指针样式为手型 */
}

.custom-but:hover {
  color: #595959;
}

.adopt-basic {
  padding: 5px;
  width: 45px;
  height: 15px;
  background-color: var(--color-bg-popup);
  border-radius: 15px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
  text-align: center;
  color: #2b2b2d;
  cursor: pointer;
}

.Attempted-basic {
  padding: 5px;
  width: 50px;
  height: 15px;
  background-color: var(--color-bg-popup);
  border-radius: 15px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
  text-align: center;
  color: #2b2b2d;
  cursor: pointer;
}

.icon-down {
  transition: transform 0.2s ease;
}

.rotate-clockwise {
  animation: rotateClockwise 0.2s linear forwards;
}

.rotate-counterclockwise {
  animation: rotateCounterclockwise 0.2s linear forwards;
}

@keyframes rotateClockwise {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(180deg);
  }
}

@keyframes rotateCounterclockwise {
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(0);
  }
}

.outer-div {
  overflow: auto;
}

.outer-div::-webkit-scrollbar {
  width: 0.5em;
  background-color: transparent;
}

.outer-div::-webkit-scrollbar-thumb {
  background-color: transparent;
}

.progress-container {
  position: relative;
}

.progress-container a-progress,
.progress-container .progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.progress-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hover-effect {
  margin-top: 6px;
  color: #262626;
  display: inline-block;
  width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hover-effect:hover {
  color: #3370ff;
  cursor: pointer;
}
</style>
