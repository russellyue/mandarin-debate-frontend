import fetch from 'dva/fetch';

export default async () => {
    const play = async (url) => {
        // Fix up prefixing
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        const context = new AudioContext();
        const audioStack = [];
        let nextTime = 0;
        await fetch(url).then((response) => {
            const reader = response.body.getReader();
            function read() {
                return reader.read().then(({ value, done }) => {
                    if (done) {
                        return;
                    }
                    context.decodeAudioData(value.buffer, (buffer) => {
                        audioStack.push(buffer);
                        if (audioStack.length) {
                            scheduleBuffers();
                        }
                    }, (err) => {
                        console.log(`err(decodeAudioData): ${err}`);
                    });
                    read();
                });
            }
            read();
        });

        function scheduleBuffers() {
            while (audioStack.length) {
                const buffer = audioStack.shift();
                const source = context.createBufferSource();
                source.buffer = buffer;
                source.connect(context.destination);
                if (nextTime === 0) { nextTime = context.currentTime + 0.01; }  // / add 50ms latency to work well across systems - tune this if you like
                source.start(nextTime);
                nextTime += source.buffer.duration; // Make the next buffer wait the length of the last buffer before being played
            }
        }
    };
    // const play = async (url) => {
    //     const audio = new Audio(url)
    //     audio.play();
    // }
    const url = '../assets/soft-metal-bell.mp3';
    play(url);
};

// export default notificationSound;
