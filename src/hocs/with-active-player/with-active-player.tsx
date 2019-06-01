import React, {PureComponent} from "react";
import AudioPlayer, {AudioPlayerProps} from "../../components/audio-player/audio-player";

export interface WithActivePlayerProps {
  /** Индекс активного плеера */
  activeIndex: number;
  /** Рендер функция плеера */
  renderPlayer: (index: number, props: AudioPlayerProps) => JSX.Element;
}
export interface WithActivePlayerState {
  /** Индекс активного плеера */
  activeIndex: number;
}

const withActivePlayer = <P extends object>(Component: React.ComponentType<P>) => {
  class WithActivePlayer extends PureComponent<P, WithActivePlayerState> {
    public constructor(props: P) {
      super(props);

      this._renderPlayer = this._renderPlayer.bind(this);
      this._handlePlayerPlayWith = this._handlePlayerPlayWith.bind(this);
      this._handlePlayerPauseWith = this._handlePlayerPauseWith.bind(this);
      this.state = {activeIndex: -1};
    }

    public render() {
      return <Component
        {...this.props}
        activeIndex={this.state.activeIndex}
        renderPlayer={this._renderPlayer}/>;
    }

    private _renderPlayer(index: number, props: AudioPlayerProps) {
      return (
        <AudioPlayer {...props}
          key={index}
          isPlaying={this.state.activeIndex === index}
          onPlay={this._handlePlayerPlayWith(index, props)}
          onPause={this._handlePlayerPauseWith(props)}/>
      );
    }

    private _handlePlayerPlayWith(index: number, props: AudioPlayerProps) {
      return (player: AudioPlayer) => {
        this.setState({activeIndex: index});
        if (props.onPlay) {
          props.onPlay(player);
        }
      };
    }

    private _handlePlayerPauseWith(props: AudioPlayerProps) {
      return (player: AudioPlayer) => {
        this.setState({activeIndex: -1});
        if (props.onPause) {
          props.onPause(player);
        }
      };
    }
  }

  return WithActivePlayer;
};

export default withActivePlayer;
