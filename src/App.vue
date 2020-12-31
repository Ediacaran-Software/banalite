<template>
  <div
    class="view login"
    :style="{ backgroundColor: state.themeColor }"
    v-if="state.username === '' || state.username === null"
  >
    <!-- directive modifier -->
    <form action="" class="login-form" @submit.prevent="Login">
      <div class="form-inner">
        <h1>Login to Bavard</h1>
        <label for="username">Username</label>
        <input
          type="text"
          v-model="inputUsername"
          placeholder="Please enter your username"
        />
        <label for="chatroomCode">Chat room code</label>
        <input
          type="text"
          v-model="inputChatroomCode"
          placeholder="Please enter 4-digit chat room code"
        />
        <input
          type="submit"
          value="Login"
          :style="{ backgroundColor: state.themeColor }"
        />
      </div>
    </form>
  </div>

  <div class="view chat" :style="{ backgroundColor: state.themeColor }" v-else>
    <header>
      <button class="logout" @click="Logout">Logout</button>
      <h3 class="room-code">Room{{ state.chatroomCode }}</h3>
      <button class="change-color" @click="ChangeThemeColor">
        <svg
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="white"
        >
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
      <div v-if="state.messages.length === 0">
        <div class="message">
          <div class="message-inner">
            <div class="content">
              Welcome to BAVARD! 😺 Start your chat with your friends by sharing
              the 4-digits room code to them! <br />
              Room code:
              {{ state.chatroomCode }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-for="(message, index) in state.messages"
        :key="'key' + message.id"
        :id="'id' + message.id"
        :style="{ marginTop: message.displayTime ? '30px' : '15px' }"
      >
        <span v-if="message.displayTime" class="time">{{ message.time }}</span>
        <div
          :class="
            message.username === state.username
              ? 'message current-user'
              : 'message'
          "
          :style="{ paddingTop: message.displayTime ? '10px' : '0px' }"
        >
          <div class="message-inner">
            <div
              class="user-info"
              v-if="
                index === 0
                  ? true
                  : state.messages[index - 1].username !== message.username
              "
              :style="{
                justifyContent:
                  message.username !== state.username
                    ? 'flex-start'
                    : 'flex-end',
              }"
            >
              <div
                v-if="message.username !== state.username"
                class="avatar"
                :style="{ backgroundColor: '#888' }"
              >
                <span>{{ message.username.slice(0, 1) }}</span>
              </div>
              <div class="username">{{ message.username }}</div>
              <!-- <div
								v-if="message.username === state.username"
								class="avatar"
								:style="{ backgroundColor: state.themeColor }"
							>
								<span>{{ message.username.slice(0, 1) }}</span>
							</div> -->
            </div>
            <div
              class="content"
              :style="{
                backgroundColor:
                  message.username == state.username
                    ? state.themeColor
                    : '#f3f3f3',
              }"
            >
              {{ message.content }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="quick-scroll">
      <div class="btn" @click="ScrollTo('top')">
        <svg
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1746"
          width="30"
          height="30"
        >
          <path
            d="M1021.28261 737.254254 512.697383 228.665956 4.114203 737.254254 65.145208 798.285259 512.697383 350.727966 960.251605 798.280142Z"
            p-id="1747"
            fill="rgba(255, 255, 255, 0.8)"
          ></path>
        </svg>
      </div>
      <div class="btn" @click="ScrollTo('bottom')">
        <svg
          viewBox="0 0 1025 1024"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1891"
          width="30"
          height="30"
        >
          <path
            d="M1.023306 298.788014 512.531096 810.298873 1024.036839 298.79006 962.65484 237.408061 512.531096 687.535899 62.405305 237.410108Z"
            p-id="1892"
            fill="rgba(255, 255, 255, 0.8)"
          ></path>
        </svg>
      </div>
    </div>

    <div class="emoji-list" v-if="showEmojiPicker">
      <div
        v-for="emoji in emojiList"
        :key="emoji.id"
        class="emoji"
        @click="() => onSelectEmoji(emoji)"
        draggable="false"
      >
        {{ emoji.data }}
      </div>
    </div>
    <footer>
      <div :style="{ display: 'flex' }">
        <button
          @click.prevent="toogleDialogEmoji"
          class="emoji-btn"
          :style="{ backgroundColor: state.themeColor }"
        >
          <svg
            t="1609384005914"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1363"
            width="30"
            height="30"
            fill="#fafafa"
          >
            <path
              d="M568 250.667c30.928 0 56 25.072 56 56s-25.072 56-56 56-56-25.072-56-56 25.072-56 56-56zM344 400c30.928 0 56 25.072 56 56s-25.072 56-56 56-56-25.072-56-56 25.072-56 56-56z m354.593 164.347l-8.166 10.114a259.07 259.07 0 0 1-58.461 50.895l30.787 32.788c23.19 24.697 62.011 25.919 85.895 3.524l3.557-3.491 3.936-4.684c16.551-21.574 12.48-52.481-9.094-69.033a49.253 49.253 0 0 0-13.067-7.18l-35.387-12.933z m-38.14-97.386c4.256-14.867 19.757-23.469 34.624-19.214 14.867 4.255 23.469 19.757 19.214 34.624a250.717 250.717 0 0 1-8.586 24.958l47.499 17.354a105.227 105.227 0 0 1 27.93 15.346c46.113 35.377 54.816 101.438 18.728 148.438l-6.172 7.258-5.896 5.972c-47.244 44.361-121.504 42.024-165.865-5.22l-50.315-53.568c-46.587 19.532-99.491 25.034-152.23 12.698l-25.761-6.026c-15.058-3.522-24.409-18.584-20.887-33.641 3.522-15.058 18.584-24.409 33.641-20.887l25.761 6.026c99.69 23.317 200.141-35.689 228.315-134.118zM512.326 120l-10.315 0.124c-212.242 5.295-382.015 179.097-382.015 391.178l0.129 10.687c5.294 212.242 179.096 382.015 391.178 382.015l10.687-0.129c212.242-5.294 382.015-179.096 382.015-391.178l-0.129-10.687c-5.203-208.598-173.178-376.169-380.951-381.861L512.326 120zM512 64c243.617 0 441.817 194.452 447.858 436.614L960 512c0 243.617-194.452 441.817-436.614 447.858L512 960C268.383 960 70.183 765.548 64.142 523.386L64 512C64 268.383 258.452 70.183 500.614 64.142L512 64z"
              p-id="1364"
            ></path>
          </svg>
        </button>
        <form action="" @submit.prevent="SendMessage">
          <input
            type="text"
            v-model="inputMessage"
            placeholder="Write a message..."
            :style="{ caretColor: state.themeColor }"
          />
          <input
            type="submit"
            value="Send"
            :style="{ backgroundColor: state.themeColor }"
          />
        </form>
      </div>
    </footer>
  </div>
</template>

<script>
/**
 * TODO for improvement
 * add emoji panel!
 * done - hide user names if previous message was sent by the same user
 * delt - add random avatar, assign by calculate username
 * done - chat-room code
 * done - if no messages: welcome to bavard! start your chat right now
 */

import { reactive, onMounted, ref } from 'vue';
import db from './db';
import $ from 'jquery';
import allEmojiList from './statics/emoji-list.js';

export default {
  setup() {
    const inputUsername = ref('');
    const inputChatroomCode = ref('');
    const inputMessage = ref('');
    const showEmojiPicker = ref(false);

    var localThemeColor = 'rgb(182, 166, 242)';
    if (typeof Storage !== 'undefined') {
      // Code for localStorage/sessionStorage.
      localThemeColor =
        localStorage.getItem('bavard-themeColor') === undefined
          ? localThemeColor
          : localStorage.getItem('bavard-themeColor');
    } else {
      // Sorry! No Web Storage support..
    }

    const state = reactive({
      username: '',
      chatroomCode: '',
      messages: [],
      themeColor: localThemeColor,
    });

    const emojiList = [];
    (function addEmojiToList() {
      allEmojiList.forEach((emo, index) => {
        emojiList.push({
          id: index + 1,
          data: emo,
          // src: `https://twemoji.maxcdn.com/2/72x72/${emo.toLowerCase()}.png`,
        });
      });
    })();

    const Login = () => {
      if (
        inputUsername.value !== '' &&
        inputUsername.value !== null &&
        inputChatroomCode.value !== '' &&
        inputChatroomCode.value !== null &&
        validateChatroomCode(inputChatroomCode.value)
      ) {
        state.username = inputUsername.value;
        state.chatroomCode = inputChatroomCode.value;
        inputUsername.value = '';
        inputChatroomCode.value = '';
      }

      loadMessages();
    };

    const validateChatroomCode = (string) => {
      return /\d{4}$/.test(string);
    };

    const Logout = () => {
      state.username = '';
    };

    const SendMessage = () => {
      const messageRef = db.database().ref(`messages-${state.chatroomCode}`);
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
      showEmojiPicker.value = false;
    };

    const loadMessages = () => {
      state.messages = [];
      const messageRef = db.database().ref(`messages-${state.chatroomCode}`);
      messageRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data == null || data == undefined) {
          return;
        }
        let messages = [];
        const keys = Object.keys(snapshot.val());
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];

          // TODO check if need to display time before this element
          const displayTime =
            i === 0
              ? true
              : data[keys[i]].time - data[keys[i - 1]].time > 300000;

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
    };

    const getDateString = (previousTime) => {
      var result = '';
      const currentTime = Date.now();

      if (
        DateDiff.inMinutes(new Date(previousTime), new Date(currentTime)) < 5
      ) {
        result = 'just now';
      } else if (
        DateDiff.inMinutes(new Date(previousTime), new Date(currentTime)) < 60
      ) {
        result =
          DateDiff.inMinutes(new Date(previousTime), new Date(currentTime)) +
          ' mins ago';
      } else if (
        DateDiff.inHours(new Date(previousTime), new Date(currentTime)) < 24
      ) {
        result = new Date(previousTime).customFormat('#hhh#:#mm#');
      } else if (
        DateDiff.inDays(new Date(previousTime), new Date(currentTime)) < 7
      ) {
        result = new Date(previousTime).customFormat('#DDD# #hhh#:#mm#');
      } else if (
        DateDiff.inYears(new Date(previousTime), new Date(currentTime)) > 0
      ) {
        result = new Date(previousTime).customFormat(
          '#YYYY# #MMM# #DD# #hhh#:#mm#'
        );
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
      var YYYY,
        YY,
        MMMM,
        MMM,
        MM,
        M,
        DDDD,
        DDD,
        DD,
        D,
        hhhh,
        hhh,
        hh,
        h,
        mm,
        m,
        ss,
        s,
        ampm,
        AMPM,
        dMod,
        th;
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
      DDD = (DDDD = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ][this.getDay()]).substring(0, 3);
      th =
        D >= 10 && D <= 20
          ? 'th'
          : (dMod = D % 10) == 1
          ? 'st'
          : dMod == 2
          ? 'nd'
          : dMod == 3
          ? 'rd'
          : 'th';
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
          top:
            document.body.scrollHeight || document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }, 50);
    };

    const ChangeThemeColor = () => {
      state.themeColor = hslToHex(Math.floor(Math.random() * 360), 75, 80);
      if (typeof Storage !== 'undefined') {
        // Code for localStorage/sessionStorage.
        localStorage.setItem('bavard-themeColor', state.themeColor);
      }
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

    const ScrollTo = (positionName) => {
      if (positionName === 'top') {
        setTimeout(() => {
          window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth',
          });
        }, 50);
      } else if (positionName === 'bottom') {
        setTimeout(() => {
          window.scrollTo({
            left: 0,
            top:
              document.body.scrollHeight ||
              document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }, 50);
      }
    };

    window.addEventListener('scroll', () => resetOpacity());

    const resetOpacity = () => {
      // state.messages.forEach(element);
      $('.message').each(function() {
        var scrollTop = $(window).scrollTop(),
          elementOffset = $(this).offset().top,
          distance = elementOffset - scrollTop;
        $(this).css('opacity', distance / 300 + 0.2);
        // $(this).css('margin-left', distance > 160 ? 0 : (160 - distance) / 8);
        // $(this).css('margin-right', distance > 160 ? 0 : (160 - distance) / 8);
      });
    };

    const toogleDialogEmoji = () => {
      showEmojiPicker.value = !showEmojiPicker.value;
    };
    const onSelectEmoji = (emoji) => {
      inputMessage.value += emoji.data;
      // Optional
      // this.toogleDialogEmoji();
    };

    return {
      inputUsername,
      inputChatroomCode,
      state,
      Login,
      inputMessage,
      SendMessage,
      Logout,
      ChangeThemeColor,
      ScrollTo,
      showEmojiPicker,
      toogleDialogEmoji,
      onSelectEmoji,
      emojiList,
    };
  },
};
</script>

<style lang="scss">
@import './style.scss';
</style>
