import Vue from 'vue';

import template from './index.html';

export default Vue.component('init-page', {
    template,
    data() {
        return {
            mode: 4, // 1 - video selector; 2 - video; 3 - bg static image; 4 - static content
            video: {},
            videoType: 'day',
            volumeFadeOutTime: 700,
            muted: false,
        }
    },
    mounted() {
        // videoType.video[this.videoType].play();
    },
    methods: {
        videoInited(video, videoType) {
            this.video[videoType] = video;
            video.addEventListener("timeupdate", event => {
                let progress = 100 * Math.floor((video.currentTime / video.duration) * 100) / 100;
                if (progress > 97) {
                    this.introVideoSkipStart();
                }
            }, true);
        },

        selectVideo(videoType) {
            this.videoType = videoType;
            this.mode = 2;

            this.video[this.videoType].play();
        },

        introVideoSkipStart() {
            if (!this.video[this.videoType]) return;

            this.mode = 3;
            this.volumeFadeOut();
        },
        volumeFadeOut() {
            this.volumeStart = this.video[this.videoType].volume;
            if (!this.volumeStart) {
                this.introVideoSkipFinish();
                return;
            }
            this.volumeFadeOutDateStart = Date.now();
            this.volumeFadeOutAnimate();
        },
        volumeFadeOutAnimate() {
            let now = Date.now();
            let delay = now - this.volumeFadeOutDateStart;
            if (delay >= this.volumeFadeOutTime) {
                window.cancelAnimationFrame(this.requestAnimationFrameInstance);
                this.introVideoSkipFinish();
                return;
            }

            let volumeNew = this.volumeStart - delay * (1 / this.volumeFadeOutTime);
            if (volumeNew < 0) volumeNew = 0;

            this.video[this.videoType].volume = volumeNew;

            this.requestAnimationFrameInstance = window.requestAnimationFrame(this.volumeFadeOutAnimate);
        },
        introVideoSkipFinish() {
            this.video[this.videoType].volume = 0;
            this.video[this.videoType].pause();
        },
        introVideoMuteToggle() {
            this.video[this.videoType].muted = !this.video[this.videoType].muted;
            this.muted = this.video[this.videoType].muted;
        },

        imgStaticShown() {
            this.mode = 4;
        },
    }
});