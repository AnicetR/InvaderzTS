export interface intervalInterface{
    _id: number,
    readonly each: number,
    readonly callback: CallableFunction;

    start() : void
    stop() : void
}