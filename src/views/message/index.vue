<style lang="scss">
@import "../../lib/css/mixin";

.chat-manager {
  font-size: 16px;
  color: #606266;
  .content {
    background: #fff;
    margin: 10px;
    padding: 20px;
    height: calc(100vh-30px);
    .chat-info {
      margin-top: 20px;
      border: 1px solid #f1f1f1;
      max-height: 600px;
      min-height: 600px;
      padding: 10px;
      overflow-y: auto;
      border-radius: 5px;
      overflow-x: hidden;
    }
    .bottom-btn {
      position: fixed;
      bottom: 10px;
      right: 0px;
      margin-left: auto;
      margin-right: auto;
      background: #fff;
      width: 100%;
      padding: 10px 0;
      .bottom {
        width: 330px;
        margin: 0 auto;
        .input {
          width: 250px;
        }
        .btn {
          width: 70px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="chat-manager">
    <div class="content">
      <div>
        <span>
          用户：
          {{userName}}
        </span>
        <span>房间号：{{houseNum}}</span>
      </div>
      <!-- <div>
        <span>房间号:</span>
        <el-input v-model="houseNum" style="margin-top:20px;width:40%"></el-input>
        <el-button type="primary" @click="connentSocket" :disabled="showConnBtn">加入</el-button>
      </div>-->
      <div v-chat-scroll class="chat-info">
        <div v-for="(item,index) in msgList" :key="index" style="padding-bottom:5px">
          <div v-if="!item.userId" style="text-align:center;color:#888888">{{item.msg}}</div>
          <div v-else-if="userId == item.userId" style="text-align:right">
            <span
              style="padding: 4px 4px;border: 1px solid #e7e7e7;border-radius:2px;display:inline-block"
            >{{item.msg}}</span>
            <!-- {{':'+ item.name}} -->
            <img :src="userInfo.avatar" style="width:30px;height:30px;border-radius:50%" />
          </div>
          <div v-else style="text-align:left">
            <!-- {{item.name+':' }} -->
            <img src="../../assets/image/user.jpg" style="width:30px;height:30px;border-radius:50%" />
            <span
              style="padding: 4px 4px;border: 1px solid #e7e7e7;border-radius:2px;display:inline-block"
            >{{item.msg}}</span>
          </div>
        </div>
      </div>
      <div class="bottom-btn">
        <div class="bottom">
          <el-input
            v-model="inputValue"
            class="input"
            placeholder="输入信息......"
            @keyup.enter.native="sendMsg"
          ></el-input>
          <el-button
            type="primary"
            @click="sendMsg"
            :disabled="!showConnBtn"
            :focus="isfocus"
            class="btn"
          >发送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "userManager",
  data() {
    return {
      socket: undefined,
      inputValue: undefined,
      messages: "",
      houseNum: 520,
      msgList: [],
      userName: "ppz",
      showConnBtn: false,
      userId: "",
      msgId: 0,
      isfocus: false,
      userInfo: {},
    };
  },
  computed: {},
  methods: {
    //连接
    connectSocket() {
      this.socket = io("http://172.16.16.43:3000", {
        path: "/ppz",
        query: {
          room: this.houseNum,
          userId: this.userInfo.username,
        },
        transports: ["websocket"],
      });
      //   this.socket = io("https://rtc.lhy1314.com", {
      //     path: "/ppz",
      //     query: {
      //       room: this.houseNum,
      //       userId: this.userInfo.username
      //     }
      //   });
      this.socket.on("connect", () => {
        console.log(this.socket.id, 14585); // 'G5p5...'
      });

      this.socket.on("disconnect", () => {
        // console.log(this.socket.id, 14585); // 'G5p5...'
      });

      console.log("connect sucess");
      let self = this;
      //监听收信息的方法 收到消息后回复
      this.socket.on("message", (res) => {
        console.log(res);
        let msg = res.msg;
        self.msgList.push({
          msg: msg.content,
          userId: res.userId,
          msgId: res.msgId,
        });
        self.msgId = res.msgId;
        const replyMsg = res;
        replyMsg.action = "reply";
         //注意，收到别人发送的消息成功后 要给服务器回复，将userId改为自己的id 服务器好更新群消息中的最后消息记录
        replyMsg.userId = self.userInfo.id;
        self.socket.emit("reply", replyMsg);
      });

      this.socket.on("receive", (res) => {
        console.log(res);
        let msg = res.msg;
        self.msgList.push({
          msg: msg.content,
          userId: res.userId,
          msgId: res.msgId,
        });
        this.msgId = res.msgId;
        const replyMsg = res;
        replyMsg.action = "reply";
        this.socket.emit("reply", replyMsg);
        console.log("收到回复");
      });
      //监听加入房间的消息
      this.socket.on("joined", (res) => {
        console.log("joined room:" + res.groupId);
        // self.messages = self.messages + " " + room + " " + id + " " + users;
        self.msgList.push({ msg: res.userId + ":进入房间" });
      });
      //连接后发送进入房间的消息
      let postData = {
        action: "join",
        groupId: this.houseNum,
        userId: this.userInfo.id,
        msgId: this.msgId,
        msg: {
          content: "join",
          type: 1,
        },
      };
      this.socket.emit("join", postData);
      this.showConnBtn = true;
    },
    //发送信息
    sendMsg() {
      console.log("send msg:" + this.inputValue);
      if (!this.inputValue) {
        this.$message({
          message: "请输入信息",
          type: "warning",
        });
        return;
      }
      let postData = {
        action: "message",
        groupId: this.houseNum,
        userId: this.userInfo.id,
        msgId: ++this.msgId,
        msg: {
          content: this.inputValue,
          type: 1,
        },
      };
      this.socket.emit("message", postData);
      this.inputValue = "";
      this.isfocus = true;
    },
  },
  created() {
    this.userName = this.$route.query.username;
    this.userId = this.$route.query.id;
    this.userInfo = JSON.parse(sessionStorage.getItem("user"));
    this.connectSocket(); //连接socket
  },
  beforeDestroy() {
    this.socket.emit(
      "leave",
      this.houseNum,
      this.userName,
      this.userInfo.username
    );
  },
};
</script>
