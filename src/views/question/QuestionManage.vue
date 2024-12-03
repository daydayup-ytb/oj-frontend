<template>
  <div id="questionManage">
    <!--    <a-trigger-->
    <!--      v-if="selectedKeys.length != 0"-->
    <!--      :trigger="['click', 'hover']"-->
    <!--      clickToClose-->
    <!--      position="top"-->
    <!--      v-model:popupVisible="popupVisible2"-->
    <!--    >-->
    <!--      <div-->
    <!--        style="background-color: #165dff"-->
    <!--        :class="`button-trigger ${-->
    <!--          popupVisible2 ? 'button-trigger-active' : ''-->
    <!--        }`"-->
    <!--      >-->
    <!--        <IconClose v-if="popupVisible2" />-->
    <!--        <icon-up v-else />-->
    <!--      </div>-->
    <!--      <template #content>-->
    <!--        <a-menu-->
    <!--          :style="{ marginBottom: '-4px' }"-->
    <!--          mode="popButton"-->
    <!--          :tooltipProps="{ position: 'left' }"-->
    <!--          showCollapseButton-->
    <!--        >-->
    <!--          <a-menu-item key="1" @click="handleDelete">-->
    <!--            <template #icon>-->
    <!--              <icon-delete />-->
    <!--            </template>-->
    <!--            删除所选行-->
    <!--          </a-menu-item>-->
    <!--        </a-menu>-->
    <!--      </template>-->
    <!--    </a-trigger>-->
    <div style="height: 50px">
      <a-space :size="20">
        <a-trigger
          position="bl"
          :popup-visible="isDisplayedDifficultyDropDownList"
        >
          <a-button
            style="
              width: 103px;
              height: 32px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-radius: 5px;
              box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
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
              <button class="transparent-btn" @click="doFilterDifficulty(1)">
                <span style="color: #00af9b">简单</span>
                <img
                  v-if="checkedDifficulty === 1"
                  :src="require('@/assets/对.png')"
                  alt=""
                  class="small-image"
                />
              </button>
              <button class="transparent-btn" @click="doFilterDifficulty(2)">
                <span style="color: #ffb800">中等</span>
                <img
                  v-if="checkedDifficulty === 2"
                  :src="require('@/assets/对.png')"
                  alt=""
                  class="small-image"
                />
              </button>
              <button class="transparent-btn" @click="doFilterDifficulty(3)">
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
        <a-trigger
          trigger="click"
          :unmount-on-close="false"
          position="bl"
          @hide="hideTagList"
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
              box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
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
              <div style="width: 310px; height: 400px" class="outer-div">
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
                    :color="checkedTagList.includes(tag) ? '#165dff' : 'gray'"
                    @click="doTagCheck(tag)"
                  >
                    {{ tag }}
                  </a-tag>
                </div>
                <a-space direction="vertical" style="margin-bottom: 15px">
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
                      :color="checkedTagList.includes(tag) ? '#165dff' : 'gray'"
                      @click="doTagCheck(tag)"
                    >
                      {{ tag }}
                    </a-tag>
                  </div>
                </a-space>
                <a-space direction="vertical" style="margin-bottom: 15px">
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
                        'rotate-counterclockwise': !isRotatedAlgorithmIcon,
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
                      :color="checkedTagList.includes(tag) ? '#165dff' : 'gray'"
                      @click="doTagCheck(tag)"
                    >
                      {{ tag }}
                    </a-tag>
                  </div>
                </a-space>
                <a-space direction="vertical" style="margin-bottom: 15px">
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
                        'rotate-counterclockwise': !isRotatedDataStructureIcon,
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
                      :color="checkedTagList.includes(tag) ? '#165dff' : 'gray'"
                      @click="doTagCheck(tag)"
                    >
                      {{ tag }}
                    </a-tag>
                  </div>
                </a-space>
                <a-space direction="vertical" style="margin-bottom: 15px">
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
                        'rotate-clockwise': isRotatedAdvancedDataStructureIcon,
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
                      v-for="(tag, index) of advancedDataStructureTagList.slice(
                        0,
                        showedAdvancedDataStructureTagListNum
                      )"
                      :key="index"
                      :color="checkedTagList.includes(tag) ? '#165dff' : 'gray'"
                      @click="doTagCheck(tag)"
                    >
                      {{ tag }}
                    </a-tag>
                  </div>
                </a-space>
                <a-space direction="vertical" style="margin-bottom: 15px">
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
                      :color="checkedTagList.includes(tag) ? '#165dff' : 'gray'"
                      @click="doTagCheck(tag)"
                    >
                      {{ tag }}
                    </a-tag>
                  </div>
                </a-space>
                <a-space direction="vertical" style="margin-bottom: 15px">
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
                      :color="checkedTagList.includes(tag) ? '#165dff' : 'gray'"
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
                      :color="checkedTagList.includes(tag) ? '#165dff' : 'gray'"
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
        <a-input
          allow-clear
          :default-value="formattedSearchText"
          style="border-radius: 5px; box-shadow: 0 0 4px rgba(0, 0, 0, 0.2)"
          :style="{ width: '250px' }"
          placeholder="请输入题目、编号或用户ID！"
          @input="doSearch"
          @clear="doClear"
        >
          <template #prefix>
            <icon-search />
          </template>
        </a-input>
      </a-space>
    </div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        height: 30px;
        margin-top: -10px;
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
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
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
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
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
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          "
          @close="clearDifficultyTag"
          >困难
        </a-tag>
        <a-tag
          closable
          style="
            margin-top: 5px;
            margin-left: 8px;
            border-radius: 15px;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          "
          v-for="(tag, index) of checkedTagList"
          :key="index"
          @close="clearTag(tag)"
        >
          {{ tag }}
        </a-tag>
      </div>
      <a-tag
        v-if="checkedDifficulty != 0 || checkedTagList.length != 0"
        style="
          border-radius: 15px;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          cursor: pointer;
        "
        @click="resetCheckedTagList"
      >
        <span style="color: #3c3c4399"
          ><icon-loop :size="16" style="margin-right: 2px" />重置</span
        ></a-tag
      >
    </div>
    <div style="box-shadow: 0 0 4px rgba(0, 0, 0, 0.2)">
      <a-table
        :columns="columns as any"
        :data="dataList"
        :bordered="false"
        :hoverable="true"
        :pagination="false"
        @sorter-change="handleSortChange"
        :row-selection="rowSelection as any"
        row-key="id"
        v-model:selectedKeys="selectedKeys"
      >
        <template #difficulty="{ record }">
          <a-space wrap style="margin-top: 10px">
            <span v-if="record?.difficulty === 1" style="color: #00af9b">
              简单
            </span>
            <span v-else-if="record?.difficulty === 2" style="color: #ffb800">
              中等
            </span>
            <span v-else-if="record?.difficulty === 3" style="color: #ff2d55">
              困难
            </span>
          </a-space>
        </template>
        <template #passRate="{ record }">
          <a-statistic
            :value="record.passRate"
            :precision="2"
            :value-from="0"
            :start="true"
            animation
            style="transform: scale(0.65); margin-left: -15px"
          >
            <template #prefix>
              <icon-arrow-rise />
            </template>
            <template #suffix>%</template>
          </a-statistic>
        </template>
        <template #title="{ record }">
          <a-tooltip
            background-color="#FFFFFF"
            position="right"
            :content-style="{
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
              borderRadius: '10px',
            }"
          >
            <template #content
              ><span style="color: black; font-size: 13px"
                >题目ID: {{ record.id }}</span
              ></template
            >
            <span style="cursor: pointer">{{ record.title }}</span>
          </a-tooltip>
        </template>
        <template #content="{ record }">
          <a-trigger position="right">
            <div>
              <icon-content
                size="20"
                style="cursor: pointer; margin-top: 10px"
              />
            </div>
            <template #content>
              <div class="content-basic">
                <MdView
                  :value="record.content"
                  style="width: 800px; height: 500px; overflow: auto"
                />
              </div>
            </template>
          </a-trigger>
        </template>
        <template #answer="{ record }">
          <a-trigger position="right">
            <div>
              <icon-content
                size="20"
                style="cursor: pointer; margin-top: 10px"
              />
            </div>
            <template #content>
              <div class="content-basic">
                <MdView
                  :value="record.answer"
                  style="width: 800px; height: 500px; overflow: auto"
                />
              </div>
            </template>
          </a-trigger>
        </template>
        <template #tags="{ record }">
          <a-space wrap style="margin-top: 10px">
            <a-tag
              style="border: 1px solid #ccc; border-radius: 10px"
              v-for="(tag, index) of JSON.parse(record.tags)"
              :key="index"
              :color="checkedTagList.includes(tag) ? '#165dff' : ''"
            >
              <span> {{ tag }}</span>
            </a-tag>
          </a-space>
        </template>
        <template #judgeConfig="{ record }">
          <a-space wrap style="margin-top: 10px">
            <a-tag
              style="border: 1px solid #ccc; border-radius: 10px; width: 80px"
              v-for="(judgeConfig, index) of JSON.parse(record.judgeConfig)"
              :key="index"
            >
              <template #icon>
                <icon-execute-time
                  v-if="index == 'timeLimit'"
                  size="16"
                  style="margin-top: 6px"
                />
                <icon-cpu
                  v-if="index == 'memoryLimit'"
                  style="margin-top: 6px"
                />
                <icon-storage-place
                  v-if="index == 'stackLimit'"
                  style="margin-top: 6px"
                />
              </template>
              {{ judgeConfig }}
              <span v-if="index == 'timeLimit'">ms</span>
              <span v-if="index == 'memoryLimit'">MB</span>
              <span v-if="index == 'stackLimit'">KB</span>
            </a-tag>
          </a-space>
        </template>
        <template #judgeCase="{ record }">
          <a-trigger position="right">
            <div>
              <icon-content
                size="20"
                style="cursor: pointer; margin-top: 10px"
              />
            </div>
            <template #content>
              <div class="content-basic">
                <a-space direction="vertical">
                  <a-tag
                    style="border: 1px solid #ccc; border-radius: 10px"
                    v-for="(judgeCase, index) of JSON.parse(record.judgeCase)"
                    :key="index"
                  >
                    <span style="width: 250px"
                      >输入用例：{{ judgeCase.input }}</span
                    >
                    <span style="margin-left: 10px; width: 250px"
                      >输出用例：{{ judgeCase.output }}</span
                    >
                  </a-tag>
                </a-space>
              </div>
            </template>
          </a-trigger>
        </template>
        <template #userId="{ record }">
          <a-tooltip
            background-color="#FFFFFF"
            position="left"
            :content-style="{
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
              borderRadius: '10px',
            }"
          >
            <template #content
              ><span style="color: black; font-size: 13px"
                >用户ID: {{ record.userId }}</span
              ></template
            >
            <div style="cursor: pointer; display: flex; align-items: center">
              <a-avatar :size="24" :image-url="record.userAvatar"></a-avatar>
              <span style="margin-left: 5px">{{ record.userName }}</span>
            </div>
          </a-tooltip>
        </template>
        <template #createTime="{ record }">
          {{ moment(record.createTime).format("YYYY-MM-DD") }}
        </template>
        <template #updateTime="{ record }">
          {{ moment(record.updateTime).format("YYYY-MM-DD") }}
        </template>
        <template #optional="{ record }">
          <a-space>
            <a-button
              style="
                border-radius: 20px;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
              "
              type="outline"
              @click="doUpdate(record)"
            >
              编辑
            </a-button>
            <a-popconfirm
              content="确定要删除此条数据！"
              @ok="doDelete(record)"
              position="top"
            >
              <a-button
                style="
                  border-radius: 20px;
                  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
                "
                type="outline"
                status="danger"
              >
                删除
              </a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table>
    </div>
    <div style="display: flex; justify-content: flex-end; margin-top: 25px">
      <a-pagination
        :total="total"
        show-total
        show-jumper
        show-page-size
        @change="onPageChange"
        @pageSizeChange="onPageSizeChange"
        :pageSizeOptions="customPageSizeOptions"
        :current="current"
        :page-size="pageSize"
        :page-item-style="{ borderRadius: '5px', backgroundColor: '#F2F3F4' }"
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
              type === 'previous' ? { transform: `rotate(180deg)` } : undefined
            "
          />
        </template>
        <template #page-item-ellipsis>
          <icon-sun-fill />
        </template>
      </a-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionQueryRequest,
  UserControllerService,
} from "../../../request";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";
import moment from "moment/moment";
import MdView from "@/components/MdViewer.vue";
import IconContent from "@/icon/icon-content.vue";
import IconExecuteTime from "@/icon/icon-execute-time.vue";
import IconCpu from "@/icon/icon-cpu.vue";
import IconStoragePlace from "@/icon/icon-storage-place.vue";

const route = useRoute();
const router = useRouter();

interface UserItem {
  id: number;
  userAvatar: string;
  userName: string;
  userId: number;
}

const popupVisible2 = ref(false);
const Tag = ref("");

const dataList = ref<UserItem[]>([]);
//行选择
const rowSelection = reactive({
  type: "checkbox",
  showCheckedAll: true,
  onlyCurrent: false,
});
//  选中的行
const selectedKeys = ref([]);
const total = ref(0);
const customPageSizeOptions = ref([20, 50, 100]);
const current = ref<number>(parseInt(route.query.current as string) || 1);
const pageSize = ref<number>(parseInt(route.query.pageSize as string) || 50);
const sortField = ref(route.query.sortField as string);
const sortOrder = ref(route.query.sortOrder as string);
const searchParams = ref<QuestionQueryRequest>({
  pageSize: pageSize.value,
  current: current.value,
  sortField: sortField.value || undefined,
  sortOrder: sortOrder.value || undefined,
});
// 将搜索框上的内容同步到url上
const searchText = ref(route.query.searchText);
const formattedSearchText: string =
  typeof searchText.value === "string" ? searchText.value : "";

// 难度图标是否旋转
const isRotatedDifficultyIcon = ref(false);
// 是否展示难度下拉列表内容
const isDisplayedDifficultyDropDownList = ref(false);
// 标签图标是否旋转
const isRotatedTagIcon = ref(false);
// 基本图标是否旋转
const isRotatedBasicIcon = ref(false);
// 算法图标是否旋转
const isRotatedAlgorithmIcon = ref(false);
// 数据结构图标是否旋转
const isRotatedDataStructureIcon = ref(false);
// 高级数据结构是否旋转
const isRotatedAdvancedDataStructureIcon = ref(false);
// 技巧图标是否旋转
const isRotatedSkillIcon = ref(false);
// 数学图标是否旋转
const isRotatedArithIcon = ref(false);
// 其他图标是否旋转
const isRotatedOtherIcon = ref(false);
// 展示的基础标签列表数量
const showedBasicTagListNum = ref(6);
// 展示的算法标签列表数量
const showedAlgorithmTagListNum = ref(4);
// 展示的数据结构标签列表数量
const showedDataStructureTagListNum = ref(5);
// 展示的高级数据结构标签列表数量
const showedAdvancedDataStructureTagListNum = ref(4);
// 展示的技巧标签列表数量
const showedSkillTagListNum = ref(5);
// 展示的数学标签列表数量
const showedArithTagListNum = ref(5);
// 展示的其他标签列表数量
const showedOtherTagListNum = ref(5);
// 已选择的难度
const checkedDifficulty = ref(0);
// 已选择的标签列表
const checkedTagList = ref<string[]>([]);
// 标签搜索框筛选后的标签列表
const filteredTagList = ref<string[]>([]);
// 是否展示所有标签列表
const isShowedAllTagList = ref(false);
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

const advancedDataStructureTagList = [
  "并查集",
  "字典树",
  "线段树",
  "树状数组",
  "后缀数组",
];

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
const columns = [
  {
    title: "题目",
    dataIndex: "title",
    slotName: "title",
    sortable: {
      sortDirections: ["ascend", "descend"],
      sorter: true,
    },
    width: 185,
    ellipsis: true,
    tooltip: "title",
  },
  {
    title: "标签",
    dataIndex: "tags",
    slotName: "tags",
    width: 300,
  },
  {
    title: "通过率",
    dataIndex: "passRate",
    slotName: "passRate",
    width: 100,
    sortable: {
      sortDirections: ["ascend", "descend"],
      sorter: true,
    },
  },
  {
    title: "难度",
    dataIndex: "difficulty",
    slotName: "difficulty",
    width: 100,
    sortable: {
      sortDirections: ["ascend", "descend"],
      sorter: true,
    },
  },
  {
    title: "内容",
    dataIndex: "content",
    slotName: "content",
    align: "center",
    width: 90,
  },
  {
    title: "答案",
    dataIndex: "answer",
    slotName: "answer",
    align: "center",
    width: 90,
  },
  {
    title: "判题用例",
    dataIndex: "judgeCase",
    align: "center",
    slotName: "judgeCase",
    width: 100,
  },
  {
    title: "判题配置",
    dataIndex: "judgeConfig",
    slotName: "judgeConfig",
    width: 300,
  },
  {
    title: "创建者",
    dataIndex: "userId",
    slotName: "userId",
    width: 180,
    sortable: {
      sortDirections: ["ascend", "descend"],
      sorter: true,
    },
  },
  {
    title: "创建时间",
    slotName: "createTime",
    dataIndex: "createTime",
    width: 110,
    sortable: {
      sortDirections: ["ascend", "descend"],
      sorter: true,
    },
  },
  {
    title: "更新时间",
    slotName: "updateTime",
    dataIndex: "updateTime",
    width: 110,
    sortable: {
      sortDirections: ["ascend", "descend"],
      sorter: true,
    },
  },
  {
    title: "操作",
    slotName: "optional",
    align: "center",
    width: 150,
  },
];
// 旋转难度图标
const rotateDifficultyIcon = () => {
  isRotatedDifficultyIcon.value = !isRotatedDifficultyIcon.value;
  isDisplayedDifficultyDropDownList.value =
    !isDisplayedDifficultyDropDownList.value;
};
// 筛选难度
const doFilterDifficulty = (number: number) => {
  if (checkedDifficulty.value != number) {
    searchParams.value = {
      ...searchParams.value,
      difficulty: number,
    };

    checkedDifficulty.value = number;
    isRotatedDifficultyIcon.value = !isRotatedDifficultyIcon.value;
    isDisplayedDifficultyDropDownList.value =
      !isDisplayedDifficultyDropDownList.value;
  } else {
    searchParams.value = {
      ...searchParams.value,
      difficulty: undefined,
    };

    checkedDifficulty.value = 0;
    isRotatedDifficultyIcon.value = !isRotatedDifficultyIcon.value;
    isDisplayedDifficultyDropDownList.value =
      !isDisplayedDifficultyDropDownList.value;
  }
};
// 展示下拉列表标签列表
const showTagList = () => {
  isRotatedDifficultyIcon.value = false;
  isDisplayedDifficultyDropDownList.value = false;
};

// 隐藏下拉列表标签列表
const hideTagList = () => {
  isRotatedTagIcon.value = false;
};
// 旋转标签图标
const rotateTagIcon = () => {
  isRotatedTagIcon.value = !isRotatedTagIcon.value;
};

// 旋转基本图标
const rotateBasicIcon = () => {
  isRotatedBasicIcon.value = !isRotatedBasicIcon.value;
  if (isRotatedBasicIcon.value) {
    showedBasicTagListNum.value = 10;
  } else {
    showedBasicTagListNum.value = 6;
  }
};
// 旋转算法图标
const rotateAlgorithmIcon = () => {
  isRotatedAlgorithmIcon.value = !isRotatedAlgorithmIcon.value;
  if (isRotatedAlgorithmIcon.value) {
    showedAlgorithmTagListNum.value = 11;
  } else {
    showedAlgorithmTagListNum.value = 4;
  }
};

// 旋转数据结构图标
const rotateDataStructureIcon = () => {
  isRotatedDataStructureIcon.value = !isRotatedDataStructureIcon.value;
  if (isRotatedDataStructureIcon.value) {
    showedDataStructureTagListNum.value = 19;
  } else {
    showedDataStructureTagListNum.value = 5;
  }
};
// 旋转高级数据结构图标
const rotateAdvancedDataStructureIcon = () => {
  isRotatedAdvancedDataStructureIcon.value =
    !isRotatedAdvancedDataStructureIcon.value;
  if (isRotatedAdvancedDataStructureIcon.value) {
    showedAdvancedDataStructureTagListNum.value = 5;
  } else {
    showedAdvancedDataStructureTagListNum.value = 4;
  }
};

// 旋转技巧图标
const rotateSkillIcon = () => {
  isRotatedSkillIcon.value = !isRotatedSkillIcon.value;
  if (isRotatedSkillIcon.value) {
    showedSkillTagListNum.value = 9;
  } else {
    showedSkillTagListNum.value = 5;
  }
};
// 旋转数学图标
const rotateArithIcon = () => {
  isRotatedArithIcon.value = !isRotatedArithIcon.value;
  if (isRotatedArithIcon.value) {
    showedArithTagListNum.value = 9;
  } else {
    showedArithTagListNum.value = 5;
  }
};
// 旋转其他图标
const rotateOtherIcon = () => {
  isRotatedOtherIcon.value = !isRotatedOtherIcon.value;
  if (isRotatedOtherIcon.value) {
    showedOtherTagListNum.value = 8;
  } else {
    showedOtherTagListNum.value = 5;
  }
};
// 标签搜索框清除按钮
const closeTagsList = () => {
  filteredTagList.value = [];
};

// 标签搜索框筛选标签
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
//选择标签
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

// 重置标签下拉搜索框的标签列表
const resetTagList = () => {
  searchParams.value = {
    ...searchParams.value,
  };
  checkedTagList.value = [];
  searchParams.value.tags = [];
};

// 标签下拉列表展示所有标签
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
// 搜索栏一键清空
const doClear = () => {
  router.push({
    query: {
      ...(searchParams.value as any),
      searchText: undefined,
      current: 1,
    },
  });
};
// 清除难度标签查询参数
const clearDifficultyTag = () => {
  searchParams.value = {
    ...searchParams.value,
    difficulty: undefined,
  };
  checkedDifficulty.value = 0;
};

// 清除其他标签查询参数
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
// 重置所有搜索条件
const resetCheckedTagList = () => {
  searchParams.value = {
    ...searchParams.value,
    difficulty: undefined,
  };
  checkedTagList.value = [];
  searchParams.value.tags = [];
  checkedDifficulty.value = 0;
};

//加载数据
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败：" + res.message);
  }
  // await updateUserData(dataList.value);
};
/**
 * 监听 searchParams 变量，改变是触发页面的更新加载
 */
watchEffect(() => {
  searchParams.value = {
    ...searchParams.value,
    searchText: route.query.searchText,
  } as never;
  loadData();
});
/**
 * 排序
 * @param dataIndex 排序字段
 * @param direction 排序顺序
 */
const handleSortChange = (dataIndex: string, direction: string) => {
  if (!direction) {
    searchParams.value = {
      ...searchParams.value,
      sortOrder: undefined,
      sortField: undefined,
    };
  } else if (dataIndex == "title") {
    searchParams.value = {
      ...searchParams.value,
      sortOrder: direction,
      sortField: "id",
    };
  } else {
    searchParams.value = {
      ...searchParams.value,
      sortOrder: direction,
      sortField: dataIndex,
    };
  }
  router.push({
    query: searchParams.value as any,
  });
};
// 查询
const doSearch = (value: string) => {
  value = value.trim(); // 过滤掉空格
  if (value) {
    router.push({
      query: {
        ...(searchParams.value as any),
        searchText: value,
        current: 1,
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
const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res.code === 0) {
    message.success("删除成功！");
    await loadData();
  } else {
    message.error("删除失败：" + res.message);
  }
};
const doUpdate = (question: Question) => {
  router.push({
    path: `/question/update/${question.id}`,
  });
};
// 切换当前页码
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
    top: 0,
    behavior: "smooth",
  });
};
// 切换每页显示条数
const onPageSizeChange = (Size: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageSize: Size,
  };
  pageSize.value = Size;
  router.push({
    query: searchParams.value as any,
  });
};

// 多行删除

// const handleDelete = async () => {
//   const promises = selectedKeys.value.map(async (id) => {
//     const res = await QuestionControllerService.deleteQuestionUsingPost({
//       id,
//     });
//     if (res.code === 0) {
//       return { id, success: true };
//     } else {
//       return { id, success: false, message: res.message };
//     }
//   });
//
//   const results = await Promise.all(promises);
//
//   results.forEach((result) => {
//     if (result.success) {
//       message.success(`提交题目ID:${result.id} 删除成功！`);
//     } else {
//       message.error(`提交题目ID:${result.id} 删除失败：${result.message}`);
//     }
//   });
//
//   await loadData();
//   selectedKeys.value = [];
// };

// 获取用户信息
/*const userDate = async () => {
  for (const item of dataList.value) {
    const userId = item.userId;
    const id = item.id;
    const res = await UserControllerService.getUserVoByIdUsingGet(userId);
    if (res.code == 0 && res.data && res.data.userName && res.data.userAvatar) {
      const index = dataList.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        dataList.value[index].userName = res.data.userName;
        dataList.value[index].userAvatar = res.data.userAvatar;
      } else {
        console.warn(`未找到对应为${userId}de 数据`);
      }
    }
  }
};*/

// 获取用户信息 并行执行和结果缓存

// const userCache: { [key: string]: { userName: string; userAvatar: string } } =
//   {};
// const updateUserData = async (dataList: any[]) => {
//   const userIds = dataList.map((item) => item.userId);
//
//   // 并行执行所有请求
//   const requests = userIds.map((userId) =>
//     UserControllerService.getUserByIdUsingGet(userId)
//   );
//   const responses = await Promise.all(requests);
//
//   for (let i = 0; i < dataList.length; i++) {
//     const item = dataList[i];
//     const res = responses[i];
//
//     if (
//       res.code === 0 &&
//       res.data &&
//       res.data.userName &&
//       res.data.userAvatar
//     ) {
//       const { userName, userAvatar } = res.data;
//       item.userName = userName;
//       item.userAvatar = userAvatar;
//
//       // 将结果缓存起来
//       userCache[item.userId] = { userName, userAvatar };
//     } else {
//       console.error(`获取 id 为 ${item.id} 的用户信息失败`);
//     }
//   }
// };

// 在组件的 methods 中定义一个方法来排除特定字符
</script>

<style scoped>
#questionManage {
  margin: 20px;
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

.small-image {
  width: 18px; /* 设置图像的宽度 */
  height: auto; /* 保持高度自适应 */
}

.content-basic {
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  padding: 10px;
  border-radius: 10px;
}

.button-trigger {
  position: fixed;
  bottom: 100px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--color-white);
  font-size: 14px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.1s;
  z-index: 1;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
}

/* button left */
.button-trigger:nth-child(1) {
  right: 185px;
  background-color: var(--color-neutral-5);
}

.button-trigger:nth-child(1).button-trigger-active {
  background-color: var(--color-neutral-4);
}
</style>
