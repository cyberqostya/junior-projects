import './Phrase.scss';
import {TextInput} from 'components/UI/TextInput/TextInput';
import { useState } from 'react';
import PhraseTag from '../PhraseTag/PhraseTag';
import MainStore from 'stores/MainStore';
import { observer } from 'mobx-react';

export const Phrase = observer(() => {
  const [phrase, setPhrase] = useState('');
  function phrasehandler(e) {
    if (e.type === 'keydown' && e.code === 'Enter') {
      return addPhrase();
    }
    setPhrase(e.target.value);
  }

  function addPhrase() {
    if (phrase.length > 0 && MainStore.searchPhrases.length < 4) {
      MainStore.addSearchPhrase(phrase);
      // очистка поля
      setPhrase('');
    }
  }

  function removePhrase(e) {
    if (e.target.className.includes('close')) {
      const target = e.target.previousElementSibling;
      MainStore.removeSearchPhrase(target.textContent);
    }
  }

  const phrasesStyle = { marginBottom: 30 };

  const phraseDiscounts = [0, 10, 15, 20];

  return (
    <div className="formstep__phrase">
      <div
        className="formstep__phrase-container"
        style={MainStore.searchPhrases.length ? phrasesStyle : {}}
      >
        <TextInput
          value={phrase}
          placeholder={`Поисковая фраза для продвижения на Авито  (${MainStore.searchPhrases.length} из 4)`}
          onChange={phrasehandler}
          onKeyDown={phrasehandler}
          errortext={MainStore.searchPhrasesError}
        />
        <button
          onClick={addPhrase}
          className="formstep__phrase-button"
        ></button>
        {MainStore.searchPhrases.length > 1 &&
          <p className="formstep__phrase-sticker _discount">Скидка {phraseDiscounts[MainStore.searchPhrases.length - 1]}%</p>
        }
      </div>
      <div className="formstep__phrase-tags" onClick={removePhrase}>
        {MainStore.searchPhrases.map((i, ind) => (
          <PhraseTag key={ind} title={i} />
        ))}
      </div>
    </div>
  );
})
