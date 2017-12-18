//获取页面元素
const button = document.querySelectorAll("[data-time]");
const timeLeft = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const input = document.querySelector("input");
const form = document.querySelector("#custom");

//初始化
timeLeft.innerHTML = "0:00";
let innerTime;
let timeInterval;
let min;
let secs;

//获取输入的分钟数
function displayInputTime(e) {
    e.preventDefault();
    let inputDetail = document.getElementsByName("minutes")[0].value;
    let sec = inputDetail * 60;
    getInnerTime(sec);
    getIntervalTime();
}

//获取点击的时间
function displayTime() {
    let sec = this.dataset.time;
    getInnerTime(sec);
    getIntervalTime();
}

//改变页面时间
function getInnerTime(sec) {
    min = Math.floor(sec / 60);
    secs = sec % 60;
    const now = new Date();
    now.setMinutes(now.getMinutes() + min);
    now.setSeconds(now.getSeconds() + secs);
    formatInnerTime();
    if (now.getMinutes().toString().length === 1) {
        endTime.innerHTML = "Be Back At " + now.getHours() + ":0" + now.getMinutes();
    } else {
        endTime.innerHTML = "Be Back At " + now.getHours() + ":" + now.getMinutes();
    }
}

//改变监控时间
/*
clearInterval() 方法可取消由 setInterval() 设置的 timeout。
clearInterval() 方法的参数必须是由 setInterval() 返回的 ID 值。
 */
function getIntervalTime() {
    clearInterval(timeInterval);
    const now = new Date();
    timeInterval = setInterval(function () {
        if (secs === 0) {
            if (min === 0) {
                clearInterval(timeInterval);
            } else {
                min--;
                secs = 59;
            }
        } else {
            secs--;
        }
        formatInnerTime();
    }, 1000);
}
//格式化innertime
function formatInnerTime() {
    if (secs === 0) {
        innerTime = min + ":" + secs + "0";
    } else if (secs.toString().length === 1) {
        innerTime = min + ":" + "0" + secs;
    } else {
        innerTime = min + ":" + secs;
    }
    timeLeft.innerHTML = innerTime;
}

button.forEach(item => item.addEventListener("click", displayTime));
form.addEventListener("submit", displayInputTime);