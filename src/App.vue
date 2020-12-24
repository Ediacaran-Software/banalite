<template>
  <div
    class="view login"
    :style="{ backgroundColor: state.themeColor }"
    v-if="state.username === '' || state.username === null"
  >
    <!-- directive modifier -->
    <form action="" class="login-form" @submit.prevent="Login">
      <div class="form-inner">
        <h1>Login to Banalite</h1>
        <label for="username">Username</label>
        <input type="text" v-model="inputUsername" placeholder="Please enter your username" />
        <input type="submit" value="Login" :style="{ backgroundColor: state.themeColor }" />
      </div>
    </form>
  </div>

  <div class="view chat" :style="{ backgroundColor: state.themeColor }" v-else>
    <header>
      <button class="logout" @click="Logout">Logout</button>
      <button class="change-color" @click="ChangeThemeColor">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white">
          <path
            d="M465.499307 1021.354667c-21.504 0-44.117333-2.048-68.693334-5.12l-6.144-1.024c-174.336-26.624-293.290667-195.925333-298.410666-203.093334C-76.026027 555.776 8.11264 296.277333 167.08864 152.661333 325.04064 9.045333 588.635307-52.48 819.37664 133.205333c148.736 119.978667 193.877333 286.122667 195.925333 293.290667v2.048c21.504 116.906667 4.096 203.093333-52.309333 258.474667-86.186667 83.114667-228.693333 56.405333-248.234667 52.309333-26.709333-3.072-46.165333 5.12-60.501333 22.528-15.36 19.456-18.432 45.141333-13.312 60.501333 14.336 43.093333 16.384 75.861333 6.144 100.522667-29.781333 64.682667-90.282667 98.474667-181.589333 98.474667z m-65.621334-67.669334l6.144 1.024c99.498667 15.36 160-4.096 184.576-59.477333 0-1.024 5.12-14.336-8.192-55.381333-13.312-36.949333-3.072-85.162667 23.552-117.930667 27.733333-34.901333 68.693333-50.261333 116.906667-45.141333l3.072 1.024c1.024 0 128.170667 27.648 193.877333-35.925334 40.021333-38.997333 52.309333-106.666667 34.901334-201.045333-4.096-13.312-48.213333-157.952-175.36-259.498667C578.309973 17.322667 347.56864 71.68 208.04864 197.802667 79.877973 314.709333-14.500693 537.258667 143.451307 778.325333c1.024 0 108.714667 153.856 256.426666 175.36z m0 0"
            p-id="4972"
          ></path>
          <path
            d="M158.89664 538.282667c0 33.962667 27.562667 61.525333 61.525333 61.525333s61.525333-27.562667 61.525334-61.525333-27.562667-61.525333-61.525334-61.525334c-34.048 0-61.525333 27.562667-61.525333 61.525334z m71.765333-184.576c0 33.962667 27.562667 61.525333 61.525334 61.525333s61.525333-27.562667 61.525333-61.525333-27.562667-61.525333-61.525333-61.525334-61.525333 27.562667-61.525334 61.525334z m184.576-102.570667c0 33.962667 27.562667 61.525333 61.525334 61.525333s61.525333-27.562667 61.525333-61.525333-27.562667-61.525333-61.525333-61.525333-61.525333 27.562667-61.525334 61.525333z m205.141334 51.285333c0 33.962667 27.562667 61.525333 61.525333 61.525334s61.525333-27.562667 61.525333-61.525334-27.562667-61.525333-61.525333-61.525333-61.525333 27.562667-61.525333 61.525333z m102.570666 164.096c0 33.962667 27.562667 61.525333 61.525334 61.525334s61.525333-27.562667 61.525333-61.525334-27.562667-61.525333-61.525333-61.525333-61.525333 27.562667-61.525334 61.525333z m0 0"
            p-id="4973"
          ></path>
        </svg>
      </button>
      <h1>Welcome, {{ state.username }}</h1>
    </header>
    <section class="chat-box" id="chat-box">
      <div
        v-for="message in state.messages"
        :key="message.key"
        :style="{ marginTop: message.displayTime ? '30px' : '15px' }"
      >
        <span v-if="message.displayTime" class="time">{{ message.time }}</span>
        <div :class="message.username == state.username ? 'message current-user' : 'message'">
          <div class="message-inner">
            <div class="username">{{ message.username }}</div>
            <div
              class="content"
              :style="{ backgroundColor: message.username == state.username ? state.themeColor : '#f3f3f3' }"
            >
              {{ message.content }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer>
      <form action="" @submit.prevent="SendMessage">
        <input type="text" v-model="inputMessage" placeholder="Write a message..." />
        <input type="submit" value="Send" :style="{ backgroundColor: state.themeColor }" />
      </form>
    </footer>
  </div>
</template>

<script>
import { reactive, onMounted, ref } from 'vue';
import db from './db';

export default {
  setup() {
    const inputUsername = ref('');
    const inputMessage = ref('');

    const state = reactive({
      username: '',
      messages: [],
      themeColor: '#f2a6d6',
    });

    const Login = () => {
      if (inputUsername.value !== '' || inputUsername.value !== null) {
        state.username = inputUsername.value;
        inputUsername.value = '';
      }
    };

    const Logout = () => {
      state.username = '';
    };

    const SendMessage = () => {
      const messageRef = db.database().ref('messages-2');

      if (inputMessage.value === '' || inputMessage.value === null) {
        return;
      }

      const message = {
        username: state.username,
        content: inputMessage.value,
        time: Date.now(),
      };

      messageRef.push(message);
      inputMessage.value = '';
    };

    onMounted(() => {
      const messageRef = db.database().ref('messages-2');

      messageRef.on('value', (snapshot) => {
        const data = snapshot.val();
        let messages = [];
        const keys = Object.keys(snapshot.val());
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];

          // TODO check if need to display time before this element
          const displayTime = i === 0 ? true : data[keys[i]].time - data[keys[i - 1]].time > 300000;

          messages.push({
            id: key,
            username: data[key].username,
            content: data[key].content,
            time: getDateString(data[key].time),
            displayTime: displayTime,
          });
        }

        state.messages = messages;
        scrollToBottom();
      });
    });

    const getDateString = (previousTime) => {
      var result = '';
      const currentTime = Date.now();

      if (DateDiff.inMinutes(new Date(previousTime), new Date(currentTime)) < 5) {
        result = 'just now';
      } else if (DateDiff.inMinutes(new Date(previousTime), new Date(currentTime)) < 60) {
        result = DateDiff.inMinutes(new Date(previousTime), new Date(currentTime)) + ' mins ago';
      } else if (DateDiff.inHours(new Date(previousTime), new Date(currentTime)) < 24) {
        result = new Date(previousTime).customFormat('#hhh#:#mm#');
      } else if (DateDiff.inDays(new Date(previousTime), new Date(currentTime)) < 7) {
        result = new Date(previousTime).customFormat('#DDD# #hhh#:#mm#');
      } else if (DateDiff.inYears(new Date(previousTime), new Date(currentTime)) > 0) {
        result = new Date(previousTime).customFormat('#YYYY# #MMM# #DD# #hhh#:#mm#');
      } else {
        result = new Date(previousTime).customFormat('#MMM# #DD# #hhh#:#mm#');
      }
      return result;
    };

    var DateDiff = {
      inMinutes: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2 - t1) / (60 * 1000));
      },
      inHours: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2 - t1) / (3600 * 1000));
      },
      inDays: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2 - t1) / (24 * 3600 * 1000));
      },
      inWeeks: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
      },
      inMonths: function(d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();

        return d2M + 12 * d2Y - (d1M + 12 * d1Y);
      },
      inYears: function(d1, d2) {
        return d2.getFullYear() - d1.getFullYear();
      },
    };

    //*** This code is copyright 2002-2016 by Gavin Kistner, !@phrogz.net
    //*** It is covered under the license viewable at http://phrogz.net/JS/_ReuseLicense.txt
    Date.prototype.customFormat = function(formatString) {
      var YYYY, YY, MMMM, MMM, MM, M, DDDD, DDD, DD, D, hhhh, hhh, hh, h, mm, m, ss, s, ampm, AMPM, dMod, th;
      YY = ((YYYY = this.getFullYear()) + '').slice(-2);
      MM = (M = this.getMonth() + 1) < 10 ? '0' + M : M;
      MMM = (MMMM = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ][M - 1]).substring(0, 3);
      DD = (D = this.getDate()) < 10 ? '0' + D : D;
      DDD = (DDDD = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
        this.getDay()
      ]).substring(0, 3);
      th = D >= 10 && D <= 20 ? 'th' : (dMod = D % 10) == 1 ? 'st' : dMod == 2 ? 'nd' : dMod == 3 ? 'rd' : 'th';
      formatString = formatString
        .replace('#YYYY#', YYYY)
        .replace('#YY#', YY)
        .replace('#MMMM#', MMMM)
        .replace('#MMM#', MMM)
        .replace('#MM#', MM)
        .replace('#M#', M)
        .replace('#DDDD#', DDDD)
        .replace('#DDD#', DDD)
        .replace('#DD#', DD)
        .replace('#D#', D)
        .replace('#th#', th);
      h = hhh = this.getHours();
      if (h == 0) h = 24;
      if (h > 12) h -= 12;
      hh = h < 10 ? '0' + h : h;
      hhhh = hhh < 10 ? '0' + hhh : hhh;
      AMPM = (ampm = hhh < 12 ? 'am' : 'pm').toUpperCase();
      mm = (m = this.getMinutes()) < 10 ? '0' + m : m;
      ss = (s = this.getSeconds()) < 10 ? '0' + s : s;
      return formatString
        .replace('#hhhh#', hhhh)
        .replace('#hhh#', hhh)
        .replace('#hh#', hh)
        .replace('#h#', h)
        .replace('#mm#', mm)
        .replace('#m#', m)
        .replace('#ss#', ss)
        .replace('#s#', s)
        .replace('#ampm#', ampm)
        .replace('#AMPM#', AMPM);
    };

    const scrollToBottom = () => {
      setTimeout(() => {
        window.scrollTo({
          left: 0,
          top: document.body.scrollHeight || document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }, 50);
    };

    const ChangeThemeColor = () => {
      state.themeColor = hslToHex(Math.floor(Math.random() * 360), 75, 80);
    };

    const hslToHex = (h, s, l) => {
      l /= 100;
      const a = (s * Math.min(l, 1 - l)) / 100;
      const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
          .toString(16)
          .padStart(2, '0'); // convert to Hex and prefix "0" if needed
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    };

    return {
      inputUsername,
      state,
      Login,
      inputMessage,
      SendMessage,
      Logout,
      ChangeThemeColor,
    };
  },
};
</script>

<style lang="scss">
@import './style.scss';
</style>
