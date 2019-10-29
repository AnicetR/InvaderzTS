import {createStore, createStoreObject, createEvent, Store} from 'effector'

export class keyDownStore{
  private static _instance: keyDownStore;
  private _store : any;
  private _baseContext: Array<number> = [];
  public readonly addKey: any;
  public readonly removeKey: any;

  constructor(){
    /**
     * Defining store events
     */
    this.addKey = createEvent<number>('add key');
    this.removeKey = createEvent<number>('remove key');

    /**
     * Defining store and events logic
     */
    const store = createStore<Array<number>>(this._baseContext)
                    .on(this.addKey, (state, keyCode: number): Array<number> => {
                      if(state.indexOf(keyCode) == -1){
                        state.push(keyCode);
                      }
                      return state;
                    })
                    .on(this.removeKey, (state, keyCode: number): Array<number> => 
                      state.filter(storedKeyCode => storedKeyCode != keyCode)
                    );
    /**
     * Storing the store inside a property
     */
    this._store = createStoreObject<Store<Array<number>>>(store);
  }
  
  /**
   * Instanciate or returns the instance
   */
  static get instance(): keyDownStore {
    return !keyDownStore._instance ? 
              keyDownStore._instance = new keyDownStore()
              : keyDownStore._instance;
  }

  /**
   * returns the store
   */
  get state(): any{
    return this._store.getState()[0];
  }
}
