<template>
  <div class="VueAudioPlayer">
    <div class="Controls">
      <button
        v-show="!playing"
        class="Play"
        @click="play">
        <slot name="play-icon"/>
        {{ playText }}
      </button>

      <button
        v-show="playing"
        class="Pause"
        @click="pause">
        <slot name="pause-icon"/>
        {{ pauseText }}
      </button>

      <button
        v-show="playing"
        class="Stop"
        @click="stop">
        <slot name="stop-icon"/>
        {{ stopText }}
      </button>
    </div>
    <div class="Volume">
      <input
        type="range"
        min="0"
        max="100"
        value="100"
        @change="volumeChange" >
    </div>
  </div>
</template>

<script>
import BufferLoader from '../utils/BufferLoader.js';

export default {
  props: {
    track: {
      type: String,
      default: null
    },
    playText: {
      type: String,
      default: 'Play'
    },
    pauseText: {
      type: String,
      default: 'Pause'
    },
    stopText: {
      type: String,
      default: 'Stop'
    }
  },
  data () {
    return {
      localContext: null,
      pausedAt: 0,
      startedAt: 0,
      playing: false
    };
  },
  computed: {
    trackAndLocalContext () {
      if (this.track && this.localContext) {
        return this.track;
      }
    }
  },
  watch: {
    trackAndLocalContext: {
      immediate: true,
      handler (track) {
        if (track && this.localContext) {
          const bufferLoader = new BufferLoader(
            this.localContext,
            [track],
            this.loadingDone
          );
          bufferLoader.load();
        }
      }
    }
  },
  mounted () {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.localContext = new AudioContext();
    this.gainNode = this.localContext.createGain();
    this.gainNode.connect(this.localContext.destination);
  },
  methods: {
    loadingDone (buffer) {
      this.buffer = buffer[0];
      if (this.playing) {
        this.stop();
        this.play();
      }
    },
    async play () {
      if (this.localContext.state === 'suspended') {
        await this.localContext.resume();
      }
      if (this.buffer) {
        this.source = this.localContext.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.connect(this.gainNode);
        this.source.onended = this.songEndedHanlder;
        this.source.start(0, this.pausedAt);
        this.startedAt = this.localContext.currentTime - this.pausedAt;
        this.pausedAt = 0;
        this.playing = true;
        this.$emit('song:play');
      }
    },
    pause () {
      const elapsed = this.localContext.currentTime - this.startedAt;
      this.stop();
      this.pausedAt = elapsed;
      this.playing = false;
      this.$emit('song:pause', this.pausedAt);
    },
    stop () {
      if (this.source) {
        this.source.disconnect();
        this.source.stop(0);
        this.source = null;
      }
      this.pausedAt = 0;
      this.startedAt = 0;
      this.playing = false;
      this.$emit('song:stop');
    },
    volumeChange (event) {
      const value = +event.target.value / 100;
      this.gainNode.gain.setValueAtTime(value, this.localContext.currentTime);
    },
    songEndedHanlder () {
      this.$emit('song:end');
    }
  }
};
</script>

<style lang="less">
  .Controls {
    .Play, .Pause, .Stop {
      width: 50px;
    }
  }
</style>
