//控制是否播放
function play() {
    video.paused ? video.play() : video.pause()
}
//控制图标是否变化
function updateButton() {
    let icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}
//控制播放速度按钮的函数
function playSpeed() {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}
//控制拉条的函数
function volumeChange() {
    video[this.name] = this.value;
}
//控制播放位置拉条的函数
function videoChange() {
    let percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.flexBasis = `${percent}%`;
}
//根据点击拉条的位置，控制播放的位置
function videoClickChange(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
let player = document.querySelector(".player");
let video = player.querySelector(".viewer");
let progress = player.querySelector(".progress");
let progressFilled = progress.querySelector(".progress__filled");
let toggle = player.querySelector(".toggle");//播放按键
let playerButton = player.querySelectorAll("[data-skip]");//快进快退键
let range = player.querySelectorAll("range");//拉条全部选择
progressFilled.style.flexBasis = "0%";


//点击是否开始播放的事件
video.addEventListener("click", play);
toggle.addEventListener("click", play);

//控制快慢的按钮
playerButton.forEach(button => button.addEventListener("click", playSpeed));
//拉条的监听
range.forEach(volume => volume.addEventListener("change", volumeChange));
range.forEach(volume => volume.addEventListener("mousemove", volumeChange));

//更新按钮事件
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", videoChange);

progress.addEventListener("click", videoClickChange);
let mousedown = false;
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mousemove', (e) => mousedown && videoClickChange(e));
progress.addEventListener('mouseup', () => mousedown = false);