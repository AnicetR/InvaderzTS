import {createStore, createStoreObject, createEvent, Store} from 'effector'

export class PlayerLives{
    private static _instance : PlayerLives;
    
    private _baseState = 5;
    
    addLife = createEvent<number>('add life');
    subLife = createEvent<number>('sub life');
    resetLifes = createEvent<number>('reset score');

    store = createStoreObject<Store<number>>( 
                        createStore<number>(this._baseState)
                            .on(this.addLife, (state, lifeNumber: number) => state += lifeNumber)
                            .on(this.subLife, (state, lifeNumber: number) => state -= lifeNumber)
                            .on(this.resetLifes, (state) => state = this._baseState)
                    );
    
    

    static get instance() : any {
        if(!PlayerLives._instance){
            PlayerLives._instance = new PlayerLives()
        }
        
        return PlayerLives._instance; 
    }

    static get store() : any {
        return PlayerLives.instance.store;
    }
}