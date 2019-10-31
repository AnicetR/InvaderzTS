import {createStore, createStoreObject, createEvent, Store} from 'effector'

export class Score{
    private static _instance : Score;

    private _baseState = 0;
    
    addPoints = createEvent<number>('add points');
    resetScore = createEvent<number>('reset score');

    store = createStoreObject<Store<number>>( 
                        createStore<number>(this._baseState)
                            .on(this.addPoints, (state, points: number) => state += points)
                            .on(this.resetScore, (state) => state = 0)
                    );
    
    

    static get instance() : any {
        if(!Score._instance){
            Score._instance = new Score()
        }
        return Score._instance; 
    }

    static get store() : any {
        return Score.instance.store;
    }
}