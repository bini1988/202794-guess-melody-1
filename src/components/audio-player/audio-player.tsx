import React, {PureComponent, RefObject} from "react";
import styled from "@emotion/styled";
import * as Styles from "../../common.styles";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const AudioStatus = styled.div`
  flex: 0 1 auto;
  margin: 0 10px;
  height: 55px;
  width: 370px;

  & > svg {
    filter: drop-shadow(5px 5px 5px rgba(0,0,0,0.2));
  }
`;

export const AudioButton = styled.button`
  padding: 0;
  width: 35px;
  height: 50px;
  border: none;
  background-color: transparent;
  transition: transform ease-in-out 300ms;
  outline: none;
  cursor: pointer;

  &:not(:disabled):hover,
  &:not(:disabled):focus {
    transform: scale(1.05);
  }
  &:not(:disabled):active {
    transform: scale(1.04);
  }

  & svg {
    fill: #ff9749;
    filter: drop-shadow(3px 3px 3px rgba(0,0,0,0.2));
  }
`;

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

  private static _isControlled(props: AudioPlayerProps): boolean {
    return typeof props.isPlaying !== `undefined`;
  }

  public static getDerivedStateFromProps(nextProps: AudioPlayerProps) {
    if (AudioPlayer._isControlled(nextProps)) {
      return {isPlaying: nextProps.isPlaying};
    }
    return null;
  }

  public constructor(props: AudioPlayerProps) {
    super(props);

    this.state = {
      isLoading: false,
      isError: false,
      isPlaying: false,
      progress: 0,
    };
    this._audioRef = React.createRef<HTMLAudioElement>();

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
    const {isError, isLoading, isPlaying, progress} = this.state;
    const {src} = this.props;

    return (
      <Wrapper>
        <AudioButton
          type="button"
          disabled={isError || isLoading}
          onClick={this._handlePlayBtn}>
          <svg width="35" height="50">
            <use
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xlinkHref={isPlaying ? `#pause` : `#play`}/>
          </svg>
          <span css={Styles.hidden}>
            {isPlaying
              ? `Поставить трек на паузу`
              : `Проиграть трек`
            }
          </span>
        </AudioButton>
        <AudioStatus>
          <svg width="370" height="55">
            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#equalizer"/>
            <rect width={`${progress}%`} height="100%" fill="#ff9749" clipPath="url(#equalizer-lines)"/>
          </svg>
          <audio
            ref={this._audioRef}
            src={src}
            onCanPlayThrough={this._handleCanPlayThrough}
            onTimeUpdate={this._handleTimeUpdate}
            onEnded={this._handleEnded}
            onLoadStart={this._handleLoadStart}
            onError={this._handleError}/>
        </AudioStatus>
      </Wrapper>
    );
  }

  public componentDidUpdate(prevProps: AudioPlayerProps, prevState: AudioPlayerState) {
    if (this.state.isPlaying !== prevState.isPlaying) {
      if (this.state.isPlaying) {
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

  private _setIsPlaying(value: boolean) {
    if (AudioPlayer._isControlled(this.props)) {
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

  private _handlePlayBtn() {
    this._setIsPlaying(!this.state.isPlaying);
  }

  private _handleCanPlayThrough() {
    this.setState({isLoading: false});
  }

  private _handleEnded() {
    this._setIsPlaying(false);
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

    if (Math.abs(nextProgress - progress) >= 0.5) {
      this.setState({progress: nextProgress});
    }
  }
}

export default AudioPlayer;
