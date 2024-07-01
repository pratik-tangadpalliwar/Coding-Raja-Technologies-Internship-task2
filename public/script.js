document.addEventListener('DOMContentLoaded', () => {
    const trackList = [
        { title: "Track 1", artist: "Artist 1", src: "track1.mp3", cover: "cover1.jpg" },
        { title: "Track 2", artist: "Artist 2", src: "track2.mp3", cover: "cover2.jpg" },
        // Add more tracks as needed
    ];

    const audio = new Audio();
    let currentTrackIndex = 0;
    let isPlaying = false;
    let isShuffle = false;
    let isRepeat = false;

    const trackListElement = document.getElementById('track-list');
    const albumCoverElement = document.getElementById('album-cover');
    const trackTitleElement = document.getElementById('track-title');
    const artistNameElement = document.getElementById('artist-name');
    const playPauseButton = document.getElementById('play-pause-btn');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    const volumeControl = document.getElementById('volume');
    const progressBar = document.getElementById('progress');
    const currentTimeElement = document.getElementById('current-time');
    const durationElement = document.getElementById('duration');
    const shuffleButton = document.getElementById('shuffle-btn');
    const repeatButton = document.getElementById('repeat-btn');

    const loadTrack = (index) => {
        const track = trackList[index];
        audio.src = track.src;
        albumCoverElement.src = track.cover;
        trackTitleElement.textContent = track.title;
        artistNameElement.textContent = track.artist;
    };

    const playTrack = () => {
        audio.play();
        isPlaying = true;
        playPauseButton.textContent = 'Pause';
    };

    const pauseTrack = () => {
        audio.pause();
        isPlaying = false;
        playPauseButton.textContent = 'Play';
    };

    const updateProgress = () => {
        const { currentTime, duration } = audio;
        progressBar.value = (currentTime / duration) * 100;
        currentTimeElement.textContent = formatTime(currentTime);
        durationElement.textContent = formatTime(duration);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const prevTrack = () => {
        currentTrackIndex = (currentTrackIndex - 1 + trackList.length) % trackList.length;
        loadTrack(currentTrackIndex);
        playTrack();
    };

    const nextTrack = () => {
        if (isShuffle) {
            currentTrackIndex = Math.floor(Math.random() * trackList.length);
        } else {
            currentTrackIndex = (currentTrackIndex + 1) % trackList.length;
        }
        loadTrack(currentTrackIndex);
        playTrack();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => {
        if (isRepeat) {
            playTrack();
        } else {
            nextTrack();
        }
    });

    playPauseButton.addEventListener('click', () => {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    });

    prevButton.addEventListener('click', prevTrack);
    nextButton.addEventListener('click', nextTrack);

    volumeControl.addEventListener('input', (e) => {
        audio.volume = e.target.value;
    });

    progressBar.addEventListener('input', (e) => {
        audio.currentTime = (audio.duration * e.target.value) / 100;
    });

    shuffleButton.addEventListener('click', () => {
        isShuffle = !isShuffle;
        shuffleButton.classList.toggle('active', isShuffle);
    });

    repeatButton.addEventListener('click', () => {
        isRepeat = !isRepeat;
        repeatButton.classList.toggle('active', isRepeat);
    });

    trackList.forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = `${track.title} - ${track.artist}`;
        li.addEventListener('click', () => {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
            playTrack();
        });
        trackListElement.appendChild(li);
    });

    loadTrack(currentTrackIndex);
});