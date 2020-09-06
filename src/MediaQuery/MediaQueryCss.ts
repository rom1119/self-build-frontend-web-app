import BaseSelector from '../BaseSelector';
import PseudoSelector from '../PseudoSelector/PseudoSelector';
import HtmlTag from '../Layout/HtmlTag';
export default class MediaQueryCss
{
    id
    projectId
    version
    selectors: PseudoSelector[]
    tags: HtmlTag[]

    public static OPERATORS: {
        and: 'and',
        not: 'not',
        only: 'only',
    }
    
    public static MEDIA_FEATURE: {
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
    
    public static MEDIA_TYPES: {
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

    get selectorsList() : any
    {
        let pseudoSelectors = {}
        
        for (const element of this.selectors) {
            
            pseudoSelectors[element.value] = element.cssAccessor.all
            
        }
        
        for (const tag of this.tags) {
            
            pseudoSelectors[tag.selectorLiteral] = tag.cssAccessor.all
            
        }  
        
        // console.log('COMP-SELECTORS');
        // console.log(pseudoSelectors);

        return pseudoSelectors
    }
}