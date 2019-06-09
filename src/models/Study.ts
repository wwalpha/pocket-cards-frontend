import { Record } from 'immutable';
import { WordItem } from 'typings/api';
import { MODES } from '@constants/Consts';

export type WordInfo = WordItem;

export interface B000UIProps {
  current?: WordInfo;
  mode?: string;
  isLoading: boolean;
}

export interface B000Props extends B000UIProps {
  words: WordInfo[];
  index: number;
}

export interface IB000 extends B000Props, Record<B000Props> {
  get<K extends keyof B000UIProps>(key: K): B000UIProps[K];
}

/**
 * 単語学習の情報
 */
export default class B000 extends Record<B000Props>({
  words: [],
  index: 0,
  current: undefined,
  mode: undefined,
  isLoading: false,
}) {
  /**
   * 単語情報を登録する
   */
  setWords(mode: string, words: WordInfo[]) {
    console.log(mode, words, words[0]);

    // モード変わった、或いは、既存データ存在しない
    return this.set('words', words)
      .set('current', words[0])
      .set('index', 0)
      .set('mode', mode);
  }

  /** 次の単語を表示する */
  next() {
    const newIdx = this.index + 1 === this.words.length ? 0 : this.index + 1;

    console.log(this.words);
    // １件のみ場合、計算しない
    if (this.words.length === 1) {
      return this;
    }

    // 単語ループ表示する
    return this.set('current', this.words[newIdx]).set('index', newIdx);
  }

  /** テスト回答(YES/NO) */
  answer(yes: boolean) {
    if (!yes && this.mode !== MODES.AllTest) {
      return this.next();
    }

    console.log(this.index);

    // 該当単語を削除する
    this.words.splice(this.index, 1);
    console.log(this.words);

    // Indexが配列の限界を超えた場合、最初から始まる
    const newIdx = this.index >= this.words.length ? 0 : this.index;

    console.log(newIdx);

    return this.set('words', this.words)
      .set('index', newIdx)
      .set('current', this.words[newIdx]);
  }

  /** 既存単語をクリアする */
  clear() {
    return this.set('words', []).set('current', undefined);
  }

  /** 取込中 */
  startLoading() {
    return this.set('isLoading', true);
  }

  endLoading() {
    return this.set('isLoading', false);
  }
}
