import {createStore, createStoreObject, createEvent, Store} from 'effector'
import { number } from 'prop-types';

export class fpsHistoryStore{
  private static _instance: fpsHistoryStore;
  private _store : any;
  private _baseContext: Array<number> = [];
  addFps: any;

  private _fpsCache: number = 0;
  private _fpsCacheStart: number = 0;
  private _fpsCacheEnd: number = 0;

  constructor(){
    /**
     * Defining store events
     */
    this.addFps = createEvent<Array<number>>('add fps');

    /**
     * Defining store and events logic
     */
    const store = createStore<Array<number>>(this._baseContext)
                    .on(this.addFps, (state, fpsTimestamp: number): Array<number> => {
                      if(state.length >= 30){
                        state.shift();
                      }
                      return [...state, Math.round(fpsTimestamp)];
                    });
    /**
     * Storing the store inside a property
     */
    this._store = createStoreObject<Store<Array<number>>>(store);
  }
  
  /**
   * Instanciate or returns the instance
   */
  static get instance(): fpsHistoryStore {
    return !fpsHistoryStore._instance ? 
              fpsHistoryStore._instance = new fpsHistoryStore() 
              : fpsHistoryStore._instance;
  }

  /**
   * returns the state
   */
  get state(): any{
    return this._store.getState()[0];
  }

  /**
   * returns the store so he can be used by react
   */
  get store(): Store<Array<number>>{
    return this._store;
  }

    fpsLog(currentTick : number, lastTick: number){
    this._fpsCacheStart = performance.now();
    if(this._fpsCacheStart <= this._fpsCacheEnd){
      var currentFps = 1/((currentTick - lastTick)/1000);
      if(this._fpsCache == 0){
        this._fpsCache = currentFps;
      }else{
        this._fpsCache = (this._fpsCache + currentFps) / 2;
      }
    }else{
        this._fpsCacheEnd = this._fpsCacheStart + 1000;
        this.addFps(this._fpsCache);
        this._fpsCache = 0;
    }     
}
}


/**
   * Returns a FPS Histogram of the last 1800 fpss
   */

export const FpsHistogramList = fpsHistoryStore.instance.store.map(
  (fpsHistory: Array<any>) => {
      return fpsHistory[0].map((fps: number, key: number) => {
        return {key: key, fps: fps};
      });
    }
)