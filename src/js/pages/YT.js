class YTPlayer {
    constructor(idName = "player", option) {
        this.idName = idName;
        this.tag = document.createElement("script");
        this.tag.src = "https://www.youtube.com/iframe_api";
        this.#insertScript();
        this.option = {
            ...{
                height: "100%",
                width: "100%",
                videoId: "bYJ2M3qqg9Y",
            },
            ...option,
            events: {
                onReady: this.onPlayerReady,
                onStateChange: this.onPlayerStateChange,
            },
        };
        this.player = null;
        this.done = false;
        this.init = this.init.bind(this);
    }
    #insertScript() {
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(this.tag, firstScriptTag);
    }
    onPlayerReady(event) {
        // event.target.playVideo();
    }
    onPlayerStateChange(event) {
        // if (event.data == YT.PlayerState.PLAYING && !done) {
        //     setTimeout(stopVideo, 6000);
        //     this.done = true;
        // }
    }
    stop() {
        if (this.player && "stopVideo" in this.player) this.player.stopVideo();
    }
    start() {
        if (this.player && "playVideo" in this.player) this.player.playVideo();
    }
    pause() {
        if (this.player && "pauseVideo" in this.player)
            this.player.pauseVideo();
    }
    init() {
        this.player = new YT.Player(this.idName, this.option);
        this.stop();
    }
}

export default YTPlayer;
