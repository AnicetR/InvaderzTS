import {createStore, createStoreObject, createEvent, Store} from 'effector'

export class keyDownStore{
  private static instance: keyDownStore;
  private _store : Object;
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
                    .on(this.addKey, (state, keyCode): Array<number> => {
                      //@ts-ignore
                      if(state.indexOf(keyCode) == -1){
                        //@ts-ignore
                        return [...state, keyCode];
                      }
                      return state;
                    })
                    .on(this.removeKey, (state, keyCode): Array<number> => 
                      //@ts-ignore
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
  static getInstance(): keyDownStore {
    if(!keyDownStore.instance){
      keyDownStore.instance = new keyDownStore();
    }

    return keyDownStore.instance;
  }

  /**
   * returns the store
   */
  get store(): Object{
    return this._store;
  }



}
