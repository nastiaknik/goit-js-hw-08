// 1) Додай бібліотеку Vimeo плеєра як залежність проекту через npm.
// 2) Ініціалізуй плеєр у файлі скрипта як це описано в секції pre-existing player,
// але плеєр доданий як npm пакет, а не через CDN!
// 3) метод on(), відстежувати подію timeupdate - оновлення часу відтворення.
// 4) Зберігай час відтворення у локальне сховище. ключ для сховища - рядок
// "videoplayer-current-time".
// 5) Під час перезавантаження стори скор методом setCurrentTime()
// (відновлення відтворення зі збереженої позиції)
// 6) Додай до проекту бібліотеку lodash.throttle
// (час відтворення оновл у сховищі не частіше, ніж раз на сек)
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const KEY_CURRENT_TIME = 'videoplayer-current-time';

const videoPlayer = document.querySelector('#vimeo-player');

const player = new Player(videoPlayer);

player.on('timeupdate', throttle(onTimeUpdate, 1000)); // 1 sec

function onTimeUpdate(event) {
  localStorage.setItem(KEY_CURRENT_TIME, JSON.stringify(event.seconds));
  // seconds = the current playback position
}

const saveTimeCode = localStorage.getItem(KEY_CURRENT_TIME);
if (saveTimeCode) {
  player.setCurrentTime(saveTimeCode);
}
