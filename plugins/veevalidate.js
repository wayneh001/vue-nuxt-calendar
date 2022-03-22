import Vue from "vue";
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import tw from "vee-validate/dist/locale/zh_TW.json";

// 安裝所有 VeeValidate 規則
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

localize("zh_TW", tw);

// 註冊全域元件
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
