export default interface Remover<T>
{
    remove(arg: T): Promise<any>
}
