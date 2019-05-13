/* eslint quotes: ["error", "double"] */

/**
 * Параметры игры
 */
export interface PublicSettings {
  /** Игровое время, мин */
  maxTime: number;
  /** Количество допустимых ошибок */
  maxMistakes: number;
}

/**
 * Типы используемых в игре вопросов
 */
export enum QuestionTypes {
  /** Определить жанр композиции */
  Genre = "genre",
  /** Определить исполнителя композиции */
  Artist = "artist",
}


/**
 * Набор жанров композиции
 */
export enum TrackGenres {
  /** Рок */
  Rock = "rock",
  /** Джаз */
  Jazz = "jazz",
  /** Блюз */
  Blues = "blues",
  /** Поп */
  Pop = "pop",
}
/**
 * Ответ на вопрос определения жанра композиции
 */
export interface GenreAnswer {
  /** Жанр композиции */
  genre: TrackGenres;
  /** Путь к файлу с композицией */
  src: string;
}
/**
 * Вопрос на определение жанра композиции
 */
export interface GenreQuestion {
  /** Тип вопроса */
  type: QuestionTypes.Genre;
  /** Жанр композиции */
  genre: TrackGenres;
  /** Варианты ответов */
  answers: GenreAnswer[];
}

/**
 * Композиция и её испольнитель
 */
export interface ArtistSong {
  /** Исполнитель композиции */
  artist: string;
  /** Путь к файлу с композицией */
  src: string;
}
/**
 * Ответ на вопрос определения исполнителя композиции
 */
export interface ArtistAnswer {
  /** Исполнитель */
  artist: string;
  /** Путь к фото исполнителя */
  picture: string;
}
/**
 * Вопрос на определение исполнителя композиции
 */
export interface ArtistQuestion {
  /** Тип вопроса */
  type: QuestionTypes.Artist;
  /** Композиция */
  song: ArtistSong;
  /** Варианты ответов */
  answers: ArtistAnswer[];
}

/**
 * Внутриигровой вопрос
 */
export type GameQuestion = (GenreQuestion|ArtistQuestion);
