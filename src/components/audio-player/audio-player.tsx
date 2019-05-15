import React, {PureComponent, RefObject} from "react";

export interface AudioPlayerProps {
  /** Путь к файлу с композицией */
  src: string;
  /** Воспроизведение файла */
  isPlaying?: boolean;
  /** Обработчик события воспроизведения */
  onPlay?: (player: AudioPlayer) => void;
  /** Обработчик события паузы воспроизведения */
  onPause?: (player: AudioPlayer) => void;
}
export interface AudioPlayerState {
  /** Получение файла */
  isLoading: boolean;
  /** Ошибка воспроизведения файла */
  isError: boolean;
  /** Воспроизведение файла */
  isPlaying: boolean;
  /** Прогресс воспроизведения файла */
  progress: number;
}

class AudioPlayer extends PureComponent<AudioPlayerProps, AudioPlayerState> {
  private _audioRef: RefObject<HTMLAudioElement> ;

  public constructor(props: AudioPlayerProps) {
    super(props);

    this.state = {
      isLoading: false,
      isError: false,
      isPlaying: false,
      progress: 0,
    };
    this._audioRef = React.createRef();

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);

    this._handlePlayBtn = this._handlePlayBtn.bind(this);
    this._handleCanPlayThrough = this._handleCanPlayThrough.bind(this);
    this._handleTimeUpdate = this._handleTimeUpdate.bind(this);
    this._handleEnded = this._handleEnded.bind(this);
    this._handleLoadStart = this._handleLoadStart.bind(this);
    this._handleError = this._handleError.bind(this);
  }

  public render() {
    const {progress} = this.state;
    const {src} = this.props;
    const playClass = !this.isPlaying ? `track__button--play` : ``;

    return (
      <div className="game__track">
        <button
          className={`track__button ${playClass}`}
          type="button"
          onClick={this._handlePlayBtn}/>
        <div className="track__status">
          <audio
            ref={this._audioRef}
            src={src}
            onCanPlayThrough={this._handleCanPlayThrough}
            onTimeUpdate={this._handleTimeUpdate}
            onEnded={this._handleEnded}
            onLoadStart={this._handleLoadStart}
            onError={this._handleError}/>
          <div
            className="track__progress"
            style={{
              height: `2px`,
              background: `#707070`,
              marginTop: `55px`,
              width: `${progress}%`,
            }}/>
        </div>
      </div>
    );
  }

  public componentDidUpdate(prevProps: AudioPlayerProps, prevState: AudioPlayerState) {
    if (
      this.props.isPlaying !== prevProps.isPlaying ||
      this.state.isPlaying !== prevState.isPlaying
    ) {
      if (this.isPlaying) {
        this.play();
      } else {
        this.pause();
      }
    }
  }

  public play() {
    if (this._audioRef.current) {
      this._audioRef.current.play();
    }
  }

  public pause() {
    if (this._audioRef.current) {
      this._audioRef.current.pause();
    }
  }

  public get isPlaying(): boolean {
    return this._isControlled()
      ? Boolean(this.props.isPlaying)
      : this.state.isPlaying;
  }

  public set isPlaying(value: boolean) {
    if (this._isControlled()) {
      if (value && this.props.onPlay) {
        this.props.onPlay.call(this, this);
      }
      if (!value && this.props.onPause) {
        this.props.onPause.call(this, this);
      }
    } else {
      this.setState({isPlaying: value});
    }
  }

  private _isControlled(): boolean {
    return typeof this.props.isPlaying !== `undefined`;
  }

  private _handlePlayBtn() {
    this.isPlaying = !this.isPlaying;
  }

  private _handleCanPlayThrough() {
    this.setState({isLoading: false});
  }

  private _handleEnded() {
    this.isPlaying = false;
  }

  private _handleLoadStart() {
    this.setState({isLoading: true, isError: false});
  }

  private _handleError() {
    this.setState({isLoading: false, isError: true});
  }

  private _handleTimeUpdate() {
    const audio = this._audioRef.current;
    const {progress} = this.state;

    if (!audio) {
      return;
    }

    const {currentTime, duration} = audio;
    const nextProgress = Math.trunc((currentTime / duration) * 100);

    if (Math.abs(nextProgress - progress) >= 1) {
      this.setState({progress: nextProgress});
    }
  }
}

export default AudioPlayer;
