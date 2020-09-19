export default class MediaOrientation {
    public static PROP: {
        landscape: 'landscape',
        portrait: 'portrait',
    }

    protected val

    constructor(val) {
        this.val = val
    }

    public getValue() {
        return this.val
    }

    public static NEW_LANDSCAPE(): MediaOrientation
    {
        return new MediaOrientation(MediaOrientation.PROP.landscape)
    }
    
    public static NEW_PORTRAIT(): MediaOrientation
    {
        return new MediaOrientation(MediaOrientation.PROP.portrait)
    }
    
}