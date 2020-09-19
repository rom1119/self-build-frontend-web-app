export default class MediaFeature {
    
    public static PROP: {
        width: 'width',
        min_width: 'min-width',
        max_width: 'max-width',
        height: 'height',
        max_height: 'max-height',
        min_height: 'min-height',

        device_width: 'device-width',
        min_device_width: 'min-device-width',
        max_device_width: 'max-device-width',

        device_height: 'device-height',
        min_device_height: 'min-device-height',
        max_device_height: 'max-device-height',

        aspect_ratio: 'aspect-ratio',
        max_aspect_ratio: 'max-aspect-ratio',
        min_aspect_ratio: 'min-aspect-ratio',
        
        device_aspect_ratio: 'device-aspect-ratio',
        max_device_aspect_ratio: 'max-device-aspect-ratio',
        min_device_aspect_ratio: 'min-device-aspect-ratio',
        
        color: 'color',
        max_color: 'max-color',
        min_color: 'min-color',
        
        color_index: 'color-index',
        max_color_index: 'max-color-index',
        min_color_index: 'min-color-index',

        monochrome: 'monochrome',
        min_monochrome: 'min-monochrome',
        max_monochrome: 'max-monochrome',

        resolution: 'resolution',
        min_resolution: 'min-resolution',
        max_resolution: 'max-resolution',

        scan: 'scan',
        grid: 'grid',
        
    }

    protected val

    constructor(val) {
        this.val = val
    }

    public getValue() {
        return this.val
    }

    public static NEW_WIDTH(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.width)
    }
    
    public static NEW_MIN_WIDTH(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.min_width)
    }
    
    public static NEW_MAX_WIDTH(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.max_width)
    }
    
    public static NEW_HEIGHT(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.height)
    }
    
    public static NEW_MIN_HEIGHT(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.min_height)
    }
    
    public static NEW_MAX_HEIGHT(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.max_height)
    }
    
    
    
    public static NEW_DEVICE_WIDTH(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.device_width)
    }
    
    public static NEW_DEVICE_MIN_WIDTH(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.min_device_width)
    }
    
    public static NEW_DEVICE_MAX_WIDTH(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.max_device_width)
    }
    
    public static NEW_DEVICE_HEIGHT(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.device_height)
    }
    
    public static NEW_DEVICE_MIN_HEIGHT(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.min_device_height)
    }
    
    public static NEW_DEVICE_MAX_HEIGHT(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.max_device_height)
    }
    
    public static NEW_ASPECT_RATIO(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.aspect_ratio)
    }
    
    public static NEW_MIN_ASPECT_RATIO(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.min_aspect_ratio)
    }
    
    public static NEW_MAX_ASPECT_RATIO(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.max_aspect_ratio)
    }
    
    public static NEW_DEVICE_ASPECT_RATIO(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.device_aspect_ratio)
    }
    
    public static NEW_MIN_DEVICE_ASPECT_RATIO(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.min_device_aspect_ratio)
    }
    
    public static NEW_MAX_DEVICE_ASPECT_RATIO(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.max_device_aspect_ratio)
    }
    
    public static NEW_COLOR(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.color)
    }
    
    public static NEW_MIN_COLOR(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.min_color)
    }
    
    public static NEW_MAX_COLOR(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.max_color)
    }
    
    public static NEW_COLOR_INDEX(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.color_index)
    }
    
    public static NEW_MIN_COLOR_INDEX(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.min_color_index)
    }
    
    public static NEW_MAX_COLOR_INDEX(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.max_color_index)
    }
    
    public static NEW_MONOCHROME(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.monochrome)
    }
    
    public static NEW_MIN_MONOCHROME(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.min_monochrome)
    }
    
    public static NEW_MAX_MONOCHROME(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.max_monochrome)
    }
    
    public static NEW_RESOLUTION(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.resolution)
    }
    
    public static NEW_MIN_RESOLUTION(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.min_resolution)
    }
    
    public static NEW_MAX_RESOLUTION(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.max_resolution)
    }
    
    public static NEW_SCAN(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.scan)
    }
    
    public static NEW_GRID(): MediaFeature
    {
        return new MediaFeature(MediaFeature.PROP.grid)
    }


}