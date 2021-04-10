import AssetDomain from '../Assets/AssetDomain';
import FontFace from './FontFace';
import FontFamilyValDomain from '~/src/Fonts/FontFamilyValDomain';


export default class FontFamilyFactory {
    

    public newCustomDomainVal(fontFace: FontFace): FontFamilyValDomain
    {
        var res = new FontFamilyValDomain(fontFace.name, 'custom')
        res.fontFace = fontFace

        return res
    }

    // public create(name): FontFamilyValDomain
    // {
    //     var availableFonts = FontFamily.getAccessableProperty()

    //     for (const font of availableFonts) {
    //         if (font.getName() === name) {
    //             return font
    //         }
    //     }

    //     return new FontFamilyValDomain(name, 'custom')
    // }
}