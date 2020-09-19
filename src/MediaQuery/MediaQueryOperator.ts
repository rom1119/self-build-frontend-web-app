export default class MediaQueryOperator {
    public static PROP: {
        and: 'and',
        not: 'not',
        only: 'only',
    }

    protected val

    constructor(val) {
        this.val = val
    }

    public getValue() {
        return this.val
    }

    public static NEW_AND(): MediaQueryOperator
    {
        return new MediaQueryOperator(MediaQueryOperator.PROP.and)
    }
    
    public static NEW_NOT(): MediaQueryOperator
    {
        return new MediaQueryOperator(MediaQueryOperator.PROP.not)
    }
    
    public static NEW_ONLY(): MediaQueryOperator
    {
        return new MediaQueryOperator(MediaQueryOperator.PROP.only)
    }
}