<template>
  <div class="container py-5">
    <form>
      <!-- 標題 -->
      <div class="mb-3">
        <div class="d-flex justify-content-between align-items-center bg-light">
          <h3 class="m-0">
            <input
              type="text"
              class="form-control form-control-title bg-light"
              name="會議名稱"
              placeholder="請輸入會議名稱"
              v-model="editedMeeting.title"
              ref="titleFoucs"
              autofocus
              :readonly="!titleEdit"
              @keyup.enter="doneTitleEdit"
            />
          </h3>
          <a href="#" @click="onTitleEdit()"
            ><i class="fa fas fa-pencil me-2"></i
          ></a>
        </div>
      </div>
      <!-- 申請人 -->
      <CInput
        name="申請人"
        rules="required"
        className="mb-3"
        icon="fa-user"
        label="申請人"
        type="text"
        reuqired
        placeholder="請輸入申請人姓名"
        v-model="editedMeeting.applicant"
      />
      <!-- 單位 -->
      <CInput
        name="單位"
        rules="required"
        className="mb-3"
        icon="fa-user-group"
        label="單位"
        type="text"
        required
        placeholder="請輸入單位名稱"
        v-model="editedMeeting.unit"
      />
      <!-- 電話與信箱 -->
      <div class="row mb-3">
        <div class="col-6">
          <CInput
            name="聯絡電話"
            rules="required"
            icon="fa-phone"
            label="聯絡電話"
            type="text"
            reuqired
            pattern="[0-9]{5}"
            placeholder="請輸入聯絡電話"
            v-model="editedMeeting.tel"
          />
        </div>
        <div class="col-6">
          <CInput
            name="電子信箱"
            rules="required"
            icon="fa-envelope"
            label="電子信箱"
            type="email"
            placeholder="請輸入電子信箱"
            v-model="editedMeeting.email"
          />
        </div>
      </div>
      <!-- 日期 -->
      <CInput
        name="日期"
        rules="required"
        className="mb-3"
        icon="fa-calendar-days"
        label="日期"
        type="date"
        v-model="editedMeeting.startDate"
        @input="dateSync"
        :min="this.getDateStr(this.today())"
      />
      <!-- 時間 -->
      <div class="mb-3">
        <div class="row">
          <div class="col-5">
            <i class="fa fas fa-clock"></i>
            <label class="form-label">開始時間</label>
            <select class="form-select" v-model="editedMeeting.startTime">
              <option
                v-for="(item, index) in time.slice(0, 20)"
                :key="index"
                :disabled="startTimeSet(index)"
              >
                {{ item }}
              </option>
            </select>
          </div>
          <div class="col-2 text-center">~</div>
          <div class="col-5">
            <i class="fa fas fa-clock"></i>
            <label class="form-label">結束時間</label>
            <select class="form-select" v-model="editedMeeting.endTime">
              <option
                v-for="(item, index) in time.slice(1)"
                :key="index"
                :disabled="endTimeSet(index)"
              >
                {{ item }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <!-- 例行會議 -->
      <div class="mb-3">
        <i class="fa fas fa-calendar-week"></i>
        <label class="form-label">例行會議</label>
        <div class="d-flex justify-content-between bg-light p-2">
          <div
            class="form-check form-check-inline"
            v-for="(item, index) in routine"
            :key="index"
          >
            <input
              :id="item"
              class="form-check-input"
              name="item"
              type="radio"
              v-model="editedMeeting.routine"
              :value="item"
            />
            <label class="form-check-label" :for="item">{{ item }}</label>
          </div>
        </div>
      </div>
      <CInput
        className="mb-3"
        icon="fa-calendar-check"
        label="例行會議結束日期"
        type="date"
        :disabled="editedMeeting.routine === '非例行會議'"
        v-model="editedMeeting.routineEndDate"
      />
      <!-- 底圖 -->
      <div class="mb-5">
        <i class="fa fas fa-image"></i>
        <label class="form-label">底圖</label>
        <button
          class="btn btn-main w-100"
          type="button"
          @click.prevent="onChangeBG"
        >
          底圖
        </button>
      </div>
      <!-- 儲存與取消 -->
      <div class="button row mb-3">
        <div class="col-6">
          <button
            class="btn btn-light w-100"
            type="button"
            @click.prevent="onCancel()"
          >
            取消
          </button>
        </div>
        <div class="col-6">
          <button
            class="btn btn-main w-100"
            type="submit"
            @click.prevent="onSave(editedMeeting)"
            :disabled="dataChangeCount === 0"
          >
            儲存
          </button>
        </div>
      </div>
    </form>
    <CModal
      ref="Modal"
      :image="editedMeeting.image"
      @setImage="onSetImage"
    ></CModal>
    <CCheckModal ref="checkModal" />
  </div>
</template>
<script>
import CInput from "~/components/CInput";
import CModal from "~/components/CModal";
import GeneralMathMixin from "@/components/Methods/GeneralMathMixin";
export default {
  mixins: [GeneralMathMixin],
  data() {
    return {
      editedMeeting: this.meeting
        ? { ...this.meeting }
        : {
            id: "",
            title: "",
            applicant: "",
            unit: "",
            tel: "",
            email: "",
            startDate: "",
            endDate: "",
            startTime: "",
            endTime: "",
            routine: "非例行會議",
            routineEndDate: "",
            image: {
              id: "",
              name: "",
              altName: "",
              dataUrl: "",
            },
            classes: "",
          },
      titleEdit: true,
      time: [
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
      ],
      routine: ["非例行會議", "每日", "每週", "每月"],
      invalidTime: [],
      dataChangeCount: 0,
    };
  },
  props: {
    meeting: {
      type: Object,
      require: false,
    },
    meetings: {
      type: Array,
      require: false,
    },
  },
  component: { CInput, CModal },
  methods: {
    // 開啟編輯標題
    onTitleEdit() {
      this.titleEdit = true;
      this.$refs.titleFoucs.focus();
    },
    // 完成編輯標題
    doneTitleEdit() {
      this.titleEdit = false;
      this.$refs.titleFoucs.blur();
    },
    // 開啟選取背景圖彈窗
    onChangeBG() {
      this.$refs.Modal.showModal();
    },
    // 設定背景圖彈窗
    onSetImage(iamge) {
      this.editedMeeting.image = {...iamge};
      // console.log(this.editedMeeting.image.name);
    },
    // 取消編輯
    onCancel() {
      let motion = "cancel";
      this.$emit("close", "", motion, this.dataChangeCount);
    },
    // 表單檢查，依序檢查 1. 有無未輸入欄位 2. 輸入欄位 ( 聯絡電話與電子信箱 ) 格式是否正確 3. 所選之日期、開始時間與結束時間是否與現有會議衝突
    onCheck(item) {
      let dictionary = {
        title: "會議名稱",
        applicant: "申請人",
        unit: "單位",
        tel: "聯絡電話",
        email: "電子信箱",
        startDate: "日期",
        startTime: "開始時間",
        endTime: "結束時間",
      };
      let keys = [];
      for (let key in item) {
        if (item[key] === "" && dictionary[key]) {
          keys.push(`${dictionary[key]}`);
        }
      }
      if (keys.length === 0) {
        let formErr = this.onFormateCheck(item);
        if (formErr === "") {
          formErr = this.onTimeCheck(item);
          if (formErr === "") {
            return true;
          } else {
            this.$refs.checkModal.showModal(keys, "timeConflict", formErr);
          }
        } else {
          this.$refs.checkModal.showModal(keys, "formatError", formErr);
          return false;
        }
      } else {
        this.$refs.checkModal.showModal(keys, "missing", "");
        return false;
      }
    },
    // 聯絡電話與電子信箱格式檢查
    onFormateCheck(item) {
      const ef =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!/^[0-9]{5}$/.test(item.tel)) {
        return "聯絡電話格式不正確";
      } else if (!ef.test(item.email)) {
        return "電子郵件格式不正確";
      } else {
        return "";
      }
    },
    // 取得佔用時間點標籤區段 ( 會議以半小時為單位，藉由計算開始與結束時間，圈選出含開始不含結束在內的所有時間點標籤 )
    getTimeSequence(start, end) {
      let time = [...this.time];
      let si = time.findIndex((e) => e === start);
      let ei = time.findIndex((e) => e === end);
      let sequence = time.slice(si, ei);
      return sequence;
    },
    // 取得無法使用時間數據。將今天以後的所有會議日期與時間點標籤區段存入
    getInvalidTime(list) {
      let today = this.getDateStr(this.today());
      let datePool = [];
      let array = [];
      let f = this.getTimeSequence;
      list.forEach(function (efe) {
        if (efe.startDate >= today) {
          if (!datePool.includes(efe.startDate)) {
            let obj = {
              date: "",
              time: [],
            };
            datePool.push(efe.startDate);
            obj.date = efe.startDate;
            obj.time = [...f(efe.startTime, efe.endTime)];
            array.push(obj);
          } else {
            let i = array.findIndex(function (efi) {
              return efi.date === efe.startDate;
            });
            array[i].time += f(efe.startTime, efe.endTime);
          }
        }
      });
      this.invalidTime = array;
    },
    // 檢查時間，將所選開始日期、與佔用的時間點標籤區段是否與無法使用時間數據比對，確認時否有重疊
    onTimeCheck(item) {
      if (item.startDate !== this.meeting.startDate || item.startTime !== this.meeting.startTime || item.endTime !== this.meeting.endTime) {
        let itemSequence = this.getTimeSequence(item.startTime, item.endTime);
        let invalidTime = this.invalidTime;
        if (invalidTime.filter((e) => e.date === item.startDate).length === 0) {
          return "";
        } else {
          let results = [];
          itemSequence.forEach(function (eseq) {
            invalidTime.forEach(function (einv) {
              let result = einv.time.indexOf(eseq);
              results.push(result);
            });
          });
          if (results.filter((e) => e !== -1).length === 0) {
            return "";
          } else {
            return "會議時間衝突，該時段已有預約會議，請另外選擇時間";
          }
        }
      } else {
        return "";
      }
    },
    // 儲存事件
    onSave(item) {
      let motion = "save";
      if (this.onCheck(item)) {
        this.$emit("close", item, motion);
      }
    },
    // 取得今年最後一天，作為預設的例行會議到期日
    getLastDay() {
      let date = new Date();
      let ld = date.getFullYear();
      if (this.editedMeeting.routineEndDate === "") {
        this.editedMeeting.routineEndDate = `${ld.toString()}-12-31`;
      }
    },
    // 連動開始日與結束日 ( 此專案中不會出現跨日期事件，然而套版有相關屬性，藉此同步避免出錯 )
    dateSync() {
      this.editedMeeting.endDate = this.editedMeeting.startDate;
    },
    // 無效化開始時間點標籤，依據所選日期與當前時間無效化已過去的時間點標籤
    startTimeSet(index) {
      if (
        this.today().getFullYear() ===
          this.formatDate(this.editedMeeting.startDate).getFullYear() &&
        this.today().getMonth() ===
          this.formatDate(this.editedMeeting.startDate).getMonth() &&
        this.today().getDate() ===
          this.formatDate(this.editedMeeting.startDate).getDate()
      ) {
        let key = this.time.findIndex(
          (item) =>
            item.substr(0, 2) === (this.today().getHours() + 2).toString()
        );
        if (index <= key) {
          return true;
        }
      }
    },
    // 無效化結束時間點標籤，依據所選日期、當前時間與已選之開始時間點標籤無效化結束時間點標籤
    endTimeSet(index) {
      if (
        this.today().getFullYear() ===
          this.formatDate(this.editedMeeting.startDate).getFullYear() &&
        this.today().getMonth() ===
          this.formatDate(this.editedMeeting.startDate).getMonth() &&
        this.today().getDate() ===
          this.formatDate(this.editedMeeting.startDate).getDate()
      ) {
        let key = this.time.findIndex(
          (item) =>
            item.substr(0, 2) === (this.today().getHours() + 2).toString()
        );
        let key2 = this.time.findIndex(
          (item) => item === this.editedMeeting.startTime
        );
        if (index <= key || index <= key2 - 1) {
          return true;
        }
      }
    },
  },
  watch: {
    editedMeeting: {
      handler: function (newValue) {
        if (this.meeting !== undefined) {
          this.dataChangeCount++;
        } else {
          let array = [];
          for (let k in newValue) {
            array.push(newValue[k]);
          }
          for (let i = 1; i < 10; i++) {
            if (array[i] !== "") {
              this.dataChangeCount++;
              break;
            } else {
              this.dataChangeCount = 0;
            }
          }
        }
      },
      deep: true,
    },
  },
  mounted() {
    if (this.editedMeeting.title !== "") {
      this.titleEdit = false;
    }
    this.getLastDay();
    this.getInvalidTime(this.meetings);
  },
};
</script>
<style scoped>
.notice {
  background-color: #e1e3fb;
}

.form-control-title {
  font-size: calc(1.275rem + 0.3vw);
  border-width: 0;
  color: #000;
}

.form-control-title:read-only {
  border-color: none;
  box-shadow: none;
  color: #6c757d;
}
</style>
