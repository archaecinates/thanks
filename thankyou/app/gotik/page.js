'use client';

import { useEffect, useRef, useState } from 'react';

export default function MawarPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [showPaper, setShowPaper] = useState(false);
  const [stage, setStage] = useState('idle');
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  function handleOpenPopup() {
    setShowPopup(true);
    setStage('open');
    setTimeout(() => setShowPaper(true), 1000);
  }

  function handleClosePopup() {
    setShowPopup(false);
    setShowPaper(false);
    setStage('idle');
  }

  function playMusicTransition() {
    setStage('shrinking');
    setShowPaper(false);
    setTimeout(() => {
      setStage('closed');
      const audio = audioRef.current;
      if (audio) audio.play();
      setIsPlaying(true);
      setStage('player');
    }, 1000);
  }

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) audio.pause();
    else audio.play();

    setIsPlaying(!isPlaying);
  }

  function reopenEnvelope() {
    setStage('open');
    setTimeout(() => setShowPaper(true), 1000);
    const audio = audioRef.current;
    if (audio) audio.pause();
    setIsPlaying(false);
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function handleSeek(e) {
    const audio = audioRef.current;
    if (!audio) return;
    const time = parseFloat(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateTime);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateTime);
    };
  }, []);

  const envelopeClass = {
    open: 'scale-100 translate-y-0',
    shrinking: 'scale-50 translate-y-44',
    player: 'scale-50 translate-y-44',
    closed: 'scale-50 translate-y-44',
    idle: '',
  }[stage];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{
        backgroundImage: "url('/bg-kia.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {!showPopup && (
        <div
          className="shadow-xl rounded-xl w-72 h-[348px] relative"
          style={{
            backgroundImage: "url('/frame2.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <img
            src="/kia.png"
            alt="Kia"
            className="absolute top-[90px] z-10"
            style={{
              animation: 'customBounce 2s ease-in-out infinite',
            }}
          />

          <button
            onClick={handleOpenPopup}
            className="absolute top-[268px] relative h-[2.8em] w-[10em] rounded-[0.9em] overflow-hidden transition-all hover:-translate-x-[0.05em] hover:-translate-y-[0.05em] active:translate-x-[0.05em] active:translate-y-[0.05em] z-20"
            style={{
              backgroundImage: "url('/buton.png')",
              backgroundSize: 'cover',
              boxShadow: 'inset 0 0 1.6em -0.6em #C79D78, 0.15em 0.15em #AB8664',
            }}
            aria-label="Button image"
          />
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg bg-opacity-50 flex justify-center items-center right-20 z-50 animate-fadeIn">
          <div
            className={`relative w-[300px] h-[400px] transition-all duration-700 transform ${envelopeClass}`}
          >
            {(stage === 'open' || stage === 'shrinking') && (
              <>
                <div className="absolute top-26 left-0 right-0 bottom-0 w-[400px] bg-[url('/amplop-basek.png')] bg-cover bg-no-repeat z-10 animate-openEnvelope" />
                <div className="absolute top-56 right-28 w-[200px] h-[290px] bg-[url('/kirik.png')] bg-cover bg-no-repeat z-30 animate-openEnvelope" />
                <div className="absolute top-56 left-50 w-[200px] h-[290px] bg-[url('/kanank.png')] bg-cover bg-no-repeat z-30 animate-openEnvelope" />
                <div className="absolute top-77 left-[-11px] right-0 h-[200px] w-[422px] bg-[url('/amplopbawahk.png')] bg-cover bg-no-repeat z-30 animate-openEnvelope" />
              </>
            )}

            {(stage === 'closed' || stage === 'player') && (
              <img
                src="/amplopk.png"
                alt="Amplop tertutup"
                className="absolute top-0 left-24 w-full h-full object-contain z-10 transition-all duration-700"
              />
            )}

            {showPaper && stage !== 'shrinking' && stage !== 'player' && (
              <div
                className="absolute top-[-88px] left-[364px] transform -translate-x-1/2 text-white w-[332px] h-[442px] bg-[url('/kertas.png')] bg-cover bg-no-repeat z-20 px-4 pt-4"
                style={{ animation: 'slideUpPaper 1s ease-out forwards' }}
              >
                <h2 className="text-lg font-semibold mb-2">Hai mawarawr 🌷</h2>
                <p className="mb-4">
                  Makasih ya udah selalu ada, kamu lucu banget dan penting bgt buat aku 🫶
                </p>
                <button
                  className="bg-pink-500 text-white px-4 py-2 rounded mb-2"
                  onClick={playMusicTransition}
                >
                  click yaw
                </button>
                <br />
                <button
                  className="text-sm text-gray-200 hover:underline"
                  onClick={handleClosePopup}
                >
                  Tutup
                </button>
              </div>
            )}

            {(stage === 'closed' || stage === 'player') && (
              <div className="absolute inset-0 z-40">
                <button
                  onClick={reopenEnvelope}
                  className="absolute inset-0 bg-transparent z-40"
                  aria-label="Open Envelope"
                />
              </div>
            )}
          </div>

          {stage === 'player' && (
            <>
              <img
                src="/kia.png"
                alt="Karakter lucu"
                className="absolute top-[64px] left-1/2 w-16 h-16 z-50 transform -translate-x-1/2 animate-slide-side"
              />
              <div className="fixed bottom-88 left-1/2 transform -translate-x-1/2 bg-white/24 backdrop-blur-md rounded-xl shadow-lg flex flex-col items-center gap-4 p-4 z-50 w-[300px]">
                {/* Atas: Vinyl + judul */}
                <div className="flex flex-col items-center">
                  <div className="relative w-16 h-16 mb-2">
                    <div
                      className={`w-16 h-16 rounded-full border-2 border-black overflow-hidden ${
                        isPlaying ? 'animate-spin-slow' : ''
                      }`}
                    >
                      <img src="/vinylk.png" alt="Vinyl" className="w-full h-full object-cover" />
                    </div>
                    <button
                      className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-black text-white rounded-full p-1 text-xs"
                      style={{ color: '#B2B2B2' }}
                      onClick={togglePlay}
                    >
                      {isPlaying ? '⏸' : '▶'}
                    </button>
                  </div>

                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-black" style={{ color: '#454545', paddingTop: '10px' }}>
                      Tebak laah
                    </h3>
                    <p className="text-xs text-gray-600" style={{ color: '#666666' }}>
                      Honey Gentry
                    </p>
                  </div>
                </div>

                {/* Bawah: range dan waktu */}
                <div className="flex items-center gap-2 w-full">
                  <span className="text-xs text-gray-800 w-[40px]">{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-grow"
                    style={{ accentColor: '#666666' }}
                  />
                  <span className="text-xs text-gray-800 w-[40px] text-right">{formatTime(duration)}</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <audio ref={audioRef} src="/kia.mp3" />
    </div>
  );
}
