export default class MediaType  {
    public static PROP =  {
        all: 'all',
        aural: 'aural',
        braille: 'braille',
        handheld: 'handheld',
        print: 'print',
        projection: 'projection',
        screen: 'screen',
        tty: 'tty',
        tv: 'tv',
        embossed: 'embossed',
    }

    protected val

    constructor(val) {
        this.val = val
    }

    public getValue() {
        return this.val
    }

    public static NEW_ALL(): MediaType
    {
        return new MediaType(MediaType.PROP.all)
    }

    public static NEW_AURAL(): MediaType
    {
        return new MediaType(MediaType.PROP.aural)
    }

    public static NEW_BRAILLE(): MediaType
    {
        return new MediaType(MediaType.PROP.braille)
    }

    public static NEW_HANDHELD(): MediaType
    {
        return new MediaType(MediaType.PROP.handheld)
    }

    public static NEW_PRINT(): MediaType
    {
        return new MediaType(MediaType.PROP.print)
    }

    public static NEW_PROJECTION(): MediaType
    {
        return new MediaType(MediaType.PROP.projection)
    }

    public static NEW_SCREEN(): MediaType
    {
        return new MediaType(MediaType.PROP.screen)
    }

    public static NEW_TTY(): MediaType
    {
        return new MediaType(MediaType.PROP.tty)
    }

    public static NEW_TV(): MediaType
    {
        return new MediaType(MediaType.PROP.tv)
    }

    public static NEW_EMBOSSED(): MediaType
    {
        return new MediaType(MediaType.PROP.embossed)
    }

}
