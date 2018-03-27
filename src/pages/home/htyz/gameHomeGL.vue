<template>
    <div style="height: 870px" class="l-flex-row mobile-gg">
        <!-- newXyls, yaoqianshu, dantiao, wppy, meirenyu, queyimen,huanleniuniu, shuihuzhuan, qianpaobuyu-->
        <new-xyls v-if="dialogShow && deskIdx === 0" @close="dialogShow = false" @submit="onSubmit" :init="currentDesk" :modify="isModify"></new-xyls>
        <yaoqianshu v-if="dialogShow && deskIdx === 1" @close="dialogShow = false" @submit="onSubmit" :init="currentDesk" :modify="isModify"></yaoqianshu>
        <dantiao v-if="dialogShow && deskIdx === 2" @close="dialogShow = false" @submit="onSubmit" :init="currentDesk" :modify="isModify"></dantiao>
        <wppy v-if="dialogShow && deskIdx === 3" @close="dialogShow = false" @submit="onSubmit" :init="currentDesk" :modify="isModify"></wppy>
        <meirenyu v-if="dialogShow && deskIdx === 4" @close="dialogShow = false" @submit="onSubmit" :init="currentDesk" :modify="isModify"></meirenyu>
        <queyimen v-if="dialogShow && deskIdx === 5" @close="dialogShow = false" @submit="onSubmit" :init="currentDesk" :modify="isModify"></queyimen>
        <huanleniuniu v-if="dialogShow && deskIdx === 6" @close="dialogShow = false" @submit="onSubmit" :init="currentDesk" :modify="isModify"></huanleniuniu>
        <shuihuzhuan v-if="dialogShow && deskIdx === 7" @close="dialogShow = false" @submit="onSubmit" :init="currentDesk" :modify="isModify"></shuihuzhuan>
        <qianpaobuyu v-if="dialogShow && deskIdx === 8" @close="dialogShow = false" @submit="onSubmit" :init="currentDesk" :modify="isModify"></qianpaobuyu>


        <dantiaosetting v-if="deskIdx === 2 && settingDialog" :init="initSetting" @close="settingDialog = false" @submit="modifyCommonSetting"></dantiaosetting>
        <queyimensetting v-if="deskIdx === 5 && settingDialog" :init="initSetting" @close="settingDialog = false" @submit="modifyCommonSetting"></queyimensetting>
        <huanleniuniusetting v-if="deskIdx === 6 && settingDialog" :init="initSetting" @close="settingDialog = false" @submit="modifyCommonSetting"></huanleniuniusetting>

        <div class="l-flex-1 l-flex-column">
            <div class=" l-relative" style="height: 150px" :class="{ newTop :form.hlabel === '-1',newTop2: form.hlabel === '-1' && form.flabel === '2' }">
                <div class="l-full" style="padding: 10px">
                    <div style="padding-bottom: 10px;border-bottom: 1px solid #ddd">
                        <h4 style="margin-bottom: 10px">新建公告：</h4>
                        <div style="margin: 10px">
                            <el-radio-group v-model="form.hlabel">
                                <el-radio label="0">运营状态</el-radio>
                                <el-radio label="-1">维护状态</el-radio>
                            </el-radio-group>
                        </div>
                        <div v-if="form.hlabel === '-1'" style="margin:10px 0 10px 10px">
                            <el-radio-group v-model="form.flabel">
                                <el-radio label="1">立刻进入</el-radio>
                                <el-radio label="2">预定时间进入</el-radio>
                            </el-radio-group>
                        </div>

                        <div v-if="form.hlabel === '-1' && form.flabel === '2'">
                            <div style="margin: 20px">
                                <el-select class="" size="small" v-model="form.time" placeholder="请选择时间">
                                    <el-option
                                        v-for="item in form.timeOptions"
                                        :key="item"
                                        :label="item"
                                        :value="item"
                                    >
                                    </el-option>
                                </el-select>&nbsp;点
                            </div>
                            <div style="margin: 20px">
                                维护公告内容:
                                <el-input size="small" :title=form.content v-model="form.content" style="width: 50%"></el-input>
                            </div>
                        </div>
                        <el-button size="small" type="primary" @click="updateDTStatus()">
                            更新大厅状态
                        </el-button>
                    </div>
                    <el-select class="" size="small" v-model="deskIdx" placeholder="请选择查询类型">
                        <el-option
                            v-for="(item, idx) in desks"
                            :key="item.getDesk"
                            :label="item.label"
                            :value="idx">
                        </el-option>
                    </el-select>
                </div>
            </div>

            <div class="l-flex-1 l-relative">
                <div class="l-full" style="padding: 10px">

                    <p style="border-top: 1px solid #eee;padding: 7px 0" v-if="deskIdx === 0">【新手练习厅】已开启{{roomStatus.room1StartNum}}桌，还可以开启{{roomStatus.room1RemainNum}}桌 &nbsp;&nbsp;&nbsp;【欢乐竞技厅】已开启{{roomStatus.room2StartNum}}桌，还可以开启{{roomStatus.room2RemainNum}}桌 </p>
                    <p style="border-top: 1px solid #eee;padding: 7px 0" v-if="deskIdx === 1">【新手练习厅】已开启{{roomStatus.room1StartNum2}}桌，还可以开启{{roomStatus.room1RemainNum2}}桌 &nbsp;&nbsp;&nbsp;【欢乐竞技厅】已开启{{roomStatus.room2StartNum2}}桌，还可以开启{{roomStatus.room2RemainNum2}}桌 </p>
                    <p style="border-top: 1px solid #eee;padding: 7px 0" v-if="deskIdx === 2">【新手练习厅】已开启{{roomStatus.room1StartNum3}}桌，还可以开启{{roomStatus.room1RemainNum3}}桌 &nbsp;&nbsp;&nbsp;【欢乐竞技厅】已开启{{roomStatus.room2StartNum3}}桌，还可以开启{{roomStatus.room2RemainNum3}}桌 </p>
                    <p style="border-top: 1px solid #eee;padding: 7px 0" v-if="deskIdx === 3">【新手练习厅】已开启{{roomStatus.room1StartNum4}}桌，还可以开启{{roomStatus.room1RemainNum4}}桌 &nbsp;&nbsp;&nbsp;【欢乐竞技厅】已开启{{roomStatus.room2StartNum4}}桌，还可以开启{{roomStatus.room2RemainNum4}}桌 </p>
                    <p style="border-top: 1px solid #eee;padding: 7px 0" v-if="deskIdx === 4">【新手练习厅】已开启{{roomStatus.room1StartNum5}}桌，还可以开启{{roomStatus.room1RemainNum5}}桌 &nbsp;&nbsp;&nbsp;【欢乐竞技厅】已开启{{roomStatus.room2StartNum5}}桌，还可以开启{{roomStatus.room2RemainNum5}}桌 </p>
                    <p style="border-top: 1px solid #eee;padding: 7px 0" v-if="deskIdx === 5">【新手练习厅】已开启{{roomStatus.room1StartNum6}}桌，还可以开启{{roomStatus.room1RemainNum6}}桌 &nbsp;&nbsp;&nbsp;【欢乐竞技厅】已开启{{roomStatus.room2StartNum6}}桌，还可以开启{{roomStatus.room2RemainNum6}}桌 </p>
                    <p style="border-top: 1px solid #eee;padding: 7px 0" v-if="deskIdx === 6">【新手练习厅】已开启{{roomStatus.room1StartNum7}}桌，还可以开启{{roomStatus.room1RemainNum7}}桌 &nbsp;&nbsp;&nbsp;【欢乐竞技厅】已开启{{roomStatus.room2StartNum7}}桌，还可以开启{{roomStatus.room2RemainNum7}}桌 </p>
                    <p style="border-top: 1px solid #eee;padding: 7px 0" v-if="deskIdx === 7">【新手练习厅】已开启{{roomStatus.room1StartNum8}}桌，还可以开启{{roomStatus.room1RemainNum8}}桌 &nbsp;&nbsp;&nbsp;【欢乐竞技厅】已开启{{roomStatus.room2StartNum8}}桌，还可以开启{{roomStatus.room2RemainNum8}}桌 </p>
                    <p style="border-top: 1px solid #eee;padding: 7px 0" v-if="deskIdx === 8">【新手练习厅】已开启{{roomStatus.room1StartNum9}}桌，还可以开启{{roomStatus.room1RemainNum9}}桌 &nbsp;&nbsp;&nbsp;【欢乐竞技厅】已开启{{roomStatus.room2StartNum9}}桌，还可以开启{{roomStatus.room2RemainNum9}}桌 </p>

                    <section v-if="deskIdx === 2 || deskIdx === 5">
                        针对所有桌子：<el-button style="margin: 0 4px" size="small" @click="beginSetting" type="primary">公共参数设置</el-button> 保单箱状态：异常 当前保单箱连接数：0
                    </section>
                    <header style="padding: 8px 0;border-top: 1px solid #ddd">
                        <el-button size="small" type="primary" @click="updateDeskList">刷新</el-button>
                        <el-button size="small" @click="openNewDesk" type="primary">新增桌</el-button>
                        <el-button size="small" @click="openModifyDesk">参数设置</el-button>
                        <el-button size="small" type="danger" @click="deleteDesk">删除桌</el-button>
                        <el-button size="small" type="primary">桌排序</el-button>
                        <el-button v-if="deskIdx === 6" size="small" @click="beginSetting" type="primary">疯狂牛牛相关设置</el-button>
                    </header>
                    <section style="margin-bottom: 10px" v-if="deskIdx === 7">
                        <el-table
                            :data="deskList"
                            height="300"
                            highlight-current-row
                            size="small"
                            border
                            @cell-click="deskSelect"
                            style="width: 100%">
                            <el-table-column
                                prop="id"
                                label="桌ID">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="桌名">
                            </el-table-column>
                            <el-table-column
                                prop="roomName"
                                label="所属房间">
                            </el-table-column>
                            <el-table-column
                                prop="onLineNumber"
                                label="在线人数">
                            </el-table-column>
                            <el-table-column
                                prop="stateName"
                                label="桌状态">
                            </el-table-column>
                        </el-table>
                    </section>
                    <section v-else style="margin-bottom: 10px">
                        <el-table
                            :data="deskList"
                            height="300"
                            highlight-current-row
                            size="small"
                            border
                            @cell-click="deskSelect"
                            style="width: 100%">
                            <el-table-column
                                prop="id"
                                label="桌ID">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="桌名">
                            </el-table-column>
                            <el-table-column
                                prop="roomName"
                                label="所属房间">
                            </el-table-column>
                            <el-table-column
                                prop="onlineNumber"
                                label="在线人数">
                            </el-table-column>
                            <el-table-column
                                prop="stateName"
                                label="桌状态">
                            </el-table-column>
                        </el-table>
                    </section>
                </div>
            </div>
        </div>
        <div class="l-flex-1 l-flex-column">
            <div class="l-flex-1 l-relative">
                <div class="l-full" style="padding: 10px">
                    <section style="padding-top: 20px;border-top: 1px solid #ddd;">
                        <div style="margin-bottom: 10px">
                            <el-button size="small" type="primary" v-tap="{methods: refleshDeskMsg }" :disabled="!this.currentDesk">刷新</el-button>
                            <el-button style="margin-left: 18px" size="small" type="danger" disabled >清零</el-button>
                        </div>
                        <template v-if="deskIdx === 0 || deskIdx === 1 || deskIdx === 2 || deskIdx === 3 ||
                                deskIdx === 4 || deskIdx === 5 || deskIdx === 8
                            ">
                            <strong>总押分（游戏分值）: {{ sumYaFen_2 }}</strong>
                            <strong style="margin-left: 20px">总得分（游戏分值）: {{ sumDeFen_2 }}</strong>
                            <strong style="margin-left: 20px">总盈利（游戏分值）: {{ allGain_2 }}</strong>
                        </template>
                        <template v-if="deskIdx === 6">
                            <strong>总押分（游戏分值）: {{ sumYaFen_2 }}</strong>
                            <strong style="margin-left: 20px">总得分（游戏分值）: {{ sumDeFen_2 }}</strong>
                            <strong style="margin-left: 20px">总盈利（游戏分值）: {{ allGain_2 }}</strong><br>
                            <strong>奖池目前分值（游戏分值）: {{ currDesk6 }}</strong>
                        </template>
                        <template v-if="deskIdx === 7">
                            <strong>主游戏总押分（分值）: {{ sumYaFen_2 }}</strong>
                            <strong style="margin-left: 20px">主游戏总得分（分值）: {{ sumDeFen_2 }}</strong>
                            <strong style="margin-left: 20px">主游戏总盈利（分值）: {{ allGain_2 }}</strong><br>
                            <strong>比倍总押分（分值）: {{ currDesk7_yafen }}</strong>
                            <strong style="margin-left: 20px">比倍总得分（分值）: {{ currDesk7_defen }}</strong>
                            <strong style="margin-left: 20px">比倍总盈利（分值）: {{ currDesk7_allGain }}</strong>
                        </template>
                        <section style="margin: 10px 0">
                            <el-table
                                :data="userMsgList"
                                height="260"
                                size="small"
                                border
                                style="width: 100%">
                                <el-table-column
                                    prop="username"
                                    label="账号">
                                </el-table-column>
                                <el-table-column
                                    prop="nickname"
                                    label="昵称">
                                </el-table-column>
                                <el-table-column
                                    prop="gameGold"
                                    label="游戏币">
                                </el-table-column>
                                <el-table-column
                                    prop="expeGold"
                                    label="体验币">
                                </el-table-column>
                                <el-table-column
                                    prop="gameScore"
                                    label="游戏分值">
                                </el-table-column>
                                <el-table-column
                                    prop="promoterName"
                                    label="所属推广员">
                                </el-table-column>
                            </el-table>
                        </section>
                    </section>

                </div>
            </div>
            <div class="l-flex-1 l-relative">
                <div class="l-full" style="padding: 10px">
                    <section style="border-top: 1px solid #ddd;padding-top: 15px">
                        <header class="clearfix">
                            <div class="dailyPicker">
                                <el-date-picker
                                    v-model="xtLogTime"
                                    type="daterange"
                                    align="right"
                                    size="small"
                                    unlink-panels
                                    format="yyyy-MM-dd"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    @change="logTimeChange"
                                    :picker-options="pickerOptions">
                                </el-date-picker>
                            </div>
                            <el-button style="margin-left: 15px;float: left" size="small" type="primary" v-tap="{methods:getWinMsgList}">查询</el-button>
                        </header>
                        <template v-if="deskIdx === 0 || deskIdx === 2 || deskIdx === 5 || deskIdx === 6">
                            <el-table
                                :data="winMsgList"
                                height="250"
                                size="small"
                                border
                                style="width: 100%">
                                <el-table-column
                                    prop="datetime"
                                    label="开奖时间">
                                </el-table-column>
                                <el-table-column
                                    prop="sumYaFen"
                                    label="总押注(游戏分值)">
                                </el-table-column>
                                <el-table-column
                                    prop="sumDeFen"
                                    label="总出分(游戏分值)">
                                </el-table-column>
                                <el-table-column
                                    prop="result"
                                    label="结算结果(游戏分值)">
                                </el-table-column>
                                <el-table-column
                                    prop="betPeople"
                                    label="押注人数">
                                </el-table-column>
                                <el-table-column
                                    prop="resultStr"
                                    label="转盘结果">
                                </el-table-column>
                            </el-table>
                        </template>
                        <template v-if="deskIdx === 1 || deskIdx === 3 || deskIdx === 4 || deskIdx === 7 || deskIdx === 8">
                            <el-table
                                :data="winMsgList"
                                height="250"
                                size="small"
                                border
                                style="width: 100%">
                                <el-table-column
                                    prop="startDate"
                                    label="起始时间">
                                </el-table-column>
                                <el-table-column
                                    prop="endDate"
                                    label="结束时间">
                                </el-table-column>
                                <el-table-column
                                    prop="sumDeFen"
                                    label="区段总玩分">
                                </el-table-column>
                                <el-table-column
                                    prop="result"
                                    label="区段结果">
                                </el-table-column>
                                <el-table-column
                                     prop="maxOnlineNum"
                                     :label="lastLabel"
                                >
                                </el-table-column>
                            </el-table>
                        </template>

                        <div class="block">
                            <el-pagination
                                @current-change="clickPage"
                                background
                                :current-page.sync="pageNumber"
                                size="small"
                                :page-size="pageSize"
                                layout="prev, pager, next,jumper"
                                :total="totalCount">
                            </el-pagination>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {aTypes} from '~store/htyz'
    import { mTypes as userMType} from '~store/user'
    import newXyls from '~components/htyz/new_xyls.vue'
    import yaoqianshu from '~components/htyz/yaoqianshu.vue'// 摇钱树
    import dantiao from '~components/htyz/dantiao.vue'// 单挑
    import wppy from '~components/htyz/wppy.vue'// 万炮捕鱼
    import meirenyu from '~components/htyz/meirenyu.vue'// 美人鱼
    import queyimen from '~components/htyz/queyimen.vue'// 缺一门
    import huanleniuniu from '~components/htyz/huanleniuniu.vue'// 欢乐牛牛
    import shuihuzhuan from '~components/htyz/shuihuzhuan.vue'// 水浒传
    import qianpaobuyu from '~components/htyz/qianpaobuyu.vue'// 千炮捕鱼
    import dantiaosetting from '~components/htyz/dantiaosetting.vue'// 单挑公共参数设置
    import queyimensetting from '~components/htyz/queyimensetting.vue'// 缺一门公共参数设置
    import huanleniuniusetting from '~components/htyz/huanleniuniusetting.vue'// 欢乐牛牛公共参数设置
    export default {
        data () {
            return {
                lastLabel: '最高活跃人数',
                newDesk: {
                    xyls: false
                },
                dialogShow: false,
                settingDialog: false,
                initSetting: null,
                isModify: false,
                form: {
                //                    hlabel: '0',
                //                    flabel: '1',
                //                    time: 1,
                //                    timeOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                //                    content: ''
                    hlabel: null,
                    flabel: null,
                    time: null,
                    timeOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                    content: null
                },
                deskIdx: 0,
                currentDesk: null,
                deskList: null,
                desks: [
                    {
                        label: '幸运六狮',
                        getDesk: 'deskService/getDeskList',
                        getDeskList: 'deskService/getDeskList',
                        addDesk: 'deskService/addDesk',
                        updateDesk: 'deskService/updateDesk',
                        deleteDesk: 'deskService/deleteDesk',

                        getUser_: 'deskService/getDeskUser',
                        getData_: 'deskService/getDeskData',
                        getResult_: 'deskService/getDeskResult'
                    },
                    {
                        label: '摇钱树',
                        getDesk: 'deskService/getFishDeskList',
                        getDeskList: 'deskService/getFishDeskList',
                        addDesk: 'deskService/addFishDesk',
                        updateDesk: 'deskService/updateFishDesk',
                        deleteDesk: 'deskService/deleteFishDesk',

                        getUser_: 'deskService/getFishDeskUser',
                        getData_: 'deskService/getFishDeskData',
                        getResult_: 'deskService/getFishDeskResult'
                    },
                    {
                        label: '单挑',
                        getDesk: 'deskService/getCardDeskList',
                        getDeskList: 'deskService/getCardDeskList',
                        addDesk: 'deskService/addCardDesk',
                        updateDesk: 'deskService/updateCardDesk',
                        deleteDesk: 'deskService/deleteCardDesk',

                        getUser_: 'deskService/getCardDeskUser',
                        getData_: 'deskService/getCardDeskData',
                        getResult_: 'deskService/getCardDeskResult',

                        getParameter: 'deskService/getCardParameter',
                        updateParameter: 'deskService/updateCardParameter'
                    },
                    {
                        label: '万炮捕鱼',
                        getDesk: 'deskService/getBulletFishDeskList',
                        getDeskList: 'deskService/getBulletFishDeskList',
                        addDesk: 'deskService/addBulletFishDesk',
                        updateDesk: 'deskService/updateBulletFishDesk',
                        deleteDesk: 'deskService/deleteBulletFishDesk',

                        getUser_: 'deskService/getBulletFishDeskUser',
                        getData_: 'deskService/getBulletFishDeskData',
                        getResult_: 'deskService/getBulletFishDeskResult'
                    },
                    {
                        label: '美人鱼',
                        getDesk: 'deskService/getMermaidDeskList',
                        getDeskList: 'deskService/getMermaidDeskList',
                        addDesk: 'deskService/addMermaidDesk',
                        updateDesk: 'deskService/updateMermaidDesk',
                        deleteDesk: 'deskService/deleteMermaidDesk',

                        getUser_: 'deskService/getMermaidDeskUser',
                        getData_: 'deskService/getMermaidDeskData',
                        getResult_: 'deskService/getMermaidDeskResult'

                    },
                    {
                        label: '缺一门',
                        getDesk: 'deskService/getLackDeskList',
                        getDeskList: 'deskService/getLackDeskList',
                        addDesk: 'deskService/addLackDesk',
                        updateDesk: 'deskService/updateLackDesk',
                        deleteDesk: 'deskService/deleteLackDesk',

                        getUser_: 'deskService/getLackDeskUser',
                        getData_: 'deskService/getLackDeskData',
                        getResult_: 'deskService/getLackDeskResult',

                        getParameter: 'deskService/getLackParameter',
                        updateParameter: 'deskService/updateLackParameter'
                    },
                    {
                        label: '欢乐牛牛',
                        getDesk: 'deskService/getJoyDeskList',
                        getDeskList: 'deskService/getJoyDeskList',
                        addDesk: 'deskService/addJoyDesk',
                        updateDesk: 'deskService/updateJoyDesk',
                        deleteDesk: 'deskService/deleteJoyDesk',

                        getUser_: 'deskService/getJoyDeskUser',
                        getData_: 'deskService/getJoyDeskData',
                        getResult_: 'deskService/getJoyDeskResult',
                        getParameter: 'deskService/getJoyPrivateDeskParameter',
                        updateParameter: 'updateJoyPrivateDeskParameter'
                    },
                    {
                        label: '水浒传',
                        getDesk: 'waterDeskService/getWaterDeskList',
                        getDeskList: 'waterDeskService/getWaterDeskList',
                        addDesk: 'waterDeskService/addWaterDesk',
                        updateDesk: 'waterDeskService/updateWaterDesk',
                        deleteDesk: 'waterDeskService/deleteWaterDesk',

                        getUser_: 'waterDeskService/getWaterDeskUser',
                        getData_: 'waterDeskService/getWaterDeskData',
                        getResult_: 'waterDeskThirtyMinResultService/getWaterDeskThirtyMinResult'
                    },
                    {
                        label: '千炮捕鱼',
                        getDesk: 'deskService/getThousandFishDeskList',
                        getDeskList: 'deskService/getThousandFishDeskList',
                        addDesk: 'deskService/addThousandFishDesk',
                        updateDesk: 'deskService/updateThousandFishDesk',
                        deleteDesk: 'deskService/deleteThousandFishDesk',

                        getUser_: 'deskService/getThousandFishDeskUser',
                        getData_: 'deskService/getThousandFishDeskData',
                        getResult_: 'deskService/getThousandFishDeskResult'
                    }

                ],

                userMsgList: [
                //                    {'answer': '-1',
                //                        'bindingName': '',
                //                        'borrow': 0,
                //                        'boxGameGold': 0,
                //                        'boxLottery': 0,
                //                        'card': '-1',
                //                        'currentGameScore': 19800,
                //                        'displayStatus': 0,
                //                        'expeGold': 0,
                //                        'expeScore': 0,
                //                        'expiryNum': 0,
                //                        'gameGold': 4600,
                //                        'gameScore': 0,
                //                        'id': 63,
                //                        'lastDeskId': 3,
                //                        'lastGame': 0,
                //                        'level': 1,
                //                        'levelScore': 0,
                //                        'loginDate': '2018-02-04 09:26:08',
                //                        'lottery': 0,
                //                        'name': '',
                //                        'nickname': 'Z1',
                //                        'overflow': 0,
                //                        'password': 'e10adc3949ba59abbe56e057f20f883e',
                //                        'payMoney': 0,
                //                        'phone': '-',
                //                        'photoId': 3,
                //                        'promoterId': 0,
                //                        'promoterName': 'admin',
                //                        'question': '-1',
                //                        'registDate': '2018-01-27 21:35:37',
                //                        'safeBox': 0,
                //                        'security': 0,
                //                        'sex': '男',
                //                        'shareClearingTime': '',
                //                        'shutupStatus': 0,
                //                        'specialMark': 0,
                //                        'status': 0,
                //                        'subUserCount': 0,
                //                        'type': 1,
                //                        'username': '00250000',
                //                        'warningStatus': 0}

                ],

                sumYaFen_2: 0,
                sumDeFen_2: 0,
                allGain_2: 0,

                currDesk6: 0,
                currDesk7_yafen: 0,
                currDesk7_defen: 0,
                currDesk7_allGain: 0,

                pickerOptions: {
                    disabledDate (time) {
                        return time.getTime() > Date.now()
                    },
                    shortcuts: [{
                        text: '最近一周',
                        onClick (picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近一个月',
                        onClick (picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近三个月',
                        onClick (picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                            picker.$emit('pick', [start, end])
                        }
                    }]
                },
                totalCount: 8,
                pageNumber: 1,
                pageSize: 8,

                xtLogTime: '',
                xtStartTime: null,
                xtEndTime: null,

                winMsgList: [
                //                    {
                //                    animal: 10,
                //                    awardGold: 5455,
                //                    betPeople: 1,
                //                    color: 0,
                //                    datetime: '2018-02-04 09:28:57',
                //                    deskId: 3,
                //                    globalType: 0,
                //                    id: 278987,
                //                    lightningBeilv: 0,
                //                    luckAnimal: 0,
                //                    luckNum: 0,
                //                    luckType: 0,
                //                    moreInfo: '',
                //                    result: 200,
                //                    resultStr: '闲 普通绿兔子',
                //                    roomId: 2,
                //                    songDengCount: 0,
                //                    sumDeFen: 0,
                //                    sumYaFen: 200,
                //                    type: 0,
                //                    zxh: 2
                //                }
                ]

            }
        },
        components: {
            newXyls, yaoqianshu, dantiao, wppy, meirenyu, queyimen, huanleniuniu, shuihuzhuan, qianpaobuyu, dantiaosetting, queyimensetting, huanleniuniusetting
        },
        computed: {
            roomStatus () {
                return this.$store.state.user.loginInfo.roomStatus
            },
            gameStatus () {
                return this.$store.state.user.loginInfo.gameStatus
            },
            socketData () {
                return this.$store.state.websocket.data
            }
        },
        watch: {
            socketData (data) {
                if (data && data.method === 'syncRoomStatus') {
                    this.$store.commit(userMType.updateRoomStatus, data.args[0])
                    // console.log(data.args[0])
                }
            },

            async deskIdx (val) {
                this.currentDesk = null
                this.deskList = null
                this.updateDeskList()

                this.userMsgList = []
                this.winMsgList = []
                this.xtLogTime = null

                if (Number(val) === 7) {
                    this.lastLabel = ''
                } else {
                    this.lastLabel = '最高活跃人数'
                }
            }
        },
        methods: {
            refleshDeskMsg () {
                if (this.currentDesk) {
                    this.deskSelect(this.currentDesk)
                }
            },
            async deskSelect (desk) {
                this.currentDesk = desk

                // 传入桌子id  获取第二列表的头部信息
                let getData = await this.$store.dispatch(aTypes.commonInvoke, {method: this.desks[this.deskIdx].getData_, args: Number(desk.id)})
                if (Number(this.deskIdx) === 6) {
                    if (getData && getData.sumDeFen !== undefined) {
                        this.sumYaFen_2 = getData.sumYaFen
                        this.sumDeFen_2 = getData.sumDeFen
                        this.allGain_2 = getData.sumWin
                        this.currDesk6 = getData.currentJackpotScore
                    }
                } else if (Number(this.deskIdx) === 7) {
                    if (getData && getData.sumDeFen !== undefined) {
                        this.sumYaFen_2 = getData.mainGameSumYaFen
                        this.sumDeFen_2 = getData.mainGameSumDeFen
                        this.allGain_2 = Number(getData.mainGameSumYaFen) - Number(getData.mainGameSumDeFen)

                        this.currDesk7_yafen = getData.diceGameSumYaFen
                        this.currDesk7_defen = getData.diceGameSumDeFen
                        this.currDesk7_allGain = Number(getData.diceGameSumYaFen) - Number(getData.diceGameSumDeFen)
                    }
                } else {
                    if (getData && getData.sumDeFen !== undefined) {
                        this.sumYaFen_2 = getData.sumYaFen
                        this.sumDeFen_2 = getData.sumDeFen
                        this.allGain_2 = Number(getData.sumYaFen) - Number(getData.sumDeFen)
                    }
                }

                let getUser_ = await this.$store.dispatch(aTypes.commonInvoke, {method: this.desks[this.deskIdx].getUser_, args: Number(desk.id)})

                console.log(getUser_)
                if (getUser_ && getUser_.length >= 0) {
                    this.userMsgList = getUser_
                }

                let getResult_ = await this.$store.dispatch(aTypes.commonInvoke_arr, {method: this.desks[this.deskIdx].getResult_,
                    args: [
                        Number(desk.id), this.format(new Date()), this.format(new Date()), { 'list': [],
                            'order': '',
                            'orderBy': '',
                            'pageCount': 0,
                            'pageNumber': 1,
                            'pageSize': 8,
                            'totalCount': 0 }
                    ] })
                console.log(getResult_)
                if (getResult_ && getResult_.list) {
                    let copyList = getResult_.list
                    this.winMsgList = copyList
                    // 处理页码
                    this.totalCount = getResult_.totalCount
                    this.pageNumber = getResult_.pageNumber
                    this.pageSize = getResult_.pageSize
                }
            },
            openModifyDesk () {
                this.isModify = true
                if (!this.currentDesk) {
                    return this.$message({
                        message: '请选择要修改的桌子',
                        type: 'error',
                        duration: 1200
                    })
                }
                this.dialogShow = true
            },
            async beginSetting () {
                if (this.desks[this.deskIdx].getParameter) {
                    this.initSetting = await this.$store.dispatch(aTypes.commonInvoke, {method: this.desks[this.deskIdx].getParameter })
                    this.settingDialog = true
                }
            },
            async modifyCommonSetting (args) {
                this.$confirm('确认修改?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    try {
                        let ret = await this.$store.dispatch(aTypes.commonInvoke, {method: this.desks[this.deskIdx].updateParameter, args})
                        if (ret.success) {
                            this.settingDialog = false
                            return this.$message({
                                message: '修改成功！',
                                type: 'success',
                                duration: 1200
                            })
                        } else {
                            return this.$message({
                                message: ret.message,
                                type: 'error',
                                duration: 1200
                            })
                        }
                    } catch (e) {
                        return this.$message({
                            message: '修改失败',
                            type: 'error',
                            duration: 1200
                        })
                    }
                })
            },
            openNewDesk () {
                this.isModify = false
                this.dialogShow = true
            },
            async deleteDesk () {
                if (!this.currentDesk) {
                    return this.$message({
                        message: '请选择要删除的桌子',
                        type: 'error',
                        duration: 1200
                    })
                } else {
                    this.$confirm('此操作将删除桌子, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(async () => {
                        let ret = await this.$store.dispatch(aTypes.commonInvoke, {method: this.desks[this.deskIdx].deleteDesk, args: this.currentDesk.id})
                        if (ret.success) {
                            this.currentDesk = null
                            this.updateDeskList()
                        } else {
                            return this.$message({
                                message: ret.message,
                                type: 'error',
                                duration: 1200
                            })
                        }
                    })
                }
            },

            async onSubmit (args) {
                try {
                    let ret
                    if (this.isModify) {
                        ret = await this.$store.dispatch(aTypes.commonInvoke, {method: this.desks[this.deskIdx].updateDesk, args})
                    } else {
                        ret = await this.$store.dispatch(aTypes.commonInvoke, {method: this.desks[this.deskIdx].addDesk, args})
                    }
                    if (!ret.success) {
                        this.$message({
                            message: ret.message,
                            type: 'error',
                            duration: 1200
                        })
                    } else {
                        this.updateDeskList()
                        this.dialogShow = false
                        this.$message({
                            message: '更新成功',
                            type: 'success',
                            duration: 1200
                        })
                    }
                } catch (e) {
                    this.$message({
                        message: this.isModify ? '更新失败' : '新增失败',
                        type: 'error',
                        duration: 1200
                    })
                }
            },
            async updateDeskList () {
                this.deskList = await this.$store.dispatch(aTypes.getDeskList, this.desks[this.deskIdx].getDeskList)
                this.deskList.forEach((desk) => {
                    desk.roomName = desk.roomId === 2 ? '欢乐竞技厅' : '新手练习厅'
                    desk.stateName = desk.state === 1 ? '开放' : '锁定'
                })
            },
            async updateDTStatus () {
                if (this.form.hlabel === '0') {
                    await this.$store.dispatch(aTypes.updateDTStatus, {})
                } else if (this.form.hlabel === '-1' && this.form.flabel === '1') {
                    await this.$store.dispatch(aTypes.updateDTStatus, {statusIndex: 1})
                } else if (this.form.hlabel === '-1' && this.form.flabel === '2') {
                    if (this.form.content === '') {
                        return this.$message({
                            message: '公告内容不能为空',
                            type: 'warning',
                            duration: 1200
                        })
                    }
                    await this.$store.dispatch(aTypes.updateDTStatus, {
                        statusIndex: 2,
                        content: this.form.content,
                        time: this.form.time
                    })
                }

                this.$message({
                    message: '更新成功',
                    type: 'success',
                    duration: 1200
                })
            },

            // new
            async getWinMsgList () {
                if (!this.xtStartTime || !this.xtEndTime) {
                    this.$message({
                        message: '请选择查询时间',
                        type: 'error',
                        duration: 1200
                    })
                    return false
                }
                //    修改
                let getResult_ = await this.$store.dispatch(aTypes.commonInvoke_arr, {method: this.desks[this.deskIdx].getResult_,
                    args: [
                        Number(this.currentDesk.id), this.xtStartTime, this.xtEndTime, { 'list': [],
                            'order': '',
                            'orderBy': '',
                            'pageCount': 0,
                            'pageNumber': 1,
                            'pageSize': 8,
                            'totalCount': this.totalCount }
                    ] })
                console.log(getResult_)
                if (getResult_ && getResult_.list) {
                    let copyList = getResult_.list
                    this.winMsgList = copyList
                    // 处理页码
                    this.totalCount = getResult_.totalCount
                    this.pageNumber = getResult_.pageNumber
                    this.pageSize = getResult_.pageSize
                }
            },
            logTimeChange (val) {
                //                取到值
                this.xtStartTime = this.format(val[0])
                this.xtEndTime = this.format(val[1])
            },
            format (time, format = 'yyyy-MM-dd') {
                let t = new Date(time)
                let tf = function (i) {
                    return (i < 10 ? '0' : '') + i
                }
                return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                    switch (a) {
                    case 'yyyy':
                        return tf(t.getFullYear())
                    case 'MM':
                        return tf(t.getMonth() + 1)
                    case 'mm':
                        return tf(t.getMinutes())
                    case 'dd':
                        return tf(t.getDate())
                    case 'HH':
                        return tf(t.getHours())
                    case 'ss':
                        return tf(t.getSeconds())
                    }
                })
            },
            async clickPage (size) {
                // 分页  对应第三个表格的分页
                let getResult_ = null

                // 修改 getDeskResult 、 修改id  对应的 方法
                if (!this.xtStartTime || !this.xtEndTime) {
                    getResult_ = await this.$store.dispatch(aTypes.commonInvoke_arr, {method: this.desks[this.deskIdx].getResult_,
                        args: [
                            Number(this.currentDesk.id), this.format(new Date().getTime() - 3600 * 1000 * 24 * 2), this.format(new Date()), { 'list': [],
                                'order': '',
                                'orderBy': '',
                                'pageCount': 0,
                                'pageNumber': Number(size),
                                'pageSize': 8,
                                'totalCount': this.totalCount }
                        ] })
                } else {
                    getResult_ = await this.$store.dispatch(aTypes.commonInvoke_arr, {method: this.desks[this.deskIdx].getResult_,
                        args: [
                            Number(this.currentDesk.id), this.xtStartTime, this.xtEndTime, { 'list': [],
                                'order': '',
                                'orderBy': '',
                                'pageCount': 0,
                                'pageNumber': Number(size),
                                'pageSize': 8,
                                'totalCount': this.totalCount }
                        ] })
                }

                if (getResult_ && getResult_.list) {
                    let copyList = getResult_.list
                    this.winMsgList = copyList
                    // 处理页码
                    this.totalCount = getResult_.totalCount
                    this.pageNumber = getResult_.pageNumber
                    this.pageSize = getResult_.pageSize
                }
            }
        },
        async mounted () {
            await this.updateDeskList()

            if (this.gameStatus) {
                if (this.gameStatus.statusIndex === 0) {
                    this.form.hlabel = '0'
                } else if (this.gameStatus.statusIndex === 1) {
                    this.form.hlabel = '-1'
                    this.form.flabel = '1'
                } else if (this.gameStatus.statusIndex === 2) {
                    console.log(555)
                    this.form.hlabel = '-1'
                    this.form.flabel = '2'
                    this.form.content = this.gameStatus.content
                    this.form.time = this.gameStatus.time
                }
            }
        }
    }
</script>
<style scoped>
    .el-pagination {
        text-align: center;
        margin: 25px 0;
    }
    .gameHomeSel {
        padding: 10px 0;
    }
    .dailyPicker {
        margin-bottom: 10px;
        float: left;
    }
    .newTop{
        height: 180px !important;
    }
    .newTop2{
        height: 290px !important;
    }

    .el-select>.el-input {
        margin-top: 10px;
    }
    @media (max-width: 768px) {
        .top button{
            margin-left:10px;
        }
        header button{
            padding:9px 6px;
        }
        .el-date-editor--daterange.el-input__inner{
            width:100%;
        }
       .mobile-gg.l-flex-row{
           display: block;
       }
        header button{
            padding: 9px 4px;
            font-size:10px;
        }

    }
</style>
