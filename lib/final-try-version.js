'use babel';

import FinalTryVersionView from './final-try-version-view';
import { CompositeDisposable } from 'atom';

export default {

  finalTryVersionView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.finalTryVersionView = new FinalTryVersionView(state.finalTryVersionViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.finalTryVersionView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'final-try-version:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.finalTryVersionView.destroy();
  },

  serialize() {
    return {
      finalTryVersionViewState: this.finalTryVersionView.serialize()
    };
  },

  toggle() {
    console.log('FinalTryVersion was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
